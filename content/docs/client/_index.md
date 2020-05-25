---
bookCollapseSection: true
---
# Bestia Client

<a class="github-button" href="https://github.com/tfelix/bestia-client" data-icon="octicon-star" data-size="large"
data-show-count="true" aria-label="Star tfelix/bestia-client on GitHub">Star</a>
<a class="github-button" href="https://github.com/tfelix/bestia-client/subscription" data-icon="octicon-eye"
data-size="large" data-show-count="true" aria-label="Watch tfelix/bestia-client on GitHub">Watch</a>

The Bestia Client is build with the [Godot Open Source](https://godotengine.org) engine. Its job is the visualization of the game world. It synchronizes with the game server and will display entities so the player is able to interact with them.

The server is build similar to a [Entity Component System](https://en.wikipedia.org/wiki/Entity_component_system). The client utilizes this architecture as well and make sure it can easily work with these components. It receives updates for the entities and reads the assigned components in order to display items, structures and entities.

It also transmits the voxel model of the world and visualizes the game map with the help of the [Godot Voxel plugin](https://github.com/Zylann/godot_voxel) as well as a custom module for the entity management. The custom module is placed in the client repository. See its `README.md` for information on how to build the custom Godot binary.

<script async defer src="https://buttons.github.io/buttons.js"></script>
