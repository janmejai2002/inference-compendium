# Adversarial Quantitative Challenge Report — Part VI (Finance Track)

**Author**: challenger_2 (Adversarial Quantitative Finance Challenger)  
**Date**: 2026-11-04  
**Verdict**: **`REQUEST_CHANGES`**  
**Overall Risk Assessment**: **CRITICAL**

---

## Executive Summary

An adversarial quantitative mathematical audit was conducted across all four Part VI chapters:
1. `content/chapters/algorithmic-underwriting-and-credit-risk.md` (Chapter 22)
2. `content/chapters/financial-copilots-and-deal-diligence.md` (Chapter 23)
3. `content/chapters/financial-crime-fraud-and-rbi-free-ai.md` (Chapter 24)
4. `content/chapters/finance-casebook.md` (Chapter 25)

An empirical verification test suite (`test/verify_math_part_vi.py`) was constructed and executed to independently recalculate every formula, parameter, intermediate derivation step, and sensitivity matrix cell down to the individual basis point and rupee.

While the conceptual foundations, regulatory frameworks (Basel III/IV, IFRS 9, RBI FREE-AI, DPDP Act, SEBI directives), and core Bayes' theorem derivations are robust and pedagogically exemplary, the audit uncovered **three Critical arithmetic / order-of-magnitude errors**, **two High-severity sensitivity table formula errors**, and **two Medium-severity accounting alignment discrepancies**.

Publishing these chapters without corrections would expose the publication to severe credibility loss in executive reviews, MBA classrooms, and technical risk audits. Therefore, the explicit verdict is **`REQUEST_CHANGES`**, accompanied by exact, surgical mathematical corrections.

---

## Adversarial Challenges & Findings

### [Critical] Challenge 1: The 10x Millions-to-Crores Conversion Trap in Guesstimate 1 (Private AI Cluster TCO)
- **File & Location**: `content/chapters/finance-casebook.md`, lines 284–290, 299
- **Assumption Challenged**: Annual Cloud API spend and 3-year TCO calculation.
- **The Finding**:
  In Guesstimate 1, the text correctly derives the per-query cloud API cost as $\$0.0048 \times \text{₹}85 = \mathbf{\text{₹}0.408\text{ per query}}$.
  For a monthly volume of $20,000,000$ queries:
  $$\text{Monthly Cloud Spend} = 20{,}000{,}000 \times \text{₹}0.408 = \text{₹}8{,}160{,}000\quad (\mathbf{\text{₹}81.60\text{ lakh/month}})$$
  $$\text{Annual Cloud Spend} = \text{₹}8{,}160{,}000 \times 12 = \text{₹}97{,}920{,}000\quad (\mathbf{\text{₹}9.792\text{ crore/year}})$$
  However, Line 284 states:
  $$\text{Annual Cloud API Spend: } 20{,}000{,}000 \times \text{₹}0.408 \times 12 = \mathbf{\text{₹}97.92\text{ crore/year}}$$
  The author mistook $97.92\text{ million rupees}$ for $97.92\text{ crore}$ ($1\text{ crore} = 10\text{ million}$), an exact **$10\times$ decimal error**.
- **Blast Radius**:
  1. The 3-year Cloud TCO is stated as $\text{₹}293.76\text{ crore}$ instead of the true value:
     $$\text{TCO}_{\text{Cloud}} = 3 \times \text{₹}9.792\text{ Cr} = \mathbf{\text{₹}29.376\text{ crore}}$$
  2. The net 3-year savings of on-premise hosting ($\text{TCO}_{\text{On-Prem}} = \text{₹}24.42\text{ Cr}$) is stated as **₹269.34 crore** (a 91.7% saving), whereas the actual savings is:
     $$\Delta \text{TCO} = \text{₹}29.376\text{ Cr} - \text{₹}24.42\text{ Cr} = \mathbf{\text{₹}4.956\text{ crore}}\quad (\approx \mathbf{\text{₹}4.96\text{ crore}, a 16.9\% savings})$$
  3. The crossover volume formula in Line 289:
     $$V^* = \frac{\text{₹}8{,}14{,}00{,}000}{\text{₹}0.408} = \mathbf{199{,}509{,}804\text{ queries/year}}\quad (\approx \mathbf{16.63\text{ million queries/month}})$$
     The text states $V^* \approx 19{,}950{,}980\text{ queries/year}$ ($\approx 1.66\text{ million queries/month}$), dropping an entire decimal zero ($10\times$ error). At $20\text{M}$ queries/month, the bank operates at **$1.2\times$** the crossover volume, not $12\times$.
