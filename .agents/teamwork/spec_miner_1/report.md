# Specification Mining Report: v4 Finance & Banking Track (Part VI)

**Author:** `spec_miner_1` (teamwork_spec_miner)  
**Date:** 2026-11-04  
**Target Release:** INFERENCE 2027 · Draft 0.4 (Finance Track)  
**Authoritative Sources Analyzed:**
- `prompts/06-v4-finance-build.md`
- `docs/PEDAGOGY.md`
- `docs/AUTHORING.md`
- `docs/SOURCES.md`
- `scripts/check.mjs` & `scripts/lib/render.mjs`
- `content/toc.yml` & `book.yml`
- Existing exemplar chapters: `content/chapters/product-architecture-economics.md`, `content/chapters/product-casebook.md`
- Test harness model: `test/e2e-pm.mjs`

---

## Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Table of Contents | Part VI Structure Insertion | Add Part VI (`id: p6`, `n: VI`, `title: Finance & Banking`, `track: finance`) before Inserts in `content/toc.yml` | YAML structure with 4 chapters | Chapter list in compilation pipeline | Parse error in YAML or unknown track error in `scripts/check.mjs` | `prompts/06-v4-finance-build.md` § 2 |
| 2 | Table of Contents | Part VII Inserts Shift | Renumber Inserts from `p6` / `VI` to `p7` / `VII`, retaining chapters `state-of-play` and `india-briefing` | Modified YAML node | Preserved inserts at the end of the compendium | Duplicate id or broken sequence if omitted | `prompts/06-v4-finance-build.md` § 2, `content/toc.yml` |
| 3 | Sources Canon | Finance Primary Sources Ingestion | Ingest canonical primary sources (RBI FREE-AI report, BIS credit ML paper, J.P. Morgan AI research, IFRS 9 ECL guidelines, SEBI algo trading directives) into `content/sources.yml` | Source YAML entries with type, title, creator, publisher, year, url, tier, why | Rendered media cards and bibliography citations | `scripts/check.mjs` flags missing fields, unregistered domains, or tier mismatches | `prompts/06-v4-finance-build.md` § 1.2, § 3.1 |
| 4 | Sources Policy | Allowlist Domain Ingestion | Register required authoritative domains (`bis.org`, `ifrs.org`, `jpmorgan.com` or verified hosting domains) under Tier A/B in `content/source-policy.yml` | Domain strings in YAML arrays | Clean pass during offline linter domain check | Linter warning: "domain is not in source-policy.yml, needs review" | `scripts/check.mjs` line 36 |
| 5 | Glossary | Finance Technical Terminology Ingestion | Add 8 key financial AI terms (`credit-underwriting-engine`, `probability-of-default`, `loss-given-default`, `expected-credit-loss`, `financial-spreading`, `rbi-free-ai`, `mule-account-detection`, `explainable-ai-finance`) to `content/glossary.yml` | Term and definition pairs (def >= 25 chars) | Margin rail callout on first use, back-of-book glossary | Unknown glossary term error if chapter uses `[[term]]` not in registry | `prompts/06-v4-finance-build.md` § 3.1 |
| 6 | Chapter 1 | Algorithmic Underwriting & Credit Risk | Author `content/chapters/algorithmic-underwriting-and-credit-risk.md` covering classical ML vs foundation models, Basel III/IV, IFRS 9 ECL math, SHAP/LIME explainability, and alternative data | Markdown with 13-part arc, KaTeX math, GFM tables | Rendered chapter (2,000–3,500 words) | Missing arc components or escaped HTML tag leak in `scripts/check.mjs` | `prompts/06-v4-finance-build.md` § 3.2 |
| 7 | Chapter 2 | Financial Copilots & Deal Diligence | Author `content/chapters/financial-copilots-and-deal-diligence.md` covering zero-tolerance precision, VDR table extraction, deterministic Python/Excel tool execution, cell-level audit lineage, and PE buyout diligence | Markdown with 13-part arc, KaTeX math, GFM tables | Rendered chapter (2,000–3,500 words) | Missing arc components or escaped HTML tag leak in `scripts/check.mjs` | `prompts/06-v4-finance-build.md` § 3.2 |
| 8 | Chapter 3 | Financial Crime, Fraud & RBI FREE-AI | Author `content/chapters/financial-crime-fraud-and-rbi-free-ai.md` covering base rate fallacy, UPI transaction laundering, mule networks, GNNs, RBI FREE-AI principles, PMLA STR drafting, and DPDP Act | Markdown with 13-part arc, KaTeX math, GFM tables | Rendered chapter (2,000–3,500 words) | Missing arc components or escaped HTML tag leak in `scripts/check.mjs` | `prompts/06-v4-finance-build.md` § 3.2 |
| 9 | Chapter 4 | Finance Casebook & Interview Room | Author `content/chapters/finance-casebook.md` featuring 8 fully-worked quantitative cases (4 strategic production cases + 4 quantitative estimation models) | Markdown with 8 worked case blocks, KaTeX math, GFM tables | Rendered casebook chapter (3,500–5,000 words) | Math syntax errors or missing case blocks | `prompts/06-v4-finance-build.md` § 3.2 |
| 10 | Graphics | Credit Underwriting Stack SVG | Create `content/figures/credit-underwriting-stack.svg` illustrating dual-core architecture: Structured Classical ML Risk Core + Unstructured GenAI Document Radar | Vector SVG using compendium CSS classes (`viewBox="0 0 640 330"`) | Responsive SVG figure rendered in print and web | Missing figure error in `scripts/check.mjs` | `prompts/06-v4-finance-build.md` § 3.2 |
| 11 | Graphics | Financial Copilot Architecture SVG | Create `content/figures/financial-copilot-architecture.svg` illustrating VDR Ingest $\to$ Layout Extraction $\to$ Deterministic Sandbox $\to$ Lineage Verification $\to$ Audited Model | Vector SVG using compendium CSS classes (`viewBox="0 0 640 330"`) | Responsive SVG figure rendered in print and web | Missing figure error in `scripts/check.mjs` | `prompts/06-v4-finance-build.md` § 3.2 |
| 12 | Graphics | AML & Fraud Detection Funnel SVG | Create `content/figures/aml-fraud-detection-funnel.svg` illustrating Raw Streaming $\to$ GNN Anomaly Engine $\to$ High-Recall Filtering $\to$ LLM STR Dossier $\to$ Human AML Sign-Off | Vector SVG using compendium CSS classes (`viewBox="0 0 640 330"`) | Responsive SVG figure rendered in print and web | Missing figure error in `scripts/check.mjs` | `prompts/06-v4-finance-build.md` § 3.2 |
| 13 | Pedagogy | 13-Part Chapter Arc Enforcement | Enforce Opener, Lede, Principle, Concept, Figure, Evidence/Stat, Case, Lenses, Interview, Try it, Media cards, Check/Answers, Recap across all chapters | Structured markdown containers (`:::`) | Magazine layout in web and print | Linter warnings for missing recap, check, or answers | `docs/PEDAGOGY.md`, `docs/AUTHORING.md` |
| 14 | Pedagogy | Mayer Signaling & Highlighting | Include 4–8 highlighted sentences (`==...==`) per chapter providing an executive skim layer | Enclosed text in `==` | Highlighted text in print/web | Linter warning if no highlights present; test failure if <4 or >8 | `docs/PEDAGOGY.md`, `scripts/check.mjs` |
| 15 | Pedagogy | Non-Technical "Try It" Prompts | All `::: try` prompts must contain zero programming code; instructions must specify spreadsheet formulas, ChatGPT/Claude prompts, or web tools | Plaintext prompts in code fence | Accessible exercises for MBA candidates | Test failure if programming code (Python/JS/bash) is found in try block | `prompts/06-v4-finance-build.md` § 1.5 |
| 16 | Style & Tone | Anti-AI Writing Standard | Enforce concrete Indian & global financial institutions (HDFC, ICICI, SBI, Bajaj Finance, Zerodha, JPMorgan, Goldman Sachs, BlackRock, RBI, SEBI); eliminate banned tropes | Text prose | Human, empirical, bursty journalistic tone | Test failure if banned regex matches ("delve", "testament to", "fast-paced world") | `prompts/06-v4-finance-build.md` § 1.3 |
| 17 | Math Rendering | KaTeX Financial Formulations | Render all financial formulas ($PD$, $LGD$, $ECL$, $WoE$, $IV$, $SHAP$, $DCF$, $WACC$, $LBO$, Bayes posterior precision) with LaTeX KaTeX | Display `$$...$$` and inline `$math$` | Rendered KaTeX HTML/MathML | Escaped HTML tag leak if KaTeX is used in block header info lines | `prompts/06-v4-finance-build.md` § 1.4, `scripts/check.mjs` |
| 18 | Testing | 4-Tier E2E Test Suite | Implement `test/e2e-fin.mjs` covering Tier 1 (Features), Tier 2 (Boundaries/Pedagogy), Tier 3 (Referential Integrity), and Tier 4 (Workload/Build) | Node.js test runner with CLI flags (`--tier`, `--bail`, `--progressive`, `--json`) | Formatted test reports and error details | Exit code 1 on test failure | `test/e2e-pm.mjs`, `ORIGINAL_REQUEST.md` R4 |
| 19 | Release | Book Edition Bump & PDF Output | Update `book.yml` to `2027 · Draft 0.4 (Finance Track)`, compile PDF to `editions/INFERENCE-v4-finance-draft.pdf`, update `STATUS.md` | Build configuration and scripts | Verified publication PDF (~480+ pages) | PDF build failure or broken layout | `prompts/06-v4-finance-build.md` § 3.4 |

