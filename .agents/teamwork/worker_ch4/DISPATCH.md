# Dispatch for worker_ch4

- **Role**: Chapter 4 Author (Finance Casebook: Eight Fully-Worked Quantitative Cases & Guesstimates)
- **Working Directory**: C:\Users\Janmejai\compendium\.agents\teamwork\worker_ch4\
- **Original Request**: C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md
- **Project Plan**: C:\Users\Janmejai\compendium\.agents\teamwork\orchestrator\PROJECT.md
- **Reference Material**:
  - `prompts/06-v4-finance-build.md` § Chapter 4
  - `docs/PEDAGOGY.md` & `docs/AUTHORING.md`
  - `C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_1\report.md`
  - `test/e2e-fin.mjs` (Tier 1 & Tier 2 tests for chapter 25)
  - Exemplar casebooks: `content/chapters/product-casebook.md` and `content/chapters/marketing-casebook.md`
- **Exclusive Write Ownership**:
  - `content/chapters/finance-casebook.md`
- **Detailed Specifications**:
  1. **Frontmatter**:
     - `id: finance-casebook`
     - `title: "Finance Casebook: Eight Worked Problems"`
     - `part: p6`
     - `track: finance`
     - `status: published`
     - `order: 25`
     - `prereqs: [algorithmic-underwriting-and-credit-risk, financial-copilots-and-deal-diligence, financial-crime-fraud-and-rbi-free-ai]`
     - `objectives`: 3 Bloom-taxonomy bullets (e.g. Model the unit economics and capital impact of AI-driven credit underwriting on an SME loan book; Quantify cost and IRR enhancements in private equity deal diligence pipelines; Structure quantitative guesstimates for on-premise private AI cluster TCO and capital buffer sizing).
     - `keywords`: quantitative finance cases, SME lending, M&A due diligence, robo-advisory economics, fraud operations optimization, AI infrastructure TCO, covenant monitoring, NBFC valuation, algorithmic trading buffers
     - `audio: false`
  2. **Content & Core Themes**:
     Must contain all 8 quantitative problems fully worked out with explicit business context, assumptions, step-by-step arithmetic formulas in LaTeX KaTeX, and sensitivity tables:
     - **Case 1: Commercial SME Lending (GSTN statement parsing on ₹10,000 Cr book)**:
       - Baseline: ₹10,000 Cr AUM, 4.2% GNPA, 18-day turnaround time, 350 basis points operating expense.
       - AI Intervention: Automated bank statement + GSTN return parsing + cash-flow credit scoring. Turnaround drops to 3 days, GNPA drops by 60 bps to 3.6%, opex reduces by 80 bps.
       - Full financial waterfall: annual credit loss savings, operating cost savings, and incremental ROA/ROE impact.
     - **Case 2: Private Equity M&A Due Diligence (₹1,500 Cr ARR SaaS acquisition)**:
       - Baseline: 6-week manual VDR diligence, ₹4.5 Cr advisory fees, 30 covenants reviewed.
       - AI Intervention: Financial copilot with cell-level lineage parsing 12,000 customer contracts, automated ARR cohort waterfall, debt covenant red-flag engine. Diligence window compressed to 10 days, uncovers ₹85 Cr in off-balance-sheet commitments and revenue churn leakage.
     - **Case 3: Retail Wealth Management (hybrid robo-advisory economics on ₹40,000 Cr AUM)**:
       - Sizing advisor capacity (from 150 clients to 750 clients per advisor), fee compression defense, automated rebalancing, and client retention economics.
     - **Case 4: Fraud & AML Operations (false-positive optimization on 250M monthly transactions)**:
       - Volume: 250M transactions/month. Alert rate 0.2% = 500,000 alerts/month. Manual review cost ₹150/alert = ₹7.5 Cr/month.
       - AI cascading model + GNN mule ring detection reduces false positives by 65%, automated closure of Tier 1 alerts, annual operational savings > ₹50 Cr.
     - **Guesstimate 1: Sizing 3-year TCO for on-premise private AI cluster vs cloud API**:
       - 8x H100/H200 HGX server capital cost, data center power, cooling, network, maintenance vs enterprise tokens/sec cloud API pricing under RBI domestic localization constraints.
     - **Guesstimate 2: Estimating financial value of automated debt covenant monitoring**:
       - Sizing technical default prevention, waiver fee mitigation, and recovery rate improvements on a corporate credit portfolio.
     - **Guesstimate 3: Valuation impact of AI-driven back-office automation on a mid-sized NBFC**:
       - Cost-to-income ratio reduction from 48% to 38%, resulting in P/B and P/E multiple expansion.
     - **Guesstimate 4: Quantifying the capital buffer required for algorithmic trading liquidity shocks**:
       - Stress-testing extreme market volatility and order-to-trade ratio spikes under SEBI regulatory guidelines.
     - Primary source citations: `[@bis-ml-credit-risk-2021]`, `[@rbi-free-ai-2025]`, `[@jpmorgan-llm-finance-2023]`. Media card: `{{paper jpmorgan-llm-finance-2023}}`.
     - Glossary terms linked: `[[credit-underwriting-engine]]`, `[[probability-of-default|PD]]`, `[[expected-credit-loss|ECL]]`, `[[financial-spreading]]`, `[[virtual-data-room|VDR]]`, `[[base-rate-fallacy]]`, `[[gnpa]]`.
  3. **Strict Pedagogical Invariants**:
     - 13-part arc: Opener, Lede, `::: principle`, `::: concept`, `::: stat`, `::: case`, `::: lens`, `::: interview`, `::: try`, media card, `::: check` + `::: answers`, `::: recap`. (Note: SVG figure is optional or can embed `{{figure credit-underwriting-stack ...}}`).
     - Exactly 4–8 highlighted sentences with `==...==`.
     - Stat block: Exactly 1. Header MUST be plain text (e.g. `::: stat ₹60 crore annual savings` or `::: stat 18 days to 3 days`), with `<span class="src">...</span>`. NO LaTeX math in header line.
     - Try it: Zero code for MBA candidate audience (spreadsheet scenario modeling prompt).
     - Recap spread: Exactly 5 numbered lines in `::: recap The night-before page`.
     - Check yourself: 4–6 numbered questions, and corresponding answers.
     - Tables: GFM markdown tables, no code blocks for tables.
  4. **Verification**:
     - Run `node test/e2e-fin.mjs --tier=2` and `npm run check`.
