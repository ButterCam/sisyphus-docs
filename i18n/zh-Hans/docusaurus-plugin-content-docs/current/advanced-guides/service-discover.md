---
sidebar_position: 3
---

# 服务发现

我们已经知道了 **Service** 之间调用，而是通过依赖 **Schema** 实现。Sisyphus 会自动发现本地的服务与 k8s 集群中的服务并创建客户端 Bean。

## 本地服务发现

由于一个 **Application** 可能包含多个 **Service**，当同一个 **Application** 中的 **Service** 之间相互调用时，Sisyphus 使用本地服务发现机制来处理这些请求。

Sisyphus 会自动为 Spring 上下文中包含的所有由 `@RpcServiceImpl` 注解标记的类创建对应的 gRPC 客户端，只需要使用 `@Autowire` 即可注入对应的客户端。

```kotlin
@Autowire
lateinit var userApi: UserApi.Client
```

这些客户端通过内置的 `InProcessServer` 链接，不会有额外的网络通信损耗，同时每次调用也是一次完整的 gRPC 调用，也会经过序列化，配置的拦截器等等，这保持了调用本地服务和外部服务的一致性。

## k8s 服务发现

此外，如果依赖中具有 `sisyphus-grpc-client-kubernetes` 包，Sisyphus 还会自动在运行环境所在的 k8s 集群中自动发现别的服务，并创建对应的客户端。

Sisyphus 会尝试在同 namespace 中查找带有类似 `sisyphus/google.rpc.showcase.Echo` 标签的 Service，并将其值当作访问接口来创建客户端。

同样的，也只需使用 `@Autowire` 注解就能注入对应的客户端。

```kotlin
@Autowire
lateinit var userApi: UserApi.Client
```

## 其他实现

在将来，Sisyphus 会添加更多像 Eureka，Zookeeper，Spring Cloud 等流行的开源注册中心的支持来实现更智能的服务发现。