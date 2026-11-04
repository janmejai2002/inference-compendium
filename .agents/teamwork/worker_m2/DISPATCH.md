# Dispatch for worker_m2

- **Milestone**: M2 - Part VI Structure, Visuals & Configuration
- **Working Directory**: C:\Users\Janmejai\compendium\.agents\teamwork\worker_m2\
- **Original Request**: C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md
- **Project Plan**: C:\Users\Janmejai\compendium\.agents\teamwork\orchestrator\PROJECT.md
- **Inputs**: C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_1\handoff.md, report.md, and `explorer_1/handoff.md`
- **Exclusive Write Ownership**:
  - `content/toc.yml`
  - `scripts/build.mjs`
  - `content/figures/credit-underwriting-stack.svg`
  - `content/figures/financial-copilot-architecture.svg`
  - `content/figures/aml-fraud-detection-funnel.svg`
- **Objective**:
  1. Update `content/toc.yml`:
     - Add Part VI:
       ```yaml
       - id: p6
         num: VI
         title: Finance & Banking
         lead: Underwrite, audit, and protect capital with algorithmic precision and regulatory guardrails.
         chapters:
           - algorithmic-underwriting-and-credit-risk
           - financial-copilots-and-deal-diligence
           - financial-crime-fraud-and-rbi-free-ai
           - finance-casebook
       ```
     - Shift Inserts to:
       ```yaml
       - id: p7
         num: VII
         title: Inserts
         lead: Quick-reference cards, decision matrices, and interview prep.
         chapters:
           - prompt-engineering-field-guide
           - model-selection-matrix
           - career-playbook
       ```
  2. Update `scripts/build.mjs`:
     - In `howToRead(ctx)` (around line 122), add `'finance'` to `const paths = ['consulting', 'marketing', 'product', 'finance'];` so that the dedicated Finance Track reading path is rendered into the front matter.
  3. Create the 3 vector SVG figures in `content/figures/`:
     - `credit-underwriting-stack.svg`: 4-layer architectural diagram (Raw Alternative & Traditional Data -> Feature Engineering & WoE Binning -> ML Ensemble / XGBoost / GBDT -> XAI / SHAP Attribution & Decision Rule Engine).
     - `financial-copilot-architecture.svg`: End-to-end institutional copilot flow (VDR PDF/Docx Ingestion -> Layout-Aware Chunking/DocLLM -> Deterministic Python/Excel Tool Sandbox -> Cell-Level Audit Trail & Citation Provenance).
     - `aml-fraud-detection-funnel.svg`: Funnel/Network architecture (High-Velocity Transaction Stream 40M/day -> Fast Heuristics/Velocity Filter -> Graph Neural Network/Entity Resolution for Mule Rings -> Prioritized STR Investigation Queue with Base Rate Fallacy mitigations).
     - Note on SVG styling: Follow the dark-mode/publication palette consistent with existing figures in `content/figures/` (e.g. view existing SVGs like `content/figures/product-analytics-stack.svg` or similar for font-family, colors, strokes, dimensions).
  4. Write `changes.md` and `handoff.md` in your working directory.
- **Mandatory Warning**:
  DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
