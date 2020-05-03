# World Generation

Bestia uses a specialized library called [worldgen](https://github.com/tfelix/worldgen) for world creation. It is a
clusterable generator which is cabable of dividing the world creation workload onto multiple, different machines.
With this framework it should be possible to create million of square kilometers without hitting any memory limit
on the servers.

## Algorithmus

1. Grundparameter
2. Erstellung von Influencemaps
3. Wasserspiegel festlegung
4. Erzeuge die Wasser Maske
5. Erzeuge von Gewässern und Flüsse
6. Temperaturkorrektur
7. Biom Zuordnung vornehmen
8. Terrain Features verteilen und erzeugen
9. Biom Optimierung
10. Tilemap Erzeugung
11. Biom Features
12. Erzeugung der Städtekandidaten
13. Erzeugung und Verteilung von Bodenschätzen

## Grundparameter

The following base parameters are used to generate the map:

* Gesamtpopulation P
* Weltgröße S (Abhängig von der Spielerzahl)
* Wassermasse/Landmasse WM (20-40% Wasser)
* Anzahl von Städten/Siedlungen Sn


The base parameter are generated randomly based on the expected active player count. They are persisted in the database.

$x = \frac{1}{3}$

## Influencemaps

Folgende Influencemaps werden in der Größe der Weltkarte erstellt und über den [SimplexNoise ](https://de.wikipedia.org/wiki/Simplex_Noise)Algorithmus mit Rauschen gefüllt.

14. Höhenkarte: mH

15. Temperaturkarte: mT

16. Niederschlagskarte: mN

17. Magiekarte: mM

18. Populationsdichte: mP

## Terrain Features (Post Biom)

Bestimmte, extravagante Features, die sich vor allem auf die Höhenstufen der Map niederschlagen werden hier zufällig verteilt. Die Wahrscheinlichkeitsverteilungen der Terrain Features sind häufig an bestimmte Biome gekoppelt. Da diese bereits bestimmt wurden, kann hier eine Prüfung auf bestimmte Features stattfinden. Bestimmte Feature sind:

* Seen
* Canyons
* Vulkane
* Gebirge

## Gewässer und Flüsse

Dazu werden zufällig Wasser-Seeds verteilt und ein Flood Fill bis zur Küstenlinie durchgeführt. Der Wasserspiegel wird so lange angehoben, bis der Land/Wasser Parameter erfüllt ist. Sollte dies aus einem Grund nicht möglich sein. Gehe zu 1.

## Temperaturkorrektur

Temperaturgradient auf mT aufbringen. Versehe die Temperaturkarte mit einem Gradienten um am Aquator eine höhere Temperatur zu erhalten wie an den Polen (Nord, Süd).

## Biom Zuordnung

TBD

## Biom Optimierung

Nachdem die Biome über die Zuweisungsregeln hart zugewiesen wurden, müssen mehrere Plausibilitätsfilter verwendet werden um eine saubere Erzeugung zu gewährleisten.



TBD: Welche Filter müssen hier angewendet werden? Was kann denn falsch erzeugt werden?

Erzeuge an den Biom Grenzen entsprechende Übergangsbiome.

## Tilemap Zuordnung

Jedes Biome besitzt ein gewisses Set an Tiles. Diese stammen aus einem oder mehreren Tilemaps (also eine Menge von GIDs). Zusätzlich existiert eine Reihe von weiteren Entities welche nach einer gewissen Wahrscheinlichkeit verteilt werden können (Bäume z.B.). Diese werden aber nicht immer einfach zufällig auf Koordianten platziert. Vielmehr kann es auch hier einen Top-Down Ansatz geben, der gewährleistet, dass eine ausreichend gute Verteilung der Features generiert wird.

## Biom Features

Erzeuge entsprechende Strukturen innerhalb der Biome (siehe Tilemap Erzeugung). dazu gehört das Anlegen von Entities für Bäume, Pflanzen, hohes Gras, Steine, Felsen etc. Für jedes dieser Features existiert pro Biom eine oder mehrere Alternativen. Es gibt weiterhin eine Wahrscheinlichkeitsfunktion, die das Auftreten dieser Features innerhalb des Bioms regelt. Nach der Erzeugung werden alle Biome durchlaufen, diese Features so verteilt, dass ihre Positionierung innerhalb der bereits verteilten Tiles legal ist (keine Positionierung auf nicht begehbaren Felder etc.). Die Wahrscheinlichkeit für diese besonderen Orte ist in den Biomen gesteigert, bzw sie sind teilweise einzigartig für diese Biome. Folgende besondere Eigenschaften gelten für die verschiedenen Biome:

### Eistundra

* Alte Höhlensysteme

* Eistempel

* vermehrt Bodenschätze

### Wälder

* Alte Tempelanlagen

* Ruinen

* Alte, unbewohnte Dörfer

* Bewohnte Siedlungen

* Höhlen

* Grabstädten

## Cities

Cities usually form around natural resources like shores, rivers or rich farmland. The algorithm as described below will find suitable city position candidates and then distribute the cities in 2 to n clusters around the world map. This clustering will make sure there is enough unexplored land for the players left. It should also help with the idea of different civilization which could lead to ingame player conflicts. A possible distribution is shown in here. *TODO: Include figure*

The algorithm searches the world map and creates matrix with a mesh length of 1km.

* Rohstoffvorkommen (Farmland, Minerals, Fishing Grounds)
* Nähe zu einem Gewässer (Fluss oder Meer)


Folgende Voraussetzungen müssen gegeben sein:

* Karte mit Biom-Zuordnung muss generiert worden sein.

Aufbauen auf der Weltkarte wird eine Influence Map erstellt. Wasserwege geben einen abfallenden Wert vor. Die Auflösung der Influence Map kann geringer sein als die eigentliche Karte. Auflösungen zwischen 100m und 1km erscheinen praktikabel. Folgende Punkte werden auf der Influence Map vergeben und summiert:

* Ist das Biom praktisch um Lebensmittel anzubauen?
* Sind natürliche Ressourcen in diesem Biom vorhanden?
* Wasser Biom in der Nähe gibt Punkte.

Von der Influence Map müssen nun die Punkte entfernt werden die eindeutig keine Besiedlung ermöglichen. Folgende Punkte müssen auf 0 reduziert werden:

* Liegen im Wasser/Lava
* Liegen auf Gebirge
* Liegen im Wald
* Liegen in Gebieten mit sehr hoher Magie

Bei allen verbleibenden Punkten muss überprüft werden ob es sich um ein lokales Maximum handelt. Diese Punkte werden zusammen mit ihrer Gewichtung in eine sortierte Liste aufgenommen. Dabei kann ein wandernder Durchschnitt berechnet werden und Werte unterhalb eines gewissen Schwellwertes verworfen werden.

Koordinaten die dann zu nahe beieinander liegen (< 3-6km) werden aus der Liste entfernt.

Anhand der Punkte auf der Liste werden die Siedlungen berechnet. Zu 70% wird eine Stadt aus der oberen Hälfte der Liste der Reihe nach entnommen. Zu 30% wird eine Siedlung zufällig aus einem Kandidaten der unteren Listenhälfte entnommen bis die Anzahl der gewünschten Siedlungen erreicht ist oder die Liste erschöpft ist. Sollte ein Listenteil erschöpft sein, so wird jeweils vom anderen Listenteil mit dem gleichen Muster vorgegangen.

Erzeugung von Städten

1. Bestimmung der Anzahl der Gebäude anhand der Populationsmenge.
2. Verteilen der Gebäude um den Stadtkern nach einer Gaußkurvenverteilung.
3. Erzeugung der Gebäude-Innenräume nach: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method

## Bodenschätze & Ressourcen

TBD. Zum Nutzen und Verwendung der einzelnen Bodenschätze, siehe Abschnitt [Ressourcen](#heading=h.qtftxg6zrzre).

## Roads


## Weltzerstörung

Die Welt soll durch das Herbeiführen von Rift Events strukturell geschwächt werden, bis sie mit einer weiteren Welt kollidiert. Die Spieler selbst bleiben bei solch einem Event relativ unbeschadet. Je nach Fraktion/Kult welcher die Spieler angehören wird es aber weitreichende Mali oder Boni geben. In der neu generierten Welt starten die Spieler wieder zunächst ohne Kult Zugehörigkeit.