---

## Edge Cases

| # | Feature | Input | Observed Behavior | Required Mitigation / Specification |
|---|---------|-------|-------------------|--------------------------------------|
| 1 | KaTeX Math in Block Headers | `::: case Illustrative · Calculating ECL ($EAD \times PD$)` | `markdown-it-container` processes header text via `md.renderInline()`. If KaTeX preprocesses `$math$` first into `<span class="katex">...</span>`, the inner container title escapes `<` to `&lt;span...&gt;`, triggering the linter error: `contains escaped HTML tag leak (&lt;span...&gt;) in rendered prose`. | **Rule:** NEVER place inline KaTeX (`$...$`) or HTML tags inside container block headers (`::: principle ...`, `::: concept ...`, `::: case ...`, `::: interview ...`, `::: stat ...`). Use plain text in headers (e.g. `::: case Illustrative · Calculating ECL and default provision`). Put formulas in the block body. |
| 2 | Currency Symbols vs Inline Math | `$50,000 crore` or `$20.00` vs `$p$` or `$PD$` | `scripts/lib/render.mjs` uses regex `/(?<=^|[\s(])\$(?!\$)([^\$\n]+?)(?<![\s\\])\$(?=[\s,.;:!?)\]]|$)/g` to match inline math, skipping plain currency patterns like `/^\d+(?:\.\d+)?\s*(?:billion|million|k|trillion)?$/i`. | **Rule:** In Indian financial contexts, use `₹` for Rupee amounts (e.g. `₹50,000 crore`, `₹120 crore`). For USD amounts, use `$3.00` or `$25.00` without trailing math tokens. Inside display math formulas, format currency as `\text{₹}`. |
| 3 | Sidenotes & Margin Rails | `^[sidenote text]` inside lists or tables | Sidenotes span into the outer margin rail on desktop and print. If nested deeply inside table cells or tight block lists, layout can overflow or overlap. | **Rule:** Keep sidenotes to standalone paragraphs in prose. Do not place sidenotes inside GFM table cells or inside `::: answers` blocks. |
| 4 | Mayer Signaling Highlight Density | `==sentence==` count per chapter | `test/e2e-pm.mjs` and pedagogical standards strictly enforce between 4 and 8 highlights per chapter. Having 3 triggers an under-highlighting failure; having 9 triggers an over-highlighting failure ("if everything is highlighted, nothing is"). | **Rule:** Author exactly 5 to 7 highlights per chapter, evenly distributed (approximately 1 per major `##` section), with the first highlight being the chapter's thesis in the lede. |
| 5 | Stat Block Invariant | `::: stat` block count | `test/e2e-pm.mjs` enforces exactly 1 `::: stat` block per chapter. | **Rule:** Include exactly one `::: stat Number% & label` block per chapter with an inline `<span class="src">Source: [@id]</span>`. |
| 6 | Media Cards Count & Placement | `{{read id}}`, `{{watch id}}`, `{{paper id}}` | Must be 1 to 3 media cards per chapter. Each must reference an ID present in `content/sources.yml`. Must appear on their own lines without leading indentation. | **Rule:** Include 2 to 3 media cards per chapter. Place them in the dedicated `## Recommended reading & media` section. |
| 7 | Check Questions & Reverse Answers | `::: check` and `::: answers` | Questions must be a numbered list ending with `<span class="lvl">recall|apply|explain|transfer|judge</span>`. The count must be between 4 and 6. The `::: answers` block must contain an identical count of numbered answers. | **Rule:** Author exactly 5 questions per chapter spanning the Bloom taxonomy (recall, apply, explain, transfer, judge). Number them 1 to 5; match answers 1 to 5. |
| 8 | Night-Before Recap Invariant | `::: recap The night-before page` | The recap block prints on its own page in print edition and serves as the emergency executive skim layer. It must contain EXACTLY 5 numbered lines. | **Rule:** Format the recap block with exactly 5 numbered lines (`1. ...` to `5. ...`). Do not use sub-bullets or introductory sentences. |
| 9 | Principle Conclusion Symbol (∴) | `5. ∴ Therefore...` in `::: principle` | `scripts/lib/render.mjs` has a regex `body.replace(/(:::\s*principle[\s\S]*?)(^\s*\d+\.\s*)∴\s*/gm, '$1$2')` which strips a manual ∴ because CSS pseudo-element `::before` injects the ∴ symbol automatically. | **Rule:** If authoring the final conclusion line, write `5. Therefore...` or `5. ∴ ...` knowing the preprocessor will strip the literal character so it does not double-render. |
| 10 | GFM Comparison Tables vs Code Fences | `| Model | Latency |` vs ` ```table ` | Markdown tables must use GitHub Flavored Markdown pipes and dashes (`|---|`). They must NEVER be enclosed in code blocks. `render.mjs` automatically wraps GFM tables in `<div class="table-wrap">` to enable responsive touch scrolling on mobile. | **Rule:** Always author tabular data as standard GFM tables. Include table header, separator, and aligned rows. |
| 11 | Source Domain Policy Allowlist | Citing `bis.org` or `ifrs.org` | If a source URL belongs to a domain not present in `content/source-policy.yml`, `scripts/check.mjs` issues a warning. If the domain is listed under Tier B but declared as Tier A, the linter errors out. | **Rule:** Add `bis.org` and `ifrs.org` to `content/source-policy.yml` under `A:` before running `scripts/check.mjs`. |
| 12 | Glossary Rails & First Use | `[[term]]` or `[[term\|display]]` | The first occurrence of `[[term]]` in a chapter places the definition in the margin rail (`<dfn class="term">...<span class="sn">...</span>`). Subsequent occurrences render as internal links to `#g-term`. | **Rule:** Ensure all 8 new finance glossary terms are declared in `content/glossary.yml` before referencing them in markdown. |
| 13 | TOC Track Definition | `track: finance` | `content/toc.yml` defines `track: finance` for Part VI and individual chapters. `book.yml` line 27 already defines `{ id: finance, name: Finance, short: FIN }`. | **Rule:** Use `track: finance` for Part VI, and `tracks: [finance]` (or `[finance, strategy]`) in chapter frontmatter. |

