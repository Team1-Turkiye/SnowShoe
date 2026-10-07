# Skills

Skills are reviewed instructions for one job each. Read [docs/skill-authoring.md](../docs/skill-authoring.md) before you write one.

## Layout

```text
skills/
  learn/        concepts and environment setup
  idea/         from a rough idea to a scoped plan
  build/        implementation tasks
  launch/       deployment, verification, going public
  ecosystem/    skills owned by a protocol team: ecosystem/<protocol>/<skill>/
  _template/    copy this to start a new skill
```

Each skill lives in its own folder:

```text
skills/<journey>/<skill-name>/
  SKILL.md
  evals/cases.json
```

## Create one

```bash
npm run new:skill -- build my-skill-name
```

## Status

| Status | Meaning |
| --- | --- |
| `draft` | Written and validated, not yet trusted |
| `verified` | Evals pass, a reviewer ran it on Fuji, re-verified within 90 days |
| `deprecated` | Replaced or obsolete |

## Index

The index is generated from the folders. Run `npm run validate:skills -- --list` to print every skill with its status and owner.
