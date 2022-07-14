---
sidebar_position: 1
---

# Introduce

⚡️ Sisyphus 可以帮你快速开始开发一个新的 gRPC 服务。

📓 遵循 [Google API 设计指南](https://google.aip.dev/)，手把手教你构建健壮而具有拓展性的 API。

🏔 几乎在所有场景都能提供最佳实践，避免走弯路。

💥 想深入了解吗？ 来试试包括服务反射、Swagger 集成、服务监控、SQL Builder DSL 在内的进阶功能特性吧！

🧐 Sisyphus 是一个基于 Spring Boot 与 Kotlin 构建的 gRPC 服务框架，采用 Kotlin Coroutine 技术来构建异步 API。

# 特性

Sisyphus 从设计之初就极度重视开发者的体验，帮助你从枯燥的业务中解脱出来。

- 🥄 **用 ❤️ 与 Kotlin 联合打造**
    - 与啰嗦的 Java 语法说再见，使用更高效的 Kotlin 语言开发
    - 拥抱 Java 社区，100% 兼容纯 Java 的类库
    - 采用协程技术编写高性能且十分易读的业务逻辑
- 🧗‍ **融入 Protobuf/gRPC 生态**
    - 专为 Kotlin 生成代码，使 Protobuf 无缝融入 Kotlin 的语言系统
    - 集成了 Sisyphus 的 [Intellij Protobuf Plugin](https://github.com/devkanro/intellij-protobuf-plugin)，帮助你快速编写 Protobuf
      文件
    - 用于调试 gRPC 请求的 [Mediator](https://github.com/ButterCam/Mediator) 代理工具，能够在 gRPC 上也能或得到传统 API 的调试便利性
    - 极简的 gRPC 客户端 [sisyphus.js](https://github.com/ButterCam/sisyphus.js) 帮你快速融入浏览器生态
- 🗺 **遵循 [Google API 设计指南](https://google.aip.dev/)**
    - 当对 API 设计犹豫不决时，随时翻阅 Google API 设计指南
    - 提供标准 HTTP Transcoding 访问接口，一次同时实现 gRPC 与 Restful 接口
- ☁️ **原生微服务架构**
    - 微服务与宏服务随意拼装，保留微服务特性的同时，也包含单体应用的优点
    - 部署插件一键部署到 K8s 环境
- 👬 **对开发者友好**
    - 最少的配置干最多的事情，避免使用环境变量来配置环境
    - 使用可编辑的 gradle.properties 来配置开发环境
    - 使用可分发的 Config Artifacts 来配置运行环境

# 缺点什么？

如果你发现文档存在问题，或者有改进文档或项目的建议，请向我们[提 issue](https://github.com/ButterCam/sisyphus-docs/issues/new)。
