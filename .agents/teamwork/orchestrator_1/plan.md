# Orchestration Plan: INFERENCE v3 Expansion (Product Management Track)

## Objectives
Execute the v3 expansion of INFERENCE additively as Part V (Product Management Track):
1. Ingest primary sources & append to `content/sources.yml`.
2. Append PM glossary terms to `content/glossary.yml`.
3. Add Part V to `content/toc.yml` (track: product).
4. Author 4 chapters adhering strictly to `docs/PEDAGOGY.md` and `docs/AUTHORING.md`:
   - `ai-product-lifecycle.md`
   - `product-architecture-economics.md`
   - `agentic-ux-and-interfaces.md`
   - `product-casebook.md` (8 fully-worked quantitative PM cases)
5. Enforce anti-ai-writing, KaTeX math, standard GFM pipe tables, required pedagogical elements (4-8 highlights, 1-3 media cards, 1 stat block, 4-6 check questions with upside-down answers, 5-line recap).
6. Update `book.yml` edition to "2027 · Draft 0.3 (Product Track)".
7. Run `npm run check` (0 errors), `npm run build`, and `npm run pdf`.
8. Copy `dist/INFERENCE.pdf` to `editions/INFERENCE-v3-product-draft.pdf`, update `STATUS.md`, and commit.

## Phase Breakdown
- **Phase 0: Survey (Parallel Exploration)**
  - Explorer 1: Codebase structure, build pipeline, verification tools (`npm run check`, `build`, `pdf`), book configuration.
  - Spec Miner 2: Authoring specs, pedagogy rules, frontmatter format, media cards, stat blocks, check questions, upside-down CSS/HTML syntax, anti-ai-writing constraints.
  - Explorer 3: PM track content architecture, primary sources integration, glossary terms, quantitative casebook requirements.
- **Phase 1: Synthesize Survey into PROJECT.md & Milestones**
  - Synthesize explorer findings into `PROJECT.md § Feature Inventory` and define milestone contracts.
- **Phase 2: Execution (Explorer -> Worker -> Reviewer -> Challenger -> Auditor -> Gate)**
  - Milestone 1: Sources, Glossary, TOC, Book config.
  - Milestone 2: Chapter 1 & 2 drafting (`ai-product-lifecycle.md`, `product-architecture-economics.md`).
  - Milestone 3: Chapter 3 & 4 drafting (`agentic-ux-and-interfaces.md`, `product-casebook.md`).
  - Milestone 4: Verification, Build, PDF export, Artifact copying, STATUS.md update, Git commit.
- **Phase 3: Final Gate & Victory Handoff to Sentinel**