- **Mandatory Warning**:
  DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.


## 2026-11-04T16:08:21Z
You are worker_ch4, a teamwork_worker.
Your working directory is: C:\Users\Janmejai\compendium\.agents\teamwork\worker_ch4\
Read C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md and C:\Users\Janmejai\compendium\.agents\teamwork\worker_ch4\DISPATCH.md before starting work.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your exclusive write boundary:
- content/chapters/finance-casebook.md

Your task:
Author the complete, rigorous, publication-grade chapter content/chapters/finance-casebook.md strictly following the specifications in DISPATCH.md, docs/PEDAGOGY.md, and docs/AUTHORING.md:
- Complete frontmatter with objectives, keywords, audio: false, order: 25.
- All 8 quantitative problems fully worked out with business context, assumptions, step-by-step arithmetic in LaTeX KaTeX, and sensitivity tables:
  1. Case 1: Commercial SME Lending (GSTN statement parsing on ₹10,000 Cr book)
  2. Case 2: Private Equity M&A Due Diligence (₹1,500 Cr ARR SaaS acquisition)
  3. Case 3: Retail Wealth Management (hybrid robo-advisory economics on ₹40,000 Cr AUM)
  4. Case 4: Fraud & AML Operations (false-positive optimization on 250M monthly transactions)
  5. Guesstimate 1: Sizing 3-year TCO for on-premise private AI cluster vs cloud API
  6. Guesstimate 2: Estimating financial value of automated debt covenant monitoring
  7. Guesstimate 3: Valuation impact of AI-driven back-office automation on a mid-sized NBFC
  8. Guesstimate 4: Quantifying the capital buffer required for algorithmic trading liquidity shocks
- Full pedagogical elements: Opener, Lede, ::: principle, ::: concept, ::: stat, ::: case, ::: lens, ::: interview, ::: try (no-code), media card, ::: check + ::: answers, ::: recap (5 numbered lines).
- Highlight bounds: 4 to 8 highlighted sentences using ==...==.
- Plain-text headers in all ::: concept and ::: stat blocks (NO LaTeX math in header line).
- Standard GFM markdown tables (no code blocks for tables).
- Cross-link glossary terms [[credit-underwriting-engine]], [[probability-of-default|PD]], [[expected-credit-loss|ECL]], [[financial-spreading]], [[virtual-data-room|VDR]], [[base-rate-fallacy]], [[gnpa]], etc.
- Cite sources [@bis-ml-credit-risk-2021], [@rbi-free-ai-2025], [@jpmorgan-llm-finance-2023]. Media card: {{paper jpmorgan-llm-finance-2023}}.
- Anti-ai-writing: Concrete, human, authoritative voice; no machine cliches.
- Run node test/e2e-fin.mjs --tier=2 or npm run check to verify your chapter.
- Write changes.md and handoff.md in your working directory.
When finished, notify me using send_message.
