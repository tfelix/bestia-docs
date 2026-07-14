---
name: docs-review
description: Review Bestia game-design docs (in content/docs) for design inconsistencies, typos/grammar, dead links, and incomplete sections. Use when asked to review, proofread, or QA a docs page or set of pages in this repo.
---

# Docs Review

Review the given file(s) under `content/docs`. If no file is specified, default to the file currently open in the IDE (per `ide_opened_file`/`ide_selection` context) — this takes priority over git status or whatever was most recently discussed in conversation. Only fall back to the most recently discussed file if nothing is open in the IDE. If it's ambiguous which file the user means, ask rather than guessing.

Report findings in these four categories:

1. **Inconsistencies in game design** — claims, numbers, or rules in this doc that contradict another doc in `content/docs`. Cross-check related pages (e.g. a mechanics overview page against the specific mechanic pages it summarizes) rather than reviewing the file in isolation. Only flag genuine contradictions, not differences in depth/phrasing.
2. **Typos and grammar** — misspellings, strange or incomplete sentences (fragments missing a verb, dangling clauses), inconsistent terminology, or accidental non-English words.
3. **Dead links** — for every internal link (`/docs/...` or relative), verify the target page actually exists under `content/docs` (accounting for Hugo `_index.md` routing and anchors where feasible). Note when a link's path style is inconsistent with the convention used elsewhere in the same file (e.g. missing `/docs` prefix).
4. **Incomplete sections** — sections that are noticeably thinner than their siblings, end abruptly, name-drop a mechanic without linking to where it's actually specified, or otherwise read as unfinished. For each, suggest concretely how to finish it (e.g. which existing page to link out to, or what's missing).

## Process

- Read the target file(s) fully first.
- Use Glob/Grep to enumerate `content/docs/**/*.md` and check any linked or referenced pages before flagging something as broken or inconsistent — verify against current file contents, don't guess.
- Report findings grouped under the four headings above, referencing exact line numbers.
- Do not edit the files unless the user asks you to apply the fixes — default to reporting only.
