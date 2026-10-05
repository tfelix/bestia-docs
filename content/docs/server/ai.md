---
weight: 300
title: Artificial Intelligence
description: The NPC AI pipeline in zone-server — GOAP chooses and sequences goals, behaviour trees carry each step out, and five ECS systems drive perception, senses, drives, planning and execution.
---

NPC AI lives in `zone-server/.../ai/` and rests on one sentence:

> **GOAP chooses and sequences goals; behaviour trees carry each step out.**

Planning answers _what to do and in what order_. A behaviour tree answers _how to actually do this
one step_ — walk there, swing, wait, lie down. Neither is asked to do the other's job, which is what
keeps both small.

The package is layered so the bottom is domain-agnostic. `ai/core` knows nothing about creatures,
towns or combat; a **domain** supplies the vocabulary.

| Package                                     | Contents                                                                                                                                                                                              |
|---------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ai/core/state`                             | `StateKey` (typed, with a memory scope and an *observed* flag), immutable `WorldState`, live `Blackboard` with per-fact expiry                                                                        |
| `ai/core/behavior`                          | The execution contract: `BtNode`, `Status`, `BtContext`                                                                                                                                               |
| `ai/core/{action,precondition,effect,goal}` | Grounded `Action` (preconditions, effects, cost, a behaviour tree and a posture), `ActionTemplate`, `Goal`, and the priority DSL                                                                      |
| `ai/core/planner`                           | Forward-A\* `Planner`, `Plan`, and `EffectWriteBack`                                                                                                                                                  |
| `ai/bt`                                     | The tree library — sequence/selector/parallel, inverter/succeeder/repeat/cooldown, a Kotlin DSL, `Locomotion`, and parameterised leaves (`MoveTo`, `FleeFrom`, `Wander`, `UseSkill`, `Wait`, `Sleep`) |
| `ai/perception`                             | `PerceptionSystem`, plus a pluggable `Sense` mechanism and `SenseSystem`                                                                                                                              |
| `ai/ecs`                                    | The `AiAgent` component, the four systems that drive it, the agent factory and shared memory                                                                                                          |
| `ai/domain/bestia`                          | `BestiaDomain` — the keys, goals and action templates for creatures, plus `ActivityCycle`                                                                                                             |
| `ai/profile`                                | Archetype YAML under `resources/ai/*.yml`, and the player-facing standing order                                                                                                                       |

# The agent

`AiAgent` is one ECS component holding everything per-NPC: which archetype it came from, its goal
list, its action resolver, its `Blackboard` memory, an optional shared pack memory, and the plan it
is currently carrying out.

It deliberately does **not** sync to clients. AI internals never go on the wire; what a player sees
is the ordinary `Path`, `Position` and `Health` components the behaviour trees mutate, which
broadcast normally.

Two guards on it are load-bearing:

- **`hasPerceived`** — nothing plans before it has looked at the world. An empty memory is not a
  neutral starting point for a search; it is a set of unknowns the planner will happily resolve by
  _assuming_ an action's effects. A creature that did not know where it was would plan a journey home
  purely because arriving somewhere is the only way it could learn a position at all.
- **`nextThinkTick`** — planning is the expensive half, so agents are spread across ticks rather than
  all replanning on the same one.

# The pipeline

Six ECS systems in the `AI` phase, each in its own scheduler wave. They conflict deliberately — every
one of them declares the agent component as written — so each names the one before it in `after`, and
a test pins that arrangement.

```mermaid
graph LR
  L["AiDetailSystem<br/>every 1 s"] --> P["PerceptionSystem<br/>every 0.5 s"]
  P --> S["SenseSystem<br/>per sense"]
  S --> D["AiDriveSystem<br/>every 1 s"]
  D --> T["AiThinkSystem<br/>every 0.5 s"]
  T --> A["AiActSystem<br/>every tick"]
  A --> W["Path / Health / Animation"]
```

The times are per agent at full detail. Each system runs every tick but visits an agent only on its
turn, so the agents are spread over the ticks (see [Detail tiers](#detail-tiers)).

**Detail** decides how much processing each agent gets. The other stages only read it.

**Perception** is the only writer of observations — position, health, whether an enemy is in sight,
who and where the target is, whether it is night. It may also _clear_ a belief its observations
contradict, but it never asserts one.

**Senses** are the extension point. A sense is a Spring component with its own interval; the sense
system collects every one, folds their component reads into its own, and runs each on its own
cadence. Adding one costs no new ECS system and no new scheduler wave. The one that exists today is
foraging, which turns the world's biome raster into remembered feeding grounds.

**Drives** move the appetites that make a creature want anything at all — hunger, tiredness and
restlessness — integrating over real elapsed time, with sub-integer carry so a slow rate still
accumulates instead of rounding away to nothing. Tiredness runs _backwards_ while asleep, and
continuously rather than in one jump on waking, which is what makes an interrupted night mean
something: a creature woken halfway through wakes half-rested.

**Think** selects a goal every run, but only re-plans when the goal changed or the plan is spent. If
no plan exists for the chosen goal, that goal is set aside for 5 s and the next one is tried, up to
three per think. So a creature that cannot reach food still wanders or rests instead of standing still.
All agents that think on one tick share a budget of 5 000 search steps. Whoever is left when it runs
out thinks on the next tick. A search that has started always runs to its end.

**Act** ticks the current step's behaviour tree. On success it applies _that one action's_ effects
and advances; on failure it clears the plan so the next think cycle starts over. It also derives the
`Animation` component from the current step's posture and whether the entity is moving.

# Detail tiers

Most creatures in a zone are ones no player is looking at. They still live: a creature nobody sees
gets hungry, eats, sleeps and wanders. It is only processed less often.

| Tier         | When                                                   | Processed                                 |
| ------------ | ------------------------------------------------------ | ----------------------------------------- |
| `FULL`       | a player within 96 tiles, in a fight, or player-driven | at the full rate                          |
| `REDUCED`    | someone holds its chunk, but no player is near         | `throttle-factor` (4) times less often    |
| `BACKGROUND` | nobody holds its chunk                                 | `background-factor` (20) times less often |

Both factors are under `ambient-spawn` in `application.yml`. When a stage skips an agent, the agent
gets all the time that passed on its next turn. So hunger, memory timers and walks advance at the same
speed, only in bigger steps. An agent in the background tier also walks in coarse steps
(`CoarseMovement`).

**The floor.** A profile can set `min_detail: full`, `reduced` or `background` (the default). A world
boss can set `full` to keep its full rate when nobody is near. Only creatures the server fills the world
with (the `AiThrottleable` marker) may drop to `BACKGROUND`. Den mobs, `/spawn`ed mobs and player
bestias stay at `REDUCED` or higher.

**Spread over ticks.** An agent's turn comes on a tick picked from a hash of its id (`TickBuckets`).
So a hundred creatures do not all think on the same tick.

**Wake ticks.** A leaf that only waits (`Wait`, `Sleep`, `Labour`, the pause in `Wander`) tells the act
stage when it next has work. The act stage leaves the agent alone until then, unless a new plan
arrives. A sequence or selector passes this on only from its first child, because it re-checks the
earlier children on every tick. `UntilHour` caps the wake at half a second, so the hour is still checked
as often as perception updates it.

# Four rules worth knowing before touching any of it

1. **Perception owns observations; effects own beliefs.** A key marked _observed_ may be **simulated**
   during the A\* search — a walk action has to be able to imagine arriving — but the write-back
   refuses to persist it afterwards. That distinction is what stops an agent believing what it merely
   planned.
2. **Effects apply on observed success**, one action at a time, not for a whole plan at plan time.
3. **Nothing plans before it has perceived.** See `hasPerceived` above.
4. **A goal whose desired state already holds is skipped.** So a behaviour that should _persist_ while
   some condition lasts needs a belief key that stays unsatisfied throughout it. A tiredness ceiling
   alone is already met by a well-rested animal, so without such a key a diurnal creature would amble
   about all night; a `RESTED` latch, cleared by perception for as long as the resting phase lasts,
   is what makes it sleep instead.

# Restlessness, and why idling is an ordinary goal

Wandering has no naturally unsatisfiable state: its desired state either holds before any step is
taken — so the planner, which only selects goals that are _not_ already satisfied, would never pick
it — or holds forever after one step, so it would never run again. Earlier code worked around that
with a reflexive fallback outside the goal system entirely.

Modelling boredom as just another rising drive removes the special case. Restlessness climbs while
the creature has nothing better to do, the wander goal becomes available and genuinely unsatisfied, a
bout of ambling spends it, and it climbs again. Any domain that needs a floor behaviour should reach
for the same trick.

# Profiles

`resources/ai/*.yml` holds one archetype per file, loaded and **fail-fast validated** at boot — a typo
in a goal or action id surfaces as a boot failure, not as a creature that stands still in production.

YAML **selects and tunes**; it cannot express behaviour:

```yaml
identifier: passiv_day_active
faction: critters
activity_cycle: diurnal        # sleeps at night
perception:
  sight_radius: 7
  aggro_memory_seconds: 30     # how long it keeps chasing whoever hit it
wander_radius: 10
hunger_threshold: 60
aggression: 60
goals:
  - { name: KillAttacker }
  - { name: Sleep }
  - { name: EatVegetation }
  - { name: Wander }
actions: [approachTarget, attack, walkToVegetation, eatVegetation, sleep, wander]
attacks:
  - { id: bite, range: 1, cooldown_seconds: 2.0 }
```

A goal's _priority formula_ — the considerations and response curves that scale it with hunger,
health or aggression — lives in Kotlin next to the goal, in a small DSL. That is a deliberate
narrowing of an older format which let YAML assemble considerations out of input/curve/weight triples
resolved through two bean registries. It costs a rebuild to retune a curve and buys type safety, one
fewer indirection when a mob misbehaves, and a much smaller surface to validate — which matters most
for player-supplied configuration, where the only thing a player can move is a base priority and
every value has to be clamped.

A profile's numbers are written into the agent's memory as permanent facts when it is attached, so
goal availability and priority read them exactly the way they read hunger or position. There is one
place each number lives.

Three archetypes ship today: an aggressive melee hunter that flees when hurt, a passive grazer that
runs early, and a day-active grazer that never flees but comes after anyone who hits it. The absence
of a goal _is_ the temperament — a creature cannot want what its profile does not list.

# Player-owned creatures

A player's own bestia carries a standing order alongside its archetype: an idle stance plus two
clamped knobs. A stance **narrows** the archetype's goals and never widens them — it can switch off
foraging, but it cannot teach a creature to hunt if its species never could. Player-controlled
entities are skipped by the think system entirely.

# Adding to it

**A sense** (something creatures notice): implement the interface as a Spring component, give it an
interval, and declare the components it reads. Write facts through the sense context, which routes to
the individual, pack or world board according to the key's memory scope.

**A behaviour**: add a state key, a goal with its priority formula, and an action template that
grounds concrete actions _together with their behaviour trees_; then name the goal and action ids in a
profile.

**A whole new kind of NPC**: that is a second _domain_, not a second pipeline. See
[Townsfolk & Settlement Simulation](/docs/server/townsfolk/), which adds one for town inhabitants and
describes the small seam in the agent factory, the drive system and the profile registry that lets two
domains coexist.
