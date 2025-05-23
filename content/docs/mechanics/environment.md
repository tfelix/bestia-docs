---
title: Environment
---

# Environment

Bestia uses a sophisticated temperature and environment system to drive weather simulation and the effects on the player's environment.

These simulations should be based on certain basic values that are determined location-dependent, but can be changed by interaction with the players. Also, natural changes in the world (alternating seasons) should lead to an adjustment of these values. Due to the changes of the environmental values the environment areas have to be adapted to the world itself. These have to be adjusted anyway if they should change due to other local effects like fire or mining. The client must be informed about adjusted environment areas.

> Bestia Master enter the current world from another, not further mentioned dimension. During each incarnation
> a name of this world is generated and in each cycle all Bestia Master entering the game will have this world name
> persisted in their account data to keep a record.

## Temperature

Each Bestia has a certain sweet spot of tolerable temperature. There are several kinds of base temperature ranges in which Bestia thrive:

| Temperature Kind   | Base Temperature Range [°C] |
| ------------------ | --------------------------: |
| Low Temperature    |                    -20 - 15 |
| Medium Temperature |                     10 - 30 |
| High Temperature   |                     25 - 45 |

`Vitality` and `Willpower` increases resistance against the temperatures. Specialized equipment or status effects can also
affect temperature resistance.

The formular is as follows:

{{< katex display >}}
   T_{tolerable} += T_{base} + \sqrt{\text{VIT}} / 2 \cdot \sqrt{\text{WILL}} / 4
{{< /katex >}}

For items and structures these calculation is a bit different. Usually these items have some threshold above or under which they will start to malfunction (or perhaps even catch fire!).

## Weather

The weather system in Bestia plays a crucial role. It also affects the visibility and also the behavior of the NPC and
mobs. Depending on the weather the NPCs and the player character will need a improved shelter or equipment to avoid a loss of stamina.

The weather influences also the temperature which will in turn decide if and how much stamina a entity regenerates or loses.

The weather will also play a role in which crops and plants grow. If the player decided to plant salad in the desert this won't work quite well.

### Rain

A in strength controllable rain effect should overlay the entire viewport. The rain blowing direction should correlate
with the wind direction (which will be more or less random). During rain the ground will show a wet effect and view distance is
reduced. It also reduces the effectiveness of fires and might extingush them. Fire attacks will lose certain strengths in a very wet environment (like burning effects won't last very long).

### Fog

Clouds of fog will move slowly over the map. And the sight of the AI entities is reduced. Its will also get harder for a player to see.

### Night

During night time the player will need light sources in order to improve
the visibility of enemies or terrain. There will be certain items (e.g. torches, candles etc.) as well as spells to
make light.

## In-Game Time

The time in the Bestia game is faster than the real-world time. When we refer to the faster in-game time we will call it **Bestia time**, if we refer to the normal time we call it **real-time**.

Changing seasons should lead to an impression of the changeability of the world. You have to adapt to a periodically
changing environment. Things that work in summer may not be possible in winter. But so that the players don't have
to wait for a real year, time in Bestia flies faster.

The Bestia-Time starts at the creation of the Bestia world. It is basically three times faster then the usual time.
This means that the normal bestia day has 8 hours in real-time.

This means that the bestia month has 10 days in real-time and a bestia year is 4 months in real time.

* Bestia year: 4 months
* Bestia season: summer, winter, fall, spring: each 1 month
* Bestia day: 8 hours (2 hours night, 6 hours daytime)

The assymetric day night cycle just allows the player to be more productive during the day while still getting a decent amount
of night time in which for example special bestias can be hunted. It also allows the player to see multiple day-night cycles on the same day.

> If it turns out that the night period is too annoying for the players because
> of the limited amount of gameplay then the night might get shortened.

This calculation results in the following example timespans:

| Bestia Time | Real-Time |
| ----------- | --------- |
| 3 h         | 1 h       |
| 12 d        | 4 d       |
| 1 yr        | 4 mon     |
