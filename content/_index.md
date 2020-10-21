# Bestia Developer Documentation

> Explore vast lands in a procedural generated world, fight tough monsters, or join guilds in your quest for honor.
> But be prepared: the world might end sooner as you would expect.

<a class="github-button" href="https://github.com/tfelix/bestia-docs" data-icon="octicon-star" data-size="large"
data-show-count="true" aria-label="Star tfelix/bestia-docs on GitHub">Star</a>
<a class="github-button" href="https://github.com/tfelix/bestia-docs/subscription" data-icon="octicon-eye"
data-size="large" data-show-count="true" aria-label="Watch tfelix/bestia-docs on GitHub">Watch</a>

**Congratulations!** You just have found the Developer Documentation of Bestia. Here you find everything from
gamedesign guidlines to engine architecture overview as well as the API documentation to access game resources.

> **The game currently transforms into a stand-alone client which is currently not available for testing.**

## Getting Started

The documentation is split into three main sections:

1. General Game Design
2. Client Documentation
3. Server Documentation

The infos found in this document should help you to get kickstarted and join the development. Depending on where you want to contribute you should read the required sections. With the provided guidelines enthusiasts should very easily be able to create contributions from artworks to scripts.

## Project Relation

To build the whole software you need to understand the relationship between the repositories. The relation is somewhat complicated as there are some inter-repositories dependencies. The `bestia-behemoth` repository contains the server but also the ProtoBuf message defintion. This definition is required to build the `bestia-entity-plugin` for Godot. The result, this engine, is required to build the `bestia-client` game. The server can be build only with the `bestia-behemoth` repository. The relation is depicted in the following diagram.

{{< mermaid >}}
graph LR
  zone[bestia-behemoth] -- ProtoBuf messages --> plugin[bestia-entity-plugin]
  voxel[Voxel Plugin] -- required --> godot[Godot Engine]
  plugin -- required --> godot
  godot -- required --> client[bestia-client]
{{< /mermaid >}}

## Contributing

Contributions to both the game design and the game itself (the client and the server) are very welcome!

You may find a little `Edit this page` link at the bottom of each page. If you want to change some game design aspects feel free to give it a try!

Inside this game design document you possibly will find certain **Contributing** sections which will give you some guidelines to follow in order to help to get you changes into the game quickly.

Read the Bestia **[General Mechanics](/docs/mechanics)** section first to get a grasp for what this game is all about and align your contributions and changes under these game guidelines in order to maximize your chance of a fast approval of your contribution.

## Project Repositories

You find the three project repositories on GitHub (consider to givem them a star!)

* [Bestia Developer Documentation](https://github.com/tfelix/bestia-docs) <i class="fab fa-github"></i>
* [Bestia Game Client](https://github.com/tfelix/bestia-client) <i class="fab fa-github"></i>
* [Bestia Behemoth Server](https://github.com/tfelix/bestia-behemoth) <i class="fab fa-github"></i>

> You can use the `Edit` link on the bottom right of every page to directly edit this document and create a Pull Request
> on Github.

<script async defer src="https://buttons.github.io/buttons.js"></script>
