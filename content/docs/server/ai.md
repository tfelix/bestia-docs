---
weight: 300
title: Artificial Intelligence
description: "Summary of Bestia's modular AI design, including sensing, behavior, action planning, sensors, and goal-oriented action planning."
draft: true
---

The Bestia AI should be very modularized, its design goals should allow the Bestia AI to:

* Perform long term planning
* Sense enemies
* Give the impression of self-improving and learning
* Player should be able to express some level of control over the AI of his controlled Bestia

To archive that goal the AI is separated into three different parts:

1. Sensing
2. Behavior
3. Action Planning

In the sensing part, the knowledge of an Agent is updated for example data is written to its blackboard.
It's separate from the other modules to be able to update it independently as for example running
actions must read the current data and if possible interrupt their execution to trigger a new behavior planning.

The behavior uses different techniques like a behavior tree or a finite state machine in order to define the next
possible actions.

graph LR
    A[Sensing] -->|Update blackboards| B[Behavior]
    B -->|Create execution plan| C[Action Planning]

After the set of actions are determined by the knowledge of an agent the action planer is invoked in order to plan
a set of tasks in order to fulfill the action. These tasks are then executed until they fail or get interrupted by an
updates world state. Then planing is re-done.

## Sensors

The Behemoth server is event-based, thus if for example an Bestia steps into the field of view of another Bestia the
eventing can register a sighting into the according visual sensor of the agent.
The sensor can also actively poll information about the world if their tick is invoked however.

The AI system in Bestia will set new standards. Bestias and NPCs alike should be able to create long-term plans, so-called
game plans or GPs for short. They then follow this strategy until observations or influences from the game world force them
to abandon this plan or the plan is fulfilled.

Available sensors are:

* Sight
* Hearing
* Temperature (Weather)
* Mana/Magic

Sensor information will be put into the Agent's Blackboard to access it later when considerations are made or action plans
are created.

## Behavior

If the agent is idle of some event has caused a currently running action to fail the behavior of the agent is generated.
Usually this are behavior trees or state machines for simpler NPCs in order to generate the desired behavior.

## Action Planning

As soon as the behavior phase generated the "how" to execute the behavior is planned. In order to do so a GOAP module is
used. It generates a list of all available action for the agent and then perform the best path in order to archive a certain
outcome. Usually the action inside this execution list transform one or multiple world variable to the desired state.
A set of transformable world variables follow. Every item, spell usage etc. must be designed with thee variables in mind.

### Variables

| Goal  | Precondition | Effect                      |
| ----- | ------------ | --------------------------- |
| Heal  | -            | Heals the agent             |
| Eat   | HasFood      | Agent will eat              |
| Sleep | -            | Increases "Rested" property |


### Actions List

| Actions    | Cost | Precondition                  | Effects                     |
| ---------- | ---- | ----------------------------- | --------------------------- |
| MoveTo     | x    | -                             | IsAtPosition                |
| UseSpell   | 1    | HasMana, HasConsumablesItems  | Depending on the skill used |
| GetItem    | 2    | DoesNotHaveItem, IsAtPosition |                             |
| EquipItem  | 2    | HasItem                       | Depending on the item       |
| UseItem    | 1    | HasItem                       | Depending on the item       |
| PickupItem | 1    | IsAtPosition                  | HasItem                     |

Example:

NPC is hurt and its AI behavior wants to archive the goal **Healing**. The NPC has a Healing spell but no mana to cast it
however it has a mana potion. It also knows that a HP potion lies in his house.

Heal(100HP)
UseItem(HealthPotion): HasItem(HealthPotion) 1
UseItem(HealthPotion): HasItem(HealthPotion) : PickupItem(HealthPotion) : MoveTo(x:10, y:20)
UseSpell(Lesser Heal): HasMana(10) : UseItem(ManaPotion) : HasItem(ManaPotion)

## Special Considerations

AI Blueprints are given as JSON files and AI agents are build from these Blueprints. The Bestia Behemoth
server decides what the tick rate of these agents are, to reduce the load on the server, agents without players near
They tick slower then agents which are currently actively engaged in player interaction.

If NPCs meet they should be able to exchange certain information from their blackboards by exchanging "gossip" this
should be also put into some kind of chat exchange which can be overheard by players.

## Literature

* [A Better Monster AI - Joseph Swing](http://www.roguebasin.com/index.php?title=A_Better_Monster_AI)
* [Modular AI Systems](https://www.youtube.com/watch?v=IvK0ZlNoxjw)
* [Goal-Oriented Action Planning: Ten Years of AI Programming](https://www.youtube.com/watch?v=gm7K68663rA)