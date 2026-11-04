# Implementation Strategy & Action Plan: Milestone 1 (Registries & Configuration)

**Milestone**: Milestone 1 (Registries & Configuration)  
**Target Tracks**: `product` (PM)  
**Author**: Milestone 1 Explorer (`teamwork_explorer`)  
**Target Worker**: Milestone 1 Worker (`teamwork_worker`)  
**Date**: 2026-11-03  

---

## 1. Executive Summary

Milestone 1 establishes the canonical registries, domain policies, glossary definitions, table of contents structure, and book-level metadata for **Part V: Product Management (PM)** in *INFERENCE*. 

This plan provides the exact, copy-paste ready YAML blocks and surgical edit specifications for 5 target files:
1. `content/sources.yml`: Append 8 canonical PM primary sources.
2. `content/source-policy.yml`: Allowlist `svpg.com` under Tier B (and `taylorfrancis.com` under Tier A).
3. `content/glossary.yml`: Append 6 core PM technical terms.
4. `content/toc.yml`: Insert Part V: Product Management (`id: p5`, `n: V`, `track: product`) with 4 chapters, shifting Inserts to Part VI (`id: p6`, `n: VI`).
5. `book.yml`: Update book edition string to `"2027 · Draft 0.3 (Product Track)"`.

All specifications have been verified against the project content linter (`scripts/check.mjs`) and render pipeline (`scripts/lib/render.mjs`).

---

## 2. Surgical Change 1: `content/sources.yml`

### File Location & Context
- **Target File**: `C:\Users\Janmejai\compendium\content\sources.yml`
- **Current Length**: 1,613 lines
- **Action**: Append the 8 canonical PM sources directly to the end of the file.

### Schema Requirements (from `scripts/check.mjs`)
Every entry requires:
- `type`: `paper | article | report | video | book | podcast`
- `title`: String
- `creator`: String
- `publisher`: String
- `year`: Integer
- `url`: Valid URL string
- `tier`: `A | B | C`
- `why`: String explanation
- `verified`: `false` (standard for newly registered draft sources)

### Exact Content to Append

```yaml
openai-evals-framework:
  type: article
  title: "OpenAI Evals: A Framework for Evaluating LLMs and LLM Systems"
  creator: "OpenAI"
  publisher: "OpenAI Open Source & Developer Platform"
  year: 2024
  url: https://github.com/openai/evals
  tier: A
  why: "The foundational open-source evaluation harness establishing automated benchmarking, deterministic unit assertions, and model-graded evaluation protocols."
  verified: false

anthropic-context-caching:
  type: article
  title: "Prompt Caching with Claude: Architecture, Latency Budgets, and Economics"
  creator: "Anthropic"
  publisher: "Anthropic Engineering & Developer Docs"
  year: 2024
  url: https://www.anthropic.com/news/prompt-caching
  tier: A
  why: "The technical standard defining key-value (KV) context cache persistence, demonstrating up to 90% input cost reductions and 85% latency improvements for long prompts."
  verified: false

anthropic-prompt-engineering-interactive:
  type: article
  title: "Anthropic Interactive Prompt Engineering Tutorial and Best Practices"
  creator: "Anthropic"
  publisher: "Anthropic Documentation"
  year: 2025
  url: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
  tier: A
  why: "Defines systematic prompt iteration as product engineering: XML tagging, chain-of-thought conditioning, few-shot distribution matching, and guardrail specification."
  verified: false

google-gemini-long-context:
  type: paper
  title: "Gemini 1.5: Unlocking Multimodal Understanding Across Millions of Tokens of Context"
  creator: "Mnasri, Reid, Savinov, et al. (Gemini Team)"
  publisher: "Google DeepMind (arXiv:2403.05530)"
  year: 2024
  url: https://arxiv.org/abs/2403.05530
  tier: A
  why: "The seminal long-context architecture paper demonstrating near-perfect (>99%) Needle In A Haystack retrieval across 1M+ tokens, shifting product architectures from chunked RAG to full-context caching."
  verified: false

cagan-transformed-ai:
  type: book
  title: "Transformed: Moving to the Product Operating Model"
  creator: "Marty Cagan and Silicon Valley Product Group (SVPG)"
  publisher: "Wiley"
  year: 2024
  url: https://www.svpg.com/books/transformed-moving-to-the-product-operating-model/
  tier: B
  why: "The definitive authority on modern product operating models, adapting the four core product risks (value, usability, feasibility, viability) to non-deterministic, AI-driven technologies."
  verified: false

cagan-svpg-ai-risk:
  type: article
  title: "AI and the Four Product Risks: Managing Non-Deterministic Feasibility and Value"
  creator: "Marty Cagan"
  publisher: "Silicon Valley Product Group (SVPG Insights)"
  year: 2024
  url: https://www.svpg.com/ai-and-product-management/
  tier: B
  why: "Analyzes why classical product requirement documents fail for stochastic systems, requiring product discovery through rapid prototype evaluation and statistical guardrails."
  verified: false

zheng-judging-llm-as-judge:
  type: paper
  title: "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"
  creator: "Lianmin Zheng, Wei-Lin Chiang, Hao Zhang, et al."
  publisher: "NeurIPS 2023 (arXiv:2306.05685)"
  year: 2023
  url: https://arxiv.org/abs/2306.05685
  tier: A
  why: "The originating empirical paper establishing LLM-as-a-judge methodologies, quantifying position bias, verbosity bias, and self-enhancement bias, and proposing calibration protocols."
  verified: false

card-moran-newell-psychology-hci:
  type: book
  title: "The Psychology of Human-Computer Interaction"
  creator: "Stuart K. Card, Thomas P. Moran, Allen Newell"
  publisher: "CRC Press / Lawrence Erlbaum Associates"
  year: 1983
  url: https://www.taylorfrancis.com/books/mono/10.1201/9780203736067/psychology-human-computer-interaction-stuart-card-thomas-moran-allen-newell
  tier: A
  why: "The foundational cognitive science text establishing human latency perception thresholds (0.1s instant, 1.0s thought flow, 10s task boundary) that govern modern AI latency budgets."
  verified: false
```

