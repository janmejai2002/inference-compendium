# Test Infrastructure Specification: INFERENCE v4 (Finance & Banking Track)

**Target Project:** *INFERENCE: The AI compendium for the business mind*  
**Expansion Scope:** Part VI: Finance & Banking (FIN) Track (Milestones M1–M4)  
**Test Suite Runner:** `node test/e2e-fin.mjs`  
**Document Status:** Complete & Authoritative  
**Date:** 2026-11-04  

---

## 1. Testing Philosophy & Core Principles

The *INFERENCE* automated test infrastructure enforces publication-grade editorial rigor, cognitive ergonomics, and build integrity across all content and compiler layers.

1. **Opaque-Box E2E Testing**:
   - The test suite treats the publication pipeline and chapter prose as an opaque system, asserting strictly on verifiable artifacts: frontmatter metadata, Markdown container structures, rendered HTML prose, CSS styling tokens, and compiled PDF deliverables.
   - Tests execute real repository assets against authoritative schemas; no internal compiler state or parsing logic is mocked.

2. **The 4-Tier Test Architecture**:
   - **Tier 1 (Feature Coverage)**: Validates that each declared feature across Milestones M1 through M4 exists, satisfies schema constraints, and obeys interface contracts.
   - **Tier 2 (Boundary & Corner Cases)**: Validates pedagogical density limits and editorial edge invariants (e.g. exactly 4–8 skim highlights, exactly 1 stat block with zero LaTeX math in headers, 4–6 Bloom check questions with inverted answers, exactly 5 recap lines, and zero escaped HTML tag leaks).
   - **Tier 3 (Cross-Feature Combinations & Referential Integrity)**: Validates bidirectional referential links between chapter prose citations/glossary references and canonical registries (`content/sources.yml`, `content/glossary.yml`, `content/figures/`, `book.yml`, and `content/toc.yml`).
   - **Tier 4 (Real-World Workload & Compilation Pipeline)**: Validates full project compilation through the multi-target rendering pipeline (`scripts/check.mjs`, `scripts/build.mjs`, and `scripts/pdf.mjs`).

3. **Progressive Testability**:
   - Test suites are runnable at any stage of project execution.
   - Using `--progressive`, tests for uncompleted downstream milestones report as `PENDING` rather than fatal errors, exiting with code `0` if all active milestone features pass.
   - Using `--milestone=<M1..M4>`, orchestrators can gate specific milestone transitions with precision.

4. **Zero Tolerance for Facade Tests**:
   - Every assertion performs genuine validation against primary sources and pedagogy specifications.
   - Tests fail if content contains escaped HTML tag leaks (`&lt;span...&gt;`), banned AI writing clichés, invalid KaTeX formulas, or broken citation keys.

---

## 2. Test Environment & Prerequisites

- **Runtime**: Node.js (v20+ ESM)
- **Shell**: PowerShell (Windows 11) or POSIX sh
- **Dependencies** (from `package.json`):
  - `js-yaml` (^5.5.0): Registry YAML validation and parsing
  - `gray-matter` (^4.0.3): Markdown frontmatter extraction
  - `markdown-it` (^15.0.3) & plugins: Custom container tokenization
  - `katex` (^0.19.1): Formula verification
  - `pagedjs` (^0.4.3): Print CSS rendering
  - `playwright-core` (^1.64.1): Headless Chromium PDF generation

---

