---
title: Checks, tests and CI
type: concept
status: current
updated: 2026-10-24
sources:
  - package.json
  - eslint.config.mjs
  - vitest.config.mts
  - playwright.config.ts
  - .github/workflows/ci.yml
  - .githooks/pre-commit
  - bootstrap.sh
---

# Checks, tests and CI

`pnpm check` runs everything CI runs, in this order: lint, format check,
typecheck, production build, unit tests with coverage, end-to-end tests
([`package.json`](../package.json) `scripts.check`). CI's single job, `check`,
runs `./bootstrap.sh` then `pnpm check` ([`ci.yml`](../.github/workflows/ci.yml)),
and branch protection on `main` requires it to pass
([ADR 0001](adr/0001-ci-quality-gate.md)).

## Commands

| Command | Does |
| --- | --- |
| `pnpm check` | Everything below, in order. What CI runs. |
| `pnpm lint` | ESLint with zero warnings allowed (`lint:fix` auto-fixes). |
| `pnpm format:check` | Prettier, 120 wide (`format` rewrites). |
| `pnpm typecheck` | `tsc --noEmit`. |
| `pnpm build` | `next build`. |
| `pnpm test` | Vitest unit tests with coverage; fails under 85%. |
| `pnpm test:e2e` | Playwright against the built site; run `pnpm build` first. |

## Lint rules

[`eslint.config.mjs`](../eslint.config.mjs) extends Next's `core-web-vitals` and
`typescript` configs and adds the init-repo rule-catalog baselines:

- **Size**: 300 code lines per file (700 in tests), 60 per function (none in
  tests). Blank lines and comments don't count.
- **Types**: no `any`, no non-null `!`, type-only imports.
- **Correctness**: no unused variables; `import/order` alphabetized.
- **Accessibility**: buttons declare a `type`; Next's `jsx-a11y` subset.
- **Logging**: no `console` except `console.error`.

**Exception**: `@next/next/no-img-element` is off. Images are plain `<img>` sized
with Tailwind classes ([`SectionSlide.tsx`](../app/_landing/SectionSlide.tsx),
[`mdx-components.tsx`](../mdx-components.tsx)); moving to `next/image` changes
sizing and loading, so it's a separate change, not a lint fix.

## Formatting

Prettier at 120 wide ([`.prettierrc.json`](../.prettierrc.json)). MDX and Markdown
are excluded ([`.prettierignore`](../.prettierignore)): reformatting content can
change how it renders. Test fixtures are excluded because some are deliberately
invalid.

## Unit tests and coverage

Unit tests sit beside their source as `*.test.ts[x]`, with shared data in a
`__fixtures__/` folder next to the tests (e.g.
[`app/_components/__fixtures__`](../app/_components/__fixtures__)). They run in
jsdom with Testing Library ([`vitest.config.mts`](../vitest.config.mts)).

Coverage counts every `.ts`/`.tsx` file under `app/` plus `mdx-components.tsx`,
and fails below **85%** for lines, statements, functions or branches.
**Exclusion**: `app/layout.tsx`, the root layout, because `next/font` only runs
inside a Next build; the end-to-end tests load it on every page.

## End-to-end tests

[`e2e/`](../e2e/README.md) holds Playwright tests, run on a desktop and a mobile
viewport against `pnpm start` on port 3100
([`playwright.config.ts`](../playwright.config.ts)). Next warns that `next start`
doesn't support `output: "standalone"` ([`next.config.ts`](../next.config.ts)); it
still serves every page the tests visit. Production runs on Vercel, which builds
with its own Next.js integration rather than `next start`. In CI a failed run
uploads the HTML report and traces as the `playwright-report` artifact.

The browser comes from `bootstrap.sh` (`playwright install chromium`, matching the
pinned `@playwright/test`). Its Linux system libraries come from the machine
setup (bo) locally, and bootstrap warns if they look missing; in CI,
`--with-deps` installs them.

Node is pinned to major 24 in `.nvmrc` (local and CI) and `engines.node` in
[`package.json`](../package.json), which Vercel uses for production builds.

## Pre-commit hook

[`.githooks/pre-commit`](../.githooks/pre-commit) lints and format-checks the
staged files only, so it stays fast; CI is the gate. `bootstrap.sh` enables it
with `git config core.hooksPath .githooks`.

## Related

- [ADR 0001: CI quality gate](adr/0001-ci-quality-gate.md)
- [Ubiquitous language](ubiquitous-language.md)
