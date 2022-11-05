---
sidebar_position: 4
---

# HTTP Transcoding

Since the gRPC protocol is based on the HTTP/2 protocol, in some environments, especially in browsers, full HTTP/2
support is not available, so a compatible HTTP API should be provided.

Sisyphus uses and implements the HTTP and gRPC Transcoding standard from [Google AIP-127](https://google.aip.dev/127),
which only requires a specified option under the API method of the proto to automatically support HTTP Restful API.

Sisyphus uses Spring Webflux to implement HTTP Transcoding, and all Webflux components can be used in the Transcoding
service, and can also be integrated with existing Spring components.

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
    // Since the path contains `{parent=publishers/*}`, the `parent` field is automatically populated from that section.
    string parent = 1 [
        (google.api.field_behavior) = REQUIRED,
        (google.api.resource_reference) = {
            child_type: "library.googleapis.com/Book"
        }];

    // Since `body: "book"` is configured, this field will be populated based on the HTTP request body.
    Book book = 2 [(google.api.field_behavior) = REQUIRED];

    // Since the field is not included in the URI path nor in the Body, it is populated in a similar way to the `?book_id=foo` HTTP Query.
    string book_id = 3;
}
```

Add the `sisyphus-grpc-transcoding-starter` dependency to build.gradle.kts.

```kotlin
dependencies {
    implementation("com.bybutter.sisyphus.starter:sisyphus-grpc-server-starter:1.5.22")
    implementation("com.bybutter.sisyphus.starter:sisyphus-grpc-transcoding-starter:1.5.22")
}
```

And add the `@EnableHttpToGrpcTranscoding` annotation to the Spring entry class.

```kotlin
@SpringBootApplication
@EnableHttpToGrpcTranscoding
class ShowcaseApplication
```

Then restart the gRPC service, and you can see in the startup log that in addition to the gRPC service port, port 8080
is also being listened to by Netty.

```log
2022-07-05 01:03:03.634  INFO 39930 --- [           main] c.b.s.starter.grpc.ServerLifecycle       : Running gRPC server via netty on port: 7469
2022-07-05 01:03:03.644  INFO 39930 --- [           main] o.s.b.web.embedded.netty.NettyWebServer  : Netty started on port 8080
2022-07-05 01:03:03.648  INFO 39930 --- [           main] MainKt                                   : Started MainKt in 1.25 seconds (JVM running for 1.604)
```

:::tip [sisyphus.js](https://github.com/ButterCam/sisyphus.js)
**[sisyphus.js](https://github.com/ButterCam/sisyphus.js)**  is provided specifically for the gRPC API using the AIP-127
standard JavaScript/TypeScript runtime, which works perfectly with the Sisyphus backend.  
Moreover, since it is targeted at the browser environment, **sisyphus.js** also cares about the generated file size,
allowing the most convenient way to call the API with the smallest code size.
:::