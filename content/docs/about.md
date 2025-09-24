---
weight: 300
draft: true
title: "About"
icon: "info"
description: "Introduction to Bestia, its open-source philosophy, development history, and technical evolution from browser game to MMORPG."
---

Welcome to the official documentation of **Bestia**, the free and open-source MMORPG built on a Kotlin and Java backend. Bestia is released under the **GPL v3.0 license**, ensuring that anyone can contribute, modify, and expand upon the game freely.

Bestia is a persistent online game that evolved from a browser-based prototype into a fully-fledged MMORPG. The project aims to provide a deep and engaging game world with real-time mechanics, strategic encounters, and a player-driven environment.

This documentation serves as a guide for developers, contributors, and enthusiasts who wish to understand, modify, or expand Bestia. Whether you're interested in game design, client development, or server-side mechanics, you'll find everything you need to get started here.

# The History of Bestia

The origins of *Bestia* trace back many years. Initially, it was conceived as a browser-based game inspired by [OGame](https://ogame.de/). The goal was to create an engaging experience that would encourage participation on a high school webpage. However, the game was never fully completed before its intended audience graduated, leaving the project in an unfinished state.

In its early form, *Bestia* was heavily influenced by [Pokémon](https://en.wikipedia.org/wiki/Pok%C3%A9mon). Players navigated the world using a separate, miniaturized map reminiscent of early *Final Fantasy* games. Traveling to a location took several hours, during which players could trigger encounters with wild *Bestia*. These battles followed a turn-based system. Once inside a location, movement was handled in real time—but instead of direct character control, players would click on a destination, and their avatar would automatically move there if a valid path existed. Ironically this was the most feature complete version of Bestia that so far ever existed: it had some initial quests, NPC to talk to, a questlog and inventory system.

By 2015, the limitations of a 2D browser-based environment and a non-persistent server became increasingly restrictive. As a result, development shifted toward a persistent, continuously running backend service written in Java. This transition allowed for a much richer simulation of the game world—something inherently difficult to achieve with PHP. However, designing the server architecture proved to be a long and iterative process, undergoing multiple revisions over the years. It became quickly clear that a single server could not handle the requirements I had in mind for the size of the game world and the number of entities it had to manage.

This shift also introduced new challenges, particularly in content creation. Unlike a simple browser game, a fully persistent MMORPG required vastly different development pipelines—an especially demanding task for a solo developer with a background primarily in server architecture.

Around 2020, the free and open-source engine [Godot](https://godotengine.org/) was adopted as part of the tech stack. Its open-source nature made it possible to modify and extend the engine as needed, particularly to support the game's networked server connection. This integration marked a significant step in *Bestia’s* evolution, paving the way for a more sophisticated and immersive gaming experience. But development still stagnated which as also due to the complexity of the used Actor framework Akka. While the framework is very powerful, integration was challenging especially with Springs injection behavior. It resulted in a lot of time spend finding workarounds instead of focusing on core game development. After some years Akka pulled its liberal open source license and the decision was made to switch the tech stack once more.

Fast forward to 2025 we are now on Godot 4.5, protobuf and a mostly clean and standard Spring backend which runs the [Fleks entity component framework](https://github.com/Quillraven/Fleks).
