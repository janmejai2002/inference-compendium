# Original User Request

## Initial Request — 2026-11-04T15:33:47Z

Build and integrate the v4 Finance & Banking Track (Part VI) into the INFERENCE publication pipeline as an end-to-end production release following prompts/06-v4-finance-build.md.

Integrity mode: development

Reference material: prompts/06-v4-finance-build.md

## Requirements

### R1. Primary Source Canon & Registry Ingestion
Ingest canonical primary sources for modern AI finance (Reserve Bank of India FREE-AI Committee report, BIS Working Papers on ML in credit risk, J.P. Morgan AI Research, IFRS 9 ECL guidelines, SEBI algorithmic trading directives, DPDP Act localization) into content/sources.yml with verified URLs, citations, media types, tiers (A/B), and why-notes; ensure domains are permitted in content/source-policy.yml; and append key finance terminology to content/glossary.yml.

### R2. Part VI Chapter Authoring & Figure Generation
Add Part VI (Finance & Banking) to content/toc.yml before Inserts, and author the four chapters in content/chapters/ strictly adhering to docs/PEDAGOGY.md, docs/AUTHORING.md, and anti-ai-writing standards:
1. `algorithmic-underwriting-and-credit-risk.md` (classical ML vs foundation models, PD/LGD/EAD/ECL math, SHAP/LIME, alternative data risks)
2. `financial-copilots-and-deal-diligence.md` (zero-tolerance precision, VDR ingestion, automated spreading, cell-level audit lineage)
3. `financial-crime-fraud-and-rbi-free-ai.md` (base rate fallacy, graph anomaly detection, mule accounts, RBI FREE-AI mandates, DPDP localization)
4. `finance-casebook.md` (eight fully-worked quantitative finance cases and guesstimates)
Create corresponding vector SVG figures in content/figures/ (`credit-underwriting-stack.svg`, `financial-copilot-architecture.svg`, `aml-fraud-detection-funnel.svg`).

### R3. Pedagogical, Editorial, and Mathematical Governance
Every chapter must adhere to the 13-part chapter arc, render all mathematical equations using LaTeX KaTeX format ($$...$$ and $math$), format tabular comparisons as standard GitHub Flavored Markdown tables (no code blocks), contain no code in "Try it" prompts for MBA candidates, and include highlighted thesis statements (==...==), media cards, check questions with answers, and 5-line night-before recaps.

### R4. Verification, Edition Packaging, and Release Commit
Update book.yml edition to `2027 · Draft 0.4 (Finance Track)`, create comprehensive end-to-end tests in test/e2e-fin.mjs, verify pipeline compilation and PDF generation, copy output to editions/INFERENCE-v4-finance-draft.pdf, update STATUS.md, and commit the release to git.

## Acceptance Criteria

### Build & Verification
- [ ] `npm run check` reports 0 errors
- [ ] `npm run build` compiles all 28 chapters in < 500 ms
- [ ] `node test/e2e-fin.mjs` passes 100% of tests
- [ ] `npm run pdf` successfully outputs the complete publication PDF (~480+ pages)
- [ ] All 4 new chapters appear in dist/index.html navigation and cover tabs
- [ ] Clean git working tree with commit `feat(finance): complete v4 finance track and integrate into compendium`
