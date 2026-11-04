# Milestone 3 Specification Checklist & Invariant Guard

**Author:** Spec Miner M3 (`teamwork_spec_miner`)  
**Target Milestone:** Milestone 3 (Advanced PM Chapters & Casebook)  
**Deliverables Covered:**
- `content/chapters/agentic-ux-and-interfaces.md` (Chapter 20)
- `content/chapters/product-casebook.md` (Chapter 21)
- `content/figures/agentic-ux-and-interfaces.svg` (Figure 20.1)
- `content/figures/product-casebook.svg` (Figure 21.1)
**Date:** 2026-11-04  

---

## 1. Executive Summary & Scope

Milestone 3 expands the Product Management (PM) Track of *INFERENCE* (Part V) with its two advanced chapters and accompanying SVG figures. This specification mines the exact contracts from `content/toc.yml`, `content/sources.yml`, `content/glossary.yml`, `test/e2e-pm.mjs`, `scripts/check.mjs`, `scripts/lib/render.mjs`, `docs/PEDAGOGY.md`, `docs/AUTHORING.md`, and the empirical findings of Milestone 2.

```
                              INFERENCE v3: Part V (PM Track)
 ┌───────────────────────────────────┐               ┌───────────────────────────────────┐
 │ Chapter 18: ai-product-lifecycle  │ (M2 - DONE)   │ Chapter 19: product-arch-econ     │ (M2 - DONE)
 └───────────────────────────────────┘               └───────────────────────────────────┘
                                           │
                                           ▼
 ┌───────────────────────────────────┐               ┌───────────────────────────────────┐
 │ Chapter 20: agentic-ux-interfaces │ (M3 - TARGET) │ Chapter 21: product-casebook      │ (M3 - TARGET)
 │ Figure 20.1: agentic-ux-interfaces│               │ Figure 21.1: product-casebook     │
 └───────────────────────────────────┘               └───────────────────────────────────┘
```

---

## 2. Milestone 2 Lessons Learned & Critical Pitfalls

Milestone 2 audits revealed five critical failure modes. Every M3 worker, reviewer, and auditor must enforce these guardrails:

### ⚠️ Pitfall 1: Compound Bracket Citations Leaking (`[@a; @b]` BANNED)
- **The Bug:** `[@anthropic-context-caching; @google-gemini-long-context]` or `[@cagan-transformed-ai; @cagan-svpg-ai-risk]`.
- **The Mechanism:** `scripts/lib/render.mjs:197` parses citations using regex `/\[@([\w-]+)\]/g`. Semicolons, commas, and spaces cause the replacer to fail completely.
- **The Consequence:** Raw bracket syntax `[@...; @...]` leaks verbatim into rendered HTML and PDF; the cited sources are not recorded in `state.cited`, causing `scripts/check.mjs` to emit warnings and failing test `T3.1`.
- **Strict Invariant:** Citations MUST be discrete single brackets:
  ```markdown
  <!-- CORRECT -->
  [@anthropic-context-caching] [@google-gemini-long-context]
  
  <!-- FORBIDDEN -->
  [@anthropic-context-caching; @google-gemini-long-context]
  ```

### ⚠️ Pitfall 2: KaTeX Math and HTML Inside Container Titles BANNED
- **The Bug:** `::: case Break-even $Q^*$ Analysis` or `::: concept $HBM$ Architecture`.
- **The Mechanism:** `preprocess()` in `render.mjs` runs math rendering (KaTeX) BEFORE container block parsing. If `$math$` is placed in a container header, KaTeX replaces it with `<span class="katex">...</span>`. Subsequently, `markdown-it-container` processes the header via `md.renderInline(info)`, which entity-escapes `<span` into `&lt;span class="katex"&gt;`.
- **The Consequence:** Escaped HTML tag leaks appear in rendered prose, failing `scripts/check.mjs` (line 51) and E2E test `T2.6`.
- **Strict Invariant:** NO KaTeX math (`$math$`) or raw HTML in ANY container header line (`::: principle`, `::: case`, `::: concept`, `::: stat`, `::: try`, `::: interview`, `::: check`, etc.). Titles must be plain text words. Put math formulas in the block body:
  ```markdown
  <!-- CORRECT -->
  ::: case Case 1: FinTech Context Caching Break-Even Volume
  Evaluating the break-even volume $Q^*$ for key-value attention caching...
  :::
  
  <!-- FORBIDDEN -->
  ::: case Case 1: Break-even $Q^*$ Volume
  :::
  ```

