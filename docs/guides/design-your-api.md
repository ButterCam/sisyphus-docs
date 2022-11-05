---
sidebar_position: 5
---

# Design new API

The beginning and core of Sisyphus' workflow is the API design, around which everything revolves. Here Sisyphus strongly
recommends referring to the [Google API Improvement Proposals](https://google.aip.dev/) and following it to design API.

This guide contains Google's best practices for API design. When you encounter a problem with API design and feel
uncertain about doing this or that, take a look at [Google API Improvement Proposals](https://google.aip.dev/)。

## Intellij Protobuf Plugin

**[Intellij Protobuf Plugin](https://github.com/devkanro/intellij-protobuf-plugin)** is a plugin for Intellij's Protobuf
language plugin that helps you write Protobuf files quickly.

The plugin provides many features that the official plugin does not have, such as AIP integration, import optimization,
etc., and also integrates some features of Sisyphus hold.

![](./assets/intellij-protobuf-plugin.png#gh-light-mode-only)
![](./assets/intellij-protobuf-plugin_dark.png#gh-dark-mode-only)

You can download and install the plugin by searching for `protobuf` in Intellij's `Preferences - Plugins` page.

:::danger Attention

Note that when you use IntelliJ IDEA Ultimate, an official Protocol Buffer plugin is bundled, Intellij Protobuf Plugin
is not compatible with this plugin, you need to disable the `Protocol Buffer` plugin and the `gRPC` plugin on the
plugins page.

Don't worry, because the Intellij Protobuf Plugin already integrates most of the features of the `Protocol Buffer`
plugin and the `gRPC` plugin, and provides more and smarter features.

:::

## Designing the first API

Once the plugin is installed, a new proto file can be created in the `src/main/proto` directory.

Before creating the file, you need to create a new package, refer to [AIP-191](https://google.aip.dev/191).

In general, Java package names can be proto package names by simply dropping root domains like `com`, `net`, `io`, etc.

Here we use `bybutter.showcase.v1` as our package name and create a `book.proto` under this package.

```protobuf
syntax = "proto3";

package bybutter.showcase.v1;

option java_package = "com.bybutter.showcase.v1";
option java_multiple_files = true;
```

For newly created proto files, it is always encouraged to use the `proto3` syntax and configure the package name of the
resulting Kotlin file.

## Resource-oriented design

[AIP-121](https://google.aip.dev/121) introduced the concept of Resource Oriented Design, a pattern for RPC APIs that
provides a more prescriptive and schematic approach to designing APIs.

Design almost all APIs as different actions against resources, and most of the actions can be described using HTTP
methods, which is almost the same concept as Restful API.

Here we define a resource named `Book`, which represents information about a book.

```protobuf
message Book {
    // 标题
    string title = 1;
    // 作者
    string author = 2;
}
```

### Resource Name

[AIP-122](https://google.aip.dev/122) defines a resource name specification that uniquely identifies a resource, which
contains not only the resource ID.

It also contains information about the hierarchy between resources, which is useful for designing complex APIs.

```protobuf
message Book {
    option (google.api.resource) = {
        type: "showcase.bybutter.com/Book"
        pattern: "publishers/{publisher}/books/{book}"
    };

    string name = 1;
    // 标题
    string title = 2;
    // 作者
    string author = 3;
}
```

A message can be defined as a resource using the `resource` option, where we define Book resource name in the
format `publishers/{publisher}/books/{book}`, where `publisher` is the publisher ID and `book` is the book ID.

### Resource Type

[AIP-123](https://google.aip.dev/123) defines the specification of the resource type, which consists of the domain in
which the resource is located and the resource type.

`showcase.bybutter.com/Book` is the resource type of `Book`, `showcase.bybutter.com` indicates the domain to which the
resource belongs, typically the domain name of the API server, and Book is the resource type, usually the message name.

### Resource Reference

We can associate different resources with each other, and the `resource_reference` option can do that.

```protobuf
message Book {
    // 作者
    string author = 3 [(google.api.resource_reference) = {
        type: "showcase.bybutter.com/Author"
    }];
}
```

## API Deigning

[AIP-131](https://google.aip.dev/131), [AIP-132](https://google.aip.dev/132), [AIP-133](https://google.aip.dev/133)
, [AIP-134](https://google.aip.dev/134), [AIP-135](https://google.aip.dev/135) defines five standard interfaces on
resources, which are Get, List, Create, Update, Delete.

This is what we often call the add, delete, and check interface, these interfaces have their own AIP specification,
reference to these specifications can be designed to robust and expandable API.

### Get Method

The Get method is used to get detailed information about a single resource by its name, which is often placed in the URI
path in HTTP mappings.

```protobuf
service BookApi {
    rpc GetBook (GetBookRequest) returns (Book) {
        option (google.api.http) = {
            get: "/v1/{name=publishers/*/books/*}"
        };
        option (google.api.method_signature) = "name";
    }
}

message GetBookRequest {
    string name = 1 [
        (google.api.field_behavior) = REQUIRED,
        (google.api.resource_reference) = {
            type: "library.googleapis.com/Book"
        }];
}
```

### List Method

The List method is used to list resources, often with the parent resource name of the resource in the URI path in the
HTTP mapping, and with `page_token` and `page_size` for pagination.

Additional `filter`([AIP-160](https://google.aip.dev/160)) and `order_by` resources can be designed to filter resources
and set rules for sorting resources in the list.

```protobuf
service BookApi {
    rpc ListBooks (ListBooksRequest) returns (ListBooksResponse) {
        option (google.api.http) = {
            get: "/v1/{parent=publishers/*}/books"
        };
        option (google.api.method_signature) = "parent";
    }
}

message ListBooksRequest {
    string parent = 1 [
        (google.api.field_behavior) = REQUIRED,
        (google.api.resource_reference) = {
            child_type: "library.googleapis.com/Book"
        }];

    int32 page_size = 2;

    // The page token obtained from the response to the previous ListBooks request, or from the first page if not specified.
    string page_token = 3;
}

message ListBooksResponse {
    repeated Book books = 1;

    // The next page token, or null if there is no more data.
    string next_page_token = 2;
}
```

### Create Method

The Create method is used to create a resource, often putting the name of the resource it belongs to in the URI path in
the HTTP mapping, and putting information about the resource itself in the request body, returning the created resource
itself.

```protobuf
service BookApi {
    rpc CreateBook (CreateBookRequest) returns (Book) {
        option (google.api.http) = {
            post: "/v1/{parent=publishers/*}/books"
            body: "book"
        };
        option (google.api.method_signature) = "parent,book";
    }
}

message CreateBookRequest {
    string parent = 1 [
        (google.api.field_behavior) = REQUIRED,
        (google.api.resource_reference) = {
            child_type: "library.googleapis.com/Book"
        }];

    // The book to create.
    Book book = 2 [(google.api.field_behavior) = REQUIRED];
}
```

### Update Method

The Update method is used to update a resource, often placing the resource name in the URI path in the HTTP transcoding
and placing information about the resource itself in the request body, returning the updated resource itself.

The Update method will also contain an `update_mask` field to indicate which resources' fields need to be updated.

```protobuf
service BookApi {
    rpc UpdateBook (UpdateBookRequest) returns (Book) {
        option (google.api.http) = {
            patch: "/v1/{book.name=publishers/*/books/*}"
            body: "book"
        };
        option (google.api.method_signature) = "book,update_mask";
    }
}

message UpdateBookRequest {
    // The book to update.
    //
    // The book's `name` field is used to identify the book to update.
    // Format: publishers/{publisher}/books/{book}
    Book book = 1 [(google.api.field_behavior) = REQUIRED];

    // The list of fields to update.
    google.protobuf.FieldMask update_mask = 2;
}
```

### Delete Method

The Delete method is used to delete a resource, and in HTTP transcoding often puts the resource name into the URI path,
returning the empty object, and in a soft deleting scenario ([AIP-164](https://google.aip.dev/164)) may return the
resource itself.

```protobuf
service BookApi {
    rpc DeleteBook (DeleteBookRequest) returns (google.protobuf.Empty) {
        option (google.api.http) = {
            delete: "/v1/{name=publishers/*/books/*}"
        };
        option (google.api.method_signature) = "name";
    }
}

message DeleteBookRequest {
    string name = 1 [
        (google.api.field_behavior) = REQUIRED,
        (google.api.resource_reference) = {
            type: "library.googleapis.com/Book"
        }];
}
```

### Custom Method

There are also many actions that cannot be simply implemented by the above 5 methods, in which case you can refer
to [AIP-136](https://google.aip.dev/136) for the implementation of the custom methods.

For batch request scenarios, you can also refer to [AIP-231](https://google.aip.dev/231)
, [AIP-233](https://google.aip.dev/233)
, [AIP-234](https://google.aip.dev/234), [AIP-235](https://google.aip.dev/235) to design the batch processing method.
