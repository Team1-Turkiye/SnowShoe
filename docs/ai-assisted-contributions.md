# AI-assisted contributions

Contributors may use any editor, assistant, or automation to prepare a change. This page explains what we expect.

## Accountability

You are the author. You are responsible for every line you submit, whatever tool helped you write it.

Before you open a pull request:

1. Read your entire diff.
2. Run the steps you wrote. A skill must work when a person follows it.
3. Check every fact, address, command, flag, and link against an official source.
4. Remove anything you cannot explain.

Reviewers may ask you to explain any part of your change. Unexplained or unverified content is a reason to close a pull request.

## Authorship metadata

Commits carry your own name and email. This repository does not accept tool credit lines, co-author trailers, or "generated with" notes in commit messages, pull request text, or files. The reasons:

- The contributors graph should show the people who stand behind the work.
- Accountability sits with the human who submits and maintains the change.
- A uniform history keeps the project easy to read.

How it is enforced:

- `.githooks/commit-msg` removes such lines from your commit message when you commit. Run `npm run setup` once per clone to install it.
- The `attribution` workflow rejects pull requests whose commits or description contain them.
- Tool-specific configuration files are ignored by Git. The shared instruction file for any assistant is [AGENTS.md](../AGENTS.md).

If the workflow flags your pull request, rewrite the commit message with `git commit --amend` or `git rebase -i`, then force-push your branch.

## Prompts

Role prompts for contributor tooling live in [prompts/](../prompts/README.md). They encode the repository rules. Use the one that matches your track. Improve them through pull requests.

## What reviewers look for

- Generic filler text and repeated phrasing.
- Plausible but unverifiable details such as invented addresses, flags, or version numbers.
- Steps that were never run.
- Overly broad scope.

## Privacy

Do not paste private keys, seed phrases, API keys, or confidential material into any assistant. Follow the [supply chain rules](supply-chain-rules.md).
