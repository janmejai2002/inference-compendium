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

A user types an inquiry into a modern financial search bar: *"Compare capital gains tax liability on equity versus debt mutual funds held for two years under the latest Indian Finance Act."* The interface locks. The submit button freezes. For 4.2 seconds, the screen presents a blank canvas before a generic loading spinner appears. At 7.8 seconds, a dense 400-word paragraph abruptly pops into the viewport. Although the tax calculation is mathematically sound, the customer experiences the interface as broken, sluggish, and unresponsive. Human interaction with software is bounded by biological constants. In their foundational cognitive architecture research, Stuart Card, Thomas Moran, and Allen Newell established that human perception operates on rigid neurological thresholds: 100 milliseconds feels instantaneous, 1,000 milliseconds preserves the unbroken train of thought, and 10 seconds marks the absolute boundary of user attention [@card-moran-newell-psychology-hci]. When software violates those biological limits, cognitive engagement collapses. ==In generative product engineering, latency is not a technical afterthought—it is the primary determinant of cognitive engagement, user trust, and commercial retention.==

## Deconstructing the latency equation

In traditional web development, latency optimization focuses on database indexing, CDN caching, and minimizing network round-trips. When a query lands on an API gateway, backend servers execute deterministic logic in twenty milliseconds.

Large language models introduce an entirely different physical bottleneck. A transformer does not compute responses in a single clock cycle; it processes requests in two distinct computational phases: prompt prefill and autoregressive token generation.

| Latency Phase | Duration (ms) | Cumulative Timeline | Primary Driver / Optimization Seam |
|---|---:|---:|---|
| Network Transit | 100 ms | 0 – 100 ms | Client-to-cloud roundtrip transit |
| Database Retrieval | 150 ms | 100 – 250 ms | Vector search / RAG chunk lookup |
| TTFT Prefill (Cached) | 250 ms | 250 – 500 ms | KV cache lookup & attention prefill |
| Streaming Generation | 500 ms | 500 – 1,000 ms | 30 output tokens @ 60 TPS decode speed |
| **Total Response** | **1,000 ms** | **1.0 s SLA** | **Cognitive flow perception threshold** |

The total end-to-end response time is the additive sum of four distinct components:

$$\text{Latency}_{\text{total}} = T_{\text{network}} + T_{\text{queue}} + TTFT + \frac{N_{\text{output}}}{TPS}$$

Here:
- $T_{\text{network}}$ represents round-trip client-to-server TLS handshake and transmission latency.
- $T_{\text{queue}}$ represents the time a request waits in GPU scheduler queues before compute resources allocate.
- $TTFT$ (Time-to-First-Token) is the duration required to load the model weights, process prompt input tokens through the transformer attention layers, and emit the very first output token.
- $N_{\text{output}}$ is the number of tokens generated in the completion.
- $TPS$ (Tokens-Per-Second) represents the throughput rate of autoregressive token generation, bounded by GPU memory bandwidth and parameter size.

Understanding this equation reveals a fundamental user experience principle: streaming output tokens decouples the user's perception of speed from the total duration of generation. The average human silent reading speed is approximately 250 to 300 words per minute, equivalent to five words per second or roughly seven to eight tokens per second. If an inference engine streams tokens at $\ge 40\text{ TPS}$, generation outpaces the customer's reading speed. Consequently, the user's perceived latency is dictated entirely by Time-to-First-Token.

::: principle The latency budget hierarchy
1. Human cognitive perception is bounded by biological constants: 100 milliseconds is perceived as immediate direct manipulation, 1,000 milliseconds maintains fluid thought continuity, and 10 seconds represents the maximum tolerance for task completion [@card-moran-newell-psychology-hci].
2. Generative language models do not compute completions in a single instantaneous step; they process inputs through a prompt prefill phase followed by sequential autoregressive token generation.
3. Total end-to-end response time is the additive sum of network transit, server queue latency, Time-to-First-Token ($TTFT$), and token generation duration ($N_{\text{output}} / TPS$).
4. Streaming output tokens directly to the client interface decouples generation duration from perceived responsiveness; human latency perception anchors entirely to Time-to-First-Token.
5. In product architecture, every functional subsystem—vector search, semantic re-ranking, chain-of-thought tokens, guardrail verification—must purchase its millisecond allocation from a hard latency ceiling.
:::

