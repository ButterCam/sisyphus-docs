---
sidebar_position: 2
---

# Sisyphus Project Plugin

**Sisyphus Project Plugin** （以下简称插件）是用于快速创建 Sisyphus 项目的 Gradle 插件，可以更加自动化的配置 Gradle 工程。  
插件能以符合直觉的形式自动配置第三方插件，减少 `build.gradle.kts` 中的配置。

## 安装插件

仅需要将 project 插件加入到 `build.gradle.kts` 中即可。

```kotlin
plugins {
    id("com.bybutter.sisyphus.project") version "1.4.0"
}
```

或者使用传统的 Gradle 插件方式：

```kotlin
buildscript {
    repositories {
        maven {
            url = uri("https://plugins.gradle.org/m2/")
        }
    }
    dependencies {
        classpath("com.bybutter.sisyphus.tools:sisyphus-project-gradle-plugin:1.4.0")
    }
}

apply(plugin = "com.bybutter.sisyphus.project")
```

## 使用 gradle.properties

插件的配置方式采用 `gradle.properties` 文件的方式，可以在 `gradle.properties` 文件中配置插件的参数。

在全局的 `GRADLE_USER_HOME` 目录下（一般是 `~/.gradle/`），或者是在项目工程下的 `gradle.properties` 文件都会被 Gradle 读取，插件也会通过这些参数自动配置。

可以在全局的 `gradle.properties` 定义所有工程公用参数，或者在项目工程下的 `gradle.properties` 定义项目特定的参数。

以下的 properties 都可用来配置插件：

- `sisyphus.developer=(your name)`  
  指定开发者的名字，这个名字会覆盖最后的工程版本号，例如指定了该 properties 为 `higan` 后，最后生成的版本号为 `higan-SNAPSHOT`。
  在开发环境统一版本号有利于多工程开发，并通过依赖覆盖插件同步依赖。

- `sisyphus.layer=(FRAMEWORK, PLATFORM, API, IMPLEMENTATION)`  
  指定开发层级深度，可以指定为 `FRAMEWORK`, `PLATFORM`, `API`, `IMPLEMENTATION` 四个值，分别代表从深到浅的四个开发层级。默认值为
  `IMPLEMENTATION`，在后面的章节中我们会着重介绍开发层级深度。

- `sisyphus.environment=(env name)`  
  指定当前运行的环境，该属性会被 **Config Artifact** 组件读取，并读取对应的配置文件，例如当指定环境为 `dev` 时，除了 `config.yaml`
  会被读取外，`config-dev.yaml` 也会被 **Config Artifact** 读取，并覆盖 `config.yaml` 中的值。

- `sisyphus.repositories.<name>.url=(repo url)`  
  定义一个 Repository 的 URL，可以用来指定一个 Maven 仓库的地址。仓库的类型并没有要求，可以是 Maven 仓库也可以是 Docker 仓库，具体的仓库类型在后续的使用中才有意义。

- `sisyphus.repositories.<name>.username=(username)`  
  定义一个 Repository 的用户名。

- `sisyphus.repositories.<name>.password=(password)`  
  定义一个 Repository 的密码。

- `sisyphus.dependency.repositories=(repos)`  
  定义用来解析依赖的仓库，这些仓库会自动配置到所有应用了插件的工程中，可以省略 `build.gradle.kts` 中的 `repositories`
  配置。  
  同时，**Config Artifact** 也是从这些仓库中下载的，填入的 repository 类型必须是一个有效的 maven 仓库。格式是以逗号分割的已定义的
  repository 名称。默认值为 `local,central,portal`。  
  对于 maven 仓库，插件内置了 **local**(maven local), **central**(maven central), **portal**(gradle portal) 三个仓库。

- `sisyphus.snapshot.repositories=(repos)`  
  定义 SNAPSHOT 版本需要推送的 maven 仓库，这些仓库会自动配置到所有工程 publishing 配置中，如果当前工程的版本号为 `-SNAPSHOT`
  结尾，会自动配置这些仓库。默认值为 `snapshot`，意味着只需要定一个名为 `snapshot` 仓库就能自动应用上。

