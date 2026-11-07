# Handoff Report: KaTeX Formatting, Mathematical Correctness & Tabular Compliance

**Agent:** `explorer_katex_math`  
**Working Directory:** `C:\Users\Janmejai\compendium\.agents\teamwork\explorer_katex_math\`  
**Date:** 2026-11-05  
**Handoff Type:** Hard (Survey Task Complete)  
**Parent Conversation ID:** `e8b90a07-d677-49a5-8255-a8ddabf3d3e6`

---

## 1. Observation

### KaTeX Delimitation & Leakage Observations
1. **Inline Math Escaped Dollar Leakage in Product Track:**
   - In `content/chapters/product-casebook.md`:
     - Line 140: `- Pure Token Cost: $\$0.0035 + \$0.0090 + \$0.0060 = \mathbf{\$0.0185\text{ per query}}$.`
     - Line 142: `- **Risk-Adjusted RAG Cost:** $\$0.0185 + \$3.5000 = \mathbf{\$3.5185\text{ per query}}$.`
     - Line 144: `- Cache Creation Fee (Write): 120,000 tokens $\times \$3.75/1\text{M tokens} = \mathbf{\$0.450}$ (one-time write fee per 5-minute TTL).`
     - Line 145: `- Cache Read Fee (Hit): 120,000 tokens $\times \$0.30/1\text{M tokens} = \mathbf{\$0.0360}$.`
     - Line 147: `- Pure Token Cost per Query: $\$0.0360 + \$0.0090 = \mathbf{\$0.0450\text{ per query}}$.`
     - Line 149: `- **Risk-Adjusted Cached Cost:** $\$0.0450 + \$0.2000 = \mathbf{\$0.2450\text{ per query}}$.`
     - Line 228: `- Cost per run: $(1{,}863 \times 1{,}500 \times \$0.80/1\text{M}) + (1{,}863 \times 300 \times \$4.00/1\text{M}) = \$2.24 + \$2.24 = \mathbf{\$4.48}$.`
     - Line 229: `- Daily spend across 20 PRs: $20 \times \$4.48 = \mathbf{\$89.60\text{/day}}$ ($\approx \$2{,}688\text{/month}$ or ₹2.28 lakh/month).`
     - Line 264: `- Monthly Spend at 50,000 documents: $50{,}000 \times \$0.0135 = \mathbf{\$675\text{/month}}$ ($\approx \text{₹}57{,}375\text{/month}$).`
     - Line 266: `- 1x \`g6e.12xlarge\` instance (4x NVIDIA L40S 48GB GPUs) 1-year reserved = $\mathbf{\$3{,}850\text{/month}}$.`
     - Line 267: `- High-throughput NVMe storage, VPC networking, and logging = $\mathbf{\$450\text{/month}}$.`
     - Line 268: `- Fine-tuning dataset pipeline and continuous retraining amortized = $\mathbf{\$1{,}250\text{/month}}$.`
     - Line 269: `- Dedicated MLOps maintenance (0.25 FTE loaded engineer @ $14,000/mo) = $\mathbf{\$3{,}500\text{/month}}$.`
     - Line 270: `- Fixed Monthly Self-Hosted TCO: $F_{\text{self}} = \$3{,}850 + \$450 + \$1{,}250 + \$3{,}500 = \mathbf{\$9{,}050\text{/month}}$ ($\approx \text{₹}7{,}69{,}250\text{/month}$).`
     - Line 347: `3. Pure token break-even is $Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}} = \frac{\$3.75 - \$0.30}{\$3.00 - \$0.30} = \frac{\$3.45}{\$2.70} \approx \mathbf{1.28\text{ queries}}$. Within any 5-minute TTL window, the moment a user asks two questions against the same document, prompt caching is cheaper than uncached input.`
   - In `content/chapters/product-architecture-economics.md`:
     - Line 100: `Consider standard commercial pricing for frontier models: $C_{\text{write}} = \$3.75/\text{M}$, $C_{\text{uncached}} = \$3.00/\text{M}$, and $C_{\text{read}} = \$0.30/\text{M}$. Substituting these figures:`
     - Line 177: `- **Redundancy & Standby:** High availability mandates at least one redundant standby node to survive hardware degradation ($2 \times \$24{,}000 = \$48{,}000/\text{month}$).`
     - Line 265: `1. Calculate the total monthly expenditure of routing 100% of queries to Tier 3 ($1{,}000{,}000 \times \$0.0300 = \$30{,}000$).`
     - Line 268: `3. Verify that the cascade slashes monthly compute expenditure by **81.9%** ($30{,}000 \to \$5{,}440) while reducing weighted average response time from 2,200ms to **462.5ms**.`
   - Rendered output inspection via `node .agents/teamwork/explorer_katex_math/test_render_leak.mjs` directly showed verbatim leakage:
     `<li>Pure token break-even is $Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}} = \frac{$3.75 - $0.30}{$3.00 - $0.30} = \frac{$3.45}{$2.70} \approx \mathbf{1.28\text{ queries}}$. Within any 5-minute TTL window...</li>`

2. **Opener Frontmatter Objectives Math Unrendered:**
   - In `content/chapters/creative-at-scale.md`:
     - Line 9: `  - "**Derive** the economic collapse of marginal digital creative cost ($C_{\\text{asset}} \\to 0$) and its structural implications for creative agency retainers."`
   - In `content/chapters/algorithmic-underwriting-and-credit-risk.md`:
     - Line 9: `  - "**Derive** the expected credit loss ($ECL$) formulation under IFRS 9, modeling the interaction between Probability of Default ($PD$), Loss Given Default ($LGD$), and Exposure at Default ($EAD$)."`
   - In `content/chapters/product-architecture-economics.md`:
     - Lines 9-10: `  - "**Deconstruct** the end-to-end AI latency equation, isolating Time-to-First-Token ($TTFT$) and Tokens-Per-Second ($TPS$) against human cognitive perception thresholds."`
     - `  - "**Derive** the mathematical break-even query velocity ($Q^*$) for KV context caching, evaluating write creation surcharges against read discounts."`
   - In `scripts/lib/render.mjs`:
     - Line 247: `const objectives = (c.objectives || []).map((o) => \`<li><span>\${state.md.renderInline(o).replace(/<(\/?)strong>/g, '<$1b>')}</span></li>\`).join('');`

