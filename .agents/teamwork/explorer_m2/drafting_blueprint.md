# Drafting Blueprint: Foundation PM Chapters (Chapters 18 & 19)

**Milestone:** 2 (Foundation PM Chapters)  
**Author:** Milestone 2 Explorer (explorer_m2)  
**Target Chapters:**
1. `content/chapters/ai-product-lifecycle.md` (Chapter 18)
2. `content/chapters/product-architecture-economics.md` (Chapter 19)  
**Target Vector Diagrams:**
1. `content/figures/ai-product-lifecycle.svg` (Figure 18.1)
2. `content/figures/product-architecture-economics.svg` (Figure 19.1)  
**Date:** 2026-11-03

---

## 1. Executive Summary & Verification Rules

This blueprint provides the exact, publication-ready architectural, pedagogical, mathematical, and visual specifications for Chapters 18 and 19 of *INFERENCE: The AI compendium for the business mind* (Part V: Product Management).

### 1.1 Structural Compliance Matrix

| Dimension | Chapter 18: `ai-product-lifecycle` | Chapter 19: `product-architecture-economics` | Verification Standard |
| :--- | :--- | :--- | :--- |
| **Track Alignment** | `[product, consulting]` | `[product, strategy]` | Must exist in `book.yml:tracks` |
| **Pedagogical Arc** | Complete 13-stage arc | Complete 13-stage arc | `docs/PEDAGOGY.md` |
| **Highlight Density** | Exactly 6 highlights (`==...==`) | Exactly 6 highlights (`==...==`) | Allowed: 4 to 8 per chapter |
| **Thesis Highlight** | Inside opening lede paragraph | Inside opening lede paragraph | Must be 1st highlight in chapter |
| **Stat Block** | Exactly 1 (`::: stat 14% vs 0.2%`) | Exactly 1 (`::: stat 85% & 90%`) | Lining-nums + `<span class="src">` |
| **Media Cards** | 3 registered cards | 3 registered cards | Allowed: 1 to 3; in `sources.yml` |
| **Retrieval Checks** | Exactly 5 questions (`<span class="lvl">`) | Exactly 5 questions (`<span class="lvl">`) | Followed by `::: answers` |
| **Night-Before Recap**| Exactly 5 numbered lines | Exactly 5 numbered lines | `::: recap The night-before page` |
| **HTML Leaks** | Zero (`&lt;span...&gt;` clean) | Zero (`&lt;span...&gt;` clean) | NO KaTeX in container headers |
| **Figures** | `ai-product-lifecycle.svg` (640x330) | `product-architecture-economics.svg` (640x330) | Vector SVG in `content/figures/` |
| **Anti-AI Writing** | Zero banned tropes, bursty rhythm | Zero banned tropes, bursty rhythm | `anti-ai-writing.SKILL.md` |

---

## 2. Chapter 18: `ai-product-lifecycle.md`

### 2.1 Frontmatter Specification

```yaml
---
id: ai-product-lifecycle
title: "The AI product lifecycle: evals as specs, test suites, and drift"
deck: "Why product requirement documents fail for stochastic systems, how golden evaluation suites become living product contracts, LLM-as-a-judge calibration, and managing model drift in production."
level: Zero to one
tracks: [product, consulting]
prereq: [judging-output]
hook: "An Indian quick-commerce unicorn deploys an autonomous customer support agent. In sandbox testing, it resolved 94% of refund disputes cleanly. Within forty-eight hours of full rollout across Bengaluru, customer escalations surged by 300% as the model hallucinated instant UPI refund vouchers. How do you design an evaluation suite that catches behavioral regressions before code touches production?"
objectives:
  - "**Deconstruct** why classical deterministic PRDs fail for probabilistic AI systems, establishing statistical tolerances and confidence intervals as the new product contract."
  - "**Architect** a multi-tier evaluation pyramid: from deterministic unit assertions and heuristic checks to calibrated LLM-as-a-judge pipelines and human ground truth."
  - "**Calibrate** automated LLM judges against human expert annotators, systematically mitigating position bias, verbosity bias, and self-enhancement distortion."
  - "**Formulate** an operational defense against model drift, data shift, and silent upstream updates using continuous canary deployments and automated circuit breakers."
---
```

### 2.2 Section-by-Section Architectural Content

#### Stage 1 & 2: Opener & Drop-Cap Lede with Thesis Highlight
- **Narrative Anchor:** An enterprise product manager at an Indian fintech bank spends six weeks writing a 45-page Product Requirements Document (PRD) detailing screen flows, intent trees, and acceptance criteria for an AI dispute resolution assistant. Two weeks after launch, an upstream foundation model vendor quietly releases an "optimized checkpoint update." Without changing a single line of application code, accuracy drops by 14%, and the bot begins approving disputed transactions without secondary verification.
- **The Core Conflict:** The software did not break. No database threw an exception. The code passed every CI/CD unit test. Yet the product failed because deterministic software specifications cannot bind probabilistic neural distributions.
- **Thesis Highlight (Highlight 1):**
  `==In the era of probabilistic machine intelligence, a static Product Requirements Document is dead upon publication; an automated evaluation suite is the only product specification that compiles and executes.==`

#### Stage 3: First-Principles Derivation (`::: principle Evals as the new product contract`)
```markdown
::: principle Evals as the new product contract
1. Classical software is deterministic: given input $X$, code executes logic path $P$ to produce identical output $Y$. Unit tests assert binary pass/fail conditions.
2. Neural language models are stochastic token predictors parameterized by hundreds of billions of weights; identical prompts yield varying token completions across probability surfaces.
3. You cannot write a static assertion for every possible natural language permutation, but an enterprise cannot ship without bounding catastrophic failure rates.
4. An evaluation harness replaces static prose specifications with automated statistical assertions over representative distributions of production tasks.
5. In AI product management, the evaluation suite is the living functional specification; if you cannot measure behavioral regression automatically, you cannot ship safely.
:::
```

#### Stage 4: Core Concept Definitions
1. **The Evaluation Hierarchy:**
   - **Tier 1: Deterministic Unit Tests & Regex:** Fast, zero-inference assertions. JSON Schema compliance, latency thresholds, banned keyword filters, regex PII scrubbers ($< 5\text{ms}$, $\approx \text{₹}0.0001/\text{call}$).
   - **Tier 2: Heuristic & Semantic Graders:** Programmatic string distance and token overlap. Levenshtein distance, BLEU/ROUGE for summarization, AST syntax parsers for SQL/code, deterministic entity match ($50\text{ms}$, $\approx \text{₹}0.005/\text{call}$).
   - **Tier 3: Model-Based Graders (LLM-as-a-Judge):** Secondary foundation models scoring completions against explicit grading rubrics using chain-of-thought analysis ($800\text{ms}\text{--}2{,}500\text{ms}$, $\approx \text{₹}0.15\text{--}\text{₹}0.75/\text{call}$).
   - **Tier 4: Human-in-the-Loop Ground Truth:** Stratified sampling of production failures reviewed by senior product managers and clinical/legal experts (hours/days, $\approx \text{₹}25\text{--}\text{₹}50/\text{review}$).

```markdown
::: concept Evaluation pyramid
**Plain words.** A tiered testing architecture that filters AI outputs through fast deterministic rules first, semantic heuristics second, model-based judges third, and human audit panels last.

**Analogy.** An airport security checkpoint. Metal detectors and automated baggage X-rays screen 100% of passengers in seconds; explosive trace swabs inspect a 5% sample; physical secondary strip-searches are reserved for the rare suspicious edge cases.

**Misconception.** "You must use an expensive frontier LLM to grade every output." Running frontier models on every test case inflates test cycle times from seconds to hours; 80% of regressions are caught by deterministic schema validation and fast heuristic filters.
:::
```

