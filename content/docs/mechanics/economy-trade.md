---
weight: 700
title: Economy & Trade
---

In **Bestia**, the economy is entirely player-driven, shaping the world through resource gathering, trade, and logistics. Players not only generate wealth but also manage its distribution through postal services and auction houses. This document outlines the key mechanics behind the in-game **currency**, **postal system**, and **auction houses**, detailing how they interact to create a dynamic economic landscape.

# Currency

All in-game currency originates from gold deposits discovered and mined by players. That’s right—players must **harvest gold themselves** to [mint their own money](/docs/mechanics/master/#skill-minting). Mined gold is converted into **gold coins**, the single currency used for all trading and transactions. There are no smaller denominations: everything in the game is priced in **gold**.

To kickstart the economy, **NPCs hold 10% of the world's total wealth in gold** when a new world is created. Every night, this wealth is **redistributed equally** among all NPCs. Unlike other mechanics in the game, this redistribution does not follow real-world economic logic but serves to ensure a fluid economy.

**Note**
Unless specified otherwise, all currency amounts and fees in this design document are expressed in **gold**.

# Postal System

Inspired by [World of Warcraft](https://en.wikipedia.org/wiki/World_of_Warcraft), **Bestia** features a structured **postal system** that allows players to send letters, items, and currency to other players and locations. It also plays a crucial role in the [player quest system](/docs/mechanics/questing), as many quest rewards are delivered through mail.

A player requires a postbox in order to send a package, but once a package has been delivered a player can access their delivered goods and messages from every other postbox. This ensures the system is not too frustrating and reduces the need to travel. The postal system is meant to be used often and to help players gather their equipment and gold.

Unlike standard game mail systems, this one is **fully integrated into the game world**. NPC couriers manage postal deliveries, but players can also train and assign their **Bestias** to carry out deliveries. Delivering mail can even be a quest in itself. However, if no player handles a delivery within a given time frame, an NPC courier will complete it, but in this case, the player loses their potential reward which is based on the delivery fees of the goods.

## Sending and Receiving

In order to send a package you must interact with a post box, type the message and pay the listed fee. When you send a package you must pick a target post box (you must own a map to do so, otherwise you only get post boxes in a 10km radius listed). Maps are drawn using the [Cartography](/docs/mechanics/master/#skill-cartography) master skill and, as items, grant access to the game map.

After the package has been delivered you can pick it up at the target post box and at every post box in a 10km radius around it. This makes sure players are not required to constantly wait in front of a specific post box.

## Postal Fees and Delivery Time

The cost and time required for deliveries of goods follow these formulas:

```text
freight_fee = 10 * distance_km * freight_weight_kg

// always 1.5% of the send currency amount
currency_fee = send_amount * 0.015

delivery_time_hours =  0.1 + distance_km / 30
```

Time is measured in real-world hours, not [game-time](/docs/mechanics/environment#in-game-time). Gold-only and text-based messages can be sent instantly without the wait delay.

## Insurance

Players can **insure their deliveries** by paying an additional fee. If an insured item is lost because the courier is killed before completing the delivery, a **teleportation spell** will activate, sending the item automatically to its destination. However, this process takes an additional random amount of time between **0.5 to 1 real-time days** before the item becomes available in the player's postbox (to avoid gaming the system to get quicker delivery times).

# Auction House

Trading is a vital mechanic in **Bestia**, as the entire economy is **player-driven**. Players can **build and manage auction houses**, allowing them to trade goods even while offline.

## Building an Auction House

An auction house is quite the expensive building. So usually the required resources are gathered by multiple players or a guild. The following special rules apply:

- Once an auction house is built, **no other auction house can be placed within a 5km radius**.
- The owner sets an **owner fee** between **1% and 10%** for new item listings. The maximum an owner may set depends on their Trader skill level. This fee is charged on top of the listing fees described below and is kept by the owner: it accumulates in the auction house and must be regularly collected.
- **50% of the collected owner fee is redistributed to NPCs** as some sort of tax equivalent.

## How Auctions Work

Players can list items in the auction house for:

- A **fixed price** (direct sale, 10% listing fee)
- An **auction**, where they select a duration of:
  - **1 day** (8% listing fee)
  - **2 days** (10% listing fee)
  - **3 days** (20% listing fee)
  - **5 days** (30% listing fee)

These **listing fees** are separate from the owner fee. Unlike the owner fee, listing fees are removed from the economy by the server (burned), which helps counteract inflation. The owner fee and the listing fee stack on top of each other. For example, if the owner has set their fee to 5% and a player lists an item for 5 days, a total of **35%** of the final sale price is taken (5% to the owner, 30% burned).

## Linking Auction Houses

Auction houses owned by different players can be **linked together** by a [master skill](/docs/mechanics/master/#skill-trade-agreement), if all players agree, allowing shared listings across multiple locations. This creates a broader marketplace and improves accessibility for buyers.

When a player wins an auction, they can choose to **pay a delivery fee** to have the item sent via **postal service** from the linked auction house. If they refuse to pay, the item remains on hold for **up to 10 days**.[^realtime-days] If the player still does not claim it, the item is returned to the original seller, who **keeps the payment from the unclaimed purchase**.

[^realtime-days]: All durations given in days refer to real-time days, not in-game [Bestia days](/docs/mechanics/environment#in-game-time).
