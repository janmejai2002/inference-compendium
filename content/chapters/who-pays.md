---
id: who-pays
title: Who pays for intelligence
deck: "Inference cost, chips, data centres, clouds, labs, and enterprise buyers. Why the price per token collapsed 280-fold while hyperscalers spend $50 billion a quarter on infrastructure, and who carries the financial risk."
level: Zero to one
tracks: [consulting, finance]
hook: "In 18 months, the cost of generating one million tokens collapsed 280-fold, falling from $20 to $0.07. Yet in a single quarter, Alphabet spent $51.4 billion on capital equipment and reported negative free cash flow. If intelligence is becoming cheap to query, why is building it costing hundreds of billions of dollars, and who is footing the bill?"
objectives:
  - "**Trace** the six layers of the AI capital stack from foundries and chip designers to enterprise APIs."
  - "**Explain** Jevons' paradox in AI: why a 280-fold drop in unit token cost drives massive increases in total compute spend."
  - "**Analyze** hyperscaler capital allocation, comparing operating cash flows against multi-billion-dollar capex commitments."
  - "**Evaluate** private equity and M&A proposals for data centres and AI startups using capacity, power, and margin economics."
---

When consumers use ChatGPT or Claude to draft an email, the interaction feels free. For enterprise developers calling APIs, querying a model costs fractions of a paisa per paragraph.

That pricing creates an illusion. Behind every token lies the most capital-intensive buildout in corporate history. To serve those queries, technology conglomerates pour hundreds of billions into high-performance silicon, electrical substations, liquid cooling, and utility power contracts. ==The price of an individual AI token has collapsed, but aggregate capital expenditure has exploded; the boom is funded by hyperscaler balance sheets, institutional debt, and circular vendor commitments.==

Understanding AI economics requires answering the primary commercial question: who pays for computing power, and what return do they expect?

## The value chain: from silicon to software

The AI economy is not a single market. It is a six-layer capital stack where value and risk distribute unevenly across physical and digital assets.

{{figure who-pays-value-chain | The AI capital and infrastructure stack. Capital flows from cloud debt and hyperscaler balance sheets into chipmakers, foundries, and energy grids, while end-user token prices collapse. | Sources: Alphabet (Q3 2026 8-K); Microsoft (FY27 Q1); Stanford HAI AI Index (2025, 2026); Oracle (Q1 FY27 10-Q)}}

1. **Equipment and Tooling:** Dutch manufacturer ASML holds an effective monopoly on extreme ultraviolet (EUV) photolithography machines required to print leading-edge silicon.
2. **Foundries:** Taiwan Semiconductor Manufacturing Company (TSMC) fabricates virtually all leading AI accelerator chips, creating a critical geographic bottleneck [@stanford-ai-index-2026-rd].
3. **Chip Designers:** Nvidia, AMD, and custom silicon teams (Google TPU, Amazon Trainium). Stanford HAI reports global compute grew 3.3 times annually from 2022 to reach 17.1 million H100-equivalent accelerators by late 2025, with Nvidia holding over 60% share [@stanford-ai-index-2026-rd].
4. **Power and Data Centres:** Facilities supplying electricity and cooling. Stanford HAI reports global AI data centre capacity reached 29.6 gigawatts (GW) by Q4 2025 (11.8 GW for chips, the rest for cooling and power distribution), rivaling New York State's peak demand [@stanford-ai-index-2026-rd].
5. **Hyperscalers:** AWS, Microsoft Azure, Google Cloud, Meta, and Oracle absorb depreciation risk on servers that turn obsolete in 3 to 4 years.
6. **Model Labs:** OpenAI and Anthropic train foundation models, monetizing compute through APIs and consumer subscriptions.

## The paradox of falling prices and soaring capex

Between November 2022 and October 2024, the market price of generating text at the GPT-3.5 capability tier fell from $20.00 per million tokens to $0.07 per million tokens (measured on Google Gemini-1.5-Flash-8B), representing an astounding 280-fold cost reduction in 18 months [@stanford-ai-index-2025-rd].

Research by Epoch AI confirmed that the cost of achieving a fixed level of benchmark capability has fallen at rates between 9 times and 900 times per year across different tasks [@epoch-inference-price-trends]. On challenging benchmarks like GPQA Diamond, the inference cost for GPT-4-level reasoning dropped roughly 40 times in a single year [@epoch-inference-price-trends].

In economic theory, when the unit cost of an input falls, one might expect total expenditure on that input to decline. Instead, capital expenditure on AI computing hardware skyrocketed.

