---
title: World Exploration
---

# World Exploration

A large part of the game world generates automatically. There should be a motivation for players exploring the world. New areas can be mapped and unique resources can be discovered and explored. In general, players should have their own branch about the secrets of the world to discover new items and how they are created. The entire world must gradually be explored and mapped by players. Players will be able to view this map online and see the overall progress of the exploration.

Having a workable map has multiple use-cases:

1. Most spells can be targeted only on a map with uncovered areas
2. AI assisted walking of controlled player Bestia only works in charted territory
3. Announcments of public events works and is synced via maps owned by the players
4. Only inside explored areas Geologists can search for mineral resources

There are a few assumptions regarding maps:

* Every player should be able to create a world map in-game
* Player with cartographer skill should be able to combine multiple maps into single ones combining the explored area
* Highly skilled cartoprpher can generate new magic maps to inform about possible events (exchange information with friends via markers, or display resource sources).

Regular player might try to create copies but this will be very hard without a cartography skill and most likly fail.

For generating the visual of the player map we use the algorithm described in [Terrain Map Generation](http://mewo2.com/notes/terrain/)
and it's respective [Github repository](https://github.com/mewo2/terrain)

## Cartography

In order to explore a area of the map the player has to perform manual tasks. He can choose how wide the area to measure should be. Bigger areas will tend to be harder to explore. The further away the player is from already explored land the harder the successful performing of the skill will be.

The player must perform a mini-game to explore the area. He might use devices which help to explore bigger areas.

If the skill fails the player will need to wait for a certain amount of time in order to perform the skill again in the vicinity. The cooldown is reduced for adjacent areas.

There are three difficulties which describe the range of the discovery and also give a base probability:


| Range | Difficulty |
| ----- | ---------- |
| 1km   | 30         |
| 3km   | 50         |
| 5km   | 80         |

The following aplies:

* For every km from explored land the difficulty increases by `10`
* For 1% of magic energy on the area difficulty increases by `0.5`
* Every level of `Cartographer` reduces difficulty by `10`.

1. Upon using the skill a difficulty `d` is determined, depending on the distance to the next already cartographed area and the area wished to be explored.
2. There are 3-5 locations `l` spawned around the player within a radius of 300 to 800 meters around the player (depending on the difficulty). He must reach them within a timelimit `t`.
3. When near one of such a location (5m) the player is given a moving compass graphic. The speed of moving needle and the area to hit via button press is calculated based on `d`.

## Explored Worldmap

Explored areas are squared to save them easier. The total explored map is saved on the server in a Runlength Encoded datastructure. Smallest resolution is 100m.
A base terrain map is generated an player map contains a sub-section of this map and every map holds its own data so it only displays what
was explored by this map instance. The map is generated on the server like so:

1. Detect the area the player map depicts
2. Decode the RLE discovered area of it
3. Use the complete map of the server to return the visible data, delete the rest
4. Send display map data to the client
