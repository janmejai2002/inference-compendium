---
id: product-casebook
title: "The Product AI casebook & interview room"
deck: "Eight fully-worked quantitative PM cases and estimation problems covering context caching ROI, cascade routing economics, eval harness calibration, agentic latency budgets, and build-vs-buy TCO."
level: Advanced
tracks: [product, consulting]
prereq: [ai-product-lifecycle, product-architecture-economics, agentic-ux-and-interfaces]
hook: "In an executive PM interview at an Indian fintech unicorn, the Head of Product challenges you: 'We spend ₹18 crore annually on frontier reasoning models for our credit analysis and merchant underwriting assistant. Our p95 latency is 6.2 seconds, causing 38% user drop-off. The engineering team proposes fine-tuning an open-source 8B model, while our AI architect insists on prompt caching and a cascade router. Walk me through the unit economics, derive the exact break-even volumes, and present an executive migration roadmap.' How do you structure your answer?"
objectives:
  - "**Deconstruct** complex AI product trade-offs into rigorous, auditable mathematical models linking compute costs directly to gross margin and user retention."
  - "**Master** the four strategic AI product cases: Quick-Commerce automated refund fraud trade-offs, three-tier cascade routing, legal contract KV context caching break-even, and human-in-the-loop escalation calibration."
  - "**Execute** quantitative PM estimation across multi-agent latency budgets, eval suite statistical power, synthetic test data generation frontiers, and self-hosted GPU cluster crossover volume."
  - "**Synthesize** technical engineering constraints with commercial business outcomes, defending product decisions in executive boardrooms and senior PM interview loops."
---

In a final-round product leadership interview at Google, Microsoft, Amazon, Swiggy, or CRED, candidates frequently fail within the first fifteen minutes. They fail not because they lack strategic vision or user empathy, but because they treat machine learning as an aesthetic layer. When asked to evaluate an AI-powered customer dispute engine or an automated contract review copilot, untrained candidates sketch user personas, list generic natural language prompts, and promise that a frontier model will delight enterprise customers. In modern software engineering, that level of hand-waving is disqualifying. Probabilistic systems do not behave like classical relational databases. An AI feature consumes variable tokens on every interaction, introduces non-linear latency curves that directly suppress user conversion, and generates a long tail of stochastic hallucinations that expose the balance sheet to regulatory fines and customer fraud. ==In artificial intelligence product management, qualitative intuition is an expensive liability; every architectural choice—from routing cascades and context caching to evaluation harnesses and escalation gates—is an empirical optimization problem governed by marginal unit economics, latency physics, and statistical error tolerances.==

## The quantitative laws of AI product management

To structure executive decisions and survive technical interview loops, product leaders ground their analysis in six computational and economic first principles:

::: principle The quantitative laws of AI product management
1. A product case interview evaluates your ability to deconstruct ambiguous trade-offs, formulate explicit mathematical models, and defend actionable decisions under commercial and computational constraints.
2. Neural models introduce three distinct cost vectors: variable token inference fees, latency penalties that degrade user retention, and downstream error liability costs.
3. Deterministic specifications cannot bind probabilistic token distributions; quality contracts must be expressed as statistical intervals over automated evaluation suites.
4. Caching key-value attention states converts quadratic prompt prefill costs into negligible linear read overhead once query arrival velocity exceeds break-even ($Q^*$).
5. Hierarchical routing cascades exploit the Pareto distribution of query complexity, directing simple tasks to low-cost local models while preserving frontier reasoning budgets for ambiguous queries.
6. Winning in a quantitative AI product interview requires tracing the complete system chain: from token throughput and ROC operating thresholds to gross margin expansion and defensible enterprise value.
:::

::: concept Quantitative AI Case Framework
**Plain words.** A structured interview methodology where a product manager decomposes an ambiguous AI operational dilemma into explicit unit costs, statistical error boundaries, latency physics, and commercial trade-offs.

**Analogy.** An aeronautical flight envelope test: an engineer does not evaluate an aircraft by saying it "flies nicely"; they quantify the exact boundaries of airspeed, altitude, wing loading, and stall margins before clearing passengers for takeoff.

**Misconception.** *"Product managers only need to understand user journeys, while engineers handle model costs and latency."* In AI systems, inference latency determines user drop-off, token consumption dictates gross margins, and model error distributions define corporate legal liability. An AI PM who cannot calculate these trade-offs cannot design a viable product.
:::

This casebook covers eight quantitative archetypes spanning modern enterprise operations. The first four examine strategic system designs: fraud-versus-churn trade-offs in quick-commerce, multi-tier cascade routing in fintech, [[context-caching]] versus chunked retrieval in legal contracts, and human-in-the-loop escalation calibration under asymmetric loss. The subsequent four examine quantitative estimation: multi-agent [[latency-budget|latency budgeting]], [[eval-harness|eval suite]] statistical power, [[synthetic-evals|synthetic data]] Pareto frontiers, and self-hosted GPU cluster crossover volume.

