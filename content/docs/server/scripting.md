# Scripting

Das Skript-System in Bestia wird genutzt um flexible Programmausführung für verschiedenste Zwecke zu ermöglichen. Dazu gehören vor allem die Effekte von benutzten Items, Attacken, das Verhalten von Entities zu steuern.

Als Skriptsprache wird auf JavaScript gesetzt. Aktuell wird die Nashorn Javascript Engine von Java 8 benutzt. Sollte sich dies als Performance Engpass herausstellen so kann später mit mittlerem Aufwand auf die V8 Engine von Google umgerüstet werden. Für alle Aktoren wird nur eine Script Engine verwendet. Da Javascripts keine Mechanismen vorgesehen in einer Multithread Umgebung zu laufen, ist darauf zu achten, dass KEIN globaler State in den Scripten eingeführt und verwendet wird. Jede Ausführung muss einem zentralen Datenbestand arbeiten (z.b. Datenbank API). Zur Interaktion mit dem Bestia Server muss eine Script API vorgesehen werden, die den Scripten zusätzlich zu den von ihnen benötigten Variablen bei der Ausführung über ein Binding zur Verfügung gestellt wird.

## Allgemeine Fähigkeiten von Scripts

* Scripts müssen Entities erzeugen oder zerstören können.
* Scripts müssen Entities in ihrerer Umgebung abrufen können.
* Sie müssen auf einen persistenten Datenspeicher Zugriff haben (einen globalen, einen nur für sie).
* Sie müssen das Aussehen von Entities verändern könne.
* Sie müssen Entities anpassen können (hinzufügen, entfernen von Statuseffekten)

In der folgenden Tabelle sind die Arten der Scripte aufgelistet.

[http://www.n-k.de/riding-the-nashorn/#_reading_files](http://www.n-k.de/riding-the-nashorn/#_reading_files)

<table>
  <tr>
    <td>Script Art</td>
    <td>Hooks</td>
    <td>Bindings</td>
    <td>API Funktionalität</td>
  </tr>
  <tr>
    <td>Item</td>
    <td>onUse</td>
    <td>Account ID
Benutzer
Zielort (optional)
Ziel (optional)</td>
    <td>Entity Spawning
Inventar</td>
  </tr>
  <tr>
    <td>Attacken</td>
    <td></td>
    <td>Account ID
Benutzer
Ziel (optional)
Zielort (optional)</td>
    <td></td>
  </tr>
  <tr>
    <td>Entity Script</td>
    <td>onTouch</td>
    <td>Berührende Entity
Interagierende Entity</td>
    <td>Entity Spawning
Inventar
Attacken und Schaden</td>
  </tr>
  <tr>
    <td>Equipment & Statuseffekte</td>
    <td>onTakeDamage
onAttack
onTick
onEquip
onUnequip
onStatusRequest</td>
    <td></td>
    <td>Tick API</td>
  </tr>
</table>


Scripts bestehen aus Funktionen die in Javascript implementiert werden. Die Funktionsnamen haben dabei den gleichen Namen wie in diesem Dokument beschrieben und werden bei Bedarf aufgerufen.

Die Scripte sollten keinen inneren Zustand besitzen. Sie werden daher auch nicht serialisiert sondern nur eine Referenz ID/Namen. Durch diesen wird das entsprechend kompilierte Script Objekt abgerufen und bei Bedarf ausgeführt. Zustandsdaten müssen dann im Script über entsprechende APIs abgerufen werden.

## Script Kontext

Stellt Zugriff auf die allgemeine API bereit.

createEntity()

getEntities(Rect rect)

getEntity(Long id)

// Set und Get vars müssen transaktionssicher sein.

getVar(Long id)

setVar(Long id, String data)

// Set und Get vars müssen transaktionssicher sein.

getGlobVar(Long id)

setGlobVar(Long id, String data)

## Script Callbacks

EntityScript

* Locatable

Sie befinden sich in der Welt.

* onEnter(Locatable e)
* onLeave(Locatable e)
* onTick(Locatable e)

registerTick(1000, function(){});

* onMoveInside(Locatable e, Path p)
* onCreate()
* onDestroy()

StatusScripts / EquipScripts

Es muss eine Reihe von standard Status und Equip Scripts geben die simple Änderungen der Werte erlauben. Es sind Additionen und Multiplikationen erlaubt.

Besonderheiten

* StatusModifier verändern die Statuswerte durch Addition und Multiplikation oder durch setzen eines festen Wertes. Dabei kann eine Priorität angegeben werden.

* onApply
* onRemove
* onStatus(StatusModifier mods)

Modifiziert den Status

* onTick()
* onTakeDamage(Damage dmg, Attackable self, Attackable enemy)
* onAttack(Attack atk, Attackable self, Attackable enemy)


There are two different kind of scripts in the bestia system: one which are called directly and one which consists of specific function which are targeted as callback if a specific event occurs. Usually the scripts get a exposed API which allows them to interact with the bestia system, alter or create new entities.
Scripts are very powerful their code is called via entry point functions to perform specific tasks during runtime. Like for example trigger code execution if an item is equipped or an entity collides with a script collider. Yet these calls are for a direct interaction only. If scripts want to get notified for example when a certain event occurs we have to use the script callback event system. Other scripts can also emit certain events. Imagine we want to get notified for a weather event. We would do:

BAPI.event.subscribe(‘weather.rain’, ‘global/script.js:onRain’);

In the rain script we would do a:

BAPI.entity.find(rect(10, 10, 20, 20)).forEach(eid => {
	var intensity = 0.6;
	BAPI.event.emit(‘weather.rain’, ‘start’, intensity);
});

In order to set callbacks directly into functions one can use the setCallback API call with key: func:myFunc. This will invoke the function myFunc in the same script as it was called. With the key script:hello the top level of the script /script/hello.js will be called. And finally both keys can be combined: script:hello:func:test will invoke the function test inside the script /script/hello.js.

Some special variable are always set for scripts. These variables vary from script to script type and are listed below.
Global Variables
SUID (string): Unique ID of the Script. Each script attached to an entity has its own unique id. The same script file attached to multiple entities has different UIDs. This id can be used to retrieve variables from the global storage. The UID is retained between successive calls from callbacks/timeouts for example. The script UID is currently only set if there is a permanent instance of a script.
BAPI (Bestia API): API entry point which allows scripts to interact with the system.
Script Entry Callbacks
onCollision

## Equipment Scripts

These are attached to equipments and are somehow similar to status effect scripts yet they share callbacks from items since equipments can lay down on the ground
and there is a chance they get attacked.

### Callbacks

* onAttach
* onDetach
* onDrop
* onPickup
* onTakeDamage


### Item Scripts

Item scripts are called if an item associated with the script is used. This is one of the most simple form of scripts.

Handles
* onDrop
* onPickup
* onTakeDamage
* onUse (if its a structure or consumable)

Special variables
source (long, entity id): The owner who triggered the script
target (long, entity id): Might be null. Is set if the item was intended to be used on a certain entity.
targetPosition (Point): Might be null. Is set if the item was intended to be used on a certain place.

### Attack Scripts

The attack scripts are a bit more complex. They are also simply called upon usage of an attack. Depending on the definition of the attack this might be the only place to perform certain damage calculation for example.

### Interact Scripts

This scripts are called when interaction between an entity and a script takes place. The trigger can vary.
