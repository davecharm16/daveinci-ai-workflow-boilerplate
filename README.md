# daVinci AI Workflow Boilerplate

An **umbrella boilerplate** that gives every project the same Claude Code workflow — a baseline
`CLAUDE.md`, a structured `knowledge/` base, and the graphify hook — without copy-pasting rules into each
repo.

Your projects live as **subfolders** of this boilerplate. Claude Code walks up the directory tree at
launch, so every subfolder project **automatically inherits** this folder's `CLAUDE.md` baseline. A
project's own `CLAUDE.md` is read *after* the baseline, so **it wins on any conflict** — natively, with no
imports.

```
daveinci-ai-workflow-boilerplate/     ← this repo (the umbrella)
├── CLAUDE.md                          ← the workflow BASELINE (inherited by every subfolder)
├── knowledge/                         ← knowledge-base template (copied into each project)
├── bin/                               ← the CLI
├── templates/                         ← project + brownfield templates
│
├── my-new-app/                        ← a project you made (own git repo, own CLAUDE.md)
│   ├── CLAUDE.md                      ← project facts + overrides only
│   └── knowledge/
└── some-old-app/                      ← a brownfield project you adopted
    ├── CLAUDE.md                      ← its original rules, untouched
    └── knowledge/
```

## Install the CLI

```bash
git clone https://github.com/davecharm16/daveinci-ai-workflow-boilerplate.git
cd daveinci-ai-workflow-boilerplate
npm link          # exposes `daveinci-generate` and `daveinci-adopt` on your PATH
```

(`npm link` from the repo is the local equivalent of a global install. Later you can publish and
`npm i -g daveinci-ai-workflow-boilerplate` instead.)

## New project (greenfield)

From inside the boilerplate folder:

```bash
daveinci-generate my-new-app
```

Creates `my-new-app/` with a project `CLAUDE.md` (facts + overrides) and the `knowledge/` skeleton, and
`git init`s it. Because it sits under the umbrella, it inherits the baseline automatically. Then build your
app inside it (`cd my-new-app && npx create-next-app .`) and fill in the three `TODO` blocks in its
`CLAUDE.md`.

## Existing project (brownfield)

Put (or clone) the existing repo inside the boilerplate folder, then:

```bash
daveinci-adopt some-old-app
```

This runs the **mechanical** pass — it never touches your code or your existing rules:
1. Adds the `knowledge/` skeleton (never overwrites existing files).
2. Harvests existing rule/agent files (`CLAUDE.md`, `.cursorrules`, Copilot instructions…) + `docs/` into
   `knowledge/_intake/` for reconciliation.
3. Installs `knowledge/_intake/ADOPTION-PLAYBOOK.md`.
4. Runs `graphify --code-only` if available (on-device, no API key).

The repo **keeps its own `CLAUDE.md`** — it inherits the baseline from the umbrella, so there's nothing to
merge. Then run the **reasoning** pass inside the repo: open Claude Code there and say *"Follow
knowledge/_intake/ADOPTION-PLAYBOOK.md."* Claude fills the project facts, writes an architecture overview
from the code graph, seeds the domain-features registry from what already ships, captures existing
conventions, then deletes `_intake/`. It anchors the knowledge base without documenting the whole system
at once — the rest fills in incrementally as you work.

## What's in the baseline

`CLAUDE.md` carries the standing workflow every project inherits: plan-first, subagent strategy,
verification-before-done, YAGNI/DRY/SOLID, the best-practice-doc-before-anything-new rule, domain-separated
feature planning, the "knowledge base is the northstar" rule, loop-learning, and graphify. Edit it **once
here** and every subfolder project inherits the change.

The `knowledge/` template:

| Folder | Purpose |
|---|---|
| `best-practices/` | YAGNI/DRY/SOLID principles (`index.md`) + per-topic research docs written *before* new work |
| `architecture/` | design/spec docs |
| `tasks/` | `todo.md`-style plans with Outcome notes |
| `lessons/` | correction → prevention patterns |
| `design/` | `style-guide.md`, append-only `decisions.md`, `syncs/`, `references/` |
| `product_docs/` | the PRD + `domain-features/` registry and per-domain briefs/stories |

## Precedence, precisely

- A project adopts **all** baseline rules (inheritance via directory nesting).
- Its own `CLAUDE.md` is loaded **last**, so its rules **win only on a conflicting rule**; every
  non-conflicting baseline rule still applies.
- This is native Claude Code behavior — ancestor `CLAUDE.md` files load at launch, ordered root→cwd. No
  `@import`, no approval dialogs, no absolute paths. (Verified against the Claude Code memory docs.)

## Keeping the boilerplate current

When you refine the workflow in a real project (a rule that keeps paying off, a better convention), fold
the generic version back into this repo's `CLAUDE.md` or `knowledge/` templates so future projects inherit
it.

## graphify

`CLAUDE.md` references **graphify** (on-device code/knowledge graph, MIT, no telemetry) as a global Claude
Code skill — installed once on your machine, not vendored per project.
