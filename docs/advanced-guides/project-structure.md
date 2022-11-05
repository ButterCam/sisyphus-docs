---
sidebar_position: 1
---

# Project structure

Sisyphus uses the **Macroservice** pattern to design the project structure.

By dividing our project into five modules **Schema** / **Component** / **Middleware** / **Service** / **Application**,
we can manage the project more easily and add new components more flexibly.

## Microservices and Macroservices

**Microservices** is a modern back-end application architecture that is centered on partitioning a business into
multiple microservices, each of which can run independently without affecting other services.

Microservices have the advantages of higher scalability, substitutability, agility, etc., but also have more complex
communication, more maintenance costs, and a more difficult testing process.

It is very challenging to fully delineate the boundaries of microservices at the beginning of a project and it is
challenging to switch to a microservice architecture as the project grows.

For this reason, Sisyphus proposes the architectural concept of **macroservices**, which splits the deployment
attributes of microservices from business attributes, with microservices only responsible for providing business logic
and macroservices being deployable units that merge one or more microservices.

At the beginning of the project, we can create only one deployment unit containing all microservices, which is a
traditional monolithic application and can retain the characteristics of easy maintenance and debugging of monolithic
applications.

As the project grows, we can create multiple deployment units and split the microservices for deployment, so that we can
achieve progressive microservicing of backend services.

## Application

Sisyphus requires **Application** to be **executable**, but **not logical**, and a standard application should contain
only a few configuration files, such as `application.yaml`, and a Spring Boot Main function.

All business logic should be implemented by **Component** and **Service** that are added to the **Application**
dependency.

**Application**, as a Spring Boot application, will automatically load the Spring components in **Component** and **
Service**.

For example, if our **Application** is to contain user services, then we can add `UserService`, which provides user
services, to the dependency. If we also need to include content services, we can add `ContentSerivce`, which provides
content services, to the dependency as well.
When this macroservice is started, it will provide both `UserService` and `ContentService`.

## Service

All **Service** are **not allowed** to depend on each other, which ensures that individual microservices are
encapsulated as a single macro service deployment.

Dependencies between **Service** should be provided by **Schema**, for example `ContentService` needs to call the
interface of `UserService`, but is **not allowed** to depend directly on `UserService` itself, **it should depend**
on `UserServiceSchema `.

This way, we can preserve the features of the microservice to the greatest extent possible. For example, we plan to
refactor `UserService` but not modify the interface definition, we just need to implement a `UserServiceV2` and replace
it with `UserService` in the macro service to complete the deployment.

## Schema

The **Schema** is the interface to the service and the component that we write the proto and generate the code for. In
the Schema, **it should only contain **tool classes and tool functions for the proto, **no business logic** is allowed.

All **Service** should have its own **Schema** component and implement it. When services call each other, they should
also be called through the **Schema** service interface.

## Middleware

**Middleware** is a component that contains configuration and middleware drivers. Sisyphus requires developers to
encapsulate all kinds of external middleware into a single **Middleware** component that can be easily invoked by each
microservice.

For example, we can encapsulate a database as a **Middleware** component, and when `UserService` needs to link a
database, just add the specified **Middleware** to the dependency and use the `@Qualifier` annotation to specify the
example database to connect to and start using it.

For this purpose, the **Middleware** should contain or read the code for configuring and initializing the database
driver for the **Config Artifact**.

Sisyphus itself provides a lot of generic initialization logic for **Middleware**, such as Mysql, Redis, ElasticSearch,
etc. Just use these packages to quickly build a **Middleware** component.

## Component

A **Component** is a collection of Spring components that contain edge business logic or provide abstraction tools for
business logic, for example API authentication can be abstracted as a **Component**, and logging and statistics
components can be abstracted as a **Component**.

## Config Artifact

**Middleware** may contain configuration, but for more complex scenarios or due to permission requirements, writing
configuration in **Middleware** is not a good approach.

The **Config Artifact** is the jar package that is used to store the configuration, which is pushed to a private maven
repository and read by **Middleware**.

Permissions for jars can be managed through a private maven repository, and these jar packages can be split into
multiple environments.

The **Config Artifact** **should not** contain any Java or Kotlin code, it should **only contain configuration files**,
such as `mysql.yml`.

Sisyphus provides
the [sisyphus-configuration-artifact](https://github.com/ButterCam/sisyphus/tree/master/middleware/sisyphus-configuration-
artifact) component to download a specified Config Artifact and add it to the ClassPath when the application is
launched. This is a lightweight solution for replacing various configuration centers.
