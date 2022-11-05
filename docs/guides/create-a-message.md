---
sidebar_position: 1
---

# Create a message

Sisyphus provides an easy-to-use DSL API for building Message instances in Kotlin using Protobuf.

```protobuf
message EchoResponse {
    string content = 1;

    Severity severity = 2;
}
```

The above proto file defines a Message named `EchoResponse`, and the next step is to create an `EchoResponse` instance
directly using the `EchoResponse` DSL.

```kotlin
val response = EchoResponse {
    this.content = input.content
    this.severity = input.severity
}
```

A Message can be constructed by simply using curly brackets after the Message type, and properties can be freely set in
the `{}` code block.

:::info Can't find the EchoResponse type?

Try executing `generateProtos` in the Gradle Task window to generate all the Kotlin code.

:::

## Immutable and mutable types of messages

Sisyphus provides two access interfaces for all messages, for example, in the above example, Sisyphus generates two
interfaces for `EchoResponse` messages. They are `EchoResponse` and `MutableEchoResponse`.

`EchoResponse` is an immutable interface and is the basic entry point for accessing Protobuf messages, in general we
just need to import this interface.

`MutableEchoResponse` is a mutable interface, normally hidden by various message DSLs, and will be placed in a
special `internal` package.

```kotlin
EchoResponse { // this: MutableEchoResponse
    this.content = input.content
    this.severity = input.severity
}
```

For example, in the above example, `MutableEchoResponse` access is provided in the code field expanded by
the `EchoResponse` DSL.

Once a message is removed from the creation of a message DSL code field, it is immutable access. See Kotlin's var and
val design for more information on the benefits of mutable and immutable access.

## Reassigning values to messages

Once the message has been created, the `MutableEchoResponse` DSL domain can be re-expanded via the `invoke` DSL.

```kotlin
val response = EchoResponse {
    this.content = input.content
    this.severity = input.severity
}
val newResponse = response.invoke { // can also be omitted as `response {`
    this.content = "new content"
}
```

:::danger Attention

However, it is worth noting that the `invoke` DSL creates a new Message instance rather than assigning a value to the
original instance.

```kotlin
response !== newResponse // response and newResponse are not the same object
```

:::