# 0001: Distribution model for skills

- **Status:** Proposed
- **Date:** 2026-10-07
- **Deciders:** Core Maintainers
- **Proposer:** Core Maintainers

## Context

Skills reach a user's agent in one of two broad ways. The agent can read skill files installed on the user's machine, or it can fetch skills from a remote service when it needs them. Both are in use in similar projects. The choice affects security, freshness, offline use, cost, and how contributors test their work.

## Options

### Option A: Local install

A command copies selected skills into the user's agent environment.

- Benefits: works offline, no hosted service, the user can read exactly what the agent reads, simple trust model.
- Costs: skills go stale on the user's machine, updates need a user action, install steps are an attack surface.

### Option B: Remote gateway

A hosted MCP endpoint serves skills and operations on demand.

- Benefits: always current, one place to enforce checks, secrets stay server side, small client footprint.
- Costs: needs hosting and operations, adds availability and privacy concerns, needs network access, harder for contributors to test locally.

### Option C: Hybrid

A small local client fetches signed skill bundles from a release channel and caches them. The remote service serves read-only content. Write operations run locally.

- Benefits: keeps the user in control of signing, allows offline cache, gives a clear update path.
- Costs: the most work to build and the most moving parts to secure.

## Decision criteria

1. Safety of the user's keys and funds.
2. Freshness of skill content.
3. Ease of contribution and local testing.
4. Operating cost and effort.
5. Offline and low-bandwidth use.

## Decision

Pending.

## Consequences

The decision determines the package layout under `packages/`, the install steps in the README, the release process, and the threat model in [supply-chain-rules.md](../supply-chain-rules.md). Content work in Phase 1 does not depend on it, because skills are plain files in all three options.

## Review date

Decide before the end of Phase 1. Revisit after six months of use.
