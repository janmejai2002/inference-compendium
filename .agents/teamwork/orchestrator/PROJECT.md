# Project: INFERENCE v4 Finance & Banking Track (Part VI)

## Architecture
The INFERENCE publication pipeline is a Node.js/ESM static site and book publishing engine:
- **Registry & Data Layer**: `content/sources.yml`, `content/source-policy.yml`, `content/glossary.yml`, `book.yml`, `content/toc.yml`.
- **Content Layer**: Markdown chapters under `content/chapters/` structured with YAML frontmatter and custom markdown container directives parsed by `markdown-it` and `KaTeX`.
- **Assets Layer**: Vector SVGs under `content/figures/` and typography assets.
- **Build & Verification Engine**: `scripts/check.mjs` (offline linting for TOC, sources, domain policies, and escaped HTML tag leakage), `scripts/build.mjs` (HTML compiler), `scripts/pdf.mjs` (Headless Chromium PDF generator via Playwright).
- **Test Infrastructure**: Independent E2E test runners under `test/` verifying features, boundaries, cross-feature references, and end-to-end compilation.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Source Policy Domain Ingestion | Add `bis.org`, `ifrs.org`, `jpmorgan.com`, `morganstanley.com`, `npci.org.in` to Tier A in `content/source-policy.yml` | M1 | prompts/06-v4-finance-build.md § R1 |
| F2 | Primary Sources Ingestion | Add 14 canonical finance primary sources to `content/sources.yml` with verified URLs, citations, Tier A, why-notes | M1 | prompts/06-v4-finance-build.md § R1 |
| F3 | Finance Glossary Ingestion | Add 25 finance terms and acronym aliases to `content/glossary.yml` | M1 | prompts/06-v4-finance-build.md § R1 |
| F4 | TOC Part VI Placement | Insert Part VI (Finance & Banking, p6) before Inserts in `content/toc.yml` and shift Inserts to p7 | M2 | prompts/06-v4-finance-build.md § R2 |
| F5 | Vector SVG Figures | Create `credit-underwriting-stack.svg`, `financial-copilot-architecture.svg`, `aml-fraud-detection-funnel.svg` in `content/figures/` | M2 | prompts/06-v4-finance-build.md § R2 |
| F6 | Build Script Finance Path | Register `'finance'` path in `howToRead` inside `scripts/build.mjs` | M2 | explorer_1 report § 1.4 |
| F7 | Chapter 1 Authoring | Author `content/chapters/algorithmic-underwriting-and-credit-risk.md` adhering to 13-part arc, math, and pedagogical rules | M3 | prompts/06-v4-finance-build.md § R2, R3 |
| F8 | Chapter 2 Authoring | Author `content/chapters/financial-copilots-and-deal-diligence.md` adhering to 13-part arc, math, and pedagogical rules | M3 | prompts/06-v4-finance-build.md § R2, R3 |
| F9 | Chapter 3 Authoring | Author `content/chapters/financial-crime-fraud-and-rbi-free-ai.md` adhering to 13-part arc, math, and pedagogical rules | M3 | prompts/06-v4-finance-build.md § R2, R3 |
| F10 | Chapter 4 Casebook Authoring | Author `content/chapters/finance-casebook.md` with 8 fully-worked quantitative cases/guesstimates and pedagogical arc | M3 | prompts/06-v4-finance-build.md § R2, R3 |
| F11 | Pedagogical & Editorial Governance | Enforce 13-part arc, KaTeX display/inline math, plain block headers, GFM tables, MBA no-code try-it, highlighted thesis, recaps | M3 | docs/PEDAGOGY.md, docs/AUTHORING.md |
| F12 | Opaque-Box E2E Test Suite | Create `test/e2e-fin.mjs` with 46 tests across 4 tiers covering features, boundaries, combinations, and publication scenarios | E2E | prompts/06-v4-finance-build.md § R4 |
| F13 | Edition Versioning Update | Update `book.yml` edition to `2027 · Draft 0.4 (Finance Track)` | M4 | prompts/06-v4-finance-build.md § R4 |
| F14 | STATUS.md Documentation | Update `STATUS.md` recording Part VI completion, chapter count 28, and finance track status | M4 | prompts/06-v4-finance-build.md § R4 |
| F15 | Pipeline Build & Check Verification | Verify `npm run check` reports 0 errors and `npm run build` compiles all 28 chapters in < 500 ms | M4 | prompts/06-v4-finance-build.md § Build & Verification |
| F16 | 100% E2E Test Pass | Execute `node test/e2e-fin.mjs` and verify 46/46 tests pass | M4 | prompts/06-v4-finance-build.md § Build & Verification |
| F17 | Production PDF Generation & Export | Generate `dist/INFERENCE.pdf` via `npm run pdf` and copy to `editions/INFERENCE-v4-finance-draft.pdf` (~480+ pages) | M4 | prompts/06-v4-finance-build.md § Build & Verification |
| F18 | Release Commit | Commit git changes with `feat(finance): complete v4 finance track and integrate into compendium` | M4 | prompts/06-v4-finance-build.md § Build & Verification |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Primary Source Canon & Registry Ingestion | F1, F2, F3 (`content/source-policy.yml`, `content/sources.yml`, `content/glossary.yml`) | none | DONE (worker_m1: b3523a74) |
| M2 | Part VI Structure, Visuals & Configuration | F4, F5, F6 (`content/toc.yml`, `content/figures/*.svg`, `scripts/build.mjs`) | none | DONE (worker_m2: e4eea536) |
| M3 | Part VI Chapter Authoring & Editorial Governance | F7, F8, F9, F10, F11 (`content/chapters/*.md`) | M1, M2 | DONE (worker_ch1..4, worker_remediation) |
| E2E | E2E Testing Track | F12 (`test/e2e-fin.mjs`, `TEST_INFRA.md`, `TEST_READY.md`) | none | DONE (test_writer_e2e: 2e140667) |
| M4 | Final Release: 100% E2E Pass, Build, PDF, Packaging & Commit | F13, F14, F15, F16, F17, F18 (`book.yml`, `STATUS.md`, `editions/INFERENCE-v4-finance-draft.pdf`, Git) | M3, E2E | IN_PROGRESS (worker_m4) |

