---
sidebar_position: 2
---

# 快速开始

让我们在**五分钟内运行一个 Sisyphus gRPC 服务**。

## 准备工作

从克隆我们的示例项目 [sisyphus-showcase](https://github.com/ButterCam/sisyphus-showcase) 开始。

```shell
git clone https://github.com/ButterCam/sisyphus-showcase.git
cd sisyphus-showcase
```

### 需要的工具

- [JDK](https://www.azul.com/downloads/?package=jdk#download-openjdk) 11 或者以上

:::tip 提示

除了链接提供的 Azul Zulu 外，任何 JDK 11 版本以上都可以运行。

:::

:::tip 提示

使用 `java -version` 查看您的 JDK 版本。

:::

## 运行 Showcase 服务

配置好 JDK 后，只需要运行 `./gradlew bootRun` 就可以启动服务。

当显示 `./gradlew` 没有权限执行时，可以使用 chmod +x 来让 `./gradlew` 拥有执行权限。

```shell
> ./gradlew bootRun
> zsh: permission denied: ./gradlew
> chmod +x gradlew
```

当看到下面这样的日志时，表示服务已经启动并监听了 7469 端口。

```log
2022-07-01 21:23:15.635  INFO 32159 --- [           main] c.b.s.starter.grpc.ServerLifecycle       : Running gRPC server via netty on port: 7469
2022-07-01 21:23:15.640  INFO 32159 --- [           main] MainKt                                   : Started MainKt in 0.825 seconds (JVM running for 1.11)
```

第一次执行 `bootRun` 时，会自动下载所需的依赖，这可能需要一些时间，不用担心服务会在几分钟后准备就绪。

## 项目结构

接下来，使用 [Intellij IDEA](https://www.jetbrains.com/idea/download/) 从已有的代码创建工程，选择 showcase 文件夹，在导入的模块选项中选择 Gradle 即可导入 Showcase 项目开始开发。

Showcase 项目是一个标准的 [Gradle](https://gradle.org/) 工程，工程配置都在根目录下的 `settings.gradle.kt`s 与 `build.gradle.kts` 文件中。

:::tip 提示

IntelliJ IDEA Ultimate 与 IntelliJ IDEA Community 都可以用于开发 Sisyphus 项目，并没有什么太大的功能区别。

:::

### build.gradle.kts

在 Gradle 插件的部分，我们使用了 Kotlin、Spring 与 Sisyphus Protobuf。

```kotlin
plugins {
    kotlin("jvm") version "1.6.20" // Kotlin 基础插件
    kotlin("plugin.spring") version "1.6.20" // Kotlin Spring 插件，将 @Configuration，@Service 等自动标记为 open
    id("org.springframework.boot") version "2.5.4" // Spring Boot 插件
    id("com.bybutter.sisyphus.protobuf") version "1.4.0" // Sisyphus Protobuf 插件
    idea
    application
}
```

在依赖的部分，只需要加入 `sisyphus-grpc-server-starter` 即可，所有相关的依赖或者是配置都会自动配置好。

```kotlin
dependencies {
    implementation("com.bybutter.sisyphus.starter:sisyphus-grpc-server-starter:1.4.0")
    testImplementation(kotlin("test"))
}
```

### Proto 文件夹

当同步完工程后，在 src/main/proto 文件夹里，包含了 showcase 服务定义的所有 proto，Sisyphus Protobuf 插件会负责将 proto 文件转化为 Kotlin 代码。

在 Gradle Task 窗口执行 `generateProtos` 命令就可以生成所有 proto 文件的 Kotlin 代码。

生成后的代码会在 `build/generated/proto/source/main/` 文件夹中，最后编译成 Jar 包时也会一并包含在内。

### Spring Application

showcase 也是一个标准的 Spring Boot 应用，所以可以使用 Spring Boot 的配置方式来配置应用。

在 `impl` 包中可以查看所有由 `@RpcServiceImpl` 注解标记的服务实现。

```kotlin
@RpcServiceImpl
class EchoImpl : Echo() {
}
```

`Echo` 类就是由 `echo.proto` 中的 `service Echo {}` 生成的。

可以看到所有的方法都有 `suspend` 关键字所标记，这意味着整个服务的实现都支持 Kotlin 协程。

## 深入开发

你已经了解了 Sisyphus 的基本使用方法了，接下来查看我们[其他的教程以及文档](/docs/category/指南)，可以更加深入的了解更多 Sisyphus 的高级功能。