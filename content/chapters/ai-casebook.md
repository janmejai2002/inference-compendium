---
id: ai-casebook
title: The INFERENCE AI casebook
deck: "Ten enterprise cases and ten quantitative guesstimates covering due diligence, pilot turnarounds, token unit economics, and sovereign compute sizing."
level: Zero to one
tracks: [consulting]
hook: "In an elite management consulting interview, the partner hands you an unstructured dilemma: 'A private equity firm wants to acquire a Bengaluru-based AI customer service startup for ₹400 crore. The founder claims an 80% automated resolution rate. How do you determine whether this company has a defensible technology moat or is merely an expensive wrapper around third-party APIs?' How do you structure your due diligence?"
objectives:
  - "**Master** the four primary AI consulting case archetypes: technology due diligence, value-chain use-case prioritization, pilot diagnostic turnaround, and commercial pricing restructuring."
  - "**Decompose** complex technical claims into auditable operational metrics, evaluating true containment rates, workflow integration, and human-in-the-loop review overhead."
  - "**Execute** rigorous market and infrastructure guesstimates using grounded Indian benchmarks, connecting consumer prompts to token volumes, GPU-hours, and data centre megawatt capacity."
  - "**Synthesize** business strategy with technical guardrails, balancing unit economics, regulatory compliance, and organizational change management."
---

Case interviews at top management consulting firms are evolving rapidly. Traditional frameworks like profitability trees, market entry matrices, and merger synergy models remain essential, but interviewers increasingly inject artificial intelligence into candidate scenarios.

However, business school casebooks frequently treat AI as generic technology. Candidates are told to recommend "adding a chatbot" or "deploying predictive machine learning" without considering token costs, model latency, error distributions, or workflow bottlenecks. In real client engagements, recommending an unviable technical solution destroys advisory credibility. ==Excelling in modern consulting interviews requires treating artificial intelligence as an operational system with distinct unit economics, error profiles, and change management constraints.==

This chapter provides a comprehensive practice library: ten end-to-end strategic cases and ten quantitative [[guesstimate|guesstimates]] designed specifically for management consulting, strategy, and corporate development interviews.

## The idea, from zero

::: principle Build it from zero
1. A consulting case interview evaluates how a candidate structures an ambiguous business problem, applies quantitative rigor, and delivers actionable executive recommendations.
2. An AI business problem is never purely a software engineering question; it is an operational economics question.
3. Every AI deployment incurs three distinct costs: capital infrastructure (compute, GPUs, data centre power), variable operational expenditure (input and output tokens, API calls), and organizational overhead (human review, error remediation, workflow retraining).
4. Every AI deployment creates value through one of two mechanisms: reducing unit labor cost per transaction, or accelerating revenue growth by unlocking previously unviable services.
5. If the variable cost and human review overhead exceed the labor savings, or if the model's error rate disrupts critical operations, the initiative destroys economic value.
6. Solving an AI case interview requires walking the entire operational chain: from model capabilities and unit token economics to workflow integration, regulatory compliance, and P&L realization.
:::

## The four AI case archetypes

In modern campus and lateral consulting interviews, artificial intelligence cases cluster into four distinct structural patterns:

1. **Due Diligence and M&A:** Evaluating an AI acquisition target or private equity investment. The candidate must determine whether the target owns proprietary defensible intellectual property (data assets, fine-tuned domain models, embedded customer workflows) or is an easily replicable wrapper around public foundation models.
2. **Use-Case Prioritization:** Helping an enterprise client evaluate candidate AI projects across its value chain. The candidate must segment tasks between predictive machine learning (structured numerical data) and generative models (unstructured text and documents), scoring initiatives on business impact, feasibility, and regulatory exposure.
3. **Pilot Diagnostics and Change Management:** Rescuing a stalled enterprise initiative where a model demonstrated high technical accuracy in testing but failed to generate financial return. The candidate must audit workflow handoffs, identify time leakage, and restructure approval hierarchies.
4. **Unit Economics and Commercial Pricing:** Structuring pricing models for software products incorporating foundation models. The candidate must calculate inference token costs, design rate limits, and transition client contracts toward outcome-based fees.

{{figure ai-casebook-taxonomy | The AI case interview taxonomy: The four problem archetypes on the left, and the token-to-infrastructure sizing tree on the right. | Sources: TRAI (2026); Cushman & Wakefield (2026); Anthropic (2026); PIB (2026)}}

::: stat 101st out of 116
India's global ranking in per-capita Claude.ai usage, despite ranking second worldwide in absolute usage volume with 1,348.08 million total telephone subscribers and 1,087.50 million broadband connections.
<span class="src">Sources: Anthropic (2026) [@anthropic-india-brief]; TRAI (2026) [@trai-pr104-2026]</span>
:::

::: concept Guesstimate
**Plain words.** A structured interview exercise where a candidate estimates an unknown market volume, capacity requirement, or financial figure using transparent, logical steps and reasonable mathematical assumptions.

**Analogy.** Estimating how much water a city consumes daily by multiplying population by average household size, daily showers, cooking needs, and industrial use. The interviewer does not care if the final number is off by 10%; they care whether the candidate constructed a complete, leak-free mathematical tree.

**Misconception.** "Guesstimates test whether you memorized obscure industry statistics." Interviewers test whether you can break an ambiguous problem into independent drivers, state explicit assumptions, execute mental arithmetic cleanly, and sanity-check your conclusion against real anchors.
:::

---

## Ten strategic AI cases

The following cases represent realistic problem-solving scenarios encountered in management consulting rounds. All settings, companies, and operational parameters are illustrative.

### Case 1: PE Due Diligence · The "AI-First" Customer Service Target
- **The Situation:** A private equity fund considers acquiring a 60% stake in a Bengaluru-based customer service software company for ₹400 crore. The target reports ₹60 crore in annual recurring revenue (ARR) with 45% gross margins, claiming that its autonomous conversational agent resolves 80% of customer inquiries without human intervention.
- **Clarifying Questions:**
  1. What is the breakdown of the target's customer base and contract churn?
  2. Does the target train proprietary foundation models, or does it call third-party APIs (OpenAI, Anthropic)?
  3. How does the target define its "80% resolution rate"?
- **The Analytical Core:**
  - *Moat vs. Wrapper:* The candidate discovers that the startup calls frontier model APIs, paying ₹18 crore annually in cloud compute costs. It owns no proprietary model weights; its intellectual property consists of system prompts and API routing scripts.
  - *The Resolution Illusion:* The reported 80% [[containment-rate|containment rate]] measures sessions where the customer did not press "speak to an agent." However, customer CSAT data reveals that 35% of those "contained" users abandoned the session in frustration and subsequently called the telephone hotline or emailed executive escalations.
  - *True Gross Margin:* When accounting for customer re-contacts and the 150 offshore human reviewers employed to verify chat logs, true gross margin drops from 45% to 22%.
