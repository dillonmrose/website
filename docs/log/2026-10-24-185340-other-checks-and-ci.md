## [2026-10-24] other | Add checks, tests and CI page, ADR 0001, and update the glossary for the landing split

- Pages: checks.md (new), adr/0001-ci-quality-gate.md (new, proposed), index.md, ubiquitous-language.md
- Sources: package.json, eslint.config.mjs, vitest.config.mts, playwright.config.ts, .github/workflows/ci.yml,
  .githooks/pre-commit, bootstrap.sh, app/_landing/sections.ts
- Notes: the landing page's `projects` array is now `sections` in app/_landing/sections.ts, so the "project"
  ambiguity drops to two meanings. ADR 0001 awaits the user's acceptance.
