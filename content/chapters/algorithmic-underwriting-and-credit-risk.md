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

Inside the boardroom of a private commercial bank in Mumbai, the Chief Marketing Officer pitches a ₹150 crore campaign to expand unsecured consumer credit origination by thirty percent. At the opposite end of the table, the Chief Risk Officer remains unimpressed. The bank holds a loan book of ₹50,000 crore. If the digital marketing push lowers credit underwriting thresholds and pushes [[gnpa|gross non-performing assets]] up by merely 50 basis points (0.50%), the bank must set aside an incremental ₹250 crore in statutory credit provisions. That provisioning charge directly wipes out pre-tax net income rupee for rupee.

Banking is governed by an unyielding mathematical asymmetry. When a software company sells another subscription, its marginal cost is near zero and its downside is negligible. When a bank lends ₹100, its best-case upside is collecting ₹3 to ₹4 in net interest margin. Its worst-case downside is losing the entire ₹100 of principal. In credit underwriting, avoiding a single bad borrower matters far more than acquiring twenty marginal ones. ==In retail and commercial banking, predictive underwriting models do not merely forecast credit defaults—they directly determine regulatory capital adequacy ratios, loan provisioning charges, and institutional solvency.==

## The asymmetric physics of credit risk

Modern credit decisioning operates under statutory international treaties and central bank prudential regulations. Under the Basel Committee on Banking Supervision frameworks [@bcbs-basel-irb-2017], commercial banks employing the Internal Ratings-Based (IRB) approach must estimate three core risk parameters:

1. **[[probability-of-default|Probability of Default (PD)]]:** The empirical likelihood that a borrower defaults on contractual debt repayments over a one-year time horizon.
2. **[[exposure-at-default|Exposure at Default (EAD)]]:** The gross rupee exposure outstanding when default occurs, including drawn loans and committed but undrawn credit lines.
3. **[[loss-given-default|Loss Given Default (LGD)]]:** The economic percentage of the exposure written off as unrecoverable following asset liquidation and legal recovery proceedings:
   $$LGD = 1 - \text{Recovery Rate}$$

Under the International Financial Reporting Standard 9 [@ifrs-9-ecl-standard-2014], financial institutions cannot wait for a borrower to stop paying before recognizing economic loss. Instead, accounting standards enforce forward-looking [[expected-credit-loss|Expected Credit Loss (ECL)]]:

$$ECL = EAD \times PD \times LGD$$

For a retail term loan with an outstanding balance of ₹10,00,000 ($EAD$), an estimated annual default probability of $3.5\%$ ($PD$), and historical collateral recovery yielding $40\%$ ($LGD = 60\%$), the bank records an upfront expected credit loss provision:

$$ECL = \text{₹}10{,}00,000 \times 0.035 \times 0.60 = \mathbf{\text{₹}21{,}000}$$

IFRS 9 classifies every credit exposure across three dynamic stages:

| Stage | Asset Quality Status | Recognition Horizon | ECL Formula | Balance Sheet Impact |
|---|---|---|---|---|
| **Stage 1** | Performing (No significant increase in credit risk) | 12-Month ECL | $ECL = EAD \times PD_{12\text{m}} \times LGD$ | Baseline provisioning; income recognized on gross carrying amount |
| **Stage 2** | Underperforming (Significant Increase in Credit Risk — SICR) | Lifetime ECL | $ECL = \sum_{t=1}^{T} \frac{EAD_t \times PD_t \times LGD_t}{(1 + r)^t}$ | Provision jumps $3\times\text{--}8\times$; direct hit to Tier 1 capital equity |
| **Stage 3** | Credit-Impaired (Default / $>90$ days past due) | Lifetime ECL | Discounted lifetime cash shortfall | Full provisioning; interest income calculated on net carrying amount |

When macroeconomic conditions sour or a borrower's financial signals deteriorate, the account shifts from Stage 1 to Stage 2. ==Under IFRS 9, credit provisioning is inherently non-linear: a borrower migrating from Stage 1 to Stage 2 triggers a sudden jump from twelve-month to lifetime expected credit losses, instantly draining bank equity capital.==

