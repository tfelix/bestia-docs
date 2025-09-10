---
weight: 400
title: Economy & Trade
---

# Economy & Trade

In **Bestia**, the economy is entirely player-driven, shaping the world through resource gathering, trade, and logistics. Players not only generate wealth but also manage its distribution through postal services and auction houses. This document outlines the key mechanics behind the in-game **currency**, **postal system**, and **auction houses**, detailing how they interact to create a dynamic economic landscape.

## Currency

All in-game currency originates from gold deposits discovered and mined by players. That’s right—players must **harvest gold themselves** to [mint their own money](/docs/master/#minting). Gold can be directly converted into gold coins, which serve as the primary currency for trading and transactions.

Gold is automatically converted between smaller denominators silver and copper (those currencies can not be created but are derived from the gold ones). The relation between those are:

* 1 gold = 100 silver = 10,000 copper
* 1 silver = 100 copper

To kickstart the economy, **NPCs hold 10% of the world's total wealth in gold** when a new world is created. Every night, this wealth is **redistributed equally** among all NPCs. Unlike other mechanics in the game, this redistribution does not follow real-world economic logic but serves to ensure a fluid economy.

**Note**
When a currency or fee is calculated here in the design document the smallest denominator (copper) is usually used if not specified otherwise.

## Postal System

Inspired by [World of Warcraft](https://en.wikipedia.org/wiki/World_of_Warcraft), **Bestia** features a structured **postal system** that allows players to send letters, items, and currency to other players and locations. It also plays a crucial role in the [player quest system](/docs/questing), as many quest rewards are delivered through mail.

A player requires a postbox in order to send a package but if a package was delivered a player can access his delivered goods and messages from every other postbox. This should ensure its not too frustrating and reduces travels. The postal system should be used often and help player to gather their equipment and gold.

Unlike standard game mail systems, this one is **fully integrated into the game world**. NPC couriers manage postal deliveries, but players can also train and assign their **Bestias** to carry out deliveries. Delivering mail can even be a quest in itself. However, if no player handles a delivery within a given time frame, an NPC courier will complete it, but in this case, the player loses their potential reward which is based on the delivery fees of the goods.

### Sending and Receiving

In order to send a package you must interact with a post box, type the message and pay the mentioned fee. When you send a a package you must pick a post box (you must own a map to do so, otherwise you only get post boxes in a 10km radius listed).

After the package was delivered you can pick it up in the target and every post box in a 10km radius around the target one. This makes sure players are not required to constantly wait before a specific post box.

### Postal Fees and Delivery Time

The cost and time required for deliveries of goods follow these formulas:

```text
freight_fee = 10 * distance_km * freight_weight_kg

// always 1.5% of the send currency amount
currency_fee = send_amount * 0.015

delivery_time_hours =  0.1 + distance_km / 30
```

Time is measured in real-world hours, not [game-time](/docs/mechanics/environment#in-game-time). Gold-only and text-based messages can be sent instantly without the wait delay.

### Insurance

Players can **insure their deliveries** by paying an additional fee. If an insured item is lost because the courier is killed before completing the delivery, a **teleportation spell** will activate, sending the item automatically to its destination. However, this process takes an additional random amount of time between **0.5 to 1 real-time days** before the item becomes available in the players postbox (to avoid gaming the system to get quicker delivery times).

## Auction House

Trading is a vital mechanic in **Bestia**, as the entire economy is **player-driven**. Players can **build and manage auction houses**, allowing them to trade goods even while offline.

### Building an Auction House

An auction house is quite the expensive building. So usually the required resources are gathered by multiple players or a guild. The following special rules apply:

* Once an auction house is built, **no other auction house can be placed within a 5km radius**.
* The owner sets the **auction fee** between **1% and 10%** for new item listings (these fees are added on top the regular fees). Fees accumulate in the auction house and must be regularly collected by the owner of the auction house.
* **50% of the fees are are redistributed to NPCs** as some sort of tax equivalent.

### How Auctions Work

Players can list items in the auction house for:

* A **fixed price** (direct sale, 10% fee)
* An **auction**, where they select a duration of:
  * **1 day** (8% fee)
  * **2 days** (10% fee)
  * **3 days** (20% fee)
  * **5 days** (30% fee)

Time is measured in real-world hours, not [game-time](/docs/mechanics/environment#in-game-time).

### Linking Auction Houses

Auction houses owned by different players can be **linked together** by a [master skill](/docs/mechanics/master/#trade-agreement), if all players agree, allowing shared listings across multiple locations. This creates a broader marketplace and improves accessibility for buyers.

When a player wins an auction, they can choose to **pay a delivery fee** to have the item sent via **postal service** from the linked auction house. If they refuse to pay, the item remains on hold for **up to 10 days**. If the player still does not claim it, the item is returned to the original seller, who **keeps the payment from the unclaimed purchase**.