---

## Exhaustive Specification for Part VI Components

### 1. Table of Contents (`content/toc.yml`)

Part VI must be inserted immediately following Part V (Product Management) and preceding Inserts. Inserts must be shifted to Part VII:

```yaml
  - id: p6
    n: VI
    title: Finance & Banking
    track: finance
    deck: Algorithmic credit risk, high-stakes FP&A deal copilots, financial crime under RBI FREE-AI, and the finance casebook.
    chapters:
      - id: algorithmic-underwriting-and-credit-risk
        title: "Algorithmic underwriting & credit risk: from logistic regression to foundation models"
        deck: "Why a 50 bps reduction in credit default rates pays for a bank's entire AI stack: Basel III/IV capital adequacy, IFRS 9 expected credit loss, explainability versus accuracy (SHAP/LIME), and unstructured document underwriting."
        tracks: [finance]
        prereq: [kinds-of-ai, your-documents]
        status: draft
      - id: financial-copilots-and-deal-diligence
        title: "GenAI in high-stakes finance: FP&A, deal diligence, and autonomous copilots"
        deck: "Zero tolerance for hallucination in corporate finance: automated spreading in Virtual Data Rooms, deterministic tool-calling sandboxes, auditing earnings calls, and AI-assisted LBO/DCF financial modeling."
        tracks: [finance, strategy]
        prereq: [delegation-brief, judging-output]
        status: draft
      - id: financial-crime-fraud-and-rbi-free-ai
        title: "Financial crime, fraud, and the regulatory boundary: RBI FREE-AI, AML, and explainability"
        deck: "Mule accounts and real-time transaction laundering on UPI, the base rate fallacy in fraud alerts, RBI FREE-AI governance principles, SEBI algorithmic trading safeguards, and DPDP financial data sovereignty."
        tracks: [finance]
        prereq: [judging-output, models-that-act]
        status: draft
      - id: finance-casebook
        title: "The Finance AI casebook & interview room"
        deck: "Eight fully-worked quantitative finance cases and estimation problems covering SME credit scoring ROI, PE buyout due diligence, retail robo-advisory economics, AML false-positive optimization, and private banking cloud capex."
        tracks: [finance]
        prereq: [algorithmic-underwriting-and-credit-risk, financial-copilots-and-deal-diligence, financial-crime-fraud-and-rbi-free-ai]
        status: draft

  - id: p7
    n: VII
    title: Inserts
    track: strategy
    deck: Short, dated pages that the web edition replaces every term.
    chapters:
      - id: state-of-play
        n: A
        title: State of play, November 2026
        deck: The current frontier models and products, with dates. Out of date by design; check the web edition.
        tracks: [consulting]
        pages: 2
        ...
      - id: india-briefing
        n: B
        title: India briefing
        deck: DPDP Act, RBI FREE-AI, the IndiaAI Mission and how India uses AI, in two pages.
        tracks: [consulting, finance]
        pages: 2
        ...
```

---

### 2. Primary Sources & Policy (`content/sources.yml` & `content/source-policy.yml`)

#### Sources to Ingest into `content/sources.yml`:

```yaml
rbi-free-ai-2025:
  type: report
  title: "Report of the Committee on Framework for Responsible and Ethical Enablement of AI in Financial Sector (FREE-AI)"
  creator: "Reserve Bank of India"
  publisher: "Reserve Bank of India"
  year: 2025
  url: https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=61018
  tier: A
  why: "The definitive Indian central bank regulatory framework establishing Fairness, Resilience, Ethics, and Explainability governance standards for banking and fintech AI systems."
  verified: true

bis-ml-credit-risk:
  type: paper
  title: "Machine learning in credit risk: explainability, accuracy and regulatory capital"
  creator: "Bank for International Settlements"
  publisher: "BIS"
  year: 2023
  url: https://www.bis.org/publ/work1102.htm
  tier: A
  why: "Analyzes the mathematical trade-off between machine learning predictive accuracy and Basel capital adequacy requirements, focusing on explainable AI in credit default modeling."
  verified: true

jpmorgan-ai-finance:
  type: paper
  title: "Large Language Models in Financial Services: Opportunities, Risks, and Future Directions"
  creator: "J.P. Morgan AI Research"
  publisher: "J.P. Morgan"
  year: 2024
  url: https://arxiv.org/abs/2407.13482
  tier: A
  why: "Foundational industry paper on LLM architecture for automated financial spreading, table reasoning, and hallucination containment in corporate finance."
  verified: true

ifrs-9-financial-instruments:
  type: report
  title: "IFRS 9 Financial Instruments: Expected Credit Loss Guidelines"
  creator: "International Accounting Standards Board"
  publisher: "IFRS Foundation"
  year: 2014
  url: https://www.ifrs.org/issued-standards/standard-list/ifrs-9-financial-instruments/
  tier: A
  why: "Mandates the forward-looking Expected Credit Loss (ECL = EAD x PD x LGD) staging framework for banking asset provisioning."
  verified: true

sebi-algo-trading-guidelines:
  type: report
  title: "Consultation Paper on Algorithmic Trading and AI Disclosures in Indian Securities Markets"
  creator: "Securities and Exchange Board of India"
  publisher: "SEBI"
  year: 2024
  url: https://www.sebi.gov.in/reports-and-statistics/reports/dec-2024/consultation-paper-on-algorithmic-trading-and-ai-disclosures_89842.html
  tier: A
  why: "Defines testing, auditability, and circuit breaker mandates for algorithmic execution systems and AI deployment in Indian capital markets."
  verified: true
```

#### Domain Allowlist additions in `content/source-policy.yml`:
Under `A:` list:
- `bis.org`
- `ifrs.org`
(`rbi.org.in`, `sebi.gov.in`, `arxiv.org`, `meity.gov.in` are already present).

---

### 3. Technical Glossary (`content/glossary.yml`)

Append the following 8 entries to `content/glossary.yml`:

```yaml
credit-underwriting-engine:
  term: Credit underwriting engine
  def: A decisioning pipeline combining historical borrower repayment data, credit bureau scores, and automated income verification to calculate default risk and approve or decline loan applications.

probability-of-default:
  term: Probability of default (PD)
  def: The calculated statistical likelihood (between 0% and 100%) that a borrower will fail to meet scheduled contractual debt repayments over a specified time horizon, typically one year.

loss-given-default:
  term: Loss given default (LGD)
  def: The percentage of total exposure that a lender writes off as an unrecoverable economic loss after collateral liquidation and recovery efforts following a borrower default.

expected-credit-loss:
  term: Expected credit loss (ECL)
  def: The statutory forward-looking credit provision mandated by IFRS 9, calculated as the product of Exposure at Default (EAD), Probability of Default (PD), and Loss Given Default (LGD).

financial-spreading:
  term: Financial spreading
  def: The systematic extraction and normalization of balance sheet, income statement, and cash flow data from unstructured financial reports into standardized accounting templates for credit and valuation analysis.

rbi-free-ai:
  term: RBI FREE-AI framework
  def: The Reserve Bank of India regulatory governance principles requiring financial AI systems to demonstrate Fairness, Resilience, Ethics, and Explainability before deployment.

mule-account-detection:
  term: Mule account detection
  def: Algorithmic identification of bank or payment accounts recruited by criminal networks to receive and rapidly layer illicit funds, typically flagged using graph topology and liquidity velocity anomalies.

explainable-ai-finance:
  term: Explainable AI in finance (XAI)
  def: Algorithmic methods (such as SHAP values, LIME, or Weight of Evidence) that attribute model credit decisions or fraud flags to specific input features, satisfying statutory adverse action notice requirements.
```

---

### 4. Chapter 1: `algorithmic-underwriting-and-credit-risk.md`

