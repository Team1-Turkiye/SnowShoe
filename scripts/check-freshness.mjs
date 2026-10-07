#!/usr/bin/env node
// Lists verified skills whose last_verified date is older than 90 days.
// Flags: --markdown prints an issue body (empty output when nothing is stale), --fail exits 1 when stale.
import { existsSync } from 'node:fs';
import { basename, dirname, join, relative, sep } from 'node:path';
import { walk } from './lib/walk.mjs';
import { readFrontmatter } from './lib/frontmatter.mjs';

const ROOT = process.cwd();
const SKILLS_DIR = join(ROOT, 'skills');
const MAX_AGE_DAYS = 90;
const markdown = process.argv.includes('--markdown');
const failOnStale = process.argv.includes('--fail');

const today = new Date();
const stale = [];

const files = existsSync(SKILLS_DIR)
  ? walk(SKILLS_DIR).filter((file) => basename(file) === 'SKILL.md' && !file.includes(`${sep}_template${sep}`))
  : [];

for (const file of files) {
  const { data } = readFrontmatter(file);
  if (!data || data.status !== 'verified') continue;
  const path = relative(ROOT, dirname(file)).split(sep).join('/');
  if (!data.last_verified) {
    stale.push({ name: data.name, owner: data.owner, path, age: null });
    continue;
  }
  const age = Math.floor((today - new Date(`${data.last_verified}T00:00:00Z`)) / 86400000);
  if (age > MAX_AGE_DAYS) stale.push({ name: data.name, owner: data.owner, path, age });
}

if (markdown) {
  if (stale.length > 0) {
    console.log(`These verified skills were last verified more than ${MAX_AGE_DAYS} days ago. Owners: re-run the steps on Fuji, then update \`last_verified\`, or set the status back to \`draft\`.\n`);
    console.log('| Skill | Owner | Days since verification |');
    console.log('| --- | --- | --- |');
    for (const item of stale) console.log(`| \`${item.path}\` | ${item.owner} | ${item.age ?? 'never'} |`);
  }
} else if (stale.length === 0) {
  console.log('check:freshness: ok');
} else {
  console.log(`check:freshness: ${stale.length} skill(s) due`);
  for (const item of stale) console.log(`  - ${item.path} (${item.owner}, ${item.age ?? 'never'} days)`);
}

if (failOnStale && stale.length > 0) process.exit(1);
