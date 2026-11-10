---
title: Master Basics
weight: 200
description: "The Bestia Master: origin, skill progression, professions, mana circles and an overview of the five skill trees."
---

The small intro game tells players how they became a Bestia Master: They came into direct contact with an ephemeral mana crystal that changed their nature through magic and connected them to the mana flows of the universe. They are therefore receptive to the influence of mana and are able to communicate with the beings that emerge from this mythical energy: **the Bestia**.

The attachment to mana also explains why Bestia masters were able to survive the destruction of their world relatively unscathed and to pass on to the next incarnation of the world.

# Master Skills

The bestia master can learn a set of skills. These skills are freely chosen by the player and determine the job or profession of the master.

Some of these account skills can be used by every Bestia in possession of the master, or at least have a passive effect on them. Others can only be used actively by the master itself.

{{< alert context="info" text="Don't confuse this skill system with the regular attacks a Bestia is learning by item usage or just by level up. Those are simply called attacks." />}}

- The possible rank counts of a skill should be: **1, 3, 5 and 10**
- Every profession offers **two routes**, two different ways to play it. A Priest can hunt Demons and the Undead or be
  the full support of a party; a Hunter can be an archer or a tracker. A route is a chain of dependent skills that a
  player buys as a unit, and its capstone is part of it.
- A **fighting profession** (the Warrior sub-trees, Priest and Sage) holds about **55-60 ranks**: two routes of about
  **25** each, plus a few shared skills.
- A **job profession** (crafting, gathering and trade) holds about **30-40 ranks**: two routes of about **15-20** each.
- A **base tree** holds **10-25 ranks**. It teaches the basics and gates its sub-trees.
- The Wizard is the widest sub-tree because it repeats the same skills once per element. That is width, not depth: a
  Wizard picks the elements they want and ignores the rest.
- There should be some kind of three tiers inside a route to lead from low and basic skills to the much more powerful
  ones.

{{< alert context="warning" text="Most important: **No hardcoded skill effects!**" />}}

Especially crafting skills should be, when possible, require some sort of minigame or meaningful player interaction. Their outcome should also be dependent on the status values of a player, on the skill level but also on environmental aspects. An example teleport could go as follows:

> After the master Saferu has selected a few of his and friendly Bestia he prepares to teleport to a fairly distant location. While he is very skilled and has a maxed teleport skill, on the target location there is a manastorm causing some interference. Upon teleportation the group is set of course and spawns almost a kilometer off from their target in a very hostile environment.

Ultimately, it remains important to leave the outcome of skills open in some way. However, the result should remain understandable and influenceable by the player.

# Skill Progression

Every master starts out limited to the **Novice** skill tree - a small set of basics that teaches the player how to get around and how to deal with others. Once **5 skill points are invested into Basic Skill** all remaining skill trees unlock and the master can start to specialize.

The Novice tree then closes behind the player: as soon as the first skill point is spent outside of it, no further novice skills can be learned. Everything learned up to that point is kept. It depends on the player how much of the Novice tree he wants to finish before branching out.

On each level up the master gains 1 skillpoint to put into the skills rank. This is permanent and means a player can spend about 100 points for improving the ranks of his skills.

{{< alert context="info" text="The max level is not capped, so in principle more points can be earned - but progression gets continuously harder, so it is safe to assume every player has about 100 points." />}}

Of the about 100 points, 5 go into Basic Skill and 5 into each base tree a master uses, to open its sub-trees. That
leaves about **85 points** for professions. Some builds that fit:

| Build                                               | Points       |
| --------------------------------------------------- | ------------ |
| A job and a fighting profession                     | 35 + 50      |
| A job and one route of two fighting professions     | 35 + 25 + 25 |
| A full fighting profession and one route of another | 55 + 25      |

A master who spreads over three sub-trees still has only two professions, see below: the third one gives its skills
but not its equipment.

# Professions

Skill points spent in a sub-tree (Blacksmith, Sage, Wizard, ...) do more than unlock its skills. They also make the
master a member of that **profession**, and the profession decides which weapons and armor the master can use.

