# 0003: Repository layout and ownership

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Core Maintainers
- **Proposer:** Core Maintainers

## Context

SnowShoe moves to a single repository under the Team1 Türkiye organization. Many people with different skills must contribute without stepping on each other. Reviewers need clear ownership. Content must be machine-checkable.

## Options

### Option A: One repository per layer

Separate repositories for skills, tools, and kits.

- Benefits: independent releases, narrow permissions.
- Costs: contributors must learn several repositories, cross-layer changes need several pull requests, governance is repeated.

### Option B: One monorepo with path ownership

One repository. Top-level folders map to tracks. CODEOWNERS and labels route review.

- Benefits: one place to contribute, atomic cross-layer changes, one set of rules and CI.
- Costs: broader repository permissions, larger history.

## Decision criteria

1. Low barrier for first-time contributors.
2. Clear review ownership.
3. Machine-checkable structure.
4. Ease of release.

## Decision

Option B. The repository is a monorepo. Folders map to tracks as shown in [tracks.md](../tracks.md). Skills are data files with frontmatter and eval cases. Scripts have no dependencies so anyone can read and run them. Protocol-owned content lives under `skills/ecosystem/<protocol>/`.

## Consequences

- CODEOWNERS and labels map paths to tracks.
- CI validates every layer with the same commands contributors run locally.
- If a layer needs an independent release cycle later, it can be split out with its history. A new ADR will record that change.

## Review date

After Phase 2 of the [roadmap](../roadmap.md).