- **Required Correction**: Correct the cloud spend figures to ₹9.792 Cr/year, 3-year Cloud TCO to ₹29.38 Cr, 3-year net savings to ₹4.96 Cr, crossover volume to 16.6M queries/month, and update the sensitivity table in line 299 accordingly.

---

### [Critical] Challenge 2: Arithmetic Error in Extreme Volatility Margin Call in Guesstimate 4
- **File & Location**: `content/chapters/finance-casebook.md`, lines 418–425
- **Assumption Challenged**: Incremental clearing house margin demand on open derivatives exposure.
- **The Finding**:
  In Guesstimate 4, the broker-dealer holds a gross open market exposure $Q = \text{₹}1{,}500.0\text{ crore}$.
  Line 418 states:
  > *"NSE Clearing Limited (NCL) triggers intraday Extreme Volatility Margin ($EVM$) requirements, raising collateral requirements from 18.0% to 32.0% (an incremental 14.0% cash margin call on open exposure):*
  > $$\text{Incremental Margin Demand} = 14.0\% \times \text{₹}1{,}500.0\text{ Cr} = \mathbf{\text{₹}21.00\text{ crore}}\text{""}$$
  Calculating $14.0\%$ of $\text{₹}1{,}500.0\text{ crore}$:
  $$14.0\% \times \text{₹}1{,}500.0\text{ Cr} = 0.14 \times 1{,}500 = \mathbf{\text{₹}210.00\text{ crore}}$$
  The text states **₹21.00 crore**, misplacing the decimal by an order of magnitude ($1.4\%$ vs $14.0\%$).
- **Blast Radius**:
  If the incremental margin call is indeed $14.0\%$, the subtotal cash drain is:
  $$\text{Subtotal} = \text{₹}27.75\text{ Cr (Slippage)} + \text{₹}67.50\text{ Cr (Price)} + \mathbf{\text{₹}210.00\text{ Cr (Margin)}} + \text{₹}3.50\text{ Cr (OTR)} = \mathbf{\text{₹}308.75\text{ crore}}$$
  $$\text{Mandatory Buffer} = \text{₹}308.75\text{ Cr} \times 1.15 = \mathbf{\text{₹}355.06\text{ crore}}$$
  Instead of $\text{₹}137.71\text{ crore}$.
  Conversely, if the intended cash margin call was ₹21.00 crore, the incremental percentage is **1.40%** (140 basis points, raising margin requirements from 18.0% to 19.4%), not 14.0%.
- **Required Correction**: Either (a) adjust the margin increase description to 1.40% (140 bps, e.g., 18.0% to 19.4%), preserving ₹21.00 Cr and the downstream ₹137.71 Cr buffer; or (b) update the margin demand to ₹210.00 Cr and total buffer to ₹355.06 Cr.

---

