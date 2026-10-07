# Agent instructions

This file tells any automated coding or writing assistant how to work in this repository. Humans can read it too. It is the single shared instruction file. Do not add tool-specific instruction files.

## Repository map

- `skills/<journey>/<skill-name>/SKILL.md`: skills. Journeys: `learn`, `idea`, `build`, `launch`, `ecosystem`.
- `skills/<journey>/<skill-name>/evals/cases.json`: eval cases for a skill.
- `packages/mcp-server/`: the MCP server and `tools.manifest.json`.
- `kits/<kit-name>/`: starter repositories with a `kit.json`.
- `ideas/<slug>.md`: project ideas.
- `prompts/`: system prompts for contributors.
- `docs/`: guides, decisions, roadmap.
- `scripts/`: validation and maintenance scripts. No dependencies.

## Commands

```bash
npm run setup           # install Git hooks, once per clone
npm run validate        # run every check
npm run new:skill -- <journey> <name>
```

Run `npm run validate` before you finish any change.

## Rules

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/style-guide.md](docs/style-guide.md) before you edit.
2. Change only what the task requires. Keep each change focused.
3. Ground every technical claim in official documentation or a command you ran. Do not invent addresses, ABIs, endpoints, flags, fees, or versions. If you cannot verify a fact, mark it `unverified` in the text and tell the human.
4. Target the Fuji testnet by default. Mainnet steps need an explicit confirmation step for the user.
5. Never request, print, store, or transmit private keys, seed phrases, or API keys. Never put them in files, examples, or logs.
6. Do not add install steps that download and execute remote scripts.
7. Follow the formats in `schemas/` and the templates in `skills/_template`, `kits/_template`, and `ideas/_template.md`.
8. Write short sentences. Use active voice. Do not use em dashes.
9. Commit under the human contributor's identity only. Do not add co-author trailers, credit lines, or "generated with" notes to commits, pull request text, or files. Do not create tool-specific configuration files in the repository.
10. When a task is ambiguous, ask the human one clear question instead of guessing.

## Role prompts

Role-specific system prompts live in [prompts/](prompts/README.md). Use the one that matches the task.

## Definition of done

- `npm run validate` passes.
- The change follows the track guide in `docs/`.
- Docs are updated when behavior changes.
- The pull request description states what changed, why, and how it was tested.
