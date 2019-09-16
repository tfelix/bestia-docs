---
title: Skills
weight: 100
---
# Skills and Attacks

The bestia master of a player can learn a set of skills. Since these skills are bound to the account they are called
account skills. These skills are freely chosen by the player and determine the job or profession of the master.

Some of this account skills can be used by every bestia in posession of only by the master itself.

> Don't confuse this skills with the regular attacks a Bestia is learning by item usage or level up. These are simply
> called **attacks**.

## Guildines

* The number of total skil ranks inside a tree should **not exeed 70** by much
* The possible rank counts of a skill should be: **1, 3, 5 and 10**
* There should be some meaningful dependency of the skills forming an exciting tree
* There should be some kind of three tiers inside a tree form low and basic skill to the much powerfull skills

> No Hardcoded Skill Effects!

Skills should be used when possible require some interaction with the player whose success depends on the effect of the
skill. An example would be the teleport ability: after selecting the players (which can be flexible by the number) and
the magic interference at the destination, the player must win a small mini-game in the client which can be a skill
game. Depending on how successful this was, the player will be more precisely transported to the destination.

Ultimately, it remains important to leave the outcome of skills open in some way. However, the result should remain
understandable and influenceable by the player.

## Skill Progression

Upon each level up the master gains 1 skillpoint to put into the skills rank. This is permanent and means a player can
spend about 100 points for improving the ranks of his skills.

> Since max level is not capped actually he might be able to spend more points but a progressions gets continously
> harder it is safe to assume every player has about 100 points.

The skilltrees are designed as such that to reach the highest professions in a tree the player needs to spend **70 points**.

The player can decide to have mediocre profession in each tree or to max out one and have maybe half of the
meaningful professions of another tree. The skilltree is a hierarchical dependency of skills.

## Common Tree

In this tree, simple, common mundane tasks are placed.

**TODO**

## Battle Tree

The battle tree contains skills which are primarly useful for fighting, battle and maybe to some extend improve survival
 in the wild.

### Elemental Mastery (5)

Increases damage or healing of spells with elemental (earth, wind, wasser, fire) domain.

```
+3% damage/level
```

### Master of Fire (10)

* Elemental Mastery (3)

Increases the damage of fire attacks.

```
+3% damage/level
```

### Master of Water (10)

* Elemental Mastery (3)

Increases damage of water spells.

```
+3% damage/level
```

### Master of Wind (10)

Elemental Mastery (3)

Increases damage of wind spells.

```
+3% damage/level
```

### Master of Earth (10)

Elemental Mastery (3)

Increases damage of earth spells.

```
+3% damage/level
```

### Spritual Mastery (5)

Increases damage or healing of spells with the Holy or Dark domain.

```
+5% damage/level
```

## Survival Tree

### Improved Healing (10)

Increases effects of healing done and duration of buff spells.

```
+2% effect/level
```

### Increased Regeneration (10)

Your Bestias and Masters HP and Mana will have an increased regeneration rate.

```
+3% effect/level
```

### Magic Resistance (3)

* Improved Healing (2)

Reduces damage of magical effects.

```
-2%/level reduced damage
```

### Faster Travel (5)

Hard terrain does not reduce the Bestia movement speed anymore. On Level 5 the tarrain does not reduce movement speed anymore at all.

```
-10%/level reduced movement reduction
```

### Tough Guy (3)

Stamina is faster regenerated and drops slower in high demanding environments and while dong activities which would otherwise
deplete your stamina.

```
-10%/level reduced stamina reduction
+10%/level increased stamina regeneration
```

### Packhorse

**Max Level: 5**

Increases weight limit to carry.

```
+5%/level weight limit increase
```

## Crafts Tree

### Improved Trading (3)

NPC can be talked into to pay more or give the player cheaper prices for items.

```
-10%/level reduced stamina reduction
+10%/
```

### Scavenger

When breaking up and recycling items the probability to recycle a higher amount of components is increased.

### Blacksmithing

Able to forge weaponry. Can also [refine weapons](/mechanics/items/#weapon-refinement).

## Science Tree

The Science Tree contains skills witch help with sensing the world events and or performing rituals to even shape the
face of the Bestia world.

### Spell Enscription

Enables the user to write down spells onto items or scrolls for a later use (even by someone who does not know the spell).

### Geography (10)

Increases the range and effectivness when performing a cartography.

### Engieneer (10)

### Control Mana Flow

User is able to channel down the Mana to crystalize into small shards of Mana crystals which can be used as a power source throughout the world.

### Taming (3)

Bestias gain faster experience.

```
+5% experience gain per level
```