This phenomenon is explained by **Jevons' paradox**: an economic principle formulated in 1865 by William Stanley Jevons. Observing British coal consumption after James Watt introduced more fuel-efficient steam engines, Jevons discovered that making an engine more efficient did not reduce national coal demand. Instead, because efficiency made steam power cheaper and more viable across hundreds of new industries, total coal consumption surged exponentially.

The same dynamic governs [[inference-cost|inference costs]]. When querying a model cost several cents per call, companies used AI selectively for high-value executive summaries. When cost dropped to pennies per thousand queries, developers embedded AI into real-time search, automated customer service agents, background code compilation, and continuous data processing. Cheaper tokens increased total demand by orders of magnitude, requiring hyperscalers to expand their physical infrastructure at an unprecedented pace.

::: principle Build it from zero
1. An AI model requires compute hardware (GPUs, power, cooling) both to train its weights and to generate output tokens during inference.
2. Technological innovation and architectural optimization dramatically reduce the cost required to generate an individual token: 280-fold in 18 months for baseline tasks [@stanford-ai-index-2025-rd].
3. Lower token costs expand the addressable commercial use cases: tasks that were economically impractical at $20 per million tokens become profitable at $0.07 per million tokens.
4. Total compute demand is the product of unit price and query volume ($\text{Total Spend} = \text{Price} \times \text{Volume}$).
5. Because volume expands faster than unit price declines (high price elasticity of demand), aggregate demand for compute power surges.
6. ∴ Cheaper tokens do not reduce infrastructure spend; they fuel massive capital spending by cloud providers racing to secure chips, land, and power.
:::

## The hyperscaler balance sheets: cash flows versus capex

Who pays for this infrastructure? The primary financiers are the major technology hyperscalers.

In late October 2026, technology conglomerates released financial filings for the quarter ended September 2026. The disclosures revealed that capital spending had reached levels that strained even the largest corporate balance sheets:

::: stat $51.4 billion
Alphabet's capital expenditures in a single quarter (Q3 2026, ended 30 September 2026), compared to operating cash flow of $42.3 billion. Capital outlays pushed quarterly free cash flow to negative $9.07 billion, even as Google Cloud revenue doubled to $30.7 billion.
<span class="src">Source: [@alphabet-q3-2026]</span>
:::

- **Alphabet:** In the third quarter of 2026, Alphabet recorded property and equipment purchases of $51.4 billion [@alphabet-q3-2026]. Operating cash flow was $42.3 billion, resulting in negative quarterly free cash flow of -$9.07 billion [@alphabet-q3-2026]. While Google Cloud grew 103% year-over-year to $30.7 billion, cash spent on data centres and hardware outpaced operations [@alphabet-q3-2026].
- **Microsoft:** For its fiscal first quarter 2027 (ended September 2026), Microsoft reported additions to property and equipment of $39.4 billion, more than double the $19.4 billion spent in the same quarter a year earlier [@microsoft-fy27-q1]. Azure revenue reached $33.2 billion, up 48% [@microsoft-fy27-q1]. Microsoft also reported a commercial [[remaining-performance-obligation|remaining performance obligation]] (contracted future revenue backlog) of $677 billion, up 73%, demonstrating why the company continues to build capacity [@microsoft-fy27-q1].
- **Amazon:** AWS generated $46.0 billion in third-quarter revenue, up 39% [@amazon-q3-2026]. However, Amazon projected full-year 2026 capital expenditures of approximately $220 billion, with trailing twelve-month free cash flow turning to an outflow of -$42.4 billion, compared to positive $14.8 billion in the prior period [@amazon-q3-2026].
- **Meta:** Despite having no public cloud business to rent out compute, Meta reported third-quarter capital expenditures of $34.9 billion (narrowly exceeding its operating cash flow of $32.8 billion) and set full-year 2026 capex guidance between $135 billion and $145 billion [@meta-q3-2026].

Stanford HAI's AI Index 2026 recorded that total corporate AI investment reached $581.69 billion in 2025, up 129.9% year-over-year [@stanford-ai-index-2026-economy].

The financial model of hyperscalers relies on an aggressive capital conversion: converting current operational profits and balance sheet cash into long-life physical computing assets, betting that enterprise adoption will generate sustained recurring revenue before the hardware depreciates.

::: concept Capex versus opex
**Plain words.** Capital expenditure ([[capex]]) is money spent upfront to buy physical assets that last years (such as data centres, land, generators, and server racks). Operational expenditure ([[opex]]) is money spent continuously to run daily operations (such as paying an electric utility bill or purchasing monthly AI model API tokens).

**Analogy.** Buying a power plant versus paying a monthly electricity bill. A hyperscaler building a ₹10,000 crore data centre makes a long-term capex bet. An enterprise paying ₹5 per 10,000 tokens consumes AI as flexible opex.