### [Critical] Challenge 3: Internal Contradiction in Chapter 22 SME Loan Credit Loss Formula
- **File & Location**: `content/chapters/algorithmic-underwriting-and-credit-risk.md`, lines 177–180 vs lines 192–196
- **Assumption Challenged**: Baseline Annual Credit Loss on the ₹12,000 crore SME loan portfolio.
- **The Finding**:
  In the Illustrative Case (Line 177), the portfolio is $\text{AUM} = \text{₹}12{,}000\text{ crore}$, $\text{GNPA} = 3.80\%$, and $\text{LGD} = 50\%$.
  Line 179 states:
  $$\text{Annual Credit Loss} = \text{₹}12{,}000\text{ Cr} \times 0.038 \times 0.50 = \mathbf{\text{₹}86.64\text{ crore/year}}$$
  Direct multiplication reveals:
  $$\text{₹}12{,}000\text{ Cr} \times 0.038 \times 0.50 = 456\text{ Cr} \times 0.50 = \mathbf{\text{₹}228.00\text{ crore/year}}$$
  The figure ₹86.64 Cr is derived from an accidental double multiplication by $0.38$ ($228.00 \times 0.38 = 86.64$).
  Furthermore, line 194 correctly calculates the savings from a 65 bps GNPA reduction:
  $$\Delta \text{Credit Loss} = \text{₹}12{,}000\text{ Cr} \times 0.0065 \times 0.50 = \mathbf{\text{₹}39.00\text{ crore/year}}$$
  If baseline loss were ₹86.64 Cr, saving ₹39.00 Cr would represent a 45% reduction, contradicting the 65 bps reduction ($65 / 380 = 17.1\%$). $17.1\% \times 228.00\text{ Cr} = 39.00\text{ Cr}$.
- **Blast Radius**: The baseline equation is mathematically false on its face.
- **Required Correction**: Update Line 179 to state $\mathbf{\text{₹}228.00\text{ crore/year}}$.

---

### [High] Challenge 4: Multiple Parameter & Label Errors in Case 3 Sensitivity Table (Wealth Management)
- **File & Location**: `content/chapters/finance-casebook.md`, lines 205–210
- **Assumption Challenged**: Fee preservation and headcount retention across sensitivity dimensions.
- **The Finding**:
  1. **Column Header 1 Error**:
     The table header reads: `300 bps (₹12 Cr fee)`.
     On $\text{AUM} = \text{₹}40{,}000\text{ crore}$ at an annual fee of $0.75\%$:
     $$\text{Fee for 300 bps churn reduction} = \text{₹}40{,}000\text{ Cr} \times 0.030 \times 0.0075 = \mathbf{\text{₹}9.0\text{ crore}}$$
     (₹12 Cr corresponds to 400 bps or a 1.0% fee).
  2. **Row Label 1 Headcount Error**:
     The row label reads: `600 clients / RM (67 RMs retained)`.
     With 80,000 clients:
     $$\text{RMs retained} = \frac{80{,}000}{600} = \mathbf{133.33\text{ RMs}}\quad (\approx \mathbf{133\text{ RMs}})$$
     Not 67 RMs! (67 RMs would imply 1,200 clients/RM).
  3. **Row 1 Payroll Savings Shift**:
     Row 1 values (`₹92.0 Cr | ₹93.5 Cr | ₹98.0 Cr`) assume payroll savings of ₹80.0 Cr (333.3 RMs saved, 166.7 retained). If 133.3 RMs are retained (366.7 saved), payroll savings is $366.67 \times \text{₹}0.24\text{ Cr} = \text{₹}88.0\text{ Cr}$.
- **Required Correction**:
  - Update Column 1 header to `300 bps (₹9.0 Cr fee)`.
  - Update Row 1 header to `600 clients / RM (133 RMs retained)`.
  - Recompute the matrix cells using exact payroll savings (₹88.0 Cr, ₹96.0 Cr, ₹100.8 Cr) and fee retention (₹9.0 Cr, ₹13.5 Cr, ₹18.0 Cr).

---

