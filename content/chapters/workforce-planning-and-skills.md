---
id: workforce-planning-and-skills
title: "Workforce planning when the task is the unit: exposure, skills, and reskilling"
deck: "Task-level AI exposure, skills taxonomies (O*NET, ESCO), build-buy-borrow-bot, reskilling economics, and attrition models with their ethics."
level: Zero to one
tracks: [hr, strategy]
prereq: [work-changes, pilots-stall]
hook: "Why counting jobs by occupational title hides the real impact of artificial intelligence, and how sizing hours freed per task rewrites the economics of enterprise reskilling."
objectives:
  - "**Deconstruct** occupational roles into granular task units using standardized taxonomies like O*NET and ESCO."
  - "**Quantify** technical task exposure ($\alpha$) and differentiate between labor substitution (automation) and labor complementation (augmentation)."
  - "**Formulate** an enterprise talent strategy using the expanded Build-Buy-Borrow-Bot framework."
  - "**Calculate** the net economic return of internal workforce reskilling versus severance and external rehiring."
---

When enterprise leadership debates the future of work, the conversation almost universally collapses into two extreme caricatures. On one side stands the apocalyptic headcount forecast: headlines declaring that artificial intelligence will destroy forty percent of knowledge work, rendering millions of analysts, paralegals, and software developers redundant. On the other side stands corporate complacency: claims that because total employment numbers have not cratered overnight, generative AI is merely an overhyped novelty that changes nothing.

Both views suffer from a fatal methodological error: they treat an "occupation" as an indivisible atom of labor.

An enterprise does not employ a monolithic "Credit Analyst," "Human Resources Generalist," or "Supply Chain Planner." It employs a human professional who executes between twenty and fifty distinct, heterogeneous work activities every week. A credit analyst parses balance sheet footnotes, validates tax return formats, extracts bank statement ratios, evaluates borrower management integrity, attends credit committee debates, and negotiates loan covenant exceptions. Some of these activities involve structured pattern matching and lexical extraction, tasks where transformer models operate with superhuman speed. Other activities require contextual skepticism, cross-examination, and organizational negotiation, domains where stochastic models provide zero reliable judgment.

==AI exposure is measured per task, not per job, so workforce planning has to move from headcount by role to hours by task.== When enterprise leaders stop asking "How many jobs will AI replace?" and start asking "How many task-hours will AI free up, and how should we redeploy that capacity?", strategic workforce planning transforms from defensive headcount reduction into competitive capital allocation.

## The anatomy of task exposure: O*NET, ESCO, and the 50% threshold

To measure labor disruption rigorously, economists and people analytics researchers abandon occupational titles and decompose work into standardized [[skills-taxonomy|skills taxonomies]]:

- **O*NET (Occupational Information Network):** Sponsored by the U.S. Department of Labor, O*NET classifies over 900 occupations, breaking them down into more than 19,000 distinct task statements and Detailed Work Activities (DWAs) [@onet-taxonomy-database].
- **ESCO (European Skills, Competences, Qualifications and Occupations):** The European Commission's multilingual taxonomy mapping 3,000 occupations to 13,800 validated skill concepts.

In their seminal empirical study on labor market exposure, Eloundou, Manning, Mishkin, and Rock (2023) established the formal metric of **[[task-exposure|Task-Level AI Exposure]] ($\alpha$)** [@eloundou-gpts-are-gpts-2023]:

$$\alpha = \begin{cases} 1 & \text{if access to an LLM reduces task completion time by } \ge 50\% \text{ without quality degradation} \\ 0 & \text{otherwise} \end{cases}$$

Evaluating all 19,261 O*NET task statements, Eloundou et al. discovered [@eloundou-gpts-are-gpts-2023]:
- Approximately **80% of the U.S. workforce** belongs to occupations where at least 10% of work tasks have direct AI exposure ($\alpha = 1$) [@eloundou-gpts-are-gpts-2023].
- **19% of workers** belong to occupations where at least 50% of tasks are exposed [@eloundou-gpts-are-gpts-2023].
- Higher-wage knowledge roles (information technology, finance, legal analysis, accounting) exhibit substantially higher task exposure than lower-wage physical occupations [@eloundou-gpts-are-gpts-2023].