- **Frontmatter:**
  ```yaml
  ---
  id: algorithmic-underwriting-and-credit-risk
  title: "Algorithmic underwriting & credit risk: from logistic regression to foundation models"
  deck: "Why a 50 bps reduction in credit default rates pays for a bank's entire AI stack: Basel III/IV capital adequacy, IFRS 9 expected credit loss, explainability versus accuracy (SHAP/LIME), and unstructured document underwriting."
  level: Zero to one
  tracks: [finance]
  prereq: [kinds-of-ai, your-documents]
  hook: "Why a 50 bps reduction in gross non-performing assets (GNPAs) delivers more profit to a ₹50,000 crore bank than doubling its digital marketing budget—and why credit risk committees reject LLM 'black boxes'."
  objectives:
    - "**Deconstruct** the regulatory tension between predictive model performance and statutory explainability under Basel III/IV capital adequacy frameworks."
    - "**Derive** the expected credit loss ($ECL$) formulation under IFRS 9, modeling the interaction between Probability of Default ($PD$), Loss Given Default ($LGD$), and Exposure at Default ($EAD$)."
    - "**Evaluate** post-hoc explainability techniques (SHAP and LIME) versus intrinsically interpretable Generalized Additive Models (GAMs) in statutory adverse action notices."
    - "**Architect** a dual-core underwriting pipeline integrating classical tree-based tabular credit engines with multimodal foundation models for unstructured GSTN, bank statement, and collateral analysis."
  ---
  ```
- **Lede & Core Thesis:**
  - Lede grounding: ₹50,000 crore bank balance sheet economics. A 50 bps reduction in GNPA on a ₹50,000 crore loan book preserves ₹250 crore in pretax earnings directly, bypassing customer acquisition marketing costs.
  - Thesis: `==In retail and commercial banking, predictive underwriting models do not merely forecast credit defaults—they directly determine regulatory capital adequacy ratios, loan provisioning charges, and institutional solvency.==`
- **First Principles Block (`::: principle The credit risk and explainability trade-off`):**
  1. Credit underwriting is an asymmetric risk game: upside is capped at the interest spread ($2\%\text{--}4\%$), while downside is total capital loss ($100\%$).
  2. Statutory regulations (Basel III/IV Internal Ratings-Based approach and RBI prudential norms) mandate that every credit model's risk parameters be mathematically auditable.
  3. Non-linear ensemble algorithms (XGBoost, neural networks) improve discriminatory power ($AUC$) over classical logistic regression by capturing cross-variable interactions.
  4. Foundation models excel at digesting unstructured collateral deeds, GST e-invoices, and litigation databases, but lack deterministic mathematical guarantees.
  5. Therefore, production underwriting requires a dual-core architecture: an upstream unstructured feature intelligence engine feeding a deterministic, explainable risk core.
- **Concepts:**
  - `::: concept Expected credit loss and credit staging` (IFRS 9 Stages 1, 2, 3; 12-month vs lifetime ECL).
  - `::: concept SHAP values and local explainability` (cooperative game theory Shapley values attributing margin contribution).
- **Mathematical Formulations:**
  - IFRS 9 Expected Credit Loss:
    $$ECL = EAD \times PD \times LGD$$
  - Multi-period Lifetime ECL:
    $$ECL_{\text{lifetime}} = \sum_{t=1}^{T} \frac{EAD_t \times PD_t \times LGD_t}{(1 + r)^t}$$
  - Logistic Regression Log-Odds:
    $$\ln\left(\frac{p}{1 - p}\right) = \beta_0 + \sum_{i=1}^{k} \beta_i x_i$$
  - Weight of Evidence ($WoE$) & Information Value ($IV$):
    $$WoE_i = \ln\left(\frac{\% \text{ Non-Defaults}_i}{\% \text{ Defaults}_i}\right),\quad IV = \sum_{i=1}^{m} \left( \% \text{ Non-Defaults}_i - \% \text{ Defaults}_i \right) \times WoE_i$$
  - Shapley Attribution Value:
    $$\phi_i(x) = \sum_{S \subseteq F \setminus \{i\}} \frac{|S|!(|F| - |S| - 1)!}{|F|!} \left[ f(S \cup \{i\}) - f(S) \right]$$
  - Capital Adequacy / RWA Relief:
    $$\text{Capital Relief} = \Delta \text{GNPA} \times RWA_{\text{multiplier}} \times \text{Tier 1 Ratio}$$
- **Figure:** `{{figure credit-underwriting-stack | Dual-core algorithmic credit underwriting architecture: Combining Basel-compliant classical risk scoring with multimodal document intelligence. | Sources: Bank for International Settlements (2023); Reserve Bank of India (2025)}}`
- **Stat Block:** `::: stat 50 bps & ₹250 Cr` highlighting the balance sheet impact of default rate compression on a ₹50,000 crore loan book.
- **Worked Case:** `::: case Illustrative · SME loan pipeline turnaround at an Indian private bank`
  ₹12,000 crore SME loan book; 18 days to 48 hours TAT; GNPA reduced from 3.80% to 3.15% (65 bps reduction = ₹78 crore annual provisioning savings).
- **Lenses:** `::: lens finance`, `::: lens consulting`, `::: lens strategy`.
- **Interview Block:** `::: interview Auditing an NBFC's autonomous AI lending agent`
  CRO advice on aggressive fintech replacing credit committee with an LLM.
- **Try It Block:** `::: try Auditing loan rejection adverse action notices`
  Non-technical prompt auditing SHAP feature attributions and drafting RBI-compliant adverse action notices.
- **Media Cards:** `{{paper bis-ml-credit-risk}}`, `{{report ifrs-9-financial-instruments}}`.
- **Check Yourself:** 5 questions (recall, apply, explain, transfer, judge) + `::: answers` + `::: recap The night-before page` (5 lines).

---

### 5. Chapter 2: `financial-copilots-and-deal-diligence.md`

- **Frontmatter:**
  ```yaml
  ---
  id: financial-copilots-and-deal-diligence
  title: "GenAI in high-stakes finance: FP&A, deal diligence, and autonomous copilots"
  deck: "Zero tolerance for hallucination in corporate finance: automated spreading in Virtual Data Rooms, deterministic tool-calling sandboxes, auditing earnings calls, and AI-assisted LBO/DCF financial modeling."
  level: Zero to one
  tracks: [finance, strategy]
  prereq: [delegation-brief, judging-output]
  hook: "An investment banking analyst spends 80 hours spreading financial statements across 15 target subsidiaries; an LLM does it in 3 minutes—but inverts an EBITDA adjustment that swings enterprise valuation by ₹500 crore."
  objectives:
    - "**Deconstruct** the architectural requirements of zero-tolerance financial workflows, contrasting stochastic natural language generation with deterministic code execution."
    - "**Formulate** the end-to-end automated financial spreading pipeline across Virtual Data Rooms (VDRs), preserving cell-level audit lineage from primary SEC/MCA filings to financial models."
    - "**Audit** generative AI outputs across high-stakes earnings calls, debt covenant compliance, and M&A quality of earnings (QoE) analyses."
    - "**Design** an enterprise governance framework combining multi-agent reconciliation with human-in-the-loop audit gates for PE buyout and corporate FP&A models."
  ---
  ```
- **Lede & Core Thesis:**
  - High stakes of corporate finance: $1 + 1 = 2$ always. Fuzzy approximation acceptable in marketing copy is fatal in an M&A financial model.
  - Thesis: `==In corporate finance and investment banking, generative models must never calculate financial figures directly; they must function as semantic compilers that extract structured facts and emit deterministic code executed inside auditable computational sandboxes.==`
