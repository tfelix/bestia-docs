---
title: Bestia Master
---

# Bestia Master

The intro game tells players how to become a Bestia Master. They came into direct contact with an ephemeral mana crystal
that changed their nature through magic and connected them to the mana flows. They are therefore receptive to the
influence of mana and are able to communicate with the beings that emerge from this mythical energy: **the Bestias**.

The attachment to mana also explains why Bestia masters were able to survive the destruction of their world relatively
unscathed and to pass on to the next world.

## Master Skills

The bestia master of a player can learn a set of skills. Since these skills are bound to the account they are called
account skills or just skills. These skills are freely chosen by the player and determine the job or profession of
the master.

Some of this account skills can be used by every Bestia in posession others only by the master itself.

> Don't confuse this skills with the regular attacks a Bestia is learning by item usage or level up. These are simply
> called attacks.

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

Starting from level 10, on each level up the master gains 1 skillpoint to put into the skills rank. This is permanent and means a player can spend about 90 points for improving the ranks of his skills.

> Since max level is not capped actually he might be able to spend more points but a progressions gets continously harder it is safe to assume every player has about 100 points.

The skilltrees are designed as such that to reach the highest professions in a tree the player needs to spend **60 points**.

The player can decide to have mediocre profession in each tree or to max out one and have maybe half of the
meaningful professions of another tree. The skilltree is a hierarchical dependency of skills.

## Crafts Tree

In this tree, simple, common mundane tasks are placed which can be benefitial for living in the outside world. This basically does not contain any mana related stuff, but rather mundane tasks.

Trade Agreement (link auction houses)
Protection Against Thiefes (increased honor loss when stolen)
Spell Extraction (write down a spell into a scroll)

graph TD
  FIRST_AID("First Aid [1]")
  COOKING("Cooking [3]")
  FISHING("Fishing [5]")
  SCAVENGER("Scavenger [5]")

  FISHING-->|Lv. 2|FARMING("Farming [5]")
  SCAVENGER-->|Lv. 3|MINING("Mining [5]")
  SCAVENGER-->|Lv. 3|LUMBERJACK("Luberjack [5]")
  FIRST_AID-->|Lv. 1|MEDICAL_EXPERT("Medical Expert [5]")

  SCAVENGER-->|Lv. 5|CRAFTSMANSHIP("Craftmanship [5]")
  CRAFTSMANSHIP-->|Lv. 3|PACKHORSE("Packhorse [5]")

  CRAFTSMANSHIP-->|Lv. 3|ALCHEMY("Alchemy [5]")
  ALCHEMY-->|Lv. 3|TRANSMUTATION("Transmutation [5]")

{{< skill name="First Aid" maxLevel="1" >}}
{{< columns >}}
Player can apply bandages to Bestia and channel a healing effect of ob to 30% of their total health. The channel time is 15 seconds and the cooldown is 5 minutes. A Bestia can only receive a First Aid every 30 secs.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Fishing" maxLevel="5" >}}
{{< columns >}}
With this skill you are able to catch fish. Fish can be cooked are used for food and trading.
<--->
> Level increas makes it easier to catch higher level fish.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Scavenger" maxLevel="10" >}}
{{< columns >}}
When breaking up and recycling items the probability to recycle a higher amount of components is increased.
<--->
> `-5%/lv` price reduction at NPCs<br>
> `+3%/lv` higher price when selling at NPC
{{< /columns >}}
{{< /skill >}}

{{< skill name="Cooking" maxLevel="3" >}}
{{< columns >}}
The user can start to cook meals on fire places. This meals apply certain buff effects when they are eaten.
<--->
> Level increas makes it easier to cook higher level food.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Craftmanship" maxLevel="5" >}}
{{< columns >}}
The player is able to construct faster and perform tasks better like excavations.
<--->
> -6%/lv structure build time
{{< /columns >}}
{{< /skill >}}

{{< skill name="Lumberjack" maxLevel="5" >}}
{{< columns >}}
The player is able to gather wood resources faster.
<--->
> -3%/lv wood gathering time
> +2%/lvl resource drop chance
{{< /columns >}}
{{< /skill >}}