::: principle The credit risk and explainability trade-off
1. Credit underwriting is an asymmetric payoff problem: maximum upside is strictly bounded by the agreed interest spread ($2\%\text{--}4\%$), while downside risk is total capital loss ($100\%$).
2. Prudential banking regulations (Basel III/IV IRB and RBI master directions) mandate that risk parameters directly dictate statutory capital reserves and Risk-Weighted Assets (RWA).
3. Non-linear machine learning ensembles (such as XGBoost or LightGBM) capture complex feature interactions, consistently outperforming classical linear scorecards in discriminatory power.
4. Autonomous deep neural networks and generative models function as statistical black boxes whose internal token weights cannot guarantee monotonic risk behavior.
5. Production underwriting requires a dual-core architecture: an upstream unstructured feature intelligence engine feeding a deterministic, explainable risk core.
:::

::: concept Expected credit loss and credit staging
**Plain words.** Expected credit loss is the money a bank sets aside before a borrower defaults, calculated as how much money is at risk times the probability of default times what cannot be recovered. Staging measures how sick the loan looks: healthy loans hold a one-year umbrella, while sick loans must hold a lifetime umbrella.

**Analogy.** An airline booking maintenance reserves. If an aircraft engine runs smoothly, the airline reserves cash for standard annual inspections (Stage 1). If onboard telemetry detects abnormal turbine vibration, the airline immediately reserves the full overhaul cost for the entire remaining engine lifespan (Stage 2). If the turbine fails mid-flight, the aircraft is grounded as a write-off (Stage 3).

**Misconception.** "Banks only write off capital when a borrower formally defaults after ninety days of missed payments." Under modern accounting rules, the moment an algorithmic risk model detects credit deterioration, the bank takes an immediate hit to its earnings.
:::

## The classical risk engine: Weight of Evidence and logistic scorecards

For six decades, credit risk modeling relied on logistic regression paired with Weight of Evidence binning [@bis-ml-credit-risk-2021]. The approach was engineered for auditability. Regulators and credit risk committees demanded that every scorecard satisfy three tests: transparency, stability across economic cycles, and strict monotonicity.

To build a classical scorecard, continuous variables (such as debt-to-income ratio or bureau score) are discretized into distinct bins. For each bin $i$, analysts compute the [[weight-of-evidence|Weight of Evidence (WoE)]]:

$$\text{WoE}_i = \ln \left( \frac{\% \text{ Non-Defaults}_i}{\% \text{ Defaults}_i} \right) = \ln \left( \frac{\text{Good}_i / \text{Good}_{\text{total}}}{\text{Bad}_i / \text{Bad}_{\text{total}}} \right)$$

A positive $\text{WoE}_i$ indicates that the bin contains a higher proportion of creditworthy borrowers than defaulters. To determine whether a candidate variable possesses predictive power, risk modelers calculate its Information Value ($IV$):

$$IV = \sum_{i=1}^{m} \left( \frac{\text{Good}_i}{\text{Good}_{\text{total}}} - \frac{\text{Bad}_i}{\text{Bad}_{\text{total}}} \right) \times \text{WoE}_i$$

By convention:
- $IV < 0.02$: Unpredictive; discarded.
- $0.02 \le IV < 0.10$: Weak predictive power.
- $0.10 \le IV < 0.30$: Medium predictive power; candidate for inclusion.
- $0.30 \le IV \le 0.50$: Strong predictive power.
- $IV > 0.50$: Suspicious; typically indicates data leakage or overfitting.

Variables with high Information Value are fed into a standard multivariate logistic regression:

$$\ln\left(\frac{PD}{1 - PD}\right) = \beta_0 + \sum_{j=1}^{k} \beta_j \cdot \text{WoE}_{j}(x)$$

This linear combination yields an intuitive scoring sheet. Each bin carries an integer point value, and a credit officer tallies the score by hand. Crucially, logistic scorecards guarantee **monotonicity**: if an applicant's monthly income increases, their estimated default probability strictly decreases or stays flat. It can never jump upward due to spurious correlation.

## The non-linear frontier: Gradient boosted trees versus neural black boxes