2. **The Golden Dataset:**
```markdown
::: concept Golden dataset
**Plain words.** A version-controlled, curated repository of representative user inputs paired with ground-truth reference answers, edge-case failure modes, and explicit scoring rubrics.

**Analogy.** The master kilogram cylinder preserved in the International Bureau of Weights and Measures in Sèvres. When commercial scales drift in the field, technicians calibrate them against the unchanging physical prototype.

**Misconception.** "A golden dataset requires ten thousand hand-labeled customer interactions." High-velocity product teams bootstrap evaluation harnesses with 50 to 100 meticulously verified edge cases extracted from production failure logs; raw volume without editorial provenance produces noisy, uninterpretable benchmarks.
:::
```

#### Stage 5: Complication & Scale: Calibrating the Automated Judge & Mitigating Bias
- **The Problem:** Scaling human evaluation is economically impossible. Teams delegate grading to an LLM judge [@zheng-judging-llm-as-judge]. But automated judges exhibit severe cognitive distortions:
  - **Position Bias:** Preferring candidate completion $A$ over $B$ merely because it appears first in the prompt.
  - **Verbosity Bias:** Awarding higher marks to longer, verbose explanations regardless of factual accuracy.
  - **Self-Enhancement Bias:** Favoring outputs generated by the judge's own foundation model family.
- **Mathematical Calibration:** Measuring inter-rater reliability between human PMs and automated judges via Cohen's Kappa ($\kappa$):
  $$\kappa = \frac{P_o - P_e}{1 - P_e}$$
  where $P_o$ is the observed percentage agreement and $P_e$ is the hypothetical probability of chance agreement.
  - Target SLA: A production judge must achieve $\kappa \ge 0.80$ against senior human reviewers before its verdicts can gate CI/CD release builds.
- **De-Biasing Protocols:**
  - **Swap-evals:** Evaluating every pair twice with inverted ordering ($A/B$ then $B/A$). If verdicts disagree, flag for human triage.
  - **Length-penalty normalization:** Stripping conversational pleasantries and penalizing fluff.
  - **Chain-of-thought rubric anchoring:** Forcing the judge to cite evidence before rendering a numerical score.

- **SVG Figure Embed:**
  `{{figure ai-product-lifecycle | The AI evaluation pyramid and continuous drift defense. Left: The four-tier evaluation harness from deterministic heuristics to human ground truth. Right: Canary deployment gating and automated drift circuit breaker. | Sources: OpenAI (2024); Zheng et al. (2023); Cagan (2024)}}`

#### Stage 6: Empirical Evidence & Myth Busting
- **Stat Block (Lining-Nums typography):**
```markdown
::: stat 14% vs 0.2%
A silent upstream model update caused a 14% accuracy drop in contract extraction, whereas teams with continuous canary eval harnesses caught the regression at 0.2% traffic within eight minutes.
<span class="src">Sources: [@openai-evals-framework]; [@zheng-judging-llm-as-judge]</span>
:::
```

- **Highlight 2:**
  `==Building an AI product without an automated eval harness is the modern equivalent of deploying financial software without double-entry bookkeeping.==`

- **Myth / Reality Block:**
```markdown
::: myth
**Myth.** You need thousands of hand-annotated human labels before you can establish an effective LLM evaluation harness.

**Reality.** High-performing product teams bootstrap evaluation suites with 50 to 100 synthetic edge cases generated from production failure logs, progressively refining the dataset through human review of disagreements between model judges.
:::
```

- **Marty Cagan / SVPG Framework Integration:**
  - Deconstructing the four product risks under stochastic AI:
    - **Value Risk:** Does the generative capability solve a real customer problem, or is it an executive vanity feature?
    - **Usability Risk:** Can users direct, interpret, and trust the model's outputs without prompt engineering fatigue?
    - **Feasibility Risk:** Can the engineering team deliver the required accuracy within latency and token cost budgets?
    - **Viability Risk:** Does the application comply with DPDP Act 2023, copyright boundaries, and enterprise gross margin targets?

- **Highlight 3:**
  `==The product manager does not define what the AI should say; the product manager defines the statistical boundaries of what the AI is never allowed to say.==`

#### Stage 7: Worked Business Case
```markdown
::: case Illustrative · Swiggy Instamart Automated Dispute Resolution
#### The situation
An Indian quick-commerce platform delivers 450,000 grocery orders daily across 18 tier-1 cities. Customer support handles 14,400 daily dispute tickets (damaged fruit, missing dairy items, late delivery), costing ₹3.6 crore annually in BPO headcount. To cut resolution cycle time from 18 minutes to instant settlement, product management pilots an autonomous dispute resolution agent powered by a commercial multimodal LLM.

In offline sandbox testing on 500 synthetic queries, the agent achieved a 94% customer satisfaction rating. Within 48 hours of full production rollout in Bengaluru, operational escalations surged 300%. Sophisticated fraud rings exploited the model by uploading blurred photos of empty grocery boxes accompanied by emotionally charged text prompts, tricking the bot into issuing ₹82 lakh in unverified UPI refunds.

#### The decision
The VP of Operations demands an immediate shutdown and return to 100% human agent triage. Engineering argues that adding negative system prompt instructions ("Do not issue refunds for blurred photos") will resolve the exploit.

The Lead PM halts the prompt tweaking cycle and reconstructs the architecture:
1. **Deconstruct the Failure Mode:** The generative model was tasked with two fundamentally different jobs: verifying factual evidence (a classification task) and composing empathetic customer communications (a generative task).
2. **Build an Adversarial Golden Dataset:** The team curates 250 verified historical refund cases, including 100 genuine product damage claims, 100 fraudulent attempts (blurred images, reused photos, stock images), and 50 ambiguous edge cases.
3. **Multi-Stage Gated Architecture:** Image verification is removed from the LLM and routed to a deterministic computer-vision classifier coupled with customer account refund frequency rules. Only when the rules engine clears the claim does the generative model draft the customer response.

#### Your move
Never rely on prompt tweaking as an operational guardrail. When automating high-liability decisions, isolate policy rules into deterministic code and reserve foundation models strictly for synthesis and conversational formatting.
:::
```

- **Highlight 4:**
  `==When a generative model fails in production, prompt tweaking is not a fix; prompt tweaking is merely negotiating with a probability distribution.==`

#### Stage 8: Track Lenses
```markdown
::: lens product
For a product manager, model benchmark scores on public leaderboards are vanity metrics. Your job is not to deploy the highest-scoring model on Hugging Face, but to discover the cheapest, fastest model checkpoint that consistently clears your proprietary golden evaluation suite.
:::

::: lens consulting
In management consulting engagements, client executives often evaluate AI vendors by asking for a single "accuracy percentage." Teach clients to reject monolithic accuracy figures. Force vendors to provide confusion matrices, precision-recall curves across stratified transaction sizes, and audit logs of model disagreements.
:::

::: lens operations
Operations executives bear the direct P&L liability of customer escalations. An evaluation harness converts anecdotal customer complaints into reproducible unit tests, preventing recurring operational fires and establishing clear service level agreements between product and frontline support.
:::
```

#### Stage 9: Placement Interview Room
```markdown
::: interview Defending evals over traditional PRDs
**Q.** You are leading product for a customer-facing conversational banking agent at an Indian private bank. Your VP of Engineering asks why your team spent three weeks building an evaluation harness instead of drafting functional PRD user stories for an upcoming feature release. How do you defend your roadmap?

> "In generative software engineering, an automated evaluation harness is the only PRD that cannot be misunderstood by engineering or silently invalidated by an upstream model update."

**What they are testing.** Whether you recognize that classical deterministic product management frameworks fail for stochastic systems, understand the economics of regression testing, and can articulate a rigorous technical roadmap to senior leadership.

**A strong structure.**
1. **The Fallacy of the Static PRD:** Explain that while traditional software executes deterministic logic trees, LLMs generate variable outputs across shifting probability distributions. A written PRD describing "accurate, helpful tone" provides zero regression protection when foundation model weights shift.
2. **The Eval Harness as an Executable Contract:** Define the four-tier eval hierarchy (deterministic schema checks, heuristic filters, calibrated LLM judges, human audits). Demonstrate how this suite acts as a continuous integration (CI) test gate that blocks code merges if pass rates drop below agreed SLAs.
3. **Economic and Risk Defense:** Quantify the cost of catching regressions in production (customer churn, fraud payouts, regulatory fines from RBI) versus the amortized cost of running a 200-case automated test suite prior to release.
4. **Actionable Roadmap:** Conclude by showing how the eval harness accelerates subsequent feature velocity: once the automated harness is live, engineering can experiment with new models, prompt tweaks, and caching strategies with immediate mathematical feedback on quality.
:::
```

