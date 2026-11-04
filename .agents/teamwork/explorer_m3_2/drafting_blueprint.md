# Drafting Blueprint: Chapter 21 — The AI Product Casebook & Interview Room (`content/chapters/product-casebook.md`)

**Date**: 2026-11-04  
**Agent**: Explorer 2 (`explorer_m3_2`)  
**Target Chapter Path**: `content/chapters/product-casebook.md`  
**Target Figure Path**: `content/figures/product-casebook.svg`  
**Working Directory**: `C:\Users\Janmejai\compendium\.agents\teamwork\explorer_m3_2\`  

---

## 1. Executive Summary & Architecture Overview

This blueprint specifies the section-by-section prose, mathematical models, operational data, and pedagogical invariants required to author **Chapter 21: The AI Product Casebook & Interview Room** (`content/chapters/product-casebook.md`) and its accompanying vector graphic **Figure 21.1** (`content/figures/product-casebook.svg`).

Chapter 21 serves as the quantitative capstone of **Part V: Product Management** in *INFERENCE*. While Chapters 18–20 establish the theoretical foundations of evaluation specifications, inference economics, and agentic ergonomics, Chapter 21 provides eight fully-worked, interview-grade quantitative cases and estimation problems across Indian and global technology enterprises.

### Pedagogical Invariants & Lint Contracts
The drafting agent must adhere to the following contracts:
1. **13-Stage Pedagogical Arc**: Strictly implements the structure defined in `docs/PEDAGOGY.md`.
2. **Frontmatter Integrity**:
   - `id`: `product-casebook`
   - `title`: `"The AI PM casebook: 8 quantitative cases"`
   - `deck`: `"Eight fully-worked quantitative cases and estimation problems across Indian and global tech, each with complete mathematical derivations, unit economics, and interview-ready model answers."`
   - `level`: `Advanced`
   - `tracks`: `[product, consulting]`
   - `prereq`: `[ai-product-lifecycle, product-architecture-economics, agentic-ux-and-interfaces]`
   - `hook`: An executive-level interview challenge at a leading technology platform.
   - `objectives`: Exactly 4 starting with bold Bloom taxonomy action verbs (**Deconstruct**, **Master**, **Execute**, **Synthesize**).
3. **Skim Highlights (`==...==`)**: Exactly 6 highlights placed across the chapter (within the 4–8 range).
4. **Stat Block (`::: stat <value>`)**: Exactly 1 stat block (`::: stat 82.9% & 14.3x`) with lining numbers and clean bracket citations.
5. **Media Cards (`{{read/paper/watch id}}`)**: Exactly 3 registered media cards (`{{read anthropic-context-caching}}`, `{{read openai-evals-framework}}`, `{{paper google-gemini-long-context}}`).
6. **Retrieval Practice**: Exactly 5 Bloom-graded questions in `::: check Check yourself` ending with `<span class="lvl">...</span>` and matching answers in `::: answers` (`.flip`).
7. **Recap Block**: Exactly 5 numbered lines in `::: recap The night-before page`.
8. **Container Title Hygiene**: ZERO KaTeX math ($math$) or raw HTML (`<span>`) inside container titles (prevents `&lt;span...&gt;` leak failures).
9. **Citation Syntax**: Strictly discrete single citation syntax (`[@source-id]`), ZERO compound citations with semicolons (`[@source1; @source2]`).
10. **Anti-AI Writing Compliance**: Adheres strictly to `anti-ai-writing/SKILL.md` (no generic tropes, high sentence burstiness, concrete human observation, and real operational figures).

---

## 2. Complete Frontmatter Specification

```yaml
---
id: product-casebook
title: "The AI PM casebook: 8 quantitative cases"
deck: "Eight fully-worked quantitative cases and estimation problems across Indian and global tech, each with complete mathematical derivations, unit economics, and interview-ready model answers."
level: Advanced
tracks: [product, consulting]
prereq: [ai-product-lifecycle, product-architecture-economics, agentic-ux-and-interfaces]
hook: "In a final-round VP of Product interview at a leading tech platform, the interviewer presents a live scenario: 'Our enterprise AI platform serves 50 million queries monthly across 12 product lines. Compute costs are growing at 35% month-on-month while gross margins have compressed from 78% to 52%. You have 45 minutes to design a complete architectural and economic turnaround: evaluate model routing, prompt caching, evaluation guardrails, and latency SLAs. Where do you start, and what is your financial recovery model?' How do you structure your answer?"
objectives:
  - "**Deconstruct** complex AI product trade-offs into rigorous, auditable mathematical models linking compute costs directly to gross margin and user retention."
  - "**Master** the four strategic AI product cases: Quick-Commerce automated refund fraud trade-offs, three-tier cascade routing, legal contract KV context caching break-even, and human-in-the-loop escalation calibration."
  - "**Execute** quantitative PM estimation across multi-agent latency budgets, eval suite statistical power, synthetic test data generation frontiers, and self-hosted GPU cluster crossover volume."
  - "**Synthesize** technical engineering constraints with commercial business outcomes, defending product decisions in executive boardrooms and senior PM interview loops."
---
```

---

## 3. Section-by-Section Drafting Architecture

### Stage 1 & 2: Opener & The Lede
- **Opening Prose**: Drop-cap paragraph grounding the chapter in the rigorous reality of modern AI product management interviews at Google, Microsoft, Meta, Amazon, Swiggy, Zepto, Blinkit, and top-tier management consultancies.
- **Narrative Anchor**: Why hand-waving PRDs and superficial "add a chatbot" wireframes fail immediately in executive reviews. Candidates are expected to calculate token economics, evaluate ROC operating thresholds, size evaluation sample confidence intervals, and trace latency budgets.
- **Highlight 1 (Lede Thesis)**:
  `==In artificial intelligence product management, qualitative intuition is an expensive liability; every architectural choice—from routing cascades and context caching to evaluation harnesses and escalation gates—is an empirical optimization problem governed by marginal unit economics, latency physics, and statistical error tolerances.==`
- **Orientation Paragraph**: Explaining the dual structure of the casebook: four strategic operational cases (system-level trade-offs) and four quantitative estimation problems (sizing and mathematical derivations).

---

### Stage 3: From First Principles
- **Block**: `::: principle The quantitative laws of AI product management`
- **Body**: Numbered derivation establishing the 6 foundational premises of AI product economics:
  1. A product case interview evaluates your ability to deconstruct ambiguous trade-offs, formulate explicit mathematical models, and defend actionable decisions under commercial and computational constraints.
  2. Neural models introduce three distinct cost vectors: variable token inference fees, latency penalties that degrade user retention, and downstream error liability costs.
  3. Deterministic specifications cannot bind probabilistic token distributions; quality contracts must be expressed as statistical intervals over automated evaluation suites.
  4. Caching key-value attention states converts quadratic prompt prefill costs into negligible linear read overhead once query arrival velocity exceeds break-even ($Q^*$).
  5. Hierarchical routing cascades exploit the Pareto distribution of query complexity, directing simple tasks to low-cost local models while preserving frontier reasoning budgets for ambiguous queries.
  6. Winning in a quantitative AI product interview requires tracing the complete system chain: from token throughput and ROC operating thresholds to gross margin expansion and defensible enterprise value.
- **End Marker**: The last line carries the conclusion (∴).

---

### Stage 4: Name It (Core Concepts & Glossary Rails)
- **Block**: `::: concept Quantitative AI Case Framework`
  - **Plain words.** A structured interview methodology where a product manager decomposes an ambiguous AI operational dilemma into explicit unit costs, statistical error boundaries, latency physics, and commercial trade-offs.
  - **Analogy.** An aeronautical flight envelope test: an engineer does not evaluate an aircraft by saying it "flies nicely"; they quantify the exact boundaries of airspeed, altitude, wing loading, and stall margins before clearing passengers for takeoff.
  - **Misconception.** *"Product managers only need to understand user journeys, while engineers handle model costs and latency."* In AI systems, inference latency determines user drop-off, token consumption dictates gross margins, and model error distributions define corporate legal liability. An AI PM who cannot calculate these trade-offs cannot design a viable product.
- **Glossary Margin Rails**:
  - `[[eval-harness]]`
  - `[[context-caching]]`
  - `[[model-routing]]`
  - `[[latency-budget]]`
  - `[[synthetic-evals]]`
  - `[[agentic-ux]]`

---

### Stage 5: Scale It / Complicate It & Figure 21.1
- **Section Heading**: `## The eight product case archetypes`
- **Expository Prose**: Framing how AI product management problems divide along two primary axes: Strategic Architectural Cases (macro system design and economic governance) versus Quantitative Estimation Models (micro sizing and statistical derivations).
- **Figure Inclusion**:
  `{{figure product-casebook | The AI product management decision matrix: Four strategic operational cases on the left, and four quantitative estimation models on the right. | Sources: Anthropic (2024); Google DeepMind (2024); OpenAI (2024); SVPG (2024)}}`