While logistic scorecards provide transparent governance, they discard non-linear interactions. A self-employed borrower in Surat earning ₹15 lakh annually with five years of business vintage carries a very different risk profile than a 22-year-old gig-economy worker earning the same income across four intermittent mobile platforms. Capturing those higher-order interactions requires non-linear models.

In empirical benchmarks published by the Bank for International Settlements [@bis-ml-credit-risk-2021], Gradient Boosted Decision Trees (GBDT)—specifically LightGBM, XGBoost, and CatBoost—consistently outperform both classical scorecards and deep neural networks on tabular credit ledgers.

| Dimension | Classical WoE Scorecard | Gradient Boosted Trees (GBDT) | Multimodal Foundation Models |
|---|---|---|---|
| **Underlying Math** | Linear logistic regression over binned log-odds | Ensembles of shallow decision trees minimizing log-loss | Autoregressive transformer attention across text and image tokens |
| **Discriminatory Power (AUC)** | Baseline: $0.72\text{--}0.78$ | Superior: $0.79\text{--}0.86$ ($+4\text{ to }+8$ percentage points) | Tabular: $0.68\text{--}0.74$; Unstructured docs: High ($>0.92$) |
| **Monotonicity Guarantees** | Intrinsic by design (strictly enforced via linear binning) | Enforceable via monotonic tree split constraints | None; stochastic outputs susceptible to prompt drift |
| **Unstructured Data Ingestion** | Incompatible; requires manual feature engineering | Incompatible; requires pre-extracted tabular features | Direct ingestion of PDF bank statements, GST invoices, court filings |
| **Regulatory Auditability** | Basel IRB Tier 1 compliant; approved by global central banks | Compliant with TreeSHAP attributions and monotonicity constraints | Fails statutory adverse action notice audits if used autonomously |

==Gradient boosted trees dominate tabular credit scoring because they model non-linear feature interactions naturally while enforcing monotonic constraints, outperforming deep neural networks on structured financial ledgers.==

::: stat 50 bps & ₹250 Cr
A 50 basis point reduction in gross default rates on a ₹50,000 crore balance sheet saves ₹250 crore in credit provisioning annually, funding an entire enterprise technology infrastructure.
<span class="src">Source: [@bis-ml-credit-risk-2021]</span>
:::

## The explainability imperative: SHAP, LIME, and statutory adverse action

When an algorithmic model declines a credit application, the lender cannot simply return an internal model score. Under the Reserve Bank of India Digital Lending Guidelines [@rbi-digital-lending-guidelines-2022] and international fair lending statutes, regulated financial entities must issue an [[adverse-action-notice|adverse action notice]]. The letter must articulate the exact, verifiable factors that caused the credit rejection.

Telling an entrepreneur, *"Our 500-layer neural network assigned you an approval probability of 0.38,"* triggers immediate regulatory sanctions. The lender must state: *"Your loan was declined primarily due to: (1) high credit card revolving utilization ($82\%$), (2) three cheque bounces in the preceding ninety days, and (3) an unstable debt-to-income ratio ($58\%$) relative to requested principal."*

To extract local feature attributions from non-linear ensembles, quantitative teams rely on [[explainable-ai-finance|Explainable AI (XAI)]], specifically [[shap-attribution|SHAP (SHapley Additive exPlanations)]] [@lundberg-lee-shap-2017] grounded in cooperative game theory.

For an underwriting model predicting a credit default probability $f(x)$, SHAP calculates the marginal contribution $\phi_i(x)$ of feature $i$ across all possible feature subsets $S$:

$$\phi_i(x) = \sum_{S \subseteq F \setminus \{i\}} \frac{|S|!(|F| - |S| - 1)!}{|F|!} \left[ f(S \cup \{i\}) - f(S) \right]$$

Here, $F$ represents the total set of input features. Shapley values satisfy four mathematical axioms:
1. **Efficiency:** The sum of feature contributions equals the difference between model output and base rate expectation: $\sum_{i} \phi_i(x) = f(x) - E[f(x)]$.
2. **Symmetry:** If two features contribute identically across all coalitions, their attributions are equal.
3. **Dummy:** A feature that does not change the model output across any subset receives zero attribution: $\phi_i = 0$.
4. **Additivity:** When combining independent ensemble models, feature attributions sum linearly.

