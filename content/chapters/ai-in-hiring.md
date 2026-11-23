---
id: ai-in-hiring
title: "AI in hiring: screening, assessment, and the bias audit"
deck: "What a screening model really is, adverse impact and the four-fifths rule, bias audits under NYC Local Law 144, the EU AI Act's high-risk employment category, DPDP consent, and AI-written applications."
level: Zero to one
tracks: [hr]
prereq: [kinds-of-ai, confidently-wrong]
hook: "Why an enterprise screening model rejected every CV containing the word 'women's' even after engineers stripped gender markers—and how Indian campus recruiters audit algorithms before the law audits them."
objectives:
  - "**Deconstruct** the mathematical architecture of resume parsers, embedding rankers, and automated talent screening systems."
  - "**Calculate** group selection rates and the Adverse Impact Ratio ($AIR$) using the statutory four-fifths rule."
  - "**Evaluate** compliance requirements under NYC Local Law 144, EU AI Act Annex III, and India's DPDP Act 2023."
  - "**Formulate** defensive talent acquisition strategies against generative AI resume gaming and candidate-side copilots."
---

Every autumn across Indian engineering colleges and business schools, the campus recruitment engine kicks into gear. At a Tier-1 Indian IT services major—employing over three lakh professionals—the graduate intake funnel is staggering. A single campus drive receives upwards of 1,50,000 applications for roughly 3,000 entry-level software engineering and analyst positions. For human talent acquisition teams, reviewing this volume manually is an arithmetic impossibility. A seasoned recruiter takes between forty-five seconds and two minutes to skim a single resume for pedigree, grade point average, programming proficiencies, and project experience. Processing 1,50,000 resumes by hand would consume 1,50,000 recruiter hours—the equivalent of seventy-five full-time recruiters working uninterrupted for an entire calendar year just to build the initial interview shortlist.

Under this operational pressure, enterprise talent acquisition turned decisively to automation. First came basic Boolean keyword filters inside Applicant Tracking Systems (ATS). Then came natural language processing (NLP) resume parsers. Today, enterprises deploy deep learning rankers, semantic embedding models, and automated video-interview analyzers designed to compress weeks of candidate triage into seconds. A candidate uploads a portable document file; an inference pipeline tokenizes the text, extracts named entities, computes semantic cosine similarity against historical top performers, and assigns a percentile score from 1 to 100.

Yet recruitment automation conceals a dangerous mathematical trap. Unlike predictive maintenance or inventory forecasting, where ground-truth physical degradation can be measured objectively via vibration sensors or barcode scans, "job performance" has no invariant natural law. What an algorithm learns from ten years of historical enterprise hiring data is not intrinsic human capability. ==A screening model is a selection policy written in data: it repeats the hiring decisions it learned from, and the law now audits it like one.== When an organization automates resume screening, it does not remove human bias; it codifies, scales, and accelerates that bias across thousands of applicants in milliseconds.

## The hiring funnel: From unformatted text to algorithmic rank

The contemporary automated recruitment pipeline is not a monolithic model. It is a multistage software pipeline where distinct machine learning techniques operate at each gate of the hiring funnel:

```text
100,000 Applications (Unstructured PDFs)
       │
       ▼
[Stage 1: Ingestion & Resume Parsing]
  • Optical Character Recognition (OCR) & Layout Analysis
  • Named Entity Recognition (NER): Universities, Degrees, Skill Tokens
       │
       ▼
[Stage 2: Algorithmic Ranking & Scoring]
  • Sentence Embeddings & Dense Vector Representation
  • Cosine Similarity against Historical "High-Performer" Archetypes
  • Supervised Scoring: 1-to-5 Star Rank or Percentile Decile
       │
       ▼
[Stage 3: Asynchronous Automated Assessment]
  • Algorithmic Coding Platforms & Psychometric Game-Based Engines
  • Automated Video Interview Scoring (Acoustic Pitch, Lexical Density)
       │
       ▼
[Stage 4: Human Interview & Final Offer]
  • Structured Behavioral Panel (Final 3,000 Candidates)
```

Each stage introduces specific mechanical failure modes:

### 1. Ingestion and parsing errors
Resumes arrive in wildly divergent visual layouts: single-column academic formats, two-column graphic design templates, tables, and unformatted plain text. Resume parsers use optical character recognition and [[named-entity-recognition|Named Entity Recognition (NER)]] to extract structured fields (`education_level`, `years_of_experience`, `skill_tokens`). When a candidate uses non-standard headings or multi-column layouts, parsers frequently misattribute content—reading dates as job titles or dropping entire skill sections.

