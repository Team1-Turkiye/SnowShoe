# Skill authoring

A skill is a reviewed Markdown file that teaches an agent or a human to do one job on Avalanche. This guide explains the format and the quality bar.

## Create a skill

```bash
npm run new:skill -- build deploy-contract-fuji
```

The command copies `skills/_template` to `skills/build/deploy-contract-fuji/`. For a protocol-owned skill, add the protocol name:

```bash
npm run new:skill -- ecosystem my-skill-name my-protocol
```

This creates `skills/ecosystem/my-protocol/my-skill-name/`.

## Folder layout

```text
skills/<journey>/<skill-name>/
  SKILL.md
  evals/
    cases.json
```

The folder name must equal the `name` field. Names use lowercase letters, digits, and hyphens.

## Frontmatter

| Field | Required | Meaning |
| --- | --- | --- |
| `name` | yes | Unique skill name. Equals the folder name |
| `description` | yes | One or two sentences. Say what the skill does and when to use it. 40 to 300 characters |
| `journey` | yes | `learn`, `idea`, `build`, `launch`, or `ecosystem`. Equals the parent folder |
| `network` | yes | `fuji`, `mainnet`, `both`, or `none` |
| `status` | yes | `draft`, `verified`, or `deprecated` |
| `owner` | yes | GitHub handle of the person responsible, starting with `@` |
| `version` | yes | Semantic version of the skill text |
| `last_verified` | when `verified` | Date in `YYYY-MM-DD` of the last end-to-end run |
| `requires` | no | Skills that must be done first, as a list of names |
| `tools` | no | MCP tools the skill calls, as a list of names |
| `tags` | no | Free-form keywords |

Write lists inline, as `[a, b]`. The validator does not read multi-line YAML lists.

Example:

```yaml
---
name: example-skill
description: Short statement of the job this skill does and when an agent should pick it.
journey: build
network: fuji
status: draft
owner: "@your-handle"
version: 0.1.0
requires: [fuji-environment-setup]
tools: []
tags: [example]
---
```

## Required sections

Every skill body contains these headings, in this order:

1. `## When to use`: the trigger, and when not to use it.
2. `## Prerequisites`: accounts, tools, funds, other skills.
3. `## Steps`: numbered, one action per step, each with the expected result.
4. `## Verification`: how the reader confirms the job is done.
5. `## Common failures`: symptoms and fixes.

## Writing rules

- One job per skill. If you write "and then", consider two skills.
- Write for a reader who has not seen the repository.
- Give exact commands in code fences with a language tag.
- State the expected output after every command that matters.
- Name every network and chain ID explicitly. Do not rely on defaults.
- Link to official documentation for facts that change. Do not copy long passages.
- Mark anything you could not check as `unverified`. Reviewers resolve it or remove the claim.
- Mark every step that changes state on chain with **Confirm:** and state what the action does.
- Never ask the reader to share a private key or seed phrase. Use a funded testnet account and tell the reader to keep keys local.
- Keep the file under 500 lines.

Follow the [style guide](style-guide.md).

## Status lifecycle

| Status | Meaning | Requirements |
| --- | --- | --- |
| `draft` | Written, not yet trusted | Passes validation |
| `verified` | Tested end to end | Eval cases pass, a reviewer ran it on Fuji, `last_verified` is set, two approvals |
| `deprecated` | Replaced or obsolete | A note in the body links to the replacement |

Verified skills are re-verified every 90 days. A weekly workflow opens an issue for skills past due.

## Promotion checklist

Before you ask for `verified`:

- [ ] `evals/cases.json` has at least three cases.
- [ ] You ran every step on Fuji in a clean environment.
- [ ] Every external link works and points to an official source.
- [ ] A reviewer in the Skills track ran the skill independently.
- [ ] The supply chain rules are satisfied.
