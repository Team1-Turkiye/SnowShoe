# MCP server

This package will hold the SnowShoe MCP server. The tool manifest in `tools.manifest.json` is the contract between skills and the server.

## Status

The manifest is empty. The size and shape of the tool surface is an open decision. See [ADR 0002](../../docs/decisions/0002-minimal-tool-surface.md).

## Layout

```text
packages/mcp-server/
  tools.manifest.json     every tool, with network scope and read-only flag
  src/                    server and tool implementations
  test/                   tests for every tool
```

## Adding a tool

Follow [docs/mcp-tool-authoring.md](../../docs/mcp-tool-authoring.md). In short:

1. Open a tool proposal issue and wait for a maintainer reply.
2. Add the manifest entry.
3. Implement the tool with validated inputs and typed errors.
4. Add tests for success, validation failure, typed errors, and refused writes.
5. Open a pull request. It needs two approvals, one from the Security track.

## Rules

- Tools never accept private keys or seed phrases.
- Write tools require `confirm: true` and echo the action first.
- Default to Fuji. Mainnet needs an explicit network argument.
