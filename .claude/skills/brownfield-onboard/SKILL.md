---
name: brownfield-onboard
description: Use right after an existing/brownfield project has been pasted or moved INTO this daVinci shell folder (or after `daveinci-adopt` ran), when the knowledge/ base and the CLAUDE.md "Project status / Commands / Code layout" blocks are still empty or TODO. Reverse-engineers the real codebase into high-level knowledge — fills those three CLAUDE.md blocks, writes an architecture overview, seeds the domain-features registry from what already ships, and captures existing conventions. Trigger phrases: "onboard this project", "populate the knowledge base", "brownfield onboard", "fill in the CLAUDE.md facts from the code".
---

# Brownfield onboarding — populate the knowledge base from real code

You are inside a daVinci shell that now contains an existing project's code. The workflow rules are already
in `CLAUDE.md`; what's missing is the **project-specific** high-level info. Your job: derive it **from the
actual code**, not from assumptions. Use subagents for the parallel work.

## ⚠ Governing rule — anchor, don't boil the ocean
A brownfield backfill is unbounded. Seed the **anchors** (Steps 1–4) and stop — from then on, every future
task fills only the knowledge slice it touches (the "knowledge base is the northstar" rule already drives
that). If a step gets deep, capture the map and the open questions, not every detail.

## Step 0 — Orient
1. If `knowledge/_intake/` exists (from `daveinci-adopt`), read it first — it has the harvested existing
   rules (`existing-rules/`), docs (`existing-docs/`), and the workflow baseline (`workflow-baseline.md`).
2. Find the project root and stack: read `package.json` / `pyproject.toml` / `go.mod` / etc., the README,
   config files, and the main entry points.
3. If `graphify` is available, run `/graphify .` for a code graph (`GRAPH_REPORT.md` = god nodes,
   communities, high-connectivity files). If not, map the codebase by reading key directories.

## Step 1 — Fill the CLAUDE.md project-fact blocks
Edit the three TODO blocks at the top of `CLAUDE.md` from what the code actually shows:
- **Project status** — what this project is, what's built, where the spec/PRD lives (if any).
- **Commands** — the real dev / build / lint / test / migrate commands (pull them from `package.json`
  scripts, Makefile, CI config), plus any seed creds / env vars you can see.
- **Code layout** — the binding directory map: where routes/handlers, business logic, seams/providers,
  glue, and design tokens live. Cite real paths.

## Step 2 — Architecture overview
Write `knowledge/architecture/0000-system-overview.md` describing the system **as it exists** (not
aspirational): the module/domain map, main data flows, external integrations/seams, the data model at a
high level, and a short "smells / open questions" section. Cite real files.

## Step 3 — Seed the domain-features registry (subagents, in parallel)
1. From the overview, list the product's **capability areas** (business domains, not code modules).
2. Dispatch **one subagent per domain in parallel**, each to: identify what already ships in that domain,
   which files implement it, and draft a thin `<domain>-feature-brief/` (problem, scope, entities touched)
   under `knowledge/product_docs/domain-features/`.
3. Add a registry row per shipped feature in `domain-features/index.md` with status **`done`** but tagged
   **`DoD-unverified`** in Notes — it shipped before this process, so its Definition of Done was never
   checked here. Don't claim green tests/reviews you didn't run.
4. Delete the example `[domain]-feature-brief/` template folder once real domains exist.

## Step 4 — Capture conventions + design tokens
1. Retroactive `knowledge/best-practices/*.md`: the real, load-bearing conventions the code already follows
   (error handling, folder rules, testing approach, provider seams). One doc per genuinely-distinct
   convention — check each against YAGNI/DRY/SOLID in `best-practices/index.md`.
2. Populate `knowledge/design/style-guide.md` from real values in the code (palette, fonts, spacing, radii
   — grep the theme/CSS/config). Log any notable "why" in `design/decisions.md`.

## Step 5 — Reconcile the project's own existing rules
If the pasted project brought its own `CLAUDE.md` / `.cursorrules` / Copilot instructions (in the repo or
in `_intake/existing-rules/`), pull genuinely project-specific rules into this shell's `CLAUDE.md` under a
"Project-specific rule overrides" section. The workflow baseline is already in CLAUDE.md — don't duplicate
it. De-dupe against the user's global `~/.claude/CLAUDE.md` too.

## Step 6 — Clean up & report
1. Delete `knowledge/_intake/` if it exists (its contents are now reconciled in).
2. Summarize for the user: what got seeded, what was intentionally left for incremental backfill, and any
   open questions from Step 2.
