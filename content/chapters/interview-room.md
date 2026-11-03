---
id: interview-room
title: "The interview room"
deck: "Being screened by AI, AI-assisted case rounds, and the questions to expect with the shape of a strong answer."
level: Zero to one
tracks: [consulting]
hook: "Two candidates submit identical summer project results to an Indian tech consultancy. One writes 'built a loan-default dashboard using SQL', while the other writes 'led credit risk analytics, automating underwriting workflows'. Both describe the same eight weeks of work. One application vanishes into a digital rejection queue within four minutes; the other reaches an associate partner for a shortlist interview. What happened in those four minutes?"
objectives:
  - "**Explain** how automated screening and AI resume parsing filter campus applicant pools before human review."
  - "**Navigate** the boundary between legitimate preparation with generative AI tools and disqualifying policy breaches."
  - "**Apply** the four-step audit protocol (prompt, review, challenge, decide) in AI-assisted case interviews."
  - "**Structure** defensible answers to 20 core AI questions across definitions, judgment, case problems, and ethics."
---

Placement season at an Indian business school is an exercise in brutal arithmetic. A premier consulting firm or multinational bank posts forty analyst openings on the placement portal and receives three thousand curriculum vitae submissions before midnight. Long before any senior partner flies in to conduct final case rounds, automated software pipelines process that avalanche of text. Candidates obsess over font pairings and executive summaries, yet many never realise that their first evaluator has no eyes, no intuition, and no patience for implicit meaning. ==The interview tests whether you can direct an AI model and catch where it breaks, not whether you can recite its architecture.==

Understanding that shift requires separating the recruitment funnel into two distinct phases. In the early stages, algorithms evaluate candidates against rigid specifications. In the late stages, human interviewers evaluate how candidates direct algorithms. If you treat AI as an essay-writing shortcut, you risk disqualification before the interview begins. If you treat AI as an assistant whose outputs require relentless verification, you display the exact operational competence consulting partners demand.

## The screening funnel

Employers do not deploy automated hiring tools because machines possess superior judgment. They deploy them because human review cannot scale to modern application volumes.

::: principle The recruitment gate
1. Elite employers receive thousands of applications for dozens of campus vacancies, creating an administrative bottleneck.
2. Human recruiters cannot manually read three thousand multi-page resumes or review ten thousand recorded video answers within tight placement schedules.
3. Organizations deploy automated resume parsers and screening chatbots to filter incoming applicant cohorts down to a reviewable shortlist.
4. These automated tools match candidate submissions against job requisitions using semantic keyword extraction, credential verification, and standardized scoring benchmarks.
5. ∴ Before a human partner evaluates your strategic judgment in a case room, your application must survive an automated screening gate that rewards semantic precision and explicit alignment over unstated capability.
:::

In corporate recruitment across India, this automation has become standard practice. A 2026 survey of 257 employers by Deloitte India revealed that 72% of surveyed organisations use AI for resume screening, while 48% employ AI-based assessments in their campus selection pipelines [@deloitte-india-campus-2026]. When an applicant tracking system parses a resume, it extracts entities: universities, degree titles, technical tools, functional domains, and quantified achievements. If a job description calls for "credit risk modeling" and your resume highlights "bad loan prediction", an older keyword engine registers a miss, while a modern semantic embedding model scores only a partial match.

::: concept Resume parsing
**Plain words.** Software that converts an unstructured resume document into structured data fields, matching candidate skills and experiences against job requisitions.

**Analogy.** A sorting machine at an air cargo terminal. It measures box dimensions and scans barcode labels against a manifests database. It does not admire the craftsmanship of the packaging; it checks whether the parcel fits the cargo bay.

**Misconception.** "Using creative phrasing and fancy design templates makes a resume stand out to the algorithm." Complex multi-column layouts, tables, and unconventional headings often scramble parser extraction routines, causing critical achievements to be omitted from the candidate profile.
:::

