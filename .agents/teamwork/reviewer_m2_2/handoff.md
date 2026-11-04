# Handoff Report: Reviewer 2 (Milestone 2 — Chapter 19 & Figure 19.1)

**Reviewer:** Reviewer 2 (`reviewer_m2_2`)  
**Recipient:** Orchestrator (`63749ac4-d84d-4275-8f32-53b3635ebc8a`)  
**Date:** 2026-11-03  
**Handoff Type:** Hard  
**Verdict:** **REQUEST_CHANGES**

---

## Review Summary

- **Verdict:** `REQUEST_CHANGES`
- **Scope Examined:**
  - `content/chapters/product-architecture-economics.md` (Chapter 19)
  - `content/figures/product-architecture-economics.svg` (Figure 19.1)
  - `test/e2e-pm.mjs` (E2E Test Runner)
- **Integrity Audit:** Passed. No hardcoded results, dummy facades, test tampering, or bypassed tasks.
- **Pedagogical & Structural Compliance:** Passed (6 highlights, 1 stat block, 3 registered media cards, 5 check questions with `.lvl`, 5 answers, 5-line recap, zero HTML tag leaks).
- **Core Defect:** **Major Mathematical Finding (F-01)** in the KV context caching break-even query velocity ($Q^*$) derivation in Chapter 19 and Figure 19.1, where the initial cache creation query is double-counted.

---

## 1. Observation

### 1.1 Tool Commands and Verbatim Outputs

1. **Offline Referential Linter (`npm run check`):**
   ```powershell
   npm run check
   ```
   *Output:*
   ```
   check: 0 errors, 55 warnings
   ```
   (Zero errors; warnings relate to pre-existing unverified web sources).

2. **Milestone 2 Progressive E2E Test Suite (`node test/e2e-pm.mjs --milestone=M2 --progressive`):**
   ```powershell
   node test/e2e-pm.mjs --milestone=M2 --progressive
   ```
   *Output:*
   ```
     ✔ PASS [T1.6 | Tier 1 | M2 | F06] Chapter 18 (ai-product-lifecycle.md) Existence and Frontmatter (5ms)
     ✔ PASS [T1.7 | Tier 1 | M2 | F07] Chapter 19 (product-architecture-economics.md) Existence and Frontmatter (1ms)
     ○ PEND [T1.10 | Tier 1 | M2 | F10] Accompanying SVG Figures in content/figures/ (0ms)
            ↳ Pending: 2 of 4 PM SVG figures not authored yet (M2/M3)
     ✔ PASS [T2.1-product-architecture-economics | Tier 2 | M2 | F06-F09] Boundary: Highlights count [4..8] in product-architecture-economics.md (1ms)
     ✔ PASS [T2.2-product-architecture-economics | Tier 2 | M2 | F06-F09] Boundary: Stat block count [exactly 1] in product-architecture-economics.md (0ms)
     ✔ PASS [T2.3-product-architecture-economics | Tier 2 | M2 | F06-F09] Boundary: Media cards count [1..3] in product-architecture-economics.md (0ms)
     ✔ PASS [T2.4-product-architecture-economics | Tier 2 | M2 | F06-F09] Boundary: Check questions count [4..6] & inverted answers in product-architecture-economics.md (0ms)
     ✔ PASS [T2.5-product-architecture-economics | Tier 2 | M2 | F06-F09] Boundary: Night-before recap [exactly 5 numbered lines] in product-architecture-economics.md (0ms)
     ✔ PASS [T2.6-product-architecture-economics | Tier 2 | M2 | F06-F09] Escaped HTML tag leak prevention in rendered prose for product-architecture-economics.md (88ms)
     ✔ PASS [T2.7-product-architecture-economics | Tier 2 | M2 | F06-F09] Anti-AI Writing Style Guard in product-architecture-economics.md (0ms)
     ✔ PASS [T3.1 | Tier 3 | M2 | F01/F06-F09] Citation ↔ Source Registry Bidirectional Integrity (3ms)
     ✔ PASS [T3.2 | Tier 3 | M2 | F03/F06-F09] Glossary Link ↔ Glossary Registry Bidirectional Integrity (2ms)
     ✔ PASS [T3.3 | Tier 3 | M2 | F10/F06-F09] Figure Embeds ↔ Figure Asset Filesystem Integrity (1ms)

   Total Executed : 20
   Passed         : 19
   Failed         : 0
   Pending        : 1
   ✔ ALL ACTIVE TESTS PASSED (1 tests pending downstream milestones)
   ```

3. **HTML & Paged.js Spread Compilation (`npm run build`):**
   ```powershell
   npm run build
   ```
   *Output:*
   ```
   built 22/24 chapters → dist/ in 382 ms
   ```

