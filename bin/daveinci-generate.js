#!/usr/bin/env node
'use strict';
/**
 * daveinci-generate — scaffold a NEW (greenfield) project that inherits the daVinci workflow.
 *
 *   daveinci-generate <project-name> [parent-dir]
 *
 * Creates <parent-dir>/<project-name>/ with:
 *   - CLAUDE.md   (project-facts template; inherits the umbrella baseline automatically when the
 *                  new folder sits under the boilerplate)
 *   - knowledge/  (the knowledge-base skeleton)
 *   - a fresh git repo
 *
 * If run from inside the boilerplate (or any folder under it), the new project is a subfolder and
 * inherits the parent CLAUDE.md baseline natively — no imports needed.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PKG_ROOT = path.resolve(__dirname, '..');

function die(msg) { console.error(`daveinci-generate: ${msg}`); process.exit(1); }

const [name, parentArg] = process.argv.slice(2);
if (!name || name === '-h' || name === '--help') {
  console.log('usage: daveinci-generate <project-name> [parent-dir]');
  process.exit(name ? 0 : 1);
}
if (/[\\/]/.test(name)) die('project-name must be a plain folder name, not a path.');

const parent = parentArg ? path.resolve(parentArg) : process.cwd();
const dest = path.join(parent, name);
if (fs.existsSync(dest)) die(`"${dest}" already exists — refusing to overwrite.`);

// --- scaffold ---------------------------------------------------------------
fs.mkdirSync(dest, { recursive: true });
fs.cpSync(path.join(PKG_ROOT, 'knowledge'), path.join(dest, 'knowledge'), { recursive: true });
fs.copyFileSync(path.join(PKG_ROOT, 'templates', 'project-CLAUDE.md'), path.join(dest, 'CLAUDE.md'));

try { execSync('git init -q', { cwd: dest, stdio: 'ignore' }); } catch { /* git optional */ }

// --- does it inherit an umbrella baseline? ----------------------------------
function findUmbrella(startDir) {
  let dir = startDir;
  while (true) {
    const cm = path.join(dir, 'CLAUDE.md');
    try {
      if (fs.readFileSync(cm, 'utf8').includes('Umbrella Baseline')) return dir;
    } catch { /* no CLAUDE.md here */ }
    const up = path.dirname(dir);
    if (up === dir) return null;
    dir = up;
  }
}
const umbrella = findUmbrella(parent);

// --- report -----------------------------------------------------------------
console.log(`\n✓ created ${path.relative(process.cwd(), dest) || dest}`);
console.log('  · CLAUDE.md      (fill in Project status / Commands / Code layout)');
console.log('  · knowledge/     (index stubs ready to populate)');
if (umbrella) {
  console.log(`\n  Inherits the workflow baseline from: ${umbrella}/CLAUDE.md`);
  console.log('  (loaded automatically — its rules apply; this project\'s CLAUDE.md wins on conflict.)');
} else {
  console.log('\n  ⚠ Not under the boilerplate, so it will NOT inherit the baseline automatically.');
  console.log('    Put this project inside your daveinci-ai-workflow-boilerplate folder to inherit it.');
}
console.log(`\nNext: cd ${name} && scaffold your app here (e.g. npx create-next-app .)\n`);
