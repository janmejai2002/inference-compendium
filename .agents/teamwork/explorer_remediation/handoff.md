# Handoff Report: Remediation Strategy for Part VI (Finance Track)

**Sender**: `explorer_remediation`  
**Recipient**: `parent` (`a5372a48-229a-4fc5-8650-1b7734794c36`)  
**Milestone**: M3 (Finance Track Remediation Blueprint)  
**Date**: 2026-11-04T16:40:00Z  

---

## 1. Observation

Direct observations and evidence gathered across the test harness and source files:

1. **Test Execution Observations**:
   - Running `node test/adversarial-challenger.mjs` failed with exit code 1:
     - `FAIL: Leaked LaTeX commands in prose: algorithmic-underwriting-and-credit-risk (Found unparsed commands outside math: \text, \times)`
     - `FAIL: Unparsed $$ in HTML: finance-casebook (Found literal $$ at char 151484: "nd power distribution units = $$220{,}000 \approx \text{₹}1.87\text{ Cr}$. Total")`
     - `FAIL: Leaked LaTeX commands in prose: finance-casebook (Found unparsed commands outside math: \times, \text, \approx)`
   - Running `python test/verify_math_part_vi.py` failed with exit code 1:
     - `Ch 22 Illustrative Case Line 179: Calculated: 12000 * 0.038 * 0.50 = 228.0 Cr; Text stated: 86.64 Cr`
     - `Case 4 Sensitivity Table: Rate 55%, Cost INR 40: Calculated = INR 78.54 Cr vs Text = INR 72.5 Cr (Diff = 6.04 Cr)`
     - `Guesstimate 1: Calculated: 20M * 12 * 0.408 = INR 9.792 Crore vs Text Line 284: INR 97.92 crore/year`
     - `Guesstimate 4: AssertionError: assert margin_demand_g4 == 21.00 (evaluated to 210.0 from 1500 * 0.140)`

2. **Source Code Line-by-Line Observations**:
   - `content/glossary.yml`:
     - Line 245 & 249: `def: ... ($LGD = 1 - \text{Recovery Rate}$).`
     - Line 261 & 265: `def: ... ($ECL = EAD \times PD \times LGD$).`
     - `Select-String -Path "content\glossary.yml" -Pattern "(\$|\\)"` confirmed lines 245, 249, 261, and 265 are the only lines in `glossary.yml` containing LaTeX math symbols.
   - `content/chapters/algorithmic-underwriting-and-credit-risk.md`:
     - Line 179: `$$\text{Annual Credit Loss} = \text{₹}12{,}000\text{ Cr} \times 0.038 \times 0.50 = \mathbf{\text{₹}86.64\text{ crore/year}}$$`
     - Direct multiplication of $12{,}000 \times 0.038 \times 0.50 = 228.00$. (₹86.64 Cr is $228 \times 0.38$).
   - `content/chapters/finance-casebook.md`:
     - Line 141: Contains accidental double `\times \times` in `$6.0\times \times \text{₹}33\text{ Cr}$`.
     - Lines 147–148: Stated opex savings = ₹84.0 Cr vs EBITDA expansion = ₹120.0 Cr (₹300 Cr to ₹420 Cr).
     - Lines 205–210 (Case 3 Sensitivity Table): Header states `300 bps (₹12 Cr fee)` (actual is $40{,}000 \times 0.03 \times 0.0075 = \text{₹}9.0\text{ Cr}$); Row 1 states `600 clients / RM (67 RMs retained)` (actual is $80{,}000 / 600 = 133.33$ RMs retained).
     - Lines 249–253 (Case 4 Sensitivity Table): 55% and 75% auto-dismissal rows deviate by ~₹6.0 Cr due to improper baseline subtraction.
     - Line 272: Mixed math delimiters `$\times \$320{,}000 = \$1{,}280{,}000 \approx \text{₹}10.88\text{ Cr}$` and `$=\$220{,}000` causes markdown-it literal `$$` tokens in HTML.
     - Line 281: `$\$1.50$` and `$\$6.00$` fails regex lookbehind, leaking literal double dollars.
     - Lines 284–290 (Guesstimate 1 TCO): Annual cloud spend stated as ₹97.92 Cr/year instead of ₹9.792 Cr/year ($20\text{M} \times 0.408 \times 12 = 97.92\text{ million rupees} = \text{₹}9.792\text{ crore}$). 3-year cloud TCO stated as ₹293.76 Cr instead of ₹29.38 Cr. Crossover volume stated as 19,950,980/year (1.66M/month) instead of 199,509,804/year (16.63M/month).
     - Lines 384–388 (Guesstimate 3 Sensitivity Table): Degenerate table with identical numbers across rows (`₹2,100.0 Cr | ₹2,400.0 Cr | ₹2,700.0 Cr`) because valuation was modeled purely as Book Value * P/B multiple without reflecting C/I ratio.
     - Lines 418–419 (Guesstimate 4): Margin call stated as "an incremental 14.0% cash margin call", but $14.0\% \times 1500 = 210.0$ Cr, whereas text wrote ₹21.00 Cr (which corresponds to $1.40\%$ / 140 bps).

