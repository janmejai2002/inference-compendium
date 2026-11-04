# DISPATCH: Milestone 3 Worker (Advanced PM Chapters & Casebook)

- Identity: teamwork_worker
- Working Directory: C:\Users\Janmejai\compendium\.agents\teamwork\worker_m3\
- Authoritative User Request: C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md (MANDATORY: read this first!)
- Scope Document: C:\Users\Janmejai\compendium\.agents\teamwork\orchestrator_1\PROJECT.md
- Specification Checklist: C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_m3\spec_checklist.md
- Blueprint for Ch 20 & Fig 20.1: C:\Users\Janmejai\compendium\.agents\teamwork\explorer_m3_1\drafting_blueprint.md
- Blueprint for Ch 21 & Fig 21.1: C:\Users\Janmejai\compendium\.agents\teamwork\explorer_m3_2\drafting_blueprint.md
- Anti-AI Writing Guide: C:\Users\Janmejai\.gemini\config\skills\anti-ai-writing\SKILL.md

## MANDATORY INTEGRITY WARNING
> DO NOT CHEAT. All implementations must be genuine. DO NOT
> hardcode test results, create dummy/facade implementations, or
> circumvent the intended task. A teamwork_auditor will independently
> verify your work. Integrity violations WILL be detected and your
> work WILL be rejected.

## Exclusive Write Ownership
You own and may create/modify ONLY these 4 files:
- `content/chapters/agentic-ux-and-interfaces.md` (Chapter 20)
- `content/chapters/product-casebook.md` (Chapter 21)
- `content/figures/agentic-ux-and-interfaces.svg` (Figure 20.1)
- `content/figures/product-casebook.svg` (Figure 21.1)
Do NOT modify any other files.

## Detailed Requirements

### 1. Chapter 20: `content/chapters/agentic-ux-and-interfaces.md`
- Source Blueprint: `explorer_m3_1/drafting_blueprint.md`.
- Frontmatter:
  ```yaml
  ---
  id: agentic-ux-and-interfaces
  title: "Agentic UX: from chat to ambient canvases"
  deck: "Why the chatbot is the command line of machine learning, and how to design mixed-initiative spatial interfaces, proactive ambient HUDs, and fault-tolerant human-in-the-loop workflows."
  level: intermediate
  tracks: [product, design]
  prereq: [product-architecture-economics]
  hook: "OpenAI shipped ChatGPT in November 2022 and unwittingly trapped the software industry inside a conversational cul-de-sac."
  objectives:
    - "**Deconstruct** the cognitive and spatial limitations of pure conversational interfaces using Norman's Gulf of Execution."
    - "**Architect** multi-modal hybrid interfaces that fuse proactive ambient heads-up displays with direct-manipulation spatial canvases."
    - "**Formulate** mathematical confidence thresholds for human-in-the-loop escalation routing under asymmetric cost matrices."
    - "**Derive** user cognitive wait-time budgets across synchronous streaming, background workers, and proactive agent interrupts."
  ---
  ```
- **Mandatory Registry References**:
  - MUST cite `anthropic-prompt-engineering-interactive` (using `[@anthropic-prompt-engineering-interactive]`) to satisfy test `T3.1`!
  - MUST link `[[agentic-ux]]` to satisfy test `T3.2`!
- **Pedagogical Invariants**:
  - Full 13-stage arc from `docs/PEDAGOGY.md`.
  - Lede paragraph ends with the core thesis highlight (`==...==`).
  - Highlights: strictly 4 to 8 inclusive.
  - Stat block: exactly 1 (`::: stat 12% vs 78%`) with plain lining numbers.
  - Media cards: 1 to 3 (`card-moran-newell-psychology-hci`, `cagan-transformed-ai`, `cagan-svpg-ai-risk`).
  - Retrieval practice: 4 to 6 check questions with `<span class="lvl">...</span>` and inverted answers (`.flip`).
  - Recap: strictly 5 numbered lines under `::: recap The night-before page`.
  - Zero math or HTML in container titles (`::: principle`, `::: case`, `::: stat`, etc.).
  - Discrete single-bracket citations (`[@foo] [@bar]`), zero semicolons in brackets!
  - Strict compliance with `anti-ai-writing/SKILL.md`.

### 2. Chapter 21: `content/chapters/product-casebook.md`
- Source Blueprint: `explorer_m3_2/drafting_blueprint.md`.
- Frontmatter:
  ```yaml
  ---
  id: product-casebook
  title: "The AI PM casebook: 8 quantitative cases"
  deck: "Eight fully-worked quantitative problem sets and estimation cases covering unit economics, latency budgeting, evaluation sizing, synthetic data frontiers, and human-in-the-loop triage."
  level: advanced
  tracks: [product, consulting]
  prereq: [agentic-ux-and-interfaces]
  hook: "Management consultants solve market-entry cases with linear equations; AI product leaders solve production bottlenecks with probabilistic cost matrices."
  objectives:
    - "**Model** the unit economics and fraud trade-offs of autonomous customer dispute systems under asymmetric loss functions."
    - "**Calculate** sample sizes and statistical power for enterprise evaluation harnesses using two-proportion z-tests."
    - "**Calibrate** Bayes-optimal escalation thresholds for human-in-the-loop routing across multi-tier operational workflows."
    - "**Compute** the total cost of ownership crossover volume between commercial API cascades and self-hosted open-source clusters."
  ---
  ```