---

## 3. Surgical Change 2: `content/source-policy.yml`

### File Location & Context
- **Target File**: `C:\Users\Janmejai\compendium\content\source-policy.yml`
- **Action**: Add `svpg.com` to Tier B (established editorial and analysis) and `taylorfrancis.com` to Tier A (primary sources / academic publisher).

### Exact Edit Instructions
In `content/source-policy.yml`:

1. **Under `A:`** (around line 46):
```yaml
Target:
  - karpathy.ai

Replacement:
  - karpathy.ai
  - taylorfrancis.com
```

2. **Under `B:`** (around line 71):
```yaml
Target:
  - knowledge.wharton.upenn.edu

Replacement:
  - knowledge.wharton.upenn.edu
  - svpg.com
```

### Rationale
- `svpg.com` is Marty Cagan's Silicon Valley Product Group domain for his articles and book reference. Placing it under Tier B aligns with `cagan-transformed-ai` and `cagan-svpg-ai-risk` being declared Tier B, preventing any linter error (`RANK[s.tier] < RANK[dt]`).
- `taylorfrancis.com` is the official academic publisher (CRC Press / Taylor & Francis) for Card, Moran & Newell (1983). Placing it under Tier A prevents `scripts/check.mjs` from issuing a missing-domain warning.

---

## 4. Surgical Change 3: `content/glossary.yml`

### File Location & Context
- **Target File**: `C:\Users\Janmejai\compendium\content\glossary.yml`
- **Current Length**: 207 lines
- **Action**: Append the 6 core PM glossary terms directly to the end of the file.

### Exact Content to Append

```yaml
eval-harness:
  term: Evaluation harness (Eval harness)
  def: An automated test execution environment that runs a benchmark dataset through a model or agent pipeline, records system outputs, applies deterministic assertions or model-graded scoring, and outputs aggregate accuracy, latency, and cost metrics.

synthetic-evals:
  term: Synthetic evaluations
  def: Benchmark test suites, edge scenarios, and evaluation datasets programmatically generated by foundation models using parameter perturbation, adversary prompting, or rubric conditionings rather than manually curated by human annotators.

latency-budget:
  term: Latency budget
  def: The maximum allowable elapsed time allocated across each modular hop of an AI system (speech recognition, intent routing, context retrieval, prefill TTFT, token generation, and frontend rendering) to guarantee an interactive user experience SLA.

context-caching:
  term: Context caching
  def: An inference optimization where the precomputed key-value (KV) attention states of a static prompt prefix (documents, system prompts, few-shot examples) are preserved in GPU memory, drastically lowering time-to-first-token latency and input token pricing on subsequent API calls.

model-routing:
  term: Model routing
  def: An architectural mechanism that dynamically directs incoming queries to the most cost-effective and latency-efficient model (such as a local SLM, a code-specialized model, or a frontier reasoning model) based on estimated query complexity, intent classification, or confidence score thresholds.

agentic-ux:
  term: Agentic UX
  def: User interface design patterns engineered for semi-autonomous, proactive AI systems—moving beyond reactive conversational chat bubbles toward ambient heads-up displays (HUDs), interactive canvas surfaces, and graduated human-in-the-loop control gates.
```

---

## 5. Surgical Change 4: `content/toc.yml`

### File Location & Context
- **Target File**: `C:\Users\Janmejai\compendium\content\toc.yml`
- **Target Lines**: Replace lines 297–302 (the current `p5` block for `Inserts`).

### Target Lines to Replace
```yaml
  - id: p5
    n: V
    title: Inserts
    track: strategy
    deck: Short, dated pages that the web edition replaces every term.
```

