# Governance

SnowShoe is a community-owned project under Team1 Türkiye. This document explains who decides what and how.

## Roles

| Role | Responsibility | How you get it |
| --- | --- | --- |
| Contributor | Anyone with a merged change or an accepted issue | Contribute |
| Trusted Contributor | Can be requested as reviewer and can triage issues | See [contribution ladder](docs/contribution-ladder.md) |
| Area Steward | Owns one track. Reviews and merges inside the track paths | Nomination by a Core Maintainer |
| Core Maintainer | Owns architecture, releases, and governance | Nomination and vote |
| Tech Lead sponsor | Represents Team1 Türkiye. Holds the tie-break on unresolved disputes | Role of the Team1 Türkiye Tech Lead |

Current maintainers are listed in [MAINTAINERS.md](MAINTAINERS.md). Area Stewards are listed in [.github/CODEOWNERS](.github/CODEOWNERS).

## Decision making

### Everyday changes

Lazy consensus applies. A pull request merges when the required reviewers approve and no unresolved objection remains. Docs and small fixes may merge after 24 hours. Other changes wait 72 hours so that reviewers in other time zones can respond.

### Architectural changes

Architecture decisions are recorded as ADRs in [docs/decisions](docs/decisions/README.md).

1. The proposer opens a pull request with status `Proposed`.
2. The comment window is 7 days.
3. A majority of Core Maintainers accepts or rejects the ADR.
4. The status changes to `Accepted` or `Rejected` and the ADR stays in the repository.

### Disputes

Discuss in the pull request or issue first. If two reviewers cannot agree after one round, escalate to the Core Maintainers. If they cannot reach a majority, the Tech Lead sponsor decides and records the reason in the thread.

## Roles over time

- Any Core Maintainer can nominate a person for Area Steward or Core Maintainer.
- The nomination stays open for 7 days. A majority of Core Maintainers approves.
- A person with no activity for 90 days moves to emeritus status. Emeritus members keep credit and can return on request.
- A person who breaks the Code of Conduct loses roles immediately, pending review.

## Conflicts of interest

- Authors never approve their own work.
- A reviewer does not approve a bounty task that they are paid for or that a close collaborator claims.
- Maintainers disclose commercial interests when they review a skill or kit from their own organization.

## Upstream model

SnowShoe is the upstream for the skills, tools, and kits it maintains. Other Team1 or ecosystem projects that want to use this content link to a released version or depend on it as a package. They do not fork the content into a second source of truth. This keeps one reviewed copy of every skill.

## Changing this document

Open a pull request. A majority of Core Maintainers must approve. The Tech Lead sponsor is notified before merge.
