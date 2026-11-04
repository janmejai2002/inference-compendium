# Adversarial Challenge Report: Part VI Rendering & Pipeline Integrity

## Challenge Summary

**Overall risk assessment**: **MEDIUM**

While the core rendering pipeline, SVG figures, table semantics, and HTML escape boundaries are largely resilient, adversarial stress-testing identified **three concrete rendering failures** in mathematical formula display and glossary term marginalia:
1. **Unparsed LaTeX Math Leaking in Glossary Sidenotes**: `content/glossary.yml` definitions for `expected-credit-loss`, `ecl`, `loss-given-default`, and `lgd` contain raw LaTeX syntax (`$ECL = EAD \times PD \times LGD$` and `$LGD = 1 - \text{Recovery Rate}$`). Because `render.mjs` injects glossary definitions via `${esc(g.def)}` *after* math preprocessing, KaTeX never processes them. Readers see raw backslashes and LaTeX commands in margin annotations across Chapters 22 and 25.
2. **Broken Inline Math & Literal `$$` in Chapter 25**: `content/chapters/finance-casebook.md` mixes inline math delimiters `$` with escaped dollar signs `\$` (e.g. line 272: `4 nodes $\times \$320{,}000 = \$1{,}280{,}000 \approx \text{₹}10.88\text{ Cr}$`). The inline math regex `[^\$\n]+?` in `render.mjs` cannot handle `$` inside inline math, causing the formula to fail compilation. Furthermore, accidental double dollar sequences (`= $$220{,}000` and `$$1.50$`) leak literal `$$` tokens into the compiled HTML output.
3. **Escaped HTML Tag Leaks & SVG Integrity Confirmed Clean**: Stress-testing confirmed 0 escaped HTML tag leaks (`&lt;span...&gt;`) across all rendered HTML files, all 14 GFM tables rendered as semantic `<div class="table-wrap"><table>`, and all 3 vector SVGs are valid XML and properly embedded.

**Verdict**: **REQUEST_CHANGES**

---

## Challenges

### [Medium] Challenge 1: Raw LaTeX Math Leaking into Glossary Sidenote Annotations

- **Assumption challenged**: The pipeline assumes glossary definitions in `content/glossary.yml` are plain prose strings, while worker_m1 assumed KaTeX parses LaTeX inside glossary definitions.
- **Attack scenario**: When a chapter references `[[expected-credit-loss]]` or `[[loss-given-default]]`, `render.mjs` (line 212) replaces the token with:
  ```html
  <dfn class="term">${esc(label)}</dfn><span class="sn"><span class="sn-term">${esc(g.term)}</span>${esc(g.def)}</span>
  ```
  Because glossary token expansion executes *after* math preprocessing (lines 157–184) and wraps `g.def` in `esc()`, KaTeX never evaluates the math.
- **Blast radius**: Readers inspecting margin definitions for Expected Credit Loss or Loss Given Default see literal LaTeX backslashes:
  `($ECL = EAD \times PD \times LGD$)` and `($LGD = 1 - \text{Recovery Rate}$)`.
  This breaks typographic standards across `algorithmic-underwriting-and-credit-risk.html`, `finance-casebook.html`, and `dist/print.html`.
- **Mitigation**: Update `content/glossary.yml` to remove LaTeX delimiters and use plain unicode characters, matching the other 200+ definitions in the compendium:
  - `expected-credit-loss` / `ecl`: `... calculated under IFRS 9 and Ind AS 109 as the product of exposure, probability, and loss severity (ECL = EAD × PD × LGD).`
  - `loss-given-default` / `lgd`: `... after accounting for collateral liquidation, guarantees, and recovery expenses (LGD = 1 − Recovery Rate).`

---

### [Medium] Challenge 2: Accidental `$$` and Broken Inline Currency Math in Chapter 25