### 2. Semantic rankers and historical embeddings
Once structured, candidates are scored using vector embeddings [@deloitte-india-campus-2026]. A transformer model projects the candidate's resume into a high-dimensional vector space $\vec{v}_{\text{candidate}} \in \mathbb{R}^{d}$ and computes its inner product against a target job vector $\vec{v}_{\text{job}}$:

$$\text{Score} = \cos(\theta) = \frac{\vec{v}_{\text{candidate}} \cdot \vec{v}_{\text{job}}}{\|\vec{v}_{\text{candidate}}\| \|\vec{v}_{\text{job}}\|}$$

The target vector $\vec{v}_{\text{job}}$ is rarely an abstract job description. In enterprise recruiting engines, it is trained on the resumes of employees who previously received "exceeds expectations" ratings on internal performance reviews. If the historical cohort of high-performing senior engineers was 88% male and drawn predominantly from five elite metropolitan institutes, the model's semantic vector clusters tightly around those exact linguistic markers.

### 3. Asynchronous automated assessments
Candidates passing the initial resume screen are routed to automated assessment platforms. While automated coding sandboxes test deterministic code execution (unit tests, time complexity), asynchronous video interview platforms historically applied computer vision and audio telemetry—scoring micro-facial movements, vocal inflections, and lexical choices. As regulatory scrutiny intensified, these proprietary video-scoring models faced severe backlash for penalizing neurodivergent applicants and non-native English accents, prompting direct statutory bans under global legislation.

## The mathematics of discrimination: Adverse impact and the four-fifths rule

In employment law and people analytics, algorithmic discrimination is evaluated through the doctrine of [[adverse-impact|adverse impact]] (also termed disparate impact). Originating in the landmark US Supreme Court ruling *Griggs v. Duke Power Co.* (1971) and codified in the Equal Employment Opportunity Commission's Uniform Guidelines on Employee Selection Procedures (29 CFR § 1607.4(D)), adverse impact occurs when a facially neutral selection procedure disproportionately excludes members of a protected demographic group [@eeoc-uniform-guidelines-selection].

The formal benchmark for establishing a prima facie case of adverse impact is the [[four-fifths-rule|Four-Fifths Rule]] (or 80% rule).

### Deriving the Adverse Impact Ratio ($AIR$)

Let $N_A$ and $N_B$ be the total number of applicants from demographic groups $A$ and $B$, and let $S_A$ and $S_B$ be the number of candidates selected from each group.

The **Selection Rate ($SR$)** for each group is defined as:

$$SR_A = \frac{S_A}{N_A}, \quad SR_B = \frac{S_B}{N_B}$$

Let $SR_{\text{highest}} = \max(SR_A, SR_B)$ represent the selection rate of the group with the highest pass rate. The **Adverse Impact Ratio ($AIR$)** for any comparison group is the ratio of its selection rate to the highest selection rate:

$$AIR = \frac{SR_{\text{group}}}{SR_{\text{highest}}}$$

Under the Uniform Guidelines, if:

$$AIR < 0.80 \quad (80\%)$$

the selection process is considered to have adverse impact against that group.

```text
Adverse Impact Ratio Continuum:
  0.0                                0.80                    1.0
  ├───────────────────────────────────┼───────────────────────┤
  │      ADVERSE IMPACT ZONE          │      LEGAL ZONE       │
  │  Prima facie Title VII violation  │  Statutory parity met │
  │  Burden shifts to employer to     │  No disparate impact  │
  │  prove business necessity         │  presumption          │
```

If an algorithm produces an $AIR < 0.80$, the legal burden of proof shifts immediately to the employer. The enterprise must prove that the algorithmic test is strictly job-related and consistent with "business necessity"—a rigorous standard requiring empirical construct and criterion validation studies that few machine learning models can satisfy.