### ⚠️ Pitfall 3: Stat Block Lining Numerals
- **The Mechanism:** `::: stat <value>` renders directly into `<p class="stat-n"><value></p>`.
- **Strict Invariant:** `<value>` must be a concise, plain number, percentage, or multiplier with lining numerals (e.g. `::: stat 72%`, `::: stat 100ms`, `::: stat 85% & 90%`, `::: stat ₹3.08L vs $48M`). Do NOT put sentences, markdown formatting, or math expressions in `<value>`. The contextual explanation and citation belong in the container body:
  ```markdown
  ::: stat 1.2s vs 8.4s
  The perceived latency drop when replacing turn-based conversational chat loops with an ambient agentic HUD streaming speculative UI updates.
  <span class="src">Sources: Card et al. (1983) [@card-moran-newell-psychology-hci]</span>
  :::
  ```

### ⚠️ Pitfall 4: Mandatory `::: case` Container Syntax in Chapter 21
- **The Discovery:** Test `T1.9` in `test/e2e-pm.mjs:516` asserts:
  ```javascript
  const cases = (ch.body.match(/:::\s*case\b/g) || []).length;
  assert.ok(cases >= 4, `Chapter 21 must contain at least 4 detailed strategic cases, found ${cases}`);
  ```
- **Strict Invariant:** In `product-casebook.md`, the 4 strategic cases MUST be enclosed in `::: case <Title>` containers, NOT bare markdown headings (`### Case 1`).

### ⚠️ Pitfall 5: SVG Visual Flow and Arrowhead Coordinates
- **The Bug:** Inverted arrowheads pointing upward against a downward vertical process flow.
- **Strict Invariant:** In diagrams laid out top-to-bottom, connecting arrows must point downward (increasing $y$). ViewBox must be `0 0 640 330` with accessible `aria-label` describing both panels.

---

## 3. Frontmatter Contracts

Frontmatter must match `content/toc.yml` exactly:

### Chapter 20: `agentic-ux-and-interfaces.md`
```yaml
---
id: agentic-ux-and-interfaces
title: "Agentic UX: ambient HUDs, canvas workspaces, and human-in-the-loop"
deck: "Transcending the chat bubble: proactive agentic assistance, collaborative canvas architectures, cognitive ergonomics, and designing trusted human-in-the-loop control loops."
level: Zero to one
tracks: [product, consulting]
prereq: [models-that-act]
hook: "An enterprise procurement platform introduces an autonomous negotiation agent. When designed as a conversational chat assistant, enterprise buyers abandoned 64% of sessions due to conversational fatigue and lack of visibility. When re-architected into an ambient canvas HUD with one-click approval chips, transaction velocity increased fivefold. Why is the chat interface toxic for complex knowledge work, and how do you design agentic interfaces that users genuinely trust?"
objectives:
  - "**Deconstruct** the cognitive failure modes of conversational chat interfaces for non-trivial workflows, evaluating turn-taking friction against the 1.2-second glance rule."
  - "**Architect** ambient agentic HUDs and bi-directional canvas surfaces that balance proactive background assistance with low cognitive overhead."
  - "**Formulate** a graduated human-in-the-loop (HITL) control spectrum, mapping action irreversibility and blast radius to explicit verification gates."
  - "**Evaluate** agentic trust mechanics, incorporating reversible execution, visual audit trails, and automated circuit breakers."
---
```

