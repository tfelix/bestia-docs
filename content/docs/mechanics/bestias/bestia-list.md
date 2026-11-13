---
title: Bestia List
weight: 9050
description: Every bestia species of the world, from the field rat at the edge of town to the Behemoth.
---

Every species of the game, as `data/bestias.yaml` holds it. The same file is the source of zone-server's mob YAMLs:
`tools/bestia_export.py` runs the [Bestia Blueprint Calculator](/docs/mechanics/bestias/bestia-design/#bestia-blueprint-calculator)
on each row, so health, attributes, EXP and the learnset follow the method on [Designing a Bestia](/docs/mechanics/bestias/bestia-design/).

- **Level bands:** low level is up to Lv 15, mid level up to Lv 55, high level above. Bosses spawn alone in rare
  boss dens. [World bosses](/docs/mechanics/world/world-history/#world-bosses) (ids 101 to 105) live only where a
  world's history put them. Event bestia (ids 106 and up) only appear at events.
- **Count:** ids 1 to 100 are the regular species. Three of these slots are free until the battlefield ghosts arrive.
- **Utility skills:** what a caught bestia does for its master outside a fight. They take the place of an attack in its
  learnset; the rest of the learnset comes from its role and element, see the [Attack List](/docs/mechanics/combat/attack-list/).
- **Loot:** the chance to drop on a kill.

{{< bestialist >}}