4. **Figure 19.1 XML Validation (`python -c "import xml.etree.ElementTree as ET; ET.parse('content/figures/product-architecture-economics.svg'); print('XML Valid!')"`):**
   *Output:*
   ```
   XML Valid!
   ```

---

### 1.2 Mathematical Derivations Directly Observed in Code

#### A. The KV Context Caching Model in Chapter 19 (`content/chapters/product-architecture-economics.md`, lines 90–108)
Verbatim code:
```markdown
90: To determine whether caching a specific document or system prompt delivers net financial savings, product managers calculate the break-even query velocity ($Q^*$). We equate the cumulative cost of serving $Q$ queries using context caching against serving them uncached:
91: 
92: $$C_{\text{write}} + (Q - 1) \cdot C_{\text{read}} = Q \cdot C_{\text{uncached}}$$
93: 
94: Solving for $Q^*$:
95: 
96: $$C_{\text{write}} - C_{\text{read}} = Q \cdot (C_{\text{uncached}} - C_{\text{read}})$$
97: 
98: $$Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}}$$
99: 
100: Adding 1 for the initial creation query:
101: 
102: $$Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}} + 1$$
103: 
104: Consider standard commercial pricing for frontier models: $C_{\text{write}} = \$3.75/\text{M}$, $C_{\text{uncached}} = \$3.00/\text{M}$, and $C_{\text{read}} = \$0.30/\text{M}$. Substituting these figures:
105: 
106: $$Q^* = \frac{3.75 - 0.30}{3.00 - 0.30} + 1 = \frac{3.45}{2.70} + 1 \approx 1.28 + 1 = 2.28$$
107: 
108: Because queries arrive as discrete integers, the system breaks even and becomes net profitable on the third query within the memory Time-to-Live (TTL) window!
```

#### B. Check Question 2 and Answer 2 (`content/chapters/product-architecture-economics.md`, lines 287, 295)
Verbatim code:
```markdown
287: 2. An enterprise document assistant uses a commercial model where uncached input costs $3.00 per million tokens, cache writes cost $3.75 per million, and cache reads cost $0.30 per million. Calculate the break-even query velocity ($Q^*$). <span class="lvl">apply</span>
...
295: 2. The break-even query velocity formula is $Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}} + 1$. Substituting the values: $Q^* = \frac{3.75 - 0.30}{3.00 - 0.30} + 1 = \frac{3.45}{2.70} + 1 \approx 1.28 + 1 = 2.28$. The system recoups its cache write surcharge and becomes cheaper than uncached queries on the 3rd query within the 5-minute TTL window.
```

#### C. Recap Point 3 (`content/chapters/product-architecture-economics.md`, line 304)
Verbatim code:
```markdown
304: 3. KV context caching eliminates redundant attention prefill across long documents, cutting $TTFT$ by 85% and token expenditure by 90% after just 2 to 3 queries.
```

#### D. Figure 19.1 (`content/figures/product-architecture-economics.svg`, line 66)
Verbatim code:
```xml
66:   <text x="362" y="270" font-size="8.5" fill="#666">Context caching break-even Q* ≈ 3 queries per TTL</text>
```

---

## 2. Logic Chain

1. **Definition of Terms:**
   In line 92, the equivalence equation is set up as:
   $$C_{\text{write}} + (Q - 1) \cdot C_{\text{read}} = Q \cdot C_{\text{uncached}}$$
   Here, $Q$ is explicitly the **total number of queries** served across the document lifecycle:
   - Query 1 pays $C_{\text{write}}$ (cache creation).
   - Queries 2 through $Q$ (a total of $Q - 1$ queries) pay $C_{\text{read}}$ (cache hits).
   - Uncached queries 1 through $Q$ (a total of $Q$ queries) pay $Q \cdot C_{\text{uncached}}$.

2. **Algebraic Resolution:**
   Expanding and rearranging line 92:
   $$C_{\text{write}} + Q \cdot C_{\text{read}} - C_{\text{read}} = Q \cdot C_{\text{uncached}}$$
   $$C_{\text{write}} - C_{\text{read}} = Q \cdot (C_{\text{uncached}} - C_{\text{read}})$$
   $$Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}}$$
   Notice: $Q^*$ is **already the total break-even query count**.

3. **Empirical Numerical Proof:**
   With $C_{\text{write}} = \$3.75$, $C_{\text{uncached}} = \$3.00$, and $C_{\text{read}} = \$0.30$:
   $$Q^* = \frac{3.75 - 0.30}{3.00 - 0.30} = \frac{3.45}{2.70} \approx 1.2778$$
   Evaluating cash outlay query by query:
   - **Query 1 ($Q = 1$):**
     - Cached: $\$3.75$
     - Uncached: $1 \times \$3.00 = \$3.00$
     - *Result:* Uncached is cheaper by $\$0.75$.
   - **Query 2 ($Q = 2$):**
     - Cached: $\$3.75 + 1 \times \$0.30 = \mathbf{\$4.05}$
     - Uncached: $2 \times \$3.00 = \mathbf{\$6.00}$
     - *Result:* Cached is cheaper by **$\$1.95$**. Break-even is already surpassed at query 2!

