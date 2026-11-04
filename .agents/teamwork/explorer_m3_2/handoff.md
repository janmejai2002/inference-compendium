# Handoff Report: Explorer 2 (Milestone 3 — Chapter 21 Blueprint)

**Agent ID**: `explorer_m3_2`  
**Identity**: `teamwork_explorer`  
**Date**: 2026-11-04  
**Working Directory**: `C:\Users\Janmejai\compendium\.agents\teamwork\explorer_m3_2\`  
**Target Chapter**: `content/chapters/product-casebook.md`  
**Target Figure**: `content/figures/product-casebook.svg`  
**Deliverables**: `drafting_blueprint.md`, `handoff.md`  

---

## 1. Observation

1. **DISPATCH.md Requirements**:
   - `C:\Users\Janmejai\compendium\.agents\teamwork\explorer_m3_2\DISPATCH.md` lines 14–39 mandate designing a comprehensive section-by-section drafting blueprint for Chapter 21 (`content/chapters/product-casebook.md`) containing all 8 fully-worked quantitative PM cases and estimation problems across Indian and global tech:
     1. Quick-commerce automated refunds & fraud trade-off (Swiggy/Zepto/Blinkit).
     2. Enterprise LLM evaluation harness ROI and sample sizing (Wilson score interval, statistical power).
     3. KV context caching break-even velocity ($Q^*$) for legal contract assistant.
     4. Three-tier cascade routing economic optimization (FinTech super-app).
     5. Multi-agent customer support latency budgeting against human wait tolerance (Card-Moran-Newell).
     6. Synthetic test data generation vs human annotation cost-accuracy frontier.
     7. Self-hosted vLLM/Ollama GPU cluster vs commercial frontier API TCO crossover volume ($V^*$).
     8. Human-in-the-loop escalation routing threshold calibration (ROC curve & operating point).
   - Accompanying Figure 21.1: `content/figures/product-casebook.svg` (viewBox="0 0 640 330") representing the PM Decision Matrix / Trade-off Frontier.

2. **Pedagogical and Syntax Invariants**:
   - `docs/PEDAGOGY.md` lines 21–36 define the 13-stage chapter arc: Opener, Lede, First Principles, Name It (concepts/glossary), Scale It / Figure, Evidence (stat/myth), Worked Cases, Lenses, Interview Room, Try It Yourself, Watch/Read (media cards), Check Yourself (Bloom questions + answers), Recap (night-before page).
   - `docs/AUTHORING.md` lines 8–55 establish the markdown container block syntax (`::: principle`, `::: concept`, `::: case`, `::: lens`, `::: interview`, `::: stat`, `::: try`, `::: check`, `::: answers`, `::: recap`).
   - `scripts/lib/render.mjs` line 185:
     ```js
     body = body.replace(/^\{\{\s*(watch|read|paper|listen|media)\s+([\w-]+)\s*\}\}\s*$/gm, ...);
     ```
     This confirms that media cards MUST use one of `watch`, `read`, `paper`, `listen`, `media`. Declaring `{{article ...}}` or `{{book ...}}` in markdown fails to match the regular expression and leaves raw unrendered tags.
   - `scripts/lib/render.mjs` line 197:
     ```js
     body = body.replace(/\[@([\w-]+)\]/g, ...);
     ```
     This confirms single-bracket citation syntax `[@source-id]` is strictly required. Compound citations like `[@source1; @source2]` will not parse.
   - `scripts/check.mjs` lines 49–54:
     ```js
     const textWithoutCode = r.html.replace(/<pre[\s\S]*?<\/pre>/g, '').replace(/<code[\s\S]*?<\/code>/g, '');
     if (/&lt;(?:span|div|math|p|table|tr|td|th|a|aside|header)[\s\S]{0,30}&gt;/.test(textWithoutCode)) {
       errors.push(`${c.id}: contains escaped HTML tag leak (&lt;span...&gt;) in rendered prose`);
     }
     ```
     KaTeX formulas inside container titles (`::: case Title with $math$`) leak escaped `&lt;span...&gt;` into `<header class="blk-h">`. Container headers must be strictly plain text.

3. **Master Registries State**:
   - `content/toc.yml` lines 321–326 verify Chapter 21 is registered: `id: product-casebook`, `title: "The Product AI casebook & interview room"`, `tracks: [product]`, `status: draft`.
   - `content/sources.yml` lines 1613–1700 confirm all 8 canonical PM sources are registered: `openai-evals-framework` (article), `anthropic-context-caching` (article), `anthropic-prompt-engineering-interactive` (article), `google-gemini-long-context` (paper), `cagan-transformed-ai` (book), `cagan-svpg-ai-risk` (article), `zheng-judging-llm-as-judge` (paper), `card-moran-newell-psychology-hci` (book).
   - `content/glossary.yml` lines 207–230 confirm all 6 PM glossary terms are registered: `eval-harness`, `synthetic-evals`, `latency-budget`, `context-caching`, `model-routing`, `agentic-ux`.

4. **Reference Implementation Analysis**:
   - `content/chapters/marketing-casebook.md` successfully implements the 8-casebook structure: 4 strategic operational cases followed by 4 quantitative estimation models, accompanied by a 640-width taxonomy SVG figure, 1 stat block, 2 media cards, 5 check questions with upside-down answers, and a 5-line recap page.

---

## 2. Logic Chain

1. **Structural Mapping (Observation 1 & 4)**:
   - To deliver the maximum pedagogical rigor for MBA placement candidates, the 8 cases must be partitioned into two symmetric halves:
     - Part 1: Four Strategic Production Cases (end-to-end system dilemmas with situation, clarifying questions, analytical core, trade-off matrix, and recommendation).
     - Part 2: Four Quantitative Estimation Problems (prompt, parameters, step-by-step arithmetic, sensitivity analysis, and strategic takeaways).
   - This directly maps all 8 required cases from `DISPATCH.md` without omission:
     - Strategic Case 1: Quick-Commerce Automated Refunds & Fraud Trade-Off (Swiggy/Zepto/Blinkit).
     - Strategic Case 2: Three-Tier Cascade Routing Economic Optimization (FinTech Super-App).
     - Strategic Case 3: Enterprise LegalTech Long-Context Prompt Caching vs. Chunked Vector RAG ($Q^*$).
     - Strategic Case 4: Human-in-the-Loop Escalation Routing & Blast Radius Calibration ($\theta^*$, ROC).
     - Estimation 1: Multi-Agent Customer Support Latency Budgeting (Card-Moran-Newell).
     - Estimation 2: Enterprise LLM Evaluation Harness ROI and Sample Sizing (Z-test, power $1-\beta=0.80$).
     - Estimation 3: Synthetic Test Data Generation vs Human Annotation Cost-Accuracy Frontier.
     - Estimation 4: Self-Hosted GPU Cluster vs Commercial Frontier API TCO Crossover Volume ($V^*$).

2. **Mathematical Precision & Solvability (Observation 1)**:
   - Every case has been mathematically solved end-to-end:
     - Quick-Commerce: Calibrated thresholds $\theta_L = 0.15$ and $\theta_H = 0.72$ route 74% to auto-approval ($<0.6\%$ fraud leakage) and 21% to human review, recovering ₹54.1 crore annually across BPO salary savings and customer churn reduction.
     - FinTech Routing: 42% Cache (₹0.002) + 43% 8B SLM (₹0.040) + 15% Frontier (₹0.850) slashes monthly spend from ₹8.50 Cr to ₹1.455 Cr (82.9% reduction) while improving average latency from 2,100ms to 399.6ms.
     - LegalTech Caching: Prefix $P = 120{,}000$ tokens, creation fee $1.25\text{x}$, read fee $0.10\text{x}$. Break-even query velocity $Q^* = 2$ queries per 5-minute TTL window; risk-adjusted cost is 14.3x cheaper than vector RAG from query #1.
     - HITL Escalation: False positive loss ($₹81{,}000$) is 450x higher than review cost ($₹180$). Optimal Bayes operating threshold $\theta^* = 0.933$. Tiered blast radius prevents payment leakage on transactions $>₹2{,}00{,}000$.
     - Latency Budget: Decomposes 20-second unoptimized multi-agent bottleneck into a 550ms TTFT / 1.8s streamed resolution using speculative decoding (160 TPS) and KV caching.
     - Eval Sizing: Two-proportion z-test with baseline $p_1 = 98.0\%$, target $\Delta = 1.5\%$, $\alpha = 0.05$, power $1-\beta = 0.80$ derives exact sample size $n = 1{,}863$ cases per run ($4.48/PR; $89.60/day across 20 PRs).
     - Synthetic Frontier: 50,000 cases generated via 65% yield synthetic pipeline + 5% expert human audit costs ₹9.07 lakh in 48 hours vs ₹32.09 lakh in 10.4 weeks for pure human annotation (71.8% savings).
     - GPU TCO Crossover: Fixed monthly cost $F_{\text{self}} = \$9{,}050$ vs variable API cost $c_{\text{API}} = \$0.0135$/doc yields volume crossover $V^* = 670{,}370$ documents/month.

3. **Linter Guardrail Pre-Emption (Observation 2 & 3)**:
   - Blueprint specifies zero math symbols in container headers to prevent `&lt;span...&gt;` leaks.
   - Blueprint mandates `{{read anthropic-context-caching}}`, `{{read openai-evals-framework}}`, and `{{paper google-gemini-long-context}}` to conform to line 185 of `render.mjs`.
   - Discrete single citation syntax `[@source-id]` specified throughout.
   - Exactly 1 stat block (`::: stat 82.9% & 14.3x`), 6 highlights (`==...==`), 5 Bloom check questions, and 5 recap lines planned.

---

## 3. Caveats

1. **Authoring Scope**: This blueprint is an architectural and mathematical design deliverable. The actual markdown file `content/chapters/product-casebook.md` and SVG file `content/figures/product-casebook.svg` must be created by the drafting agent in Milestone 3.
2. **Pricing Currency Exchange**: Currency conversions between USD and INR assume a baseline exchange rate of $1\text{ USD} = \text{₹}85.00$, consistent across the entire compendium.
3. **Hardware Infrastructure Baselines**: GPU hosting estimates reflect AWS 1-year reserved pricing for NVIDIA L40S (`g6e.12xlarge`) instances as of 2026.

---

## 4. Conclusion

The drafting blueprint for Chapter 21 (`drafting_blueprint.md`) is fully articulated, mathematically verified, and pedagogically complete. It provides downstream authoring agents with turnkey prose structures, verified equations, operational data tables, and SVG markup that strictly fulfill all constraints of `ORIGINAL_REQUEST.md`, `PROJECT.md`, and `docs/PEDAGOGY.md`.

---

## 5. Verification Method

To independently verify this blueprint:
1. **Blueprint Completeness Inspection**:
   - Inspect `C:\Users\Janmejai\compendium\.agents\teamwork\explorer_m3_2\drafting_blueprint.md`.
   - Verify all 8 cases are fully worked with explicit formulas, numerical parameters, and worked calculations.
   - Verify all 13 pedagogical stages are planned with exact frontmatter, highlights, stat block, media cards, check questions, and 5-line recap.
2. **Linter & Build Validation (Upon Drafting)**:
   - Once drafted by the writer agent into `content/chapters/product-casebook.md` and `content/figures/product-casebook.svg`:
     ```powershell
     npm run check
     npm run build
     npm run pdf
     ```
   - Invalidation conditions: Any linter error from `scripts/check.mjs` (e.g. escaped tag leak `&lt;span...&gt;`, missing frontmatter, uncited sources, invalid highlight count, or media card mismatch).
