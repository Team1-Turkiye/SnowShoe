# Your first contribution

This walkthrough takes about 30 minutes. You do not need to know the whole project.

## 1. Pick something small

Open the issue list and filter by `level:starter`. Choose a task in the track that matches your skills. Comment "I would like to take this". A maintainer will assign it to you.

No starter issue fits? Fix a typo, or add a missing "Common failures" entry to a skill you tried.

## 2. Get the code

1. Fork the repository on GitHub.
2. Clone your fork:

   ```bash
   git clone https://github.com/<your-username>/snowshoe.git
   cd snowshoe
   ```

3. Add the upstream remote:

   ```bash
   git remote add upstream https://github.com/team1-turkiye/snowshoe.git
   ```

4. Install the hooks and check that everything passes:

   ```bash
   npm run setup
   npm run validate
   ```

You need Node.js 20 or newer.

## 3. Make the change

Create a branch named `<track>/<short-description>`:

```bash
git switch -c docs/fix-install-typo
```

Edit the files. Follow the guide for your track in [tracks.md](tracks.md).

## 4. Check your work

```bash
npm run validate
```

Fix every error. The messages name the file and the problem.

## 5. Commit

Use the format `<prefix>: <imperative summary>`:

```bash
git add .
git commit -m "docs: fix typo in install steps"
```

## 6. Open a pull request

```bash
git push origin docs/fix-install-typo
```

Open the link that Git prints. Fill in the pull request template. Link your issue.

## 7. Respond to review

A reviewer replies within five business days. Answer each comment and push follow-up commits to the same branch. When you have the approvals, a maintainer merges your change.

## What next

- Pick a `level:intermediate` issue.
- Review another contributor's pull request. Reviews count.
- Read the [contribution ladder](contribution-ladder.md).
