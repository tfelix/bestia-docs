# Client Architecture

In general we rely on the features of the Godot engine and its network stack. Incoming server messages are transferred to the bestia module which transforms them into usable messages which are then either emitted into the GD scripting part of the engine or internally routed to the entity manager which keeps track of entities and their components.
How certain effects are setup is not subject for this documentation. This is just an overview on how the server is communicating with the client and how this information is used to visualize the game content to the user.

Network IO -> Mod: Bytes -> ProtoMsg is directed to the EntityManager, figures out the target entity.

## EntityManager

- Reserves local IDs
- Keeps track of entities and their components
- Updates components and signal changes
- If Entity is deleted it gets informed and removes it

## EntityNode

- Signals change in components
- Informs the EntityManager about creation and deletion

## ComponentSetter

- Sets component values via the editor
- Creates ProtoMsg from exports and notifies the EntityManager
- ComponentNodes should still be defined in the Editor -> Must link to the Manager in order to get them added.