### Chapter 21: `product-casebook.md`
```yaml
---
id: product-casebook
title: "The Product AI casebook & interview room"
deck: "Eight fully-worked quantitative PM cases and estimation problems covering context caching ROI, cascade routing economics, eval harness calibration, agentic latency budgets, and build-vs-buy TCO."
level: Zero to one
tracks: [product, consulting]
prereq: [ai-product-lifecycle, product-architecture-economics, agentic-ux-and-interfaces]
hook: "In an executive PM interview at an Indian fintech unicorn, the Head of Product challenges you: 'We spend ₹18 crore annually on frontier reasoning models for our credit analysis and merchant underwriting assistant. Our p95 latency is 6.2 seconds, causing 38% user drop-off. The engineering team proposes fine-tuning an open-source 8B model, while our AI architect insists on prompt caching and a cascade router. Walk me through the unit economics, derive the exact break-even volumes, and present an executive migration roadmap.' How do you structure your answer?"
objectives:
  - "**Decompose** ambiguous AI product dilemmas into rigorous quantitative trees, linking inference token economics directly to business gross margins and user retention."
  - "**Master** the four core product case archetypes: context caching break-even ROI, multi-tier cascade routing optimization, evaluation harness calibration, and end-to-end agentic latency budgeting."
  - "**Execute** quantitative market and compute estimations across synthetic evaluation generation costs, build-versus-buy TCO crossover volume, and token throughput sizing."
  - "**Synthesize** technical AI trade-offs with commercial strategy, communicating defensible recommendations under interview room pressure."
---
```

---

## 4. Test Runner Assertions & Invariant Mapping

All assertions in `test/e2e-pm.mjs` must pass. Here is the exact mapping:

| Test ID | Tier | Milestone | Feature | Exact Assertion & Requirement |
|---|---|---|---|---|
| **T1.8** | Tier 1 | M3 | F08 | `agentic-ux-and-interfaces.md` exists; frontmatter `id: agentic-ux-and-interfaces`; non-empty `title`, `deck`, `hook`; `tracks` includes `product`; 3–4 `objectives` each starting with `^\*\*[A-Z][a-z]+\*\*` (bold Bloom verb). |
| **T1.9** | Tier 1 | M3 | F09 | `product-casebook.md` exists; frontmatter `id: product-casebook`; non-empty `title`; `(body.match(/:::\s*case\b/g) \|\| []).length >= 4` (at least 4 `::: case` blocks); KaTeX math present (`$$...$$` or `$math$`). |
| **T1.10** | Tier 1 | M2/M3 | F10 | Both SVG figures exist in `content/figures/` (`agentic-ux-and-interfaces.svg` and `product-casebook.svg`); each contains `<svg` root with valid XML. |
| **T2.1-ch** | Tier 2 | M3 | F08/F09 | Highlights count `==...==` between **4 and 8 inclusive** per chapter. First highlight in lede must encapsulate chapter's core thesis. |
| **T2.2-ch** | Tier 2 | M3 | F08/F09 | Stat block count **exactly 1** (`::: stat <value>`) per chapter with lining numerals. |
| **T2.3-ch** | Tier 2 | M3 | F08/F09 | Media cards count between **1 and 3 inclusive** (`{{read/paper/watch/listen id}}`) per chapter. |
| **T2.4-ch** | Tier 2 | M3 | F08/F09 | Check questions count between **4 and 6 inclusive** ending with `<span class="lvl">recall\|apply\|explain\|transfer\|judge</span>` inside `::: check Check yourself`, followed by `::: answers` inverted container. |
| **T2.5-ch** | Tier 2 | M3 | F08/F09 | Night-before recap inside `::: recap The night-before page` containing **exactly 5 numbered lines** (`^\s*\d+\.\s+`). |
| **T2.6-ch** | Tier 2 | M3 | F08/F09 | Zero escaped HTML leaks (`&lt;span...&gt;`, `&lt;div...&gt;`, etc.) in rendered HTML. |
| **T2.7-ch** | Tier 2 | M3 | F08/F09 | Anti-AI writing guard: zero occurrences of banned tropes (delve, tapestry, game-changer, etc.). |
| **T3.1** | Tier 3 | M2/M3 | F01/F08-09 | All citations `[@id]` and media cards `{{... id}}` exist in `content/sources.yml`. **Crucial:** Across all 4 PM chapters, all 8 PM sources must be cited. `anthropic-prompt-engineering-interactive` MUST be cited in Ch 20 or Ch 21. |
| **T3.2** | Tier 3 | M2/M3 | F03/F08-09 | All glossary links `[[term-id]]` exist in `content/glossary.yml`. **Crucial:** Across all 4 PM chapters, all 6 PM glossary terms must be linked. `[[agentic-ux]]` MUST be linked in Ch 20 or Ch 21. |
| **T3.3** | Tier 3 | M2/M3 | F10/F08-09 | Figure embeds `{{figure id \| ...}}` match existing files at `content/figures/${id}.svg`. |
| **T3.4** | Tier 3 | M1/M3 | F04/F05 | Auto-increment sequence: Chapter 20 is `agentic-ux-and-interfaces`, Chapter 21 is `product-casebook`. |
| **T4.1** | Tier 4 | M4 | F11 | `npm run build` compiles 24/24 chapters successfully. |

