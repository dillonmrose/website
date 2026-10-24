# Docs schema

The contract for everything in `docs/`, followed by the `docs-*` skills. Agents
write and maintain these docs; people curate sources, direct the work and ask
questions.

This schema evolves. When a convention proves wrong, missing or awkward in
practice, propose a change to the user rather than silently working around it.
Once agreed, update this file and log the change with operation `schema`.

## Layout

| Path | Contents |
| --- | --- |
| `index.md` | The router: every page, with when to read it. Read it first. |
| `schema.md` | This contract. |
| `ubiquitous-language.md` | The project's domain glossary (maintained by the ubiquitous-language skill). |
| `adr/NNNN-<slug>.md` | Architecture decision records. |
| `sources/` | Raw source material approved for storage. Immutable after ingest. |
| `log/` | Change history; see [Log](#log). |
| `templates/` | Page templates. |
| `skills.md` | Catalog of this repo's own `.claude/skills/`. |
| `<slug>.md` | All other pages, one topic each, `kebab-case`. |

## Page types

Every page declares a `type` in its front matter and starts from that type's
template:

| Type | One page per | Holds | Template |
| --- | --- | --- | --- |
| `overview` | project (usually one) | The current big picture and how the parts fit together. | [page](templates/page.md) |
| `entity` | concrete thing: component, service, data store, external system, person or team | What it is, what it owns, what it touches, and its known quirks. | [entity](templates/entity.md) |
| `concept` | idea, mechanism or pattern | How it works, where it shows up, and its trade-offs. | [page](templates/page.md) |
| `source` | ingested source | Origin, a summary, key claims, and which pages they changed. | [source](templates/source.md) |
| `analysis` | question worth keeping | Comparisons, investigations and saved query answers. | [page](templates/page.md) |
| `decision` | ADR (lives in `adr/`) | See [Decisions (ADRs)](#decisions-adrs). | [adr](templates/adr.md) |

## Pages

- Extend an existing page before creating an overlapping one.
- Front matter is required:

  | Field | Meaning |
  | --- | --- |
  | `title` | Human-readable page title. |
  | `type` | One of the page types above. |
  | `status` | `current`, `proposal`, `hypothesis`, or `deprecated`. ADRs use their own statuses; see below. |
  | `updated` | Date of the last substantive change (`YYYY-MM-DD`). |
  | `sources` | Evidence the page relies on (paths or URLs). |

- Link pages to each other with relative links. Every page except `index.md`
  should have at least one inbound link besides the index.
- **Propagate changes.** A single new source or discovery often touches many
  pages: the entities and concepts it mentions, the overview, and related
  analyses. Update all of them, not just one new page.

## Decisions (ADRs)

An ADR records one significant decision: its context, the choice, the
alternatives, and the consequences. ADRs are the authority on *why* things are
the way they are. Don't "fix" an accepted decision without a new ADR.

- **When to write one.** Only when all three hold:
  1. **Hard to reverse.** Changing your mind later has a meaningful cost.
  2. **Surprising without context.** A future reader would ask "why this way?"
  3. **A real trade-off.** There were genuine alternatives, and one was picked for reasons.

  Otherwise, record the choice on the relevant entity or concept page.
- **Files.** `adr/NNNN-<slug>.md`, numbered sequentially from `0001` and never
  reused. Take the next number after the highest existing one. If two copies
  pick the same number concurrently, the later one to merge renumbers.
- **Status.** `proposed`, then `accepted`, then `superseded` (or `rejected`). Agents may
  write `proposed` ADRs. Only the user moves an ADR to `accepted`.
- **Immutable once accepted.** Don't rewrite an accepted ADR's decision. To
  change course, write a new ADR with `supersedes: [NNNN]`. Set the old one's
  `superseded_by` and status `superseded`; those are the only edits allowed to it.
- List every ADR under **Decisions** in the index, with its status.

## Agent-readable only

Everything in `docs/` must stay readable as plain text.

- Diagrams are **Mermaid** code blocks (flowcharts, sequence, state, ER, class,
  gantt, pie, xychart). Tables and lists are Markdown.
- **No binary or image files** (PNG, JPG, GIF, PDF, etc.). When a source contains
  an image or chart that matters, describe its content in text or recreate it in
  Mermaid, and cite the original.

## Evidence

- Cite evidence next to the claim it supports. For a repo file use a relative
  link, with a line or section where useful. For an external source, give the
  URL and the date you accessed it.
- Label proposals and hypotheses as such. Don't present them as facts.
- When evidence conflicts, record both sides and what would settle it. Don't
  silently overwrite the older claim.
- Store a raw external source in `sources/` only when approved, and as text.
  Prefer a `source` page with your own notes over a copy.
- Never store secrets, credentials, or private material from other repositories.

## Navigation and history

### Index

[`index.md`](index.md) lists every page, grouped by page type, as:

```markdown
- [Auth flow](auth-flow.md): how sessions are issued and refreshed. **Read when:** touching login, tokens or middleware.
```

"Read when" names the tasks that should lead an agent to open the page. Update
the index whenever a page is added, renamed, removed, or changes scope.

### Log

Several agents may work in different copies at once, and one agent may log
several times per session. Each log entry is therefore its **own file**,
never a shared file, so entries never collide:

`log/YYYY-MM-DD-HHMMSS-<operation>-<slug>.md` (UTC time), starting with a
grep-able heading line:

```markdown
## [YYYY-MM-DD] <operation> | <What changed, in one line>

- Pages: <pages created or changed>
- Sources: <evidence used>
- Notes: <open questions, unresolved conflicts, suggested follow-ups>
```

`<operation>` is `ingest`, `query`, `maintain`, `schema`, or `other`. Log every
change to `docs/` (pages, index, schema). Read-only queries and health checks
that change nothing aren't logged. Never edit or delete an existing entry; to
correct one, add a new entry. Recent history:
`grep -h '^## \[' docs/log/*.md | sort | tail -10`.
