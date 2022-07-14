---
sidebar_position: 4
---

# 提供 HTTP Restful API

由于 gRPC 协议是基于 HTTP/2 协议，在某些环境下，特别是浏览器中，无法得到完整的 HTTP/2 支持，此时除了 gRPC 接口外，还应提供兼容的 HTTP 接口。

gRPC 接口转 HTTP 接口方案有很多，Sisyphus 采用并实现了 [Google AIP-127](https://google.aip.dev/127) 的 HTTP/gRPC Transcoding 标准，只需要在 proto
的 API 方法下加指定的 option 就可以自动支持 HTTP Restful API。

Sisyphus 底层采用标准的 Spring Webflux 实现 HTTP Transcoding，所有 Webflux 组件都可以用在 Transcoding 服务上，并且还能和原有的 Spring 深度集成。

```protobuf
service Book {
    rpc CreateBook (CreateBookRequest) returns (Book) {
        option (google.api.http) = {
            post: "/v1/{parent=publishers/*}/books"
            body: "book"
        };
    }
}

message CreateBookRequest {
    // 当使用 HTTP Transcoding 时，由于路径上包含 `{parent=publishers/*}` 
    // 这个字段会自动填充到路径上。
    string parent = 1 [
        (google.api.field_behavior) = REQUIRED,
        (google.api.resource_reference) = {
            child_type: "library.googleapis.com/Book"
        }];

    // 当使用 HTTP Transcoding 时，由于配置了 `body: "book"`，该字段会根据 HTTP 请求体填充
    Book book = 2 [(google.api.field_behavior) = REQUIRED];

    // 当使用 HTTP Transcoding 时，由于该字段既不包含在 URI 路径中，也不包含在 Body 中，
    // 该字段会采用类似 `?book_id=foo` Query 的方式填充。
    string book_id = 3;
}
```

在 build.gradle.kts 中加入 `sisyphus-grpc-transcoding-starter` 依赖。

```kotlin
dependencies {
    implementation("com.bybutter.sisyphus.starter:sisyphus-grpc-server-starter:1.4.0")
    implementation("com.bybutter.sisyphus.starter:sisyphus-grpc-transcoding-starter:1.4.0")
}
```

并在 Spring 的入口类上加上 `@EnableHttpToGrpcTranscoding` 注解。

```kotlin
@SpringBootApplication
@EnableHttpToGrpcTranscoding
class ShowcaseApplication
```

然后重启 gRPC 服务，在启动日志中可以看到除了 gRPC 的服务端口外，还能看见 8080 端口也被 Netty 监听。

```log
2022-07-05 01:03:03.634  INFO 39930 --- [           main] c.b.s.starter.grpc.ServerLifecycle       : Running gRPC server via netty on port: 7469
2022-07-05 01:03:03.644  INFO 39930 --- [           main] o.s.b.web.embedded.netty.NettyWebServer  : Netty started on port 8080
2022-07-05 01:03:03.648  INFO 39930 --- [           main] MainKt                                   : Started MainKt in 1.25 seconds (JVM running for 1.604)
```

:::tip [sisyphus.js](https://github.com/ButterCam/sisyphus.js)
**[sisyphus.js](https://github.com/ButterCam/sisyphus.js)** 是专为采用 AIP-127 标准的 gRPC API 提供的 JavaScript/TypeScript 运行时，可以与
Sisyphus 后端完美配合。  
并且，由于针对浏览器环境，**sisyphus.js** 也很意生成的文件大小，可以用最小的代码大小达到最方便的 API 调用方式。
:::