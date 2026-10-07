# SnowShoe

SnowShoe is an open-source builder stack for Avalanche. It packages the three things builders and AI agents need to ship on Avalanche:

- **Skills.** Verified, step-by-step instructions that an agent or a human can follow to finish one job.
- **MCP tools.** A Model Context Protocol server that lets agents act on Avalanche networks.
- **Kits.** Runnable starter repositories and demos.

The project is owned by Team1 Türkiye. Every Team1 member and every Avalanche builder can contribute.

Türkçe sürüm: [README.tr.md](README.tr.md)

## Why this repository exists

Teams that run builder onboarding repeat the same setup work for every cohort. SnowShoe turns that work into shared, versioned, reviewed assets.

The repository is organized so that each contributor works inside their own competence. Writers write skills and docs. Engineers build tools and kits. Designers shape the brand. Facilitators write workshop kits. Reviewers keep quality high. Nobody needs to understand the whole stack to make a useful contribution.

## Repository map

| Path | Contents | Main contributors |
| --- | --- | --- |
| `skills/` | Verified skills grouped by builder journey and by protocol | Technical writers, protocol teams, builders |
| `packages/mcp-server/` | The MCP server and its tool manifest | TypeScript engineers |
| `kits/` | Starter repositories and demos | Full-stack and smart contract developers |
| `ideas/` | Project ideas and research backlog | Product people, researchers |
| `prompts/` | System prompts for contributor tooling | Anyone who uses an AI assistant |
| `docs/` | Architecture, guides, decisions, roadmap | Writers, maintainers |
| `community/` | Workshop kits, bounty policy | Facilitators, community leads |
| `schemas/` | JSON schemas for skills, kits, ideas, evals | Maintainers |
| `scripts/` | Validation and maintenance scripts | Engineers |

## Find your track

| If you are | You can contribute | Start here |
| --- | --- | --- |
| A writer or educator | Skills, docs, tutorials | [docs/skill-authoring.md](docs/skill-authoring.md) |
| A TypeScript engineer | MCP tools, scripts | [docs/mcp-tool-authoring.md](docs/mcp-tool-authoring.md) |
| A smart contract or full-stack developer | Kits, demos | [docs/kit-authoring.md](docs/kit-authoring.md) |
| A product thinker | Ideas, research | [ideas/README.md](ideas/README.md) |
| A tester | Evals, bug reports | [docs/evals.md](docs/evals.md) |
| A security researcher | Reviews, threat reports | [SECURITY.md](SECURITY.md) |
| A translator | Turkish and other languages | [docs/translations.md](docs/translations.md) |
| A designer | Brand, diagrams, visuals | [docs/tracks.md](docs/tracks.md) |
| A community organizer | Workshop kits, events | [community/README.md](community/README.md) |

New here? Follow [docs/first-contribution.md](docs/first-contribution.md). It takes about 30 minutes.

## Quick start

```bash
git clone https://github.com/team1-turkiye/snowshoe.git
cd snowshoe
npm run setup
npm run validate
```

The repository has no runtime dependencies. Node.js 20 or newer is enough.

Create a new skill from the template:

```bash
npm run new:skill -- build my-skill-name
```

## Principles

1. **Fuji first.** Every skill and kit runs on the Fuji testnet before it touches mainnet.
2. **Small tool surface.** Agents lose context to large tool lists. We add a tool only when a skill cannot do the job.
3. **Skills are data.** A skill is reviewed text with tests. It is not executable code.
4. **Verified means tested.** A skill earns `verified` status only after its evals pass and a reviewer runs it end to end.
5. **No secrets, ever.** No private keys, seed phrases, or API keys in the repository, in skills, or in prompts.

## Status

Version 0.1 is the repository foundation. See [docs/roadmap.md](docs/roadmap.md) for the phased plan.

## Governance and conduct

- [GOVERNANCE.md](GOVERNANCE.md)
- [MAINTAINERS.md](MAINTAINERS.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md)

## License

MIT. See [LICENSE](LICENSE).