::: concept Time-to-first-token and throughput
**Plain words.** Time-to-first-token is the awkward pause before the model starts speaking; tokens-per-second is how fast the words flow once it begins.

**Analogy.** Ordering at a fast-food drive-through. Time-to-first-token is the duration you wait at the window before the attendant hands you the first hot cup of chai; throughput is how quickly they place the remaining samosas on the tray. If the chai arrives instantly, you never mind waiting for the food.

**Misconception.** "Users care about the total time until the entire 500-word response finishes generating." In conversational interfaces, users begin reading the moment the first sentence streams; optimizing Time-to-First-Token creates the sensory illusion of instant software.
:::

## The physics and economics of context caching

In multi-turn chat applications and complex enterprise workflows, prompts grow rapidly. A customer support conversation incorporating account history, product manuals, and retrieved policy guidelines easily scales past 50,000 prompt tokens.

In a standard transformer forward pass, computing attention across $N$ prompt tokens requires $O(N^2)$ computational complexity. Every single API request recalculates the Key-Value (KV) attention matrices from scratch across the entire context prefix, even when 95% of that text remains unchanged across turns. This redundant attention calculation introduces massive prefill delays and burns server compute.

[[context-caching|Context caching]] resolves this inefficiency by preserving the precomputed KV activation tensors in GPU High-Bandwidth Memory (HBM) [@anthropic-context-caching] [@google-gemini-long-context]. When a subsequent request arrives sharing an identical prefix, the inference engine skips the attention calculation for the cached prefix and computes attention only for the newly appended delta tokens.

```
Uncached Inference:
[ System Prompt + 100k Doc ] ──► Full Prefill Compute (O(N²)) ──► Emit First Token (3,200ms)
                                       Cost: $3.00 / M tokens

Cached Inference:
[ KV Cache in GPU HBM ] ───────► Instant State Restore (O(1))  ──► Emit First Token (450ms)
[ New User Query (50 tokens) ] ─► Delta Compute Only            Cost: $0.30 / M tokens (90% off)
```

Cloud model providers structure prompt caching economics around three distinct pricing tiers:
- $C_{\text{write}}$: The cache write creation rate (typically charged at a 25% premium over standard input pricing, e.g., $1.25\times$).
- $C_{\text{read}}$: The cache read rate for subsequent requests hitting the cached prefix (typically discounted by 80% to 90%, e.g., $0.10\times\text{--}0.20\times$).
- $C_{\text{uncached}}$: The standard base input token rate ($1.00\times$).

To determine whether caching a specific document or system prompt delivers net financial savings, product managers calculate the break-even query velocity ($Q^*$). We equate the cumulative cost of serving $Q$ queries using context caching against serving them uncached:

$$C_{\text{write}} + (Q - 1) \cdot C_{\text{read}} = Q \cdot C_{\text{uncached}}$$

Solving for $Q^*$:

$$C_{\text{write}} - C_{\text{read}} = Q \cdot (C_{\text{uncached}} - C_{\text{read}})$$

$$Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}}$$

Consider standard commercial pricing for frontier models: $C_{\text{write}} = \$3.75/\text{M}$, $C_{\text{uncached}} = \$3.00/\text{M}$, and $C_{\text{read}} = \$0.30/\text{M}$. Substituting these figures:

$$Q^* = \frac{3.75 - 0.30}{3.00 - 0.30} = \frac{3.45}{2.70} \approx 1.28$$

Because queries arrive as discrete integers, the system breaks even and becomes net profitable on the second query ($\lceil 1.28 \rceil = 2$) within the memory Time-to-Live (TTL) window! Beyond query one (the cache write), every subsequent cache hit delivers an 85% reduction in Time-to-First-Token and a 90% reduction in marginal input token expenditure.

::: concept Context caching break-even
**Plain words.** The exact number of queries a user or system must run against a cached document within its memory lifespan to recoup the initial setup fee.

**Analogy.** Buying a wholesale warehouse membership. Paying the ₹1,000 upfront entry fee makes no financial sense if you buy a single loaf of bread, but pays for itself the moment you purchase your second bulk grocery order.

**Misconception.** "Context caching stores text answers like a web browser cache." Context caching does not store output text; it stores compiled neural attention weights (the Key-Value tensor) in GPU memory. The model then reasons across massive document prefixes with near-zero prefill compute.
:::

