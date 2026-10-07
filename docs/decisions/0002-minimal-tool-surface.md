# 0002: Size of the MCP tool surface

- **Status:** Proposed
- **Date:** 2026-10-07
- **Deciders:** Core Maintainers
- **Proposer:** Core Maintainers

## Context

An agent reads the description of every tool it can call. Each tool uses context and adds a choice the agent can get wrong. A large tool list can reduce accuracy. A tiny tool list needs a way to reach many operations.

## Options

### Option A: Many specific tools

One tool per operation, each with a precise schema.

- Benefits: clear schemas, easy per-tool permissions, simple to test.
- Costs: large context cost, more selection errors, higher maintenance.

### Option B: A few gateway tools

A small number of tools, for example one to search the operation catalog and one to run an operation by name with validated arguments.

- Benefits: small context cost, the catalog grows without growing the tool list, one place to enforce confirmation and validation.
- Costs: the agent needs one extra step to find an operation, schemas are described in the catalog and not in the tool list.

### Option C: Tiered

A gateway for the long tail plus a short list of direct tools for the most common read operations.

- Benefits: fast common paths, bounded context cost.
- Costs: two patterns to document and maintain.

## Decision criteria

1. Agent accuracy on realistic tasks, measured with evals.
2. Context cost.
3. Safety controls: confirmation, validation, logging.
4. Contributor effort to add an operation.

## Decision

Pending.

## Consequences

The decision shapes `tools.manifest.json`, the tool authoring guide, and the eval suite. The Evals track measures each option on the same set of tasks before the vote.

## Review date

Decide before the end of Phase 1.
