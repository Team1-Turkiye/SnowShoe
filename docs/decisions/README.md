# Decision records

An architecture decision record (ADR) captures one significant decision, its context, and its consequences. ADRs stay in the repository after they are decided.

## When to write one

- A change affects how skills, tools, or kits are structured or distributed.
- A change affects security or governance.
- A decision is hard to reverse or will surprise future contributors.

## Process

1. Copy [template.md](template.md) to `NNNN-short-title.md` using the next number.
2. Set the status to `Proposed`.
3. Open a pull request. The comment window is 7 days.
4. A majority of Core Maintainers sets the status to `Accepted` or `Rejected`.
5. A later ADR may supersede an earlier one. Update both statuses.

## Index

| ADR | Title | Status |
| --- | --- | --- |
| [0001](0001-distribution-model.md) | Distribution model for skills | Proposed |
| [0002](0002-minimal-tool-surface.md) | Size of the MCP tool surface | Proposed |
| [0003](0003-repository-layout.md) | Repository layout and ownership | Accepted |
