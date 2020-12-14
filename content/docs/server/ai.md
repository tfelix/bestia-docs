---
title: Artificial Intelligence
---
# Artificial Intelligence

The Bestia AI should be very modularized, its designgoals should allow the Bestia AI to:

* Perform long term planning
* Sense enemies
* Give the impression of self improving and learning
* Player should be able to express some level of control over the AI of his controlled Bestia

In order to archive that goal the AI is seperated into three different parts:

1. Sensing
2. Behavior
3. Action Planning

In the sensing part the knowledge of an Agent is updated for example data is written to its blackboard.
Its seperate from the other modules in order to be able to update it independently as for example running
actions must read the current data and if possible interrept their execution to trigger a new behavior planning.

The behavior uses different techniques like a behavior tree or a finite state machine in order to define the next
possible actions.

After the set of actions are determined by the knowledge of an agent the action planer is invoked in order to plan
a set of tasks in order to fulfill the action. These tasks are then executed until they fail or get interrupted by an
updates world state. Then planing is re-done.

## Sensors

The Behemoth server is event based, thus if for example an Bestia steps into the field of view of another Bestia the
eventing can register a sighting into the according visual sensor of the agent.
Sensor can also activly poll information about the world if their tick is invoked however.

The AI system in Bestia will set new standards. Bestias and NPCs alike should be able to create long-term plans, so-called
game plans or GPs for short. They then follow this strategy until observations or influences from the game world force them
to abandon this plan or the plan is fulfilled.

Available sensors are:

* Sight
* Hearing
* Temperature (Weather)
* Mana/Magic

Sensor information will be put into the Agents Blackboard to access it later when considerations are made or action plans
are created.

## Behavior

If the agent is idle of some event has caused a currently running action to fail the behavior of the agent is generated.
Usually this are behavior trees or state machines for simpler NPCs in order to generate the desired behavior.

## Action Planning

TBD

## Special Considerations

AI Blueprints are given as JSON files and AI agents are build from these Blueprints. The Bestia Behemeoth
server decides what the tickrate of this agents are, to reduce load on the server, agents without players near
them tick slower then agents which are currently activly engaged in player interaction.

If NPCs meet they should be able to exchange certain information from their blackboards by exchanging "gossip" this
should be also put into some kind of chat exchange which can be overheard by players.

## Literature

* [A Better Monster AI - Joseph Swing](http://www.roguebasin.com/index.php?title=A_Better_Monster_AI)
* [Modular AI Systems](https://www.youtube.com/watch?v=IvK0ZlNoxjw)
* [Goal-Oriented Action Planning: Ten Years of AI Programming](https://www.youtube.com/watch?v=gm7K68663rA)