# INFERENCE Compendium: Pedagogical, Authoring, and Validation Specification Report

**Document Status:** Complete & Authoritative  
**Milestone:** v3 Product Management Track Expansion  
**Author:** Survey Agent 2 (Specification Miner)  
**Target Audience:** Downstream Chapter Authors, Editors, and Codebase Verifiers  
**Working Directory:** `C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_survey_2\`

---

## 1. Executive Summary & Pedagogical Foundations

The *INFERENCE* compendium is a publication-grade, source-traced AI curriculum specifically engineered for non-technical MBA students preparing for high-stakes placement interviews (management consulting, product management, marketing, operations, general management).

### 1.1 Core Mission & Reader Persona
* **The Reader:** An MBA student with a non-technical background. They are intelligent, highly time-constrained, and anxious about placement rounds (case interviews, guesstimates, group discussions, and technical deep-dives).
* **Pedagogical Objective:** Readers must learn to *reason* about artificial intelligence from first principles, unit economics, and operational constraints—not recite vendor talking points or memorise definitions. If a paragraph could be skipped without harming the student's ability to answer an interviewer's probing question, it must be cut.

### 1.2 Cognitive Architecture & Learning Principles (from `docs/PEDAGOGY.md`)

| Pedagogical Principle | Cognitive Science Evidence Base | Implementation in INFERENCE Chapters |
|:---|:---|:---|
| **Advance Organisers** | Ausubel's advance organisers | Every chapter lede anchors to a concrete, familiar real-world experience (food delivery ETA, cricket pitch par scores, kirana store restocking) before introducing technical concepts. |
| **First-Principles Derivation** | Transfer learning through worked derivation | `::: principle` containers derive core truths through explicit premise-to-conclusion chains rather than stating dogmatic rules. |
| **Concreteness Fading** | Goldstone & Son / Bruner | Start with napkin-scale arithmetic (2 parameters, 10 orders), scale up to complex systems (billions of parameters, distributed clusters). |
| **Cognitive Load Reduction** | Sweller's cognitive load theory | `::: case` blocks provide fully worked end-to-end business dilemmas before requiring independent problem-solving. |
| **Dual Coding** | Paivio's dual coding theory | Exactly one high-fidelity SVG diagram per major conceptual shift (`{{figure ...}}`), styled in coordinated theme CSS tokens. |
| **Retrieval Practice** | Roediger & Karpicke testing effect | `::: check` retrieval practice blocks with answers hidden upside-down in `::: answers` (`transform: rotate(180deg)`). |
| **Elaboration & Transfer** | Bloom's Revised Taxonomy | Questions explicitly tiered: `recall`, `apply`, `explain`, `transfer`, `judge`. Chapter objectives lead with bold Bloom verbs. |
| **Conceptual Change & Refutation** | Posner et al. conceptual change | `::: concept` blocks explicitly isolate the common misconception; `::: myth` blocks directly refute industry fallacies. |
| **Active Learning** | Chi's ICAP framework | `::: try` containers supply exact prompt text for readers to paste into live LLMs to observe mechanics firsthand. |
| **Signalling** | Mayer's multimedia principles | Highlighter mark (`==...==`) establishes the primary skim layer; dedicated 5-line recap page (`::: recap`) enables high-speed revision. |
| **Contextual Interleaving** | Rohrer & Taylor | `::: lens <track>` blocks contextualise the core technical mechanism across placement tracks (Product, Consulting, Marketing, Operations). |

### 1.3 Chapter Density Targets
* **Word Count:** 2,000 to 3,500 words per narrative chapter (10–16 minutes of reading time).
* **Highlight Density:** Exactly 4 to 8 highlights (`==...==`) per chapter (~1 per major section). If everything is highlighted, nothing is.
* **Media Density:** Exactly 1 to 3 media cards (`{{watch ...}}`, `{{read ...}}`, `{{paper ...}}`) per chapter.
* **Stat Density:** Exactly 1 stat block (`::: stat ...`) per chapter.
* **Retrieval Density:** Exactly 4 to 6 check questions + upside-down answers per chapter.
* **Recap Density:** Exactly 5 numbered lines in the night-before recap (`::: recap The night-before page`).

---

## 2. The 13-Stage Pedagogical Chapter Arc

Every chapter must strictly follow the standard 13-stage arc documented in `docs/PEDAGOGY.md`:

```text
[1. Opener Metadata] ──> [2. Lede & Thesis Highlight] ──> [3. First-Principles Derivation]
                                                                     │
[6. Empirical Stat / Myth] <── [5. Scale / Complication Fig] <── [4. Core Concept Cards]
       │
[7. Worked Business Case] ──> [8. Track Lens Blocks] ──> [9. Placement Interview Room]
                                                                     │
[12. Retrieval Practice & Answers] <── [11. Media Cards] <── [10. Try It Active Prompt]
       │
[13. The Night-Before Recap Page (5 Lines)]
```

### Stage-by-Stage Detailed Breakdown:
1. **Opener:** Frontmatter YAML defining ID, title, deck, level, track chips, hook puzzle, and 3–4 Bloom-tagged objectives.
2. **Lede:** Opens with an unpretentious, relatable daily scenario. Drops jargon. The very first highlighted sentence (`==...==`) must formulate the chapter's central thesis.
3. **From First Principles (`::: principle`):** Step-by-step derivation from indisputable premises to a clear conclusion (symbolised by ∴).
4. **Name It (`::: concept`):** Formalises 1–3 terms. Formatted with `**Plain words.**`, `**Analogy.**`, and `**Misconception.**`.
5. **Scale It / Complicate It (`{{figure ...}}`):** Demonstrates where the simplistic napkin model breaks down under enterprise scale or operational pressure, paired with an SVG diagram.
6. **Evidence (`::: stat` & `::: myth`):** A single high-impact metric with cited primary source (`::: stat`) and/or a direct confrontation with an industry fallacy (`::: myth`).
7. **Worked Case (`::: case Illustrative · ...`):** A complete business dilemma structured into `#### The situation`, `#### The decision`, and `#### Your move`.
8. **Lenses (`::: lens <track>`):** 2–4 short paragraphs demonstrating how this concept shifts across tracks (e.g. `product`, `consulting`, `marketing`).
9. **Interview Room (`::: interview <Title>`):** A realistic recruiter question, a punchy opening line, an explanation of what the interviewer is evaluating, and a structured multi-part answer.
10. **Try It Yourself (`::: try <Title>`):** A zero-setup prompt for the reader to run in an AI interface (ChatGPT, Claude, Gemini) to watch the mechanism break or behave.
11. **Watch / Read (`{{watch ...}}`, `{{read ...}}`):** 1–3 curated external media cards with timestamps, duration, why it matters, and what sections to skip.
12. **Check Yourself & Answers (`::: check`, `::: answers`):** 4–6 questions spanning Bloom levels (`recall`, `apply`, `explain`, `transfer`, `judge`) followed by inverted upside-down answers.
13. **The Night-Before Page (`::: recap The night-before page`):** Exactly 5 numbered lines summarising the chapter's mental models, designed to print on an isolated recap page.

