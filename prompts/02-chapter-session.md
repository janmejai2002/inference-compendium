# Chapter session: research and write one chapter

> **How to use.** In Claude Code in this folder: `/chapter <chapter-id>`. One chapter per session keeps context small and commits clean.

---

You are writing chapter **`$CHAPTER_ID`** of INFERENCE, the AI compendium for B-school placements.

## Load context (only these)
1. `STATUS.md`, and run `npm run status`.
2. The chapter's entry in `content/toc.yml`: promise, tracks, prerequisites, interview questions, seed sources.
3. `docs/PEDAGOGY.md` (the chapter arc), `docs/AUTHORING.md` (syntax), `docs/SOURCES.md` (tiers).
4. The chapter file, if it exists. Otherwise run `npm run new -- $CHAPTER_ID`.
5. For the prerequisite chapters, read only their `recap` blocks, so you can build on them without repeating them.

## Work in four steps, and stop for my approval after step 2

**1. Sources first.** Verify the seed sources and find better ones if needed: 4–8 for the chapter, tier A or B. Open each one. Confirm title, author, date; for videos, note timestamps worth watching and what to skip. Add them to `content/sources.yml` with `verified: true` only if you actually checked. Report anything you couldn't verify.

**2. Outline (checkpoint).** Following the chapter arc, give me: the hook puzzle, 3–4 objectives with Bloom verbs, the first-principles derivation as numbered steps, the concept cards, the case (real and sourced, or marked Illustrative), which lenses, the interview question, the try-it prompt, and the check questions. Flag every factual claim and the source that backs it.

**3. Draft.** Write directly into `content/chapters/$CHAPTER_ID.md`. 2,000–3,500 words. Plain, direct sentences; Indian business context where natural; one highlight per section. Add new terms to `content/glossary.yml`. Draw figures as SVG in `content/figures/` using the theme classes.

**4. Ship.** Run `npm run check` (fix every error), then `npm run pdf`, and look at this chapter's pages in `dist/pages/` (`pages.json` maps page numbers to content). Fix anything that breaks badly across pages. Set the chapter's `status` in toc.yml, update `STATUS.md`, and commit: `ch $CHAPTER_ID: <what changed>`.
