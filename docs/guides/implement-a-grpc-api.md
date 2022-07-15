---
sidebar_position: 2
---

# Implement a gRPC API

所有的 gRPC 接口都由 proto 文件中的 `service` 与 `rpc` 定义，这些定义将会被 Sisyphus Protobuf 插件生成为 Kotlin 代码。

```protobuf
service Echo {
    rpc Echo (EchoRequest) returns (EchoResponse) {
        option (google.api.http) = {
            post: "/v1beta1/echo:echo"
            body: "*"
        };
    }
}
```

在我们的业务中只需要简单的添加一个类，并集成自生成的抽象类，然后打上 `@RpcServiceImpl` 注解即可。

```kotlin
@RpcServiceImpl
class EchoImpl : Echo() {
    override suspend fun Echo(request: EchoRequest): EchoResponse {
        TODO("not implemented")
    }
}
```

## `generateProtos` 任务

在前面我们介绍了 `generateProtos` Gradle 任务，它会为所有的 proto 文件生成 Kotlin 代码。

任何编译操作都依赖于相应的 `generateProtos` 任务，所以当执行 `build` 任务时，proto 文件也会自动生成。

但是在代码不完全 Kotlin 无法正常编译的时候，我们还是需要手动执行 `generateProtos`。 

:::info 提示

当 proto 文件发生了变更，或者找不到 proto 中的元素时，就执行 `generateProtos` 吧！

:::

## 抛出异常

可以在 gRPC 的实现中随意的抛出 `StatusException`，Sisyphus 会正确的将此异常转换为 gRPC 的错误响应。

```kotlin
import com.bybutter.sisyphus.rpc.StatusException

throw StatusException(Code(it.code), it.message).withDetails(it.details)
```

`StatusException` 具有很多方便的函数，可以提供更多的错误信息，这些错误信息的标准[由 Google 预定义](https://github.com/googleapis/api-common-protos/blob/main/google/rpc/error_details.proto)，Sisyphus 实现了这些标准。

:::caution 注意

使用 `StatusException` 时，注意导入的是 `com.bybutter.sisyphus.rpc` 包下的，而不是 `io.grpc` 包。`io.grpc.StatusException` 提供的是最基础的异常类，虽然 Sisyphus 也能够处理，但是因为不支持额外的信息，所以不推荐使用。

:::

## 实现 echo API

了解了如何创建 Message 与抛出异常，我们就能正确的实现 `Echo.echo` API 了。

```kotlin
override suspend fun echo(input: EchoRequest): EchoResponse {
    input.error?.let {
        throw StatusException(Code(it.code), it.message)
            .withDetails(it.details)
    }
    return EchoResponse {
        this.content = input.content
        this.severity = input.severity
    }
}
```

上面这个例子是最简单的 gRPC API，会将 `EchoRequest` 中的内容转换为 `EchoResponse` 中的内容。

如果 `EchoRequest` 中包含一个错误，则会抛出 `StatusException` 来展示这个错误。