---

## 5. Canonical Sources & Glossary Registry Binding

### 5.1 The 8 PM Sources (`content/sources.yml`)
Milestone 2 cited 7 of 8 sources. Milestone 3 **MUST cite the 8th source (`anthropic-prompt-engineering-interactive`)** and may cross-cite the others:

| Source ID | Type | Tier | Creator | Year | Status in PM Track | Required in M3 |
|---|:---:|:---:|---|:---:|:---:|:---:|
| `openai-evals-framework` | article | A | OpenAI | 2024 | Cited in Ch 18 | Optional cite in Ch 21 |
| `anthropic-context-caching` | article | A | Anthropic | 2024 | Cited in Ch 19 | Recommended cite in Ch 21 |
| `anthropic-prompt-engineering-interactive` | article | A | Anthropic | 2025 | **NOT YET CITED** | **MANDATORY in Ch 20 or Ch 21** |
| `google-gemini-long-context` | paper | A | Mnasri, Reid, et al. | 2024 | Cited in Ch 19 | Optional cite in Ch 20/21 |
| `cagan-transformed-ai` | book | B | Marty Cagan / SVPG | 2024 | Cited in Ch 18 | Recommended cite in Ch 20/21 |
| `cagan-svpg-ai-risk` | article | B | Marty Cagan | 2024 | Cited in Ch 18 | Optional cite in Ch 20 |
| `zheng-judging-llm-as-judge` | paper | A | Lianmin Zheng et al. | 2023 | Cited in Ch 18 | Recommended cite in Ch 21 |
| `card-moran-newell-psychology-hci` | book | A | Card, Moran, Newell | 1983 | Cited in Ch 19 | **MANDATORY in Ch 20 (Perception)** |

### 5.2 The 6 PM Glossary Terms (`content/glossary.yml`)
Milestone 2 linked 5 of 6 terms. Milestone 3 **MUST link the 6th term (`[[agentic-ux]]`)** and can reinforce the others:

| Glossary Term ID | Display Term | Status in PM Track | Required in M3 |
|---|---|:---:|:---:|
| `eval-harness` | Evaluation harness (Eval harness) | Linked in Ch 18 | Recommended link in Ch 21 |
| `synthetic-evals` | Synthetic evaluations | Linked in Ch 18 | Recommended link in Ch 21 |
| `latency-budget` | Latency budget | Linked in Ch 19 | Recommended link in Ch 20 & 21 |
| `context-caching` | Context caching | Linked in Ch 19 | Recommended link in Ch 21 |
| `model-routing` | Model routing | Linked in Ch 19 | Recommended link in Ch 21 |
| `agentic-ux` | Agentic UX | **NOT YET LINKED** | **MANDATORY in Ch 20 & Ch 21** |

---

## 6. Pedagogical Architecture & Structural Arcs

### 6.1 Chapter 20: `agentic-ux-and-interfaces.md` (2,700–3,300 words)

1. **Opener:** YAML frontmatter with 4 Bloom objectives, hook, and metadata.
2. **Lede (§ 20.1):** Grounding in familiar knowledge work friction. The failure of the conversational chat bubble (typing fatigue, lost context, cognitive overload). First highlighted sentence: ==The chat bubble is a conversational trap; the future of agentic product design is ambient, proactive, and embedded directly into the user's canvas.==
3. **From First Principles (§ 20.2):** `::: principle Cognitive ergonomics of agentic interaction`
   - Derivation of cognitive processing cycles, working memory limits, and the 1.2-second glance rule.
4. **Concept Cards:**
   - `::: concept Agentic HUD` (**Plain words**, **Analogy**, **Misconception**)
   - `::: concept Ambient Ergonomics`
