---
title: Bestias
---

# Bestias

In areas with high mana concentration, so-called mini rift events are formed. At these neuralgic points, Bestia are materialized and enter the respective worlds. They are basically automatically spawning on the map with a higher probability where the mana concentration is higher.

The type of the Bestia which spawns is determined by the environments (Bestias have a affinity to certain biomes and they spawn according to this probability in the different biomes).

## Catching Bestias

In order to catch Bestia you need Magic Bestia Traps. This items are manufactured via the apropriate crafting skill. Bestias catch chance can be increased by reducing its HP. If the HP is 1% the catch chance is increased by 30%. It can also changed by applying buffs or debuffs.

| Trap        | Bestia Lv. 1 - 20 | 21 - 40 | 41-60 | 61-100 |       100+        |
| :---------- | :---------------: | :-----: | :---: | :----: | :---------------: |
| Bestia Trap |        60%        |   20%   | -20%  |  -60%  | -60% - (LV - 100) |
| Super Trap  |       100%        |   60%   |  20%  |  -20%  | -20% - (LV - 100) |
| Mega Trap   |       140%        |  100%   |  60%  |  20%   | 20% - (LV - 100)  |
| Master Trap |       180%        |  140%   | 100%  |  60%   | 60% - (LV - 100)  |

You can also increase the chance of catching by {{< katex >}}+\frac{WILL}{50}{{< /katex >}} of the trap user.

## Breeding

Bestias can be bred in order to improve certain statistics. The player can pair certain individuals of Bestia in
order to produce offspring. In order to breed a Bestia the following criteria must be met:

* A male and female is required
* Bestias of the same kind (humanoid, formless etc.) can be bread
* Bestia need a minimum level of 10 in order to breed them.

In order to breed two Bestia one male and one female must be put together in a breeder which needs to be build and put
onto the map. After a waiting time which is determined by its original level an egg is produced. The breeding time until
an egg is produced is given by:

{{< katex display >}}
   t_{breed} [s_{real}] =  (3 \cdot 24 \cdot 3600) \cdot \frac{lv_1 \cdot lv_2}{2}
{{< /katex >}}

The Bestia species produced will always be the species of the female breeding partner.

The hatch time of the egg is given is given in normal time and is determined by:

{{< katex display >}}
   t_{hatch} [s_{real}] =  rand(0.9, 1.0) \cdot (5 \cdot 24 \cdot 3600) \cdot \frac{lv_1 \cdot lv_2}{2}
{{< /katex >}}

### Individual Value Evolution

The Bestia spawned from the process will have its [Individual Values](/docs/mechanics/statusvalues/#individual-values) (IV)
determined like this algorithm:

1. Pick two random IVs pairs from each of the parents.
2. From these IVs use the highest value from each parent.
3. With 70% the picked IV is 10% higher, with 20% its the same and with 10% its 10% lower.

As you can see there is a good chance that the resulting IV is higher then bevore. Breeding can therefore easily be used in order
to improve Bestia.

### Learnable Attacks

The father Bestia has a chance to transfer up to three attacks towards its offspring. Depending on the season of the year, out of 25 attacks are picked to allow the player some control over the selected attacks.

| Attack Lv. Range | Season Of Breeding |
| :--------------- | -----------------: |
| 1 - 25           |             Spring |
| 26 - 50          |             Summer |
| 51 - 75          |               Fall |
| 76 - 100         |             Winter |

Up to three attacks from this range is selected and then with a chance of 30 % each of this attacks the attack is transfered
to the female if it can not learn this attack on their own. If she learns this attack on a higher level it will now learn the
attack by the level of the father.

With a chance of 30 % the attack is learned one level earlier then before.

## Experience

The primary way to gain experience in the game is by fighting enemy Bestias. But there is also experience for more pacifistic players to gain through the use of skills. However, in order to give players no advantage over activly fighting players, the experience gained via skill use only rises linearly (opposing to the exponential exp needed growth of a Bestia).

To level up a Bestia the required amount of experience is given by:

{{< katex display >}}
   exp = lv^3 / 3 + 15 + lv * 1.5
{{< /katex >}}

### Killing Enemies

When an enemy is killed the attackers participating in the attack will gain a certain:

{{< katex display >}}
   exp_{gain} = lv * 4 + 5
{{< /katex >}}

There are several modifiers for this exp which gets delivered:

* `+20%` for each Bestia involved in the attack
* `+200%` if it was a boss flagged Bestia
* `+10%` for each elemental level (e.g. `FIRE_2` has +20% additional exp)
* Bonus EXP by buffs or equipments
* `180%` if it was a player controlled Bestia
* Party Bonus of `130%`
* `-80%` if it was a structure

After a killing blow was delivered the EXP gained is calculated end distributed between the damage dealers of the entity. Then for each receiver it is checked if the EXP gets for example distributed into a guild otherwise it is contributed against the Bestia.

### Environment Interaction

Experience is also gained by interacting with the environment:

* Travel: `EXP += 2` EXP per km travelled
* Construction: `EXP += 2 * item_level` per item level of the construction used
* Skill usage that creates items: `EXP += 2 * EXP`
* Gather resources: `EXP += 3.5 * EXP` of resource item level found

### Death Penalty

Players Master can not die, they are reborn with a temporary malus. Which reduces all their stats by `15%` for 15 minutes.

A killed Bestia or Master loses `1%` of their current experience points. The items are automatically protected via a spell
which tries to teleport the items back to a secure storage after short duration (but remember: spells can be dispelled!).

If the player activates the so-called **Hard Mode** he gets an experience bonus as well as a loot bonus of `+3%`.
However, if he dies he looses `5%` of his current experience and items are not protected by default with a spell. If once
activated the **Hard Mode** will take one hour real time cooldown in order to get switched again. This should prevent
players from switching the mode on and off quickly after detecting a dicey situation.

In both cases the items suffer a durability penality.

Bestias however, can be permanently get killed, if the killing blow is particularly strong.
