---
weight: 1
bookCollapseSection: true
---

# Game Design

The game offers several main aspects of gameplay that the player can perceive, taking into account the always valid manifesto statements. In addition, the concept of the open world should open up an emergent game principle.

Here concrete realizations of central game elements are described. Contrary to the rough guidelines of the manifesto, the discussion and description of a concrete game feature is already at stake here. The specification of the respective feature should be described as exactly as possible in order to make an easy implementation possible. The list will be constantly updated and extended.

This document describes the core thoughts and principals under which all game design choices should be oriented and challenges.

## Core Concepts

> It is best practice to stick as close as possible to the design principles described in the next section about the core concepts.

### Consistent Fantasy Simulation

We want to tell a story, a story the players forge and form by themselves. We must provide a world, an environment in
which this is made possible. The game should motivate the players to explore and test their creativity for solving problems.
Nothing frustrates more then to solve riddles only by bruteforcing the answers. All the things inside the world should
be explainable by in-universe theories and follow certain logic patterns. There should be no magic User Interface
which will teleport the player to the next Dungeon and destroy the immersive fantasy. The player should be motivated to
solve this problems by himself maybe by finding a friendly other character class which is able to open portals.
Interaction between players is highly encouraged to solve problems.

### A Single Universe

We all live on the same planet. So do we really need multiple servers? Multiple servers tear the community apart.
Of course it is technically more challenging to connect all players through a common game world. But this challenge
 has to be met. One community further encourages interaction between the players.

### Stable Mechanics

In modern games players are kept encouraged by constantly changing the game mechanics. These poor design choices
makes it hard for players to came back into the game after a long pause. Most mechanics have changed and must be
adaptes first leading to frustration. Players slowly understanding the mechanics will put into a constant re-learning
when the patches changes the mechanics. Bestia will strictly strive for preserving once established gameplay mechanics
and makes them as resistant as possible against patches.

> Interesting long term challenges have to be implemented via a immersive gameplay world. Bugs and balancing problems
will be patched of course.

### Encouraging Social Interaction

Many game mechanics should only be possible through interaction with other players. Rituals that require multiple
players, even the help of multiple character classes should be the norm rather than the exception. Single players
should of course also be able to enjoy the game. Nevertheless the name is MMORPG Program. The full potential
of the game can and should only be experienced through interaction with other people. This promotes a cohesion
in the community of the players. By these promoted social contacts the players are bound more strongly to
the game itself.

### Advanced Crafting

Items are usually not obtained by killing monsters (we remember: fantasy realism.) Do wolves carry swords?
Probably not. They have to be made. Usually only raw materials are found on maps. Almost all equipment is
manufactured or purchased from NPCs. NPC dealers only have a limited stock of goods. These must first be
restored and delivered. This leads to the establishment of trade routes. The price is determined by supply
and demand. NPC should try to get a profit maximization for themselves. Players must be able to participate
in this cycle of goods as easily as possible, both as a producer and as a consumer.

The professions are described in the [Skills and Attacks](/mechanics/skills) section.

### Modern Artifical Intelligence

The game contains a modern, incredibly powerful AI. The world and its inhabitants should look incredibly
alive with it. Bestias and NPC follow a daily routine and pursue their own goals. The player should be
able to recognize patterns and interact with them by observing them. The NPCs react in the same way to
influences by the player. NPCs should be able to travel long distances and not be available for the player
for some time.

### Rich And Immersive History

The story and history should be rich in detail and deep and immersive. But its not necessairly important to be always
totally serious. Yet it must be generic enough to get pre-computed to some degree when the world is calcualted.
Instead the story should keep its own sense of strange, nerdy humor. Character development and ingame experiences
should be tied to certain storys or quests. E.g. taking gameplay choices only by clicking a certain UI button is discouraged.

### Meet Real World Expectation

The environment should stick to real world expectation, can you open a door also by destroying it? Sure! Why should this not
also work in games? - The simulated world of Bestia should stick to the principles and expectations of the real world.
With this help player can think of funny and motivating workarounds and solutions to solve problems in game.

## Game Mechanics

The main story revolves around the player whose world was destroyed due to a so-called **Rift Event**. The magic pushed into his world and merged it with another one. This altered the physical properties of both worlds and mostly destroyed them in the process.

The player is thrown into a new world and must learn to survive on his own (while exploring the new world, gathering resources, making friends and foes).

