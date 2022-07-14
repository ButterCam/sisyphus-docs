---
sidebar_position: 1
---

# 创建一个 Message 实体

Sisyphus 是专为在 Kotlin 中使用 Protobuf 而设计的，提供了一套简单易用的 DSL API 来构建 Message 实体。

```protobuf
message EchoResponse {
    string content = 1;

    Severity severity = 2;
}
```

上面的 proto 文件定义一个名为 `EchoResponse` 的 Message，接下来直接使用 `EchoResponse` DSL 创建一个 `EchoResponse` 实体。

```kotlin
val response = EchoResponse {
    this.content = input.content
    this.severity = input.severity
}
```

只需要在 Message 类型后面使用大括号，即可构建一个 Message，在 `{}` 代码块中可以自由设置属性。

:::info 找不到 EchoResponse 类型？

尝试在 Gradle Task 窗口执行一下 `generateProtos` 生成所有的 Kotlin 代码。

:::

## 消息的不可变类型与可变类型

Sisyphus 为所有消息提供了两种访问接口，例如上述例子中，Sisyphus 会为 `EchoResponse` 消息生成两个接口，
分别是 `EchoResponse` 与 `MutableEchoResponse`。

`EchoResponse` 为不可变接口，是访问 Protobuf 消息的基本入口，一般情况下我们只需要 import 此接口即可。

`MutableEchoResponse` 为可变接口，一般情况下会被各种消息 DSL 所隐藏，会放在特殊的 `internal` 包中。

```kotlin
EchoResponse { // this: MutableEchoResponse
    this.content = input.content
    this.severity = input.severity
}
```

例如上面的例子中，在 `EchoResponse` DSL 展开的代码域中，提供了 `MutableEchoResponse` 访问。

当消息脱离创建消息 DSL 代码域之后，就是不可变访问。关于可变与不可变访问的优点，可以参考 Kotlin 的 var 与 val 设计。

## 为消息重新赋值

消息创建好了之后，可以通过 `invoke` DSL 重新展开 `MutableEchoResponse` 代码域。

```kotlin
val response = EchoResponse {
    this.content = input.content
    this.severity = input.severity
}
val newResponse = response.invoke { // 也可以省略成 response {
    this.content = "new content"
}
```

:::danger 注意

但是值得注意的是，在 `invoke` DSL 会创建一个新的 Message 实体，而并非在原来的实体上赋值。

```kotlin
response !== newResponse // response 与 newResponse 并不是同一个对象
```

:::