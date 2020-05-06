---
title: Bestia Master
---

# Bestia Master

The intro game tells players how to become a Bestia Master. They came into direct contact with an ephemeral mana crystal
that changed their nature through magic and connected them to the mana flows. They are therefore receptive to the
influence of mana and are able to communicate with the beings that emerge from this mythical energy: **the Bestias**.

The attachment to mana also explains why Bestia masters were able to survive the destruction of their world relatively
unscathed and to pass on to the next world.

## Skill Mastery

The bestia master of a player can learn a set of skills. Since these skills are bound to the account they are called
account skills or just skills. These skills are freely chosen by the player and determine the job or profession of
the master.

Some of this account skills can be used by every Bestia in posession others only by the master itself.

> Don't confuse this skills with the regular attacks a Bestia is learning by item usage or level up. These are simply
> called [attacks](/docs/mechanics/attacks).

### Guidlines

* The number of total skil ranks inside a tree should **be between 70-80**
* The possible rank counts of a skill should be: **1, 5 and 10**
* There should be some meaningful dependency of the skills forming an exciting tree
* In each profession tree there should form 2-3 sub-trees which create a miningful hierarchy
* There should be some kind of three tiers inside a tree form low and basic skill to the much powerfull skills

> Most Important: No Hardcoded Skill Effects!

Skills should be used when possible require some interaction with the player whose success depends on the effect of the
skill. An example would be the teleport ability: after selecting the players (which can be flexible by the number) and
the magic interference at the destination, the player must win a small mini-game in the client which can be a skill
game. Depending on how successful this was, the player will be more precisely transported to the destination.

Ultimately, it remains important to leave the outcome of skills open in some way. However, the result should remain
understandable and influenceable by the player.

### Skill Progression

Upon each level up the master gains 1 skillpoint to put into the skills rank. This is permanent and means a player can
spend about 100 points for improving the ranks of his skills.

> Since max level is not capped actually he might be able to spend more points but a progressions gets continously
> harder it is safe to assume every player has about 100 points.

The skilltrees are designed as such that to reach the highest professions in a tree the player needs to spend **70 points**.

The player can decide to have mediocre profession in each tree or to max out one and have maybe half of the
meaningful professions of another tree. The skilltree is a hierarchical dependency of skills.

### Common Tree

In this tree, simple, common mundane tasks are placed.

### First Aid

### Cooking (5)

### Fishing (5)

## Battle Tree

The battle tree contains skills which are primarly useful for fighting, battle and maybe to some extend improve survival
 in the wild.

{{< mermaid >}}
graph TD
  SPRITIUAL_MASTERY("Spritual Mastery [5]")
  ELEMENTAL_MASTERY("Elemental Mastery [5]")-->|min. 3|MASTER_OF_FIRE("Master of Fire [10]")
  ELEMENTAL_MASTERY-->|min. 3|MASTER_OF_WATER("Master of Water [10]")
  ELEMENTAL_MASTERY-->|min. 3|MASTER_OF_WIND("Master of Wind [10]")
  ELEMENTAL_MASTERY-->|min. 3|MASTER_OF_EARTH("Master of Earth [10]")
{{< /mermaid >}}

### Elemental Mastery (5)

Increases damage or healing of spells with elemental (earth, wind, wasser, fire) domain.

> +3% damage/level

### Master of Fire (10)

* Elemental Mastery (3)

Increases the damage of fire attacks.

> +3% damage/level

### Master of Water (10)

* Elemental Mastery (3)

Increases damage of water spells.

> +3% damage/level

### Master of Wind (10)

Elemental Mastery (3)

Increases damage of wind spells.

> +3% damage/level

### Master of Earth (10)

Elemental Mastery (3)

Increases damage of earth spells.

> +3% damage/level

### Spritual Mastery (5)

Increases damage or healing of spells with the Holy or Dark domain.

> +5% damage/level

### Mindbreak (5)

This is a buff which once it gets applied reduces the armor but increases the physical and magical attack of a Bestia.

> +20% damage/level
>
> -20% armor/level

### Mindfocus (5)

This is a buff which once it gets applied increases the armor but decreases the physical and magical attack of a Bestia.

> +20% armor/level
>
> -20% damage/level

## Survival Tree

The survival tree has three main ideas: protecting the masters Bestia from physical harm by increasing they tougness indirectly, improving the survivability
in harsh environments for his Bestias or others.

### Improved Healing (10)

