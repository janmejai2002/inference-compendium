# Chapter draft task (chapter agents, step 4–5 of the v1 build)

You write ONE chapter of INFERENCE, autonomously, to `status: draft`. Repo `C:/Users/Janmejai/compendium`.

## Read (only these)
1. `notes/build/BRIEF.md` (house rules, shared-file rules).
2. `prompts/02-chapter-session.md`, but run it in **autonomous mode**: no stop for approval after step 2; skip its step 4 (no PDF, no toc.yml/STATUS.md edits, no commit: the orchestrator does those).
3. `docs/PEDAGOGY.md` (the 13-step arc), `docs/AUTHORING.md` (syntax), `docs/SOURCES.md`.
4. Your chapter's entry in `content/toc.yml`.
5. Your packet `notes/build/<id>-packet.md`. That is your research. Re-open a source only to check a number you use, or if the packet marked it unverified.
6. Prerequisite chapters: ONLY their `::: recap` blocks (`grep -n -A8 "::: recap" content/chapters/<prereq>.md`). Build on them; do not repeat them.
Do not read other chapters, the research files, design/ or scripts/.

## Write
- `content/chapters/<id>.md` (create with `npm run new -- <id>`, then replace the template). Front matter per AUTHORING.md, with `status: draft` and `tracks: [foundations, consulting]` or the chapter's lenses from toc.yml. Default 2,000–3,500 words; follow the length in your task if different.
- Full arc: opener puzzle, lede with thesis highlight, principle derivation, 1–3 concept cards, figure if it earns its place (SVG in `content/figures/<id>-*.svg`, theme classes only, see `content/figures/fit-line.svg`), evidence with a `::: stat` and a `::: myth` where apt, a worked `::: case` (labelled `Illustrative` unless sourced), a consulting `::: lens` (plus 1 other lens if natural), `::: interview`, no-code `::: try`, `{{watch id}}`/`{{read id}}` cards (1–3), `::: check` (4–6, Bloom-tagged) + `::: answers`, `::: recap` (five lines; later chapters read this).
- Append your sources to `content/sources.yml` (from the packet's sources.yml-ready block) and new terms to `content/glossary.yml`, **by append only**, per BRIEF.md. Do this FIRST, before drafting, so ids are claimed early.

## Verify (before you finish)
1. **Cross-model check:** run Gemini Flash over your chapter, with cwd = repo root:
   `agy -p "Read content/chapters/<id>.md, content/sources.yml and notes/build/<id>-packet.md. List every number, date, quote and named-company claim in the chapter. For each, say whether the cited source entry and the packet support it exactly (MATCH), differ (MISMATCH: say how), or have no source (UNSOURCED). Output a table only." --model gemini-3.8-flash-medium --mode plan --output-format json`
   Fix every MISMATCH and UNSOURCED (cut the claim, label it Illustrative, or source it). If agy fails twice, do the check yourself and say so in the receipt.
2. **Prose filter:** invoke the `anti-ai-writing` skill on the chapter and apply its fixes within house style (plain, specific; no em-dash asides, no "not X but Y", no "delve").
3. `npm run check 2>&1 | grep -E "<id>|error"`: zero errors for your file and your sources. Warnings about unverified sources are fine only for sources you could not open.

## Return (≤ 10 lines)
Words, sources added (verified/unverified), Watch/Read cards, figures, verifier mismatches found/fixed, and what the editors must still check.
