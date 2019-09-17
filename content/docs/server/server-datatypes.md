# Datatypes

All locations and entities are represented via fixed point numbers to avoid incorrectness with floating points
over a bigger distance [(see The perils of floating point](http://www.stat.cmu.edu/~brian/711/week03/perils-of-floating-point.pdf)).

## Positioning

The basic datastructures for positioning and collisions are found in `net.bestia.model.geometry`. Most notable the `Vector3` datatype.

It uses long as datatypes for the coordinates and thus has a range between `-9.223.372.036.854.775.808` to
`9.223.372.036.854.775.807` which means if we can represent at the best a position resolution of 1mm. So our
maximum world size is:

| Size                    | Unit |
| :---------------------- | ---: |
| +-9.223.372.036.854.775 |    m |
| +-9.223.372.036.854     |   km |

which is more then enough.