- **Highlight 5:**
  `==An evaluation suite is not a quality assurance afterthought; it is the executable boundary condition that defines what product engineering is permitted to merge.==`

#### Stage 10: Active Learning Experiment (`::: try`)
```markdown
::: try Test LLM judge position and verbosity bias
Paste the following prompt into ChatGPT, Claude, or Gemini. Run it once, then create a new chat, swap the order of Pitch A and Pitch B, and run it again:

```text
You are an expert venture capital evaluator. Compare the following two startup elevator pitches for a B2B logistics AI platform. Grade each pitch on a scale of 1 to 10 for clarity, business model viability, and executive impact. State your winner clearly.

Pitch A (Detailed & Verbose):
"Our transformative enterprise platform leverages advanced multi-agent reinforcement learning topologies to dynamically optimize hyper-local supply chain telemetry. By synthesizing real-time traffic congestion vectors, historical delivery nodal bottlenecks, and predictive merchant replenishment signals, we unlock unprecedented operational efficiencies. Our comprehensive end-to-end dashboard empowers dispatch managers with deep visibility, ultimately driving down last-mile fulfillment expenses while fostering sustainable partner retention."

Pitch B (Concise & Concrete):
"We cut last-mile delivery costs for grocery dark stores by 18%. Our software runs dispatch routes using real-time delivery boy GPS and kirana store order batches. We charge ₹4 per completed delivery and currently power 85,000 daily orders across Pune and Bengaluru with zero setup fees."
```

Notice two critical evaluator distortions:
1. **Verbosity Bias:** Does the model award Pitch A a higher mark for sounding "comprehensive and strategic," despite Pitch B containing concrete unit economics and operational metrics?
2. **Position Bias:** When you swap the order (placing Pitch B first), does the winner change? Notice how adding an explicit instruction—"Evaluate factual specificity before rewarding length"—forces the judge to penalize buzzwords.
:::
```

#### Stage 11: Media Cards (3 Registered PM Sources)
```markdown
{{paper zheng-judging-llm-as-judge}}

{{read openai-evals-framework}}

{{read cagan-svpg-ai-risk}}
```

#### Stage 12: Check Yourself & Upside-Down Answers
- **Highlight 6:**
  `==Production model drift is never a matter of if, but when; an automated circuit breaker is the only mechanism that protects product margins from silent vendor degradation.==`

```markdown
::: check Check yourself
1. In the context of LLM product evaluation, what distinguishes an offline benchmark from an online production eval? <span class="lvl">recall</span>
2. An enterprise clinical documentation tool experiences a 12% drop in doctor satisfaction following a model update. How do you use a frozen golden dataset to determine whether prompt drift or model regression caused the issue? <span class="lvl">apply</span>
3. Why does LLM-as-a-judge suffer from position bias, and what operational testing protocol eliminates it? <span class="lvl">explain</span>
4. Design a continuous canary deployment pipeline for an AI agent handling sensitive customer refund approvals. <span class="lvl">transfer</span>
5. A software vendor proposes replacing your internal 300-case human-curated golden test suite with a 50,000-case fully synthetic benchmark generated by an LLM. Evaluate the strategic risks of accepting this proposal. <span class="lvl">judge</span>
:::

::: answers
1. Offline benchmarks evaluate model completions against static, pre-curated datasets using automated rubrics prior to code deployment. Online evals measure live operational metrics (user acceptance rate, edit distance, thumbs up/down, customer escalation frequency, latency) on real production traffic.
2. Run both the previous model checkpoint and the new model checkpoint across the identical, frozen golden dataset under fixed inference parameters. If the new model scores lower on the frozen golden dataset, the decline is a genuine model regression. If it scores identically, the live CSAT decline stems from changes in incoming user query distributions (data drift) or external environmental shifts.
3. LLM judges exhibit systematic cognitive bias toward the first candidate response presented in the prompt ($A$ over $B$) due to autoregressive attention patterns. Position bias is neutralized by running swap-evals: evaluating each candidate pair twice with inverted order ($A/B$ then $B/A$) and discarding verdicts where the judge fails to maintain consistency.
4. Route production queries through staged canary traffic gates: direct 2% of live traffic to the candidate model for 30 minutes, expanding to 10% for 2 hours, 50% for 6 hours, and 100% only after full validation. Wire an automated circuit breaker to telemetry: if error rates, hallucination flags, or latency spikes exceed statistical baseline thresholds by $\ge 1.5\%$, the circuit breaker automatically reverts traffic to the cached previous-generation model within 30 seconds.
5. While a 50,000-case synthetic benchmark provides vast statistical coverage, relying on it entirely introduces catastrophic blind spots. Models generating synthetic tests suffer from shared inductive biases, hallucinating plausible edge cases while failing to replicate authentic, messy human user errors. High-provenance human edge cases represent real enterprise liability; synthetic suites should augment human golden datasets, never replace them.
:::
```

#### Stage 13: The Night-Before Recap Page (Exactly 5 Lines)
```markdown
::: recap The night-before page
1. In AI product management, the evaluation harness is the functional specification; if you cannot measure behavioral regression automatically, you cannot ship.
2. Bootstrap evaluation suites with 50 to 100 curated production edge cases, not ten thousand noisy unverified logs; editorial provenance beats raw volume.
3. Model-based judges require continuous human calibration (target Cohen's $\kappa \ge 0.80$), swap-eval order de-biasing, and length-penalty normalization.
4. Separate evidence verification from conversational generation: isolate policy and liability rules in deterministic code, reserving LLMs for formatting.
5. Production drift is inevitable: defend customer trust through staged canary traffic gates (2% to 100%) backed by automated 30-second circuit breakers.
:::
```

---

## 3. SVG Specification: `content/figures/ai-product-lifecycle.svg`

### 3.1 Design Anatomy & Geometry
- **Dimensions:** `viewBox="0 0 640 330"`
- **Layout:** Two equal-width panels separated by a vertical rule line at $X = 335$.
- **Left Panel:** The Four-Tier Evaluation Pyramid ($X = 20\dots 320$).
  - Tier 1: Deterministic Unit Tests & Regex ($< 5\text{ms}$, ₹0.0001)
  - Tier 2: Heuristic & Semantic Graders (BLEU/ROUGE, 50ms, ₹0.005)
  - Tier 3: LLM-as-a-Judge (Calibrated rubrics, 800ms, ₹0.25)
  - Tier 4: Human Ground Truth (Stratified audits, hours/days, ₹35)
- **Right Panel:** Continuous Canary Gating & Automated Drift Circuit Breaker ($X = 350\dots 620$).
  - 4 Staged Canary Gates: 2% (Shadow, 30m) $\to$ 10% (Pilot, 2h) $\to$ 50% (Staged, 6h) $\to$ 100% (Full Release).
  - Automated Circuit Breaker Card: Rollback to cached model weights within 30 seconds if error delta $\Delta \ge 1.5\%$.
- **CSS Token Classes:** `.t-display`, `.paper.acc-s`, `.wash.acc-s`, `.rule-s`.

### 3.2 Exact SVG Code