The principle of destroying the world is the common thread throughout the game. By joining one of the different cults the players can actively work towards a destruction of the world or preventing it from harm (see [The Cults](#cults) for more information).

Due to this event the world is **generated dynamically**. Despite the ultimate goal of the game to prevent or initiate this destruction, this should remain a rare event that occurs no more frequently than every 1 to 2 years (in real time). The newly generated world should cover as wide a spectrum of biomes as possible. The world and its inhabitants embed themselves in a certain history, which should also be generated as automatically as possible. This enriches the player experience especially in the beginning when there are not many players.

For the details of world generation, see the [technical documentation](/docs/server/world-generation).

### Postal System

Based on World of Warcraft, a postal system is to be established. The system should make it possible to send letters,
but above all items and money to other players and places. And is also important for the [player quest system](#player-quests) as mostly quest rewards will need to be delived via a postal system).

Like the rest of the game this should be solved by an ingame system. There should be NPCs which will take care of delivering postal services and players should setup Bestias in order to perform this delivery. This can be a quest on its own. If there is no player taking care in time for this delivery there should be always an NPC showing up taking care of the delivery, then the reward is lost.

The postal fee is defined by:

{{< katex display >}}
   price =  0.01g \cdot km \cdot m_{kg}\\
   deliver_{time} =  8h + km / 10
{{< /katex >}}

The player can decide to insure his delivery which will setup a teleport spell on the item if its not looted but the postman is killed which will deliver it towards the target destination. But this will take another 0.5-1 days in real time before the item will then be available at the target location.

Gold and text only messages can be send via a special telegram system which is very hard to intercept. But the fee is 3 times the usual price (but gold has no ingame weight, so you are allowed to carry as much as you want).

### The Cults

In each Bestia World there are 2-3 cults to which the Bestia summoners can belong. When creating the world, the existing cults are chosen randomly. At least one cult should aim for the destruction of the world, the other should prevent it. Optionally there are some neutral cults that pursue their own goals which do not deal with the destruction of the world. These cults should not exist in every world iteration.

The cults are ultimately a faction. The goal is to be able to play these factions among themselves. Usually players can fight against each other at any time, but the rivalries should take place between the cults. To this end, game mechanics must be established that in a certain way grant the individual cults an additional bonus in a collaborative approach and thus offer playful incentives to actively intervene in the game.

Players can invest into their cults citadelle. Only one citadel can exist at the time but players are free to build as many temples as they want, where they can access the services of their cult. The interesting thing is that some of the archivements by the cults will remain active when the world is replaced by a new one. So these cults help a lot when players want to keep their wealth during a world destruction event.

Players should be able to change cults. However, this will be sanctioned with a difficult task and will be associated with various disadvantages.

#### Citadels and Temples

The order can research powerful spells and devices which the players can then learn or access to accomplish their goal.

#### The Chaos

The Chos tries to inflict destruction and to speed up the worlds downfall, as they believe the mana influx is the fate every world must face finally. They try to mass the amount of mana, open rifts in remote legions to form the world after their twisted image until it goes down in flames.

#### The Order

This cult is the preserving one. They belive in stability and try to stop the ongoing destruction of the worlds. Their ultimate goal is to bring an end to the influx of mana. Thus they research a lot of spells to remove and control the mana influx and rifts.

#### Cult Advantages

It would be conceivable that special land areas fall under the influence of a certain cult. This would attract certain
Bestias that are friendly to the cult members. Special resources are generated or more Mana rifts are opened and the
Mana within the country increases there. Furthermore, the prevailing faction can be rewarded with a global bonus.
Additional EXP bonuses would be conceivable.

### Archivements

If a player manages to archive a certain goal then he will be awarded an archivement. These archivements are listed ingame so the player can view them. It is also possible for other players to access the players archivements.

There are archivements which are unique to a single world and other which every player can reach for his own. World archivements are saved with the world they were acquired and are reset (they can be re-acuired by another player if the world is re-created). The date + the name of the world in which the success was achieved always remains in the history for a player.

This list is far from completed! New ideas and suggestions are welcomed. Please open an [issue](https://github.com/tfelix/bestia-docs/issues) for new ideas.

| Archivement            |              Type              |                             Description |
| :--------------------- | :----------------------------: | --------------------------------------: |
| Master of 10 Bestias   | {{< archivement false true >}} |        The player has owned 10 Bestias. |
| Master of 100 Bestias  | {{< archivement false true >}} |       The player has owned 100 Bestias. |
| Master of 1000 Bestias | {{< archivement false true >}} |      The player has owned 1000 Bestias. |
| Officer                | {{< archivement false true >}} |  Killing 10 players with `Rogue` debuf. |
| Sheriff                | {{< archivement false true >}} |  Killing 50 players with `Rogue` debuf. |
| Marshall               | {{< archivement false true >}} | Killing 100 players with `Rogue` debuf. |

### Auction House

Trading is an important mechanic and allows player to exchange goods as the whole Bestia economy is player driven. Players can create auction hauses which can be used in order to perform trades while they are offline themselves.

If an auction house was build by a player or a guild no other auction house can be build in a 300m radius. The player can decide the auction fee between 1% - 10% for new auctions. This fee is collected in the auction house and must be collected by the owners. Players can then use the auction house to sell their items by listing them. Either they set them up for a fixed price of do an auction. The decide between 1 (80% fee), 2 (100% fee), 3 (120% fee) or 5 (140% fee) days length for the auction.

Auction houses of different owners can be linked in order to display the shared auctions. If a player wins an auction the item is delivered via postal service to the player if he decides to pay the delivery fee. The item is then send via the regular postal service from the linked auction house.

If the player does not pay the fee the item is withheld for him up to 10 days until it is returned to his owner (who can keep the price payed for the item from the player who did not collect his item).

### Currency

All the ingame currency is made from gold found by the players. Yes you have heard it right the players must harvest gold deposites in order to make their own money. Gold can directly be turned into gold coins.

In order to start the economy the NPC have 10% of the available world wealth in gold. This wealth is re-distributed equally between every NPC every night. This mechanic is one of the few that have no underlying real world logic.