**Misconception.** "Because cloud AI is sold as opex to businesses, the whole AI boom is capital-light." Enterprise software buyers treat AI as opex, but hyperscalers must make unprecedented capex investments to supply that compute. The capital intensity was not eliminated; it was shifted onto the cloud providers' balance sheets.
:::

## The debt layer and circular financing

Not all infrastructure is funded out of operating cash flow. As capital expenditure surpassed free cash flows, corporate debt and structured financing entered the market.

Oracle Corporation exemplifies the leveraged link in the computing chain. In its quarterly filing for the period ended 31 August 2026, Oracle disclosed senior notes and long-term borrowings of $125.0 billion, alongside quarterly capex of $28.5 billion [@oracle-10q-aug-2026]. To justify that borrowing, Oracle pointed to a contracted commercial backlog (remaining performance obligations) of $664 billion, up from $455 billion a year earlier [@oracle-10q-aug-2026].

At the same time, venture capital funding for frontier model labs has reached sovereign proportions. In May 2026, Anthropic announced a $65 billion Series H funding round at a post-money valuation of $965 billion, stating that its run-rate revenue had crossed $47 billion [@anthropic-series-h]. Anthropic simultaneously disclosed strategic compute partnerships for up to 5 GW of capacity from Amazon and 5 GW of TPU capacity with Google and Broadcom [@anthropic-series-h].

This ecosystem has given rise to what financial analyst Patrick Boyle describes as circular vendor financing [@boyle-big-tech-debt]. In a circular financing structure, a major chip designer or cloud provider invests equity capital into a foundation model lab; the lab immediately uses those funds to sign multi-billion-dollar compute contracts with that exact cloud provider or purchase hardware from that chipmaker.

While circular transactions accelerate deployment, they obscure true organic market demand. If a tech giant provides capital to a startup that returns the capital as cloud revenue, the reported revenue growth reflects balance-sheet reallocation rather than end-customer purchasing power [@boyle-big-tech-debt].

::: myth
**Myth.** Big Tech companies fund the AI buildout purely out of retained software profits without taking on financial risk.

**Reality.** In Q3 2026, Alphabet, Amazon, and Meta saw capital expenditures match or exceed their quarterly operating cash flows [@alphabet-q3-2026] [@amazon-q3-2026] [@meta-q3-2026]. Quarterly free cash flow turned negative at Alphabet (-$9.07 billion) and trailing twelve-month free cash flow turned negative at Amazon (-$42.4 billion), while Oracle carries $125 billion in debt to fund server clusters [@oracle-10q-aug-2026]. The buildout is financed through cash depletion, debt issuance, and multi-year off-balance-sheet capacity commitments.
:::

## The Indian dimension: the IndiaAI Mission

In emerging markets like India, the high cost of computing silicon presents a structural barrier to startup formation and enterprise adoption. Prevailing international commercial spot rates for frontier GPU access place punitive capital requirements on Indian engineering teams.

To counter this constraint, the Government of India launched the IndiaAI Mission with an approved five-year financial outlay of ₹10,371.92 crore [@pib-democratising-ai-2026].

Under the mission, the Ministry of Electronics and Information Technology (MeitY) established a national compute infrastructure pool:
- **Subsidized Silicon:** The government onboarded more than 38,000 GPUs and 1,050 TPUs, making high-performance computing available to Indian researchers, startups, and academic institutions at an average subsidized rate of about ₹65 per GPU-hour [@pib-democratising-ai-2026]. This rate represents nearly one-third of the global average cost.
- **Data Centre Expansion:** India's cloud data centre power capacity reached approximately 1,280 megawatts (MW) in early 2026, with government initiatives projecting four- to five-fold growth by 2030 [@pib-democratising-ai-2026].
- **Hyperscaler Foreign Direct Investment:** Major global providers committed capital directly to Indian soil. Google announced a $15 billion AI hub investment in Visakhapatnam, while AWS committed $8.3 billion in Maharashtra cloud infrastructure [@pib-democratising-ai-2026].

By subsidizing access to compute hardware, the state absorbs a portion of the capital cost, allowing Indian startups to experiment without bearing full chip depreciation.

::: case Illustrative · The ₹5,000 Crore Data Centre Equity Stake
#### The situation
A Mumbai private equity fund evaluates acquiring a 40% equity stake (valued at ₹5,000 crore) in a regional data centre developer with operational campuses in Navi Mumbai and an upcoming site in Chennai.

The developer projects rapid revenue growth from rising enterprise AI demand, highlighting a planned 120-megawatt (MW) campus, land parcels, and utility MoUs.