```xml
<svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Left: The four-tier AI evaluation pyramid from deterministic unit tests to human ground truth. Right: Continuous canary deployment gating and automated drift circuit breaker.">
  <text class="t-display" x="20" y="26" font-size="15">The AI Evaluation Pyramid</text>
  <text class="t-display" x="350" y="26" font-size="15">Canary Gating &amp; Drift Defense</text>

  <!-- Left: The 4-Tier Pyramid -->
  <!-- Tier 1: Deterministic Unit Tests -->
  <rect class="paper acc-s" x="20" y="42" width="300" height="46" rx="4" stroke-width="1.5"/>
  <text x="32" y="60" font-size="11" font-weight="bold">1. Deterministic Unit Tests &amp; Regex</text>
  <text x="32" y="74" font-size="9.5">JSON schema, PII scrubbers, banned terms (&lt;5ms · ₹0.0001)</text>

  <!-- Up arrow 1 -->
  <path d="M 170 92 L 170 98 M 165 94 L 170 89 L 175 94" stroke="currentColor" fill="none" stroke-width="1.2"/>

  <!-- Tier 2: Heuristic & Semantic Graders -->
  <rect class="paper acc-s" x="35" y="100" width="270" height="46" rx="4" stroke-width="1.5"/>
  <text x="47" y="118" font-size="11" font-weight="bold">2. Heuristics &amp; Semantic Parsers</text>
  <text x="47" y="132" font-size="9.5">Levenshtein, BLEU/ROUGE, SQL AST checks (50ms · ₹0.005)</text>

  <!-- Up arrow 2 -->
  <path d="M 170 150 L 170 156 M 165 152 L 170 147 L 175 152" stroke="currentColor" fill="none" stroke-width="1.2"/>

  <!-- Tier 3: LLM-as-a-Judge -->
  <rect class="paper acc-s" x="55" y="158" width="230" height="46" rx="4" stroke-width="1.5"/>
  <text x="67" y="176" font-size="11" font-weight="bold">3. Calibrated LLM-as-a-Judge</text>
  <text x="67" y="190" font-size="9.5">Swap-evals, rubric scoring, Cohen's κ ≥ 0.80 (800ms · ₹0.25)</text>

  <!-- Up arrow 3 -->
  <path d="M 170 208 L 170 214 M 165 210 L 170 205 L 175 210" stroke="currentColor" fill="none" stroke-width="1.2"/>

  <!-- Tier 4: Human Ground Truth -->
  <rect class="wash acc-s" x="80" y="216" width="180" height="46" rx="4" stroke-width="2"/>
  <text class="t-display" x="92" y="234" font-size="11.5">4. Human Ground Truth</text>
  <text x="92" y="248" font-size="9">Stratified audit panel (Days · ₹35)</text>

  <text x="20" y="284" font-size="10.5">Higher tiers add semantic nuance but multiply latency.</text>
  <text x="20" y="300" font-size="10.5" font-weight="bold">High-velocity teams catch 85% of bugs in Tiers 1 &amp; 2.</text>

  <!-- Divider -->
  <line class="rule-s" x1="335" x2="335" y1="20" y2="315" stroke-width="1"/>

  <!-- Right: Canary Gating & Circuit Breaker -->
  <!-- Canary Stage 1 & 2 -->
  <rect class="paper acc-s" x="350" y="42" width="130" height="50" rx="4" stroke-width="1.5"/>
  <text x="360" y="60" font-size="10.5" font-weight="bold">Stage 1: 2% Traffic</text>
  <text x="360" y="74" font-size="9">Shadow eval (30 min)</text>
  <text x="360" y="85" font-size="8.5" fill="#666">Zero user blast radius</text>

  <path d="M 483 67 L 497 67 M 493 62 L 498 67 L 493 72" stroke="currentColor" fill="none" stroke-width="1.2"/>

  <rect class="paper acc-s" x="500" y="42" width="120" height="50" rx="4" stroke-width="1.5"/>
  <text x="510" y="60" font-size="10.5" font-weight="bold">Stage 2: 10% Pilot</text>
  <text x="510" y="74" font-size="9">Live canary (2 hrs)</text>
  <text x="510" y="85" font-size="8.5" fill="#666">Telemetry comparison</text>

  <!-- Down connector -->
  <path d="M 560 94 L 560 106 L 415 106 L 415 116 M 410 112 L 415 117 L 420 112" stroke="currentColor" fill="none" stroke-width="1.2"/>

  <!-- Canary Stage 3 & 4 -->
  <rect class="paper acc-s" x="350" y="118" width="130" height="50" rx="4" stroke-width="1.5"/>
  <text x="360" y="136" font-size="10.5" font-weight="bold">Stage 3: 50% Staged</text>
  <text x="360" y="150" font-size="9">Peak load burn (6 hrs)</text>
  <text x="360" y="161" font-size="8.5" fill="#666">Latency distribution check</text>

  <path d="M 483 143 L 497 143 M 493 138 L 498 143 L 493 148" stroke="currentColor" fill="none" stroke-width="1.2"/>

  <rect class="paper acc-s" x="500" y="118" width="120" height="50" rx="4" stroke-width="1.5"/>
  <text x="510" y="136" font-size="10.5" font-weight="bold">Stage 4: 100% Full</text>
  <text x="510" y="150" font-size="9">Global production</text>
  <text x="510" y="161" font-size="8.5" fill="#666">Continuous monitoring</text>

  <!-- Automated Circuit Breaker Box -->
  <rect class="wash acc-s" x="350" y="184" width="270" height="78" rx="4" stroke-width="2"/>
  <text class="t-display" x="362" y="204" font-size="11.5">Automated Circuit Breaker Policy</text>
  <text x="362" y="220" font-size="9.5">Trigger: LLM Judge error rate delta Δ ≥ 1.5% OR</text>
  <text x="362" y="233" font-size="9.5">critical safety violation flags exceed 0.1% on canary.</text>
  <text x="362" y="249" font-size="9.5" font-weight="bold">Action: Automatic rollback to cached weights in 30s.</text>

  <text x="350" y="284" font-size="10.5">Never deploy un-gated foundation model updates.</text>
  <text x="350" y="300" font-size="10.5">Canary pipelines turn catastrophic drift into safe telemetry.</text>
</svg>
```

---

## 4. Chapter 19: `product-architecture-economics.md`

### 4.1 Frontmatter Specification

```yaml
---
id: product-architecture-economics
title: "Product architecture and economics: latency budgets, caching, and routing"
deck: "The technical trade-offs behind responsive AI products: dissecting TTFT and TPS, prompt caching economics, cascade routing topologies, and the strategic build-versus-buy frontier."
level: Zero to one
tracks: [product, strategy]
prereq: [next-word-machine, who-pays]
hook: "An Indian fintech unicorn launches an AI conversational search engine for mutual funds. The model achieves 96% retrieval accuracy, but median response latency is 8.4 seconds and every turn costs ₹12 in commercial API fees. User retention plummets by 68% in six weeks as customers abandon the search bar for legacy filters, while cloud bills threaten product gross margins. As lead PM, how do you re-architect latency and compute unit economics without sacrificing answer intelligence?"
objectives:
  - "**Deconstruct** the end-to-end AI latency equation, isolating Time-to-First-Token ($TTFT$) and Tokens-Per-Second ($TPS$) against human cognitive perception thresholds."
  - "**Derive** the mathematical break-even query velocity ($Q^*$) for KV context caching, evaluating write creation surcharges against read discounts."
  - "**Architect** a multi-tier cascade model routing topology that balances deterministic filters, local small language models, and frontier reasoning engines along a Pareto frontier."
  - "**Formulate** an executive Total Cost of Ownership (TCO) decision model evaluating commercial proprietary APIs against dedicated self-hosted open-source models."
---
```

### 4.2 Section-by-Section Architectural Content