### [High] Challenge 5: Inconsistent Row Shift Mechanics in Case 4 Sensitivity Table (AML Operations)
- **File & Location**: `content/chapters/finance-casebook.md`, lines 249–254
- **Assumption Challenged**: Net annual operational savings across auto-dismissal rates (55%, 65%, 75%) and review costs (₹40, ₹50, ₹60).
- **The Finding**:
  The empirical verification script discovered that the 65% auto-dismissal row is exact, but the 55% and 75% rows deviate by $\approx \text{₹}6.0\text{ crore}$ across all cells:
  - 55% Auto / ₹50 cost: Calculated = ₹75.84 Cr vs Text = ₹69.8 Cr ($\Delta = -6.04\text{ Cr}$).
  - 75% Auto / ₹50 cost: Calculated = ₹81.60 Cr vs Text = ₹87.6 Cr ($\Delta = +6.00\text{ Cr}$).
  **Root Cause**: The author derived the row shift by multiplying the $10\%$ volume shift ($50,000\text{ alerts/mo}$) by the full baseline review cost of ₹150 ($50,000 \times \text{₹}150 \times 12 = \text{₹}9.0\text{ Cr}$) instead of the marginal savings between baseline and escalated review ($150 - 50 = 100 \implies 50,000 \times 100 \times 12 = \text{₹}6.0\text{ Cr}$, minus ₹2 auto compute).
- **Required Correction**: Replace the 3x3 table with the exact mathematically derived annual savings matrix:
  - 55% Auto (225k esc): ₹78.5 Cr | ₹75.8 Cr | ₹73.1 Cr
  - 65% Auto (175k esc): ₹80.8 Cr | ₹78.7 Cr | ₹76.6 Cr
  - 75% Auto (125k esc): ₹83.1 Cr | ₹81.6 Cr | ₹80.1 Cr

---

### [Medium] Challenge 6: Unaccounted EBITDA Gap in Case 2 (Private Equity M&A Diligence)
- **File & Location**: `content/chapters/finance-casebook.md`, lines 147–148
- **The Finding**:
  Line 147 states that AI developer tooling and support automation compress opex by 14.0%, yielding **₹84.0 crore** in annual cash opex savings.
  Line 148 then states that annual EBITDA expands from ₹300 crore to **₹420 crore** (an expansion of **₹120.0 crore** / +8.0% EBITDA margin).
  If opex savings are ₹84.0 crore, what accounts for the remaining ₹36.0 crore ($120 - 84 = 36$ Cr) of EBITDA expansion?
- **Required Correction**: Clarify whether the remaining ₹36.0 crore stems from gross margin expansion / reduced SaaS churn retention, or adjust line 147 to state that total opex and cost of delivery compress by ₹120.0 crore.

---

### [Medium] Challenge 7: Degenerate Matrix in Guesstimate 3 Sensitivity Table (NBFC Valuation)
- **File & Location**: `content/chapters/finance-casebook.md`, lines 384–388
- **The Finding**:
  The sensitivity table models Market Capitalization across Cost-to-Income (C/I) ratios (42.0%, 39.25%, 36.0%) and P/B multiples (2.10x, 2.40x, 2.70x).
  Because Market Cap is evaluated strictly as $\text{Book Value} \times \text{P/B Multiple} = \text{₹}1,000\text{ Cr} \times \text{P/B}$, every row contains identical numbers (`₹2,100.0 Cr | ₹2,400.0 Cr | ₹2,700.0 Cr`). The C/I ratio row dimension has zero mathematical effect on the output.
- **Required Correction**: Model the table either as Price-to-Earnings on expanded PAT ($\text{P/E} \times \text{PAT}$), or link the justified P/B multiple dynamically to the ROE expansion driven by C/I compression ($P/B = \frac{ROE - g}{r - g}$).

---

## Stress Test Results Summary