- **Recommendation:** Do not acquire at the proposed ₹400 crore valuation (6.7x ARR). The company lacks defensibility against platform feature expansion by major cloud providers. If the fund proceeds, valuation must be discounted to 2.5x ARR (₹150 crore) to reflect high customer churn and software wrapper vulnerability.

### Case 2: Convince the Owner · Regional FMCG Snacks Manufacturer
- **The Situation:** The traditional founder of a ₹1,200 crore packaged snacks company in Rajkot dismisses AI as expensive Silicon Valley hype, pointing to peers who spent crores on consultants with zero margin improvement. The founder's son wants to hire an AI consultancy. How do you advise the founder?
- **Clarifying Questions:**
  1. Where are the primary operational cost pressures in the business today?
  2. What digital data infrastructure currently exists across the distribution network?
- **The Analytical Core:**
  - *Value-Chain Mapping:* Avoid generic corporate AI use cases (brand copywriting, chatbots). Walk the physical supply chain: raw potato and oil procurement, factory packaging line scheduling, distributor inventory forecasting, and retail trade promotions.
  - *High-Impact Narrow Focus:* The distributor network suffers from high stockouts (12% lost sales) in Tier-2 towns and high unsold inventory returns (₹36 crore annual spoilage) due to manual distributor ordering.
  - *Predictive vs. Generative ML:* Recommend deploying classic predictive demand forecasting algorithms over distributor order histories, combined with an automated WhatsApp conversational assistant allowing 15,000 kirana store owners to place restocking orders in Gujarati and Hindi.
- **Recommendation:** Propose a 90-day pilot across two distribution zones (Surat and Vadodara) with a strict kill rule: if inventory returns do not fall by 15% and order placement frequency does not rise by 10% within 90 days at a total cost under ₹40 lakh, the project terminates immediately.

### Case 3: Use-Case Prioritization · Large Private Sector Bank
- **The Situation:** The Chief Digital Officer of a private sector bank with 3,000 branches has a budget of ₹50 crore to invest in AI initiatives. Business units submitted 45 candidate use cases across retail, wealth, credit, and risk. How do you prioritize them?
- **Clarifying Questions:**
  1. What are the regulatory guardrails imposed by the Reserve Bank of India (RBI) regarding automated decisioning?
  2. What is the current maturity of the bank's centralized data lake?
- **The Analytical Core:**
  - *Construct an Evaluation 2x2:* Score cases along two axes: Business Value (annualized cost reduction or net fee income) and Feasibility (data readiness, model reliability, integration complexity).
  - *Regulatory & Autonomy Filter:* Apply an overlay based on regulatory risk:
    - *Tier 1 (Immediate Execution / Low Risk):* Internal document retrieval for branch relationship managers (searching circulars and product terms) and automated financial statement spreading for mid-market corporate credit memos.
    - *Tier 2 (Staged Pilot / Medium Risk):* Retail customer care voice agent for balance queries and card blocking.
    - *Tier 3 (Strictly Human-in-the-Loop / High Risk):* Credit underwriting decisions, fraud reporting, and investment advisory. Under RBI guidelines, autonomous black-box credit rejections carry severe compliance penalties.
- **Recommendation:** Allocate ₹20 crore to Tier 1 credit memo spreading and branch knowledge search (projected ₹35 crore annual productivity gain), ₹15 crore to Tier 2 customer support voice automation, and reserve ₹15 crore for core data normalization and governance infrastructure.

### Case 4: NBFC Underwriting · Micro-Loans for Gig Delivery Workers
- **The Situation:** A non-banking financial company (NBFC) wants to launch a ₹50,000 two-wheeler vehicle loan product targeting gig delivery drivers who lack formal salary slips, income tax filings, or formal credit bureau scores. How should the firm design an AI underwriting workflow?
- **Clarifying Questions:**
  1. What alternative data sources are available from delivery platforms (Zomato, Swiggy, Zepto)?
  2. What is the maximum acceptable default rate to keep the loan portfolio profitable?
- **The Analytical Core:**
  - *Architecture Separation:* Separate unstructured data extraction from credit risk decisioning.
  - *Step 1 (Extraction via LLM):* Use multimodal foundation models to ingest smartphone screenshots of gig delivery partner app dashboards, extracting historical weekly earnings, customer ratings, completed trips, and cancellation rates.
  - *Step 2 (Scoring via Auditable Predictive ML):* Feed extracted structured metrics into an auditable gradient-boosted decision tree (such as XGBoost) to compute default probability. Never allow a generative language model to make the final lending decision; language models produce non-deterministic, unexplainable underwriting outcomes.
  - *Bias & Fraud Defenses:* Implement fraud detection for forged app screenshots (metadata analysis, font verification) and audit the scoring model for demographic and regional lending bias.
- **Recommendation:** Implement a tiered credit pipeline: applications with verified 6-month earnings exceeding ₹25,000/month and trip consistency above 90% receive automated sanctioning; borderline cases route to a human credit officer. Target a 4.5% non-performing asset (NPA) ceiling.

### Case 5: Quick-Commerce Operations · Support and Refund Automation
- **The Situation:** A quick-commerce delivery platform in India receives 4 million customer support tickets monthly across grocery, fresh produce, and consumer electronics. The COO wants to automate support to cut the ₹12 crore monthly BPO budget in half.
- **Clarifying Questions:**
  1. What is the distribution of ticket categories (missing items, damaged goods, late delivery, app bugs)?
  2. What is the company's current fraud loss rate from false refund claims?
- **The Analytical Core:**
  - *Ticket Segmentation:*
    - 40% are simple delivery status tracking inquiries ("Where is my order?"). Automate 100% via direct database API integration without language models.
    - 35% are missing or damaged produce items requesting refunds under ₹200.
    - 25% are complex disputes, damaged high-value electronics (above ₹2,000), or delivery partner behavioral complaints.
  - *Autonomous Refund Rules:* Design an agentic refund workflow for sub-₹200 claims: verify customer account age, historical refund claim frequency, and delivery photo proof. If refund frequency is under 3% of total orders, grant instant automated refunds. If refund frequency exceeds 8%, require photo upload and route to human fraud review.
  - *Unit Economics:* Automating 60% of total contacts eliminates 2.4 million human tickets monthly. At ₹30 per human ticket resolution versus ₹2 in automated cloud API costs, net monthly savings reach ₹6.7 crore.