5. **Conversational vs Canvas Architectures (§ 20.3):**
   - High-density comparative table: Turn-taking chat vs Bi-directional canvas.
   - Structured XML interfaces and tool steering [@anthropic-prompt-engineering-interactive].
6. **Figure 20.1 Embed:**
   - `{{figure agentic-ux-and-interfaces | The Agentic UX Spectrum: Left, the transition from conversational chat to ambient canvas HUDs; Right, the graduated human-in-the-loop (HITL) autonomy ladder. | Sources: Card, Moran, & Newell (1983); Anthropic (2025)}}`
7. **Stat Block:**
   - `::: stat 1.2s vs 8.4s` with plain lining numbers and citation to [@card-moran-newell-psychology-hci].
8. **Myth / Reality:**
   - `::: myth` refuting "Natural language conversation is the universal interface for AI."
9. **Graduated Human-in-the-Loop (HITL) Control Gates (§ 20.4):**
   - Four-level autonomy framework:
     - Level 0: Pure advisory suggestion (glanceable inline ghost text).
     - Level 1: One-click user confirmation (staged diffs, action chips).
     - Level 2: Reversible autonomous execution with automated undo and notification.
     - Level 3: Unattended autonomous execution bounded by deterministic financial/policy circuit breakers.
10. **Worked Case:**
    - `::: case Enterprise Workflow: Transforming B2B Procurement` (Situation, The Decision, The Architecture, The Verification).
11. **Lenses:**
    - `::: lens product`, `::: lens consulting`, `::: lens operations`.
12. **Interview Room:**
    - `::: interview Redesigning an AI Copilot Interface` (Q, Strong opening quote, What they test, Strong structure).
13. **Try It Yourself:**
    - `::: try Building an Ambient Agentic Prompt Brief` (Prompt instructions with XML tags).
14. **Media Cards (1–3 cards):**
    - `{{paper card-moran-newell-psychology-hci}}`
    - `{{read anthropic-prompt-engineering-interactive}}`
    - `{{book cagan-transformed-ai}}`
15. **Check Yourself (5 questions across Bloom levels):**
    - `::: check Check yourself` with questions tagged `<span class="lvl">recall|apply|explain|transfer|judge</span>`.
    - `::: answers` container with inverted flip answers.
16. **The Night-Before Page:**
    - `::: recap The night-before page` containing **exactly 5 numbered lines**.

---

### 6.2 Chapter 21: `product-casebook.md` (3,000–3,600 words)

1. **Opener:** Frontmatter with 4 Bloom objectives, hook, and casebook metadata.
2. **Lede (§ 21.1):** The reality of executive PM interviews at Indian and global tech firms (Google, Microsoft, Swiggy, Zepto, Flipkart, CRED). Why hand-waving AI strategy fails. First highlight: ==Excelling in a quantitative AI product management interview requires walking the complete operational chain: from model inference latencies and cache break-even thresholds to unit margin impact and bottom-line P&L contribution.==
3. **From First Principles (§ 21.2):** `::: principle Build product management math from zero`
   - Derivation of token unit economics, TTFT vs TPS latency budgets, break-even formulas.
4. **Casebook Taxonomy Overview:**
   - Figure embed: `{{figure product-casebook | The Product AI Casebook Taxonomy: Four strategic product cases on the left, and four quantitative estimation models on the right. | Sources: OpenAI (2024); Anthropic (2024); Google DeepMind (2024); Card et al. (1983)}}`
5. **Stat Block:**
   - `::: stat ₹14.8L vs ₹86.4L` (or similar plain lining numbers showing annual cascade routing or caching savings).
6. **Concept Card:**
   - `::: concept Product Guesstimate`