Beyond document parsing, firms increasingly introduce conversational AI interfaces at the top of the hiring funnel. McKinsey & Company utilizes an AI-assisted screening tool, an automated chatbot named "Mia", to conduct early-stage eligibility assessments [@mckinsey-ai-interview-notice]. The system queries applicants regarding objective logistical requirements, such as geographical mobility, language proficiencies, and foundational credentials. McKinsey's privacy disclosures confirm that the conversational agent assesses objective criteria only, does not evaluate subjective qualities like personality or cultural fit, and ensures that no candidate is rejected solely by the automated tool without human oversight [@mckinsey-ai-interview-notice].

{{figure interview-room-funnel | The recruitment pipeline and the judgment rubric in AI rounds. On the left, automated screening steps before partner interviews (Deloitte India, BCG, McKinsey). On the right, the four abilities evaluated when candidates use AI tools during case interviews. | Sources: Deloitte India campus hiring survey 2026; BCG Careers; McKinsey & Company}}

::: stat 72%
Of 257 surveyed organisations in India use AI for resume screening, and 48% deploy AI-based assessments during recruitment.
<span class="src">Source: [@deloitte-india-campus-2026]</span>
:::

## Firm policies on candidate AI use

Students often ask whether using artificial intelligence during placement season constitutes cheating. The reality is nuanced: firm policies vary sharply depending on whether the tool is used for private preparation or live candidate evaluation.

Boston Consulting Group provides transparent guidance to prospective hires regarding responsible AI usage [@bcg-responsible-ai-hiring]. BCG explicitly permits candidates to utilize generative AI tools to brainstorm industry concepts, refine written clarity, and practice case interview questions. However, the firm draws a firm boundary around authentic authorship: candidates must avoid relying on AI to author their entire applications, because over-reliance masks individual voice and produces inconsistencies during live partner interviews. BCG also emphasizes that within its own firm, AI screening tools never make final hiring decisions or unilaterally eliminate candidates; human recruiters make all ultimate offers [@bcg-responsible-ai-hiring].

Conversely, Bain & Company enforces strict geographic and stage-specific boundaries. In its London recruiting policy, Bain instructs applicants that generative tools like ChatGPT or Claude may only be used to inspect grammar and spelling in CV documents [@bain-london-recruiting-faq]. For formal online assessments and virtual interviews, Bain strictly prohibits the use of AI tools [@bain-london-recruiting-faq]. Submitting AI-generated responses during an unproctored analytical exam or covertly running a second screen during a virtual interview triggers immediate disqualification if detected.

::: myth
**Myth.** Using generative AI to prepare for consulting interviews is considered unethical by top employers.

**Reality.** BCG explicitly encourages candidates to brainstorm and practice mock cases with AI tools [@bcg-responsible-ai-hiring]. The violation occurs when a candidate copies AI output into an application or relies on live AI prompts during an evaluation that requires unassisted human reasoning.
:::

::: myth
**Myth.** Autonomous AI screening algorithms make final hiring and rejection decisions at top consulting firms.

**Reality.** Official recruitment governance at both BCG and McKinsey dictates that automated systems only handle preliminary logistics or surface candidate data; all final elimination and offer decisions remain exclusively with human partners [@bcg-responsible-ai-hiring] [@mckinsey-ai-interview-notice].
:::

## The AI-assisted case interview

The most significant structural evolution in consulting recruitment is the emergence of AI-assisted case interviews. In January 2026, Fortune reported on a final-round pilot at McKinsey in North America where candidates work directly alongside AI tools [@fortune-mckinsey-ai-hiring]. McKinsey did not comment on the reported pilot, which prep firms described as having candidates interact with an enterprise AI platform—such as McKinsey's proprietary assistant, Lilli—to prompt the model, review its data, and apply strategic judgment [@fortune-mckinsey-ai-hiring].

This format turns the traditional interview dynamic on its head. When an interviewer gives you access to a model that can produce a market-entry framework in three seconds, the interviewer does not care whether you can type the prompt. The interviewer is watching how you audit the output.