## Interface Contracts
### M1 (`content/sources.yml`, `content/glossary.yml`) ↔ M3 (`content/chapters/*.md`)
- M1 provides verified source IDs (`bis-ml-credit-risk-2021`, `bcbs-basel-irb-2017`, `jpmorgan-docllm-2024`, `jpmorgan-llm-finance-2023`, `morgan-stanley-openai-2023`, `ifrs-9-ecl-standard-2014`, `sebi-algo-trading-consultation-2021`, `sebi-ai-ml-reporting-2019`, `meity-dpdp-act-2023`, `rbi-storage-payment-data-2018`, `rbi-digital-lending-guidelines-2022`, `lundberg-lee-shap-2017`, `ribeiro-lime-2016`, `npci-upi-procedural-guidelines-2024`, and existing 4 RBI sources).
- M1 provides verified glossary IDs (`credit-underwriting-engine`, `probability-of-default`, `loss-given-default`, `exposure-at-default`, `expected-credit-loss`, `financial-spreading`, `rbi-free-ai`, `mule-account-detection`, `explainable-ai-finance`, `shap-attribution`, `virtual-data-room`, `base-rate-fallacy`, etc.).
- M3 chapters reference sources via `[@source-id]` / `{{read source-id}}` and glossary terms via `[[term-id]]` / `[[term-id|label]]`.

### M2 (`content/toc.yml`, `content/figures/`) ↔ M3 (`content/chapters/*.md`)
- M2 registers chapter IDs:
  - `algorithmic-underwriting-and-credit-risk`
  - `financial-copilots-and-deal-diligence`
  - `financial-crime-fraud-and-rbi-free-ai`
  - `finance-casebook`
- M2 provides vector SVG figures:
  - `content/figures/credit-underwriting-stack.svg`
  - `content/figures/financial-copilot-architecture.svg`
  - `content/figures/aml-fraud-detection-funnel.svg`
- M3 embeds figures using `{{figure credit-underwriting-stack | ... | ...}}` etc.

### E2E (`test/e2e-fin.mjs`) ↔ M3, M4
- Test runner runs independently with `node test/e2e-fin.mjs`.
- Inspects `content/toc.yml`, `content/sources.yml`, `content/glossary.yml`, `content/figures/`, and all 4 chapters.
- Runs compiler dry-runs and verifies full publication integrity.
- Publishes `TEST_READY.md`.

## Code Layout & Write Boundaries
- `worker_m1`: Exclusively owns `content/source-policy.yml`, `content/sources.yml`, `content/glossary.yml`.
- `worker_m2`: Exclusively owns `content/toc.yml`, `scripts/build.mjs`, `content/figures/credit-underwriting-stack.svg`, `content/figures/financial-copilot-architecture.svg`, `content/figures/aml-fraud-detection-funnel.svg`.
- `worker_m3`: Exclusively owns `content/chapters/algorithmic-underwriting-and-credit-risk.md`, `content/chapters/financial-copilots-and-deal-diligence.md`, `content/chapters/financial-crime-fraud-and-rbi-free-ai.md`, `content/chapters/finance-casebook.md`.
- `worker_e2e` / `teamwork_test_writer`: Exclusively owns `test/e2e-fin.mjs`, `TEST_INFRA.md`, `TEST_READY.md`.
- `worker_m4`: Exclusively owns `book.yml`, `STATUS.md`, `editions/INFERENCE-v4-finance-draft.pdf`.
