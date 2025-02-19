---
weight: 10
bookCollapseSection: true
---

# Introduction

## Repository Relations

To build the whole software you need to understand the relationship between the repositories. The relation is somewhat complicated as there are some inter-repositories dependencies. The `bestia-behemoth` repository contains the server but also the ProtoBuf message definition. This definition is required to build the `bestia-entity-plugin` for Godot. The result of this build, the [Godot engine](https://godotengine.org/), is required to build the `bestia-client` game. The server can be built only with the `bestia-behemoth` repository. The relation is depicted in the following diagram:

{{< mermaid >}}
graph LR
  zone[bestia-behemoth] -- ProtoBuf messages --> plugin[bestia-entity-plugin]
  voxel[Voxel Plugin] -- required --> godot[Godot Engine]
  plugin -- required --> godot
  godot -- required --> client[bestia-client]
{{< /mermaid >}}

## Getting Started

The documentation is split into three main sections:

1. Game Design
2. Client Documentation
3. Server Documentation

The info found in this document should help you to get kickstarted and join the development. Depending on where you want to contribute you should read the required sections. With the provided guidelines enthusiasts should very easily be able to create contributions from artworks to scripts.


Hello World

{{< button relref="/" >}}Get Home{{< /button >}}


{{% tabs "id" %}}
{{% tab "MacOS" %}} # MacOS Content {{% /tab %}}
{{% tab "Linux" %}} # Linux Content {{% /tab %}}
{{% tab "Windows" %}} # Windows Content {{% /tab %}}
{{% /tabs %}}

{{< mermaid >}}
stateDiagram-v2
    State1: The state with a note
    note right of State1
        Important information! You can write
        notes.
    end note
    State1 --> State2
    note left of State2 : This is the note to the left.
{{< /mermaid >}}

{{< katex display=true >}}
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
{{< /katex >}}

{{% hint info %}}
**Markdown content**
Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
{{% /hint %}}

{{% hint warning %}}
**Markdown content**
Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
{{% /hint %}}

{{% hint danger %}}
**Markdown content**
Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
{{% /hint %}}

{{% columns %}} <!-- begin columns block -->
# Left Content
Lorem markdownum insigne...

<---> <!-- magic separator, between columns -->

# Mid Content
Lorem markdownum insigne...

<---> <!-- magic separator, between columns -->

# Right Content
Lorem markdownum insigne...
{{% /columns %}}

{{% details "Title" open %}}
## Markdown content
Lorem markdownum insigne...
{{% /details %}}
