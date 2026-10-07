#!/usr/bin/env node
// Checks that relative Markdown links point to files that exist.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { repoFiles, rel } from './lib/walk.mjs';
import { createReporter } from './lib/report.mjs';

const ROOT = process.cwd();
const LINK_RE = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

const report = createReporter('lint:links');
let checked = 0;

for (const file of repoFiles()) {
  if (!file.endsWith('.md')) continue;
  const text = readFileSync(file, 'utf8')
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/[^\n]/g, ''))
    .replace(/`[^`\n]*`/g, '');
  text.split('\n').forEach((line, index) => {
    for (const match of line.matchAll(LINK_RE)) {
      const target = match[1];
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      const clean = target.split('#')[0];
      if (!clean) continue;
      const resolved = clean.startsWith('/') ? join(ROOT, clean) : resolve(dirname(file), clean);
      checked += 1;
      if (!existsSync(resolved)) report.error(`${rel(file)}:${index + 1}`, `broken link "${target}"`);
    }
  });
}

report.finish(`${checked} links`);
