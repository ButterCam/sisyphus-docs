---
sidebar_position: 1
---

# 介绍

⚡️ Sisyphus 可以帮助你快速打造云原生现代化的后端服务。

🏗 微服务的维护与调试需要大量的人力资源。Sisyphus 采用宏服务的设计思想，在项目初期仅需要专注于业务逻辑，而在业务膨胀的后期也能轻松拆封为微服务。

📓 遵循 [Google API 设计指南](https://google.aip.dev/)，手把手教你构建健壮而具有拓展性的 API。

💥 想深入了解吗？ 来试试包括服务反射、Swagger 集成、服务监控、SQL Builder DSL 在内的进阶功能特性吧！

🧐 Sisyphus 本质上是一个基于 Spring Boot 与 Kotlin 构建的 gRPC 服务框架，采用 Kotlin Coroutine 技术来构建异步 API。

# 特性

Sisyphus 从设计之初就极度重视开发者的体验，帮助你从枯燥的业务中解脱出来。

- 🥄 **用 ❤️ 与 Kotlin 联合打造**
  - 与啰嗦的 Java 语法说再见，使用更高效的 Kotlin 语言开发
  - 拥抱 Java 社区，100% 兼容纯 Java 的类库
  - 采用协程技术编写高性能且十分易读的业务逻辑
- 🧗‍ **融入 Protobuf/gRPC 生态**
  - Kotlin 专用的 Protobuf 编译器，使 Protobuf 无缝融入 Kotlin 的语言系统
  - 支持 Sisyphus 的 [Intellij Protobuf Plugin](https://github.com/devkanro/intellij-protobuf-plugin)，帮助你快速编写
    Protobuf 文件
  - gRPC 上的 Charles，[Mediator](https://github.com/ButterCam/Mediator) 代理工具能够帮助你调试 gRPC 服务
  - 极简的 gRPC Web 客户端 [sisyphus.js](https://github.com/ButterCam/sisyphus.js) 帮你快速融入浏览器生态
- 🗺 **遵循 [Google API 设计指南](https://google.aip.dev/)**
  - 当对 API 设计犹豫不决时，随时翻阅 Google API 设计指南
  - 提供标准 HTTP Transcoding 访问接口，一次同时实现 gRPC 与 Restful 接口
- ☁️ **原生微服务架构**
  - 微服务与宏服务随意拼装，保留微服务特性的同时，也包含单体应用的优点
  - 部署插件一键部署到 K8s 环境
  - Docker 插件支持使用 Spring Boot 分层 Jar 包进行分层构建，优化镜像体积
- 👬 **对开发者友好**
  - 最少的配置干最多的事情
  - 使用可随时编辑的 gradle.properties 来配置开发环境
  - 使用可分发的 Config Artifacts 来配置运行环境

# 缺点什么？

如果你发现文档存在问题，或者有改进文档或项目的建议，请向我们[提 issue](https://github.com/ButterCam/sisyphus-docs/issues/new)。