{{figure product-casebook | The AI product management decision matrix: Four strategic operational cases on the left, and four quantitative estimation models on the right. | Sources: Anthropic (2024); Google DeepMind (2024); OpenAI (2024); SVPG (2024)}}

::: stat 82.9% & 14.3x
The monthly compute cost reduction achieved by replacing a monolithic frontier API with a three-tier cascade routing engine at 10 million queries, alongside the risk-adjusted cost advantage of long-context prompt caching over chunked vector RAG for enterprise legal contracts.
<span class="src">Sources: [@anthropic-context-caching] [@google-gemini-long-context]</span>
:::

## Four strategic production cases

::: case Case 1: Quick-Commerce automated refunds and fraud trade-off
#### The situation
A leading Indian 10-minute quick-commerce platform delivers 1,500,000 grocery and consumer goods orders daily across eight metropolitan territories. Approximately 3.2% of orders generate customer refund claims (48,000 refund tickets daily) for missing items, rotten produce, spilled dairy, or damaged packaging.
- Average Order Value ($AOV$): ₹480; Average refund claim: ₹220.
- Customer Lifetime Value ($LTV$): ₹18,000, with an 8% annual churn probability triggered by unresolved support friction.
- Existing workflow: 100% human agent review. BPO handling cost = ₹24 per ticket (4.5 minutes average handling time); median customer wait time is 18 minutes.
- The operational dilemma: Slow resolution drives customer attrition among high-value cohorts. However, switching to unconditional, instant refunds causes opportunistic fraud to jump from 4% to 19% of claims, leaking ₹20.06 lakh daily (₹73.2 crore annually).

#### The analytical core
1. *Multimodal Signal Pipeline:*
   - The user submits an image of the damaged product.
   - An 8B parameter Vision-Language Model (VLM) extracts visual condition, seal integrity, and packaging anomalies ($C_{\text{infer}} = \text{₹}0.40$ per call, $800\text{ms}$ latency).
   - An ensemble scoring engine combines VLM telemetry with historical refund frequency, customer tenure, dark-store dispatch weights, and delivery partner GPS proximity to generate a calibrated fraud probability score $s \in [0, 1]$.
2. *The Tri-Tier Operating Boundaries:*
   - Tier 1: Auto-Approve ($s < \theta_L$). Instant refund via UPI within three seconds.
   - Tier 2: Human Escalation ($\theta_L \le s < \theta_H$). Routed to priority customer support with pre-highlighted anomaly markers.
   - Tier 3: Auto-Reject / Physical Verification ($s \ge \theta_H$).
3. *Cost Optimization Model:*
   $$\text{Total Daily Cost} = N \cdot \left[ C_{\text{infer}} + P(s < \theta_L) \cdot C_{\text{fraud\_leak}} + P(\theta_L \le s < \theta_H) \cdot C_{\text{review}} + P(s \ge \theta_L \mid \text{Honest}) \cdot C_{\text{churn}} \right]$$
   Where $N = 48{,}000$, $C_{\text{infer}} = \text{₹}0.40$, $C_{\text{review}} = \text{₹}24.00$, and $C_{\text{churn}} = \text{₹}18{,}000 \times 0.08 = \text{₹}1{,}440$.
4. *Calibrating Operating Thresholds ($\theta_L = 0.15, \theta_H = 0.72$):*
   - Auto-Approve ($s < 0.15$): Captures 74% of claims (35,520 tickets/day). The false positive fraud rate is bounded below 0.6%, resulting in daily fraud leakage of $35{,}520 \times 0.006 \times \text{₹}220 = \text{₹}46{,}886$.
   - Human Review ($0.15 \le s < 0.72$): Captures 21% of claims (10,080 tickets/day). BPO review spend drops to $10{,}080 \times \text{₹}24 = \text{₹}2{,}41{,}920$ daily (a 79% reduction from the ₹11,52,000 baseline).
   - Auto-Reject / Store Audit ($s \ge 0.72$): Captures 5% of claims (2,400 tickets/day).

#### Financial comparison and impact
- Baseline Human Review Cost: $48{,}000 \times \text{₹}24 = \text{₹}11{,}52{,}000\text{/day}$ plus churn losses.
- Tri-Tier Automated Engine Cost:
  $$\text{Spend}_{\text{infer}} = 48{,}000 \times \text{₹}0.40 = \text{₹}19{,}200$$
  $$\text{Spend}_{\text{human}} = 10{,}080 \times \text{₹}24.00 = \text{₹}2{,}41{,}920$$
  $$\text{Spend}_{\text{fraud\_leak}} = \text{₹}46{,}886$$
  $$\text{Total Daily Spend} = \text{₹}19{,}200 + \text{₹}2{,}41{,}920 + \text{₹}46{,}886 = \mathbf{\text{₹}3{,}08{,}006\text{/day}}$$
