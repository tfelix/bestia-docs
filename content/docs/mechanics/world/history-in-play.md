---
title: History in Play
weight: 1070
description: Ideas for making the world's history pay off in play - knowledge as a key, clues written at world creation, stories still running today, festivals, and a past that predicts the future.
---

{{< alert context="warning" text="**Ideas, not designed.** A brainstorm. Nothing here is decided. Each idea says what the history gives it today and what the history would have to add." />}}

The [world history](/docs/mechanics/world/world-history/) is rich: about 600 kept events, 5 peoples, 11 houses, 46
artifacts and 25 open threads on a world of the genesis size. Today most of it reaches the player as **places and
loot**: a ruin, a tomb with a relic, a battlefield with caches and restless dead, a seal, a lair, and townsfolk who
talk about the past.

This page collects ideas for the next step: make the player **want** to learn the history, because what they learn
changes what they can do.

# Assessment

## What works today

- **Every place has a cause.** A ruin is a razed town, a tomb holds a real person. This is the base everything below
  builds on.
- **Legends are a small puzzle.** A legend is true, distorted or a myth, so a player who asks in several towns finds
  the hidden place. This is the one place today where knowing more history gives a direct advantage.
- **Every world is new.** A wiki cannot solve the history. Whatever players learn, they learn in this world. This is
  the strongest argument for knowledge-based mechanics in Bestia.
- **The open threads exist.** The chronicle already knows which stories are unfinished. Nothing reads them yet.

## What is missing

- **Knowledge is not a key.** A player finds a battlefield by walking and a cache with treasure sense. Knowing _why_
  the battlefield is there gives nothing. A player who skips every dialog line loses nothing but flavour.
- **The history is closed.** Players cannot change it, add to it, or be remembered in it. The last line of the
  chronicle is year 1000.
- **The payoff is mostly loot.** Relics, caches and boss drops. Few payoffs touch the other loops: bestias, crafting,
  trade, travel, the Orders, guilds.
- **Facts stay in dialog.** A player who heard a fact has nowhere to keep it, cannot connect it to another fact, and
  cannot use it later.
- **Most townsfolk history lines are dead ends.** "The walls of Erzvein went up a few generations back" is true, but
  it leads nowhere. Only the legends point at something. Every line that leads nowhere teaches the player to skip
  the next one.

## Principles

1. **Knowledge is a key.** A fact the player learned opens something that force alone cannot: a door, a price, a
   weakness, a blessing.
