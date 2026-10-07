#!/usr/bin/env node
// Enforces the style rules that a script can check: no em dashes in Markdown, JSON, or YAML text.
import { readFileSync } from 'node:fs';
import { repoFiles, rel } from './lib/walk.mjs';
import { createReporter } from './lib/report.mjs';

const EM_DASH = String.fromCharCode(0x2014);
const EXTENSIONS = ['.md', '.json', '.yml', '.yaml', '.txt', '.mjs'];

const report = createReporter('lint:style');
let checked = 0;

for (const file of repoFiles()) {
  if (!EXTENSIONS.some((extension) => file.endsWith(extension))) continue;
  checked += 1;
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, index) => {
      if (line.includes(EM_DASH)) report.error(`${rel(file)}:${index + 1}`, 'em dash found. Use a period, a colon, or parentheses');
    });
}

report.finish(`${checked} files`);
