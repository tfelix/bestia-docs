---
weight: 270
title: Releases and Deployment
description: How a release is cut with Release Please, what it ships (client downloads, server images, deploy bundle), how to run it on one host, and why the servers run on the JVM and not as native images.
---

# One version for everything

Client, servers and companion app share one version and always ship together: they speak one protocol, so
a mixed set would not work anyway. The version lives in `version.txt` at the repo root. Gradle reads it
for every module, and Release Please writes it into the other places that carry a version:

| File                                             | What reads it                                   |
| ------------------------------------------------ | ----------------------------------------------- |
| `version.txt`                                    | every Gradle module, e.g. the zone's `zone.version` |
| `bestia-client/src/Settings/settings_manager.gd` | the client's version label and handshake        |
| `companion-app/package.json`                     | the companion app                               |
| `deploy/compose.yaml`                            | the image tags the deploy bundle runs           |

So the tagged commit describes the release completely; nothing is filled in at build time.

`ProtocolVersion` in `authentication.proto` is not part of this. It changes by hand, when the wire
format breaks old clients.

# Cutting a release

Commit messages start with a [Conventional Commit](https://www.conventionalcommits.org/) prefix:
`feat:`, `fix:`, `perf:`, `refactor:`, `docs:`, `test:`, `build:`, `ci:` or `chore:`. Release Please
reads them to pick the next version and to write `CHANGELOG.md`. A commit without a prefix is left out
of the changelog. The repo rebase-merges, so this holds for every commit, not just the PR title.

1. Every push to `main` updates an open PR **"chore: release X.Y.Z"**. It holds the version bump and
   the changelog. It opens once `main` has a `feat:`, `fix:` or `perf:` commit since the last release.
2. Before merging it, run the tests locally (`./gradlew check`). The PR CI workflow is manual for now.
3. Merge the release PR. That tags `vX.Y.Z`, creates the GitHub release, and the same workflow run
   builds and attaches everything below.

Before 1.0, `feat:` and breaking changes bump the minor version, `fix:` the patch version.

# What a release ships

| Artifact                                     | Built from                                        |
| -------------------------------------------- | ------------------------------------------------- |
| `bestia-client-X.Y.Z-windows-x64.zip`        | Godot headless export, preset "Windows Desktop"   |
| `bestia-client-X.Y.Z-linux-x64.tar.gz`       | Godot headless export, preset "Linux"             |
| `ghcr.io/tfelix/bestia-zone-server:X.Y.Z`    | `docker/server.Dockerfile`                        |
| `ghcr.io/tfelix/bestia-login-server:X.Y.Z`   | same Dockerfile                                   |
| `ghcr.io/tfelix/bestia-api-server:X.Y.Z`     | same Dockerfile                                   |
| `bestia-deploy-X.Y.Z.zip`                    | `deploy/` plus the built companion app            |
| `SHA256SUMS`                                 | every download above                              |

Images are also tagged `X.Y` and `latest`. Every image and download has a build provenance attestation,
which `gh attestation verify` checks.

An exported client loads `Settings/release_settings.tres` instead of the local dev defaults, so it
connects to the public servers without setup. A player's own `settings.json` still overrides it.

# Running it on one host

The deploy bundle holds `compose.yaml`, `Caddyfile`, `.env.example` and the companion app in
`companion/`. It runs every server, a MariaDB per server, Valkey and Caddy.

First time:

```sh
unzip bestia-deploy-X.Y.Z.zip && cd bestia-deploy-X.Y.Z
cp .env.example .env    # fill in BESTIA_HOST and every secret
docker compose up -d
```

`BESTIA_HOST` is the public DNS name. Caddy gets the TLS certificate for it, and the passkeys are bound
to it: changing it later invalidates every passkey. The first zone start generates the world, which
takes a few minutes.

Update or roll back: unpack the bundle of the wanted version, copy `.env` into it, then

```sh
docker compose pull && docker compose up -d
```

The compose project is named `bestia`, so the volumes stay the same whatever the folder is called.

Caddy serves everything a browser talks to on one origin: the companion app, the login server's pages
and auth API, and the api-server. The companion app calls both servers with relative paths and keeps
its refresh token in a first-party cookie, so it depends on this. Caddy does not route the login
server's admin API or any actuator endpoint; reach those on the host itself.

Published ports: 80 and 443 (Caddy) and 8090 (the zone's game socket). Nothing else leaves the host.

# Why JVM images and not native images

GraalVM native images start in well under a second and use less memory. For these servers that is not
worth it, at least for now.

- **zone-server.** It runs for days and its boot is spent loading the world, so fast startup buys
  nothing. Its tick loop is long-running, CPU-bound code, which the HotSpot JIT usually runs faster than
  a native image without profile-guided optimization. Native Image CE also only has the Serial GC,
  whose pauses grow with the heap; the zone keeps the world on the heap, so ticks would jitter more.
  And it would need reachability metadata for the `org.reflections` classpath scan, `kotlin-reflect`,
  Netty and Hibernate.
- **login-server and api-server.** These would work: Spring Boot supports native images. Each would
  save a few hundred MB of memory. But each native build takes several minutes and several GB of RAM,
  WebAuthn, Thymeleaf and springdoc need extra hints, and the native build needs its own test run. On
  one host with spare memory the gain is small.

Look again when the servers run as many small instances, or need to scale to zero. The Dockerfile takes a
built artifact and only packages it, so one server can move to native without touching the others.

# Hosting the companion app elsewhere

The companion app is a static PWA, so GitHub Pages or a plain webspace could serve it. On another
origin it would need more than a new host, though:

- an API base URL instead of relative paths,
- CORS with credentials on the login server and the api-server (only the api-server's WebSocket has
  allowed origins today),
- a domain on the same site as the login server, or browsers block the refresh cookie as third-party,
- on GitHub Pages, a `404.html` fallback for the SPA routes.

Until then the app ships inside the deploy bundle and Caddy serves it.