- `sisyphus.release.repositories=(repos)`  
  与 `sisyphus.snapshot.repositories` 差不多，但是是定义 release 版本需要推送的 maven 仓库，当工程版本号不是 `-SNAPSHOT`
  结尾，会自动配置这些仓库。默认值为 `release`，意味着只需要定一个名为 `release` 仓库就能自动应用上。

- `sisyphus.docker.repositories=(repos)`
  定义 Docker 仓库，这些仓库会自动配置到 Gradle Docker 插件中，生成对应的 `tag`，`push` 任务。

- `sisyphus.config.artifacts=(packages)`
  定义运行时需要加载的 **Config Artifact**，这些 **Config Artifact** 会在应用启动时从 `sisyphus.dependency.repositories`
  中自动下载。格式为 `foo.bar:baz:1.0.0` 这样的字符串，当有多个 **Config Artifact** 时，使用逗号分割。

## 开发层级深度

在上面我们提到了通过 `sisyphus.layer` 配置的开发层级深度的概念，在项目开发时，我们可以将依赖分成多个层级，以便简化开发环境的依赖配管理。

在这里 Sisyphus 将开发层级深度分为四个层级：

- **FRAMEWORK** 层是框架开发层，也是最深的开发层级，当面向框架开发时，所有的内部依赖都会被替换成开发版本。

- **PLATFORM** 层是平台开发层，是次深的开发层级，平台是指对于框架的抽象，大部分情况下是包含了一些部门中对于框架的一些公用组件。

- **API** 层是接口开发层，是次浅的开发层级，所有的 API 依赖都会被替换成开发版本。

- **IMPLEMENTATION** 层是最浅的层级，也是默认的开发层级，这个层级的开发不会进行任何依赖替换，也无需定义。

:::tip 提示

较深的层级会包含较浅的层级，例如 **FRAMEWORK** 层级也会替换所有 **PLATFORM** 与 **API** 层的依赖。

:::

### 层级依赖的版本替换

将依赖分层的主要目的是为了能对这些依赖进行管理，可以使用以下 DSL 来对依赖进行层级标记。

```kotlin
dependencies {
    frameworkLayer(api("com.bybutter.sisyphus.starter:sisyphus-grpc-server-starter:1.4.0"))
    platformLayer(api("com.bybutter.sisyphus.kit:camera-grpc-server-autoconfigure:1.2.1"))
    apiLayer(api("com.bybutter.camera.api:camera-user-api:1.7.12"))
}
```

用 `frameworkLayer`，`platformLayer` 和 `apiLayer` 标记层级，并在里面使用已经 Release 的版本号。

进行本地开发时，我们修改了依赖工程中的代码，并推送到 maven local，当我们想要工程使用我们刚刚编译好的版本，通常情况下，我们需要去 `build.gradle.kts` 中修改依赖的版本号，这次变更很容易在后续的过程中被遗忘。

为了不需要修改 `build.gradle.kts` 就能替换中依赖的版本，我们将依赖标记为指定的层级，例如用 `apiLayer` 标记为 **API** 层级，当 `sisyphus.layer` 被设定为 **API**
或者更深层级时，所有的 **API** 依赖都会被替换成由 `sisyphus.developer` 决定的版本号，例如：`higan-SNAPSHOT`。

### ButterCam 内部的层级深度

Sisyphus 对于开发层级的使用并没有特殊的规定，按照各自项目与工程的定义即可，但是在这里介绍一下 ButterCam 内部是如何使用这些层级的。

对于 ButterCam 而言，**FRAMEWORK** 层是指 Sisyphus，我们会把所有的 Sisyphus 开源库的依赖标记为此层级。

**PLATFORM** 层则是指 ButterCam 内部对于 Sisyphus 的针对性一些闭源组件，这些组件深度与 ButterCam 当前的技术栈与业务相关，能够为内部使用提供一些便利。