- **Direct Operational Savings:** $\text{₹}11{,}52{,}000 - \text{₹}3{,}08{,}006 = \mathbf{\text{₹}8{,}43{,}994\text{/day}}$ ($\mathbf{\text{₹}30.8\text{ crore/year}}$).
- Furthermore, resolving 74% of claims in under three seconds reduces customer churn by 65%, preserving ₹23.3 crore in annual customer lifetime gross profit.
- **Combined Annual Enterprise Value:** $\mathbf{\text{₹}54.1\text{ crore/year}}$.
:::

==In high-velocity consumer operations, automating trust is not an all-or-nothing binary; tri-tier risk partitioning—auto-approving low-risk claims while reserving human review for ambiguous boundaries—maximizes customer retention while compressing fraud leakage to negligible margins.==

::: case Case 2: FinTech three-tier cascade routing economic optimization
#### The situation
An Indian payments super-app processes 10,000,000 customer service interactions monthly across UPI transfers, merchant QR soundboxes, micro-lending, and utility billings.
- The existing design routes 100% of customer support queries to a commercial frontier reasoning model API (Claude 3.5 Sonnet / GPT-4o).
- Monthly compute expenditure stands at ₹8.50 crore ($10\text{M} \times \text{₹}0.850\text{/query}$).
- Median response latency is 2,100 milliseconds, causing customer abandonment on mobile data connections.

#### The architectural core
Deploy a three-tier [[model-routing|cascade router]] that directs queries according to semantic complexity:
1. **Tier 1: Semantic Intent Cache & Rules Engine:**
   - Matches deterministic intents ("What is my soundbox balance?", "Show last 3 transactions", "UPI payment pending").
   - Volume: 42% of queries (4,200,000 queries/month).
   - Unit Cost: ₹0.002 per lookup (Redis Vector Search + backend database query). Latency: $p95 = 45\text{ms}$.
2. **Tier 2: Fine-Tuned 8B Parameter SLM (vLLM Cluster):**
   - Handles semi-structured natural language inquiries: chargeback procedures, KYC verification steps, and transaction dispute explanations.
   - Architecture: Llama-3-8B fine-tuned on 200,000 historical support transcripts.
   - Gating mechanism: If classification softmax confidence score $p \ge 0.88$, emit completion; otherwise, fall through to Tier 3.
   - Volume: 43% of total volume (4,300,000 queries/month) resolved with 98.7% verified accuracy.
   - Unit Cost: ₹0.040 per query (amortized server hardware). Latency: $p95 = 240\text{ms}$.
3. **Tier 3: Frontier Reasoning Engine (Claude 3.5 Sonnet):**
   - Handles complex, multi-turn disputes, potential fraud escalations, and ambiguous edge cases.
   - Volume: 15% of queries (1,500,000 queries/month).
   - Unit Cost: ₹0.850 per query ($3.00/M input, $15.00/M output). Latency: $p95 = 1{,}850\text{ms}$.

#### Financial and latency optimization
- Baseline Monolithic Spend: $10{,}000{,}000 \times \text{₹}0.850 = \mathbf{\text{₹}8.500\text{ crore/month}}$.
- Cascade Architecture Spend:
  $$\text{Spend}_{\text{Tier1}} = 4{,}200{,}000 \times \text{₹}0.002 = \text{₹}0.0084\text{ Cr}$$
  $$\text{Spend}_{\text{Tier2}} = 4{,}300{,}000 \times \text{₹}0.040 = \text{₹}0.1720\text{ Cr}$$
  $$\text{Spend}_{\text{Tier3}} = 1{,}500{,}000 \times \text{₹}0.850 = \text{₹}1.2750\text{ Cr}$$
  $$\text{Total Spend} = \text{₹}0.0084 + \text{₹}0.1720 + \text{₹}1.2750 = \mathbf{\text{₹}1.4554\text{ crore/month}}$$
- **Net Monthly Financial Savings:** $\text{₹}8.500\text{ Cr} - \text{₹}1.4554\text{ Cr} = \mathbf{\text{₹}7.0446\text{ crore/month}}\quad (\mathbf{82.9\%\text{ reduction}})$.
- **Weighted Average Latency:**
  $$\bar{L} = (0.42 \times 45) + (0.43 \times 240) + (0.15 \times 1{,}850) = 18.9 + 103.2 + 277.5 = \mathbf{399.6\text{ ms}}$$
  (An **81.0% improvement** from the 2,100ms baseline).
:::

==A monolithic frontier model architecture is an engineering anti-pattern; cascading queries through semantic caches and specialized small language models slashes compute expenditure by over eighty percent while dragging response latency below human conversational thresholds.==