#### The decision
The PE deal team audits the technical and financial stack:

1. **Power vs. Real Estate:** Data centre value is governed by energized megawatts, not land area. While the developer owns land zoned for 120 MW, the local electricity board has guaranteed only 35 MW of substation capacity over the next three years. Total capacity is capped at 35 MW.
2. **Contracted vs. Speculative Tenancy:** Of the 35 MW of active power, only 15 MW is contracted under multi-year leases to established enterprise and cloud tenants. The remaining 20 MW is speculative.
3. **Cooling Infrastructure:** Standard cloud servers operate at a PUE of 1.4 to 1.5. High-density AI server clusters (dissipating 40 to 100 kW per rack) require direct-to-chip liquid cooling. Upgrading the Chennai facility demands an unbudgeted capex injection of ₹450 crore.
4. **Tenant Concentration:** 70% of contracted revenue comes from two consumer fintech startups on uncommitted monthly allocations.

The deal team restructures the investment:
- Reduces headline valuation from ₹5,000 crore to ₹3,100 crore, linking capital drawdowns to verified substation energization milestones.
- Requires the developer to convert at least 60% of prospective AI capacity into multi-year "take-or-pay" contracts before drawing down Phase 2 funds.

#### Your move
In data centre M&A, never value a facility on square footage or vague "AI demand." Value the asset on energized megawatts, grid interconnect agreements, liquid cooling readiness, and tenant creditworthiness.
:::

## Where this shows up at work

::: lens consulting
Strategy consultants regularly evaluate the "build versus buy" dilemma for enterprise AI. When an Indian bank or telecom asks whether to build private AI supercomputing clusters or license cloud APIs, the consultant models total cost of ownership. Beyond chip purchase costs, private infrastructure requires specialized facilities, power provisioning, and high depreciation. In most enterprise cases, consuming AI as operational cloud expenditure is financially superior to bearing hardware obsolescence.
:::

::: lens finance
In financial analysis and equity valuation, tracking hyperscaler capex is the leading indicator for tech industry health. Analysts scrutinize the gap between capital expenditures and operating cash flows. When cloud providers report multi-billion-dollar negative free cash flows, valuation models must account for increased debt, higher interest expenses, and margin pressure if software monetization lags behind hardware buildouts.
:::

::: interview The data centre PE investment
**Q.** A private equity fund is considering a ₹5,000 crore stake in an Indian data centre operator. How would you determine whether AI demand justifies the price?

> "I would evaluate the investment through four operational and financial drivers: power interconnects and grid access, contracted versus speculative tenant backlog, liquid cooling capabilities for high-density AI racks, and tenant credit risk."

**What they are testing.** Whether you recognize that data centres are power and infrastructure assets rather than real estate, understand high-density thermal requirements, can evaluate contracted backlog against speculative capacity, and know how to structure valuation protections.

**A strong structure.**
1. **Power and energized capacity:** Explain that energized megawatts (MW) from utilities determine capacity, not square footage. Verify transmission agreements, substation approvals, and green power access.
2. **Contract structure and backlog:** Differentiate speculative space from contracted remaining performance obligations (RPO). Look for long-term "take-or-pay" leases with investment-grade tenants.
3. **Engineering and thermal infrastructure:** Assess cooling design. AI servers require direct-to-chip liquid cooling rather than legacy air cooling. Evaluate the capex required to support high rack densities (40 to 100 kW per rack).
4. **Unit economics and returns:** Model power usage effectiveness (PUE), electricity tariffs, depreciation schedules on physical plant, and debt service coverage ratios. Structure investments in tranches tied to delivered power.
:::

::: try Modeling the unit economics of an AI feature
No code. Use ChatGPT, Claude, or Gemini. This exercise demonstrates how to evaluate whether an AI-powered software feature is commercially viable.

Paste this prompt into a fresh chat:

```
You are the Chief Financial Officer of an Indian SaaS company with 50,000 monthly active users paying a flat subscription of Rs 1,500 per month.

The product team proposes adding an autonomous AI research assistant.
Assumptions:
- 30% of users use the feature daily, making an average of 15 queries per day.
- Each query uses 1,500 input tokens and generates 800 output tokens.
- API pricing: Rs 0.25 per million input tokens, Rs 1.00 per million output tokens.
- Hardware hosting and database retrieval overhead adds 20% to raw API costs.

Calculate:
1. The total monthly token volume (inputs and outputs).
2. The total monthly AI infrastructure bill in INR.
3. The average monthly compute cost per active feature user.
4. What percentage of the Rs 1,500 subscription fee is consumed by AI compute? Is this feature financially viable without a price increase?
```

