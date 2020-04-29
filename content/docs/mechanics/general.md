# General Mechanics

## Main Story

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

# Quests

The game will be more or less an Open World game. But the declared goal will be to try out new ways of storytelling in
order to present a credible world with developing history to the players. You have to say goodbye to the idea that every
game can live through every part of the story/quest. This contradicts the persistent and inner logical structure of the
game world. Quests must rather result dynamically from what happens within the game world.

{{< tabs "Example Quests" >}}
{{< tab "Help the Peasants!" >}}
A rich harvest is imminent, but the farmer Wilhelm cannot bring in the whole harvest due to his short time before it
spoils on the fields. He asks passing players if they could help him. This is rewarded with an EXP bonus, gold and
if necessary an item.
{{< /tab >}}
{{< tab "Defend the city!" >}}
Due to high rift activity and mana flooding, many high-level Bestias make the surroundings of a large city unsafe.
Players are encouraged to fight the Bestias, rise in the city's favor, and gain access to better items, experience
and gold.
{{< /tab >}}
{{< tab "Help me!" >}}
A NPC has gotten lost in a dangerous area and is now hiding. If a player finds the NPC he can help him to find his
way back and will be rewarded with EXP and gold.
{{< /tab >}}
{{< /tabs >}}

## Quests Generation

Quests in Bestia are generated on via two mechanics:

1. Automatic generated quests
2. Player generated quests, these challanges must be given to an NPC who will then announce these quests so other
   players can pick them up.

### Automatic Quests

This documentation might help to build an automatic quest narrative system.

