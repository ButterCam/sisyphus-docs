---
sidebar_position: 4
---

# AIP with Sisyphus

为了帮助我们遵循 Google API 设计指南，Sisyphus 实现了很多 AIP 中未提供实现的标准。

## AIP-122 Resource Name

[AIP-122](https://google.aip.dev/122) 规范中提供了一个标准的资源名称格式，是在系统中表示资源的唯一标识。

Sisyphus 会为所有资源名称定义生成一个特殊的类型，用来在代码中方便地提取资源名称中各个部分。

```protobuf
message Book {
    option (google.api.resource) = {
        type: "library.googleapis.com/Book"
        pattern: "publishers/{publisher}/books/{book}"
    };

    // Book 的资源名称
    // 格式为: publishers/{publisher}/books/{book}
    string name = 1;

    // 其他字段
}
```

以上代码将会额外生成一个 `Name` 接口类型，用来表示任意 pattern 的资源名称，并为每个 pattern 都生成一个实现了 `Name` 接口的具体实现类型。

```kotlin
interface Book : Message<Book, MutableBook> {
    // Book 的资源名称接口类型
    public interface Name : ResourceName {
        // 通过资源名称中的具体 pattern 生成的实现类型，
        // 当资源名称有多个 pattern 时，可能生成多个实现类型
        public class Base(`data`: Map<String, String>) : AbstractResourceName(data), Name {
        }
    }

    // 所有引用的资源名称的 string 类型也将自动变成相应的接口类型
    val name: Name
}
```

此外，如果有引用到资源名称的 `string` 类型的字段也会自动变为指定的接口类型，例如：

```protobuf
message ListBooksRequest {
    // Book 的发行商
    // 格式: publishers/{publisher_id}
    string parent = 1 [(google.api.resource_reference) = {
        type: "library.googleapis.com/Publisher"
    }];

    // Other fields (e.g. page_size, page_token, filter, etc.)...
}
```

将会把 parent 字段的类型变更为 `Publisher.Name`。

```kotlin
interface ListBooksRequest : Message<ListBooksRequest, MutableListBooksRequest> {
    // 引用的资源名称的 string 类型也将自动变成相应的接口类型
    val parent: Publisher.Name
}
```

在 Kotlin 中可以使用 `Name.of`，`Name.invoke` 或者 `Name.tryCreaate` 来创建一个 `Name` 对象。

```kotlin
val name = Book.Name.of("publisher_id", "book_id") // 只需要填上变量的部分
val name = Book.Name("publishers/123/books/456") // 完整解析一个资源名称，当遇到不支持的 pattern 时，会自动创建一个 UnknownResourceName 用于传递
val name = Book.Name.tryCreate("publishers/123/books/456") // 尝试创建一个资源名称，当遇到不支持的 pattern 时，会返回 null
```

当需要访问资源名称中的具体部分时，可以直接使用对应的变量名称来获取指定的部分，例如：

```kotlin
val publisherId = name.publisherId
val bookId = name.bookId
```

## AIP-127 HTTP and gRPC Transcoding

在[前面的章节](/docs/guides/http-transcoding)我们以及提到过了如何在 Sisyphus 中使用 Transcoding 来通过 HTTP/Json 来访问 gRPC API。

在大多数情况下，HTTP 的 RequestHeader 语义与 gRPC Metadata 并不完全一致，所以当使用 HTTP 访问 gRPC API 时，我们还需要配置将 HTTP Header 转化为 gRPC Metadata
的转化过程。

使用 `TranscodingHeaderExporter` 来自定义这个过程：

```kotlin
@Component
class MyTranscodingHeaderExporter : TranscodingHeaderExporter {
    private val keys = mutableMapOf<String, Metadata.Key<String>>()

    private val allowedHeader = setOf(
        HttpHeaders.AUTHORIZATION.lowercase(),
        HttpHeaders.COOKIE.lowercase(),
        HttpHeaders.FROM.lowercase(),
        HttpHeaders.HOST.lowercase(),
        HttpHeaders.REFERER.lowercase(),
        HttpHeaders.ACCEPT_LANGUAGE.lowercase(),
        HttpHeaders.PRAGMA.lowercase(),
    )

    private fun key(header: String): Metadata.Key<String> {
        return keys.getOrPut(header) {
            Metadata.Key.of(header, Metadata.ASCII_STRING_MARSHALLER)
        }
    }

    override fun export(request: ServerRequest, metadata: Metadata) {
        for ((key, values) in request.headers().asHttpHeaders()) {
            val normalized = key.lowercase()
            if (normalized in allowedHeader) {
                metadata.put(key(normalized), values.joinToString(","))
            }
        }
    }
}
```

此外，由于 gRPC 客户端的本身限制，gRPC 请求无法自定义 `User-Agent`，我们也可以通过 `TranscodingHeaderExporter` 来将 HTTP 的 User-Agent 转化为别的 gRPC
Metadata 传递给 gRPC 服务。

```kotlin
override fun export(request: ServerRequest, metadata: Metadata) {
    for ((key, values) in request.headers().asHttpHeaders()) {
        if (key.equals(HttpHeaders.USER_AGENT, ignoreCase = true)) {
            // 将 User-Agent 转化为 X-User-Agent
            metadata.put(key("x-user-agent"), values.joinToString(","))
            continue
        }
        val normalized = key.lowercase()
        if (normalized in allowedHeader) {
            metadata.put(key(normalized), values.joinToString(","))
        }
    }
}
```

HTTP/Json 接口通常被用于浏览器中，对于浏览器，我们还需要支持 preflight 请求，Sisyphus 将根据支持的 gRPC 方法配置来自动支持 preflight 请求。

但是，当我们想要将 gRPC 响应的自定义 Metadata 返回给客户端时，由于浏览器的限制，我们需要在 preflight 请求中列举出可能出现的响应头，才能被前端所读取到。

可以采用 `TranscodingCorsConfigurationInterceptor` 接口来自定义所有的 preflight 响应。

```kotlin
@Component
class MyTranscodingCorsConfigurationInterceptor : TranscodingCorsConfigurationInterceptor {
    override fun intercept(
        config: CorsConfiguration,
        method: ServerMethodDefinition<*, *>,
        pattern: HttpRule.Pattern<*>,
        path: String
    ): CorsConfiguration {
        config.addExposedHeader("request-id")
        return config
    }
}
```

## AIP-132 Standard methods: List

List 接口在 API 设计中十分常见，Sisyphus 提供了一系列的工具来方便开发者快速开发 List 接口。

### 排序

在 List 接口中我们可能需要支持 `order_by`
字段来指定列表的排序规则，[sisyphus-dsl](https://github.com/ButterCam/sisyphus/tree/master/lib/sisyphus-dsl) 组件提供了 OrderDsl
来解析 [AIP-132](https://google.aip.dev/132#ordering) 标准中的 Ordering 语法。

```kotlin
val start = OrderDsl.parse("foo desc, bar")
```

此外，如果采用 JDBC 作为后端数据库，[sisyphus-jdbc](https://github.com/ButterCam/sisyphus/tree/master/middleware/sisyphus-jdbc) 中间件可以将
ordering 语法转化为 SQL 的 `order by` 部分。

```kotlin
val orderByBuilder = orderByBuilder {
    field("foo", Tables.BAR.FOO)
}

jooq.selectFrom(Tables.BAR).orderBy(orderByBuilder.build(orderBy))
```

使用 `orderByBuilder` DSL 可以快速将 ordering 语法嵌入到 JOOQ 查询中。

### 过滤

Sisyphus 同样为过滤器实现了对应的工具
DSL，但是由于过滤器的实现比较复杂，具体的内容我们将会在下面的 [AIP-160](http://localhost:3000/docs/advenced-guides/aip-spec#aip-160-filtering) 中详细介绍。

### 翻页

Sisyphus 推荐自定义一个 Protobuf Message 用于储存翻页上下文，并将其二进制序列化编码为 UrlSafeBase64 作为 `page_token`。

下面是两种十分常用的翻页上下文，可供参考。

```protobuf
message IndexAnchorPaging {
    int64 index = 1;
}

message OffsetPaging {
    int32 offset = 1;
}
```

`IndexAnchorPaging` 是基于锚点的翻页信息，可以用于高性能翻页，但是无法支持跳页，通常用在客户端上，其含义是上一页的最后一个元素的索引，在获取下一页的时候只需要提供 `WHERE id > paging.token`
即可获取下一页。

`OffsetPaging` 是基于偏移的翻页信息，在大量数据的表现上比较差，但是更加灵活，可以支持跳页，通常用在管理后台上，在获取下一页是需要翻译为 `LIMIT offset, limit` 的 SQL 语句。

## AIP-160 Filtering

过滤器是 List 接口的重要组成部分，Sisyphus 在这个部分用了很大的努力来简化开发人员的工作，提供了一个非常简单的 DSL 来帮助开发人员将 Filtering 语法结构转化为传统的 SQL。

### 数据库过滤

这是最为有效的实现过滤器方式，将过滤器交给数据库来处理，能够保证返回指定数量的数据，在 [sisyphus-jdbc](https://github.com/ButterCam/sisyphus/tree/master/middleware/sisyphus-jdbc)
中间件中使用 `sqlBuilder` DSL 来创建 `TableSqlBuilder`。

```kotlin
val sqlBuilder = sqlBuilder(Tables.FOO) {
    field("name", Tables.FOO.ID) {
        Foo.Name.tryCreate(it as String)?.note?.toLong()
    }
    field("bar", Tables.FOO.BAR)
    field("title", Tables.BAZ.TITLE)
    library(object : FilterStandardLibrary() {
        fun withBaz(): Join {
            return Join {
                it.leftJoin(Tables.BAZ).on(Tables.BAZ.FOO_ID.eq(Tables.FOO.ID))
            }
        }
    })
}
```

在 `sqlBuilder` DSL 中指定 filtering 语句中能使用的字段名，并将其映射到数据库的字段中，同时也能指定一个自定义转化函数。

在使用时使用此 sqlBuilder 通过 JOOQ 构建 SQL。

```kotlin
sqlBuilder.select(jooq, filter)
    .orderBy(orderByBuilder.build(orderBy))
```

而客户端仅需在 List 接口的 `filter` 字段中填入 `name='foos/1' OR baz=2` 这样的 filtering 语句，就会自动转化为

```sql
SELECT *
FROM foo
WHERE (id = 1 OR baz = 2)
```

此外还能拓展 `FilterStandardLibrary` 来提供 filtering 语句中能够使用的函数，如果函数返回值为一个 `Join` 对象，还能实现联表查询。

当客户端在 filter 字段中填入 `title='FooBar' withBaz()` 时，Sisyphus 会将 WithBaz 的 Join 值应用到 JOOQ 上。

```sql
SELECT *
FROM foo
         LEFT JOIN baz ON baz.foo_id = foo.id
WHERE (title = 'FooBar')
```

当函数返回 `Condition` 时，可以将函数写在条件中，可以实现 filter 语句无法实现的复杂查询，或者是为了安全而封装的有限查询。

```kotlin
library(object : FilterStandardLibrary() {
    fun safeQuery(): Condition {
        return Tables.FOO.PASSWORD.eq("123456")
    }
})
```

当客户端在 filter 字段中填入 `bar='foobar' AND safeQuery()` 时，filter 将会转化为以下 SQL 语句：

```sql
SELECT *
FROM foo
WHERE (baz = 2 AND password = '123456')
```

### 本地过滤

另外一种过滤方式是本地过滤，是指将数据库中查出来的数据通过本地的代码逻辑过滤，这种方式的过滤器会更加强大，但是也可能出现空页的情况。

Sisyphus 采用 [CEL](https://github.com/google/cel-spec) 来描述这种过滤器。

CEL 全称是 Common Expression Language，是 Google 提出的一种非图灵完备的表达式语言，能与 Protobuf 深度结合。

在 [sisyphus-dsl](https://github.com/ButterCam/sisyphus/tree/master/lib/sisyphus-dsl) 中使用 CelEngine 来执行 CEL 表达式。

```kotlin
val celEngine = CelEngine()
val filteredItems = foos.filter {
    celEngine.eval(
        "foo.bar == 'foobar' && foo.title == 'FooBar'",
        mapOf("foo" to it)
    )
}
```

除了当过滤器使用之外，CEL 还可以用于各种需要动态执行代码的场景，例如权限检查，动态内容等等。

## AIP-161 Field masks

当实现 Update 接口时，我们经常要求提供部分更新功能，可以由客户端选择更新某一些字段，而不是更新整个对象。通常情况下，可以采用空值不更新的方式来实现，但是这样会导致无法区分用户是想要删除这个字段还是不想更新这个字段。

此时，可以采用 `FieldMask` 来解决这个问题，通过传递一个额外的 `update_mask` 字段来指导服务段的更新操作。

```kotlin
Foo.resolveMask(updateMask).paths.forEach { field ->
    when (field) {
        Foo.BAR_FIELD_NAME -> this.bar = foo.bar.takeIf { foo.hasBar() }
        Foo.TITLE_FIELD_NAME -> this.title = foo.title.takeIf { foo.hasTitle() }
    }
}
```

使用 `resolveMask` 方法可以标准化 update_mask 并通过 paths 访问要更新的每个字段。