## 3. The 4-Tier Test Suite Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        4-TIER TEST ARCHITECTURE                        │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 1: Feature Coverage (F01–F17 across Milestones M1–M4)             │
│   • Sources (F01)        • Policy (F02)         • Glossary (F03)       │
│   • TOC Part VI (F04)    • Book Config (F13)    • Ch 22–25 (F07–F10)   │
│   • SVG Figures (F05)    • Linter Gate (F15)    • PDF Release (F17)    │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 2: Boundary & Corner Cases (Pedagogical Invariants: 28 Tests)     │
│   • Highlights: [4..8]   • Stat Block: [==1]    • Media Cards: [1..3]  │
│   • Check Qs: [4..6]     • Recap Lines: [==5]   • Zero Escaped Leaks   │
│   • Plain Stat Headers   • GFM Pipe Tables      • Anti-AI Tropes       │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 3: Cross-Feature Combinations & Referential Integrity (4 Tests)   │
│   • Citations ↔ Sources  • Glossary ↔ Registry  • Figures ↔ Filesystem │
│   • Chapter Auto-Increment (22..25) • Reading Path 'finance' Token     │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 4: Real-World Workload & Compilation Pipeline (2 Tests)           │
│   • scripts/check.mjs (0 errors) • scripts/build.mjs (dist/ generation)│
│   • editions/INFERENCE-v4-finance-draft.pdf (>200KB, %PDF header)      │
└────────────────────────────────────────────────────────────────────────┘
```

### Tier 1: Feature Coverage (F01–F17, 12 Tests)

| Test ID | Milestone | Feature | Scope & Assertion Description |
|:---|:---:|:---:|:---|
| `T1.1` | M1 | F01 | Validates that all 14 canonical Finance primary sources exist in `content/sources.yml` with valid types, non-empty titles/creators/publishers, valid publication years, valid URLs, declared tiers (A/B), and descriptive why notes (>= 10 chars). |
| `T1.2` | M1 | F02 | Validates that `content/source-policy.yml` allowlists `bis.org`, `ifrs.org`, `jpmorgan.com`, `morganstanley.com`, and `npci.org.in` under Tier A. |
| `T1.3` | M1 | F03 | Validates that all 12 canonical Finance glossary terms and 6 acronym aliases (`pd`, `lgd`, `ead`, `ecl`, `shap`, `vdr`) exist in `content/glossary.yml` with informative definitions (>= 25 chars). |
| `T1.4` | M2 | F04 | Validates that `content/toc.yml` defines Part VI (`p6`, `track: finance`) with exactly 4 chapters (`algorithmic-underwriting-and-credit-risk`, `financial-copilots-and-deal-diligence`, `financial-crime-fraud-and-rbi-free-ai`, `finance-casebook`), shifting Inserts to Part VII (`p7`). |
| `T1.5` | M4 | F13 | Validates that `book.yml` edition is bumped to `"2027 · Draft 0.4 (Finance Track)"` and includes `finance` in `tracks`. |
| `T1.6` | M3 | F07 | Validates `content/chapters/algorithmic-underwriting-and-credit-risk.md` frontmatter (`id`, `title`, `deck`, `tracks`, `hook`, 3–4 Bloom objectives starting with `**Verb**`). |
| `T1.7` | M3 | F08 | Validates `content/chapters/financial-copilots-and-deal-diligence.md` frontmatter (`id`, `title`, `deck`, `tracks`, `hook`, 3–4 Bloom objectives starting with `**Verb**`). |
| `T1.8` | M3 | F09 | Validates `content/chapters/financial-crime-fraud-and-rbi-free-ai.md` frontmatter (`id`, `title`, `deck`, `tracks`, `hook`, 3–4 Bloom objectives starting with `**Verb**`). |
| `T1.9` | M3 | F10 | Validates `content/chapters/finance-casebook.md` frontmatter and verifies presence of at least 4 detailed strategic cases/guesstimates and KaTeX quantitative formulas. |
| `T1.10` | M2 | F05 | Validates that all 3 accompanying SVG diagrams (`credit-underwriting-stack.svg`, `financial-copilot-architecture.svg`, `aml-fraud-detection-funnel.svg`) exist in `content/figures/` and contain valid `<svg` root elements. |
| `T1.11` | M4 | F15 | Validates that `scripts/check.mjs` executes cleanly with zero errors. |
| `T1.12` | M4 | F17 | Validates that `STATUS.md` is updated for v4 Finance Track and `editions/INFERENCE-v4-finance-draft.pdf` exists with size > 200KB. |

### Tier 2: Boundary & Corner Cases (Pedagogy & Syntax, 28 Tests)

For each of the 4 Finance chapters (`algorithmic-underwriting-and-credit-risk`, `financial-copilots-and-deal-diligence`, `financial-crime-fraud-and-rbi-free-ai`, `finance-casebook`):

| Test ID Pattern | Target Invariant | Boundary Condition & Rationale |
|:---|:---|:---|
| `T2.1-<id>` | Skim Highlighter Density | Assert `4 <= count(==...==) <= 8`. Mayer's signaling principle requires 1 highlight per section. If everything is highlighted, nothing is. |
| `T2.2-<id>` | Stat Block Count & Header | Assert `count(::: stat) === 1` and assert stat header contains NO LaTeX math symbols (`$`). Plain text headers prevent escaped HTML tag leaks in `render.mjs`. |
| `T2.3-<id>` | Media Cards Density | Assert `1 <= count({{...}}) <= 3`. Enforces curated external multimedia cards with timestamps and why annotations. |
| `T2.4-<id>` | Retrieval Practice & Answers | Assert `4 <= count(questions) <= 6` ending in `<span class="lvl">...</span>` paired with `::: answers` for inverted print rendering. |
| `T2.5-<id>` | Night-Before Recap | Assert `count(numbered lines) === 5` inside `::: recap The night-before page`. Enforces high-speed revision spread format. |
| `T2.6-<id>` | Escaped Tag Leak Guard | Render chapter through `renderChapter` and assert NO `&lt;span...&gt;` leaks exist in prose outside code blocks. |
| `T2.7-<id>` | Anti-AI Writing Style Guard | Scan prose against banned machine tropes ("In today's fast-paced world", "delve into", "tapestry", "beacon", "game-changer", etc.). |

### Tier 3: Cross-Feature Combinations & Referential Integrity (4 Tests)

| Test ID | Scope | Verification Description |
|:---|:---|:---|
| `T3.1` | Citation ↔ Sources | Verifies every `[@source-id]` and `{{media source-id}}` in Finance chapters resolves to a declared source in `content/sources.yml`. Verifies all 14 canonical Finance sources are cited when all chapters are authored. |
| `T3.2` | Glossary ↔ Lexicon | Verifies every `[[term-id]]` in Finance chapters resolves to a term in `content/glossary.yml`. Verifies all 12 key Finance terms are linked when all chapters are authored. |
| `T3.3` | Figures ↔ Filesystem | Verifies every `{{figure id...}}` embed resolves to an existing SVG file in `content/figures/${id}.svg`. |
| `T3.4` | Chapter Auto-Increment & Paths | Verifies that `scripts/lib/render.mjs` auto-increments chapter numbers so that Part VI chapters receive numbers `22`, `23`, `24`, and `25`, while Inserts retain `A` and `B`, and confirms `'finance'` reading path in `howToRead`. |

### Tier 4: Real-World Compilation & Workload (2 Tests)

| Test ID | Scope | Verification Description |
|:---|:---|:---|
| `T4.1` | HTML & CSS Build | Executes `node scripts/build.mjs` to ensure compilation produces `dist/index.html` and `dist/print.html` with Part VI navigation and Finance track reading path. |
| `T4.2` | PDF Export Validation | Asserts that `editions/INFERENCE-v4-finance-draft.pdf` exists, has file size > 200KB, and begins with the `%PDF` binary header. |

---

## 4. CLI Runner Reference (`test/e2e-fin.mjs`)

The test suite is executed directly via `node test/e2e-fin.mjs`.

### Supported Options & Flags

| Flag | Description | Example |
|:---|:---|:---|
| `--tier=<N>` | Filter execution to a single tier or comma-separated list of tiers (1..4). | `node test/e2e-fin.mjs --tier=1` |
| `--milestone=<M>` | Filter execution to a specific milestone (`M1`, `M2`, `M3`, `M4`). | `node test/e2e-fin.mjs --milestone=M1` |
| `--progressive` | Progressive mode: unreached milestone features report as `PENDING` rather than `FAILED`, exiting `0` if all active milestone tests pass. | `node test/e2e-fin.mjs --progressive` |
| `--json` | Output execution results as a structured JSON object for automated CI parsing. | `node test/e2e-fin.mjs --json` |
| `--bail` | Terminate execution immediately on the first assertion failure. | `node test/e2e-fin.mjs --bail` |
| `--verbose`, `-v` | Display extended diagnostic messages and timing details. | `node test/e2e-fin.mjs -v` |
| `--help`, `-h` | Display usage instructions and available options. | `node test/e2e-fin.mjs --help` |

### Exit Codes

- `0`: All executed tests passed (or in `--progressive` mode, all active tests passed with pending downstream milestones).
- `1`: One or more executed tests failed.

---

## 5. Milestone Progression Matrix

| Milestone | Target Scope | Verification Command | Expected Active Pass |
|:---|:---|:---|:---:|
| **M1** | Registries & Configuration (`sources.yml`, `source-policy.yml`, `glossary.yml`) | `node test/e2e-fin.mjs --milestone=M1` | 3 / 3 |
| **M2** | Part VI Structure & Visuals (`toc.yml`, `figures/*.svg`, `build.mjs`) | `node test/e2e-fin.mjs --milestone=M2 --progressive` | 3 / 3 |
| **M3** | Part VI Chapter Authoring & Pedagogy (`content/chapters/*.md`) | `node test/e2e-fin.mjs --milestone=M3 --progressive` | 32 / 32 |
| **M4** | Verification, PDF Export & Release (`STATUS.md`, `book.yml`, `editions/INFERENCE-v4-finance-draft.pdf`) | `node test/e2e-fin.mjs --milestone=M4` | 5 / 5 |
| **Full Suite** | Complete End-to-End Delivery across all 4 Tiers | `node test/e2e-fin.mjs` | 46 / 46 |

---

## 6. Troubleshooting & Common Failure Diagnostics

1. **Escaped HTML Tag Leak (`&lt;span...&gt;`)**:
   - *Cause*: Container titles (e.g. `::: stat ₹50 crore $ECL$`) or prose containing raw LaTeX math inside escaped container header fields get converted into `&lt;span class="katex"...&gt;` because `render.mjs` applies `esc()` to container arguments.
   - *Remediation*: Keep container titles plain text (e.g. `::: stat 50 bps` or `::: stat ₹120 crore`), placing KaTeX math formulas exclusively in prose bodies or display equation blocks (`$$...$$`).
2. **Missing Source Citation (`source <id>: in registry but cited nowhere`)**:
   - *Cause*: A Finance source was registered in `content/sources.yml` but has not been referenced in any chapter body.
   - *Remediation*: Cite the source in chapter prose using `[@source-id]` or a media card `{{read source-id}}` / `{{paper source-id}}`.
3. **Invalid Highlight Count (< 4 or > 8)**:
   - *Cause*: Chapter contains too few or too many `==sentence==` marks.
   - *Remediation*: Ensure exactly 4 to 8 highlights exist (~1 per major section).
4. **Recap Line Count Mismatch (!= 5)**:
   - *Cause*: The `::: recap` block contains more or fewer than 5 numbered list items.
   - *Remediation*: Format exactly 5 numbered lines (`1. ...`, `2. ...`, `3. ...`, `4. ...`, `5. ...`).