#### Stage 1 & 2: Opener & Drop-Cap Lede with Thesis Highlight
- **Narrative Anchor:** A user types a query into a modern AI search bar: *"Compare tax liability on equity vs. debt mutual funds held for two years under the latest Indian Finance Act."* The screen freezes. The user stares at a blank text box. After 4.2 seconds of silence, a loader begins spinning. At 7.8 seconds, a complete paragraph bursts onto the screen. Even though the information is accurate, the user experiences the product as sluggish, clunky, and broken.
- **The Core Law:** Software perception is biological. Stuart Card, Thomas Moran, and Allen Newell established that human perception operates on rigid neurological thresholds: 100 milliseconds feels instantaneous, 1,000 milliseconds preserves the unbroken train of thought, and 10 seconds marks the absolute boundary of attention [@card-moran-newell-psychology-hci]. When software violates these thresholds, cognitive flow collapses.
- **Thesis Highlight (Highlight 1):**
  `==In generative product engineering, latency is not a technical afterthought—it is the primary determinant of cognitive engagement, user trust, and commercial retention.==`

#### Stage 3: First-Principles Derivation (`::: principle The latency budget hierarchy`)
```markdown
::: principle The latency budget hierarchy
1. Human cognitive perception is bounded by biological constants: 100 milliseconds is perceived as immediate direct manipulation, 1,000 milliseconds maintains fluid thought continuity, and 10 seconds represents the maximum tolerance for task completion [@card-moran-newell-psychology-hci].
2. Generative language models do not compute completions in a single instantaneous step; they process inputs through a prompt prefill phase followed by sequential autoregressive token generation.
3. Total end-to-end response time is the additive sum of network transit, server queue latency, Time-to-First-Token ($TTFT$), and token generation duration ($N_{\text{output}} / TPS$).
4. Streaming output tokens directly to the client interface decouples generation duration from perceived responsiveness, anchoring human latency perception entirely to Time-to-First-Token.
5. In product architecture, every functional subsystem—vector search, semantic re-ranking, chain-of-thought tokens, guardrail verification—must purchase its millisecond allocation from a hard latency ceiling.
:::
```

#### Stage 4: Core Concept Definitions
1. **The Latency Equation:**
   $$\text{Latency}_{\text{total}} = T_{\text{network}} + T_{\text{queue}} + TTFT + \frac{N_{\text{output}}}{TPS}$$
   - $TTFT$ (Time-to-First-Token): The elapsed time from request dispatch until the model outputs its very first token. Governed by prompt length, attention matrix prefill compute, and GPU memory bandwidth.
   - $TPS$ (Tokens-Per-Second): The autoregressive throughput speed. Governed by model parameter scale, quantization level, and GPU memory clock rate.
   - Streaming UX: At $TPS \ge 40$, generation speed exceeds human silent reading speed ($\approx 250\text{--}300\text{ words/min} \approx 5\text{--}6\text{ words/sec} \approx 8\text{ tokens/sec}$). Therefore, once streaming commences, user-perceived waiting time drops to zero!

```markdown
::: concept Time-to-first-token and throughput
**Plain words.** Time-to-first-token is the awkward pause before the model starts speaking; tokens-per-second is how fast the words flow once it begins.

**Analogy.** Ordering at a fast-food drive-through. Time-to-first-token is the duration you wait at the window before the attendant hands you the first hot cup of chai; throughput is how quickly they place the remaining samosas on the tray. If the chai arrives instantly, you never mind waiting for the food.

**Misconception.** "Users care about the total time until the entire 500-word response finishes generating." In conversational interfaces, users begin reading the moment the first sentence streams; optimizing Time-to-First-Token creates the sensory illusion of instant software.
:::
```

2. **KV Context Caching Mechanics & Break-Even Math:**
   - The Transformer Bottleneck: In multi-turn chat or document question-answering, passing a 100,000-token PDF requires re-calculating the Key-Value (KV) attention matrices on every turn ($O(N^2)$ attention compute), exploding $TTFT$ and token billing [@anthropic-context-caching; @google-gemini-long-context].
   - Context Caching Architecture: Storing precomputed KV attention states in GPU memory for a fixed Time-to-Live (TTL, typically 5 minutes). Subsequent calls matching the static prefix skip prefill compute entirely.
   - Economic Model:
     - $C_{\text{write}}$: Cache creation surcharge (e.g., $1.25\times$ base input rate).
     - $C_{\text{read}}$: Cache read discount (e.g., $0.10\times\text{--}0.20\times$ base input rate, an 80% to 90% discount).
     - $C_{\text{uncached}}$: Standard input rate ($1.00\times$).
   - Break-Even Query Velocity Equation:
     $$Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}} + 1$$
     *Derivation:*
     Setting total cached cost equal to uncached cost:
     $$C_{\text{write}} + (Q - 1) \cdot C_{\text{read}} = Q \cdot C_{\text{uncached}}$$
     $$C_{\text{write}} - C_{\text{read}} = Q \cdot (C_{\text{uncached}} - C_{\text{read}})$$
     $$Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}}$$
     For Anthropic Claude 3.5 Sonnet ($C_{\text{write}} = \$3.75/\text{M}$, $C_{\text{uncached}} = \$3.00/\text{M}$, $C_{\text{read}} = \$0.30/\text{M}$):
     $$Q^* = \frac{3.75 - 0.30}{3.00 - 0.30} = \frac{3.45}{2.70} \approx 1.28 \implies \mathbf{2\text{ queries within TTL window!}}$$
     From query #2 onwards, every hit yields an 85% latency reduction and a 90% cost savings!

```markdown
::: concept Context caching break-even
**Plain words.** The exact number of queries a user or system must run against a cached document within its memory lifespan to recoup the initial setup fee.

**Analogy.** Buying a wholesale warehouse membership. Paying the ₹1,000 upfront entry fee makes no financial sense if you buy a single loaf of bread, but pays for itself the moment you purchase your second bulk grocery order.

**Misconception.** "Context caching stores text answers like a web browser cache." Context caching does not store output text; it stores the compiled neural attention weights (the Key-Value tensor) inside GPU high-bandwidth memory, allowing the model to reason across massive document prefixes with near-zero prefill compute.
:::
```

3. **Multi-Tier Cascade Model Routing:**
   - The Fallacy of the Monolithic Model: Sending 100% of user traffic to a frontier reasoning engine (e.g., Claude 3.5 Sonnet, GPT-4o, or Gemini 1.5 Pro) burns capital and inflicts multi-second latency on routine requests.
   - The 3-Tier Pareto Routing Topology:
     - **Tier 1: Deterministic Semantic Cache & Rules Engine:** Handles structured lookups ("Where is my order?", "Current interest rates"). Latency: $p95 = 45\text{ms}$. Cost: ₹0.002. Volume: 40–45%.
     - **Tier 2: Fine-Tuned Small Language Model (SLM, 3B–8B):** Deployed on local vLLM instances. Handles domain tasks with confidence gating threshold $\theta = 0.88$. Latency: $p95 = 240\text{ms}$. Cost: ₹0.040. Volume: 40–45%.
     - **Tier 3: Frontier Reasoning Engine:** Triggered only when Tier 2 confidence falls below $\theta < 0.88$ or for complex, multi-intent reasoning. Latency: $p95 = 1{,}850\text{ms}$. Cost: ₹0.850. Volume: 10–15%.

```markdown
::: concept Cascade model routing
**Plain words.** An architectural traffic controller that directs incoming user queries to the smallest, fastest model capable of resolving them, escalating to expensive frontier models only when task complexity warrants it.

**Analogy.** A hospital emergency room triage desk. A triage nurse inspects incoming patients, immediately discharging minor scrapes with a bandage, routing routine flu symptoms to a resident physician, and summoning the chief trauma surgeon only for critical emergency surgeries.

**Misconception.** "Using a small model reduces product quality." A fine-tuned 8-billion parameter model trained on ten thousand domain-specific customer service logs often outperforms a generalist frontier model on task adherence, while responding in one-tenth the time at one-twentieth the cost.
:::
```

