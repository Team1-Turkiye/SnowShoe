#!/usr/bin/env node
// Usage: npm run new:skill -- <journey> <skill-name> [protocol]
// For the ecosystem journey, a protocol name is required.
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const JOURNEYS = ['learn', 'idea', 'build', 'launch', 'ecosystem'];
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const [journey, name, protocol] = process.argv.slice(2);

function usage(message) {
  if (message) console.error(`new-skill: ${message}`);
  console.error('usage: npm run new:skill -- <journey> <skill-name> [protocol]');
  console.error(`journeys: ${JOURNEYS.join(', ')}`);
  process.exit(1);
}

if (!journey || !name) usage();
if (!JOURNEYS.includes(journey)) usage(`unknown journey "${journey}"`);
if (!NAME_RE.test(name)) usage('skill name must use lowercase letters, digits, and hyphens');
if (journey === 'ecosystem' && !protocol) usage('the ecosystem journey needs a protocol name');
if (journey !== 'ecosystem' && protocol) usage('only the ecosystem journey takes a protocol name');
if (protocol && !NAME_RE.test(protocol)) usage('protocol name must use lowercase letters, digits, and hyphens');

const template = join(ROOT, 'skills', '_template');
const target = journey === 'ecosystem'
  ? join(ROOT, 'skills', 'ecosystem', protocol, name)
  : join(ROOT, 'skills', journey, name);

if (existsSync(target)) usage(`${relative(ROOT, target)} already exists`);

cpSync(template, target, { recursive: true });

const title = name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
const skillFile = join(target, 'SKILL.md');
writeFileSync(
  skillFile,
  readFileSync(skillFile, 'utf8')
    .replaceAll('__NAME__', name)
    .replaceAll('__JOURNEY__', journey)
    .replaceAll('__TITLE__', title),
);

console.log(`Created ${relative(ROOT, target)}`);
console.log('Next steps:');
console.log('  1. Edit SKILL.md: description, owner, and every section.');
console.log('  2. Edit evals/cases.json: at least three cases.');
console.log('  3. Run npm run validate.');
