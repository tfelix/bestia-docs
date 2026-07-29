---
weight: 700
title: Scripting
description: The real script-registry pattern behind skills, status effects, consumable items and equipment — plain Kotlin classes resolved by name and validated at boot.
---

The previous version of this page said Bestia has no scripting system and that every effect is
hardcoded. That's half right and half stale: there's no end-user or designer-facing script
language (no Lua, no DSL, no hot-reloadable files) — but there *is* a consistent, working internal
pattern used across four different domains, and it's worth understanding as "the scripting system"
even though every script is a compiled Kotlin class.

# The pattern

Each domain follows the same shape: a small interface, a registry that resolves a `script` name
(from a `.yml` catalog) to the Spring bean implementing it, and a boot-time validator that checks
every reference actually resolves — so a typo surfaces as a boot warning or failure, not a runtime
crash the first time a player triggers it.

| Domain | Interface | Registry | Catalog | Boot validator |
| --- | --- | --- | --- | --- |
| Skills | `SkillStrategy` | `SkillScriptRegistry` | `skills.yml` | `SkillScriptBootValidator` (logs, doesn't fail boot) |
| Status effects | `StatusEffectScript` | `StatusEffectScriptRegistry` | `status_effects.yml` | (resolved via `getOrThrow` at apply-time) |
| Consumable items | `ItemScript` | *(injected `List<ItemScript>`)* | `items.yml` | `ItemScriptValidator`, `@Order(200)` — **fails boot** |
| Equipment | `EquipmentScript` | `EquipmentScriptRegistry` | `items.yml` | `ItemScriptValidator` (same class, validates both) |

All four are resolved by **simple class name**, not a fully-qualified lookup:

```kotlin
// SkillScriptRegistry.kt
private val byName: Map<String, SkillStrategy> = scripts
  .mapNotNull { script -> script::class.simpleName?.let { it to script } }
  .toMap()

fun get(scriptName: String): SkillStrategy? = byName[scriptName]
```

This replaced an older `applicationContext.getBean(<fully-qualified name>)` lookup that could never
have worked — `getBean(String)` resolves a Spring *bean name* (the decapitalized simple class name
for an `@Component`), not a FQN, and the old FQN pointed at a package that didn't even exist.

# Skill and status-effect scripts

Covered in more depth on the [Battle System](/docs/server/battle) page — `Firebolt`/`Heal`/`Blessing`
implement `SkillStrategy` directly (a script *is* the skill's behavior, called from
`SkillExecutionService`); `Swiftness`/`Cripple`/`BlessingStatusEffect`/`ResistedOnceMarker` implement
`StatusEffectScript` (applied via `StatusEffectService`). `SkillScriptBootValidator` deliberately
only **warns** for a missing skill script rather than failing boot, because most of `skills.yml`'s
43 catalogued skills are profession/crafting passives with no script implementation yet — a hard
failure there would make the server unbootable against real catalog data.

# Consumable item scripts

```kotlin
interface ItemScript {
  val itemId: Long
  fun execute(world: World, userId: EntityId): Boolean
}

@Component
class SmallHealthPotionScript(
  private val messageProcessor: OutMessageProcessor
) : ItemScript {
  override val itemId = 3L

  override fun execute(world: World, userId: EntityId): Boolean {
    val hp = world.get(userId, Health::class) ?: return false
    hp.current += 45
    // ... broadcast a heal message, return true
  }
}
```

Unlike the skill/status registries, `ItemScript` beans are consumed as a plain injected
`List<ItemScript>` and keyed by `itemId` rather than by name. `ItemScriptValidator`
(`item/script/`, `@Order(200)` — after `EquipmentScriptBinderBootRunner` at 150) checks two things
and **throws** (failing the boot) if either is violated: no two scripts claim the same `itemId`, and
every `USABLE` item in the catalog has a matching script. Unlike skills, there's no "not built yet"
escape hatch here — a usable item with no script is treated as a data error.

# Equipment scripts

```kotlin
interface EquipmentScript {
  fun apply(context: StatusValueRecalcContext, slot: EquipmentSlot, upgradeLevel: Int)
}

@Component
class BootsScript : EquipmentScript {
  override fun apply(context: StatusValueRecalcContext, slot: EquipmentSlot, upgradeLevel: Int) {
    context.vitality += 2 + upgradeLevel
  }
}
```

Bound once at boot (`EquipmentScriptBinderBootRunner`, order 150) rather than looked up per-tick,
since the database shouldn't be touched from `StatusValueRecalcSystem`'s hot path. Equipment scripts
must be stateless — `StatusValueRecalcSystem` calls `apply` on every equipped item while rebuilding
`StatusValues` from scratch each recalc, so a script only ever mutates the passed-in context. Unlike
consumables, equipment without any stat effect is allowed to have **no script at all** — there's no
duration or stacking question to answer the way there is for a status effect.

# Adding a new script

The recipe is the same shape in all four cases: add the item/skill/status-effect/equip entry to its
`.yml` catalog with a `script:` name, then add a `@Component` class implementing the matching
interface whose simple class name matches that string exactly. No registry entry, no manual wiring
— Spring bean collection plus name-matching does the rest, and the relevant boot validator will
tell you if the name doesn't match.