7. **Four Strategic Cases (MANDATORY `::: case` BLOCKS):**
   - `::: case Case 1: SaaS Legal Copilot Context Caching Break-Even ROI`
     - Mathematical derivation of break-even query volume $Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}}$.
     - Fully worked numbers, cache hit rate sensitivity ($H = 65\% \dots 85\%$), gross margin impact.
   - `::: case Case 2: Consumer Super-App Three-Tier Cascade Model Routing`
     - Routing logic across Tier 1 (Semantic Cache / Rule), Tier 2 (Fine-tuned 8B SLM), Tier 3 (Frontier Model).
     - Blended latency and cost calculation, confidence gating threshold ($\theta \ge 0.88$).
   - `::: case Case 3: FinTech Credit Underwriting Eval Harness & LLM-as-a-Judge Calibration`
     - Designing golden test suite ($N = 1,000$ cases), mitigating position/verbosity bias with swap-evals.
     - Inter-annotator agreement derivation using Cohen's Kappa $\kappa = \frac{P_o - P_e}{1 - P_e} \ge 0.75$.
   - `::: case Case 4: Multimodal Agentic Latency Budget & Cognitive SLA Optimization`
     - End-to-end allocation across ASR ($120\text{ms}$), intent routing ($40\text{ms}$), RAG ($140\text{ms}$), TTFT ($280\text{ms}$), and streaming token delivery ($60\text{ TPS}$).
     - Aligning total response time with Card-Moran-Newell $1.0\text{s}$ cognitive flow boundary.
8. **Four Quantitative Estimation Problems / Guesstimates:**
   - *Guesstimate 1:* Estimating Build vs Buy TCO Crossover Volume $V^*$ for an in-house open-source fine-tuned model vs proprietary API.
   - *Guesstimate 2:* Sizing Daily Token Infrastructure and GPU Cluster Requirements for an Indian Quick-Commerce Customer Support Agent.
   - *Guesstimate 3:* Sizing Synthetic Evaluation Dataset Generation Compute & API Budget for an Enterprise Healthcare Assistant.
   - *Guesstimate 4:* Estimating User Drop-Off Rate as a Function of Agentic Multi-Hop Latency ($1\text{s} \to 5\text{s} \to 10\text{s}$).
9. **Lenses:** `::: lens product`, `::: lens consulting`.
10. **Interview Room:** `::: interview Defending an AI Product Trade-off in the Boardroom`.
11. **Media Cards (1–3 cards):**
    - `{{article openai-evals-framework}}`
    - `{{article anthropic-context-caching}}`
    - `{{paper zheng-judging-llm-as-judge}}`
12. **Check Yourself (5 questions across Bloom levels):**
    - `::: check Check yourself` + `::: answers`.
13. **The Night-Before Page:**
    - `::: recap The night-before page` (**exactly 5 numbered lines**).

---

## 7. Anti-AI Writing Constraints & Banned Lexicon

The test runner strictly asserts zero matches for the following regexes (`T2.7`):

| Pattern Regex | Prohibited Phrasing | Human Engineering Alternative |
|---|---|---|
| `\bin today'?s (?:fast-paced\|rapidly evolving\|digital) world\b` | "In today's fast-paced digital world..." | State the operational constraint directly: "In low-latency production..." |
| `\bdelve(?:s\|d)? into\b` | "Let us delve into latency..." | "We analyze latency...", "Let us inspect..." |
| `\ba testament to\b` | "...is a testament to model capability..." | "Demonstrates 99.2% accuracy..." |
| `\bbeacon of\b` | "...stands as a beacon of..." | State direct factual status. |
| `\btapestry of\b` | "...a rich tapestry of interfaces..." | "A heterogeneous interface architecture..." |
| `\bgame-?changer\b` | "...is a game changer for PMs..." | "Reduces marginal cost by 85%..." |
| `\bplethora of\b` | "...a plethora of options..." | "Multiple candidate architectures..." |
| `\bit is (?:important\|crucial\|essential) to remember that\b` | "It is crucial to remember that..." | State the fact without preamble. |
| `\bnot only .* but also\b` | "...not only reduces cost but also..." | Use crisp declarative coordination: "...reduces cost while improving latency." |
| `\bseamlessly integrat(?:e\|es\|ed\|ing)\b` | "...seamlessly integrates with ERP..." | "...interfaces with the ERP via REST webhooks..." |

**Additional Editorial Standards:**
- **Zero superficial participial clauses:** Do NOT append `, highlighting the importance of...` or `, underscoring...` to the end of sentences.
- **Indian B-School Context:** Anchor examples in authentic Indian and global tech realities (Swiggy Instamart, Zepto quick-commerce, Zomato, CRED, Zerodha, HDFC Bank, UPI payments, RBI DPDP Act, MeitY IndiaAI Mission).

