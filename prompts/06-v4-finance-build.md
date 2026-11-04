# v4 Build: Finance & Banking Track (End-to-End Teamwork Execution)

> **How to use:** Run the `/teamwork` command in Antigravity or Claude Code with the prompt below, or launch directly in the terminal:
> ```powershell
> agy --model gemini-4-argon -p "Follow prompts/06-v4-finance-build.md to build and integrate the v4 Finance & Banking Track end to end."
> ```

---

## Mission Brief

You are building **v4 of INFERENCE**, expanding the compendium to include the complete **Finance & Banking Track (`FIN`)**.
v1 established Foundations (Parts 0 & I) and Consulting (Parts II & III); v2 delivered Marketing & Brand Strategy (Part IV); v3 delivered Product Management (Part V).
Your objective is to design, research, author, verify, and compile **Part VI: Finance & Banking** into the publication pipeline with zero errors, producing an updated web edition, an updated A4 print edition, and a verified publication PDF.

---

## 1. Governance & Constraints (Zero Violations)

1. **Pedagogical Standard:** Every chapter must strictly follow [`docs/PEDAGOGY.md`](../docs/PEDAGOGY.md) and [`docs/AUTHORING.md`](../docs/AUTHORING.md).
   - Mandatory 13-part chapter arc: Opener (`hook`, `objectives`), Lede with highlighted thesis (`==...==`), First principles (`::: principle`), Concepts (`::: concept`), Scale/complication with SVG figure, Cited evidence, Worked case (`::: case Illustrative · ...`), Domain lenses (`::: lens ...`), Interview room question + strong structure (`::: interview ...`), Try it prompt (`::: try ...`), Watch/Read cards (`{{watch ...}}` / `{{read ...}}`), Check yourself with upside-down answers (`::: check ...` + `::: answers`), Night-before page (`::: recap The night-before page`).
2. **Evidence & Truth:** Follow [`docs/SOURCES.md`](../docs/SOURCES.md).
   - Every single statistic, case study, formula, or regulatory policy must exist in [`content/sources.yml`](../content/sources.yml) with an assigned Tier (`A` or `B`) and be cited inline (`[@id]`) or as a media card.
   - Any scenario without a primary source citation must be explicitly labeled `Illustrative`.
   - Ingest primary canonical sources: Reserve Bank of India (RBI) FREE-AI Committee Report, Bank for International Settlements (BIS) Working Papers on Machine Learning in Credit Risk, J.P. Morgan AI Research / Morgan Stanley financial analyst workflows, SEBI algorithmic trading directives, and DPDP Act financial data localization requirements.
3. **Prose & Anti-AI Standard:** Apply [`anti-ai-writing`](C:/Users/Janmejai/.claude/skills/anti-ai-writing/SKILL.md).
   - Zero empty rhetorical flourishes ("delve", "testament", "tapestry", "fast-paced world").
   - Concrete Indian and global financial context (HDFC Bank, ICICI Bank, State Bank of India, Bajaj Finance, Zerodha, JPMorgan Chase, Goldman Sachs, BlackRock, RBI, SEBI).
   - High perplexity, sharp active verbs, short punchy topic sentences.
4. **Rendering & Math Discipline:**
   - All financial equations (Probability of Default $PD$, Loss Given Default $LGD$, Expected Credit Loss $ECL = EAD \times PD \times LGD$, SHAP attribution values, DCF terminal value formulas, Sharpe ratio adjustments) must use standard LaTeX math (`$$...$$` for display, `$p$` for inline) to render via KaTeX.
   - All comparison grids must use standard GitHub Flavored Markdown tables (`| ... |`). Never use fenced code blocks for tables.
5. **No Code in Chapters:** Non-technical MBA placement candidate audience. "Try it" prompts must use zero code (web interfaces, Custom GPTs, Gemini Gems, Claude Projects, Excel formulas).

---

## 2. Table of Contents: Part VI (Finance & Banking)

Add Part VI to [`content/toc.yml`](../content/toc.yml) before Inserts (shifting Inserts to Part VII):

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
```

---

## 3. Teamwork Subagent Orchestration Plan

The execution decomposes into four autonomous, synchronized agent roles:

```
[Agent 1: Canon & Source Researcher]
       │ (appends sources.yml, source-policy.yml & glossary.yml)
       ▼