::: case Case 3: LegalTech prompt caching versus chunked vector RAG
#### The situation
An enterprise B2B LegalTech platform analyzes 300-page complex commercial contracts, Master Services Agreements (MSAs), and financial prospectuses (~120,000 tokens per document).
- The incumbent system uses Vector RAG: agreements are chunked into 500-token snippets ($k=5$ retrieval).
- Due to cross-clause dependencies (such as limitation of liability clauses modifying indemnification obligations located 150 pages earlier), chunked RAG exhibits a 22% retrieval recall failure rate, producing a 14% hallucination rate.
- The product team evaluates full-document [[context-caching|KV prompt caching]] using long-context models [@google-gemini-long-context].

#### Unit economics comparison
1. *Vector RAG Economics:*
   - Vector database search and document chunking amortized cost = $0.0035 per query.
   - Model input tokens: 5 chunks $\times 500 = 2{,}500$ context tokens + 500 query tokens = 3,000 tokens ($3.00/M tokens = $0.0090).
   - Output tokens: 400 tokens ($15.00/M tokens = $0.0060).
   - Pure Token Cost: $\$0.0035 + \$0.0090 + \$0.0060 = \mathbf{\$0.0185\text{ per query}}$.
   - Downstream Risk Liability: A 14% hallucination rate requires senior legal counsel intervention, with an average rectification cost of $25.00 per error ($0.14 \times \$25.00 = \$3.50$ per query risk premium).
   - **Risk-Adjusted RAG Cost:** $\$0.0185 + \$3.5000 = \mathbf{\$3.5185\text{ per query}}$.
2. *Long-Context Prompt Caching Economics:*
   - Cache Creation Fee (Write): 120,000 tokens $\times \$3.75/1\text{M tokens} = \mathbf{\$0.450}$ (one-time write fee per 5-minute TTL).
   - Cache Read Fee (Hit): 120,000 tokens $\times \$0.30/1\text{M tokens} = \mathbf{\$0.0360}$.
   - Query + output token fee: $(1{,}000 \times \$3.00/1\text{M}) + (400 \times \$15.00/1\text{M}) = \$0.0090$.
   - Pure Token Cost per Query: $\$0.0360 + \$0.0090 = \mathbf{\$0.0450\text{ per query}}$.
   - Downstream Risk Liability: Near-perfect retrieval recall across the 120,000 tokens compresses hallucinations to 0.8% ($0.008 \times \$25.00 = \$0.20$ risk premium).
   - **Risk-Adjusted Cached Cost:** $\$0.0450 + \$0.2000 = \mathbf{\$0.2450\text{ per query}}$.
3. *Break-Even Derivation ($Q^*$):*
   $$\text{Cost}_{\text{Cache}}(Q) \le \text{Cost}_{\text{RAG}}(Q)$$
   $$\$0.450 + Q \times \$0.2450 \le Q \times \$3.5185 \implies Q \ge \frac{0.450}{3.5185 - 0.2450} = \frac{0.450}{3.2735} \approx \mathbf{0.14\text{ queries}}$$
   Long-context prompt caching delivers a **14.3x risk-adjusted cost advantage** from the very first question!
:::

==Evaluating AI product economics on raw API token pricing alone is a lethal executive blindspot; when downstream error remediation and human audit costs are incorporated, high-context prompt caching is orders of magnitude cheaper than brittle chunked vector retrieval.==

::: case Case 4: Human-in-the-loop escalation routing and blast radius calibration
#### The situation
An enterprise accounts payable automation platform processes 500,000 supplier invoices monthly, ranging from ₹50,000 to ₹25,00,000 per invoice.
- Releasing an incorrect or fraudulent payment carries catastrophic financial blast radius: an average unrecoverable loss of 45% of face value in legal disputes and vendor defaults ($C_{\text{FP}} = 0.45 \times \text{₹}1{,}80{,}000 = \text{₹}81{,}000$).
- Escalating a valid invoice to human clerical review costs ₹180 in finance staff time ($C_{\text{FN}} = \text{₹}180$).
- Cost asymmetry ratio: $\frac{C_{\text{FP}}}{C_{\text{FN}}} = \frac{\text{₹}81{,}000}{\text{₹}180} = \mathbf{450:1}$.

#### Bayes optimal threshold derivation
Let model confidence score for invoice match validity be $p \in [0, 1]$. Let the baseline fraud/error rate be $1 - \pi = 0.03$ (3% base rate).
The optimal operating threshold $\theta^*$ that minimizes total enterprise loss is derived from Bayes decision theory:
$$\theta^* = \frac{C_{\text{FP}} \cdot (1 - \pi)}{C_{\text{FP}} \cdot (1 - \pi) + C_{\text{FN}} \cdot \pi} = \frac{81{,}000 \times 0.03}{(81{,}000 \times 0.03) + (180 \times 0.97)} = \frac{2{,}430}{2{,}430 + 174.6} = \mathbf{0.933}$$
To minimize enterprise financial losses, the automated agent must not auto-approve any invoice unless its confidence exceeds **93.3%**!

