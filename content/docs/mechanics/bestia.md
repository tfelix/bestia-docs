---
title: Bestias
description: Details on catching, breeding, and leveling Bestias through combat and environmental interactions
weight: 300
---

In areas of high mana concentration, so-called **mini rift events** form. At these neuralgic points Bestia materialise and enter the respective world. Bestia therefore spawn on the map on their own, and they do so more often where the [mana concentration](/docs/mechanics/environment/#mana-concentration) is higher.

Which species spawns is decided by the surrounding environment: every Bestia has an affinity for certain biomes and spawns with the corresponding probability in each of them.

# Catching Bestias

To catch a Bestia you need a **Magic Bestia Trap**. These are manufactured with the Craftsman's [Carpentry](/docs/mechanics/master/#skill-carpentry) skill and empowered with [Mana Dust](/docs/mechanics/item-list/#mana-dust). Four tiers exist, each one better than the last at holding a high-level Bestia.

The base catch chance depends only on the trap tier and the target's level:

| Trap                                                   | Lv. 1 - 20 | Lv. 21 - 40 | Lv. 41 - 60 | Lv. 61 - 100 |     Lv. 101+     |
| :----------------------------------------------------- | :--------: | :---------: | :---------: | :----------: | :--------------: |
| [Bestia Trap](/docs/mechanics/item-list/#bestia-trap)  |    +60%    |    +20%     |    -20%     |     -60%     | -60% - 3(LV-100) |
| [Super Trap](/docs/mechanics/item-list/#super-trap)    |   +100%    |    +60%     |    +20%     |     -20%     | -20% - 3(LV-100) |
| [Mega Trap](/docs/mechanics/item-list/#mega-trap)      |   +140%    |    +100%    |    +60%     |     +20%     | +20% - 3(LV-100) |
| [Master Trap](/docs/mechanics/item-list/#master-trap)  |   +180%    |    +140%    |    +100%    |     +60%     | +60% - 3(LV-100) |

The `Lv. 101+` column continues the `Lv. 61 - 100` column without a jump: at exactly Lv. 100 the penalty term is zero.

On top of the base chance, every bonus below contributes **percentage points**:

| Source                                                                          | Bonus              |
| :------------------------------------------------------------------------------ | :----------------- |
| Reducing the target's HP before throwing the trap                               | up to `+30`        |
| The trap user's [Willpower](/docs/mechanics/statusvalues/#willpower---wil)       | `+ WIL / 50`       |
| [Bestia Trapping](/docs/mechanics/master/#skill-bestia-trapping) Lv. 1 - 5       | `+6` … `+30`       |
| [Beastfriend](/docs/mechanics/master/#skill-beastfriend) Lv. 1 - 5               | `+5` … `+25`       |
| Buffs on the trap user, debuffs on the target                                   | varies             |

The HP bonus scales linearly with how far the target has been worn down, reaching its full `+30` when the Bestia is at 1% HP:

<!-- prettier-ignore -->
{{< katex display >}}
bonus_{HP} = 30 \cdot \left(1 - \frac{HP_{current}}{HP_{max}}\right)
{{< /katex >}}

Everything is then summed and clamped once:

<!-- prettier-ignore -->
{{< katex display >}}
P_{catch} = \mathrm{clamp}\big(0\%,\ 95\%,\ base_{trap} + \textstyle\sum bonus\big)
{{< /katex >}}

A result of `0%` means the Bestia cannot be caught with that setup at all — the player has to bring a better trap, better skills or better buffs. The `95%` ceiling means even a perfect setup can always fail.

{{< alert context="info" text="**Why additive and not multiplicative?** Because percentage points are legible and scale sanely. A multiplicative bonus (say `base × 4`) does almost nothing where the player needs it most - four times a `0.8%` base is still a hopeless `3.2%` - and is instantly wasted where they do not, since four times a `60%` base clamps immediately. Additive bonuses make every point of investment worth exactly the same, let a tooltip state a number that is true everywhere, and turn a negative base into a readable budget the player has to out-equip." />}}

Because the Lv. 101+ penalty is steep, the level at which catching becomes hopeless is set by how much bonus a player can assemble. Both rows below assume the target has been worn down to 1% HP:

| Setup                                                             | Lv. 100 | Lv. 110 | Lv. 120 | Lv. 140 | Lv. 150 |
| :---------------------------------------------------------------- | :-----: | :-----: | :-----: | :-----: | :-----: |
| Mega Trap, no Forester skills, WIL 100 (`+32` total)              |  `52%`  |  `22%`  |  `0%`   |  `0%`   |  `0%`   |
| Master Trap, maxed Forester, WIL 150 (`+88` total)                |  `95%`  |  `95%`  |  `88%`  |  `28%`  |  `0%`   |

Bestia above Lv. 100 are meant to be rare and Bestia above Lv. 120 close to legendary — but they always stay reachable for a master who has actually specialised in catching them.

# Attacks

In Bestia, there are two main types of magical actions:

1. **Skills** – Learned by a Bestia Master. Skills have levels and can be upgraded in a skill tree as the Master levels up. These are controlled by the player using skill points. See [Bestia Master](/docs/mechanics/master/) for the full skill tree.
2. **Attacks** – Learned by a Bestia as it levels up, at fixed, predefined levels. These can be battle-related or utility magic.

Each skill or attack is characterized by its **level** and **elemental aspect**.

Some magical actions are **both** at once. Many offensive spells—the elemental bolts, for example—exist as a Master skill _and_ as a Bestia attack. A Master learns such a spell in their skill tree and raises its power by investing skill points, while a Bestia learns the very same spell as an attack at a fixed level and is locked to the strength of that level. In short: the Master keeps levelling the spell up, whereas a Bestia's version never grows beyond the level it was learned at.

Bestias can learn attacks in two ways:

1. **Level Up** – Each Bestia has an internal list of attacks it will learn as it gains levels. The same attack may be learned at different levels by different Bestias.
2. **Spell Scrolls** – Players can inscribe attacks onto spell scrolls with the Sage's [Spell Enscription](/docs/mechanics/master/#skill-spell-enscription) skill (or find them as loot). These spells can be used directly from the scroll or taught to a Bestia.

General guidelines when Bestia are learning attacks from level ups:

- **From Lv. 1–100**, a Bestia should learn **about 20** attacks.
- Around **15 attacks** are learned between **Lv. 1–70**, and the last 5 (the most powerful ones) **between Lv. 71–100**.

An overview of the attacks themselves lives on the [Attack List](/docs/mechanics/attack-list) page.

# Breeding

Bestia can be bred in order to improve their [status values](/docs/mechanics/statusvalues) and to pass powerful attacks down a bloodline. To breed a pair, the following criteria must be met:

- A male and a female are required.
- Both must be of the same kind (humanoid, formless, etc.).
- Both must be at least **Lv. 10**.

Both parents are placed into a [Breeder](/docs/mechanics/item-list/#breeder), a structure that has to be built and placed on the map. After a waiting time derived from both parents' levels an egg is produced:

<!-- prettier-ignore -->
{{< katex display >}}
t_{breed} = 25 \cdot (lv_1 \cdot lv_2)^{1.3}\ [s_{real}]
{{< /katex >}}

This is the same as \\(25 \cdot \bar{L}^{2.6}\\) with \\(\bar{L} = \sqrt{lv_1 \cdot lv_2}\\), the geometric mean of the two parents' levels — so an unevenly matched pair breeds at the pace of its average.

The egg then has to hatch, which takes a much shorter, slightly randomised time:

<!-- prettier-ignore -->
{{< katex display >}}
t_{hatch} = rand(0.9,\ 1.0) \cdot 18 \cdot lv_1 \cdot lv_2\ [s_{real}]
{{< /katex >}}

Both timers are given in **real time**, not [Bestia time](/docs/mechanics/environment/#in-game-time):

| Parent levels | Breeding time      | Hatch time |
| :------------ | :----------------- | :--------- |
| 10 & 10       | ~2 h 45 min        | ~30 min    |
| 20 & 20       | ~17 h              | ~2 h       |
| 30 & 30       | ~2 days            | ~4.5 h     |
| 50 & 50       | ~7.5 days          | ~12.5 h    |
| 75 & 75       | ~21.5 days         | ~28 h      |
| 100 & 100     | ~46 days (~1.5 mo) | ~2 days    |
| 120 & 120     | ~73 days (~2.4 mo) | ~3 days    |

Breeder upgrades, feed, buffs and items shorten both timers. A well-equipped setup typically reaches a **30 - 40%** reduction, and the total reduction is capped at **50%**.

There is **no cooldown** on the breeder. The moment an egg is produced the same pair can immediately start the next attempt — the breeding time itself is the only limit on how fast a bloodline can be pushed forward.

The offspring is always of the **female's** species and hatches at **Lv. 1**, so every generation has to be raised to Lv. 10 again before it can breed in turn.

{{< alert context="info" text="Note the deliberate tension in the timers: because individual values do not depend on level, the cheapest way to ladder IVs is to keep a dedicated breeding line at exactly Lv. 10 and accept the ~3 hour timer. High-level parents only become worth their far longer timer when the goal is inheriting a powerful attack, since a father can only pass on an attack he has actually learned himself." />}}

## Individual Value Evolution

A Bestia has nine individual values: one for each of the six [status values](/docs/mechanics/statusvalues/#status-values) (INT, WIL, STR, VIT, DEX, AGI) and one each for HP, Mana and Stamina — the `ivHp`, `ivMana` and `ivSta` terms in the [status based value](/docs/mechanics/statusvalues/#status-based-values) formulas. Each one ranges from `0` to `100`.

The offspring's IVs are rolled per IV, independently:

1. **Seed** — three of the nine IVs are drawn at random as _dominant_. For a dominant IV the seed is the **higher** of the two parents' values; for the remaining six the seed is taken from one randomly chosen parent.
2. **Variance** — roll once per IV: with `70%` the seed is raised by 10%, with `20%` it stays as it is, and with `10%` it is lowered by 10%.
3. **Clamp** — round to the nearest integer and clamp into `[0, 100]`.

A dominant IV therefore drifts upward by about `6%` per generation on average (`0.7 · 1.1 + 0.2 · 1.0 + 0.1 · 0.9 = 1.06`), so a line seeded around IV 50 needs roughly a dozen generations to approach the cap of 100. Because only three IVs are dominant per clutch, the player has to decide which stats a bloodline is being bred for rather than improving everything at once.

**How much is an IV actually worth?** The answer is defined once, on the [Status Values](/docs/mechanics/statusvalues/#individual-values) page, and follows directly from the status value formula:

```text
statusValue = (baseValue + individualValue) * level / 100 + effortValue
```

The IV is scaled by level, so it is nearly irrelevant on a fresh Lv. 1 hatchling and worth its full value at Lv. 100. A perfect IV of 100 instead of 0 is worth `+50` to that status value at Lv. 50 and `+100` at Lv. 100. This is what makes breeding a long-term investment: the payoff only materialises once the offspring has been levelled.

{{< alert context="info" text="Bestia Masters are never bred and always have an IV of 50 in every stat, so none of this applies to them." />}}

## Learnable Attacks

Breeding can give the offspring up to **three inherited attacks** on top of the ~20 attacks its species learns naturally. Only the **father** passes attacks on; the mother decides the species.

The player influences the outcome on three levels.

### 1. Season — which attacks are eligible

Only attacks whose learn level falls inside the current [Bestia season's](/docs/mechanics/environment/#in-game-time) band are eligible:

| Attack Lv. Range | Season Of Breeding |
| :--------------- | -----------------: |
| 1 - 25           |             Spring |
| 26 - 50          |             Summer |
| 51 - 75          |               Fall |
| 76 - 100         |             Winter |

A season lasts one real-time month, and a Bestia knows about 20 attacks spread over Lv. 1 - 100, so a band typically leaves about **five** of the father's attacks eligible. Waiting for the right season is the coarse, free control.

### 2. Priming — which eligible attacks are attempted

Before breeding starts the player may load up to **three** spell scrolls of eligible father attacks into the breeder. Those become the candidates, and the scrolls are consumed when breeding begins. Since scrolls are produced with the Sage's [Spell Enscription](/docs/mechanics/master/#skill-spell-enscription) skill, directed breeding costs real resources and pulls a second profession into the loop.

If nothing is primed, up to three eligible attacks are drawn at random instead — undirected breeding still works, it just gives up the control.

### 3. Investment — how likely each candidate is to land

Each candidate rolls independently. All terms are percentage points:

<!-- prettier-ignore -->
{{< katex display >}}
P_{transfer} = 30\% + \min\big(30,\ lv_{father} - lv_{attack}\big) + 2 \cdot Beastfriend_{Lv}
{{< /katex >}}

A father can only pass on an attack he has learned, so the middle term is never negative. It rewards levelling a stud well past the attack you actually want from him: the chance runs from `30%` for a father who has only just learned the attack up to `70%` for one who is 30 levels past it and backed by [Beastfriend](/docs/mechanics/master/#skill-beastfriend) Lv. 5.

A successful roll resolves like this:

- The offspring's species **cannot** learn the attack naturally → it is added as an **inherited attack**, learnable at the level the father learned it. This is the valuable case, and the only way to get an attack onto a species with no natural access to it.
- The offspring **can** learn it naturally, but later than the father did → its learn level is pulled down to the father's.
- The offspring already learns it at the same level or earlier → no effect.

On top of that, each transferred attack has a `30%` chance to be learned one further level earlier.

# Experience

The primary way to gain experience is fighting enemy Bestia. More pacifistic players can earn experience through skill use and interaction with the world instead. To keep combat the fastest route without making the alternatives pointless, skill-based experience is deliberately pegged at roughly **half** of what defeating a Bestia of the same level yields, and it is additionally rate-limited by materials, resource node respawns and crafting times.

The experience a Bestia needs for its next level grows cubically, so every route gets slower as the level rises:

<!-- prettier-ignore -->
{{< katex display >}}
exp_{req} = \frac{lv^3}{3} + 1.5 \cdot lv + 15
{{< /katex >}}

| Bestia Lv. | EXP for next level | ≈ same-level kills |
| ---------: | -----------------: | -----------------: |
|         10 |                363 |                  8 |
|         25 |              5,261 |                 50 |
|         50 |             41,757 |                204 |
|         75 |            140,753 |                462 |
|        100 |            333,498 |                823 |

The kill counts are before any of the modifiers below, which in practice cut them down considerably.

## Killing Enemies

When an enemy is defeated the base experience of the kill is:

<!-- prettier-ignore -->
{{< katex display >}}
exp_{gain} = 4 \cdot lv + 5
{{< /katex >}}

where `lv` is the level of the defeated entity. The following modifiers are then summed and applied once to that base:

| Modifier                                                       | Effect  |
| :------------------------------------------------------------- | :------ |
| Each Bestia involved in the attack beyond the first            | `+20%`  |
| The target was flagged as a boss                               | `+200%` |
| Each elemental level of the target (e.g. `FIRE_2` gives `+20%`) | `+10%`  |
| The target was a player-controlled Bestia                      | `+80%`  |
| Party bonus                                                    | `+30%`  |
| The target was a structure                                     | `-80%`  |
| Buffs and equipment                                            | varies  |

The `+20%` per additional Bestia grows the pool _before_ it is split, so bringing more Bestia into a fight is not a straight loss for each of them — but it is still less per head than soloing the same enemy.

After the killing blow is delivered, the resulting pool is distributed among the damage dealers in proportion to the damage each of them contributed. For every receiver it is then resolved where the experience actually goes — into a guild, for example — and otherwise it is credited to the Bestia itself.

## Environment Interaction

Experience is also earned by working with the world rather than fighting it:

| Activity                                                          | EXP gained               |
| :---------------------------------------------------------------- | :----------------------- |
| Travelling                                                        | `3` per km travelled     |
| Gathering a resource (mining, lumberjacking, herbalism, fishing)  | `2 * resource_level + 5` |
| Crafting an item (forging, brewing, transmuting, …)               | `2 * item_level + 5`     |
| Constructing a structure                                          | `3 * item_level + 10`    |

Gathering and crafting sit at about half of `4 * lv + 5`, the base experience for defeating a Bestia of the same level. A Craftsman or Miner therefore progresses at roughly half the pace of a fighter — a genuine route, just a slower one.

Travel experience is deliberately tiny: at Lv. 50 a single level would take almost 14,000 km on foot. It is a top-up for players who are out exploring anyway, never a progression route of its own.

## Death Penalty

A Bestia **Master** cannot die. Instead they are reborn on the spot with a temporary malus that reduces all of their status values by `15%` for 15 minutes.

A Bestia or Master that is defeated loses `1%` of its current experience points. Carried items are protected by a spell which tries to teleport them back to a secure storage shortly after death — but remember: spells can be [dispelled](/docs/mechanics/master/#skill-dispell).

In every case, carried items suffer a durability penalty.

### Hard Mode

A player can opt into **Hard Mode** for a `+3%` experience and `+3%` loot bonus. In exchange, dying costs `5%` of current experience instead of `1%`, and carried items are not protected by the teleport spell.

Toggling Hard Mode carries a **15 minute real-time cooldown**, which exists to stop players from flicking the mode off the moment a situation turns dicey. Two exceptions keep that cooldown from becoming a trap:

- Inside a **safe zone** the mode can be toggled freely, with no cooldown at all. Committing to the risk should be a decision made before heading out, not something a player gets locked out of while standing at a workbench.
- Immediately **after a death** the mode may be switched once regardless of the cooldown, which then restarts from that switch. The penalty for the death that just happened has already been paid, so there is nothing to dodge.

### Permanent Death

Bestia, unlike their Master, can be lost for good. A killing blow is fatal in the permanent sense when its **overkill damage** — the damage dealt in excess of the Bestia's remaining HP — is at least equal to the Bestia's maximum HP.

This keeps the risk legible: a Bestia is only ever permanently lost to something that could have killed it twice over. Being badly outmatched by a boss, or ambushed at full HP by something far stronger, is genuinely dangerous, while ordinary attrition in a fair fight is not.

{{< alert context="warning" text="The overkill threshold is **temporary** and still subject to balancing. It should stay high enough that permanent loss reads as a consequence of being outmatched rather than as bad luck." />}}
