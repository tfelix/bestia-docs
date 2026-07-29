---
name: lotusdocs-tables
description: How tables work in this Lotus Docs Hugo site — the {{< table >}} shortcode, its styling options, and what "responsive" actually does (and doesn't do). Use when authoring, styling, or fixing markdown tables under content/docs, or when asked about responsive/dynamic tables.
---

# Lotus Docs Tables

This site uses the [Lotus Docs](https://github.com/colinwilson/lotusdocs) theme as a Hugo
module (see `hugo.yaml`). Plain markdown tables render with minimal styling; the theme's
`table` shortcode opts into Bootstrap 5 table styling.

## Usage

Wrap a normal markdown table in the shortcode. The first positional argument is a
space-separated list of Bootstrap table classes:

```go
{{< table "table-striped table-sm" >}}
| Type       | Description                     |
| ---------- | ------------------------------- |
| **Gather** | Deliver _N_ units of a resource |
{{< /table >}}
```

With no argument, `{{< table >}}` gives a bordered table with a borderless floating header.
This is the form used throughout `content/docs/mechanics/`.

## Supported options

Only these Bootstrap classes are compatible with Lotus Docs:

| Option                  | Effect                         |
| ----------------------- | ------------------------------ |
| `table-striped`         | Zebra-striped rows             |
| `table-striped-columns` | Zebra-striped columns          |
| `table-hover`           | Row hover highlight            |
| `table-borderless`      | Removes all borders            |
| `table-sm`              | Reduced cell padding           |
| `table-xs`              | Extremely compact              |
| `table-responsive`      | Intended for horizontal scroll |

## There is no "dynamic" table

Lotus Docs has **no** sortable, filterable, or paginated table feature (nothing
DataTables-like). Every option above is purely cosmetic CSS. Don't promise interactivity
the theme can't deliver — if a table genuinely needs it, that means a custom shortcode
plus JS in `layouts/shortcodes/`.

## `table-responsive` caveat

Two things to know before reaching for it:

1. **It does nothing on narrow tables.** Bootstrap's `table-responsive` only produces
   horizontal scrolling when the table can't shrink to fit. A 2-column table of prose
   just wraps its cells instead. It's only meaningful for wide, many-column tables
   (e.g. the generated equipment/item lists).

2. **The theme applies the class to the wrong element.** The upstream
   `layouts/shortcodes/table.html` is a string replacement that stamps the classes onto
   `<table>` itself:

   ```go
   {{ $new := printf "<table class=\"table %s\">" $class }}
   ```

   Bootstrap's `.table-responsive` is `overflow-x: auto`, which browsers don't honor on
   `display: table` elements — it's designed for a *wrapper* div
   (`<div class="table-responsive"><table class="table">…</table></div>`). So as shipped,
   the class is effectively a no-op even on tables that do overflow.

To get working horizontal scroll, override the shortcode locally by adding
`layouts/shortcodes/table.html` (this repo already overrides several theme shortcodes in
that directory) and emit the wrapper div instead of putting the class on `<table>`.

## Guidance for authoring

- Default to bare `{{< table >}}` to match the rest of the docs.
- Reach for `table-striped` or `table-sm` on long reference tables where row scanning matters.
- Don't add `table-responsive` to 2-column tables — it buys nothing and is misleading.
- Keep the markdown pipe table itself well-aligned; the surrounding docs do this consistently.
