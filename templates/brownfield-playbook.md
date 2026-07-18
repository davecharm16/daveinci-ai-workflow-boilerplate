# Brownfield Adoption — Synthesis Playbook

> This file was installed into `knowledge/_intake/ADOPTION-PLAYBOOK.md` by `daveinci-adopt`.
> The mechanical harvest already ran (existing rules + docs staged in `_intake/`, code graph generated,
> `knowledge/` skeleton laid down). **Your job now is the reasoning pass**: turn what exists into a
> populated knowledge base, then clean up. Follow the stages in order. Use subagents for the parallel
> work. When done, delete `knowledge/_intake/` and this file.
>
> This repo inherits the workflow **baseline** from the parent boilerplate `CLAUDE.md` automatically
> (Claude Code loads ancestor CLAUDE.md files at launch), as long as the repo sits inside the
> `daveinci-ai-workflow-boilerplate` umbrella folder. If it doesn't, move it there first so the baseline
> applies. Nothing was added to this repo's own `CLAUDE.md`.

## Governing rule — don't boil the ocean

A brownfield backfill is unbounded. Do **not** try to document the whole system now. Seed the *anchors*
(Stages 1–3), then stop — from then on, every new task fills in only the knowledge slice it touches (the
"knowledge base is the northstar" rule in `CLAUDE.md` drives that incrementally). If a stage is getting
deep, capture the map and the open questions, not every detail.

## What's waiting for you in `knowledge/_intake/`

- `existing-rules/` — any `CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `.cursor/rules/`,
  `.github/copilot-instructions.md`, `.windsurfrules`, `.clinerules` the repo already had.
- `existing-docs/` — root `*.md`, `docs/`, `ADR/` copied for reference.
- `GRAPH_REPORT.md` / `graph.json` at repo root — the graphify code graph (if graphify was available;
  if not, run `/graphify .` yourself first).
- The repo **keeps its own `CLAUDE.md` untouched** — it inherits the baseline from the parent umbrella via
  directory nesting, so there is nothing to link or merge. The original CLAUDE.md is also copied to
  `_intake/existing-rules/CLAUDE.md.orig` for reference during reconciliation.

---

## Stage 0 — Reconcile the repo's OWN rules (not the baseline)

The baseline is already inherited from the parent umbrella — do NOT copy workflow rules into the repo's
CLAUDE.md. Your job here is only the repo's *project-specific* material:

1. Fill the three project-fact blocks in `CLAUDE.md` (Project status / Commands / Code layout) from what
   you learn in Stage 1.
2. Go through `_intake/existing-rules/` (the old CLAUDE.md, Cursor rules, Copilot instructions, etc.) and
   pull out **genuinely project-specific** rules — ones the code actually follows that the baseline doesn't
   cover. Put them in `CLAUDE.md` under "Project-specific rule overrides" (or promote to `best-practices/`
   in Stage 3). Skip anything the baseline already says — the repo inherits that from the umbrella;
   duplicating it just risks conflicts.
3. **De-dupe against the user's global `~/.claude/CLAUDE.md`** — if a rule is already global, don't repeat
   it in the project file either.

## Stage 1 — Map the system as-is

Goal: `knowledge/architecture/0000-system-overview.md` describing the system **that exists**, not an
aspirational one.

1. Read `GRAPH_REPORT.md` (god nodes, communities, high-connectivity files) + tour entry points, routing,
   data layer, and config.
2. Write the overview: the module/domain map, the main data flows, the external integrations/seams, the
   data model at a high level, and a short "smells / open questions" section. Cite real files.

## Stage 2 — Seed the domain-features registry from reality

Goal: `knowledge/product_docs/domain-features/index.md` reflects what already ships, plus a stub brief per
domain.

1. From the overview, list the product's **capability areas** (domains) — business aspects, not code
   modules.
2. **Dispatch one subagent per domain, in parallel**, each to: identify what in that domain already ships,
   which files implement it, and draft a thin `<domain>-feature-brief/` (problem, scope, entities touched).
3. Add a registry row per shipped feature with status **`done`** but tagged **`DoD-unverified`** in Notes —
   because it shipped before this process, its Definition of Done was never checked here. Don't claim green
   tests/reviews you didn't run.
4. Delete the example `[domain]-feature-brief/` template folder once real domains exist.

## Stage 3 — Capture the conventions & design tokens that already exist

Goal: stop future-you from "introducing" patterns the codebase already has.

1. Retroactive `best-practices/*.md`: the real, load-bearing conventions the code already follows (error
   handling, folder rules, testing approach, provider seams). One doc per genuinely-distinct convention —
   check each against YAGNI/DRY/SOLID in `best-practices/index.md`. Fold in anything salvaged from
   `_intake/existing-rules/`.
2. Populate `design/style-guide.md` from real values in the code (palette, fonts, spacing, radii — grep the
   theme/CSS/config). Log any notable "why" in `design/decisions.md`.

## Stage 4 — Seed lessons (from here forward)

Don't reconstruct every past mistake. Do capture any real gotcha you hit during Stages 1–3 (a build quirk,
a non-obvious constraint) as a `knowledge/lessons/<slug>.md`. The loop runs forward from now.

## Stage 5 — Clean up

1. Delete `knowledge/_intake/` (its contents are now reconciled into the knowledge base).
2. Delete this playbook file.
3. Summarize for the user: what got seeded, what was intentionally left for incremental backfill, and any
   open questions from Stage 1.