As Bob Sternfels, Global Managing Partner of McKinsey, observed on the nature of enterprise AI: "There's not truth in the model, there's not judgment in the model. Humans need to impose those parameters" [@hbr-ideacast-sternfels]. In a firm operating with 40,000 human professionals and 20,000 digital software agents, an associate who blindly trusts a model's calculations is an active liability [@hbr-ideacast-sternfels].

::: concept The judgment rubric
**Plain words.** An evaluation standard that grades candidates on their ability to direct an AI tool, audit its outputs for errors, challenge flawed logic, and synthesize defensible recommendations.

**Analogy.** Evaluating a structural engineer. You do not test whether they can multiply six-digit numbers by hand; computer software does that. You test whether they notice when the computer program specifies a foundation beam half the required thickness.

**Misconception.** "If the AI tool generates a clean, well-formatted answer, my job in the interview is simply to read it aloud to the partner." Reading unverified AI output demonstrates automation bias and guarantees a poor evaluation.
:::

When facing an AI-assisted interview round, apply the four-step protocol derived in chapter 7:
1. **Prompt with context and constraints.** Never supply a generic one-line question. State the business objective, industry boundaries, and desired output format.
2. **Audit citations, dates, and math.** Assume every number generated by the model is hallucinated until verified against primary exhibits or verified calculations.
3. **Challenge underlying assumptions.** Ask what external business conditions must hold true for the model's recommendation to succeed.
4. **Synthesize and own the conclusion.** Present your findings as your personal recommendation, clearly stating which model assumptions you accepted and which you discarded.

::: case Illustrative · The 3,000-CV screen at an Indian NBFC
#### The situation
A non-banking financial company headquartered in Mumbai opens applications for 40 management trainee positions across credit risk and retail operations. Within 72 hours, the portal receives 3,000 resumes from campus graduates. The human resources team routes all submissions through an automated resume parser configured with semantic extraction filters.

Candidate A and Candidate B completed identical eight-week summer internships at the same private bank in Bengaluru, working on credit assessment. Candidate A writes on their resume: "Assisted senior team in building loan default dashboards using SQL and Excel; resolved data errors." Candidate B writes: "Conducted credit risk analytics on personal loan portfolios; built automated default tracking models; improved data pipeline reliability across underwriting operations."

#### The decision
The automated parser scans both files against the job requisition. The requisition prioritizes terms such as "credit risk", "portfolio analytics", and "underwriting workflows". 

Candidate A's resume yields a semantic relevance score of 54%, because the parser categorizes the bullet under generic administrative reporting. The resume is routed to an unreviewed holding queue. Candidate B's resume achieves an 89% match score, passing the automated gate and landing directly on the desk of the credit operations hiring lead. Both candidates performed identical work, but Candidate B described that work using the functional vocabulary of the target domain.

#### Your move
Never assume an algorithm understands implied technical depth. Before submitting a placement resume, compare every bullet point against the specific functional keywords published in the employer's job description. Translate colloquial descriptions into rigorous industry terminology without exaggerating your actual contribution.
:::

::: lens consulting
Strategy consultancies hire analysts to serve on client engagements from week one. When interviewers probe AI knowledge, they want evidence that you will not embarrass the engagement team by pasting confidential client spreadsheets into public chat interfaces, or citing invented market research during a steering committee presentation.
:::

::: lens hr
Placement committees and campus recruiters view AI as a double-edged operational tool. While resume parsers compress candidate shortlisting timelines from weeks to hours, talent heads remain wary of homogenized applications generated by ChatGPT. Resumes containing distinctive, auditable metrics routinely beat generic, AI-generated prose.
:::

## The field guide: 20 core interview questions

To excel in consulting, product, and general management interviews, candidates must navigate AI questions across four distinct categories: definitional concepts, critical judgment, case applications, and ethical governance. 

Below are 20 questions reflecting current placement patterns, accompanied by the underlying interviewer motivation and the anatomy of a defensible answer.

### Group 1: Definitional and architectural foundations