- **First Principles Block (`::: principle The deterministic computation boundary`):**
  1. Financial accounting is an exact, double-entry deterministic algebra governed by strict conservation laws: $Assets = Liabilities + Equity$.
  2. Autoregressive language models predict probability distributions over tokens; they do not perform formal arithmetic calculation.
  3. Inverting an EBITDA adjustment in an acquisition multiplies through the enterprise valuation by the exit multiple ($M_{\text{EV/EBITDA}}$).
  4. Cell-level provenance (linking every number to its source document, page, and bounding box) is the non-negotiable prerequisite for investment committee sign-off.
  5. Therefore, financial copilots must decouple natural language semantic parsing from deterministic numerical execution.
- **Concepts:**
  - `::: concept Financial spreading and layout-aware extraction` (converting unstructured tables into standardized GAAP/Ind-AS charts of accounts).
  - `::: concept Cell-level audit lineage` (bounding box provenance metadata tracing every model cell to audited PDF coordinates).
- **Mathematical Formulations:**
  - Free Cash Flow to Firm ($FCFF$):
    $$FCFF = \text{EBIT} \times (1 - t) + D\&A - \text{CapEx} - \Delta NWC$$
  - DCF Enterprise Valuation:
    $$EV = \sum_{t=1}^{T} \frac{FCFF_t}{(1 + WACC)^t} + \frac{FCFF_{T+1}}{(WACC - g) \cdot (1 + WACC)^T}$$
  - Weighted Average Cost of Capital ($WACC$):
    $$WACC = \frac{E}{V} \times r_e + \frac{D}{V} \times r_d \times (1 - t)$$
  - LBO Multiple on Invested Capital ($MoIC$) and IRR:
    $$MoIC = \frac{\text{Exit Equity Value}}{\text{Entry Equity Value}},\quad IRR = (MoIC)^{1/n} - 1$$
  - Valuation Sensitivity to EBITDA Adjustments:
    $$\Delta EV = \Delta \text{EBITDA}_{\text{adj}} \times M_{\text{EV/EBITDA}}$$
- **Figure:** `{{figure financial-copilot-architecture | Zero-tolerance financial copilot architecture: Layout-aware VDR ingestion, deterministic code sandboxes, and cell-level audit lineage. | Sources: J.P. Morgan AI Research (2024); Morgan Stanley Research (2024)}}`
- **Stat Block:** `::: stat 80 hrs to 3 min` illustrating the compression in financial spreading cycle time alongside the risk multiplier of unchecked hallucinations.
- **Worked Case:** `::: case Illustrative · 14-day buyout diligence on an Indian healthcare chain`
  ₹2,000 crore healthcare chain acquisition; 4,500 leases analyzed; unearths ₹74 crore unaccrued contingent lease liability in footnote 14(b), preserving private equity fund IRR of 24%.
- **Lenses:** `::: lens finance`, `::: lens consulting`, `::: lens strategy`.
- **Interview Block:** `::: interview Designing an audit framework for an enterprise FP&A copilot`
  Designing a zero-hallucination framework for a 100-person FP&A team.
- **Try It Block:** `::: try Auditing an earnings call transcript for hidden guidance risks`
  MBA-friendly prompt to reconcile executive commentary with 10-Q footnotes.
- **Media Cards:** `{{paper jpmorgan-ai-finance}}`.
- **Check Yourself:** 5 questions + `::: answers` + `::: recap The night-before page` (5 lines).

---

### 6. Chapter 3: `financial-crime-fraud-and-rbi-free-ai.md`

- **Frontmatter:**
  ```yaml
  ---
  id: financial-crime-fraud-and-rbi-free-ai
  title: "Financial crime, fraud, and the regulatory boundary: RBI FREE-AI, AML, and explainability"
  deck: "Mule accounts and real-time transaction laundering on UPI, the base rate fallacy in fraud alerts, RBI FREE-AI governance principles, SEBI algorithmic trading safeguards, and DPDP financial data sovereignty."
  level: Zero to one
  tracks: [finance]
  prereq: [judging-output, models-that-act]
  hook: "In 45 minutes, a coordinated cyber-syndicate routes ₹120 crore through 8,000 mule accounts across 12 digital payment apps. Legacy rules flag 15%; Graph AI identifies 88%—while generating 40,000 false alarms."
  objectives:
    - "**Expose** the mathematical base rate fallacy in financial fraud detection, quantifying the operational burden of false positives in high-throughput payment rails."
    - "**Analyze** graph representation learning and Graph Neural Networks (GNNs) for detecting mule account networks and real-time transaction laundering on UPI."
    - "**Deconstruct** the Reserve Bank of India (RBI) FREE-AI Committee regulatory framework: Fairness, Resilience, Ethics, and Explainability."
    - "**Synthesize** anti-money laundering (AML) operations with statutory data sovereignty under the Digital Personal Data Protection (DPDP) Act and SEBI algorithmic trading directives."
  ---
  ```
- **Lede & Core Thesis:**
  - Real-time digital payments at Indian scale (UPI processing >15 billion transactions monthly). Fraud syndicates exploit sub-second settlement times.
  - Thesis: `==In high-velocity financial crime detection, isolated transaction scoring fails against organized criminal networks; defense requires streaming graph topology intelligence governed by strict asymmetric loss matrices and statutory explainability standards.==`
- **First Principles Block (`::: principle The base rate dilemma and asymmetric loss`):**
  1. Fraud in modern payment rails is an extreme rare-event problem, with base rates often below 0.01% of all transactions.
  2. In low base-rate environments, even highly specific models ($99\%$ specificity) yield precision below $10\%$, flooding compliance teams with false alarms.
  3. The cost matrix in financial fraud is deeply asymmetric: freezing legitimate user accounts destroys customer lifetime value, while missing an AML ring brings statutory regulatory penalties.
  4. Mule networks evade rule-based thresholds by executing micro-structuring (smurfing) across thousands of synthetic identities.
  5. Therefore, effective AML defense requires topological graph analytics coupled with calibrated operating thresholds and human statutory review.
- **Concepts:**
  - `::: concept The base rate fallacy in fraud detection` (derivation of posterior probability under extreme class imbalance).
  - `::: concept Mule accounts and graph topology` (cyclic transaction rings, flow velocity $R_{\text{velocity}}$, Jan Dhan exploitation).
- **Mathematical Formulations:**
  - Bayes Posterior Precision:
    $$P(\text{Fraud} \mid \text{Alert}) = \frac{P(\text{Alert} \mid \text{Fraud}) \cdot P(\text{Fraud})}{P(\text{Alert} \mid \text{Fraud}) \cdot P(\text{Fraud}) + P(\text{Alert} \mid \text{Legit}) \cdot P(\text{Legit})}$$
    Worked demonstration showing 99% accuracy yielding under 1% precision when base rate $\pi = 0.0001$.
  - Asymmetric Operational Loss Function:
    $$\text{Expected Loss} = C_{\text{FP}} \cdot \text{FPR} \cdot (1 - \pi) + C_{\text{FN}} \cdot (1 - \text{TPR}) \cdot \pi$$
  - Liquidity Velocity and Graph In-Out Balance:
    $$R_{\text{velocity}} = \frac{|\Delta \text{Balance}_{\text{in}} - \Delta \text{Balance}_{\text{out}}|}{\Delta t}$$
  - Graph Community Density:
    $$\text{Density} = \frac{2|E|}{|V|(|V| - 1)}$$
- **Figure:** `{{figure aml-fraud-detection-funnel | Real-time AML and fraud detection funnel: Streaming graph anomaly detection, high-recall triage, and automated narrative STR generation under RBI FREE-AI. | Sources: Reserve Bank of India (2024, 2025); FIU-IND (2024)}}`
- **Stat Block:** `::: stat 0.98% & 98.4%` illustrating the posterior precision of a 99% accurate model operating at a 0.01% base rate, alongside the false alarm burden on AML desks.
- **Worked Case:** `::: case Illustrative · Real-time UPI mule ring detection at an Indian payment gateway`
  40 million UPI payments/day; ₹50 crore syndicate laundering attempt frozen across 4,200 accounts within 30 minutes; ₹43.5 crore preserved.
