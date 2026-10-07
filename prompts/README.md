# Contributor prompts

These are system prompts for the assistant you use while you contribute. They encode the rules of this repository so that the assistant produces work that passes review the first time.

## How to use a prompt

1. Pick the prompt that matches your task from the table.
2. Paste its body into the system prompt or project instructions of your assistant.
3. Always paste [contributor-agent.md](contributor-agent.md) as well. Role prompts add to it and never replace it.
4. Give the assistant the task, the relevant files, and the issue link.
5. Read and test everything it produces. You are the author.

## Prompts

| File | Use it when you |
| --- | --- |
| [contributor-agent.md](contributor-agent.md) | Do any work in this repository. Always include |
| [skill-author.md](skill-author.md) | Write or improve a skill |
| [kit-author.md](kit-author.md) | Build or improve a kit |
| [mcp-tool-author.md](mcp-tool-author.md) | Design or implement an MCP tool |
| [eval-writer.md](eval-writer.md) | Write eval cases |
| [reviewer.md](reviewer.md) | Review a pull request |
| [docs-editor.md](docs-editor.md) | Edit or write docs |
| [translator-tr.md](translator-tr.md) | Translate English docs to Turkish |
| [idea-scout.md](idea-scout.md) | Research and write up an idea |
| [workshop-designer.md](workshop-designer.md) | Design a workshop kit |

## Format

Each file has frontmatter with `name`, `purpose`, `track`, and `version`, then the prompt body. `npm run validate:prompts` checks the format.

## Changing a prompt

Prompts are reviewed like code. Open a pull request, explain the failure the change fixes, and include an example of the output before and after. Bump `version` when behavior changes.

## Limits

A prompt does not replace review. It reduces mistakes. Check every fact, run every command, and follow [docs/ai-assisted-contributions.md](../docs/ai-assisted-contributions.md).