While Local Interpretable Model-agnostic Explanations (LIME) [@ribeiro-lime-2016] samples local perturbations around an applicant's data point, it produces unstable explanations that fluctuate between runs. TreeSHAP provides exact, deterministic polynomial-time explanations for tree ensembles, rendering GBDTs fully compliant with statutory adverse action notice mandates.

==A rejection letter without exact, mathematically auditable attribution reasons violates statutory consumer protection law and exposes the lender to regulatory enforcement.==

::: concept SHAP values and local explainability
**Plain words.** SHAP measures how much each financial fact pushed a loan decision away from the average result. If the average default probability is 3% and yours is 7%, SHAP proves exactly how many percentage points were added by your credit card balance, your missed EMI, and your company vintage.

**Analogy.** Dividing credit for a soccer victory. If a team wins 4–1, you can measure how many goals the team scores with and without the striker on the field across every possible lineup combination. The striker's Shapley value is their true marginal contribution to the victory.

**Misconception.** "Feature importance from a random forest shows why an individual applicant was rejected." Global feature importance shows what mattered across the entire training dataset; local SHAP values explain what determined the specific outcome for one individual applicant.
:::

## The dual-core underwriting architecture

Financial institutions face an architectural dilemma. Tabular scorecards are mathematically auditable and satisfy Basel regulations, but they are blind to unstructured documentation: 36 months of bank account statements, Goods and Services Tax Network (GSTN) monthly returns, Ministry of Corporate Affairs (MCA) filings, property title deeds, and commercial litigation records. Conversely, multimodal foundation models ingest messy PDFs effortlessly, but they hallucinate numbers, drift over time, and fail mathematical monotonicity audits.

Leading financial institutions resolve this dilemma through a decoupled **Dual-Core [[credit-underwriting-engine|Credit Underwriting Architecture]]**:

{{figure credit-underwriting-stack | Dual-Core Credit Underwriting Architecture: Combining Basel-compliant classical risk scoring with multimodal document intelligence. | Sources: Bank for International Settlements (2021); Reserve Bank of India (2022)}}

The system separates perceptual extraction from statutory risk decisioning:

### Core B: Unstructured Document Perception Radar (Upstream)
- **Document Processing:** Layout-aware multimodal models (such as DocLLM and vision-language parsers) ingest unstructured documents: scanned GST invoices, bank passbooks, audited balance sheets, and municipal tax receipts.
- **Signal Triangulation:** The document radar cross-references declared revenue against GSTN e-way bills and bank cash debits. If a merchant reports ₹5 crore annual turnover on income tax returns but bank statement deposits total only ₹1.8 crore, the radar flags revenue inflation.
- **Deterministic Feature Emission:** The perception layer does not make loan decisions. It outputs verified tabular features paired with extraction confidence scores: average daily balance, debit-to-credit turnover ratio, GST circular trading index, and litigation count.

### Core A: Structured Classical Risk Engine (Downstream)
- **Monotonic Tabular Ensemble:** An auditable, calibrated GBDT (LightGBM/XGBoost) ingests structured bureau variables alongside the verified features emitted by Core B.
- **Monotonic Split Enforcement:** Monotonic constraints are mathematically hard-coded into tree splits. An increase in verified debt obligations can never decrease calculated default risk.
- **Statutory Decisioning:** The engine calculates deterministic $PD$, $LGD$, and $EAD$, computes regulatory capital requirements, and generates local TreeSHAP attributions for statutory adverse action reporting.

==Modern credit underwriting does not replace deterministic risk scorecards with generative AI; it uses foundation models as an unstructured document perception radar that feeds verified features into an auditable classical risk core.==

## Alternative credit data and covariate shift

In emerging markets like India, millions of micro-entrepreneurs and first-time borrowers lack CIBIL credit bureau records. Fintech lenders frequently attempt to bridge this "thin-file" gap using [[alternative-data-credit|alternative credit data]]: smartphone telemetry, utility payment punctuality, UPI merchant settlement velocity, and e-commerce transactions [@rbi-digital-lending-guidelines-2022].

