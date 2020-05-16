# Battle system

The battle or attack is performed in various stages. Equipments or Status effects either alter the DamageVars or expose certain hooks which are called during the damage calculation. In the case of the DamageVars this object is

The attack itself either provides a script to completely manage the effect which takes place during cast or it provides certain callbacks for damage calculation stages which are getting called while applying the damage. The attack callbacks are:

* onHit - Called when the enemy was hit.

* onApplyDamage - Called when the damage is about to get applied

## Stages of a battle

The stages of a battle are visualized in the following flow diagram.

check if hit is possible

* needs los?

    * is los present? no: abort attack

* needs mana?

    * is mana present? no: abort attack. yes: subtract mana.

* Needs items/ammo?

    * Is item/ammo present? no: abort attack. yes: substract item.

calculate crit hit:

* Based on attacker and defender level and dex and direct crit modifier.

* 0.02 * (atkLv / defLv) / 3 * (atkDex / defDex) / 2 * (atkAgi / defAgi) * critMod

* Capped: 0.01 and 0.95

* Critical hits triple the upcoming hitrate

* Magic attacks always hit

* Magic attacks can not crit.

calculate actual hitrate

* Based on attacker hitrate and defender flee rate.

* Based on modifier for attacker and defender.

* ActualHit: 0.5 * hit / flee, capped at 0.05 and 1.

check if the attack does land a critical hit

check if the attack does land a hit depending on the hitrate.

if the attack does miss display a MISS to the clients.

if the attack does hit proceed with damage calculation.

damage calculation

create damage context

create damage vars

Abhängigkeiten der DamageVars beides ist eigentlich das selbe.

* Equipment

* Status Effekte

## Damage formula

The damage calculation is roughly based on the system used by Ragnarök Online. In certain areas it is refined in order to better express the design philosophy of Bestia as well as be extensible. Modifier (MOD suffix) are float values representing percentage values (e.g. 0.25). Bonus mods are bigger than 1 (bonus 5% is 1.05) while reduction modifier are less than 1.

The damage at the end is rounded down but the damage is capped at 0. The calculation of the BASE_ATK is rather complex and is explained inside a own section. The parts written in pink are variables provided by bonuses from equips, stats, buffs etc.

Damage = floor(BASE_ATK * ATK_MOD * HARD_DEF_MOD * CRIT_MOD - SOFT_DEF)

### BASE_ATK

The base attack represents the attack strength of an entity. This attack strength is based on the status values important to perform the attack as well as the properties of the currently equipped weapon. Equipment might also alter the status values by which the base attack is indirectly influenced.

The base attack is capped at a minimum of 1. Default formula for physical and magical melee and magic ranged attack:

BASE_ATK = (2 * STATUS_ATK * VAR_MOD + WEAPON_ATK * VAR_MOD_RED + SKILL_ATK + BONUS_ATK) * ELEMENT_MOD * ELEMENT_BONUS_MOD

For physical ranged attacks the formula is calculated as follows (ammo_atk is used):

BASE_ATK = (2 * STATUS_ATK * VAR_MOD + WEAPON_ATK * VAR_MOD_RED + AMMO_ATK + SKILL_ATK + BONUS_ATK) * ELEMENT_MOD * ELEMENT_BONUS_MOD

### STATUS_ATK

The status attack value is determined by the capabilities of the character to attack and inflict damage. The formula is different for magic and physical based attacks.

For **physical melee** attacks:

STATUS_ATK = LV / 4 + STR + DEX / 5

For **physical ranged** attacks:

STATUS_ATK = LV/4 + DEX + STR / 5

For **magical attacks** (melee and ranged):

STATUS_ATK = LV/4 + INT + WILL / 5

### VAR_MOD

Is a variable status modifier. The variance is reduced as the DEX value rises. It is defined as:

VAR_MOD = 1 - (RAND(1,0) * 0.15)

### WEAPON_ATK

The weapon attack value for physical attacks is given by:

WEAPON_ATK = (BASE_ATK * QUALY_MOD + REFINE_BONUS) * SIZE_MOD * RACE_MOD * WEAPON_BONUS_MOD

Where as the WEAPON_ATK value for magical attacks is given by:

WEAPON_ATK = (BASE_ATK * QUALY_MOD + REFINE_BONUS) * RACE_MOD

### QUALY_MOD

The QUALY_MOD is a modification depending of the quality of the weapon. Each weapon has a quality rating which is basically not capped. But the max quali damage mod should converge to +30% at maximum.

From this rating the mod damage is calculated as follow

QUALI_MOD = QUALY / 100

### SIZE_MOD

The SIZE_MOD is determined between the size of the opponent and the type of the used weapon against him. The size mod is only applied when the attack is physically based.