## Multi-tier cascade model routing

A frequent architectural anti-pattern is routing 100% of incoming application traffic to a commercial frontier reasoning model. While frontier engines demonstrate superior reasoning, utilizing them for routine conversational tasks burns capital and inflicts multi-second latency on straightforward queries.

Mature product architectures deploy a three-tier cascade [[model-routing]] topology:

```
                  ┌───────────────────────────────┐
                  │    Incoming User Query        │
                  └──────────────┬────────────────┘
                                 │
                   [ Deterministic Rule / Cache ]
                                 │
            ┌────────────────────┴────────────────────┐
            ▼ Match (42%)                             ▼ Miss (58%)
┌───────────────────────────────┐         ┌───────────────────────────────┐
│ Tier 1: Semantic Cache & API  │         │ Tier 2: Fine-Tuned 8B SLM     │
│ 45ms · ₹0.002 per call        │         │ 240ms · ₹0.040 per call       │
└───────────────────────────────┘         └──────────────┬────────────────┘
                                                         │
                                            Confidence Score θ ≥ 0.88?
                                                         │
                                    ┌────────────────────┴────────────────────┐
                                    ▼ Yes (43%)                               ▼ No (15%)
                        ┌───────────────────────┐                 ┌───────────────────────────────┐
                        │ Return SLM Response   │                 │ Tier 3: Frontier Model (KV)   │
                        │ Fast, low compute cost│                 │ 1,850ms · ₹0.850 per call     │
                        └───────────────────────┘                 └───────────────────────────────┘
```

1. **Tier 1 (Deterministic Semantic Cache & Rules):** High-frequency factual questions ("Where is my shipment?", "What are branch banking hours?") are checked against semantic embeddings in an in-memory vector cache or handled by deterministic business logic. Latency: $p95 \le 45\text{ms}$. Unit cost: ₹0.002. Volume coverage: 40–45%.
2. **Tier 2 (Fine-Tuned Small Language Model, 8B):** An open-source 8-billion parameter model fine-tuned on historical enterprise interactions processes domain requests. The model outputs a calibrated confidence score $\theta$. Queries clearing $\theta \ge 0.88$ complete immediately. Latency: $p95 \le 240\text{ms}$. Unit cost: ₹0.040. Volume coverage: 40–45%.
3. **Tier 3 (Frontier Reasoning Engine with Context Caching):** Ambiguous inquiries, multi-intent escalations, and complex policy interpretations where $\theta < 0.88$ escalate to a frontier model. Latency: $p95 \approx 1{,}850\text{ms}$. Unit cost: ₹0.850. Volume coverage: 10–15%.

::: concept Cascade model routing
**Plain words.** An architectural traffic controller that directs incoming user queries to the smallest, fastest model capable of resolving them, escalating to expensive frontier models only when task complexity warrants it.

**Analogy.** A hospital emergency room triage desk. A triage nurse inspects incoming patients, immediately discharging minor scrapes with a bandage, routing routine flu symptoms to a resident physician, and summoning the chief trauma surgeon only for critical emergency surgeries.

**Misconception.** "Using a small model reduces product quality." A fine-tuned 8-billion parameter model trained on ten thousand domain-specific customer service logs often outperforms a generalist frontier model on task adherence, while responding in one-tenth the time at one-twentieth the cost.
:::

{{figure product-architecture-economics | Latency budgets, prompt caching economics, and cascade routing topologies. Left: End-to-end latency budget breakdown against human perception thresholds. Right: KV context caching break-even curve and three-tier cascade routing architecture. | Sources: Card, Moran & Newell (1983); Anthropic (2024); Google DeepMind (2024)}}

::: stat 85% & 90%
Prompt caching cuts Time-to-First-Token by up to 85% and reduces input token costs by up to 90% across repetitive prompt prefixes.
<span class="src">Sources: [@anthropic-context-caching]; [@google-gemini-long-context]</span>
:::

==The objective of model routing is not to find the smartest model, but to ensure that simple questions never pay the latency and cost tax of frontier reasoning engines.==

::: myth
**Myth.** Always route production queries to the newest frontier reasoning model to maximize user satisfaction.

**Reality.** Frontier reasoning models inflate latency by 8x to 15x and cost by 20x. For 70% of routine enterprise workflows, users perceive multi-second delays as product failure; routing simple queries through specialized small models lifts user satisfaction while slashing token burn.
:::