::: principle The redundancy of protected attributes
1. Stripping protected demographic columns (gender, caste, religion, race) from training datasets does not eliminate algorithmic discrimination.
2. High-dimensional feature spaces contain dense webs of proxy variables: undergraduate institute, residential postal code, athletic clubs, extracurricular societies, and linguistic style correlate strongly with demographic groups.
3. A machine learning model optimized to predict historical hiring decisions will autonomously reconstruct missing protected attributes by assigning heavy weights to these correlated proxies.
4. "Fairness through blindness" is mathematically ineffective; algorithmic fairness requires active statistical auditing and explicit parity constraints across demographic cohorts.
5. An enterprise screening model does not identify abstract merit; it faithfully mirrors the structural biases and preferences embedded in the historical labels used to train it.
:::

::: concept Adverse impact and the four-fifths rule
**Plain words.** Adverse impact means that an employment test—even one that appears neutral on its surface—ends up screening out one group of people at a much higher rate than another. Under the four-fifths rule, if the pass rate for women or a minority group is less than 80% of the pass rate for the highest group, the tool is legally presumed biased until the employer proves otherwise.

**Analogy.** A physical fitness test requiring every applicant to scale a six-foot wall without assistance to be hired as a data analyst. On paper, the test treats every candidate identically. In practice, the requirement disproportionately eliminates female applicants and individuals with mobility impairments, while bearing zero mathematical connection to the actual tasks of writing SQL queries and building financial models.

**Misconception.** "Our screening model cannot be biased because we deleted the candidate's name, gender, and photograph from the database." Deleting explicit labels changes nothing if the model still has access to five hundred other features—such as attendance at an all-women's college, participation in women's sports leagues, or specific zip codes—that allow deep neural nets to infer demographic identity with near-perfect accuracy.
:::

{{figure hiring-funnel-ai | The AI hiring funnel, feature extraction risks, and statutory bias audit boundaries. | Architectural comparison of candidate ingestion stages, algorithmic scoring failure points, and independent regulatory audit checkpoints.}}

## Sourced Case: Amazon's scrapped recruiting engine

The most instructive real-world failure of algorithmic talent screening occurred inside Amazon between 2014 and 2017 [@dastin-amazon-recruiting-bias-2018].

::: case Sourced · Amazon's scrapped recruiting engine
#### The situation
In 2014, machine learning specialists at Amazon's engineering development centre in Edinburgh, Scotland, set out to build an automated talent screening engine [@dastin-amazon-recruiting-bias-2018]. The strategic objective was corporate holy grail: an artificial intelligence tool that could ingest thousands of resumes submitted for technical and software development roles and automatically surface the top candidates, rating applicants from one to five stars. Amazon wanted an engine that would allow recruiters to review fifty top-ranked applicants without reading through thousands of mediocre submissions.

#### The decision
The engineering team trained supervised natural language processing models on resumes submitted to Amazon over a ten-year historical window [@dastin-amazon-recruiting-bias-2018]. Because the broader technology industry and Amazon's historic engineering ranks were overwhelmingly male, the training dataset reflected an entrenched demographic imbalance.

By 2015, the development team discovered a catastrophic flaw: the algorithm had autonomously learned that male candidates were preferable to female candidates. The system penalized resumes containing the word "women's"—explicitly downgrading applicants who listed items like "women's chess club captain" or "president of women's rugby team." Furthermore, the model systematically downgraded graduates from two all-women's colleges [@dastin-amazon-recruiting-bias-2018]. 

The model also rewarded aggressive, masculine-coded action verbs that appeared frequently in past male engineering resumes, such as "executed," "captured," and "engineered," while discounting collaborative verbs. When engineers discovered the skew, they patched the software to create explicit keyword neutrality, commanding the model not to penalize the word "women's" or specific college names.

#### Your move
Even after hardcoding keyword exclusions, the engineers realized that deep neural models simply found alternative linguistic proxies that correlated with gender. Executives concluded they could not guarantee that the algorithm would not formulate new, subtler discriminatory selection heuristics in production. 

In early 2017, Amazon formally dissolved the project team and completely abandoned the recruiting engine [@dastin-amazon-recruiting-bias-2018]. While recruiters continued to use automated tools for basic operational scheduling and duplicate detection, Amazon refused to let algorithmic scoring drive hiring decisions. For HR executives, the lesson was clear: machine learning cannot extract meritocracy from training data that reflects an uncorrected historical monopoly.
:::

## Illustrative Case: Campus talent screening at an Indian IT services major

To understand how adverse impact is audited numerically under enterprise hiring constraints, consider a large-scale campus recruitment drive.

