# MCP tool authoring

Tools are executable operations that skills and agents call over the Model Context Protocol. Every tool costs agent context, so we add them carefully.

## Before you write a tool

1. Check whether a skill can do the job with existing tools or plain commands.
2. Open an issue that states the job, the inputs, and why a skill is not enough.
3. Wait for a maintainer to confirm. See [ADR 0002](decisions/0002-minimal-tool-surface.md).

## Naming

- Use `snake_case` with a verb first: `get_balance`, `estimate_gas`.
- Names stay stable. Renames follow a deprecation period of one minor release.

## Manifest entry

Every tool has an entry in `packages/mcp-server/tools.manifest.json`:

```json
{
  "name": "get_balance",
  "description": "Return the native token balance for an address on a named network.",
  "network": "both",
  "readOnly": true,
  "confirmRequired": false
}
```

| Field | Meaning |
| --- | --- |
| `name` | Tool name |
| `description` | One sentence the agent reads. Be precise |
| `network` | `fuji`, `mainnet`, or `both` |
| `readOnly` | `true` if the tool changes no state |
| `confirmRequired` | `true` if the tool needs an explicit `confirm` argument before it writes |

## Contract

- **Inputs.** Define a JSON schema. Reject unknown fields. Validate addresses and chain IDs.
- **Outputs.** Return structured JSON. Keep outputs small.
- **Errors.** Return typed errors with a stable `code` and a short `message`. Never return stack traces.
- **Writes.** A tool that changes state must require `confirm: true` and must echo the action it will perform before running.
- **Secrets.** Tools never accept private keys or seed phrases as arguments. Signing happens in the user's own wallet or signer.
- **Logging.** Do not log addresses together with secrets. Do not log raw requests.
- **Networks.** Default to Fuji. Mainnet requires an explicit network argument.
- **Timeouts.** Every network call has a timeout and a retry limit.

## Tests

Each tool ships with tests for:

- A valid call.
- Each validation failure.
- Each typed error.
- A refused write without `confirm`.

## Review

Two approvals, including one from the Security track. The reviewer reads the tool against [supply-chain-rules.md](supply-chain-rules.md).
