import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const SKIP = new Set(['node_modules', '.git', 'dist', 'coverage']);

export function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

// Returns absolute paths of files that belong to the repository.
// Uses `git ls-files` when available so untracked local files are ignored.
export function repoFiles(root = process.cwd()) {
  if (existsSync(join(root, '.git'))) {
    try {
      const output = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' });
      return output
        .split('\0')
        .filter(Boolean)
        .map((file) => join(root, file))
        .filter((file) => existsSync(file));
    } catch {
      // Fall through to a directory walk.
    }
  }
  return walk(root);
}

export function rel(path, root = process.cwd()) {
  return relative(root, path).split('\\').join('/');
}
