# v1 build, continued in Antigravity (Gemini 3.8 Flash High)

> **How to use.** Open this folder in Antigravity (or `agy --model gemini-3.8-flash-high` from `C:\Users\Janmejai\compendium`) and paste: *"Read GEMINI.md and follow prompts/04-v1-build-antigravity.md."*

You are continuing the v1 edition of INFERENCE. The plan, the research and 5 chapter drafts already exist. Your job: draft the remaining 11 units, check each one, then ship the PDF.

## 1. Load (only these, in order)
1. `CLAUDE.md` (house rules, commands), `GEMINI.md` (what differs for you).
2. `notes/build/RESUME.md` (where the build stands), `notes/build/BRIEF.md` (readers, thesis, **corrections that override the research files**, NotebookLM ids), `notes/build/CHAPTER-TASK.md` (the per-chapter procedure, including "Added after wave 1").
3. `docs/PEDAGOGY.md`, `docs/AUTHORING.md`, `docs/SOURCES.md`.
4. Run `npm run status` and `npm run check`.
5. Read ONE finished chapter end to end as your model of quality and syntax: `content/chapters/delegation-brief.md`.

Do not read the `notes/toc/research-*.md` files: each chapter's research is already digested in `notes/build/<id>-packet.md`.

## 2. Draft the remaining chapters, one at a time, in this order
| # | id | prerequisites (read only their `::: recap`) | notes |
|---|---|---|---|
| 06 | models-that-act | delegation-brief, your-documents | security thread; packet notes on unresolved stats |
| 07 | judging-output | confidently-wrong, delegation-brief | accountability thread; base-rate worked example |
| 08 | who-pays | next-word-machine | numbers with dates; value-chain figure |
| 09 | pilots-stall | judging-output | change management at the centre |
| 10 | work-changes | pilots-stall | a split, not a collapse |
| 11 | consulting-firm | judging-output, work-changes | see BRIEF corrections (Lilli, 20,000 agents, pyramid) |
| 12 | ai-casebook | who-pays, pilots-stall, consulting-firm | ~20 pages: ~10 cases + ~10 guesstimates, all `Illustrative`, original, built on casebook *patterns*, never copied text; each with a model answer |
| 13 | interview-room | consulting-firm | 15–20 questions grouped by type; never "asked at firm X" |
| A | state-of-play | — | 2 pages, dated Nov 2026, model names only from labs' own pages |
| B | india-briefing | — | 2 pages |
| 00 | ai-in-one-sitting | all Part I recaps | 10 pages, written last, compresses Part I |

For each one, follow `notes/build/CHAPTER-TASK.md` exactly: sources and glossary appended first (append only, double-quote `title:`/`why:`), draft at `status: draft`, cross-model check (see GEMINI.md), prose filter, `npm run check` with zero errors. Then:
- set that chapter's `status: draft` in `content/toc.yml`;
- update `notes/build/RESUME.md` (move it from "next" to "done");
- commit: `ch <id>: draft`.

Inserts and the casebook may drop arc pieces that don't fit (a 2-page insert needs no interview block), but `npm run check` must show no errors.

## 3. Ship (after all 16 are draft)
1. `npm run check`, then `npm run pdf`. Look at the page images in `dist/pages/` for every chapter opener and every Watch/Read card (`dist/pages.json` maps pages to content); fix anything badly broken.
2. `npm run proof:bw` and spot-check 3 pages in `dist/pages-bw/`.
3. Copy `dist/INFERENCE.pdf` to `editions/INFERENCE-v1-draft.pdf`.
4. Update `STATUS.md`: which chapters are draft, unverified source count (from `npm run check`), open issues per chapter (each chapter's "editors must check" list), co-editor chaitanya-sharma invited 2026-11-01 (write access). Append the friction list from RESUME.md to `notes/workflow-log.md`.
5. Commit `v1 draft: 14 units + 2 inserts`, then `git push`.

## Stop and ask only if
`npm run pdf` fails twice for the same reason; a chapter can't meet the source rule without inventing a fact; NotebookLM auth fails after `nlm-relogin.sh` (open a notebooklm.google.com tab in Brave first); or your context is getting full. In that last case, finish and commit the current chapter, update RESUME.md, and stop.
