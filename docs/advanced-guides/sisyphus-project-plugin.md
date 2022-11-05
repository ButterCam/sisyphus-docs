---
sidebar_position: 2
---

# Sisyphus Project Plugin

**Sisyphus Project Plugin** (hereafter referred to as `the plugin`) is a Gradle plugin for quickly creating Sisyphus
projects, allowing for more automated configuration of Gradle projects.

The plugin can automatically configure third-party plugins in an intuitive form, reducing configuration
in `build.gradle.kts`.

## Apply the plugin

Simply add the project plugin to `build.gradle.kts`.

```kotlin
plugins {
  id("com.bybutter.sisyphus.project") version "1.5.22"
}
```

Or use the traditional Gradle plugin apply dsl.

```kotlin
buildscript {
  repositories {
    maven {
      url = uri("https://plugins.gradle.org/m2/")
    }
  }
  dependencies {
    classpath("com.bybutter.sisyphus.tools:sisyphus-project-gradle-plugin:1.5.22")
  }
}

apply(plugin = "com.bybutter.sisyphus.project")
```

## Using gradle.properties

The plugin is configured using the `gradle.properties` file, where you can configure the plugin's parameters in
the `gradle.properties` file.

The `gradle.properties` file in the global `GRADLE_USER_HOME` directory (usually `~/.gradle/`) or in the project project
is read by Gradle and the plugin is automatically configured with these parameters.

You can define all project common parameters in the global `gradle.properties` or project specific parameters in
the `gradle.properties` under the project project.

The following properties can all be used to configure the plugin.

- `sisyphus.developer=(your name)`  
  Specify the developer's name, which will override the final project version number, e.g. if you specify the properties
  as `higan`, the final version number generated will be `higan-SNAPSHOT`.  
  Unifying version numbers in development environments facilitates multiple project development and synchronizes
  dependencies via dependency override plugins.

- `sisyphus.layer=(FRAMEWORK, PLATFORM, API, IMPLEMENTATION)`  
  Specify the depth of the development layer. You can specify four values `FRAMEWORK`, `PLATFORM`, `API`
  , `IMPLEMENTATION`, which represent the four development layers from deep to shallow. The default value
  is `IMPLEMENTATION`, and we will focus on the development layer in later sections.

- `sisyphus.environment=(env name)`  
  Specify the current running environment, this property will be read by the **Config Artifact** component and read the
  corresponding configuration file, for example when specifying the environment as `dev`, in addition to `config.yaml`
  being read, `config-dev.yaml` will also be read by the **Config Artifact** and overwrite ` config.yaml`.

- `sisyphus.repositories.<name>.url=(repo url)`  
  Define a URL for the Repository that can be used to specify the address of a Maven repository. The type of repository
  is not required, it can be either a Maven repository or a Docker repository, the exact type of repository will only
  make sense in subsequent use.

- `sisyphus.repositories.<name>.username=(username)`  
  Specify the username of a Repository.

- `sisyphus.repositories.<name>.password=(password)`  
  Specify the password for a Repository.

- `sisyphus.dependency.repositories=(repos)`  
  Specify the repositories used to resolve dependencies that are automatically configured to all projects that have
  plugins applied to them, and can omit the `repositories` configuration in `build.gradle.kts`.  
  Also, **Config Artifact** is downloaded from these repositories, and the type of repository filled in must be a valid
  maven repository. The format is a comma-separated name of the defined repository. The default value
  is `local,central,portal`.  
  For maven repositories, the plugin has three built-in repositories **local**(maven local), **central**(maven central)
  , **portal**(gradle portal).

- `sisyphus.snapshot.repositories=(repos)`  
  Specify the maven repositories that need to be pushed for SNAPSHOT versions, these repositories will be automatically
  configured to all project publishing configurations if the current project version number ends with `-SNAPSHOT`. The
  default value is `snapshot`, which means that only one repository named `snapshot` needs to be set to be applied
  automatically.

- `sisyphus.release.repositories=(repos)`  
  Similar to `sisyphus.snapshot.repositories`, but specify the maven repositories that need to be pushed for the release
  version, and is automatically configured when the project version number does not end in `-SNAPSHOT`. The default
  is `release`, which means that only one repository named `release` needs to be set to be applied automatically.

- `sisyphus.docker.repositories=(repos)`
  Specify Docker repositories that are automatically configured into the Gradle Docker plugin, generating the
  corresponding `tag`, `push` tasks.

- `sisyphus.config.artifacts=(packages)`
  Specify the **Config Artifacts** that need to be loaded at runtime, which are automatically downloaded
  from `sisyphus.dependency.repositories` at application startup. The format is a string like `foo.bar:baz:1.0.0`,
  separated by commas when there are multiple **Config Artifacts**.

## Development Layer

We mentioned above the concept of development layer configured via `sisyphus.layer`, and during project development we
can split dependencies into multiple layers in order to simplify the management of dependency matching in the
development environment.

In this case, Sisyphus has divided the development layer depth into four layers.

- The **FRAMEWORK** layer is the framework development layer and is the deepest development layer where all internal
  dependencies are replaced with development versions when developing towards a framework.

- The **PLATFORM** layer is the platform development layer, is the next deepest development layer, the platform is the
  abstraction for the framework, in most cases is included in some departments for the framework of some common
  components.

- The **API** layer is the API development layer, is the next shallow development layer, all API dependencies will be
  replaced with the development version.

- The **IMPLEMENTATION** layer is the shallowest layer, and the default development layer, this layer of development
  will not be any dependency replacement, and does not need to be defined.

:::tip Tips

