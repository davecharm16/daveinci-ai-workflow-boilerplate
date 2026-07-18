#!/usr/bin/env node
'use strict';
/**
 * daveinci-adopt — retrofit the daVinci workflow onto an EXISTING (brownfield) repo.
 *
 *   daveinci-adopt <path-to-existing-repo>
 *
 * Mechanical, safe, idempotent:
 *   1. Adds the knowledge/ skeleton (never overwrites existing files).
 *   2. Harvests existing rule/agent files + docs into knowledge/_intake/ for reconciliation.
 *   3. Installs the synthesis playbook (knowledge/_intake/ADOPTION-PLAYBOOK.md).
 *   4. Runs graphify if available.
 *   5. Ignores knowledge/_intake/ in the target's .gitignore.
 *
 * The repo KEEPS its own CLAUDE.md. When the repo sits under the boilerplate umbrella, it inherits
 * the baseline automatically (no import lines). This tool never edits the repo's own rules — the
 * reasoning pass (the playbook, run inside the repo with Claude) does that.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PKG_ROOT = path.resolve(__dirname, '..');
function die(msg) { console.error(`daveinci-adopt: ${msg}`); process.exit(1); }
function log(msg) { console.log(msg); }

const targetArg = process.argv[2];
if (!targetArg || targetArg === '-h' || targetArg === '--help') {
  console.log('usage: daveinci-adopt <path-to-existing-repo>');
  process.exit(targetArg ? 0 : 1);
}
const target = path.resolve(targetArg);
if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) die(`"${target}" is not a directory.`);
if (target === PKG_ROOT) die('target is the boilerplate itself.');

const INTAKE = path.join(target, 'knowledge', '_intake');

// --- 1. knowledge skeleton (never clobber) ----------------------------------
log('→ adding knowledge/ skeleton (existing files preserved)');
fs.cpSync(path.join(PKG_ROOT, 'knowledge'), path.join(target, 'knowledge'),
  { recursive: true, force: false, errorOnExist: false });

log('→ adding .claude/ per-task enforcement hook (existing files preserved)');
fs.cpSync(path.join(PKG_ROOT, '.claude'), path.join(target, '.claude'),
  { recursive: true, force: false, errorOnExist: false });

// --- 2. harvest existing rules + docs ---------------------------------------
log('→ harvesting existing rules & docs into knowledge/_intake/');
fs.mkdirSync(path.join(INTAKE, 'existing-rules'), { recursive: true });
fs.mkdirSync(path.join(INTAKE, 'existing-docs'), { recursive: true });

const RULE_FILES = [
  ['CLAUDE.md', 'CLAUDE.md.orig'],
  ['CLAUDE.local.md', 'CLAUDE.local.md.orig'],
  ['AGENTS.md', 'AGENTS.md'],
  ['GEMINI.md', 'GEMINI.md'],
  ['.cursorrules', 'cursorrules'],
  ['.cursor/rules', 'cursor-rules'],
  ['.windsurfrules', 'windsurfrules'],
  ['.clinerules', 'clinerules'],
  ['.github/copilot-instructions.md', 'copilot-instructions.md'],
];
for (const [rel, out] of RULE_FILES) {
  const src = path.join(target, rel);
  if (fs.existsSync(src)) {
    fs.cpSync(src, path.join(INTAKE, 'existing-rules', out), { recursive: true });
    log(`    • ${rel}`);
  }
}
// root-level *.md docs (skip the rule files already harvested above)
const HARVESTED_MD = new Set(['CLAUDE.md', 'CLAUDE.local.md', 'AGENTS.md', 'GEMINI.md']);
for (const f of fs.readdirSync(target)) {
  if (f.endsWith('.md') && !HARVESTED_MD.has(f) && fs.statSync(path.join(target, f)).isFile()) {
    fs.copyFileSync(path.join(target, f), path.join(INTAKE, 'existing-docs', f));
  }
}
// docs/ directory
if (fs.existsSync(path.join(target, 'docs'))) {
  fs.cpSync(path.join(target, 'docs'), path.join(INTAKE, 'existing-docs', 'docs'), { recursive: true });
}

// --- 3. install the synthesis playbook + the baseline (for the merge) -------
fs.copyFileSync(path.join(PKG_ROOT, 'templates', 'brownfield-playbook.md'),
  path.join(INTAKE, 'ADOPTION-PLAYBOOK.md'));
fs.copyFileSync(path.join(PKG_ROOT, 'templates', 'workflow-baseline.md'),
  path.join(INTAKE, 'workflow-baseline.md'));

// If the repo has no CLAUDE.md, stamp a self-contained one now (facts + full baseline).
// If it already has one, leave it — the playbook merges the baseline in, project rules winning.
const targetClaude = path.join(target, 'CLAUDE.md');
if (!fs.existsSync(targetClaude)) {
  const facts = fs.readFileSync(path.join(PKG_ROOT, 'templates', 'project-facts.md'), 'utf8');
  const baseline = fs.readFileSync(path.join(PKG_ROOT, 'templates', 'workflow-baseline.md'), 'utf8');
  fs.writeFileSync(targetClaude, `${facts.trimEnd()}\n\n${baseline.trimStart()}`);
  log('→ no CLAUDE.md — stamped a self-contained one (full workflow + project-facts placeholders)');
}

// --- 4. graphify (best-effort) ----------------------------------------------
try {
  execSync('command -v graphify', { stdio: 'ignore', shell: '/bin/bash' });
  log('→ running graphify --code-only (on-device AST, no API key)');
  try { execSync('graphify . --code-only', { cwd: target, stdio: 'inherit' }); }
  catch { log("    graphify errored — run '/graphify .' in Claude instead"); }
} catch {
  log("→ graphify not on PATH — run '/graphify .' inside Claude to generate the code graph");
}

// --- 5. ignore _intake in the target's git ----------------------------------
const gi = path.join(target, '.gitignore');
const marker = 'knowledge/_intake/';
try {
  const cur = fs.existsSync(gi) ? fs.readFileSync(gi, 'utf8') : '';
  if (!cur.includes(marker)) {
    fs.appendFileSync(gi, `\n# brownfield adoption scratch (delete after synthesis)\n${marker}\n`);
  }
} catch { /* non-fatal */ }

// --- report -----------------------------------------------------------------
console.log('\n✓ Mechanical adoption done. The repo now carries the daVinci shell (knowledge/ + workflow).');
console.log('\nNext — the reasoning pass, inside the repo:');
console.log(`  cd ${targetArg}`);
console.log('  # open Claude Code, then: "Follow knowledge/_intake/ADOPTION-PLAYBOOK.md"');
console.log('  # Claude fills project facts, writes the architecture overview from the code graph,');
console.log('  # seeds the domain-features registry, captures conventions, then deletes _intake/.\n');