Crucially, global findings from the International Labour Organization (ILO) confirm that task exposure does not equal job destruction [@ilo-genai-jobs-exposure-2023]. Across middle-class clerical and analytical roles, generative AI functions overwhelmingly as an **augmentative technology** rather than an autonomous replacement. When 30% of an analyst's task hours are automated, the employee is rarely terminated; instead, the 30% time dividend is absorbed by expanding output volume, deepening qualitative analysis, or reallocating hours to previously neglected strategic projects.

```text
The Shift in Occupational Capacity:
  Pre-AI Baseline (40 Hours/Week)
  ┌────────────────────────┬──────────────────────┬────────────────┐
  │ Data Extraction &      │ Drafting & Slide Prep│ Client Strategy│
  │ Routine Analysis (18h) │ (14h)                │ & Review (8h)  │
  └────────────────────────┴──────────────────────┴────────────────┘
  
  Post-AI Task Allocation (40 Hours/Week)
  ┌──────┬────────┬────────────────────────────────────────────────┐
  │ Auto │ Draft  │ Expanded Strategic Judgment, Problem Solving,  │
  │ (3h) │ (5h)   │ Cross-Functional Execution & Client Review (32h)│
  └──────┴────────┴────────────────────────────────────────────────┘
```

## Augmentation vs. Automation: The 4 Quadrants

To translate task exposure into workforce strategy, tasks must be evaluated across two independent operational dimensions:
1. **Technical AI Exposure:** Can a foundation model or autonomous agent execute this task with high fidelity and at least a 50% time reduction?
2. **Value of Human Judgment & Empathy:** Does the task require physical presence, emotional attunement, ethical accountability, or context-dependent risk tolerance?

Plotting these dimensions yields the **Task-Level AI Exposure Matrix**:

```text
Value of Human Judgment & Empathy
  ▲
  │   [QUADRANT 3: HUMAN ANCHOR]          [QUADRANT 1: AUGMENT & SUPERVISE]
  │   • Termination counseling            • Performance review synthesis
  │   • Executive leadership coaching     • Complex customer dispute resolution
  │   • Whistleblower investigation       • Strategic workforce modeling
  │   • Union collective bargaining       • Organizational policy design
  │   ──────────────────────────────────────────────────────────────────────
  │   [QUADRANT 4: STREAMLINE]            [QUADRANT 2: AUTOMATE & DELEGATE]
  │   • Physical badge security scans     • L1 FAQ helpdesk ticket routing
  │   • Paperwork compliance sign-off     • Leave balance inquiry lookups
  │   • Ergonomic workplace inspections   • Calendar interview coordination
  │   • Equipment handover verification   • Expense report receipt policy checks
  └────────────────────────────────────────────────────────────────────────►
  Low                                                                   High
                         Technical AI Exposure (α)
```

::: principle The task-level decomposition of work
1. An occupation is a bundle of heterogeneous tasks, not an indivisible unit of labor.
2. Foundation models do not replace jobs; they execute specific cognitive tasks (synthesizing text, extracting entities, classifying sentiment, generating code).
3. Measuring AI disruption by headcount destruction generates false forecasts; measuring by task-hours freed exposes true workforce capacity shifts.
4. Automation substitutes labor; augmentation shifts human attention from mechanical generation to critical evaluation, exception routing, and synthesis.
5. The competitive advantage of an enterprise lies not in shrinking headcount to zero, but in redeploying freed task-hours toward higher-margin, customer-facing judgment tasks.
:::

::: concept Task-level AI exposure and skills taxonomies
**Plain words.** Instead of looking at an entire job title like "HR Associate" and asking if an AI can replace it, task-level exposure looks at the twenty specific things that person does all week. If an AI tool can do five of those things in half the time, the job isn't gone; 25% of that person's week is now free for other work.

**Analogy.** An automobile mechanic. An electronic OBD-II diagnostic scanner automates the task of identifying engine fault codes in thirty seconds, replacing hours of manual trial-and-error inspection. The scanner does not eliminate the mechanic; it frees the mechanic to spend their time actually disassembling the transmission, replacing worn gears, and road-testing the vehicle.

**Misconception.** "If AI can do 40% of the tasks in an accounting department, the company will immediately lay off 40% of the accountants." Laying off 40% of the staff removes 100% of the capability for the remaining 60% of unautomated tasks. In practice, firms absorb task-hour savings by expanding audit coverage, eliminating backlog, and taking on higher-value advisory services.
:::

