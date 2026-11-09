---
weight: 260
title: Structure Collision
description: How player-built walls, floors and stairs block movement, sight and water on the server - a sparse cell overlay beside the terrain voxels, merged into the walk table. Alternatives, the chosen design, slices and performance targets.
---

{{< alert context="info" text="Slice 1 (walls, floors and stairs block movement) is being built. Everything after it is design only." />}}

Players build houses, towers and castles from **modular pieces**: walls, floors, stairs, ramps, ladders,
roofs, pillars and beams. The server must respect these pieces. A wall stops a player, a mob and an arrow.
Stairs lead to an upper floor. A castle under siege loses pieces every second.

This page is about the **server** side of that. The client draws each piece as a hand-made mesh. It only
needs the collision data to predict its own steps.

# Requirements

| Topic | Decision |
|---|---|
| Pieces | Modular. Snapped to the 1 m grid. Rotated in 90° steps. |
| Blocks | Movement of players and mobs, line of sight of attacks and spells, AI perception. |
| Not blocked | What a client is sent. A player behind a wall is still sent to everyone in range. |
| Floors | Stairs, ramps, ladders, bridges and balconies. One tile can hold several walkable levels. |
| Step height | 0.5 m onto or between built pieces. Terrain keeps its slope rule. |
| Destruction | Each piece has HP. A piece without support collapses. Digging away the ground under a piece destroys it. |
| Scale | Castles and sieges: thousands of pieces in a small area, destroyed often. |
| Later | Roofs give shelter, walls hold back flood water, wooden pieces burn, town buildings get real walls, mobs break walls they cannot path around, big mobs do not fit through 1 m gaps. |
| Out of scope | Doors. The design leaves room for public and owner-only doors. |

## Why a separate step height

The terrain step comes from the slope rule: a step may rise `1 m × tan 60° ≈ 1.73 m` per tile. That is a
steep but fair hillside. On a built floor it is wrong. A master could step onto a 1.5 m table, and stairs
would not need to be stairs.

So a step where **either end is a built surface** may rise at most **0.5 m**. A stair piece rises 0.5 m per
tile. A 3 m storey takes six tiles of stairs, or a stair that turns.

# Alternatives

| | Idea | Strong at | Weak at |
|---|---|---|---|
| **A. Structure voxels** | Pieces write a new `STRUCTURE` block type into the terrain edit layer. | Least code. Walking, water, shelter and client prediction work at once. | Walls are 1 m thick. A 1 m fence is stepped over. A voxel has no owner piece. Every destroyed piece is a journal write, a chunk patch and a rebuild on the tick. Grass, ground height and prop support would read a roof as ground. Uses one of the two free palette ids. |
| **B. Structure cell overlay** | A sparse layer of 1 m cells beside the terrain. Merged into the walk table. | Thin walls on tile edges. Each cell knows its piece. Rebuilds stay on worker threads. Doors fit as a conditional edge. Terrain stays clean. | More code. The client needs the same rasterizer. Water, shelter and fire must each read the overlay. |
| **C. Geometric colliders** | One oriented box per piece in a bounding volume tree. Queried on every step and every ray. | Any rotation, any size. | Walking on upper floors needs surfaces baked from the boxes anyway, so it becomes B plus a box query per step. Slow in sieges. |
| **D. Navigation mesh** | A Recast mesh per tile, rebuilt on change. | Agent radius for big mobs is built in. | Does not fit tile movement or client prediction. Line of sight still needs its own solution. A large dependency. |

**We build B.** It is the only option with thin walls, piece identity, worker-thread rebuilds and per-entity
doors together. A stays the fallback if we ever accept 1 m thick walls.

# The cell overlay

## Pieces and cells

A piece kind lists its **cells** in local coordinates. A cell is one 1 m voxel position and has:

- a **shape**: `SOLID` (fills the cell) or `FLOOR` (filled from the bottom up to a top fraction),
- **edge walls** on its north, east, south and west border, each with a vertical band.

A piece kind also has flags: blocks movement, blocks sight, blocks water. And a material and HP.

The **rasterizer** turns a placed piece (kind, origin, quarter turns) into cells, split by chunk. It writes
an edge wall on **both** cells next to the border. So a walk table build never needs to look into the
neighbour chunk.

A wall is an edge, not a cell. A 4 × 4 room has a 4 × 4 floor inside, not 2 × 2.

