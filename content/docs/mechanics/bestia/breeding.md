---
title: Bestia Breeding
---
# Bestia Breeding

Bestias can be interbred in order to improve certain statistics. The player can pair certain individuals of Bestia in
order to produce offspring. In order to breed a Bestia a male and female is required.

Bestias is the same kind (humanoid, formless etc.) can be bread.

In order to breed two Bestia one male and one female must be put together in a breeder which needs to be build and put
ont the map. After a waiting time which is determined by its original level an egg is produced. The Bestia species produced
will always be the species of the female breeding partner.

{{< katex >}}
   t_{hatch} =  (0.1 - 7/99) * lv_{avg} + 7/99
{{< /katex >}}

## Individual Value Breeding

The Bestia spawned from the process will have its [Individual Values](/docs/mechanics/bestia/statusvalues/#individual-values) (IV)
determined like so:

1. Pick two random IVs.
2. From these IVs use the highest value from one of its parents.
3. With 70% the picked IV is 10% higher, with 20% its the same and with 10% its 10% lower.

## Learnable Attacks

The father Bestia has a chance to transfer up to three attacks towards its offspring. Depending on the season out of 25 attacks
are picked to allow the player some control over the selected attacks.

| Attack Range | Season Of Breed |
| :----------- | --------------: |
| 1 - 25       |          Spring |
| 26 - 50      |          Summer |
| 51 - 75      |            Fall |
| 76 - 100     |          Winter |

Up to three attacks from this range is selected and then with a chance of 30 % each of this attacks the attack is transfered
to the female if it can not learn this attack on their own. If she learns this attack on a higher level it will now learn the
attack by the level of the father.

With a chance of 30 % the attack is learned one level earlier then before.
