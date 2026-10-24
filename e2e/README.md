# End-to-end tests

Tests that drive the real, built app the way a user does: a browser through
Playwright for web apps, real HTTP calls for an API. Unit tests don't live here;
they sit beside the code they test (see "Tests" in `CLAUDE.md`).

- **Files**: `<flow>.spec.ts` (Playwright) or `test_<flow>.py` (pytest), one per
  user flow, e.g. `navigation.spec.ts`, `checkout.spec.ts`.
- **Target**: a production build started by the test runner (Playwright's
  `webServer`), at the configured `baseURL`. Never hardcode `localhost` or a port
  in a test, and never point at a deployed environment or a shared database.
- **Fixtures**: test data lives in `e2e/fixtures/` (none yet: the site is static
  content). No machine-local paths, no real credentials.
- **Scope**: the flows a regression would hurt most. Keep the suite small and
  fast enough to run on every PR; edge cases belong in unit tests.
- **Run**: `pnpm test:e2e` after `pnpm build` (Playwright starts `pnpm start` on
  port 3100; config in `playwright.config.ts`). `pnpm check` runs it, and CI runs
  `pnpm check` on every PR. Each test runs on a desktop and a mobile viewport.
