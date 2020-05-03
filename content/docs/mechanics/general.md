# General Mechanics

The main story revolves around the player whose world was destroyed due to a so-called **Rift Event**. The magic pushed into his world and merged it with another one. This altered the physical properties of both worlds and mostly destroyed them in the process.
The player is thrown into a new world and must learn to survive on his own (while exploring the new world, gathering resources, making friends and foes).

This idea of the world always at the brink of destruction is a ongoing thread throughout the game. Two cults formed out of this world-destruction aware
The principle of destroying the world is the common thread throughout the game. By joining one of the different cults the players can actively work towards a destruction of the world as well as prenting it from harm (see [The Cults](#cults) for more information).

Due to this event the world is **generated dynamically**. Despite the ultimate goal of the game to prevent or initiate this destruction, this should remain a rare event that occurs no more frequently than every 1 to 2 years (in real time). The newly generated world should cover as wide a spectrum of biomes as possible. The world and its inhabitants embed themselves in a certain history, which should also be generated as automatically as possible. This enriches the player experience especially in the beginning when there are not many players.

For the details of world generation, see the [technical documentation](/docs/server/world-generation).

## The Threat

After a random period of time (at least 6 months in [real time](/docs/mechanics/time)), a threats starts to appear in every world incarnation. These can be threats
from particularly strong Bestia, which cause great destruction, but also magical elements or natural disasters such as meteorites. Under certain conditions, this event can also contribute to the destruction of the world. If the total destruction is caused by the event itself then none of the cults will benefit from it. So it is in the interest of the cult players to avert this threat together.

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

Quests in Bestia are generated on via two mechanics:

1. Automatic generated quests, which are spawned in cities or villages where are NPCs present
2. Player generated quests, these challenges must be given to an NPC who will then announce these quests so other
   players who can pick them up, players must follow a template for the rewards.

## Automatic Quest Generation

Quest generation is done with Templates similar to what the terrain auto-generation system uses. Alot of logic can be built into the Scripts to 'fit' locations and to vary the details of the Quest significantly. Can be made to 'fit' the Player, but its better for the Player to have to figure out how to come up with the needed resources/skilled help/solutions. It is based manly on the paper [A prototype quest generator based on a structural analysis of quests from four MMORPGs](http://ianparberry.com/pubs/pcg2011.pdf) by Ian Parberry and Jonathon Doran and also on the Grail Framework desribed in [The Grail Framework: Making Stories Layable on Three Levels in CRPGS](https://escholarship.org/uc/item/004129jn). In order to keep the quest generation close to the world in a narrative perspective consider some ideas from the paper [Analysis of ReGEN as a Graph Rewriting System for Quest Generation](http://gram.cs.mcgill.ca/papers/kybartas-14-analysis.pdf).

Discovery of these quests can be done in various ways:

* Announcements by city majors
* Bulletin Boards
* NPCs in a tavern start talking to the players
* Classical NPC interaction

Try constantly challenge the player with various constraints imposed on quests:

* Time limits
* Puzzle solving mechanics
* Escort quests
* Resource or item gathering quests

The auto generation allows creating such unique (semi-unique) situational experiences when there are lots of substitutions for the multiple details that make up a quest.
Progressive Quests can be built with subsequent quests opening on completion of predecessors (the usual quest trees used on most MMORPGs).
Sequential Multi-Quests are easily generated:  Goto X, Pickup Y, Deliver to Z -or- Patrol A then Patrol B then Patrol C .. and the locations can be shifted to 'fit' the city areas (when the civilized part of city keeps expanding into the world).

The automatic dialog generation can use a tree like structure with templates where placeholder like items, locations and names are replaced as needed from the auto generation of quests. Sets up NPC quest-giver with a dialog tree. Many situational details can be inserted as parameters (names/locations/item types/etc) into dialog.
Many quests/missions given by NPCs include directions to a specific place. The place can be changed (varied) and the terrain can actually be built/modified 'on-the-fly' to match the quest, so that you don't wind up going the same place other players have already done in the exact same mannor.

Further resources to read:

* [Dynamic_Quest_Plot_Generation_using Petri-Net Planning](http://www.academia.edu/4558587/Dynamic_Quest_Plot_Generation_using_Petri_Net_Planning)

## Player Quests

Players can define various tasks, such as collecting resources or defeating certain enemies, or transporting certain goods as a task and offer a reward. Also the deactivation of Bestias as guardians would be a conceivable task. This reward must then be given to the appropriate NPCs, who then hold it in trust (or simply negotiate among the players).

The awarding of quests must be worthwhile for both parties. The player is credited with a good amount of experience both for the quest and for the successful completion of the quest by another player. He can redistribute this experience to Bestias in his possession under certain circumstances (items needed). When a quest is accepted, a contract is concluded between the player and the NPC. If all contract conditions are met, the reward will be handed out. Contracts may be limited in time and if a player fails to fullfill the contract he might need to pay a fee which is delivered to the quest giver.

### Reward Calculation

The player creating a quest must setup a reward. This rewards is calculated in a fixed way and depends on the available money on the current server but will also factor in the wealth of the issues. The reward can also be higher then re quested amount. 5% of the reward is issued to the NPC managing this quest contract.

The level range of the players suitable to do this quest must be automatically determined.

The fee can be payed in items or in gold, though the NPC part of the fee must be payed always in gold.

## Quest Log

A Quest Log is maintained so the player can look up the details of a quest even though he might been offline for a few days. This interface could very well be available on the 'offline' mobile interface of Bestia, so a pre-planning can be done throughout the day. The player should be able to direct his NPC Bestias to start to prepare/move into position to be ready to start into the dangerous territory the quest might be set in). Good use for the mobile interface to handle logistics like this offline (issue orders to the players Bestia team, to 'gear' up and meet me at location X).

# Postal System

Based on World of Warcraft, a postal system is to be established. The system should make it possible to send letters,
but above all items and money to other players and places. And is also important for the [player quest system](#player-quests) as mostly quest rewards will need to be delived via a postal system).

Like the rest of the game this should be solved by an ingame system. There should be NPCs which will take care of delivering postal services and players should setup Bestias in order to perform this delivery. This can be a quest on its own. If there is no player taking care in time for this delivery there should be always an NPC showing up taking care of the delivery, then the reward is lost.

The fee is defined by:

{{< katex >}}
   price =  0.01g \cdot km \cdot m_{kg}
{{< /katex >}}

{{< katex >}}
   deliver_time =  8h + km / 10
{{< /katex >}}

The player can decide to insure his delivery which will setup a teleport spell on the item if its not looted but the postman is killed which will deliver it towards the target destination. But this will take another 0.5-1 days in real time before the item will then be available at the target location.

Gold and text only messages can be send via a special telegram system which is very hard to intercept. But the fee is 3 times the usual price (but gold has no ingame weight, so you are allowed to carry as much as you want).

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

In the game you should be able to make and acquire maps. These should be strongly interwoven with the game mechanics, so that it can pay off to own a good map. It should also give the players an incentive to actively explore the world.

The player has to walk into the wilderness and then use his cartography skill. He can choose how wide the area to measure should be. Bigger areas will tend to be more error prone. Also the further away the player is from already explored land the harder the sucessfull performing of the skill will be.

If the skill fails the player will need to wait for a certain amount of time in order to perform the skill again in the vicinity. The cooldown is reduced for adjacent areas.

The server must validate the button presses of the player to make it harder to cheat the system.

The algorithm for the carthography is:

1. Upon using the skill a difficulty `d` is determined, depending on the distance to the next already cartographed area
   and the area wished to be explored.
2. There are 3-5 locations `l` spawned around the player within a radius of 300 to 800 meters around the player
   (depending on the difficulty). He must reach them within a timelimit `t`.
3. When near one of such a location (5m) the player is given a moving compass graphic. The speed of moving needle and the
   area to hit via button press is calculated based on `d`.

# The Cults

In each Bestia World there are 2-3 cults to which the Bestia summoners can belong. When creating the world, the existing cults are chosen randomly. At least one cult should aim for the destruction of the world, the other should prevent it. Optionally there are some neutral cults that pursue their own goals which do not deal with the destruction of the world. These cults should not exist in every world iteration.

The cults are ultimately a faction. The goal is to be able to play these factions among themselves. Usually players can fight against each other at any time, but the rivalries should take place between the cults. To this end, game mechanics must be established that in a certain way grant the individual cults an additional bonus in a collaborative approach and thus offer playful incentives to actively intervene in the game.

Players can invest into their cults citadelle. Only one citadel can exist at the time but players are free to build as many temples as they want, where they can access the services of their cult. The interesting thing is that some of the archivements by the cults will remain active when the world is replaced by a new one. So these cults help a lot when players want to keep their wealth during a world destruction event.

Players should be able to change cults. However, this will be sanctioned with a difficult task and will be associated with various disadvantages.

## Citadels and Temples

The order can research powerful spells and devices which the players can then learn or access to accomplish their goal.

## The Chaos

The Chos tries to inflict destruction and to speed up the worlds downfall, as they believe the mana influx is the fate every world must face finally. They try to mass the amount of mana, open rifts in remote legions to form the world after their twisted image until it goes down in flames.

## The Order

This cult is the preserving one. They belive in stability and try to stop the ongoing destruction of the worlds. Their ultimate goal is to bring an end to the influx of mana. Thus they research a lot of spells to remove and control the mana influx and rifts.

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

This list is far from completed! New ideas and suggestions are welcomed. Please open an [issue](https://github.com/tfelix/bestia-docs/issues) for new ideas.

| Archivement            |              Type              |                             Description |
| :--------------------- | :----------------------------: | --------------------------------------: |
| Master of 10 Bestias   | {{< archivement false true >}} |        The player has owned 10 Bestias. |
| Master of 100 Bestias  | {{< archivement false true >}} |       The player has owned 100 Bestias. |
| Master of 1000 Bestias | {{< archivement false true >}} |      The player has owned 1000 Bestias. |
| Officer                | {{< archivement false true >}} |  Killing 10 players with `Rogue` debuf. |
| Sheriff                | {{< archivement false true >}} |  Killing 50 players with `Rogue` debuf. |
| Marshall               | {{< archivement false true >}} | Killing 100 players with `Rogue` debuf. |

# Trading

Trading is an important mechanic and allows player to exchange goods as the whole Bestia economy is player driven. Players can create auction hauses which can be used
in order to perform trades while they are offline themselves.

## Auction House

If an auction house was build by a player or a guild no other auction house can be build in a 300m radius. The player can decide the auction fee between 1% - 10% for new auctions. This fee is collected in the auction house and must be collected by the owners. Players can then use the auction house to sell their items by listing them. Either they set them up for a fixed price of do an auction. The decide between 1 (80% fee), 2 (100% fee), 3 (120% fee) or 5 (140% fee) days length for the auction.

Auction houses of different owners can be linked in order to display the shared auctions. If a player wins an auction the item is delivered via postal service to the player if he decides to pay the delivery fee. The item is then send via the regular postal service from the linked auction house.

If the player does not pay the fee the item is withheld for him up to 10 days until it is returned to his owner (who can keep the price payed for the item from the player who did not collect his item).