Review the calculation. Notice how small per-token costs compound into significant monthly operational expenses when query frequency increases.
:::

{{watch boyle-big-tech-debt}}

{{read stanford-ai-index-2026-economy}}

{{read alphabet-q3-2026}}

::: check Check yourself
1. Describe the six layers of the AI value chain and identify where physical manufacturing bottlenecks exist. <span class="lvl">recall</span>
2. Explain Jevons' paradox in the context of large language model inference costs. Why did falling token prices fail to reduce hyperscaler capital spending? <span class="lvl">explain</span>
3. In Q3 2026, Alphabet recorded $51.4 billion in property and equipment purchases against $42.3 billion in operating cash flow. Calculate its quarterly free cash flow and explain what this reveals about hyperscaler capital allocation. <span class="lvl">apply</span>
4. An Indian logistics startup is deciding between purchasing ₹15 crore of dedicated AI servers or licensing compute through the IndiaAI Mission at ₹65 per GPU-hour. What financial and operational factors should govern this decision? <span class="lvl">transfer</span>
5. How would you evaluate the argument that "Because foundation labs reported annualized revenues reaching tens of billions of dollars, the AI infrastructure boom is self-sustaining and free of financial risk"? <span class="lvl">judge</span>
:::

::: answers
1. The six layers are: (1) Equipment and tooling (ASML lithography), (2) Foundries (TSMC manufacturing), (3) Chip designers (Nvidia, AMD, custom ASICs), (4) Power and physical data centres, (5) Hyperscale cloud providers (AWS, Azure, Google Cloud, Oracle), and (6) Foundation model labs and applications (OpenAI, Anthropic). The primary manufacturing bottlenecks reside in ASML's EUV lithography tools and TSMC's advanced semiconductor fabrication facilities.
2. Jevons' paradox states that increased efficiency in consuming a resource leads to an overall increase in total consumption of that resource. As token generation costs collapsed 280-fold, AI became economically viable across millions of new automated use cases. The surge in query volume far exceeded the decline in unit price, forcing cloud providers to expand physical compute capacity aggressively.
3. Free cash flow is calculated as Operating Cash Flow minus Capital Expenditures: $\$42.3\text{B} - \$51.4\text{B} = -\$9.1\text{B}$ (or negative $9.07 billion). This reveals that hyperscalers are actively depleting cash reserves and operating cash flows to fund long-term physical infrastructure buildouts, taking on substantial balance-sheet risk ahead of realized enterprise software monetization.
4. Factors include: (1) Capital intensity (preserving ₹15 crore in equity cash by treating compute as variable opex), (2) Hardware obsolescence risk (accelerator chips depreciate rapidly over 3–4 years, while cloud providers continuously upgrade), (3) Utilization rates (purchased servers cost money when idle, while subsidized GPU-hours are billed strictly on usage), and (4) Facilities overhead (power, cooling, and network maintenance). Licensing compute through the IndiaAI Mission at subsidized rates is mathematically superior for a startup.
5. The argument is flawed. While reported revenues are large (such as Anthropic reporting $47 billion in run-rate revenue and OpenAI reaching annualized revenues above $25 billion), they must be evaluated against the capital expenditures and operational costs required to generate them. Frontier labs consume tens of billions of dollars in compute, requiring sovereign-sized funding rounds (such as Anthropic's $65 billion Series H at a $965 billion valuation). Furthermore, substantial lab revenue originates from circular investments where cloud providers and chipmakers fund startups that return the capital as compute revenue, creating structural exposure if external enterprise adoption slows.
:::

::: recap The night-before page
1. The AI capital stack spans six layers: equipment (ASML), foundries (TSMC), chip designers (Nvidia), data centres, cloud hyperscalers, and model labs. Physical bottlenecks concentrate in Taiwan and specialized power grids.
2. Jevons' paradox drives the boom: a 280-fold drop in unit token costs made AI viable across thousands of new tasks, causing total compute demand and infrastructure spending to surge.
3. Hyperscalers are funding the buildout with unprecedented cash commitments: Alphabet spent $51.4B on capex in Q3 2026, pushing quarterly free cash flow negative (-$9.07B), while Amazon projected $220B in 2026 capex.
4. Debt and circular financing carry structural risk: Oracle holds $125B in debt against a $664B backlog, while chipmakers and cloud giants invest equity into labs that return the capital as compute contracts.
5. India subsidizes compute access: the IndiaAI Mission deployed 38,000+ GPUs at an average of ₹65/hour under a ₹10,371.92 crore plan, lowering barriers for domestic innovation.
:::
