# Technical Pipeline & Test Infrastructure Exploration Report: v4 Finance Track

- **Date:** 2026-11-04
- **Author:** `explorer_1` (Teamwork Explorer)
- **Scope:** INFERENCE Publication Pipeline, Build System, Test Infrastructure, and Release Packaging for the v4 Finance & Banking Track (`FIN`, Part VI).

---

## 1. Executive Summary

This report delivers a full architectural analysis of the INFERENCE publication pipeline and test harness to guide the end-to-end authoring, verification, and release of the v4 Finance & Banking Track (Part VI).

### Key Technical Findings:
1. **Compilation Engine:** `scripts/build.mjs` and `scripts/lib/render.mjs` compile Markdown chapters into magazine-grade web pages (`dist/ch/*.html`), an index portal (`dist/index.html`), and an A4 Paged.js print preview (`dist/print.html`). The current 24-chapter build executes in ~570 ms. With the 4 new Finance chapters (total 28 chapters), compilation remains well under the < 500 ms / < 1 s threshold.
2. **Referential Linter:** `scripts/check.mjs` enforces zero-tolerance data integrity:
   - TOC uniqueness and valid tracks.
   - Sources completeness (`type`, `title`, `creator`, `publisher`, `year`, `url`, `tier`, `why`).
   - Domain tier allowlist matching `content/source-policy.yml`.
   - Pedagogical components (`::: recap`, `::: check` + `::: answers`, highlighted skim lines `==...==`).
   - **Crucial Invariant:** Prose outside code blocks is scanned for escaped HTML leaks (`&lt;span...&gt;`). Any KaTeX math placed inside `::: stat <number>` headers gets escaped into `&lt;span class="katex"...&gt;` because `render.mjs` runs `esc(t.info.slice(4))`. **Stat headers must always be plain text** (e.g. `50 bps`, `₹120 crore`), never raw LaTeX math.
3. **Test Architecture Pattern:** `test/e2e-pm.mjs` provides an opaque-box, 4-tier test architecture (46 tests) supporting `--tier`, `--milestone`, `--progressive`, `--bail`, and `--json`. `test/e2e-fin.mjs` must follow this exact pattern for the Finance track.
4. **PDF Pipeline:** `scripts/pdf.mjs` drives headless Chromium via Playwright (`channel: 'chrome'`), renders `dist/print.html` through Paged.js, generates `dist/INFERENCE.pdf`, and optionally captures full-page screenshot spreads to `dist/pages/`. The release workflow copies `dist/INFERENCE.pdf` to `editions/INFERENCE-v4-finance-draft.pdf`.
5. **Front-Matter Enhancement:** In `scripts/build.mjs`, `howToRead(ctx)` maps tracks `['consulting', 'marketing', 'product']`. Adding `'finance'` activates the dedicated Finance track reading path in the printed front matter.

---

## 2. Script Ecosystem & Build Pipeline

The project lifecycle is controlled via npm scripts in `package.json`:

| Script | Command | Purpose | Critical Details |
|---|---|---|---|
| `npm run check` | `node scripts/check.mjs` | Offline referential linter | Validates TOC, sources, domain tiers, citations, glossary links, and escaped HTML tag leaks. Exits with 1 on any error. |
| `npm run check:links` | `node scripts/check.mjs --links` | Online URL health check | Pings all source URLs with a 15-second timeout and custom User-Agent. |
| `npm run build` | `node scripts/build.mjs` | Core publication compiler | Reads YAML registries + Markdown chapters, renders web articles, `index.html`, `print.html`, and design book. |
| `npm run pdf` | `node scripts/build.mjs && node scripts/pdf.mjs` | End-to-end PDF publication | Compiles HTML, launches Chromium, renders Paged.js pages, prints `dist/INFERENCE.pdf`, screenshots spreads. |
| `npm run proof:bw` | `node scripts/build.mjs && node scripts/pdf.mjs --bw` | Laser printer proofing | Adds grayscale filter `.pagedjs_pages { filter: grayscale(1); }` and screenshots mono spreads to `dist/pages-bw/`. |
| `npm run status` | `node scripts/status.mjs` | Word count and metrics summary | Prints chapter table with word counts, reading times, media counts, and source verification tallies. |
| `npm run new -- <id>` | `node scripts/new-chapter.mjs <id>` | Chapter scaffolding | Generates `content/chapters/<id>.md` from `content/templates/chapter.md` if `<id>` is registered in `toc.yml`. |

