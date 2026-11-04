# INFERENCE Codebase, Pipeline & Architecture Survey Report

**Author**: Survey Agent 1 (Codebase, Pipeline & Architecture)  
**Date**: 2026-11-03  
**Working Directory**: `C:\Users\Janmejai\compendium\.agents\teamwork\explorer_survey_1\`  
**Scope**: Codebase audit, compilation & check pipelines, registry structures, pedagogical syntax, chapter conventions, and integration architecture for the v3 Product Management Track expansion.

---

## 1. Executive Summary

`INFERENCE` is a magazine-grade, source-traced, static-rendered compendium designed for MBA students preparing for elite placement interviews (consulting, marketing, product, strategy). The codebase compiles structured Markdown into three simultaneous delivery formats:
1. **Interactive Web Edition**: Multi-page responsive static site with dark mode, reading progress bar, and instant toggleable skim layer (`dist/index.html` and `dist/ch/*.html`).
2. **A4 Print Book & PDF**: High-resolution print layout paginated by Paged.js, with two-column responsive margins, outer margin rails for side notes, glossary definitions, and QR codes, thumb-indexed placement track tabs, and automated PDF bookmarking (`dist/INFERENCE.pdf`).
3. **Living Design Specimen Book**: Interactive design bible rendering all typographic tokens and component specimens (`dist/design.html`).

The repository is currently at **Draft 0.2 (Marketing Track Complete)** with 20 drafted units (Chapters 00–17 plus Inserts A & B), 138 registered sources (118 verified), 61 glossary terms, and zero linter errors (`check: 0 errors, 44 warnings`). 

The v3 Product Management (PM) expansion requires an **additive, non-destructive insertion of Part V: Product Management** (4 chapters: `ai-product-lifecycle`, `product-architecture-economics`, `agentic-ux-and-interfaces`, and `product-casebook`), new PM sources in `content/sources.yml`, new PM glossary terms in `content/glossary.yml`, updating `content/toc.yml` (shifting Inserts to Part VI), bumping `book.yml` to `"2027 · Draft 0.3 (Product Track)"`, generating `editions/INFERENCE-v3-product-draft.pdf`, and updating `STATUS.md`.

---

## 2. Repository Structure & Key Manifests

### 2.1 File System Organization

```
compendium/
├── book.yml                     # Master book configuration (title, tracks, authors, edition)
├── package.json                 # Scripts and Node.js dependencies
├── STATUS.md                    # Canonical project tracking and chapter word/page metrics
├── CLAUDE.md                    # Core contributor instructions and operational guardrails
├── GEMINI.md                    # Antigravity CLI and model execution rules
├── content/
│   ├── toc.yml                  # Table of Contents master plan (parts, chapter metadata, prereqs)
│   ├── sources.yml              # Central source registry (Tier A/B/C, QR codes, verification)
│   ├── source-policy.yml        # Domain allowlist and tier authority rules
│   ├── glossary.yml             # Canonical term definitions (rendered in rails and backmatter)
│   ├── chapters/                # Markdown chapter source files (<id>.md)
│   ├── figures/                 # Inline SVG illustrations (<id>.svg)
│   └── templates/chapter.md     # Scaffolding template for new chapters
├── design/                      # CSS design system (tokens, components, web, print, specimen)
├── dist/                        # Compiled build artifacts (HTML, CSS, JS, PDF)
├── docs/                        # Specifications: AUTHORING.md, PEDAGOGY.md, DESIGN.md, SOURCES.md
├── editions/                    # Snapshot PDFs committed for release milestones
└── scripts/                     # Build, linter, local server, and PDF generation scripts
    ├── build.mjs                # Master multi-target compiler (Web, Print, Design)
    ├── check.mjs                # Offline linter (TOC, sources, policy, syntax, HTML leaks)
    ├── pdf.mjs                  # Playwright + Paged.js headless Chromium PDF printer
    ├── status.mjs               # Quick terminal status dashboard
    ├── new-chapter.mjs          # Chapter scaffolder
    └── lib/                     # Core renderers (render.mjs, serve.mjs, specimen.mjs)
```

### 2.2 Core Manifest Configurations

#### `package.json`
- **Module type**: ESM (`"type": "module"`).
- **Core Dependencies**:
  - `markdown-it` (v15.0.3), `markdown-it-attrs` (v5.0.1), `markdown-it-container` (v4.0.0), `markdown-it-mark` (v4.0.0) for extensible AST parsing.
  - `gray-matter` (v4.0.3) for YAML frontmatter parsing.
  - `js-yaml` (v5.5.0) for YAML registry ingestion.
  - `katex` (v0.19.1) for offline, server-rendered mathematical typesetting.
  - `pagedjs` (v0.4.3) for CSS Paged Media pagination polyfill in browser.
  - `playwright-core` (v1.64.1) for Chromium headless browser automation.
  - `qrcode` (v1.5.4) for SVG QR code generation.
- **Scripts**:
  - `npm run check`: Runs `node scripts/check.mjs`.
  - `npm run check:links`: Runs `node scripts/check.mjs --links` (live HTTP verification).
  - `npm run build`: Runs `node scripts/build.mjs`.
  - `npm run pdf`: Runs `node scripts/build.mjs && node scripts/pdf.mjs`.
  - `npm run proof:bw`: Runs `node scripts/build.mjs && node scripts/pdf.mjs --bw`.
  - `npm run status`: Runs `node scripts/status.mjs`.
  - `npm run new -- <id>`: Scaffolds chapter file from `content/templates/chapter.md`.

#### `book.yml`
- Contains book metadata: `title` ("INFERENCE"), `title_accent` ("."), `subtitle`, `edition`, `running_head`, `authors`, `publisher`, `online_url`, `cover_sentence`, and `back_blurb`.
- Defines all 8 placement tracks:
  - `foundations` (`FND`, cobalt `#2337E6`)
  - `consulting` (`CON`, green `#0B7A5C`)
  - `marketing` (`MKT`, pink `#D63A73`)
  - `product` (`PM`, purple `#7438E0`) — **Already defined and ready**
  - `operations` (`OPS`, orange `#D9720B`)
  - `finance` (`FIN`, cyan `#0E8BA3`)
  - `hr` (`HR`, red `#B83A26`)
  - `strategy` (`GM`, slate `#3B4256`)

---

## 3. Build & Verification Pipeline Analysis

### 3.1 Data Loading & Ingestion (`scripts/lib/render.mjs`)

The function `loadBook()` performs synchronized ingestion:
1. Reads `book.yml` and generates SVG QR codes for `online_url` in both dark (`#111427`) and light (`#ffffff`) variants.
2. Ingests `content/sources.yml` and generates an inline SVG QR code for each source's URL.
3. Ingests `content/glossary.yml`.
4. Ingests `content/toc.yml`. Chapters are iterated across parts:
   - Chapters with explicit `n` (e.g. `00`, `A`, `B`) do not increment the chapter sequence counter.
   - Chapters without an explicit `n` automatically increment the counter and format as a 2-digit padded string (`String(n).padStart(2, '0')`).
   - Chapters inherit their track from `part.track` unless overridden on the chapter object.
   - If `content/chapters/<id>.md` exists, its YAML frontmatter and markdown body are parsed using `gray-matter`.

### 3.2 Markdown AST Engine & Custom Syntax Preprocessing

`render.mjs` executes a two-phase compilation pass:

#### Phase 1: Regex Preprocessing (`preprocess(state, body)`)
- **Mathematical typesetting**:
  - Display formulas: `$$ ... $$` $\to$ KaTeX HTML `<div class="formula">...</div>`.
  - Inline formulas: `$ ... $` (ignoring financial dollar figures like `$50 billion` or `$20.00`) $\to$ KaTeX inline HTML.
- **Media cards**:
  - `{{watch id}}`, `{{read id}}`, `{{paper id}}`, `{{listen id}}`, `{{media id}}` $\to$ `<figure class="media ...">` including title, authors, year, why blurb, timestamp marks, and embedded SVG QR code.
- **Figures**:
  - `{{figure id | Caption | Source}}` $\to$ `<figure class="fig">` embedding SVG markup from `content/figures/<id>.svg`.
  - `{{figure-wide id | Caption | Source}}` $\to$ wide figure spanning across margin rails.
- **Margin side-notes**:
  - `^[sidenote text]` $\to$ `<sup class="sn-ref">n</sup><span class="sn"><span class="sn-n">n</span>...</span>`.
- **Inline source citations**:
  - `[@source-id]` $\to$ `<a class="cite" href="url">Author et al., year</a>`, automatically recording `source-id` in the chapter's citation set.
- **Glossary term references**:
  - `[[term-id]]` or `[[term-id|display text]]` $\to$ On first encounter in a chapter, renders `<dfn class="term">text</dfn><span class="sn"><span class="sn-term">Term</span>Definition</span>` in the margin rail. On subsequent encounters, renders `<a class="term" href="#g-term-id">text</a>`.

#### Phase 2: Container & Block Extensions
Custom Markdown-It container blocks render specialized semantic callouts:
- `::: principle Title` $\to$ `<aside class="blk blk-principle">`: First-principles step derivation.
- `::: concept Term` $\to$ `<aside class="blk blk-concept">`: Subsections `**Plain words.**`, `**Analogy.**`, `**Misconception.**`.
- `::: case Illustrative · Title` $\to$ `<aside class="blk blk-case">`: Subsections `#### The situation`, `#### The decision`, `#### Your move`.
- `::: lens <track>` $\to$ `<aside class="blk blk-lens" style="--lens: var(--t-<track>)">`: Domain-specific perspective.
- `::: interview Title` $\to$ `<aside class="blk blk-interview">`: Interview question breakdown with verbatim quote and strong answer structure.
- `::: stat <number>` $\to$ `<aside class="blk blk-stat">`: Stat callout with large number and citation.
- `::: try Title` $\to$ `<aside class="blk blk-try">`: Hands-on AI tool prompt.
- `::: check Check yourself` $\to$ `<aside class="blk blk-check">`: Retrieval practice questions tagged with `<span class="lvl">recall|apply|explain|transfer|judge</span>`.
- `::: answers` $\to$ `<details class="answers" open><div class="flip">`: Inverted / hidden answer keys.
- `::: recap The night-before page` $\to$ `<aside class="blk blk-recap">`: Exactly 5 numbered recap lines for rapid review.
- `==highlighted text==` $\to$ `<mark>` tag via `markdown-it-mark` for the skim layer.

### 3.3 Linter Rules (`scripts/check.mjs`)

`npm run check` is an offline validator enforcing book structural integrity. It validates:
1. **TOC Validation**:
   - Checks for duplicate chapter IDs across the entire book.
   - Asserts that every chapter's track exists in `book.yml` tracks.
   - Warns if any `.md` file in `content/chapters/` is not registered in `toc.yml`.
2. **Sources Validation**:
   - Asserts that every source in `content/sources.yml` has: `type`, `title`, `creator`, `publisher`, `year`, `url`, `tier`, `why`. Missing any of these is a **FATAL ERROR**.
   - Validates that `tier` is strictly `A`, `B`, or `C`.
   - Domain Tier Check: Matches host against `content/source-policy.yml`.
     - Host not in policy: emits warning (`needs review`).
     - Tier C domain declared as A or B: warns that platform domain rests on creator credibility.
     - Declared tier higher than domain tier allowed (e.g., declared Tier A on a domain limited to Tier B): **FATAL ERROR**.
   - Verification status: warns if `verified: false`.
3. **Chapter Prose & Pedagogy Validation**:
   - Checks for missing sources or glossary IDs referenced in markdown text (**FATAL ERROR**).
   - Escaped HTML tag leak guard: Checks `&lt;(?:span|div|math|p|table|tr|td|th|a|aside|header)[\s\S]{0,30}&gt;` in rendered prose outside code blocks (**FATAL ERROR**).
   - Warns if frontmatter lacks `title`, `deck`, `hook`, or `objectives`.
   - Warns if chapter lacks `::: recap`.
   - Warns if chapter lacks `::: check`.
   - Warns if `::: check` lacks `::: answers`.
   - Warns if chapter contains no highlighted skim lines (`==...==`).
   - Warns if any source registered in `sources.yml` is never cited.

### 3.4 PDF Generation Pipeline (`scripts/pdf.mjs`)

The command `npm run pdf` executes:
1. `node scripts/build.mjs`: Generates `dist/print.html`, bundling all chapters, CSS, Paged.js polyfill, KaTeX fonts, and dynamic thumb-tab handlers.
2. `node scripts/pdf.mjs`:
   - Spins up local static HTTP server (`serve(DIST)`).
   - Launches Playwright headless Chromium (`chromium.launch()`).
   - Opens `http://127.0.0.1:<port>/print.html` with media set to `print`.
   - Waits for Paged.js layout completion signal: `window.__pagedDone === true` (timeout 120s).
   - Awaits `document.fonts.ready`.
   - Emits `dist/INFERENCE.pdf` with CSS page sizes, background colors, and document outlines.
   - Renders page-by-page JPEG snapshots into `dist/pages/` and writes layout map `dist/pages/pages.json`.
   - Re-invokes `build()` to refresh the design book with fresh page spreads.
   - Tested runtime: ~19.8 seconds for 338 pages (~9 MB).

---

## 4. Current Table of Contents & Chapter Structure

### 4.1 Current Chapter Inventory (20 Units)

| Part | Title | Track | Chapter ID | Ch # | Words | Media |
|:---|:---|:---|:---|:---|:---|:---|
| **Part 0** | Start here | foundations | `ai-in-one-sitting` | 00 | 4,282 | 3 |
| **Part I** | Foundations | foundations | `kinds-of-ai` | 01 | 3,285 | 2 |
| | | | `next-word-machine` | 02 | 3,503 | 3 |
| | | | `confidently-wrong` | 03 | 3,370 | 3 |
| | | | `delegation-brief` | 04 | 3,234 | 3 |
| | | | `your-documents` | 05 | 3,475 | 3 |
| | | | `models-that-act` | 06 | 3,428 | 3 |
| | | | `judging-output` | 07 | 3,519 | 3 |
| **Part II** | AI in business | strategy | `who-pays` | 08 | 3,577 | 3 |
| | | | `pilots-stall` | 09 | 4,069 | 3 |
| | | | `work-changes` | 10 | 3,762 | 3 |
| **Part III** | Consulting | consulting | `consulting-firm` | 11 | 3,944 | 3 |
| | | | `ai-casebook` | 12 | 7,701 | 3 |
| | | | `interview-room` | 13 | 4,598 | 3 |
| **Part IV** | Marketing & Brand Strategy | marketing | `creative-at-scale` | 14 | 3,678 | 3 |
| | | | `synthetic-audiences-and-attribution` | 15 | 3,847 | 2 |
| | | | `brand-safety-boundary` | 16 | 4,266 | 2 |
| | | | `marketing-casebook` | 17 | 4,605 | 2 |
| **Part V** (Current) | Inserts | strategy | `state-of-play` | A | 1,562 | 1 |
| | | | `india-briefing` | B | 1,819 | 2 |

### 4.2 v3 Product Management (PM) Additive Structure

To fulfill `ORIGINAL_REQUEST.md` while maintaining complete integrity of Parts 0–IV:
- Insert **Part V: Product Management** (`id: p5`, `n: V`, `title: Product Management`, `track: product`).
- Chapters to add:
  1. `ai-product-lifecycle` (auto-numbered **18**): Evals as product specs, golden test suites, LLM-as-a-judge, drift.
  2. `product-architecture-economics` (auto-numbered **19**): Latency budgets, context caching cost models, routing, build vs buy.
  3. `agentic-ux-and-interfaces` (auto-numbered **20**): Ambient UI, proactive HUDs, conversational vs canvas, human-in-the-loop.
  4. `product-casebook` (auto-numbered **21**): 8 fully-worked quantitative PM cases and estimation problems.
- Shift **Inserts** to **Part VI** (`id: p6`, `n: VI`, `title: Inserts`, `track: strategy`). Chapters `state-of-play` (`n: A`) and `india-briefing` (`n: B`) retain their non-advancing letters.

---

## 5. Registries & Configuration Analysis

### 5.1 Sources Registry (`content/sources.yml`) & Source Policy (`content/source-policy.yml`)
- Current sources count: **138 entries**.
- Required attributes per source:
  ```yaml
  <source-id>:
    type: paper | article | video | report | book | podcast
    title: "Exact Title"
    creator: "Lead Authors or Organization"
    publisher: "Publishing Body or Venue"
    year: 2024
    url: https://...
    tier: A | B | C
    why: "Two-sentence rationale for why an MBA candidate must read this."
    verified: true | false
  ```
- **Source Policy integration**:
  - `openai.com`, `anthropic.com`, `blog.google`, `ai.google.dev`, `arxiv.org`, `hbs.edu` are already registered as **Tier A** in `content/source-policy.yml`.
  - For Silicon Valley Product Group / Marty Cagan: If citing `svpg.com`, check if domain is present in `source-policy.yml`. If not present, add `svpg.com` under Tier B (established product thought leadership) or note verification requirements.

### 5.2 Glossary Registry (`content/glossary.yml`)
- Current terms count: **61 terms**.
- Required PM terms specified in `ORIGINAL_REQUEST.md`:
  1. `eval-harness`: An automated evaluation test bench running systematic benchmarks and golden datasets against model variants to measure accuracy, regression, and cost before deployment.
  2. `synthetic-evals`: Machine-generated test queries and simulated user edge-cases created by secondary LLMs to stress-test target models without manual human dataset annotation.
  3. `latency-budget`: The maximum acceptable elapsed duration allocated across model routing, token inference, tool-calling roundtrips, and UI rendering to maintain interactive user experience.
  4. `context-caching`: Storing pre-computed KV-cache states of static system prompts and large document prefixes in GPU memory across requests, reducing latency and cutting input token costs by up to 75–90%.
  5. `model-routing`: An architectural gateway that dynamically directs incoming prompts to fast, cheap models or large frontier reasoning models based on query complexity, classification confidence, and latency constraints.
  6. `agentic-ux`: User experience design paradigms for autonomous AI systems, shifting from reactive chat prompts to proactive ambient heads-up displays, canvas workspaces, and supervised human-in-the-loop control loops.

### 5.3 Editions & Snapshot Artifacts
- Directory: `editions/`
- Existing releases:
  - `INFERENCE-design-0.1.pdf` (1.5 MB)
  - `INFERENCE-v1-draft.pdf` (7.36 MB)
  - `INFERENCE-v2-marketing-draft.pdf` (9.21 MB)
- Requirement for v3:
  - Copy compiled `dist/INFERENCE.pdf` $\to$ `editions/INFERENCE-v3-product-draft.pdf`.

### 5.4 Git & Commit Conventions
- Branch: `main`
- Standard commit prefix: Conventional commits (`feat(...)`, `fix(...)`, `docs(...)`).
- Mandatory v3 commit message:
  `feat(product): complete v3 product track and integrate into compendium`

---

## 6. Implementation Risk Matrix & Guidance for Downstream Agents

| Area | Risk | Mitigation Strategy |
|:---|:---|:---|
| **Math Leakage** | KaTeX HTML leakage (`&lt;span...&gt;`) inside container headers or stat blocks. | Never put `$math$` or `$$math$$` inside block header lines (e.g. `::: stat ₹4 vs ₹50,000`). Keep math inside block body prose. |
| **Source Tier Errors** | Claiming Tier A on a Tier B or unregistered domain fails `check.mjs`. | Ensure all Tier A sources point to allowed primary domains (`arxiv.org`, `openai.com`, `anthropic.com`, `blog.google`). Place secondary analyses under Tier B. |
| **Missing Recaps/Checks** | Missing `::: recap`, `::: check`, or `::: answers` triggers linter warnings. | Every chapter must include all pedagogical blocks, exactly 5 recap lines, and 4-6 questions with levels. |
| **Missing Figures** | Referencing `{{figure id}}` without an SVG in `content/figures/` displays a missing figure error. | Author accompanying inline SVGs in `content/figures/` for each new chapter. |
| **TOC Ordering** | Adding Part V without adjusting Inserts could collide with chapter numbering. | Insert `p5` as Product Management (Chapters 18–21), update Inserts to `p6` (Part VI). Chapters 00–17 stay completely unaffected. |

---

## 7. Conclusion

The build system, linter, and PDF generation pipelines are extraordinarily fast, robust, and cleanly architected. `npm run check` runs in <1 second and provides deterministic error reporting. Headless PDF generation takes ~20 seconds for the entire 338-page compendium. All preconditions for executing the v3 Product Management Track expansion are clear, validated, and ready for execution.
