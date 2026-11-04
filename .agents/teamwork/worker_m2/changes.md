# Changes Report — Milestone M2 (Part VI Structure, Visuals & Configuration)

**Worker:** `worker_m2` (teamwork_worker)  
**Milestone:** M2 - Part VI Structure, Visuals & Configuration  
**Date:** 2026-11-04  

---

## 1. Files Modified / Created

### 1. `content/toc.yml`
- **Change:**
  - Inserted Part VI (`id: p6`, `n: VI`, `title: Finance & Banking`, `track: finance`, `deck: Algorithmic credit risk, high-stakes FP&A deal copilots, financial crime under RBI FREE-AI, and the finance casebook.`) preceding Inserts.
  - Registered 4 finance chapters in Part VI:
    1. `algorithmic-underwriting-and-credit-risk` (tracks: `[finance]`, prereq: `[kinds-of-ai, your-documents]`)
    2. `financial-copilots-and-deal-diligence` (tracks: `[finance, strategy]`, prereq: `[delegation-brief, judging-output]`)
    3. `financial-crime-fraud-and-rbi-free-ai` (tracks: `[finance]`, prereq: `[judging-output, models-that-act]`)
    4. `finance-casebook` (tracks: `[finance]`, prereq: `[algorithmic-underwriting-and-credit-risk, financial-copilots-and-deal-diligence, financial-crime-fraud-and-rbi-free-ai]`)
  - Renumbered Inserts to Part VII (`id: p7`, `n: VII`), retaining all insert sub-chapters (`state-of-play`, `india-briefing`).
- **Rationale:** Expands total compendium chapter count from 24 to 28 across 8 parts (p0 through p7), placing the Finance Track between Product Management (Part V) and Inserts (Part VII).

### 2. `scripts/build.mjs`
- **Change:**
  - In `howToRead(ctx)` at line 122, updated `const paths = ['consulting', 'marketing', 'product', 'finance']`.
- **Rationale:** Renders the dedicated Finance Track reading path and chip alongside Consulting, Marketing, and Product tracks in the printed front matter (`#paths` section).

### 3. `content/figures/credit-underwriting-stack.svg`
- **Change:** Created vector SVG figure (5,981 bytes) for Chapter 22.
- **Visual Design:**
  - Dimensions: `viewBox="0 0 640 330"` with accessible `role="img"` and `aria-label`.
  - Architecture: Dual-Core layout:
    - Left: Core A (Structured Classical Risk Engine) — CIBIL/Experian, repayment ledgers, DTI, Monotonic GBDT, XGBoost, WoE scorecards, Basel III/IV IRB capital compliance.
    - Right: Core B (Unstructured Document Intelligence) — GSTN GSTR-2B, bank PDFs, MCA filings, DocLLM/LayoutLM, circular invoicing radar, feature emission.
    - Center: Central Synthesis, XAI & Regulatory Governance Layer — SHAP/TreeSHAP attribution engine, statutory adverse action reason engine, underwriter cockpit HUD with cryptographic override logs.
    - Bottom: 3-tier output decision channels (Tier 1: Straight-Through Approve, Tier 2: Credit Committee Review HUD, Tier 3: Adverse Action Decline).

### 4. `content/figures/financial-copilot-architecture.svg`
- **Change:** Created vector SVG figure (7,671 bytes) for Chapter 23.
- **Visual Design:**
  - Dimensions: `viewBox="0 0 640 330"` with accessible `role="img"` and `aria-label`.
  - Architecture: End-to-end 5-stage zero-tolerance pipeline:
    - Stage 1: Unstructured VDR Ingestion (10-K, 10-Q, CIM, MCA-21, balance sheet scans via DocLLM/OCR).
    - Stage 2: Layout-Aware Table Extraction (2D spatial coordinates, multi-row span headers, [x0,y0,x1,y1] bbox map).
    - Stage 3: LLM Semantic Compiler & Formula Planner (Deterministic Python AST generator, zero direct math, hallucination firewall).
    - Stage 4: Deterministic Sandbox Tool Execution (Isolated Python/Pyodide runtime, IEEE 754 precision, double-entry checks).
    - Stage 5: Cell-Level Lineage Verification Gate (SHA-256 source hash, document ID, visual bounding box, click-through inspector).
    - Bottom: Institutional Deliverables Box (Audited LBO/DCF model, cell-level provenance inspector, investment committee sign-off).

### 5. `content/figures/aml-fraud-detection-funnel.svg`
- **Change:** Created vector SVG figure (5,882 bytes) for Chapter 24.
- **Visual Design:**
  - Dimensions: `viewBox="0 0 640 330"` with accessible `role="img"` and `aria-label`.
  - Architecture: Two-panel funnel and governance matrix:
    - Left Panel: Real-time screening funnel across 5 narrowing tiers:
      1. Streaming Ingress (40M UPI tx/day, sub-50ms SLA).
      2. Fast Velocity & Device Filter (99.5% pass-through in <15ms).
      3. GNN & Mule Ring Detector (0.5% / 200k tx/day, cyclic graph traversal).
      4. Calibrated High-Recall ML (0.05% / 20k alerts/day, asymmetric cost matrix).
      5. GenAI STR Dossier (Top 200 cases/day, FIU-IND report drafting).
    - Right Panel: RBI FREE-AI Governance Pillars:
      - Pillar A: Base Rate Fallacy Containment ($p(\text{Fraud}) = 0.01\%$, Bayesian recalibration).
      - Pillar B: Graph Topology & Rapid Cash Layering (Mule networks, ATM drainage <120s).
      - Pillar C: Mandatory PMLA Statutory Human Sign-Off (Principal officer personal legal accountability).
      - Core Mandate: Fairness, Resilience, Explainability under DPDP sovereign data localization.

---

## 2. Verification Summary
- `node scripts/build.mjs`: Successfully built 24/28 chapters in 466 ms (all 28 chapters in TOC parsed cleanly).
- `npm run check`: 0 errors reported by offline linter.
- XML validation on SVGs: All 3 SVGs validated as well-formed XML with proper closing tags.
