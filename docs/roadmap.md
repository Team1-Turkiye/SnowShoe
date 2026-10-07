# Roadmap

The roadmap has five phases. Each phase has an exit condition. Durations are planning targets and measured from the day the repository opens to contributors.

## Phase 0: Foundation

**Goal:** a repository that any contributor can understand and use.

Scope:

- Structure, governance, and contribution guides.
- Templates for skills, kits, and ideas, with schemas and validation.
- CI for validation, attribution checks, and drift reports.
- Role prompts for contributor tooling.

**Exit condition:**

- The repository is public under the Team1 Türkiye organization.
- GitHub teams exist and `.github/CODEOWNERS` is active.
- Labels are synced with `npm run sync:labels`.
- At least 10 `level:starter` issues are open across at least four tracks.

## Phase 1: Core content (weeks 1 to 6)

**Goal:** a small set of verified content that proves the model.

Scope:

- Resolve [ADR 0001](decisions/0001-distribution-model.md) and [ADR 0002](decisions/0002-minimal-tool-surface.md).
- Inventory the content of the previous SnowShoe codebase. Classify each item as keep, rewrite, or retire. Import kept items in the new format with `draft` status.
- Publish the first five verified skills.
- Ship the eval runner in its first version.
- Ship the MCP server baseline with a manifest and tests.
- Publish two kits with measured time to first run.

**Candidate first skills.** The Skills Area Steward confirms the final list.

| Candidate | Journey |
| --- | --- |
| Set up a Fuji development environment | `learn` |
| Create and fund a testnet account safely | `learn` |
| Deploy a contract to Fuji and verify it | `build` |
| Create a local L1 with the official CLI | `build` |
| Send an interchain message between two chains | `build` |

**Exit condition:** five skills at `verified`, one eval run recorded per skill, one kit reproduced by a reviewer from a clean machine.

## Phase 2: Community onboarding (weeks 6 to 12)

**Goal:** contributors outside the maintainer group ship changes regularly.

Scope:

- Onboarding sessions for Team1 Türkiye members using [first-contribution.md](first-contribution.md).
- A steady pipeline of at least 20 open starter issues.
- Area Stewards appointed in at least five tracks.
- Turkish translations of the core guides.
- A public contributor dashboard based on GitHub data.

**Exit condition:** at least half of merged pull requests in a month come from people who are not Core Maintainers.

## Phase 3: Programs (weeks 12 to 20)

**Goal:** structured incentives and event integration.

Scope:

- Pilot the [bounty program](../community/bounties/README.md) on a small set of tasks.
- Use workshop kits at events. Feed results back as issues and skill fixes.
- Onboard the first protocol-owned ecosystem skills.
- Add a release cadence and release notes.

**Exit condition:** one full bounty cycle completed with a retrospective, and at least two events run from workshop kits.

## Phase 4: Ecosystem integration

**Goal:** the wider Avalanche builder ecosystem consumes SnowShoe.

Scope:

- Agree a consumption model with ecosystem partners based on the upstream model in [GOVERNANCE.md](../GOVERNANCE.md).
- Open contribution to Team1 members in other regions.
- Seek ecosystem funding for the bounty pool and maintenance.

**Exit condition:** at least one external project consumes released SnowShoe content and reports issues upstream.

## Metrics

| Metric | Why it matters |
| --- | --- |
| Verified skills | Trusted content available |
| Monthly active contributors | Community health |
| Share of merged pull requests from non-maintainers | Project is not a one-team effort |
| Median time to first review | Contributor experience |
| Median time to first run for kits | Builder experience |
| Skills past their re-verification date | Content freshness |

## Open decisions

| Decision | Where it lives |
| --- | --- |
| Skill distribution: local install, remote gateway, or hybrid | [ADR 0001](decisions/0001-distribution-model.md) |
| Size of the MCP tool surface | [ADR 0002](decisions/0002-minimal-tool-surface.md) |
| Final list of the first five skills | Phase 1 issue, owned by the Skills Area Steward |
| Funding source and size of the bounty pool | Phase 3 issue, owned by Core Maintainers |
| Release cadence | Phase 3 issue, owned by Core Maintainers |