While alternative signals provide discriminatory lift during economic expansions, they introduce severe operational and regulatory vulnerabilities:

1. **Covariate Shift:** Alternative behavioral features are fragile across macroeconomic cycles. An individual checking social media late at night may exhibit high default correlation during benign conditions. During an interest rate spike or liquidity crunch, macroeconomic factors dominate, rendering digital lifestyle signals irrelevant.
2. **Proxy Discrimination:** Central banks prohibit lending discrimination based on protected demographics. Machine learning models given thousands of alternative features rapidly reconstruct protected attributes from latent correlations (such as mobile handset price, operating system version, or postal code), triggering regulatory enforcement under fair lending statutes.
3. **Synthetic Identity Fraud:** Fraud syndicates manipulate alternative data through synthetic profiles, automated UPI transaction cycling, and coordinated merchant wash transactions.

For these reasons, the Reserve Bank of India Digital Lending Guidelines strictly prohibit lenders from accessing mobile hardware sensors, contact lists, and personal phone storage. Underwriting models must anchor on verified financial flows.

::: case Illustrative · SME loan pipeline turnaround at an Indian private bank
#### The situation
An Indian private sector bank manages a ₹12,000 crore commercial SME loan portfolio across 8,000 corporate borrowers, with an average ticket size of ₹1.5 crore. The bank's credit underwriting turnaround time (TAT) is eighteen business days. Credit analysts spend 80% of their time manually transcribing paper bank statements, matching GSTN GSTR-3B filings against audited balance sheets, and searching state court portals for civil litigation.

The portfolio carries a Gross Non-Performing Asset (GNPA) ratio of 3.80% (₹456 crore in defaulted loans). Assuming historical recovery yields 50% ($LGD = 50\%$), the bank's annual credit provisioning write-off totals:

$$\text{Annual Credit Loss} = \text{₹}12{,}000\text{ Cr} \times 0.038 \times 0.50 = \mathbf{\text{₹}228.00\text{ crore/year}}$$

Compounding the problem, prime SME borrowers with pristine credit metrics abandon their applications due to the eighteen-day waiting period, leaving the bank adverse-selected with higher-risk applicants.

#### The decision
The bank's executive committee approves a ₹6.5 crore capital investment to deploy a dual-core underwriting platform:
1. **Core B (Document Radar):** Deploys automated Account Aggregator (AA) ingestion and GSTN API reconciliation. A specialized vision-language document parser ingests audited financial statements and extracts cash flow velocity, flagging round-trip circular transactions within 4 minutes.
2. **Core A (Risk Engine):** Replaces legacy manual scorecards with an auditable LightGBM tabular model with strictly enforced monotonic constraints on leverage and operating cash flow, evaluated via TreeSHAP attributions.
3. **Triage Thresholds:** Applications clearing high credit thresholds receive automated in-principle sanction letters within 48 hours; ambiguous edge cases are routed to senior underwriters with pre-compiled risk dossiers.

#### Your move
Calculate the direct financial and balance sheet impact after twelve months of deployment:
- **Turnaround Time (TAT):** Drops from 18 business days to **48 hours**, driving a 22% increase in prime SME application volume.
- **Default Compression:** Better fraud detection and cash flow triangulation reduces GNPA by 65 basis points, from $3.80\%$ to **$3.15\%$**.
- **Credit Loss Savings:**
  $$\Delta \text{Credit Loss} = \text{₹}12{,}000\text{ Cr} \times 0.0065 \times 0.50 = \mathbf{\text{₹}39.00\text{ crore/year}}$$
- **Capital Relief:** Under Basel III rules, reducing risk-weighted assets releases statutory Tier 1 equity capital, allowing the bank to originate ₹480 crore in incremental commercial credit without raising external capital.
- **Payback:** Against a ₹6.5 crore implementation cost, the system delivers ₹39 crore in direct annual provisioning savings, achieving complete capital payback in under two months.
:::

==Automated document intelligence compresses commercial underwriting turnaround from weeks to hours, but the bank's ultimate defense against balance-sheet impairment remains monotonic constraint enforcement in the deterministic risk core.==

