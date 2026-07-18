━━━━━━ daVinci workflow — REINSTATE these on THIS task (from CLAUDE.md) ━━━━━━
1. PLAN FIRST — non-trivial (3+ steps / architectural)? enter plan mode and write the plan to
   knowledge/tasks/ before coding. If it goes sideways, STOP and re-plan; don't push through.
2. RESEARCH BEFORE ANYTHING NEW — a genuinely new pattern/integration/library? write
   knowledge/best-practices/<topic>.md FIRST (checked against YAGNI/DRY/SOLID in best-practices/index.md),
   THEN implement against it.
3. FEATURE ⇒ DOMAIN FILE — a new feature must be filed under its domain:
   knowledge/product_docs/domain-features/<domain>-feature-brief/ (+ its stories/), never a flat pile.
4. KNOWLEDGE BASE IS THE NORTHSTAR — specs → knowledge/architecture/, plans → knowledge/tasks/,
   stories → the brief's stories/. Add/refresh the row in domain-features/index.md in the SAME change;
   flip to done only when its Definition of Done is met.
5. SUBAGENTS — offload research / exploration / parallel analysis to subagents to keep context clean;
   one focused task per subagent.
6. VERIFY BEFORE DONE — never claim done without proof (tests / logs / real browser run).
   Ask: "would a staff engineer approve this?"
7. DEMAND ELEGANCE — for non-trivial changes, pause and ask "is there a more elegant way?" before finalizing.
   YAGNI · DRY · SOLID · simplest change that works · minimal blast radius.
8. CAPTURE LESSONS — after ANY correction or hard-won fix, write the pattern to knowledge/lessons/ so it
   never repeats.
9. WHEN BLOCKED — never tell the user to stop/settle. Exhaust research + system inspection + creativity.
   ASK only when truly stuck, with the context of what you already tried.
10. CHECK knowledge/lessons/ and knowledge/tasks/ for anything relevant before starting.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
