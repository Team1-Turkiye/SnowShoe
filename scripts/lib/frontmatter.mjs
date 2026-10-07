import { readFileSync } from 'node:fs';

function stripQuotes(value) {
  return value.replace(/^["']|["']$/g, '');
}

// Minimal frontmatter parser. Supports `key: value` lines and inline lists `[a, b]`.
export function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: null, body: text };
  const data = {};
  for (const raw of match[1].split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (!line || line.trimStart().startsWith('#')) continue;
    const index = line.indexOf(':');
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((item) => stripQuotes(item.trim()))
        .filter(Boolean);
    } else {
      value = stripQuotes(value);
    }
    data[key] = value;
  }
  return { data, body: match[2] };
}

export function readFrontmatter(path) {
  return parseFrontmatter(readFileSync(path, 'utf8'));
}