---

## 3. Frontmatter Schema Specification

Chapter Markdown files located in `content/chapters/<id>.md` must open with a YAML frontmatter block parsed via `gray-matter`.

### 3.1 Field Schema Reference

| Field | Type | Required? | Constraints & Validation Rules | Example |
|:---|:---|:---:|:---|:---|
| `id` | string | **Yes** | Must match the filename `<id>.md` and the chapter ID declared in `content/toc.yml`. Lowercase alphanumeric and hyphens only. | `ai-product-lifecycle` |
| `title` | string | **Yes** | Chapter title. Must match `toc.yml`. | `"The AI product lifecycle: evals, specs, and drift"` |
| `deck` | string | **Yes** | 1–2 punchy sentences summarizing why this chapter matters for an MBA placement interview. | `"Golden datasets as product specs, LLM-as-a-judge pipelines, regression testing, and production drift."` |
| `level` | string | **Yes** | Difficulty level indicator. Standard default is `Zero to one`. | `Zero to one` |
| `tracks` | array | **Yes** | List of track IDs defined in `book.yml` (`foundations`, `consulting`, `marketing`, `product`, `operations`, `finance`, `strategy`). | `[product, consulting]` |
| `prereq` | array | No | List of prior chapter IDs recommended before reading this chapter. | `[judging-output, delegation-brief]` |
| `hook` | string | **Yes** | A concrete business puzzle displayed in the black box on the opener. Indian business context where natural. | `"A fintech unicorn deploys an LLM... How do you prove it?"` |
| `objectives` | array | **Yes** | Exactly 3–4 learning objectives. **Must** begin with a bold Bloom verb (`**Define**`, `**Architect**`, `**Evaluate**`, `**Calculate**`, etc.). | `- "**Architect** an eval harness..."` |
| `sample` | boolean | No | Set to `true` **only** for design prototypes (`what-is-a-model.md`). Production chapters must omit this or set `false`. `check.mjs` warns if `true`. | `false` |
| `status` | string | No | Chapter production status (`draft`, `review`, `final`). Typically managed in `toc.yml`. | `draft` |

### 3.2 Canonical Frontmatter Template

```yaml
---
id: ai-product-lifecycle
title: "The AI product lifecycle: evals, specs, and drift"
deck: "Golden test suites as PRDs, LLM-as-a-judge pipelines, offline-to-online evaluation harnesses, and managing production behavioral drift."
level: Zero to one
tracks: [product, consulting]
prereq: [judging-output, delegation-brief]
hook: "An Indian quick-commerce unicorn deploys an autonomous customer support agent. In sandbox testing, it resolved 94% of refund disputes cleanly. Within forty-eight hours of full rollout across Bengaluru, customer escalations surged by 300% as the model hallucinated instant UPI refund vouchers. How do you design an evaluation suite that catches behavioral regressions before code touches production?"
objectives:
  - "**Deconstruct** the AI product lifecycle from exploratory prompting to automated continuous integration evals."
  - "**Architect** multi-tiered evaluation harnesses combining deterministic heuristics, golden test suites, and model-based judges."
  - "**Calculate** inter-rater reliability metrics (Cohen's Kappa) and alignment rates between LLM judges and human product managers."
  - "**Formulate** proactive drift mitigation playbooks balancing semantic regression testing against model version upgrades."
---
```

---

## 4. Container Blocks Syntax & DOM Mapping

All container blocks use the `markdown-it-container` syntax: `::: <name> [optional title]` followed by Markdown content, closed with `:::`.

### 4.1 Principle Block (`::: principle`)
* **Purpose:** First-principles logical derivation of a core concept.
* **Internal Syntax:** A numbered list where each number represents a logical premise. The final step is the conclusion.
* **Special Engine Behavior:** `scripts/lib/render.mjs` automatically strips any leading `∴` character on numbered conclusion lines (`body.replace(/(:::\s*principle[\s\S]*?)(^\s*\d+\.\s*)∴\s*/gm, '$1$2')`) because CSS `.blk-principle ol > li:last-child::before` automatically renders the `∴` badge.
* **Markup Example:**
  ```markdown
  ::: principle The economics of evaluation
  1. Traditional software specs are deterministic: input $X$ yields output $Y$.
  2. Probabilistic models output token distributions where identical inputs produce variable completions.
  3. You cannot write a unit test for every output, but you cannot ship without bounding failure rates.
  4. An evaluation harness replaces static specifications with statistical assertions over representative distributions.
  5. ∴ In AI product management, the evaluation suite *is* the product specification.
  :::
  ```

### 4.2 Concept Card (`::: concept <Term>`)
* **Purpose:** Deep definition of 1–3 critical industry terms per chapter.
* **Auto-Numbering:** `render.mjs` automatically assigns numbered index badges in the format `Concept <ChapterNum>.<ConceptCount>` (e.g. `Concept 18.1`).
* **Required Structure:** Must contain three bold paragraph headers:
  - `**Plain words.** <1-2 sentences in simple, non-jargon language>`
  - `**Analogy.** <A vivid physical or operational metaphor>`
  - `**Misconception.** <The common executive or novice fallacy directly exposed>`
* **Markup Example:**
  ```markdown
  ::: concept Golden Dataset
  **Plain words.** A curated, version-controlled collection of representative user inputs paired with ground-truth reference outputs or explicit scoring rubrics.

  **Analogy.** The master calibration weights kept in a national standards laboratory. When factory scales drift, they are tested against the unchanging physical standard.

  **Misconception.** "A golden dataset needs ten thousand examples." High-quality golden evaluation suites often start with 50 to 100 meticulously annotated edge cases; volume without editorial precision produces noisy, uninterpretable benchmarks.
  :::
  ```

### 4.3 Worked Case Block (`::: case Illustrative · <Title>`)
* **Purpose:** Concrete, end-to-end business dilemma and resolution.
* **Naming Convention:** Must include `Illustrative · ` in the title unless the case is an empirically sourced real-world corporate event.
* **Required Subsections:** Must use level-4 Markdown headings (`####`):
  - `#### The situation` (Context, enterprise scale, dilemma, constraints)
  - `#### The decision` (Trade-offs evaluated, alternatives rejected)
  - `#### Your move` (Actionable tactical playbook for the PM/consultant)
