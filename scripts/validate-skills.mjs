#!/usr/bin/env node
// Validates every SKILL.md and its eval cases. Run with --list to print an index.
import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, join, relative, sep } from 'node:path';
import { walk } from './lib/walk.mjs';
import { readFrontmatter } from './lib/frontmatter.mjs';
import { createReporter } from './lib/report.mjs';

const ROOT = process.cwd();
const SKILLS_DIR = join(ROOT, 'skills');
const JOURNEYS = ['learn', 'idea', 'build', 'launch', 'ecosystem'];
const STATUSES = ['draft', 'verified', 'deprecated'];
const NETWORKS = ['fuji', 'mainnet', 'both', 'none'];
const KEYS = new Set([
  'name', 'description', 'journey', 'network', 'status', 'owner',
  'version', 'last_verified', 'requires', 'tools', 'tags',
]);
const REQUIRED = ['name', 'description', 'journey', 'network', 'status', 'owner', 'version'];
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const VERSION_RE = /^\d+\.\d+\.\d+$/;
const OWNER_RE = /^@[A-Za-z0-9-]+$/;
const PLACEHOLDER_RE = /Replace with|__[A-Z]+__|your-github-handle/;
const SECTIONS = ['When to use', 'Prerequisites', 'Steps', 'Verification', 'Common failures'];
const MAX_LINES = 500;

const report = createReporter('validate:skills');
const listMode = process.argv.includes('--list');
const path = (file) => relative(ROOT, file).split(sep).join('/');

function checkEvals(file, requireEvals) {
  const evalsPath = join(dirname(file), 'evals', 'cases.json');
  if (!existsSync(evalsPath)) {
    if (requireEvals) report.error(path(file), 'status "verified" requires evals/cases.json');
    return;
  }
  let cases;
  try {
    cases = JSON.parse(readFileSync(evalsPath, 'utf8'));
  } catch (error) {
    report.error(path(evalsPath), `invalid JSON: ${error.message}`);
    return;
  }
  if (!Array.isArray(cases)) {
    report.error(path(evalsPath), 'must be an array of cases');
    return;
  }
  if (requireEvals && cases.length < 3) {
    report.error(path(evalsPath), 'verified skills need at least 3 cases');
  }
  const ids = new Set();
  cases.forEach((item, index) => {
    const where = `${path(evalsPath)} case ${index + 1}`;
    if (typeof item.id !== 'string' || !NAME_RE.test(item.id)) report.error(where, 'id must be lowercase with hyphens');
    else if (ids.has(item.id)) report.error(where, `duplicate id "${item.id}"`);
    else ids.add(item.id);
    if (typeof item.prompt !== 'string' || item.prompt.length < 10) report.error(where, 'prompt must be a string of at least 10 characters');
    else if (PLACEHOLDER_RE.test(item.prompt)) report.error(where, 'prompt still contains placeholder text');
    if (!Array.isArray(item.expect) || item.expect.length === 0) report.error(where, 'expect must be a non-empty array');
    if (item.forbid !== undefined && !Array.isArray(item.forbid)) report.error(where, 'forbid must be an array');
    for (const key of Object.keys(item)) {
      if (!['id', 'prompt', 'expect', 'forbid'].includes(key)) report.error(where, `unknown field "${key}"`);
    }
  });
}

const files = existsSync(SKILLS_DIR)
  ? walk(SKILLS_DIR).filter((file) => basename(file) === 'SKILL.md' && !file.includes(`${sep}_template${sep}`))
  : [];

const seen = new Map();
const rows = [];

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const { data, body } = readFrontmatter(file);
  if (!data) {
    report.error(path(file), 'missing frontmatter');
    continue;
  }

  const parts = relative(SKILLS_DIR, dirname(file)).split(sep);
  const journey = parts[0];
  const folder = basename(dirname(file));

  if (!JOURNEYS.includes(journey)) {
    report.error(path(file), `top folder must be one of: ${JOURNEYS.join(', ')}`);
  } else if (journey === 'ecosystem' && parts.length !== 3) {
    report.error(path(file), 'ecosystem skills live in skills/ecosystem/<protocol>/<skill-name>/');
  } else if (journey !== 'ecosystem' && parts.length !== 2) {
    report.error(path(file), `skills live in skills/${journey}/<skill-name>/`);
  }

  for (const key of REQUIRED) if (!data[key]) report.error(path(file), `missing field "${key}"`);
  for (const key of Object.keys(data)) if (!KEYS.has(key)) report.error(path(file), `unknown field "${key}"`);

  if (data.name) {
    if (!NAME_RE.test(data.name)) report.error(path(file), 'name must use lowercase letters, digits, and hyphens');
    if (data.name !== folder) report.error(path(file), `name "${data.name}" must equal folder "${folder}"`);
    if (seen.has(data.name)) report.error(path(file), `duplicate name, also used in ${seen.get(data.name)}`);
    else seen.set(data.name, path(file));
  }
  if (data.description) {
    if (data.description.length < 40 || data.description.length > 300) report.error(path(file), 'description must be 40 to 300 characters');
  }
  if (data.journey && data.journey !== journey) report.error(path(file), `journey "${data.journey}" does not match folder "${journey}"`);
  if (data.network && !NETWORKS.includes(data.network)) report.error(path(file), `network must be one of: ${NETWORKS.join(', ')}`);
  if (data.status && !STATUSES.includes(data.status)) report.error(path(file), `status must be one of: ${STATUSES.join(', ')}`);
  if (data.owner && !OWNER_RE.test(data.owner)) report.error(path(file), 'owner must be a GitHub handle starting with @');
  if (data.version && !VERSION_RE.test(data.version)) report.error(path(file), 'version must look like 1.2.3');
  if (data.last_verified && !DATE_RE.test(data.last_verified)) report.error(path(file), 'last_verified must be YYYY-MM-DD');
  if (data.status === 'verified' && !data.last_verified) report.error(path(file), 'verified skills need last_verified');
  for (const key of ['requires', 'tools', 'tags']) {
    if (data[key] !== undefined && !Array.isArray(data[key])) report.error(path(file), `${key} must be an inline list like [a, b]`);
  }
  if (PLACEHOLDER_RE.test(text)) report.error(path(file), 'contains template placeholder text');
  if (text.split('\n').length > MAX_LINES) report.error(path(file), `longer than ${MAX_LINES} lines`);

  let last = -1;
  for (const section of SECTIONS) {
    const match = body.match(new RegExp(`^## ${section}\\s*$`, 'm'));
    if (!match) {
      report.error(path(file), `missing section "## ${section}"`);
      continue;
    }
    if (match.index < last) report.error(path(file), `section "## ${section}" is out of order`);
    last = match.index;
  }

  checkEvals(file, data.status === 'verified');
  rows.push([data.name ?? folder, data.journey ?? journey, data.status ?? '?', data.network ?? '?', data.owner ?? '?']);
}

for (const [name, location] of seen) {
  const fileData = readFrontmatter(join(ROOT, location)).data;
  for (const required of fileData?.requires ?? []) {
    if (!seen.has(required)) report.error(location, `requires unknown skill "${required}"`);
  }
}

if (listMode) {
  console.log(['name', 'journey', 'status', 'network', 'owner'].join('\t'));
  for (const row of rows) console.log(row.join('\t'));
}

report.finish(`${files.length} skill${files.length === 1 ? '' : 's'}`);
