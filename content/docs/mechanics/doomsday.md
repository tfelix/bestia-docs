---
title: Doomsday
---

# Doomsday

Every world incarnation faces an inevitable **existential threat**, emerging after a minimum of **six months in real time**. These threats can take various forms—powerful, destructive **Bestia**, chaotic magical phenomena, or natural disasters like **meteorite impacts**. If left unchecked, these forces can push the world toward **total annihilation**. However, if the world is destroyed by such an event rather than through the actions of the cults, **none of them will benefit**, giving all cult players a shared incentive to **prevent** its occurrence.

This cycle of destruction is what makes the world **dynamically generated**. While the overarching goal is to either **prevent or accelerate the world’s end**, complete destruction remains a **rare occurrence**, happening no more than once every **one to two years (real time)**. When a new world is born, it is procedurally generated to feature **diverse biomes, unique landscapes, and a fresh history** that integrates seamlessly with the game’s lore. This system ensures a **rich, evolving world**—especially in the early stages, when player populations may be lower.

For the details of world generation, see the [server documentation](/docs/server/world-generation).

{{< tabs "Thread Appearence Delay" >}}
{{< tab "Population < 1k" >}}
# MacOS Content

test hallo `test`

delay = 9 + rand() * 1.5;

{{< /tab >}}
{{< tab "Population < 5k" >}}

delay = 9 + rand() * 2.5;

{{< /tab >}}
{{< tab "Population > 5k" >}}

delay = 9 + rand() * 4;


{{< /tab >}}
{{< /tabs >}}

A threat does not necessarily have to be perceived directly. A meteor, or severe flooding, can take place far away, changing parts of the world without much of the player community noticing but permanently shaping and changing the world. A subtle fear of this event creeping up should always haunt players.

Possible ideas for more events:

* Vulcanic Activity
* Tsunami / Permanent Flooding
* Metorite Impact
* Iceage
* The Great Drought
* Mana Burn
* The Destroyer (a huge Bestia targeting player cities)

## Rift Event

Starting in areas with big mana presence a first rift opens up. These are detactable with Spells which reveal big mana concentrations and also can be detected by special rift detection spells or devices. This should allow the player to aproximatly pin point the rift origin.

## Mana Crystal Infestation

In areas with a very high mana concentration a Mana Infestation can manifest. It increases mana generation in the area and depending on the concentation is will spawn new crystals next to it. The crystals damage every creature or structure in its vicinity, eventually consuming more and more of the planet destroying everything.

The crystals itself can be destroyed. Everything which drains mana or banishes it is helpful to reduce the crystals.
