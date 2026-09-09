---
weight: 650
title: Settlements & Townsfolk
description: "How Bestia's towns and villages are inhabited — occupations, daily schedules, shops with real stock, and an economy a player can genuinely damage and watch recover."
---

Every settlement in **Bestia** is generated with a full anatomy: streets, districts, walls, gates,
and a roster of trades that follows from its size and its surroundings. A port grows fishmongers and
a shipwright; a mining town grows three smiths and no baker; a crossroads village grows more inns
than its population implies. This page is about the people who fill it in — what they do all day,
where the goods in their shops actually come from, and what happens when a player sets fire to the
field those goods grow in.

{{< alert context="warning" text="This page is a design document. Settlements are generated today, but nothing lives in them yet — see the server-side [Townsfolk & Settlement Simulation](/docs/server/townsfolk/) page for the implementation plan and its current state." />}}

{{< alert context="info" text="**Conventions used on this page.** Times of day and durations refer to **in-game** [Bestia time](/docs/mechanics/environment/#in-game-time), where one day lasts eight real hours. Prices are in whole **gold**, as everywhere else." />}}

# A Day in a Village

Townsfolk are not scenery on a loop. Each one is a person with a home, a trade, a place of work and
a set of appetites, deciding for itself what is most worth doing right now.

A baker's ordinary day:

{{< table >}}

| Time          | What they do                                                                     |
| ------------- | -------------------------------------------------------------------------------- |
| 05:00         | Comes out of the house, walks to the bakery, opens up                            |
| 05:00 – 15:00 | Bakes, draws flour from the mill's stores, keeps the counter stocked             |
| ~12:00        | Gets hungry enough to stop, walks to whichever stall they always buy lunch from  |
| 15:00         | Knocks off                                                                       |
| 20:00 – 22:00 | If they are the sociable sort, spends the evening at the inn                     |
| 22:00         | Goes home and sleeps                                                             |

{{< /table >}}

The **hours** are part of the trade — a baker opens at five because that is what a baker does, and
because a player who learns it can rely on it. Everything else is a decision made fresh:

- **Whether** they go to work at all. Hungry, frightened or hurt beats the shift, with no special
  case written for it.
- **When** they eat. Hunger builds through the morning; at some point it simply outweighs work, and
  they down tools. There is no lunch bell.
- **Whether** they go to the inn. Some people do most nights, some almost never, and it is the same
  street with a different crowd in it each evening.
- **What they do when it goes wrong.** If the mill has no flour, the baker draws nothing, bakes
  nothing, and spends the shift standing about looking cross. Nobody wrote that; it is what is left
  when the plan fails.

Every trade has its own shape of day. Farmers leave at dawn and come back at dusk. Guards keep the
one genuine night watch. Children loiter near home; priests keep the temple; beggars work the market
and sleep on the temple steps.

# The Trades

A settlement's roster is not authored town by town. Each trade has a historical service ratio — one
general store per two hundred residents, one temple per eight hundred — plus a population floor and
a list of things the place must have. A tannery needs running water; a smith needs iron; a vintner
needs a climate that ripens fruit and enough wealth to want the wine.

These are the *people*; the generator thinks in establishments, so a temple in the roster becomes a
priest and a barracks becomes guards.

{{< table "table-sm" >}}

| Sector       | Trades                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------- |
| **Farming**  | Farmer, labourer                                                                            |
| **Craft**    | Baker, miller, butcher, brewer, vintner, blacksmith, armourer, carpenter, mason, potter, charcoal burner, tanner, dyer, weaver, tailor, jeweller, bookbinder, alchemist, shipwright |
| **Trade**    | General store, market trader, fishmonger, banker                                            |
| **Service**  | Innkeeper, stablehand, healer, apothecary                                                   |
| **Admin**    | Scribe                                                                                      |
| **Clergy**   | Priest                                                                                      |
| **Military** | Guard                                                                                       |

{{< /table >}}

A hamlet of forty gets an inn and little else — everyone else farms or labours. A village of four
hundred supports a baker, a smith, a weaver and a general store. Only a city carries a bookbinder,
and only a wealthy one carries a jeweller.

# Shops and Stock

**What a shop has on the shelf is real.** It was produced by somebody, out of materials somebody
else produced, and when it is gone it is gone until more is made.

That has a few consequences worth knowing before you plan a shopping trip:

- **Shops run out.** A village bakery bakes a day's bread, and a player who wants forty loaves is
  going to have to wait or walk to the next town.
