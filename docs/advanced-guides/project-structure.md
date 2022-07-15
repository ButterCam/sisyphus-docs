---
sidebar_position: 1
---

# Project structure

Sisyphus 推荐采用**宏服务**架构： **Schema** / **Component** / **Middleware** / **Service** / **Application**
来组织工程结构，这样可以更加方便的管理工程，并且可以更加灵活的添加新的组件。

## 微服务与宏服务

**微服务**是一种架构，它可以将一个应用程序分割成多个服务，每个服务都可以独立运行，而不会影响其他服务。

微服务具有较高的可扩展性，可替代性，敏捷性等等优点，但也有具有比较复杂的服务间通信，更多的维护成本，更难的测试环节。

并且在项目初期就能全面的划分微服务边界是十分具有挑战性的，而到了项目后期，再切换成为微服务架构，也是一件耗时耗力的事情。

为此，Sisyphus 提出**宏服务**的概念，将微服务隐藏在宏服务的里面，并且仍然保持微服务之间只依赖接口的特性。

想象一下，我们将微服务当作逻辑与功能单元，我们可以把这些单元组装成具体的宏服务，在这个架构中，我们最小的部署的单元是宏服务，微服务本身则是不可部署也无法运行的逻辑单元。

那么我们可以在服务发展与迭代的过程中随意的组合宏服务，可能在项目的一开始，我们将所有的微服务单元都放入一个宏服务中部署，这样我们就能得到一个传统的单体应用。  
而随着项目的迭代，我们将这个单体应用包含的微服务逐渐的分离出去，创建一个新的宏服务用于部署。

这就是 Sisyphus 的核心思想，大多数 Sisyphus 组件都是围绕着这一点设计的。

## Application 宏服务

Sisyphus 要求宏服务是**可执行的**，但**不是含有逻辑的**，一个标准的宏服务应该只包含一些配置文件，例如 `application.yaml`，和一个 Spring Boot Main 函数。

所有的业务逻辑都应该由加入 **Application** 依赖中的 **Component** 与 **Service** 实现。

宏服务作为一个 Spring Boot 应用，会自动载入 **Component** 与 **Service** 中的 Spring 组件。

例如：如果我们的宏服务要包含用户服务，那么我们可以把提供用户服务的 `UserService` 添加到依赖中。如果还需要包含内容服务，也将提供内容服务的 `ContentSerivce` 加入到依赖中。  
当启动这个宏服务时，它就会同时提供 `UserService` 与 `ContentService` 两项服务。

## Service 微服务

所有的 **Service** 之间都**不允许**互相依赖，这样能够保证单个微服务都能被封装为一个单独的宏服务部署。

**Service** 之间的依赖关系应该由 **Schema** 提供，例如 `ContentService` 需要调用 `UserService` 的接口，但是并**不允许**直接依赖 `UserService` 本身，**应该依赖**于 `UserServiceSchema`。

这样的话，我们能最大程度的保留微服务的特性，例如我们计划对 `UserService` 进行底层重构，但是并不修改接口定义，我们只需要实现一个 `UserServiceV2`，并且把它替换宏服务中的 `UserService` 就可以完成部署。

## Schema 服务接口

**Schema** 是服务的接口，也是我们编写 proto 并生成代码的组件，在 Schema 中，**应该只包含**针对 proto 的工具类与工具函数，**不允许包含业务逻辑**。

所有的 **Service** 应该都具有自己的 **Schema** 组件，并实现它。当服务相互调用时，应该也是通过 **Schema** 服务接口来调用。

## Middleware 中间件

**Middleware** 是包含配置和中间件驱动的组件，Sisyphus 要求开发者将各种外部中间件都封装为一个 **Middleware** 组件，方便各个微服务调用。

例如，我们可以把数据库封装成一个 **Middleware** 组件，当 `UserService` 需要链接数据库时，只需要将指定的 **Middleware** 加入依赖中，并使用 `@Qualifier` 注解指定连接的数据库示例，就可以开始使用。

为了达到这个目的，**Middleware** 应该包含或读取 **Config Artifact** 的配置与初始化数据库驱动的代码。

Sisyphus 本身提供了很多 **Middleware** 的通用初始化逻辑，例如 Mysql，Redis，ElasticSearch 等等，只需要使用这些包就能快速构建一个 **Middleware** 组件。

## Component 组件

**Component** 是一系列 Spring 组件的合集，包含边缘业务逻辑，或者提供业务逻辑的抽象工具，例如 API 认证可以被抽象为一个 **Component**，日志与统计组件也能被抽象为一个 **Component**。

## Config Artifact 配置

**Middleware** 可能包含配置，但是对于更加复杂的场景下或者由于权限的要求，将配置写在 **Middleware** 中并不是一个好的办法。

**Config Artifact** 就是专门用来储存配置的 jar 包，这些 jar 包会被推送到私有的 maven 仓库中，并由 **Middleware** 来读取。

可以通过私有的 maven 仓库负责对 jar 的权限管理，这些 jar 包还能被分割为多个环境。

**Config Artifact** **不应该**包含任何 Java 或者 Kotlin 代码，应该**仅包含配置文件**，例如 `mysql.yml`。

Sisyphus 提供了 [sisyphus-configuration-artifact](https://github.com/ButterCam/sisyphus/tree/master/middleware/sisyphus-configuration-artifact) 组件，可以在应用启动时下载指定的 Config Artifact 并加入到 ClassPath 中。这是用于取代各种配置中心的轻量级解决方案。