::: lens finance
Credit default optimization is balance sheet leverage. In corporate banking, lowering the gross NPA ratio by 50 basis points releases statutory capital reserves under Basel III capital adequacy guidelines, improving return on equity without expanding external equity financing.
:::

::: lens consulting
When advising commercial banks on digital lending transformations, reject proposals to replace risk scorecards with end-to-end foundation models. Insist on a decoupled architecture where generative models extract unstructured document signals and pass them to auditable, monotonic tabular risk engines.
:::

::: lens strategy
The competitive moat in digital credit underwriting does not reside in proprietary neural network architectures. It resides in low-latency integration with sovereign data infrastructure: Account Aggregators, GSTN e-invoicing networks, and central identity registries.
:::

## Defending algorithmic underwriting in the interview room

::: interview Auditing an NBFC's autonomous AI lending agent
**Q.** A fast-growing digital consumer lender presents a proposal to replace its human credit risk committee with an autonomous deep neural network that scores mobile metadata and approves instant personal loans in ninety seconds. The founding team reports an impressive out-of-sample AUC of 0.89 and zero manual touchpoints. As Chief Risk Officer, how do you evaluate and audit this proposal before presenting your recommendation to the board?

> "Before evaluating an AUC of 0.89, I will test the model against three non-negotiable regulatory boundaries: mathematical monotonicity under macroeconomic stress, statutory adverse action explainability, and out-of-time stability against proxy discrimination."

**What they are testing.** Whether you evaluate financial AI systems through balance sheet mechanics and regulatory prudence, or fall for ungrounded machine learning metrics like raw AUC on static historical data.

**A strong structure.**
1. **Monotonicity and Economic Stress Testing:** Unconstrained neural networks learn spurious non-linear patterns. If an applicant reports higher outstanding debt or lower disposable income, the model must never predict lower default risk. Require mathematical proof of monotonic constraints across all financial debt ratios.
2. **Statutory Explainability and Adverse Action:** Check how the system complies with RBI Digital Lending Guidelines and fair lending laws. The model must produce exact, deterministic local feature attributions (via TreeSHAP) so every rejected applicant receives a legally valid adverse action notice detailing specific financial reasons.
3. **Data Sovereignty and Covariate Shift:** Audit the training dataset for out-of-time (OOT) validation across a full credit cycle. Telemetry signals that perform well in liquidity booms break during interest rate tightening. Enforce compliance with the Digital Personal Data Protection (DPDP) Act: personal device data must neither be harvested nor stored.
4. **Recommendation:** Approve a pilot only under a dual-core architecture: use AI for instant document extraction, but pass outputs into an auditable, human-supervised credit risk core with strict risk-tier caps.
:::

## Hands-on experiment: Auditing adverse action notices

::: try Auditing loan rejection adverse action notices
Use any consumer LLM interface (Claude Project or ChatGPT) or a spreadsheet modeling tool to simulate an algorithmic adverse action audit for an unsecured digital consumer loan under Reserve Bank of India regulatory guidelines.

Input Profile:
- Applicant: 28-year-old software engineer applying for a ₹5,00,000 personal loan.
- Bureau CIBIL Score: 685 (Threshold: 720).
- Debt-to-Income (DTI) Ratio: 54% (Policy ceiling: 45%).
- Unsecured Loan Inquiries: 6 hard inquiries in past 30 days.
- Recent Credit Card Utilization: 78%.
- Model Raw Output: Probability of Default = 14.8% (Approval cutoff = 6.0%).
- SHAP Feature Attributions: DTI (+4.2%), Recent Inquiries (+3.1%), Credit Card Utilization (+2.5%), CIBIL Score (+1.8%), Income Level (-2.8%).

Exercise Steps:
1. Examine the SHAP attribution values. Identify the top three positive drivers of calculated default risk (DTI at +4.2%, Inquiries at +3.1%, Utilization at +2.5%).
2. Draft an official, plain-language adverse action notice compliant with fair lending regulations, stating the exact financial factors responsible for rejection.
3. Verify that the notice cites auditable financial ratios rather than opaque algorithmic scores, and provides concrete steps the applicant can take to remediate their credit profile over the next six months.
:::

## Recommended reading & media