- A sub-tree counts as a profession from its **first skill point**. One point in Knight is enough to pick up a sword.
- A master has **at most two professions**: the two sub-trees with the most points. A master with 8 points in Sage, 8
  in Knight and 2 in Forester is a **Sage / Knight**.
- The master may use every weapon type that one of the two professions allows, and the heavier of their two armor
  types.
- Points in a base tree (Novice, Craftsman, Survival, Scholar, Warrior) belong to no profession.
- Holding a weapon in each hand needs the Assassin skill [Dual Wield](#skill-dual-wield). No profession allows it on
  its own.

{{< alert context="info" text="A sub-tree only opens after 5 points in its parent tree, so the first levels after the Novice tree pass without a profession. The novice equipment carries a master through them." />}}

## Changing Professions

The two professions follow the skill points. A third sub-tree replaces one of the current two only when it has **more**
points than it. On a tie the master keeps the profession they already have, so two equal sub-trees never decide the
gear by chance.

When a profession is lost, everything it allowed and nothing else allows goes back to the bag. Nothing is destroyed,
and the master can wear it again as soon as the profession comes back.

## Base Equipment

Every master can use these, with or without a profession:

- Cloth armor
- Slings
- Tools: pickaxe, hatchet, fishing rod
- The novice equipment below

## Novice Equipment

Every new master starts with a novice set. It is weak, but it ignores professions: every master can use it at any
level. A Novice can try out each way of fighting before spending a point outside the Novice tree, and a master who
just left it is never unarmed while their first profession opens.

| Item          | Weapon or armor type | Slot                   |
| ------------- | -------------------- | ---------------------- |
| Novice Knife  | Dagger               | Right hand             |
| Novice Sword  | Sword                | Right hand             |
| Novice Bow    | Bow                  | Right hand, two-handed |
| Novice Rod    | Wand                 | Right hand             |
| Novice Shield | Light shield         | Left hand              |
| Novice Helmet | -                    | Head                   |
| Novice Shirt  | Cloth                | Armor                  |
| Novice Boots  | Light                | Footgear               |

The [Novice Bow](/docs/mechanics/combat/ranged-combat/#novice-bow) comes with 100 arrows. The novice health and mana potions
are not equipment and stay for Novices only.

## Equipment per Profession

Armor is limited by its heaviest type. A master who may wear Medium armor may also wear Light and Cloth. Shields carry
an armor type as well and follow the same rule, see [Armor Type](/docs/mechanics/items-crafting/items/#armor-type). The weapon types
are listed in [Weapon Type](/docs/mechanics/items-crafting/items/#weapon-type).

| Profession                | Tree      | Armor  | Weapon Types                                                   |
| ------------------------- | --------- | ------ | -------------------------------------------------------------- |
| [Blacksmith](#blacksmith) | Craftsman | Medium | Mace, Hammer, Axe, Greataxe                                    |
| [Alchemist](#alchemist)   | Craftsman | Light  | Dagger, Mace, Thrown                                           |
| [Artificer](#artificer)   | Craftsman | Medium | Dagger, Wand, Staff, Crossbow                                  |
| [Forester](#forester)     | Survival  | Medium | Axe, Greataxe, Spear, Bow                                      |
| [Prospector](#prospector) | Survival  | Medium | Sword, Spear, Crossbow                                         |
| [Miner](#miner)           | Survival  | Medium | Mace, Hammer, Greataxe                                         |
| [Trader](#trader)         | Scholar   | Light  | Sword, Crossbow                                                |
| [Sage](#sage)             | Scholar   | Cloth  | Wand, Staff, Tome                                              |
| [Priest](#priest)         | Scholar   | Medium | Mace, Staff, Tome                                              |
| [Wizard](#wizard)         | Warrior   | Cloth  | Wand, Staff, Tome                                              |
| [Assassin](#assassin)     | Warrior   | Light  | Dagger, Fist, Sword, Thrown                                    |
| [Knight](#knight)         | Warrior   | Heavy  | Sword, Greatsword, Axe, Greataxe, Mace, Hammer, Spear, Polearm |
| [Brawler](#brawler)       | Warrior   | Light  | Fist, Staff                                                    |
| [Hunter](#hunter)         | Warrior   | Light  | Spear, Bow, Crossbow, Thrown                                   |
| [Bard](#bard)             | Warrior   | Light  | Whip, Bow, Instrument                                          |

Heavy armor comes from the Knight alone, so a master who wants plate gives one of their two professions to it. Every
fighting profession owns at least one weapon type few others share - the Knight's greatsword and polearm, the
Assassin's fist weapons, the Bard's whip and instrument, the casters' tome - while every crafting and
gathering profession can still defend itself.

Bestias are not affected by professions. A bestia wears what its species allows, see
[Designing a Bestia](/docs/mechanics/bestias/bestia-design/#10-equipment).

# Mana Circles

Almost every master skill that can fail rolls against a success chance: forging a blade, cutting a rune slot, binding an
enchantment, transmuting matter, inscribing a spell. Skill rank, status values and equipment all feed that roll, and a
lone master eventually hits the ceiling of what those three can buy.

A **Mana Circle** is how a group pushes past it. It is a placeable prop - a ring of
[Mana Concentrate](/docs/mechanics/items-crafting/item-list/#mana-concentrate) laid into the ground - that anyone standing inside
contributes to, whatever their profession. The rite is started by the master who owns the skill; everyone else is simply
present, and presence is the whole contribution.

```text
Circle Bonus = 5 × Participants × ManaFactor   [Participants ≤ 6, caster included]
```

`ManaFactor` comes from the local [mana concentration](/docs/mechanics/world/environment/#mana-concentration): `0.5` in a
drained region, `1.0` in an ordinary one, `1.5` where mana runs thick. A full circle of six in a mana-rich place is
therefore worth `+45%` on the roll - as much as most governing skills grant at max rank - while the same six people
standing on drained ground get `+15%` and would have been better off scouting a different site first.

Three rules keep it from becoming a formality:

- The **mana cost of the rite is split evenly** across every participant, so a circle makes expensive rites affordable as
  well as more likely to land. A participant who cannot pay their share drops out and the circle recalculates.
- Every participant is **locked out of contributing again for 5 minutes**, and cannot act while the rite runs. Standing
  in someone's circle is a real cost, not a favor that takes a second.
- A circle only helps a **success roll**. It does nothing for damage, healing, movement or anything else a skill does.

{{< alert context="info" text="This is the intended answer to \"my crafting rolls have plateaued\": find other players, not better gear. It is also why the highest-level artifacts are expected to be group work - see the [Encourage Social Interaction](/docs/mechanics/overview/#encourage-social-interaction) principle." />}}

# Skill Trees

The skills are organized in five trees, and each tree in sub-trees. Every tree has a page of its own. After a level up one skill point can be spend to increase a single level of a skill.

{{< alert context="info" text="Each tree and sub-tree page is illustrated with a dependency diagram. A slanted node is a skill borrowed from another tree, every other node is a skill of the tree itself, and a node with no incoming arrow is an entry skill with no prerequisite. Solid arrows are labeled with the required level in the source skill. Dashed arrows lead to the tree-mastery gate that unlocks a sub-tree once 5+ points are invested in its parent tree." />}}

- [Novice Tree](/docs/mechanics/master/novice-tree/): The few basic skills every master starts with, and the gate to all other trees.
- [Craftsman Tree](/docs/mechanics/master/craftsman-tree/): Blacksmith, Artificer and Alchemist: the skills that discover, produce, refine and enchant items.
- [Survival Tree](/docs/mechanics/master/survival-tree/): Forester, Prospector and Miner: living off the land, charting the unknown and digging for what it hides.
- [Scholar Tree](/docs/mechanics/master/scholar-tree/): Priest, Trader and Sage: keeping a party alive, running trade and chasing magic to its source.
- [Warrior Tree](/docs/mechanics/master/warrior-tree/): Wizard, Brawler, Hunter, Assassin, Knight and Bard: the fighting professions.