### Markdown Engine (`scripts/lib/render.mjs`)
- **Containers:** Handled via `markdown-it-container`:
  - `::: principle <title>`: Numbered derivation steps. Leading `∴` in steps is automatically stripped so CSS `::before` badges render cleanly.
  - `::: concept <term>`: Generates sequential concept markers (§ chapter.concept).
  - `::: case <title>`: Worked business case (must be labeled `Illustrative · ...` if synthetic).
  - `::: lens <track>`: Placement lens with track accent color (`--lens: var(--t-<track>)`).
  - `::: interview <title>`: Interview questions with structured answers.
  - `::: try <title>`: Practical prompt for MBA candidates (strictly no code).
  - `::: check <title>`: Retrieval practice questions with Bloom levels `<span class="lvl">...</span>`.
  - `::: answers`: Upside-down `<details class="answers">` block with answers.
  - `::: recap <title>`: Night-before recap (strictly 5 numbered lines).
  - `::: stat <stat-string>`: High-impact single stat box. **Note:** Header string is escaped with `esc()`. Must NOT contain KaTeX `$math$`.
- **KaTeX Integration:**
  - Display formulas: `$$...$$` rendered into `<div class="formula">`.
  - Inline formulas: `$math$` rendered into KaTeX inline spans.
  - Plain currency regex protection: Patterns like `$50 billion` or `$20.00` are automatically excluded from KaTeX parsing.
- **Shortcodes & Preprocessing:**
  - `{{watch id}}`, `{{read id}}`, `{{paper id}}`, `{{report id}}`, `{{podcast id}}`, `{{media id}}` $\to$ Media Cards with QR codes.
  - `{{figure id | caption | source}}` $\to$ Inline SVG figures from `content/figures/${id}.svg`.
  - `[@source-id]` $\to$ Inline citation link `Author et al., Year`.
  - `[[term]]` or `[[term|display text]]` $\to$ First occurrence produces margin rail definition; subsequent occurrences produce index link `#g-term`.
  - `^[sidenote text]` $\to$ Outer margin rail sidenote.
  - `==highlighted skim text==` $\to$ Mayer signaling yellow highlighter layer.

---

## 3. Configuration & State Management

### 1. `book.yml`
- Root compendium configuration:
  - Current: `edition: 2027 · Draft 0.3 (Product Track)`
  - Target for v4: `edition: 2027 · Draft 0.4 (Finance Track)`
  - Tracks list: `finance` is already defined at line 27:
    ```yaml
    - { id: finance, name: Finance, short: FIN }
    ```
  - In `design/tokens.css`, the color token is `--t-finance: #0E8BA3;` (teal).
  - Thumb tabs in `print.html` dynamically compute vertical position based on track index:
    `top = 28 + t.i * 28 mm` $\to 28 + 5 \times 28 = 168\text{ mm}$.

