---
slug: new-docker-plugin
title: 全新的 Docker 插件
authors: [higan]
tags: [docker, sisyphus-project-plugin, gradle, release]
---

在 Sisyphus 1.5.20 中，我们对 Docker 插件进行了进一步地优化，使其更加易用。

涉及到更改基础 Docker 插件、自动生成 Dockerfile 和支持 Spring 分层构建几项主要调整。

<!--truncate-->

## 事情起因

我们一直都是使用 Github Action 来作为我们的 CI 工具，在创建 PullRequest 的时候，CI 会自动编译出 SNAPSHOT 版本镜像用于部署测试环境。在
PR 合并之后，CI 则会编译出带有分支名的 SNAPSHOT 版本用于部署 beta 环境。而最后创建 Release 时，才会真正编译出最终的部署镜像。

可见在整个流程中，我们需要构建三次镜像，每次构建都需要 40 分钟左右，从提出 PR 到最后的发版上线可能需要接近两个小时的时间。

而且由于最近 CI 流水线资源占用的问题，我们的后端服务一次构建过程已经到了需要三个小时的程度，所以在 CI
流水线资源问题解决之前，我们只能尽力优化我们的 CI 流程。

## 优化过程

首先，在实际使用过程中，PR 构建出的 SNAPSHOT 版本镜像一般都没用上，大多数情况都是使用开发者本地构建的镜像部署测试环境，所以我们可以去掉
PR 的镜像构建步骤，只进行代码检查。

其次，针对每个分支构建的 SNAPSHOT 版本与最后发版时的 RELEASE
版本其实内容是一样的，但是由于编译环境的微妙区别，导致编译过程没办法缓存下来，每次发版还是需要把分支的构建过程重新运行一次。所以针对这个地方，我们打算复用之前分支更新时所编译出来的镜像。

在之前的版本中，我们使用 [palantir/gradle-docker](https://github.com/palantir/gradle-docker) 作为我们的基础 Docker
插件，我们也为其优化了 tag 任务的设计。

但是在这次优化过程中，我们发现了他的一些不足，比如没有 docker save 操作，也没有能方便获取当前构建镜像 ID 的方式。

所以我们将基础 Docker
插件切换到了提供更多底层操作能力的 [bmuschko/gradle-docker-plugin](https://github.com/bmuschko/gradle-docker-plugin)。

## Dockerfile 自动化与 Spring 分层构建

在之前的使用中，我们的 Dockerfile 是手动编写的，而新的 Docker 插件提供了自动生成 Dockerfile 的能力，因此我们打算通过插件自动生成
Dockerfile。

在之前，我们的 Dockerfile 是按照 Spring Boot 的 Layered Jar 的分层编写的，大概是这个样子：

```dockerfile
FROM amazoncorretto:17 as builder
ARG PROJECT_NAME
ARG PROJECT_VERSION
ENV PROJECT_NAME=$PROJECT_NAME
ENV PROJECT_VERSION=$PROJECT_VERSION

COPY "${PROJECT_NAME}-${PROJECT_VERSION}.jar" application.jar
RUN java -Djarmode=layertools -jar application.jar extract

FROM --platform=linux/amd64 amd64/amazoncorretto:17

ARG PROJECT_NAME
ARG PROJECT_VERSION
ENV PROJECT_NAME=$PROJECT_NAME
ENV PROJECT_VERSION=$PROJECT_VERSION

COPY --from=builder dependencies/ ./
RUN true
COPY --from=builder spring-boot-loader/ ./
RUN true
COPY --from=builder sisyphus-dependencies/ ./
RUN true
COPY --from=builder butter-dependencies/ ./
RUN true
COPY --from=builder snapshot-dependencies/ ./
RUN true
COPY --from=builder application/ ./

ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
```

Spring Boot 2.3
中加入了 [Layered Jar](https://spring.io/blog/2020/08/14/creating-efficient-docker-images-with-spring-boot-2-3)
的支持，可以将各种依赖包与应用程序包进行分层，我们将这个特性用在了 Dockerfile
中，我们将不同的依赖按照更新频率进行分层，把不经常更新的依赖放入底层，经常更新的依赖放入顶层，这样当我们只升级了经常变化的组件时，可以复用之前的底层镜像，从而加快了镜像构建的速度。

所以我们使用了 Docker 的 builder 模式，在一个临时 Docker 中对 Layered Jar 进行分层解压，然后将解压出来的各个层按照层级顺序复制到最终的镜像中。

```kotlin
tasks.withType<BootJar> {
   layered {
      application {
         intoLayer("spring-boot-loader") {
            include("org/springframework/boot/loader/**")
         }
         intoLayer("application")
      }
      dependencies {
         intoLayer("snapshot-dependencies") {
            include("*:*:*SNAPSHOT")
         }
         intoLayer("sisyphus-dependencies") {
            include("com.bybutter.sisyphus.*:*:*")
         }
         intoLayer("butter-dependencies") {
            include("com.bybutter.*:*:*")
         }
         intoLayer("dependencies")
      }
      layerOrder = listOf(
         "dependencies",
         "spring-boot-loader",
         "sisyphus-dependencies",
         "butter-dependencies",
         "snapshot-dependencies",
         "application"
      )
   }
}
```

在上面的配置中，我们大概把代码分成了 6 层：

1. dependencies  
   这一层包含了所有的第三方依赖。
2. spring-boot-loader  
   这一层包含了 Spring Boot 的启动器。
3. sisyphus-dependencies  
   这一层包含了所有 Sisyphus 的依赖，Sisyphus 经常由于业务上的需要，也会做一些迭代升级，所以将其从普通依赖中分离出来。
4. butter-dependencies  
   这一层包含了我们的所有内部依赖，和业务密切相关。
5. snapshot-dependencies  
   这一层包含了所有的 SNAPSHOT 版本依赖，作为快照版本，在开发过程中可能就会发生变化。
6. application  
   这一层包含了业务代码，是更新频率最大的层级。

新的 Sisyphus Docker 插件会自动从 bootJar 任务中读取分层信息，并生成一个分层解压的任务将 bootJar 分层解压到 Docker
构建的工作目录。

然后通过 dockerfile 任务生成出构建时需要的 Dockerfile。

```dockerfile
ARG PROJECT_NAME
ARG PROJECT_VERSION
FROM amazoncorretto:17
ENV PROJECT_NAME=$PROJECT_NAME
ENV PROJECT_VERSION=$PROJECT_VERSION
COPY dependencies/ ./
RUN true
COPY spring-boot-loader/ ./
RUN true
COPY sisyphus-dependencies/ ./
RUN true
COPY butter-dependencies/ ./
RUN true
COPY snapshot-dependencies/ ./
RUN true
COPY application/ ./
RUN true
ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
```

## 优化 CI 流水线

新的 Docker 插件在编译时会自动生成包含镜像 ID 的文件，我们在构建分支 SNAPSHOT 版本过程中收集这些镜像 ID，并存储在 Release
草稿的附件中。

在最后的 Release 构建过程中，将这些镜像 ID 重新打上最终版本的标签，就能节省编译 Release 版本时的镜像构建时间。

其实在最开始，我们的初衷是将分支 SNAPSHOT 版本通过 docker save 存为文件再发布为新版本，然而这样做会导致 Release
附件过大，所以最后选择了使用镜像 ID 重新打 tag 的方式。
