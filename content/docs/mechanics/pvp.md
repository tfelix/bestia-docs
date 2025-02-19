---
weight: 10
title: PvP & Honor
---

# PvP and Honor

In Bestia, players can perform malicious actions that negatively impact others. This is by design, but there are incentives to discourage such behavior, especially to protect low-level players from griefing. Players who maintain good behavior and increase their honor level will receive rewards. Conversely, those with negative honor will gain a bad reputation and face repercussions, potentially becoming targets for player-initiated hunts.

## Reputation System

Each NPC maintains an internal reputation list for players. This list is adjusted based on player behavior, whether positive or negative. It is based on two stages:

- Global Player honor
- Local NPC honor

Certain actions immediatly have a global influence on player honor while others are only influencing local NPC honor rating towards the player. However if the NPC has seen too much of this player misdeeds and the negative honor for this NPC is too high he will communicate it to friends and family. This means a random amount of 10-40% of the negative honor the NPC perceived will be transformed into global honor penalty.

If a player's reputation with an NPC falls below -100 due to negative actions, the NPC will remember this permanently. Higher reputation values gradually return to the default of 0 and are eventually removed from the list. Player start with a global **20 honor** and every NPC will have a **local honor of 10** for every new player.

## Negative Honor

Due to the presence of multiple factions with differing interests, defining universally bad behavior can be complex. However, certain core actions are universally considered griefing and will result in honor loss. The following actions lead to a loss of honor (usually an NPC or other player must be present in order for the honor loss to occure):

| Malicious Action                              | Global Honor Loss | Honor Loss to NPC in Sight |
| --------------------------------------------- | :---------------: | :------------------------: |
| Killing NPC                                   |        -10        |            -60             |
| Killing player in non opposing faction        |        -10        |            -50             |
| Killing player in opposing faction w/ -10 Lv. |        -5         |            -10             |
| Killing Players Bestias                       |         0         |             -2             |
| Stealing Item (Mundane)                       |         0         |            -10             |
| Stealing Item (Superior)                      |        -5         |            -20             |
| Stealing Item (Rare)                          |        -10        |            -30             |
| Stealing Item (Legendary)                     |        -15        |            -40             |
| Damaging a Building >10% HP                   |        -2         |            -10             |

If no negative honor is received for one day (normal time), negative honor decays with 1 negative honor per normal (not bestia time) day. Positive honor can earned on top of it.

If a player steals something not belonging to him but to a NPC or another player he will loose honor for each item he takes and depending on the item level. Stealing means if a player picks up an item from a storage space not belonging to him. The owner can also grant certain player access right to a chest, in this case removal of items is not considered a stealing act.

{{% hint info %}}
**Note**

Looting a dead NPC/player however, will not lead to a reduction of honor.
{{% /hint %}}

When effects are calculated the global player honor and the local NPC honor value are added. Once a player's honor drops below 0, negative effects begin to take place. These effects include:

| Honor Amount | Effect                                                                                                                              |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| < 0          | No more advantages from NPC and the NPC will act unfriendly                                                                         |
| < -60        | Some NPC might start to act hostile and attack the player or flee. Trading is not possible anymore.                                 |
| < -100       | NPC will permanently remember the player and also spread the word around so more NPC will start to act hostile towards the player.¹ |

¹ NPC only spread the word if their local honor value drops below -100. The global player honor part here has no effect.

Prices for trades with NPC when negative local honor is present is calculated as following:

```text
price_inc_percent = -5/3 * honor
```

## Positive Honor

A positive honor level will lead to very friendly NPC which might even give the player some discounts or gifts from time to time. In order to increase your honor level again you can:

- Kill a player with negative honor, which is indicated by certain debuffs visible to other players
- Helping a NPC by healing or resurrecting a dead NPC
A player who steals an item is also marked with the debuff ***Thief** which will grant any player who kills him **5 extra honor**. The killing player also gets a honor reward for each item returned to the original owner of the items within 6 real time hours (18 hours in Bestia time).

## Protected Zones

Areas around starting locations of new players are enchanted and designated as Protected Zones. Within these zones:

- Killing a player or NPC directly will reduce honor by 10 points (no level reduction is applied), even if no observer is in sight.
- Actions leading to honor loss are multiplied by 2, while honor-increasing actions are multiplied by 1.5.

## War Zone

If players of an enemy faction are killed in a short period of time and several times a war zone can be declared (note that killing players from other faction does not necessairly reduce honor, but it also does not increase it). This war zone usually has a radius of 1km and inside it the following effects occure:

- Damaging or destroying buildings has no honor penalty
- Killing player/their bestias of opposing factions has no honor penalty anymore, regardless of level difference
- Killing NPC has no penalty anymore

War Zones can never spawn in a protected area.

## Shrines of Judgement

There are a 5 shrines in each game world incarnation where a player can sacrifice to raise a reputation that has fallen below the threshold of a player's global persecution. The sacrifice is usually (depending on the reputation threshold) very painful and even if it was made it can take several days until the news about it was spread.