## The build versus buy frontier: TCO modeling

As query volumes expand, finance leaders inevitably propose self-hosting open-source foundation models on dedicated cloud GPU clusters to eliminate per-token commercial API billing. Evaluating this transition requires modeling Total Cost of Ownership (TCO).

A dedicated self-hosted inference cluster incurs substantial fixed monthly overhead:
- **Compute Leases:** An 8x Nvidia H100 SXM5 GPU node currently leases for approximately $24,000 per month (₹20 lakh/month).
- **Redundancy & Standby:** High availability mandates at least one redundant standby node to survive hardware degradation ($2 \times \$24{,}000 = \$48{,}000/\text{month}$).
- **Headcount Overhead:** Maintaining self-hosted inference infrastructure requires dedicated MLOps engineers, site reliability engineers, and model evaluation specialists ($\approx \text{₹}15\text{ lakh/month}$).

In contrast, commercial model APIs convert infrastructure into purely variable operational expenses:

$$\text{Spend}_{\text{API}} = \sum (\text{Input Tokens} \times P_{\text{in}}) + \sum (\text{Output Tokens} \times P_{\text{out}})$$

To calculate the crossover threshold ($V^*$), divide fixed monthly overhead by the unit cost delta between commercial APIs and self-hosted marginal compute:

$$V^* = \frac{\text{Fixed Monthly Compute \& Headcount Overhead}}{C_{\text{commercial API}} - C_{\text{self-hosted compute}}}$$

For modern frontier-grade intelligence, the crossover volume typically sits above 50 million tokens daily. Operating below that threshold on dedicated GPU hardware produces low server utilization, inflated idle costs, and leaves the organization vulnerable to rapid model obsolescence.

==A product manager who does not manage a latency budget is merely an observer of customer churn.==

::: case Illustrative · FinTech Super-App Reclaiming the ₹8 Crore Token Bill
#### The situation
A leading Indian payments super-app serves 10,000,000 customer service interactions monthly across payment status verifications, soundbox merchant hardware issues, credit card dispute filing, and KYC compliance. To ensure maximum accuracy, product engineering routed 100% of customer interactions to a commercial frontier reasoning API.

The architecture achieved 95.8% accuracy, but median response latency climbed to 2.1 seconds ($p95 = 5.4\text{ seconds}$). The cloud token bill exploded to ₹8.50 crore monthly (₹8.50 per customer conversation), which crushed customer service unit gross margins from 64% to 22%. The CFO issued an ultimatum: reduce monthly compute burn below ₹2.00 crore within 60 days or shut the AI assistant down.

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

==A well-designed model cascade delivers the intelligence of a frontier model at the cost and latency profile of a small language model.==

::: lens product
Product managers own the end-to-end service level agreement. Do not ask engineering "how fast can the model generate"; define the perceptual latency budget required for user retention and force the team to allocate milliseconds across retrieval, prefill, and streaming.
:::

::: lens finance
AI unit economics cannot be evaluated as an aggregate infrastructure bill. Model costs must be tracked as marginal cost per completed user workflow. When query volume scales faster than software revenue, un-routed frontier APIs turn gross margins negative.
:::

::: lens strategy
The build-versus-buy decision is a dynamic staircase, not a one-time binary choice. Launch with commercial proprietary APIs to discover product-market fit rapidly; once query distributions stabilize and traffic crosses 50 million tokens daily, migrate high-volume tiers to self-hosted open checkpoints to capture gross margin leverage.
:::

## Defending latency budgets in the interview room

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
   - Total [[latency-budget]]: $100 + 150 + 50 + 400 + 100 = \mathbf{800\text{ms}}$.
3. **KV Context Caching for Product Catalogs:** Cache the static product catalog taxonomy and system prompt prefixes. Caching cuts prefill computation by 85% and drops $TTFT$ from 2,800ms to 420ms.
4. **Cascade Routing Policy:** Route simple keyword and brand navigation queries (60% volume) to elastic deterministic search and small 3B models ($< 150\text{ms}$). Reserve multi-attribute semantic reasoning queries for cached frontier models; average user latency settles at 350ms.
:::

==Streaming tokens does not make neural compute faster; streaming tokens exploits human cognitive reading limits to make software feel instantaneous.==

