---
slug: new-docker-plugin
title: New docker plugin
authors: [higan]
tags: [docker, sisyphus-project-plugin, gradle, release]
---

In Sisyphus 1.5.20, we have further optimized the Docker plugin to make it easier to use.

The main tweaks include changes to the base Docker plugin, automatic Dockerfile generation, and support for Spring
layered jar builds.

<!--truncate-->

## How it started

We've been using GitHub Action as our CI tool, and when we create a PullRequest, CI automatically compiles a SNAPSHOT
version of the image to deploy the test environment. After the PR merge, the CI compiles a SNAPSHOT version with branch
names to deploy the beta environment. The final deployment image is actually compiled when the Release is created.

As you can see, we need to build the image three times in the whole CI pipeline, and each build takes about 40 minutes,
which can take close to two hours from the time the PR is raised to the final release.

And due to the recent internal CI flow resource consumption problem, our backend service has been taking three hours for
one build, so until the CI flow resource problem is solved, we have to optimize our CI pipeline.

## How it optimized

First of all, in the actual use process, the SNAPSHOT version of the PR build image is generally not used, most cases
are used to deploy the test environment of the developer's local build image, so we can remove the PR image build step,
just do some code checking.

Second, the SNAPSHOT version built for each branch is actually the same as the RELEASE version in the final release, but
due to the subtle differences in the build environment, the compilation result is not cached, and the branch building
still needs to be run again for each release. So for this, we plan to reuse the image compiled from the previous branch
built.

In previous versions, we used [palantir/gradle-docker](https://github.com/palantir/gradle-docker) as our base Docker
plugin, for which we also optimized the design of the tag task.

However, during this CI pipeline optimization, we found some shortcomings, such as no `docker save` support and no easy
way to get the current build image ID.

So we switched the base Docker plugin
to [bmuschko/gradle-docker-plugin](https://github.com/bmuschko/gradle-docker-plugin), which provides more underlying
operational capabilities.

## Generated dockerfile with Spring Layered Jar

In our previous usage, our Dockerfile was written manually, while the new base Docker plugin provides the ability to
automatically generate a Dockerfile, so we intend to generate Dockerfile automatically by the plugin.

Previously, our Dockerfile was written according to Spring Boot's Layered Jar hierarchy, which looked something like
this.

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

Spring Boot 2.3 added support
for [Layered Jar](https://spring.io/blog/2020/08/14/creating-efficient-docker-images-with-spring-boot-2-3), which allows
you to layer dependencies and application packages. We use this feature in Dockerfile to layer different dependencies
according to their update frequency, putting infrequently updated dependencies in the bottom layer and frequently
updated dependencies in the top layer, so that when we upgrade only the frequently changed components, we can reuse the
previous bottom image, thus speeding up the image build.

So we used Docker's builder mode to decompress the Layered Jar to a temporary Docker pod, and then copied the
decompressed layers into the final image in hierarchical order.

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

In the above configuration, we have roughly divided the code into 6 layers:

1. dependencies  
   This layer contains all the third-party dependencies.
2. spring-boot-loader  
   This layer contains the Spring Boot loader.
3. sisyphus-dependencies  
   This layer contains all the Sisyphus dependencies. Sisyphus often does some iterative upgrades due to business needs,
   so it is separated from the common dependencies.
4. butter-dependencies  
   This layer contains all our internal dependencies and is closely related to the business.
5. snapshot-dependencies  
   This layer contains all the SNAPSHOT version dependencies as snapshot versions, which may change during development.
6. application  
   This layer contains the business code and is the most frequently updated layer.

The new Sisyphus Docker plugin automatically reads the layering information from the bootJar task and generates a
layered decompression task to decompress the bootJar layering to the Docker build's working directory.

Then the `dockerfile` task generates the Dockerfile needed for the build.

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

## Apply to CI pipeline

The new Docker plugin automatically generates a file containing the image IDs when it is built, and we collect these
image IDs during the build of the branch SNAPSHOT version and store them in an attachment to the draft release.

Re-tagging these image IDs with the release version during the Release build pipeline to saves image build time.

In fact, at the beginning, our original design was to save the branch SNAPSHOT image as a file via docker save and then
load it and re-tag as release version, but this would result in an oversized Release attachment, so we finally chose to
re-tag it using the image ID.