#### Q1. In two sentences, how does generative AI differ from the predictive analytics a commercial bank already uses?
- **What they are testing:** Whether you understand that generative models and predictive models solve fundamentally different business problems.
- **The strong structure:** "Predictive analytics uses structured historical data to estimate specific numeric probabilities or categories, such as a credit score or fraud probability. Generative AI uses foundation models trained on massive unstructured datasets to synthesize entirely new content, such as drafting a credit memo or customer response."

#### Q2. What is an AI agent, and how does it differ from a conversational chatbot?
- **What they are testing:** Familiarity with autonomous agentic workflows versus simple single-turn query engines.
- **The strong structure:** "A standard chatbot operates in a single-turn loop, taking user text and predicting a relevant response within a closed context window. An AI agent couples a foundation model with memory, planning capabilities, and external software tools, allowing it to execute multi-step operational workflows autonomously across external systems."

#### Q3. What causes an AI model to hallucinate, and in what business processes is hallucination an unacceptable risk?
- **What they are testing:** Technical understanding of token prediction mechanics and operational risk boundaries.
- **The strong structure:** Explain that models do not retrieve facts from a database; they predict statistically probable next tokens based on web-scale patterns. In creative ideation or draft synthesis, variance is an asset; in statutory compliance, legal contract analysis, or loan sanctioning, hallucinated figures create direct legal and financial liability.

#### Q4. Why does the exact same prompt sometimes generate two completely different answers from an LLM, and how do you control this in client workflows?
- **What they are testing:** Understanding of model temperature, non-deterministic sampling, and enterprise reproducibility.
- **The strong structure:** Clarify that unless temperature is set to zero, models sample from probability distributions rather than selecting the top token deterministically. For client workflows requiring consistency, teams set low temperatures, implement rigid prompt templates, and enforce structured schema validations.

#### Q5. What separates an AI pilot from an enterprise production deployment, and why do most corporate pilots stall?
- **What they are testing:** Understanding of organizational change management, integration costs, and operational scaling barriers.
- **The strong structure:** Point out that building a proof-of-concept in a sandbox requires only API access and clean sample data. Moving to production requires enterprise software integration, live data governance, regulatory compliance, employee workflow redesign, and clear return on investment tracking. Most pilots stall because leadership focuses on model accuracy rather than process adoption.

### Group 2: Judgment and quality control

#### Q6. Here is an AI-drafted case structure for entering the Indian electric scooter market. What is missing, and what do you check first?
- **What they are testing:** Resistance to automation bias and ability to spot omitted business realities.
- **The strong structure:** Never praise the output immediately. Audit whether the framework addresses localized regulatory dynamics (such as FAME subsidies or battery safety norms), charging infrastructure constraints, and distributor margin requirements. Check the operational feasibility before accepting the high-level strategic buckets.

#### Q7. An AI tool estimates the market size for quick-commerce grocery delivery in Tier-2 Indian cities in two seconds. How do you decide whether to trust it?
- **What they are testing:** Your personal audit protocol and skepticism toward ungrounded numbers.
- **The strong structure:** State immediately that you cannot trust the number without inspecting the derivation tree. Decompose the market size independently from first principles: urban household counts, disposable income thresholds, smartphone penetration, and average order values. Compare your independent estimate against the model's figure, identifying where the model made unstated assumptions.

#### Q8. Tell me about a time an AI tool provided an incorrect answer, and walk me through how you caught the error.
- **What they are testing:** Practical user experience, personal vigilance, and lack of naive faith in technology.
- **The strong structure:** Share a concrete, authentic example from academic coursework or project work. State the original task, the plausible but flawed output generated by the model (such as an outdated tax rate or inverted formula), the exact verification step you took to catch it, and the revised prompt or manual correction you applied.

#### Q9. Would you paste a client's historical sales ledger into a public chatbot to generate quick pivot summaries? What would you do instead?
- **What they are testing:** Data privacy standards, client confidentiality, and knowledge of enterprise data security.
- **The strong structure:** "Absolutely not. Pasting unredacted client data into public consumer chatbots risks exposing proprietary information, violates client non-disclosure agreements, and breaches privacy regulations like India's DPDP Act. Instead, I would use an enterprise-grade tenant with zero-data-retention guarantees, anonymize sensitive identifiers, or perform the analysis using secure local tools."