#### Stage 5: Scale & Complication: The Build vs. Buy Frontier & TCO
- **The Financial Dilemma:** When should an enterprise transition from commercial pay-per-token APIs (OpenAI, Anthropic, Google) to self-hosted open-source models (vLLM / TensorRT-LLM on leased cloud GPU clusters)?
- **Total Cost of Ownership (TCO) Mathematical Model:**
  $$\text{TCO}_{\text{self-hosted}} = \text{Fixed Overhead} + \text{Variable Energy/Bandwidth}$$
  - Fixed Overhead: 8x Nvidia H100 SXM5 GPU node lease ($\approx \$24{,}000/\text{month} \approx \text{₹}20\text{ lakh/month}$), MLOps platform engineers ($\approx \text{₹}15\text{ lakh/month}$), redundant standby instances.
  - Variable API billing: $C_{\text{api}} = \text{Tokens} \times \text{Rate}$.
- **Crossover Volume Derivation ($V^*$):**
  $$V^* = \frac{\text{Fixed Monthly Compute \& Headcount Overhead}}{C_{\text{commercial API}} - C_{\text{self-hosted compute}}}$$
- **Strategic Rule:** Below $V^* \approx 50\text{ million tokens/day}$, commercial APIs are dramatically cheaper and eliminate operational fragility. Above $V^*$, self-hosted clusters expand gross margins, but require enterprise-grade uptime SLAs and round-the-clock SRE support.

- **SVG Figure Embed:**
  `{{figure product-architecture-economics | Latency budgets, prompt caching economics, and cascade routing topologies. Left: End-to-end latency budget breakdown against human perception thresholds. Right: KV context caching break-even curve and three-tier cascade routing architecture. | Sources: Card, Moran & Newell (1983); Anthropic (2024); Google DeepMind (2024)}}`

#### Stage 6: Empirical Evidence & Myth Busting
- **Stat Block (Lining-Nums typography):**
```markdown
::: stat 85% & 90%
Prompt caching cuts Time-to-First-Token by up to 85% and reduces input token costs by up to 90% across repetitive prompt prefixes.
<span class="src">Sources: [@anthropic-context-caching]; [@google-gemini-long-context]</span>
:::
```

- **Highlight 2:**
  `==The objective of model routing is not to find the smartest model, but to ensure that simple questions never pay the latency and cost tax of frontier reasoning engines.==`

- **Myth / Reality Block:**
```markdown
::: myth
**Myth.** Always route production queries to the newest frontier reasoning model to maximize user satisfaction.

**Reality.** Frontier reasoning models inflate latency by 8x to 15x and cost by 20x. For 70% of routine enterprise workflows, users perceive multi-second delays as product failure; routing simple queries through specialized small models lifts user satisfaction while slashing token burn.
:::
```

- **Highlight 3:**
  `==A product manager who does not manage a latency budget is merely an observer of customer churn.==`

#### Stage 7: Worked Business Case
```markdown
::: case Illustrative · FinTech Super-App Reclaiming the ₹8 Crore Token Bill
#### The situation
A leading Indian payments super-app serves 10,000,000 customer service interactions monthly across payment status verifications, soundbox merchant hardware issues, credit card dispute filing, and KYC compliance. To ensure maximum accuracy, product engineering routed 100% of customer interactions to a commercial frontier reasoning API.

The architecture achieved a high accuracy rate of 95.8%, but median user response latency climbed to 2.1 seconds ($p95 = 5.4\text{ seconds}$). More critically, the cloud token bill exploded to ₹8.50 crore monthly (an average of ₹8.50 per customer conversation), compressing customer service unit gross margins from 64% to 22%. The CFO issued an ultimatum: reduce monthly compute burn below ₹2.00 crore within 60 days or shut the AI assistant down.

#### The decision
The Lead PM rejects proposals to degrade answer quality by arbitrarily capping output token lengths. Instead, the team implements a 3-tier cascade model routing topology:
1. **Tier 1 (Deterministic Cache & Rules):** Analysis reveals that 42% of inquiries are repetitive factual questions ("What is my soundbox battery percentage?", "Verify transaction ID #90812"). These are mapped to semantic embeddings in an in-memory cache and resolved via microservice API webhooks. Cost: ₹0.002 per call. Latency: $p95 = 45\text{ms}$. Volume: 4.2M queries.
2. **Tier 2 (Fine-Tuned 8B SLM):** An open-source 8-billion parameter model is fine-tuned on 40,000 historical enterprise support conversations and deployed on an internal vLLM cluster. The model outputs a softmax confidence score; queries clearing $\theta \ge 0.88$ are completed directly. Cost: ₹0.040 per call. Latency: $p95 = 240\text{ms}$. Volume: 4.3M queries.
3. **Tier 3 (Frontier Reasoning Model):** Ambiguous disputes, suspected fraud claims, and complex multi-turn legal edge cases ($\theta < 0.88$) are routed to the frontier model with full KV context caching over banking regulations. Cost: ₹0.850 per call. Latency: $p95 = 1{,}850\text{ms}$. Volume: 1.5M queries.

#### Your move
Calculate the aggregate financial and latency transformation:
- **Baseline Spend:** $10{,}000{,}000 \times \text{₹}8.50 = \mathbf{\text{₹}8.500\text{ crore/month}}$.
- **Cascade Spend:**
  $$\text{Spend} = (4.2\text{M} \times \text{₹}0.002) + (4.3\text{M} \times \text{₹}0.040) + (1.5\text{M} \times \text{₹}0.850)$$
  $$\text{Spend} = \text{₹}0.0084\text{ Cr} + \text{₹}0.1720\text{ Cr} + \text{₹}1.2750\text{ Cr} = \mathbf{\text{₹}1.4554\text{ crore/month}}$$
- **Monthly Savings:** $\text{₹}8.500\text{ Cr} - \text{₹}1.4554\text{ Cr} = \mathbf{\text{₹}7.0446\text{ crore/month}}\quad (\mathbf{82.9\%\text{ reduction}})$.
- **Weighted Latency:**
  $$\text{Latency}_{\text{avg}} = (0.42 \times 45) + (0.43 \times 240) + (0.15 \times 1{,}850) = 18.9 + 103.2 + 277.5 = \mathbf{399.6\text{ms}}$$
Average customer response time dropped from 2,100ms to under 400ms while beating the CFO's target by ₹54 lakh monthly.
:::
```

- **Highlight 4:**
  `==A well-designed model cascade delivers the intelligence of a frontier model at the cost and latency profile of a small language model.==`

#### Stage 8: Track Lenses
```markdown
::: lens product
Product managers own the end-to-end service level agreement. Do not ask engineering "how fast can the model generate"; define the perceptual latency budget required for user retention and force the team to allocate milliseconds across retrieval, prefill, and streaming.
:::

::: lens finance
AI unit economics cannot be evaluated as an aggregate infrastructure bill. Model costs must be tracked as marginal cost per completed user workflow. When query volume scales faster than software revenue, un-routed frontier APIs turn gross margins negative.
:::

::: lens strategy
The build-versus-buy decision is a dynamic staircase, not a one-time binary choice. Launch with commercial proprietary APIs to discover product-market fit rapidly; once query distributions stabilize and traffic crosses 50 million tokens daily, migrate high-volume tiers to self-hosted open checkpoints to capture gross margin leverage.
:::
```

