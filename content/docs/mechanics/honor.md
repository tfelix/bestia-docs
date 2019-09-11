---
title: Honor
---
# Honor

It is possible in Bestia to perform malicious actions which will reduce the players good experience. This is by design!
Yet there should be incentives for players not to go this route in order to protect low level players from ganking of
other griev play. If a player behaves well and their honor level increases they will get more and more rewards. On the
other hand if a player has negative honor they will get bad reputation and repressions. There might actually be some
player initiated hunt on these low honor players.

Additionally each NPC maintains an internal list of reputation points and players. If a player misbehaves or behaves in
a friendly way, this list will be adjusted. The NPC also communicates this list with other NPCs if they meet. If the reputation
exceeds certain upper and lower limits and the NPC enters areas that use a long-distance communication system, the NPC
may also communicate this to more distant areas. Only if the players reputation falls below -100 the NPC encountered
(and acted negative towards them) they remembers this permanently. Higher values slowly return to the default value
of 0 and are then removed from the list (NPCs don't forget if a player killed family members or the NPC life was saved).
If the customer reaches the nearest settlement via the reputation points after a certain time, the value is also stored
there permanently.

Reputation decreases faster through bad deeds than increasing because of good ones.

## Protected Zones

Around the starting places there will be a enchantment in place which will mark the lands in the vacinity as **Protected Zones**.
Inside this zone every kill of another player Bestia with more then 5 levels less as the killing bestia
or NPC will reduce the honor by **20 points**.

Every action which leads to honor loss inside a protected zone (other then killing a low level Player Bestia) will be **multiplied by 3**
wheras honor increasing actions will be **multiplied by 1.5**.


## Negative Honor

As there are multiple factions which different interests it is not easy to define which play is considered bad behavior
which will get punished automatically. Yet there are some core actions which will be universally be considered as griev play
which is not inherently forbidden but will result in a loss of honor.

If a player drops below 0 honor he will receive the debuff [Rogue](/). If a player has less then -100 honor he will receive
the debuff [Outlaw](/).

### Stealing

Stealing means if a player picks up an item from a storage chest not belonging to him. The owner can also grant certain player
access right to a chest. Then its not considered stealing. A guild leader can also mark storage chests as usable for guild members.

A player who steals an item is also marked with the debuff [Thief](/) which will grant any player who kills him **5 extra honor**. The killing
player also gets a honor reward for each item returned to the original owner of the items within 6 real time hours (18 hours in Bestia time).

### Malicious Actions

| Malicious Action                                | Honor Loss (Player) | Honor Loss to NPC in Sight |
| ----------------------------------------------- | :-----------------: | :------------------------: |
| Killing a NPC                                   |         -5          |            -15             |
| Killing Players Bestias                         |          0          |             -2             |
| Killing Players Bestias in a **Protected Zone** |         -20         |            -20             |
| Stealing Item (Mundane)                         |         -5          |            -10             |
| Stealing Item (Superior)                        |         -10         |            -20             |
| Stealing Item (Legendary)                       |         -15         |            -50             |

### Negative Honor Effects

If the honor drops below 0 the negative effects will start to take place. The effects are as follows:

| Honor Amount | Effect                                                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| < 0          | No more advantages from NPC and the NPC will act unfriendly against the player.                                                    |
| < -50        | Some NPC might start to act hostile and attack the player or flee from him.                                                        |
| < -100       | NPC will permanently remember the player and also spread the word around so more NPC will start to act hostile towards the player. |

If a player steals something not belonging to him but to a NPC or another player he will loose honor for each item he
takes and depending on the [item level](/mechanics/items/#item-level) (looting a dead NPC/player will not lead to a
reduction of honor).

## Positive Honor

A positive honor level will lead to very friendly NPC which might even give the player some discounts or gifts from
time to time. In order to increase your honor level again you can:

* Kill a player with negative honor
* Helping a NPC by healing or resurrecting a dead NPC

### Shrines of Judgement

There are a 5 shrines in each game world incarnation where a player can sacrifice to raise a reputation that has fallen below the threshold of a player's global
persecution. The sacrifice is usually (depending on the reputation threshold) very painful and even if it was made it can take
several days until the news about it was spread.
