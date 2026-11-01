# INFERENCE — the AI compendium (agent guide)

A magazine-grade AI compendium for Indian B-school placement prep (consulting, marketing, product, ops, finance, HR). Content is Markdown; one pipeline renders a web edition, a print-ready A4 PDF and a design book. The working title lives in `book.yml` (rename there only).

**Read `STATUS.md` first.** It says what is done and what is next. Then read only what your task needs:

| Task | Read | Don't read |
|---|---|---|
| Discuss the table of contents | `prompts/01-toc-session.md`, `notes/toc/DISCUSSION.md` | design/, scripts/, chapters |
| Turn the discussion into toc.yml | `.claude/commands/toc-compile.md`, `docs/TOC-SCHEMA.md` | design/, scripts/ |
| Write or edit a chapter | `prompts/02-chapter-session.md`, `docs/AUTHORING.md`, that chapter's file | other chapters, design/ |
| Add or verify sources | `docs/SOURCES.md`, `content/sources.yml` | chapters |
| Change the look | `docs/DESIGN.md`, `design/*.css` | content/ |
| Change the pipeline | `scripts/` | content/ |

## Commands (run these instead of reading files)

```
npm run status          one-screen table of every chapter: status, words, media count
npm run check           lint: unknown sources/terms, tier policy, missing recap/check/highlights
npm run check:links     same, plus fetch every source URL
npm run new -- <id>     scaffold content/chapters/<id>.md (id must already be in toc.yml)
npm run build           dist/ web + print.html + design book   (~0.1 s)
npm run pdf             build + dist/INFERENCE.pdf + page images (~5 s)
npm run dev             http://127.0.0.1:4321 with live reload
npm run proof:bw        pdf + dist/pages-bw/ (pages as a mono printer sees them)
npm run browser:setup   one-time: Camoufox into .venv/ for scripts/browse.py
```

`npm run pdf` needs Chrome or Edge installed (it uses the system browser via playwright-core) and an internet connection for Google Fonts.

## Rules

1. **Every outside fact has a source in `content/sources.yml`**, cited inline with `[@id]` or as a card with `{{watch id}}` / `{{read id}}`. Never write a statistic without one. Tier policy: `docs/SOURCES.md`. Set `verified: true` only after opening the URL and checking title, author, date and any timestamp or number you quote.
2. **No invented specifics.** A constructed example is labelled `Illustrative`. Never attribute a number, quote or decision to a real company or person without a source.
3. **Follow the chapter arc** in `docs/PEDAGOGY.md`. `npm run check` flags missing pieces.
4. **Never hand-edit `dist/`.** It is generated and git-ignored.
5. **Before you finish a session:** `npm run check`, `npm run pdf`, update `STATUS.md` (what changed, what's next), then commit with a message that names the chapter or area (`ch what-is-a-model: add case + interview room`).
6. Writing style: plain, direct, specific. No "delve", no "in today's fast-paced world", no em-dash asides, no rhetorical "not X, but Y". Indian business context where it is natural, never forced.

## Layout of the repo

```
book.yml                   title, edition, tracks
content/toc.yml            the plan: parts → chapters, status per chapter
content/chapters/<id>.md   one file per chapter (front matter + body)
content/sources.yml        every cited video/article/paper, once, with tier and why
content/glossary.yml       terms used via [[id]]
content/figures/<id>.svg   figures; use classes from design/components.css, not hard-coded colours
content/source-policy.yml  domain → tier allowlist
design/                    tokens, components, web, print, specimen CSS
scripts/                   build, pdf, check, status, new-chapter, dev
prompts/                   paste-in prompts for TOC, chapter and build sessions (04 = Antigravity build)
notes/                     working notes between sessions (TOC discussion, workflow log); never rendered
.claude/                   project commands and skills (see docs/SKILLS.md)
editions/                  committed PDF snapshots of milestones
```

## Research and tools

Finding or checking sources: use the `source-hunt` skill (WebFetch → Camoufox via `scripts/browse.py` → Agent Reach for YouTube, Reddit, LinkedIn). Project skills, commands and scripts are listed in `docs/SKILLS.md`.

## Be observant

This project grows its own tools. Follow the `workflow-scout` skill: log friction and repeated work in `notes/workflow-log.md`, and propose a rule, script, command or skill when something repeats. Build only what the user approves.