- **Recommendation:** Deploy a hybrid support system: deterministic tracking APIs for delivery checks, agentic micro-refunds with fraud scoring for low-value claims, and human agent routing for high-value disputes.

### Case 6: IT Services · Commercial Pricing Strategy under AI Acceleration
- **The Situation:** A mid-size Indian IT services firm (8,000 engineers) sees junior coding effort fall by 30% following the rollout of automated coding assistants. Banking clients demand a 25% across-the-board reduction in hourly billing rates. How does the leadership defend margins?
- **Clarifying Questions:**
  1. What proportion of contracts are time-and-materials (T&M) versus fixed-price milestones?
  2. How do clients measure delivery quality and developer productivity?
- **The Analytical Core:**
  - *The T&M Trap:* In an hourly contract, efficiency reduces billable volume. If hours drop 30% and rates drop 25%, revenue collapses by nearly 50%.
  - *Contract Renegotiation:* Transition clients from T&M hourly staffing to "managed capacity pods" or fixed-fee outcome deliverables. Propose committing to a 40% increase in sprint feature delivery volume while maintaining total contract billing.
  - *Senior Leverage:* Reorganize developer ratios from 1 senior architect overseeing 5 junior coders to 1 architect directing 2 trained "AI pilots," increasing firm gross margin per engagement from 32% to 46%.
- **Recommendation:** Offer clients a 10% discount on legacy maintenance contracts conditional on transitioning to two-year fixed-fee modernizations; bundle automated security auditing and automated test generation as value-added services.

### Case 7: Healthcare · Hospital Chain Clinical Pilot Turnaround
- **The Situation:** An Indian private hospital chain with 18 multi-specialty facilities deployed three AI pilots: an ambient clinical voice scribe for doctors, a chest X-ray triage model in emergency rooms, and an automated medical coding engine for insurance claims. After nine months, the emergency room and billing pilots are stalled. Diagnose the issues.
- **Clarifying Questions:**
  1. Why did the clinical scribe succeed while the other two stalled?
  2. What were the clinical error rates and insurance rejection rates?
- **The Analytical Core:**
  - *Workflow Redesign Audit:*
    - *The Scribe:* Succeeded because it removed friction for doctors directly: doctors spoke normally with patients, and the software generated prescription drafts, saving 90 minutes daily without changing hospital processes.
    - *Radiology Triage:* Stalled because radiologists felt legally exposed. The model flagged suspected pneumonia cases, but emergency room physicians still demanded formal radiologist sign-offs on all scans before discharging patients. The bottleneck remained the radiologist queue.
    - *Medical Billing Coding:* Stalled because insurers rejected claims when automated codes lacked doctor clinical notes corroborating specific surgical complications. Clerks spent more time fixing rejected claims than they previously spent manual coding.
- **Recommendation:** Pause the autonomous claims engine; redeploy it as a real-time validation assistant that alerts doctors to missing clinical documentation before discharge. For radiology, integrate the triage tool into the emergency doctor's immediate viewer strictly for life-threatening pneumothorax alerts, keeping standard cases on the routine radiologist review schedule.

### Case 8: Telecom Infrastructure · Cloud API vs. Dedicated Private Silicon
- **The Situation:** A major Indian telecom operator plans an enterprise knowledge and customer network diagnostic assistant serving 80,000 employees and field technicians, handling 1.5 million complex queries daily. The CTO must choose between licensing cloud foundation model APIs or deploying open-source models on dedicated server clusters using subsidized IndiaAI compute.
- **Clarifying Questions:**
  1. What is the average input context and output length per query?
  2. What are the telecom's internal data residency and security mandates?
- **The Analytical Core:**
  - *Option A (Cloud API):* Average query has 2,000 input tokens (system instructions, user manual context) and 500 output tokens. Using a tier-1 model (such as Claude Sonnet at $2 per million input tokens and $10 per million output tokens):
    $$\text{Cost per query} = (2{,}000 \times \$0.000002) + (500 \times \$0.000010) = \$0.004 + \$0.005 = \$0.009\text{ (approx. ₹0.75)}$$
    $$\text{Daily API Bill} = 1{,}500{,}000 \times ₹0.75 = ₹11{,}25{,}000\text{ (₹41 crore annually)}$$
  - *Option B (Dedicated Private Compute via IndiaAI):* Deploying a fine-tuned open-source model (70B parameters) on dedicated GPU infrastructure. Under the IndiaAI Mission, high-performance GPUs are subsidized at approximately ₹65 per GPU-hour. Serving 1.5 million daily queries with acceptable latency requires a cluster of 64 dedicated high-end GPUs operating 24/7:
    $$\text{Daily GPU Cost} = 64 \times 24 \times ₹65 = ₹99{,}840\text{ (approx. ₹3.65 crore annually)}$$
    Adding ₹3 crore annually for internal engineering maintenance, hosting facility power, and model monitoring brings total annual cost to ₹6.65 crore.
- **Recommendation:** Build on dedicated private compute utilizing subsidized IndiaAI infrastructure. Private deployment saves over ₹34 crore annually, guarantees strict internal data residency for telecom network topology data, and isolates the operator from commercial API price fluctuations.

### Case 9: EdTech · AI Tutor Unit Economics and Subscription Sustainability
- **The Situation:** An Indian test-preparation platform serving 500,000 engineering and medical entrance exam aspirants charges a flat subscription fee of ₹999 per month. The product team proposes adding an "Unlimited 24/7 AI Personal Doubt Solver" that explains complex physics, chemistry, and mathematics questions. Evaluate the commercial viability.
- **Clarifying Questions:**
  1. What is the expected student query volume and token intensity?
  2. What are the platform's current operating margins before AI integration?
- **The Analytical Core:**
  - *Token Intensity:* A STEM problem requires multimodal image parsing (diagrams, equations) plus detailed multi-step chain-of-thought explanation: 3,000 input tokens and 1,200 output tokens per doubt.
  - *Query Behavior:* Active students preparing for exams submit an average of 12 doubts daily (360 doubts monthly).
  - *Inference Cost per Student:* At standard commercial API pricing (₹0.20 per million input tokens, ₹0.80 per million output tokens):
    $$\text{Cost per doubt} = (3{,}000 \times ₹0.0000002) + (1{,}200 \times ₹0.0000008) = ₹0.0006 + ₹0.00096 = ₹0.00156$$
    $$\text{Monthly compute cost per power user} = 360 \times ₹0.00156 \approx ₹0.56$$
    However, if students paste textbook chapters or if high-end reasoning models (costing $15 per million tokens) are deployed, monthly compute per heavy student surges to ₹180 to ₹350 per month, consuming up to 35% of the total ₹999 subscription fee.
