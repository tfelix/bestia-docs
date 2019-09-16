---
title: Quests
weight: 100
---
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