#### Graduated blast radius tiering
| Tier | Transaction Face Value | Confidence Cutoff | Autonomous Rate | Governance Gate |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1 (Low)** | $< \text{₹}10{,}000$ | $\theta_1 = 0.75$ | 88% (264,000 invoices) | Auto-execute + ambient audit log |
| **Tier 2 (Medium)** | $\text{₹}10{,}000\text{--}\text{₹}2{,}00{,}000$ | $\theta_2 = 0.933$ | 68% (108,800 invoices) | 32% single-clerk review diff HUD |
| **Tier 3 (High)** | $> \text{₹}2{,}00{,}000$ | $\theta_3 = 1.000$ | **0% (0 invoices)** | Mandatory dual-key sign-off |

Total human reviews drop from 500,000 to 127,200 monthly—a 74.6% reduction in clerical labor that saves ₹6.71 crore monthly while eliminating payment leakage on high-value contracts.
:::

## Four quantitative estimation models

::: case Estimation 1: Multi-agent customer support latency budgeting
#### The estimation prompt
An enterprise e-commerce platform designs an autonomous customer support agent executing a 5-step loop: Intent Classification $\to$ Context Retrieval & Order DB Lookup $\to$ Multi-Agent Reasoning / Tool Call $\to$ Response Synthesis & Streaming. Model the end-to-end latency budget against human cognitive wait tolerance thresholds [@card-moran-newell-psychology-hci]. Identify the operational bottleneck and engineer a compliant architecture.

#### Mathematical decomposition
1. *Unoptimized Sequential Execution Breakdown:*
   - Client network transit & TLS handshake ($T_{\text{net}}$): $120\text{ms}$.
   - Intent classification (LLM call): $650\text{ms}$.
   - Vector RAG search & SQL order lookup ($T_{\text{data}}$): $450\text{ms}$.
   - Multi-agent reasoning (2 sequential uncached LLM calls with 12,000 context tokens):
     - Attention prefill compute: $2 \times 1{,}400\text{ms} = 2{,}800\text{ms}$.
     - Generation decode (300 tokens each @ 50 TPS): $2 \times \frac{300}{50} = 12{,}000\text{ms}$.
   - Final synthesis and markdown streaming (200 tokens @ 50 TPS): $\frac{200}{50} = 4{,}000\text{ms}$.
   - **Total End-to-End Latency:**
     $$T_{\text{total}} = 120 + 650 + 450 + 2{,}800 + 12{,}000 + 4{,}000 = \mathbf{20{,}020\text{ ms}}\quad (\mathbf{20.02\text{ seconds}})$$
   - *Operational Bottleneck:* 20.02 seconds breaches the 10-second cognitive abandonment boundary [@card-moran-newell-psychology-hci], causing 42% of mobile users to drop off.
2. *Re-Architected Latency-Budgeted Pipeline:*
   - Parallel Speculative Prefetch: Run intent classification and SQL order prefetch concurrently in $150\text{ms}$.
   - KV Prompt Caching: System instructions and tool schemas cached in memory; prefill drops from 1,400ms to $280\text{ms}$.
   - Speculative Decoding: Deploy small draft models to accelerate generation decode from 50 TPS to $160\text{ TPS}$.
   - Progressive Status Chips: Render micro-status chips ("Checking order history...") within $200\text{ms}$.
   - **Optimized Performance:**
     - Time-to-First-Token ($TTFT$): $120\text{ms} + 150\text{ms} + 280\text{ms} = \mathbf{550\text{ ms}}$ ($\le 1.0\text{s}$ conversational SLA satisfied!).
     - Generation duration: $\frac{200}{160} = 1{,}250\text{ms}$.
     - Complete response rendered in $\mathbf{1{,}800\text{ ms}}$ (1.8s vs. 20.02s; a **91% latency collapse**).
:::

::: case Estimation 2: Enterprise eval harness ROI and sample sizing
#### The estimation prompt
Calculate the minimum sample size required for an automated CI/CD golden eval suite to detect a 1.5% regression in model faithfulness (from 98.0% baseline to 96.5%) at 95% confidence ($\alpha = 0.05$) and 80% statistical power ($\beta = 0.20$). Calculate the daily financial cost of running this harness across 20 engineering pull requests.

#### Mathematical derivation
1. *Two-Proportion Z-Test Sample Sizing Formula:*
   $$n = \frac{\left(z_{\alpha/2}\sqrt{2\bar{p}(1-\bar{p})} + z_\beta\sqrt{p_1(1-p_1) + p_2(1-p_2)}\right)^2}{(p_1 - p_2)^2}$$
   - Parameters: $p_1 = 0.980$, $p_2 = 0.965$, $\Delta = 0.015$, Pooled proportion $\bar{p} = 0.9725$.
   - Critical values: $z_{\alpha/2} = 1.96$ (for $\alpha = 0.05$), $z_\beta = 0.84$ (for power $0.80$).
   - Arithmetic:
     $$\bar{p}(1-\bar{p}) = 0.9725 \times 0.0275 = 0.026744 \implies \sqrt{2 \times 0.026744} = 0.23127$$
     $$\sqrt{p_1(1-p_1) + p_2(1-p_2)} = \sqrt{(0.98 \times 0.02) + (0.965 \times 0.035)} = \sqrt{0.053375} = 0.23103$$
     $$\text{Numerator} = (1.96 \times 0.23127 + 0.84 \times 0.23103)^2 = (0.45329 + 0.19407)^2 = (0.64736)^2 \approx 0.41908$$
     $$\text{Denominator} = (0.015)^2 = 0.000225$$
     $$n = \frac{0.41908}{0.000225} \approx \mathbf{1{,}863\text{ test cases}}$$