- **Recommendation:** Launch the feature with structural unit-economic guardrails: implement prompt context caching for standardized textbook problems, deploy a tiered model routing system (fast small models for basic algebra, frontier reasoning models only for advanced calculus), and establish a fair-use threshold of 20 advanced queries daily on the standard plan.

### Case 10: Public Sector · State Government Land Record Grievance Assistant
- **The Situation:** A state government in southern India wants to deploy a generative AI assistant across 5,000 village administrative offices to help citizens file official land record grievances, verify title mutations, and check scheme eligibility in regional languages. What operational and governance risks must be addressed?
- **Clarifying Questions:**
  1. What legal liability exists if the AI provides incorrect land title information?
  2. How does the system comply with India's Digital Personal Data Protection (DPDP) Act?
- **The Analytical Core:**
  - *Strict Non-Authority Boundary:* The AI system must operate strictly as an advisory guidance interface, never an administrative authority. It may help a citizen locate application forms or explain mutation requirements, but it must never validate legal property ownership or adjudicate boundary disputes.
  - *Hallucination Guardrails:* Land records contain historical colonial surveys, vernacular cadastral terms, and complex inheritance rights. Foundation models frequently hallucinate ownership dates. Implement strict retrieval grounding: the system must cite the exact scanned survey document number, and display the official scanned record directly to the citizen alongside any generated summary.
  - *Data Privacy & Sovereignty:* Land records contain sensitive identity details (Aadhaar numbers, caste certificates, family lineage). All data pipelines must process queries on sovereign on-soil cloud servers, with personal identifiers masked before text generation.
- **Recommendation:** Implement the assistant as a citizen information kiosk with dual-language outputs (regional language and English), requiring the village administrative officer's cryptographic physical digital signature on every formal grievance submission.

---

## Ten quantitative guesstimates

The following market-sizing and infrastructure estimations illustrate how to apply structured Fermi decomposition to modern artificial intelligence questions.

### Guesstimate 1: Total Daily Generative AI Prompts in India
- **Objective:** Estimate how many conversational AI prompts (ChatGPT, Claude, Gemini, Copilot) are submitted across India each day.
- **Decomposition Tree:**
  $$\text{Daily Prompts} = \text{Addressable Base} \times \text{Adoption Rate} \times \text{Daily Active Share} \times \text{Prompts per Active User}$$
- **Step-by-Step Calculation:**
  1. *Population Anchor:* India's total population is approximately 1,430 million (1.43 billion).
  2. *Broadband Penetration:* TRAI official data (June 2026) reports 1,087.50 million total broadband subscribers [@trai-pr104-2026]. Accounting for multiple SIM cards per individual, unique broadband users stand at approximately 750 million.
  3. *Awareness & Device Capability:* Filter for users with smartphones or PCs capable of utilizing conversational AI who are aware of foundation tools: estimate 25% of broadband users = 187.5 million people (primarily urban white-collar workers, college students, software engineers, and small business owners).
  4. *Active Usage Rate:* Of aware users, approximately 15% use conversational AI regularly = 28 million regular users.
  5. *Daily Engagement:* On any given weekday, roughly 40% of regular users are active = 11.2 million daily active users (DAUs).
  6. *Query Intensity:* Segment DAUs into two behavioral cohorts:
     - *Light / Occasional Users (70% = 7.84 million):* 4 prompts per day (email drafting, quick lookups) = 31.4 million prompts.
     - *Power Users / Developers / Students (30% = 3.36 million):* 25 prompts per day (coding, research, content creation) = 84.0 million prompts.
  7. *Total Daily Prompts:* $31.4\text{ million} + 84.0\text{ million} = 115.4\text{ million prompts per day}$.
- **Sanity Check:** 115 million prompts across 1.4 billion people represents roughly 0.08 prompts per capita daily, reflecting India's status as a high absolute volume market with low per-capita saturation (Anthropic ranks India 101st out of 116 countries per capita) [@anthropic-india-brief].

### Guesstimate 2: Monthly Token Bill for a Bank's Credit Memo Assistant
- **Objective:** Calculate the monthly cloud inference token bill for a corporate bank employing 1,200 commercial credit analysts using a retrieval-augmented LLM to draft underwriting memos.
- **Decomposition Tree:**
  $$\text{Monthly Bill} = \text{Analysts} \times \text{Memos/Month} \times \text{Tokens/Memo} \times \text{Blended Token Price}$$
- **Step-by-Step Calculation:**
  1. *Volume:* 1,200 credit analysts each evaluate an average of 6 mid-market commercial loan applications per month = 7,200 credit appraisal memos monthly.
  2. *Input Token Intensity:* To analyze a company, the assistant ingests three years of audited financial statements, director reports, and bank statements = 120 pages of documentation. At 400 words per page and 1.3 tokens per word:
     $$\text{Input Tokens per Memo} = 120 \times 400 \times 1.3 = 62{,}400\text{ tokens}$$
     Adding prompt instructions, few-shot examples, and credit policy rules brings input volume to approximately 75,000 input tokens per memo.
  3. *Output Token Intensity:* The model synthesizes an 8-page draft memorandum containing financial ratio summaries, industry risks, and covenant recommendations:
     $$\text{Output Tokens per Memo} = 8 \times 400 \times 1.3 \approx 4{,}160\text{ tokens (round to 4,500)}$$
  4. *Total Monthly Token Volume:*
     - Input Tokens: $7{,}200 \times 75{,}000 = 540\text{ million input tokens}$.
     - Output Tokens: $7{,}200 \times 4{,}500 = 32.4\text{ million output tokens}$.
  5. *Pricing Application:* Using standard enterprise tier-1 pricing (Claude Sonnet 5.5 at $2 per million input tokens and $10 per million output tokens) [@anthropic-api-pricing]:
     $$\text{Input Cost} = 540 \times \$2.00 = \$1{,}080$$
     $$\text{Output Cost} = 32.4 \times \$10.00 = \$324$$
     $$\text{Total Raw Monthly API Cost} = \$1{,}404\text{ (approx. ₹1,18,000)}$$
  6. *Infrastructure Overhead:* Adding 25% for intermediate vector database embedding searches, context reranking, and verification checks brings the total monthly infrastructure expenditure to approximately $1,755 (₹1.48 lakh).
