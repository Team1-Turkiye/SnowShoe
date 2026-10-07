# Contributing to SnowShoe

Thank you for contributing. This guide covers everything you need to ship a change.

## Ways to contribute

SnowShoe has ten tracks. Pick the one that matches your competence. The full list is in [docs/tracks.md](docs/tracks.md).

| Track | Label | Typical change |
| --- | --- | --- |
| Skills | `track:skills` | New or improved skill |
| MCP | `track:mcp` | New or improved tool |
| Kits | `track:kits` | New or improved starter repo |
| Ideas | `track:ideas` | New idea or research note |
| Evals | `track:evals` | New test cases, harness work |
| Security | `track:security` | Review, threat report |
| Docs | `track:docs` | Guide, fix, translation |
| Design | `track:design` | Diagram, visual, brand asset |
| Community | `track:community` | Workshop kit, event material |
| Content | `track:content` | Tutorial, article, video script |

## Before you start

1. Read the [Code of Conduct](CODE_OF_CONDUCT.md).
2. Look for an open issue labeled `level:starter` in your track, or open a new issue.
3. Comment on the issue to claim it. A maintainer will assign it to you.

Open an issue and wait for a maintainer reply before you start any of these:

- A new MCP tool
- A new kit
- A new protocol folder under `skills/ecosystem/`
- A change to `schemas/`, `scripts/`, or `.github/`

Small fixes, new skills in existing journeys, ideas, and docs can go straight to a pull request.

## Set up

You need Node.js 20 or newer and Git.

```bash
git clone https://github.com/<your-username>/snowshoe.git
cd snowshoe
git remote add upstream https://github.com/team1-turkiye/snowshoe.git
npm run setup
npm run validate
```

`npm run setup` installs the repository's Git hooks. Run it once per clone.

## Workflow

1. Sync your fork: `git fetch upstream && git switch -c <branch> upstream/main`.
2. Make your change.
3. Run `npm run validate`. Fix every error.
4. Commit with the format below.
5. Push to your fork and open a pull request against `main`.
6. Respond to review comments. Push follow-up commits to the same branch.
7. A maintainer squash-merges when the required approvals are in.

## Branch names

Use `<track>/<short-description>`. Examples: `skills/fuji-faucet-setup`, `mcp/add-balance-tool`, `docs/fix-install-steps`.

## Commit messages

Use `<prefix>: <imperative summary>` in 72 characters or fewer.

Allowed prefixes: `skills`, `mcp`, `kits`, `ideas`, `evals`, `security`, `docs`, `design`, `community`, `content`, `repo`.

Examples:

```text
skills: add fuji-faucet-setup
mcp: return typed errors from balance tool
docs: clarify node version requirement
```

Write the body only when the reason is not obvious from the diff.

## Authorship

Every commit carries your own name and email. Do not add credit lines, co-author trailers, or "generated with" notes for tools. The commit hook removes them and CI rejects them. You are fully responsible for what you submit. Read [docs/ai-assisted-contributions.md](docs/ai-assisted-contributions.md).

## Pull request requirements

Every pull request must:

- Link an issue, or explain why none exists.
- Pass `npm run validate` and the CI checks.
- Stay focused on one change.
- Update docs when behavior changes.
- Contain no secrets. See [docs/supply-chain-rules.md](docs/supply-chain-rules.md).

Track-specific requirements:

- **Skills.** Follow [docs/skill-authoring.md](docs/skill-authoring.md). Include evals before asking for `verified` status. Test on Fuji.
- **MCP tools.** Follow [docs/mcp-tool-authoring.md](docs/mcp-tool-authoring.md). Add tests. Update `tools.manifest.json`.
- **Kits.** Follow [docs/kit-authoring.md](docs/kit-authoring.md). A new reader must reach a first successful run in the time stated in `kit.json`.
- **Docs.** Follow [docs/style-guide.md](docs/style-guide.md).

## Review

- First response within 5 business days.
- One approval for docs, ideas, design, and community changes.
- Two approvals for skills, kits, MCP tools, and anything under `scripts/` or `.github/`.
- Security-sensitive changes also need a reviewer from the Security track.
- Authors never approve their own pull request.

Details: [docs/review-process.md](docs/review-process.md).

## What we do not accept

- Changes that include private keys, seed phrases, or API keys.
- Skills that ask a user to paste a private key into a chat or a file.
- Install steps that pipe remote scripts into a shell.
- Obfuscated or minified code.
- Unverified claims about addresses, ABIs, endpoints, or fees.
- Marketing language in technical docs.

## Recognition

Merged work appears in the GitHub contributors graph. Each skill and kit lists its owner. Sustained contribution moves you up the [contribution ladder](docs/contribution-ladder.md). Eligible tasks may carry a bounty. See [community/bounties/README.md](community/bounties/README.md).

## License

By contributing, you agree that your contribution is licensed under the [MIT License](LICENSE).