[Agent 2: Chapter Author & Drafter]
       │ (drafts content/chapters/*.md, figures/*.svg & updates toc.yml)
       ▼
[Agent 3: Editorial Auditor & Anti-Slop Filter]
       │ (verifies citations, KaTeX math, tables, prose, 46+ E2E tests)
       ▼
[Agent 4: Build Engineer & PDF Verifier]
       │ (runs check, builds web & 450+ page PDF, updates editions/)
       ▼
[Final Git Commit & Push]
```

### Agent 1: Canon & Primary Source Researcher
- **Tasks:**
  1. Ingest primary sources across modern AI finance:
     - Reserve Bank of India (RBI) FREE-AI Committee Report & MuleHunter.AI frameworks.
     - Bank for International Settlements (BIS) Working Papers on Machine Learning in Credit Risk and Basel regulatory capital requirements.
     - J.P. Morgan AI Research on Large Language Models in Financial Services & Automated Financial Statement Spreading.
     - International Financial Reporting Standards (IFRS 9) Financial Instruments — Expected Credit Loss ($ECL$) modeling guidelines.
     - Advertising and market conduct guidelines: SEBI Consultation Papers on Algorithmic Trading and AI Disclosures.
  2. Append all new entries cleanly to [`content/sources.yml`](../content/sources.yml) with exact URLs, authors, publication years, media types (`article`, `paper`, `report`), tiers (`A` or `B`), and a clear `why:` note.
  3. Ensure domains are permitted in [`content/source-policy.yml`](../content/source-policy.yml).
  4. Append key finance terms to [`content/glossary.yml`](../content/glossary.yml):
     - `credit-underwriting-engine`, `probability-of-default`, `loss-given-default`, `expected-credit-loss`, `financial-spreading`, `rbi-free-ai`, `mule-account-detection`, `explainable-ai-finance`.

### Agent 2: Chapter Author & Drafter
- **Tasks:**
  Draft the four Part VI chapters in [`content/chapters/`](../content/chapters/) and create corresponding vector SVGs in [`content/figures/`]:
  1. `algorithmic-underwriting-and-credit-risk.md`:
     - **Hook:** Why a 50 bps reduction in gross non-performing assets (GNPAs) delivers more profit to a ₹50,000 crore bank than doubling its digital marketing budget—and why credit risk committees reject LLM "black boxes".
     - **First Principles:** The regulatory tension between predictive accuracy and statutory explainability. Classical statistical models (Logistic Regression, XGBoost, Weight of Evidence) vs Foundation Models processing unstructured collateral deeds, GST returns, and bank statements.
     - **Concepts:** Probability of Default ($PD$), Loss Given Default ($LGD$), Exposure at Default ($EAD$), Expected Credit Loss ($ECL = EAD \times PD \times LGD$), SHAP/LIME attribution, alternative data risks (UPI velocity, social underwriting).
     - **Figure:** `content/figures/credit-underwriting-stack.svg` (Dual-core architecture: Structured Classical ML Risk Core + Unstructured GenAI Document Intelligence Radar).
     - **Case:** Leading Indian private bank revamp of its ₹12,000 crore SME credit underwriting pipeline.
     - **Interview:** *"An aggressive NBFC fintech wants to replace its entire credit committee with an autonomous LLM agent that scans SMS logs and bank PDFs. Walk me through your advice to the Chief Risk Officer."*
  2. `financial-copilots-and-deal-diligence.md`:
     - **Hook:** An investment banking analyst spends 80 hours spreading financial statements across 15 target subsidiaries; an LLM does it in 3 minutes—but inverts an EBITDA adjustment that swings enterprise valuation by ₹500 crore.
     - **First Principles:** The zero-tolerance boundary: natural language synthesis accommodates fuzzy approximations, but financial accounting requires deterministic precision ($1 + 1 = 2$ always). Bridging LLMs with deterministic code-execution sandboxes (Python/Pandas/Excel tool calling).
     - **Concepts:** Virtual Data Room (VDR) ingestion, automated financial spreading, cell-level audit lineage, synthetic equity research, multi-agent financial reconciliation.
     - **Figure:** `content/figures/financial-copilot-architecture.svg` (Unstructured VDR Ingest $\to$ Table Extraction $\to$ Deterministic Sandbox Tool Execution $\to$ Lineage Verification Gate $\to$ Audited Financial Model).
     - **Case:** Top-tier Private Equity fund conducting 14-day commercial and financial due diligence on a ₹2,000 crore Indian healthcare chain buyout.
     - **Interview:** *"As VP of Finance, you are evaluating an enterprise AI copilot for your 100-person FP&A team. How do you design an audit framework that guarantees zero hallucinated figures reach the Board?"*
  3. `financial-crime-fraud-and-rbi-free-ai.md`:
     - **Hook:** In 45 minutes, a coordinated cyber-syndicate routes ₹120 crore through 8,000 mule accounts across 12 digital payment apps. Legacy rules flag 15%; Graph AI identifies 88%—while generating 40,000 false alarms.
     - **First Principles:** The base rate fallacy in financial fraud: when transaction fraud occurs at 0.01%, even a 99% accurate model yields overwhelming false positive costs. Optimizing the asymmetric loss matrix (freezing genuine customer funds vs allowing illicit flight).
     - **Concepts:** Real-time transaction laundering, synthetic identity fraud, Graph Neural Networks (GNNs), RBI FREE-AI Committee governance mandates, Suspicious Transaction Reports (STRs), DPDP Act data localization.
     - **Figure:** `content/figures/aml-fraud-detection-funnel.svg` (Raw Streaming Transactions $\to$ Graph Anomaly Engine $\to$ High-Recall Filtering $\to$ LLM Narrative STR Drafting $\to$ Human AML Officer Sign-off).
     - **Case:** Large Indian retail payment gateway processing 40 million UPI payments daily deploying real-time fraud mitigation.
     - **Interview:** *"The RBI regulator audits your bank's AI-driven loan rejection model and demands an adverse action notice explanation. The data science team says 'the neural network weights determined high risk.' How do you respond?"*
  4. `finance-casebook.md`:
     - Author 8 complete, original, quantitative cases and guesstimates:
       - *Case 1:* Commercial SME Lending: Quantifying the ROI, default reduction, and operational turnaround time of automated GSTN statement parsing on a ₹10,000 crore loan book.
       - *Case 2:* Private Equity M&A Due Diligence: Evaluating synergy realization and AI adoption costs in an enterprise software acquisition.
       - *Case 3:* Retail Wealth Management: Unit economics, churn, and AUM scalability of hybrid AI robo-advisory vs traditional relationship managers.
       - *Case 4:* Fraud & AML Operations: Optimizing the false-positive investigation cost vs regulatory penalty tradeoff under RBI guidelines.
       - *Guesstimate 1:* Sizing the 3-year total cost of ownership (TCO) for an on-premise private AI cluster vs cloud API for an Indian scheduled commercial bank.
       - *Guesstimate 2:* Estimating the financial value of automated covenant monitoring across a ₹50,000 crore wholesale banking portfolio.
       - *Guesstimate 3:* Valuation impact of AI-driven back-office automation on a mid-sized Indian NBFC.
       - *Guesstimate 4:* Quantifying the capital buffer required to absorb liquidity shocks induced by multi-agent algorithmic trading cascades.

### Agent 3: Editorial Auditor & Anti-Slop Filter
- **Tasks:**
  1. Review every drafted chapter against `anti-ai-writing` standards. Strip any passive voice, generic filler, or repetitive metaphors.
  2. Verify all math formulas render cleanly with KaTeX (`$$...$$` and `$math$`). Ensure no raw ASCII code-box tables exist.
  3. Check that every chapter contains at least 4–8 highlighted sentences (`==...==`), 1–3 media cards, 1 pull quote or stat block, 4–6 check questions with answers, and an authentic 5-line night-before recap.
  4. Write comprehensive end-to-end tests in `test/e2e-fin.mjs` verifying all 4 chapters, registries, figures, and calculations.
  5. Run `npm run check` and ensure **0 errors**.

### Agent 4: Build Engineer & PDF Verifier
- **Tasks:**
  1. Update [`book.yml`](../book.yml) edition to `2027 · Draft 0.4 (Finance Track)`.
  2. Run `npm run build` and verify that all 28 chapters compile cleanly.
  3. Run `npm run pdf` to generate the complete updated PDF.
  4. Copy `dist/INFERENCE.pdf` to `editions/INFERENCE-v4-finance-draft.pdf`.
  5. Update [`STATUS.md`](../STATUS.md) with word counts, new chapters, and source verification notes.
  6. Git commit: `feat(finance): complete v4 finance track and integrate into compendium`.

---

## 4. Verification & Stop Conditions

The teamwork run is only complete when:
- `npm run check` reports **0 errors**.
- `npm run build` compiles all 28 chapters in `< 500 ms`.
- `node test/e2e-fin.mjs` reports 100% passing tests.
- `npm run pdf` successfully outputs the unified publication PDF (~480+ pages).
- All new chapters appear in `dist/index.html` navigation and cover tabs.
- Clean git status with changes committed.
