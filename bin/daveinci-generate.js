#!/usr/bin/env node
'use strict';
/**
 * daveinci-generate — stamp out a new self-contained project shell.
 *
 *   daveinci-generate <name> [parent-dir]
 *
 * Creates <parent-dir>/<name>/ containing the FULL workflow CLAUDE.md (rules baked in) + the
 * knowledge/ base + a fresh git repo. You then drop or build your actual project INSIDE that folder.
 * Each shell is independent — it carries its own copy of the workflow, no nesting, no linking.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PKG_ROOT = path.resolve(__dirname, '..');
function die(msg) { console.error(`daveinci-generate: ${msg}`); process.exit(1); }

const [name, parentArg] = process.argv.slice(2);
if (!name || name === '-h' || name === '--help') {
  console.log('usage: daveinci-generate <name> [parent-dir]');
  process.exit(name ? 0 : 1);
}
if (/[\\/]/.test(name)) die('name must be a plain folder name, not a path.');

const parent = parentArg ? path.resolve(parentArg) : process.cwd();
const dest = path.join(parent, name);
if (fs.existsSync(dest)) die(`"${dest}" already exists — refusing to overwrite.`);

// --- stamp the shell --------------------------------------------------------
fs.mkdirSync(dest, { recursive: true });

// CLAUDE.md = project-facts header + the full workflow baseline (self-contained)
const facts = fs.readFileSync(path.join(PKG_ROOT, 'templates', 'project-facts.md'), 'utf8');
const baseline = fs.readFileSync(path.join(PKG_ROOT, 'templates', 'workflow-baseline.md'), 'utf8');
fs.writeFileSync(path.join(dest, 'CLAUDE.md'), `${facts.trimEnd()}\n\n${baseline.trimStart()}`);

// knowledge base
fs.cpSync(path.join(PKG_ROOT, 'knowledge'), path.join(dest, 'knowledge'), { recursive: true });

try { execSync('git init -q', { cwd: dest, stdio: 'ignore' }); } catch { /* git optional */ }

// --- report -----------------------------------------------------------------
const shown = path.relative(process.cwd(), dest) || dest;
console.log(`\n✓ created shell "${shown}"`);
console.log('  · CLAUDE.md    full workflow rules baked in + Project status/Commands/Code layout to fill');
console.log('  · knowledge/   the knowledge base, ready to populate');
console.log(`\nNext: drop or build your project inside it —`);
console.log(`  cd ${shown}`);
console.log('  npx create-next-app .     # or move your existing app files in here\n');