### 2. `content/toc.yml`
- Master Table of Contents:
  - Insert Part VI (Finance & Banking) before Inserts:
    ```yaml
    - id: p6
      n: VI
      title: Finance & Banking
      track: finance
      deck: Algorithmic credit risk, high-stakes FP&A deal copilots, financial crime under RBI FREE-AI, and the finance casebook.
      chapters:
        - id: algorithmic-underwriting-and-credit-risk
          title: "Algorithmic underwriting & credit risk: from logistic regression to foundation models"
          deck: "Why a 50 bps reduction in credit default rates pays for a bank's entire AI stack: Basel III/IV capital adequacy, IFRS 9 expected credit loss, explainability versus accuracy (SHAP/LIME), and unstructured document underwriting."
          tracks: [finance]
          prereq: [kinds-of-ai, your-documents]
          status: draft
        - id: financial-copilots-and-deal-diligence
          title: "GenAI in high-stakes finance: FP&A, deal diligence, and autonomous copilots"
          deck: "Zero tolerance for hallucination in corporate finance: automated spreading in Virtual Data Rooms, deterministic tool-calling sandboxes, auditing earnings calls, and AI-assisted LBO/DCF financial modeling."
          tracks: [finance, strategy]
          prereq: [delegation-brief, judging-output]
          status: draft
        - id: financial-crime-fraud-and-rbi-free-ai
          title: "Financial crime, fraud, and the regulatory boundary: RBI FREE-AI, AML, and explainability"
          deck: "Mule accounts and real-time transaction laundering on UPI, the base rate fallacy in fraud alerts, RBI FREE-AI governance principles, SEBI algorithmic trading safeguards, and DPDP financial data sovereignty."
          tracks: [finance]
          prereq: [judging-output, models-that-act]
          status: draft
        - id: finance-casebook
          title: "The Finance AI casebook & interview room"
          deck: "Eight fully-worked quantitative finance cases and estimation problems covering SME credit scoring ROI, PE buyout due diligence, retail robo-advisory economics, AML false-positive optimization, and private banking cloud capex."
          tracks: [finance]
          prereq: [algorithmic-underwriting-and-credit-risk, financial-copilots-and-deal-diligence, financial-crime-fraud-and-rbi-free-ai]
          status: draft
    ```
  - Shift Inserts to `id: p7`, `n: "VII"`.
  - Sequential chapter numbers will become:
    - 22: `algorithmic-underwriting-and-credit-risk`
    - 23: `financial-copilots-and-deal-diligence`
    - 24: `financial-crime-fraud-and-rbi-free-ai`
    - 25: `finance-casebook`
    - A: `state-of-play`
    - B: `india-briefing`
  - Total chapters: 28 (26 numbered chapters 00–25 + 2 lettered inserts A, B).

### 3. `STATUS.md`
- Needs to be updated during Milestone 4:
  - Header: `Edition: v4 Finance & Banking Track Draft complete. All 28 planned units...`
  - Book metrics: Page count (~480+ pages), word count (~105,000+ words), sources count, glossary count.
  - Chapter inventory table: Add rows 22, 23, 24, 25 with titles, word counts, and media counts.
  - Milestone snapshots: Note `editions/INFERENCE-v4-finance-draft.pdf`.

---

## 4. Test Infrastructure: Design Specification for `test/e2e-fin.mjs`

Following the proven architecture of `test/e2e-pm.mjs`, `test/e2e-fin.mjs` must implement a 4-Tier Opaque-Box Test Architecture.

### CLI Support & Options
- `node test/e2e-fin.mjs` — Run complete suite.
- `--tier=1` or `--tier=1,2` — Filter by test tier.
- `--milestone=M1` — Filter by milestone (`M1`, `M2`, `M3`, `M4`).
- `--progressive` — Unreached milestones report `PENDING` rather than failing, enabling incremental milestone gating.
- `--bail` — Immediately halt on first assertion failure.
- `--json` — Output machine-readable JSON results.
- `--verbose` / `-v` — Extended diagnostic information.

### Tier Decomposition (46 Tests Total)

#### Tier 1: Feature Coverage (F01–F12 across Milestones M1–M4)
- **T1.1 (M1, F01): Primary Sources Ingestion in `content/sources.yml`**
  - Verify all canonical Finance sources exist, have required fields (`type`, `title`, `creator`, `publisher`, `year`, `url`, `tier`, `why`), valid tiers (`A` or `B`), and descriptive why notes (>= 10 chars).
  - Target sources: `rbi-free-ai-report` (or `rbi-free-ai-2025`), `bis-ml-credit-risk`, `bis-basel-capital`, `jpm-ai-research`, `ifrs9-ecl-guidelines`, `sebi-algo-trading`, `dpdp-financial-localization`, `rbi-mulehunter-ai`.
- **T1.2 (M1, F02): Domain Policy Allowlist in `content/source-policy.yml`**
  - Verify domains `bis.org`, `ifrs.org`, `jpmorgan.com` (or `jpmorganchase.com`) are registered under Tier A or B.
