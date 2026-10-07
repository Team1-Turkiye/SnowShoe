# Review process

Review keeps SnowShoe trustworthy. It is also the fastest way to learn the codebase, so we invite everyone to review.

## Timeline

| Event | Target |
| --- | --- |
| First response to a pull request | 5 business days |
| Follow-up after changes | 3 business days |
| Stale pull request closed | 30 days without author response |

## Required approvals

| Change | Approvals | Who |
| --- | --- | --- |
| Docs, ideas, design, community, content | 1 | Area Steward or Trusted Contributor |
| Skills, kits | 2 | One Area Steward plus one other reviewer |
| MCP tools | 2 | One from MCP, one from Security |
| `scripts/`, `.github/`, `schemas/`, `prompts/` | 2 | Core Maintainer plus one other |
| Governance, security policy | Majority of Core Maintainers | See [GOVERNANCE.md](../GOVERNANCE.md) |

Authors never approve their own pull request.

## Reviewer checklist

### Every change

- [ ] The change matches the linked issue.
- [ ] `npm run validate` passes.
- [ ] No secrets, no personal data.
- [ ] Language follows the [style guide](style-guide.md).
- [ ] The author reviewed their own diff. Obvious leftovers mean they did not.

### Skills

- [ ] Frontmatter is complete and accurate.
- [ ] Steps run in order from a clean environment.
- [ ] Every state-changing step has a confirmation point.
- [ ] No request for key material.
- [ ] Links point to official sources.
- [ ] Evals cover the happy path, an edge case, and a safety case.
- [ ] Claims that cannot be checked are marked `unverified` or removed.

### Kits

- [ ] The README leads a new reader to a first run.
- [ ] `.env.example` has placeholders only.
- [ ] Lockfile is present. No install scripts fetch remote code.
- [ ] `time_to_first_run_minutes` is realistic.

### MCP tools

- [ ] Manifest entry matches the implementation.
- [ ] Inputs are validated. Errors are typed.
- [ ] Writes need `confirm` and echo the action.
- [ ] Tests cover success, validation failure, typed errors, and refused writes.

## Giving feedback

- Say what you observed, why it matters, and what you suggest.
- Mark optional comments with `nit:`.
- Approve when remaining comments are optional.

## Receiving feedback

- Respond to each comment, even if only with "done".
- Disagree with reasons. Ask for another reviewer if you cannot agree.

## Merging

Maintainers squash-merge. The squash commit follows the commit format in [CONTRIBUTING.md](../CONTRIBUTING.md). History stays linear.

## Releases

Core Maintainers cut releases from `main`. Each release has a changelog entry and a Git tag following Semantic Versioning. Skills carry their own `version` field. A skill's version bumps when its text changes in a way that changes behavior.