Increases effects of healing done and duration of buff spells when used by the owner of this spell.

> +2% effect/level

### Increased Regeneration (10)

Your Bestias and Masters HP and Mana will have an increased regeneration rate.

> +3% effect/level

### Magic Armor (5)

* Improved Healing (5)

Reduces damage of magical effects.

> -2%/level reduced damage

### Faster Travel (5)

Hard terrain does not reduce the Bestia movement speed anymore. On Level 5 the tarrain does not reduce movement speed anymore at all.

> -20%/level reduced movement reduction

### Taming (5)

Bestias gain faster experience and are easier to catch.

> +5% experience gain per level

### Breeding (5)

### Summon Bestia (10)

A temporarly Bestia from pure magic is created which will assist its master for a short period of time.

### Tough Guy (5)

Stamina is faster regenerated and drops slower in high demanding environments and while dong activities which would otherwise
deplete your stamina.

> -10%/level reduced stamina reduction
>
> +10%/level increased stamina regeneration

### Packhorse

### Magic Shelter (5)

Improves environment condition via magic.

### Magic Protection (5)

**Max Level: 5**

Increases weight limit to carry.

> +5%/level Weight Limit increase

## Crafts Tree

### Improved Trading (5)

NPC can be talked into to pay more or give the player cheaper prices for items.

> -5%/lv price reduction at NPCs
>
> +3%/lv higher price when selling at NPC

### Scavenger (10)

When breaking up and recycling items the probability to recycle a higher amount of components is increased.

### Blacksmithing (10)

* Scavenger (5)

