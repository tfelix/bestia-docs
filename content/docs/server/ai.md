---
title: Artificial Intelligence
---
# Artificial Intelligence

The AI system in Bestia will set new standards. Bestias and NPCs alike should be able to create long-term plans,
so-called game plans or GPs for short. They then follow this strategy until observations or influences from the
game world force them to abandon this plan or the plan is fulfilled.

Bestias look for ways to get the highest possible inner happiness. They must sleep, eat and feel attracted to mana
currents. Of course they try to avoid threats and protect their health. Here some subtypes differ from each other.
Some tend to be aggressive and actively attack players and other Bestias, while others are shy and flee quickly.
But there can also be representatives who are, as you would say, "stupid" and will attack players to death as soon as
they come into sight.

Decisions should be made on the basis of knowledge. A sensory simulation should be used to understand the world and
make decisions based on it.

The basic AI forms should be assignable via shortcut in the Mob table (and for NPCs in the Map Editor). For bosses or
special bestias, however, scripts should be able to be stored to enable target-oriented behavior.

Finden einer KI Strategie

* NPC
  * Arbeiten
    * Holzhacken
    * Fischen
    * Feldarbeit
    * Haus bauen
    * Bibliothek
  * Schlafen
  * Essen
  * Ausruhen
  * Reisen

* Mob
  * Schlafen
  * Junge aufziehen
  * Nest bauen
  * Nahrungssuche

Entity

* Kann Schaden erleiden.

* Besitzt eine Ausrichtung

* Kann am KI Eventsystem teilhaben

* Besitzt eine Position.

* Besitzt eine visuelle Repräsentation (Sprite)

* Kann eine KI Strategie erzeugen, basierend auf einem Script/Behaviour Tree

### Sinneswahrnehmung

Es müssen sensorische Daten über die Umwelt an das KI System einer Bestia geleitet werden. Folgende externe Sinne werden simuliert:

1. Sicht

2. Gehör

3. Gefühl: (Hitzeempfinden/Feuchtigkeit)

4. Mana (Wahrnehmen von Mana)

Die Engine muss diese Sinnessimulationen generieren und Entitäten die sich für diese registriert haben über Veränderungen hinweisen, was den Entitäten wiederum ermöglicht eine Neubewertung ihrer KI Strategie vornehmen zu können. Dazu kommt ein umfassendes Set an internen Informationen wie Gesundheitszustand, Manavorrat, mögliche Attacken, Wissen über Geländebesonderheiten.

Da die Bewertung der KI Strategie von der Entity selbst vorgenommen wird, sollen die Regeln zur evaluation der Strategie dynamisch zur Laufzeit anpassbar sein. Lernende Agenten wären die folge. Die Entity benötigt nicht nur Schnittstellen zum Empfangen von KI Relevanten Events. Nachdem eine KI Strategie gefunden wurde, muss diese Strategie auch umgesetzt werden.

Im folgenden werden die Sinneswahrnehmungen der Entities im einzelnen beschrieben und möglichkeiten dargelegt diese effizient zu simulieren. Nicht alle Wahrnehmungen lassen sich ausreichend schnell physikalisch ausreichend gut simulieren.

### Sicht

Sicht erfolgt durch die Wahrnehmung von Licht. Es breitet sich ausreichend schnell aus, dass keine zeitliche Verzögerung betrachtet werden muss. Entities besitzen einen Blickwinkel von 60 Grad. Das Blickfeld kann aber durch Entitäten welche die Sicht blockieren oder einfachen Hindernissen versperrt sein. Lichtverhältnisse können die Wahrnehmung beeinflussen. So ist Nachts mit einer geringen Sichtweite zu rechnen. Die optimale Sichtweite sollte in etwa der Sichtbereich eines normalen Spielers betragen (das bedeutet (1950 px / 32 px) / 2 Tiles = 30 Tiles).

Verhalten von NPC

* Nachtaktiv (Lichtscheu)

* Agressiv - Suchen aktiv Spieler und greifen diese an.

* Passiv - Ignorieren Spieler soweit diese sie ebenfalls ignorieren. Scheu - Versuchen aktiv Begegnungen mit anderen Bestias oder Spielern aus dem Weg zu gehen.

Ein angreifender Spieler oder Umweltbedingungen können das Verhalten ändern. Folgendes Verhalten soll für ein KI gesteuerten NPC möglich sein. Das komplexeste Verhalten kommt hier den NPCS zu. Mobs verhalten sich in der Regelprimitiver dennoch soll auch ihre Langzeitplanung und Verhalten neue Maßstäbe setzen. Die Zustände können durch das erreichen von Zielen aufgelöst werden. Um Zeit zu sparen soll gerade die Berechnung der Zielerfüllung ggf. Extern zumindest aber in mehreren Schritten erfolgen.

Verhaltensmuster der Mobs und NPCs

