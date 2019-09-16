---
title: Client
---
# Client

<a class="github-button" href="https://github.com/tfelix/bestia-client" data-icon="octicon-star" data-size="large"
data-show-count="true" aria-label="Star tfelix/bestia-client on GitHub">Star</a>
<a class="github-button" href="https://github.com/tfelix/bestia-client/subscription" data-icon="octicon-eye"
data-size="large" data-show-count="true" aria-label="Watch tfelix/bestia-client on GitHub">Watch</a>

Die Engine besteht aus mehreren Subsystemen die jeweils mit eigenen Aufgaben betraut sind. Die Subsysteme werden im folgenden beschrieben.
The client is responsible for communication with the server and visualization of all the transferred data. The client is divided into two modules: the engine module which is used for rendering and the data gui module which is used for information visualization and GUI operations. This module is realized via simple HTML.
When receiving server updates the data model is updated and the HTML representation updated by KnockoutJS accordingly.
As soon as entity updates are received these updates are stored inside an entity cache register. The engine needs to pick up this data as soon as possible and start to visualize and animate the entities inside this storage. Its her responsibility to fetch the visualization data as soon as possible for the entities contained inside this data storage.

## Entities

Sie spiegeln grafische Elemente im Spiel wieder. Sie können sowohl auf dem Server, als auch nur im Client existieren. Üblicherweise besitzen sie eine grafische Repräsentation, bieten eine Möglichkeit der Interaktion (Mouse Hover) und ihr Aussehen kann über das Anlegen von Effekten verändert werden. Die Entities besitzen eine API über die man das Aussehen der Sprites steuern kann: Hinzufügen und Löschen von Partikeln, Shadern, Kinder-Sprites etc.

## Partikel

Dies sind visualisierte Objekte in Form von Sprites, Animationen, Partikeln, die zwar im Spiel repräsentiert sind, aber nur lokal erzeugt werden. Sie sind in der Regel verhältnismäßig kurzlebig und können, je nach Situation schnell angefragt werden. Ein Caching Algorithmus sollte daher vorgesehen werden.

Effekte beziehen sich immer auf Entities und werden an diese angehängt. Ein Effekt kann eine Entities dahingehend anpassen indem es Shader oder weitere Kind Sprites anfügt.

Der Server hat keine oder nur einen geringen Einfluss auf die Erzeugung von Effekten. Eine Ausnahme kann zum Beispiel Schaden sein. Dieser wird zwar vom Server an den Client gesendet, aber es gibt auf Serverseite keine Entitäten-Repräsentation dieses Datensatzes.

## Indicator

Steuert die Anzeige der Mauszeiger und der Effekte die dort angezeigt und an die Bewegungen des Mauszeigers/Fingers geknüpft sind. Die verschiedenen Indicator werden über einen Manager verwaltet und können über diesen aktiv geschaltet werden.

## Map

Dieses Subsystem enthält Objekte um die Map Daten abzurufen, zu verarbeiten und zu speichern. Sie bietet weiterhin hilfen zur Visualisierung, zur Pfadfindung und aktualisiert die Collision Map, welche unbegehbare Gebiete im Sichtfeld markiert.

## Renderer

Hier werden größere Renderer abgelegt die größere, übergreifende Strukturen darstellen, für die es aber auch keine direkte Repräsentation auf dem Server gibt. Die Darstellung von globalem Licht oder die Darstellung der Map passieren innerhalb dieses Paketes.

<script async defer src="https://buttons.github.io/buttons.js"></script>