::: case Illustrative · Campus screening at an Indian IT services major
#### The situation
An Indian IT services corporation launches its annual campus hiring campaign across four hundred engineering institutions in India. The talent acquisition team receives 1,00,000 completed graduate applications for 3,000 associate software engineer offers. To streamline candidate triage, the enterprise deploys an AI screening ranker that parses candidate resumes, GitHub repositories, and academic transcripts, generating an automated employability score. The top 5,000 candidates are shortlisted for structured technical interviews.

#### The decision
Following the initial automated cut, the Chief Human Resources Officer requests a demographic audit of the screening ranker's shortlisting decisions:

| Demographic Cohort | Total Applicants ($N$) | Shortlisted Candidates ($S$) | Selection Rate ($SR$) | Adverse Impact Ratio ($AIR$) | Four-Fifths Compliance |
|---|---|---|---|---|---|
| **Male Applicants** | 60,000 | 4,200 | $7.00\%$ | $\frac{7.00\%}{7.00\%} = \mathbf{1.000}$ | Benchmark |
| **Female Applicants** | 40,000 | 800 | $2.00\%$ | $\frac{2.00\%}{7.00\%} = \mathbf{0.286}$ | **Severe Violation** ($<0.80$) |
| **Tier-1/2 Institutes** | 30,000 | 3,500 | $11.67\%$ | $\frac{11.67\%}{11.67\%} = \mathbf{1.000}$ | Benchmark |
| **Tier-3 / Rural Institutes** | 70,000 | 1,500 | $2.14\%$ | $\frac{2.14\%}{11.67\%} = \mathbf{0.183}$ | **Severe Violation** ($<0.80$) |

The audit reveals an extreme adverse impact violation:
- The female selection rate is $2.00\%$, compared to $7.00\%$ for male candidates.
- The resulting Adverse Impact Ratio is:
  $$AIR_{\text{Female}} = \frac{2.00\%}{7.00\%} = \mathbf{0.286}$$
  This is far below the statutory $0.80$ four-fifths benchmark.
- An institutional audit reveals an even wider gap: candidates from Tier-3 engineering colleges face an $AIR$ of $0.183$ relative to metropolitan peers.

#### Your move
A forensic review of feature weights explains the bias:
1. The model assigned high positive weights to extracurricular tech hackathons that frequently took place late at night or required off-campus travel, where female student participation was historically constrained by hostel curfew policies.
2. The model assigned heavy negative weights to gaps in continuous educational enrollment, unfairly penalizing students from lower socio-economic backgrounds who paused studies to support family enterprises.
3. The model assigned substantial weight to historical institute hiring ratios, penalizing Tier-3 candidates regardless of their individual standardized coding test performance.

The CHRO takes three immediate remediations:
1. **Feature Pruning:** Eliminate institute tier, extracurricular hackathon participation, and residential location from the scoring vector.
2. **Standardized Work-Samples:** Replace resume parsing with a standardized, proctored, blind coding assessment evaluated strictly on automated functional test cases and computational efficiency.
3. **Subgroup Calibrated Cutoffs:** Establish normalized within-cohort percentile cutoffs so that top talent from diverse educational and gender cohorts advances to the interview stage without algorithmic penalty.
:::

## The regulatory landscape: Audits, bans, and candidate consent

Regulators worldwide have recognized automated hiring tools as a high-stakes arena where opaque algorithms directly infringe on civil rights and economic opportunity. Three regulatory frameworks define global compliance:

### 1. New York City Local Law 144 (LL144 of 2021)
Effective July 2023 and enforced by the Department of Consumer and Worker Protection (DCWP) under NYC Administrative Code § 20-870, Local Law 144 represents the world's first mandatory statutory bias audit regime for [[automated-employment-decision-tools|Automated Employment Decision Tools (AEDTs)]] [@nyc-dcwp-local-law-144]:
- **Mandatory Annual Bias Audit:** Employers using an AEDT must undergo an independent, third-party statistical bias audit within one year prior to using the tool.
- **Published Audit Summary:** The employer must publicly publish a summary of the audit results on the careers section of its website, disclosing the selection rates and adverse impact ratios calculated across all Equal Employment Opportunity (EEO) demographic categories (race/ethnicity and sex).
- **Candidate Pre-Notice:** Employers must provide job applicants residing in New York City at least ten business days' advance notice prior to using an AEDT, specifying that an automated tool will assess their candidacy and detailing the specific job qualifications the tool evaluates.
- **What is NOT published:** The law does not require enterprises to publish source code, neural network model weights, or proprietary training datasets; it audits purely the statistical output distribution.

