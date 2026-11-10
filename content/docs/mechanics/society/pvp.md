---
weight: 1000
title: PvP & Honor
description: "How honor and reputation shape player conflict in Bestia: NPC memory, penalties for griefing, protected and war zones, and redemption at the Shrines of Judgement."
---

In Bestia, players can perform malicious actions that negatively impact others. This is by design, but there are incentives to discourage such behavior, especially to protect low-level players from griefing. Players who maintain good behavior and increase their honor level will receive rewards. Conversely, those with negative honor will gain a bad reputation and face repercussions, potentially becoming targets for player-initiated hunts.

Nobody can harm what they own. A player's own skills, attacks and fires never hurt the player, their bestias or their crafting stations, anywhere in the world. This also means a player cannot knock down their own station.

# Reputation System

Honor belongs to a Bestia Master, not to the account. Each Master of an account has their own. It is tracked on two levels:

- **Global honor.** What the whole world thinks of the Master. Certain actions change it at once.
- **Local honor.** What the people of one settlement think of the Master. Most actions change only this.

Local honor itself starts with a single person and travels from there:

1. **The witness holds a grudge.** A townsperson who saw a misdeed remembers it personally. Only this person knows at first. Their shop prices and their mood towards the Master change straight away.
2. **The town hears of it.** Over the next [Bestia day](/docs/mechanics/world/environment/#in-game-time) the witness tells the people around them. Half of their grudge becomes the settlement's local honor, so every townsperson there now treats the Master the same way.
3. **Nearby towns hear of it.** Once a settlement's local honor falls below **-100**, the news spreads to the towns around it as a rumour. It reaches them at walking pace, and it weakens with distance: a village next door hears most of it, a town far away hears little or nothing. Their townsfolk mention the Master by name when asked about recent events.

Players start with a global **20 honor** and every settlement starts with a **local honor of 10** towards every new Master. A settlement whose local honor falls below **-100** remembers it permanently. Values above that slowly return to the default.

Global honor has a ceiling of **+100**. Good deeds beyond that are not banked, so a Master cannot save up honor and then spend it on a massacre.

## Witnesses

Most honor loss needs a witness. A witness is a townsperson or another player who can see the offender at that moment, or the offence happens inside a settlement. A player who sees it costs the offender only the global part of the loss, because players do not set a town's prices. A misdeed that nobody saw costs nothing, with one exception: the [Protected Zones](#protected-zones) see everything.

# Self-Defense

Players can always defend themselves without any penalty.

The first player who harms another player becomes the **Aggressor** for **180 seconds**. Everybody can see this as a debuff. Harming the Aggressor back, or killing them, costs no honor and has no other negative effect. A defender never becomes the Aggressor by fighting back.

A player who attacks an Aggressor that is fighting somebody else is defending too. They also stay free of penalty.

# Negative Honor

Due to the presence of multiple factions with differing interests, defining universally bad behavior can be complex. However, certain core actions are universally considered griefing and will result in honor loss. The following actions lead to a loss of honor (usually an NPC or other player must be present in order for the honor loss to occur):

| Malicious Action                                | Global Honor Loss | Local Honor Loss |
| ----------------------------------------------- | :---------------: | :--------------: |
| Killing NPC                                     |        -10        |       -60        |
| Killing player in non-opposing faction          |        -10        |       -50        |
| Killing player in opposing faction w/ -10 Lv.\* |        -5         |       -10        |
| Killing a Player's Bestia                       |         0         |        -2        |
| Stealing Item (Mundane)                         |         0         |       -10        |
| Stealing Item (Superior)                        |        -5         |       -20        |
| Stealing Item (Rare)                            |        -10        |       -30        |
| Stealing Item (Legendary)                       |        -15        |       -40        |
| Damaging a Building >10% HP                     |        -2         |       -10        |
| Dispelling a ward stone                         |        -5         |       -20        |
| Destroying a ward stone                         |        -20        |       -100       |
| Abandoning an accepted commission               |        -5         |       -20        |

\* The victim is at least 10 levels below the attacker. Killing an opposing-faction player who is not this far below carries no honor penalty.

The local loss falls on the witness first and reaches the settlement later, as described in the [Reputation System](#reputation-system). Killing or harming an [Aggressor](#self-defense) is never a malicious action, whoever the victim is.

Until the [Orders](/docs/mechanics/society/factions) are part of the game, every Master counts as unsworn, so every other player is in a non-opposing faction.

Abandoning a commission means dropping an assigned contract, letting it expire without a serious attempt, or dumping the cargo — not merely failing at it. The local honor loss falls on the **broker NPC** who held the contract, and brokers talk to each other like every other witness, so a player who makes a habit of it finds the boards of a whole town closed to them. The forfeited [collateral](/docs/mechanics/world/questing/#collateral) is a separate, purely financial consequence on top.

If no negative honor is received for a full [real-time](/docs/mechanics/world/environment/#in-game-time) day, the accumulated negative honor decays by 1 point per real-time day. The time a Master is offline counts too. Positive honor can be earned on top of that.

{{< alert context="warning" text="The decay rate is an **initial value for balancing**. At 1 point per day a single NPC kill (-10 global) takes ten days to fade, which may turn out too slow." />}}

{{< alert context="warning" text="**Not decided yet:** whether burning the fields around a town or felling its woods costs honor. Today it does not, although it is the main way to [hurt a settlement](/docs/mechanics/towns-trade/settlements/#what-you-can-break)." />}}

If a player steals something that belongs to an NPC or another player, they lose honor for each item taken, depending on the item level. Stealing means picking up an item from a storage space that does not belong to the player. The owner can also grant certain players access rights to a chest; in this case, removing items is not considered stealing.

**Note**

Looting a dead NPC or player, however, does not lead to a reduction of honor.

When effects are calculated, the global honor, the settlement's local honor and the personal grudge of the townsperson the Master deals with are added together. Once a player's honor drops below 0, negative effects begin to take place. These effects include:

| Honor Amount | Effect                                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| < 0          | No more advantages from NPCs and the NPC will act unfriendly                                                          |
| < -60        | Some NPCs might start to act hostile, attacking the player or fleeing. Trading is no longer possible.                 |
| < -100       | NPCs will permanently remember the player and spread the word, so more NPCs start to act hostile towards the player.¹ |

¹ The word only spreads once a settlement's local honor drops below -100; the global honor part has no effect here.

Prices for trades with an NPC, when negative local honor is present, are calculated as follows:

```text
price_inc_percent = -5/3 * honor
```

This formula only applies while the combined honor is in the `(0, -60]` range. At exactly `-60` the price increase reaches `+100%`, and below `-60` trading with the NPC is no longer possible at all (see the effects table above).

The same share comes off what the merchant pays for goods the player sells. A merchant who dislikes a Master charges more and pays less.

A positive combined honor can earn a small discount, but it never closes the gap between what a shop sells for and what it buys for. A shop always [buys lower than it sells](/docs/mechanics/towns-trade/settlements/#shops-and-stock), whoever is at the counter.

# Positive Honor

A positive honor level leads to very friendly NPCs, which might even give the player discounts or gifts from time to time. To increase your honor level again, you can:

- Kill a player with negative honor, which is indicated by certain debuffs visible to other players.
- Help an NPC, for example by healing or resurrecting a dead NPC.
- Defend an NPC or a low-level player from an [Aggressor](#self-defense).
- Complete an NPC's quest, or fulfil a player [commission](/docs/mechanics/world/questing/) held by that NPC as broker.
- Return a stolen item to its rightful owner (see the **Thief** mechanic below).
- Trade fairly and repeatedly with the same NPC over time.

Killing a player with negative honor pays at most what the victim's honor is below 0, and only once per victim per real-time day. A Master cannot farm honor from a second character of their own.

A player who steals an item is also marked with the **Thief** debuff, which grants any player who kills them **5 extra honor**. The killing player also receives an honor reward for each item returned to the original owner within 6 real-time hours (18 [Bestia](/docs/mechanics/world/environment/#in-game-time) hours).

# Protected Zones

Every home village where new players arrive has a **ward stone**. The stone carries a powerful spell, and its field reaches about **3.5 km** in every direction. That field is the Protected Zone.

Everything a player owns inside the field is warded: the master, their bestias and their crafting stations. The townsfolk of the village are warded the same way. Everybody can see the ward as a buff on the warded entity. It lasts a few seconds, and the stone renews it as long as its owner stays in the field. While a ward holds:

- No harm passes between players, or from players to townsfolk. A warded player cannot be hurt, debuffed or have their stations broken by another player, and cannot do any of that to another player either. This holds in both directions, so nobody can attack into the field from just outside it, or out of it from inside.
- Monsters are not affected. A creature still attacks a warded player, and a warded player still fights back.
- An attack or harmful skill aimed at a warded target does not start. Clicking a warded bestia only selects it, and if an attack is sent anyway, the attacker is told that a ward stone protects the target.

The ward on a player cannot be dispelled. The only way to end the protection is to deal with the stone itself, which takes a very strong player. The stone's own spell shields it, so nothing can harm the stone while its magic holds. Only once that magic is countered can the stone be attacked. A destroyed stone is gone for the rest of the world incarnation, and so is its Protected Zone.

{{< alert context="warning" text="How a ward stone's magic is countered is not designed yet." />}}

Honor still applies inside the field. Killing an NPC there is only possible once the ward stone's magic is countered. It then costs a flat 10 honor (no level-based reduction), even if no observer is in sight. All honor loss inside a Protected Zone is doubled, so such a kill costs **20 honor** in total. Honor-increasing actions are multiplied by 1.5.

# War Zone

The system continuously counts kills of enemy [faction](/docs/mechanics/society/factions) players within an area. Once these kills exceed a threshold in a short period, a war zone is automatically declared around that area (note that killing players from another faction does not necessarily reduce honor, but it also does not increase it). This war zone usually has a radius of 1 km, and inside it the following effects occur:

- Damaging or destroying buildings has no honor penalty.
- Killing players or their bestias of opposing factions has no honor penalty, regardless of level difference.
- Killing NPCs has no penalty.

War Zones can never appear within a Protected Zone.

# Shrines of Judgement

There are 5 shrines in each game world incarnation where a player can make a sacrifice to restore a reputation that has fallen below the **persecution threshold** — the point at which a player's global honor is so low that NPCs, and other players, actively hunt them.

The sacrifice is costly and usually very painful, scaling with how far the reputation has fallen. Even once it has been made, the effect is not instant: it can take several days before news of the atonement spreads and the player's standing recovers across the world.

{{< alert context="warning" text="This section needs a rework. The exact persecution threshold, the cost of a sacrifice, and how much reputation it restores are not yet defined." />}}
