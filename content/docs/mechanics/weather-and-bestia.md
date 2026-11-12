---
weight: 1250
title: Weather and Bestia
description: How temperature and weather wear a bestia down through its stamina, and how picking the right bestia for the trip is the answer.
---

# Overview

The weather reaches a bestia through its [stamina](/docs/mechanics/statusvalues/#stamina---sta). There is no extra bar
for body heat or wetness. Three rules make up the whole system:

1. **Every species has its own comfort window.** Outside of it the bestia loses stamina, and once stamina is gone it
   loses HP.
2. **Every species likes or dislikes some weather.** This only changes how fast it regains stamina. It never deals
   damage.
3. **A bestia in the bag rests.** The weather cannot reach it there.

The goal is that the player picks the bestia that fits the trip. A snow bestia is at home on the ice sheet, a fire
bestia suffers there. The weather is a reason to go out with the right team, not a tax on every walk.

{{< alert context="info" text="Not built yet. Today zone-server uses one window for every entity and ignores VIT and WIL, the weather kind and the bag. The low-stamina effects from the status values page are also still missing." />}}

# Comfort Window

## Species Window

Each species has a window in °C in which it feels fine. The window comes from the
[biomes](/docs/server/world-generation/#biomes) the species lives in: every biome has a rough window, and a species
gets the widest window of all its biomes. The spawner uses the same window to keep dens in places that fit.

| Species     | Habitat                          | Window [°C] |
| ----------- | -------------------------------- | ----------- |
| Snowcap     | Tundra, ice sheet                | -40 to 5    |
| Puddlehop   | Riparian, lake, bog              | -10 to 40   |
| Sproutling  | Temperate forest, grassland      | -5 to 30    |
| Magma Titan | Volcanic field, geothermal basin | 0 to 60     |

A species without a habitat, for example a boss, uses the window of a Bestia Master.

A **Bestia Master** always has the window **-6 °C to 34 °C**. It is wide on purpose. The gentle country, where new
players start, is outside this window for only about 5% of the year: a few winter nights that teach the mechanic in a
safe place. Deserts, high mountains and the ice are outside of it most of the time and need preparation.

## Widening the Window

These sources widen the window. They add up.

- **Stats.** `VIT` and `WIL` widen both ends by `sqrt(VIT / 2 * WIL / 4)` degrees. This holds for masters and bestia.
- **Skills.** Passives such as [Wilderness Survival](/docs/mechanics/master/#skill-wilderness-survival) widen both
  ends.
- **Status effects.** `Warmed` (from the bestia skill Warm Fur) lowers the cold end by 15 °C. `Cooled` (from Cooling
  Mist) raises the hot end by 15 °C. Each one helps on one side only. See [status effects](/docs/mechanics/status-effects/).
- **Shelter.** A roof does not widen the window, it makes the air under it milder. A
  [mana storm](/docs/mechanics/environment/#mana-concentration) ignores shelter.

```text
low  = windowLow  - statTolerance - skillTolerance - warmed
high = windowHigh + statTolerance + skillTolerance + cooled
```

{{< alert context="warning" text="Balancing is open. Stats have no cap, so VIT 100 and WIL 100 widen the window by about 35 °C. That alone makes the ice sheet bearable for a master. The species windows are also rough: a forest species ends at 28 °C, which a summer afternoon in the starter country can reach. Both need a measurement on a reference world before they ship." />}}

## Outside the Window

Every 5 seconds the server checks each entity. For every degree outside the window it loses `0.6` stamina, at least
`1`. When stamina is at `0`, the same cost hits HP at half the amount. An entity can die of exposure. Wild mobs can too.

Example: a Snowcap in a 20 °C meadow is 15 °C outside its window. It loses `9` stamina every 5 seconds, `108` per
minute.

Before that, low stamina already slows the bestia down. The [stamina rules](/docs/mechanics/statusvalues/#stamina---sta)
apply to masters and bestia alike: below 30% the walk speed drops, below 10% HP and mana stop regenerating. An
exhausted bestia falls behind its master, so the player sees the problem before it becomes dangerous.

# Weather Likes and Dislikes

Each species likes some weather kinds and dislikes others. This only changes its
[stamina recovery](/docs/mechanics/statusvalues/#stamina-recovery). It is added to `STARMod`:

| Situation                                | `STARMod` |
| ---------------------------------------- | --------- |
| Liked weather, inside the comfort window | `+50`     |
| Disliked weather                         | `-50`     |

- A liked weather only helps inside the comfort window. A fire bestia in the snow does not recover faster because it
  happens to like clear skies.
- Under a roof the weather does not count, neither liked nor disliked. A mana storm ignores the roof here too.
- Masters have no likes or dislikes.

## Defaults by Element

Most species take their likes and dislikes from their element. A species can override them in `data/bestias.yaml`
with `weather: { likes: [...], dislikes: [...] }`.

| Element               | Likes                 | Dislikes                                       |
| --------------------- | --------------------- | ---------------------------------------------- |
| Fire                  | Clear                 | Rain, heavy rain, thunderstorm, snow, blizzard |
| Water                 | Rain, heavy rain, fog | Sandstorm                                      |
| Earth                 | Sandstorm             | Heavy rain                                     |
| Wind                  | Thunderstorm          | -                                              |
| Poison                | Fog                   | -                                              |
| Holy                  | Clear                 | Fog                                            |
| Shadow, Ghost, Undead | Fog                   | -                                              |
| Normal                | -                     | -                                              |

**Every bestia likes a mana storm.** Bestia are born from mana, while a mana storm is a threat to masters. On top of
the element defaults, this makes a mana storm a moment where the bestia carry the team.

The defaults match the [rain modifiers](/docs/mechanics/world/environment/#rain) on damage: fire and earth are weaker in the
rain, wind and water are not.

# Bestia in the Bag

A bestia in the bag is out of the weather. It takes no exposure, and likes and dislikes do not count. It recovers
stamina at the resting rate, which is double the normal rate.

This is the main counter-play. A player who crosses a cold pass sends the fire bestia into the bag and calls out the
snow bestia, and swaps back on the other side.

# What the Player Sees

- **Icons in the buff bar.** _Freezing_ or _Overheating_ while outside the window, _In its Element_ in liked weather,
  _Uneasy_ in disliked weather. They have no duration and go away when the situation ends.
- **The stamina bar** of the bestia, which already exists.
- **The [compendium](/docs/mechanics/bestia-compendium/)** shows the comfort window and the likes and dislikes once
  the species has been seen.

# Later

These ideas build on the system above, but are not part of it yet:

- **A bestia shares its warmth.** A bestia with Warm Fur or a big coat keeps its master warm while close by.
- **Wild mobs look for comfort.** Today the spawner keeps dens inside the window, but no AI moves a mob out of the cold.
  The same window can drive that.