- **Sanity Check:** A monthly bill of ₹1.48 lakh across 1,200 analysts represents approximately ₹123 per analyst per month: an extraordinarily high ROI compared to typical fully loaded analyst compensation of ₹1,00,000+ per month.

### Guesstimate 3: Dedicated GPUs to Serve 10 Million Daily AI-Tutor Students
- **Objective:** Estimate how many high-performance GPUs are required to support an online learning platform with 10 million daily active students asking real-time academic doubts.
- **Decomposition Tree:**
  $$\text{Required GPUs} = \frac{\text{Peak Tokens per Second}}{\text{Tokens per Second per GPU}}$$
- **Step-by-Step Calculation:**
  1. *Daily Query Volume:* 10 million students submit an average of 5 academic queries daily = 50 million queries per day.
  2. *Peak Concurrency:* Query distribution is concentrated in evening study hours (6:00 PM to 10:00 PM). Assume 40% of daily volume (20 million queries) arrives during this 4-hour window:
     $$\text{Peak Queries per Hour} = \frac{20{,}000{,}000}{4} = 5{,}000{,}000\text{ queries/hour}$$
     $$\text{Peak Queries per Second} = \frac{5{,}000{,}000}{3{,}600} \approx 1{,}389\text{ queries/second}$$
  3. *Token Generation Requirements:* Each query generates an average of 400 output tokens. To maintain a smooth conversational reading speed of 40 tokens per second per active user stream:
     $$\text{Aggregate Output Throughput} = 1{,}389 \times 40 = 55{,}560\text{ output tokens/second}$$
  4. *GPU Serving Capacity:* A modern server equipped with an optimized 8-GPU node running an open-source 70B parameter model with tensor parallelism generates approximately 1,200 tokens per second across batched concurrent streams.
  5. *Hardware Sizing:*
     $$\text{Required 8-GPU Nodes} = \frac{55{,}560}{1{,}200} \approx 46.3\text{ nodes (round to 48 nodes)}$$
     $$\text{Total Active GPUs} = 48 \times 8 = 384\text{ GPUs}$$
  6. *Headroom for Redundancy:* Adding 25% buffer for network failover and traffic spikes:
     $$\text{Total Provisioned GPUs} \approx 480\text{ GPUs}$$
- **Sanity Check:** Serving 10 million students with 480 high-end GPUs is technically realistic due to batching efficiency and short output lengths. At subsidized IndiaAI Mission rates of ₹65 per GPU-hour, operating 480 GPUs costs approximately ₹7.5 lakh daily (₹27 crore annually) [@pib-india-ai-moment-2026-02].

### Guesstimate 4: Power Share of IndiaAI's 38,000 GPUs in India's Data Centre Capacity
- **Objective:** Determine the proportion of India's total operational data centre electrical capacity consumed by the 38,000+ GPUs onboarded under the IndiaAI Mission.
- **Decomposition Tree:**
  $$\text{Power Share} = \frac{\text{Total GPU Cluster Power Consumption (MW)}}{\text{Total Operational Indian Data Centre Capacity (MW)}}$$
- **Step-by-Step Calculation:**
  1. *National Operational Capacity Anchor:* Cushman & Wakefield's H1 2026 data centre report documents that India's operational colocation data centre capacity reached 1,789 megawatts (MW) [@cw-india-dc-h1-2026].
  2. *GPU Inventory Anchor:* Ministry of Electronics and IT (PIB) disclosures state that the IndiaAI Mission onboarded more than 38,000 GPUs [@pib-indiaai-compute-2026-03].
  3. *Power Draw per GPU Server:* A modern high-density accelerator server housing 8 GPUs draws approximately 10.2 kilowatts (kW) of electricity (including host CPUs, memory, and networking), representing approximately 1.28 kW per individual GPU.
  4. *Direct IT Power Consumption:*
     $$\text{Direct IT Power} = 38{,}000 \times 1.28\text{ kW} = 48{,}640\text{ kW} \approx 48.64\text{ MW}$$
  5. *Facility Overhead (PUE):* Advanced high-density data centres operate with a Power Usage Effectiveness (PUE) of approximately 1.35 to 1.45 (accounting for chillers, liquid cooling pumps, and power transformation losses):
     $$\text{Total Facility Power Draw} = 48.64\text{ MW} \times 1.40 \approx 68.1\text{ MW}$$
  6. *Percentage Share:*
     $$\text{Share of National Capacity} = \frac{68.1\text{ MW}}{1{,}789\text{ MW}} \approx 3.81\%$$
- **Sanity Check:** The IndiaAI compute pool accounts for approximately 3.8% of the country's total energized data centre capacity. This aligns with industry observations that sovereign AI infrastructure represents a focused, high-density fraction of a broader cloud computing market dominated by standard enterprise banking, retail, and government workloads.

### Guesstimate 5: Addressable Market for Paid Enterprise AI Seats in India
- **Objective:** Estimate the annual total addressable market (TAM) in INR for paid corporate AI assistant licenses (such as ChatGPT Business or Microsoft Copilot) across Indian enterprises.
- **Decomposition Tree:**
  $$\text{Annual TAM} = \text{Addressable White-Collar Workers} \times \text{Enterprise Adoption Share} \times \text{Annual Seat Price}$$
- **Step-by-Step Calculation:**
  1. *White-Collar Labor Base:* India's total workforce is approximately 580 million. Formal white-collar enterprise employees in organized sectors (IT/ITeS, BFSI, consulting, pharmaceuticals, telecommunications, corporate FMCG) number approximately 25 million workers.
  2. *Target Knowledge Workers:* Of the 25 million formal employees, approximately 40% perform desk-based cognitive tasks (writing, analysis, coding, customer communications) where a dedicated enterprise assistant provides measurable utility = 10 million addressable knowledge workers.
  3. *Enterprise Adoption Penetration:* In the medium term (over the next 3 to 4 years), estimate that 35% of eligible knowledge workers will be provisioned with paid corporate enterprise licenses by their employers = 3.5 million paid seats.
  4. *Pricing Anchor:* OpenAI publishes localized pricing for ChatGPT Business in India at ₹1,800 per seat per month (billed annually at ₹21,600 per seat per year) [@openai-chatgpt-business-pricing].
  5. *Market Size Calculation:*
     $$\text{Annual TAM} = 3{,}500{,}000\text{ seats} \times ₹21{,}600/\text{year} = ₹75{,}600{,}000{,}000\text{ (₹7,560 crore or approx. \$900M)}$$
- **Sanity Check:** A ₹7,560 crore market represents approximately 1.5% of India's total annual domestic software and IT services spend, indicating a substantial but realistic addressable software expenditure for enterprise automation.

