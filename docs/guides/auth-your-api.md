---
sidebar_position: 3
---

# Auth your API

Sisyphus 在构建 gRPC 服务的时候，会将 Spring 上下文中的所有 `ServerInterceptor` 都加入其中。

可以通过任何 Spring 所支持的方式创建一个 `ServerInterceptor` Bean 来实现自定义的验证。

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

:::caution 注意

由于 `ServerInterceptor` 不由 Sisyphus 管理，所以在这里需要使用 `io.grpc.StatusException`。

:::
