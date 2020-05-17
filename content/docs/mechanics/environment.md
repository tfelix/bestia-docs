---
title: Environment
---

# Environment

Bestia uses a sophisticated temperature and environment system to drive weather simulation and the effects on the players environment.

These simulations should be based on certain basic values which are determined location-dependent, but can be changed by interaction with the players. Also natural changes through the world (seasons) should lead to an adjustment of these values. Due to the changes of the environmental values tiles have to be adapted to the world itself. These have to be adjusted anyway if they should change due to other local effects like fire or mining. The client must be informed about adjusted tiles.

> Bestia Master enter the current world from another, not further mentioned dimension. During each incarnation
> a name of this world is generated and in each cycle all Bestia Master entering the game will have this world name
> persisted in their account data to keep a record.

## Temperature

Each Bestia has a certain sweet spot of tolerable temperature. There are several kind of base temperature ranges in which Bestia thrive:

| Temperature Kind   | Base Temperature Range [°C] |
| ------------------ | --------------------------: |
| Low Temperature    |                    -20 - 15 |
| Medium Temperature |                     10 - 30 |
| High Temperature   |                     25 - 45 |

`Vitality` and `Willpower` increases resistenace against the temperatures. Specialized equipments or status effects can also
affect temperature resistence.

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

## Ingame Time

The time in the Bestia game is faster then the real world time. When we refer to the faster in-game time we will call it **Bestia time**, if we refer to the normal time we call it **real time**.

Changing seasons should lead to an impression of the changeability of the world. You have to adapt to a periodically
changing environment. Things that work in summer may not be possible in winter. But so that the players don't have
to wait for a real year, time in Bestia flies faster.

The bestia time starts at the creation of the bestia world. It is basically three times faster then the usual time.
This means that the normal bestia day has 8 hours in real time.

This means that the bestia month has 10 days in real time and an bestia year is 4 month in real time.

* Bestia year: 4 months
* Bestia seasion: summer, winter, fall, spring: each 1 month
* Bestia day: 8 hours

This allows the player to see multiple day-night cycles on the same day while allowing him to play for a considerable
time so he can actually do something meaningful until the sun rises again.

> If it turns out that the night period is too annyoing for the players because
> of the limited amount of gameplay then the night might get shortened.

This caluclation results in the following example timespans:

| Bestia Time | Real Time |
| ----------- | --------- |
| 3 h         | 1 h       |
| 12 d        | 4 d       |
| 1 yr        | 4 mon     |

## The Threat

After a random period of time (at least 6 months in [real time](/docs/mechanics/time)), a threats starts to appear in every world incarnation. These can be threats from particularly strong Bestia, which cause great destruction, but also magical elements or natural disasters such as meteorites. Under certain conditions, this event can also contribute to the destruction of the world. If the total destruction is caused by the event itself then none of the cults will benefit from it. So it is in the interest of the cult players to avert this threat together.

{{< tabs "Thread Appearence Delay" >}}
{{< tab "Population < 1k" >}}
```kotlin
delay = 9 + rand() * 1.5;
```

{{< /tab >}}
{{< tab "Population < 5k" >}}

```kotlin
delay = 9 + rand() * 2.5;
```

{{< /tab >}}
{{< tab "Population > 5k" >}}

```kotlin
delay = 9 + rand() * 4;
```
{{< /tab >}}
{{< /tabs >}}

A threat does not necessarily have to be perceived directly. A meteor, or severe flooding, can take place far away, changing parts of the world without much of the player community noticing but permanently shaping and changing the world. A subtle fear of this event creeping up should always haunt players.

Not described events:

* Vulcanic Activity
* Tsunami / Permanent Flooding
* Metorite Impact
* Iceage
* The Great Drought
* Mana Burn
* The Destroyer (a Bestia targeting player cities)

### Rift Event

Starting in areas with big mana presence a first rift opens up. These are detactable with Spells which reveal big mana concentrations and also can be detected by special rift detection spells or devices. This should allow the player to aproximatly pin point the rift origin.

### Mana Crystal Infestation

In areas with a very high mana concentration a Mana Infestation can manifest. It increases mana generation in the area and depending on the concentation is will spawn new crystals next to it. The crystals damage every creature or structure in its vicinity, eventually consuming more and more of the planet destroying everything.

The crystals itself can be destroyed. Everything which drains mana or banishes it is helpful to reduce the crystals.

## World Exploration

A large part of the game world is generated automatically. There should be a motivation for players in exploring the world. New areas can be mapped and unique resources can be discovered and explored. In general, players should have their own branch about the secrets of the world to discover new items and how they are created. The entire world must gradually be explored and mapped by players. A hidden map has to be uncovered regularly. Players will be able to view this map online and see the overall progress of the exploration.

Possible events can then also be announced on this public map. Every player should be able to create a world map in-game. Special cartographers should be able to combine these maps or generate new magic maps to inform about possible events (exchange information with friends via markers, or display certain resource sources).

To make even more impact the explored maps are very needed by the general player population in order to preciesly target locations or send Bestias into the area for certain AI controlled missions. The maps, once created, can thus be copied and sold by the cartographer. Regular player might try to create copies but this will be very hard without a cartography skill and most likly fail.

Exploring of the land should be a fun process but not so easy as going into the wild and pressing one simple button.

For generating the visual of the player map we use the algorithm described in [Terrain Map Generation](http://mewo2.com/notes/terrain/)
and its respective [Github repository](https://github.com/mewo2/terrain)

### Cartography

In the game you should be able to make and acquire maps. These should be strongly interwoven with the game mechanics, so that it can pay off to own a good map. It should also give the players an incentive to actively explore the world.

The player has to walk into the wilderness and then use his cartography skill. He can choose how wide the area to measure should be. Bigger areas will tend to be more error prone. Also the further away the player is from already explored land the harder the sucessfull performing of the skill will be.

If the skill fails the player will need to wait for a certain amount of time in order to perform the skill again in the vicinity. The cooldown is reduced for adjacent areas.

The server must validate the button presses of the player to make it harder to cheat the system.

The algorithm for the carthography is:

1. Upon using the skill a difficulty `d` is determined, depending on the distance to the next already cartographed area and the area wished to be explored.
2. There are 3-5 locations `l` spawned around the player within a radius of 300 to 800 meters around the player (depending on the difficulty). He must reach them within a timelimit `t`.
3. When near one of such a location (5m) the player is given a moving compass graphic. The speed of moving needle and the area to hit via button press is calculated based on `d`.