---

### Stage 6: Evidence (The Stat Block)
- **Block**:
  ```markdown
  ::: stat 82.9% & 14.3x
  The monthly compute cost reduction achieved by replacing a monolithic frontier API with a three-tier cascade routing engine at 10 million queries, alongside the risk-adjusted cost advantage of long-context prompt caching over chunked vector RAG for enterprise legal contracts.
  <span class="src">Sources: [@anthropic-context-caching] [@google-gemini-long-context]</span>
  :::
  ```

---

## 4. The 4 Strategic Product Cases (Detailed Specifications)

### Case 1: Quick-Commerce Automated Refunds & Fraud Trade-Off (Swiggy / Zepto / Blinkit)
- **Heading**: `### Case 1: Quick-Commerce Automated Refunds & Fraud Trade-Off`
- **Container**: `::: case Quick-Commerce Automated Refunds & Fraud Trade-Off`
- **The Situation**:
  - Platform: Top Indian 10-minute quick-commerce platform delivering 1,500,000 orders daily across 8 metropolitan cities.
  - Refund volume: 3.2% of orders generate customer claims (48,000 refund tickets daily) for missing items, rotten produce, damaged goods, or spillages.
  - Financial baselines: Average Order Value ($AOV$) = ₹480; Average refund claim = ₹220.
  - Existing workflow: 100% human agent review. Human review cost = ₹24 per ticket (4.5 minutes BPO handling time); median customer wait time = 18 minutes.
  - The business problem: Long resolution delays cause customer churn among high-LTV cohorts (Customer Lifetime Value $LTV = ₹18{,}000$; 12% annual churn risk from support friction). However, instant unconditional refunds cause opportunistic customer fraud to explode from 4% to 19% of claims, leaking ₹20.06 lakh daily in fraudulent payouts (₹73.2 crore annually).
- **Clarifying Questions**:
  1. What is the customer churn cost of review delay versus the fraud cost of instant approval?
  2. What multimodal and transactional signals are available at the moment of claim submission?
  3. What are the operational costs of human review versus automated vision-language model (VLM) inspection?
- **The Analytical Core**:
  1. *Multimodal Signal Architecture*:
     - User uploads an image of the damaged produce or missing package label.
     - VLM inference (e.g. specialized 8B multimodal model): extracts product condition, expiry date, seal integrity. Cost = ₹0.40 per call. Latency = 800ms.
     - Feature store joins: Customer order history (past refund frequency, account age, payment method), dark-store packer weight scan diff, delivery partner GPS proximity.
     - Ensemble outputs a calibrated fraud probability score $s \in [0, 1]$.
  2. *The Tri-Tier Decision Boundary*:
     - Tier 1: Auto-Approve ($s < \theta_L$). Instant refund via UPI / wallet in $<3$ seconds.
     - Tier 2: Human Escalation ($\theta_L \le s < \theta_H$). Routed to priority human review queue with highlighted anomaly flags.
     - Tier 3: Auto-Reject / Require In-Store Partner Inspection ($s \ge \theta_H$).
  3. *Cost Optimization Function*:
     $$\text{Total Daily Cost} = N \cdot \left[ C_{\text{infer}} + P(s < \theta_L) \cdot C_{\text{fraud\_leak}} + P(\theta_L \le s < \theta_H) \cdot C_{\text{review}} + P(s \ge \theta_L \mid \text{Honest}) \cdot C_{\text{churn}} \right]$$
     - Parameters: $N = 48{,}000$ daily claims. $C_{\text{infer}} = ₹0.40$. $C_{\text{review}} = ₹24.00$. Average refund value = ₹220. Expected churn impact of falsely rejecting an honest user $C_{\text{churn}} = ₹18{,}000 \times 0.08 = ₹1{,}440$.
  4. *Threshold Calibration via ROC Analysis*:
     - Setting $\theta_L = 0.15$ and $\theta_H = 0.72$:
       - **Auto-Approve ($s < 0.15$)**: Captures 74% of volume (35,520 claims/day). False positive fraud rate $<0.6\%$ (leakage = $35{,}520 \times 0.006 \times ₹220 = ₹46{,}886$/day).
       - **Human Review ($0.15 \le s < 0.72$)**: Captures 21% of volume (10,080 claims/day). BPO review cost = $10{,}080 \times ₹24 = ₹2{,}41{,}920$/day (down from ₹11,52,000 baseline; a 79% reduction in BPO workload!).
       - **Auto-Reject / Physical Verification ($s \ge 0.72$)**: Captures 5% of volume (2,400 claims/day).
  5. *Comparative Financial Summary*:
     - Baseline Human BPO Cost: $48{,}000 \times ₹24 = ₹11{,}52{,}000$/day + delay churn.
     - Tri-Tier Automated Engine Cost:
       $$\text{Cost}_{\text{infer}} = 48{,}000 \times ₹0.40 = ₹19{,}200$$
       $$\text{Cost}_{\text{human}} = 10{,}080 \times ₹24.00 = ₹2{,}41{,}920$$
       $$\text{Cost}_{\text{fraud\_leak}} = ₹46{,}886$$
       $$\text{Total Daily Spend} = ₹19{,}200 + ₹2{,}41{,}920 + ₹46{,}886 = \mathbf{₹3{,}08{,}006\text{/day}}$$
     - **Net Daily Savings**: $₹11{,}52{,}000 - ₹3{,}08{,}006 = \mathbf{₹8{,}43{,}994\text{/day}}$ ($\approx \mathbf{₹30.8\text{ crore/year}}$ in direct operational savings).
     - Furthermore, resolving 74% of honest customer claims instantly in $<3$ seconds cuts churn by 65%, preserving an estimated ₹23.3 crore in annual customer lifetime gross margin.
     - **Combined Annual Value Creation**: $\mathbf{₹54.1\text{ crore/year}}$.
- **Highlight 2**:
  `==In high-velocity consumer operations, automating trust is not an all-or-nothing binary; tri-tier risk partitioning—auto-approving low-risk claims while reserving human review for ambiguous boundaries—maximizes customer retention while compressing fraud leakage to negligible margins.==`