- **Lenses:** `::: lens finance`, `::: lens consulting`, `::: lens strategy`.
- **Interview Block:** `::: interview Defending an adverse action model before the RBI regulator`
  Responding to regulatory audit demand for black-box neural network explanations.
- **Try It Block:** `::: try Calibrating a fraud detection decision threshold under asymmetric loss`
  Non-technical prompt simulating optimal threshold calibration on an AML alert queue.
- **Media Cards:** `{{report rbi-free-ai-2025}}`, `{{report sebi-algo-trading-guidelines}}`.
- **Check Yourself:** 5 questions + `::: answers` + `::: recap The night-before page` (5 lines).

---

### 7. Chapter 4: `finance-casebook.md`

- **Frontmatter:**
  ```yaml
  ---
  id: finance-casebook
  title: "The Finance AI casebook & interview room"
  deck: "Eight fully-worked quantitative finance cases and estimation problems covering SME credit scoring ROI, PE buyout due diligence, retail robo-advisory economics, AML false-positive optimization, and private banking cloud capex."
  level: Advanced
  tracks: [finance]
  prereq: [algorithmic-underwriting-and-credit-risk, financial-copilots-and-deal-diligence, financial-crime-fraud-and-rbi-free-ai]
  hook: "A private equity partner or bank Chief Risk Officer asks you: 'We are allocating ₹150 crore of capital to modernize our commercial underwriting, deal diligence, and compliance stack with AI. Walk me through the exact unit economics, capital adequacy relief, false-positive tradeoffs, and 3-year TCO. Prove to me this investment creates real enterprise value.' How do you structure your answer?"
  objectives:
    - "**Deconstruct** ambiguous financial decisions into rigorous, audit-proof quantitative models linking AI deployment directly to ROE, GNPA reduction, and regulatory capital relief."
    - "**Master** the four strategic corporate finance cases: commercial SME lending ROI, PE buyout due diligence, retail robo-advisory economics, and AML false-positive optimization."
    - "**Execute** quantitative estimations across private bank AI TCO, automated debt covenant monitoring, NBFC back-office automation valuation, and algorithmic trading liquidity shock buffers."
    - "**Synthesize** regulatory mandates (RBI FREE-AI, Basel III/IV, IFRS 9) with balance-sheet impact to defend high-stakes financial proposals in investment committees and executive interviews."
  ---
  ```
- **Lede & Core Thesis:**
  - Executive finance interview expectation: quantitative rigor, balance sheet mechanics, capital adequacy math, and zero hand-waving.
  - Thesis: `==In executive financial leadership and investment banking, artificial intelligence cannot be justified by qualitative buzzwords; every system deployment must be proven through auditable unit economics, risk-weighted asset reduction, and verifiable return on equity expansion.==`
- **First Principles Block (`::: principle The quantitative laws of AI in corporate finance`):**
  1. Capital is expensive; every rupee invested in AI infrastructure must yield a risk-adjusted return exceeding the bank's weighted cost of capital.
  2. Credit default reduction directly releases Tier 1 regulatory capital under Basel III/IV capital adequacy rules.
  3. In high-volume compliance and fraud operations, reducing false positives by 70%+ frees expensive analyst headcount while compressing regulatory non-compliance exposure.
  4. In M&A and private equity, compressing diligence cycle time allows investment firms to evaluate more proprietary opportunities and uncover hidden liabilities before closing.
  5. Therefore, AI project valuation must incorporate balance-sheet provision savings, operational cost reduction, and capital adequacy relief into a unified DCF model.
- **Concepts:**
  - `::: concept Quantitative Finance Case Methodology` (deconstructing high-stakes finance problems into mathematical formulas and balance-sheet impact).
- **Stat Block:** `::: stat ₹22.5 Cr & 74.6%` highlighting annual credit loss savings on a ₹10,000 crore SME loan book alongside the false-positive reduction in AML operations.
- **The 8 Quantitative Cases & Estimation Models:**
  1. `::: case Case 1: Commercial SME lending automated underwriting ROI and GNPA reduction`
     - Portfolio: ₹10,000 crore SME loan book, average ticket size ₹1.5 crore (~6,667 loans).
     - Baseline GNPA: 3.40% (₹340 Cr defaulted loans); Provisioning cost ($LGD = 50\%$): ₹170 crore.
     - Dual-core underwriting (automated GSTN e-way bill analysis + bank statement cash-flow triangulation) reduces GNPA by 45 bps (from 3.40% to 2.95%).
     - Annual credit provision savings: $\text{₹}10{,}000\text{ Cr} \times 0.0045 \times 0.50 = \mathbf{\text{₹}22.5\text{ crore/year}}$.
     - Underwriting turnaround time (TAT) compressed from 14 days to 48 hours; loan origination volume grows 18% (generating ₹27 Cr incremental net interest income).
     - 3-year AI implementation TCO: ₹4.8 Cr capex + ₹1.2 Cr/yr opex. Net 3-year NPV exceeds ₹100 crore.
  2. `::: case Case 2: Private equity M&A due diligence and post-acquisition synergy realization`
     - Buyout target: ₹1,500 Cr ARR enterprise software firm acquired at $6\times$ ARR (₹9,000 Cr EV).
     - Virtual Data Room copilot ingests 12,000 commercial contracts and customer MSAs across 15 subsidiaries in 5 days (vs 4 weeks manual diligence).
     - Identifies unaccrued customer churn clauses and ₹38 crore in duplicate cloud vendor licenses.
     - Post-buyout AI deployment across customer success and code engineering lowers operating expenses by 14% (saving ₹84 crore annually), lifting EBITDA margin from 22% to 36% (EBITDA expands from ₹330 Cr to ₹540 Cr).
     - Net equity value creation upon exit at $12\times$ EBITDA: $(₹540 - ₹330)\text{ Cr} \times 12 = \mathbf{\text{₹}2{,}520\text{ crore}}$.
  3. `::: case Case 3: Retail wealth management hybrid robo-advisory economics`
     - Wealth management practice managing ₹40,000 crore AUM across 80,000 affluent clients (₹50 lakh average account balance).
     - Baseline traditional model: 200 Relationship Managers (RMs), each servicing 400 clients. RM compensation = ₹25 lakh/year (₹50 crore annual personnel spend). Churn = 12% annually.
     - Hybrid AI copilot model: automated daily portfolio rebalancing diagnostics, tax-loss harvesting notifications, and personalized market briefs. RM capacity triples from 400 to 1,200 clients.
     - Headcount optimizes to 80 senior RMs (saving ₹30 crore annually in personnel costs).
     - Client annual churn drops from 12% to 6.5%, preserving ₹2,200 crore in AUM and generating ₹17.6 crore in incremental annual advisory fees (at 80 bps fee).
     - Total annual bottom-line benefit: $\text{₹}30\text{ Cr} + \text{₹}17.6\text{ Cr} = \mathbf{\text{₹}47.6\text{ crore/year}}$.
  4. `::: case Case 4: Fraud and AML operations false-positive optimization under RBI rules`
     - Bank processes 250 million retail and UPI payments monthly.
     - Legacy rule-based alerts: 0.35% flag rate = 875,000 alerts monthly; 98.4% false positive rate (only 14,000 true fraud cases; 861,000 false alarms).
     - Human manual review cost = ₹85 per alert $\implies 875{,}000 \times \text{₹}85 = \mathbf{\text{₹}7.4375\text{ crore/month}}$ (₹89.25 crore/year).
     - Deploys streaming Graph Neural Network + LLM automated narrative triage: automatically clears 72% of obvious false positives (620,000 alerts at ₹1.50 compute cost), routing 255,000 high-risk alerts to human investigators with auto-drafted STR dossiers.
     - New monthly operational spend: $(620{,}000 \times \text{₹}1.50) + (255{,}000 \times \text{₹}85) = \text{₹}0.093\text{ Cr} + \text{₹}2.1675\text{ Cr} = \mathbf{\text{₹}2.2605\text{ crore/month}}$.
     - Net monthly operational savings: $\text{₹}7.4375\text{ Cr} - \text{₹}2.2605\text{ Cr} = \mathbf{\text{₹}5.177\text{ crore/month}}\quad (\mathbf{\text{₹}62.12\text{ crore/year}}\text{ savings})$.
  5. `::: case Estimation 1: Sizing 3-year TCO for on-premise private AI cluster vs cloud API`
     - Indian scheduled commercial bank evaluates on-premise GPU cluster (4x NVIDIA H100 8-GPU nodes) vs private Azure/AWS Mumbai cloud APIs for 15 million monthly internal banking document and query tasks.
     - Capital and operating cost modeling: hardware capex ($1.4M), datacenter power/cooling (35 kW continuous = $110,000/yr), MLOps engineering staff (3 FTEs = $450,000/yr), continuous fine-tuning vs variable token API billing ($0.008/query).
     - Derivation of the exact crossover transaction volume ($V^* \approx 18.2\text{M queries/month}$) and calculation of the regulatory data localization sovereignty premium under the DPDP Act.
  6. `::: case Estimation 2: Estimating financial value of automated debt covenant monitoring`
     - Wholesale banking portfolio of ₹50,000 crore across 450 corporate borrowers.
     - Covenants: Debt/EBITDA $< 3.5\times$, Interest Coverage $> 2.5\times$, Current Ratio $> 1.25$.
     - Manual compliance audits happen quarterly with 60–90 days lag; late breach detection inflates default losses ($LGD$ jumps from 35% to 55% on distressed accounts).
     - Autonomous agent continuously monitors GSTN filings, MCA-21 disclosures, stock exchange updates, and banking transactions, detecting technical covenant breaches within 72 hours.
     - Quantifying early restructuring cure rate (40% of distressed accounts cured before default) and calculating the net annual provisioning reduction of ₹42.5 crore.
  7. `::: case Estimation 3: Valuation impact of AI back-office automation on a mid-sized NBFC`
     - Mid-sized NBFC with ₹8,000 crore loan book, 1,200 back-office operations employees (document verification, loan servicing, collections outreach, NOC processing).
     - Cost-to-income (C/I) ratio is 44%; operating expense is ₹160 crore annually.
     - AI automation across document OCR, conversational collections bots, and automated NOC/clearance certificates reduces back-office headcount demand by 38% over 3 years.
     - Operating costs decrease by ₹54 crore annually; Cost-to-income ratio improves from 44% to 35%.
     - Steady ROE expansion from 14% to 18.5% drives price-to-book ($P/B$) rerating from $1.8\times$ to $2.3\times$, expanding equity market capitalization by ₹680 crore.
  8. `::: case Estimation 4: Capital buffer required for algorithmic trading liquidity shocks`
     - Institutional broker-dealer and high-frequency market-making desk trading ₹10,000 crore daily turnover on NSE/BSE.
     - Correlated algorithmic stop-loss cascades and multi-agent liquidation spirals can cause order book depth to evaporate within 90 seconds.
     - Value-at-Risk ($VaR_{99\%}$) and Stressed Expected Shortfall ($ES_{99\%}$) modeling under extreme liquidity dry-ups.
     - Derive the mandatory regulatory capital liquidity buffer (₹145 crore dedicated liquid margin) required under SEBI algorithmic trading guidelines to survive a $5\sigma$ liquidity dry-up without triggering broker-dealer insolvency.
