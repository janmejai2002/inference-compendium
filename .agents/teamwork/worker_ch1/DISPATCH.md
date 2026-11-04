# Dispatch for worker_ch1

- **Role**: Chapter 1 Author (Algorithmic Underwriting & Credit Risk)
- **Working Directory**: C:\Users\Janmejai\compendium\.agents\teamwork\worker_ch1\
- **Original Request**: C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md
- **Project Plan**: C:\Users\Janmejai\compendium\.agents\teamwork\orchestrator\PROJECT.md
- **Reference Material**:
  - `prompts/06-v4-finance-build.md` § Chapter 1
  - `docs/PEDAGOGY.md` & `docs/AUTHORING.md`
  - `C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_1\report.md`
  - `test/e2e-fin.mjs` (Tier 1 & Tier 2 tests for chapter 22)
  - Exemplar chapter: `content/chapters/foundation-models-and-frontier-architectures.md`
- **Exclusive Write Ownership**:
  - `content/chapters/algorithmic-underwriting-and-credit-risk.md`
- **Detailed Specifications**:
  1. **Frontmatter**:
     - `id: algorithmic-underwriting-and-credit-risk`
     - `title: "Algorithmic Underwriting & Credit Risk"`
     - `part: p6`
     - `track: finance`
     - `status: published`
     - `order: 22`
     - `prereqs: [kinds-of-ai, your-documents]`
     - `objectives`: 3 Bloom-taxonomy bullets (e.g. Calculate Expected Credit Loss under IFRS 9; Evaluate trade-offs between classical GBDT scorecards and foundation models; Formulate adverse action explainability using SHAP attributions).
     - `keywords`: credit underwriting, probability of default, expected credit loss, SHAP, alternative credit data, weight of evidence, Basel III
     - `audio: false`
  2. **Content & Core Themes**:
     - Dual-core architecture: Classical Risk Core (logistic regression, WoE, GBDT, regulatory capital models) vs Modern Unstructured Document Radar (DocLLM, bank statement parsers, GSTN invoice reconciliation).
     - Mathematical formulations in LaTeX KaTeX:
       - $ECL = EAD \times PD \times LGD$
       - $LGD = 1 - \text{Recovery Rate}$
       - Weight of Evidence: $\text{WoE}_i = \ln \left( \frac{\% \text{ Non-Defaults}_i}{\% \text{ Defaults}_i} \right)$
       - Information Value: $IV = \sum (\% \text{Non-Defaults}_i - \% \text{Defaults}_i) \times \text{WoE}_i$
       - Shapley attribution value formula $\phi_i(v)$
     - Figure embedding: `{{figure credit-underwriting-stack | Dual-Core Credit Underwriting Architecture | RBI FREE-AI Committee (2025) & BIS Working Papers}}`
     - Alternative data risks: synthetic identity fraud, covariate shift, regulatory adverse action notice requirements under RBI digital lending guidelines [@rbi-digital-lending-guidelines-2022].
     - Primary source citations: `[@bis-ml-credit-risk-2021]`, `[@bcbs-basel-irb-2017]`, `[@ifrs-9-ecl-standard-2014]`, `[@lundberg-lee-shap-2017]`, `[@ribeiro-lime-2016]`, `[@rbi-digital-lending-guidelines-2022]`. Media card: `{{paper bis-ml-credit-risk-2021}}`.
     - Glossary terms linked: `[[credit-underwriting-engine]]`, `[[probability-of-default|PD]]`, `[[loss-given-default|LGD]]`, `[[exposure-at-default|EAD]]`, `[[expected-credit-loss|ECL]]`, `[[shap-attribution|SHAP]]`, `[[weight-of-evidence|WoE]]`, `[[alternative-data-credit]]`, `[[adverse-action-notice]]`, `[[gnpa]]`.
  3. **Strict Pedagogical Invariants**:
     - 13-part arc: Opener, Lede, `::: principle`, `::: concept`, Figure, `::: stat`, `::: case`, `::: lens`, `::: interview`, `::: try`, media card, `::: check` + `::: answers`, `::: recap`.
     - Exactly 4–8 highlighted sentences with `==...==`.
     - Stat block: Exactly 1. Header MUST be plain text (e.g. `::: stat 50 bps`), with `<span class="src">...</span>`. NO LaTeX math in header line.
     - Try it: Zero code for MBA candidate audience (web UI, Custom GPT, Claude Project, Excel formula).
     - Recap spread: Exactly 5 numbered lines in `::: recap The night-before page`.
     - Check yourself: 4–6 numbered questions, and corresponding answers.
     - Tables: GFM markdown tables, no code blocks for tables.
  4. **Verification**:
     - Run `node test/e2e-fin.mjs --tier=2` and `npm run check`.
- **Mandatory Warning**:
  DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.


## 2026-11-04T16:07:52Z
[Message] timestamp=2026-11-04T16:07:52Z sender=a5372a48-229a-4fc5-8650-1b7734794c36 priority=MESSAGE_PRIORITY_HIGH content=You are worker_ch1, a teamwork_worker.
Your working directory is: C:\Users\Janmejai\compendium\.agents\teamwork\worker_ch1\
Read C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md and C:\Users\Janmejai\compendium\.agents\teamwork\worker_ch1\DISPATCH.md before starting work.
