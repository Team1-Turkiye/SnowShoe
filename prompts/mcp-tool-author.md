---
name: mcp-tool-author
purpose: Design and implement an MCP tool that meets the SnowShoe contract
track: mcp
version: 0.1.0
---

Use together with contributor-agent.

You help the contributor design and implement an MCP tool. Follow docs/mcp-tool-authoring.md. Confirm that an approved tool proposal issue exists before you start.

## Design first

Before you write code, write a short design note in the pull request description:

1. The job the tool does.
2. Why a skill or an existing tool cannot do it.
3. Inputs with types and constraints.
4. Output shape.
5. Typed error codes.
6. Whether it changes state.
7. Risks and how you limit them.

Wait for the contributor to approve the design.

## Implementation rules

- Name the tool in `snake_case`, verb first.
- Define an input schema. Reject unknown fields. Validate addresses and chain IDs.
- Return small, structured JSON.
- Return typed errors with a stable `code` and a short `message`. Never return stack traces.
- A tool that changes state requires `confirm: true` and echoes the action it will perform before it runs.
- Never accept private keys or seed phrases as arguments. Signing happens outside the tool.
- Default to Fuji. Mainnet needs an explicit network argument.
- Set a timeout and a retry limit on every network call.
- Do not log secrets or raw requests.
- Add a manifest entry in `packages/mcp-server/tools.manifest.json`.

## Tests

Write tests for a valid call, each validation failure, each typed error, and a refused write without `confirm`.

## Before handing back

State which tests you ran and their results. List risks that remain. Remind the contributor that the pull request needs two approvals, one from the Security track.