Able to forge weaponry. Can also [refine weapons](/mechanics/items/#weapon-refinement). Increasing the spell does increase the chance to forge higher level weapons.

Also increases the probability by 2% to succeed when upgrading a weapon.

### Engineering (10)

### Magic Artisan (10)

Can create magical artifacts.

### Transmutation (10)

## Science Tree

The Science Tree contains skills witch help with sensing the world events and or performing rituals to even shape the
face of the Bestia world itself. It basically forms 3 sub-trees: One is focused on attack learning, and enscribing, the second one
helps with world exploration, and mana flow detection and control. And the third one is there for resource transformation/transmutation.

{{< mermaid >}}
graph TD
  SPELL_ENSCRIPTION("Spell Enscription [10]")-->|min. 5|SPELL_BINDING("Spell Binding [10]")
  SPELL_ENSCRIPTION-->|min. 3|SPELL_DISCOVERY("Spell Discovery [10]")
  SPELL_BINDING-->|min. 5|FOCUS_BLACK("Focus: Black Magic [5]")
  SPELL_DISCOVERY-->|min. 5|FOCUS_BLACK
  SPELL_BINDING-->|min. 5|FOCUS_WHITE("Focus: White Magic [5]")
  SPELL_DISCOVERY-->|min. 5|FOCUS_WHITE
  SPELL_BINDING-->|min. 5|FOCUS_ARCANE("Focus: Arcane [5]")
  SPELL_DISCOVERY-->|min. 5|FOCUS_ARCANE
  GEOGRAPHY("Geography [5]")-->|min. 3|SCRY("Scry [5]")
  SCRY-->|min. 3|TELEPORT("Teleport [10]")
  TELEPORT-->|min. 8|PORTAL("Portal [10]")
{{< /mermaid >}}

### Spell Enscription (10)

Enables the user to write down spells onto items or scrolls for a later use (even by someone who does not know the spell).

### Spell Binding (10)

Allows the user to bind certain spells to entities and create trigger for them. This can be used to permanently bind spells
to artifacts or setup alarms or traps for example.

### Spell Discovery (10)

Enables the user to discover spells to learn for his Bestias.

### Focus: Black Magic (5)

Enables the user to discover spells to learn for his Bestias.

### Focus: White Magic (5)

Enables the user to discover spells to learn for his Bestias.

### Focus: Arcane (5)

Enables the user to discover spells to learn for his Bestias.

### Geography (5)

Increases the range and effectivness when performing a cartography.

### Scry (5)

Can look into areas far away.

### Teleport (10)

Can teleport own bestias over a distance. To teleport somewhere one needs to setup Teleport Runes which form some kind of magical anchor.
They can be used as targets then trying to teleport. The teleportation gets harder and more error prone the longer distances are tried to travel.
The teleported entity also gets a debuff which will prevent it from teleporting for some time.

### Portal (10)

Can teleport any entity over a distance. To teleport somewhere one needs to setup Portal Runes which form some kind of magical anchor. As soon as a portal
has opened it can be used in both directions for some time.

### Control Mana Flow (10)

User is able to channel down the Mana to crystalize into small shards of Mana crystals which can be used as a power source throughout the world.

### Magic Senses (5)

Detect presence of magic.

### Identify Magic (5)

# Honor

It is possible in Bestia to perform malicious actions which will reduce the players good experience. This is by design!
Yet there should be incentives for players not to go this route in order to protect low level players from ganking of
other griev play. If a player behaves well and their honor level increases they will get more and more rewards. On the
other hand if a player has negative honor they will get bad reputation and repressions. There might actually be some
player initiated hunt on these low honor players.

Additionally each NPC maintains an internal list of reputation points and players. If a player misbehaves or behaves in
a friendly way, this list will be adjusted. The NPC also communicates this list with other NPCs if they meet. If the reputation
exceeds certain upper and lower limits and the NPC enters areas that use a long-distance communication system, the NPC
may also communicate this to more distant areas. Only if the players reputation falls below -100 the NPC encountered
(and acted negative towards them) they remembers this permanently. Higher values slowly return to the default value
of 0 and are then removed from the list (NPCs don't forget if a player killed family members or the NPC life was saved).
If the customer reaches the nearest settlement via the reputation points after a certain time, the value is also stored
there permanently.

Reputation decreases faster through bad deeds than increasing because of good ones.

## Protected Zones

Around the starting places there will be a enchantment in place which will mark the lands in the vacinity as **Protected Zones**.
Inside this zone every kill of another player Bestia with more then 5 levels less as the killing bestia
or NPC will reduce the honor by **20 points**.

Every action which leads to honor loss inside a protected zone (other then killing a low level Player Bestia) will be **multiplied by 3**
wheras honor increasing actions will be **multiplied by 1.5**.

## Negative Honor

As there are multiple factions which different interests it is not easy to define which play is considered bad behavior
which will get punished automatically. Yet there are some core actions which will be universally be considered as griev play
which is not inherently forbidden but will result in a loss of honor.

If a player drops below 0 honor he will receive the debuff [Rogue](/). If a player has less then -100 honor he will receive
the debuff [Outlaw](/).

### Stealing

Stealing means if a player picks up an item from a storage chest not belonging to him. The owner can also grant certain player
access right to a chest. Then its not considered stealing. A guild leader can also mark storage chests as usable for guild members.

A player who steals an item is also marked with the debuff [Thief](/) which will grant any player who kills him **5 extra honor**. The killing
player also gets a honor reward for each item returned to the original owner of the items within 6 real time hours (18 hours in Bestia time).

### Malicious Actions

| Malicious Action                                | Honor Loss (Player) | Honor Loss to NPC in Sight |
| ----------------------------------------------- | :-----------------: | :------------------------: |
| Killing a NPC                                   |         -5          |            -15             |
| Killing Players Bestias                         |          0          |             -2             |
| Killing Players Bestias in a **Protected Zone** |         -20         |            -20             |
| Stealing Item (Mundane)                         |         -5          |            -10             |
| Stealing Item (Superior)                        |         -10         |            -20             |
| Stealing Item (Legendary)                       |         -15         |            -50             |

### Negative Honor Effects

If the honor drops below 0 the negative effects will start to take place. The effects are as follows:

| Honor Amount | Effect                                                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| < 0          | No more advantages from NPC and the NPC will act unfriendly against the player.                                                    |
| < -50        | Some NPC might start to act hostile and attack the player or flee from him.                                                        |
| < -100       | NPC will permanently remember the player and also spread the word around so more NPC will start to act hostile towards the player. |

If a player steals something not belonging to him but to a NPC or another player he will loose honor for each item he
takes and depending on the [item level](/mechanics/items/#item-level) (looting a dead NPC/player will not lead to a
reduction of honor).

## Positive Honor

A positive honor level will lead to very friendly NPC which might even give the player some discounts or gifts from
time to time. In order to increase your honor level again you can:

* Kill a player with negative honor
* Helping a NPC by healing or resurrecting a dead NPC

### Shrines of Judgement

There are a 5 shrines in each game world incarnation where a player can sacrifice to raise a reputation that has fallen below the threshold of a player's global
persecution. The sacrifice is usually (depending on the reputation threshold) very painful and even if it was made it can take
several days until the news about it was spread.