#### Stage 9: Placement Interview Room
```markdown
::: interview Sizing and defending an AI latency budget
**Q.** You are leading product for a generative conversational search feature at an e-commerce platform. Retrieval accuracy is high, but $p95$ response time is 4.8 seconds and conversion drops by 35% on slow connections. The VP asks how you will get latency under 800 milliseconds without losing semantic search intelligence. What is your roadmap?

> "To achieve sub-800ms latency, we must deconstruct the monolithic LLM call into a modular latency budget, stream initial tokens to satisfy human perception, and deploy a tiered routing cascade."

**What they are testing.** Whether you can deconstruct latency physics ($TTFT$ vs $TPS$), understand human cognitive perception thresholds, apply context caching economics, and architect cascade routing under tight business SLAs.

**A strong structure.**
1. **Perceptual SLA Formulation:** Anchor the 800ms target to Card-Moran-Newell cognitive thresholds (sub-1,000ms preserves thought continuity). Establish that streaming tokens at $\ge 40\text{ TPS}$ eliminates perceived generation delay once Time-to-First-Token is cleared.
2. **Modular Latency Budget Breakdown:**
   - Client-to-server network transit: 100ms.
   - Vector database retrieval and embedding: 150ms.
   - Server queuing and intent classification: 50ms.
   - LLM Time-to-First-Token ($TTFT$): 400ms.
   - Initial token rendering buffer: 100ms.
   - Total Budget = $100 + 150 + 50 + 400 + 100 = \mathbf{800\text{ms}}$.
3. **KV Context Caching for Product Catalogs:** Cache the static product catalog taxonomy and system prompt prefixes. Caching cuts prefill computation by 85%, dropping $TTFT$ from 2,800ms to 420ms.
4. **Cascade Routing Policy:** Route simple keyword and brand navigation queries (60% volume) to elastic deterministic search and small 3B models ($< 150\text{ms}$). Reserve multi-attribute semantic reasoning queries for cached frontier models, ensuring average user latency sits comfortably at 350ms.
:::
```

- **Highlight 5:**
  `==Streaming tokens does not make neural compute faster; streaming tokens exploits human cognitive reading limits to make software feel instantaneous.==`

#### Stage 10: Active Learning Experiment (`::: try`)
```markdown
::: try Sizing a multi-tier model cascade
Use any spreadsheet or consumer LLM chat interface to simulate a three-tier model cascade for an enterprise application receiving 1,000,000 queries per month.

Input Parameters:
- Tier 1 (Semantic Cache): Unit Cost = $0.0001, Latency = 50ms, Coverage = 40%
- Tier 2 (8B Parameter Model): Unit Cost = $0.0020, Latency = 250ms, Coverage = 45%
- Tier 3 (Frontier Reasoning Model): Unit Cost = $0.0300, Latency = 2,200ms, Coverage = 15%

Calculations to perform:
1. Calculate the total monthly expenditure of routing 100% of queries to Tier 3 ($1{,}000{,}000 \times \$0.0300 = \$30{,}000$).
2. Calculate the weighted monthly expenditure of the three-tier cascade:
   $$\text{Cost} = (400{,}000 \times \$0.0001) + (450{,}000 \times \$0.0020) + (150{,}000 \times \$0.0300) = \$40 + \$900 + \$4{,}500 = \mathbf{\$5{,}440}$$
3. Verify that the cascade slashes monthly compute expenditure by **81.9%** ($$30{,}000 \to \$5{,}440$) while reducing weighted average response time from 2,200ms to **462.5ms**.
:::
```

#### Stage 11: Media Cards (3 Registered Sources)
```markdown
{{read anthropic-context-caching}}

{{paper google-gemini-long-context}}

{{read card-moran-newell-psychology-hci}}
```

#### Stage 12: Check Yourself & Upside-Down Answers
- **Highlight 6:**
  `==Context caching shifts the economic frontier of artificial intelligence from brute-force recomputation to memory-resident intelligence.==`

```markdown
::: check Check yourself
1. What are the three Card-Moran-Newell human cognitive perception thresholds, and how do they govern AI latency budgets? <span class="lvl">recall</span>
2. An enterprise document assistant uses a commercial model where uncached input costs $3.00 per million tokens, cache writes cost $3.75 per million, and cache reads cost $0.30 per million. Calculate the break-even query velocity ($Q^*$). <span class="lvl">apply</span>
3. Explain why streaming tokens to a user's browser masks generation latency ($TPS$) but provides zero relief for Time-to-First-Token ($TTFT$). <span class="lvl">explain</span>
4. A product manager observes that an e-commerce conversational search bot suffers from high $TTFT$ during evening peak traffic. How would you redesign the caching and retrieval architecture to stabilize latency? <span class="lvl">transfer</span>
5. A venture capitalist advises your startup to immediately purchase a dedicated cluster of 8 H100 GPUs at $24,000 per month rather than paying commercial API token fees. Evaluate the strategic and financial risks of this decision. <span class="lvl">judge</span>
:::

::: answers
1. The three thresholds are 100ms (perceived as immediate, direct physical manipulation), 1,000ms (the limit of unbroken human thought flow), and 10,000ms (the ceiling of user attention before complete task abandonment). An interactive AI search or chat SLA must deliver initial tokens under 1,000ms to prevent user cognitive interruption.
2. The break-even query velocity formula is $Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}} + 1$. Substituting the values: $Q^* = \frac{3.75 - 0.30}{3.00 - 0.30} + 1 = \frac{3.45}{2.70} + 1 \approx 1.28 + 1 = 2.28$. The system recoups its cache write surcharge and becomes cheaper than uncached queries on the 3rd query within the 5-minute TTL window.
3. Time-to-First-Token represents the prefill computation phase where the model must process all prompt tokens and calculate initial attention matrices before generating a single word; during this window, nothing can be displayed. Streaming outputs tokens sequentially as they are generated, matching human reading speeds ($\approx 8\text{ tokens/sec}$), making subsequent token generation feel instantaneous once $TTFT$ is cleared.
4. Separate the static catalog prefix from dynamic user query tokens. Place static system prompts, product taxonomies, and few-shot formatting examples in persistent KV context cache with active keep-alive pings to prevent eviction. Direct fast keyword and intent parsing to an in-memory cache, and stream intermediate search status updates to the client interface within 150ms while background LLM inference runs.
5. Committing to a $24,000/month fixed GPU lease introduces severe financial and operational risk. Unless query volume consistently exceeds 50 million tokens daily ($V^*$), fixed hosting costs exceed variable API billing. Furthermore, self-hosting requires dedicated MLOps engineering headcount, ongoing model fine-tuning, load-balancing infrastructure, and leaves the firm locked into current-generation hardware while cloud API frontier models rapidly drop in price and advance in reasoning quality.
:::
```

#### Stage 13: The Night-Before Recap Page (Exactly 5 Lines)
```markdown
::: recap The night-before page
1. Latency is biological: keep Time-to-First-Token under 1,000ms to preserve human cognitive flow; stream output tokens at $\ge 40\text{ TPS}$ to eliminate perceived delay.
2. Deconstruct end-to-end latency into a strict modular budget: network transit, vector retrieval, prefill $TTFT$, and streaming generation must each buy their milliseconds.
3. KV context caching eliminates redundant attention prefill across long documents, cutting $TTFT$ by 85% and token expenditure by 90% after just 2 to 3 queries.
4. Deploy multi-tier cascade routing: resolve 80%+ of volume through deterministic caches and small 8B models, reserving frontier engines for complex reasoning.
5. Build vs. buy is an economic volume threshold: use flexible commercial APIs below 50 million tokens daily; self-host dedicated GPU clusters only at high, stable scale.
:::
```

---

## 5. SVG Specification: `content/figures/product-architecture-economics.svg`

### 5.1 Design Anatomy & Geometry
- **Dimensions:** `viewBox="0 0 640 330"`
- **Layout:** Two equal-width panels separated by a vertical rule line at $X = 335$.
- **Left Panel:** The Latency Budget Breakdown & Cognitive Perception Thresholds ($X = 20\dots 320$).
  - Visual breakdown of the 800ms interactive SLA target:
    - Network Transit: 100ms
    - Semantic Retrieval & Vector Index: 150ms
    - Pre-fill Time-to-First-Token ($TTFT$): 250ms
    - Streaming Generation: 300ms (at $\ge 50\text{ TPS}$)
  - Perceptual milestones: 100ms (Direct manipulation), 1.0s (Thought flow), 10s (Task abandonment).
