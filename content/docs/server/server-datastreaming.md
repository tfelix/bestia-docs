---
id: server-streaming
title: Server Streaming
sidebar_label: Server Streaming
---

# Kartenübertragung

Die Map besteht aus Tiles welche in verschiedenen Layern organisiert sind. Üblicherweise sollten es nicht mehr als 2-3 Layer sein. Ein Grundlayer mit der Nummer 0 ist immer vorhanden. Dieser stellt den Boden dar. Er enthält begehbar und unbegehbare Tiles. Die restlichen Layer werden in einem sparse Datenformat übertragen, da Kartendaten die als Layer sich vor dem Spieler befinden eher seltener anzutreffen sind

## Patch Übertragung

Um ein effektives Streaming sicherzustellen werden die Tiles in quadratisches Patches eingeteilt. Die genaue Größe dieser Patches kann variabel sein, sie sollten aber weder zu groß, noch zu klein gewählt werden.

Kommt der Spieler auf weniger als eine Sichtweite an den Rand eines Patches fordert der Client die grenzwärtigen Patches vom Server an. Da es sich um konstante Kartendaten handelt ist der Client angehalten einen Cache zu nutzen.

Alle benötigten Tiles innerhalb dieser Patches werden über eine globale Tile ID (GID) numeriert. Sollte der Cache des Clients diese GID nicht auflösen können wird er eine entsprechende zusätzliche Anfrage an den Server stellen, der dann wiederum Informationen über das verwendete Tileset liefert. Sobald alle Informationen, sowohl der Kartendaten, als auch der Tileset Informationen (und damit letztendlich auch die Tileset Bitmaps) kann der Client die Karte darstellen.
