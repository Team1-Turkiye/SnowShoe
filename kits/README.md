# Kits

Kits are runnable starter repositories. Read [docs/kit-authoring.md](../docs/kit-authoring.md) before you add one, and open an issue first.

## Layout

```text
kits/
  _template/       copy this to start a new kit
  <kit-name>/
    kit.json
    README.md
    .env.example
    ...source files
```

## Rules in short

- Default to Fuji.
- Placeholders only in `.env.example`. Never commit `.env`.
- Commit a lockfile. No install scripts that fetch remote code.
- State an honest `time_to_first_run_minutes`.

## Index

Run `npm run validate:kits -- --list` to print every kit with its status and owner.