{{figure task-exposure-matrix | The Task-Level AI Exposure Matrix and the Four Allocation Quadrants. | Mapping enterprise activities across technical exposure and value of human judgment to guide automation, augmentation, reskilling, and protection.}}

## The Build-Buy-Borrow-Bot strategic framework

Faced with massive task reallocation, traditional human resources planning, built around static annual headcount budgets, breaks down. Chief Human Resources Officers use an expanded five-element framework: **Build, Buy, Borrow, Bot, and Bounce**:

| Strategy | Operational Definition | Best-Fit Scenarios | Economic Trade-off |
|---|---|---|---|
| **Bot** (Automate) | Deploy autonomous agents or deterministic software to eliminate human task hours entirely. | High technical exposure ($\alpha \approx 1$), low human judgment necessity (Quadrant 2). | High software capex and integration cost, near-zero marginal operational cost. |
| **Build** (Reskill) | Upskill existing employees whose routine tasks were freed up, transitioning them into higher-tier analytical or advisory roles. | Existing staff possess deep institutional context, client relationship trust, and proprietary process knowledge. | Moderate training investment (1–2 months CTC); preserves institutional memory and avoids morale damage. |
| **Buy** (Hire) | Recruit external talent possessing emergent technical capabilities not present in the current workforce. | Frontier capability gaps: AI safety engineers, prompt architects, specialized data governance leads. | High search fees (15–25% CTC), premium market compensation, culture assimilation friction. |
| **Borrow** (Contract) | Engage external consultants, systems integrators, or interim gig specialists. | One-time enterprise transformations, pilot architecture builds, regulatory audit readiness. | High hourly billing rates, zero long-term fixed overhead, knowledge leaves when contract ends. |
| **Bounce** (Sever) | Graceful, lawful separation of structural redundancies when tasks disappear without redeployment pathways. | Obsolescence of isolated, non-reskillable physical or administrative roles. | Direct severance costs, legal release risks, negative employer brand impact, team survivor guilt. |

## Sizing the reskilling dividend: The economics of redeployment

The central strategic question facing enterprise leadership is whether to **sever and rehire** or **retain and reskill**. According to the World Economic Forum's *Future of Jobs Report 2025* [@wef-future-of-jobs-2025]:
- Globally, employers project that **170 million new roles will emerge** by 2030, while **92 million existing roles will be displaced**, generating a net expansion of 78 million employment opportunities [@wef-future-of-jobs-2025].
- **44% of workers' core skills** will change between 2025 and 2030 [@wef-future-of-jobs-2025].
- More than **6 in 10 workers** will require structured reskilling or upskilling before 2027 [@wef-future-of-jobs-2025].

When routine cognitive tasks are automated, naive financial planning suggests laying off redundant junior staff and hiring experienced specialists from the external market. However, rigorous financial modeling demonstrates that internal reskilling almost always yields a superior Net Present Value ($NPV$).

### The Net Economic Benefit Formulation

Let $C_{\text{severance}}$ be the total cost of terminating an employee (statutory notice, retrenchment compensation, accrued leave encashment, outplacement advisory).

Let $C_{\text{rehiring}}$ be the fully loaded cost of acquiring an external replacement (recruiter search commissions, signing bonuses, interview panel time, and the "ramp-up drag", the productivity loss during the 3 to 6 months an external hire takes to reach full organizational efficiency).

Let $C_{\text{reskilling}}$ be the total cost of putting the existing employee through a structured, multi-week reskilling academy (courseware licensing, dedicated instructor time, computing sandboxes, and absorbed salary during non-productive training hours).

The **Net Economic Benefit ($NEB$)** per employee is:

$$NEB = (C_{\text{severance}} + C_{\text{rehiring}}) - C_{\text{reskilling}}$$

Whenever $(C_{\text{severance}} + C_{\text{rehiring}}) > C_{\text{reskilling}}$, internal workforce reskilling delivers direct operational cash savings while protecting corporate culture.