Deeper tiers will contain shallower tiers, for example the **FRAMEWORK** tier will also replace all **PLATFORM** and **
API** tier dependencies.

:::

### Version replacement of dependencies layer

The main purpose of layering dependencies is to be able to manage them, and the following DSL can be used to mark
dependencies hierarchically.

```kotlin
dependencies {
  frameworkLayer(api("com.bybutter.sisyphus.starter:sisyphus-grpc-server-starter:1.5.22"))
  platformLayer(api("com.bybutter.sisyphus.kit:camera-grpc-server-autoconfigure:1.2.1"))
  apiLayer(api("com.bybutter.camera.api:camera-user-api:1.7.12"))
}
```

Mark the layers with `frameworkLayer`, `platformLayer` and `apiLayer` and use the released version in them.

When we do local development, we modify the code in the dependency project and push it to maven local. When we want the
project to use the version we just compiled, we usually need to go to `build.gradle.kts` to change the dependency
version number, and this change can easily be forgotten later on.

In order to replace the version of the dependency in `build.gradle.kts` without modifying it, we mark the dependency to
the specified level, for example with `apiLayer` to the **API** level, and when `sisyphus.layer` is set to the **API**
level or deeper, all **API** dependencies will be replaced with version number determined by `sisyphus.developer`, for
example: `higan-SNAPSHOT`.

### Development Layer in ButterCam

Sisyphus has no special rules for the use of development tiers, as defined by the respective projects and projects, but
here is a description of how these tiers are used inside ButterCam.

For ButterCam, the **FRAMEWORK** layer refers to Sisyphus, and we will mark all Sisyphus open source library
dependencies as such.

The **PLATFORM** layer refers to ButterCam's internal closed-source components for Sisyphus that are deeply related to
ButterCam's current technology stack and business, and can provide some convenience for internal use.

The **API** layer refers to all of our proto definitions, and we keep all of our proto files in a separate project that
is shared by all teams, so that the front-end, client, and back-end can all participate in the process of writing proto.
The back-end **Schema** components will depend on these proto-only jar packages, and these dependencies will be marked
as such.

:::info mention

The **PLATFORM** layer inside ButterCam are some highly coupled tool classes and some common service configurations, and
we are using the same open source Sisyphus version for business development as everyone else.

:::

## Project properties hosted by Sisyphus

When the plugin is applied, some properties of the project will be hosted by Sisyphus, and some custom properties may be
overridden at this time.

- `project.version`, the project version will be determined by several factors    
  The property `sisyphus.developer` determines the version number of the development environment, in the
  format `{name}-SNAPSHOT`  
  The environment variable `BRANCH_NAME` determines the version number of the development branch, typically used in CI
  environments, in the format `{branch}-SNAPSHOT`
  The environment variable `GITHUB_REF` determines the version number of the PR, typically used in CI environments, in
  the format `PR-{PR_NUMBER}-SNAPSHOT`
  The environment variable `TAG_NAME` determines the version number of the Release, usually used in CI environments, in
  the format `{tag}`
  The environment variable `BUILD_VERSION` determines the version number of the Release, typically used in CI
  environments, in the format `{BUILD_VERSION}`

- `project.repositories`, the project's maven repository will be hosted by the
  sisyphus `sisyphus.dependency.repositories` property in `gradle.properties`

## Third-party plugins hosted by Sisyphus

Plugins can also help us configure third-party plugins such as Publish, Docker, License, etc. in an intuitive way.

### Nebula plugins

For JavaLibrary type projects, Sisyphus will automatically apply the `nebula.maven-publish`, `nebula.javadoc-jar`
and `nebula.source-jar` plugins if the Gradle runtime environment has the Nebula family of plugins, depending on the
version number. Depending on the version number, the target repositories defined by `sisyphus.release.repositories`
and `sisyphus.snaphost.repositories` are automatically configured.

For JavaPlatform type projects, only the `nebula.maven-publish` plugin is automatically applied.

For projects with the `nebula.maven-publish` plugin applied, the `nebula.info` and `nebula.contacts` plugins are
additionally applied to populate the generated pom information.

In addition, when gradle.properties contains `signing.gnupg.keyName`, the `signing` plugin is also applied to generate
package signatures, as described in the [documentation for the signing plugin](https://docs.gradle.org/current/
userguide/signing_plugin.html).

### Docker plugin

For JavaApplication type projects, if the Gradle runtime environment
has [Docker plugin](https://github.com/bmuschko/gradle-docker-plugin), Sisyphus will automatically
apply `com.bmuschko. docker-remote-api` plugin.

1. automatically generates a Dockerfile for building the image
2. use Spring Boot's `bootJar` layering feature to automatically layer in dependent jar packages when building images,
   increasing the reuse of image layers and reducing image size
3. all projects and files in the docker folder of the parent project are added to the working directory of
   the `docker build` command. 4.
4. automatically configure the repository tags for the Docker plugin to be pushed via `sisyphus.docker.repositories`.
5. Add `PROJECT_NAME` and `PROJECT_VERSION` to the Docker build parameters.

### Ktlint plugin

If [Ktlint plugin](https://github.com/JLLeitschuh/ktlint-gradle) is applied to the current project, Sisyphus will
automatically provide some configuration.

1. Ignore all files in the generated directory.
2. Set the ReportType to **CHECKSTYLE**.

### Antlr Plugin

If [Antlr plugin](https://docs.gradle.org/current/userguide/antlr_plugin.html) is applied to the current project,
Sisyphus will provide some configurations automatically.

1. Add Antlr's `generateGrammarSource` task to Kotlin's compilation dependencies, and `generateGrammarSource` will be
   executed automatically when Kotlin is compiled.