* **Markup Example:**
  ```markdown
  ::: case Illustrative · Swiggy Instamart Automated Dispute Resolution
  #### The situation
  A quick-commerce platform processes 450,000 grocery deliveries daily. Disputed orders (damaged produce, missing items) average 3.2% of volume, creating 14,400 daily support tickets. Customer support headcount costs ₹3.6 crore annually. The team pilots an LLM resolution agent targeting 70% automated resolution.

  #### The decision
  During the pilot, the model approved ₹82 lakh in fraudulent refund claims because malicious users submitted blurred images of empty cartons. The VP of Operations wants to shut the project down. The Lead PM argues for keeping the bot but tightening the system prompt.

  #### Your move
  Reject prompt tweaking as a defense. Decouple dispute evaluation into a two-stage architecture: a deterministic computer-vision classifier for image validity, followed by a rules engine checking user refund history. Restrict the generative model strictly to summarizing verified outcomes.
  :::
  ```

### 4.4 Track Lens Block (`::: lens <track_id>`)
* **Purpose:** Highlights how the chapter's technical core applies to a specific placement career track.
* **Syntax:** `::: lens <track_id>` where `<track_id>` matches an entry from `book.yml` (e.g. `product`, `consulting`, `marketing`, `operations`, `strategy`).
* **Styling:** Injected with inline CSS `--lens: var(--t-<track_id>)` pulling track-specific accent tokens.
* **Length:** 2 to 3 concise, punchy sentences.
* **Markup Example:**
  ```markdown
  ::: lens product
  For a product manager, model accuracy is irrelevant without an operational cost curve. Your job is not to pick the highest-scoring model on Hugging Face, but to find the cheapest model that clears the minimum quality bar on your golden evaluation suite.
  :::
  ```

### 4.5 Interview Room Block (`::: interview <Title>`)
* **Purpose:** Realistic placement interview simulation with a model response.
* **Required Internal Structure:**
  - `**Q.** <Interview question text>`
  - `> "<Strong, crisp opening sentence establishing immediate executive command>"`
  - `**What they are testing.** <Cognitive competencies, business trade-offs, and technical grounding>`
  - `**A strong structure.** <Step-by-step roadmap: framework, metrics, trade-offs, risk mitigations>`
* **Markup Example:**
  ```markdown
  ::: interview Architecting an LLM Evaluation Pipeline
  **Q.** You are PM for a customer-facing AI agent at an Indian fintech bank. How do you decide whether a new model checkpoint is ready for production?

  > "Before touching live user traffic, the model must pass a four-tier evaluation harness: deterministic rule filters, golden regression tests, an LLM judge calibrated against human annotations, and a shadow canary deployment."

  **What they are testing.** Whether you treat AI deployment as a stochastic software engineering discipline with regression guardrails, or as subjective prompt tweaking.

  **A strong structure.**
  1. **Deterministic Guardrails:** Regex and heuristic checks for PII, toxic tokens, and regulatory disclaimers.
  2. **Golden Benchmark Suite:** 200 curated historical queries testing edge-case compliance. Zero tolerance for regression on critical safety cases.
  3. **LLM-as-a-Judge Calibration:** Secondary evaluator model scoring adherence to bank policy rubrics, verified to have Cohen's $\kappa \ge 0.82$ against human PM reviewers.
  4. **Canary Shadow Routing:** Deploying the candidate model in dark mode alongside production traffic to compare latency and output distributions before cutting over.
  :::
  ```

### 4.6 Myth / Reality Block (`::: myth`)
* **Purpose:** Direct refutation of an enterprise AI misconception.
* **Required Structure:** Exactly two paragraphs:
  - `**Myth.** <The widespread industry misconception>`
  - `**Reality.** <The empirical, operational fact with evidence>`
* **Markup Example:**
  ```markdown
  ::: myth
  **Myth.** You need thousands of hand-annotated human labels before you can establish an effective LLM evaluation harness.

  **Reality.** High-performing product teams bootstrap evaluation suites with 50 to 100 synthetic edge cases generated from production failure logs, progressively refining the dataset through human review of disagreements between model judges.
  :::
  ```

### 4.7 Pull Quote Block (`::: pull`)
* **Purpose:** Standout thematic quotation.
* **Constraint:** Maximum one per chapter.
* **Structure:** Two paragraphs: quote text, followed by attribution.
* **Markup Example:**
  ```markdown
  ::: pull
  If you cannot measure whether your AI product got better or worse this week, you are not doing product management; you are doing performance art.

  Marty Cagan, Silicon Valley Product Group
  :::
  ```

