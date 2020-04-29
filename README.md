# Bestia Development Docs

[![Build Status](https://travis-ci.org/tfelix/bestia-docs.svg?branch=master)](https://travis-ci.org/tfelix/bestia-docs)
[![License: CC0](https://img.shields.io/badge/license-CC0-green)](LICENSE)

> Bestia is a MMORPG based on world exploration and emerging gameplay placed in a living and fully simulated environment.

This repository contains the central game design documents and guidelines of the [Bestia Game](https://bestia-game.net).
Bestia is a hobby project started many years ago and evolved in quite a large codebase. This documentation is an effort
to bring all the needed information together to allow others to read, understand and perhaps contribute to the game.

The documentation covers aspects of game design, client as well as the server architecture.

> This is a work in progress not all server and client docs are currently available

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