| Test Subject | Target Formula / Model | Expected / Verified Value | Stated In Text | Status |
|---|---|---|---|---|
| **Ch 22 ECL Retail** | $ECL = EAD \times PD \times LGD$ | ₹21,000 | ₹21,000 | **PASS** |
| **Ch 22 Check Yourself 2** | $ECL = 40\text{L} \times 0.04 \times 0.65$ | ₹1,04,000 | ₹1,04,000 | **PASS** |
| **Ch 22 Illustrative Case** | $12,000\text{ Cr} \times 0.038 \times 0.50$ | **₹228.00 Cr** | **₹86.64 Cr** | **FAIL** (Typo: $\times 0.38$) |
| **Ch 22 Shapley Attribution** | $\sum \phi_i = 8.8\%$, Base rate = $6.0\%$ | 14.8% raw PD | 14.8% raw PD | **PASS** |
| **Ch 24 Bayes' Precision** | $P(F \mid \text{Alert})$ at $\pi = 0.01\%$ | 0.9804% | 0.98% / 0.9804% | **PASS** |
| **Ch 24 40M Traffic Table** | 403,920 alerts, 3,960 true fraud | Precision = 0.9804% | Precision = 0.9804% | **PASS** |
| **Ch 24 Check Yourself 3** | 10M txns, $\pi=0.02\%$, 95% TPR, 0.5% FPR | 51,890 alerts, 3.66% prec | 51,890 alerts, 3.66% prec | **PASS** |
| **Ch 24 Try-It Loss Tradeoff** | Point A vs Point B costs | A: ₹2.06 Cr vs B: ₹0.44 Cr | A costs ~₹1.62 Cr more | **PASS** |
| **Ch 25 Case 1 (SME ROI)** | Delta PBT ₹110 Cr, PAT ₹82.31 Cr, ROE +8.23% | Matches exact | Matches exact | **PASS** |
| **Ch 25 Case 1 Sensitivity** | 3x3 PBT Matrix | 100% exact match | 100% exact match | **PASS** |
| **Ch 25 Case 2 (PE M&A)** | Haircut ₹85 Cr, Exit EV ₹1,440 Cr, Total ₹1,527.2 Cr | Matches exact | Matches exact | **PASS** |
| **Ch 25 Case 2 EBITDA Gap** | Opex savings vs EBITDA expansion | ₹120 Cr expansion | ₹84 Cr opex savings | **FAIL** (Unaccounted gap) |
| **Ch 25 Case 2 Sensitivity** | 3x3 Exit EV Matrix | 100% exact match | 100% exact match | **PASS** |
| **Ch 25 Case 3 (Wealth)** | Payroll ₹96 Cr, Fees ₹13.5 Cr, Margin 92.3% | Matches exact | Matches exact | **PASS** |
| **Ch 25 Case 3 Sensitivity** | Header: 300 bps fee & Row 1: 600 clients | **₹9.0 Cr fee & 133 RMs** | **₹12.0 Cr fee & 67 RMs** | **FAIL** (Label/math errors) |
| **Ch 25 Case 4 (AML Ops)** | Monthly opt spend ₹0.94 Cr, Savings ₹78.72 Cr | Matches exact | Matches exact | **PASS** |
| **Ch 25 Case 4 Sensitivity** | 3x3 Annual Savings Matrix | 55% / 75% rows exact | Off by $\approx \text{₹}6.0\text{ Cr}$ | **FAIL** (Row shift flaw) |
| **Ch 25 Guesstimate 1 (TCO)** | Annual Cloud API spend & 3-yr TCO | **₹9.792 Cr/yr & ₹29.38 Cr** | **₹97.92 Cr/yr & ₹293.76 Cr** | **FAIL** ($10\times$ decimal error) |
| **Ch 25 Guesstimate 1 Crossover** | $V^* = 8.14\text{ Cr} / 0.408$ | **199.5M/yr (16.6M/mo)** | **19.95M/yr (1.66M/mo)** | **FAIL** ($10\times$ decimal error) |
| **Ch 25 Guesstimate 2 (Covenant)**| Losses ₹550 Cr $\to$ ₹200 Cr, Total ₹353.75 Cr | Matches exact | Matches exact | **PASS** |
| **Ch 25 Guesstimate 2 Sensitivity**| 3x3 Loss Savings Matrix | 100% exact match | 100% exact match | **PASS** |
| **Ch 25 Guesstimate 3 (NBFC)** | ROE 14.37% $\to$ 19.19%, Mcap ₹2,400 Cr | Matches exact | Matches exact | **PASS** |
| **Ch 25 Guesstimate 3 Sensitivity**| 3x3 Mcap Matrix | Invariant across rows | Identical rows | **FAIL** (Degenerate table) |
| **Ch 25 Guesstimate 4 (Algo)** | Incremental Margin Call: $14.0\% \times 1,500$ | **₹210.00 Cr (or 1.40%)** | **₹21.00 Cr** | **FAIL** (Order of magnitude) |
| **Ch 25 Guesstimate 4 Sensitivity**| 3x3 Capital Buffer Matrix | ₹24.5 Cr fixed add-on | ₹29.5 Cr fixed in 8/9 cells | **FAIL** (Matrix inconsistency) |

