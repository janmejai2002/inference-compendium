# Plan: INFERENCE HR & People Track (Part VIII, Chapters 30–33)

Definition of done:
- Part VIII (HR & People) and Part IX (Inserts) configured in `content/toc.yml`.
- Home page filter shows "HR & People (4)", design tokens confirmed with `--t-hr`.
- Four fully-authored chapters in `content/chapters/`:
  - 30: `ai-in-hiring.md`
  - 31: `workforce-planning-and-skills.md`
  - 32: `hr-copilots-and-people-analytics.md`
  - 33: `hr-casebook.md`
- Four SVG figures in `content/figures/` (viewBox 0 0 640 H, 0 text overflows in `inspect_figures.mjs`):
  - `hiring-funnel-ai.svg`
  - `task-exposure-matrix.svg`
  - `hr-copilot-trust-boundary.svg`
  - `hr-casebook-taxonomy.svg`
- Verification standards met:
  - `npm run check` -> 0 errors, <= 17 warnings
  - `node test/inspect_figures.mjs` -> 0 overflows
  - `npm run status` -> 36/36 published chapters
  - `npm run pdf` -> snapshot to `editions/INFERENCE-v6-hr-draft.pdf`
  - Read back rendered page images
  - `STATUS.md` and `REPORT.md` updated
- Clean git commits on `computer/hr-track` (never push).

## Steps

- [x] Step 1: Update repo infrastructure (`content/toc.yml`, `scripts/build.mjs`, `content/source-policy.yml`, `PLAN.md`, `PROGRESS.md`)
- [x] Step 2: Register & verify HR sources in `content/sources.yml` and terms in `content/glossary.yml`
- [x] Step 3: Author Chapter 30 (`ai-in-hiring.md`) + Figure (`hiring-funnel-ai.svg`)
- [x] Step 4: Author Chapter 31 (`workforce-planning-and-skills.md`) + Figure (`task-exposure-matrix.svg`)
- [x] Step 5: Author Chapter 32 (`hr-copilots-and-people-analytics.md`) + Figure (`hr-copilot-trust-boundary.svg`)
- [x] Step 6: Author Chapter 33 (`hr-casebook.md`) + Figure (`hr-casebook-taxonomy.svg`)
- [ ] Step 7: Automated test suite verification (`npm run check`, `node test/inspect_figures.mjs`, `npm run status`) ← next
- [ ] Step 8: PDF compilation (`npm run pdf`), edition snapshot (`editions/INFERENCE-v6-hr-draft.pdf`), page visual review, `STATUS.md` and `REPORT.md` updates
