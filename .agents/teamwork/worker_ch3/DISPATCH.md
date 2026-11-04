# Dispatch for worker_ch3

- **Role**: Chapter 3 Author (Financial Crime, Fraud & RBI FREE-AI)
- **Working Directory**: C:\Users\Janmejai\compendium\.agents\teamwork\worker_ch3\
- **Original Request**: C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md
- **Project Plan**: C:\Users\Janmejai\compendium\.agents\teamwork\orchestrator\PROJECT.md
- **Reference Material**:
  - `prompts/06-v4-finance-build.md` § Chapter 3
  - `docs/PEDAGOGY.md` & `docs/AUTHORING.md`
  - `C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_1\report.md`
  - `test/e2e-fin.mjs` (Tier 1 & Tier 2 tests for chapter 24)
  - Exemplar chapter: `content/chapters/judging-output.md` or `models-that-act.md`
- **Exclusive Write Ownership**:
  - `content/chapters/financial-crime-fraud-and-rbi-free-ai.md`
- **Detailed Specifications**:
  1. **Frontmatter**:
     - `id: financial-crime-fraud-and-rbi-free-ai`
     - `title: "Financial Crime, Fraud & RBI FREE-AI"`
     - `part: p6`
     - `track: finance`
     - `status: published`
     - `order: 24`
     - `prereqs: [judging-output, models-that-act]`
     - `objectives`: 3 Bloom-taxonomy bullets (e.g. Analyze transaction alert distributions using Bayes' theorem to mitigate base rate fallacies; Construct graph anomaly detection workflows for synthetic identities and mule accounts; Implement regulatory governance frameworks under RBI FREE-AI and DPDP data localization).
     - `keywords`: fraud detection, base rate fallacy, mule account detection, RBI FREE-AI, graph neural networks, suspicious transaction report, DPDP localization
     - `audio: false`
  2. **Content & Core Themes**:
     - The Base Rate Fallacy in Fraud Detection:
       - Mathematical derivation: Let fraud base rate $P(F) = 0.0001$ (1 in 10,000). A classifier with $99\%$ true positive rate and $99\%$ specificity ($1\%$ false positive rate).
       - Bayes' theorem calculation:
         $$P(F \mid \text{Alert}) = \frac{P(\text{Alert} \mid F) P(F)}{P(\text{Alert} \mid F) P(F) + P(\text{Alert} \mid \neg F) P(\neg F)}$$
         $$P(F \mid \text{Alert}) = \frac{0.99 \times 0.0001}{0.99 \times 0.0001 + 0.01 \times 0.9999} \approx 0.0098 \approx 0.98\%$$
       - Explaining why 99% of generated alerts are false alarms, paralyzing compliance operations unless cascading thresholds and triage funnels are engineered.
     - Graph Anomaly Detection & Mule Rings:
       - Graph Neural Networks (GNNs) and graph embeddings for mule networks across payment rails (UPI, IMPS, RTGS). Detecting circular routing, velocity spikes, and shared hardware identifiers.
       - MuleHunter.AI initiative and NPCI fraud management guidelines.
     - Regulatory Governance:
       - The RBI FREE-AI Committee (2025) Framework: The 7 Sutras (fairness, accountability, transparency, resilience, consumer protection, privacy, contestability).
       - DPDP Act 2023 & RBI Payment Data Storage Directives (2018): Sovereign data boundaries, domestic storage mandates, and why cross-border cloud LLM inference triggers statutory non-compliance.
       - SEBI algorithmic trading directives and quarterly AI/ML risk reporting.
     - Figure embedding: `{{figure aml-fraud-detection-funnel | Real-time AML Screening Funnel and RBI FREE-AI Governance | RBI FREE-AI Committee (2025) & NPCI Procedural Guidelines}}`
     - Primary source citations: `[@rbi-free-ai-2025]`, `[@rbi-dev-reg-policies-2024-12]`, `[@rbi-storage-payment-data-2018]`, `[@meity-dpdp-act-2023]`, `[@sebi-algo-trading-consultation-2021]`, `[@sebi-ai-ml-reporting-2019]`, `[@npci-upi-procedural-guidelines-2024]`. Media card: `{{read rbi-free-ai-2025}}`.
     - Glossary terms linked: `[[base-rate-fallacy]]`, `[[mule-account-detection]]`, `[[rbi-free-ai]]`, `[[graph-neural-networks]]`, `[[suspicious-transaction-report|STR]]`, `[[dpdp-financial-localization]]`, `[[synthetic-identity-fraud]]`.
  3. **Strict Pedagogical Invariants**:
     - 13-part arc: Opener, Lede, `::: principle`, `::: concept`, Figure, `::: stat`, `::: case`, `::: lens`, `::: interview`, `::: try`, media card, `::: check` + `::: answers`, `::: recap`.
     - Exactly 4–8 highlighted sentences with `==...==`.
     - Stat block: Exactly 1. Header MUST be plain text (e.g. `::: stat 40 million transactions/day` or `::: stat ₹1,200 crore`), with `<span class="src">...</span>`. NO LaTeX math in header line.
     - Try it: Zero code for MBA candidate audience (designing an alert triage workflow in a spreadsheet or Custom GPT prompt).
     - Recap spread: Exactly 5 numbered lines in `::: recap The night-before page`.
     - Check yourself: 4–6 numbered questions, and corresponding answers.
     - Tables: GFM markdown tables, no code blocks for tables.
  4. **Verification**:
     - Run `node test/e2e-fin.mjs --tier=2` and `npm run check`.
- **Mandatory Warning**:
  DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.


## 2026-11-04T16:08:10Z
You are worker_ch3, a teamwork_worker.
Your working directory is: C:\Users\Janmejai\compendium\.agents\teamwork\worker_ch3\
Read C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md and C:\Users\Janmejai\compendium\.agents\teamwork\worker_ch3\DISPATCH.md before starting work.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write boundary:
- content/chapters/financial-crime-fraud-and-rbi-free-ai.md

Your task:
Author the complete, rigorous, publication-grade chapter content/chapters/financial-crime-fraud-and-rbi-free-ai.md strictly following the specifications in DISPATCH.md, docs/PEDAGOGY.md, and docs/AUTHORING.md:
- Complete frontmatter with objectives, keywords, audio: false, order: 24.
- Full 13-part arc: Opener, Lede, ::: principle, ::: concept, {{figure aml-fraud-detection-funnel ...}}, ::: stat, ::: case, ::: lens, ::: interview, ::: try (no-code), media card, ::: check + ::: answers, ::: recap (5 numbered lines).
- Highlight bounds: 4 to 8 highlighted sentences using ==...==.
- Plain-text headers in all ::: concept and ::: stat blocks (NO LaTeX math in header line).
- LaTeX KaTeX math in prose/blocks: Base rate fallacy Bayes' theorem formula and alert volume derivations.
- Core concepts: GNN mule account detection, MuleHunter.AI, RBI FREE-AI framework 7 Sutras, DPDP Act localization and RBI storage directives, SEBI algorithmic trading reporting.
- Standard GFM markdown tables (no code blocks for tables).
- Cross-link glossary terms [[base-rate-fallacy]], [[mule-account-detection]], [[rbi-free-ai]], [[graph-neural-networks]], [[suspicious-transaction-report|STR]], [[dpdp-financial-localization]], [[synthetic-identity-fraud]], etc.
- Cite sources [@rbi-free-ai-2025], [@rbi-dev-reg-policies-2024-12], [@rbi-storage-payment-data-2018], [@meity-dpdp-act-2023], [@sebi-algo-trading-consultation-2021], [@npci-upi-procedural-guidelines-2024]. Media card: {{read rbi-free-ai-2025}}.
- Anti-ai-writing: Concrete, human, authoritative voice; no machine cliches.
- Run node test/e2e-fin.mjs --tier=2 or npm run check to verify your chapter.
- Write changes.md and handoff.md in your working directory.
When finished, notify me using send_message.