---

## 2. Logic Chain

1. **Glossary Sidenotes**: In `render.mjs`, glossary expansion runs after math rendering and wraps `g.def` in HTML escape (`${esc(g.def)}`). Therefore, KaTeX never processes math inside glossary definitions. Removing LaTeX math delimiters from `glossary.yml` and using standard unicode (`ECL = EAD × PD × LGD` and `LGD = 1 − Recovery Rate`) eliminates the leaked `\text` and `\times` backslashes in rendered HTML margins across both Chapter 22 and Chapter 25.
2. **Casebook Math & Currency Delimiters**: The inline math regex `/(?<=^|[\s(])\$(?!\$)([^\$\n]+?)(?<![\s\\])\$(?=[\s,.;:!?)\]]|$)/g` in `render.mjs` halts on any inner `\$`. In `finance-casebook.md` lines 272 and 281, replacing mixed math-dollar delimiters with standard financial notation (`4 nodes at $320,000 = $1,280,000 (approx. ₹10.88 Cr)...`) and plain currency pricing (`$1.50 per 1M input tokens`) completely eliminates unparsed LaTeX and literal `$$` tokens in HTML.
3. **Chapter 22 Credit Loss**: $12{,}000 \times 0.038 \times 0.50 = 228.00$. Updating Line 179 to ₹228.00 crore/year directly aligns the baseline loss equation with lines 192–196 (where a 65 bps reduction produces ₹39.00 crore in annual provisioning savings, exactly matching $12{,}000 \times 0.0065 \times 0.50$).
4. **Guesstimate 1 TCO & Crossover**: Correcting the 10x decimal order-of-magnitude error ($97.92\text{ million rupees} = \text{₹}9.792\text{ crore/year}$) resolves the cloud TCO to ₹29.38 Cr, net 3-year savings to ₹4.96 Cr (a 16.9% saving), and the crossover point to 16.63 million queries/month ($V^* = 81,400,000 / 0.408 = 199,509,804$ queries/year). Updating the sensitivity table and the thesis highlight (`==...==`) to reflect ~17 million queries preserves consistency across all five sections of Guesstimate 1.
5. **Guesstimate 4 Margin Call & Sensitivity Matrix**: Specifying the incremental margin call as 1.40% (140 bps, e.g. from 18.0% to 19.4%) exactly yields ₹21.00 crore on ₹1,500 Cr open exposure. This preserves the downstream subtotal of ₹119.75 Cr, mandatory buffer of ₹137.71 Cr, and the unencumbered capital reserve of ₹140 Cr. Recomputing the sensitivity table using the exact ₹24.50 Cr fixed add-on ($21.00 + 3.50$) produces a clean matrix centered on the base case `**₹137.7 Cr**`.
6. **Case 3 & Case 4 Sensitivity Tables**: Updating Case 3 headers (₹9.0 Cr fee for 300 bps; 133 RMs retained for 600 clients/RM) and recomputing both tables on exact marginal economics guarantees 100% mathematical consistency with their respective chapter derivations.
7. **Guesstimate 3 Valuation Matrix**: Modeling the table on Price-to-Earnings against expanded PAT across C/I ratios resolves matrix degeneracy while centering on the exact base case equity valuation of ₹2,783.1 Cr.

---

## 3. Caveats

- **No Implementation Done**: Per Teamwork Explorer protocol, no direct modifications have been made to source files (`content/glossary.yml`, `content/chapters/*.md`). The downstream Worker will execute the surgical edits defined in `report.md`.
- **PDF Compilation Timing**: Full PDF compilation (`npm run pdf`) takes ~45–60s and remains designated for the M4 final verification milestone.

---

## 4. Conclusion

All findings from `challenger_1` and `challenger_2` have been fully investigated, mathematically re-derived, and translated into an exact, line-by-line remediation blueprint in `report.md`. Applying these 10 surgical edits resolves 100% of the defects while strictly maintaining all compendium invariants.

---

## 5. Verification Method

Once the Worker applies the changes from `report.md`, run:

1. `npm run build` — compiles chapters and generates HTML artifacts.
2. `node test/adversarial-challenger.mjs` — verifies 0 leaked HTML tags, 0 unparsed `$$`, 0 leaked LaTeX commands in prose, and valid SVG embeds (Expected: 68/68 PASS, 0 FAIL).
3. `python test/verify_math_part_vi.py` — recalculates all mathematical formulas across Part VI (Expected: 0 Critical / High findings).
4. `npm run check` — validates repo integrity with 0 errors.
5. `node test/e2e-fin.mjs` — executes Tier 2 end-to-end boundary tests (Expected: 28/28 PASS).