* Planen von Routen über mehrere Maps hinweg.
* Festlegen von inneren Zielen
* Wahrnehmung des Manaflusses

# Präsentation

Dieser Abschnitt enthält Themenpunkte welche die konkrete visuelle Umsetzung und Präsentation des Spiels gegenüber einem Spieler umfassen. Dies können sowohl Style Richtlinien sein, als auch spiel mechanische Elemente um die Story zu transportieren.

# Künstliche Intelligenz

## Grundlegende Techniken

* Wissendatenbank für die NPC über eine selbstoptimierende Ontologie (Semantische Wissensdatenbank).

* Entscheidungsbaum

* Auflösen von Informationen

* Entitätsbasierte Wissensdatenbank (Erinnerung, Abfrage und Löschen der Informationen nach gewisser Zeit).

## Interaktion mit Gegenständen

Um ein glaubhaftes Szenario der Welt zu zeichnen, müssen Entities in der Lage sein miteinander zu interagieren. Entities sind hier alle im Spiel befindlichen Gebäude, Gegenstände oder NPCs. Auch die KI muss in der Lage sein den Nutzen von Gegenständen zu begreifen und diese zu verwenden (Inventar von Entities muss vorhanden sein).

* KI Buch

* SIMs KI

* Gegenstände bieten Fähigkeiten an die man verwenden kann

* Interaktion: Gegenstände bieten ein Signal Slot Verhältnis das man miteinander verknüpfen kann. Über diese Verknüpfung wird sichergestellt, dass auch räumlich voneinander getrennte Items miteinander interagieren können. (z.B. magische Artefakte die durch eine große, räumliche Distanz voneinander getrennt sind, oder Alarmanlagen in benachbarten Räumen).

Gegenstands Verknüpfungen

Allen Gegenstand Entitäten (und somit eigentlich allen Entities) müssen in der Lage sein andere Gegenstände aufnehmen zu können. So lassen sich zum Beispiel Truhen, Frachtladungen etc. realisieren. Ob ein Gegenstand erfolgreich aufgenommen werden kann oder nicht muss dynamisch durch ein Script der aufnehmenden Entität entschieden werden. Hier kann ermittelt werden ob Voraussetzungen wie ausreichende Ladekapazität erfüllt sind.

Interaktion mit einem Gegenstand muss einen Fehlerstatus liefern ob die Interaktion erfolgte, oder ein Abbruch stattfindet (eine Interaktion nicht möglich war). Der Grund für diesen Abbruch muss angegeben werden können, damit dies für den Benutzer ersichtlich ist.

The artificial intelligence module should be implemented as generic library so it can be used by various kinds of games.
The framework must interact with the game engine in certain ways. It must have some notion of locality. The engine must be queried about environmental factors and the AI framework must be provided with a point object which it is able to save. Depending on this locations the game framework must be able to move agents to this points. Also the path planning and avoidance is highly dependent of the game and can not be part of the AI framework itself but must be provided by the game engine.
It is very likely that there are different kind of AIs needed for one single game. There are low intelligence agents like small (or dumb) enemies and very intelligent agents like NPCs or bosses.
Agents are described by an inner state which describes its next actions. The inner state might not always be a single, simple state (like a state machine) but can also inhibit a fuzzy behaviour. The inner state should be savable. The state transition should occur depending on the used state machine. Either there could be decision trees, variable controlled (fuzzy states) and many more. Either way there are transition function in place which take inputs from the environment and change directly the state or indirectly attributes which are used to ultimately calculate the current internal state.
The AI transition function must have a way to actively query into the world state of the engine to gather informations. This could be sounds, smell or visual information of their environment and so on. This information is used to either directly change its internal state via its transition functions or this information is filtered and saved into the agent's memory if a memory storage is provided. Environment information might also get delivered via events to the agent. Such information is usually not actively searched for. But a sudden explosion sound or enemy visual could lead to a change in behaviour and thus internal state. The agent must be able to re-evaluate its state upon the arrival of such events.
Smart management and storage of environment information is also a complete new innovation: the introduction of memory supported AI. This could mean a AI is capable of remembering the positions of players habitats, hunting grounds etc.. Depending upon the AI the entity should be able to communicate this information to other entities (if it is capable of communicating). Since we won't be able to correctly simulate the transfer of information via a language (might be the case for a later implementation) what we need is a way to configure the process of information exchange with other agents. It must be configurable which type of agents are able to exchange information, how close they must be to each other, do they need a special internal state until information is transferred and if the transfer starts how many information is shared how fast?
Agents should decide for themselves (usually depending on the internal state how often they want to reevaluate the world around them since this is a costly operation). They can send a suggestion to the outermost control system how often they want to tick (a sleeping agent usually needs less processing than a fighting entity). However the external system has to decide how many spare resources it has and if necessary give the AI less ticks then they might suggest). Since the Bestia system is event based and not ticked based in order to avoid unnecessary evaluations we might need a filter which will ignore certain incoming events to avoid costly operations.
Inner states might lead to desires. There must be a function for certain group of entities which maps the internal state to a current, certain goal. The strongest goal determines which actions are currently performed. The mapping of this Goal(State) function is highly agent and game dependent and thus must be provided by the user of the framework. There might be some default desires like eating, sleeping, idle etc..
Long term goal and behaviour planning
If the internal states suggest the agent is hungry which leads to a desire to eat we must have a way to plan how this desire can be fulfilled in a changing and complex external world. Therefore we need a mapping of goals to a list of actions. A action is a small subunit and should be able to be directly performed by the entity inside the game world. In order to perform correct goal into action mappings the agent needs some additional informations about actions like for example the estimated execution time or other cost factors so a cheapest path can be found of the current state to the goal. The actions are then saved into a queue and performed one after another by asking the game engine to perform this action in behalf of the agent. The agent must be able to ask the game if the action has been performed or if it's maybe unable to execute the action at all. If this is the case a revaluation of the goal to action list must be performed.
Some actions might be available all the time (drop an item) but some actions might only be possible in certain circumstances (mana is not empty, a certain tool lies on the ground). It is the job of the goal solver to assess all possible actions for a certain agent until the search for the best action solution towards the goal can be found.
Architecture
Agents
Agents contain a “Memory”. Inside this memory certain events are recorded and the agent can access this information for evaluation the next actions.
The memory's size must be adjustable to limit memory consumption.
Depending on the memory and the agent the memory is eventually dropped from the internal state or its weight reduces in decision making (a seen item might drop in relevance over time).
Agents act to fulfill “Desires”
Agents perform actions in order to fulfill the current active desire.
Agents can form groups and exchange “memory”.
Agents contain a state which describes internal “values” like e.g. hunger, thirst, health etc. based on this internal state and external circumstances desires are planned.
Receive environmental events like sound, smell or vision. Each change of world state (e.g. received event) can lead to a reevaluation of its internal state/goals/desires.

