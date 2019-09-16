---
id: server-lighting
title: Lighting
sidebar_label: Lighting
---

Gruppen Renderlayer

ground
objects
sprites
effects
overlay
gui

Gruppenmanager? Der entsprechende Render-Layer definiert und verwaltet?
Lichtsystem
Lichtinformation wird auf dem Server benötigt Tile basiert.
Licht information wird auf dem Client benötigt, Tile basiert

Licht wird global in groben Chunks abgelegt.
Darüber hinaus werden Entities im System gespeichert welche Licht emmitieren.
Aus beiden wird eine Lightmap berechnet die in einer effizienten Codierung die Light Map in einem Dateiformat ablegen und an den Client senden
Der Client regeneriert diese Lightmap und rendert daraus eine Textur, die dann mit der Karte überlagert wird.

Es gibt eine Lightmap die mit einem Multiply über die restlichen Layer gelegt wird. Diese Lightmap wird in der Regel mit jedem neuen Update neu gezeichnet → dynamische Lichteffekte (flackern), Attacken.

Wie wird die Umgebung aufgehellt? Add-Layer? Der eine gewisse Grundhelligkeit erzeugt (von Lichtquellen gesteuert). Das Wettersystem z.B. kann diesen Layer beeinflussen. Tag und Nacht auch. Manche Maps besitzen auch einen statischen Helligkeitswert (Dungeons und Höhlen zum Beispiel).

Damit ein Objekt zur Lichtberechnung beiträgt muss es mit dem Licht-Trait ausgestattet sein. Dieser enthält und liefert folgende Informationen:

Lichtfarbe
Lichthelligkeit
Falloff → Normalerweise 1/r² (faked)

Das System muss dem Licht Trait die Tickzeit (abklingender Lichteffekt etc.) beim Abfragen der Informationen zur Verfügung stellen.

Blend Modes
PIXI.blendModes = { NORMAL:0, ADD:1, MULTIPLY:2, SCREEN:3, OVERLAY:4, DARKEN:5, LIGHTEN:6, COLOR_DODGE:7, COLOR_BURN:8, HARD_LIGHT:9, SOFT_LIGHT:10, DIFFERENCE:11, EXCLUSION:12, HUE:13, SATURATION:14, COLOR:15, LUMINOSITY:16 };
ggf. Color Dodge oder Add

zum Aufhellen der Umgebung ggf. einen der beiden Layer mit gewissem Alpha addieren.

Die Helligkeit und der Falloff bestimmen die Reichweite. Dieser Layer wird multipliziert mit den darunterliegenden Layern.

Ggf wird ein weiterer Layer für die Farbinformation benötigt um ein schönes Blending zu erziehlen.

Lichtsystem implementieren
Admin Chat Commands die das Licht setzen können
Dynamisches System das das globale Licht auf der Welt steuert, abhängig von der Tageszeit
Tageszeit Klasse die, abhängig von der Serverzeit, den Tag in 0 - 1 float abbildet, auch das Jahr sollte auch 0 bis 1 gemappt werden. Aktuelle Jahreszeiten sind per Enum zu liefern. (Spring, Summer, Autumn, Winter)
Lokale Lichtquellen vorsehen. Entities mit einer Component. Diese sollten so eine Ausdehnung (Bounding Box) besitzen, dass ihre Lichtreichweite abgedeckt wird.
Das System berechnet bei Änderung die Lichter neu und sendet sie an die Clients.
Übliche Periode für Lichtberechnung: Minuten.
LightEntityFactory implementieren

