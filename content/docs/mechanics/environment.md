---
title: Environment
weight: 100
---
# Environment

Bestia uses a sophisticated temperature and environment system to drive weather simulation and the effects on the players
environment.

## Temperature

Each Bestia has a certain sweet spot of tolerable temperature. There are several kind of base temperature ranges in
which Bestia thrive:

| Temperature Kind   | Base Temperature Range (°C) |
| ------------------ | --------------------------: |
| Low Temperature    |                    -20 - 15 |
| Medium Temperature |                     10 - 30 |
| High Temperature   |                     25 - 45 |

`Vitality` and `Willpower` increases resistenace against the temperatures. Specialized equipments or status effects can also
affect temperature resistence.

The formular is as follows:

```kotlin
val increaseToleraceVit = sqrt(VIT) / 2
val increaseToleraceWill = sqrt(WILL) / 4
```

For items and structures these calculation is a bit different. Usually these items have some threshold above or under which they will
start to malfunction or perhaps even catch fire.

## Weather

The weather system in Bestia plays a crucial role. It also affects the visibility and also the behavior of the NPC and
mobs. Depending on the weather the NPCs and the player character will need a improved shelter or equipment to avoid a
loss of stamina.

The weather influences also the temperature which will in turn decide if and how much stamina a entity regenerates or loses.

The weather will also play a role in which crops and plants grow. If the player decided to plant salad in the desert this won't work
well.

## Rain

A in strength controllable rain effect should overlay the entire viewport. The rain blowing direction should correlate
with the wind direction (which will be more or less random). During rain the ground will show a wet effect and view distance is
reduced.

## Fog

Clouds of fog will move slowly over the map. And the sight of the entities is reduced.

## Sunshine

The light will bleach out the colors and form a more lighter environment. Certain plants grow well in this environment.

## Night

During night time the player will need light sources in order to improve
the visibility of enemies or terrain. There will be certain items (e.g. torches, candles etc.) as well as spells to
make light.