### Guesstimate 6: Annual Consulting Hours Saved at a 5,000-Person Advisory Practice
- **Objective:** Estimate how many net billable hours can be reclaimed annually through AI assistance at a 5,000-person Indian management and technology consulting practice.
- **Decomposition Tree:**
  $$\text{Net Hours Saved} = \text{Junior Staff} \times \text{Annual Working Hours} \times \text{Gross Speedup} \times \text{Net Capacity Capture Rate}$$
- **Step-by-Step Calculation:**
  1. *Staffing Breakdown:* In a 5,000-person practice, assume 60% are junior analysts and associates (3,000 staff), 25% are engagement managers (1,250 staff), and 15% are partners and directors (750 staff).
  2. *Working Hours Baseline:* An associate works an average of 48 weeks annually at 50 hours per week = 2,400 working hours per year per associate.
  3. *Total Junior Labor Base:* $3{,}000 \times 2{,}400 = 7{,}200{,}000\text{ total working hours annually}$.
  4. *Task Exposure & Speedup:* Boston Consulting Group's empirical trial (Dell'Acqua et al., 2026) demonstrated a 25.1% speedup on tasks inside the technological frontier [@dellacqua-jagged-orgsci]. Assuming 40% of an associate's working hours involve tasks within AI's capability frontier (research synthesis, initial deck structuring, Excel financial modeling):
     $$\text{Exposed Hours} = 7{,}200{,}000 \times 0.40 = 2{,}880{,}000\text{ hours}$$
     $$\text{Gross Time Saved} = 2{,}880{,}000 \times 0.251 \approx 722{,}880\text{ hours}$$
  5. *Capacity Leakage & Review Discount:* BCG survey findings (2026) show that 47% of workers spend extra time managing and checking AI outputs, with substantial time leaking into unmonitored breaks [@bcg-ai-at-work-2026]. Assume a conservative net capacity capture rate of 35% (the remaining 65% leaks into shadow reviews or downtime):
     $$\text{Net Reclaimed Productive Hours} = 722{,}880 \times 0.35 \approx 253{,}000\text{ hours annually}$$
- **Sanity Check:** Reclaiming 253,000 hours across 3,000 associates equals approximately 84 hours per associate per year (roughly two full working weeks of captured capacity), equivalent to adding 105 full-time consultants to the firm without increasing headcount.

### Guesstimate 7: Cost per Resolved Customer Support Query: Human vs. AI Copilot
- **Objective:** Compare the total operating cost per resolved customer support inquiry between a traditional human BPO agent and an AI-automated resolution pipeline for an Indian e-commerce platform.
- **Decomposition Tree:**
  $$\text{Human Cost/Query} = \frac{\text{Fully Loaded Agent Cost}}{\text{Monthly Resolved Volume}}$$
  $$\text{AI Cost/Query} = \text{Model Token Fees} + \text{Cloud Infrastructure} + (\text{Escalation Rate} \times \text{Human Cost})$$
- **Step-by-Step Calculation:**
  1. *Human BPO Baseline:*
     - A tier-1 customer service agent costs the enterprise ₹45,000 per month (including salary, facility overhead, workstations, and supervisor management).
     - The agent works 22 days per month, resolving an average of 65 tickets daily (with an average handle time of 6 minutes per ticket) = 1,430 tickets per month.
     $$\text{Cost per Human Resolution} = \frac{₹45{,}000}{1{,}430} \approx ₹31.47\text{ per ticket}$$
  2. *AI-Automated Pipeline:*
     - *Token Consumption:* An average support ticket requires a 4-turn conversational exchange: total input tokens = 3,500 (user chat history, system prompt, customer order context); total output tokens = 600.
     - *Raw API Pricing:* At standard API rates (₹0.25 per million input tokens, ₹1.00 per million output tokens):
       $$\text{Token Cost} = (3{,}500 \times ₹0.00000025) + (600 \times ₹0.00000100) = ₹0.000875 + ₹0.000600 \approx ₹0.0015$$
     - *Infrastructure Overhead:* Database vector retrieval, telephony text-to-speech conversion, and cloud logging add ₹0.40 per session. Total direct AI cost = ₹0.40 per ticket.
  3. *Containment and Human Fallback:*
     - The AI assistant achieves a true [[containment-rate|containment rate]] of 70% (resolving inquiries completely).
     - The remaining 30% of complex inquiries escalate to a human agent, incurring the human cost:
       $$\text{Blended Effective Cost per Ticket} = (0.70 \times ₹0.40) + [0.30 \times (₹0.40 + ₹31.47)]$$
       $$\text{Blended Cost} = ₹0.28 + (0.30 \times ₹31.87) = ₹0.28 + ₹9.56 = ₹9.84\text{ per ticket}$$
- **Sanity Check:** The blended automated pipeline cuts cost from ₹31.47 to ₹9.84 per ticket, representing a 69% operating expense reduction while maintaining human resolution for edge cases.

### Guesstimate 8: Daily Compute to Score UPI Transactions for Real-Time Fraud
- **Objective:** Estimate the total computational workload and server cluster size required to run a real-time predictive machine learning fraud score on every UPI payment in India.
- **Decomposition Tree:**
  $$\text{Required Servers} = \frac{\text{Peak Transactions per Second} \times \text{Inference Latency per Score}}{\text{Cores per Server}}$$
- **Step-by-Step Calculation:**
  1. *Daily Volume Anchor:* Unified Payments Interface (UPI) processes approximately 600 million transactions daily during standard operating periods.
  2. *Peak Concurrency:* Peak transaction activity occurs between 12:00 PM and 2:00 PM and 7:00 PM and 9:00 PM (retail shopping and dining hours). Assume 35% of daily volume (210 million transactions) arrives across these 4 peak hours:
     $$\text{Peak Transactions per Hour} = \frac{210{,}000{,}000}{4} = 52{,}500{,}000\text{ tx/hour}$$
     $$\text{Peak Transactions per Second (TPS)} = \frac{52{,}500{,}000}{3{,}600} \approx 14{,}583\text{ TPS (round to 15,000 TPS)}$$
  3. *Inference Latency Budget:* A fraud model must score transactions without delaying payment processing at checkout. The algorithmic inference budget is strictly capped at 20 milliseconds (ms) per transaction.
  4. *Core Concurrency:* If each score occupies 1 CPU core for 20 ms, a single core can process 50 transaction scores per second ($1{,}000\text{ ms} / 20\text{ ms} = 50$).
  5. *Required Computing Cores:*
     $$\text{Dedicated Cores at Peak} = \frac{15{,}000\text{ TPS}}{50\text{ TPS/core}} = 300\text{ dedicated compute cores}$$
  6. *Server Infrastructure:* A standard enterprise rack server houses dual 64-core processors (128 cores per server). Accounting for a 3x redundancy multiplier for high-availability failover and geo-redundancy across Mumbai and Hyderabad:
     $$\text{Required Cores with Redundancy} = 300 \times 3 = 900\text{ cores}$$
     $$\text{Total Enterprise Servers} = \frac{900}{128} \approx 7\text{ enterprise servers}$$