2. **Every clue pays.** Nothing of the history is shown only for flavour. See [The Clue Contract](#the-clue-contract).
3. **Facts are scattered.** No single NPC, book or stone tells the whole story. Putting pieces together is the game.
4. **Pay off in the loops players already love.** Combat, bestias, crafting, trade, travel, guilds and the Orders.
   History should not be a separate lore minigame.
5. **Personal, shared, world.** Many small payoffs for everyone, some for the first to arrive, a few once per world
   (as in [Quests from History](/docs/mechanics/world/world-history/#quests-from-history)).
6. **Players write the next page.** What players do enters the chronicle, is retold by townsfolk, and reaches the next
   world.

# The Clue Contract

History is flavour, but flavour alone is not enough. Players learn fast which texts matter. If one clue in five leads
nowhere, they stop reading all five. So the rule is strict:

> **Every piece of history the game shows a player is tied to something real in this world, and knowing it helps.**

Flavour is welcome, but only as the wrapping of a clue, never on its own.

## Five kinds of payoff

Every clue does at least one of these:

| Payoff      | What the clue gives                                             | Example                                                           |
| ----------- | --------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Where**   | A place with something to find, take or use                     | "Orin took the blade down to the well" → a cache in the well      |
| **Key**     | Something that opens: a door, a rite, a dialog, a shop, a price | The buried ruler's name opens the tomb                            |
| **Edge**    | An advantage in a fight, in crafting, trade or taming           | The Wyrm fled from fire → fire deals more damage to it            |
| **Warning** | Something dangerous or something that will come                 | "Every forty years the river takes the low town" → a flood is due |
| **Proof**   | Confirms or refutes another clue                                | The bones lie east of the ford, so the winners' account is true   |

A distorted legend still pays: it is one point of the compass off, not noise. A myth pays as a **Proof** once a
second source refutes it.

## How the contract is kept

- **Payoff first, then the clue.** The [clue planner](#clue-chains) starts from a payoff (a cache, a door, a weakness,
  a cycle) and walks backwards to the facts that lead to it. It never starts from a nice story and hopes it leads
  somewhere.
- **The validator checks the lead.** An LLM text that lost its lead is thrown away, like one that invents a name.
- **Townsfolk lines get a "so what".** Each history line gets a second half that points at its payoff (see the
  table below). "The walls went up a few generations back. The masons cut the stone at the old quarry by the
  river."
- **The Annals show the use.** An entry with an open payoff says so: "This may matter at the tomb of Talric." An entry
  whose payoff was taken is marked as spent, so the player knows it is done.
- **Every carrier has a payoff kind.** A headstone gives a name (**Key**), a soldier's letter gives a spot
  (**Where**), a flood mark gives a date (**Warning**).

## Every event kind has a payoff

The history writes about 70 kinds of event. For the contract to hold, each one needs an answer to "so what?". The
table groups them. _Today_ = the history already has what the payoff needs; _Add_ = it must record more.

| Event kinds                                                                                        | What a clue about it reveals                                                                                  | Payoff               | Data                     |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------ |
| `CIV_FOUNDED`, `SETTLEMENT_FOUNDED`                                                                | The founding day (a feast); the founders' script and style                                                    | Key, Edge            | Add calendar day, script |
| `SETTLEMENT_WALLED`                                                                                | Where the masons cut the stone: an old quarry, cheap stone for building situations                            | Where                | Add quarry site          |
| `WAR_DECLARED`, `CONQUEST`, `PEACE`                                                                | Who won, who lost, whether the war ended: releases the Oathbound; which towns still hold a grudge             | Key, Edge            | Today                    |
| `BATTLE`                                                                                           | Where the field is, who fought, how many fell: caches, colours, the strength of the night dead                | Where, Edge, Warning | Today                    |
| `SIEGE`, `SETTLEMENT_SACKED`                                                                       | The treasury buried before the sack; the siege camp outside the walls                                         | Where                | Today (hoard), Add camp  |
| `BETRAYAL`                                                                                         | The postern gate the traitor opened, and the kin who know it                                                  | Key                  | Add postern              |
| `SETTLEMENT_RAZED`, `SETTLEMENT_ABANDONED`                                                         | The ruin and what stood where: the treasury, the temple; refounding rights                                    | Where, Key           | Today                    |
| `SETTLEMENT_BURIED`, `ERUPTION`                                                                    | Ash houses with period goods; when the vent wakes next                                                        | Where, Warning       | Today, Add cycle         |
| `SETTLEMENT_FORSAKEN`, `BLIGHT_SPREAD`, `WARD_RAISED`                                              | Where the old ward stones stand; where the blight will push next                                              | Where, Warning       | Today                    |
| `STAR_FELL`, `SEER_VANISHED`                                                                       | The Wounds; seers' notes along the way; doomsday omens                                                        | Where, Warning       | Today, Add notes         |
| `PLAGUE`, `FAMINE`                                                                                 | Plague pits with grave goods; plague follows famine                                                           | Where, Warning       | Add pits, cycle          |
| `FLOOD`                                                                                            | Flood marks and the next flood; goods washed downstream; the drowned bell                                     | Warning, Where       | Add cycle                |
| `FIGURE_ROSE`, `FIGURE_DIED`, `FIGURE_SLAIN`                                                       | The name and title for the tomb door; where they rest; what their ghost teaches                               | Key, Where, Edge     | Today                    |
| `TRAVELLER_LOST`                                                                                   | The remains and the pack along the route they took                                                            | Where                | Add route                |
| `ARTIFACT_FORGED`                                                                                  | The maker's lost technique; the first step of the relic's resonance                                           | Edge                 | Today                    |
| `ARTIFACT_TAKEN`, `ARTIFACT_ENSHRINED`, `ARTIFACT_PLUNDERED`                                       | Who holds it now; each step of resonance; tells fakes from the real thing                                     | Where, Edge, Proof   | Today                    |
| `ARTIFACT_LOST`, `ARTIFACT_ENTOMBED`, `ARTIFACT_SEALED`                                            | Where it lies: the field, the tomb, the monument                                                              | Where                | Today                    |
| `MONUMENT_BUILT`                                                                                   | The inscription; the relic sealed inside                                                                      | Key, Where           | Today                    |
| `TECHNOLOGY`                                                                                       | A craft that people knew: a recipe hint for the [crafting](/docs/mechanics/items-crafting/crafting/) Discover | Edge                 | Today                    |
| `MINE_OPENED`                                                                                      | The vein the miners left, and why they left it                                                                | Where, Warning       | Add reason               |
| `MONASTERY_FOUNDED`, `FORT_BUILT`, `LIGHTHOUSE_LIT`                                                | A library with books (more clues); a stronghold site; where sailing directions start                          | Where, Key           | Today                    |
| `CIV_ARRIVED`, `CIV_MIGRATED`                                                                      | Where they landed or which pass they crossed: a wreck, a first camp, a route to undiscovered land             | Where                | Add landing site         |
| `CIV_REVOLT`, `CIV_SECEDED`, `CIV_FELL`                                                            | Which towns still hate each other: where honor travels and where it does not                                  | Edge                 | Today                    |
| `CIV_REFOUNDED`                                                                                    | What the survivors left in the old town and want back                                                         | Key, Where           | Today                    |
| `SUCCESSION`, `SUCCESSION_CRISIS`, `DYNASTY_EXILED`                                                | The line of a house: which claims are true, which house has no heir, where the exiles took their heirlooms    | Proof, Key, Where    | Today                    |
| `MARRIAGE_ALLIANCE`                                                                                | Which towns share good gossip; a dowry relic                                                                  | Edge, Where          | Today                    |
| `FEUD_BEGAN`, `VENGEANCE_SWORN`, `VENGEANCE_FULFILLED`                                             | An oath still open; the slayer's blade; whose descendants are hostile                                         | Key, Warning         | Today                    |
| `ORDER_SWORN`, `ORDER_SCHISM`                                                                      | Where a region leans: rituals of that Order are cheaper there                                                 | Edge                 | Today                    |
| `DEITY_RISEN`, `SHRINE_RAISED`, `RITE_PERFORMED`                                                   | The god's local name; the rite a seal needs; where the shrine is                                              | Key, Where           | Today, Add rite          |
| `CULT_FOUNDED`, `CULT_SPREAD`, `CULT_PERSECUTED`, `CULT_WIPED_OUT`, `CULT_REVOLT`, `CULT_ABSORBED` | The sanctuary; the cult's sign; which households keep it; how the town reacts                                 | Where, Key, Warning  | Today, Add sign          |
| `MONSTER_AWOKE`                                                                                    | What woke it, and what could wake the next one                                                                | Warning              | Today                    |
| `MONSTER_RAVAGED`                                                                                  | The direction it came from; what the town did that worked                                                     | Where, Edge          | Add bane                 |
| `MONSTER_SLAIN`                                                                                    | How it was killed; where the skeleton lies; the trophy in the hero's tomb                                     | Edge, Where          | Add bane                 |
| `MONSTER_SEALED`, `MONSTER_WITHDREW`, `MONSTER_VANISHED`                                           | The seal and its rite; the lair                                                                               | Key, Where           | Today, Add rite          |

# The Spine: A Player's Annals

Most ideas below need one shared piece: a per-player record of the history they know. Call it the **Annals**, the
history's twin of the [Bestia Compendium](/docs/mechanics/bestias/bestia/#bestia-compendium).

- **Entries are chronicle ids.** An entry is a figure, an event, a site, an artifact, a god, a house or a people. Each
  one points at a real record, so mechanics can ask "does this player know X?".
- **Facts come from many sources.** Townsfolk lines, headstones and epitaphs, inscriptions, books, visiting a site,
  picking up a relic, a ghost, a song.
- **Certainty is kept.** A fact heard as hearsay or legend is marked so. A second source confirms it, a site visit
  proves it. Distorted legends become visible as contradictions.
- **Entries link.** A figure links to their house, their battles, their tomb and their artifact. The player sees
  holes: "You know Talric was buried. You do not know where."
- **Completion pays.** Know every battle of a war, every ruler of a house, every keeper of an artifact: a title, a
  Sage experience bonus, a cosmetic.
- **Atlas of Ages.** The map gets a year slider, like `chronicle -Pyear=430`. It shows the borders, towns and fields
  of that year, but only the parts the player knows. The world fills in as the player learns. This is the most
  visible reward of the Annals.
- **Companion app.** The Annals are a natural fit for the [companion app](/docs/mechanics/companion-app/): read, cross
  check legends and plan trips while logged off.

**History needs:** stable ids for chronicle records, so it waits for chronicle persistence (planned with the prose
step).

# Ideas by History Element

Each idea names what the player does, what they get, and what the history needs (**Today** = the data exists,
**Add** = the history must record more).

## Battlefields

<figure class="figure d-block my-4">
  <a href="/images/artwork/undead-warlord.jpg"><img class="figure-img img-fluid rounded" src="/images/artwork/undead-warlord.jpg" alt="Concept art: an undead warlord and his restless dead" loading="lazy"></a>
  <figcaption class="figure-caption">An undead warlord and his restless dead</figcaption>
</figure>

- **Lay the dead to rest.** Bring bone shards from a field to the cemetery of the town the fallen came from. The field
  stays quiet for some nights, the town thanks the player, the god of death gives a blessing. The player must know
  which people fought there and where they came from. _Today:_ battle, sides, home towns.
- **Carry their colours.** Craft a banner from banner rags in a people's colours. The restless dead of that people do
  not attack the bearer. The dead of their enemy attack harder. Choose the side by knowing who fought whom. _Add:_
  colours per people.
- **Release the Oathbound.** An Oathbound Revenant still holds the line. A player who knows the war ended tells it so
  (needs a Priest skill to speak to the dead). It lays down its blade and leaves an oath-blade relic, no fight. _Today:_
  `PEACE`, `CONQUEST`.
- **Anniversary battles.** On the day a great battle was fought, the field fills with two spectral armies. Players
  join a side. If the side that lost in history wins tonight, the reward is bigger. _Add:_ a calendar day per event.
- **Hallowed ground.** Where the winners held, a small area gives a defence buff. Where a hero fell, a small area
  gives a damage buff against the people that slew them. _Add:_ the hero's spot on the field.
- **Restore a rusted blade.** A Blacksmith restores rusted scrap into a replica blade in the style of the people who
  lost it. Each people unlocks its own look. _Today:_ the field's sides and cultures.
- **Blood-fed soil.** Old fields with many dead grow rare herbs for Alchemy. More dead, more herbs; older fields,
  rarer herbs. _Today:_ `fallen`, `decay`.

## Ruins

- **Refound a ruin.** A [player settlement](/docs/mechanics/towns-trade/player-settlements/) founded on a ruin can
  take back the old name and patron god. Old foundations make the first buildings cheaper. Families in other towns
  who claim descent from the old town move in as settlers. _Today:_ ruin, name seed, patron, survivors' new town.
- **Echo vision.** A Sage sees the ruin as it stood in a chosen year: ghostly walls, the temple, the treasury. The
  treasury's spot is where to dig. _Today:_ the town layout is generated; it could be built for a past year.
- **Ash houses.** Under an ash ruin lie whole houses from the year of the eruption. Goods dug out are **period
  pieces** with a year stamp. Collectors pay by era and culture. _Today:_ `ASH_RUIN`, `ERUPTION` year.
- **Bring back the bell.** A people that refounded a town after a disaster wants something back from the old town:
  its bell, its hearth stone, its banner. Returning it gives the new town a lasting buff for everyone. _Today:_
  `CIV_REFOUNDED`.
- **Plague pits.** Dangerous to dig (disease), but the dead were buried with their goods. _Add:_ plague burial sites.

## Tombs and Notable People

- **Speak the name.** A sealed tomb door opens only when the player speaks the buried person's name or title, learned
  elsewhere. A wrong answer wakes the guards at full strength. _Today:_ figure, resting place.
- **Rob or honour.** Robbing a tomb takes the relic now but leaves a **Haunted** status and angers the descendants'
  town. Honouring it (an offering, a repair) lets the ghost give a boon: a hint, a recipe, a blessing. Repeated
  robbing in one region raises a desecration count, and the history says what that wakes: the
  [Ossuary Wyrm](/docs/mechanics/world/world-history/#world-bosses). _Today:_ the Wyrm wakes from a robbed tomb in
  the history; make the same rule live.
- **Ghosts with unfinished business.** A notable dead person with an open thread appears at their grave at night.
  A smith's ghost teaches a lost technique, a general's ghost a combat stance, a scholar's ghost gives a book, a
  prophet's ghost a prophecy. _Today:_ roles, threads.
- **Grave rubbings.** Make a rubbing of a headstone or inscription. Rubbings are Annals entries, a Wisdom offering,
  and a trade good for scholars. _Today:_ headstones of figures.

## Houses and Families

The ruling houses. For the families of ordinary townsfolk, see [Towns and Families](#towns-and-families).

- **Claim a house without heir.** A guild (or player) gathers the house's heirloom, its founder's relic and the
  blessing of the old capital's temple. The guild becomes the house's heir: its sigil as
  [guild emblem](/docs/mechanics/society/party-guild/#emblem), the title "of House Ashford", rights to the family
  tomb, and a bonus to a settlement on the house's old land. About eight houses per world are open for this, once
  each. Guilds race for them. _Today:_ `HOUSE_WITHOUT_HEIR`. _Add:_ house sigils.
- **Find the hidden heir.** Some houses believed dead have one living line among the townsfolk. Clues (an heirloom,
  a name, a scar the ballads mention) find them. The heir becomes a patron of the player: a room, a discount, a
  sword. _Add:_ [notable lines](#two-levels-not-a-genealogy).
- **Prove a family's claim.** A townsfolk family claims descent from a house. Bring proof (the house's relic, a
  rubbing of the founder's tomb). The family's standing rises; they reward the player and remember them. _Today:_
  lineage claims.
- **Old feuds, today's prices.** Towns of peoples that warred share bad blood. Helping one town lowers
  [honor](/docs/server/honor/) a little in the other. Towns joined by marriage share good gossip. History decides
  where reputation travels. _Today:_ hostility, wars, marriages.
- **The traitor's gate.** Where a general opened the gates in a siege, a postern still exists in the wall, and the
  traitor's kin know where. Shunned by the town, they sell cheap and tell secrets. _Add:_ a postern on the walls.
- **Fulfil an old oath.** An oath of vengeance is still open. A descendant asks the player to finish it: defeat the
  slayer's ghost at the field where it happened, or bring the slayer's blade to the avenger's grave. The thread
  closes and the chronicle records who closed it. _Today:_ `VENGEANCE_UNFULFILLED`.

## Gods and Cults

- **Call a god by the right name.** Each people names a god its own way. A prayer with the local name blesses; the
  wrong name is an insult. Learning the names is learning the peoples. _Today:_ `Names.deity` per culture.
- **Sacred bestia.** A town does not hunt its patron's sacred kind; killing one nearby is an offence. Arriving with a
  tamed sacred bestia earns a welcome: discounts, a blessing. _Today:_ sacred kind per domain.
- **Revive a forgotten god.** Restore the last ruined shrine, find a relic of the god, carry offerings to several
  towns. The god returns: a new blessing for everyone in this world, and the player's name in the chronicle. _Today:_
  `FORGOTTEN_GOD`.
- **The hidden faithful.** A persecuted cult hides in a few households. A sign from its sanctuary idol opens a secret
  dialog and a cult shop with things nobody else sells. If the persecuting town finds out, honor drops. _Today:_
  `CULT_PERSECUTED`.
- **Festivals.** Each town keeps its patron's feast and remembers its own past. See
  [Customs and Festivals](#customs-and-festivals).
- **Cults and the Orders.** Restoring a sanctuary whose teaching leans toward an Order adds influence for that Order
  in the region. Desecrating one pleases Chaos. _Today:_ domain leaning.

## World Bosses

- **The bane remembered.** The history records how a boss was hurt: the relic that wounded it, the element, the god
  that sealed it. A player who brings that relic or element deals more damage; the living boss may even flee. The
  towns it ravaged tell the story. _Add:_ `bane` on `MonsterRecord`.
- **Strengthen or break a seal.** Eternity renews a seal with the rite of the god that bound it, which needs the
  sealer's name and god. Chaos breaks it. The crystal weakens over the world's life, a slow clock both Orders read.
  _Add:_ the sealing rite; seal decay.
- **Avenge the ravaged towns.** A town a boss ravaged pays a bounty and grows again when the boss dies. _Today:_
  `MONSTER_RAVAGED`.
- **The trophy calls its kin.** A slain boss's trophy, taken from the hero's tomb, tracks a living boss of the same
  species. _Today:_ trophy in the tomb.

## Artifacts and Relics

- **Relic resonance.** A relic remembers its provenance: forge town, battles, owners, tomb. A player who carries it
  to each place in its history, in order, awakens a hidden power at every step. The relic's history is its skill
  tree. _Today:_ provenance is an ordered list of events.
- **Return it home.** The world quest "return a plundered artifact" already exists in design. Add a choice: the relic
  is strong, and returning it gives it up for a lasting buff to the town and everyone in it, plus a chronicle line.
  The town that holds it now may defend it, sell it, or trade it. _Today:_ `ARTIFACT_AWAY`.
- **House sets.** Relics of one house, or forged by one smith, give a set bonus when worn together. _Today:_ maker,
  holder, house.
- **Lost techniques.** An Artificer studies a relic and learns a lesser replica recipe. Each famous smith leaves one
  technique. Discovery hints in the [crafting menu](/docs/mechanics/items-crafting/crafting/) quote the smith. _Today:_
  maker and material.
- **Fakes.** Traders sell "relics" that are fakes. Knowing the true provenance tells them apart; buying blind is a
  gamble. _Today:_ provenance.

## Peoples, Wars and Places

- **Old scripts.** Each culture writes in its own script. Inscriptions in ruins, on monuments and tombs are
  unreadable until a Sage learns the script from rubbings. Read, they open doors, show caches and translate old maps.
  The skill stays with the player, so it pays off again and again. _Add:_ a glyph set per culture.
- **Cultural styles.** Finding a people's artifacts and ruins unlocks its look for armour, weapons and buildings, with
  a small bonus: a seafaring people's style resists water, a mountain people's resists cold. _Today:_ culture.
- **Relight a lighthouse.** A restored lighthouse lights the coast at night and in fog: safer travel, better fishing
  near it. _Today:_ `LIGHTHOUSE`.
- **Reopen a mine.** An old mine still has the vein its miners left, and its history says why it closed: exhausted,
  collapsed, or something woke below. _Today:_ `MINE`. _Add:_ why it closed.
- **Retake a fort.** Old forts on saddles between peoples make strong
  [guild strongholds](/docs/mechanics/society/party-guild/#guild-strongholds). _Today:_ `FORT`.
- **The old roads.** Peoples that traded built roads. Old waystones still stand. Restoring them adds
  [travel](/docs/server/long-distance-travel/) speed, and the old routes count as route knowledge once learned.
  _Add:_ the road network between towns that traded.
- **Old maps.** Maps found in monasteries and ruins show the land as it was in a given year, in the style of their
  people. Laid over today's map, the towns that are gone show where ruins lie. _Today:_ sites and years.
- **Monastery libraries.** A restored monastery is a place for Sages to study, and holds books (see
  [Books and Prose](/docs/mechanics/world/world-history/#books-and-prose)). _Today:_ `MONASTERY`.

## Disasters, the Mana and the Wounds

- **Seers' notes.** Seers who walked to a Wound left notes on the way. Gathered, they chart the mana flow and give
  earlier [doomsday omens](/docs/mechanics/world/doomsday/#anatomy-of-a-doomsday). _Today:_ `SEER_VANISHED`.
- **Old wards.** Where a town once raised a ward, its stones remain. Rebuilding them pushes the blight back. _Today:_
  `WARD_RAISED`.
- **Eruption cycles.** The chronicle knows when each vent erupted. A Circle observer who knows the dates predicts
  the next eruption. _Today:_ eruptions per vent.

## Bestias

- **Historic bloodlines.** A general's war hound, a ruler's mount, a hunter's falcon: their descendants still live in
  the wild near their master's home. Caught, they carry better IVs and a named line ("of the line of Greyfang"). A
  Forester with [Bloodline Study](/docs/mechanics/master/survival-tree/#skill-bloodline-study) sees it. Players learn
  where to look from the stories. _Add:_ named beasts on figures; special spawns near their homes.
- **Brood of a boss.** A world boss's brood lingers where it ravaged. Catching one is rare and prized. _Today:_
  event species.
- **Compendium notes.** A species entry gains history lines, each with a use: which towns hold it sacred (where taming
  it earns a welcome and hunting it an offence), which hero rode one (where its bloodline lives). _Today:_ sacred
  kinds.

## Bards and Songs

- **Lays of battles.** A Bard learns the lay of a battle from the oldest household of a town near the field. Played
  on that field, it calms the dead or wakes them. Played in a town of the winners, prices drop.
- **Hymns.** A hymn to a god is a song that also counts as a prayer, so the Bard's party gets the god's blessing. Its
  verses name the god's holy places.
- **Ballads carry clues.** A ballad names a hero's scar, a hidden heir's sign, a relic's last keeper. _Today:_ the
  Bard's songs exist; the lay would be a new song kind.

## Trade and Economy

- **Antiquities.** Collectors in big towns buy period pieces, rubbings and relics. A people wants its own heritage
  back and pays more for it.
- **A museum.** A town museum takes donations. Each donor's name goes on a plaque. A full collection gives the town a
  lasting bonus.
- **Pilgrims.** Famous shrines and tombs draw pilgrim NPCs along the roads. They need escorts and buy at player shops
  near the shrine. A settlement next to a holy place does well.

# Players Write the Chronicle

The history ends at year 1000. It does not have to.

- **A living chronicle.** Player deeds append events: the first kill of a world boss, a seal broken, an artifact
  returned, a house claimed, a forgotten god revived, a settlement founded on a ruin, a guild war. They use the same
  record types and the same open-thread rules. _Add:_ the stored chronicle.
- **Townsfolk retell it.** New events reach the townsfolk through the [rumour ledger](/docs/server/dialog/#recent-events-the-rumour-ledger)
  first, then as firsthand memory. Players hear their own deeds told back to them, with the same hearsay and legend
  framing as the old history.
- **Monuments to players.** A town saved from a boss raises a statue with the player's name. A battlefield of a guild
  war gets bones and banners like the old ones.
- **Next world.** At the end of the [incarnation](/docs/mechanics/world/doomsday/), the strongest deeds enter the next
  world's history as a mythic age before the star fell: heroes, the Order that won, how the world ended. Players see
  their names on old monuments in the new world. This is the longest motivation the game can give. Names should be
  opt-in.

# Clues Written at World Creation

The decision so far: an LLM writes **static** texts from the chronicle after the world is generated, on the server
CPU, and they are translated into every language. NPCs never improvise. This section is about _what_ to write and
_where_ to put it, so that the texts pull players along instead of sitting in a library.

## A clue is a fact plus a lead

A text that only tells a story is read once and forgotten. A text that ends in a question sends the player somewhere.
Every snippet should carry:

- **One or two facts** from the chronicle (a name, a year, a place, a cause).
- **One lead**: a hint at a real place, person or thing the player does not know yet.

> _Scratched into the wall of the old guard house:_ "Third night of the siege. The captain says the Ashford blade must
> not fall to them. Orin took it down to the well before dawn. Orin has not come back."

The facts (siege, captain, blade) go into the [Annals](#the-spine-a-players-annals). The lead (the well) stays open in
the Annals until the player has looked.

## Clue chains

A **clue planner** runs before the LLM. It is plain code and it is deterministic:

1. For every open thread and every hidden place, walk the chronicle's causes back to the sites involved.
2. Pick 3 to 5 carriers along that chain, from near a standing town to the hidden place.
3. Give each carrier one fact and the lead to the next carrier.
4. Hand the LLM the facts, the lead, the voice (who wrote it, when, for whom) and a length limit.

A **validator** then checks the text: every name and number must be one the planner gave. A text that invents a name
is thrown away and written again. This keeps the rule "no prose the chronicle does not support".

The chain makes the openers easy to find (near towns, along roads) and the payoff far away.

## Carriers: where a text can live

The more kinds of carrier, the more the world feels written in. Each one is a prop or an item the world already has
or easily can have, and each one has a payoff it is good at (see [The Clue Contract](#the-clue-contract)):

| Carrier          | Where                                    | What it says                                 | Payoff it carries                                                                                                      |
| ---------------- | ---------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Epitaph          | Headstones, tombs                        | One or two formal lines                      | **Key:** the name and title that open the tomb; **Where:** the next of kin's grave                                     |
| Inscription      | Monuments, milestones, bridges, gates    | A dedication, in an old script until learned | **Where:** the relic sealed in the monument; the distance on a milestone to a lost town                                |
| Wall scratching  | Ruins, forts, prisons, mines             | A desperate line from the last days          | **Where:** what was hidden in the last days                                                                            |
| Last letter      | In a battlefield cache, next to bones    | A soldier to their family                    | **Where:** where the commander fell, with their blade; **Proof:** which account of the battle is true                  |
| Diary pages      | Spread over sites, one per site          | One person's journey                         | **Where:** each page the next site, the last page the prize                                                            |
| Ship's log       | Lighthouses, wrecks, harbour taverns     | Bearings, days at sea, a coast seen          | **Where:** a lost island, a wreck                                                                                      |
| Ledger           | Ash ruins, trade posts                   | Goods, prices, debts                         | **Where:** the storehouse under the ash; **Key:** a debt the debtor's family still owes and will pay off with a favour |
| Shrine plaque    | Shrines, sanctuaries                     | A plea to the god, naming the trouble        | **Key:** the god's local name and the offering it wants                                                                |
| Children's rhyme | Told by children in town                 | A counting rhyme                             | **Where:** the path to a hoard, in steps and landmarks                                                                 |
| Ballad, lay      | Bards, taverns                           | A song of a hero                             | **Proof:** a hero's scar, a heir's sign; **Edge:** the lay's effect on its field                                       |
| Item flavour     | Rusted scrap, relics, period pieces      | "Stamped with the mark of House Ashford"     | **Proof:** which house or people it belongs to, so who pays most for it                                                |
| Place-name note  | Map tooltip                              | Why the place has its name                   | **Where:** the thing it was named after: the hero's grave, the spring, the field                                       |
| Notice board     | Town square                              | Present-day news                             | **Warning, Key:** the [situations](#the-present-stories-still-going-on) of the town and how to help                    |
| Dream            | Sleeping at a shrine of night and dreams | A vision of a past event                     | **Where:** the place of the event, seen from above                                                                     |

## Two sides of every war

The same battle is written twice: once by a chronicler of the winners and once by the losers. The planner gives each
side the true facts plus a **bias**: the winners count fewer of their own dead, the losers blame a betrayal. Where the
two disagree, the ground decides: the bones lie where they lie. Spotting which account is true is a puzzle with a
real answer, and it points to where things really are.

## When a text reaches the player

- **Walking past.** A short line pops up the first time the player walks into a ruin or onto a field: "Arrowheads in
  the grass. All pointing east."
- **Picking up.** Letters, pages and logs are items. They go into the Annals when read and can be traded.
- **At night.** On a battlefield, a ghost whispers one line of a dead soldier.
- **Asking.** Townsfolk lines stay as they are; the texts give them more to point at.

## Budget and onboarding

- **Not every site gets a text.** A budget per region keeps it special. Sites on a clue chain come first.
- **A first mystery near the start town.** One short chain, solvable at a low level within an hour, that teaches the
  Annals and ends in a small relic. Hand-picked by the planner from the threads near the start town.

# The Present: Stories Still Going On

The history ends at year 1000, but the world does not stop. Some stories should still be **running** when the first
player arrives, and new ones should start while the world lives. These are the stories that drive daily ambition.

## The rules for a present-day story

Each story, a **situation**, must:

1. **Change something real** in the world: prices, a road, the post, a den, a prop, a route. Not only dialog.
2. **Offer a concrete contribution** through the existing [NPC commissions](/docs/mechanics/world/questing/#npc-commissions):
   bring 40 stone to the road crew, escort the cart, clear the camp.
3. **Grow when ignored and shrink when worked on.** A situation has a pressure value. Every few Bestia days it moves.
4. **End in the chronicle.** The end is an event, posted to the [rumour ledger](/docs/server/dialog/#recent-events-the-rumour-ledger)
   and retold by townsfolk. Who helped is named.
5. **Have a root in the history.** The bandits are someone's descendants; the bridge replaces one the flood took.

## Trouble

| Situation            | What happens in the world                                                                                                     | What players can do                                                     | Root in the history                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------- |
| Highway robbers      | A camp of human bandits in a wood next to a road. NPC carts on that road lose goods, so prices rise in the towns it joins     | Escort carts; clear the camp; dig up the camp's stash and return goods  | Deserters of the last war, or the losing house's men    |
| Post robbers         | A gang in the woods near a town. [Postal](/docs/mechanics/towns-trade/postal/) deliveries through the area may be intercepted | Guard routes; raid the hideout; return the stolen packages for a reward | Refugees of a razed town who never got land             |
| Bestia rustlers      | A clan catches bestias in a region. The dens there thin out, and caged bestias appear in their hideout                        | Free the bestias (and tame some); buy them back; hunt the clan          | A cult of a sacred beast that sells its enemies' beasts |
| Livestock raids      | A pack of wild bestias attacks the farms. Food prices rise                                                                    | Hunt the pack; find why it left its range                               | A world boss's ravages drove it out                     |
| A border heating up  | Two living peoples still carry hostility from the history. It rises. Towns raise tolls on each other's goods                  | Pick a side as a mercenary; carry a peace letter; sabotage              | Hostility and grudges of the last war                   |
| A succession quarrel | A ruler is old. Two claimants want players' support                                                                           | Back a claimant; find proof that one is no heir                         | The ruling house and its relations                      |
| A cult comes out     | A persecuted cult starts to preach in the open. The town is restless                                                          | Protect it, report it, or join it                                       | `CULT_PERSECUTED`                                       |
| Sickness             | A village falls ill. Fewer townsfolk work, shops run low                                                                      | Bring herbs; a Priest heals; find the source (a fouled well)            | Plagues in the chronicle; the same well                 |
| A missing person     | A traveller did not arrive. The family asks around                                                                            | Search along the road; find them alive, or what is left                 | `TRAVELLER_LOST` happens again                          |

## Work in progress

Building is the friendliest kind of situation: everyone can help, and the result stays.

| Situation      | What happens                                                         | Contribution                                  | When it is done                                                                             |
| -------------- | -------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| A bridge       | A construction site at a river crossing. It grows with each delivery | Timber, stone, iron, escorting the crew       | The road is shorter. The bridge carries the builder's name and the names of the top helpers |
| A road         | A road crew works on a stretch between two towns                     | Gravel, stone, clearing bestias near the crew | Faster [travel](/docs/server/long-distance-travel/) on that stretch                         |
| A wall or ward | A town raises a wall or a ward against the blight                    | Stone, mana crystals, guarding the masons     | Fewer raids; the blight stops at the ward                                                   |
| A temple       | A town rebuilds its patron's temple                                  | Materials, offerings                          | A stronger blessing in that town                                                            |
| A lighthouse   | A harbour relights the old lighthouse                                | Oil, glass, repair work                       | Safer coast at night                                                                        |

The builder is a named person with a reason: "Tamsin's grandfather drowned when the old bridge fell in the flood of 970. She swore to build one that stands."

## Local heroes and feats

Every town has one or two **local heroes**: living townsfolk with one crazy deed, which the town loves to tell.

- Hedda climbed the Greyhorn and planted the town's banner on the top. _The banner is a prop on the peak._ A player
  who climbs up can touch it, or plant their own.
- Old Brem killed a level 40 boar with a pitchfork. _Its skull hangs in the tavern._ A player who brings a bigger
  skull of the same kind gets it hung instead.
- The Fennick twins swam to the island and back. _There is a cairn on the island._ Swim it and add a stone.

These are **records**. Each town keeps a small **feats board**: the record, who holds it, since when. Beating a
record is pure player ambition, needs no quest system, and the town talks about the new record holder. Every feat also
points at something: the hero saw a cave on the way up, the boar came out of a den nobody else knows, the island has
a spring.

## Where situations come from

- **At world creation.** The history's last decades seed the starting situations: rising hostility, a cult in hiding,
  a bridge lost to a flood. About one per standing town, so every town has something going on from day one.
- **While the world lives.** A small director starts new ones from the same rules: a region with many NPC carts and
  no players nearby attracts robbers; a flood that broke a bridge starts a bridge. A budget per region keeps it
  calm.
- **From players.** Player actions start situations too: hunting a region empty brings in rustlers, a guild war
  leaves deserters.

# Towns and Families

The chronicle knows a town as a place that was founded, walled, sacked or flooded, and it knows the ruling houses. It
does not know the people who live in the town today, or the town's own small history. Yet towns and townsfolk are the
part of the world players meet most often, so they should carry the most clues.

## What the towns have today

- **Households.** Every household has a head, a spouse, children, apprentices, servants and elders, with ages, wealth
  and a business. See [Townsfolk](/docs/server/townsfolk/) and [Who is speaking](/docs/server/dialog/#who-is-speaking).
- **A gossip graph.** Households are linked as a small world: mostly to neighbours, with a few jumps across town.
- **Memories by lifetime.** A household knows what its oldest member lived through, plus about 40 years of what their
  parents told them.
- **Lineage claims.** A household may claim descent from a nearby ruling house. Nothing checks the claim. See
  [Old houses](/docs/server/dialog/#hearsay-legends-and-old-houses).

What is missing:

- **Family names.** A townsperson has a given name only, drawn from their own seed. A mother and her son look like
  strangers.
- **Kin between households.** Nobody has a sister in the next street or a son in the next town.
- **True lines.** A lineage claim is never true or false, and no living person descends from a figure of the
  chronicle.
- **History at town scale.** Who built the mill, why the bridge has its name, what lies under the market.

## Two levels, not a genealogy

A family tree for every townsperson over 1000 years would cost a lot, and nobody would see it. Two levels are enough:

| Level         | How many              | What it is                                                                             | Made from                                     |
| ------------- | --------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------- |
| Notable lines | A few dozen per world | A line from a chronicle figure or house down to one living household, with known steps | Its payoff, like a [clue chain](#clue-chains) |
| Everyday kin  | Every household       | A family name, plus one or two kin links to other households, some in nearby towns     | Keyed rolls on the settlement seed            |

Both are derived from the seed and not stored, like households today. Given names stay as they are, so no living
townsperson is renamed. A notable line also decides whether the lineage claim of that household is true.

## What families give players

| Idea                         | Example                                                                                                                                                       | Payoff      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Descendants of the chronicle | Hedda Ashford, a baker, descends from the Ashford buried with a sword. She knows the family story and may open the family tomb                                | Key, Where  |
| Heirs for open houses        | The hidden heir of a house without heir is alive and sells bread in Erzvein. See [Houses and Families](#houses-and-families)                                  | Key         |
| True or false claims         | A lineage claim is now true or false. Proof (a rubbing, an heirloom) settles it. The family rewards or resents the player                                     | Proof       |
| Kin in other towns           | "Tell my brother at the Kolm ferry that I am well." A letter by [post](/docs/mechanics/towns-trade/postal/), a new route, and a brother who trusts the player | Where, Key  |
| A source for each memory     | "My grandmother saw the flood of 912." The grandmother lives two houses down and knows how high the water stood                                               | Warning     |
| Masters and apprentices      | "Trained by Oswin, who learned from the smith who forged the Ashford blade." The chain is a maker's mark and a recipe hint                                    | Edge        |
| Tamer families               | A family has bred one line of a species for generations. They sell a hatchling with known IVs, or know where the wild line lives                              | Edge, Where |
| Deaths with a family         | A killed townsperson's widow or apprentice takes over the business. The family remembers who did it, in gossip and [honor](/docs/server/honor/)               | Warning     |
| Feuds                        | Two families fight over a mill or a marriage. This is a [present-day situation](#trouble): the player picks a side, prices and dialog follow                  | Key         |
| Weddings and funerals        | Small town events between the [feasts](#customs-and-festivals). A gift is remembered                                                                          | Key         |
| Family trees in the Annals   | "You met 4 of the 7 living Ashfords." Each member is a lead                                                                                                   | Proof       |

## History pinned to the town

More events per town would add little. What helps is history fixed to **things a player can stand in front of**.
Each one follows [the contract](#the-clue-contract): it points at something.

- **A builder for each notable building.** The mill, the temple, the bridge and the walls get a builder, a year and a
  reason, on a dedication stone or in the owner's dialog. The builder's family still lives in town. The stone names
  the quarry or the forest the material came from (**Where**). Buildings that players raise get the same stone, see
  [Players Write the Chronicle](#players-write-the-chronicle).
- **Marks in the stone.** A flood mark on the wall, a scorched beam from the sack, a cracked bell from the quake. The
  flood mark shows how high the water came, a **Warning** for the
  [flood cycle](#cycles-what-came-before-comes-again).
- **The founders.** Every town gets founding families when it is founded. Their descendants sit on the council, serve
  the temple, or fell on hard times. Each of them knows the founding story and one thing the town forgot (**Key**).
- **The town under the town.** A town that was razed and built again stands on its ruin. A cellar, a well or a sewer
  leads down into it (**Where**).
- **Names with a reason.** "Gallows Lane", "Widow's Bridge", "the Ashford Gate". Each name comes from an event. Asking
  about the name is the first step of a clue chain.

_Today:_ households, kinship, lineage claims, settlement events. _Add:_ family names and kin links, notable lines,
founding families, builders of notable buildings, marks as props, a town rebuilt on its ruin, place names from events.

# Explorers and Discoveries

The history has explorers already (figures, `TRAVELLER_LOST`), and peoples who arrive over the sea. Give them
voyages and discoveries.

- **Discoveries with a name.** An explorer finds an island, a valley or a cave, and names it: "Ysmar's Isle". The name
  goes into the history (`LAND_DISCOVERED`) and onto the old maps of that people.
- **A name without a place.** When the explorer died on the way home, nobody wrote down where it was. Townsfolk know
  the name, sailors argue about it, no map shows it. A player who finds it again puts it back on every map: "Ysmar's
  Isle, found again by …".
- **Sailing directions.** A ship's log gives bearing and days at sea from a lighthouse. A player turns that into a
  spot on the sea: dead reckoning as a puzzle. The Cartographer is good at it.
- **Explorers' cairns.** At the far end of a journey, the explorer built a cairn with a note inside. The note names
  the next goal they never reached.
- **The lost expedition.** A camp in the wild with tents, gear and a journal. The last entries describe what killed
  them: a lair, a cold no one survives, a beast.
- **Vein legends.** Miners tell of a seam that "ran on under the lake". The legend is made from the **real**
  resource layer: there is rich ore there, or there was. It is true, distorted or a myth, like other legends.
  Prospectors with [Resource Sense](/docs/mechanics/master/survival-tree/#skill-resource-sense) confirm it.
- **Naming rights.** Some regions were never reached by any people. A Cartographer who charts one first may name it.
  The name holds for the whole world and enters the chronicle. Few things drive ambition like a place named after
  you.

_Add:_ voyage events (`EXPEDITION_SAILED`, `LAND_DISCOVERED`, `EXPEDITION_LOST`) aimed at regions far from every
town; a name per discovery in the explorer's culture; vein legends from the resource layer.

# Customs and Festivals

## The calendar

A Bestia year is 4 real months, and a season is one real month. "Once or twice a year" is therefore every 2 to 4 real
months, and a player sees each feast a few times in a world's life. A feast lasts one or two Bestia days (8 to 16
real hours), so players in every time zone can join.

Each town keeps **two feasts a year**:

1. **The patron's feast.** Its season comes from the domain: the harvest god in autumn, the sun god at midsummer, the
   god of the dead in the longest night.
2. **A day of its own past.** The town's founding day, the day a siege was lifted, a remembrance day for a town the
   ash buried. The day is fixed from the event in the chronicle. The feast speech tells the story and ends in a
   lead, like every clue: "the gate the defenders held", "the field where we buried them".

Towns of one patron celebrate on the same day. Pilgrims and carts travel between them in the days before.

## What a feast does

- **NPCs gather.** Townsfolk leave their trades for the square, the temple or the field (the daily schedules exist).
  Some shops close, festival stalls open.
- **Festival stock.** Things sold only on the feast: the god's symbol as a charm, a dish, a cosmetic.
- **A contest.** Prize, title for the year, a place on the town's feats board.
- **A stronger blessing.** The patron's blessing is stronger and lasts longer on the feast day.
- **Bards earn more.** Crowds pay for songs.

## Feasts by domain

| Domain           | Feast                    | Contest or custom                                                                 |
| ---------------- | ------------------------ | --------------------------------------------------------------------------------- |
| War              | Day of Arms              | Tournament; a mock battle of the town's oldest battle                             |
| Love             | Rose Day                 | Bestia pairs bred on this day get a breeding bonus                                |
| Death            | Night of Lanterns        | Families visit graves; ghosts can be spoken to; battlefields stay quiet           |
| Sun              | Midsummer Fire           | Light the signal fires on the hills before dawn                                   |
| Moon             | Silver Night (full moon) | Silver offerings in pools; moon-bound bestias show themselves                     |
| Sky and thunder  | Storm Day                | Bring a lightning-struck stone; storms bring the god's favour                     |
| Sea              | Blessing of the Boats    | Boat race; fishing contest, biggest catch wins                                    |
| Harvest          | Harvest Fair             | Largest crop contest; first crops at the temple                                   |
| Hearth and home  | Relighting               | Every hearth is lit from the temple fire; a warmth buff for the winter            |
| Wisdom           | Day of Questions         | Riddles about the town's own history, answered from the Annals                    |
| Craft            | Forge Fair               | Masterwork contest: player-crafted items are judged by quality                    |
| Trade and travel | Great Market             | No market tax for a day; traders come from far                                    |
| Trickery         | Masks Day                | Prices are a gamble; small thefts are not offences, for one day                   |
| Healing          | Spring Day               | Bathing in the holy spring cures and buffs                                        |
| The hunt         | The Great Hunt           | Hunt a named beast; trophy contest. The sacred kind is spared                     |
| Fate             | Oracle Day               | The oracle gives one prophecy (see [The Future](#the-future-cycles-and-portents)) |
| Justice          | Court Day                | Honor offences can be paid off and forgiven                                       |
| Revelry          | Wine Feast               | Drinking contest; bring wine or ale for the feast                                 |
| Night and dreams | Longest Night            | Sleep at the shrine; the dream shows a past event and its place                   |

## Customs on ordinary days

Small rules that make each town feel different. Following them earns a little honor, breaking them costs a little:

- No hunting of the sacred kind near town.
- Bread left at the shrine at dusk.
- No work at the forge on the god's day of the week.
- A coin in the grave of anyone buried.
- The town's bell rung on the anniversary of the flood; whoever rings it gets a small blessing.

_Add:_ a calendar day per event; feast days per town from patron and history.

# The Future: Cycles and Portents

The history can reach forward. Some events it recorded will **happen again** while players are in the world, and
some will happen **when a condition comes true**. The past gives the hints, so players who read it can prepare,
prevent or cause them.

## Time is short

A world lives about 6 months to 2 years of real time: **2 to 6 Bestia years**. A flood every forty years would never
come back during play. So the history is shaped for it: it ends with some cycles **due**. The generator places the
last occurrences so that the next one falls inside the world's life.

## Cycles: what came before comes again

| Cycle               | The hint in the past                                                                          | What players can do before it comes                                         |
| ------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| River floods        | Flood marks with years on the bridge pillar; "every forty years the river takes the low town" | Build dikes (a work situation); move goods; the old dike's ruins show where |
| Plague after famine | Plague pits near towns that starved first                                                     | Stock food; grow healing herbs; Priests ready                               |
| Eruptions of a vent | Ash layers in the ruins; the chronicle's eruption years                                       | Evacuate; dig channels; the Circle predicts the day                         |
| A boss wakes        | "The Leviathan rises every third generation"                                                  | Prepare its [bane](#world-bosses); renew the seal                           |
| Blight surges       | Towns forsaken one after another in a pattern                                                 | Rebuild the old wards                                                       |
| Bandit winters      | Old ledgers of raids in hard winters                                                          | Escorts; stock the town                                                     |
| Migration of a herd | Rock paintings of the herd's path                                                             | Hunt, tame or divert; it tramples farms                                     |

A cycle that hits a prepared town is a story of success: the town stands, the chronicle names who helped. A cycle that
hits an unprepared town is real: the flood is water in the world, the plague empties houses, prices rise.

_Add:_ cycle records (kind, place, period, phase) in the history, with the phase set so that the next one is due during
play.

## Portents: when the condition is met

A **portent** is a rule the history wrote down as a prophecy, a curse or a legend: _when X happens, Y follows_. The
zone watches X. When X comes true, Y happens, for everyone.

An example: **three legendary blades are lost in the world. When they are brought together, the world ends.**

- **The blades.** Three relics, each in a different state the history already knows: one in a tomb, one carried by a
  living figure, one kept in a temple far from home. Each one alone is a strong relic, so everyone who holds one is
  tempted to keep it.
- **The prophecy.** In pieces: one verse in a monastery book, one in a ballad, one on the seal of a tomb. Only together
  do they say what the blades do.
- **The condition.** All three in one inventory, or in one place.
- **The warning.** Two of three together: the earth shakes in the region, bells ring by themselves, the restless dead
  walk by day. The server tells every player that something stirs.
- **The Orders.** Chaos wants them united: it hastens the end. Eternity wants them apart, or one destroyed. The Circle
  wants them united only at the proper hour. The blades become the centre of faction play.
- **The effect.** The doomsday jumps to its next stage, or starts if it has not. If the blades never meet, the
  doomsday still comes on its own schedule.

More portents of the same shape:

| When …                                       | … then                                                                |
| -------------------------------------------- | --------------------------------------------------------------------- |
| The last heir of House Ashford dies          | The house's oath breaks, and the dead of its battlefields rise by day |
| Both seals in the world are broken           | The two bosses seek each other; where they meet, the land splits      |
| The forgotten god's last shrine is destroyed | The blight runs free from the nearest Wound                           |
| The sacred stag of the forest is killed      | The forest withers, and its town turns hostile                        |
| The bell of the drowned town rings again     | The flood returns to the valley                                       |
| The sun disc returns to its temple           | The Long Night cannot fall in this world (a ward, not a trigger)      |
| The two crowns are worn by one master        | The two peoples make peace, and their border opens                    |

Portents can **arm**, **trigger** or **defuse**. Each world could get one portent that hastens its doomsday and one
that wards it off, both written into the history. Then reading the history is the strategy map of the Orders.

## The doomsday grows from the history

The doomsday is decided when the world is generated, like the history. The two can be one story:

- A sealed world boss becomes The Destroyer. A Wound with a long blight history becomes Mana Burn or The Void Tear. A
  land of many eruptions becomes Volcanic Activity.
- **Prophets saw it.** Prophet figures leave prophecies about the kind of threat, the region, sometimes the season. Some
  are true, some distorted, like legends. Gathering them is intelligence for the Orders: where to build wards, where to
  raise a citadel, where Chaos should dig.
- **The Circle keeps the record.** The Circle is the Order of measurement. It earns influence by keeping the history:
  confirming facts, holding anniversaries, predicting cycles.

_Add:_ `PROPHECY` events; portent records (condition, effect, hint carriers); a doomsday chosen from the history.

## How it fits together

Present-day situations, cycles and portents are the same idea seen from three sides: **the history keeps running**.
A light version of the history tick could run in the zone, once per Bestia week, with the live world as input
(player deeds, prices, kills, broken props) and situations, cycles and portents as output. Everything it does is
written to the stored chronicle, so townsfolk, texts and the next world can read it.

# What the History Would Need

A list of the additions the ideas above ask for, roughly by how many ideas each one serves:

| Addition                     | Serves                                                                 |
| ---------------------------- | ---------------------------------------------------------------------- |
| Stored chronicle, stable ids | The Annals, the living chronicle, the next world. Already planned      |
| Clue planner and validator   | Every LLM text: chains of clues, two-sided accounts, onboarding        |
| A calendar day per event     | Anniversaries, festivals, prophecy seasons                             |
| Situations at world creation | Bandits, builders, local heroes, border tension on day one             |
| Cycles due during play       | Floods, plagues, eruptions, boss wakes                                 |
| Portent records              | Three blades, seals, heirs, sacred beasts; doomsday triggers and wards |
| Voyages and discoveries      | Lost islands, sailing directions, naming rights                        |
| Vein legends                 | Prospecting from stories                                               |
| Heraldry: colours and sigils | Banners on fields, house claims, guild emblems, people's styles        |
| Script per culture           | Inscriptions, old maps, rubbings                                       |
| `bane` and sealing rite      | Boss weaknesses, seal renewal                                          |
| Named beasts on figures      | Historic bloodlines                                                    |
| Notable lines                | Hidden heirs, descendants, true lineage claims, founders               |
| Family names and kin links   | Related townsfolk, letters to kin, feuds, deaths with a family         |
| Builders and marks in towns  | Dedication stones, flood marks, place names, the town under the town   |
| Why a site closed            | Mines, ruins, forts with a reason to fear them                         |
| Roads between trading towns  | Waystones, old routes, pilgrims                                        |
| `PROPHECY` events            | Doomsday intelligence                                                  |
| Siege details (the postern)  | The traitor's gate                                                     |
| Plague burial sites          | Plague pits                                                            |

# Where to Start

Ranked by payoff against cost. Steps 1, 2, 4 and 5 need no new data from the history.

1. **A "so what" for every townsfolk line.** Applies [the contract](#the-clue-contract) to what already ships: each
   history line gets the second half from the event table. Most payoffs marked _Today_ exist already.
2. **Family names and kin links.** Cheap, derived from the seed like households, and the biggest gain in how
   real a town feels. Letters to kin use the postal system that exists.
3. **The Annals.** Every other idea gets easier once the game knows what a player knows. Reuses the Compendium's
   shape. Needs the stored chronicle.
4. **Relic resonance.** Gives the existing relics a reason to read their history. The provenance list exists.
5. **Battlefield rites.** Laying the dead to rest and releasing the Oathbound. The fields, sides and dead exist; the
   rite is small.
6. **Notable lines.** Descendants of the chronicle, hidden heirs, true lineage claims. Claiming a house builds on
   them.
7. **Claiming a house.** A world-tier race for guilds, about eight per world. Needs sigils.
8. **Boss banes.** Turns the boss stories into fight preparation. One new field on the monster record.
9. **The living chronicle.** Player deeds retold by townsfolk. Needs the stored chronicle.
10. **Local heroes and feats boards.** Cheap, needs no quest system, and drives ambition on day one.
11. **One work situation (the bridge) and one trouble situation (post robbers).** They prove the situation pattern on
    systems that exist: commissions, postal, travel.
12. **The clue planner with the prose spike.** The spike should write clues with leads, starting from a payoff, not
    only chronicles.
13. **Festivals.** A calendar day per event, then two feasts per town.
14. **Cycles and portents, then doomsday from history.** The largest change, and the one that makes history matter to
    every Order.

# Risks

- **Walls of text.** Facts must stay short. The Annals do the linking, not the player's memory.
- **Shared answers.** Within a world, players share what they know. That is fine and social. Mechanics that need the
  fact in the player's _own_ Annals keep the walk worth doing, even when the answer is known.
- **First-come rewards.** World-tier rewards go to few. Personal rewards must stay plentiful, as the
  [quest tiers](/docs/mechanics/world/world-history/#quests-from-history) already say.
- **Dead clues.** One clue that leads nowhere teaches players to skip the next five. This is why
  [the contract](#the-clue-contract) is strict, and why the existing townsfolk lines need their "so what" first.
- **Families that drift.** A replaced townsperson must keep the household's name and kin, or a widow forgets her
  husband. Derive both from the household, never from the person.
- **Too many keys.** If every door needs a fact, the world feels locked. Keys should add a better way, not the only
  way.
