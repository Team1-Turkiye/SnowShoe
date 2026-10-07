#!/usr/bin/env node
// Scans repository files for common secret patterns. A floor, not a replacement for review.
// Add the marker `snowshoe-allow-secret` to a line to allow a known-safe example.
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { repoFiles, rel } from './lib/walk.mjs';
import { createReporter } from './lib/report.mjs';

const SELF = 'scripts/check-secrets.mjs';
const BINARY = /\.(png|jpg|jpeg|gif|webp|ico|pdf|zip|gz|woff2?)$/i;
const PATTERNS = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'private key block'],
  [/\b(AKIA|ASIA)[0-9A-Z]{16}\b/, 'cloud access key id'],
  [/\bghp_[A-Za-z0-9]{36}\b/, 'GitHub token'],
  [/\bgithub_pat_[A-Za-z0-9_]{50,}\b/, 'GitHub token'],
  [/\bsk-[A-Za-z0-9]{32,}\b/, 'API secret key'],
  [/(private[_ -]?key|secret|api[_-]?key)["']?\s*[:=]\s*["']?(0x)?[A-Fa-f0-9]{64}\b/i, '64-character hex value assigned to a key-like name'],
  [/(mnemonic|seed[_ -]?phrase)["']?\s*[:=]\s*["'][a-z]+( [a-z]+){11,23}["']/i, 'seed phrase'],
];

const report = createReporter('check:secrets');
let checked = 0;

for (const file of repoFiles()) {
  const name = basename(file);
  const path = rel(file);
  if (path === SELF || BINARY.test(name)) continue;
  if (name === '.env' || /^\.env\.(?!example$)/.test(name)) {
    report.error(path, 'environment files must not be committed');
    continue;
  }
  if (/\.(pem|key|keystore)$/.test(name)) {
    report.error(path, 'key files must not be committed');
    continue;
  }
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  checked += 1;
  text.split('\n').forEach((line, index) => {
    if (line.includes('snowshoe-allow-secret')) return;
    for (const [pattern, label] of PATTERNS) {
      if (pattern.test(line)) report.error(`${path}:${index + 1}`, `possible ${label}`);
    }
  });
}

report.finish(`${checked} files`);
