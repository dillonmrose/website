# Dillon Rose — Personal Website

## Purpose
This is Dillon's personal website and blog, primarily for showcasing his professional achievements. Content and design decisions should reflect that goal — highlight impact, numbers, and shipped products.

## Page Jargon

- **Landing page** (also: home page, front page) — `app/page.tsx`. The first page visitors see. Implemented as a full-screen slideshow with a hero slide followed by career sections.
- **Hero** — the first slide on the landing page. Contains the personal statement and subtext. Not part of any section.
- **Section** — a grouping of one or more slides dedicated to a single career stage or project (e.g., Microsoft Copilot, Play My Emails). Defined as an entry in the `projects` array in `app/page.tsx`. A section can span 1–2 slides depending on how many `imageGroups` it has.
- **Slide** — an individual full-screen scrollable unit on the landing page. Each slide shows the section's text (dates, role, title, bullets, stat) on the left and one image group on the right. Slides within a section can have per-slide bullet overrides via `slideBullets`.
- **Resume page** — `app/resume/page.tsx`. Renders a PDF viewer of the resume (`/public/resume.pdf`).
- **Blog page** — `app/blog/page.mdx`. Lists blog posts found under `app/blog/*/`. Each post lives in its own subdirectory as a `page.mdx`.
- **Books page** — `app/books/page.mdx`. Lists book notes found under `app/books/*/`. Each book lives in its own subdirectory.

## Tech Stack

- Next.js 15 (App Router, Turbopack)
- React 18
- Tailwind CSS v3
- MDX for content pages (`mdx-components.tsx` defines all MDX element styles)
- `next-view-transitions` for page transitions
- pnpm

## Running Locally

```
pnpm dev
```

Opens at http://localhost:3000.

## Key Files

- `app/layout.tsx` — root layout: Inter font, TopNav, max-width container
- `app/_components/TopNav.tsx` — sticky horizontal nav bar
- `app/_components/Posts.tsx` — renders a directory listing as links (used by Blog and Books pages)
- `mdx-components.tsx` — MDX element overrides (headings, paragraphs, links, etc.)
- `app/globals.css` — base CSS (table styles, code blocks, PDF viewer)
- `tailwind.config.ts` — Tailwind config