---

## 8. SVG Figure Specifications

### Figure 20.1: `content/figures/agentic-ux-and-interfaces.svg`
- **Root Element:** `<svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="...">`
- **Divider:** Vertical dividing line `<line class="rule-s" x1="335" x2="335" y1="20" y2="315" stroke-width="1"/>`
- **Left Panel:** *The Agentic UX Paradigm Shift*
  - Top: The Turn-Taking Chat Trap (Chat bubble back-and-forth, 4–6 hops, 8.4s cumulative friction, high cognitive fatigue).
  - Bottom: The Ambient Canvas HUD (Bi-directional workspace, live preview pane, one-click action chips, 1.2s glanceability).
- **Right Panel:** *Graduated Human-in-the-Loop (HITL) Autonomy Spectrum*
  - Level 0: Pure Suggestion (Inline ghost text / passive HUD).
  - Level 1: One-Click Confirmation (Staged diffs / approval chips).
  - Level 2: Reversible Autonomous Execution (Execution with automated undo).
  - Level 3: Unattended Autonomous Operation (Bounded by deterministic circuit breakers).
  - Downward pointing arrowheads (`M x y L x y+8 ...`).
- **Styling Classes:** `paper`, `wash`, `acc`, `acc-s`, `rule-s`, `ink`, `ink-s`, `t-display`.

### Figure 21.1: `content/figures/product-casebook.svg`
- **Root Element:** `<svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="...">`
- **Divider:** Vertical dividing line `<line class="rule-s" x1="335" x2="335" y1="20" y2="315" stroke-width="1"/>`
- **Left Panel:** *The Four Strategic Product AI Case Archetypes*
  - Case 1: Context Caching Break-Even ROI ($Q^*$).
  - Case 2: Multi-Tier Cascade Routing Economics ($\theta \ge 0.88$).
  - Case 3: Eval Harness Calibration & Judge Agreement (Cohen's $\kappa$).
  - Case 4: Agentic Latency Budget Allocation ($1.0\text{s}$ Cognitive SLA).
- **Right Panel:** *Quantitative Estimation Frameworks*
  - Framework 1: Build vs Buy TCO Crossover ($V^*$).
  - Framework 2: Sizing GPU Cluster & Inference Token Throughput.
  - Framework 3: Synthetic Evaluation Generation Cost Scaling.
  - Framework 4: Latency Perception Decay & Conversion Drop-Off.
- **Styling Classes:** `paper`, `wash`, `acc`, `acc-s`, `rule-s`, `ink`, `ink-s`, `t-display`.

---

## 9. Verification & Acceptance Gate Commands

Before any agent claims Milestone 3 completion, the following commands must execute cleanly in PowerShell:

```powershell
# 1. Referential integrity, domain whitelist, and HTML tag leak check (MUST be 0 errors)
npm run check

# 2. Run progressive E2E test suite for Milestone 3 (MUST pass all M1-M3 tests with 0 failures)
node test/e2e-pm.mjs --milestone=M3 --progressive

# 3. Verify single-bracket discrete citations across M3 chapters (MUST return 0 malformed)
node -e "
import fs from 'node:fs';
for (const id of ['agentic-ux-and-interfaces', 'product-casebook']) {
  const t = fs.readFileSync('content/chapters/' + id + '.md', 'utf8');
  const bad = t.match(/\[@[^\]]+;[^\]]+\]/g);
  if (bad) console.error('MALFORMED COMPOUND CITATIONS in ' + id + ':', bad);
  else console.log(id + ': all citations discrete single-bracket PASS');
}
"

# 4. Verify no raw KaTeX math in container headers (MUST return 0 leaks)
node -e "
import fs from 'node:fs';
for (const id of ['agentic-ux-and-interfaces', 'product-casebook']) {
  const t = fs.readFileSync('content/chapters/' + id + '.md', 'utf8');
  const bad = t.match(/^:::\s*\w+[^\n]*\$[^\n]+/gm);
  if (bad) console.error('MATH IN CONTAINER TITLE in ' + id + ':', bad);
  else console.log(id + ': no math in container headers PASS');
}
"

# 5. Verify multi-target build compiles all 24 chapters
npm run build
```
