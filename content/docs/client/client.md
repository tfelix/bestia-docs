---
weight: 710
draft: true
title: "Client"
toc: true
description: "About the history and the original idea of the game"
---

# Bestia Client

<a class="github-button" href="https://github.com/tfelix/bestia-client" data-icon="octicon-star" data-size="large"
data-show-count="true" aria-label="Star tfelix/bestia-client on GitHub">Star</a>
<a class="github-button" href="https://github.com/tfelix/bestia-client/subscription" data-icon="octicon-eye"
data-size="large" data-show-count="true" aria-label="Watch tfelix/bestia-client on GitHub">Watch</a>

The Bestia Client is build with the awesome [Godot Open Source](https://godotengine.org) engine. Its job is the visualization of the game world. It synchronizes with the game server and will display entities so the player is able to interact with them.

It also transmits the voxel model of the world and visualizes the game map with the help of the [Godot Voxel plugin](https://github.com/Zylann/godot_voxel) as well as a custom module for the entity management.

## Getting Started

As mentioned you will most likely need to build your own custom build of the Godot engine to include the [Godot Voxel plugin](https://github.com/Zylann/godot_voxel) as well as the custom module `bestia-entity` for entity managment.

> Warning: Its currently unclear how to structure the repositories. It might be that a mono-repo makes sense.

1. Checkout the official Godot sources:
    ```bash
    git clone https://github.com/godotengine/godot.git
    ```
2. Checkout the Voxel plugin:
    ```bash
    cd godot/modules
    git submodule add https://github.com/Zylann/godot_voxel.git voxel
    ```
3. **TBD**

Then build the engine for your target platform. In order to do so, consult the [official build documentation](https://docs.godotengine.org/en/stable/development/compiling/index.html).


<script async defer src="https://buttons.github.io/buttons.js"></script>
