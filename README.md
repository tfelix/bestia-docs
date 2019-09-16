# Bestia Development Docs

[![Build Status](https://travis-ci.org/tfelix/bestia-docs.svg?branch=master)](https://travis-ci.org/tfelix/bestia-docs)

This repository contains the central game design documents and guidelines of the [Bestia Game](https://bestia-game.net).

> Bestia is a MMORPG based on world exploration and emerging gameplay placed in a living and fully simulated environment.

The documentation should enable any developer to dive into the code and start extending the game or even propose
changes to the gamedesign itself.

Currently only the documents for the central game design are online. Architectural documentation for the client and the server
will be added one after the other.

The documentation page can be found on [https://docs.bestia-game.net](https://docs.bestia-game.net)

The Bestia Client itself can be found under [http://tfelix.github.io/bestia-client](https://tfelix.github.io/bestia-client/).


## Build

The documentation uses the static site generator [Hugo](https://gohugo.io/) to generate a nice documentation hompage. In order to build
the documentation [install Hugo](https://gohugo.io/getting-started/installing/) and then go to repo and call:

```bash
hugo server --theme book
```

The website uses the [Book Theme for Hugo](https://github.com/alex-shpak/hugo-book) which is licenced under MIT License.

[![License: CC 0](https://licensebuttons.net/l/publicdomain/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/legalcode)
