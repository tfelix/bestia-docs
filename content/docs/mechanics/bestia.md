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