#### Q10. How would you explain to an executive client why an AI recommendation should not be implemented, even if the vendor claims 95% model accuracy?
- **What they are testing:** Executive communication, base-rate fallacy awareness, and strategic risk judgment.
- **The strong structure:** Explain that overall accuracy is meaningless without context regarding base rates and the asymmetric cost of false positives versus false negatives. If an automated credit model incorrectly flags legitimate customers at a 5% error rate across millions of transactions, the firm destroys customer trust and sacrifices substantial revenue.

### Group 3: Case-shaped business applications

#### Q11. A major Indian apparel retailer wants to deploy generative AI across personalized recommendations, demand forecasting, and customer support. Where is enterprise value highest, and where should they begin?
- **What they are testing:** Business prioritization, feasibility assessment, and value-chain mapping.
- **The strong structure:** Differentiate between predictive and generative use cases. Demand forecasting requires predictive machine learning on time-series sales data, not generative LLMs. Customer support represents low-hanging operational cost reduction. Personalized marketing offers higher top-line revenue lift but requires mature customer data integration. Recommend beginning with customer support deflection to prove ROI, while cleaning data for predictive forecasting.

#### Q12. A commercial bank's underwriting head refuses to adopt an automated AI credit assessment tool. How would you structure a pitch to address their concerns?
- **What they are testing:** Stakeholder empathy, change management, and hybrid human-in-the-loop system design.
- **The strong structure:** Acknowledge their concerns regarding regulatory audits, black-box explainability, and credit risk exposure. Propose a phased, non-threatening deployment: configure the AI tool as a shadow copilot that drafts credit memos and highlights risk flags, while requiring human credit officers to retain 100% sign-off authority. Demonstrate error monitoring before advocating for increased automation.

#### Q13. A private equity client plans to acquire a healthcare AI startup claiming 'proprietary diagnostic algorithms'. How do you evaluate the target during commercial due diligence?
- **What they are testing:** Technical due diligence acumen and ability to distinguish real defensibility from marketing hype.
- **The strong structure:** Investigate four pillars:
  1. *Data moat:* Does the startup own exclusive, clinical data partnerships, or do they rely on public datasets?
  2. *Wrapper risk:* Is the product merely a thin software layer over standard third-party APIs?
  3. *Regulatory compliance:* Does the software meet medical device certification standards and data handling guidelines?
  4. *Customer switching costs:* Is the tool deeply integrated into hospital clinical workflows, or can it be easily replaced?

#### Q14. An airline wants to replace 60% of its call center staff with a voice AI agent. What operational metrics do you measure before and after rollout?
- **What they are testing:** Balanced scorecard design and awareness of second-order operational disruptions.
- **The strong structure:** Do not measure only cost savings. Track a balanced scorecard:
  - *Operational:* First-contact resolution rate, average handle time, escalation rate to human supervisors.
  - *Financial:* Cost per resolved inquiry, compensation spend.
  - *Customer experience:* Net Promoter Score, customer churn following bot interactions.
  - *Risk:* Hallucinated booking confirmations or erroneous fee commitments.

#### Q15. Estimate the daily volume of AI chat prompts generated across corporate workplaces in India, and evaluate the compute cost required to serve them.
- **What they are testing:** Structured guesstimate mechanics, assumption transparency, and unit economics.
- **The strong structure:** State assumptions step by step:
  1. Population of India: ~1.45 billion.
  2. Formal knowledge-worker workforce (IT, finance, consulting, corporate): ~30 million.
  3. Daily active penetration of generative AI tools: ~20% = 6 million daily active users.
  4. Average prompts per active user per workday: ~5 prompts.
  5. Total daily volume: ~30 million prompts.
  6. Cost calculation: Assuming an average prompt plus response of 1,000 tokens served via enterprise models at ₹0.15 per thousand tokens, estimate the daily national inference bill at approximately ₹45 lakh.

