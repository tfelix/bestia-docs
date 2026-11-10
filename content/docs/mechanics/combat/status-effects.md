---
weight: 110
title: Status Effects
description: Every buff and debuff of the game, and the rules they share - resist, immunity, channeling and concealment.
---

A status effect is a temporary condition on top of an entity's [status values](/docs/mechanics/combat/statusvalues/). Skills,
attacks, ground zones, traps and items apply them. The list at the end of this page shows every effect a player can
meet. It is rendered from `data/status_effects.yaml`, which follows zone-server's `status_effects.yml`.

# Resist

Most debuffs name two attributes that resist them, see the column **Resisted by** in the list. The target adds both
attributes up:

```text
S = attribute1 + attribute2
R = S / (S + 150) + (Resolve − P) / 100
R is clamped to 0 .. 0.8
```

`P` is the [Potency](/docs/mechanics/combat/spell-potency/#how-potency-is-built) of the cast. `Resolve` is the target's own
[defence against spells](/docs/mechanics/combat/spell-potency/#resist). A target above the cast resists more, a target below it
resists less. R then lowers both the chance and the duration:

```text
chance   = chance × (1 − R)
duration = duration × (1 − R / 2)
```

| S   | R from attributes |
| --- | ----------------- |
| 0   | 0%                |
| 50  | 25%               |
| 150 | 50%               |
| 300 | 67%               |
| 600 | 80% (the cap)     |

**Example.** A bestia has VIT 50 and STR 30, so S = 80 and R = 80 / 230 = 35%. Its Resolve equals the Potency of the
cast. A skill with a 30% chance to STUN for 3 s now stuns it with a 19.6% chance, for 2.5 s.

R never reaches 1, so attributes alone never make an entity immune. IMMOBILIZED cannot be resisted at all. An effect
without a resist pair always lands when the skill rolls it.

# Immunities

The mob key `status-immunities` lists the effects a species is immune to. Immunity is 100%: the effect never lands,
no matter the chance.

```yaml
status-immunities: [ STUN, FROZEN, POISON ]
```

A boss-tier species is immune to STUN, FROZEN, STONING, FEARED, CONFUSED, CONTROLLED and instant kill by default.
Without this a group could lock a boss down for the whole fight. See also
[Designing a Bestia](/docs/mechanics/bestias/bestia-design/#7-element-size-and-defences).

# No stacking

An effect never stacks with itself. When it lands again on an entity that already has it, it refreshes the duration.

# Channeling

A channeled skill runs on after its cast has finished. While it runs, the caster has the effect CHANNELING. The client
shows a channel bar in place of the cast bar.

- The caster cannot move or auto-attack.
- Damage, STUN, FROZEN, STONE or a move request ends the channel.
- Inferno, Blizzard, Great Exorcism and Sanctuary channel. They are long or very strong skills, so the caster pays with
  a risk.

# Concealment

HIDDEN and CLOAKED make an entity concealed. A concealed entity sends no updates to other players at all. The server
holds the updates back, not the client, so a modified client cannot see it either. Only its own player still sees it,
and for a bestia also its master. When it hides, other players see it vanish. When it is revealed, they see it appear.

- **HIDDEN:** the entity cannot move. Area attacks and ground zones skip it.
- **CLOAKED:** the entity moves 30% slower. Area attacks still hit it, and a hit reveals it.
- Both drain mana. Any attack, cast or item use ends them.

A concealed entity carries the Potency of the one who hid it. The skill Detect is the counter. It shows concealed
masters and bestias as dots on the minimap, but only within `range × Edge(P detect − P conceal)` of them. It does not
reveal them in the world. See [Concealment and Detection](/docs/mechanics/combat/spell-potency/#concealment-and-detection).

# All status effects

Internal bookkeeping effects, such as cooldown markers, are not in this list.

{{< statuslist >}}
