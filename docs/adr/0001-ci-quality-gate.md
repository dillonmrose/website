---
title: "0001: Merges to main require a green CI check with 85% unit coverage"
type: decision
status: proposed
updated: 2026-10-24
sources:
  - .github/workflows/ci.yml
  - vitest.config.mts
  - package.json
supersedes: []
superseded_by: null
---

# 0001: Merges to main require a green CI check with 85% unit coverage

## Context

Until now the only check on a PR was Vercel's preview deployment, which proves
the site builds but runs no lint or tests, and `main` accepted direct pushes.
A push to `main` deploys to production. Agents open and merge most PRs here
(the `ship-it` and `babysit` skills), so the gate has to be mechanical rather
than a reviewer's judgment.

## Decision

`main` is protected: changes arrive only through a PR, the CI job `check`
(`./bootstrap.sh` then `pnpm check`: lint, format, typecheck, build, unit tests,
end-to-end tests) must pass on an up-to-date branch, admins included, with no
required approvals. Unit tests must cover at least 85% of lines, statements,
functions and branches ([`vitest.config.mts`](../../vitest.config.mts)).

## Alternatives

- **Vercel's build check only**: catches build breaks, not behavior regressions
  or lint, and doesn't block a merge.
- **Required approving review**: the owner can't approve their own PR, so every
  merge would need an admin override.
- **No coverage threshold**: tests would drift behind changes with nothing to
  flag it.

## Consequences

- Every change needs tests that keep coverage at 85% or more; content-only
  changes (MDX posts) don't count toward coverage.
- A failing or flaky check blocks merging until fixed; there's no admin bypass.
- CI takes a few minutes per push (bootstrap, browser download, build, tests).
- Coverage exclusions must be justified in [Checks, tests and CI](../checks.md).
