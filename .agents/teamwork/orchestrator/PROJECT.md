# Project: INFERENCE — Book-Wide Council Review & Quality Hardening

## Architecture
The INFERENCE publication pipeline is a Node.js/ESM publishing engine producing web and print book editions:
- **Registry & Data Layer**: `content/sources.yml`, `content/source-policy.yml`, `content/glossary.yml`, `book.yml`, `content/toc.yml`.
- **Content Layer**: 28 Markdown chapters in `content/chapters/` across Parts 0 through VII, structured with YAML frontmatter, 13-part pedagogical arc directives, and KaTeX mathematical notation.
- **Rendering & Assets**: `scripts/lib/render.mjs`, vector SVGs in `content/figures/`.
- **Build & Verification Engine**: `scripts/check.mjs` (linting for TOC, sources, domain policy, HTML leaks), `scripts/build.mjs` (HTML compiler), `scripts/pdf.mjs` (Chromium PDF compiler via Playwright).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | 28 Unverified Sources Resolution | Update 28 sources in `content/sources.yml` with verified primary literature (Tier A/B), verified URLs, authors, and set `verified: true` | M1 | spec_miner_citations § 1.1, STATUS.md |
| F2 | Source Policy Allowlist Update | Add necessary primary/platform domains to `content/source-policy.yml` (`ascionline.in`, `newsroom.accenture.com`, etc.) to clear unlisted domain warnings | M1 | spec_miner_citations § 1.2 |
| F3 | Factual Claim Refinement in Ch 14 | Fix `sarvam-bulbul-v4-flash` claim in `content/chapters/creative-at-scale.md` Table 14.1 (11 languages, <250ms) | M1 | spec_miner_citations § 1.5 |
| F4 | Context Disambiguation in Ch 14 | Disambiguate Unilever manufacturing equipment digital twins from creative marketing AI in `content/chapters/creative-at-scale.md` | M1 | spec_miner_citations § 1.5 |
| F5 | HBS Working Paper URL Correction | Replace broken scenario planning URL for `brand-llm-market-research` with direct HBS Working Paper 23-062 PDF in `content/sources.yml` | M1 | spec_miner_citations § 1.5 |
| F6 | Orphan Citations Re-integration | Wire `3b1b-neural-network`, `mollick-centaurs`, and `stanford-ai-index` into active chapters (`next-word-machine.md`, `consulting-firm.md`) to clear unreferenced warnings | M1 | spec_miner_citations § 1.4 |
| F7 | KaTeX Inline Escaped Dollar Regex Fix | Update regex in `scripts/lib/render.mjs` to `(?:\\\$|[^\$\n])+?` so inline math with `\$` renders through KaTeX | M2 | explorer_katex_math § 1.1 |
| F8 | Chapter Objectives Math Preprocessing | Update `scripts/lib/render.mjs` to preprocess chapter frontmatter objectives and clean math notation across chapters | M2 | explorer_katex_math § 1.2 |
| F9 | Inline Math Currency Cleanup | Clean up escaped dollar currency formulas in `content/chapters/product-casebook.md` and `content/chapters/product-architecture-economics.md` | M2 | explorer_katex_math § 1.1 |
| F10 | ASCII Tables to GFM Tables Conversion | Convert 8 non-conforming fenced ASCII tables/pyramids/trees in chapters to standard GFM pipe tables | M2 | explorer_katex_math § 1.3 |
| F11 | Anti-AI Voice Refinements | Apply 18 surgical replacements in chapters eliminating 11 trailing participial clauses and 7 inflated adjectives | M3 | spec_miner_pedagogy § 1.3 |
| F12 | Dual-Coding Figure Creation | Create vector SVGs `content/figures/finance-casebook-taxonomy.svg` (Ch 25) and `content/figures/ai-in-one-sitting-stack.svg` (Ch 00) and wire into chapters | M3 | spec_miner_pedagogy § 1.2 |
| F13 | Skim Layer Highlight Densification | Backfill 3–5 section-level `==...==` thesis highlights in Chapters 00–13 to reach the 4–8 target | M3 | spec_miner_pedagogy § 1.5 |
| F14 | Linter & Pipeline Verification | Verify `npm run check` passes with 0 errors and 0 unverified source warnings | M4 | ORIGINAL_REQUEST § R3 |
| F15 | Complete HTML & PDF Compilation | Verify `npm run build` compiles cleanly and `npm run pdf` produces complete publication PDF | M4 | ORIGINAL_REQUEST § R3 |
| F16 | STATUS.md Update | Update `STATUS.md` recording all 28 chapters audited, 0 unverified sources, and council review sign-off | M4 | ORIGINAL_REQUEST § R3 |
| F17 | Clean Release Git Delivery | Commit all verified improvements to the current working branch leaving a clean tree | M4 | ORIGINAL_REQUEST § R3 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Primary Source Canon & Citation Resolution | F1, F2, F3, F4, F5, F6 (`content/sources.yml`, `content/source-policy.yml`, `creative-at-scale.md`, `next-word-machine.md`, `consulting-firm.md`) | none | IN_PROGRESS |
| M2 | KaTeX Syntax, Math Invariants & Tabular Layout | F7, F8, F9, F10 (`scripts/lib/render.mjs`, `product-casebook.md`, `product-architecture-economics.md`, `financial-copilots-and-deal-diligence.md`, `ai-product-lifecycle.md`, `marketing-casebook.md`, `financial-crime-fraud-and-rbi-free-ai.md`) | none | PLANNED |
| M3 | Pedagogical Arc, Anti-AI Voice & Dual-Coding Visuals | F11, F12, F13 (`content/chapters/*.md`, `content/figures/*.svg`) | M1, M2 | PLANNED |
| M4 | QA Verification, PDF Build, Status Update & Git Delivery | F14, F15, F16, F17 (`STATUS.md`, `dist/INFERENCE.pdf`, Git) | M1, M2, M3 | PLANNED |