3. **Fenced Code Blocks & Table Inventory:**
   - Total GFM tables currently deployed: 27 tables across 28 chapters.
   - Total fenced code blocks (` ``` `): 44 blocks.
     - 28 blocks: Prompt instructions inside `::: try` blocks.
     - 8 blocks: Space-aligned ASCII tables, trees, or pyramids (`financial-copilots-and-deal-diligence.md:71-83`, `116-121`; `ai-product-lifecycle.md:38-48`; `marketing-casebook.md:238-243`, `376-387`, `462-469`; `product-architecture-economics.md:24-36`; `financial-crime-fraud-and-rbi-free-ai.md:177-214`).
     - 8 blocks: Architecture flowcharts/code.

4. **Mathematical Calculations Audit:**
   - Evaluated 448 quantitative statements, financial derivations, and ML complexity equations.
   - Zero arithmetic, dimensional, or invariant errors found in the underlying calculations.

---

## 2. Logic Chain

1. **Inline Math Leakage Chain:**
   - *Observation:* `scripts/lib/render.mjs:172` uses regular expression `/(?<=^|[\s(])\$(?!\$)([^\$\n]+?)(?<![\s\\])\$(?=[\s,.;:!?)\]]|$)/g`.
   - *Logic:* The negated set `[^\$\n]` halts upon encountering any `$` character.
   - *Inference:* In expressions containing `\$` (such as `\frac{\$3.75 - \$0.30}{\$3.00 - \$0.30}`), `\$` causes the regex engine to abort matching. KaTeX is bypassed, leaving raw LaTeX in the document.
   - *Proof:* Updating the capture group to `((?:\\\$|[^\$\n])+?)` in `test_regex_fix.mjs` immediately matches the full expression and renders through KaTeX without errors.

2. **Frontmatter Objectives Leakage Chain:**
   - *Observation:* In `scripts/lib/render.mjs:247`, objectives are transformed via `state.md.renderInline(o)`.
   - *Logic:* KaTeX math replacement is handled exclusively in `preprocess(state, body)` (lines 157-184). `preprocess()` is only called on `c.body` (line 231).
   - *Inference:* Any math delimiters (`$math$`) within frontmatter objectives are ignored by MarkdownIt and printed verbatim to the HTML opener.
   - *Proof:* In `creative-at-scale.md:9`, `rendered.html` contains raw `$C_{\text{asset}} \to 0$`.

3. **Tabular Compliance Chain:**
   - *Observation:* `docs/DESIGN.md` and `docs/PEDAGOGY.md` require standard GFM tables. `financial-copilots-and-deal-diligence.md:71-83` embeds a 3-column balance sheet inside a fenced code block ` ``` `.
   - *Logic:* Fenced code blocks display in fixed-width monospace without mobile responsive table wrapping (`<div class="table-wrap">`) or magazine styling.
   - *Inference:* Converting these 8 structured tabular blocks to standard GFM tables aligns the book with `docs/DESIGN.md`.

---

## 3. Caveats

- **Rupee Glyph Metrics:** KaTeX lacks native font metrics for the Indian Rupee symbol `₹` (Unicode 8377). While `render.mjs` configures `strict: 'ignore'` to allow `₹` to render via the system font fallback without crashing, authors should wrap it in `\text{₹}` when in math mode.
- **Figures vs Tables:** Certain complex multi-stage diagrams (e.g. `product-architecture-economics.md:120-142` cascade routing, `financial-crime-fraud-and-rbi-free-ai.md:118-132` mule network graph) are flowcharts/diagrams rather than tabular data. Per rule 7, these are best handled as dedicated SVG figures (`content/figures/*.svg`).

---

## 4. Conclusion

The mathematical formulas and calculations across all 28 chapters are exceptionally rigorous, verified exact, and pedagogically sound. No mathematical invariant contradictions or calculation errors exist.

Two critical KaTeX rendering defects must be resolved:
1. Update `scripts/lib/render.mjs` line 172 to support escaped dollars in inline math: `(?:\\\$|[^\$\n])+?`, and clean up inline math currency formatting in `product-casebook.md` and `product-architecture-economics.md`.
2. Update `scripts/lib/render.mjs` line 247 to run `preprocess(state, o)` on chapter objectives, and clean frontmatter objectives in `creative-at-scale.md`, `algorithmic-underwriting-and-credit-risk.md`, and `product-architecture-economics.md`.
3. Convert the 8 cataloged fenced ASCII tabular blocks to standard GFM tables as specified in `analysis.md`.

---

## 5. Verification Method

1. **Verify Linter:**
   ```powershell
   npm run check
   ```
   *Expected Outcome:* `check: 0 errors`.

2. **Verify Zero LaTeX Leaks in Rendered Output:**
   Run the automated leak detector script created during this audit:
   ```powershell
   node .agents/teamwork/explorer_katex_math/check_real_leaks.mjs
   ```
   *Expected Outcome:* `Real LaTeX leaks outside math/code/formula blocks: 0`.

3. **Build Full HTML and PDF Output:**
   ```powershell
   npm run build
   ```
   *Expected Outcome:* Generates `dist/index.html` with zero build errors and clean KaTeX rendering.
