---
weight: 1400
title: Companion App
description: "How a logged-off Master keeps up their correspondence, runs their trade and reads their Order's progress — through a bound ledger rather than a magical interface."
---

You close the client and the world carries on. Eggs hatch, crafts finish, auctions close, shops restock,
and your Order's Covenant runs its month down. None of it waits for you, and none of it is visible unless
you are sitting in front of the game.

The **companion app** is a thin link back into a world you are currently absent from. It is not a second
way to play **Bestia**. It is a way to stay in correspondence with the place while you are somewhere else.

{{< alert context="warning" text="This page is a design document. None of it is built — the public API it depends on is still only a promise on the [REST API](/docs/api/rest-api/) page." />}}

{{< alert context="info" text="**Conventions used on this page.** Unless stated otherwise, every duration is **real time**, and every amount is in whole **gold**, as on the [Economy & Trade](/docs/mechanics/economy-trade/) page." />}}

# The Bonded Ledger

A Bestia Master enters the world from [another dimension](/docs/mechanics/environment/), and returns to it
whenever they leave. That is where you are when you are logged off. The mana bond that lets a Master
commune with Bestia does not politely switch off at the same moment — it simply gets very thin.

Thin enough to carry writing, and not much else.

The link runs through a **Bonded Ledger**: a bound book an [Artificer](/docs/mechanics/master/#artificer)
makes, attuned to a single Master and worthless to anybody else. Whatever the ledger can reach, the app
shows you. It is an item like any other, so it can be dropped, stolen or worn down to nothing — and while
you own none, the app shows you nothing but your own old notes.

That matters more than flavour. It is what keeps the app inside the
[consistent fantasy simulation](/docs/mechanics/overview/#consistent-fantasy-simulation): there is no
floating menu outside the world, only a book somebody made, sitting somewhere, that can be taken off you.

# Five Rules That Keep It Honest

The app can act on the world, not merely watch it. That is a dangerous power to hand a phone, because the
game's principles rule out the obvious version of it — no [global price board](/docs/mechanics/settlements/#shops-and-stock),
no [global quest finder](/docs/mechanics/questing/#discovery), no magical interfaces.

Five rules make the difference. Every feature below obeys all five.

{{< table >}}

| Rule                                     | What it means                                                                                                                                              |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Instructions, not actions**            | You never do anything yourself. You write an instruction, it travels at courier pace, it is carried out on arrival, and the answer comes back the same way |
| **Reports, not omniscience**             | Every figure in the app carries a source and an age — _"grain at 11 gold in Ashfen, reported six hours ago"_                                               |
| **Instructions fail, they do not adapt** | An order carries limits. If the price moved, it buys nothing and says so. Acting on stale news costs you, exactly as it should                             |
| **Standing is earned in person**         | You may only write to brokers, postboxes and trade posts you have already stood in front of                                                                |
| **The letter never beats the body**      | Every instruction is slower than doing the thing yourself, costs a fee, and can fail outright                                                              |

{{< /table >}}

The last rule is the load-bearing one. A player who is logged in wins every race against a player with a
phone, at every task, always. The app is how you avoid losing ground while you are away — never how you get
ahead of the people who are actually there.

Two useful things fall out of the first two rules:

**Information becomes a trade good.** The app only knows what a courier told it. A player who travels knows
more, and can sell what they know. That is a profession the app creates rather than one it deletes.

**Nothing teleports.** Your trade post's [owner fees](/docs/mechanics/economy-trade/#building-an-auction-house)
still have to be collected in person, so the app dispatches a carrier to fetch them — and a carrier can be
robbed. The rule survives intact, and somebody gets paid for the errand.

# What Arrives

The ledger's plain reading surface. Everything on it has an age.

{{< table >}}

| What you see                              | Why it matters while you are away                                          |
| ----------------------------------------- | -------------------------------------------------------------------------- |
| Post waiting, and parcels still in flight | Delivery takes `0.1 + distance_km / 30` hours, so you can watch one coming |
| Auction listings and when they expire     | A 1, 2 or 5 day listing that finds no buyer is posted back to you          |
| Owner fees piling up in your trade post   | An unattended marketplace does not bank its own profits                    |
| The craft queue                           | `1.2 * itemLevel²` seconds — over three hours for a Legendary piece        |
| Breeder and egg timers                    | `25 * (lv1 * lv2)^1.3` seconds to breed, then up to two days to hatch      |
| Mana Harvester progress                   | Crystals grow out of ambient mana whether anybody is watching or not       |

{{< /table >}}

Each of those sends a notification when it finishes. It is worth saying plainly that the app's most valuable
feature is probably telling you an egg you started before breakfast is ready.

# Standing Orders

Your Master is doing nothing while you are away. Your Bestia need not be.

The [postal system](/docs/mechanics/economy-trade/#postal-system) already lets players train and assign
Bestia to run delivery routes instead of leaving it to NPC couriers, and a Bestia already earns
[experience for ordinary work](/docs/mechanics/bestia/#environment-interaction) — `3` per km travelled,
`2 * resource_level + 5` per unit gathered, at roughly half the rate of fighting. Standing Orders are how
you set that going from the app:

- **Run a route.** Assign an idle Bestia to a postal run, and it earns the courier's cut that would
  otherwise be lost to an NPC.
- **Work a deposit.** Send a Bestia to gather from a resource node you have already charted.
- **Breed.** Pair two Bestia in a [breeder](/docs/mechanics/bestia/#breeding), prime it with up to three
  scrolls, and collect the egg when it hatches.

This is deliberately the slow, safe half of the game. None of it makes you stronger in a fight. It makes you
better supplied, which is what the [crafting economy](/docs/mechanics/overview/#advanced-crafting-system)
actually runs on.

It is not free of risk either. A Bestia on the road can be killed, and whatever it was carrying is lost with
it. [Insurance](/docs/mechanics/economy-trade/#insurance) already exists as the answer, and a standing order
is exactly the situation it was written for.

# The Broker's Wire

The most useful thing an absent player can do for the people who are present is **put paid work on the
boards**.

Every commission is [funded into escrow before anybody sees it](/docs/mechanics/questing/#funding-and-escrow),
so a commission posted from a phone is real, paid work waiting for whoever is online to pick it up. Your
gathering backlog gets done while you are at your desk job, and somebody who is logged in gets a job that
was worth doing.

- **Post** Gather, Transport, Bounty and Escort commissions, funded from gold you already deposited with a
  broker in person.
- **Read** the boards of towns you have visited, and hear from brokers you hold local honor with. The news
  travels at courier pace, so it is always a little out of date. There is still no global quest finder, and
  a phone does not quietly become one.
- **Sign** a contract from wherever you are.

That last one deserves a warning rather than a footnote. Signing still enforces the
[level floor](/docs/mechanics/questing/#difficulty-and-level-range), and it still posts
[collateral](/docs/mechanics/questing/#collateral) the moment you put your name to it. Sign something you
cannot get to, and the deadline runs out while you sleep: you lose the stake, you lose honor, and the
brokers talk. The app hands you rope. What you do with it is your business.

# Trading by Letter

Prices in **Bestia** are [local by design](/docs/mechanics/settlements/#shops-and-stock). You see what things
cost where you are standing and nowhere else, because knowing that grain is cheap in the west is knowledge
you earn by travelling — and that is the whole basis of playing a merchant. A phone that showed every price
at once would delete the profession in an afternoon.

So the app does not show you prices. It shows you **reports**, and it lets you act on them the way a merchant
abroad always has: through an agent, by letter.

- **Limit orders.** _Buy forty sacks of grain at Ashfen, no more than 12 gold the sack._ The letter travels,
  the order is filled at whatever the price turns out to be, and anything above your limit is simply not
  bought. You find out afterwards.
- **Relisting.** Items an auction house [posted back to you](/docs/mechanics/economy-trade/#how-auctions-work)
  are already sitting in a postbox beside it. Putting them up again costs a fresh listing fee and no travel.
- **Collection.** Send a carrier to empty your trade post's till and post the coin on to you, for the usual
  [freight fee](/docs/mechanics/economy-trade/#postal-fees-and-delivery-time).

Trading on news six hours old is a real disadvantage, and it is meant to be. A merchant standing in the
market beats you every time. What you get in exchange is that your capital is not idle for the fourteen
hours a day you are not playing.

# The Covenant Watch

An Order's [Seasonal Covenant](/docs/mechanics/factions/#seasonal-covenants) runs for one real month, and is
already described as a public quota "shown to everyone as a progress bar". The world's own fate is already
described as "one gauge, publicly readable, showing where the world currently stands against its predicted
hour". Both were specified on the [Factions](/docs/mechanics/factions/) page long before anybody thought
about phones. The watch is where they live.

- Your Order's Covenant bar for the season now running, and what it managed last season.
- The world gauge `T` — how far this world has run against its predetermined life span. It is the single
  number all three Orders are ultimately scored on.
- The current [Doomsday](/docs/mechanics/doomsday/) stage, from Omens through to Cataclysm. A doomsday takes
  six months to a year to unfold, which is a pace a phone suits far better than a play session does.
- Regional influence — but only for regions where your Order keeps a temple, or where you have charted the
  ground yourself.

Reading the world gauge accurately is [a Circle speciality](/docs/mechanics/factions/#the-order-of-the-circle),
so the instrument that does it is Circle-made. The other two Orders can buy one, and the Circle decides what
it costs them.

## Musters

[World events](/docs/mechanics/questing/#world-events) are rare, emergent and over quickly. They need bodies
at short notice, and most of an Order is at work.

A **muster** is a call an Order puts out to its members' ledgers: _a rift has opened at Ashfen, and we are
going._ It carries the place, the reason, and how long the caller thinks they can hold. Logging in and
travelling there is still entirely on you, and most of the time you will not make it. Sometimes you will,
and that is the point.

This is the feature that most directly answers _keep players connected_. Everything else in the app tells
you what already happened. A muster tells you something is happening now, and asks.

# The Charthouse

[World Exploration](/docs/mechanics/world-exploration/) promises this outright: the world "is meant to be
mapped collectively by the playerbase, and anyone can check that collective progress by viewing the shared
world map online."

The charthouse is that promise, in your pocket:

- Your own charted ground, drawn over the collective map of everything the server's players have explored
  between them.
- Somewhere to plan a route, mark what you want to look at next, and queue a survey target for when you log
  in.
- Chart fragments traded with other players. Maps are items, [Cartography](/docs/mechanics/master/#skill-cartography)
  merges them and the post moves them — so the trade happens in the world, and the app only arranges it.

# The Craftsman's Notebook

[Discovery](/docs/mechanics/items/#discovery-learning-a-blueprint) is the best puzzle in the game and the
worst thing to keep in your head. Your materials place a point in a seven-axis feature space, your skill
decides how near you have to land, and every attempt answers with one of three things: you learned it, a
pattern _slipped_ away from you, or nothing happened at all.

That is a puzzle worth a notebook, and a notebook is what the app gives you: every attempt you have made,
what each one answered, and what that leaves of the region you are hunting.

{{< alert context="warning" text="The notebook must **record and reason, never search**. An app that solves the feature space for you deletes the discovery minigame, and that minigame is much of what makes crafting in **Bestia** worth doing. Drawing the conclusion is the player's job; the notebook only keeps the notes straight." />}}

# What the App Cannot Do

A short list, and a firm one.

- **No fighting.** No combat of any kind, at any range.
- **No moving.** Your Master is exactly where you logged out, and will be there when you get back.
- **No travelling.** Nothing in the app shortens a journey. Couriers travel; you do not.
- **No hands.** No crafting at a bench, no rituals, no catching, no charting, no building.
- **No searching the world.** No global price board, no global quest finder, no lookup of any kind that a
  person standing in the world could not perform themselves.

The rule underneath all of them: **the app never grants a power that exists only because you own a phone.**

# Limits

Honest about where this stands:

- **None of it exists yet.** The public API is a promise on the [REST API](/docs/api/rest-api/) page and
  nothing more. Most of what the app would read — quests, NPCs, shops, currency, the whole economy — is
  designed but not implemented, and the servers currently drop their database on every restart.
- **Notifications need a budget.** A game with this many timers can generate an unpleasant number of
  interruptions. What is worth waking somebody up for is a design question of its own, and it is not
  answered here.
- **The ledger's reach is unspecified.** How far the bond stretches, whether a finer ledger reaches further,
  and what a Master with no ledger at all can still see are all open.