- **Your Move (Recommendation)**: Implement tri-tier routing immediately. Use the ₹30 crore annual BPO savings to fund real-time VLM edge inference and automated warehouse packing audit cameras.

---

### Case 2: Three-Tier Cascade Routing Economic Optimization (FinTech Super-App)
- **Heading**: `### Case 2: Three-Tier Cascade Routing Economic Optimization`
- **Container**: `::: case Three-Tier Cascade Routing Economic Optimization`
- **The Situation**:
  - Enterprise: Premier Indian payments platform processing 10,000,000 customer service inquiries monthly across UPI transactions, merchant soundboxes, credit cards, and bill payments.
  - The problem: 100% of customer support queries are routed directly to a frontier reasoning model API (Claude 3.5 Sonnet / GPT-4o).
  - The financial bleeding: Monthly API compute bill reaches ₹8.50 crore ($10\text{M} \times ₹0.850\text{/query}$). Median response latency is 2.1 seconds, driving user frustration on mobile devices.
- **Clarifying Questions**:
  1. What is the distribution of query complexity across the 10 million interactions?
  2. What are the accuracy and SLA constraints for automated resolution?
  3. What is the infrastructure and operational cost of hosting an open-source Small Language Model (SLM)?
- **The Analytical Core**:
  1. *The 3-Tier Routing Architecture*:
     - **Tier 1: Semantic Intent Cache & Webhook Engine**:
       - Exact and high-similarity matches for deterministic intents: "Where is my refund?", "Check soundbox battery", "Fetch last 5 transactions".
       - Coverage: 42% of queries (4,200,000 queries/month).
       - Unit Cost: ₹0.002 per lookup (Redis Vector Store + backend API). Latency: $p95 = 45\text{ms}$.
     - **Tier 2: Fine-Tuned 8B Parameter SLM (vLLM Cluster)**:
       - Handles semi-structured natural language: fee deductions, chargeback filing instructions, merchant onboarding FAQs.
       - Model: Llama-3-8B / Qwen-2.5-7B fine-tuned on 200,000 historical support transcripts.
       - Softmax entropy confidence gating: if classification confidence $p \ge 0.88$, emit response; if $p < 0.88$, fall through to Tier 3.
       - Coverage: 43% of total volume (4,300,000 queries/month) resolved with 98.7% accuracy.
       - Unit Cost: ₹0.040 per query (amortized GPU cluster). Latency: $p95 = 240\text{ms}$.
     - **Tier 3: Frontier Reasoning Model (Claude 3.5 Sonnet / GPT-4o)**:
       - Handles multi-turn complex disputes, edge-case financial fraud claims, legal inquiries, and fallback queries where Tier 2 confidence was low.
       - Coverage: 15% of total volume (1,500,000 queries/month).
       - Unit Cost: ₹0.850 per query ($3.00/M input, $15.00/M output). Latency: $p95 = 1{,}850\text{ms}$.
  2. *Financial and Latency Optimization*:
     - Baseline Monolithic Spend:
       $$10{,}000{,}000 \times \text{₹}0.850 = \mathbf{\text{₹}8.500\text{ crore/month}}$$
     - Cascade Architecture Spend:
       $$\text{Spend}_{\text{Tier1}} = 4{,}200{,}000 \times \text{₹}0.002 = \text{₹}0.0084\text{ Cr}$$
       $$\text{Spend}_{\text{Tier2}} = 4{,}300{,}000 \times \text{₹}0.040 = \text{₹}0.1720\text{ Cr}$$
       $$\text{Spend}_{\text{Tier3}} = 1{,}500{,}000 \times \text{₹}0.850 = \text{₹}1.2750\text{ Cr}$$
       $$\text{Spend}_{\text{Total}} = \text{₹}0.0084 + \text{₹}0.1720 + \text{₹}1.2750 = \mathbf{\text{₹}1.4554\text{ crore/month}}$$
     - **Net Monthly Financial Savings**:
       $$\Delta \text{Spend} = \text{₹}8.500\text{ Cr} - \text{₹}1.4554\text{ Cr} = \mathbf{\text{₹}7.0446\text{ crore/month}}\quad (\mathbf{82.9\%\text{ reduction}})$$
     - **Weighted Average Latency**:
       $$\bar{L} = (0.42 \times 45) + (0.43 \times 240) + (0.15 \times 1{,}850) = 18.9 + 103.2 + 277.5 = \mathbf{399.6\text{ms}}$$
       (A **81.0% improvement** from 2,100ms baseline).
  3. *Comparative Architecture Trade-Off Table*:
     | Dimension | Monolithic Frontier API | 2-Tier Architecture (Cache + Frontier) | 3-Tier Cascade (Cache + SLM + Frontier) |
     | :--- | :--- | :--- | :--- |
     | **Monthly Compute Spend** | ₹8.500 crore | ₹5.008 crore | **₹1.455 crore** |
     | **Monthly Savings** | Baseline | ₹3.492 crore (41.1%) | **₹7.045 crore (82.9%)** |
     | **Average Latency** | 2,100 ms | 1,095 ms | **399.6 ms** |
     | **Failure Containment** | Single point of failure | Cloud API dependent | Multi-layer local fallback |
- **Highlight 3**:
  `==A monolithic frontier model architecture is an engineering anti-pattern; cascading queries through semantic caches and specialized small language models slashes compute expenditure by over eighty percent while dragging response latency below human conversational thresholds.==`
- **Your Move (Recommendation)**: Deploy the 3-tier cascade immediately. Reinvest 10% of the ₹7 crore monthly savings into synthetic eval generation and fine-tuning datasets for the Tier 2 SLM.

---

### Case 3: Enterprise LegalTech · Long-Context Prompt Caching vs. Chunked Vector RAG
- **Heading**: `### Case 3: Enterprise LegalTech: Prompt Caching vs. Vector RAG`
- **Container**: `::: case Enterprise LegalTech: Prompt Caching vs. Vector RAG`
- **The Situation**:
  - Platform: Enterprise B2B LegalTech platform analyzing 300-page complex Master Services Agreements (MSAs) and financial prospectuses (~120,000 tokens per contract).
  - The problem: The incumbent Vector RAG system chunks agreements into 500-token snippets ($k=5$ retrieval). On complex cross-clause indemnity, limitation of liability, and termination queries, RAG suffers a 22% retrieval miss rate. This causes a 14% hallucination rate, infuriating corporate general counsels.
  - Dilemma: The VP of Product proposes replacing RAG with full-document Long-Context Prompt Caching (caching the entire 120,000 tokens in Claude 3.5 Sonnet or Gemini 1.5 Pro). The CFO warns that caching 120,000 tokens per contract will blow up API bills.
- **Clarifying Questions**:
  1. What is the query velocity per active contract review session?
  2. What is the cache creation fee versus cache read fee, and what is the cache Time-To-Live (TTL)?
  3. What is the commercial liability cost of a legal hallucination?
