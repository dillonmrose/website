# Ubiquitous Language

Moved from the "Page Jargon" section of the repo's `CLAUDE.md`.

## Pages

| Term | Definition | Route | Source file | Aliases to avoid |
| --- | --- | --- | --- | --- |
| **Landing page** | The first page visitors see: a full-screen slideshow of a **Hero** followed by career **Sections**. | `/` | [`app/page.tsx`](../app/page.tsx) | home page, front page |
| **Resume page** | A PDF viewer of the resume (`public/resume.pdf`). | `/resume` | [`app/resume/page.tsx`](../app/resume/page.tsx) | |
| **Blog page** | The list of blog posts found under `app/blog/*/`, each post a `page.mdx` in its own subdirectory. | `/blog` | [`app/blog/page.mdx`](../app/blog/page.mdx) | |

## Landing page structure

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Hero** | The first slide on the **Landing page**, holding the personal statement and subtext; not part of any **Section**. | |
| **Section** | A group of one or two **Slides** for a single career stage or project (e.g. Microsoft Copilot, Play My Emails), defined as one entry in the `projects` array in [`app/page.tsx`](../app/page.tsx); its slide count is the number of `imageGroups`. | |
| **Slide** | One full-screen scrollable unit of the **Landing page**: the section's text (dates, role, title, bullets, stat) on the left and one image group on the right, with optional per-slide bullet overrides via `slideBullets`. | |

## Relationships

- The **Landing page** has one **Hero** followed by one or more **Sections**.
- A **Section** has one or two **Slides**, one per image group.

## Example dialogue

> **Dev:** "Should the new consulting work go in the **Hero**?"
> **Domain expert:** "No. The **Hero** is only the personal statement. Add a **Section** to the `projects` array."
> **Dev:** "It has two sets of screenshots. Is that two **Sections**?"
> **Domain expert:** "One **Section** with two image groups, so it renders as two **Slides**. Use `slideBullets` if each **Slide** needs its own bullets."

## Flagged ambiguities

- The old jargon listed a **Books page** at `app/books/page.mdx`. It no longer exists: book reviews are
  **Blog page** posts (e.g. `app/blog/book_review--the_effective_engineer/`), so the term was dropped.
