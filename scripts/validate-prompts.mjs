#!/usr/bin/env node
// Validates the role prompts under prompts/.
import { existsSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { readFrontmatter } from './lib/frontmatter.mjs';
import { createReporter } from './lib/report.mjs';

const ROOT = process.cwd();
const PROMPTS_DIR = join(ROOT, 'prompts');
const REQUIRED = ['name', 'purpose', 'track', 'version'];
const VERSION_RE = /^\d+\.\d+\.\d+$/;
const BASE = 'contributor-agent';

const report = createReporter('validate:prompts');
const path = (file) => relative(ROOT, file).split(sep).join('/');

const files = existsSync(PROMPTS_DIR)
  ? readdirSync(PROMPTS_DIR).filter((name) => name.endsWith('.md') && name !== 'README.md')
  : [];

if (existsSync(PROMPTS_DIR) && !files.includes(`${BASE}.md`)) {
  report.error('prompts', `missing base prompt ${BASE}.md`);
}

for (const name of files) {
  const file = join(PROMPTS_DIR, name);
  const stem = name.replace(/\.md$/, '');
  const { data, body } = readFrontmatter(file);
  if (!data) {
    report.error(path(file), 'missing frontmatter');
    continue;
  }
  for (const key of REQUIRED) if (!data[key]) report.error(path(file), `missing field "${key}"`);
  if (data.name && data.name !== stem) report.error(path(file), `name "${data.name}" must equal file name "${stem}"`);
  if (data.version && !VERSION_RE.test(data.version)) report.error(path(file), 'version must look like 1.2.3');
  if (body.trim().length < 200) report.error(path(file), 'prompt body is too short');
  if (stem !== BASE && !body.includes(`Use together with ${BASE}.`)) {
    report.error(path(file), `role prompts must state "Use together with ${BASE}."`);
  }
}

report.finish(`${files.length} prompt${files.length === 1 ? '' : 's'}`);
