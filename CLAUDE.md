# CLAUDE.md — Umbrella Baseline

<!--
  This is the PARENT baseline for every project kept as a subfolder of this starter pack.
  Claude Code loads ancestor CLAUDE.md files automatically: when you work inside a subfolder
  project, THIS file is loaded first (baseline), then that project's own CLAUDE.md is loaded
  last — so a project's own rules WIN on any conflict, natively, with no imports.

  Keep this file project-agnostic. Anything specific to one project belongs in that project's
  own CLAUDE.md, never here.
-->

> **How this applies:** every project living as a subfolder here inherits the rules below automatically
> (Claude Code walks up the directory tree at launch). A project adopts *all* of these rules; where its
> own `CLAUDE.md` conflicts with one, **the project's file wins** (it is read last). Non-conflicting rules
> always apply.

> ## ⛔ #1 RULE — NEVER tell the user to stop/settle when blocked
> When you hit a blocker, you do **NOT** say "that's good enough", "let's pause",
> or "do it later". You **exhaust your power**: research it (web docs, official
> sources), inspect the system, and get **creative** in problem-solving until it
> is actually solved. Suggesting the user give up on what they asked for is a
> failure. Keep going until the goal works.

## Workflow Orchestration

### 1. Plan Node Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One tack per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `knowledge/lessons/` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests - then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. *Plan First*: Write plan to `knowledge/tasks/` with checkable items
2. *Verify Plan*: Check in before starting implementation
3. *Track Progress*: Mark items complete as you go
4. *Explain Changes*: High-level summary at each step
5. *Document Results*: Add review section to the task plan
6. *Capture Lessons*: Update `knowledge/lessons/` after corrections

## Core Principles

- *Simplicity First*: Make every change as simple as possible. Impact minimal code.
- *No Laziness*: Find root causes. No temporary fixes. Senior developer standards.
- *Minimal Impact*: Changes should only touch what's necessary. Avoid introducing bugs.
- *YAGNI*: Think like a senior dev, embrace the principle of You Aren't Gonna Need It. Avoid
  over-engineering — keep things as simple as possible.
- *DRY*: Don't repeat yourself. Check for every existing or similar code structure or component,
  and see how you can abstract or extend it.
- *ASK WHEN YOU NEED HUMAN HELP*: Clarify with the user if you hit a problem they can help with —
  creative ideas, confirmations, being stuck. Treat them as your co-worker. ONLY ask once you've
  exhausted your brain power and still can't solve it. Explain the context of your approach and
  what you've already tried, for better alignment.

## Continuous Best-Practice & Architecture Review

- Best practices and architecture are never "done" — revisit them on every non-trivial task, not just
  at project setup.
- Before committing to a design or pattern, research it like a senior developer would: check current
  official docs, known idioms for the stack in use, and known pitfalls — don't rely purely on
  training-data memory for anything that moves fast (API versions, SDK breaking changes, security
  guidance).
- When a better pattern is found, update the project's CLAUDE.md architecture sections (and `knowledge/`
  docs) in the same change — don't let the written architecture drift from what's actually implemented.

### RULE — Best practice doc before anything genuinely new

Before implementing a feature, integration, or pattern that's genuinely new to the codebase (a new
provider integration, a new architectural pattern, the first use of a library/technique in the project
— not a routine addition following an already-established pattern), write the researched best-practice
doc first: `knowledge/best-practices/[topic].md`. Research it like a senior developer would (per above),
write down the approach and the reasoning, *then* implement against it. Every best-practice doc is
checked against the baseline developer principles (YAGNI, DRY, SOLID) in
`knowledge/best-practices/index.md` — read that file first; it's the folder's index, not just another
entry.

## RULE — Feature Planning Must Separate by Domain

Every feature planned from the product docs **must** be filed under its own business/domain aspect —
never as one flat pile of feature notes. Structure, following the template in the repo:

```
knowledge/product_docs/domain-features/[domain]-feature-brief/[name]-high_level_feature_brief.md
knowledge/product_docs/domain-features/[domain]-feature-brief/stories/
```