### 4.8 Try It Yourself Block (`::: try <Title>`)
* **Purpose:** Active reader experimentation using any consumer LLM.
* **Structure:** Explanatory text followed by a fenced code block (` ```text `) containing the prompt.
* **Markup Example:**
  ```markdown
  ::: try Test LLM-as-a-judge position bias
  Paste the following prompt into ChatGPT or Claude. Swap the order of Response A and Response B in a second window and compare scores:

  ```text
  You are an expert product evaluator. Compare Response A and Response B to the user query: "How do I calculate customer acquisition cost?"
  Grade each response from 1 to 5 on clarity and conciseness.
  [Insert Response A: 200 words]
  [Insert Response B: 50 words]
  ```
  Notice whether the judge systematically awards higher marks to the longer, more verbose output regardless of quality.
  :::
  ```

---

## 5. Exact Specifications for Mandatory Core Elements

### 5.1 Highlights (`==...==`)
* **Count:** Strictly **4 to 8 highlights** per chapter.
* **Rule:** Approximately one highlight per major section (§ XX.Y).
* **Thesis Placement:** The very first highlight in the chapter **must** be inside the opening lede paragraph and state the chapter's foundational thesis.
* **Skim Engine Integration:** In `scripts/lib/render.mjs`, reading times are computed from highlights:
  $$\text{Skim Words} = \text{highlighted tokens} + \text{night-before recap tokens}$$
  $$\text{Skim Time (min)} = \max\left(2, \text{round}\left(\frac{\text{Skim Words}}{180}\right) + 2\right)$$
* **Syntax:** `==Complete sentence with strong verbs and clear assertion.==`

### 5.2 Stat Blocks (`::: stat <Number>`)
* **Count:** Strictly **exactly 1 stat block** per chapter.
* **Tag Header:** The stat number string is placed immediately on the container line: `::: stat <STAT_VALUE>`.
* **Typography:** Rendered into `<p class="stat-n">` with CSS rules:
  ```css
  font-family: var(--f-display);
  font-weight: 880;
  font-stretch: 70%;
  font-size: 4.6rem;
  line-height: .82;
  letter-spacing: -.02em;
  font-variant-numeric: lining-nums;
  ```
* **Formatting Requirements:** Plain numbers, percentages, multipliers, currency, or comparisons (e.g. `::: stat 40%`, `::: stat 15×`, `::: stat ₹100 crore`, `::: stat $51.4 billion`, `::: stat ₹3.08L vs $48M`, `::: stat 82.4%`).
* **Internal Content:** A concise 1–3 sentence paragraph explaining the operational significance of the statistic, followed by a mandatory citation span:
  `<span class="src">Source: [@source-id]</span>` (or `Sources: [@source-1]; [@source-2]`).
* **Markup Example:**
  ```markdown
  ::: stat 84%
  Agreement rate between an optimized GPT-4 judge and senior human product managers on customer support quality rubrics, dropping to 58% when grading open-ended creative tasks.
  <span class="src">Source: [@openai-evals]</span>
  :::
  ```

### 5.3 Media Cards (`{{watch ...}}`, `{{read ...}}`, etc.)
* **Count:** Strictly **1 to 3 media cards** per chapter.
* **Syntax:** Must be placed on its own standalone line:
  - `{{watch <source-id>}}` (for YouTube videos or recorded talks)
  - `{{read <source-id>}}` (for industry articles or long-form analyses)
  - `{{paper <source-id>}}` (for academic papers and technical preprints)
  - `{{listen <source-id>}}` (for podcasts)
  - `{{media <source-id>}}` (generic fallback)
* **Underlying Architecture:**
  1. `<source-id>` **must** exist in `content/sources.yml`. If missing, `render.mjs` logs an error `unknown source "<source-id>"` and `check.mjs` fails.
  2. The media card renders an automated vector QR code encoding the source URL for print readability.
  3. Displays duration (`minutes`), tier badge (`Tier A · primary source`), creator, publisher, year, and the pedagogical rationale (`why`).
  4. Video cards support `marks` timestamps (e.g. `t: "4:17", label: "..."`).
* **Markup Example:**
  ```markdown
  {{paper anthropic-context-caching}}
  ```

### 5.4 Check Yourself Questions & Upside-Down Answers
* **Count:** Strictly **4 to 6 questions** per chapter.
* **Structure:** Two linked container blocks: `::: check Check yourself` followed immediately by `::: answers`.
* **Question Format:** Numbered list `1. ...` through `6. ...`. Each question item **must** terminate with a Bloom's level HTML span:
  `<span class="lvl">recall|apply|explain|transfer|judge</span>`
* **Answers Format:** Numbered list `1. ...` through `6. ...` matching the questions.
* **Physical Print Inversion:** The answers container renders as `<details class="answers" open><div class="flip">` where `.flip { transform: rotate(180deg); }`. In print and on screen, answers appear physically upside-down to ensure genuine retrieval practice before verification.
* **Markup Example:**
  ```markdown
  ::: check Check yourself
  1. In the context of LLM evaluation, what distinguishes an offline benchmark from an online eval? <span class="lvl">recall</span>
  2. An enterprise customer support chatbot experiences a sudden 15% drop in CSAT following a model update. How do you use a golden dataset to isolate whether prompt drift or model regression caused the issue? <span class="lvl">apply</span>
  3. Why does LLM-as-a-judge suffer from position bias, and what experimental technique neutralizes it? <span class="lvl">explain</span>
  4. Design a latency budget and routing policy for an e-commerce conversational search bar requiring sub-800ms response times. <span class="lvl">transfer</span>
  5. A vendor proposes replacing your team's 500-case human eval suite with a fully synthetic 50,000-case LLM-generated benchmark. Evaluate the risks of this transition. <span class="lvl">judge</span>
  :::

  ::: answers
  1. Offline benchmarks evaluate model completions against static, pre-collected datasets using automated rubrics before deployment. Online evals measure real-time operational metrics (acceptance rates, user latency, thumbs up/down, escalation frequency) on live production traffic.
  2. Run both the old and new model checkpoints across the identical, frozen golden dataset. If the new model scores lower on the golden dataset, the degradation is a model regression. If it scores identically, the live CSAT decline stems from changes in incoming user query distributions (data drift).
  3. LLM judges exhibit systematic favoritism toward the first candidate response (or longer, more verbose answers). Position bias is neutralized by evaluating each candidate pair twice with swapped orderings (A/B then B/A) and discarding inconsistent verdicts.
  4. Allocate 150ms for network transit, 100ms for semantic retrieval, and 500ms for time-to-first-token. Route standard keyword queries to deterministic search, pass simple informational queries to a fast 8B model, and reserve larger reasoning models for complex multi-intent requests.
  5. Synthetic benchmarks risk model-on-model contamination and lack authentic real-world edge cases. While useful for scale, abandoning human-curated edge cases removes ground truth and creates blind spots for high-severity user failure modes.
  :::
  ```

### 5.5 The Night-Before Recap Page (`::: recap`)
* **Count:** Strictly **exactly 5 numbered lines**.
* **Title:** Must be titled `::: recap The night-before page`.
* **Print Layout:** In CSS/Paged.js, `.blk-recap` breaks onto its own standalone review spread with large numbering (`01`, `02`, ..., `05`).
* **Editorial Rule:** Each line must summarize an operational rule, economic threshold, or strategic decision framework—not a trivial definition.
* **Markup Example:**
  ```markdown
  ::: recap The night-before page
  1. In AI product management, the evaluation harness *is* the product specification; if you cannot measure regression, you cannot ship.
  2. Bootstrapping evals requires 50 to 100 curated edge cases, not ten thousand noisy logs; quality and provenance beat raw volume.
  3. Model-based judges require continuous human calibration (target Cohen's $\kappa \ge 0.80$) and positional order de-biasing.
  4. Production drift is inevitable: monitor both data drift (user behavior shifts) and concept drift (real-world policy changes).
  5. Optimize AI unit economics through hierarchical routing: deterministic rules first, small specialized models second, frontier models last.
  :::
  ```

### 5.6 KaTeX Math Formatting
* **Display Math:** Delimited by double dollar signs `$$ ... $$`. Renders centered in a standalone `<div class="formula">`.
  ```markdown
  $$\text{Inter-Rater Reliability } (\kappa) = \frac{P_o - P_e}{1 - P_e}$$
  ```
* **Inline Math:** Delimited by single dollar signs `$ ... $`.
  ```markdown
  where $P_o$ represents observed agreement and $P_e$ represents hypothetical chance agreement.
  ```
* **Currency Regex Guard:** `render.mjs` contains a dedicated regex lookahead/lookbehind that explicitly skips plain currency strings:
  `/(?<=^|[\s(])\$(?!\$)([^\$\n]+?)(?<![\s\\])\$(?=[\s,.;:!?)\]]|$)/g`
  Plain currency values such as `$50 billion`, `$20.00`, or `$500 million` are preserved as raw text and **not** passed to KaTeX.
* **CRITICAL SYNTAX TRAP (Escaped HTML Leak):**
  In `scripts/check.mjs`, an explicit automated lint test fails the build if rendered HTML leaks escaped tags:
  ```javascript
  const textWithoutCode = r.html.replace(/<pre[\s\S]*?<\/pre>/g, '').replace(/<code[\s\S]*?<\/code>/g, '');
  if (/&lt;(?:span|div|math|p|table|tr|td|th|a|aside|header)[\s\S]{0,30}&gt;/.test(textWithoutCode)) {
    errors.push(`${c.id}: contains escaped HTML tag leak (&lt;span...&gt;) in rendered prose`);
  }
  ```
  **Rule:** NEVER put KaTeX formulas or raw HTML tags inside container header titles (e.g. `::: principle Analysis of $E=mc^2$` or `::: stat $500M`). Doing so causes Markdown-It to escape KaTeX HTML entities into `&lt;span class="katex"...&gt;`, immediately failing the build. Place all formulas inside the body of the container.

### 5.7 GFM Pipe Tables
* **Standard:** GitHub Flavored Markdown (GFM) pipe tables with alignment colons:
  ```markdown
  | Evaluation Dimension | Deterministic Heuristic | Model-Based Judge (LLM) | Human Review |
  |:---|:---|:---|:---|
  | **Latency** | < 5ms | 800ms – 2,500ms | Hours / Days |
  | **Cost per Turn** | ₹0.0001 (compute negligible) | ₹0.15 – ₹0.75 (API tokens) | ₹25 – ₹50 (fully loaded wage) |
  | **Edge Case Scalability** | Low (rigid pattern matching) | High (semantic understanding) | Low (analyst fatigue) |
  ```
* **Automated Wrapping:** `render.mjs` automatically intercepts table tokens and wraps them in `<div class="table-wrap"><table>...</table></div>`, ensuring responsive horizontal scrolling on mobile viewports without breaking desktop spreads.

---

## 6. Inline Syntax & Semantic Elements

| Semantic Element | Authoring Syntax | Rendered HTML / Engine Behavior | Downstream Rules |
|:---|:---|:---|:---|
| **Highlight** | `==Sentence==` | `<mark>Sentence</mark>` | 4–8 per chapter; 1st in lede is thesis. |
| **Margin Note** | `^[Note text]` | `<sup class="sn-ref">N</sup><span class="sn">...</span>` | Rendered into margin rail on desktop/print, inline on mobile. |
| **Glossary Term** | `[[term]]` or `[[term\|display]]` | 1st use: `<dfn class="term">display</dfn><span class="sn">...</span>`<br>Repeat: `<a class="term" href="#g-term">display</a>` | `id` **must** exist in `content/glossary.yml`. 1st use places definition in rail. |
| **Citation** | `[@source-id]` | `<a class="cite" href="...">Author et al., Year</a>` | `<source-id>` **must** exist in `content/sources.yml`. Automatically indexed. |
| **Section Head** | `## Heading` | `<h2 id="..."><span class="sec-n">§ XX.Y</span>Heading</h2>` | Automatically numbered with section symbol `§`. |
| **Subheading** | `### Subheading` | `<h3>Subheading</h3>` | Unnumbered analytical sub-section. |
| **Container Label**| `#### Label` | `<h4>Label</h4>` | Standard internal label for blocks (e.g. `#### The situation`). |
| **SVG Figure** | `{{figure id \| Caption \| Source}}` | `<figure class="fig" id="fig-id">...<figcaption>...</figure>` | Vector SVG must exist at `content/figures/<id>.svg`. Numbered `Fig XX.Y`. |
| **Wide Figure** | `{{figure-wide id \| Caption \| Source}}` | `<figure class="fig wide" ...>` | Extends figure across text column and margin rail. |

---

## 7. Anti-AI Writing & Human Editorial Standards

All chapters must comply with `anti-ai-writing.SKILL.md` (derived from Wikipedia's *WikiProject AI Cleanup* `WP:AISIGNS`, `WP:AITELLS`, and investigative journalism standards).

### 7.1 The Core Law: Specifics Kill Slop
Large Language Models naturally gravitate toward statistical regression to the mean, smoothing out specific details into generic abstractions. Authors must anchor every conceptual claim to verifiable proper nouns, exact rupee/dollar figures, named researchers, physical infrastructure, or concrete enterprise incidents.

### 7.2 Strictly Banned Vocabulary & Rhetorical Tropes

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       STRICTLY PROHIBITED PATTERNS                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. Inflationary Legacy: "stands as a testament", "serves as a stark         │
│    reminder", "plays a pivotal / crucial / key role", "evolving landscape", │
│    "delve into", "marks a turning point", "leaves an indelible mark".       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. Trailing "-ing" Participial Clauses: Sentences ending with comma +       │
│    "underscoring / highlighting / reflecting / ensuring / fostering X".     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. Canned Prestige Attribution: "featured in prominent media outlets",      │
│    "written by a leading industry expert", "garnered widespread attention". │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. Melodramatic Dichotomies: "In the high-stakes world of...",              │
│    "It is not a question of if, but when...", "A double-edged sword".       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. Redundant Adverbs: "devastatingly", "critically", "exponentially",       │
│    "fundamentally", "catastrophically".                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.3 Sentence Burstiness & Rhythmic Variance
Prose must fluctuate aggressively in sentence length to mimic human journalistic cadence:
* **Short declarative punch:** 3 to 7 words (*"The judge failed."* / *"Nobody logged the query."*).
* **Medium analytical clause:** 12 to 20 words.
* **Long periodic sentence:** 25 to 40 words with rhythmic subordinate clauses.
* **Rule:** Never write three sentences of identical length consecutively.

### 7.4 5-Step Editorial Pre-Flight Checklist
Before committing any chapter draft:
1. **Scan for comma + "-ing":** Search for `, highlighting`, `, underscoring`, `, ensuring`. Split or rewrite into active verbs.
2. **Audit Banned Words:** Verify zero occurrences of *testament*, *pivotal*, *crucial*, *landscape*, *delve*, *beacon*.
3. **Check Sentence Burstiness:** Confirm paragraph sentence lengths swing between short punches and long clauses.
4. **Verify Grounding Specifics:** Confirm every section includes real numbers, company names, or technical parameters.
5. **Tone Check:** Read aloud. If it sounds like a breathless venture capitalist or vendor press release, strip the adjectives.

---

## 8. Automated Verification Engine (`scripts/check.mjs`)

The project content linter runs offline via `npm run check` (or `node scripts/check.mjs`). Downstream implementers must achieve **0 errors**.

### 8.1 Linter Validation Rules Matrix

| Component | Rule Checked | Failure Severity | Linter Error / Warning Message | Fix / Compliance Action |
|:---|:---|:---:|:---|:---|
| **TOC** | Duplicate chapter IDs | **Error** | `toc: duplicate chapter id "<id>"` | Ensure all chapter IDs in `toc.yml` are unique. |
| **TOC** | Unknown track identifier | **Error** | `toc: chapter "<id>" has unknown track "<track>"` | Track must match an `id` declared in `book.yml:tracks`. |
| **TOC** | Orphan chapter file | Warning | `chapters/<file>.md is not in toc.yml, so it is not built` | Add chapter entry into `content/toc.yml`. |
| **Sources** | Missing mandatory keys | **Error** | `source <id>: missing "<key>"` | Ensure entry has `['type', 'title', 'creator', 'publisher', 'year', 'url', 'tier', 'why']`. |
| **Sources** | Invalid tier declaration | **Error** | `source <id>: tier must be A, B or C` | Set tier to uppercase `A`, `B`, or `C`. |
| **Sources** | Domain tier mismatch | **Error** | `source <id>: declared tier A, but <host> is tier B/C` | Declared tier cannot exceed domain tier in `source-policy.yml`. |
| **Sources** | Unregistered domain | Warning | `source <id>: <host> is not in source-policy.yml, needs review` | Add domain to `content/source-policy.yml` under appropriate tier. |
| **Sources** | Unverified status | Warning | `source <id>: not verified yet (...)` | Open URL, verify metadata, set `verified: true`. |
| **Sources** | Uncited source | Warning | `source <id>: in the registry but cited nowhere` | Cite source via `[@id]` or `{{watch/read id}}` in chapters. |
| **Chapter** | Unknown cited source | **Error** | `<ch-id>: unknown source "<id>"` | Register source in `content/sources.yml`. |
| **Chapter** | Unknown glossary term | **Error** | `<ch-id>: unknown glossary term "<term>"` | Register term in `content/glossary.yml`. |
| **Chapter** | Escaped HTML leak | **Error** | `<ch-id>: contains escaped HTML tag leak (&lt;span...&gt;)` | Remove KaTeX math/HTML from container headers (`::: principle`, etc.). |
| **Chapter** | Missing frontmatter key | Warning | `<ch-id>: front matter missing "<key>"` | Add missing field (`title`, `deck`, `hook`, or `objectives`). |
| **Chapter** | Missing recap block | Warning | `<ch-id>: no night-before recap` | Include `::: recap The night-before page` (5 lines). |
| **Chapter** | Missing check block | Warning | `<ch-id>: no Check yourself block` | Include `::: check Check yourself` container. |
| **Chapter** | Missing answers block | Warning | `<ch-id>: Check yourself has no answers block` | Add `::: answers` immediately after `::: check`. |
| **Chapter** | Missing highlights | Warning | `<ch-id>: no highlighted skim lines` | Add 4 to 8 highlights (`==...==`). |
| **Chapter** | Sample flag enabled | Warning | `<ch-id>: marked sample: true` | Omit `sample: true` from production chapters. |
| **Links** | Broken external URL | **Error** | `link <id>: HTTP <status> <url>` | Run `npm run check:links` to verify all live HTTP URLs return `< 400`. |

---

## 9. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Frontmatter | `gray-matter` Parser | Parses YAML frontmatter headers from Markdown files. | `content/chapters/<id>.md` | Object `{ data, content }` | Crashes build if YAML has syntax error. | `scripts/lib/render.mjs:67` |
| 2 | Frontmatter | Mandatory Keys Check | Validates presence of `title`, `deck`, `hook`, `objectives`. | Chapter metadata object | Terminal warnings | Logs `front matter missing "<k>"`. | `scripts/check.mjs:55` |
| 3 | Frontmatter | Bloom Verb Formatting | Chapter objectives starting with bold Bloom verbs (`**Define** ...`). | Frontmatter `objectives` array | HTML `<li><span><b>Verb</b> ...</span></li>` | Rendered without error, checked in authoring review. | `scripts/lib/render.mjs:247` |
| 4 | Opener | Track Lens Chips | Renders track pills styled with CSS custom properties `--chip: var(--t-<track>)`. | Frontmatter `tracks` array | Colored chip spans in opener metadata | Unregistered track omits chip. | `scripts/lib/render.mjs:243` |
| 5 | Opener | Drop-Cap Lede | First paragraph after frontmatter automatically designated as drop-cap lede. | Initial `<p>` tag | `<p class="lede">` | None; regex transforms first `<p>`. | `scripts/lib/render.mjs:240` |
| 6 | Container | `::: principle` | Numbered list first-principles derivation; conclusion line marked by ∴. | Numbered list markdown | Aside block `.blk-principle` | Automated stripping of manual `∴` to prevent duplicate symbol. | `scripts/lib/render.mjs:81,154` |
| 7 | Container | `::: concept` | Concept definition card with auto-numbering (`Concept X.Y`). | Plain words, Analogy, Misconception headers | Aside block `.blk-concept` with index | None. | `scripts/lib/render.mjs:88` |
| 8 | Container | `::: case` | Sourced or illustrative business dilemma with 3 `####` sections. | `#### The situation`, `#### The decision`, `#### Your move` | Aside block `.blk-case` | None. | `docs/AUTHORING.md:45` |
| 9 | Container | `::: lens <track>` | Contextualization block for specific placement track. | Track ID string | Aside block `.blk-lens` with `--lens` style | Defaults to strategy styling if track unknown. | `scripts/lib/render.mjs:101` |
| 10 | Container | `::: interview` | Simulation of placement interview round with structured response. | `**Q.**`, `> "..."`, `**What they are testing.**`, `**A strong structure.**` | Aside block `.blk-interview` | None. | `docs/AUTHORING.md:47` |
| 11 | Container | `::: myth` | Refutation block opposing industry misconception with reality. | `**Myth.**`, `**Reality.**` | Aside block `.blk-myth` | None. | `docs/AUTHORING.md:48` |
| 12 | Container | `::: pull` | Standout pull quote with author attribution (max 1/chapter). | Quote text and author attribution paragraph | Aside block `.blk-pull` | None. | `scripts/lib/render.mjs:95` |
| 13 | Container | `::: try` | Zero-setup active reader experiment prompt. | Explanatory text and fenced prompt block | Aside block `.blk-try` | None. | `docs/AUTHORING.md:51` |
| 14 | Container | `::: stat <val>` | Large display callout metric with lining-nums typography. | Number/metric on container line + body + citation span | Aside block `.blk-stat` | None. | `scripts/lib/render.mjs:106` |
| 15 | Container | `::: check` | Retrieval practice questions tagged with Bloom cognitive levels. | Numbered questions ending with `<span class="lvl">...</span>` | Aside block `.blk-check` | Linter warns if missing or if no matching answers. | `scripts/check.mjs:57` |
| 16 | Container | `::: answers` | Retrieval practice answers printed upside down. | Numbered answers matching check questions | `<details class="answers"><div class="flip">` | Upside-down display via CSS `rotate(180deg)`. | `scripts/lib/render.mjs:113` |
| 17 | Container | `::: recap` | Exactly 5 numbered lines for night-before revision. | 5 numbered points | Aside block `.blk-recap` on standalone page | Linter warns if missing. | `scripts/check.mjs:56` |
| 18 | Formatting | Highlights (`==...==`) | Yellow highlighter mark forming the primary skim reading layer. | `==text==` | `<mark>text</mark>` | Linter warns if chapter contains no highlights. | `scripts/lib/render.mjs:79` |
| 19 | Formatting | Inline Math (`$...$`) | KaTeX inline math rendering with currency guard. | `$math$` | Inline KaTeX HTML or raw text fallback | Ignores currency patterns (e.g. `$50 billion`). | `scripts/lib/render.mjs:172` |
| 20 | Formatting | Display Math (`$$...$$`)| KaTeX block math rendering. | `$$math$$` | `<div class="formula">...</div>` | Raw math fallback if KaTeX parsing fails. | `scripts/lib/render.mjs:158` |
| 21 | Formatting | GFM Pipe Tables | Standard pipe tables wrapped in responsive scroll container. | `\| col \| col \|` markdown | `<div class="table-wrap"><table>...</table></div>` | None. | `scripts/lib/render.mjs:121` |
| 22 | Citation | Media Card Tag | Curated external media card with dynamic SVG QR code. | `{{watch id}}`, `{{read id}}`, `{{paper id}}`, `{{listen id}}` | `<figure class="media media-<kind>">...` | Throws linter error if `<id>` not in `sources.yml`. | `scripts/lib/render.mjs:185` |
| 23 | Citation | Inline Citation | Short author-year citation linked to external URL and bibliography. | `[@source-id]` | `<a class="cite" href="...">Author et al., Year</a>` | Throws linter error if `<source-id>` not in `sources.yml`. | `scripts/lib/render.mjs:197` |
| 24 | Notation | Sidenote Rail | Footnote/margin note displayed in wide margin rail or inline on mobile. | `^[note text]` | `<sup class="sn-ref">N</sup><span class="sn">...</span>` | Sidenote counters reset per chapter. | `scripts/lib/render.mjs:192` |
| 25 | Notation | Glossary Term | First use puts term in margin rail; repeats link to back-of-book glossary. | `[[term]]` or `[[term\|display]]` | `<dfn class="term">...` (1st) or `<a class="term">...` (repeat) | Throws linter error if `<term>` not in `glossary.yml`. | `scripts/lib/render.mjs:205` |
| 26 | Visual | SVG Figure | Thematic inline vector graphic. | `{{figure id \| Caption \| Source}}` | `<figure class="fig">...<figcaption>...</figure>` | Displays `missing figure: <id>` if SVG absent. | `scripts/lib/render.mjs:140` |
| 27 | Visual | Wide SVG Figure | Figure spanning across main prose into margin rail. | `{{figure-wide id \| Caption \| Source}}` | `<figure class="fig wide">...` | Displays missing figure text if SVG absent. | `scripts/lib/render.mjs:140` |
| 28 | Heading | Automated H2 Numbering | Main section headers prefixed with chapter number and section symbol. | `## Section Title` | `<h2><span class="sec-n">§ XX.Y</span>Section Title</h2>` | Automatically tracks incremental section counter. | `scripts/lib/render.mjs:235` |
| 29 | Validation | Escaped HTML Leak Check | Detects whether math or container headers leaked escaped HTML entities. | Rendered chapter HTML | Terminal build error | Fails build if `&lt;span...&gt;` detected in prose. | `scripts/check.mjs:51` |
| 30 | Validation | Source Policy Ranking | Enforces domain authority rules against `content/source-policy.yml`. | Source URL and declared tier | Terminal build error | Fails build if declared tier exceeds domain ceiling. | `scripts/check.mjs:38` |

---

## 10. Edge Cases & Observed Behaviors

| # | Feature | Input / Edge Condition | Observed Engine / Linter Behavior | Rule for Downstream Authors |
|---|---------|------------------------|-----------------------------------|-----------------------------|
| 1 | KaTeX in Block Headers | `::: principle Evaluation of $f(x)$` | KaTeX executes during preprocessing; container engine then escapes generated HTML into `&lt;span class="katex"...&gt;`. | **STRICTLY PROHIBITED:** Never place `$math$` or HTML inside container title arguments. Place math in the body of the block. |
| 2 | Currency vs Inline Math | `$50 billion in compute` or `$20.00 per hour` | RegEx guard `(?<![\s\\])\$(?=[\s,.;:!?)\]]|$)` skips currency phrases containing keywords (`billion`, `million`, `k`, `trillion`, `percent`, `%`). | Plain currency text remains uncorrupted. For single variables like `$x$`, ensure no spaces follow/precede delimiters. |
| 3 | Principle Conclusion Symbol | `5. ∴ Final conclusion.` | `render.mjs` strips leading `∴` via `replace(/(:::\s*principle[\s\S]*?)(^\s*\d+\.\s*)∴\s*/gm, '$1$2')`. CSS `.blk-principle ol > li:last-child::before` inserts the symbol. | Authors may write `5. ∴ Conclusion` or `5. Conclusion`; the engine standardizes both without double symbols. |
| 4 | Glossary Term First vs Repeat | `[[latency-budget]]` used 3 times in one chapter | First instance renders `<dfn class="term">latency budget</dfn><span class="sn"><span class="sn-term">Latency budget</span>...</span>` in margin rail. 2nd and 3rd instances render `<a class="term" href="#g-latency-budget">latency budget</a>`. | Always introduce new terms early in the chapter so their definitions appear near the start of the margin rail. |
| 5 | Media Card Source Validation | `{{paper unknown-eval-paper}}` | `sources[id]` returns undefined. `state.problems.push('unknown source ...')` executes. `renderChapter` surfaces problem to `check.mjs`. | `npm run check` terminates with exit code 1. All sources must be appended to `content/sources.yml` first. |
| 6 | Uncited Registry Sources | New source added to `sources.yml` but not referenced in any chapter file. | `check.mjs` identifies source missing from `cited` set and logs warning `source <id>: in the registry but cited nowhere`. | Every source added to `sources.yml` must be cited in at least one chapter via `{{media ...}}` or `[@id]`. |
| 7 | Source Tier vs Platform Domain | Source declared as `tier: A`, but URL points to `youtube.com` or `substack.com`. | Domain tier is `C`. `check.mjs` logs warning: `platform domain, tier A rests on the creator (<creator>). Confirm they are an originator.` | Ensure `creator` explicitly identifies a primary inventor/originator (e.g. Andrej Karpathy, Grant Sanderson). |
| 8 | New Domain in Sources | Adding a source from `svpg.com` (Silicon Valley Product Group / Marty Cagan). | `svpg.com` is not in `content/source-policy.yml`. `check.mjs` flags warning: `source <id>: svpg.com is not in source-policy.yml, needs review`. | Downstream agents must append `svpg.com` to `content/source-policy.yml` under Tier B. |
| 9 | Check Questions without Answers | `::: check` block provided, but `::: answers` omitted or misspelled. | `check.mjs` regex check fails: `if (/::: check/.test(c.body) && !/::: answers/.test(c.body))`. | Logs warning: `<ch-id>: Check yourself has no answers block`. Always provide both paired blocks. |
| 10 | Non-Standard Stat Block | `::: stat` without a number on the tag line, or 2 stat blocks in one chapter. | If no number on tag line, `<p class="stat-n">` renders empty. Multiple stat blocks clutter the skim layout. | Strictly place the stat value on the container line (e.g. `::: stat 84%`), and include exactly one stat block per chapter. |
| 11 | Table Mobile Overflow | Wide Markdown table with 6 columns. | `render.mjs` automatically injects `<div class="table-wrap">`. CSS applies `overflow-x: auto; -webkit-overflow-scrolling: touch;`. | Desktop print retains full spread; mobile web provides smooth independent touch scrolling without breaking page width. |
| 12 | Sample Flag on Production Draft | `sample: true` retained from `what-is-a-model.md` template. | `check.mjs` logs warning: `<ch-id>: marked sample: true (design sample, replace before release)`. | Omit `sample: true` from all production chapters in Part V. |

---

## 11. Authoring Guidelines for the v3 Product Management Track

For the upcoming authoring of Part V (Product Management Track), downstream writers must adhere to the following topic assignments and pedagogical allocations:

### Chapter 1: `ai-product-lifecycle.md`
* **Slug:** `ai-product-lifecycle`
* **Track:** `product` (Lenses: `product`, `consulting`, `operations`)
* **Core Topics:** Evals as the new PRD, golden test suites, bootstrapping from failure logs, LLM-as-a-judge pipelines, position and verbosity bias calibration, inter-rater reliability (Cohen's Kappa), offline-to-online eval harnesses, and managing data vs concept drift.
* **Stat Block:** Agreement rate between calibrated LLM judges and human product leads (e.g. 84% on bounded rubrics).
* **Worked Case:** Quick-commerce or fintech autonomous support agent dispute resolution system with high initial false refund rates.

### Chapter 2: `product-architecture-economics.md`
* **Slug:** `product-architecture-economics`
* **Track:** `product` (Lenses: `product`, `finance`, `strategy`)
* **Core Topics:** Latency budgets (TTFT vs total latency, streaming vs batched), context caching economics (ephemeral vs cached token pricing across Anthropic and Gemini), tiered model routing (small edge models vs cloud frontier models), and strategic build vs buy decision matrices.
* **Stat Block:** Unit economics comparison showing 75–85% compute cost reduction achieved through context caching and tiered model routing.
* **Worked Case:** Conversational enterprise search and document retrieval system for an Indian NBFC or SaaS unicorn.

### Chapter 3: `agentic-ux-and-interfaces.md`
* **Slug:** `agentic-ux-and-interfaces`
* **Track:** `product` (Lenses: `product`, `marketing`, `operations`)
* **Core Topics:** Beyond the chatbot box, Ambient UI and proactive HUDs, conversational interfaces vs interactive canvas workspaces, reversible actions and non-destructive workflows, human-in-the-loop escalation triggers, and error recovery architectures.
* **Stat Block:** Task completion speed and user error rate reduction in canvas/HUD interfaces vs raw conversational threads.
* **Worked Case:** Enterprise B2B product workflow (e.g. AI-assisted procurement, loan underwriting workbench, or catalog management).

### Chapter 4: `product-casebook.md`
* **Slug:** `product-casebook`
* **Track:** `product`
* **Core Structure:** Modelled directly after `marketing-casebook.md`. Contains:
  - 4 End-to-end strategic PM cases (e.g., automated refund arbitration, model migration cost-benefit analysis, agentic customer workflow, search latency-budget optimization).
  - 4 Quantitative estimation problems / guesstimates (e.g., token compute costs for a 10M DAU feature, context caching breakeven threshold, human review operations sizing, latency waterfall allocation).
* **Stat Block:** End-to-end annual compute bill comparison between brute-force frontier routing vs optimized tiered routing.
* **Density:** Full-length quantitative compendium chapter.

---

## 12. Verification & Command Sequence

All authoring outputs must be independently validated using the official build and test toolchain:

```powershell
# 1. Verify content integrity, schema conformance, source tiers, and pedagogy completeness
npm run check

# 2. Build web pages, design book, and print HTML
npm run build

# 3. Generate high-resolution PDF with Paged.js and Chromium
npm run pdf

# 4. Verify chapter reading times, word counts, and media counts
npm run status
```

**Zero errors** on `npm run check` is a non-negotiable gateway before code commit.