**API** 层则是指我们所有的 proto 定义，我们将所有的 proto 文件单独放在一个工程内，这个工程是所有团队所共享的，前端、客户端与后端都能参与到 proto 编写的过程中。而后端的 **Schema** 组件会依赖这些只带
proto 的 jar 包，这些依赖都会被标记为此层级。

:::info 值得一提

**PLATFORM** 层在 ButterCam 内部是一些耦合程度很高的工具类和一些通用的服务配置，我们也是和大家一样的使用同样的开源 Sisyphus 版本进行业务开发。

:::

## 由 Sisyphus 托管的工程属性

当应用插件后，工程一些属性会由 Sisyphus 托管，此时一些自定义属性可能会被覆盖。

- `project.version` 工程版本号将由好几个因素决定    
  属性 `sisyphus.developer` 决定了开发环境的版本号，格式为 `{name}-SNAPSHOT`  
  环境变量 `BRANCH_NAME` 决定了开发分支的版本号，一般用于 CI 环境，格式为 `{branch}-SNAPSHOT`
  环境变量 `GITHUB_REF` 决定了 PR 的版本号，一般用于 CI 环境，格式为 `PR-{PR_NUMBER}-SNAPSHOT`
  环境变量 `TAG_NAME` 决定了 Release 的版本号，一般用于 CI 环境，格式为 `{tag}`
  环境变量 `BUILD_VERSION` 决定了 Release 的版本号，一般用于 CI 环境，格式为 `{BUILD_VERSION}`

- `project.repositories` 工程的 maven 仓库将由 `gradle.properties` 中的 sisyphus 的系列属性托管

## 由 Sisyphus 托管的第三方插件

插件还能以符合直觉的方式帮助我们配置一些第三方插件，例如 Publish，Docker，License 等等。

### Nebula 系列插件

针对 JavaLibrary 类型的项目，如果 Gradle 运行环境中有 Nebula 系列插件，Sisyphus 会自动应用 `nebula.maven-publish`、`nebula.javadoc-jar`
与 `nebula.source-jar` 插件，会根据版本号的不同，自动配置由 `sisyphus.release.repositories` 与 `sisyphus.snaphost.repositories` 定义的目标仓库。

针对 JavaPlatform 类型的项目，只会自动应用 `nebula.maven-publish` 插件。

针对应用了 `nebula.maven-publish` 插件的项目，还会额外应用 `nebula.info` 与 `nebula.contacts` 插件用于填充生成的 pom 信息。

此外当 gradle.properties 中包含了 `signing.gnupg.keyName`，还会应用 `signing` 插件用于生成包签名，具体请参阅 [signing 插件的文档](https://docs.gradle.org/current/userguide/signing_plugin.html)。

### Docker 插件

针对 JavaApplication 类型的项目，如果 Gradle 运行环境中有 [Docker 插件](https://github.com/palantir/gradle-docker)，并且工程目录下具有 `dockerfile`，Sisyphus 会自动应用 `com.palantir.docker` 插件。

1. 所有工程与父工程下 docker 文件夹内的文件都会加入 `docker build` 命令的工作目录中。
2. 会通过 `sisyphus.docker.repositories` 为 Docker 插件自动配置需要推送的仓库 tag。
3. 将 `PROJECT_NAME` 与 `PROJECT_VERSION` 的加入 Docker 构建参数中。

### Ktlint 插件

如果当前工程应用了 [Ktlint 插件](https://github.com/JLLeitschuh/ktlint-gradle)，Sisyphus 会自动提供一些配置。

1. 忽略所有 generated 目录下文件。
2. 将 ReportType 设置为 **CHECKSTYLE**。

### Antlr 插件

如果当前工程应用了 [Antlr 插件](https://docs.gradle.org/current/userguide/antlr_plugin.html)，Sisyphus 会自动提供一些配置。

1. 将 Antlr 的 `generateGrammarSource` 任务加入 Kotlin 的编译依赖中，执行 Kotlin 编译时会自动执行 `generateGrammarSource`。
