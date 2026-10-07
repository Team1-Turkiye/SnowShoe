#!/usr/bin/env node
// Creates or updates the repository labels from .github/labels.json using the GitHub CLI.
// Usage: npm run sync:labels -- [owner/repo]
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const labels = JSON.parse(readFileSync(join(process.cwd(), '.github', 'labels.json'), 'utf8'));
const repo = process.argv[2];

for (const label of labels) {
  const args = ['label', 'create', label.name, '--color', label.color, '--description', label.description, '--force'];
  if (repo) args.push('--repo', repo);
  try {
    execFileSync('gh', args, { stdio: 'inherit' });
  } catch (error) {
    console.error(`sync-labels: failed for "${label.name}": ${error.message}`);
    process.exit(1);
  }
}
console.log(`sync-labels: ${labels.length} labels synced`);
