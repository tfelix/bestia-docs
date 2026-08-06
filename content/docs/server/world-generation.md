---
weight: 600
title: World Generation
description: The worldgen pipeline that builds Bestia's terrain — 23 stages from plate tectonics through settlements — how it's stored, how it's kept secret, and how chunks stream to clients.
---

World generation lives in its own Gradle module, `worldgen/` — a pure-function pipeline over data, with no
Spring, no JPA, and no I/O (the one exception, `viewer/`, is dev tooling for inspecting a generated world, not
part of the running server; a build-time check fails if anything else in the module gains a dependency or
touches the filesystem). `zone-server` links it and owns the one thing `worldgen` deliberately doesn't: a
running world with a database row and a socket to serve it over.

# What's implemented

Almost all of it. 23 world-tier stages run end to end — tectonics, climate, erosion, glaciation, hydrology,
volcanism, biomes, vegetation, resources, caves, mana, habitability, settlements, history, corruption,
points of interest, town layout, economy, spawners, and the macro navigation graph — plus chunk
materialization, RLE encoding, delta tracking, baking, and streaming to `zone-server`. The genuine gaps, as
of this pass:

- **No delta persistence.** Player edits live only in the running server's memory (`ChunkStore`, backed by an
  in-process `MemoryBlobStore` for baked chunks). A restart currently loses them — see
  [Storage](#storage-voxels-chunks-player-edits-and-regeneration) below for why this is safe to *say* plainly
  rather than a bug to hide.
- **No client-side base generation.** The wire format, base hashing and version gate that would make it safe
  exist; nothing generates terrain client-side yet, so every chunk is sent fully merged.
- **No disk or object-store cache tier.** `ChunkCache` chains against `ChunkBlobStore` implementations, and
  only an in-memory one exists.
- **The catalogues are still code, not data files.** `BusinessCatalogue`, the biome prototype table,
  `Culture.ALL`, `Names.STYLES` are Kotlin objects. A designer changing one needs a rebuild. (Individual stage
  *parameters* — roughly 220 of them — mostly already load from a params-text file; see
  [Parameters](#parameters).)
- **Derived structures have one real reader.** `WalkableTile` backs zone-server's local pathfinding.
  `OpacityGrid` and `ColumnSummary` are kept fresh on every edit and queried by nothing yet.
- **`WorldWrap`'s coordinate math has four callers** (chunk streaming, spawn-point search, the sea-lane cost
  field, bestia spawn placement). Movement, interest management and pathing still use naive subtraction, so
  two players a few metres apart across the world's wrap seam read as a world apart.
- **Sharding, a work queue, a gRPC surface** for a distributed generator are deliberately not here — that's
  the server's concern, not a pure function's.

# The pipeline

Twenty-three stages, each declaring only what it reads (`Stage.dependencies`) and what it produces
(`Stage.outputs` — raster layers, vector features, the history log, or the navigation graph).
`WorldGenPipeline` topologically sorts them by that declaration and computes a version vector per stage (its
own version folded with every upstream one), so retuning erosion invalidates erosion and everything
downstream while leaving tectonics — the expensive part — untouched. After every stage runs, the pipeline
diffs what it *declared* it would produce against what it actually wrote; a mismatch is a hard failure, not a
silent pass-through.

```mermaid
graph LR
  T[tectonics] --> C[climate]
  C --> E[erosion]
  E --> G[glacial]
  G --> H[hydrology]
  H --> AL["alluvium, volcanism"]
  AL --> BP["biomes, pond"]
  BP --> CMV["caves, mana, vegetation"]
  CMV --> R[resources]
  R --> HA[habitability]
  HA --> S[settlements]
  S --> HI[history]
  HI --> COP["corruption, poi"]
  COP --> STV["spawners, towns, vegetation_stands"]
  STV --> EC[economy]
  EC --> NG[nav_graph]
```

The order stages are *constructed* in (`StandardWorld.stages()`) is cosmetic — the pipeline sorts by declared
dependency regardless, and this has bitten the module for real once already: for most of its life,
`GlacialStage` and `HydrologyStage` were undeclared siblings that only ran in the right order because the
topological sort's alphabetical tie-break happened to put `"glacial"` before `"hydrology"`. A glacial trough
carves the ground absolutely, so every stage below hydrology was quietly reading a coarse surface a finished
chunk would later carve hundreds of metres out from under it. Declaring the dependency turned an alphabetical
accident into a guarantee — and, as a side effect, gave the world its first lakes, because the priority-flood
in hydrology had never once been handed a genuinely closed basin before the carve reached the raster.

| Stage | Emits | Why it sits where it does |
| --- | --- | --- |
| `tectonics` | elevation, plate id, rock hardness, faults, hotspots | root; nothing to depend on |
| `climate` | temperature, precipitation (4 seasonal fields), distance to ocean | needs tectonic elevation for the orographic sweep |
| `erosion` | eroded elevation, sediment, tectonic basins | stream-power erosion needs precipitation |
| `glacial` | **final** elevation, ice thickness, troughs/fjords/cirques/moraines | sole producer of final `ELEVATION`; carves last |
| `hydrology` | flow routing, discharge, lakes, river channels | routes over the *final*, ice-carved surface |
| `volcanism` | volcanism field, vents, lava pools | craters must exist before biomes read distance-to-crater |
| `biomes` | biome + secondary biome + confidence, soil | classifies on climate + hydrology + volcanism |
| `pond`, `alluvium` | moraine-dammed lakes; alluvial fans, deltas | sub-kilometre shapes the raster can't hold, fed from hydrology/erosion's own budgets |
| `vegetation` | canopy cover | kilometre summary of the same density function the chunk tier's scatter uses |
| `resources` | ore/mineral deposits | geology-driven placement |
| `caves` | cave systems, passages, entrances | reads the chunk tier's own rock tuning directly |
| `mana` | mana density | must precede history; corruption must follow it |
| `habitability` | settleability score, movement cost | needs biomes + resources + terrain |
| `settlements` | settlement sites, roads, bridges, sea lanes | placed before history judges them |
| `history` | the chronicle; ruins, tombs, monuments, forts, mines, monasteries, lighthouses, shrines, wound sites | dates/holds/burns settlements already placed — does not place them |
| `corruption` | corruption field | suppresses by the settlements history left standing |
| `poi` | points-of-interest landmarks | reads settlements + sites + cave mouths to avoid them |
| `spawners`, `towns`, `vegetation_stands` | bestia spawn points; street/building/district layout; vegetation stands | read corruption; `vegetation_stands` specifically needs corruption, which is why it isn't in `bio/` next to `vegetation` |
| `economy` | businesses, roadside inns | needs the finished town layout |
| `nav_graph` | the macro navigation graph | last — reads roads, bridges, gates and cave mouths everything above finalised |

# Parameters

Roughly 220 tunables across ~20 `*Params` data classes, threaded through one `WorldParams` object so a params
file is a change in one place rather than twelve constructor calls. Most stage parameter classes already load
from a flat, dotted-key text format (`core/ParamsText.kt` — line numbers, duplicate detection, nearest-key
typo suggestions); a handful of prefixes aren't wired to a loader yet, and asking for one of those from a file
says so explicitly rather than pretending the key doesn't exist.

Four numbers are deliberately **not** settable independently, because two stages have to agree on them: the
ocean margin (tectonics carves it, erosion has to re-apply it after 45 timesteps of uplift), the habitability
terms (read by both habitability and settlement scoring), and the settlement grading limits and chunk-detail
noise (read by both settlement and town layout). `WorldParams.resolved` forwards each from the one stage that
owns it, rather than letting both default independently and silently disagree.

```kotlin
// worldgen never reads a file itself (no I/O outside viewer/) - the caller reads the text and hands it
// over as a String; only the caller (here, hypothetically, zone-server) touches the filesystem.
val text = ParamsText.parse(File("mars.worldgen.txt").readText(), origin = "mars.worldgen.txt")
val params = WorldParams.load(text) // falls back to WorldParams.DEFAULT for any key the file doesn't set
val world = StandardWorld.build(
  WorldConfig(seed = 42L, widthCells = 512, heightCells = 512),
  params = params
)
```

Every tunable that reaches a version number at all is split into two kinds, and mixing them up is the module's
most-repeated caution to itself:

- **`Stage.version`** — bump for a **code** change. Reaches the RNG (`GenRng.derive` hashes
  `(seed, stageId, stageVersion, coordinates...)`), so bumping it reseeds that stage and everything downstream —
  which changes *which seeds* expose a latent bug, not just the terrain. Reserved for real behaviour changes,
  never for retuning a constant.
- **`Stage.paramsVersion`** — a fingerprint (`ParamsDigest`, hashed by field name, sorted) of every *value* the
  stage reads. Never reaches the RNG, so retuning a number moves the version vector and the chunk cache key but
  leaves the actual terrain shape alone for a fixed seed — "change one number and look at the same world."

Every stage is currently at version 1 — reset once nothing had shipped, drifted for a few stages as real code
changes landed, and was reset again in this cleanup pass for the same reason: still pre-release, still no
counterparty for the compatibility promise a version bump makes.

# Storage: voxels, chunks, player edits, and regeneration

Four things exist, at three different lifetimes. Conflating them is the most common way to misdescribe this
system, so this section is deliberately explicit about which is which.

**1. The world tier** (rasters, vector features, the chronicle) is a pure function of `(seed, WorldConfig)`.
Never stored anywhere — regenerating it costs milliseconds to low single-digit seconds depending on world
size (see [Benchmarks](#benchmarks)), so persisting it would only be persisting a cache. Held in memory for
the life of the server process.

**2. A generated chunk base** is also a pure function — of the world tier plus a chunk coordinate — so it is
also never *durably* stored, only cached: an in-process LRU (`ChunkCache`, 512 hot chunks by default —
roughly what a handful of players in view distance need) in front of an optional chain of `ChunkBlobStore`
tiers holding RLE-encoded bytes. The cache key folds in `(seed, pipelineVersion, chunkCoordinate)`, so
retuning any stage changes every key at once — nothing stale can ever be served, and no explicit invalidation
pass is needed.

**3. Player edits are a sparse delta on top of the base**, and this is the one piece of world state that is
**not currently durably persisted anywhere**. `ChunkDelta` holds, per touched voxel, how much of it is left —
never a block id, because it's derivable: unchanged material is whatever the generator put there, and carved
to nothing is `AIR`. Three consequences follow directly from there being no building system, only removal:

- **No block id is stored.** The voxel that still has material keeps the generator's material.
- **Occupancy only ever falls**, enforced by the one party (`ChunkStore`) holding the base to compare a
  removal against — a removal that would *raise* occupancy is a placement system arriving by accident and is
  refused outright.
- **A voxel appears once**, keyed on position rather than logged, so mining the same spot across many
  swings costs one entry, not one per swing.

Every read goes through one path: `ChunkStore.merged(chunk)` returns the baked blob if the chunk has one,
otherwise the cached/generated base with any delta applied. There is deliberately no API that hands out an
unmerged base to a caller that might be authoritative over anything — line of sight, projectile collision and
movement validation all need the server's own merged view, and a client-authoritative alternative is the
single most exploited bug class in multiplayer voxel games.

**Baking**: once a chunk's delta reaches roughly the RLE-encoded size of its own base — which, because a
removal costs about 3 bytes and a mostly-solid base compresses far better than that, happens around 3% of
the chunk edited, well before the 30%-coverage backstop that exists only for chunks whose base is unusually
large to begin with — the merged result is written back as the *new* base and the delta is dropped. Heavily
mined or built-up ground gets **cheaper** to serve from then on, not more expensive, because nearly-air or
newly-uniform ground run-length-encodes to almost nothing. Baking is also the only safe migration path across
a pipeline version change: bake every outstanding delta first (which pins the current terrain as the new,
frozen base), then ship the new generator; every untouched chunk simply regenerates against the new version.

**4. The world's identity** — name, seed, dimensions, `wrapX`/`wrapY`, and the three-part version vector below
— is the one thing genuinely persisted today, as a real JPA row (`PersistedWorld`). A hash over every field
that decides terrain shape (`shapeVersion`) is stored alongside it and recomputed from the row on every boot,
specifically so a field that matters to generation and was never given a database column shows up as a
mismatch rather than as a world that silently regenerates slightly wrong forever (this caught a real bug once:
`wrapX`/`wrapY` decided the coastline and had no column for as long as the row existed).

Three independent numbers gate whether a client may generate its own chunk bases at all —
`pipelineVersion` (did the stage graph or its parameters change?), `blockPaletteVersion` (a hash over the
block id→name mapping — same terrain, different rock), and `chunkFormatVersion` (the RLE wire format). Three
separate numbers rather than one, because each breaks a payload a different way and the fix a client needs to
hear is different for each. `chunkFormatVersion` mirrors `RleCodec.VERSION`, the one version number in the
module that is *not* part of the pre-release reset above — it is a literal name
(`CHUNK_ENCODING_RLE_V2`) baked into `chunk.proto`, a real statement between two build artefacts rather than
bookkeeping with no counterparty yet.

```kotlin
// The only two calls a caller needs — read is always merged, write is always a batch.
val chunk = chunkStore.merged(ChunkPos(3, 4, 0))
val outcome = chunkStore.carve(ChunkPos(3, 4, 0), removals) // removals: packed (voxelIndex, remainingOccupancy)
// outcome.changed == 0 means nothing actually changed - don't announce a patch or bump a revision
// outcome.baked == true means this carve just replaced the delta with a new, frozen base
```

# Biome motivation

21 biomes today, classified by weighted distance to the nearest of several prototypes over seven normalised
axes (temperature, precipitation, seasonality, temperature range, elevation, slope, wetness) — deliberately
**not** a Whittaker-style lookup table, because a table partitions climate space into rectangles, and
rectangles read as dead-straight biome boundaries on a map, which no real landscape has. A nearest-prototype
classifier's boundaries follow the shape of the climate instead, and the runner-up's score doubles as a blend
weight for soft transitions — though it needs a cutoff and a coherent dither field before it's usable as one;
raw, its calibration is not close to 0–1 (median 0.066 among cells with any runner-up at all), so using it
directly produces a near-uniform 50/50 checkerboard at every boundary rather than a gradient.

A few of the biome table's shapes are worth knowing the reasoning behind, not just the result:

- **`litter` and `canopy` are deliberately uncorrelated axes.** Litter feeds soil fertility (dead organic
  matter); canopy is per-cell tree probability. Grassland is one of the best litter producers in the table
  (0.7) and is nearly treeless (0.05 canopy) — conflating the two would put a forest on every prairie.
- **`DRYLAND` replaced three biomes that measured out as one place under three names** — former `STEPPE`,
  `SHRUBLAND` and `SAVANNA` shared soil, cap, and movement-cost tables and differed only in how many trees
  stood on them, which is exactly what `canopy` already expresses continuously. Measured land shares before
  the merge were 0.6%, 21.2% and 1.4% — two of the three names covered almost nothing.
- **`BOG` and `SWAMP` are a temperature split of a single former `WETLAND`.** A boreal mire and a tropical
  swamp are close to opposite ecosystems — one preserves organic matter because it's cold and anoxic, the
  other rots it because it's warm — so one biome for both was wrong everywhere a consumer asked what grows
  there. No third, intermediate biome between them by design: a temperate marsh would be the arithmetic mean
  of the two, owning nothing either doesn't already.
- **A separate `CLIFF` biome was deleted outright, not merged.** It wasn't really a biome — a single slope
  threshold that capped everything under it in one grey `GRAVEL` regardless of what was actually there,
  making an ice cliff, a desert scarp and a granite crag indistinguishable. Steep ground keeps its climatic
  biome now; how bare it looks is a separate, voxel-scale question answered from the *materialised* surface
  gradient, which can see a fjord wall a vector feature cut and a kilometre-averaged raster cannot.
- **Volcanic biomes have no climate prototype at all** — the classifier's seven axes can't see a lava vent,
  and giving one a prototype would claim volcanic ground has a characteristic climate, which is backwards:
  there are volcanoes under ice caps and in deserts. They're placed by raw distance to a vent instead, sized
  in real metres rather than scaled to world size — a volcano is 10–30 km across on Earth and should be that
  size on a small world too, or a small world's volcanoes would end up wider than its mountains are tall.
- **Beaches, badlands and riparian corridors are distance transforms, not classifier output** — biomes driven
  by adjacency to ocean or to a river rather than by climate, which is why none of them has a table entry
  either.

# World size, wrapping, and scale

Genesis, the server's default world, is 128 km across. `zone-server` boots it, and every world size in
between the smallest anything is tested at and the multi-minute 4096 km world the module's design space
allows for is supported the same way — nothing in `WorldConfig` requires a power of two, a multiple of the
chunk edge (32), or a multiple of the climate-coarsening factor (4); `detailScale`, the ocean margin, and
`climateResolutionFor` are all continuous functions of the world's extent. A dedicated test suite
(`WorldSizeSanityTest`) builds worlds at 96, 150, 200, 337 and 600 cells — none of them round numbers — and
runs the full generation-invariant battery against each, specifically to catch anything that only breaks at
an awkward size.

`WorldConfig.detailScale` compensates for genuinely small worlds: most interesting terrain features are
gated on absolute size (a river needs on the order of a hundred square kilometres of catchment before it
cuts a channel), so a 128 km world scaled 1:1 against thresholds tuned for a 512 km reference world comes out
as a plain with a stream on it. `detailScale` divides length/area thresholds so a small world earns its
features anyway — deliberately unphysical, capped at 8, where river networks start looking like a fractal
mat instead of a landscape. It's computed fresh from the config every time rather than stored, since a stored
value goes stale the moment `copy()` changes the world's dimensions without updating it.

What does *not* scale with `detailScale`: settlement density. Terrain wants to be denser on a small world; the
number of places worth walking to does not, so `cityTarget` is a flat density (`worldArea / areaPerCity`) —
measured, 512 km gives roughly 292 settlements and 1024 km roughly 1171, almost exactly 4× for 4× the area.

The world wraps on X by default (Y is off by default — temperature is a linear ramp in latitude, so a Y-wrap
walks one pole into the other; Genesis turns it on anyway because the alternative is a wall a player can walk
into, and the discontinuity lands inside the same ocean margin that hides the X seam, in unreachable polar
sea). Both seams hide inside a 2.5 km underwater margin forced around all four edges — a flat distance rather
than a share of the world, because what it has to beat is the client's view distance, which has nothing to do
with how big the world is.

# How many worlds are there

The world seed is a `Long` — the full 64-bit range, drawn via `kotlin.random.Random.nextLong()` with no
masking or narrowing when none is configured — so the seed space alone is 2⁶⁴, about 1.8 × 10¹⁹. Since none of
a world's other parameters (dimensions, wrap flags, detail scale, and so on) feed the random-number generator
at all — only the seed does — every one of those roughly 1.8 × 10¹⁹ seeds produces a genuinely different
world for a fixed configuration, and changing the configuration on top of that makes the space of distinct
*generatable* worlds unbounded in practice (dimensions and the continuous tunables in `WorldParams` have no
finite bound). In practice, exactly as many worlds exist as a deployment chooses to run — one, for
`zone-server` today (`Genesis`).

That number matters for a reason beyond curiosity: because `worldgen` is open source and regenerates a whole
world — every ore deposit, cave hoard, and ruin included — offline in well under a second, the seed itself is
the only thing standing between a player and every secret the map holds before they've explored an inch of
it. The seed is deliberately never transmitted to the client (`WorldInfoSMSG` excludes it by explicit design
comment on both the Kotlin and `.proto` side), and no admin/REST endpoint or chat command exposes it. The one
real gap found in this pass: the shipped `application.yml` pins a fixed, public development seed with no
documented production override path — now documented next to the value itself and on `WorldGenConfig.seed`.
A real deployment must leave it unset (which draws a fresh one at random on first boot) or supply it from a
non-committed, environment-specific source, before the world's first boot — the seed is permanent in
`PersistedWorld` from that point on.

# Chunk materialization and streaming

At request time (`core/ChunkHeightSampler.kt` → `voxel/ChunkMaterializer.kt`): sample the base raster, apply
every vector feature touching the chunk in priority order (river channels, trough cross-sections, settlement
grading, town structures), then stratify into voxels using rock hardness and soil depth. A voxel carries a
material *and* an occupancy fraction (0–255), not just a material — a surface at 40.3 m is genuinely 30% of
the voxel spanning 40–41 m, and the client's Surface Nets mesher (see
[World & Terrain](/docs/client/world-terrain)) reconstructs that to a fraction of a centimetre rather than
snapping to the nearest whole voxel. Carving (removal, whether by a player mining or by generation cutting a
mine shaft through its own masonry) is written last, in a second pass over the same buffer — additions have
to exist before a hole can be cut through them.

`world/stream/` on the zone-server side owns the running world's `ChunkStore` and streams merged RLE chunks
to clients over dedicated `bnet-messages` (see [Networking](/docs/server/networking)): a `ChunkManifestSMSG`
announces `(position, revision)` pairs for a player's view volume, the client asks only for what it doesn't
already hold, and edits travel afterward as small `ChunkPatchSMSG` diffs fanned out to that chunk's
subscribers as retained buffer duplicates — thirty players near a ten-voxel edit cost about 1.5 kB between
them, not thirty re-sent chunks. Base-plus-delta transmission (sending a hash plus the edit list for an
untouched chunk, instead of the full terrain) is designed for but deliberately not turned on: it requires the
client to regenerate bit-identical base terrain, and the Godot client is C# — a different floating-point path
from the server's Kotlin/JVM one — which is exactly the case that makes shipping this without real bandwidth
numbers to justify it dangerous.

Alongside the voxels, `derived/` maintains cheap, incrementally-updated structures so hot paths never touch
raw voxels directly: `WalkableTile` (per-column walkable spans for a given agent's step/slope profile) and
`OpacityGrid` (a downsampled, occupancy-weighted line-of-sight grid). Both are kept fresh on every edit
through a per-tick rebuild budget, so an edit never stalls the tick that caused it — a query in the meantime
returns the stale structure, which is the right trade: an NPC walking through a doorway that closed two
hundred milliseconds ago is an artefact nobody files a bug about, and a tick-thread hitch every time somebody
places a fence is one everybody does. `WalkableTile` is the one of the two with a real reader today —
zone-server's local pathfinding queries it directly.

# Benchmarks

World-tier build time, one JVM, one rep, measured serial against parallel (`./gradlew :worldgen:bench
-Pcells=N`; 16 workers on the measuring machine). This is the world tier only — tectonics through nav-graph —
not any chunk materialization, which happens per-chunk on demand and separately (a single chunk materializes
in well under a millisecond).

| World size | Serial | Parallel | Speedup |
| --- | --- | --- | --- |
| 32 km | 58 ms | 43 ms | 1.35× |
| 64 km | 210 ms | 150 ms | 1.40× |
| 96 km | 511 ms | 291 ms | 1.76× |
| 128 km (Genesis) | 676 ms | 334 ms | 2.02× |
| 192 km | 892 ms | 617 ms | 1.45× |
| 256 km | 1.61 s | 1.08 s | 1.49× |
| 512 km (reference) | 15.1 s | 7.4 s | 2.05× |
| 700 km | 52.1 s | 27.4 s | 1.90× |
| 1024 km | 122.9 s | 94.7 s | 1.30× |

The reference 512 km world builds in a few seconds and stays comfortably under Genesis's own boot budget; a
1024 km world is a minute and a half even in parallel, which is squarely a "behind a progress bar" size
rather than a "boots with the server" one.

**Parallelism helps less as the world gets bigger, not more — and one stage is why.** `pond` (moraine-dammed
lakes and oxbows) took 1.0 s at 512 km, 10.3 s at 700 km, and 50.3 s at 1024 km — for 1.9× and 4× the *area*
respectively, that's roughly 10× and 50× the time, and it does not parallelize at all at that size (1.00× and
1.01× speedup, against the whole pipeline's 1.90×/1.30×). At 1024 km it alone accounts for 41% of the total
build. This is reported as a measurement, not yet a diagnosis — consistent with this module's own habit of
measuring before reasoning about a constant, the cause hasn't been isolated here and the fix, if one is
needed, belongs to a change that can watch the number move. `towns` shows the opposite oddity: 28.1 s at both
700 km and 1024 km, essentially flat despite the larger world — plausibly a cap (settlement count, or
`TownParams.maxBuildingsPerSettlement`) saturating rather than a bug, but likewise unconfirmed here.

For curiosity: extrapolating the 512→1024 km ratio (naively, ignoring the `pond` anomaly above) puts the
design space's 4096 km world at several minutes serial — which is exactly why the module treats "boots with
the server" (128 km) and "generates while you watch in a viewer" (512 km) as the two sizes that matter in
practice, and everything past that as backed by `:worldgen:bench`/`:worldgen:viewerExport` rather than by a
live boot.

# Tooling

```text
./gradlew :worldgen:test                          # unit tests
./gradlew :worldgen:viewer -Pgenesis               # interactive layer/feature/voxel inspector, on the server's real world
./gradlew :worldgen:viewerExport -Pout=...         # same, rendered to PNGs (works over SSH/CI)
./gradlew :worldgen:invariants -Pseeds=200         # seed-sweep regression harness against every generation invariant
./gradlew :worldgen:probe -Pchannels=1             # inspect a small window at voxel resolution as text
./gradlew :worldgen:bench -Pcells=512 -Preps=3     # serial vs. parallel world-tier build timing, one JVM
./gradlew :worldgen:town -Pcensus                  # every settlement in the world, one table
./gradlew :worldgen:chronicle -Pquests              # the world's history, mined for unresolved threads
./gradlew :worldgen:diff -Pseed=7 -Pother=8         # two worlds (two seeds or two params files), layer by layer
```

`-Pgenesis` reads `zone-server`'s actual `worldgen:` configuration block rather than a demo config, so the
tools inspect the real world the server would boot — including its real wrap flags and dimensions, not merely
a world with the same seed.