::: case Illustrative · Task mapping and reskilling at a 20,000-seat BPO/GCC
#### The situation
A Global Capability Center (GCC) operating across Bengaluru and Hyderabad employs 20,000 technology and customer operations professionals. The center's largest single unit is Customer Support Services, comprising 8,000 front-line customer support representatives earning an average Cost-to-Company (CTC) of ₹4,80,000 annually (₹40,000 per month). 

The GCC deploys an enterprise generative AI customer copilot that automates Tier-1 ticket triage, retrieves knowledge-base policy articles, and drafts automated case resolutions.

#### The decision
The leadership team conducts a rigorous task-level exposure audit across the 8,000 customer support roles:

| Task Cluster | Weekly Hours | AI Exposure ($\alpha$) | Hours Saved / Wk | Task Nature |
|---|---|---|---|---|
| **L1 Factual Inquiries** (order status, refund checks) | 18 hrs (45%) | $80\%$ | 14.4 hrs | Quadrant 2: Automate |
| **CRM Ticket Logging & Summarization** | 8 hrs (20%) | $75\%$ | 6.0 hrs | Quadrant 2: Automate |
| **Complex Escalations & Exceptions** (billing disputes) | 10 hrs (25%) | $20\%$ | 2.0 hrs | Quadrant 1: Augment |
| **Customer Retention & Empathy Conversations** | 4 hrs (10%) | $0\%$ | 0.0 hrs | Quadrant 3: Anchor |
| **Total** | **40 hrs (100%)** | — | **22.4 hrs (56%)** | — |

The copilot automates 22.4 hours out of every 40-hour work week, freeing $56\%$ of aggregate team capacity. In headcount terms, this represents:

$$8{,}000 \text{ employees} \times 0.56 = \mathbf{4{,}480\text{ Full-Time Equivalents (FTEs) freed}}$$

The Chief Operating Officer initially proposes a workforce reduction of 4,000 associates. The Chief Human Resources Officer counters with an alternative proposal: transition 4,000 associates through an intensive 16-week "Enterprise Solutions Specialist" reskilling academy to staff expanding Tier-2 technical support, fraud investigation, and client relationship management teams.

#### Your move
The CHRO presents the comparative financial balance sheet:

**Option A: Sever and Rehire (External Churn)**
1. Statutory Severance & Retrenchment:
   Under Indian labor law and corporate policy, severance averages 4 months of pay:
   $$C_{\text{severance}} = 4 \times \text{₹}40{,}000 = \text{₹}1{,}60{,}000 \text{ per employee}$$
2. External Hiring & Ramp Drag for 4,000 New Specialists:
   Recruiting agency fees ($15\%$ of new ₹6,00,000 CTC) plus 3 months of reduced productivity during onboarding:
   $$C_{\text{rehiring}} = \text{₹}90{,}000 + (3 \times \text{₹}50{,}000 \times 0.50) = \text{₹}1{,}65{,}000 \text{ per employee}$$
3. Total Severance + Rehire Cost:
   $$(C_{\text{severance}} + C_{\text{rehiring}}) = \text{₹}1{,}60{,}000 + \text{₹}1{,}65{,}000 = \mathbf{\text{₹}3{,}25{,}000 \text{ per employee}}$$
   For 4,000 employees:
   $$\text{Total Cost}_{\text{Sever}} = 4{,}000 \times \text{₹}3{,}25{,}000 = \mathbf{\text{₹}130.00\text{ crore}}$$

**Option B: The Internal Reskilling Academy**
1. Academy Program Costs:
   16 weeks of structured curriculum, technical certifications, cloud sandboxes, and expert mentor coaching: ₹35,000 per learner.
2. Absorbed Non-Productive Salary:
   Learners dedicate half-time (20 hrs/week) to training over 16 weeks (2 months of full salary absorbed):
   $$C_{\text{absorbed}} = 2 \times \text{₹}40{,}000 = \text{₹}80{,}000 \text{ per employee}$$
3. Total Reskilling Investment:
   $$C_{\text{reskilling}} = \text{₹}35{,}000 + \text{₹}80{,}000 = \mathbf{\text{₹}1{,}15{,}000 \text{ per employee}}$$
   For 4,000 employees:
   $$\text{Total Cost}_{\text{Reskill}} = 4{,}000 \times \text{₹}1{,}15{,}000 = \mathbf{\text{₹}46.00\text{ crore}}$$

**The Financial and Strategic Verdict:**
The Net Economic Benefit of reskilling is:

