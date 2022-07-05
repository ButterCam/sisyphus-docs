---
sidebar_position: 5
---

# 设计自己的 API

Sisyphus 的工作流的开始与核心是 API 设计，一切都是围绕着 API 所展开的。在这里 Sisyphus 强烈建议参考 [Google API 设计指南](https://google.aip.dev/)，并按照该指南来设计
API。

该指南包含了 Google 在 API 设计上的最佳实践，当你遇到了 API 设计的问题，感觉这样做也行，那样做也可以，拿不定注意的时候，不妨来看看 [Google API 设计指南](https://google.aip.dev/)。

## Intellij Protobuf Plugin

**[Intellij Protobuf Plugin](https://github.com/devkanro/intellij-protobuf-plugin)** 是专为 Intellij 提供的 Protobuf
语言的插件，可以帮助你快速地编写 Protobuf 文件。  
该插件提供了很多官方插件所不具有的功能，例如 AIP 集成，导入优化等等，并且还集成了 Sisyphus 一些功能的支持。

![](./assets/intellij-protobuf-plugin.png#gh-light-mode-only)
![](./assets/intellij-protobuf-plugin_dark.png#gh-dark-mode-only)

在 Intellij 的 `设置-插件` 页面搜索 `protobuf` 就可以下载并安装该插件。

:::danger 注意

注意，当你使用 IntelliJ IDEA Ultimate 时，会自动附带一个官方的 Protocol Buffer 插件，Intellij Protobuf Plugin 与此插件并不兼容，需要在插件页将自带的 Protocol
Buffer 插件与 gRPC 插件禁用。  
不用担心功能不足的问题，因为 Intellij Protobuf Plugin 已经集成 Protocol Buffer 插件与 gRPC 插件的大部分功能，并且提供了更多的功能。

:::

## 设计第一个 API

当安装好插件后，就可以在 `src/main/proto` 目录下创建一个新的 proto 文件。

创建文件之前，需要创建一个新的 package，参考 [AIP-191](https://google.aip.dev/191)。

一般而言，Java 包名只需要简单的去掉类似 `com`、`net`、`io` 等根域名，就能当 proto 包名。

在这里我们使用 `bybutter.showcase.v1` 当我们的包名，在这个包下创建一个 `book.proto`。

```protobuf
syntax = "proto3";

package bybutter.showcase.v1;

option java_package = "com.bybutter.showcase.v1";
option java_multiple_files = true;
```

对于新创建的 proto 文件，总是鼓励采用 `proto3` 的语法，并配置好生成的 Kotlin 文件的包名。

## 面向资源设计

[AIP-121](https://google.aip.dev/121) 提出了面向资源设计的概念，面向资源设计是一种 RPC API 的模式，它提供了一种更加规范化与模式化的方式来设计 API。

将几乎所有的 API 都设计为针对资源的不同的动作，并且大部分动作可以使用 HTTP 方法来描述，这几乎和 Restful API 的概念一样。

在这里我们定义一种资源，名为 `Book`，表示一本书的信息。

```protobuf
message Book {
    // 标题
    string title = 1;
    // 作者
    string author = 2;
}
```

### 资源名

[AIP-122](https://google.aip.dev/122) 定义了唯一确定一个资源的资源名规范，资源名不只是包含了资源 ID 信息，还包含了资源之间的层级结构，这对于设计复杂的 API 十分有用。

```protobuf
message Book {
    option (google.api.resource) = {
        type: "showcase.bybutter.com/Book"
        pattern: "publishers/{publisher}/books/{book}"
    };

    string name = 1;
    // 标题
    string title = 2;
    // 作者
    string author = 3;
}
```

可以用 `resource` option 将一个 message 定义为资源，在这里我们定义 Book 的资源名格式为 `publishers/{publisher}/books/{book}`，其中 `publisher` 表示出版方
ID， `book` 为则为书籍 ID。

### 资源类型

[AIP-123](https://google.aip.dev/123) 定义了资源类型的规范，资源类型由资源所在的域与资源类型组成。

`showcase.bybutter.com/Book` 就是 `Book` 的资源类型，`showcase.bybutter.com` 表示资源所属的域，一般是 API 服务器的域名，而 Book 则为资源类型，一般是 message
名字。

### 资源关联

我们可以将不同的资源关联起来，用 `resource_reference` option 就可以做到这一点。

```protobuf
message Book {
    // 作者
    string author = 3 [(google.api.resource_reference) = {
        type: "showcase.bybutter.com/Author"
    }];
}
```

## API 设计

[AIP-131](https://google.aip.dev/131)，[AIP-132](https://google.aip.dev/132)，[AIP-133](https://google.aip.dev/133)
，[AIP-134](https://google.aip.dev/134)，[AIP-135](https://google.aip.dev/135)，定义了关于资源的五个标准接口，分别是
Get，List，Create，Update，Delete。

这就是我们常说的增删改查接口了，这些接口都有各自的 AIP 规范，参考这些规范就可以设计出健壮而富有拓展性的 API。

### Get 接口

Get 接口用于通过资源名获取单个资源的详细信息，在 HTTP 映射中往往将资源名放到 URI 路径中。

```protobuf
service BookApi {
    rpc GetBook (GetBookRequest) returns (Book) {
        option (google.api.http) = {
            get: "/v1/{name=publishers/*/books/*}"
        };
        option (google.api.method_signature) = "name";
    }
}

message GetBookRequest {
    string name = 1 [
        (google.api.field_behavior) = REQUIRED,
        (google.api.resource_reference) = {
            type: "library.googleapis.com/Book"
        }];
}
```

### List 接口

List 接口用于获取列举资源，在 HTTP 映射中往往将资源的所属资源名放到 URI 路径中，并且具有 `page_token` 与 `page_size` 用于翻页。

额外还能设计 `filter`([AIP-160](https://google.aip.dev/160)) 与 `order_by` 资源用于过滤资源与设定列表中的资源排序规则。

```protobuf
service BookApi {
    rpc ListBooks (ListBooksRequest) returns (ListBooksResponse) {
        option (google.api.http) = {
            get: "/v1/{parent=publishers/*}/books"
        };
        option (google.api.method_signature) = "parent";
    }
}

message ListBooksRequest {
    string parent = 1 [
        (google.api.field_behavior) = REQUIRED,
        (google.api.resource_reference) = {
            child_type: "library.googleapis.com/Book"
        }];

    // 每页元素个数，如果没有指定，默认为 100，最大为 1000，超过 1000 会强制设置为 1000。
    int32 page_size = 2;

    // 从上一个 ListBooks 获取的翻页 token，如果没有指定，则从第一页开始。
    string page_token = 3;
}

message ListBooksResponse {
    repeated Book books = 1;

    // 下一页的翻页 token，如果没有更多的数据，则为空。
    string next_page_token = 2;
}
```

### Create 接口

Create 接口用于创建资源，在 HTTP 映射中往往将资源的所属资源名放到 URI 路径中，并且将资源本身的信息放在请求体中，返回创建好的资源本身。

```protobuf
service BookApi {
    rpc CreateBook (CreateBookRequest) returns (Book) {
        option (google.api.http) = {
            post: "/v1/{parent=publishers/*}/books"
            body: "book"
        };
        option (google.api.method_signature) = "parent,book";
    }
}

message CreateBookRequest {
    string parent = 1 [
        (google.api.field_behavior) = REQUIRED,
        (google.api.resource_reference) = {
            child_type: "library.googleapis.com/Book"
        }];

    // The book to create.
    Book book = 2 [(google.api.field_behavior) = REQUIRED];
}
```

### Update 接口

Update 接口用于更新资源，在 HTTP 映射中往往将资源名放到 URI 路径中，并且将资源本身的信息放在请求体中，返回更新好的资源本身。

Update 接口还会包含一个 `update_mask` 字段，用于指示需要更新哪些资源的值。

```protobuf
service BookApi {
    rpc UpdateBook (UpdateBookRequest) returns (Book) {
        option (google.api.http) = {
            patch: "/v1/{book.name=publishers/*/books/*}"
            body: "book"
        };
        option (google.api.method_signature) = "book,update_mask";
    }
}

message UpdateBookRequest {
    // The book to update.
    //
    // The book's `name` field is used to identify the book to update.
    // Format: publishers/{publisher}/books/{book}
    Book book = 1 [(google.api.field_behavior) = REQUIRED];

    // The list of fields to update.
    google.protobuf.FieldMask update_mask = 2;
}
```

### Delete 接口

Delete 接口用于删除资源，在 HTTP 映射中往往将资源名放到 URI 路径中，返回空对象，在软删除的场景（[AIP-164](https://google.aip.dev/164)）可能会返回资源本身。

```protobuf
service BookApi {
    rpc DeleteBook (DeleteBookRequest) returns (google.protobuf.Empty) {
        option (google.api.http) = {
            delete: "/v1/{name=publishers/*/books/*}"
        };
        option (google.api.method_signature) = "name";
    }
}

message DeleteBookRequest {
    string name = 1 [
        (google.api.field_behavior) = REQUIRED,
        (google.api.resource_reference) = {
            type: "library.googleapis.com/Book"
        }];
}
```

### 自定义接口

此外还有很多动作并不能简单的由上述 5 种方法实现，在这种情况下可以参考 [AIP-136](https://google.aip.dev/136) 来自定义方法的实现。

针对批量请求的场景，还能参考 [AIP-231](https://google.aip.dev/231)，[AIP-233](https://google.aip.dev/233)，[AIP-234](https://google.aip.dev/234)，[AIP-235](https://google.aip.dev/235) 来设计批量处理接口。
