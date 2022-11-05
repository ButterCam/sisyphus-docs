---
sidebar_position: 2
---

# Implement a gRPC API

All gRPC APIs are defined by `service` and `rpc` in the proto file, and these definitions will be generated as Kotlin
code by the Sisyphus Protobuf plugin.

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

In our code we simply add a class and extends the generated abstract class and then hit the `@RpcServiceImpl`
annotation.

```kotlin
@RpcServiceImpl
class EchoImpl : Echo() {
    override suspend fun Echo(request: EchoRequest): EchoResponse {
        TODO("not implemented")
    }
}
```

## `generateProtos` Task

Earlier we introduced the `generateProtos` Gradle task, which generates Kotlin code for all proto files.

Any compilation operation depends on the corresponding `generateProtos` task, so when the `build` task is executed, the
proto file is also generated automatically.

However, we still need to execute `generateProtos` manually when the code does not compile properly with incomplete
Kotlin.

:::info Note

When the proto file has changed, or when you can't find an element in the proto, just execute `generateProtos`!

:::

## Throwing Exceptions

Feel free to throw a `StatusException` in the gRPC implementation, and Sisyphus will correctly convert this exception to
a gRPC error response.

```kotlin
import com.bybutter.sisyphus.rpc.StatusException

throw StatusException(Code(it.code), it.message).withDetails(it.details)
```

StatusException` has a number of util functions to provide more information about errors, and the standards for these
error
messages [predefined by Google](https://github.com/googleapis/api-common-protos/blob/main/google/rpc/error_details.proto)
, and Sisyphus implements these.

:::caution Caution

When using `StatusException`, note that it is imported under the `com.bybutter.sisyphus.rpc` package, not the `io.grpc`
package. `io.grpc.StatusException` provides the most basic information for exception, and although Sisyphus can handle
it, it is not recommended because it does not support additional information.

:::

## Implement echo API

Knowing how to create a Message and throw an exception, we can properly implement the `Echo.echo` API.

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

The above example is the simplest gRPC API that converts the content in `EchoRequest` to the content in `EchoResponse`.

If the `EchoRequest` contains an error, a `StatusException` is thrown to display the error.
