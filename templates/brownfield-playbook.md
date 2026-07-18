# Brownfield Adoption — Synthesis Playbook

> This file was installed into `knowledge/_intake/ADOPTION-PLAYBOOK.md` by `daveinci-adopt`.
> The mechanical harvest already ran (existing rules + docs staged in `_intake/`, code graph generated,
> `knowledge/` skeleton laid down). **Your job now is the reasoning pass**: turn what exists into a
> populated knowledge base, then clean up. Follow the stages in order. Use subagents for the parallel
> work. When done, delete `knowledge/_intake/` and this file.
>
> This repo is becoming a **self-contained daVinci shell**: it now has the `knowledge/` base, and the
> canonical workflow is staged at `_intake/workflow-baseline.md`. If the repo had no `CLAUDE.md`, one was
> already stamped (full workflow + project-facts). If it already had one, it was left untouched — you
> merge the baseline into it in Stage 0, with the repo's own rules winning on conflict.

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
- `_intake/workflow-baseline.md` — the canonical daVinci workflow to merge into this repo's `CLAUDE.md`.
- The repo's original `CLAUDE.md` (if any) is at `_intake/existing-rules/CLAUDE.md.orig`.

---

## Stage 0 — Make the CLAUDE.md self-contained

Goal: one `CLAUDE.md` that has the full workflow baseline **and** this repo's real project facts/rules.

1. If a `CLAUDE.md` was already stamped by the tool (the repo had none), just fill its three project-fact
   blocks (Project status / Commands / Code layout) from what you learn in Stage 1 — the baseline is
   already in it.
2. If the repo had its **own** `CLAUDE.md` (left untouched), merge `_intake/workflow-baseline.md` into it:
   keep the repo's existing project facts and rules, append the baseline workflow, and where the repo's
   own rule conflicts with a baseline rule, **the repo's rule wins** — put it after the baseline or note
   the override explicitly.
3. Pull any genuinely project-specific rules out of `_intake/existing-rules/` (Cursor rules, Copilot
   instructions, old CLAUDE.md) into the repo's CLAUDE.md. **De-dupe against the user's global
   `~/.claude/CLAUDE.md`** — don't repeat a rule that's already global.

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