<table>
  <tr>
    <td>Weapon size</td>
    <td>Enemy size</td>
    <td>Modifier</td>
  </tr>
  <tr>
    <td>Small</td>
    <td>Small</td>
    <td>1.3</td>
  </tr>
  <tr>
    <td>Medium</td>
    <td>Small</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Big</td>
    <td>Small</td>
    <td>0.75</td>
  </tr>
  <tr>
    <td>Small</td>
    <td>Medium</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Medium</td>
    <td>Medium</td>
    <td>1.15</td>
  </tr>
  <tr>
    <td>Big</td>
    <td>Medium</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Small</td>
    <td>Big</td>
    <td>0.70</td>
  </tr>
  <tr>
    <td>Medium</td>
    <td>Big</td>
    <td>1.1</td>
  </tr>
  <tr>
    <td>Big</td>
    <td>Big</td>
    <td>1.3</td>
  </tr>
</table>


### VAR_MOD_RED

This is the reduced variance mod.

VAR_MOD_RED = VAR_MOD - VAR_MOD / 2 + 1/2

### AMMO_ATK

If special ammunition is used this value is used. Only ranged physical attacks can make use of ammunition.

### BONUS_AMMO

This value is determined by the equipment and status effects applied to an entity.

### ATK_MOD

The ATK_MOD is calculated depending which type the attack was. If it was a ranged physical attack, ranged magic attack or a melee physical or a melee magic based attack. The attack mod is capped to 0.05.

If attack is physical melee:

ATK_MOD = bonus_physical_melee

If attack is physical ranged:

ATK_MOD = bonus_physical_ranged

If attack is magical melee:

ATK_MOD = bonus_magical_melee

If attack is physical melee:

ATK_MOD = bonus_physical_melee

### HARD_DEF

Hard defense represents mostly the damage reduction via armor and other natural defenses. It can of course modified by scripts. The hard defense is capped between 0 and 95%. Depending of the nature of the attack (physical or magical) either the normal armor or magic armor (magic resist) is used.

If normal attack (ranged or melee):

HARD_DEF = 100 - (TOTAL_ARMOR_MOD + PHYSICAL_DEF_MOD) / 100

If magic attack (ranged or melee):

HARD_DEF= 100 - (TOTAL_MAGIC_RESIST_MOD + MAGIC_DEF_MOD) / 100

### SOFT_DEF

Soft defense represents the natural defense of entities against damage of a specific domain. Soft def is a natural number and NO modifier. Its minimum value is capped to 0.

If attack is physical based (regardless if melee or ranged):

SOFT_DEF = LV / 2 + VIT + STR / 3

If the attack is magic based (regardless if melee or ranged):

SOFT_DEF= LV / 2 + VIT + WILL / 4 + INT / 5

### CRIT_MOD

The base crit mod is set so 1.4 (bonus of 40% damage) if a critical hit has occurred. The chance to land a critical hit is determined before the actual damage is calculated. If no critical hit has occurred the crit mod is hardcoded set to 1. Magic based attacks can not land a critical hit (they also are hitting a target easier).

The crit mod is capped at 1.

CRIT_MOD = BASE_CRIT_MOD * CRIT_DAMAGE_MOD

## Damage variables

Total damage calculation modifiers which are gathered from equipment and status effects. They are re-calculated upon change of the entities properties and then stored. The variables are feed into the attack scripts so their values can be accessed and altered via scripts on a per attack basis. These values are called damage variables.

<table>
  <tr>
    <td>Variable Name</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>bonusAttackPhyscialMelee</td>
    <td>Bonus damage on physical melee attacks.</td>
  </tr>
  <tr>
    <td>bonusAttackPhyscialRanged</td>
    <td>Bonus damage on physical ranged attacks.</td>
  </tr>
  <tr>
    <td>bonusAttackMagicMelee</td>
    <td>Bonus damage on magical melee attacks.</td>
  </tr>
  <tr>
    <td>bonusAttackMagicRanged</td>
    <td>Bonus damage on magical ranged attacks.</td>
  </tr>
  <tr>
    <td>physicalDefMod</td>
    <td>Bonus or reduction on armor.</td>
  </tr>
  <tr>
    <td>magicDefMod</td>
    <td>Bonus or reduction on magic resist.</td>
  </tr>
  <tr>
    <td>criticalChanceMod</td>
    <td>Bonus or Reduction to critical hit chance.</td>
  </tr>
  <tr>
    <td>criticalDamageMod</td>
    <td>Bonus or reduction in critical damage.</td>
  </tr>
</table>


## Kampfsystem

Kampfablauf

1. Trifft eine Attacke?

2. Gibt ein ein Script für die Attacke um bestimmte Effekte, oder eine andere Berechnung auszulösen?

    1. Nutze das Script um den Schaden zu berechnen.

3. Berechne anhand aktueller Statuswerte den auftretenden Schaden und übergebe ihn an die Entität.

4. Entität prüft ob der Schaden angewendet, oder durch Equipments abgeschwächt wird.

5. Ist der Schaden dennoch aktiv wird er angewendet.