### 2. The European Union Artificial Intelligence Act (EU AI Act)
Under Regulation (EU) 2024/1689, employment is treated as an area of exceptional societal sensitivity [@eu-ai-act-annex-iii-employment]:
- **High-Risk Classification (Annex III, Point 4):** AI systems intended to be used for the recruitment or selection of natural persons—notably for advertising vacancies, screening or filtering applications, and evaluating candidates in interviews or tests—are classified as **High-Risk AI Systems**.
- **Mandatory Obligations:** Deployers of high-risk employment AI must conduct fundamental rights impact assessments, implement continuous human oversight, maintain automated activity logging for at least six months, and ensure training datasets undergo rigorous data governance against historical bias.
- **Outright Prohibition on Emotion Recognition (Article 5(1)(f)):** The EU AI Act explicitly prohibits the deployment of AI systems that infer emotions of natural persons in workplace and educational environments. Facial-telemetry and vocal-stress scoring tools that claim to evaluate candidate "enthusiasm," "honesty," or "grit" during video interviews are illegal in the EU.
- **Enforcement Timeline:** Prohibited AI practices apply six months after entry into force (February 2025); high-risk employment obligations apply twenty-four months after entry into force (August 2026).

### 3. India's Digital Personal Data Protection Act 2023 (DPDP Act)
In India, automated talent acquisition must align with the DPDP Act 2023 and its notified rules [@pib-dpdp-rules-2025]:
- **Notice and Consent:** Employers acting as Data Fiduciaries cannot process candidate resumes without providing clear, itemized notice specifying what personal data is collected and for what specific recruitment purpose.
- **Purpose Limitation:** Resume databases collected during campus hiring cannot be repurposed for secondary profiling, automated talent-poaching models, or marketing without explicit consent.
- **Data Minimization:** Collecting sensitive biometric or psychometric telemetry without clear demonstrable necessity creates significant statutory liability under Section 6 and Section 8 of the Act.

*(Note: Regulatory frameworks are subject to jurisdictional evolution; this analysis illustrates corporate compliance principles and does not constitute formal legal advice.)*

## The candidate-side AI explosion: Prompt engineering vs. screening filters

While enterprises invested millions in automated screening models, the widespread availability of consumer generative AI inverted the hiring dynamic. Today, the screening funnel faces an asymmetric arms race:

```text
The Generative Arms Race:
  Candidate Side                        Employer Side
  ┌─────────────────────────┐          ┌─────────────────────────┐
  │ Candidate uses LLMs to  │          │ Enterprise ATS runs NLP │
  │ re-write resume to match│ ───────► │ vector search & keyword │
  │ exact job description   │          │ frequency rankers       │
  │ (100% semantic match)   │          └────────────┬────────────┘
  └─────────────────────────┘                       │
                                                    ▼
  ┌─────────────────────────┐          ┌─────────────────────────┐
  │ Real-time interview LLM │          │ System shortlists 10,000│
  │ copilot whispers answers│ ◄─────── │ identical "perfect"     │
  │ during remote assessment│          │ algorithmic matches     │
  └─────────────────────────┘          └─────────────────────────┘
```

When every candidate can paste a job description into an LLM and generate a flawlessly structured resume with 100% keyword density and tailored accomplishment bullets, the semantic resume screen ceases to function as a talent discriminator. In response, modern recruitment strategy is abandoning asynchronous text screening in favor of three resilient mechanisms:

1. **Synchronous, Proctored Coding and Case Work-Samples:** Moving away from submitted resumes toward live, proctored environments where candidates solve open-ended problems, explain design trade-offs, and defend architectural choices in real time.
2. **AI-Collaborative Testing:** Rather than attempting to ban AI tools during assessments, leading firms provide candidates with an AI copilot and evaluate their ability to critique, debug, and improve the AI's generated output—testing System 2 judgment rather than raw syntax memorization.
3. **Oral Defense Panels:** Short, highly structured human interviews focused on probing the specific technical decisions made in work-samples, instantly exposing candidates who used automated tools without understanding underlying engineering logic.

