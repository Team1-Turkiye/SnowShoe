# Tracks

SnowShoe organizes contribution into ten tracks. Each track has a path, a label, an Area Steward, and starter tasks. Pick the track that matches what you already do well.

## 1. Skills (`track:skills`)

**Path:** `skills/`
**Fits:** technical writers, educators, builders who can explain a procedure, protocol team members.
**You contribute:** new skills, fixes to existing skills, ecosystem skills for a protocol you know.
**Starter tasks:** fix a broken step, add a missing "Common failures" entry, add a new eval case.
**Guide:** [skill-authoring.md](skill-authoring.md)

## 2. MCP (`track:mcp`)

**Path:** `packages/mcp-server/`
**Fits:** TypeScript engineers.
**You contribute:** tools, tests, error handling, manifest entries.
**Starter tasks:** add tests for an existing tool, improve an error message.
**Guide:** [mcp-tool-authoring.md](mcp-tool-authoring.md)

## 3. Kits (`track:kits`)

**Path:** `kits/`
**Fits:** smart contract and full-stack developers.
**You contribute:** starter repositories, demos, workshop projects.
**Starter tasks:** shorten time to first run, add a README troubleshooting section.
**Guide:** [kit-authoring.md](kit-authoring.md)

## 4. Ideas (`track:ideas`)

**Path:** `ideas/`
**Fits:** product thinkers, researchers, founders.
**You contribute:** scoped project ideas, market or technical research, competitive notes.
**Starter tasks:** turn a rough idea into the idea template, add sources to an existing idea.
**Guide:** [ideas/README.md](../ideas/README.md)

## 5. Evals (`track:evals`)

**Path:** `skills/*/evals/`, `scripts/`
**Fits:** testers, QA engineers, prompt engineers.
**You contribute:** eval cases, harness improvements, drift checks.
**Starter tasks:** write three eval cases for a draft skill.
**Guide:** [evals.md](evals.md)

## 6. Security (`track:security`)

**Path:** whole repository, with focus on [supply-chain-rules.md](supply-chain-rules.md)
**Fits:** security researchers, auditors.
**You contribute:** reviews, threat models, injection tests, rule improvements.
**Starter tasks:** review an open skill pull request against the supply chain rules.
**Guide:** [SECURITY.md](../SECURITY.md)

## 7. Docs (`track:docs`)

**Path:** `docs/`, root Markdown files, translations
**Fits:** writers, editors, translators.
**You contribute:** guides, fixes, translations, glossary entries.
**Starter tasks:** fix a typo, translate a guide to Turkish.
**Guide:** [style-guide.md](style-guide.md), [translations.md](translations.md)

## 8. Design (`track:design`)

**Path:** `docs/assets/`, brand files
**Fits:** graphic designers, illustrators, motion designers.
**You contribute:** diagrams, brand assets, social cards, workshop visuals.
**Starter tasks:** redraw the architecture diagram as an SVG.
**Guide:** keep sources editable, export SVG or PNG, state the license of every asset.

## 9. Community (`track:community`)

**Path:** `community/`
**Fits:** facilitators, event organizers, community leads.
**You contribute:** workshop kits, onboarding playbooks, feedback forms, bounty operations.
**Starter tasks:** fill in the workshop kit template for an event you ran.
**Guide:** [community/README.md](../community/README.md)

## 10. Content (`track:content`)

**Path:** `docs/content/`
**Fits:** developer advocates, video makers, writers.
**You contribute:** tutorials, articles, video scripts, case studies.
**Starter tasks:** write a tutorial that uses an existing kit.
**Guide:** [style-guide.md](style-guide.md)

## Labels

Every issue and pull request carries one `track:*` label. Pull requests get it automatically from the changed paths. See `.github/labeler.yml`.

Other label groups:

| Group | Values |
| --- | --- |
| `level:*` | `starter`, `intermediate`, `advanced` |
| `status:*` | `needs-triage`, `ready`, `claimed`, `blocked`, `needs-review` |
| `type:*` | `bug`, `feature`, `docs`, `maintenance`, `security` |
| `bounty` | Task has a bounty. See [bounty policy](../community/bounties/README.md) |