$$NEB = \text{₹}130.00\text{ Cr} - \text{₹}46.00\text{ Cr} = \mathbf{\text{₹}84.00\text{ crore in direct net cash savings}}$$

Beyond the ₹84 crore saving, the GCC retains 4,000 employees who already possess deep, proprietary understanding of client enterprise systems, security protocols, and operational workflows. Client satisfaction on complex Tier-2 escalations jumps 22% because cases are handled by experienced internal staff rather than inexperienced external recruits.
:::

## Predictive attrition models: The surveillance trap and ethical boundaries

Alongside task-based planning, enterprise [[people-analytics|people analytics]] teams increasingly deploy predictive machine learning models to forecast employee turnover.

A typical **Attrition-Risk Model** uses supervised gradient-boosted decision trees (such as XGBoost) or survival analysis (Cox proportional hazards) trained on historical HRIS telemetry:
- **Tenure and Compensation:** Time in current grade, compa-ratio (salary relative to market midpoint), timing since last equity vesting or promotion.
- **Managerial Dynamics:** Manager turnover history, team restructuring velocity, 1-on-1 meeting frequency.
- **Digital Exhaust:** Aggregate email and Slack communication volume, late-night login patterns, calendar fragmentation, and badge swipe variance.

While predictive models can achieve an area under the ROC curve (AUC) of $0.80\text{--}0.85$, deploying them in human resources introduces a profound ethical and operational hazard known as the **Self-Fulfilling Prophecy Trap**:

```text
The Self-Fulfilling Prophecy Feedback Loop:
  ┌────────────────────────────────────────────────────────┐
  │ Predictive Model flags Employee X as "82% Flight Risk" │
  └───────────────────────────┬────────────────────────────┘
                              │
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │ Manager views dashboard; subconsciously perceives      │
  │ Employee X as uncommitted or disloyal                  │
  └───────────────────────────┬────────────────────────────┘
                              │
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │ Manager withdraws high-visibility client assignments;  │
  │ reallocates strategic project leadership to others     │
  └───────────────────────────┬────────────────────────────┘
                              │
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │ Employee X feels marginalized, experiences stagnation,  │
  │ updates LinkedIn, and resigns within 90 days           │
  └───────────────────────────┬────────────────────────────┘
                              │
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │ Model records a "True Positive" and confirms its bias! │
  └────────────────────────────────────────────────────────┘
```

### Ethical and Governance Safeguards for People Analytics
To prevent predictive models from becoming oppressive surveillance engines, organizations enforce three governance guardrails:
1. **Never Expose Raw Risk Scores to Line Managers:** Attrition probabilities must remain within specialized People Analytics teams. Line managers cannot be trusted with flight-risk tags, as manager bias invariably contaminates performance appraisals.
2. **Programmatic, Not Punitive Interventions:** High attrition risk signals must trigger systemic organizational fixes (re-evaluating team market compensation, investigating toxic managerial micro-climates, offering cross-functional rotation opportunities) rather than invasive surveillance.
3. **Data Minimization and DPDP Compliance:** Ingesting keystroke dynamics, webcam tracking, or personal communication content violates the data minimization principles of India's DPDP Act and the fundamental rights mandates of the EU AI Act. Workplace telemetry must remain strictly aggregated, anonymized, and task-focused.

::: lens consulting
Strategy and human capital practices (McKinsey, BCG, Bain, Mercer) advise Fortune 500 boards that AI workforce planning is fundamentally an organizational agility exercise. The winning firms are not those that execute blunt, panicked 10% layoffs; they are the organizations that construct dynamic skills taxonomies, systematically reallocate freed task hours, and finance continuous internal reskilling.
:::

::: lens operations
In business process operations and IT service delivery, task-level workforce planning directly drives billing models. As clients demand productivity gains from AI, vendors that bill purely on time-and-materials ($T\&M$) face contracting margins. Operations leaders must shift contracts toward outcome-based and value-sharing structures, capturing the economic dividend of freed task hours.
:::

::: lens finance
From a Chief Financial Officer's perspective, workforce reskilling is capital expenditure in human software. Severance writes off sunk recruitment and onboarding capital; reskilling amortizes that capital across new high-value services. Sizing workforce transitions through Net Economic Benefit ($NEB$) transforms HR from a cost center into a strategic value driver.
:::

