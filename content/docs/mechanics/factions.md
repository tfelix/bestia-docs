---
weight: 900
title: Factions
description: "In the crucible of rivalry, the true shape of a faction is forged—not by its victories, but by the bonds its members choose to honor.<br>— Seraphine, Keeper of the Citadel"
---

In each Bestia world incarnation, there are three factions to which the Bestia master can belong. Each faction has its own unique goals and beliefs.

The factions are designed to create dynamic interactions among players. While players can generally engage in combat with each other at any time, the primary rivalries should occur between these factions. Game mechanics should provide each faction with additional bonuses for collaborative efforts, encouraging active participation and strategic gameplay.

Players can invest in their faction's citadel. Only one citadel can exist at a time, but players are free to build as many temples as they wish, where they can access their faction's services. Notably, some achievements by the factions will persist even when the world is replaced by a new one, helping players retain their wealth during [world destruction](/docs/mechanics/doomsday) events.

Players should be able to change factions, but this will come with a challenging task and various disadvantages.

# The Chaos

The Chaos seeks to hasten the world's destruction, believing that the influx of mana is the inevitable fate of every world. They aim to amass mana, open rifts to remote realms, and reshape the world in their twisted image until it is consumed by flames.

The Chaos faction members are experts in improving their mana flow, increasing their mana values and casting powerful spells and rituals that can devastate and corrupt whole areas of the world.

# The Order

The Order is the preserving faction. They believe in stability and strive to halt the ongoing destruction of the worlds, as they understand that the mana flux and rifts destabilize the world. They see the appearance of Bestia as one part of the world's downfall.

Their ultimate goal is to end the influx of mana. To this end, they research spells to remove and control the mana influx and rifts, and in general to dispel mana and perform suppressive rituals to counter magic and Bestia.

# The Harmony

The Harmony seeks to balance the forces of chaos and order. They believe that neither destruction nor preservation alone can sustain the world. Instead, they aim to harness the power of mana to create a harmonious equilibrium. Their goal is to research spells and devices that can stabilize the world without eliminating the mana influx entirely.

Players in this faction must work to maintain a delicate balance, ensuring that neither chaos nor order gains too much control. The faction has great mechanics and inventors building devices to measure the state of the world and help with exploration. Because only knowledge can lead to harmony.

# Faction Goals

Every faction pursues the same reward across a world's lifetime: **Advantage Points**. These points carry over into the next world incarnation and are converted into lasting buffs (see [Faction Advantages](#faction-advantages)). Points are earned in two ways — a steady trickle *while the world is alive*, and a large lump sum *when the world ends* — so factions are rewarded both for holding ground day to day and for shaping how the world ultimately dies.

## Sphere of Influence

The world is divided into regions, and each region tracks a separate **influence** score for every faction. A region's dominant faction is simply the one with the highest score there, and the combined influence a faction holds across all regions is its **sphere of influence**.

Players raise their faction's influence in a region by acting in line with their faction's identity:

- Performing rituals at a temple or the citadel located in that region.
- Bending the region's [mana density](/docs/mechanics/environment/#mana-concentration) toward their goal — **The Chaos** by opening and feeding mana rifts, **The Order** by sealing them, and **The Harmony** by keeping the density within a stable target band.
- Winning fights against opposing factions inside a [war zone](/docs/mechanics/pvp) within that region.
- Completing faction quests and drawing faction-friendly Bestia into the region.

Influence slowly decays if it is not maintained, so a sphere of influence must be actively defended rather than won once. The dominant faction of a region receives a global bonus and may see special resources generated, more mana rifts opened, or friendly Bestia attracted to that land.

## Earning Advantage Points

**While the world is alive**, points trickle in for sustained dominance:

- For every [bestia day](/docs/mechanics/environment/#in-game-time), the faction holding the largest sphere of influence earns **1** Advantage Point.
- **The Harmony** has an additional path: after 60% of the world's expected life span has passed, every day in which the influence of neither **The Chaos** nor **The Order** exceeds 60% earns **The Harmony** **1** Advantage Point. Because balance is easier to sustain than the timing goals below, this steady income is intentionally modest.

**When the world ends**, a final tally is calculated. First, a timing bonus rewards how the world met its fate relative to its predetermined life span (world-ending events are timed when the world is created):

- **The Chaos** earns **1** point for every percentage point the world was destroyed *ahead* of schedule — destroying a world at 80% of its life span grants `20` points.
- **The Order** earns **1** point for every percentage point the world outlived its estimate — keeping a world alive to 130% grants `30` points.

Then a closing bonus is awarded to all factions regardless of alignment:

- **5** points to the faction with the biggest sphere of influence.
- **3** points to the faction that sacrificed or consumed the most resources in its temples.

## Faction Advantages

When a world is created and a faction earned Advantage Points in the previous incarnation, they receive a buff for the entire duration of the next world.

{{< table >}}

| Faction      | Advantage                                                  |
| ------------ | ---------------------------------------------------------- |
| All Factions | +0.5% EXP / earned Advantage Point                         |
| The Chaos    | +0.5% Damage / earned Advantage Point                      |
| The Order    | +0.5% Max HP & Max Mana / earned Advantage Point           |
| The Harmony  | +0.5% yield on resource gathering / earned Advantage Point |

{{< /table >}}

# Citadels and Temples

Each faction builds and maintains a citadel or temple in which it can research powerful spells and devices that players can learn or access to achieve their goals.
If magic rituals are performed in those headquarters, all players belonging to this faction can receive a global buff.

# Switching a Faction

A player can get expelled from a faction by a powerful spell, [Banished from the Citadel](/docs/mechanics/attack-list/#banished-from-the-citadel). However, this spell must first be found as a drop on a spell scroll; it can not be memorized, and if it is applied to a player, that player will get a debuff that sets their status values to `50%` for `Lv/2` (rounded up) days, based on their master's level. **A level 74 master will receive this debuff for 37 [bestia days](/docs/mechanics/environment/#in-game-time)**. The spell also consumes a [Sigil of Redemption](/docs/mechanics/equip-list/#sigil-of-redemption), which is a very costly item.
These are very severe consequences, and this should disincentivize players from performing this switch.
