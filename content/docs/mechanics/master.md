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
> called attacks.

### Guidlines

* The number of total skil ranks inside a tree should **be between 70-80**
* The possible rank counts of a skill should be: **1, 3, 5 and 10**
* There should be some meaningful dependency of the skills forming a tree
* In each profession tree there should form 2-3 sub-trees which create a meaningful hierarchy
* There should be some kind of three tiers inside a tree to lead from low and basic skill to the much powerfull skills

> Most important: No hardcoded skill effects!

Skills should be used when possible require some interaction with the player whose success depends on the effect of the
skill. An example would be the teleport ability: after selecting the players (which can be flexible by the number) and
the magic interference at the destination, the player must win a small mini-game in the client which can be a skill
game. Depending on how successful this was, the player will be more precisely transported to the destination.

Ultimately, it remains important to leave the outcome of skills open in some way. However, the result should remain
understandable and influenceable by the player.

### Skill Progression

Starting from level 10, on each level up the master gains 1 skillpoint to put into the skills rank. This is permanent and means a player can spend about 100 points for improving the ranks of his skills.

> Since max level is not capped actually he might be able to spend more points but a progressions gets continously harder it is safe to assume every player has about 100 points.

The skilltrees are designed as such that to reach the highest professions in a tree the player needs to spend **70 points**.

The player can decide to have mediocre profession in each tree or to max out one and have maybe half of the
meaningful professions of another tree. The skilltree is a hierarchical dependency of skills.

## Crafts Tree

In this tree, simple, common mundane tasks are placed which can be benefitial for living in the outside world. This basically does not contain any mana related stuff, but rather mundane tasks.

{{< mermaid >}}
graph TD
  FIRST_AID("First Aid [1]")
  FISHING("Fishing [5]")
  SCAVENGER("Scavenger [10]")

  SCAVENGER-->|min. 5|IMPROVED_TRADING("Improved Trading [5]")
  FISHING-->|min. 1|COOKING("Cooking [5]")

  IMPROVED_TRADING-->|min. 3|CRAFTMANSHIP("Craftmanship [10]")
  IMPROVED_TRADING-->|min. 3|LUMBERJACK("Lumberjack [10]")
  IMPROVED_TRADING-->|min. 3|MINER("Miner [10]")

  MINER-->|min. 5|BLACKSMITH("Blacksmith [10]")
  CRAFTMANSHIP-->|min. 5|BLACKSMITH
  CRAFTMANSHIP-->|min. 7|TAILOR("Tailor [10]")
{{< /mermaid >}}

**First Aid (1)**
{{< columns >}}
Player can apply bandages to Bestia and channel a healing effect of ob to 30% of their total health. The channel time is 15 seconds and the cooldown is 5 minutes. A Bestia can only receive a First Aid every 30 secs.
<--->
> +3% damage/level
{{< /columns >}}

**Fishing (5)**
{{< columns >}}
With this skill you are able to catch fish. Fish can be cooked are used for food and trading.
<--->
> Level increas makes it easier to catch higher level fish.
{{< /columns >}}

**Scavenger (10)**
{{< columns >}}
When breaking up and recycling items the probability to recycle a higher amount of components is increased.
<--->
> -5%/lv price reduction at NPCs
> +3%/lv higher price when selling at NPC
{{< /columns >}}

**Improved Trading (5)**
{{< columns >}}
NPC can be talked into to pay more or give the player cheaper prices for items.
<--->
> -5%/lv item price reduction at NPCs
> +3%/lv higher price when selling items at NPC
{{< /columns >}}

**Cooking (5)**
{{< columns >}}
The user can start to cook meals on fire places. This meals apply certain buff effects when they are eaten.
<--->
> Level increas makes it easier to cook higher level food.
{{< /columns >}}

**Craftmanship (10)**
{{< columns >}}
The player is able to construct faster and perform tasks better like excavations.
<--->
> -3%/lv structure build time
{{< /columns >}}

**Lumberjack (10)**
{{< columns >}}
The player is able to gather wood resources faster.
<--->
> -3%/lv wood gathering time
> +2%/lvl resource drop chance
{{< /columns >}}

**Miner (10)**
{{< columns >}}
Specialized in digging mine shafts and gather mineral resources.
<--->
> -3%/lv mining time
> +2%/lv resource drop chance
{{< /columns >}}

**Blacksmith (10)**
{{< columns >}}
Able to forge weaponry. Can also [refine weapons](/mechanics/items/#weapon-refinement). Increasing the spell does increase the chance to forge higher level weapons.
<--->
> Increases the probability by 2% to succeed when upgrading a weapon.
> Increase chance of forging highlevel weapons
{{< /columns >}}

## Battle Tree

The battle tree contains skills which are primarly useful for sustaining in fighting and battle.

{{< mermaid >}}
graph TD
  SPRITIUAL_MASTERY("Spritual Mastery [5]")
  ELEMENTAL_MASTERY("Elemental Mastery [5]")-->|min. 3|MASTER_OF_FIRE("Master of Fire [10]")
  ELEMENTAL_MASTERY-->|min. 3|MASTER_OF_WATER("Master of Water [10]")
  ELEMENTAL_MASTERY-->|min. 3|MASTER_OF_WIND("Master of Wind [10]")
  ELEMENTAL_MASTERY-->|min. 3|MASTER_OF_EARTH("Master of Earth [10]")
{{< /mermaid >}}


{{< columns >}}
**Elemental Mastery (5)**

Increases damage or healing of spells with elemental (earth, wind, wasser, fire) domain.
<--->
> +3% damage/level
{{< /columns >}}

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

Detect presence of magic. This also helps to

### Identify Magic (5)

Enables a spell

### Magic Artisan (10)

Can create magical artifacts.

### Transmutation (10)