::: interview Strategic workforce planning in a partner interview
**Q.** "Our client is an illustrative 30,000-person financial services back-office in Hyderabad. The CEO believes generative AI will eliminate 40% of their operational workforce within three years. How would you structure a task-based workforce transition plan, and how do you convince the board to fund reskilling instead of mass redundancies?"

> "I would tell the CEO that terminating 12,000 employees based on an aggregate headline percentage is a dangerous operational error that destroys institutional knowledge, triggers massive severance liabilities, and damages market credibility. I would structure our engagement around a three-phase transition: task-level O*NET decomposition, a Build-Buy-Borrow-Bot allocation matrix, and a Net Economic Benefit balance sheet."

**What they are testing.** The interviewer is looking for commercial maturity, quantitative rigor, and the ability to challenge senior client assumptions constructively using data and operational frameworks rather than emotional rhetoric.

**A strong structure.**
1. **Phase 1: Task-Level Decomposition:** Map the 30,000 roles into standardized task statements using O*NET/ESCO taxonomies. Quantify technical exposure ($\alpha$) per task rather than per role. Show that while 40% of *task hours* may be automated, very few *complete jobs* can be eliminated without destroying core controls.
2. **Phase 2: The 4-Quadrant Allocation:** Classify freed hours using the Exposure vs. Judgment matrix. Route high-exposure, low-judgment tasks to autonomous agents (Bot). Route high-exposure, high-judgment tasks to copilot-augmented analysts (Augment). Protect empathetic and compliance anchors (Human Anchor).
3. **Phase 3: The Reskilling Economic Case:** Present the board with the Net Economic Benefit equation: $NEB = (C_{\text{severance}} + C_{\text{rehiring}}) - C_{\text{reskilling}}$. Demonstrate that paying 4 months of severance and later hiring external specialists costs $2.5\times\text{ to }3\times$ more than running an internal 16-week reskilling academy.
4. **Governance & Metric Milestones:** Establish clear redeployment metrics (hours freed, internal academy graduation rates, CSAT on augmented tasks) to prove to the board that redeployed talent generates higher marginal revenue than external market recruits.
:::

::: try Decomposing an occupational role into task exposure vectors
Examine how foundation models decompose an occupational role into discrete tasks. Paste this prompt into a frontier LLM:

```text
Take the role of an "Enterprise Campus Recruiter at a Tier-1 Indian IT Services Company."
1. Deconstruct this occupation into 8 distinct, realistic work tasks across a typical recruitment cycle.
2. For each task, estimate:
   - Percentage of weekly work hours consumed (must sum to 100%).
   - Technical AI Exposure (Low, Medium, High) where an LLM or automated tool reduces task time by >= 50%.
   - Value of Human Judgment & Personal Empathy (Low, Medium, High).
3. Assign each task to one of the 4 Quadrants:
   - Automate & Delegate
   - Augment & Supervise
   - Human Anchor & Protect
   - Streamline & Standardize
4. Calculate the net percentage of weekly recruiter hours that can be automated or augmented.
```

Notice how this breakdown instantly disproves the binary claim that "AI will replace campus recruiters," revealing instead which exact tasks (resume formatting checks, scheduling emails) should be automated, and which tasks (institute relationship management, candidate debriefs) require expanded human attention.
:::

{{paper eloundou-gpts-are-gpts-2023}}
{{read wef-future-of-jobs-2025}}

::: check Check yourself
1. State the formal definition of Task-Level AI Exposure ($\alpha$) established by Eloundou et al. (2023). <span class="lvl">recall</span>
2. Explain the fundamental difference between labor substitution (automation) and labor complementation (augmentation) in workforce planning. <span class="lvl">explain</span>
3. Consider an illustrative case: an insurance firm employs 500 claims processors earning ₹5,00,000 annually. Deploying an AI document-extraction copilot automates 40% of their routine task hours. The company calculates that severance costs ₹1,50,000 per employee, external rehiring for new claims underwriters costs ₹1,80,000 per employee, and an internal 12-week upskilling academy costs ₹1,10,000 per employee. If the firm chooses to reskill 200 freed FTE equivalents rather than sever and rehire, calculate the Net Economic Benefit ($NEB$). <span class="lvl">apply</span>
4. Map the following four tasks into the four quadrants of the Task-Level AI Exposure Matrix: (a) Answering employee FAQs regarding annual leave carryover; (b) Conducting an exit interview with a departing high-performing director; (c) Synthesizing 360-degree feedback reviews into a draft performance summary; (d) Physically inspecting fire extinguishers and emergency exit signage across an office facility. <span class="lvl">transfer</span>
5. A people analytics data scientist develops an XGBoost machine learning model that predicts employee resignation with 84% accuracy. The Head of HR proposes making these flight-risk scores directly visible to team managers on their weekly performance dashboards. Critically evaluate this proposal, detailing the behavioral feedback loops and operational risks it creates. <span class="lvl">judge</span>
:::

