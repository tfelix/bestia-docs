---
title: Alchemy
type: docs
---
# <i class="fas fa-flask"></i> Alchemy

The brewing is a time consuming process. The process should be somehow deterministic so the results are logically to be obtained.

Once a receipt was discovered it is saved for the user so it can be reused very quickly. If a player repeatedly makes
the same receipt the quality of the produced potions increases over time. The player can choose to write down the
receipt and give it to other players who might increase their skill by reading it.

## Craft Duration

Craft duration is determined by the item level which the player wants to craft. Skill points in the suitable skill tree
(weapon, equipment, construction or alchemy, artifacts) reduces the build time. The `baseDuration` is given in real
time minutes.

```kotlin
baseDuration = 28.8 * itemLevel
```
