# Scripting

Das Skript-System in Bestia wird genutzt um flexible Programmausführung für verschiedenste Zwecke zu ermöglichen. Dazu gehören vor allem die Effekte von benutzten Items, Attacken, das Verhalten von Entities zu steuern.

The scripting language used is JavaScript. The scripting language is used to allow fast iteration and changes to the items. There is an API provided for the scripts in order to interact with the entity system of Bestia.

Script code must always be placed inside a `main()` function. They should also never have a inner state because they get stopped and periodically executed. In order to keep a variable scoped to the entity which executes the  The example script for the apple items looks like:

```js
function main() {
    Bestia.findEntity(USER_ENTITY_ID)
        .condition()
          .addHp(10)
}
```

The main entry point into the Bestia API is the `Bestia` object.

## Status Scripts / Equip Scripts

These scripts are called when a status effect is applied or removed (or if an equipment with a status effect is applied or removed)

### Status Scripts Context Variables

| Context Variable | Description |
| ---------------- | ----------- |
| x                | x.          |

### Status Scripts Functions

| Function | Description |
| -------- | ----------- |
| x        | x.          |

* onApply() - Called when the effect is applied to an entity
* onRemove() - Called when the effect is removed from the entity
* onStatusApplied() - Called when another status effect is applied to the entity
* onStatusRemoved() - Called when another status effect is removed from the entity
* onTakeDamage(Damage dmg, Attackable self, Attackable enemy)
* onAttack(Attack atk, Attackable self, Attackable enemy)


## Item Scripts

These are attached to items and are somehow similar to status effect scripts yet they share callbacks from items since equipments can lay down on the ground
and there is a chance they get attacked.

### Item Scripts Context Variables

| Context Variable | Description |
| ---------------- | ----------- |
| x                | x.          |

### Item Functions

* bool onEquip() - Called when the item is equipped. When `false` returned the equipment is aborted. (Only for equipments)
* bool onUnequip() - Called when the item is unequipped. When `false` returned the unequipment is aborted. (Only for equipments)
* onDrop()
* onPickup()
* onTakeDamage()
* onUse (if its a structure or consumable)

Special variables
source (long, entity id): The owner who triggered the script
target (long, entity id): Might be null. Is set if the item was intended to be used on a certain entity.
targetPosition (Point): Might be null. Is set if the item was intended to be used on a certain place.

## Attack Scripts

The attack scripts are a bit more complex. They are also simply called upon usage of an attack. Depending on the definition of the attack this might be the only place to perform certain damage calculation for example.

### Attack Scripts Context Variables

| Context Variable | Description |
| ---------------- | ----------- |
| x                | x.          |

### Attack Functions