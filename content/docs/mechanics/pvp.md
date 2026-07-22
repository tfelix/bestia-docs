---
weight: 1000
title: PvP & Honor
description: "How honor and reputation shape player conflict in Bestia: NPC memory, penalties for griefing, protected and war zones, and redemption at the Shrines of Judgement."
---

In Bestia, players can perform malicious actions that negatively impact others. This is by design, but there are incentives to discourage such behavior, especially to protect low-level players from griefing. Players who maintain good behavior and increase their honor level will receive rewards. Conversely, those with negative honor will gain a bad reputation and face repercussions, potentially becoming targets for player-initiated hunts.

# Reputation System

Each NPC maintains an internal reputation list for players. This list is adjusted based on player behavior, whether positive or negative. It is tracked on two levels:

- Global player honor
- Local NPC honor

Certain actions immediately have a global influence on player honor, while others only influence the local NPC honor rating towards the player. However, if an NPC has witnessed too many of a player's misdeeds and the negative honor for this NPC becomes too high, it will communicate this to friends and family. This means a random amount of 10-40% of the negative honor the NPC perceived is transformed into a global honor penalty.

If a player's reputation with an NPC falls below -100 due to negative actions, the NPC will remember this permanently. Higher reputation values gradually return to the default of 0 and are eventually removed from the list. Players start with a global **20 honor** and every NPC starts with a **local honor of 10** towards every new player.

# Negative Honor

Due to the presence of multiple factions with differing interests, defining universally bad behavior can be complex. However, certain core actions are universally considered griefing and will result in honor loss. The following actions lead to a loss of honor (usually an NPC or other player must be present in order for the honor loss to occur):

| Malicious Action                               | Global Honor Loss | Honor Loss to NPC in Sight |
| ---------------------------------------------- | :---------------: | :------------------------: |
| Killing NPC                                    |        -10        |            -60             |
| Killing player in non-opposing faction         |        -10        |            -50             |
| Killing player in opposing faction w/ -10 Lv.* |        -5         |            -10             |
| Killing a Player's Bestia                      |         0         |             -2             |
| Stealing Item (Mundane)                        |         0         |            -10             |
| Stealing Item (Superior)                       |        -5         |            -20             |
| Stealing Item (Rare)                           |        -10        |            -30             |
| Stealing Item (Legendary)                      |        -15        |            -40             |
| Damaging a Building >10% HP                    |        -2         |            -10             |

\* The victim is at least 10 levels below the attacker. Killing an opposing-faction player who is not this far below carries no honor penalty.

If no negative honor is received for a full [real-time](/docs/mechanics/environment/#in-game-time) day, the accumulated negative honor decays by 1 point per real-time day. Positive honor can be earned on top of that.

If a player steals something that belongs to an NPC or another player, they lose honor for each item taken, depending on the item level. Stealing means picking up an item from a storage space that does not belong to the player. The owner can also grant certain players access rights to a chest; in this case, removing items is not considered stealing.

**Note**

Looting a dead NPC or player, however, does not lead to a reduction of honor.

When effects are calculated, the global player honor and the local NPC honor value are added together. Once a player's honor drops below 0, negative effects begin to take place. These effects include:

| Honor Amount | Effect                                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| < 0          | No more advantages from NPCs and the NPC will act unfriendly                                                          |
| < -60        | Some NPCs might start to act hostile, attacking the player or fleeing. Trading is no longer possible.                 |
| < -100       | NPCs will permanently remember the player and spread the word, so more NPCs start to act hostile towards the player.¹ |

¹ NPCs only spread the word if their local honor value drops below -100; the global player honor part has no effect here.

Prices for trades with an NPC, when negative local honor is present, are calculated as follows:

```text
price_inc_percent = -5/3 * honor
```

This formula only applies while the combined honor is in the `(0, -60]` range. At exactly `-60` the price increase reaches `+100%`, and below `-60` trading with the NPC is no longer possible at all (see the effects table above).

# Positive Honor

A positive honor level leads to very friendly NPCs, which might even give the player discounts or gifts from time to time. To increase your honor level again, you can:

- Kill a player with negative honor, which is indicated by certain debuffs visible to other players.
- Help an NPC, for example by healing or resurrecting a dead NPC.
- Defend an NPC or a low-level player from an attacker.
- Complete an NPC's quest or commission.
- Return a stolen item to its rightful owner (see the **Thief** mechanic below).
- Trade fairly and repeatedly with the same NPC over time.

A player who steals an item is also marked with the **Thief** debuff, which grants any player who kills them **5 extra honor**. The killing player also receives an honor reward for each item returned to the original owner within 6 real-time hours (18 [Bestia](/docs/mechanics/environment/#in-game-time) hours).

# Protected Zones

Areas around the starting locations of new players are enchanted and designated as Protected Zones. Within these zones:

- Killing a player or NPC directly reduces honor by a flat 10 points (no level-based reduction is applied), even if no observer is in sight. Because all honor loss inside a Protected Zone is doubled (see below), such a kill costs **20 honor** in total.
- Actions leading to honor loss are multiplied by 2, while honor-increasing actions are multiplied by 1.5.

# War Zone

The system continuously counts kills of enemy [faction](/docs/mechanics/factions) players within an area. Once these kills exceed a threshold in a short period, a war zone is automatically declared around that area (note that killing players from another faction does not necessarily reduce honor, but it also does not increase it). This war zone usually has a radius of 1 km, and inside it the following effects occur:

- Damaging or destroying buildings has no honor penalty.
- Killing players or their bestias of opposing factions has no honor penalty, regardless of level difference.
- Killing NPCs has no penalty.

War Zones can never appear within a Protected Zone.

# Shrines of Judgement

There are 5 shrines in each game world incarnation where a player can make a sacrifice to restore a reputation that has fallen below the **persecution threshold** — the point at which a player's global honor is so low that NPCs, and other players, actively hunt them.

The sacrifice is costly and usually very painful, scaling with how far the reputation has fallen. Even once it has been made, the effect is not instant: it can take several days before news of the atonement spreads and the player's standing recovers across the world.

{{< alert context="warning" text="This section needs a rework. The exact persecution threshold, the cost of a sacrifice, and how much reputation it restores are not yet defined." />}}
