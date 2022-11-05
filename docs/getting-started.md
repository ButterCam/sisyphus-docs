---
sidebar_position: 2
---

# Getting Started

Let's run a Sisyphus service in **five minutes**.

## Preparation

Start by cloning our example project [sisyphus-showcase](https://github.com/ButterCam/sisyphus-showcase).

```shell
git clone https://github.com/ButterCam/sisyphus-showcase.git
cd sisyphus-showcase
```

### Required Tools

- [JDK](https://www.azul.com/downloads/?package=jdk#download-openjdk) 17 or above

:::tip Tips

Any JDK version 17 or higher can be run, except for Azul Zulu, which is provided at the link.

:::

:::tip Tips

Use `java -version` to see the version of your JDK.

:::

## Run the Showcase Service

Once the JDK is configured, simply run `./gradlew bootRun` to start the service.

When the display shows `./gradlew` does not have permission to execute, you can use chmod +x to make `./gradlew` with
execute permission.

```shell
> ./gradlew bootRun
> zsh: permission denied: ./gradlew
> chmod +x gradlew
```

When you see a log like the one below, it means that the service has started and is listening on port 7469.

```log
2022-07-01 21:23:15.635  INFO 32159 --- [           main] c.b.s.starter.grpc.ServerLifecycle       : Running gRPC server via netty on port: 7469
2022-07-01 21:23:15.640  INFO 32159 --- [           main] MainKt                                   : Started MainKt in 0.825 seconds (JVM running for 1.11)
```

The first time you execute `bootRun`, the required dependencies are automatically downloaded, which may take some time,
so don't worry that the service will be ready in a few minutes.

## Project Structure

Next, use [Intellij IDEA](https://www.jetbrains.com/idea/download/) to create a project from existing code, select the
showcase folder, and choose Gradle from the imported modules option to import the Showcase project and start
development.

The Showcase project is a standard [Gradle](https://gradle.org/) project, with the project configuration in
the `settings.gradle.kt`s and `build.gradle.kts` files in the root directory.

:::tip Tips

IntelliJ IDEA Ultimate and IntelliJ IDEA Community can both be used to develop Sisyphus projects and there is no major
difference in functionality.

:::

### build.gradle.kts

For the Gradle plugin part, we used Kotlin, Spring and Sisyphus Protobuf.

```kotlin
plugins {
    kotlin("jvm") version "1.6.20" // Kotlin Jvm Plugin
    kotlin("plugin.spring") version "1.6.20" // Kotlin Spring Plugin，Automatically mark classes with @Configuration, @Service annotations as open
    id("org.springframework.boot") version "2.5.4" // Spring Boot Plugin
    id("com.bybutter.sisyphus.protobuf") version "1.5.22" // Sisyphus Protobuf Plugin
    idea
    application
}
```

In the dependencies section, just add `sisyphus-grpc-server-starter` and all related dependencies or configurations will
be configured automatically.

```kotlin
dependencies {
    implementation("com.bybutter.sisyphus.starter:sisyphus-grpc-server-starter:1.5.22")
    testImplementation(kotlin("test"))
}
```

### Proto

When the project is synchronized, the src/main/proto folder contains all the proto defined by the showcase service, and
the Sisyphus Protobuf plugin takes care of converting the proto files into Kotlin code.

Execute the `generateProtos` command in the Gradle Task window to generate Kotlin code for all proto files.

The generated code will be in the `build/generated/proto/source/main/` folder and will be included in the final
compilation of the Jar.

### Spring Application

showcase is also a standard Spring Boot application, so you can configure the application using the Spring Boot
configuration method.

All the service implementations marked by the `@RpcServiceImpl` annotation can be viewed in the `impl` package.

```kotlin
@RpcServiceImpl
class EchoImpl : Echo() {
}
```

The `Echo` class is generated from `service Echo {}` in `echo.proto`.

All methods are marked with the `suspend` keyword, which means that the entire service implementation supports Kotlin
concurrency.

## Development

You've already learned the basics of using Sisyphus, but check out
our [other tutorials and documentation](/docs/category/guides) for more features of Sisyphus.