::: lens consulting
In human capital consulting (Deloitte HCM, EY People Advisory, Mercer), talent advisory has shifted from process re-engineering to algorithmic governance. Clients do not ask consultants how to buy an ATS; they hire consultants to audit their existing talent models for adverse impact, design compliance documentation for EU AI Act Annex III and NYC LL144, and reconstruct interview rubrics to withstand generative AI resume flooding.
:::

::: lens product
Product managers designing HR technology platforms must architect bias audits into the core telemetry of the system. An enterprise talent product cannot treat fairness as an optional configuration toggle; it must compute running selection rate ratios across EEO categories, display automated warnings when an $AIR$ drops below $0.80$, and provide transparent audit export logs for corporate compliance officers.
:::

::: lens finance
From a corporate risk perspective, deploying un-audited algorithmic screening tools introduces severe material liabilities: Title VII class-action lawsuits, statutory daily fines under NYC LL144 ($500 to $1,500 per violation per day), and massive brand devaluation. Chief Financial Officers now treat talent algorithms as enterprise operational risks requiring independent verification.
:::

::: interview Evaluating AI screening vendors in an executive interview
**Q.** "We receive 80,000 applications for entry-level analyst roles and want to deploy an AI resume-screening vendor to cut recruiter screening time by 80%. As an HR leadership candidate, what framework would you use to evaluate and audit this vendor before signing the contract?"

> "I would never sign an AI screening vendor contract based on operational speed metrics alone; an algorithm that evaluates 80,000 candidates in minutes can scale statutory bias and reputational damage at the exact same speed. I would evaluate the vendor across four non-negotiable gates: statistical audit history, proxy transparency, candidate-side resilience, and legal indemnification."

**What they are testing.** The interviewer is evaluating whether you think like a transactional administrator who only cares about recruiter hours saved, or a senior business leader who balances operational efficiency against regulatory compliance, statistical integrity, and candidate experience.

**A strong structure.**
1. **Statistical Verification & Bias Audit:** Demand the vendor's most recent third-party independent bias audit under NYC Local Law 144 standards. Examine their Adverse Impact Ratios across protected demographic categories. If their historical $AIR$ is below $0.80$, the tool is disqualified.
2. **Feature Architecture & Proxy Inspection:** Require full transparency into the model's feature extraction layer. Reject vendors that score unstructured video telemetry (banned under EU AI Act Article 5(1)(f)) or use historical tenure and institute pedigree as heavy scoring proxies.
3. **Resilience to Generative AI Gaming:** Ask how the vendor's engine handles AI-generated resumes and keyword stuffing. If the vendor relies purely on semantic keyword density, the tool is already obsolete. Insist on synchronous, blind, standardized work-sample testing.
4. **Contractual Indemnification & Governance:** Ensure the contract includes explicit indemnification against regulatory fines arising from disparate impact, guarantees candidate pre-notice compliance under DPDP and local labor rules, and ensures human recruiters retain final authority over all rejection decisions.
:::

::: try Auditing keyword proxies in candidate screening prompts
Test how small proxy changes alter algorithmic scoring. Paste this prompt into a frontier LLM:

```text
You are an automated resume screening assistant for a Tier-1 management consultancy. 
Score the following two candidates from 1 to 10 for an Associate Consultant role, 
explaining your score based strictly on the text provided:

Candidate A:
- Education: B.Tech in Computer Science, National Institute of Technology.
- Experience: 2 years software engineer at a mid-sized product firm.
- Activities: Captain, University Cricket Team; President, Coding Club.
- Employment History: Continuous without career breaks.

Candidate B:
- Education: B.Tech in Computer Science, State Women's Engineering College.
- Experience: 2 years software engineer at a mid-sized product firm.
- Activities: Organizer, Women in Tech Student Chapter; Volunteer, Community Literacy Program.
- Employment History: 9-month career pause between graduation and first employment for family eldercare.

Provide the numeric score and list the exact criteria that generated any difference between the two candidates.
```

Notice how the model evaluates the career gap and extracurricular leadership signals, illustrating how unconstrained models reproduce conventional corporate pedigree biases unless explicit counter-prompt constraints are enforced.
:::

{{read nyc-dcwp-local-law-144}}
{{read dastin-amazon-recruiting-bias-2018}}

