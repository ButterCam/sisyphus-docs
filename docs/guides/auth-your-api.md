---
sidebar_position: 3
---

# Auth your API

Sisyphus adds all the `ServerInterceptors` in the Spring context when building the gRPC service.

A `ServerInterceptor` bean can be created to implement custom validation in any way Spring supports.

```kotlin
@Component
class AuthInterceptor : ServerInterceptor {
    private val key = Metadata.Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER)

    override fun <ReqT : Any?, RespT : Any?> interceptCall(
        call: ServerCall<ReqT, RespT>,
        headers: Metadata,
        next: ServerCallHandler<ReqT, RespT>
    ): ServerCall.Listener<ReqT> {
        val auth = headers.get(key)
        if (auth != "Bearer MyToken") {
            throw io.grpc.StatusException(Status.UNAUTHENTICATED)
        }
        return next.startCall(call, headers)
    }
}
```

:::caution Caution

Since `ServerInterceptor` is not managed by Sisyphus, you need to use `io.grpc.StatusException` here.

:::