## Interface Contracts
### M1 ↔ M4
- M1 ensures all 160 sources in `content/sources.yml` have `verified: true` and are cited in active chapters.
- M1 ensures `content/source-policy.yml` allowlists all necessary domains.
- M4 verifies `npm run check` produces 0 errors and 0 warnings.

### M2 ↔ M4
- M2 ensures `scripts/lib/render.mjs` renders inline math with currency symbols without raw LaTeX leakage.
- M2 ensures all tables use standard GFM pipe formatting.
- M4 verifies HTML and PDF builds compile cleanly.

### M3 ↔ M4
- M3 ensures anti-ai voice compliance, 100% SVG figure coverage across all main chapters, and uniform highlight density.
- M4 confirms book visual and pedagogical presentation in compiled PDF.

## Code Layout & Write Boundaries
- `worker_m1`: Exclusively owns `content/sources.yml`, `content/source-policy.yml`, `content/chapters/creative-at-scale.md`, `content/chapters/next-word-machine.md`, `content/chapters/consulting-firm.md`.
- `worker_m2`: Exclusively owns `scripts/lib/render.mjs`, `content/chapters/product-casebook.md`, `content/chapters/product-architecture-economics.md`, `content/chapters/financial-copilots-and-deal-diligence.md`, `content/chapters/ai-product-lifecycle.md`, `content/chapters/marketing-casebook.md`, `content/chapters/financial-crime-fraud-and-rbi-free-ai.md`.
- `worker_m3`: Exclusively owns `content/figures/finance-casebook-taxonomy.svg`, `content/figures/ai-in-one-sitting-stack.svg`, and targeted voice/highlight edits in `content/chapters/*.md`.
- `worker_m4`: Exclusively owns `STATUS.md`, `dist/INFERENCE.pdf`, and Git release commit.