- **T1.3 (M1, F03): Finance Technical Glossary Ingestion in `content/glossary.yml`**
  - Verify all 8 canonical finance terms exist with informative definitions (>= 25 chars):
    - `credit-underwriting-engine`, `probability-of-default`, `loss-given-default`, `expected-credit-loss`, `financial-spreading`, `rbi-free-ai`, `mule-account-detection`, `explainable-ai-finance`.
- **T1.4 (M1, F04): TOC Part VI Insertion & Part VII Reorganization**
  - Verify `p6` is `Finance & Banking`, track is `finance`, contains exactly 4 chapters.
  - Verify Inserts shifted to `p7` (`n: "VII"`).
- **T1.5 (M1, F05): Book Configuration & Edition Bump in `book.yml`**
  - Verify `edition: 2027 · Draft 0.4 (Finance Track)` and `tracks` contains `finance`.
- **T1.6 (M2, F06): Chapter 22 (`algorithmic-underwriting-and-credit-risk.md`) Frontmatter & Objectives**
  - Frontmatter id, title, deck, tracks (includes `finance`), hook, and 3-4 objectives each starting with bold Bloom verb `**Verb**`.
- **T1.7 (M2, F07): Chapter 23 (`financial-copilots-and-deal-diligence.md`) Frontmatter & Objectives**
  - Frontmatter id, title, deck, tracks, hook, and 3-4 Bloom objectives.
- **T1.8 (M3, F08): Chapter 24 (`financial-crime-fraud-and-rbi-free-ai.md`) Frontmatter & Objectives**
  - Frontmatter id, title, deck, tracks, hook, and 3-4 Bloom objectives.
- **T1.9 (M3, F09): Chapter 25 (`finance-casebook.md`) 8 Quantitative Cases & KaTeX**
  - Verify at least 4-8 `::: case` blocks and active KaTeX math formulas.
- **T1.10 (M2/M3, F10): Accompanying SVG Figures in `content/figures/`**
  - Verify `credit-underwriting-stack.svg`, `financial-copilot-architecture.svg`, `aml-fraud-detection-funnel.svg` exist and contain `<svg` root.
- **T1.11 (M4, F11): Offline Referential Linter (`scripts/check.mjs`) Passes with 0 Errors**
  - Execute `node scripts/check.mjs` and assert `0 errors`.
- **T1.12 (M4, F12): Release Packaging & Draft PDF Publication in `editions/`**
  - Verify `editions/INFERENCE-v4-finance-draft.pdf` exists and exceeds 200 KB (actual expected: ~12 MB).

#### Tier 2: Boundary & Corner Cases (28 Tests: 7 per chapter across 4 chapters)
For each chapter (`algorithmic-underwriting-and-credit-risk`, `financial-copilots-and-deal-diligence`, `financial-crime-fraud-and-rbi-free-ai`, `finance-casebook`):
- **T2.1: Highlights count [4..8]** — Mayer signaling density (`==...==`).
- **T2.2: Stat block count [exactly 1]** — Single high-impact metric box (`::: stat`).
- **T2.3: Media cards count [1..3]** — Inline media cards (`{{watch/read/paper/listen/media ...}}`).
- **T2.4: Check questions count [4..6] & inverted answers** — `<span class="lvl">...</span>` tags inside `::: check` paired with `::: answers`.
- **T2.5: Night-before recap [exactly 5 numbered lines]** — Strictly 5 numbered summary lines in `::: recap`.
- **T2.6: Escaped HTML tag leak prevention in rendered prose** — Invokes `renderChapter(c, ctx, 'print')`, verifies `problems.length === 0`, and confirms rendered HTML outside code blocks matches `/&lt;(?:span|div|math|p|table|tr|td|th|a|aside|header)[\s\S]{0,30}&gt;/` is **false**.
- **T2.7: Anti-AI Writing Style Guard** — Rejects AI clichés (`\bin today'?s world\b`, `\bdelve\b`, `\btestament to\b`, `\bbeacon of\b`, `\btapestry of\b`, `\bgame-?changer\b`, `\bplethora of\b`, etc.).