#### Q16. A manufacturing conglomerate presents ten potential AI automation use cases. How do you prioritize which projects receive funding?
- **What they are testing:** Portfolio governance and strategic prioritization frameworks.
- **The strong structure:** Map all ten initiatives onto a 2x2 matrix: Business Impact (EBIT expansion, cost reduction, safety) versus Technical Feasibility (data readiness, system integration complexity, regulatory barriers). Prioritize high-impact, high-feasibility "quick wins" to build organizational momentum and self-fund longer-term strategic transformations.

### Group 4: Group discussions and ethical governance

#### Q17. In a campus group discussion on 'AI will eliminate entry-level consulting and analyst roles', how do you structure an authoritative, balanced argument?
- **What they are testing:** Intellectual balance, grounding in macroeconomic evidence, and avoidance of extreme hyperbole.
- **The strong structure:** Acknowledge both trends. On the compression side, routine drafting, basic data cleansing, and preliminary research are heavily automated, leading some professional service firms to moderate junior hiring cohorts. On the expansion side, lower analysis costs expand total demand for advisory engagements. The entry-level job changes from junior researcher to junior quality-control auditor.

#### Q18. Should enterprise employers use automated AI tools to screen and rank campus resumes?
- **What they are testing:** Awareness of algorithmic bias, proxy discrimination, and procedural fairness.
- **The strong structure:** Argue for balanced governance. Automated parsing eliminates initial human reviewer fatigue and expands applicant screening capacity across tier-2 and tier-3 colleges. However, machine learning algorithms trained on historical hiring data can codify historical gender and institutional biases. Conclude that AI must be restricted to qualification filtering, with human recruiters conducting all rejection reviews.

#### Q19. When an enterprise AI agent causes severe financial loss or regulatory non-compliance for a client, who bears accountability: the software vendor, the consulting firm, or the individual analyst?
- **What they are testing:** Understanding of legal accountability, enterprise governance, and professional responsibility.
- **The strong structure:** Distinguish between vendor warranty disclaimers and advisory liability. Standard software terms of service explicitly disclaim liability for model output errors. Under professional consulting contracts, the advisory firm remains fully liable for recommendations delivered to clients. Within the project hierarchy, the engagement partner and analyst share professional accountability for failing to verify machine-generated figures before delivery.

#### Q20. Is it ethical for an Indian consumer fintech to reject a retail loan applicant based on an automated AI score without disclosing the underlying reasons?
- **What they are testing:** Familiarity with responsible AI principles, transparency, and Indian regulatory directives.
- **The strong structure:** Address both operational credit risk and ethical consumer rights. While proprietary risk algorithms protect lenders against fraud, unexplainable "black-box" rejections violate fundamental principles of financial fairness. Under Reserve Bank of India governance guidelines and global credit norms, borrowers are entitled to know key factors contributing to an adverse credit determination, ensuring redress against flawed training data.

::: interview Structuring an AI judgment question
**Q.** "We gave our internal AI tool a financial dataset, and it generated a high-level restructuring strategy for an automotive supplier. The partners love the slides. What do you do before Monday's client steering meeting?"

> "I would treat the AI deck as an unverified draft from an eager intern: I will audit the mathematical sanity of its margin projections, trace its cost assumptions back to raw supplier contracts, and stress-test whether the proposed supplier cuts violate long-term delivery agreements."

**What they are testing.** Whether you succumb to automation bias when senior leaders express enthusiasm, or whether you exercise independent professional skepticism.

**A strong structure.**
1. *Acknowledge and isolate:* Accept the deck's conceptual structure as a helpful starting point, but firmly separate visual polish from analytical truth.
2. *Audit the arithmetic:* Re-verify all margin expansion calculations and revenue numbers by hand against raw client financial statements.
3. *Check operational boundary conditions:* Identify what real-world industry constraints the model ignored, such as supplier union agreements, tooling lead times, or single-source dependency risks.
4. *Document sign-off:* Highlight the exact assumptions requiring client CFO validation, ensuring the engagement team explicitly owns every recommendation.
:::

