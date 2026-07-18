# CLAUDE.md — daVinci generator repo

This repo is the **reusable daVinci workflow shell**. It is the "stamp," not a project itself.

- `daveinci-generate <name>` copies a fresh shell folder — the full workflow `CLAUDE.md` + the
  `knowledge/` base — that you then drop or build your actual project inside. Each generated shell is
  self-contained (its own copy of the workflow); nothing links back here.
- `daveinci-adopt <path>` retrofits an existing repo with the same shell (harvest + knowledge overlay +
  synthesis playbook).

The canonical workflow lives in `templates/workflow-baseline.md` and is what gets stamped into every
project (below its project-facts header). When you improve the workflow, edit that file.

When working in THIS repo, follow that same workflow:

@./templates/workflow-baseline.md