- **Assumption challenged**: Inline math regex `/(?<=^|[\s(])\$(?!\$)([^\$\n]+?)(?<![\s\\])\$(?=[\s,.;:!?)\]]|$)/g` correctly parses formulas containing monetary values.
- **Attack scenario**: In `content/chapters/finance-casebook.md`:
  - **Line 272**:
    ```markdown
    - Hardware Capex: 4 nodes $\times \$320{,}000 = \$1{,}280{,}000 \approx \text{₹}10.88\text{ Cr}$. Redundant InfiniBand switching fabric, 100TB NVMe storage arrays, and power distribution units = $\$220{,}000 \approx \text{₹}1.87\text{ Cr}$. Total Capital Capex = **₹12.75 crore** (amortized over 3 years = ₹4.25 Cr/year).
    ```
    Because the regex uses `([^\$\n]+?)`, the presence of `\$` halts the match at the first dollar sign. Consequently, the math is never sent to KaTeX, and unparsed LaTeX (`\times`, `\approx`, `\text`) is printed directly in HTML.
  - Furthermore, `=\$220{,}000` is parsed by markdown-it into `= $$220{,}000`, producing an unparsed literal `$$` sequence in `dist/ch/finance-casebook.html` at character offset 151,484.
  - **Line 281**:
    ```markdown
    - Domestic sovereign endpoint pricing: $\$1.50$ per 1M input tokens, $\$6.00$ per 1M output tokens (assuming exchange rate ₹85/USD).
    ```
    Markdown-it unescapes `\$` into `$`, but because `$\$1.50$` starts with `\$`, it is preceded by `\` (not whitespace/paren), failing inline math detection. This produces literal `$$1.50$` and `$$6.00$` in HTML at character offset 162,194.
- **Blast radius**: In Guesstimate 1 of the Finance Casebook, executive readers see unrendered formula strings with raw backslashes and double dollar tokens (`$$1.50$`, `$$220{,}000 \approx \text{₹}1.87\text{ Cr}$`).
- **Mitigation**:
  In `content/chapters/finance-casebook.md`:
  - Line 272: Replace mixed math-currency delimiters with standard financial notation:
    `- Hardware Capex: 4 nodes at $320,000 = $1,280,000 (approx. ₹10.88 Cr). Redundant InfiniBand switching fabric, 100TB NVMe storage arrays, and power distribution units = $220,000 (approx. ₹1.87 Cr). Total Capital Capex = **₹12.75 crore** (amortized over 3 years = ₹4.25 Cr/year).`
  - Line 281: Write plain currency figures without unnecessary backslashes:
    `- Domestic sovereign endpoint pricing: $1.50 per 1M input tokens, $6.00 per 1M output tokens (assuming exchange rate ₹85/USD).`

---

## Stress Test Results

| Test Scenario | Target | Expected Behavior | Actual Behavior | Result |
|---|---|---|---|---|
| Escaped HTML Tag Leaks | `dist/ch/*.html`, `dist/print.html` | 0 occurrences of `&lt;span...&gt;`, `&lt;div...&gt;` | 0 leaked HTML tags found in prose | **PASS** |
| KaTeX Error Class Detection | `dist/ch/*.html`, `dist/print.html` | 0 `.katex-error` or `.math-raw` tags | 0 error classes across all files | **PASS** |
| Display Math Rendering | Chapters 22, 23, 24, 25 | All display blocks ($$...$$) render formula divs | 85/85 display formulas rendered cleanly | **PASS** |
| Inline Math & Currency Delimiters | `finance-casebook.md` lines 272, 281 | Clean KaTeX rendering without literal `$$` | Literal `$$` and unparsed `\times`, `\approx` in HTML | **FAIL** |
| Sidenote Glossary Formula Math | `glossary.yml` (ECL, LGD) | Sidenote annotations render without raw backslashes | Raw `\text`, `\times` leak into sidenotes | **FAIL** |
| GFM Table Semantic Wrappers | All 14 Part VI tables | `<div class="table-wrap"><table>` with thead, tbody | 14/14 tables correctly structured | **PASS** |
| Table Code Block Isolation | Chapters 22–25 | No markdown tables trapped inside `<pre><code>` | 0 tables trapped inside code blocks | **PASS** |
| SVG Structure & Namespace | 3 Part VI figures | Valid `<svg>`, `xmlns`, and `viewBox` attributes | 3/3 SVGs valid with correct viewBox | **PASS** |
| SVG XML Character Escaping | 3 Part VI figures | No raw unescaped `&` in XML elements/attributes | 0 unescaped ampersands outside comments | **PASS** |
| SVG Figure HTML Embeds | `print.html`, `ch/*.html` | Embedded within `<figure class="fig" id="fig-...">` | 3/3 figures properly embedded with figcaptions | **PASS** |
| Navigation & Track Filtering | `dist/index.html` | Part VI present in TOC with 4 chapters & filter pill | Part VI in TOC; 4 rows tagged `data-track="finance"` | **PASS** |
| Offline Linter (`check.mjs`) | Entire repo | 0 errors | 0 errors, 53 warnings | **PASS** |
| E2E Tier 2 Boundary Suite | `test/e2e-fin.mjs` | 28/28 tests pass | 28/28 passed (100%) | **PASS** |

---

## Unchallenged Areas

- **Headless Chromium PDF Layout & Pagination (`npm run pdf`)**:
  Full PDF compilation takes ~40–60s and is strictly allocated to the M4 release milestone (`worker_m4`), which follows gate sign-off.
- **Link Checking Against External HTTP Endpoints (`npm run check:links`)**:
  Network calls to external domains are tested offline per repository policy.
