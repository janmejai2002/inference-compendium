# Test Infrastructure Specification: INFERENCE v3 (Product Management Track)

**Target Project:** *INFERENCE: The AI compendium for the business mind*  
**Expansion Scope:** Part V: Product Management (PM) Track (Milestones M1–M4)  
**Test Suite Runner:** `node test/e2e-pm.mjs`  
**Document Status:** Complete & Authoritative  
**Date:** 2026-11-03  

---

## 1. Testing Philosophy & Core Principles

The *INFERENCE* automated test infrastructure enforces publication-grade editorial rigor, cognitive ergonomics, and build integrity across all content and compiler layers.

1. **Opaque-Box E2E Testing**:
   - The test suite treats the compilation engine and chapter prose as an opaque system, asserting on user-visible artifacts (frontmatter, Markdown containers, rendered HTML, CSS styling, and compiled PDF deliverables).
   - Tests do not mock internal parsing details; they exercise real repository assets directly against authoritative schemas.

2. **The 4-Tier Test Architecture**:
   - **Tier 1 (Feature Coverage)**: Validates that each declared feature (F01 through F12) exists, possesses valid schema attributes, and complies with interface contracts.
   - **Tier 2 (Boundary & Corner Cases)**: Validates exact density invariants and edge limits (e.g., exactly 4–8 skim highlights, exactly 1 stat block, 4–6 Bloom check questions with inverted answers, exactly 5 recap lines, zero escaped HTML leaks).
   - **Tier 3 (Cross-Feature Combinations & Referential Integrity)**: Validates bidirectional referential links between chapter prose citations/glossary references and canonical registries (`content/sources.yml`, `content/glossary.yml`, `content/figures/`, `book.yml`, and `content/toc.yml`).
   - **Tier 4 (Real-World Workload & Compilation)**: Validates full project compilation through the multi-target rendering pipeline (`scripts/check.mjs`, `scripts/build.mjs`, and `scripts/pdf.mjs`).

3. **Progressive Testability**:
   - Test suites are runnable at any stage of project execution.
   - Using `--progressive`, tests for uncompleted downstream milestones report as `PENDING` rather than fatal errors, exiting with code `0` if all completed milestone features pass.
   - Using `--milestone=<M1..M4>`, orchestrators can gate specific milestone transitions with precision.