- **The Analytical Core**:
  1. *Mathematical Unit Economics of Vector RAG*:
     - Document ingestion: 120,000 tokens embedded via OpenAI `text-embedding-3-small` ($0.02 / 1M tokens) = $0.0024.
     - Vector database storage & compute amortized per query = $0.0035.
     - Prompt size: 5 retrieved chunks $\times 500 = 2{,}500$ tokens + 500 tokens system/user query = 3,000 input tokens.
     - Model API fee: $3.00 / 1M tokens $\times 3{,}000 = \$0.0090$. Output fee (400 tokens): $15.00 / 1M tokens $\times 400 = \$0.0060$.
     - Total RAG Cost per Query:
       $$\text{Cost}_{\text{RAG}} = \$0.0035 + \$0.0090 + \$0.0060 = \mathbf{\$0.0185\text{ per query}}$$
     - Retrieval accuracy: 78% recall; 14% hallucination rate. Requires senior lawyer manual audit costing an average of $25 per error.
  2. *Mathematical Unit Economics of Long-Context Prompt Caching*:
     - Cache Creation Fee (Write): 120,000 tokens $\times \$3.75 / 1\text{M tokens} = \mathbf{\$0.450}$ (one-time cost per 5-minute TTL window).
     - Cache Read Fee (Hit): 120,000 tokens $\times \$0.30 / 1\text{M tokens} = \mathbf{\$0.0360}$.
     - User query + output: $(1{,}000 \times \$3.00/1\text{M}) + (400 \times \$15.00/1\text{M}) = \$0.0030 + \$0.0060 = \$0.0090$.
     - Effective Cost per Cached Query:
       $$\text{Cost}_{\text{Cache-Hit}} = \$0.0360 + \$0.0090 = \mathbf{\$0.0450\text{ per query}}$$
     - Retrieval accuracy: $>99.5\%$ recall across the entire document; hallucination rate drops to $0.8\%$.
  3. *Derivation of Break-Even Query Velocity ($Q^*$)*:
     - Equating total cost across $Q$ queries in a 5-minute review session:
       $$\text{Cost}_{\text{Uncached-RAG}}(Q) = Q \times \$0.0185$$
       $$\text{Cost}_{\text{Cached}}(Q) = \$0.450 + (Q - 1) \times \$0.0450$$
     - Pure token break-even:
       $$\$0.450 + \$0.0450(Q - 1) \le \$0.0185 Q \implies \text{No solution for } Q > 0 \text{ without risk adjustment!}$$
     - Risk-Adjusted Total Cost of Ownership ($TCO$):
       Factoring in the legal audit cost of hallucinations ($0.14 \times \$25.00 = \$3.50$ per RAG query vs. $0.008 \times \$25.00 = \$0.20$ per Cached query):
       $$\text{Cost}_{\text{RAG+Risk}} = \$0.0185 + \$3.5000 = \mathbf{\$3.5185\text{ per query}}$$
       $$\text{Cost}_{\text{Cache+Risk}} = \$0.0450 + \$0.2000 = \mathbf{\$0.2450\text{ per query}}$$
       $$\text{Break-Even: } \$0.450 + Q \times \$0.2450 \le Q \times \$3.5185 \implies Q(3.5185 - 0.2450) \ge 0.450 \implies Q \ge \frac{0.450}{3.2735} \approx \mathbf{0.14\text{ queries}}$$
     - Long-Context Prompt Caching is **14.3x cheaper** on a risk-adjusted basis from the very first question!
- **Highlight 4**:
  `==Evaluating AI product economics on raw API token pricing alone is a lethal executive blindspot; when downstream error remediation and human audit costs are incorporated, high-context prompt caching is orders of magnitude cheaper than brittle chunked vector retrieval.==`
- **Your Move (Recommendation)**: Implement a hybrid tiered architecture: Deploy full-context prompt caching for active, single-document multi-turn contract reviews (where lawyers ask 10+ questions per session). Reserve chunked vector RAG strictly for broad cross-repository search over tens of thousands of archived agreements.

---

### Case 4: Human-in-the-Loop Escalation Routing & Blast Radius Calibration
- **Heading**: `### Case 4: Human-in-the-Loop Escalation Routing & Blast Radius Calibration`
- **Container**: `::: case Human-in-the-Loop Escalation Routing & Blast Radius Calibration`
- **The Situation**:
  - Enterprise: Enterprise B2B FinTech platform automating accounts payable invoice reconciliation ($₹50{,}000\text{--}₹25{,}00{,}000$ per invoice).
  - The problem: Automating payment release without human review carries severe financial blast radius. A false positive (approving a mismatched or duplicate invoice) costs 45% of the invoice face value in recovery losses and legal fees. Conversely, escalating valid invoices to human clerks causes severe review fatigue, costs ₹180 per manual review, and delays supplier payment cycles.
- **Clarifying Questions**:
  1. What is the asymmetric cost ratio between false positive payment releases and false negative human review escalations?
  2. What is the baseline invoice anomaly rate?
  3. How should approval autonomy be tiered across invoice transaction amounts?
- **The Analytical Core**:
  1. *The Asymmetric Cost Matrix*:
     - Average invoice value = ₹1,80,000.
     - False Positive Cost ($C_{\text{FP}}$): $0.45 \times ₹1{,}80{,}000 = ₹81{,}000$ (unrecoverable loss, legal enforcement, vendor dispute).
     - False Negative Cost ($C_{\text{FN}}$): ₹180 (cost of human finance clerk conducting a 10-minute 3-way match verification).
     - Cost asymmetry ratio:
       $$\frac{C_{\text{FP}}}{C_{\text{FN}}} = \frac{₹81{,}000}{₹180} = \mathbf{450:1}$$
  2. *Derivation of Optimal Bayes Decision Operating Threshold ($\theta^*$)*:
     - Let model confidence score for invoice validity be $p \in [0, 1]$. Auto-approve if $p \ge \theta^*$; otherwise escalate.
     - Let base rate of flawed/fraudulent invoices be $1 - \pi = 0.03$ (3% base anomaly rate).
     - The minimum-loss operating threshold is derived from Bayes decision theory:
       $$\theta^* = \frac{C_{\text{FP}} \cdot (1 - \pi)}{C_{\text{FP}} \cdot (1 - \pi) + C_{\text{FN}} \cdot \pi} = \frac{81{,}000 \times 0.03}{(81{,}000 \times 0.03) + (180 \times 0.97)} = \frac{2{,}430}{2{,}430 + 174.6} = \frac{2{,}430}{2{,}604.6} \approx \mathbf{0.933}$$
     - To minimize enterprise loss, the model must not auto-approve any invoice unless its confidence exceeds **93.3%**!
  3. *Blast Radius Tiering Matrix*:
     | Tier | Transaction Range | Risk Severity | Decision Threshold | Human Governance Gate |
     | :--- | :--- | :--- | :--- | :--- |
     | **Tier 1 (Low)** | $< ₹10{,}000$ | Negligible ($C_{\text{FP}} \le ₹4{,}500$) | $\theta_1 = 0.75$ | 88% Auto-Approved; ambient audit log |
     | **Tier 2 (Medium)** | $₹10{,}000\text{--}₹2{,}00{,}000$ | Moderate ($C_{\text{FP}} \le ₹90{,}000$) | $\theta_2 = 0.933$ | 68% Auto-Approved; 32% single-clerk review |
     | **Tier 3 (High)** | $> ₹2{,}00{,}000$ | Severe ($C_{\text{FP}} > ₹90{,}000$) | $\theta_3 = 1.00$ | **0% Auto-Approved**; mandatory dual-key human sign-off |
  4. *Operational & Financial Outcome*:
     - Out of 500,000 monthly invoices:
       - Tier 1: 300,000 invoices $\to$ 264,000 auto-approved; 36,000 reviewed.
       - Tier 2: 160,000 invoices $\to$ 108,800 auto-approved; 51,200 reviewed.
       - Tier 3: 40,000 invoices $\to$ 0 auto-approved; 40,000 dual-key reviewed.
     - Total human reviews = 127,200 (down from 500,000; a 74.6% reduction in clerical labor, saving ₹6.71 crore monthly in processing overhead).
     - Zero catastrophic payment leaks across Tier 3 high-value transactions.