- **Lenses:** `::: lens finance`, `::: lens consulting`.
- **Interview Block:** `::: interview Pitching an enterprise AI transformation to the bank board`
  Structuring the pitch to the board of directors connecting AI investments to ROE, GNPA reduction, and regulatory compliance.
- **Try It Block:** `::: try Building a quantitative finance AI business case`
  MBA-friendly prompt simulating an investment committee defense for a ₹150 crore bank AI modernization plan.
- **Media Cards:** `{{paper bis-ml-credit-risk}}`, `{{report rbi-free-ai-2025}}`.
- **Check Yourself:** 5 questions + `::: answers` + `::: recap The night-before page` (5 lines).

---

### 8. Vector SVG Figures Specification

All figures must use standard dimensions (`viewBox="0 0 640 330"` or `640 360`), include accessible `role="img"` and descriptive `aria-label`, and leverage compendium CSS classes for typography, surfaces, and accents:
- `t-display` for section titles (serif headline)
- `paper acc-s` for standard card surfaces with accent border
- `wash acc-s` for highlighted/active stages
- `rule-s` for connecting lines and arrows
- `ink` / `ink-s` for neutral typography and borders
- `acc` / `acc-s` for cobalt brand accents (`#2337E6`)

#### Figure 1: `content/figures/credit-underwriting-stack.svg`
- **File:** `content/figures/credit-underwriting-stack.svg`
- **Header:** "Dual-Core Algorithmic Credit Underwriting Architecture"
- **Left Panel (Core A - Structured Classical Risk Core):**
  - Bureau Data (CIBIL/Experian), Historical Repayment Ledger, Debt-to-Income, Bank Accounts.
  - Algorithms: Logistic Regression, XGBoost, Weight of Evidence (WoE) Scorecards.
  - Regulatory Properties: Monotonicity constraints, Basel III/IV Internal Ratings-Based (IRB) compliance, deterministic PD & LGD calculations.
- **Right Panel (Core B - Unstructured GenAI Document Radar):**
  - Unstructured Inputs: GSTN e-way bills, 12-month bank statement PDF transactions, legal property title deeds, MCA filings, court litigation registries.
  - Algorithms: Layout-aware OCR, table extraction, multi-agent cash-flow reconciliation, anomaly detection.
  - Output: Structured risk signals and anomaly flags feeding Core A.
- **Central Synthesis & Governance Layer:**
  - SHAP/LIME Feature Attribution Engine.
  - Statutory Adverse Action Reason Code Generator (RBI / ECOA compliant).
  - Human Credit Underwriter Heads-Up Display (HUD).
- **Bottom Output Channels:**
  - Tier 1: Auto-Approve (Low Risk, High Confidence).
  - Tier 2: Human Credit Committee Review (Borderline / High Exposure > ₹25 Lakh).
  - Tier 3: Auto-Decline with Actionable Adverse Action Notice.

#### Figure 2: `content/figures/financial-copilot-architecture.svg`
- **File:** `content/figures/financial-copilot-architecture.svg`
- **Header:** "Zero-Tolerance Financial Copilot Architecture"
- **Sub-header / Principle:** "Decoupling Stochastic Natural Language Understanding from Deterministic Numerical Computation"
- **Horizontal 5-Stage Pipeline:**
  1. *Stage 1: Unstructured VDR Ingestion* (10-K, 10-Q, MCA-21, CIM, audit notes, balance sheet scans).
  2. *Stage 2: Layout-Aware Table Extraction* (Spatial bounding-box coordinate anchoring, header hierarchy parsing, footnote tagging).
  3. *Stage 3: LLM Semantic Compiler & Formula Planner* (Translates finance analyst prompts into deterministic Python/Pandas/Excel formulas—NEVER emits bare numbers).
  4. *Stage 4: Deterministic Sandbox Tool Execution* (Isolated computational sandbox evaluates formulas: $1 + 1 = 2$, double-entry balance check).
  5. *Stage 5: Cell-Level Lineage Verification Gate* (Embeds cryptographic provenance metadata linking each calculated cell back to source document, page, and coordinate rectangle).
- **Final Output:** Audited Financial Model / LBO / DCF Model with click-through source inspector.

