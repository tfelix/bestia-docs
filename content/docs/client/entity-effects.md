---
weight: 350
title: Entity Effects
description: The entity uber material, how effects like a teleport's dissolve drive its knobs, and how to add a new effect.
---

Characters need looks that their own material cannot give them: dissolving away during a teleport, glowing as a
silhouette, a status effect's tint. The client gets all of these from one shader with a set of knobs, plus one
small node per entity that moves those knobs over time.

# The entity uber material

Every character body (masters, bestias, townsfolk) is drawn with `Game/Entity/Fx/Shader/entity_uber.gdshader`.
It draws three things in one pass:

- **The base look:** albedo colour and texture, metallic, roughness, and optionally a normal map, emission and an
  alpha cut-out. These are ordinary material parameters, set per material in the inspector.
- **The weather:** wet and snow, the same rule the prop overlay uses (`weather_cover.gdshaderinc`). Characters
  therefore get no weather overlay, which saves a second draw per body in rain.
- **The fx knobs:** instance uniforms, set per body. With every knob at its default, the body looks exactly like
  its base material.

A pass on top could not do this. An overlay draws over the body, but it cannot make the body under it disappear,
so a dissolve needs the body's own material.

| Knob | What it does |
| ---- | ------------ |
| `fx_tint` | A colour laid over the base look; alpha is how strong. |
| `fx_rim`, `fx_rim_colour` | A glow around the outline. |
| `fx_flash` | A white flash, as on a hit. |
| `fx_silhouette` | 1 replaces the look with a flat body glowing in `fx_glow_colour`. |
| `fx_glow`, `fx_glow_colour` | How bright the silhouette and the dissolve edge glow. |
| `fx_dissolve` | 0 is whole, 1 is gone. The edge sweeps along `fx_dissolve_dir` across the body. |

Instance uniforms belong to one mesh instance and are not shared through the material. So a hundred masters
still share one material per hair and skin colour, and each can fade on its own.

## A new visual

The shader is assigned in the editor, never by code:

1. For a model (`.glb`), open **Advanced Import Settings → Materials** and, for each material, enable
   **Use External** with a `ShaderMaterial` `.tres` next to the model. The `.tres` uses `entity_uber.gdshader`
   with the model's texture in `albedo_texture`. See `Game/Master/Parts/master_skin.tres`.
2. For a scene-built visual, give the mesh a `ShaderMaterial` with the uber shader directly, as
   `BestiaVisual.tscn` does.

In a debug build, a body drawn without the uber material says so once in the log, because its effects would
otherwise silently not show.

# Playing effects: `EntityFx`

Every `Entity` has an `EntityFx` child (`Game/Entity/Fx/entity_fx.gd`). It plays an `EntityFxDef`
(`entity_fx_def.gd`), a resource with one `Curve` per knob over the effect's duration, plus colours, a dissolve
direction, an optional particle burst, and these flags:

- `freeze` holds the body's animation still while the effect plays.
- `reverse` plays the curves backwards, so a vanish def can also serve as an appear.
- `hold_end` keeps the end state until the next effect plays: a vanished body stays gone until it appears.

**Effects layer.** A teleport can play over a status tint. Each knob shows the strongest effect driving it. A knob
no effect drives is left alone, so a visual's own animation of it (the placeholder bestia's death fade) still
works.

**Idle costs nothing.** `EntityFx` processes only while an effect moves, and writes knobs only then.

**What cannot dissolve fades instead.** A carried torch is not part of the body's material, so it dims with the
dissolve and is gone halfway (`Visual.set_effect_fade`).

## Three ways to trigger an effect

| Trigger | When to use it | How |
| ------- | -------------- | --- |
| Server component | The server times it, and observers must see it too | The server sets an `EntityFx` component; the client plays the def whose `kind` matches |
| Status effect | A look that lasts as long as a status effect | Set `status_effect_id` on the def; `Entity.update_effects` sustains and releases it |
| Local | Client-only feedback | `entity.fx.play(def)`, or `sustain(key, def)` and `release(key)` |

The server component is synced like any other: an observer who walks into view while it plays gets it with the
entity's snapshot. That is why a teleport's appear shows even to somebody who only sees the destination.

# The teleport effects

The fly wing and the butterfly wing use four defs in `Game/Entity/Fx/DB/`:

| Def | Look | Default length |
| --- | ---- | -------------- |
| `WING_VANISH` | freezes, turns into a blue-white silhouette, dissolves upward with rising streaks | 0.25 s |
| `WING_APPEAR` | the same in reverse | 0.25 s |
| `HOME_VANISH` | the same in orange-red | 0.9 s |
| `HOME_APPEAR` | the same in reverse | 0.6 s |

The server holds the body still for the vanish, then moves it and sends the appear. It sends the duration with each
effect, so the lengths are tuned in the zone's `application.yml` (`teleport-items.*`) without a client build.

A jump onto ground the client has already drawn shows no loading screen. A fly wing only lands on such ground, so
it never shows one. A butterfly wing goes far, so it does.

# Tuning: the effect harness

`Dev/EntityFxHarness/EntityFxHarness.tscn` shows a master and the placeholder bestia, with a panel to:

- play any effect, or a vanish followed by its appear, once or in a loop;
- slow everything down, or scrub through an effect frame by frame;
- drive every knob by hand, with the dissolve direction;
- lay a status tint underneath, and switch the weather between dry, rain and snow.

```bash
godot --path bestia-client/src res://Dev/EntityFxHarness/EntityFxHarness.tscn
```

With `-- --out=DIR --shots=name:KIND:progress[:weather],...` it renders screenshots and quits instead.

# Adding an effect

1. Create an `EntityFxDef` resource in `Game/Entity/Fx/DB/` and shape its curves in the inspector.
2. Tune it in the harness.
3. Hook it up:
   - for a server-timed effect, give it a `kind`, add the same name to `EntityFxKind` in
     `entity_fx_component_smsg.proto` and to `EntityFx.Kind` on the server;
   - for a status effect's look, set `status_effect_id`;
   - for client-only feedback, call `entity.fx.play(def)`.