- **Your Move (Recommendation)**: Implement graduated blast radius tiering immediately. Pair Tier 2 and Tier 3 review queues with an ambient diff HUD, highlighting exact mismatched line-items to compress human review time from 10 minutes to 45 seconds.

---

## 5. The 4 Quantitative Estimation Problems (Detailed Specifications)

### Estimation 1: Multi-Agent Customer Support Latency Budgeting Against Human Wait Tolerance
- **Heading**: `### Estimation 1: Multi-Agent Customer Support Latency Budgeting`
- **Container**: `::: case Estimation 1: Multi-Agent Customer Support Latency Budgeting`
- **The Prompt**:
  *"An enterprise e-commerce platform designs an autonomous customer support agent executing a 5-step loop (Intent Classification $\to$ Context Retrieval & Order DB Lookup $\to$ Multi-Agent Reasoning / Tool Call $\to$ Response Synthesis & Streaming). Model the end-to-end latency budget against human cognitive wait tolerance thresholds (Card-Moran-Newell). Identify the bottleneck and engineer a compliant architecture."*
- **Mathematical Decomposition**:
  1. *Perceptual Anchors from Cognitive Science (Card-Moran-Newell, 1983)*:
     - **100 ms**: Instantaneous sensory reaction (button press feedback).
     - **1,000 ms (1.0 s)**: Unbroken conversational thought boundary (dialogue turn limit).
     - **10,000 ms (10.0 s)**: Absolute cognitive task boundary; user attention dissipates and task abandonment surges.
  2. *Unoptimized Sequential Pipeline Breakdown*:
     - Network round-trip ($T_{\text{net}}$): $120\text{ms}$.
     - Intent classification (LLM call): $650\text{ms}$.
     - Vector RAG search & Order DB SQL query ($T_{\text{data}}$): $450\text{ms}$.
     - Multi-agent reasoning (2 sequential LLM calls, uncached 12,000-token context):
       - Prefill: $2 \times 1{,}400\text{ms} = 2{,}800\text{ms}$.
       - Decode generation (300 tokens each @ 50 TPS): $2 \times \frac{300}{50} = 2 \times 6{,}000\text{ms} = 12{,}000\text{ms}$.
     - Response synthesis & markdown streaming (200 tokens @ 50 TPS): $\frac{200}{50} = 4{,}000\text{ms}$.
     - **Total End-to-End Latency**:
       $$T_{\text{total}} = 120 + 650 + 450 + 2{,}800 + 12{,}000 + 4{,}000 = \mathbf{20{,}020\text{ ms}}\quad (\mathbf{20.02\text{ seconds}})$$
     - **Diagnosis**: 20 seconds breaches the 10-second cognitive abandonment threshold! In production, 42% of mobile users abandon the chat session before the first response token renders.
  3. *Re-Architected Latency-Budgeted Pipeline*:
     - **Parallel Speculative Execution**: Intent classification and SQL prefetch execute concurrently in $150\text{ms}$.
     - **KV Prompt Caching**: System instructions and tools cached in GPU memory; prefill drops from 1,400ms to $280\text{ms}$.
     - **Speculative Decoding Acceleration**: Employing draft model speculation increases decode rate from 50 TPS to $160\text{ TPS}$.
     - **Progressive Streaming & Ambient State**: Immediate status chips ("Checking order #4921...") stream to the user within $200\text{ms}$.
     - **New Total Latency**:
       - Time-to-First-Token ($TTFT$): $120\text{ms} + 150\text{ms} + 280\text{ms} = \mathbf{550\text{ ms}}$ ($\le 1.0\text{s}$ conversational flow SLA satisfied!).
       - Generation time: $\frac{200}{160} = \mathbf{1{,}250\text{ ms}}$.
       - Complete response delivered in $\mathbf{1{,}800\text{ ms}}$ (1.8 seconds vs. 20.0 seconds baseline; a **91% latency reduction**).
- **Strategic Takeaway**: In conversational agent workflows, speculative decoding throughput ($TPS$) and KV caching are not backend implementation details—they are fundamental product requirements that govern user retention and session completion.

---

### Estimation 2: Enterprise LLM Evaluation Harness ROI and Sample Sizing
- **Heading**: `### Estimation 2: Enterprise LLM Evaluation Harness ROI and Sample Sizing`
- **Container**: `::: case Estimation 2: Enterprise LLM Evaluation Harness ROI and Sample Sizing`
- **The Prompt**:
  *"Calculate the minimum sample size required for an automated CI/CD golden eval suite to detect a 1.5% regression in model faithfulness (from 98.0% baseline to 96.5%) at 95% confidence ($\alpha = 0.05$) and 80% statistical power ($\beta = 0.20$). Calculate the daily financial cost of running this harness across 20 engineering pull requests."*
- **Mathematical Decomposition**:
  1. *Two-Proportion Z-Test Sample Sizing Formula*:
     $$n = \frac{\left(z_{\alpha/2}\sqrt{2\bar{p}(1-\bar{p})} + z_\beta\sqrt{p_1(1-p_1) + p_2(1-p_2)}\right)^2}{(p_1 - p_2)^2}$$
     - Parameters: $p_1 = 0.980$, $p_2 = 0.965$, $\Delta = p_1 - p_2 = 0.015$.
     - Pooled proportion: $\bar{p} = \frac{0.980 + 0.965}{2} = 0.9725$.
     - Two-tailed critical value for $\alpha = 0.05 \implies z_{\alpha/2} = 1.96$.
     - One-tailed critical value for power $1 - \beta = 0.80 \implies z_\beta = 0.84$.
     - Step-by-step arithmetic:
       $$\bar{p}(1-\bar{p}) = 0.9725 \times 0.0275 = 0.026744 \implies \sqrt{2 \times 0.026744} = \sqrt{0.053488} \approx 0.23127$$
       $$p_1(1-p_1) = 0.980 \times 0.020 = 0.019600$$
       $$p_2(1-p_2) = 0.965 \times 0.035 = 0.033775$$
       $$\sqrt{0.019600 + 0.033775} = \sqrt{0.053375} \approx 0.23103$$
       $$\text{Numerator} = \left(1.96 \times 0.23127 + 0.84 \times 0.23103\right)^2 = (0.45329 + 0.19407)^2 = (0.64736)^2 \approx \mathbf{0.41908}$$
       $$\text{Denominator} = (0.015)^2 = \mathbf{0.000225}$$
       $$n = \frac{0.41908}{0.000225} \approx \mathbf{1{,}863\text{ test cases per evaluation run}}$$
  2. *The Wilson Score Confidence Interval Trap*:
     - If an engineering team tests only 50 cases ($n=50$) and observes 49 successes ($98.0\%$), the 95% Wilson score interval is:
       $$\text{CI}_{95\%} = \left[ 89.5\%, 99.6\% \right]$$
     - Because the confidence interval span ($10.1\%$) dwarfs the $1.5\%$ regression, small test suites are statistically blind to catastrophic degradation!
  3. *CI/CD Financial Cost Sizing*:
     - 20 Pull Requests (PRs) merged daily.
     - Evaluation model: Claude 3.5 Haiku ($0.80/1M input, $4.00/1M output).
     - Per test case: 1,500 input tokens, 300 output tokens.
     - Tokens per PR run:
       $$\text{Input: } 1{,}863 \times 1{,}500 = 2{,}794{,}500\text{ tokens} \implies 2.7945 \times \$0.80 = \$2.24$$
       $$\text{Output: } 1{,}863 \times 300 = 558{,}900\text{ tokens} \implies 0.5589 \times \$4.00 = \$2.24$$
       $$\text{Cost per PR eval run} = \$2.24 + \$2.24 = \mathbf{\$4.48}$$
     - Total Daily CI Spend (20 PRs):
       $$20 \times \$4.48 = \mathbf{\$89.60\text{/day}}\quad (\approx \$2{,}688\text{/month}\text{ or }\text{₹}2.28\text{ lakh/month})$$
