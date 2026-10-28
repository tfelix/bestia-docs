---
title: Using the Map
weight: 1150
description: How the world map is worked in the game and in the companion app - the controls, grid references, marks, routes and the town card - and where all of it is kept.
---

The [explored world map](/docs/mechanics/world-exploration/#explored-world-map) is the same map in the game
(M) and in the companion app, and it is worked the same way in both: one action asks what is there, and a
card says what can be done about it. Nothing needs a second mouse button, so a phone works the map as well as
a desk does.

# Controls

| What you want             | Game (mouse)                                     | Companion (touch)                     |
| ------------------------- | ------------------------------------------------ | ------------------------------------- |
| Move the map              | drag                                             | drag with one finger                  |
| Zoom                      | wheel                                            | pinch, or the + and - buttons         |
| See what something is     | rest the pointer on it                           | tap it                                |
| Ask what is there         | click: opens the card                            | tap: opens the card                   |
| Go there at once          | right-click                                      | the card's **Go here**                |
| Plan a route              | **Route** (or R), then click each stop           | **Route**, then tap each stop         |
| Move or remove a stop     | drag it; right-click it to take it away          | drag it; tap it to take it away       |
| Send the planned route    | Enter, or **Go**                                 | **Go**                                |
| Mark a place              | the card's **Mark here**, or Shift + right-click | the card's **Mark here**              |
| Rename or delete a mark   | click it, then **Rename** or **Delete**          | tap it, then **Rename** or **Delete** |
| Show the grid             | **Grid** (or G)                                  | **Grid**                              |

Leaving route mode drops the stops planned so far. In the game **Go**, **Clear** and **Keep as route** each end
route mode as well, and Escape undoes one thing at a time: the card, then route mode, then the map itself. A click on the minimap opens the full map at that point.

# The Card

What a click or a tap opens. It names what is there - a town, a shop, an inn, one of your marks, one of your
Bestias or open ground - with its grid reference and how far it is from the Bestia you are sending, and offers
**Go here**, **Add to route** and, on open ground, **Mark here**.

A town's card also lists every shop, market, inn, temple, guard post and ward stone it has that you have
charted, each with its own **Go** - even at a zoom where none of them are drawn.

# Grid References

The world is cut into squares of 8 km, named like a chessboard: a letter for the column counted from the west,
a number for the row counted from the south. A 128 km world runs from **A1** in the south-west to **P16**.

Inside a square a place is given by equal halves of digits, east first and then north, and the more digits the
finer the cell:

| Reference       | Names a cell of |
| --------------- | --------------- |
| `H12`           | 8 km            |
| `H12 4 3`       | 1 km            |
| `H12 41 37`     | 100 m           |
| `H12 413 372`   | 10 m            |
| `H12 4130 3725` | 1 m             |

The first digit of each half is 0 to 7, since a square is 8 km across. `H12 4137` is the same as `H12 41 37`.

The map shows the reference under the pointer, and the card shows the reference of whatever it is about.
The search box takes a reference or the name of a place you have charted. For a GM, `/mm` takes one too -
`/mm H12 41 37`, or a settlement's name.

# Marks, Routes and Preferences

Your marks, your saved routes and how you like the map drawn - which kinds of service the legend hides, and
whether the grid is shown - are kept on the server, in your **notebook**, one for each master. The game and the
companion app read and write the same notebook, so a route saved in one shows up in the other at once, without
reloading. A master keeps up to 200 marks and 32 routes.

Settings that belong to one device rather than to you - graphics, sound, the window - stay on that device.