- **Sanity Check:** Real-time fraud scoring for 600 million daily payments requires only 7 to 10 standard enterprise servers because predictive ML models (gradient-boosted trees) are computationally lightweight, executing in milliseconds compared to resource-intensive large language models.

### Guesstimate 9: Annual Cloud Storage Bill for a Hospital Chain's Imaging Archive
- **Objective:** Estimate the annual cloud storage and retrieval expenditure for a 15-hospital healthcare network archiving digital radiology scans (X-ray, CT, MRI) over a mandatory seven-year medical compliance window.
- **Decomposition Tree:**
  $$\text{Annual Bill} = (\text{Total Terabytes Stored} \times \text{Storage Rate/TB}) + (\text{Retrieval Volume} \times \text{Egress Rate})$$
- **Step-by-Step Calculation:**
  1. *Daily Imaging Volume:* Across 15 hospital facilities, the network performs:
     - 1,200 digital X-rays daily (30 MB per study) = 36 GB/day.
     - 300 CT scans daily (250 MB per study) = 75 GB/day.
     - 150 MRI scans daily (400 MB per study) = 60 GB/day.
     $$\text{Daily Storage Generation} = 36 + 75 + 60 = 171\text{ GB per day}$$
     $$\text{Annual Ingestion} = 171\text{ GB} \times 365 \approx 62{,}415\text{ GB} \approx 62.4\text{ Terabytes (TB) per year}$$
  2. *Seven-Year Cumulative Archive:* Over a 7-year retention period, cumulative stored data reaches:
     $$62.4\text{ TB/year} \times 7\text{ years} \approx 437\text{ Terabytes}$$
  3. *Tiered Cloud Storage Architecture:*
     - *Hot Storage (Year 1 = 62.4 TB):* Frequently accessed for patient follow-ups. Billed at standard cloud object storage rates of ₹1,800 per TB per month:
       $$62.4\text{ TB} \times ₹1{,}800 \times 12\text{ months} = ₹13{,}47{,}840/\text{year}$$
     - *Cold / Archive Storage (Years 2-7 = 374.6 TB):* Rarely accessed compliance archives. Billed at deep archive tier rates of ₹300 per TB per month:
       $$374.6\text{ TB} \times ₹300 \times 12\text{ months} = ₹13{,}48{,}560/\text{year}$$
  4. *Total Annual Storage Expenditure:*
     $$₹13{,}47{,}840 + ₹13{,}48{,}560 = ₹26{,}96{,}400\text{ (approx. ₹27 lakh annually)}$$
- **Sanity Check:** An annual cloud bill of ₹27 lakh across 15 multi-specialty hospitals represents approximately ₹1.8 lakh per hospital annually: a marginal operating expense compared to multi-crore medical equipment maintenance agreements.

### Guesstimate 10: Capital Outlay to Build a 50 MW Sovereign AI Data Centre in Navi Mumbai
- **Objective:** Estimate the total capital expenditure (capex) required to construct a 50-megawatt (MW) high-density AI data centre facility in the Navi Mumbai technology corridor.
- **Decomposition Tree:**
  $$\text{Total Capex} = \text{Land \& Core Building} + \text{Electrical Substation Infrastructure} + \text{Liquid Cooling Plant} + \text{Fit-Out Overhead}$$
- **Step-by-Step Calculation:**
  1. *Energized Capacity Anchor:* 50 megawatts of utility power provisioning.
  2. *Unit Capital Cost Assumption (Candidate Assumption):* In commercial infrastructure modeling, developing tier-3 high-density AI data centre facilities typically requires between $7.5 million and $9.0 million per energized megawatt (excluding tenant-supplied GPU servers). Assume a working midpoint of $8.25 million per MW (approx. ₹69.3 crore per MW at ₹84/USD).
  3. *Capital Cost Breakdown for 50 MW:*
     - *Power Substation & Dual-Feed Grid Interconnects (35%):* ₹1,212 crore (dedicated 220kV substations, backup diesel generators, uninterruptible power supply batteries).
     - *Liquid Cooling & Chilled Water Infrastructure (25%):* ₹866 crore (direct-to-chip liquid distribution manifolds, cooling towers, heat exchangers rated for 50 to 80 kW rack densities).
     - *Land Acquisition & Reinforced Shell Construction (22%):* ₹762 crore (land parcel in Navi Mumbai industrial zone, reinforced concrete floor loading for heavy server racks).
     - *Mechanical, Electrical, and Fire Suppression Fit-Out (18%):* ₹624 crore (gas-based fire suppression, environmental monitoring, security enclosures).
  4. *Total Capital Outlay:*
     $$\text{Total Facility Capex} = ₹1{,}212 + ₹866 + ₹762 + ₹624 = ₹3{,}464\text{ crore (approx. \$412 million)}$$
- **Sanity Check:** A ₹3,464 crore facility capex for 50 MW equals approximately ₹69.3 crore per MW ($8.25M/MW). In context, this single facility represents roughly 2.8% of India's current 1,789 MW operational colocation base reported by Cushman & Wakefield [@cw-india-dc-h1-2026], illustrating the massive capital intensity required to build out the nation's 3,860 MW development pipeline.

---

## Where this shows up at work

::: lens consulting
In strategy and operations interviews at firms like McKinsey, BCG, and Bain, the AI casebook represents the new frontier of partner evaluations. Partners do not expect candidates to write machine learning algorithms on the whiteboard. They evaluate whether the candidate can dissect an executive's vague technology optimism into concrete P&L levers: calculating true containment rates, exposing hidden review overhead, establishing pilot kill rules, and structuring defensible commercial contracts.
:::

::: interview Structuring the AI due diligence case
**Q.** A private equity fund asks you to evaluate a ₹400 crore buyout of an 'AI customer support' software business that boasts an 80% automated resolution rate. Walk me through the first three operational tests you would conduct during commercial due diligence.

> "I would conduct three operational tests: first, verify true containment versus silent customer abandonment; second, inspect the software architecture to separate proprietary intellectual property from third-party API wrapper dependencies; and third, calculate fully loaded gross margins by factoring in human review labor and cloud inference token bills."