2. *The Small-Sample Delusion:* If a team tests only 50 sample prompts ($n=50$) and observes 49 successes (98.0%), the 95% Wilson score confidence interval is $[89.5\%, 99.6\%]$. The 10.1% confidence band is seven times larger than the 1.5% regression, leaving the team blind to catastrophic failure!
3. *Daily CI/CD Compute Cost:*
   - 20 PRs daily evaluated via fast evaluator model (Claude 3.5 Haiku at $0.80/M input, $4.00/M output; 1,500 input, 300 output tokens per case).
   - Cost per run: $(1{,}863 \times 1{,}500 \times \$0.80/1\text{M}) + (1{,}863 \times 300 \times \$4.00/1\text{M}) = \$2.24 + \$2.24 = \mathbf{\$4.48}$.
   - Daily spend across 20 PRs: $20 \times \$4.48 = \mathbf{\$89.60\text{/day}}$ ($\approx \$2{,}688\text{/month}$ or ₹2.28 lakh/month).
:::

==Testing an AI product on fifty sample prompts is statistical theater; detecting subtle production regressions requires sizing golden evaluation suites to statistical power, bounding false clearances before code touches enterprise traffic.==

::: case Estimation 3: Synthetic test data generation versus human annotation frontier
#### The estimation prompt
A product team requires 50,000 verified, labeled edge cases to train and benchmark an insurance claims triage model across 10 regional dialects. Construct the cost-accuracy frontier comparing Option A (Pure Human Expert Annotation) versus Option B (Synthetic Generation with Multi-Perspective LLM Verification and Human Spot-Audit).

#### Mathematical decomposition
1. *Option A: Pure Human Expert Annotation:*
   - Domain experts cost ₹350 per hour and analyze 12 complex claims hourly $\implies \text{₹}29.17$ per record.
   - Dual-annotator agreement protocol with 20% tie-breaker adjudication: $2.2 \times \text{₹}29.17 = \mathbf{\text{₹}64.17\text{ per verified record}}$.
   - Total Cost: $50{,}000 \times \text{₹}64.17 = \mathbf{\text{₹}32{,}08{,}500}$ ($\approx \$37{,}750$).
   - Production Timeline: 10 annotators working 40 hours weekly require **10.4 weeks** (2.5 months).
2. *Option B: Synthetic Generation with Programmatic Filtering:*
   - Seed perturbation via frontier model ($1{,}200$ prompt, $400$ completion tokens) costs ₹0.82 per candidate; automated schema/AST filtering costs ₹0.15.
   - Rejection rate: 35% of synthetic samples fail schema, consistency, or diversity checks.
   - Raw volume generated: $N_{\text{raw}} = \frac{50{,}000}{0.65} = 76{,}923$ candidates $\implies 76{,}923 \times (\text{₹}0.82 + \text{₹}0.15) = \mathbf{\text{₹}7{,}46{,}153}$.
   - Stratified Human Audit Panel (5% spot-check = 2,500 records @ ₹64.17): $\mathbf{\text{₹}1{,}60{,}425}$.
   - Total Hybrid Spend: $\text{₹}7{,}46{,}153 + \text{₹}1{,}60{,}425 = \mathbf{\text{₹}9{,}06{,}578}$ ($\approx \$10{,}665$).
   - **Cost Savings:** $\text{₹}32.09\text{L} - \text{₹}9.07\text{L} = \mathbf{\text{₹}23.02\text{ lakh}}$ (**71.8% savings**).
   - **Time to Delivery:** 48 hours of cloud compute versus 10.4 weeks of human labeling.
3. *Accuracy Frontier:* Pure synthetic yields 91.2% accuracy due to mode collapse; hybrid (95% filtered synthetic + 5% human audit) achieves **97.8% verified accuracy**, rivaling the 98.1% pure human baseline.
:::

::: case Estimation 4: Self-hosted GPU cluster versus frontier API TCO crossover volume
#### The estimation prompt
A healthcare network processes 50,000 inpatient medical records monthly (2,500 input tokens, 400 output tokens for ICD-10 diagnostic coding). Compare the Total Cost of Ownership (TCO) between Option A: Commercial Frontier API versus Option B: Self-Hosted Fine-Tuned 70B Model on AWS. Calculate the volume crossover point ($V^*$).