{{< skill name="Mining" maxLevel="5" >}}
{{< columns >}}
Specialized in digging mine shafts and gather mineral resources.
<--->
> -3%/lv mining time
> +2%/lv resource drop chance
{{< /columns >}}
{{< /skill >}}

{{< skill name="Blacksmith" maxLevel="5" >}}
{{< columns >}}
Able to forge weaponry. Can also [refine weapons](/mechanics/items/#weapon-refinement). Increasing the spell does increase the chance to forge higher level weapons.
<--->
> Increases the probability by 4% to succeed when upgrading a weapon.
> Increase chance of forging highlevel weapons
{{< /columns >}}
{{< /skill >}}

{{< skill name="Packhorse" maxLevel="5" >}}
{{< columns >}}
Increases weight limit to carry.
<--->
> `+5%/level` increased weight limit
{{< /columns >}}
{{< /skill >}}

{{< skill name="Expert Taming" maxLevel="5" >}}
{{< columns >}}
Bestias gain faster experience and are easier to catch.
<--->
> `+5%exp gain/level` increased weight limit
{{< /columns >}}
{{< /skill >}}

{{< skill name="Transmutation" maxLevel="10" >}}
{{< columns >}}
The user can transform resources into magical infused resources. These are very rare resources needed for strong artifect creation or weapon refinements.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Magic Artisan" maxLevel="10" >}}
{{< columns >}}
Can create magic artefacts.
{{< /columns >}}
{{< /skill >}}

## Survival Tree

The survival tree has three main ideas: protecting the masters Bestia from physical harm by increasing they tougness indirectly, improving the survivability in harsh environments for his Bestias or others.

graph TD
  ELEMENTAL_MASTERY("Elemental Mastery [5]")-->|min. 3|MASTER_OF_FIRE("Master of Fire [10]")
  ELEMENTAL_MASTERY-->|min.Artisannsmutation 3|MASTER_OF_WATER("Master of Water [10]")
  ELEMENTAL_MASTERY-->|min. 3|MASTER_OF_WIND("Master of Wind [10]")
  ELEMENTAL_MASTERY-->|min. 3|MASTER_OF_EARTH("Master of Earth [10]")
  MASTER_OF_WATER-->|min. 3|SPRITIUAL_MASTERY("Spritual Mastery [5]")
  MASTER_OF_WIND-->|min. 3|SPRITIUAL_MASTERY
  MASTER_OF_FIRE-->|min. 3|SPRITIUAL_MASTERY
  MASTER_OF_EARTH-->|min. 3|SPRITIUAL_MASTERY

{{< skill name="Elemental Mastery" maxLevel="5" >}}
{{< columns >}}
Increases damage or healing of spells with elemental (earth, wind, wasser, fire) domain.
<--->
> `+3% damage/lv`
{{< /columns >}}
{{< /skill >}}

{{< skill name="Master of Fire" maxLevel="10" >}}
{{< columns >}}
Increases the damage of fire attacks.
<--->
> `+3% damage/lv`
{{< /columns >}}
{{< /skill >}}

{{< skill name="Master of Water" maxLevel="10" >}}
{{< columns >}}
Increases damage of water spells.
<--->
> `+3% damage/lv`
{{< /columns >}}
{{< /skill >}}

{{< skill name="Master of Wind" maxLevel="10" >}}
{{< columns >}}
Increases damage of wind spells.
<--->
> `+3% damage/lv`
{{< /columns >}}
{{< /skill >}}

{{< skill name="Master of Earth" maxLevel="10" >}}
{{< columns >}}
Increases damage of earth spells.
<--->
> `+3% damage/lv`
{{< /columns >}}
{{< /skill >}}

{{< skill name="Spritual Mastery" maxLevel="5" >}}
{{< columns >}}
Increases damage or healing of spells with the Holy or Dark domain.
<--->
> `+5% damage/lv`
{{< /columns >}}
{{< /skill >}}

{{< skill name="Mindbreak" maxLevel="5" >}}
{{< columns >}}
This is a buff which once it gets applied reduces the armor but increases magical attack of a Bestia. It cancels `Mindfocus`.
<--->
> `+20% MATK/level`<br>
> `-20% MDEF/level`<br>
{{< /columns >}}
{{< /skill >}}

{{< skill name="Medical Expert" maxLevel="10" >}}
{{< columns >}}
Increases effects of healing done and duration of buff spells when used by the owner of this spell.
<--->
> `+3% effect/level`<br>
{{< /columns >}}
{{< /skill >}}

{{< skill name="Inner Peace" maxLevel="10" >}}
{{< columns >}}
Your Bestias and Masters HP, Mana and Stamina will have an increased regeneration rate.
<--->
> `+3% effect/level`<br>
{{< /columns >}}
{{< /skill >}}

{{< skill name="Lightfooded" maxLevel="5" >}}
{{< columns >}}
Hard terrain does not reduce the Bestia movement speed anymore. On Level 5 the tarrain does not reduce movement speed anymore at all.
<--->
> `-20%/level reduced movement reduction`<br>
{{< /columns >}}
{{< /skill >}}

{{< skill name="Tough Guy" maxLevel="5" >}}
{{< columns >}}
Stamina is faster regenerated and drops slower in high demanding environments and while dong activities which would otherwise deplete your stamina.
<--->
> -10%/level reduced stamina reduction<br>
> +10%/level increased stamina regeneration
{{< /columns >}}
{{< /skill >}}

{{< skill name="Magic Armor" maxLevel="5" >}}
{{< columns >}}
Reduces damage of magical effects but each hit costs 0.2% percent of the max mana of the owner. When the mana drops below 10% the buff is cancelled.
<--->
> `-2%/level` reduced damage
{{< /columns >}}
{{< /skill >}}

## Science Tree

The Science Tree contains skills witch help with sensing the world events and or performing rituals to even shape the
face of the Bestia world itself. It basically forms 3 sub-trees: One is focused on skill reasearch and enscribing, the second one
helps with world exploration mana flow detection and control and the last one if for resource detection and exploration utilities.

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

{{< skill name="Spell Enscription" maxLevel="10" >}}
{{< columns >}}
Enables the user to write down spells onto items or scrolls for a later use (even by someone who does not know the spell).
{{< /columns >}}
{{< /skill >}}

{{< skill name="Spell Binding" maxLevel="10" >}}
{{< columns >}}
Allows the user to bind certain spells to entities and create trigger for them. This can be used to permanently bind spells to artifacts or setup alarms or traps for example.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Spell Discovery" maxLevel="10" >}}
{{< columns >}}
Enables the user to discover spells to learn for his Bestias.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Black Studies" maxLevel="5" >}}
{{< columns >}}
{{< /columns >}}
{{< /skill >}}

{{< skill name="White Studies" maxLevel="5" >}}
{{< columns >}}
{{< /columns >}}
{{< /skill >}}

{{< skill name="Arcane Studies" maxLevel="5" >}}
{{< columns >}}
{{< /columns >}}
{{< /skill >}}

{{< skill name="Geography" maxLevel="5" >}}
{{< columns >}}
Enables to cartograph the environment. Each level increases the range and effectivness when performing a cartography of the environment.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Scry" maxLevel="5" >}}
{{< columns >}}
The caster can gather information about areas located far away from his position. This is also a helpful spell to detect possible resources in areas which might be worth exploring.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Teleport" maxLevel="5" >}}
{{< columns >}}
Can teleport own bestias over a distance. To teleport somewhere one needs to setup Teleport Runes which form some kind of magical anchor.
They can be used as targets then trying to teleport. The teleportation gets harder and more error prone the longer distances are tried to travel.
The teleported entity also gets a debuff which will prevent it from teleporting again for some time.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Portal" maxLevel="10" >}}
{{< columns >}}
Can teleport any entity over a distance. To teleport somewhere one needs to setup Portal Runes which form some kind of magical anchor. As soon as a portal has opened it can be used in both directions for some time.
<--->
> 1 person/lv can use the portal
{{< /columns >}}
{{< /skill >}}

{{< skill name="Manaflow Expert" maxLevel="10" >}}
{{< columns >}}
User is able to channel down the Mana to crystalize into small shards of Mana crystals which can be used as a power source throughout the world.
{{< /columns >}}
{{< /skill >}}

{{< skill name="Magic Sense" maxLevel="5" >}}
{{< columns >}}
User can detect the presense of magic nearby. It can also identify a magical spell which might be bound to an entity.
{{< /columns >}}
{{< /skill >}}