A quarter turn turns a piece the way the client turns a model by the same yaw: x+ becomes y−. The client
keeps its own copy of the pieces and the rasterizer, to predict steps. Both are checked against one golden
file, `structure-cells.golden.json`.

The first pieces, from `structure-pieces.yml`:

| Piece | Cells |
|---|---|
| Wall | 2 m wide, 3 m high, on the x+ border of its cells. |
| Floor | 2 × 2 m, half a cell thick. On the ground it is a half step up. |
| Stairs | 1 m wide, 6 tiles long, rising 0.5 m per tile to 3 m. |

A storey is 3 m: a floor stands at 0.5, the next one at 3.5, and six tiles of stairs connect them.

## Walk table

The walk table (`WalkableTile`) already holds several standing surfaces per column: cave floors, bridges,
building floors. It is built from the merged terrain voxels. Now it also reads the overlay:

- A structure cell counts as solid, with its top fraction. This is the same rule as a partly filled voxel.
- Each surface remembers whether it stands on **terrain or a structure**. That decides the step height.
- Each surface gets an **exit mask**: four bits, one per side. A bit is set when an edge wall overlaps the
  agent's body, `[surface, surface + height)`. A 1 m fence on an edge blocks. A 3 m wall blocks. A wall
  that starts above the head does not.

A step between two columns now checks the exit masks of both surfaces, then the height.

**Diagonals:** a diagonal step is allowed only if both orthogonal steps around it are allowed too. Without
this rule, a player walks through the corner where two walls meet. The rule also applies to terrain, so the
client changes with it.

## Rebuilds

`StructureCellIndex` holds the cells per chunk on the tick thread. A change to a piece:

1. updates the cells,
2. takes an immutable snapshot of that chunk's cells,
3. marks the walk tables of the touched chunks as dirty.

The walk table is then rebuilt by the existing queue, on a worker thread, from the snapshot. A structure
change does not touch the terrain's revision or edit journal.

Slice 1 rebuilds the whole chunk. A siege needs a cheaper path: rescan only the touched columns
(slice 5).

## Line of sight

A lazy bit set per chunk: one bit per voxel, set if the voxel or a structure cell blocks sight. 32 KB per
chunk. A ray walks through it with the Amanatides-Woo algorithm, one voxel at a time, and also checks the
edge walls it crosses. This replaces today's stub, which always answers "yes".

## Doors, later

A door is an edge with a third state: **passable for some**. The step check gets the moving entity, and asks
the door's state and owner at query time. Opening a door never rebuilds a walk table.

# Slices

Each slice is one branch and one pull request, stacked on the previous.

1. **Collision core.** Walls, floors and stairs block movement and lead to an upper floor. Server rules and
   client prediction agree. Pieces are drawn as the cells they block until they have models. Still open: kit
   items and a build mode that can place a piece above the ground, and re-grounding whoever stood on a piece
   that is removed.
2. **Line of sight** for attacks and spells, terrain included.
3. **AI perception** through line of sight, cached per observer and target for a few ticks.
4. **HP, support, undermining.** Pieces take damage and die. Support is a search down to the ground. A piece
   whose ground is dug away collapses. Collapses have a budget per tick.
5. **Siege performance.** Rescan only touched columns. Decide if a piece is one entity, or a whole structure
   is.
6. **Ladders.** A vertical link between two surfaces in one column.
7. **Big mobs.** A clearance value per surface, or one walk table per body size.
8. **Water, shelter, fire** read the overlay.
9. **Town buildings** are made of the same pieces.
10. **Doors and wall breaking.** A mob may plan through a breakable edge at a high cost, and then attacks it.

# Performance targets

| Target | Measured by |
|---|---|
| A step check under 200 ns. A diagonal at most 3× that. | `zone.nav.local.duration` and a calibration test |
| A snapshot under 0.1 ms per chunk. Structure chunks rebuild on workers. | `zone.chunk.step.duration{step="derived"}`, `zone.chunk.worker.duration` |
| A change is walkable within 2 ticks. | `zone.structure.rebuild.lag` (new) |
| No rebuild budget exhaustion at 50 destroyed pieces per second (slice 5). | `zone.chunk.budget.exhausted{budget="derived"}` |
| A 30 m ray under 2 µs. 1000 rays per tick under 2 ms (slice 2). | calibration test |
| About 100 KB per chunk at 2000 pieces. | `zone.structure.cells` (new) |