::: try Practice an adversarial AI case prompt
Test your critical judgment by running a mock case with an AI chatbot (ChatGPT, Claude, or Gemini). Paste the following prompt into the chat window:

```
Act as a skeptical senior partner at a top management consulting firm. 
I am an associate preparing for a case interview on whether an Indian 
commercial dairy company should invest ₹200 crore to enter the plant-based 
oat and almond milk market. 

Give me a three-part market entry framework that looks plausible on the 
surface but intentionally contains two subtle, realistic business flaws 
(such as an ignored cold-chain distribution barrier, unrealistic gross 
margins, or flawed consumer adoption assumptions in India). 

Do not reveal the flaws. Ask me to critique the framework. When I respond, 
evaluate whether I caught your deliberate traps or passively accepted them.
```
:::

{{read bcg-responsible-ai-hiring}}
{{read mckinsey-ai-interview-notice}}
{{read fortune-mckinsey-ai-hiring}}

::: check Check yourself
1. What percentage of surveyed Indian organisations use AI tools for resume screening according to Deloitte India's 2026 campus hiring study? <span class="lvl">recall</span>
2. Why does formatting a placement resume with complex tables and graphics increase the risk of rejection by an applicant tracking system? <span class="lvl">explain</span>
3. A consulting applicant uses ChatGPT to draft an entire personal cover letter and application essay for BCG. Explain how BCG's official hiring policy evaluates this practice. <span class="lvl">apply</span>
4. An interviewer in an AI-assisted case round asks you to evaluate an AI-generated customer acquisition strategy for a fintech. Describe the first three verification steps you take. <span class="lvl">transfer</span>
5. A partner claims: "Our firm uses 20,000 AI agents alongside 40,000 humans, so we no longer need junior analysts to verify data inputs." Formulate a counter-argument grounded in enterprise risk. <span class="lvl">judge</span>
:::

::: answers
1. 72% of surveyed organisations use AI for resume screening, while 48% utilize AI-based assessments in recruitment [@deloitte-india-campus-2026].
2. Automated resume parsers extract text sequentially. Multi-column tables, visual text boxes, and complex graphics frequently disrupt the parsing engine's reading order, causing critical skills, dates, and credentials to be dropped or misattributed.
3. BCG's official policy explicitly advises candidates against relying on AI to write their entire application, noting that it obscures authentic personal voice and creates inconsistencies during live interviews [@bcg-responsible-ai-hiring].
4. First, check whether the acquisition channels are appropriate for the target demographic and regulatory environment. Second, audit the underlying customer acquisition cost (CAC) and lifetime value (LTV) calculations for mathematical sanity. Third, identify what critical real-world constraints the model ignored, such as conversion drop-offs or onboarding KYC friction.
5. As McKinsey's global managing partner Bob Sternfels noted, there is neither truth nor judgment in a model; humans must impose those parameters [@hbr-ideacast-sternfels]. In a high-leverage professional services firm, digital agents accelerate generation, but unverified machine errors introduce catastrophic client liability. Junior analysts provide the essential human-in-the-loop audit layer that safeguards professional reputation.
:::

::: recap The night-before page
1. Automated screening is pervasive: 72% of surveyed Indian employers use AI for resume screening and 48% use AI assessments, requiring resumes to feature precise, functional keywords and clean formatting.
2. Boundaries matter: BCG permits AI for brainstorming and practice but bans unassisted full-application generation; Bain London bans AI in online assessments and interviews.
3. Screening tools assist but do not decide: Official policies at BCG and McKinsey mandate that AI algorithms never eliminate or select candidates unilaterally; human recruiters make all final decisions.
4. AI case rounds evaluate audit rigor: In AI-assisted interviews, partners evaluate how you prompt the tool, audit its arithmetic, challenge its assumptions, and own the final synthesis.
5. Truth remains human: Language models predict probable tokens rather than verified facts; professional consulting value lies in exercising relentless judgment where the machine fails.
:::