* http://rapturerebornmmorpg.wikia.com/wiki/Quest_Generation_system
* https://www.gamedev.net/topic/648285-latest-trends-in-procedural-quest-generation/
* [http://escholarship.org/uc/item/004129jn?query=The%20Grail%20Framework](http://escholarship.org/uc/item/004129jn?query=The%20Grail%20Framework):
* [http://larc.unt.edu/ian/pubs/pcg2011.pdf](http://larc.unt.edu/ian/pubs/pcg2011.pdf)
* [http://www.aaai.org/Papers/AIIDE/2006/AIIDE06-036.pdf](http://www.aaai.org/Papers/AIIDE/2006/AIIDE06-036.pdf)
* [https://pdfs.semanticscholar.org/e38f/523ba64f014def436ebb03166eb4e573cc3a.pdf](https://pdfs.semanticscholar.org/e38f/523ba64f014def436ebb03166eb4e573cc3a.pdf)
* [https://webdocs.cs.ualberta.ca/~script/publications/2013aiide.pdf](https://webdocs.cs.ualberta.ca/~script/publications/2013aiide.pdf)
* [http://www.academia.edu/4558587/Dynamic_Quest_Plot_Generation_using_Petri_Net_Planning](http://www.academia.edu/4558587/Dynamic_Quest_Plot_Generation_using_Petri_Net_Planning)
* [https://larc.unt.edu/techreports/LARC-2010-02.pdf](https://larc.unt.edu/techreports/LARC-2010-02.pdf)
* [http://gram.cs.mcgill.ca/papers/kybartas-14-analysis.pdf](http://gram.cs.mcgill.ca/papers/kybartas-14-analysis.pdf)
* [https://pdfs.semanticscholar.org/de12/486ae621c3f074691069da4e4a5097c7a48f.pdf](https://pdfs.semanticscholar.org/de12/486ae621c3f074691069da4e4a5097c7a48f.pdf)

### Player Quests

Players can define various tasks, such as collecting resources or defeating certain enemies, or transporting certain
goods as a task and offer a reward. Also the deactivation of Bestias as guardians would be a conceivable task. This
reward must then be given to the appropriate NPCs, who then hold it in trust (or simply negotiate among the players).

The awarding of quests must be worthwhile for both parties. The player is credited with a good amount of experience both
for the quest and for the successful completion of the quest by another player. He can redistribute this experience to
Bestias in his possession under certain circumstances (items needed). When a quest is accepted, a contract is concluded
between the player and the NPC. If all contract conditions are met, the reward will be handed out. Contracts may be
limited in time.

# Postal System

Based on World of Warcraft, a postal system is to be established. The system should make it possible to send letters,
but above all items and money to other players and places. But unlike most games, it should not be an "out-of-world"
system. It would be conceivable that players would have to organize the system themselves and send Bestia as postmen
to remote locations in Aventerra. This should take the speed out of the game. Arrival will have to be waited longer
and the effort for the players will increase.

It would also be conceivable to have a paid telegram system for players to transport messages with valuable goods
faster and safer (but then costs considerably more gold). It would be very nice to have one or more NPCs to transport
the mail in the game. This could then become a victim of robberies and highwaymen like players themselves. It is just
not sure if the AI is able to perform such tasks reliably.

# World Exploration

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

1. Upon using the skill a difficulty `d` is determined, depending on the distance to the next already cartographed area
   and the area wished to be explored.
2. There are 3-5 locations `l` spawned around the player within a radius of 300 to 800 meters around the player
   (depending on the difficulty). He must reach them within a timelimit `t`.
3. When near one of such a location (5m) the player is given a moving compass graphic. The speed of moving needle and the
   area to hit via button press is calculated based on `d`.


# The Cults

In each Bestia World there are 2-3 cults to which the Bestia summoners can belong. When creating the world, the existing
cults are chosen randomly. At least one cult should long for the destruction of the world, one should prevent it. Optionally
there are some neutral cults that pursue their own goals which do not deal with the destruction of the world. These
cults should not exist in every world iteration.

The cults are ultimately a faction. The goal is to be able to play these factions among themselves. Usually players can
fight against each other at any time, but the rivalries should take place between the cults. To this end, game mechanics
must be established that in a certain way grant the individual cults an additional bonus in a collaborative approach and
thus offer playful incentives to actively intervene in the game.

Players should be able to change cults. However, this will be sanctioned with a difficult task and will be associated
with various disadvantages.

## Cult Advantages

It would be conceivable that special land areas fall under the influence of a certain cult. This would attract certain
Bestias that are friendly to the cult members. Special resources are generated or more Mana rifts are opened and the
Mana within the country increases there. Furthermore, the prevailing faction can be rewarded with a global bonus.
Additional EXP bonuses would be conceivable.

# Archivements

If a player manages to archive a certain goal then he will be awarded an archivement. These archivements are listed ingame
so the player can view them. It is also possible for other players to access the players archivements.

There are archivements which are unique to a single world and other which every player can reach for his own. World archivements
are saved with the world they were acquired and are reset (they can be re-acuired by another player if the world is re-created).
The date + the name of the world in which the success was achieved always remains in the history for a player.

This list is far from completed! New ideas and suggestions are welcomed. Please open an issue or directly
[make a pull request](https://github.com/tfelix/bestia-docs/edit/master/content/docs%5cmechanics%5carchivements.md) for new ideas.

## List of Archivements

### Master of 10 Bestias

{{< archivement true true >}}
The player has owned 10 Bestias.

### Master of 100 Bestias

{{< archivement true true >}}
The player has owned 100 Bestias.

### Master of 1000 Bestias

{{< archivement true true >}}
The player has owned 1000 Bestias.

### Master of 10k Bestias

{{< archivement true true >}}
The player has owned 10k Bestias.

### Officer

{{< archivement true true >}}
Killing 10 players with `Rogue` debuf.

### Grand Officer

{{< archivement true true >}}
Killing 20 players with `Rogue` debuf.

### Sheriff

{{< archivement true true >}}
Killing 60 players with `Rogue` debuf.

### Great Sheriff

{{< archivement true true >}}
Killing 100 players with `Rogue` debuf.

### Marshall

{{< archivement true true >}}
Killing 200 players with `Rogue` debuf.

### Great Marshall

{{< archivement true true >}}
Killing 500 players with `Rogue` debuf.
