# daVinci AI Workflow Boilerplate

A **reusable project shell** for Claude Code. It carries a battle-tested `CLAUDE.md` workflow and a
structured `knowledge/` base. Stamp out a fresh shell per project, then drop or build your app **inside**
it — the app gets the whole workflow from day one.

```
daveinci-ai-workflow-boilerplate/   ← the stamp (this repo; stays put)

my-project/                         ← a shell you stamped (anywhere you like)
├── CLAUDE.md                       ← the FULL workflow rules + this project's facts (self-contained)
├── knowledge/                      ← the knowledge base
└── <your app: src/, package.json…> ← your actual project lives inside the shell
```

Each stamped shell is **self-contained** — it holds its own copy of the workflow. No nesting, no imports,
no links back to this repo.

## Install the CLI

```bash
git clone https://github.com/davecharm16/daveinci-ai-workflow-boilerplate.git
cd daveinci-ai-workflow-boilerplate
npm link          # exposes `daveinci-generate` and `daveinci-adopt` on your PATH
```

(Or, on any machine without cloning: `npm install -g github:davecharm16/daveinci-ai-workflow-boilerplate`.)

## New project

```bash
daveinci-generate my-project        # creates ./my-project/ (a fresh shell)
cd my-project
npx create-next-app .               # …or move your existing app files in here
```

`my-project/` now has a self-contained `CLAUDE.md` (full workflow + `TODO` project-fact blocks to fill)
and the `knowledge/` base. Build your app right inside it.

## Existing project (brownfield)

Two ways — both end with the **`/brownfield-onboard` skill**, which reverse-engineers the code into the
knowledge base (it ships in every shell's `.claude/skills/`).

**Way 1 — generate a shell and paste your code in:**
```bash
daveinci-generate my-app
mv ~/path/to/existing-project/* my-app/   # paste/move your code inside the shell
cd my-app
claude                                     # then run:  /brownfield-onboard
```

**Way 2 — retrofit in place:**
```bash
daveinci-adopt path/to/existing-repo       # adds knowledge/ + .claude/, harvests old rules, no code touched
cd path/to/existing-repo
claude                                      # then run:  /brownfield-onboard
```

The `/brownfield-onboard` skill then: fills the CLAUDE.md `Project status / Commands / Code layout` blocks
from the real code, writes an architecture overview (via `graphify`), seeds the domain-features registry
from what already ships (subagents in parallel), captures existing conventions, reconciles any old
`.cursorrules`/`CLAUDE.md`, then cleans up. It anchors the knowledge base without documenting the whole
system at once — the rest fills in incrementally as you work.

## What's in the shell

`CLAUDE.md` carries the standing workflow: plan-first, subagent strategy, verification-before-done,
YAGNI/DRY/SOLID, the best-practice-doc-before-anything-new rule, domain-separated feature planning, the
"knowledge base is the northstar" rule, loop-learning, and graphify. The canonical copy lives in
`templates/workflow-baseline.md` — edit it there to improve what future projects get.

The `knowledge/` base:

| Folder | Purpose |
|---|---|
| `best-practices/` | YAGNI/DRY/SOLID principles (`index.md`) + per-topic research docs written *before* new work |
| `architecture/` | design/spec docs |
| `tasks/` | `todo.md`-style plans with Outcome notes |
| `lessons/` | correction → prevention patterns |
| `design/` | `style-guide.md`, append-only `decisions.md`, `syncs/`, `references/` |
| `product_docs/` | the PRD + `domain-features/` registry and per-domain briefs/stories |

## graphify

`CLAUDE.md` references **graphify** (on-device code/knowledge graph, MIT, no telemetry) as a global Claude
Code skill — installed once on your machine, not vendored per project.