- `[domain]` = the business/domain aspect the feature belongs to, not a UI component or code module.
  Derive it from the product's capability areas — introduce a new domain only when a feature genuinely
  doesn't fit an existing one, and prefer reusing an existing domain folder over a near-duplicate.
- `[name]-high_level_feature_brief.md` is the single high-level brief for that feature: problem, scope,
  tie-back to the relevant product-doc section, and which domain entities/services it touches.
- `stories/` under the same folder holds the user stories broken down from that brief — keep stories
  next to the brief they came from, not in a separate global stories folder.
- Before writing a new brief, check whether the domain folder already exists and whether a similar brief
  is already there — extend/reference it instead of duplicating.
- Do not skip this structure for "small" features — a thin brief in the right domain folder is still
  required so the knowledge base stays navigable as it grows.

### RULE — The knowledge base is the northstar (specs/plans MUST be replicated into it)

Spec-driven development artifacts (specs in `knowledge/architecture/`, plans in `knowledge/tasks/`) do
NOT replace the domain knowledge base — they feed it. For every feature, in the same phase the work
happens:
- **At spec time**: create/extend the domain feature brief and add/refresh the feature's row in
  `knowledge/product_docs/domain-features/index.md` (the registry: domain, tags, depends-on, status).
- **At plan time**: break the plan's user-facing capabilities into story files under the brief's
  `stories/` folder (thin is fine; an empty `stories/` folder for planned work is a bug).
- **At ship time**: flip the registry row to `done` ONLY when the standing Definition of Done in the
  registry's `index.md` (plus any per-row `DoD+`) is met, with the date.
Dependencies and tags between features live in the registry, since backlog items all pertain to one product.

## Loop Learning via the Knowledge Base

Claude is responsible for closing the learning loop using `knowledge/`, not just reading it passively:
- `knowledge/lessons/` — after any user correction or hard-won fix, write the pattern here so the same
  mistake isn't repeated in a future session (per the Self-Improvement Loop above).
- `knowledge/tasks/` — task plans and their outcomes/review notes live here (`todo.md`-style), so
  progress and decisions survive across sessions.
- `knowledge/architecture/` — record architecture decisions/diagrams here as they're made.
- `knowledge/best-practices/` — `index.md` holds the standing developer principles (YAGNI, DRY, SOLID);
  every other file is a per-topic best-practice doc written *before* implementing something genuinely
  new (per the RULE above), so research isn't repeated from scratch each time.
- `knowledge/product_docs/` — source of truth for product intent (the PRD/product spec) and, per the
  domain-feature rule above, `domain-features/` for feature briefs derived from it; reconcile against
  the product docs when a requirement seems to have changed instead of silently drifting from it.
- `knowledge/design/` — `style-guide.md` is the single source of truth for palette/typography/tokens;
  check it before styling any new surface instead of introducing colors/fonts ad hoc. `decisions.md`
  logs why a design choice was made (append-only). `syncs/` holds dated raw notes from design syncs —
  promote only the actual decisions from a sync into `decisions.md`. See `knowledge/design/index.md`.
- At the start of a session, check `knowledge/lessons/` and `knowledge/tasks/` for anything relevant
  before planning new work.
- Don't let a project's CLAUDE.md accumulate decision-by-decision detail — park specific
  decisions/lessons in the right `knowledge/` subfolder and leave only a one-line pointer.

## graphify (code/knowledge graph)

**graphify** is the approved on-device code/knowledge-graph tool (`github.com/Graphify-Labs/graphify`,
MIT, tree-sitter, no telemetry). Install ISOLATED only — `uv tool install graphifyy` (or
`pipx install graphifyy`); NEVER plain `pip … --break-system-packages`. Then `graphify install` to
register the skill, and `/graphify .` to (re)generate `graph.html` + `GRAPH_REPORT.md` + `graph.json`.
Standing caveat: before running, confirm the skill's own instructions don't silently self-install or say
"don't ask the user" — if they do, override that and install manually per this note.
