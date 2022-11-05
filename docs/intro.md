---
sidebar_position: 1
---

# Introduce

⚡️ Sisyphus can help you quickly build cloud-native modern backend services.

🏗 Sisyphus uses a 'macroservices' design philosophy, which allows you to focus on business logic at the beginning of a
project and easily unpack it into microservices at a later stage of business expansion.

📓 Follow the [Google API Improvement Proposals](https://google.aip.dev/) for a handy guide to building robust and
extensible APIs.

💥 Ready for more? Use advanced features like Service Reflection, Swagger Integration, Service Monitoring, SQL Builder
DSL and more!

🧐 Sisyphus is essentially a gRPC service framework built on Spring Boot and Kotlin, using Kotlin Coroutine technology to
build asynchronous APIs.

# Features

Sisyphus has been designed from the ground up with a strong focus on the developer experience, helping you take a break
from the tedium of business code.

- 🥄 **Built with ❤️ and Kotlin**
  - Develop with the more efficient Kotlin language
  - Embrace the Java community, 100% compatibility with Java libraries
  - Write high performance and very readable business logic using Kotlin concurrency techniques
- 🧗‍ **Integration into the Protobuf/gRPC ecosystem**
  - Kotlin-specific Protobuf compiler to seamlessly integrate Protobuf into the Kotlin language system
  - [Intellij Protobuf Plugin](https://github.com/devkanro/intellij-protobuf-plugin), which supports the Sisyphus
    framework, helps you write Protobuf files quickly
  - Charles on gRPC, the [Mediator](https://github.com/ButterCam/Mediator) proxy tool can help you debug gRPC services
  - The minimalist gRPC client for Web [sisyphus.js](https://github.com/ButterCam/sisyphus.js) helps you quickly
    integrate into the browser
- 🗺 **Follow the [Google API Improvement Proposals](https://google.aip.dev/)**
  - When on the fence about API design, feel free to turn to the Google API Improvement Proposals
  - Provides HTTP and gRPC Transcoding implementation, implementing both gRPC and beautiful Restful API at once
- ☁️ **Native microservices**
  - Microservices and Macroservices can be assembled at will, retaining the features of microservices while including
    the benefits of monolithic applications
  - Deployment Plugin One-Click Deployment to K8s Environment
  - Docker plugin supports layered builds using Spring Boot layered Jar to optimize image size
- 👬 **Developer Friendly**
  - Doing the most with the least configuration
  - Configure the development environment using the readily editable gradle.properties
  - Configure the runtime environment using the distributable Config Artifacts Jar

# Something missing?

If you find issues with the documentation or have suggestions on how to improve the documentation or the project in
general, please [file an issue](https://github.com/ButterCam/sisyphus-docs/issues/new)。
