# Security Policy

SnowShoe content is used by developers and AI agents that can move real funds. A flawed skill or tool can cause loss. We treat security reports with priority.

## Reporting

Do not open a public issue for a vulnerability.

Use the private reporting form: open the repository's **Security** tab and choose **Report a vulnerability**. If the form is unavailable, contact any Core Maintainer listed in [MAINTAINERS.md](MAINTAINERS.md) and ask for a private channel.

Include:

- What is affected: file path, skill name, tool name, or kit.
- Steps to reproduce.
- The impact you expect.
- Any suggested fix.

## What counts as a vulnerability

- A skill or tool that can lead to loss of funds, keys, or credentials.
- Instructions that cause an agent to export, print, or transmit a private key or seed phrase.
- Prompt injection paths in a skill, tool output, or kit that let untrusted content steer an agent.
- A tool that performs a write action without explicit user confirmation.
- A dependency or install step that executes remote code.
- Secrets committed to the repository, including in history.

## Response

| Step | Target |
| --- | --- |
| Acknowledge the report | 3 business days |
| Initial assessment | 7 days |
| Fix or mitigation plan | 30 days for high severity |

We credit reporters in the release notes unless they ask us not to.

## Supported versions

Only the latest release and `main` receive fixes while the project is below version 1.0.

## Hardening rules for contributors

Contributors follow [docs/supply-chain-rules.md](docs/supply-chain-rules.md). Reviewers in the Security track check every change to skills, tools, and install steps against it.
