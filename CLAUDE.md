# Dillon Rose — Personal Website

## Purpose
This is Dillon's personal website and blog, primarily for showcasing his professional achievements. Content and design decisions should reflect that goal — highlight impact, numbers, and shipped products.

## Page Jargon

Page names (landing page, hero, section, slide, resume page, blog page, projects page) are defined in
[`docs/ubiquitous-language.md`](docs/ubiquitous-language.md). Use those terms.

## Tech Stack

- Next.js 15 (App Router, Turbopack)
- React 18
- Tailwind CSS v3
- MDX for content pages (`mdx-components.tsx` defines all MDX element styles)
- `next-view-transitions` for page transitions
- pnpm

## Running Locally

```
./bootstrap.sh   # first time, and after dependency changes
pnpm dev
```

Opens at http://localhost:3000. `pnpm build` is the production build.

## Key Files

- `app/layout.tsx` — root layout: Inter font, TopNav, max-width container
- `app/_components/TopNav.tsx` — sticky horizontal nav bar
- `app/_components/Posts.tsx` — renders a directory listing as links (used by Blog and Books pages)
- `mdx-components.tsx` — MDX element overrides (headings, paragraphs, links, etc.)
- `app/globals.css` — base CSS (table styles, code blocks, PDF viewer)
- `tailwind.config.ts` — Tailwind config
- `bootstrap.sh` — fresh-clone setup (Node check, pinned pnpm, `pnpm install --frozen-lockfile`)
- `docs/` — the knowledge base; start at `docs/index.md`

## The repo is self-sufficient: keep bootstrap.sh current

A fresh clone plus `./bootstrap.sh` must be enough to build, run and test this
project on a new machine. Nothing may depend on something that happens to be
installed on the machine you're working on.

- **Update `bootstrap.sh` in the same change** whenever you add or change a
  dependency, toolchain, version, system package, env var, generated file,
  git hook or setup step. A change that works only because of local machine
  state is incomplete.
- **Idempotent.** Safe to re-run at any time. It checks first and installs only
  what's missing, so a re-run on a set-up machine is a no-op.
- **Non-interactive and loud.** No prompts where avoidable. Print what it checks
  and does (`[OK]` / `[WARN]` lines) and exit non-zero on real failure.
- **No secrets.** If the project needs credentials, bootstrap checks that they're
  present and says where to get them (e.g. which `.env` keys, from where).
- **Pinned where it matters.** Pin toolchain versions the project depends on;
  don't rely on "latest" for anything the build is sensitive to.
- **Verify.** After editing `bootstrap.sh`, re-run it, then run the project's
  checks. If a README or doc describes setup steps, they should say
  "run ./bootstrap.sh" rather than repeat its contents.

## Docs

`docs/` is where durable project knowledge lives: how things work, why
decisions were made, the domain language, gotchas, and prior investigations.
Agents write and maintain it.

- Before non-trivial work, read [`docs/index.md`](docs/index.md) and open the
  pages whose **Read when** matches your task.
- **Do docs work through the skills, not by hand.** They carry the steps a
  hand-done edit skips: citations, index entries, cross-links, the log.
  - **docs-query**: answer what the docs say about something.
  - **docs-ingest**: record something a future session would otherwise rediscover,
    such as a discovery, gotcha or decision context, citing evidence.
  - **ubiquitous-language**: record or change a domain term
    (`docs/ubiquitous-language.md`).
  - **docs-maintain**: health checks such as broken links, orphan pages and stale
    claims. It's read-only unless fixes are requested.
- `docs/` is text only: diagrams are Mermaid, and no image files (the site's own
  images stay in `public/`).
- These skills live at user level. Only when they're unavailable (e.g. in a cloud
  session, or for another contributor) follow [`docs/schema.md`](docs/schema.md)
  directly.
- Docs are only as good as their citations. Verify against the code before
  relying on a time-sensitive claim.

## Working copies

This project may be checked out as several copies (see the `create-repo` skill):
`~/website/website-read` is a read-only copy of the default branch, used for reading
and comparison. `~/website/0`, `1`, … are independent writable clones.

- Never edit, build or install dependencies in `website-read`; work in a numbered copy.
- `git fetch` / `git pull` in any copy also refreshes the others: the read-only
  copy and any copy on a clean default branch fast-forward, and other copies
  are only fetched. From scripts or agent shells, run `repo-slots sync fetch`.
- Never discard another copy's work to get past a sync error.
