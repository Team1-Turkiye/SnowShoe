#!/usr/bin/env node
// Validates every idea file under ideas/.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { readFrontmatter } from './lib/frontmatter.mjs';
import { createReporter } from './lib/report.mjs';

const ROOT = process.cwd();
const IDEAS_DIR = join(ROOT, 'ideas');
const TRACKS = ['learn', 'idea', 'build', 'launch', 'ecosystem'];
const DIFFICULTY = ['starter', 'intermediate', 'advanced'];
const STATUSES = ['open', 'claimed', 'shipped'];
const KEYS = new Set(['title', 'track', 'difficulty', 'status', 'proposer', 'claimed_by', 'skills_needed']);
const REQUIRED = ['title', 'track', 'difficulty', 'status', 'proposer'];
const OWNER_RE = /^@[A-Za-z0-9-]+$/;
const PLACEHOLDER_RE = /Replace with|your-github-handle/;
const SECTIONS = ['Problem', 'Idea', 'First two weeks'];

const report = createReporter('validate:ideas');
const path = (file) => relative(ROOT, file).split(sep).join('/');

const files = existsSync(IDEAS_DIR)
  ? readdirSync(IDEAS_DIR).filter((name) => name.endsWith('.md') && name !== 'README.md' && name !== '_template.md')
  : [];

for (const name of files) {
  const file = join(IDEAS_DIR, name);
  const text = readFileSync(file, 'utf8');
  const { data, body } = readFrontmatter(file);
  if (!data) {
    report.error(path(file), 'missing frontmatter');
    continue;
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*\.md$/.test(name)) report.error(path(file), 'file name must be a lowercase slug');
  for (const key of REQUIRED) if (!data[key]) report.error(path(file), `missing field "${key}"`);
  for (const key of Object.keys(data)) if (!KEYS.has(key)) report.error(path(file), `unknown field "${key}"`);
  if (data.title && data.title.length < 5) report.error(path(file), 'title is too short');
  if (data.track && !TRACKS.includes(data.track)) report.error(path(file), `track must be one of: ${TRACKS.join(', ')}`);
  if (data.difficulty && !DIFFICULTY.includes(data.difficulty)) report.error(path(file), `difficulty must be one of: ${DIFFICULTY.join(', ')}`);
  if (data.status && !STATUSES.includes(data.status)) report.error(path(file), `status must be one of: ${STATUSES.join(', ')}`);
  if (data.proposer && !OWNER_RE.test(data.proposer)) report.error(path(file), 'proposer must be a GitHub handle starting with @');
  if (data.status === 'claimed' && !data.claimed_by) report.error(path(file), 'claimed ideas need claimed_by');
  if (data.claimed_by && !OWNER_RE.test(data.claimed_by)) report.error(path(file), 'claimed_by must be a GitHub handle starting with @');
  if (PLACEHOLDER_RE.test(text)) report.error(path(file), 'contains template placeholder text');
  for (const section of SECTIONS) {
    if (!new RegExp(`^## ${section}\\s*$`, 'm').test(body)) report.error(path(file), `missing section "## ${section}"`);
  }
}

report.finish(`${files.length} idea${files.length === 1 ? '' : 's'}`);
