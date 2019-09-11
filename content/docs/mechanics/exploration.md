---
id: mech-exploration
title: Exploration
menu_icon: fas fa-globe
---
# <i class="fas fa-globe"></i> World Exploration

A large part of the game world is generated automatically. There should be a motivation for players in exploring the
world. New areas can be mapped and unique resources can be discovered and explored. In general, players should have
their own branch about the secrets of the world to discover new items and how they are created. The entire world
must gradually be explored and mapped by players. A hidden map has to be uncovered regularly. Players will be able to
view this map online and see the overall progress of the exploration.

Possible events can then also be announced on this public map. Every player should be able to create a world map
in-game. Special cartographers should be able to combine these maps or generate new magic maps to inform about possible
events (exchange information with friends via markers, or display certain resource sources).

To make even more impact the explored maps are very needed by the general player population in order to preciesly target
locations or send Bestias into the area for certain AI controlled missions. The maps, once created, can thus be copied
and sold by the cartographer. Regular player might try to create copies but this will be very hard without a cartography
skill and most likly fail.

Exploring of the land should be a fun process but not so easy as going into the wild and pressing one simple button.

For generating the visual of the player map we use the algorithm described in [Terrain Map Generation](http://mewo2.com/notes/terrain/)
and its respective [Github repository](https://github.com/mewo2/terrain)

## Cartography

In the game you should be able to make and acquire maps. These should be strongly interwoven with the game mechanics,
so that it can pay off to own a good map. It should also give the players an incentive to actively explore the world.

The player has to walk into the wilderness and then use his cartography skill. He can choose how wide the area to
measure should be. Bigger areas will tend to be more error prone. Also the further away the player is from already
explored land the harder the sucessfull performing of the skill will be.

If the skill fails the player will need to wait for a certain amount of time in order to perform the skill again in the
vicinity. The cooldown is reduced for adjacent areas.

The server must validate the button presses of the player for success.

## Skill Usage

1. Upon using the skill a difficulty $d$ is determined, depending on the distance to the next already cartographed area
   and the area wished to be explored.
2. There are 3-5 locations $l$ spawned around the player within a radius of 300 to 800 meters around the player
   (depending on the difficulty). He must reach them within a timelimit $t$.
3. When near one of such a location (5m) the player is given a moving compass graphic. The speed of moving needle and the
   area to hit via button press is calculated based on $d$.