4. **The Author's Double-Counting Error:**
   In line 100, the author added:
   `Adding 1 for the initial creation query:`
   $$Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}} + 1 = 1.28 + 1 = 2.28$$
   This adds 1 to an expression that already included the initial query.
   *(Note: If one instead solves for the number of subsequent read hits $K$ required to break even, the equation is $C_{\text{write}} + K \cdot C_{\text{read}} = (1 + K) \cdot C_{\text{uncached}}$, which yields $K^* = \frac{C_{\text{write}} - C_{\text{uncached}}}{C_{\text{uncached}} - C_{\text{read}}} = \frac{0.75}{2.70} \approx 0.278$, so total queries $Q = 1 + K^* = 1.278 \approx 1.28$).*
   Adding 1 to $\frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}}$ artificially inflates $Q^*$ from $1.28$ to $2.28$, resulting in the incorrect conclusion that the system requires 3 queries to break even.

5. **Impact of Error:**
   - Contradicts the chapter's second Bloom objective (`"**Derive** the mathematical break-even query velocity ($Q^*$) for KV context caching"`).
   - Invalides Check Answer 2.
   - Propagates incorrect numbers into Figure 19.1 (`Q* ≈ 3 queries per TTL`).
   - Disagrees with `explorer_m2/drafting_blueprint.md` line 451, which correctly stated: `$Q^* \approx 1.28 \implies \mathbf{2\text{ queries within TTL window!}}$`.

---

## 3. Findings & Required Fixes

### [Major] Finding F-01: KV Context Caching $Q^*$ Double-Counting and Break-Even Error

- **Where:**
  1. `content/chapters/product-architecture-economics.md`, lines 100–108
  2. `content/chapters/product-architecture-economics.md`, line 295 (Answer 2)
  3. `content/chapters/product-architecture-economics.md`, line 304 (Recap 3)
  4. `content/figures/product-architecture-economics.svg`, line 66
- **Why:** The algebraic derivation equates total queries $Q$, but then adds 1 again, yielding $2.28 \to 3$ queries instead of $1.28 \to 2$ queries. At query 2, caching costs \$4.05 vs \$6.00 uncached, meaning caching is already profitable on query 2.
- **Concrete Fix Direction for Worker:**
  1. In `content/chapters/product-architecture-economics.md`, remove the redundant `Adding 1 for the initial creation query` and update lines 98–108:
     ```markdown
     $$Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}}$$

     Consider standard commercial pricing for frontier models: $C_{\text{write}} = \$3.75/\text{M}$, $C_{\text{uncached}} = \$3.00/\text{M}$, and $C_{\text{read}} = \$0.30/\text{M}$. Substituting these figures:

     $$Q^* = \frac{3.75 - 0.30}{3.00 - 0.30} = \frac{3.45}{2.70} \approx 1.28$$

     Because queries arrive as discrete integers, the system breaks even and becomes net profitable on the second query ($\lceil 1.28 \rceil = 2$) within the memory Time-to-Live (TTL) window! Beyond query one (the cache write), every subsequent cache hit delivers an 85% reduction in Time-to-First-Token and a 90% reduction in marginal input token expenditure.
     ```
  2. In `content/chapters/product-architecture-economics.md`, line 295 (Answer 2):
     ```markdown
     2. The break-even query velocity formula is $Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}}$. Substituting the values: $Q^* = \frac{3.75 - 0.30}{3.00 - 0.30} = \frac{3.45}{2.70} \approx 1.28$. The system recoups its cache write surcharge and becomes cheaper than uncached queries on the 2nd query within the 5-minute TTL window (costing $4.05 vs $6.00 for two uncached queries).
     ```
  3. In `content/chapters/product-architecture-economics.md`, line 304 (Recap 3):
     Change `"after just 2 to 3 queries"` to `"after just 2 queries"`.
  4. In `content/figures/product-architecture-economics.svg`, line 66:
     Change:
     ```xml
     <text x="362" y="270" font-size="8.5" fill="#666">Context caching break-even Q* ≈ 3 queries per TTL</text>
     ```
     To:
     ```xml
     <text x="362" y="270" font-size="8.5" fill="#666">Context caching break-even Q* ≈ 2 queries per TTL</text>
     ```

---

## 4. Verified Claims