**What they are testing.** Whether you recognize the difference between marketing claims and operational reality, know how to audit software unit economics, and understand private equity investment risks.

**A strong structure.**
1. **Audit the Containment Rate:** Define what happens when a session closes. Check customer re-contact rates within 24 hours, phone escalation spikes, and customer satisfaction (CSAT) scores across automated sessions. Expose whether users abandon the chatbot in frustration.
2. **Inspect the Technology Stack:** Determine whether the target owns defensible model weights and unique training data, or simply passes customer prompts to commercial APIs (such as OpenAI or Anthropic). Model the target's vulnerability if cloud hyperscalers introduce identical features natively.
3. **Calculate Fully Loaded Gross Margins:** Uncover hidden human-in-the-loop labor: audit how many offshore contractors manually review chat transcripts or correct edge cases. Subtract third-party API bills and contractor wages from gross revenue to determine whether true software gross margins are 80% or closer to 25%.
:::

::: try Sizing the token and server costs for a customer support bot
No code. Use ChatGPT, Claude, or Gemini. This exercise trains you to run rapid back-of-the-envelope calculations for token volumes and compute bills during an interview.

Paste this prompt into a fresh chat:

```
You are a consultant preparing for an MBB interview. Run a complete guesstimate and unit-economic calculation for this scenario:

Scenario:
An Indian food delivery app handles 1.2 million customer support chats per day.
- Current human BPO cost: Rs 25 per resolved ticket.

The company plans to automate support using a foundation model API:
- Each chat requires an average of 4 turns (user asks, bot responds).
- Average input context per turn: 1,500 tokens (system instructions, past order data, chat history).
- Average output per turn: 250 tokens.
- API pricing: Rs 0.20 per million input tokens, Rs 0.80 per million output tokens.
- Model containment rate: 65% (65% resolved without human intervention).
- Unresolved chats (35%) route to a human agent, incurring the full Rs 25 human cost.

Calculate:
1. Total daily input and output tokens generated across all 1.2 million chats.
2. The daily and monthly raw API bill in INR.
3. The effective blended cost per ticket across all 1.2 million daily contacts.
4. Total annual net savings in INR compared to the 100% human BPO baseline.
```

Review the calculation. Notice how decomposing the conversation into turns, input context, output tokens, and containment rates allows you to calculate exact enterprise savings with confidence.
:::

{{read cw-india-dc-h1-2026}}

{{read anthropic-api-pricing}}

{{read openai-chatgpt-business-pricing}}

::: check Check yourself
1. What is the fundamental difference between a software "wrapper" and a defensible enterprise AI asset in a private equity due diligence case? <span class="lvl">recall</span>
2. Why is customer "containment rate" a dangerous standalone metric when evaluating automated customer support systems? <span class="lvl">explain</span>
3. A retail bank wants to use generative AI to decide whether to approve or reject personal loan applications. How would you critique this operational architecture, and what alternative workflow would you propose? <span class="lvl">apply</span>
4. An Indian edtech startup claims its unlimited AI doubt solver can be offered free of charge to all registered app users. How would you model the unit-economic risks of this proposal using token consumption mathematics? <span class="lvl">transfer</span>
5. How would you evaluate the strategy of an IT services firm that cuts its hourly billing rates by 30% because AI copilots made junior programmers 30% faster? What commercial alternative should the firm pursue? <span class="lvl">judge</span>
:::

::: answers
1. A software wrapper is an application that routes user prompts to third-party commercial APIs (such as OpenAI or Anthropic) with thin prompt engineering and basic user interfaces, creating high vulnerability to platform disintermediation and thin gross margins. A defensible AI asset owns proprietary domain datasets, fine-tuned model weights, deep integrations with core enterprise databases, and verified workflow lock-in that cannot be easily replicated by generic models.
2. Containment rate measures the percentage of sessions that ended without the user selecting an escalation option, but fails to measure whether the customer's problem was actually resolved. In many automated deployments, high containment reflects user frustration and premature session abandonment rather than successful resolution. Companies must pair containment rates with 24-hour repeat contact rates, customer satisfaction (CSAT) scores, and downstream complaint escalations.
3. Generative language models produce non-deterministic, probabilistic outputs and cannot explain their exact mathematical reasoning, violating financial regulatory requirements (such as RBI and Fair Lending mandates) that require auditable, transparent explanations for credit denials. The candidate should propose a decoupled architecture: use multimodal generative models strictly to extract and normalize unstructured document data (such as bank statement tables), then feed those structured metrics into an auditable, deterministic predictive machine learning model (such as XGBoost) to compute credit risk.
4. Offering an unlimited generative AI assistant free of charge introduces severe unit-economic exposure: foundation model inference incurs variable per-token marginal costs on every query. If active exam students submit 20 complex STEM queries daily with multimodal image attachments, each student generates tens of thousands of tokens, costing the firm ₹150 to ₹300 monthly in cloud inference fees. Without subscription revenue or strict query rate-limiting, compute costs scale linearly with user engagement while platform revenue remains zero, leading to rapid cash depletion.
5. Cutting hourly rates by 30% when task hours have already fallen by 30% causes enterprise revenue to collapse by more than 50%, penalizing the firm for its own efficiency. Instead of accepting across-the-board hourly rate cuts, the firm should transition contracts to managed capacity pods or fixed-fee milestone agreements. Under an outcome-based model, the firm commits to delivering higher feature volume on fixed timelines, preserving its top-line billing while capturing the operating margin expansion enabled by software tools.
:::

::: recap The night-before page
1. The four core case archetypes: Technology Due Diligence (wrapper vs. moat), Value-Chain Mapping (GenAI vs. classic ML), Pilot Diagnostics (time leakage and change management), and Unit Economics (tokens, GPUs, and outcome pricing).
2. Deconstruct vanity metrics: Never accept "80% containment" or "90% model accuracy" at face value; audit true resolution, customer re-contact rates, and hidden human review costs.
3. Decouple extraction from decisioning: In regulated sectors like banking and healthcare, use generative models to parse unstructured documents, but require deterministic, auditable algorithms for final decisions.
4. Master the token-to-infrastructure tree: Link user prompts to input context, output tokens, API pricing, GPU-hours (₹65/hr IndiaAI), and facility power (1,789 MW operational capacity).
5. Ground answers in real Indian anchors: India has 1,348M telecom subscribers and 1,087M broadband connections (TRAI, 2026), but ranks 101st per capita in AI use (Anthropic, 2026); addressable enterprise demand requires rigorous filtering.
:::