{{paper bis-ml-credit-risk-2021}}

{{read ifrs-9-ecl-standard-2014}}

::: check Check yourself
1. What are the three components of Expected Credit Loss under IFRS 9, and how does the loss recognition horizon change between Stage 1 and Stage 2? <span class="lvl">recall</span>
2. An SME lender evaluates a ₹40,00,000 loan with an estimated Probability of Default of 4.0% and an estimated collateral recovery rate of 35%. Calculate the required upfront IFRS 9 Expected Credit Loss provision. <span class="lvl">apply</span>
3. Explain why gradient boosted decision trees consistently outperform deep neural networks on tabular credit scorecards, and state how monotonic constraints protect bank solvency. <span class="lvl">explain</span>
4. A credit risk team replaces a classical logistic scorecard with an unconstrained neural network, achieving a higher test AUC. Three months later, rejected applicants file regulatory complaints alleging unfair treatment. How does post-hoc TreeSHAP attribution resolve this issue? <span class="lvl">transfer</span>
5. A venture-backed fintech proposes using social media activity and smartphone battery charging patterns to underwrite micro-loans for unbanked gig workers. Evaluate the strategic, ethical, and regulatory risks under RBI digital lending mandates. <span class="lvl">judge</span>
:::

::: answers
1. Expected Credit Loss is the product of Exposure at Default ($EAD$), Probability of Default ($PD$), and Loss Given Default ($LGD$). For Stage 1 assets (performing), the bank recognizes a 12-month expected credit loss. When an asset experiences a Significant Increase in Credit Risk (Stage 2), the bank must recognize lifetime expected credit loss across the remaining loan maturity, causing statutory provisions to jump sharply.
2. Given $EAD = \text{₹}40{,}00{,}000$, $PD = 4.0\% = 0.04$, and Recovery Rate $= 35\%$, the Loss Given Default is $LGD = 1 - 0.35 = 0.65$ ($65\%$). The Expected Credit Loss provision is $ECL = \text{₹}40{,}00{,}000 \times 0.04 \times 0.65 = \mathbf{\text{₹}1{,}04{,}000}$.
3. GBDTs dominate tabular credit scoring because decision tree splits partition structured continuous and categorical variables along axis-aligned hyperplanes without requiring arbitrary normalization, capturing non-linear interactions naturally. Monotonic constraints force tree splits to respect financial physics: higher debt or leverage must strictly increase default probability, preventing spurious correlations from generating dangerous credit approvals during distribution shifts.
4. An unconstrained neural network cannot articulate why a specific loan was declined, violating statutory adverse action notice requirements. TreeSHAP solves this by calculating exact Shapley attribution values from cooperative game theory in polynomial time across tree ensembles. This decomposes the final credit prediction into additive feature contributions, allowing the lender to state the exact financial drivers that pushed the applicant past the rejection threshold.
5. While alternative telemetry data offers short-term discriminatory lift on thin-file borrowers, it presents severe structural risks: (1) covariate shift renders behavioral correlations useless during macroeconomic downturns; (2) algorithms quickly learn proxies for protected socioeconomic classes, triggering fair lending enforcement; and (3) RBI Digital Lending Guidelines explicitly forbid access to mobile hardware, contact books, and device telemetry, restricting underwriting to verified financial flows.
:::

::: recap The night-before page
1. Credit risk is asymmetric: lending ₹100 captures ₹3 in margin but risks ₹100 in principal; a 50 bps reduction in default rate directly preserves ₹250 crore on a ₹50,000 crore portfolio.
2. Under IFRS 9, Expected Credit Loss equals $EAD \times PD \times LGD$; loans migrating from Stage 1 to Stage 2 shift to lifetime provisioning, immediately hitting bank equity.
3. Monotonic GBDTs outperform both classical logistic regression and deep neural networks on tabular ledgers, capturing non-linear interactions while enforcing strict risk monotonicity.
4. Rejection letters require statutory adverse action notices; TreeSHAP decomposes complex ensemble decisions into mathematically auditable local feature attributions.
5. Deploy a dual-core architecture: use multimodal foundation models as an upstream document perception radar, feeding verified signals into a deterministic, auditable risk core.
:::
