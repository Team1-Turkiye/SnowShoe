# Translations

English is the source language. Turkish is the first translation. Other languages are welcome once Turkish is stable.

## File convention

Place a translation next to its source with the language code before `.md`:

```text
README.md        source
README.tr.md     Turkish
docs/tracks.md   source
docs/tracks.tr.md Turkish
```

Skills are not translated in place. A skill has one canonical English text so that evals and verification stay meaningful. Learning content about skills belongs in `docs/content/`.

## Rules

- Translate meaning, not words. Read the result aloud.
- Keep protocol names, tool names, commands, file names, and code unchanged.
- Keep headings parallel to the source so that readers can switch languages.
- Follow the [style guide](style-guide.md). The no-em-dash rule applies in every language.
- Put the source commit hash in a comment at the top when the source changes often:
  `<!-- source: <short hash> -->`
- If the source changes, update the translation or add a notice at the top that it may be outdated.

## Glossary

Keep these terms in English, and explain them once in the translation:

| Term | Note |
| --- | --- |
| skill | Reviewed instruction file |
| MCP | Model Context Protocol |
| L1 | Avalanche Layer 1 blockchain |
| Fuji | Avalanche public testnet |
| kit | Runnable starter repository |
| eval | Test case for a skill |

Add terms to this table when you find ones that readers need.

## Review

One native-speaking reviewer approves each translation. Open a pull request with the `track:docs` label.
