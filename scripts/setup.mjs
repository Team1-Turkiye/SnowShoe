#!/usr/bin/env node
// Installs the repository's Git hooks. Safe to run more than once.
import { chmodSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const ROOT = process.cwd();
const quiet = process.argv.includes('--quiet');
const log = (message) => {
  if (!quiet) console.log(message);
};

if (!existsSync(join(ROOT, '.git'))) {
  log('setup: not a Git checkout, skipping hook install');
  process.exit(0);
}

try {
  execFileSync('git', ['config', 'core.hooksPath', '.githooks'], { cwd: ROOT });
  const hook = join(ROOT, '.githooks', 'commit-msg');
  if (existsSync(hook)) chmodSync(hook, 0o755);
  log('setup: Git hooks installed (.githooks)');
} catch (error) {
  console.error(`setup: could not install hooks: ${error.message}`);
  process.exit(quiet ? 0 : 1);
}
