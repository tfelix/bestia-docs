---
weight: 300
draft: true
author: "Colin Wilson"
title: "About"
icon: "info"
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

# History of Bestia

The origins of *Bestia* trace back many years. Initially, it was conceived as a browser-based game inspired by [OGame](https://ogame.de/). The goal was to create an engaging experience that would encourage participation on a high school webpage. However, the game was never fully completed before its intended audience graduated, leaving the project in an unfinished state.

In its early form, *Bestia* was heavily influenced by [Pokémon](https://en.wikipedia.org/wiki/Pok%C3%A9mon). Players navigated the world using a separate, miniaturized map reminiscent of early *Final Fantasy* games. Traveling to a location took several hours, during which players could trigger encounters with wild *Bestia*. These battles followed a turn-based system. Once inside a location, movement was handled in real time—but instead of direct character control, players would click on a destination, and their avatar would automatically move there if a valid path existed.

By 2015, the limitations of a 2D browser-based environment and a non-persistent server became increasingly restrictive. As a result, development shifted toward a persistent, continuously running backend service written in Java. This transition allowed for a much richer simulation of the game world—something inherently difficult to achieve with PHP. However, designing the server architecture proved to be a long and iterative process, undergoing multiple revisions over the years.

This shift also introduced new challenges, particularly in content creation. Unlike a simple browser game, a fully persistent MMORPG required vastly different development pipelines—an especially demanding task for a solo developer with a background primarily in server architecture.

Around 2020, the free and open-source engine [Godot](https://godotengine.org/) was adopted as part of the tech stack. Its open-source nature made it possible to modify and extend the engine as needed, particularly to support the game's networked server connection. This integration marked a significant step in *Bestia’s* evolution, paving the way for a more sophisticated and immersive gaming experience.