#### Figure 3: `content/figures/aml-fraud-detection-funnel.svg`
- **File:** `content/figures/aml-fraud-detection-funnel.svg`
- **Header:** "Real-Time AML & Fraud Detection Funnel under RBI FREE-AI"
- **Layered Funnel Geometry:**
  1. *Ingress Layer (Streaming Payment Rail):* 40,000,000 UPI payments/day; strict sub-50ms latency ceiling.
  2. *Layer 1: Graph Anomaly & Topology Engine:* Sub-50ms graph traversal detecting cyclic transaction rings, abnormal liquidity velocity ($R_{\text{velocity}} \to 0$ in $< 120\text{s}$), and dense mule account clusters.
  3. *Layer 2: High-Recall ML Risk Filter:* Calibrated XGBoost/LightGBM model operating under asymmetric loss matrix; filters top 0.5% suspicious transactions (99.5% legitimate payments pass through uninterrupted).
  4. *Layer 3: Generative AI Narrative STR/SAR Generator:* Aggregates graph topology, KYC history, and transaction anomalies to draft structured Suspicious Transaction Reports for FIU-IND.
  5. *Layer 4: Human AML Compliance Officer Sign-Off:* Mandatory human statutory sign-off enforcing personal legal liability under Indian PMLA.

---

### 9. Pedagogical & Anti-AI Governance Checklist

Every authored chapter must satisfy this 10-point quality contract before submission:

- [ ] **13-Part Chapter Arc:** Opener (`hook`, `objectives`), Lede, Principle, Concept, Figure, Evidence/Stat, Case, Lenses, Interview, Try it, Media cards, Check yourself/Answers, Recap.
- [ ] **Frontmatter Quality:** Explicit `id`, `title`, `deck`, `level`, `tracks: [finance]`, `prereq`, `hook`, and 3–4 `objectives` starting with bold Bloom verbs (`**Deconstruct**`, `**Derive**`, `**Evaluate**`, etc.).
- [ ] **Mayer Signaling:** Exactly 4 to 8 highlighted sentences (`==...==`), with the first highlight being the chapter's thesis in the lede.
- [ ] **Stat Block Invariant:** Exactly one `::: stat` block per chapter with an inline `<span class="src">Source: [@id]</span>`.
- [ ] **Media Cards:** 1 to 3 media cards per chapter (`{{read id}}`, `{{paper id}}`, `{{report id}}`), all present in `content/sources.yml`.
- [ ] **Check Yourself & Inverted Answers:** Exactly 5 questions covering Bloom levels (`<span class="lvl">recall|apply|explain|transfer|judge</span>`) matched with 5 upside-down answers in `::: answers`.
- [ ] **Night-Before Page:** Exactly 5 numbered lines in `::: recap The night-before page`.
- [ ] **Mathematical Rigor:** Display formulas in `$$...$$` and inline math in `$math$`. Zero escaped HTML tag leaks in prose.
- [ ] **No Code in Try It:** Zero Python, JavaScript, or Bash code in `::: try` prompts. Tailored exclusively for MBA students using spreadsheets or conversational prompts.
- [ ] **Anti-AI Writing Standards:** Zero banned tropes ("delve into", "testament to", "fast-paced world", "tapestry of", "game-changer"). Concrete grounding in Indian and global financial institutions (HDFC, ICICI, SBI, Bajaj Finance, Zerodha, JPMorgan, Goldman Sachs, BlackRock, RBI, SEBI, FIU-IND).

---

### 10. Test Specification for `test/e2e-fin.mjs`

Create `test/e2e-fin.mjs` mirroring the 4-tier architecture of `test/e2e-pm.mjs`:

- **Tier 1: Feature Coverage (F01–F12):**
  - `T1.1 (F01)`: Ingestion of canonical finance primary sources in `content/sources.yml`.
  - `T1.2 (F02)`: Allowlist registration of `bis.org` and `ifrs.org` in `content/source-policy.yml`.
  - `T1.3 (F03)`: Technical finance glossary terms in `content/glossary.yml` (all 8 terms, def >= 25 chars).
  - `T1.4 (F04)`: TOC Part VI (Finance & Banking) and Part VII (Inserts) structure and chapter IDs in `content/toc.yml`.
  - `T1.5 (F05)`: Edition bump in `book.yml` to `2027 · Draft 0.4 (Finance Track)` and `finance` track verification.
  - `T1.6 (F06)`: Chapter 22 (`algorithmic-underwriting-and-credit-risk.md`) existence, frontmatter, Bloom verbs.
  - `T1.7 (F07)`: Chapter 23 (`financial-copilots-and-deal-diligence.md`) existence, frontmatter, Bloom verbs.
  - `T1.8 (F08)`: Chapter 24 (`financial-crime-fraud-and-rbi-free-ai.md`) existence, frontmatter, Bloom verbs.
  - `T1.9 (F09)`: Chapter 25 (`finance-casebook.md`) existence, frontmatter, and all 8 quantitative cases.
  - `T1.10 (F10)`: 3 SVG figures in `content/figures/` (`credit-underwriting-stack.svg`, `financial-copilot-architecture.svg`, `aml-fraud-detection-funnel.svg`) with valid `<svg` roots.
  - `T1.11 (F11)`: Referential linter `node scripts/check.mjs` passes with 0 errors.
  - `T1.12 (F12)`: Release packaging readiness: `STATUS.md` updated and `editions/INFERENCE-v4-finance-draft.pdf` exists.
- **Tier 2: Boundary & Corner Cases (Pedagogy & Syntax across all 4 chapters):**
  - `T2.1`: Highlights count in `[4..8]` (`==...==`).
  - `T2.2`: Stat block count `== 1` (`::: stat`).
  - `T2.3`: Media cards count in `[1..3]`.
  - `T2.4`: Check questions count in `[4..6]` with `<span class="lvl">` and `::: answers`.
  - `T2.5`: Night-before recap `== 5` numbered lines.
  - `T2.6`: Escaped HTML tag leak prevention in rendered prose (`&lt;span...&gt;`).
  - `T2.7`: Anti-AI writing style guard (zero banned clichés).
  - `T2.8`: No code in `::: try` prompts.
  - `T2.9`: Valid KaTeX math syntax.
- **Tier 3: Referential Integrity:**
  - `T3.1`: Bidirectional citation ↔ source registry integrity.
  - `T3.2`: Glossary term usage integrity.
  - `T3.3`: SVG figure link integrity.
  - `T3.4`: TOC prerequisite graph validity.
- **Tier 4: Workload & Release Verification:**
  - `T4.1`: Compilation of all 28 chapters in `scripts/build.mjs` in `< 500 ms`.
  - `T4.2`: Web edition `dist/index.html` contains navigation for Part VI and all 4 chapters.
  - `T4.3`: PDF compilation via `scripts/pdf.mjs` outputs valid document.

---

### 11. Build & Release Engineering Specification

1. **Edition Configuration:**
   Update `book.yml`:
   ```yaml
   edition: 2027 · Draft 0.4 (Finance Track)
   ```
2. **Compilation Performance:**
   Ensure `node scripts/build.mjs` executes cleanly in `< 500ms` for all 28 chapters.
3. **PDF Generation & Copying:**
   Run `npm run pdf` and copy the resulting `dist/INFERENCE.pdf` to `editions/INFERENCE-v4-finance-draft.pdf`.
4. **Status Ledger:**
   Update `STATUS.md` with:
   - Part VI status: `draft` $\to$ `final`
   - Total chapters: 28
   - Track word counts and new primary source verification records
5. **Git Release Commit:**
   Stage all files and commit with:
   `feat(finance): complete v4 finance track and integrate into compendium`

---

## Conclusion

The specification for the v4 Finance & Banking Track (Part VI) is completely discovered, rigorously documented, and fully mapped to authoritative sources. The next agents (Canon Researcher, Chapter Author, Editorial Auditor, Build Engineer) have an unambiguous, zero-guesswork blueprint to execute the release.
