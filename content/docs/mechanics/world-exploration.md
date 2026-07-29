---
title: World Exploration
weight: 1100
description: Explains how players explore and map the game world, including cartography mechanics, difficulty factors, and how explored maps are stored and rendered.
---

Most of **Bestia**'s world is generated automatically, but very little of it starts explored. That gap is the point:
charting new territory is how players uncover unique resources, stumble on new items, and piece together the stories
behind how those items came to be. Over time the entire world is meant to be mapped collectively by the playerbase, and
anyone can check that collective progress by viewing the shared world map online.

{{< alert context="info" text="This page covers the player-facing exploration and mapping loop. For how the underlying terrain, biomes and navigation graph are generated in the first place, see the server-side [World Generation](/docs/server/world-generation) page." />}}

A charted map isn't just a picture of the world — it unlocks concrete gameplay:

1. Most spells can only be targeted at locations inside an already-charted area.
2. AI-assisted movement for a controlled Bestia only works within charted territory.
3. [Public world events](/docs/mechanics/questing/#world-events) are only announced on, and synced across, the maps players own.
4. Mineral prospecting with the [Mining](/docs/mechanics/master/#skill-mining) skill only works inside charted areas.

A few ground rules govern how maps work:

* Every player can create their own world map in-game.
* Players with the [Cartography](/docs/mechanics/master/#skill-cartography) skill can merge several maps into one, combining everyone's explored area.
* At high skill levels, a cartographer can craft magical maps that go further still — sharing custom markers with friends, or surfacing known resource locations directly on the map.

Copying someone else's map is technically possible, but without training in Cartography it's extremely difficult and most likely to fail.

To generate the visuals of the player map, **Bestia** uses the algorithm described in
[Terrain Map Generation](http://mewo2.com/notes/terrain/) and its
[reference implementation on GitHub](https://github.com/mewo2/terrain).

# Cartography

To chart an area of the map, players play out a manual mini-game rather than watching a progress bar fill. They choose
how wide an area to survey — bigger areas are harder to chart, and the further the target area is from already-explored
land, the harder the attempt becomes. Players may also use devices that make surveying larger areas easier.

A failed attempt puts that vicinity on cooldown before it can be tried again; the cooldown is shorter when the next
attempt targets an adjacent, still-unexplored area instead.

There are three difficulty tiers, describing both the range of the survey and its base difficulty:

{{< table >}}

| Range | Difficulty |
| ----- | ---------- |
| 1km   | 30         |
| 3km   | 50         |
| 5km   | 80         |

{{< /table >}}

The following applies:

* For every km from already-explored land, difficulty increases by `10`.
* For every 1% of [mana concentration](/docs/mechanics/environment/#mana-concentration) in the area, difficulty increases by `0.5`.
* Every level of [Cartography](/docs/mechanics/master/#skill-cartography) reduces difficulty by `10`.

1. Using the skill determines a difficulty `d`, based on the distance to the nearest already-charted area and the size of the area being surveyed.
2. Between 3 and 5 locations `l` spawn around the player, at a distance of 300 to 800 meters depending on `d`. Each must be reached within a time limit `t`.
3. Getting within 5m of one of these locations brings up a moving compass minigame: the needle's speed and the size of the window that must be hit are both calculated from `d`.

# Explored World Map

Explored areas are stored as squares to keep the data compact. The complete explored map lives on the server as a
Run-Length Encoded (RLE) data structure, at a smallest resolution of 100m.

The server generates a single base terrain map, and each player's map is a sub-section of it — every player map keeps
its own data, so it only ever displays what that particular map instance has actually explored. Building the display
map works like this on the server:

1. Determine which area the player's map covers.
2. Decode the RLE-encoded explored area for that region.
3. Overlay it on the server's complete map to extract only the explored, visible data, discarding the rest.
4. Send the resulting display data to the client.
