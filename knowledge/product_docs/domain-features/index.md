# Domain Features Registry — status, dependencies, DoD

The **northstar tracker**: every feature (shipped, in-flight, or backlog) has a row here, tagged by domain and
linked to its brief. A row moves to `done` ONLY when the Definition of Done below is met. Update this file in the
same change that ships or re-scopes a feature — never let it drift (see the rule in `CLAUDE.md`).

## Definition of Done (standing, applies to every row)

1. Code merged to `main` and pushed; build + lint + full test suite green.
2. The affected user flow verified end-to-end (not just unit tests).
3. Knowledge base current: spec/plan has an Outcome note, the domain brief + stories reflect what actually shipped,
   any new integration has its best-practice doc.
4. Task-level code reviews clean (no open Critical/Important findings).

Per-row `DoD+` adds feature-specific criteria on top.

## Registry

| Feature | Domain(s) | Tags | Depends on | Status | Notes / DoD+ |
|---|---|---|---|---|---|
| _example — delete me_ | _domain_ | _tag_ | — | **backlog** | brief + stories under `<domain>-feature-brief/` |
