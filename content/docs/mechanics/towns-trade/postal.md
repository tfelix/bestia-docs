---
weight: 720
title: Postal System
description: "How letters, gold and parcels travel between players: pigeons for words and coin, coaches and player couriers for goods, and the seal that makes delivery a promise."
---

The postal system is inspired by the mail in [World of Warcraft](https://en.wikipedia.org/wiki/World_of_Warcraft):
you write a player's name, and what you send finds them. It is used all the time. Auction houses send back unsold
goods with it, commissions pay their rewards with it, and players send each other gear with it.

The difference is that **Bestia's** post lives in the world. A parcel is carried on a real road, by an NPC coach or by
a player who takes the job. Carrying the mail is paid work for masters and their Bestia.

{{< alert context="info" text="**Conventions used on this page.** Every amount is in whole **gold**, and every duration is **real time**, as on the [Economy & Trade](/docs/mechanics/towns-trade/economy-trade/) page. All numbers are first drafts for balancing." />}}

# The Promise

**A parcel always arrives. Only the time can vary.**

When you send a parcel, the post office tells you its **latest arrival time**, for example _arrives by 18:40 at the
latest_. That time is a promise. A player courier can make the parcel faster, but never later, and in nearly every case
never lost. The post keeps the promise with a spell: the [seal](#the-seal).

A post nobody trusts is a post nobody uses. So the risk of the road lies with the courier, not with the sender.

# Pigeons

Words and coin weigh nothing, so a **pigeon** carries them. A pigeon is instant and finds the player wherever they are.
It follows the mana bond, like chat, so it only finds masters.

## Letters

- **Write to a player's name.** You never need to know where they are.
- **Write and read anywhere.** A letter does not need a post office.
- **A letter waits.** It reaches a player who is offline and stays in their mailbox for **30 days**. That is the
  difference to [chat](/docs/mechanics/companion-app/#keeping-in-touch): chat reaches only who is online right now and
  is gone afterwards.
- **A letter costs `1` gold**, so nobody fills a mailbox with spam.
- Writing letters needs [Basic Skill](/docs/mechanics/master/novice-tree/#skill-basic-skill) Lv. 2, the same as whispers.

The game's own notices come by pigeon too: a sold auction, a commission reward, a parcel that has arrived, a parcel
that was robbed.

## Gold by Pigeon

A pigeon cannot carry a bag of coin, so it carries a **post note**. You hand the coin in at a post office, the pigeon
takes the note, and the recipient cashes it at any post office. The post office keeps the coin in between.

```text
note_fee = send_amount * 0.015
```

Like every fee, the note fee is rounded up to the next whole gold.

## Dispatches

A broker, an auction house or a trade post has no mana bond, so a pigeon cannot find it. An order to a place goes as
a **dispatch**, by road:

- A dispatch travels like a parcel that weighs nothing. It leaves from your home post office, rides the next coach or
  a courier's sack, and has a latest arrival time.
- It never arrives at once, even in its own town. It always waits for the next coach.
- It costs `1` gold. The answer comes back the same way.

Words to a person are instant. Orders to the world are not. Most dispatches come from the
[companion app](/docs/mechanics/companion-app/#trading-by-dispatch), and this keeps its rule that a player who is
there always beats a player with a phone.

# Parcels

Items have weight, so they travel by road.

## Sending

At a post office you name the recipient, put in the items and pay the [freight fee](#fees). The office then shows the
latest arrival time.

- A parcel weighs at most **10 kg**. Bulk freight is work for
  [Transport commissions](/docs/mechanics/world/questing/) and for players
  [hauling goods for profit](/docs/mechanics/towns-trade/settlements/#hauling-goods-for-profit), not for the post.
- A parcel to a player whose home office is the office you stand at arrives at once.
- **Coach only.** Tick it, and the parcel never rides with a player courier. It cannot be
  [robbed](#breaking-a-seal), but it never arrives before the coach. Use it for something you cannot afford to lose.
- **Cash on delivery.** Set a price, and the recipient pays it when they collect. The payment comes back to you by
  pigeon, minus the note fee. If the recipient refuses, the parcel comes back to you at no extra cost.

## Your Home Post Office

Every master has a **home post office**. Every parcel addressed to you goes there. At the start it is the post office
of your start town. You change it at any post office you stand in front of, for free.

You collect at your home office, or at **any post office within 10 km of it**. Your mailbox at any post office shows
every parcel you have: where it is now, and when it will arrive.

**When you have moved on**, a parcel may wait in a town you have left. Press **Forward here**, and it is sent on to
the office you stand at, like any other parcel: with a fee and a latest arrival time. A parcel already on the road
when you change your home office still goes to the old one.

## Auction Mail

What an auction house owes you, the coin of a sale or goods that did not sell, needs no coach. It is in your mailbox
at once, and you collect it at **any** post office.

## Fees

```text
freight_fee = 10 * road_km * weight_kg
```

`road_km` is the length of the way along the roads, not the straight line. Where the way leaves the road, every km
counts double. Like every fee, it is rounded up to the next whole gold, and it is at least `1`.

The post holds the fee until the parcel arrives. Then **60%** goes to the player courier who carried it, and **40%**
returns to the world reserve. When the coach carries it, the whole fee returns to the world reserve. No gold is made
and none is lost, see [Currency](/docs/mechanics/towns-trade/economy-trade/#currency).

## Uncollected Parcels

A parcel waits **30 days** at the recipient's home office. Then it goes back to the sender's home office, for free. If
the sender does not collect it either within another 30 days, the post sells it in the start towns'
[auction house](/docs/mechanics/towns-trade/economy-trade/#the-start-towns-auction-houses), and the money returns to the world
reserve.

# The Sack and the Coach

A parcel does not leave at once. At the post office it goes into the **sack** for its destination office. The sack
waits for the next **coach**. Until then it hangs on the post office's **route board**, where a player can take it
instead.

- **The coach leaves on a timetable**, every **2 to 6 hours**, by the office's [level](#office-levels). The post
  office shows when the next one leaves.
- **The coach is slow on purpose.** It takes **twice as long** as a master walking the same road. That leaves room for
  a player courier to take the job, rest, fight on the way, and still arrive first.
- **The coach is under the post's protection.** It is a real wagon on the road, but nobody can attack it. This is
  what makes the promise hold for every parcel nobody else carries.

```text
coach_hours   = 2 * road_km / 14.4          (a master walks about 4 m/s, or 14.4 km/h)
latest_arrival = time of the next coach + coach_hours
```

For an office with a coach every 3 hours:

| Road   | A master walking | The coach   | Latest arrival, if the coach just left |
| ------ | ---------------- | ----------- | -------------------------------------- |
| 5 km   | 21 min           | 42 min      | 3 h 42 min                             |
| 20 km  | 1 h 23 min       | 2 h 47 min  | 5 h 47 min                             |
| 60 km  | 4 h 10 min       | 8 h 20 min  | 11 h 20 min                            |
| 150 km | 10 h 25 min      | 20 h 50 min | 23 h 50 min                            |

A broken road or a flooded bridge makes the way longer. The office already counts that in the latest arrival time
when you send. If the road breaks after you sent, the [seal](#the-seal) still keeps the promise.

# Carrying the Mail

## Taking a Sack

Any master can take parcels from a route board, and so can a Bestia that its master sends. You need no deposit.

- **You see the destination, the weight and the pay.** You do not see what is inside. Every parcel is sealed.
- **You take as many parcels as you can carry.** The rest stays for the next courier or the coach.
- **The road must not be far above you.** A route has a
  [difficulty](/docs/mechanics/world/questing/#difficulty-and-level-range) like a Transport commission, and a master below
  its lower bound cannot take it.
- **A sack cannot be dropped, traded or stored.** It goes to its destination or back to the post.

A Bestia can run the mail on its own, as a [standing order](/docs/mechanics/companion-app/#standing-orders). Its
master is paid, and its master answers for it.

## The Deadline

Your deadline is the latest arrival time of the parcels you carry. Deliver them before it, and you are paid your 60%
of their fees at once. A Bestia also earns its usual
[experience for travelling](/docs/mechanics/bestias/bestia/#environment-interaction).

**If you miss the deadline**, the seal sends the parcels on, and they arrive on time anyway. You are paid nothing, and
you are **struck off**: you cannot take post work for **1 day**. Logging out does not stop the deadline. For a Bestia,
its master is struck off.

**If you are killed on the road**, the sack falls to the ground. Somebody may [pick it up](#a-fallen-sack), or its
seal sends it on. You are paid nothing for it, but you are not struck off. Being killed on the road happens.

## The Seal

Every parcel carries a **Postal Seal**, an [enchantment](/docs/mechanics/items-crafting/items/#enchantments) the post office binds to
it. The seal is the guarantee:

- **Nobody can open a sealed parcel**, the courier included.
- **At the latest arrival time**, the seal sends every parcel that has not arrived to its destination, wherever it is:
  in a sack at the office, on the coach, or in a courier's bag.
- **When a sack falls to the ground**, the seal starts to work. After **30 seconds** the sack is gone, back with the
  post, and it arrives at its latest arrival time. Never earlier, so dying on purpose is no shortcut.

## A Fallen Sack

In those 30 seconds, anybody may pick the sack up. **Picking it up takes over the delivery.** The sack stays sealed,
and whoever holds it is now its courier, with the same deadline and the full pay.

- A party member can save a fallen friend's run this way, and so can a stranger who passes by.
- So can the one who killed the courier. Delivering the sack is honest work from then on. The kill already cost its
  [honor](/docs/mechanics/society/pvp/#negative-honor).
- Taking over is not stealing, because nothing in the sack is opened.
- The rules of the route board apply: you must be able to carry it, the road must not be far above you, and you must
  not be struck off. Somebody who could not take the sack at the board cannot pick it up either.

## Breaking a Seal

The other way to use those 30 seconds is to rob the sack. A sealed sack on the ground can be hit with
[Dispel](/docs/mechanics/master/scholar-tree/#skill-dispel). The seal has a Potency of `350`, and Dispel's chance falls
with the Potency of its target, see [Spell Potency](/docs/mechanics/combat/spell-potency/#dispel):

```text
chance = Dispel base chance × min(1, P dispel / 350)
```

Only a strong Sage has a real chance. A Master Sage with Dispel Lv. 5 (`P 80`) has `23%` per try, a dabbler `7%`.
Dispel's cooldown is 15 seconds, so one Sage gets two tries, about `40%` together. A gang with several Sages gets more.
A gang that charges a [ritual](/docs/mechanics/combat/spell-potency/#rituals) first reaches `43%` on its first try.

When a seal breaks, the sack opens and its parcels spill onto the ground. Taking them counts as
[stealing](/docs/mechanics/society/pvp/#negative-honor) for every item, with the honor loss of its item level. The senders get a
pigeon: their parcel was robbed, and where. The post pays back their freight fee in full, because no courier was paid
for it. The goods are lost.

This is the one way a parcel is lost, and it takes a dead courier, a strong Sage, luck and a crime. A courier who
carries valuable sacks on a dangerous road has a reason to hire an escort. A sender who cannot accept the risk ticks
**coach only**.

# Post Offices

## In Generated Settlements

Every generated village and town has a post office at its market square. A hamlet has none. The office is run by a
**postmaster**, one of the [townsfolk](/docs/mechanics/towns-trade/settlements/#the-trades), who takes in and hands out parcels
during their working hours. Letters need no office.

## In Player Cities

A [founded settlement](/docs/mechanics/master/survival-tree/#skill-founder) gets a post office only when its players build one.

- **It is a construction** like any other building, from a **post office kit** (a
  [Carpentry](/docs/mechanics/master/craftsman-tree/#skill-carpentry) Lv. 3 recipe). Anybody can put it up inside the
  settlement's sphere. A settlement holds at most one.
- **The post runs it.** When it is finished, the post takes it over and sends a postmaster. It has no owner and no
  owner fee. The seal and the promise must not depend on a player who logs off, and no player should set the price of
  a public service.
- **An [auction house](/docs/mechanics/towns-trade/economy-trade/#building-an-auction-house) needs it.** Unsold goods and coin
  travel by post, so a settlement needs a post office before it can hold an auction house.

- **It only works inside a settlement.** When the city sign falls, the office is [lost](#losing-an-office) at once,
  even though the building still stands. It decays and breaks after 96 h, unless a new settlement
  [reclaims](/docs/mechanics/towns-trade/player-settlements/#when-the-sign-falls) it first.

The city gains in other ways. Its residents can make it their home post office, couriers come for its route board,
and it can hold a market.

The coach drives to every post office, also off the road. There every km
[counts double](#fees), for the coach time and for the fee. A city founded on a road gets cheaper and faster post.

## Office Levels

| Level | Coach every | Who has it                                    |
| ----- | ----------- | --------------------------------------------- |
| 1     | 6 h         | A new post office in a player city            |
| 2     | 3 h         | Generated villages and towns                  |
| 3     | 2 h         | Start towns, and a player city that builds up |

An upgrade costs materials, like the building itself. A higher level shortens the latest arrival time of every parcel
sent from that office.

It does not make a courier's work harder. The coach is still twice as slow as a walking master, so a courier always
has one full walking time to spare. Only the wait for the next coach gets shorter, so a sack hangs on the route board
for less time.

## Losing an Office

A post office is a building and can be attacked like one. When it is destroyed or torn down, the promise still holds:

- Sacks waiting there are sent on by their seal, through the nearest other office, and keep their latest arrival time.
- Every master whose home office it was gets the nearest office instead, and a pigeon to say so. Parcels on the way to
  them go there too.

{{< alert context="warning" text="Not built yet. The coach timetable, the office levels, the coach speed, the double km off the road, the 10 kg limit, the 60/40 split, the seal strength and the day of being struck off are all placeholders. The seal needs [item enchantments](/docs/server/item-enchantments/) first." />}}
