---
weight: 500
title: Questing
description: "Design document for Bestia's quest system — dynamic quest generation, player-created quests, templates and rewards. Not yet implemented in zone-server."
---

{{< alert context="warning" text="This page is a design document, not a description of running code. There is no quest, contract or commission implementation anywhere in zone-server today — no Quest entity, component, or handler exists. It's kept because the design work below is sound and should guide a future implementation, not because any of it currently runs." />}}

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

Quests in Bestia are generated via two mechanics:

1. **Automatically generated quests**, spawned in cities or villages where NPCs are present.
2. **Player generated quests**: these challenges are handed to an NPC who then announces them so that other players can
   pick them up. Players must follow a template for the rewards.

Both end up as the same kind of **contract**, and the rare world events driven by the simulation use that machinery too.
The player-facing rules for all three live on the [Questing](/docs/mechanics/questing/) page.

# Automatic Quest Generation

Quest generation is done with Templates similar to what the terrain auto-generation system uses. Alot of logic can be built into the Scripts to 'fit' locations and to vary the details of the Quest significantly. Can be made to 'fit' the Player, but its better for the Player to have to figure out how to come up with the needed resources or solutions. It is based manly on the paper [A prototype quest generator based on a structural analysis of quests from four MMORPGs](http://ianparberry.com/pubs/pcg2011.pdf) by Ian Parberry and Jonathon Doran and also on the Grail Framework desribed in [The Grail Framework: Making Stories Layable on Three Levels in CRPGS](https://escholarship.org/uc/item/004129jn). In order to keep the quest generation close to the world in a narrative perspective consider some ideas from the paper [Analysis of ReGEN as a Graph Rewriting System for Quest Generation](http://gram.cs.mcgill.ca/papers/kybartas-14-analysis.pdf).

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

# Player Quests

Players can define various tasks, such as collecting resources or defeating certain enemies, or transporting certain goods as a task and offer a reward. Also the deactivation of Bestias as guardians would be a conceivable task. This reward must then be given to the appropriate NPCs, who then hold it in trust (or simply negotiate among the players).

The awarding of quests must be worthwhile for both parties. When a quest is accepted, a contract is concluded between the player and the NPC. If all contract conditions are met, the reward will be handed out. Contracts may be limited in time, and an accepter who abandons a contract forfeits the collateral they staked when accepting it, which is delivered to the quest giver.

Issuers can never mint experience. The server derives the whole experience reward from the difficulty of the objective and pays it from a capped world pool: the accepter earns the bulk of it, and the issuer earns a small flat amount for posting a funded quest plus a share of the accepter's reward once the quest settles successfully. See [Rewards, Experience and Settlement](/docs/mechanics/questing/#rewards-experience-and-settlement) for the player-facing rules and the anti-farming measures that go with them.

## Reward Calculation

The player creating a quest must setup a reward. This reward is calculated in a fixed way and depends on the available money on the current server but will also factor in the wealth of the issuer. The reward can also be higher than the requested amount. 5% of the reward is issued to the NPC managing this quest contract, and a further 2% is burned as a posting tax — both always in gold, even when the reward itself consists of items. Payouts on NPC-issued quests are budgeted by the [World Treasury Director](/docs/server/economy/).

The difficulty of a quest, and from it the level range of the players suitable to do it, must be automatically determined; see [Difficulty and Level Range](/docs/mechanics/questing/#difficulty-and-level-range). The lower bound of that range is enforced — a master below it cannot accept the contract.

The reward itself can be paid in items or in gold.

# References

* <https://www.rockpapershotgun.com/2016/09/02/how-to-procedurally-generate-culture/>
* <http://www.gdcvault.com/play/1024143/Procedural-Narrative>
* <http://pcg.wikidot.com/pcg-algorithm:procedural-puzzles-and-plot-generation>
* <http://ieeexplore.ieee.org/abstract/document/5740836/>
* <https://nil.cs.uno.edu/projects/glaive/>
