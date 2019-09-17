---
title: Story
weight: 100
---
# Story

The main story revolves around the player whose world was destroyed due to a so-called **rift event**. The magic pushed into
his world and merged it with another one. This altered the physical properties of both worlds and mostly destroyed them.
He is thrown into a new one and must learn to survive on his own (while exploring the new world, making friends and foes.)

The principle of destroying the world is the common thread throughout the game. By joining one of the different cults the
players can actively work towards a destruction of the world as well as prenting it from harm (see [The Cults](/docs/mechanics/cults)).

Due to this event the world is **generated dynamically**. Despite the ultimate goal of the game to prevent or initiate this
destruction, this should remain a rare event that occurs no more frequently than every 1 to 2 years (real time). The
newly generated world should cover as wide a spectrum of biomes as possible. The world and its inhabitants embed
themselves in a certain history, which should also be generated as automatically as possible. This enriches the player
experience especially in the beginning when there are not many players.

For the details of world generation, see the [technical documentation](/docs/server/world-generation).

## The Persistent Threat

After a random period of time (at least 6 months in [real time](/docs/mechanics/time)), threats starts to appear in every world. These can be threats
from particularly strong Bestia, which cause great destruction, but also magical elements or natural disasters such as
meteorites. Under certain conditions, this event can also contribute to the destruction of the world. If the total destruction
is caused by the event then none of the cults will benefit from it. So it is in the interest of the cult players to
avert this threat together.

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

A threat does not necessarily have to be perceived directly. A meteor, or severe flooding, can take place far away,
changing parts of the world without much of the player community noticing but permanently shaping and changing the world.
A subtle fear of this change should always haunt players.

Possible events are:

* Meteorite Impact
* Extreme Weathers (Storms or extreme cold over multiple days)
* Vulcanic eruptions
* Tsunami / Permanent Flooding
* Wildfire / Mana Fires
* Opening of a Rift and pouring in strong Bestias
* World bosses showing up
* Mana cristallization making the land uninhabitable