- **Highlight 5**:
  `==Testing an AI product on fifty sample prompts is statistical theater; detecting subtle production regressions requires sizing golden evaluation suites to statistical power, bounding false clearances before code touches enterprise traffic.==`
- **Strategic Takeaway**: High-powered statistical evaluation suites are remarkably cheap. For less than $3,000 a month, an enterprise engineering organization can mathematically eliminate silent accuracy regressions on every single code commit.

---

### Estimation 3: Synthetic Test Data Generation vs Human Annotation Cost-Accuracy Frontier
- **Heading**: `### Estimation 3: Synthetic Test Data vs. Human Annotation Frontier`
- **Container**: `::: case Estimation 3: Synthetic Test Data vs. Human Annotation Frontier`
- **The Prompt**:
  *"A product team requires 50,000 verified, labeled edge cases to train and benchmark an insurance claims triage model across 10 regional dialects. Construct the cost-accuracy frontier comparing Option A (Pure Human Expert Annotation) versus Option B (Synthetic Generation with Multi-Perspective LLM Verification and Human Spot-Audit). What is the optimal allocation?"*
- **Mathematical Decomposition**:
  1. *Option A: Pure Human Expert Annotation*:
     - Medical / insurance domain annotators: ₹350 per hour.
     - Productivity: 12 complex claims analyzed per hour $\implies ₹29.17$ per record.
     - Multi-annotator agreement protocol: 2 annotators per record + 20% tie-breaker adjudication = $2.2 \times ₹29.17 = \mathbf{₹64.17\text{ per verified record}}$.
     - Total Cost for 50,000 records:
       $$50{,}000 \times \text{₹}64.17 = \mathbf{\text{₹}32{,}08{,}500}\quad (\approx \mathbf{\$37{,}750})$$
     - Timeline: 10 dedicated annotators working 40 hours/week:
       $$\text{Time} = \frac{50{,}000 \text{ records}}{10 \times 40 \times 12 \text{ records/week}} \approx \mathbf{10.4\text{ weeks}}\quad (\mathbf{2.5\text{ months}})$$
  2. *Option B: Synthetic Generation with Multi-Perspective LLM Verification*:
     - Candidate generation: Frontier reasoning model prompted with few-shot seed perturbation (1,200 input tokens, 400 output tokens) $\implies \$0.0096$ (₹0.82) per candidate.
     - Automated verification filter: Tier 1 regex/schema check + Tier 2 AST/logic check = ₹0.15 per candidate.
     - Rejection rate: 35% of synthetic samples fail schema or diversity constraints. To yield 50,000 gold samples, generate:
       $$N_{\text{raw}} = \frac{50{,}000}{0.65} = 76{,}923\text{ candidate samples}$$
     - Raw synthetic compute spend:
       $$76{,}923 \times (₹0.82 + ₹0.15) = \mathbf{₹7{,}46{,}153}\quad (\approx \$8{,}778)$$
     - Stratified human expert audit panel (5% spot-check = 2,500 records @ ₹64.17):
       $$2{,}500 \times ₹64.17 = \mathbf{₹1{,}60{,}425}\quad (\approx \$1{,}887)$$
     - Total Hybrid Synthetic Cost:
       $$\text{Cost}_{\text{hybrid}} = \text{₹}7{,}46{,}153 + \text{₹}1{,}60{,}425 = \mathbf{\text{₹}9{,}06{,}578}\quad (\approx \mathbf{\$10{,}665})$$
     - **Cost Savings**: $₹32.09\text{L} - ₹9.07\text{L} = \mathbf{₹23.02\text{ lakh}}\quad (\mathbf{71.8\%\text{ reduction}})$.
     - **Time Acceleration**: Completed in 48 hours of parallel cloud compute vs. 10.4 weeks of human labor!
  3. *The Cost-Accuracy Pareto Frontier*:
     - Pure Synthetic ($0\%$ human): Accuracy plateaus at $91.2\%$ due to LLM self-enhancement and distribution collapse.
     - Hybrid ($95\%$ synthetic + $5\%$ human audit): Accuracy reaches $\mathbf{97.8\%}$ (matches pure human quality).
     - Pure Human ($100\%$ human): Accuracy = $98.1\%$, but costs $3.5\text{x}$ more and delays launch by 10 weeks.
- **Strategic Takeaway**: Pure synthetic data creates an epistemic echo chamber, while pure human labeling is an operational bottleneck. The winning PM strategy couples high-volume synthetic generation with automated programmatic rejection filters and a high-leverage 5% human audit panel.

---

### Estimation 4: Self-Hosted vLLM/Ollama GPU Cluster vs Commercial Frontier API TCO Crossover Volume ($V^*$)
- **Heading**: `### Estimation 4: Self-Hosted GPU Cluster vs. Frontier API TCO Crossover`
- **Container**: `::: case Estimation 4: Self-Hosted GPU Cluster vs. Frontier API TCO Crossover`
- **The Prompt**:
  *"A hospital healthcare network processes 50,000 inpatient medical records monthly (2,500 input tokens, 400 output tokens for ICD-10 diagnostic coding). Compare the Total Cost of Ownership (TCO) between Option A: Commercial Frontier API versus Option B: Self-Hosted Fine-Tuned 70B Open-Source Model on AWS. Calculate the volume crossover point ($V^*$) and formulate the executive decision rule."*
- **Mathematical Decomposition**:
  1. *Option A: Commercial Frontier API (Claude 3.5 Sonnet / GPT-4o)*:
     - Token pricing: $3.00/1M input tokens, $15.00/1M output tokens.
     - Variable cost per document:
       $$c_{\text{API}} = \left(\frac{2{,}500}{1\text{M}} \times \$3.00\right) + \left(\frac{400}{1\text{M}} \times \$15.00\right) = \$0.0075 + \$0.0060 = \mathbf{\$0.0135\text{ per document}}\quad (\approx \text{₹}1.15)$$
     - Monthly API Spend at 50,000 documents:
       $$\text{Spend}_{\text{API}} = 50{,}000 \times \$0.0135 = \mathbf{\$675\text{/month}}\quad (\approx \mathbf{\text{₹}57{,}375\text{/month}})$$
  2. *Option B: Self-Hosted Fine-Tuned 70B Model (vLLM on AWS)*:
     - Cloud GPU reservation: 1x `g6e.12xlarge` instance (4x NVIDIA L40S 48GB GPUs) 1-year reserved = $\mathbf{\$3{,}850\text{/month}}$.
     - Networking, VPC peering, and NVMe model storage = $\mathbf{\$450\text{/month}}$.
     - Dataset curation and periodic fine-tuning pipeline amortized over 12 months = $\mathbf{\$1{,}250\text{/month}}$.
     - Dedicated MLOps engineering maintenance (0.25 FTE loaded engineer @ $14,000/month) = $\mathbf{\$3{,}500\text{/month}}$.
     - Total Monthly Self-Hosted Fixed TCO:
       $$F_{\text{self}} = \$3{,}850 + \$450 + \$1{,}250 + \$3{,}500 = \mathbf{\$9{,}050\text{/month}}\quad (\approx \mathbf{\text{₹}7{,}69{,}250\text{/month}})$$
  3. *TCO Comparison & Volume Crossover Derivation ($V^*$)*:
     - At 50,000 records/month: Self-hosting costs $9,050/mo vs API cost of $675/mo. Self-hosting is **13.4x more expensive**!
     - The Volume Crossover Condition:
       $$V^* \times c_{\text{API}} = F_{\text{self}} \implies V^* = \frac{F_{\text{self}}}{c_{\text{API}}} = \frac{\$9{,}050}{\$0.0135} \approx \mathbf{670{,}370\text{ documents/month}}$$
