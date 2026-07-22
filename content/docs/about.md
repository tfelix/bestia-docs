---
weight: 300
title: "About"
icon: "info"
description: "Introduction to Bestia, its open-source philosophy, development history, and technical evolution from browser game to MMORPG."
---

Welcome to the official documentation of **Bestia**!

Bestia is a persistent online world that grew from a browser-based prototype into a fully-fledged MMORPG. Rather than chasing a feature checklist, it aims for a world that feels alive: real-time mechanics, encounters that reward planning over reflexes, and an environment shaped by the players who inhabit it.

This documentation serves as a guide for developers, contributors, and enthusiasts who wish to understand, modify, or expand Bestia. Whether you're interested in game design, client development, or server-side mechanics, you'll find everything you need to get started here.

The free and open-source MMORPG runs on a Kotlin and Spring backend. Bestia is released under the **GPL v3.0 license**, ensuring that anyone can contribute, modify, and expand upon the game freely.

# The History of Bestia

The origins of _Bestia_ trace back many years. The original development started in 2005. Initially, it was conceived as a browser-based game inspired by [OGame](https://ogame.de/). The goal was to create an engaging experience that would encourage participation on a high school webpage. However, the game was never fully completed before its intended audience graduated, leaving the project in an unfinished state.

In its early form, _Bestia_ was heavily influenced by [Pokémon](https://en.wikipedia.org/wiki/Pok%C3%A9mon). Players navigated the world using a separate, miniaturized map reminiscent of early _Final Fantasy_ games. Traveling to a location took several hours, during which players could trigger encounters with wild _Bestia_. These battles followed a turn-based system. Once inside a location, movement was handled in real time—but instead of direct character control, players would click on a destination, and their avatar would automatically move there if a valid path existed. Ironically, this was the most feature-complete version of Bestia that has ever existed: it had some initial quests, NPCs to talk to, a questlog, and an inventory system.

By 2015, the limitations of a 2D browser-based environment and a non-persistent server became increasingly restrictive. As a result, development shifted toward a persistent, continuously running backend service written in Java, built on Spring and the Akka actor framework. This transition allowed for a much richer simulation of the game world—something inherently difficult to achieve with PHP. However, designing the server architecture proved to be a long and iterative process, undergoing multiple revisions over the years. It became quickly clear that a single server could not handle the requirements I had in mind for the size of the game world and the number of entities it had to manage.

This shift also introduced new challenges, particularly in content creation. Unlike a simple browser game, a fully persistent MMORPG required vastly different development pipelines—an especially demanding task for a solo developer with a background primarily in server architecture.

Around 2020, the free and open-source engine [Godot](https://godotengine.org/) was adopted as part of the tech stack. Its open-source nature made it possible to modify and extend the engine as needed, particularly to support the game's networked server connection. This integration marked a significant step in _Bestia’s_ evolution, paving the way for a more sophisticated and immersive gaming experience. But development still stagnated, in part due to the complexity of the Akka actor framework that the Java backend was built on. While Akka is very powerful, integration was challenging, especially with Spring's dependency injection behavior. It resulted in a lot of time spent finding workarounds instead of focusing on core game development. When Akka later relicensed away from its permissive open-source license, the decision was made to switch the tech stack once more.

The backend was converted from Java to Kotlin—still on Spring, but with Akka dropped in favor of a self-written Entity Component System for the world persistence.

Fast forward to 2026: we are now on Godot 4.7, use protobuf for networking, and run a mostly clean and standard Kotlin and Spring backend.
