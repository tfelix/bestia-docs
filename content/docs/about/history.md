---
weight: 10
bookCollapseSection: false
title: History
---

# History of Bestia

The origins of *Bestia* trace back many years. Initially, it was conceived as a browser-based game inspired by [OGame](https://ogame.de/). The goal was to create an engaging experience that would encourage participation on a high school webpage. However, the game was never fully completed before its intended audience graduated, leaving the project in an unfinished state.

In its early form, *Bestia* was heavily influenced by [Pokémon](https://en.wikipedia.org/wiki/Pok%C3%A9mon). Players navigated the world using a separate, miniaturized map reminiscent of early *Final Fantasy* games. Traveling to a location took several hours, during which players could trigger encounters with wild *Bestia*. These battles followed a turn-based system. Once inside a location, movement was handled in real time—but instead of direct character control, players would click on a destination, and their avatar would automatically move there if a valid path existed.

By 2015, the limitations of a 2D browser-based environment and a non-persistent server became increasingly restrictive. As a result, development shifted toward a persistent, continuously running backend service written in Java. This transition allowed for a much richer simulation of the game world—something inherently difficult to achieve with PHP. However, designing the server architecture proved to be a long and iterative process, undergoing multiple revisions over the years.

This shift also introduced new challenges, particularly in content creation. Unlike a simple browser game, a fully persistent MMORPG required vastly different development pipelines—an especially demanding task for a solo developer with a background primarily in server architecture.

Around 2020, the free and open-source engine [Godot](https://godotengine.org/) was adopted as part of the tech stack. Its open-source nature made it possible to modify and extend the engine as needed, particularly to support the game's networked server connection. This integration marked a significant step in *Bestia’s* evolution, paving the way for a more sophisticated and immersive gaming experience.
