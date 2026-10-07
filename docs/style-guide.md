# Style guide

Technical readers are busy. Write so that a reader can act after one pass.

## Voice

- Write short sentences. Aim for under 20 words.
- Use active voice. Name the actor.
- Be specific. Replace adjectives with facts, numbers, and examples.
- Do not use hype. No "revolutionary", "seamless", or "powerful".
- Do not use em dashes. Use a period, a colon, or parentheses.
- Do not group things in threes for rhythm. List the real number of items.
- Use "you" for the reader and "we" for the maintainers.
- Use absolute dates, such as `2026-10-07`. Never write "recently" or "soon".

## Structure

- Lead with the point. Put background after.
- One idea per paragraph.
- Use numbered lists for ordered steps and bullets for unordered items.
- Use tables for comparisons across the same attributes.
- Use headings that describe content. Prefer "Set up the environment" to "Getting started".

## Code and commands

- Put commands in fenced blocks with a language tag.
- Show expected output when it confirms success.
- Use placeholders in `UPPER_SNAKE_CASE`, and explain each one.
- Keep one command per line. Avoid long chains.

## Terminology

| Use | Not |
| --- | --- |
| Fuji testnet | Fuji chain, test net |
| L1 | subnet, unless quoting older documentation |
| skill | prompt, recipe |
| MCP tool | plugin |
| kit | template, boilerplate |

Keep protocol names, command names, and file names in their original form in every language.

## Links

- Use relative links inside the repository.
- Link to official sources for outside facts.
- Write link text that describes the target. Avoid "click here".

## Accessibility

- Add alt text to every image.
- Do not rely on color alone to carry meaning.
- Keep diagrams editable. Commit the source file or use Mermaid.

## Languages

English is the source language. Turkish is the first translation. See [translations.md](translations.md).