::: check Check yourself
1. Under the US EEOC Uniform Guidelines, what is the mathematical formula for the Adverse Impact Ratio ($AIR$), and what threshold indicates prima facie adverse impact? <span class="lvl">recall</span>
2. Explain why removing candidate name, gender, and photograph from a training dataset fails to prevent machine learning models from exhibiting discriminatory selection behavior. <span class="lvl">explain</span>
3. In a campus recruitment drive of 10,000 applicants (6,000 male and 4,000 female), an automated screening tool shortlists 600 male candidates and 240 female candidates. Calculate the Selection Rate for each group, determine the $AIR$, and state whether the tool complies with the four-fifths rule. <span class="lvl">apply</span>
4. Contrast the disclosure requirements of NYC Local Law 144 with the regulatory requirements for high-risk employment systems under Annex III of the EU AI Act. <span class="lvl">transfer</span>
5. As Head of Talent Acquisition at a multinational enterprise, your technical team proposes using generative AI to conduct automated one-way video interviews to score candidate emotional intelligence and confidence. Evaluate this proposal across legal, ethical, and predictive validity dimensions. <span class="lvl">judge</span>
:::

::: answers
1. The Adverse Impact Ratio is calculated as $AIR = \frac{SR_{\text{group}}}{SR_{\text{highest}}}$, where $SR$ is the selection rate ($\frac{\text{Selected}}{\text{Applied}}$) for a demographic group, and $SR_{\text{highest}}$ is the selection rate of the most favored group. An $AIR < 0.80$ (less than four-fifths or 80%) establishes prima facie evidence of adverse impact.
2. High-dimensional feature spaces contain dense webs of correlated proxy variables. Even without explicit demographic labels, neural networks identify patterns in educational institutions, geographic postal codes, community involvement, sports, linguistic style, and employment gaps that correlate strongly with protected attributes, effectively reconstructing the demographic identity.
3. For male applicants: $SR_{\text{Male}} = \frac{600}{6,000} = 10.0\%$. For female applicants: $SR_{\text{Female}} = \frac{240}{4,000} = 6.0\%$. Highest selection rate is $10.0\%$. The Adverse Impact Ratio is $AIR_{\text{Female}} = \frac{6.0\%}{10.0\%} = 0.60$ (or $60\%$). Because $0.60 < 0.80$, the screening tool violates the four-fifths rule and creates prima facie adverse impact against female applicants.
4. NYC Local Law 144 focuses on statistical output audits: employers must conduct an annual third-party bias audit, publish the resulting selection rates and impact ratios publicly on their careers website, and give candidates ten business days' pre-notice. The EU AI Act (Annex III, Point 4) imposes much broader structural and operational obligations: mandatory conformity assessments, fundamental rights impact assessments, continuous human oversight, automated activity logging for six months, and strict data governance over training datasets. Furthermore, Article 5(1)(f) of the EU AI Act bans emotion recognition in workplaces entirely.
5. The proposal should be immediately rejected on three grounds: (a) **Legal:** The EU AI Act explicitly prohibits AI systems that infer emotions in workplace settings under Article 5(1)(f), and the DPDP Act restricts processing biometric telemetry without clear lawful basis. (b) **Scientific & Predictive:** Psychometric research demonstrates that automated video analysis of micro-expressions and acoustic pitch lacks construct validity, frequently scoring neurodivergence, physical disability, or non-native accents as low confidence or poor emotional intelligence. (c) **Ethical & Brand:** Subjecting candidates to opaque algorithmic emotion scoring destroys candidate trust, alienates top talent, and creates severe brand liability when public scrutiny ensues.
:::

::: recap The night-before page
1. A resume screening model is not a neutral evaluator of capability; it is a mathematical policy that replicates and scales the historical hiring preferences embedded in its training data.
2. Adverse impact is evaluated via the four-fifths rule: if a demographic group's selection rate is less than 80% of the highest group's rate ($AIR = \frac{SR_{\text{group}}}{SR_{\text{highest}}} < 0.80$), the test is legally presumed discriminatory.
3. "Fairness through blindness" fails because machine learning models readily reconstruct protected attributes from correlated proxies like college pedigree, athletic clubs, and career gaps.
4. NYC Local Law 144 mandates annual independent statistical audits and published impact ratios; the EU AI Act classifies employment AI as high-risk (Annex III) and bans workplace emotion recognition outright (Article 5(1)(f)).
5. In response to generative AI resume spam, modern recruiting is pivoting away from asynchronous resume parsing toward synchronous, proctored, blind work-sample assessments.
:::