- **Highlight 6**:
  `==Self-hosting open-source foundation models before crossing the volume crossover threshold is corporate capital destruction; until monthly query volumes exceed six hundred thousand transactions, commercial frontier APIs deliver superior capability at a fraction of the total cost of ownership.==`
- **Strategic Takeaway**: Unless transaction volume exceeds 670,000 documents monthly (or regulatory air-gapping strictly prohibits external cloud APIs), self-hosting open-source LLMs destroys enterprise capital. Product managers must resist engineering vanity projects and leverage commercial APIs during early and mid-growth phases.

---

### Stage 8: Lenses
- **Block 1**: `::: lens product`
  - Two to three sentences on how PMs must defend compute unit economics in gross margin reviews.
- **Block 2**: `::: lens consulting`
  - Two to three sentences on how management consultants use these 8 models to audit AI vendor proposals and M&A targets.

---

### Stage 9: Interview Room
- **Block**: `::: interview Sizing and Defending an AI Product Architecture in Executive Review`
- **Q**: `"Our enterprise SaaS product serves 10 million queries a month using a single frontier LLM API. The CFO demands a 60% reduction in our ₹8 crore monthly AI compute bill within ninety days, but our enterprise clients contractually demand 99% accuracy. As Vice President of Product, what architectural turnaround do you present to the executive committee?"`
- **Opening Line**:
  `> "Slashing compute costs without sacrificing accuracy is achieved not by negotiating token discounts, but by decomposing monolithic queries into a three-tier routing cascade—diverting deterministic and simple intents to semantic caches and local small language models while reserving frontier reasoning models for ambiguous edge cases."`
- **What they are testing**:
  Understanding of model cascade economics, confidence threshold calibration, latency budgeting, and executive communication.
- **A strong structure**:
  1. Expose the Monolithic Fallacy: Explain why sending 100% of queries to frontier models wastes compute.
  2. Present the 3-Tier Cascade: Detail the breakdown (42% cache, 43% 8B SLM, 15% frontier).
  3. Walk the Financial Math: Show the drop from ₹8.50 Cr to ₹1.45 Cr (an 82.9% reduction, exceeding the 60% mandate).
  4. Prove Latency Improvement: Demonstrate the average response time dropping from 2,100ms to 400ms.
  5. Governance Guardrails: Explain the 1,800-case automated eval harness to guarantee the 99% accuracy SLA.

---

### Stage 10: Try It Yourself
- **Block**: `::: try Quantitative AI product trade-off simulator`
- **Instructions**: Practical exercise for testing prompt caching break-even and routing cascades using Claude, ChatGPT, or Gemini.
- **Fenced Prompt Block**:
  ```markdown
  You are an executive AI product consultant preparing a candidate for a VP of Product interview at a Tier 1 technology platform.

  Run a complete quantitative evaluation and financial optimization for this scenario:
  Platform: An enterprise knowledge assistant processing 5,000,000 queries monthly.
  Current State: 100% routed to frontier API ($3.00/M input, $15.00/M output; avg 2,000 input, 300 output tokens). Latency = 2.4s.
  
  Proposal:
  1. Implement KV Context Caching for a 60,000-token enterprise knowledge base (TTL = 5 min; Cache write = $3.75/M, Cache read = $0.30/M).
  2. Implement a 3-tier cascade: 35% Cache/API lookup ($0.001/query), 45% 8B SLM ($0.035/query), 20% Frontier API ($0.0105/query).
  
  Calculate:
  1. Break-even query velocity Q* for prompt caching.
  2. Total monthly spend baseline vs. optimized cascade.
  3. Net annual savings in USD and INR (@ Rs 85/USD).
  4. Weighted average latency under the cascade.
  ```

---

### Stage 11: Registered Media Cards
- **Cards**:
  - `{{read anthropic-context-caching}}`
  - `{{read openai-evals-framework}}`
  - `{{paper google-gemini-long-context}}`
- *Note*: Use `read` for articles and `paper` for papers to comply strictly with `scripts/lib/render.mjs` line 185!

---

### Stage 12: Check Yourself & Answers Block
- **Block**: `::: check Check yourself`
  1. In quick-commerce automated refunds, what is the economic justification for auto-approving refund claims below a fraud risk threshold $\theta_L$ rather than reviewing 100% of claims with human agents? <span class="lvl">recall</span>
  2. Why does a small sample size ($n=50$) in an automated eval suite fail to detect a 1.5% accuracy regression, and how does the Wilson score interval expose this failure? <span class="lvl">explain</span>
  3. A LegalTech assistant analyzes 120,000-token contracts. If cache creation costs $3.75/M tokens, cache reading costs $0.30/M tokens, and uncached input costs $3.00/M tokens, calculate the break-even query velocity ($Q^*$) within a 5-minute TTL window. <span class="lvl">apply</span>
  4. An enterprise FinTech platform routes payment dispute queries through a three-tier cascade. If the Tier 2 SLM has an accuracy of 98.5% and costs ₹0.040 per query, how should the product manager calibrate the confidence threshold $\theta$ to balance cost savings against error liability? <span class="lvl">transfer</span>
  5. How should a Chief Product Officer evaluate an engineering proposal to spend ₹75 lakh building an on-premise GPU cluster to self-host open-source models for a product handling 40,000 monthly transactions? <span class="lvl">judge</span>
- **Block**: `::: answers`
  - Answers matching all 5 questions with thorough mathematical and conceptual explanations. Prints upside down (`.flip`).

---

### Stage 13: The Night-Before Page (Recap)
- **Block**: `::: recap The night-before page`
- **Body**: Exactly 5 numbered lines:
  1. The eight quantitative PM archetypes: Quick-Commerce refunds, cascade routing, legal KV caching, HITL escalation, latency budgeting, eval sizing, synthetic data frontiers, and GPU TCO crossover.
  2. Never evaluate AI products on token fees alone: Raw API pricing is trivial compared to the downstream costs of human review friction, customer churn, and false positive liability.
  3. The prompt caching velocity rule: KV context caching breaks even at $Q^* = 2$ queries per TTL window; in multi-turn document sessions, it slashes compute costs by 80% and prefill latency by 90%.
  4. Cascade queries across model tiers: Direct 80%+ of volume to semantic caches and local 8B SLMs; reserve expensive frontier reasoning models strictly for ambiguous edge cases.
  5. Respect the self-hosting crossover threshold: Dedicated on-premise GPU clusters destroy capital below 670,000 documents monthly; leverage commercial frontier APIs until transaction scale justifies fixed infrastructure.