1. **Latency Equation ($TTFT$ and $TPS$):** Verified.
   - Formula: $\text{Latency}_{\text{total}} = T_{\text{network}} + T_{\text{queue}} + TTFT + \frac{N_{\text{output}}}{TPS}$.
   - Human silent reading rate ($250\text{--}300\text{ wpm} \approx 5\text{--}6\text{ wps} \approx 8\text{ tokens/sec}$) and streaming threshold ($\ge 40\text{ TPS}$) are grounded and accurate.
2. **Cognitive Perception Limits:** Verified.
   - Stuart Card, Thomas Moran, and Allen Newell (1983) thresholds (100ms, 1,000ms, 10,000ms) correctly cited and mapped.
3. **Cascade Model Routing Economics:** Verified.
   - FinTech Case Study math:
     - Baseline: $10\text{M} \times \text{₹}8.50 = \text{₹}8.50\text{ Cr}$.
     - Cascade: $(4.2\text{M} \times 0.002) + (4.3\text{M} \times 0.040) + (1.5\text{M} \times 0.850) = \text{₹}1.4554\text{ Cr}$.
     - Savings: $\text{₹}7.0446\text{ Cr}$ ($82.9\%$).
     - Weighted average latency: $0.42(45) + 0.43(240) + 0.15(1{,}850) = 399.6\text{ms}$ ($5.25\times$ speedup).
4. **Hands-On Experiment Simulation:** Verified.
   - $(400\text{k} \times 0.0001) + (450\text{k} \times 0.0020) + (150\text{k} \times 0.0300) = \$5{,}440$ vs $\$30{,}000$ baseline ($81.9\%$ savings, $462.5\text{ms}$ latency).
5. **Build vs Buy TCO Model:** Verified.
   - Crossover volume formula $V^* = \frac{\text{Fixed Overhead}}{C_{\text{commercial API}} - C_{\text{self-hosted compute}}}$ is mathematically valid.
6. **Structural and Pedagogical Formatting:** Verified.
   - Frontmatter valid and conforms to `book.yml` tracks (`product`, `strategy`).
   - 4 Bloom-taxonomy objectives starting with `**Verb**`.
   - Exactly 6 highlights (`==...==`) with opening lede thesis highlight.
   - Exactly 1 stat block (`::: stat 85% & 90%`) with lining numerals.
   - Exactly 3 media cards registered in `content/sources.yml`.
   - Exactly 5 retrieval check questions with `.lvl` spans and `.flip` answers.
   - Exactly 5-line recap.
   - Zero escaped HTML tag leaks in rendered output.
   - Figure 19.1 XML is well-formed and visually styled using compendium tokens.

---

## 5. Caveats

- Milestone 3 chapters (`agentic-ux-and-interfaces.md` and `product-casebook.md`) and their figures are not part of Milestone 2, which is expected and documented as pending in test T1.10.
- Reviewer 1 is independently evaluating Chapter 18 (`ai-product-lifecycle.md`) and Figure 18.1.

---

## 6. Conclusion

Chapter 19 (`product-architecture-economics.md`) and Figure 19.1 (`product-architecture-economics.svg`) represent high-caliber, publication-grade work that passes all automated syntax, linter, compilation, and structure checks. However, because an explicit mathematical inconsistency exists in the core $Q^*$ context caching derivation across Chapter 19 and Figure 19.1 (double-counting the initial write query), the verdict is **REQUEST_CHANGES**.

The fix is surgical and straightforward (removing the redundant $+1$ and updating the query break-even threshold from 3 to 2 across 4 locations). Once applied, the chapter will be mathematically watertight.

---

## 7. Verification Method

To independently verify after changes are applied:

1. **Verify Mathematical Derivation:**
   Calculate cash costs for $Q = 1$ and $Q = 2$:
   - $Q=1$: $1 \times \$3.75 = \$3.75$ (Cached) vs $1 \times \$3.00 = \$3.00$ (Uncached).
   - $Q=2$: $\$3.75 + \$0.30 = \$4.05$ (Cached) vs $2 \times \$3.00 = \$6.00$ (Uncached).
   Confirm $Q^* = \frac{3.75 - 0.30}{3.00 - 0.30} = 1.28 \implies \mathbf{2\text{ queries}}$.

2. **Run Linter:**
   ```powershell
   npm run check
   ```
   Confirm `0 errors`.

3. **Run Progressive E2E Suite:**
   ```powershell
   node test/e2e-pm.mjs --milestone=M2 --progressive
   ```
   Confirm `Passed: 19, Failed: 0`.

4. **Verify XML Integrity:**
   ```powershell
   python -c "import xml.etree.ElementTree as ET; ET.parse('content/figures/product-architecture-economics.svg'); print('XML Valid!')"
   ```
   Confirm `XML Valid!`.