---

## Concrete Actionable Remediations

To enable immediate approval upon revision, apply the following surgical updates:

1. **Chapter 22 (Line 179)**: Replace `\mathbf{\text{₹}86.64\text{ crore/year}}` with `\mathbf{\text{₹}228.00\text{ crore/year}}`.
2. **Chapter 25 (Guesstimate 1, Lines 284–301)**:
   - Line 284: Replace `\text{₹}97.92\text{ crore/year}` with `\text{₹}9.792\text{ crore/year}`.
   - Line 286: Replace `\text{₹}293.76\text{ crore}` with `\text{₹}29.38\text{ crore}`.
   - Line 289: Replace `\text{₹}8{,}14{,}00{,}000 / \text{₹}0.408 \approx 19{,}950{,}980\text{ queries/year}` with `\text{₹}8{,}14{,}00{,}000 / \text{₹}0.408 \approx 199{,}509{,}804\text{ queries/year}\quad (\approx \mathbf{16.63\text{ million queries/month}})`.
   - Line 290: Replace `saves over ₹269 crore across 3 years (an 91.7% TCO reduction)` with `saves ₹4.96 crore across 3 years (a 16.9% TCO reduction), operating at 1.2x crossover volume`.
   - Line 299: In sensitivity table, update Cloud API cost to ₹29.38 Cr and Net Savings to ₹4.96 Cr (and update 5M, 15M, 30M rows accordingly).
3. **Chapter 25 (Guesstimate 4, Lines 418–426)**:
   - Clarify the incremental margin demand as $1.40\%$ (140 bps, e.g., raising requirements from 18.0% to 19.4%) to maintain the ₹21.00 Cr figure and ₹137.71 Cr buffer; or adjust the margin demand to ₹210.00 Cr and total buffer to ₹355.06 Cr.
4. **Chapter 25 (Case 3 Sensitivity Table, Lines 205–210)**:
   - Correct Column 1 header to `300 bps (₹9.0 Cr fee)`.
   - Correct Row 1 label to `600 clients / RM (133 RMs retained)`.
   - Recompute table cells:
     - Row 1: ₹97.0 Cr | ₹101.5 Cr | ₹106.0 Cr
     - Row 2: ₹105.0 Cr | ₹109.5 Cr | ₹114.0 Cr
     - Row 3: ₹109.8 Cr | ₹114.3 Cr | ₹118.8 Cr
5. **Chapter 25 (Case 4 Sensitivity Table, Lines 251–253)**:
   - Update table to:
     - 55% Auto: ₹78.5 Cr | ₹75.8 Cr | ₹73.1 Cr
     - 65% Auto: ₹80.8 Cr | ₹78.7 Cr | ₹76.6 Cr
     - 75% Auto: ₹83.1 Cr | ₹81.6 Cr | ₹80.1 Cr
6. **Chapter 25 (Case 2, Lines 147–148)**:
   - Align ₹84.0 Cr opex savings with ₹120.0 Cr EBITDA expansion by noting that opex compresses by ₹84 Cr while gross margin expansion/churn reduction contributes ₹36 Cr.
