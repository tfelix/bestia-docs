---
id: server-routing
title: Routing
sidebar_label: NPC Routing
---

Zur Routenfindung muss ein globales Verständnis der Karten und Wege vorhanden sein. Beim Starten der Zone müssen die Maps entsprechend ausgelesen werden damit ein Graph erstellt werden kann der die einzelnen Verbindungen der Zonen beschreibt. Der globale Routenfinder muss diese Daten nutzen um Routen erstellen zu können. Zum Abschätzen der Gewichtung der Graph Kante wird die Zeit zur Durchquerung der Zonen mit Hilfe einer Heuristik abgeschätzt. Da jeder Server nur die Maps verarbeitet für die er Zuständig ist muss nach dem Starten der erstellte Teilgraph durch alle Zonen publiziert werden sobald eine Zone online gegangen ist.

* Interne Server Message: Neues server Package.

* "Server Online" Message

* "Global Route Update" Message

Man benötigt einen Graphen der die Verbindungen aller Maps enthält um effizient Routen planen zu können die sich über mehrere Maps hinwegziehen. Diese Map sollte dynamisch beim Starten des Servers erstellt werden sobald sich eine Zone am Interserver anmeldet. Sobald sich die Topographie geändert hat sollten alle beteiligten Zonen vom Interserver benachrichtigt werden.

Ab einer gewissen Manaflussdichte passieren merkwürdige Dinge im Spiel.