---
weight: 10
bookCollapseSection: true
---

# Introduction

Welcome to the official documentation of **Bestia**, the free and open-source MMORPG built on a Kotlin and Java backend. Bestia is released under the **GPL v3.0 license**, ensuring that anyone can contribute, modify, and expand upon the game freely.

Bestia is a persistent online game that evolved from a browser-based prototype into a fully-fledged MMORPG. The project aims to provide a deep and engaging game world with real-time mechanics, strategic encounters, and a player-driven environment.

This documentation serves as a guide for developers, contributors, and enthusiasts who wish to understand, modify, or expand Bestia. Whether you're interested in game design, client development, or server-side mechanics, you'll find everything you need to get started here.

## Repository Structure and Dependencies

Bestia is a multi-repository project with dependencies between different components. Understanding these relationships is essential for setting up the development environment.

The core repositories include:

- **`bestia-behemoth`** – The server-side implementation, written in Kotlin and Java. This repository also contains the **ProtoBuf message definitions**, which serve as the communication protocol between the server and the client.
- **`bestia-entity-plugin`** – A plugin for the **Godot Engine**, generated from the ProtoBuf definitions. This plugin is required for the **`bestia-client`** to function properly.
- **`bestia-client`** – The game client, built in **Godot Engine**, using the **bestia-entity-plugin** for interacting with the server.

While the **server** (`bestia-behemoth`) can be built independently, the **client** (`bestia-client`) requires the **entity plugin**, which in turn depends on the server's ProtoBuf definitions. The following diagram illustrates this dependency structure:

graph LR
  zone[bestia-behemoth] -- ProtoBuf messages --> plugin[bestia-entity-plugin]
  voxel[Voxel Plugin] -- required --> godot[Godot Engine]
  plugin -- required --> godot
  godot -- required --> client[bestia-client]


## Project Repositories

You find the three project repositories on GitHub (consider to leave them a star!)

<div class="table">
  <div class="row">
    <div class="cell">
      <a href="https://github.com/tfelix/bestia-docs">Bestia Developer Documentation</a>
    </div>
    <div class="cell">
      <a class="github-button" href="https://github.com/tfelix/bestia-docs" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star tfelix/bestia-docs on GitHub">Star</a>
    </div>
    <div class="cell">
      <a class="github-button" href="https://github.com/tfelix/bestia-client/subscription" data-icon="octicon-eye" data-size="large" data-show-count="true" aria-label="Watch tfelix/bestia-client on GitHub">Watch</a>
    </div>
  </div>
  <div class="row">
    <div class="cell">
      <a href="https://github.com/tfelix/bestia-client">Bestia Game Client</a>
    </div>
    <div class="cell">
      <a class="github-button" href="https://github.com/tfelix/bestia-client" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star tfelix/bestia-client on GitHub">Star</a>
    </div>
    <div class="cell">
      <a class="github-button" href="https://github.com/tfelix/bestia-client/subscription" data-icon="octicon-eye" data-size="large" data-show-count="true" aria-label="Watch tfelix/bestia-client on GitHub">Watch</a>
    </div>
  </div>
  <div class="row">
    <div class="cell"><a href="https://github.com/tfelix/bestia-behemoth">Bestia Behemoth Server</a></div>
    <div class="cell"><a class="github-button" href="https://github.com/tfelix/bestia-behemoth" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star tfelix/bestia-behemoth on GitHub">Star</a></div>
    <div class="cell"><a class="github-button" href="https://github.com/tfelix/bestia-behemoth/subscription" data-icon="octicon-eye" data-size="large" data-show-count="true" aria-label="Watch tfelix/bestia-behemoth on GitHub">Watch</a>
    </div>
  </div>
</div>

## Getting Started

The documentation is divided into three main sections to guide contributors based on their area of interest:

1. **Game Design** – Covers the core mechanics, balance, and world-building aspects of Bestia.
2. **Client Documentation** – Focuses on setting up, developing, and modifying the game client in Godot.
3. **Server Documentation** – Provides insights into the server architecture, database management, and networking protocols.

By following the provided guidelines, developers, artists, and game designers can easily contribute to Bestia—whether through programming, artwork, or scripting.

If you’re new to the project, start with the **Getting Started** section relevant to your area of interest and explore the development workflows. Welcome aboard! 🚀

<script async defer src="https://buttons.github.io/buttons.js"></script>