#### Tier 3: Cross-Feature Combinations & Referential Integrity (4 Tests)
- **T3.1 (M2/M3): Citation ↔ Source Registry Bidirectional Integrity**
  - Every `[@id]` and `{{... id}}` resolves in `content/sources.yml`.
  - Every registered Finance primary source is cited at least once in Part VI chapters.
- **T3.2 (M2/M3): Glossary Link ↔ Glossary Registry Bidirectional Integrity**
  - Every `[[id]]` resolves in `content/glossary.yml`.
  - Every registered Finance glossary term is linked at least once in Part VI chapters.
- **T3.3 (M2/M3): Figure Embeds ↔ Figure Asset Filesystem Integrity**
  - Every `{{figure id...}}` embed resolves to an existing file in `content/figures/${id}.svg`.
- **T3.4 (M1): Chapter Numbering Propagation & Auto-Increment Sequence**
  - Chapter 21 is `product-casebook`.
  - Chapters 22–25 are the Finance chapters in order.
  - Inserts maintain chapter letters `A` (`state-of-play`) and `B` (`india-briefing`).

#### Tier 4: Real-World Workload & Compilation (2 Tests)
- **T4.1 (M4): HTML & CSS Compilation via `scripts/build.mjs`**
  - Executes build, verifies `dist/index.html` and `dist/print.html` exist, and confirms `dist/index.html` contains navigation for "Finance & Banking".
- **T4.2 (M4): v4 PDF Edition Generation & Layout Validation**
  - Validates `editions/INFERENCE-v4-finance-draft.pdf`: magic bytes `%PDF`, valid layout size > 200 KB.

---

## 5. PDF Generation & Edition Packaging Details

### Chromium Runtime Environment
- Tested and verified on this Windows 11 host:
  ```powershell
  # Default ms-playwright executable is not installed, but fallback channel 'chrome' works immediately:
  chromium.launch({ channel: 'chrome' }) -> SUCCESS
  ```
- `scripts/pdf.mjs` lines 19-25 automatically selects `{ channel: 'chrome' }` without any configuration changes required.

### Packaging Sequence for Milestone 4:
1. `npm run check` (ensure 0 errors).
2. `npm run build` (builds `dist/`).
3. `node scripts/pdf.mjs --no-shots` or `npm run pdf` (generates `dist/INFERENCE.pdf`).
4. Copy artifact to editions:
   ```powershell
   Copy-Item dist/INFERENCE.pdf editions/INFERENCE-v4-finance-draft.pdf
   ```
5. Update `STATUS.md` with new edition metadata and word counts.
6. Verify PDF file header (`%PDF`) and size (~12 MB).

---

## 6. Git Status & Recommended Release Plan

### Git Working Tree
- Current branch: `main` (clean working directory, except agent orchestration metadata in `.agents/teamwork/`).
- Recent commit baseline:
  - `ff15df6 docs: add v4 finance track teamwork build prompt`
  - `cd4050c chore(teamwork): record v3 milestone 4 victory audit reports`
  - `d29fa8e feat(product): complete v3 product track and integrate into compendium`
- Required release commit:
  ```
  feat(finance): complete v4 finance track and integrate into compendium
  ```

### Recommended Workflow for Milestone Execution:
- **Milestone 1:** Sources (`sources.yml`), Policy (`source-policy.yml`), Glossary (`glossary.yml`), TOC (`toc.yml`), Book config (`book.yml`), `test/e2e-fin.mjs`. Verify with `node test/e2e-fin.mjs --milestone=M1`.
- **Milestone 2:** Draft Chapters 22 & 23, SVG figures `credit-underwriting-stack.svg` & `financial-copilot-architecture.svg`. Verify with `node test/e2e-fin.mjs --milestone=M2 --progressive`.
- **Milestone 3:** Draft Chapters 24 & 25, SVG figure `aml-fraud-detection-funnel.svg`. Verify with `node test/e2e-fin.mjs --milestone=M3 --progressive`.
- **Milestone 4:** Run `npm run check` (0 errors), `npm run build`, `npm run pdf`, copy to `editions/INFERENCE-v4-finance-draft.pdf`, update `STATUS.md`, run full `node test/e2e-fin.mjs` (100% pass), and commit.