## Hands-on experiment: Cascade routing economics

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
3. Verify that the cascade slashes monthly compute expenditure by **81.9%** ($30,000 → $5,440) while reducing weighted average response time from 2,200ms to **462.5ms**.
:::

## Recommended reading & media

{{read anthropic-context-caching}}

{{paper google-gemini-long-context}}

{{read card-moran-newell-psychology-hci}}

==Context caching shifts the economic frontier of artificial intelligence from brute-force recomputation to memory-resident intelligence.==

::: check Check yourself
1. What are the three Card-Moran-Newell human cognitive perception thresholds, and how do they govern AI latency budgets? <span class="lvl">recall</span>
2. An enterprise document assistant uses a commercial model where uncached input costs $3.00 per million tokens, cache writes cost $3.75 per million, and cache reads cost $0.30 per million. Calculate the break-even query velocity ($Q^*$). <span class="lvl">apply</span>
3. Explain why streaming tokens to a user's browser masks generation latency ($TPS$) but provides zero relief for Time-to-First-Token ($TTFT$). <span class="lvl">explain</span>
4. A product manager observes that an e-commerce conversational search bot suffers from high $TTFT$ during evening peak traffic. How would you redesign the caching and retrieval architecture to stabilize latency? <span class="lvl">transfer</span>
5. A venture capitalist advises your startup to immediately purchase a dedicated cluster of 8 H100 GPUs at $24,000 per month rather than paying commercial API token fees. Evaluate the strategic and financial risks of this decision. <span class="lvl">judge</span>
:::

::: answers
1. The three thresholds are 100ms (perceived as immediate, direct physical manipulation), 1,000ms (the limit of unbroken human thought flow), and 10,000ms (the ceiling of user attention before complete task abandonment). An interactive AI search or chat SLA must deliver initial tokens under 1,000ms to prevent user cognitive interruption.
2. The break-even query velocity formula is $Q^* = \frac{C_{\text{write}} - C_{\text{read}}}{C_{\text{uncached}} - C_{\text{read}}}$. Substituting the values: $Q^* = \frac{3.75 - 0.30}{3.00 - 0.30} = \frac{3.45}{2.70} \approx 1.28$. The system recoups its cache write surcharge and becomes cheaper than uncached queries on the 2nd query within the 5-minute TTL window (costing $4.05 vs $6.00 for two uncached queries).
3. Time-to-First-Token represents the prefill computation phase where the model must process all prompt tokens and calculate initial attention matrices before generating a single word; during this window, nothing can be displayed. Streaming outputs tokens sequentially at human reading speed ($\approx 8\text{ tokens/sec}$). Once $TTFT$ is cleared, subsequent token generation feels instantaneous.
4. Separate the static catalog prefix from dynamic user query tokens. Place static system prompts, product taxonomies, and few-shot formatting examples in persistent KV context cache with active keep-alive pings to prevent eviction. Direct fast keyword and intent parsing to an in-memory cache, and stream intermediate search status updates to the client interface within 150ms while background LLM inference runs.
5. Committing to a $24,000/month fixed GPU lease introduces severe financial and operational risk. Unless query volume consistently exceeds 50 million tokens daily ($V^*$), fixed hosting costs exceed variable API billing. Furthermore, self-hosting requires dedicated MLOps engineering headcount, ongoing model fine-tuning, load-balancing infrastructure, and leaves the firm locked into current-generation hardware while cloud API frontier models rapidly drop in price and advance in reasoning quality.
:::

::: recap The night-before page
1. Latency is biological: keep Time-to-First-Token under 1,000ms to preserve human cognitive flow; stream output tokens at $\ge 40\text{ TPS}$ to eliminate perceived delay.
2. Deconstruct end-to-end latency into a strict modular budget: network transit, vector retrieval, prefill $TTFT$, and streaming generation must each buy their milliseconds.
3. KV context caching eliminates redundant attention prefill across long documents, cutting $TTFT$ by 85% and token expenditure by 90% after just 2 queries.
4. Deploy multi-tier cascade routing: resolve 80%+ of volume through deterministic caches and small 8B models, reserving frontier engines for complex reasoning.
5. Build vs. buy is an economic volume threshold: use flexible commercial APIs below 50 million tokens daily; self-host dedicated GPU clusters only at high, stable scale.
:::
