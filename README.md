<p align="center">
  <img width="50%" src="img/logo.png">
</p>


# Bestia Documentation

[![Build Status](https://travis-ci.org/tfelix/bestia-docs.svg?branch=master)](https://travis-ci.org/tfelix/bestia-docs)
[![License: CC0](https://img.shields.io/badge/license-CC0-green)](LICENSE)

> Bestia is a MMORPG based on world exploration and emerging gameplay placed in a living and fully simulated environment.

This repository contains the central game design documents and guidelines of the [Bestia Game](https://bestia-game.net).
Bestia is a hobby project started many years ago and evolved in quite a large codebase. This documentation is an effort
to bring all the needed information together to allow others to read, understand and perhaps contribute to the game.

The documentation covers aspects of game design, client as well as the general server architecture and serves as an entry
point for everyone who wants to contribute to the project.

The documentation page can be found on [https://docs.bestia-game.net](https://docs.bestia-game.net)

The other project repositories are found here:

* [Behemoth Game Server](https://github.com/tfelix/bestia-behemoth)
* [Game Client](https://github.com/tfelix/bestia-client)

## Build

The documentation uses the static site generator [Hugo](https://gohugo.io/) to generate a nice documentation hompagenas well as the Book Theme via a git submodule.
In order to build the documentation [install Hugo](https://gohugo.io/getting-started/installing/) and then go to repo and call:

```bash
# Intialize the theme git submodule
git clone --recurse-submodules https://github.com/tfelix/bestia-docs
hugo server
```

If you already cloned the repository and only need to pull the book theme submodule this command can be used:

```bash
git submodule update --init --recursive
```

The website uses the [Book Theme for Hugo](https://github.com/alex-shpak/hugo-book) which is licenced under MIT License.

[![License: CC 0](https://licensebuttons.net/l/publicdomain/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/legalcode)
