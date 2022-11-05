---
sidebar_position: 3
---

# Service Discover

We already know that invoking of **Service** is implemented by **Schema**.

Sisyphus automatically discovers local services with services in the k8s cluster and creates client beans.

## Local Service Discovery

Since an **Application** may contain multiple **Services**, Sisyphus uses the local service discovery mechanism to
handle these requests when **Services** within the same **Application** call each other.

Sisyphus automatically creates corresponding gRPC clients for all classes contained in the Spring context marked by
the `@RpcServiceImpl` annotation, and only needs to use `@Autowire` to inject the corresponding clients.

```kotlin
@Autowire
lateinit var userApi: UserApi.Client
```

These clients are linked via the built-in ``InProcessServer``, there is no additional network communication loss, and
each call is also a full gRPC call that also goes through serialization, configured interceptors, etc. This maintains
consistency between calls to the local service and the external service.

## Service discovery in k8s cluster

In addition, if the `sisyphus-grpc-client-kubernetes` package added to the dependencies of application, Sisyphus will
also automatically discover other services in the k8s cluster where the runtime environment is located and create the
corresponding client.

Sisyphus will try to find a Service with a tag like `sisyphus/google.rpc.showcase.Echo` in the same namespace and use
its value as the access interface to create the client.

Similarly, the corresponding client can be injected simply by using the `@Autowire` annotation.

```kotlin
@Autowire
lateinit var userApi: UserApi.Client
```

## Other implementations

In the future, Sisyphus will add support for more popular open source registries like Eureka, Zookeeper, Spring Cloud,
etc. to enable smarter service discovery.