#### Mathematical derivation
1. *Option A: Commercial Frontier API (Claude 3.5 Sonnet):*
   - Token pricing: $3.00/1M input, $15.00/1M output.
   - Variable cost per document:
     $$c_{\text{API}} = \left(\frac{2{,}500}{1\text{M}} \times \$3.00\right) + \left(\frac{400}{1\text{M}} \times \$15.00\right) = \$0.0075 + \$0.0060 = \mathbf{\$0.0135\text{ per record}}\quad (\approx \text{₹}1.15)$$
   - Monthly Spend at 50,000 documents: $50{,}000 \times \$0.0135 = \mathbf{\$675\text{/month}}$ ($\approx \text{₹}57{,}375\text{/month}$).
2. *Option B: Self-Hosted Fine-Tuned 70B Model (vLLM Cluster on AWS):*
   - 1x `g6e.12xlarge` instance (4x NVIDIA L40S 48GB GPUs) 1-year reserved = $\mathbf{\$3{,}850\text{/month}}$.
   - High-throughput NVMe storage, VPC networking, and logging = $\mathbf{\$450\text{/month}}$.
   - Fine-tuning dataset pipeline and continuous retraining amortized = $\mathbf{\$1{,}250\text{/month}}$.
   - Dedicated MLOps maintenance (0.25 FTE loaded engineer @ $14,000/mo) = $\mathbf{\$3{,}500\text{/month}}$.
   - Fixed Monthly Self-Hosted TCO: $F_{\text{self}} = \$3{,}850 + \$450 + \$1{,}250 + \$3{,}500 = \mathbf{\$9{,}050\text{/month}}$ ($\approx \text{₹}7{,}69{,}250\text{/month}$).
3. *Volume Crossover Point ($V^*$):*
   $$V^* \times c_{\text{API}} = F_{\text{self}} \implies V^* = \frac{F_{\text{self}}}{c_{\text{API}}} = \frac{\$9{,}050}{\$0.0135} \approx \mathbf{670{,}370\text{ records/month}}$$
   At 50,000 records, self-hosting is **13.4x more expensive** than using a frontier API! Self-hosting destroys capital until monthly volume exceeds 670,000 records.
:::

==Self-hosting open-source foundation models before crossing the volume crossover threshold is corporate capital destruction; until monthly query volumes exceed six hundred thousand transactions, commercial frontier APIs deliver superior capability at a fraction of the total cost of ownership.==

## Cross-disciplinary lenses

::: lens product
In AI product management, unit margins are architectural choices. A product manager who routes 100% of queries to a frontier model destroys gross margins; a product manager who implements cascade routing, context caching, and statistical escalation boundaries builds sustainable software economics.
:::

::: lens consulting
Management consultants evaluating AI transformation roadmaps must audit vendor claims against the 8 quantitative archetypes. When an enterprise software vendor pitches a custom self-hosted GPU cluster, consultants calculate the crossover volume ($V^*$) to determine whether the proposal creates enterprise value or burns capital.
:::

## In the interview room: defending an AI product architecture

::: interview Defending an AI product architecture in executive review
**Q.** *"Our enterprise SaaS product serves 10 million queries a month using a single frontier LLM API. The CFO demands a 60% reduction in our ₹8 crore monthly AI compute bill within ninety days, but our enterprise clients contractually demand 99% accuracy. As Vice President of Product, what architectural turnaround do you present to the executive committee?"*

> "Slashing compute costs without sacrificing accuracy is achieved not by negotiating token discounts, but by decomposing monolithic queries into a three-tier routing cascade—diverting deterministic and simple intents to semantic caches and local small language models while reserving frontier reasoning models for ambiguous edge cases."

**What they are testing.** Understanding of model cascade economics, confidence threshold calibration, latency budgeting, and executive communication under commercial pressure.

**A strong structure.**
1. **Expose the Monolithic Fallacy:** Explain why sending 100% of queries to frontier models wastes compute on low-complexity intents.
2. **Present the 3-Tier Cascade:** Detail the breakdown (42% cache, 43% 8B SLM, 15% frontier reasoning).
3. **Walk the Financial Math:** Demonstrate the reduction from ₹8.50 Cr to ₹1.46 Cr monthly (an 82.9% savings, exceeding the 60% mandate).
4. **Prove Latency Improvement:** Show weighted average latency dropping from 2,100ms to 400ms.
5. **Quality Guardrails:** Establish the 1,863-case automated evaluation harness to verify the contractual 99% accuracy SLA on every code deployment.
:::

## Hands-on exercise: trade-off simulator

::: try Quantitative AI product trade-off simulator
Paste the following prompt into Claude, ChatGPT, or Gemini to simulate an executive interview trade-off challenge:

```text
You are an executive AI product consultant evaluating a candidate in a VP of Product interview.
Scenario:
A customer support copilot handles 5,000,000 queries monthly.
Current state: 100% routed to frontier API ($3.00/M input, $15.00/M output; avg 2,000 input, 300 output tokens). Latency = 2.4s.

Propose:
1. KV Context Caching for a 60,000-token knowledge base (TTL = 5 min; Cache write = $3.75/M, Cache read = $0.30/M).
2. A 3-tier cascade: 35% Cache/API ($0.001/query), 45% 8B SLM ($0.035/query), 20% Frontier API ($0.0105/query).

Calculate:
1. Break-even query velocity Q* for prompt caching.
2. Monthly compute spend baseline vs. optimized cascade.
3. Net annual savings in USD and INR (@ Rs 85/USD).
4. Weighted average latency under the cascade.
```
:::

## Recommended reading & media

{{read anthropic-context-caching}}

{{read openai-evals-framework}}

{{paper google-gemini-long-context}}

::: check Check yourself
1. In quick-commerce automated refunds, what is the economic justification for auto-approving refund claims below a fraud risk threshold rather than reviewing 100% of claims with human agents? <span class="lvl">recall</span>
2. Why does a small sample size ($n=50$) in an automated eval suite fail to detect a 1.5% accuracy regression, and how does the Wilson score interval expose this failure? <span class="lvl">explain</span>
3. A LegalTech assistant analyzes 120,000-token contracts. If cache creation costs $3.75/M tokens, cache reading costs $0.30/M tokens, and uncached input costs $3.00/M tokens, calculate the break-even query velocity within a 5-minute TTL window. <span class="lvl">apply</span>
4. An enterprise FinTech platform routes payment dispute queries through a three-tier cascade. If the Tier 2 SLM has an accuracy of 98.5% and costs ₹0.040 per query, how should the product manager calibrate the confidence threshold to balance cost savings against error liability? <span class="lvl">transfer</span>
5. How should a Chief Product Officer evaluate an engineering proposal to spend ₹75 lakh building an on-premise GPU cluster to self-host open-source models for a product handling 40,000 monthly transactions? <span class="lvl">judge</span>
:::

::: answers
1. Auto-approving low-risk claims ($s < \theta_L$) eliminates human review expenses (₹24 per ticket) and compresses customer wait time from 18 minutes to under 3 seconds. The resulting reduction in customer churn among high-LTV cohorts dramatically outweighs the tiny residual fraud leakage (under 0.6%), generating ₹54.1 crore in net annual enterprise value.
2. An evaluation suite of 50 test cases produces a wide 95% Wilson score confidence interval span of 10.1% ($[89.5\%, 99.6\%]$). Because this uncertainty interval is nearly seven times larger than the 1.5% regression, the test suite is statistically underpowered and will fail to detect real production regressions. Detecting a 1.5% shift at 80% power requires $n=1{,}863$ test cases.
3. Pure token break-even is $Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}} = \frac{\$3.75 - \$0.30}{\$3.00 - \$0.30} = \frac{\$3.45}{\$2.70} \approx \mathbf{1.28\text{ queries}}$. Within any 5-minute TTL window, the moment a user asks two questions against the same document, prompt caching is cheaper than uncached input.
4. The product manager derives the optimal confidence threshold $\theta^*$ using Bayes decision theory: $\theta^* = \frac{C_{\text{FP}}(1 - \pi)}{C_{\text{FP}}(1 - \pi) + C_{\text{FN}}\pi}$. If the downstream liability of a misclassified dispute ($C_{\text{FP}}$) is high relative to human review costs ($C_{\text{FN}}$), $\theta^*$ must be set high (e.g., $\ge 0.88$), routing ambiguous queries to the frontier model while capturing the 80%+ volume savings on routine cases.
5. Reject the proposal. At 40,000 monthly transactions, commercial frontier APIs cost approximately $540 monthly (₹45,900/month). A dedicated GPU cluster carries fixed hardware, networking, and MLOps maintenance costs exceeding $9,050 monthly (₹7,69,250/month). Self-hosting destroys capital until monthly transaction volume crosses $V^* \approx 670{,}370$ records.
:::

::: recap The night-before page
1. The eight quantitative PM archetypes: Quick-Commerce refunds, cascade routing, legal KV caching, HITL escalation, latency budgeting, eval sizing, synthetic data frontiers, and GPU TCO crossover.
2. Never evaluate AI products on token fees alone: Raw API pricing is trivial compared to the downstream costs of human review friction, customer churn, and false positive liability.
3. The prompt caching velocity rule: KV context caching breaks even at two queries per TTL window; in multi-turn document sessions, it slashes compute costs by 80% and prefill latency by 90%.
4. Cascade queries across model tiers: Direct 80%+ of volume to semantic caches and local 8B SLMs; reserve expensive frontier reasoning models strictly for ambiguous edge cases.
5. Respect the self-hosting crossover threshold: Dedicated on-premise GPU clusters destroy capital below 670,000 documents monthly; leverage commercial frontier APIs until transaction scale justifies fixed infrastructure.
:::
