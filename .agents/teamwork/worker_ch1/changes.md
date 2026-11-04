# Changes Record — worker_ch1

## File Modified / Created
- `content/chapters/algorithmic-underwriting-and-credit-risk.md`

## Overview of Implementation
Authored the complete, rigorous, publication-grade Chapter 22 (`algorithmic-underwriting-and-credit-risk.md`) for Part VI (Finance & Banking) of the compendium.

### 1. Frontmatter
- `id`: `algorithmic-underwriting-and-credit-risk`
- `title`: "Algorithmic underwriting & credit risk: from logistic regression to foundation models"
- `deck`: "Why a 50 bps reduction in credit default rates pays for a bank's entire AI stack: Basel III/IV capital adequacy, IFRS 9 expected credit loss, explainability versus accuracy (SHAP/LIME), and unstructured document underwriting."
- `level`: Zero to one
- `tracks`: `[finance]`
- `prereq`: `[kinds-of-ai, your-documents]`
- `hook`: "Why a 50 bps reduction in gross non-performing assets (GNPAs) delivers more profit to a ₹50,000 crore bank than doubling its digital marketing budget—and why credit risk committees reject LLM 'black boxes'."
- `objectives`: 4 Bloom-taxonomy objectives starting with bold action verbs (`**Deconstruct**`, `**Derive**`, `**Evaluate**`, `**Architect**`).

### 2. Pedagogical Architecture & Invariants (13-Part Arc)
1. **Opener & Lede**: Balance sheet economics of a ₹50,000 crore commercial bank loan book; asymmetric payoff of banking ($2\%\text{--}4\%$ spread vs $100\%$ principal loss); 50 bps GNPA reduction saving ₹250 crore pre-tax.
2. **First Principles Block**: `::: principle The credit risk and explainability trade-off` (5 numbered premises ending with dual-core conclusion).
3. **Concepts**:
   - `::: concept Expected credit loss and credit staging` (Plain words, Analogy, Misconception). Plain-text header.
   - `::: concept SHAP values and local explainability` (Plain words, Analogy, Misconception). Plain-text header.
4. **Figure**: `{{figure credit-underwriting-stack | Dual-Core Credit Underwriting Architecture: Combining Basel-compliant classical risk scoring with multimodal document intelligence. | Sources: Bank for International Settlements (2021); Reserve Bank of India (2022)}}`
5. **Stat Block**: Exactly 1 `::: stat 50 bps & ₹250 Cr` with plain-text header and `<span class="src">Source: [@bis-ml-credit-risk-2021]</span>`.
6. **Worked Case**: `::: case Illustrative · SME loan pipeline turnaround at an Indian private bank` with `#### The situation`, `#### The decision`, and `#### Your move` (quantitative unit economics: ₹12,000 Cr book, 18 days to 48 hrs TAT, 3.80% to 3.15% GNPA saving ₹39 Cr/yr in credit provisioning, 2-month payback on ₹6.5 Cr capex).
7. **Lenses**: `::: lens finance`, `::: lens consulting`, `::: lens strategy`.
8. **Interview Room**: `::: interview Auditing an NBFC's autonomous AI lending agent` with question, strong opening quote, evaluation criteria, and 4-point response structure.
9. **Try It Yourself**: `::: try Auditing loan rejection adverse action notices` (zero code, MBA-friendly prompt for auditing SHAP feature attributions).
10. **Media Cards**: `{{paper bis-ml-credit-risk-2021}}` and `{{read ifrs-9-ecl-standard-2014}}`.
11. **Check Yourself & Answers**: 5 Bloom-tagged questions (`recall`, `apply`, `explain`, `transfer`, `judge`) matched 1-to-1 with inverted numerical answers in `::: answers`.
12. **Recap**: `::: recap The night-before page` (exactly 5 numbered summary lines).
13. **Highlighter Mayer Signaling**: Exactly 6 highlighted sentences (`==...==`), strictly adhering to the 4–8 range requirement.

### 3. Mathematical Formulations (LaTeX KaTeX)
- IFRS 9 Expected Credit Loss: $ECL = EAD \times PD \times LGD$
- Multi-period lifetime ECL: $ECL_{\text{lifetime}} = \sum_{t=1}^{T} \frac{EAD_t \times PD_t \times LGD_t}{(1 + r)^t}$
- Loss Given Default: $LGD = 1 - \text{Recovery Rate}$
- Weight of Evidence: $\text{WoE}_i = \ln \left( \frac{\% \text{ Non-Defaults}_i}{\% \text{ Defaults}_i} \right)$
- Information Value: $IV = \sum_{i=1}^{m} \left( \% \text{ Non-Defaults}_i - \% \text{ Defaults}_i \right) \times \text{WoE}_i$
- Logistic log-odds: $\ln\left(\frac{PD}{1 - PD}\right) = \beta_0 + \sum_{j=1}^{k} \beta_j \cdot \text{WoE}_{j}(x)$
- Shapley attribution value: $\phi_i(x) = \sum_{S \subseteq F \setminus \{i\}} \frac{|S|!(|F| - |S| - 1)!}{|F|!} \left[ f(S \cup \{i\}) - f(S) \right]$

### 4. Tables & Sidenotes
- Clean GFM table comparing Classical WoE Scorecards, GBDTs, and Multimodal Foundation Models.
- Clean GFM table summarizing IFRS 9 Staging (Stage 1, 2, 3), recognition horizons, and balance sheet impacts.

### 5. Referential Integrity & Anti-AI Standard
- Linked glossary terms: `[[gnpa]]`, `[[probability-of-default|PD]]`, `[[exposure-at-default|EAD]]`, `[[loss-given-default|LGD]]`, `[[expected-credit-loss|ECL]]`, `[[weight-of-evidence|WoE]]`, `[[credit-underwriting-engine]]`, `[[adverse-action-notice]]`, `[[shap-attribution|SHAP]]`, `[[explainable-ai-finance]]`, `[[alternative-data-credit]]`.
- Cited sources: `[@bcbs-basel-irb-2017]`, `[@ifrs-9-ecl-standard-2014]`, `[@bis-ml-credit-risk-2021]`, `[@rbi-digital-lending-guidelines-2022]`, `[@lundberg-lee-shap-2017]`, `[@ribeiro-lime-2016]`.
- Strict anti-ai-writing audit passed: 0 banned tropes, 0 trailing participial clauses, high burstiness, authoritative grounded voice.

### 6. Verification Results
- `node test/e2e-fin.mjs --tier=1,2 --progressive`: All chapter 22 tests (T1.6, T2.1-T2.7) PASSED with 0 errors.
- `npm run check`: 0 errors.
- `npm run build`: 26/28 chapters built into `dist/` in 510 ms.
- Render test: 0 problems, 6 citations parsed, 136,283 HTML bytes rendered.