::: answers
1. Eloundou et al. (2023) define Task-Level AI Exposure ($\alpha = 1$) as a state where access to a large language model or LLM-powered software reduces the time required for a human worker to complete a specific task by at least 50% without any degradation in output quality.
2. Labor substitution (automation) occurs when an AI system or software agent assumes full operational execution of a task, driving human labor hours for that specific activity toward zero ($\Delta \text{hours} \to 0$). Labor complementation (augmentation) occurs when AI assists a human worker (handling drafting, data extraction, or synthesis), reducing completion time by 30% to 60%, but where final oversight, contextual judgment, and exception handling remain strictly with the human.
3. In this illustrative calculation: Cost of Severance + Rehire per employee: $C_{\text{severance}} + C_{\text{rehiring}} = \text{₹}1{,}50{,}000 + \text{₹}1{,}80{,}000 = \text{₹}3{,}30{,}000$. Cost of Reskilling per employee: $C_{\text{reskilling}} = \text{₹}1{,}10{,}000$. The Net Economic Benefit per employee is $NEB = \text{₹}3{,}30{,}000 - \text{₹}1{,}10{,}000 = \text{₹}2{,}20{,}000$. For 200 employees, total Net Economic Benefit is $200 \times \text{₹}2{,}20{,}000 = \mathbf{\text{₹}4.40\text{ crore}}$ in direct financial savings.
4. (a) Answering leave carryover FAQs: **Quadrant 2: Automate & Delegate** (High technical exposure, low human judgment). (b) Conducting an exit interview with a senior director: **Quadrant 3: Human Anchor & Protect** (Low technical exposure, high human empathy and political judgment). (c) Synthesizing 360-degree feedback reviews: **Quadrant 1: Augment & Supervise** (High technical exposure for text synthesis, high human judgment for nuance and equity). (d) Inspecting physical fire safety equipment: **Quadrant 4: Streamline & Standardize** (Low technical AI exposure due to physical world interaction, low cognitive judgment).
5. The proposal should be firmly rejected. Displaying predictive flight-risk scores to line managers triggers the **Self-Fulfilling Prophecy Trap**: managers subconsciously perceive flagged employees as disloyal or already departed, leading them to withhold mentorship, exclude them from critical client assignments, or pass them over for promotion. This marginalization demotivates the employee and directly precipitates the resignation the model predicted, generating a toxic feedback loop that inflates model accuracy while destroying employee retention. Flight-risk telemetry must remain strictly within centralized People Analytics teams to drive systemic, programmatic interventions (compensation reviews, workload balancing, rotational opportunities) rather than manager-level appraisals.
:::

::: recap The night-before page
1. AI exposure is measured per task, not per job: an occupation is an aggregation of 20 to 50 distinct activities with wildly differing automation potential.
2. Under Eloundou et al. (2023), task exposure ($\alpha = 1$) occurs when an LLM reduces completion time by $\ge 50\%$ without quality degradation; ~80% of workers have at least 10% of tasks exposed.
3. The Task Exposure Matrix classifies work across exposure and human judgment into four strategic quadrants: Automate, Augment, Anchor, and Streamline.
4. The Build-Buy-Borrow-Bot framework expands workforce planning: Bot automates routine tasks, Build reskills internal talent, Buy hires frontier capabilities, and Borrow secures interim capacity.
5. Sizing workforce transitions via Net Economic Benefit ($NEB = [C_{\text{severance}} + C_{\text{rehiring}}] - C_{\text{reskilling}}$) proves internal redeployment consistently outperforms mass severance and external rehiring.
:::
