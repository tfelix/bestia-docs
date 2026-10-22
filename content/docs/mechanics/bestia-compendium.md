---
weight: 320
title: Bestia Compendium
description: "The book every master keeps of the bestia species they have seen and caught, and how it points them to where a species lives."
---

{{< alert context="info" text="Implemented in bestia-behemoth on the `compendium/01..06` branches: recording on the zone, the window in the client, the habitat overlay on the map and a Compendium tab in the companion app." />}}

Every master keeps a **Bestia Compendium**, a book of every bestia species. It fills up as the master and their
bestias explore the world. It is the place to look up what a species is, where it lives and whether you have caught
one yet.

# What the book lists

The compendium lists **every species number**, from the first to the last. The game is open source, so hiding which
numbers exist would protect nothing. What a master has not seen yet stays blacked out:

| State  | What the entry shows                                                                                                                           |
| :----- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| Unseen | The number, a black silhouette and `???`                                                                                                       |
| Seen   | Portrait, live model, name, kind, habitat, the [description](/docs/mechanics/bestia-design/#9-the-compendium-entry) and when it was first seen |
| Caught | Everything a seen entry shows, plus a caught mark                                                                                              |

Townsfolk and creatures made for game masters are not bestias a master would study. A mob YAML with
`compendium: false` keeps a species out of the book entirely.

# Seeing a species

A species counts as **seen** when a wild bestia of it comes within **24 m** of the master or of any bestia the master
owns. A bestia left standing somewhere else keeps watching for its master. This makes it worth sending bestias ahead
into new ground.

24 m is about what is clearly visible on screen. The terrain a client loads reaches much further, and loading a
creature is not the same as seeing it.

Only living, wild bestias count. A body on the ground or somebody else's bestia does not.

# Catching a species

A species counts as **caught** the first time a [trap](/docs/mechanics/bestia/#catching-bestias) catches one. It stays
caught when the master has no free slot and the creature is released again, or when the bestia is later given away.

A master who owned bestias before the compendium existed finds those species already marked as caught.

# The entry

- **Portrait.** A hand-drawn picture of the species. Species without art yet show a placeholder.
- **Live model.** The species' 3D model on neutral ground, seen at an angle from above. It turns slowly and can be
  dragged to turn it. Only the game client shows it; the companion app shows the portrait alone.
- **Name, kind and description.** The translated text from the mob YAML, see
  [Where the text lives](/docs/mechanics/bestia-design/#where-the-text-lives).
- **Habitat.** The [biomes](/docs/server/world-generation/#biomes) the species spawns in. An empty habitat means
  anywhere on land.

The list can be searched by name and number, and filtered to all, seen or caught species.

# Habitat on the map

A seen species can be shown on the [map](/docs/mechanics/world-exploration/#explored-world-map), to help hunt it. The
overlay only covers ground the master's charts show: it never reveals uncharted land.

It has two layers:

1. **Biome tint.** A light wash over every charted pixel whose biome is in the species' habitat. It says where the
   species _may_ live.
2. **Heat haze.** A stronger, blurred glow around each den of the species. A large biome may hold only a few dens,
   and the tint alone would send a player across half a continent.

The haze must narrow the search without marking the den. Each den's glow is a soft blob about 800 m across, and its
centre is moved 100 to 250 m away from the den. The den is inside the warm area, but never at its hottest point.
Where many dens sit close together, their blobs merge into one warm area. The haze stays off water. The offset is
fixed per den, so asking for the same tile again gives the same picture: there is nothing to average away.

Creature dens are otherwise never shown on the map. The haze is the one deliberate exception, and it is blurred on
purpose.

# Companion app

The [companion app](/docs/mechanics/companion-app/) has a **Compendium** tab with the same list, search and filters.
Its map can show the same habitat overlay. Both only show what the master already knows, so the app stays a report of
the player's own knowledge and not a lookup of the world.
