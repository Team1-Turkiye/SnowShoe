#!/usr/bin/env node
// Keeps authorship metadata human. Tool credit lines, co-author trailers for tools,
// and tool-specific config files are not accepted in this repository.
//
// Modes:
//   --strip <file>    remove offending lines from a commit message file (used by the commit-msg hook)
//   --range <range>   check commits in a Git range, for example origin/main..HEAD
//   --stdin           check text from standard input, for example a pull request description
//   --files           check tracked files and file names
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { basename, sep } from 'node:path';
import { repoFiles, rel } from './lib/walk.mjs';

// Names are assembled from parts so that this file never holds them as one literal.
const A = 'cl' + 'aude';
const B = 'anth' + 'ropic';
const TOOLS = [A, B, 'copilot', 'cursor', 'codex', 'chatgpt', 'openai', 'gemini', 'devin', 'aider', 'windsurf'];
const TOOL_RE = TOOLS.join('|');

const TRAILER_KEYS = '(co-authored-by|generated-by|assisted-by|made-with|created-by|authored-by)';
const RULES = [
  [new RegExp(`^\\s*${TRAILER_KEYS}\\s*:.*(${TOOL_RE}|\\[bot\\]|noreply@${B})`, 'i'), 'tool co-author or credit trailer'],
  [new RegExp(`^\\s*[A-Za-z][A-Za-z-]*-session\\s*:\\s*https?://`, 'i'), 'tool session trailer'],
  [new RegExp(`^\\s*\\S*\\s*(generated|created|written|made|authored|assisted)\\s+(with|by)\\s+\\[?(${TOOL_RE})`, 'i'), 'tool credit line'],
  [new RegExp(`https?://\\S*(${A}\\.(ai|com)|${B}\\.com)\\S*`, 'i'), 'tool service link'],
];

const FORBIDDEN_NAMES = new Set([
  `${A}.md`, '.cursorrules', '.aider.conf.yml', 'copilot-instructions.md',
]);
const FORBIDDEN_DIRS = new Set([`.${A}`, '.cursor', '.windsurf', '.continue']);
const SELF = 'scripts/check-attribution.mjs';
const TEXT_EXT = /\.(md|mjs|js|ts|json|ya?ml|txt|sh|html|css|toml)$/i;
const NAME_RE = new RegExp(`\\b(${TOOLS.join('|')})\\b|\\[bot\\]`, 'i');
const ALLOWED_BOTS = ['dependabot[bot]', 'github-actions[bot]'];

function findings(text) {
  const out = [];
  text.split('\n').forEach((line, index) => {
    for (const [rule, label] of RULES) {
      if (rule.test(line)) {
        out.push({ line: index + 1, text: line.trim(), label });
        break;
      }
    }
  });
  return out;
}

function fail(lines) {
  console.error('attribution: problems found');
  for (const line of lines) console.error(`  - ${line}`);
  console.error('Commits must carry your own identity. See docs/ai-assisted-contributions.md.');
  process.exit(1);
}

const args = process.argv.slice(2);
const mode = args[0];

if (mode === '--strip') {
  const file = args[1];
  if (!file || !existsSync(file)) process.exit(0);
  const kept = readFileSync(file, 'utf8')
    .split('\n')
    .filter((line) => line.startsWith('#') || findings(line).length === 0);
  const text = kept.join('\n').replace(/\n{3,}/g, '\n\n').replace(/\n+$/, '\n');
  writeFileSync(file, text);
  process.exit(0);
}

if (mode === '--stdin') {
  const text = readFileSync(0, 'utf8');
  const found = findings(text);
  if (found.length > 0) fail(found.map((item) => `${item.label}: "${item.text}"`));
  console.log('attribution: ok (text)');
  process.exit(0);
}

if (mode === '--range') {
  const range = args[1];
  if (!range) {
    console.error('attribution: --range needs a Git range');
    process.exit(2);
  }
  const output = execFileSync('git', ['log', '--format=%H%x1f%an%x1f%ae%x1f%cn%x1f%ce%x1f%B%x1e', range], { encoding: 'utf8' });
  const problems = [];
  for (const record of output.split('\x1e')) {
    const trimmed = record.trim();
    if (!trimmed) continue;
    const [hash, an, ae, cn, ce, message = ''] = trimmed.split('\x1f');
    const short = hash.slice(0, 8);
    for (const [label, value] of [['author', `${an} ${ae}`], ['committer', `${cn} ${ce}`]]) {
      if (NAME_RE.test(value) && !ALLOWED_BOTS.some((bot) => value.includes(bot))) {
        problems.push(`${short}: ${label} identity "${value.trim()}" is not a human contributor`);
      }
    }
    for (const item of findings(message)) problems.push(`${short}: ${item.label}: "${item.text}"`);
  }
  if (problems.length > 0) fail(problems);
  console.log('attribution: ok (commits)');
  process.exit(0);
}

if (mode === '--files') {
  const problems = [];
  for (const file of repoFiles()) {
    const path = rel(file);
    const name = basename(file);
    const segments = path.split('/');
    if (FORBIDDEN_NAMES.has(name.toLowerCase()) && path !== SELF) {
      problems.push(`${path}: tool-specific configuration files are not committed. Use AGENTS.md`);
    }
    if (segments.slice(0, -1).some((segment) => FORBIDDEN_DIRS.has(segment.toLowerCase())) && path !== SELF) {
      problems.push(`${path}: tool-specific directories are not committed. Use AGENTS.md`);
    }
    if (path === SELF || path === '.gitignore' || !TEXT_EXT.test(name)) continue;
    for (const item of findings(readFileSync(file, 'utf8'))) {
      problems.push(`${path}:${item.line}: ${item.label}`);
    }
  }
  if (problems.length > 0) fail(problems);
  console.log('check:attribution: ok');
  process.exit(0);
}

console.error('usage: check-attribution.mjs --strip <file> | --range <range> | --stdin | --files');
process.exit(2);
