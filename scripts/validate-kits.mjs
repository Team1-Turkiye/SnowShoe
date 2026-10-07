#!/usr/bin/env node
// Validates every kit under kits/. Run with --list to print an index.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { walk } from './lib/walk.mjs';
import { createReporter } from './lib/report.mjs';

const ROOT = process.cwd();
const KITS_DIR = join(ROOT, 'kits');
const STATUSES = ['draft', 'verified', 'deprecated'];
const NETWORKS = ['fuji', 'mainnet', 'both', 'none'];
const KEYS = new Set([
  'name', 'description', 'owner', 'status', 'network', 'stack',
  'entry', 'time_to_first_run_minutes', 'skills',
]);
const REQUIRED = ['name', 'description', 'owner', 'status', 'network', 'stack', 'entry', 'time_to_first_run_minutes'];
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const OWNER_RE = /^@[A-Za-z0-9-]+$/;
const PLACEHOLDER_RE = /Replace with|__[A-Z]+__|your-github-handle/;
const FORBIDDEN_FILE = (name) => name === '.env' || /^\.env\.(?!example$)/.test(name) || /\.(pem|key|keystore)$/.test(name);

const report = createReporter('validate:kits');
const listMode = process.argv.includes('--list');
const path = (file) => relative(ROOT, file).split(sep).join('/');

const kits = existsSync(KITS_DIR)
  ? readdirSync(KITS_DIR).filter((name) => name !== '_template' && statSync(join(KITS_DIR, name)).isDirectory())
  : [];

const rows = [];

for (const folder of kits) {
  const dir = join(KITS_DIR, folder);
  const manifestPath = join(dir, 'kit.json');
  if (!existsSync(manifestPath)) {
    report.error(path(dir), 'missing kit.json');
    continue;
  }
  let kit;
  try {
    kit = JSON.parse(readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    report.error(path(manifestPath), `invalid JSON: ${error.message}`);
    continue;
  }

  for (const key of REQUIRED) if (kit[key] === undefined || kit[key] === '') report.error(path(manifestPath), `missing field "${key}"`);
  for (const key of Object.keys(kit)) if (!KEYS.has(key)) report.error(path(manifestPath), `unknown field "${key}"`);

  if (kit.name !== undefined && kit.name !== folder) report.error(path(manifestPath), `name "${kit.name}" must equal folder "${folder}"`);
  if (typeof kit.name === 'string' && !NAME_RE.test(kit.name)) report.error(path(manifestPath), 'name must use lowercase letters, digits, and hyphens');
  if (typeof kit.description === 'string' && kit.description.length < 10) report.error(path(manifestPath), 'description is too short');
  if (kit.owner !== undefined && !OWNER_RE.test(kit.owner)) report.error(path(manifestPath), 'owner must be a GitHub handle starting with @');
  if (kit.status !== undefined && !STATUSES.includes(kit.status)) report.error(path(manifestPath), `status must be one of: ${STATUSES.join(', ')}`);
  if (kit.network !== undefined && !NETWORKS.includes(kit.network)) report.error(path(manifestPath), `network must be one of: ${NETWORKS.join(', ')}`);
  if (kit.stack !== undefined && (!Array.isArray(kit.stack) || kit.stack.length === 0)) report.error(path(manifestPath), 'stack must be a non-empty array');
  if (kit.time_to_first_run_minutes !== undefined && !(typeof kit.time_to_first_run_minutes === 'number' && kit.time_to_first_run_minutes >= 1)) {
    report.error(path(manifestPath), 'time_to_first_run_minutes must be a number of at least 1');
  }
  if (kit.skills !== undefined && !Array.isArray(kit.skills)) report.error(path(manifestPath), 'skills must be an array');
  if (PLACEHOLDER_RE.test(readFileSync(manifestPath, 'utf8'))) report.error(path(manifestPath), 'contains template placeholder text');

  const readme = join(dir, 'README.md');
  if (!existsSync(readme)) report.error(path(dir), 'missing README.md');
  else if (PLACEHOLDER_RE.test(readFileSync(readme, 'utf8'))) report.error(path(readme), 'contains template placeholder text');
  if (!existsSync(join(dir, '.env.example')) && kit.network !== 'none') {
    report.error(path(dir), 'missing .env.example');
  }

  for (const file of walk(dir)) {
    const name = file.split(sep).pop();
    if (FORBIDDEN_FILE(name)) report.error(path(file), 'files with secrets must not be committed');
  }
  rows.push([kit.name ?? folder, kit.status ?? '?', kit.network ?? '?', kit.owner ?? '?']);
}

if (listMode) {
  console.log(['name', 'status', 'network', 'owner'].join('\t'));
  for (const row of rows) console.log(row.join('\t'));
}

report.finish(`${kits.length} kit${kits.length === 1 ? '' : 's'}`);