AgentState
Attributes can be added by the user.
Some state values are getting “better” the higher they are, some should be lowered. (e.g. hunger is bad if its value is high. But sleepiness is good when it goes low).
Some/all values have a decay function. Their values change over time.
Desires
Are fulfilled by a planned list of actions.
Desire have a priority. The desire to stay alive might be higher than to move from a to b.
Some desires are permanent some are temporary.
The possible actions are layed out to optimize against a agent dependent weight function. Some actors maybe want to save money, some might save time etc.

Questions
How are desires evaluated as “fullfilled”?


External System
Calls AI manager in more or less regular intervals to evaluate state changes.
External system provides interface for environmental access.
Perform Actions
Query informations about the state of certain actions
Estimate the cost of an action

AIGoalSolver
AIs must be able to solve complex operations in order to fulfill a desire.
Example: Desire:
Sleep Goal for animal: Find sleeping place → sleep
Sleep Goal for human: Go home → go to bed → sleep

Desire evaluation
For example the most important desire for most agents would be to stay alive. In order to do so they have a high importance to maximize the internal health state. The goal evaluator will pick one out of all possible actions, the action will alter the state and then the improvement will be evaluated. For example:

Agent
It has in its internal memory two locations A and B of possible food saved.
Near location A is also saved that there is an enemy 1 hour ago.
B is further away.

The agent gets very hungry and the desire to reduce the hunger is picked and placed as the current and thus most important one.
The goal solver now tries to solve this desire.
The solver looks in all possible actions for the entity:
Pick up food (there is no food around, thus this action is not legal)
Move (has a bit of a cost associated)
The solver picks move because the memory says there are two places with food.
CONSIDER THE ENEMY
The solver calculates how long it would take to perform the move action (time will increase our hunger) and pick the shortest way.
The main factors to drive AI decisions
How long does an action take to perform?
How much impact has the action? (measured by how much our internal state changes to the better or to the worst).
AI evolution
The most complex feature should be AI evolution. The AI should be able to evaluate its actions against a fitness function in order to start alternating or changing the transition functions. This could be either changing the whole decision tree or only changing some parameters in order to optimize behaviour. This evolution should be configurable. Some AI behaviour should simply not be able to change. Maybe some sort of evolutionary algorithm could be used to evaluate the AI actions. This would need two components: a fitness function evaluating the performance of the AI for certain criterions and a encoding scheme to encode the transition functions into a genetic code used for mutating after applying pressure.

AIPoint is used as notion of locality in the world. Points must be serializable so they can be saved with various locations.
Path planning and waypoint generation
There is a global waypoint and path network
Long term planning only available for agents which have learned about the way
Learning happens by: reading, questing, exploring the way of its own, drawing maps