### Replacement Content
```yaml
  - id: p5
    n: V
    title: Product Management
    track: product
    deck: Evals as product specs, latency budgets and caching economics, ambient agentic UX, and the PM casebook.
    chapters:
      - id: ai-product-lifecycle
        title: "The AI product lifecycle: evals as specs, test suites, and drift"
        deck: "Why product requirement documents fail for stochastic systems, how golden evaluation suites become living product contracts, LLM-as-a-judge calibration, and managing model drift in production."
        tracks: [product]
        prereq: [judging-output]
        status: draft
      - id: product-architecture-economics
        title: "Product architecture and economics: latency budgets, caching, and routing"
        deck: "The technical trade-offs behind responsive AI products: dissecting TTFT and TPS, prompt caching economics, cascade routing topologies, and the strategic build-versus-buy frontier."
        tracks: [product, strategy]
        prereq: [next-word-machine, who-pays]
        status: draft
      - id: agentic-ux-and-interfaces
        title: "Agentic UX: ambient HUDs, canvas workspaces, and human-in-the-loop"
        deck: "Transcending the chat bubble: proactive agentic assistance, collaborative canvas architectures, cognitive ergonomics, and designing trusted human-in-the-loop control loops."
        tracks: [product]
        prereq: [models-that-act]
        status: draft
      - id: product-casebook
        title: "The Product AI casebook & interview room"
        deck: "Eight fully-worked quantitative PM cases and estimation problems covering context caching ROI, cascade routing economics, eval harness calibration, agentic latency budgets, and build-vs-buy TCO."
        tracks: [product]
        prereq: [ai-product-lifecycle, product-architecture-economics, agentic-ux-and-interfaces]
        status: draft

  - id: p6
    n: VI
    title: Inserts
    track: strategy
    deck: Short, dated pages that the web edition replaces every term.
```

*(Note: The subsequent lines containing `state-of-play` and `india-briefing` remain unchanged under the newly renumbered `p6` block).*

### Chapter Numbering Verification
In `scripts/lib/render.mjs`, chapter numbering is calculated dynamically:
- Chapters with explicit `n:` (like `00` for `ai-in-one-sitting` and `A`/`B` for inserts) retain their letter/number without advancing the numeric counter `n`.
- Chapters without explicit `n:` auto-increment `n`.
- Prior to this insertion:
  - Chapters 01–07: Foundations (`kinds-of-ai` through `judging-output`)
  - Chapters 08–10: AI in Business (`who-pays` through `work-changes`)
  - Chapters 11–13: Consulting (`consulting-firm` through `interview-room`)
  - Chapters 14–17: Marketing (`creative-at-scale` through `marketing-casebook`)
- With Part V inserted:
  - Chapter 18: `ai-product-lifecycle`
  - Chapter 19: `product-architecture-economics`
  - Chapter 20: `agentic-ux-and-interfaces`
  - Chapter 21: `product-casebook`
  - Inserts: `A` (`state-of-play`), `B` (`india-briefing`) under Part VI (`p6`).

---

## 6. Surgical Change 5: `book.yml`

### File Location & Context
- **Target File**: `C:\Users\Janmejai\compendium\book.yml`
- **Target Line**: Line 5

### Exact Edit
```yaml
Target:
edition: 2027 · Draft 0.2 (Marketing Track)

Replacement:
edition: 2027 · Draft 0.3 (Product Track)
```

Note: In `book.yml` line 25, the track definition `- { id: product, name: Product, short: PM }` already exists, so no changes to `tracks:` are needed.

---

## 7. Verification & Linter Protocol

After applying all 5 edits, the Worker must execute:

```powershell
npm run check
```

### Expected Linter Output Analysis
1. **Errors**: `0 errors` (Mandatory).
2. **Warnings**: Expected non-fatal warnings:
   - Warnings for the 8 new sources being unverified (`not verified yet...`).
   - Warnings for the 8 new sources not yet cited in any chapter body (`in the registry but cited nowhere`). These will resolve as Milestone 2 chapters are authored.
   - Platform domain warning for `openai-evals-framework` (`platform domain, tier A rests on the creator (OpenAI). Confirm they are an originator.`).
3. **Clean Exit Code**: `0`.

---

## 8. Summary Checklist for Worker

| Target File | Operation | Verification |
| :--- | :--- | :--- |
| `content/sources.yml` | Append 8 primary sources | Valid YAML, all 8 required fields present |
| `content/source-policy.yml` | Add `svpg.com` (Tier B), `taylorfrancis.com` (Tier A) | Valid YAML, domain tier matches declared tier |
| `content/glossary.yml` | Append 6 PM terms | Valid YAML, `term` & `def` keys |
| `content/toc.yml` | Insert Part V (PM), shift Inserts to Part VI (`p6`) | Valid YAML, unique chapter IDs, valid tracks |
| `book.yml` | Update edition to `2027 · Draft 0.3 (Product Track)` | Valid YAML string |
| **Verification** | Run `npm run check` | Must return `0 errors` |
