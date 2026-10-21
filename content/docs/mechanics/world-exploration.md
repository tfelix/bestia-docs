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

- Every player can create their own world map in-game.
- Players with the [Cartography](/docs/mechanics/master/#skill-cartography) skill can merge several maps into one, combining everyone's explored area.
- At high skill levels, a cartographer can craft magical maps that go further still — sharing custom markers with friends, or surfacing known resource locations directly on the map.

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

- For every km from already-explored land, difficulty increases by `10`.
- For every 1% of [mana concentration](/docs/mechanics/environment/#mana-concentration) in the area, difficulty increases by `0.5`.
- Every level of [Cartography](/docs/mechanics/master/#skill-cartography) reduces difficulty by `10`.

1. Using the skill determines a difficulty `d`, based on the distance to the nearest already-charted area and the size of the area being surveyed.
2. Between 3 and 5 locations `l` spawn around the player, at a distance of 300 to 800 meters depending on `d`. Each must be reached within a time limit `t`.
3. Getting within 5m of one of these locations brings up a moving compass minigame: the needle's speed and the size of the window that must be hit are both calculated from `d`.

# Explored World Map

A map is an item. Each **chart** records the ground it covers as a grid of 64 m cells, and what a player sees on their
map is everything covered by all the charts they carry. Charts come from surveying with
[Cartography](/docs/mechanics/master/#skill-cartography), and every new master starts with a chart of the 5 km around
their home. The explored area belongs to the chart, not to the player, so a chart that is traded, dropped or looted
takes its ground with it.

The server draws a single base map of the whole world, and each player's map is cut out of it:

1. Ground no chart covers is never sent, not even as an empty picture, so nothing about it reaches the client.
2. Ground that is fully charted is the same picture for everyone and can be cached for good.
3. At the edge of a chart, the map fades out over the last 160 m instead of stopping at a hard line.

## What a Map Shows

On charted ground a map shows the terrain, water, roads, settlements, ruins and landmarks, each labelled with its
name. Close in, at the scale of a town's streets, it also marks the **services**: the places where a player can
actually get something done.

| Service    | What it marks                                                              |
| ---------- | -------------------------------------------------------------------------- |
| Merchant   | A shop with someone behind the counter: the general store, a baker, a miller |
| Market     | A town's market building                                                   |
| Inn        | An inn inside a settlement (roadside inns are already marked as landmarks) |
| Temple     | A temple and its priest                                                    |
| Guard      | The barracks, where the guard is when it is not on the street              |
| Ward stone | The ward stone raised at a home settlement                                 |

A few rules decide what appears:

- **Only on charted ground.** A shop one street past the edge of your charts stays hidden until you chart that street.
- **Only what someone runs.** A business appears once the town has someone who works there, so every marker is a
  place you can walk into and use. More trades will show up as more townsfolk take them on.
- **The world as it is now.** A map is not a snapshot of the day it was charted. If a building is knocked down or a
  ward stone is broken, it disappears from every map that covers it.
- **Opening hours.** Selecting a service shows its name, its settlement and its keeper's hours, and a service that is
  closed is drawn dimmed. Selecting it a second time sets off towards it.