---

## 6. Figure 21.1 SVG Specification (`content/figures/product-casebook.svg`)

The SVG diagram must be placed at `content/figures/product-casebook.svg`.
- **Dimensions**: `viewBox="0 0 640 330"`
- **Semantic Classes**: `paper`, `acc-s`, `rule-s`, `wash`, `t-display`, `font-family="monospace"`
- **Layout**:
  - Two-column balanced split: Left column = Four Strategic Production Cases; Right column = Four Quantitative Sizing Models.
  - Clear architectural callouts for all 8 cases with key metrics.

### Proposed SVG Code

```xml
<svg viewBox="0 0 640 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The AI product management casebook taxonomy: Four strategic production cases on the left, and four quantitative estimation models on the right.">
  <text class="t-display" x="20" y="24" font-size="14" font-weight="bold">Four Strategic Production Cases</text>
  <text class="t-display" x="345" y="24" font-size="14" font-weight="bold">Four Quantitative Sizing Models</text>

  <!-- Left: 4 Strategic Cases -->
  <rect class="paper acc-s" x="20" y="38" width="305" height="60" rx="4" stroke-width="1.5"/>
  <text x="32" y="56" font-size="10.5" font-weight="bold">1. Quick-Commerce Automated Refunds</text>
  <text x="32" y="72" font-size="8.8">1.5M orders/day · Tri-tier ROC gating (θL=0.15, θH=0.72)</text>
  <text x="32" y="86" font-size="8.2" fill="#555">BPO load -79% · Net value creation ₹54.1 Cr/year</text>

  <rect class="paper acc-s" x="20" y="106" width="305" height="60" rx="4" stroke-width="1.5"/>
  <text x="32" y="124" font-size="10.5" font-weight="bold">2. FinTech Multi-Tier Cascade Routing</text>
  <text x="32" y="140" font-size="8.8">10M queries/mo · Cache (42%) → 8B SLM (43%) → Frontier (15%)</text>
  <text x="32" y="154" font-size="8.2" fill="#555">₹8.50Cr → ₹1.45Cr (-82.9%) · Latency 2,100ms → 400ms</text>

  <rect class="paper acc-s" x="20" y="174" width="305" height="60" rx="4" stroke-width="1.5"/>
  <text x="32" y="192" font-size="10.5" font-weight="bold">3. LegalTech Prompt Caching vs. RAG</text>
  <text x="32" y="208" font-size="8.8">120k token contracts · Q*=2 break-even query velocity</text>
  <text x="32" y="222" font-size="8.2" fill="#555">TTFT 7.2s → 650ms · 14.3x risk-adjusted cost advantage</text>

  <rect class="paper acc-s" x="20" y="242" width="305" height="60" rx="4" stroke-width="1.5"/>
  <text x="32" y="260" font-size="10.5" font-weight="bold">4. Human-in-the-Loop Escalation Gates</text>
  <text x="32" y="276" font-size="8.8">Invoice matching · 450:1 cost asymmetry · θ*=0.933</text>
  <text x="32" y="290" font-size="8.2" fill="#555">Graduated blast radius tiers · ₹18.4 Cr fraud stopped</text>

  <!-- Divider -->
  <line class="rule-s" x1="332" x2="332" y1="18" y2="312" stroke-width="1"/>

  <!-- Right: 4 Quantitative Sizing Models -->
  <rect class="paper acc-s" x="345" y="38" width="275" height="60" rx="4" stroke-width="1.5"/>
  <text x="357" y="56" font-size="10.5" font-weight="bold">Sizing 1: Agent Latency Budgeting</text>
  <text x="357" y="72" font-size="8.8">Card-Moran-Newell 1.0s flow · Speculative decode 160 TPS</text>
  <text x="357" y="86" font-size="8.2" fill="#555">TTFT 280ms · Turnaround 20.0s → 1.8s (91% drop)</text>

  <rect class="paper acc-s" x="345" y="106" width="275" height="60" rx="4" stroke-width="1.5"/>
  <text x="357" y="124" font-size="10.5" font-weight="bold">Sizing 2: CI/CD Eval Statistical Power</text>
  <text x="357" y="140" font-size="8.8">Two-proportion z-test · α=0.05, 1-β=0.80, Δ=1.5%</text>
  <text x="357" y="154" font-size="8.2" fill="#555">n=1,863 golden cases · $4.48/PR run ($89.60/day)</text>

  <rect class="paper acc-s" x="345" y="174" width="275" height="60" rx="4" stroke-width="1.5"/>
  <text x="357" y="192" font-size="10.5" font-weight="bold">Sizing 3: Synthetic Data vs. Human Labels</text>
  <text x="357" y="208" font-size="8.8">50k records · 65% yield + 5% human audit panel</text>
  <text x="357" y="222" font-size="8.2" fill="#555">₹9.07L in 48h vs. ₹32.09L in 10.4 wks (71.8% savings)</text>

  <rect class="wash acc-s" x="345" y="242" width="275" height="60" rx="4" stroke-width="2"/>
  <text class="t-display" x="357" y="260" font-size="10.5" font-weight="bold">Sizing 4: TCO GPU Cluster Crossover</text>
  <text x="357" y="276" font-size="8.8">50k docs/mo · $9,050/mo GPU vs. $675/mo API</text>
  <text x="357" y="290" font-size="8.2" fill="#555">V*=670,370 docs/mo volume crossover tipping point</text>
</svg>
```

---

## 7. Anti-AI Writing Audit Checklist for Chapter 21

During drafting, the writer agent must execute the following checks:
1. **Zero Banned Words**: Ensure complete absence of *testament*, *pivotal*, *evolving landscape*, *delve*, *crucial*, *intertwined*, *tapestry*, *stark reminder*, *beacon*.
2. **Zero Trailing Participial Clauses**: No `, highlighting...`, `, underscoring...`, `, reflecting...`, `, demonstrating...`. Split sentences cleanly.
3. **High Perplexity & Sentence Burstiness**: Alternate between short, punchy declarative statements (3–6 words) and detailed analytical periods (25–35 words).
4. **Concrete Grounding**: Ensure all references cite real platforms (Swiggy, Zepto, Blinkit, PhonePe, AWS, Claude 3.5 Sonnet/Haiku, Gemini 1.5 Pro, Llama 3 8B/70B) and exact figures (₹54.1 crore, ₹1.455 crore, $0.0135, 1,863 cases, $Q^*=2$, $V^*=670{,}370$).
5. **No AI Throat-Clearing**: Lead straight into the business problem without rhetorical fluff like *"In today's fast-paced digital era..."*.

---

## 8. Verification & Integration Plan

1. **Authoring Execution**:
   - Write `content/figures/product-casebook.svg`.
   - Write `content/chapters/product-casebook.md`.
2. **Offline Linter Verification**:
   - Run `npm run check`.
   - Verify `0 errors`.
   - Confirm:
     - Frontmatter matches `content/toc.yml`.
     - Zero escaped HTML tag leaks (`&lt;span...&gt;`).
     - Exactly 1 stat block.
     - Exactly 6 highlights (`==...==`).
     - Exactly 3 media cards (`{{read ...}}`, `{{paper ...}}`).
     - Exactly 5 check questions with `<span class="lvl">...</span>` and inverted `::: answers`.
     - Exactly 5 numbered lines in `::: recap The night-before page`.
3. **Build & PDF Compilation**:
   - Run `npm run build`.
   - Run `npm run pdf`.
   - Verify print layout rendering and visual appeal.
