# Kit authoring

A kit is a runnable starter repository kept inside `kits/<kit-name>/`. A new builder should reach a first successful run quickly and without help.

## Create a kit

Open an issue first. Then copy the template:

```bash
cp -r kits/_template kits/my-kit-name
```

Edit `kit.json`, `README.md`, and `.env.example`.

## Folder layout

```text
kits/<kit-name>/
  kit.json
  README.md
  .env.example
  ...your source files
```

## kit.json

| Field | Required | Meaning |
| --- | --- | --- |
| `name` | yes | Equals the folder name |
| `description` | yes | One sentence |
| `owner` | yes | GitHub handle starting with `@` |
| `status` | yes | `draft`, `verified`, or `deprecated` |
| `network` | yes | `fuji`, `mainnet`, `both`, or `none` |
| `stack` | yes | List of main technologies |
| `entry` | yes | Command that starts the kit, for example `npm run dev` |
| `time_to_first_run_minutes` | yes | Honest number from a clean machine |
| `skills` | no | Skills the kit demonstrates, as a list of names |

## README requirements

- What the kit builds, in two sentences.
- Prerequisites with versions.
- Numbered setup steps with expected output.
- How to confirm it works.
- Troubleshooting for the three most likely failures.
- Where to go next.

## Rules

- Default to Fuji.
- Ship `.env.example` with placeholders only. Never commit `.env`.
- Pin dependency versions with a lockfile.
- No postinstall scripts that download or run remote code.
- No minified or obfuscated source.
- Keep dependencies small and justify each one in the README.
- Add a license note if you include third-party code.

## Verification

A kit becomes `verified` when two reviewers run it from a clean checkout and match the stated `time_to_first_run_minutes` within a reasonable margin.