- **Mandatory 8 Quantitative Cases**:
  - Case 1: Quick-Commerce Automated Refunds & Fraud Trade-Off (Swiggy/Zepto/Blinkit)
  - Case 2: Three-Tier Cascade Routing Economic Optimization (FinTech Super-App)
  - Case 3: Enterprise LegalTech Prompt Caching vs. Chunked Vector RAG
  - Case 4: Human-in-the-Loop Escalation Routing & Blast Radius Calibration
  - Estimation 1: Multi-Agent Customer Support Latency Budgeting (Card-Moran-Newell)
  - Estimation 2: Enterprise LLM Evaluation Harness ROI and Sample Sizing (Wilson score interval)
  - Estimation 3: Synthetic Test Data Generation vs Human Annotation Frontier
  - Estimation 4: Self-Hosted GPU Cluster vs Commercial Frontier API TCO Crossover Volume ($V^*$)
- **Case Container Invariant**:
  - To pass test `T1.9`, cases MUST be wrapped in `::: case <Title>` containers (at least 4, and for all cases).
- **Pedagogical Invariants**:
  - Full 13-stage arc from `docs/PEDAGOGY.md`.
  - Lede ends with core thesis highlight (`==...==`).
  - Highlights: strictly 4 to 8 inclusive.
  - Stat block: exactly 1 (`::: stat 14.3x`) with plain lining numbers.
  - Media cards: 1 to 3.
  - Retrieval practice: 4 to 6 check questions with `<span class="lvl">...</span>` and inverted answers (`.flip`).
  - Recap: strictly 5 numbered lines under `::: recap The night-before page`.
  - Zero math or HTML in container titles!
  - Discrete single-bracket citations (`[@foo] [@bar]`), zero semicolons in brackets!
  - Strict compliance with `anti-ai-writing/SKILL.md`.

### 3. Figure 20.1: `content/figures/agentic-ux-and-interfaces.svg`
- Standalone vector diagram (`viewBox="0 0 640 330"`).
- XML well-formed, semantic CSS classes (`paper`, `acc-s`, `wash`, `t-display`, `rule-s`).
- Depict the 2-dimensional Autonomy vs Interactivity quadrant (Chatbox vs Copilot vs Autonomous Agent vs Ambient Canvas) and human-in-the-loop escalation circuit breaker.
- Downward process arrowheads aligned with visual hierarchy.

### 4. Figure 21.1: `content/figures/product-casebook.svg`
- Standalone vector diagram (`viewBox="0 0 640 330"`).
- XML well-formed, semantic CSS classes (`paper`, `acc-s`, `wash`, `t-display`, `rule-s`).
- Depict the PM Decision Matrix / Trade-off Frontier (Latency vs Cost vs Accuracy vs Autonomous Agency across the 8 case archetypes).
- Downward process arrowheads aligned with visual hierarchy.

## Verification Commands to Run
1. `npm run check` (MUST pass with 0 errors).
2. `node test/e2e-pm.mjs --milestone=M3 --progressive` (MUST pass 100% of Milestone 3 tests, including T1.8, T1.9, T1.10, and Tier 2/3 tests).
3. `npm run build` (MUST compile all 24/24 chapters cleanly into `dist/`).
4. Verify SVG XML well-formedness with Python `xml.etree.ElementTree`.
5. Check rendered HTML to confirm 0 unparsed bracket citations (`[@...`) and 0 escaped HTML tags (`&lt;span...&gt;`).

Deliver `handoff.md` to `C:\Users\Janmejai\compendium\.agents\teamwork\worker_m3\handoff.md`.


## 2026-11-04T00:00:45Z
You are the Implementation Worker for Milestone 3 (`worker_m3`).
Your identity is teamwork_worker.
Your working directory is C:\Users\Janmejai\compendium\.agents\teamwork\worker_m3\
You MUST read the authoritative user request at C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md first.
Then read your instructions at C:\Users\Janmejai\compendium\.agents\teamwork\worker_m3\DISPATCH.md.
Also read:
- Specification checklist: C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_m3\spec_checklist.md
- Blueprint for Ch 20 & Fig 20.1: C:\Users\Janmejai\compendium\.agents\teamwork\explorer_m3_1\drafting_blueprint.md
- Blueprint for Ch 21 & Fig 21.1: C:\Users\Janmejai\compendium\.agents\teamwork\explorer_m3_2\drafting_blueprint.md
- Anti-ai-writing guide: C:\Users\Janmejai\.gemini\config\skills\anti-ai-writing\SKILL.md
