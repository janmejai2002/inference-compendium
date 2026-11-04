# Remediation Changes Record: Part VI Finance Track

**Worker**: `worker_remediation`  
**Milestone**: M3 Finance Track Remediation  
**Date**: 2026-11-04  

---

## 1. Summary of Modified Files

Only files within the assigned exclusive write boundaries were modified:
1. `content/glossary.yml`
2. `content/chapters/algorithmic-underwriting-and-credit-risk.md`
3. `content/chapters/finance-casebook.md`

All edits strictly adhere to `explorer_remediation/report.md` § 3 and preserve all compendium invariants (highlight counts [4..8], GFM table semantics, plain text headers, and zero escaped HTML tag leakage).

---

## 2. Line-by-Line Changes by Target

### File 1: `content/glossary.yml`
- **Edit 1.1**: Lines 243–250 (`loss-given-default` and `lgd`):
  - Removed raw LaTeX `$LGD = 1 - \text{Recovery Rate}$`.
  - Replaced with plain unicode: `(LGD = 1 − Recovery Rate)`.
  - **Rationale**: Glossary definitions injected via `${esc(g.def)}` in `scripts/lib/render.mjs` run after markdown math preprocessing; raw LaTeX was leaking into margin notes.
- **Edit 1.2**: Lines 259–266 (`expected-credit-loss` and `ecl`):
  - Removed raw LaTeX `$ECL = EAD \times PD \times LGD$`.
  - Replaced with plain unicode: `(ECL = EAD × PD × LGD)`.
  - **Rationale**: Eliminates unparsed `\times` command leakage in HTML margin notes.

---

### File 2: `content/chapters/algorithmic-underwriting-and-credit-risk.md`
- **Edit 2.1**: Line 179:
  - Corrected Annual Credit Loss formula from `\mathbf{\text{₹}86.64\text{ crore/year}}` to `\mathbf{\text{₹}228.00\text{ crore/year}}`.
  - **Rationale**: An AUM of ₹12,000 Cr at 3.80% GNPA and 50% LGD evaluates to $12,000 \times 0.038 \times 0.50 = 228.00\text{ crore/year}$. The previous ₹86.64 Cr was an accidental double multiplication by 0.38 ($228 \times 0.38 = 86.64$).

---

### File 3: `content/chapters/finance-casebook.md`
- **Edit 3.1**: Case 2 (Line 141 & 147):
  - Fixed duplicate `\times \times` in Line 141 (`$6.0\times \text{₹}33\text{ Cr}$`).
  - Reconciled EBITDA expansion bridge in Line 147 by explicitly attributing ₹36.0 Cr to contract compliance and automated churn margin retention alongside ₹84.0 Cr SG&A opex savings, bridging to the stated ₹120.0 Cr total EBITDA expansion.
- **Edit 3.2**: Case 3 Sensitivity Table (Lines 205–210):
  - Corrected Column 1 header from `300 bps (₹12 Cr fee)` to `300 bps (₹9.0 Cr fee)` ($40,000 \times 0.03 \times 0.0075 = 9.0$).
  - Corrected Row 1 label from `600 clients / RM (67 RMs retained)` to `600 clients / RM (133 RMs retained)` ($80,000 / 600 = 133.33$).
  - Recalculated matrix cells to align payroll savings (88.0 Cr, 96.0 Cr, 100.8 Cr) with fee preservation (9.0 Cr, 13.5 Cr, 18.0 Cr): Row 1 (₹97.0 Cr, ₹101.5 Cr, ₹106.0 Cr), Row 2 (₹105.0 Cr, ₹109.5 Cr, ₹114.0 Cr), Row 3 (₹109.8 Cr, ₹114.3 Cr, ₹118.8 Cr).
- **Edit 3.3**: Case 4 Sensitivity Table (Lines 249–253):
  - Updated rows for 55% and 75% auto-dismissal rates using exact marginal triage unit economics (55%: ₹78.5 Cr, ₹75.8 Cr, ₹73.1 Cr; 75%: ₹83.1 Cr, ₹81.6 Cr, ₹80.1 Cr).
- **Edit 3.4**: Guesstimate 1 (Lines 272–303):
  - Replaced corrupted currency formatting in Line 272 and Line 281 with standard plain text currency ($320,000, $220,000, $1.50, $6.00).
  - Resolved 10x order-of-magnitude decimal error:
    - Annual Cloud API spend corrected to $20\text{M} \times \text{₹}0.408 \times 12 = \mathbf{\text{₹}9.792\text{ crore/year}}$ (previously ₹97.92 Cr/yr).
    - 3-Year Cloud TCO corrected to $3 \times 9.792 = \mathbf{\text{₹}29.38\text{ crore}}$ (previously ₹293.76 Cr).
    - Crossover transaction volume corrected to $V^* = \frac{\text{₹}8,14,00,000}{\text{₹}0.408} \approx \mathbf{199,509,804\text{ queries/year}}$ ($\approx \mathbf{16.63\text{ million queries/month}}$).
    - Strategic conclusion updated to $1.20\times$ crossover volume with net 3-year savings of ₹4.96 Cr (16.9% reduction). Replaced `**$1.20\times$` with `**1.20×` to eliminate inline math lookbehind parsing failure.
    - Sensitivity table recomputed across 5M, 15M, 20M, and 30M queries/month.
    - Updated thesis highlight to scale threshold (~seventeen million operations).
- **Edit 3.5**: Guesstimate 3 Sensitivity Table (Lines 381–388):
  - Replaced degenerate static matrix with dynamic Price-to-Earnings (P/E) valuation on expanded PAT (12.5x, 14.5x, 16.0x across 42.0%, 39.25%, 36.0% C/I ratios), maintaining the base case of ₹2,783.1 Cr.
- **Edit 3.6**: Guesstimate 4 (Lines 418–436):
  - Corrected Extreme Volatility Margin call from 14.0% to 1.40% (140 basis points, collateral rising from 18.0% to 19.4%), reconciling $1.40\% \times \text{₹}1,500\text{ Cr} = \text{₹}21.00\text{ Cr}$ and preserving downstream ₹119.75 Cr subtotal and ₹137.71 Cr buffer.
  - Recomputed sensitivity matrix using consistent ₹24.50 Cr fixed add-on.
- **Synchronized Check & Recap Blocks**:
  - Aligned Check question 4, Answer 3, Answer 4, and Night-before recap 5 to reflect reconciled numbers (1.40% EVM, 199.5M queries/year crossover, 1.20x crossover threshold, ₹4.96 Cr savings, seventeen million monthly operations threshold).

---

## 3. Verification Command Results

1. `npm run build`:
   - Built 28/28 chapters in 553 ms.
2. `node test/adversarial-challenger.mjs`:
   - **68/68 PASS, 0 FAIL, Verdict: APPROVE**.
   - Escaped HTML tag leaks: 0.
   - KaTeX errors / unparsed commands in prose: 0.
   - GFM table wrappers: 9/9 valid.
   - Vector SVG figures: 3/3 valid and embedded.
   - Navigation & cover track filter: 100% verified.
3. `npm run check`:
   - **0 errors**, 53 warnings (standard unverified legacy source warnings).
4. `node test/e2e-fin.mjs --progressive`:
   - **43/43 active tests PASS, 0 failed, 3 pending downstream M4 release**.
5. `python .agents/teamwork/worker_remediation/verify_math_resolved.py`:
   - **10/10 math invariants verified directly from source markdown**.