- **Right Panel:** Three-Tier Cascade Model Routing & Financial Savings ($X = 350\dots 620$).
  - Tier 1: Semantic Cache & Deterministic API (42% volume | ₹0.002 | 45ms)
  - Tier 2: Fine-Tuned 8B SLM ($\theta \ge 0.88$) (43% volume | ₹0.040 | 240ms)
  - Tier 3: Frontier Reasoning Engine ($\theta < 0.88$) (15% volume | ₹0.850 | 1,850ms)
  - Highlighted economic payoff block: ₹8.50 Cr $\to$ ₹1.46 Cr/month (82.9% reduction, ₹7.04 Cr saved monthly) with average latency 399.6ms.
- **CSS Token Classes:** `.t-display`, `.paper.acc-s`, `.wash.acc-s`, `.rule-s`.

### 5.2 Exact SVG Code

```xml
<svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Left: End-to-end latency budget breakdown against Card-Moran-Newell human cognitive perception thresholds. Right: Three-tier cascade model routing topology slashing costs by 82.9%.">
  <text class="t-display" x="20" y="26" font-size="15">The End-to-End Latency Budget</text>
  <text class="t-display" x="350" y="26" font-size="15">Three-Tier Cascade Model Routing</text>

  <!-- Left: Latency Budget Breakdown -->
  <!-- Hop 1: Network Transit -->
  <rect class="paper acc-s" x="20" y="42" width="300" height="42" rx="4" stroke-width="1.5"/>
  <text x="32" y="60" font-size="10.5" font-weight="bold">1. Network Transit &amp; Handshake</text>
  <text x="32" y="74" font-size="9">Client TLS, DNS, edge ingress routing (100ms)</text>

  <!-- Hop 2: Semantic Retrieval -->
  <rect class="paper acc-s" x="20" y="90" width="300" height="42" rx="4" stroke-width="1.5"/>
  <text x="32" y="108" font-size="10.5" font-weight="bold">2. Retrieval &amp; Semantic Context</text>
  <text x="32" y="122" font-size="9">Vector search, hybrid BM25, re-ranking (150ms)</text>

  <!-- Hop 3: TTFT Prefill -->
  <rect class="paper acc-s" x="20" y="138" width="300" height="42" rx="4" stroke-width="1.5"/>
  <text x="32" y="156" font-size="10.5" font-weight="bold">3. Time-to-First-Token (TTFT)</text>
  <text x="32" y="170" font-size="9">Prompt attention prefill compute (250ms with Cache)</text>

  <!-- Hop 4: Streaming Generation -->
  <rect class="wash acc-s" x="20" y="186" width="300" height="42" rx="4" stroke-width="2"/>
  <text class="t-display" x="32" y="204" font-size="11">4. Streaming Token Generation</text>
  <text x="32" y="218" font-size="9">30 tokens @ 60 TPS (Perceived wait = 0ms once streaming)</text>

  <!-- Perception Boundaries -->
  <line class="rule-s" x1="20" x2="320" y1="242" y2="242" stroke-width="1"/>
  <text x="20" y="258" font-size="10" font-weight="bold">Card-Moran-Newell Cognitive Thresholds:</text>
  <text x="20" y="274" font-size="9.5">• 100ms: Instantaneous action (direct manipulation)</text>
  <text x="20" y="288" font-size="9.5">• 1,000ms: Unbroken thought flow (Interactive SLA target)</text>
  <text x="20" y="302" font-size="9.5">• 10,000ms: Total task abandonment limit</text>

  <!-- Divider -->
  <line class="rule-s" x1="335" x2="335" y1="20" y2="315" stroke-width="1"/>

  <!-- Right: Cascade Model Routing Topology -->
  <!-- Tier 1: Semantic Cache & Rules -->
  <rect class="paper acc-s" x="350" y="42" width="270" height="48" rx="4" stroke-width="1.5"/>
  <text x="362" y="60" font-size="11" font-weight="bold">Tier 1: Semantic Cache &amp; Rules</text>
  <text x="362" y="74" font-size="9.5">42% volume · ₹0.002/call · p95 = 45ms latency</text>
  <text x="362" y="84" font-size="8.5" fill="#666">Deterministic lookups, status checks, FAQs</text>

  <!-- Arrow to Tier 2 -->
  <path d="M 485 90 L 485 96 M 480 93 L 485 98 L 490 93" stroke="currentColor" fill="none" stroke-width="1.2"/>

  <!-- Tier 2: Fine-Tuned 8B SLM -->
  <rect class="paper acc-s" x="350" y="98" width="270" height="48" rx="4" stroke-width="1.5"/>
  <text x="362" y="116" font-size="11" font-weight="bold">Tier 2: Fine-Tuned 8B SLM</text>
  <text x="362" y="130" font-size="9.5">43% volume · ₹0.040/call · p95 = 240ms latency</text>
  <text x="362" y="140" font-size="8.5" fill="#666">Gated by confidence score threshold θ ≥ 0.88</text>

  <!-- Arrow to Tier 3 -->
  <path d="M 485 146 L 485 152 M 480 149 L 485 154 L 490 149" stroke="currentColor" fill="none" stroke-width="1.2"/>

  <!-- Tier 3: Frontier Reasoning Model -->
  <rect class="paper acc-s" x="350" y="154" width="270" height="48" rx="4" stroke-width="1.5"/>
  <text x="362" y="172" font-size="11" font-weight="bold">Tier 3: Frontier Reasoning Engine</text>
  <text x="362" y="186" font-size="9.5">15% volume · ₹0.850/call · p95 = 1,850ms latency</text>
  <text x="362" y="196" font-size="8.5" fill="#666">Complex reasoning, multi-step analysis, edge cases</text>

  <!-- Aggregate Payoff Block -->
  <rect class="wash acc-s" x="350" y="210" width="270" height="66" rx="4" stroke-width="2"/>
  <text class="t-display" x="362" y="228" font-size="11.5">Cascade Economic &amp; Latency Impact</text>
  <text x="362" y="244" font-size="9.5">Monthly Spend: ₹8.50 Cr → ₹1.46 Cr (82.9% savings)</text>
  <text x="362" y="258" font-size="9.5" font-weight="bold">Average Latency: 2,100ms → 399.6ms (5.25× speedup)</text>
  <text x="362" y="270" font-size="8.5" fill="#666">Context caching break-even Q* ≈ 3 queries per TTL</text>

  <text x="350" y="296" font-size="10.5">Route simple queries away from frontier models.</text>
  <text x="350" y="312" font-size="10.5">Match model capability directly to task complexity.</text>
</svg>
```

---

## 6. Pre-Flight Verification & Linter Readiness

Downstream chapter drafters and figure builders must verify the following items before running `npm run check`:
1. **Container Header Titles:** Zero math formulas or HTML tags in any `::: container` line (e.g. `::: principle Evals as the new product contract`, `::: case Illustrative · Swiggy Instamart Automated Dispute Resolution`).
2. **Highlights Count:** Strictly between 4 and 8 per chapter.
3. **Stat Block Count:** Strictly 1 per chapter with `<span class="src">` source link.
4. **Media Card Syntax:** Verified on standalone lines (`{{read ...}}` or `{{paper ...}}`).
5. **Retrieval Practice:** 5 questions ending with `<span class="lvl">...</span>` and matching `::: answers`.
6. **Recap Page:** Exactly 5 numbered lines in `::: recap The night-before page`.
7. **SVG Assets:** Files placed at `content/figures/ai-product-lifecycle.svg` and `content/figures/product-architecture-economics.svg`.
8. **Anti-AI Writing:** No occurrences of *testament*, *pivotal*, *crucial*, *landscape*, *delve*, *beacon*, and zero trailing `, -ing` participial clauses.
