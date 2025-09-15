---
title: Attacks & Skills
weight: 100
description: The magic and the usage of it plays a crucial role in the Bestia universe. The users should be able to be deeply involved into magic spell creation and research.
---

> There is a difference between the **Master Skills** and the attacks/skills of a Bestia: The master skills are based on a skill
> tree while the attacks of a Bestia are learned automatically when reaching the designated level.

The system must allow the user to describe or discover newly innovative ways to combine spells. Yet the research should
be fun and entertaining. Bestias can learn attacks by two means:

1. Level Up - Each Bestia has a internal list of attacks she will learn when gaining levels. This is different from Bestia
   to Bestia. The same attack can be learned at different levels for different Bestia.
2. Spell Discovery - The player can try to "invent/discover" new attacks which then can be tried to be learned to a Bestia.

Each Bestia skill is characterized by its **level** and **magic school**.

## Magic Schools

All skill are divided into the three schools of magic: **Arcane**, **Black** or **White Magic**. These schools might be
important if certain spells are increased via a learned skill.

### Arcane Magic

This describes 'trickster' magic. It can be illusion spells, utility spells like generating food or shelter. There might be some
rare kind of damaging spells but usually they contain transmutations and other fancy spell effects.

### Black Magic

Mostly damaging spells which are meant to inflict harm. These might be damaging spells or spells which directly inflict damage or
harming status of its receiver like lowering defense or status values.

### White Magic

The Healing, Buff or protection spells. These also contain detection of spells and neutralization spells of magic. generally all
kind of protection, healing or improving stati fall into the domain of white magic.

## Learning Attacks

Attacks are either learned via leveling up, vie the [Spell Discovery](/docs/mechanics/skills/#spell-discovery) skill or via Spell Scrolls
which can be created by the players themselves (but should be rather expensive).

For leveling up a Bestia a general rule of thumb is:

1. A Bestia should have about 25 skills.
2. About 20 of the attacks should be learned from level 1 - 70. The last 5 of the attacks between level 71 - 100.

### Spell Discovery

Spells can be discovered by the player. If he has the skill [Spell Discovery](/docs/mechanics/skills/#spell-discovery). The maximum attack
learnable by the skill level is given in the table below.

| Spell Discovery Lv. | max. Skill Level Discoverable |
| ------------------- | -----------------------------: |
| 1                   |                             10 |
| 2                   |                             20 |
| 3                   |                             30 |
| 4                   |                             40 |
| 5                   |                             50 |
| 6                   |                             60 |
| 7                   |                             70 |
| 8                   |                             80 |
| 9                   |                             90 |
| 10                  |                            100 |

To discover a spell an aspect is chosen like 'White Magic', 'Black Magic' or 'Arcane Magic'.

### Spell Enscription

If the player owns the skill [Spell Enscription](/docs/mechanics/skills/#spell-enscription) he can attach the spell to scrolls or even to other entities.

After a spell has been materialized and bound to some kind of magic containment it can be used by the owner. Spells of
a higher level are of course far harder to handle. Attaching or handling such spells could produce unwanted side effects
depending on the spell (some spells might create explosions, others might teleport something away or randomly heal
bystanders etc.)

## Spell Binding

Most if not each entity/object in the game world have slots and triggers to which spells can be attached to.
If the player has the skill [Spell Binding](/docs/mechanics/skills/#spell-binding) he can discover such slots and triggers
on entities as well as trying to bind spells to such entities.

### Trigger Types

* Entity entering or leaving range
* Special Entity entering or leaving range (Name, Type etc.)
* Presence of Magic rising of falling
* Weather Conditions
* Time
* Spell Cast in Range

## Detection of Magic

If the user has learned [Detect Magic](/docs/mechanics/skills/#detect-magic). The detection itself is easier if the spell is more powerful. However precautions can be used to avoid the spell getting detected. If more than one spell is attached to an object the less powerful spells are harder to detect.


# WORK INTO THE DOC

A Bestia can learn most attacks by just gaining new levels. They have a predefined list of attacks until they reach Lv. 100. Over this level there are no new attacks anymore. New attacks should be learned every 4-6 Lv. The spell level should roughly match the level of the Bestia for balancing.

{{< alert context="info" text="The level listed here does not necessairly mean every Bestia will learn it exactly at this level! It is only a rough guideline." />}}

An attack **does not have** a seperate level which you can increase. Only skills which are available on a bestia master can be leveled up on their own to help customizing the master.

However, there are spell scrolls that you can find or create, which hold a spell. These are either single-use, or you can teach the spell to a Bestia for a certain cost in resources. You can also produce a spell scroll from a Bestia you own, provided it can perform a certain attack. Learning a spell in this way has a fixed cost. This system encourages players to teach their Bestia only the most useful or powerful attacks, while cheaper spells are better used as single-use scrolls by their master.