4. **Zero Tolerance for Facade Tests**:
   - Every assertion performs genuine validation against primary sources and pedagogy specifications.
   - Tests will fail if content contains escaped HTML tag leaks, banned AI writing clichés, invalid KaTeX formulas, or broken citation keys.

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
│ TIER 1: Feature Coverage (F01–F12 across Milestones M1–M4)             │
│   • Sources (F01)        • Policy (F02)         • Glossary (F03)       │
│   • TOC Part V (F04)     • Book Config (F05)    • Ch 18–21 (F06–F09)   │
│   • SVG Figures (F10)    • Linter Gate (F11)    • PDF Release (F12)    │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 2: Boundary & Corner Cases (Pedagogical Invariants)               │
│   • Highlights: [4..8]   • Stat Block: [==1]    • Media Cards: [1..3]  │
│   • Check Qs: [4..6]     • Recap Lines: [==5]   • Zero Escaped Leaks   │
│   • Math Delimiters      • GFM Pipe Tables      • Anti-AI Tropes       │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 3: Cross-Feature Combinations & Referential Integrity             │
│   • Citations ↔ Sources  • Glossary ↔ Registry  • Figures ↔ Filesystem │
│   • Chapter ID Sequence  • Auto-Increment (18..21) • Track CSS Tokens │
├────────────────────────────────────────────────────────────────────────┤
│ TIER 4: Real-World Workload & Compilation Pipeline                     │
│   • scripts/check.mjs (0 errors) • scripts/build.mjs (dist/ generation)│
│   • editions/INFERENCE-v3-product-draft.pdf (>200KB, %PDF header)      │
└────────────────────────────────────────────────────────────────────────┘
```

### Tier 1: Feature Coverage (F01–F12)
| Test ID | Milestone | Feature | Scope & Assertion Description |
|:---|:---:|:---:|:---|
| `T1.1` | M1 | F01 | Validates that all 8 canonical PM primary sources exist in `content/sources.yml` with valid types, non-empty titles/creators/publishers, valid years, valid URLs, and declared tiers (A/B). |
| `T1.2` | M1 | F02 | Validates that `content/source-policy.yml` allowlists `svpg.com` under Tier B and `taylorfrancis.com` under Tier A. |
| `T1.3` | M1 | F03 | Validates that all 6 PM glossary terms (`eval-harness`, `synthetic-evals`, `latency-budget`, `context-caching`, `model-routing`, `agentic-ux`) exist in `content/glossary.yml` with definitions. |
| `T1.4` | M1 | F04 | Validates that `content/toc.yml` defines Part V (`p5`, `track: product`) with 4 chapters (`ai-product-lifecycle`, `product-architecture-economics`, `agentic-ux-and-interfaces`, `product-casebook`), shifting Inserts to Part VI (`p6`). |
| `T1.5` | M1 | F05 | Validates that `book.yml` edition is bumped to `"2027 · Draft 0.3 (Product Track)"` and includes `product` in `tracks`. |
| `T1.6` | M2 | F06 | Validates `content/chapters/ai-product-lifecycle.md` frontmatter (`id`, `title`, `deck`, `tracks`, `hook`, 3–4 Bloom objectives). |
| `T1.7` | M2 | F07 | Validates `content/chapters/product-architecture-economics.md` frontmatter (`id`, `title`, `deck`, `tracks`, `hook`, 3–4 Bloom objectives). |
| `T1.8` | M3 | F08 | Validates `content/chapters/agentic-ux-and-interfaces.md` frontmatter (`id`, `title`, `deck`, `tracks`, `hook`, 3–4 Bloom objectives). |
| `T1.9` | M3 | F09 | Validates `content/chapters/product-casebook.md` frontmatter and verifies presence of 4 strategic cases and 4 quantitative estimation problems with KaTeX formulas. |
| `T1.10` | M2/M3 | F10 | Validates that all 4 accompanying SVG diagrams exist in `content/figures/` and contain valid `<svg` root elements. |
| `T1.11` | M4 | F11 | Validates that `scripts/check.mjs` executes cleanly with zero errors. |
| `T1.12` | M4 | F12 | Validates that `STATUS.md` is updated for v3 Product Track and `editions/INFERENCE-v3-product-draft.pdf` exists. |

### Tier 2: Boundary & Corner Cases (Pedagogy & Syntax)
For each of the 4 PM chapters:
| Test ID Pattern | Target Invariant | Boundary Condition & Rationale |
|:---|:---|:---|
| `T2.1-<id>` | Skim Highlighter Density | Assert `4 <= count(==...==) <= 8`. Mayer's signaling principle requires 1 highlight per section. If everything is highlighted, nothing is. |
| `T2.2-<id>` | Stat Block Count | Assert `count(::: stat) === 1`. Exactly one high-impact empirical metric per chapter, styled with lining figures. |
| `T2.3-<id>` | Media Cards Density | Assert `1 <= count({{...}}) <= 3`. Enforces curated external multimedia cards with timestamps and why annotations. |
| `T2.4-<id>` | Retrieval Practice & Answers | Assert `4 <= count(questions) <= 6` ending in `<span class="lvl">...</span>` paired with `::: answers` for inverted print rendering. |
| `T2.5-<id>` | Night-Before Recap | Assert `count(numbered lines) === 5` inside `::: recap The night-before page`. Enforces high-speed revision spread format. |
| `T2.6-<id>` | Escaped Tag Leak Guard | Render chapter through `renderChapter` and assert NO `&lt;span...&gt;` leaks exist in prose (e.g. from KaTeX math inside block titles). |
| `T2.7-<id>` | Anti-AI Writing Style Guard | Scan prose against banned machine tropes ("In today's fast-paced world", "delve into", "tapestry", "beacon", "game-changer", etc.). |

### Tier 3: Cross-Feature Combinations & Referential Integrity
| Test ID | Scope | Verification Description |
|:---|:---|:---|
| `T3.1` | Citation ↔ Sources | Verifies every `[@source-id]` and `{{media source-id}}` in PM chapters resolves to a declared source in `content/sources.yml`. Verifies all 8 PM sources are cited. |
| `T3.2` | Glossary ↔ Lexicon | Verifies every `[[term-id]]` in PM chapters resolves to a term in `content/glossary.yml`. Verifies all 6 PM terms are linked. |
| `T3.3` | Figures ↔ Filesystem | Verifies every `{{figure id...}}` embed resolves to an existing SVG file in `content/figures/${id}.svg`. |
| `T3.4` | Chapter Auto-Increment | Verifies that `scripts/lib/render.mjs` auto-increments chapter numbers so that Part V chapters receive numbers `18`, `19`, `20`, and `21`, while Inserts retain `A` and `B`. |

### Tier 4: Real-World Compilation & Workload
| Test ID | Scope | Verification Description |
|:---|:---|:---|
| `T4.1` | HTML & CSS Build | Executes `node scripts/build.mjs` to ensure compilation produces `dist/index.html` and `dist/print.html` with Part V content. |
| `T4.2` | PDF Export Validation | Asserts that `editions/INFERENCE-v3-product-draft.pdf` exists, has file size > 200KB, and begins with the `%PDF` binary header. |

---

## 4. CLI Runner Reference (`test/e2e-pm.mjs`)

The test suite is executed directly via `node test/e2e-pm.mjs`.

### Supported Options & Flags
| Flag | Description | Example |
|:---|:---|:---|
| `--tier=<N>` | Filter execution to a single tier or comma-separated list of tiers (1..4). | `node test/e2e-pm.mjs --tier=1` |
| `--milestone=<M>` | Filter execution to a specific milestone (`M1`, `M2`, `M3`, `M4`). | `node test/e2e-pm.mjs --milestone=M1` |
| `--progressive` | Progressive mode: unreached milestone features report as `PENDING` rather than `FAILED`, exiting `0` if all active milestone tests pass. | `node test/e2e-pm.mjs --progressive` |
| `--json` | Output execution results as a structured JSON object for automated CI parsing. | `node test/e2e-pm.mjs --json` |
| `--bail` | Terminate execution immediately on the first assertion failure. | `node test/e2e-pm.mjs --bail` |
| `--verbose`, `-v` | Display extended diagnostic messages and timing details. | `node test/e2e-pm.mjs -v` |
| `--help`, `-h` | Display usage instructions and available options. | `node test/e2e-pm.mjs --help` |

### Exit Codes
- `0`: All executed tests passed (or in `--progressive` mode, all active tests passed with pending downstream milestones).
- `1`: One or more executed tests failed.

---

## 5. Milestone Progression Matrix

| Milestone | Target Scope | Verification Command | Expected Active Pass |
|:---|:---|:---|:---:|
| **M1** | Registries & Configuration (`sources.yml`, `source-policy.yml`, `glossary.yml`, `toc.yml`, `book.yml`) | `node test/e2e-pm.mjs --milestone=M1` | 6 / 6 |
| **M2** | Foundation PM Chapters (`ai-product-lifecycle.md`, `product-architecture-economics.md`, figures) | `node test/e2e-pm.mjs --milestone=M2` | 18 / 18 |
| **M3** | Advanced PM Chapters & Casebook (`agentic-ux-and-interfaces.md`, `product-casebook.md`, figures) | `node test/e2e-pm.mjs --milestone=M3` | 18 / 18 |
| **M4** | Verification, PDF Export & Release (`STATUS.md`, `editions/INFERENCE-v3-product-draft.pdf`) | `node test/e2e-pm.mjs --milestone=M4` | 4 / 4 |
| **Full Suite** | Complete End-to-End Delivery across all 4 Tiers | `node test/e2e-pm.mjs` | 46 / 46 |

---

## 6. Troubleshooting & Common Failure Diagnostics

1. **Escaped HTML Tag Leak (`&lt;span...&gt;`)**:
   - *Cause*: Container titles (e.g. `::: principle Derivation of $E = mc^2$`) cannot contain raw KaTeX math, because `renderInline` processes container titles inside an unescaped HTML header.
   - *Remediation*: Keep container titles plain text (e.g. `::: principle Derivation of Mass-Energy Equivalence`), placing math formulas inside the container body.
2. **Missing Source Citation (`source <id>: in registry but cited nowhere`)**:
   - *Cause*: A PM source was added to `content/sources.yml` but has not been referenced in any chapter body.
   - *Remediation*: Cite the source in chapter prose using `[@source-id]` or a media card `{{paper source-id}}`.
3. **Invalid Highlight Count (< 4 or > 8)**:
   - *Cause*: Chapter contains too few or too many `==sentence==` marks.
   - *Remediation*: Ensure exactly 4 to 8 highlights exist (~1 per major `##` section).
4. **Recap Line Count Mismatch (!= 5)**:
   - *Cause*: The `::: recap` block contains more or fewer than 5 numbered list items.
   - *Remediation*: Format exactly 5 numbered lines (`1. ...`, `2. ...`, `3. ...`, `4. ...`, `5. ...`).
