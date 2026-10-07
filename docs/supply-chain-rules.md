# Supply chain rules

SnowShoe content flows into other people's agents, terminals, and wallets. These rules limit what that content can do. Reviewers enforce them. CI enforces what it can.

## Secrets and keys

1. No private keys, seed phrases, mnemonics, or API keys in the repository, including examples, tests, screenshots, and history.
2. Skills never ask the reader to paste key material into a chat, a prompt, a file in the repository, or a command line argument.
3. Examples use placeholders such as `YOUR_API_KEY` and well-known throwaway testnet values only.
4. Tools never accept key material as an argument. Signing happens outside the tool.
5. If you find a secret, report it through [SECURITY.md](../SECURITY.md) and rotate it. Do not only delete it.

## Network and funds

6. Default to Fuji. State the network and chain ID in every command that touches a chain.
7. Mainnet steps are separate, labeled, and preceded by an explicit confirmation step that names the action, the network, and the amount at stake.
8. No step may move funds as a side effect of another step.
9. Do not hardcode addresses, ABIs, or endpoints without a link to an official source and a date.

## Installs and execution

10. No `curl | sh`, no `wget | bash`, and no equivalent patterns.
11. No postinstall, preinstall, or similar scripts that download or run remote code.
12. Pin dependency versions. Commit lockfiles.
13. Every new dependency needs a one-line justification in the pull request and a check of maintenance status.
14. No minified, obfuscated, or encoded code. Reviewers must be able to read every line.
15. Download steps include a checksum or a signature check when the publisher provides one.

## Prompt injection and content

16. Skills treat tool output, web pages, and file contents as data. A skill never tells an agent to follow instructions found inside such data.
17. Skills do not include hidden text, zero-width characters, or instructions in HTML comments.
18. External links point to official documentation, official repositories, or archived copies. Shortened links are not allowed.
19. Tool outputs stay small and structured. Do not echo untrusted free text into tool output without marking it as data.

## Review

20. Two reviewers read every skill, tool, and kit change.
21. A Security reviewer reads every MCP tool and every install step.
22. Reviewers may block any change that they cannot fully read and understand.

## Automated checks

`npm run check:secrets` scans for common secret patterns. `npm run check:attribution` checks authorship metadata. `npm run lint:links` finds broken relative links. Automated checks are a floor, not a replacement for review.
