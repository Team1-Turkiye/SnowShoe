# Bounty program

Bounties reward focused, reviewed work on tasks that the project needs. This document defines how the program runs. The funding source and pool size are open decisions. See the [roadmap](../../docs/roadmap.md).

## Eligibility

- Anyone can claim a bounty task unless it is marked for a specific level.
- Core Maintainers and reviewers of a task cannot claim that task.
- Contributors must follow the [Code of Conduct](../../CODE_OF_CONDUCT.md).

## Task tiers

| Tier | Label | Typical scope |
| --- | --- | --- |
| Starter | `level:starter` | Fix a skill step, add eval cases, translate a guide |
| Intermediate | `level:intermediate` | Write a new skill, improve a kit |
| Advanced | `level:advanced` | New MCP tool, new kit, security review |

Reward amounts are published in each task issue before anyone claims it.

## Process

1. A maintainer opens a task issue with the `bounty` label, a clear scope, acceptance criteria, and the reward.
2. A contributor comments to claim it. A maintainer assigns it.
3. The contributor opens a pull request within 14 days or releases the claim.
4. Reviewers check the work against the acceptance criteria and the normal review rules.
5. After merge, a maintainer confirms the payout request.

## Rules

- One active claim per contributor per tier.
- Work must be original, or properly credited and licensed.
- Quality gates are the same as for unpaid work. A bounty never lowers the bar.
- Reviewers decide acceptance. Disputes follow [GOVERNANCE.md](../../GOVERNANCE.md).
- Split or duplicate submissions for the same task are rejected.
- Attempts to game the program lead to removal from it.

## Transparency

- Every bounty task, claim, and result is public in the issue tracker.
- A quarterly summary lists funds committed, funds paid, and tasks completed.
- Any financial relationship between a maintainer and a payee is disclosed in the task.

## Payout

Payout method and compliance steps are defined by the funding source. Maintainers document the method in the task before a contributor claims it.