- **Locals eat first.** A settlement holds back what its own people need. What is on offer to you is
  the surplus above that, which is why a town in trouble stops selling food before it starts
  starving.
- **Prices move with stock.** A glut is cheap and a shortage is dear, within limits — no good ever
  costs less than half or more than four times what it is worth. Prices are a signal, not a lottery.
- **Every shop buys lower than it sells.** You cannot make money selling a loaf back to the baker
  you bought it from, at any price, at any time.
- **A shop can refuse you.** A town with no room in its warehouses and no coin left in its treasury
  will not take your two hundredth crate of apples. It says so rather than quietly offering you a
  terrible price.

Prices are **local**. You can see what things cost in the settlement you are standing in and nowhere
else. Knowing that grain is cheap in the west and dear in the east is knowledge you earn by
travelling, and it is the whole basis of playing a merchant.

## Hauling goods for profit

Buying low in one town and selling high in another is intended, profitable, and self-limiting. Each
load you move narrows the gap you were exploiting, and settlements connected by road quietly close
the rest of it themselves over a few days — a well-connected town recovers from a shortage in about
two days, an isolated one takes ten.

So the trade route that pays is the one nobody else is running, into somewhere the roads do not
reach. That is a real thing to go and find, rather than a spreadsheet to solve.

# What You Can Break

The goods in a shop are grown, dug and cut somewhere specific, and that somewhere is a real place on
the map that you can walk to and damage.

{{< table >}}

| What you do                        | What happens                                                                    | How it recovers                        |
| ---------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------- |
| Burn the fields in a town's catchment | Grain output falls; flour follows; bread gets scarce and dear                 | Rain, then regrowth                    |
| Fell the woods around it           | Timber and charcoal dry up; the smiths lose their fuel                          | Trees regrow on their own              |
| Burn down the mill                 | Grain no longer becomes flour at all, however much grain there is               | The town rebuilds it — when it can pay |
| Kill the baker *(later)*           | The bakery shuts                                                                | An apprentice takes over in a few days |

{{< /table >}}

The last row is designed but not part of the first version — see [Limits](#limits).

The chain matters more than any single link. Burning the fields does not just make grain expensive;
it makes flour expensive, and then bread, and then the baker has nothing to do all day. You can see
the failure travel.

**None of it is permanent.** Scorched ground heals when it rains, and nobody can stop it raining.
Woods regrow. A destroyed building is rebuilt out of the settlement's own treasury, which means a
rich city puts its mill back up in a day and a poor hamlet takes a season — and a hamlet whose
treasury you keep draining stays a ruin for as long as you keep at it.

**A town under sustained attack gets wretched, not dead.** There is a floor: even a perfect siege
leaves people alive, hungry, and working at a fraction of their usual pace. Prices climb, workshops
idle, the streets get thin. When you stop, it comes back.

# What Keeps a Town Alive

Three things do most of the work, and all three are visible in play rather than hidden in a formula:

**Slack.** A settlement in good health runs its trades at about four-fifths of what it could manage.
A bad harvest is absorbed by working harder, not by starving — which is why one bad season is a
hard year rather than a collapse.

**The roads.** Shortages pull goods in from neighbours, along the road network, paid for out of the
town's treasury. A town on a highway barely notices a bad month. A town at the end of a track feels
everything. This is also why cutting a road hurts a settlement that never saw the attack.

**Money that comes back.** A settlement's coin drifts back toward what a place its size and wealth
ought to hold. Sell it a mountain of loot and it will pay well for the first load and poorly for the
next, and be ready for you again in a week or two. It is not a bottomless purse and it is not a
purse you can permanently empty.

{{< alert context="info" text="Where a settlement's coin comes from in the first place, and why NPCs can never conjure it, is covered under [Currency](/docs/mechanics/economy-trade/#currency) and the [World Treasury Director](/docs/server/economy/)." />}}

# Limits

Honest about what this does not do, at least at first:

- **Townsfolk cannot be killed yet.** They will flee a fight rather than die in one. Killing NPCs is
  designed — it costs [honor](/docs/mechanics/pvp/#negative-honor), heavily — but it is not part of
  the first version of this system.
- **There are no interiors.** Buildings have doors and no insides. Townsfolk go in and out of them;
  you cannot follow.
- **Townsfolk do not talk.** They work, eat, drink and sleep. Conversation, quests and haggling come
  later.
- **Ore deposits cannot be exhausted.** Fields and forests can. Mines are still a fixture of the
  landscape rather than a thing you can use up.
