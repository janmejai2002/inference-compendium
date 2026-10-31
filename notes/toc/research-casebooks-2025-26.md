# Casebooks 2025-26: how much AI shows up? [signal]

All content below is [signal]: what students and clubs say they were asked. Casebooks are student-compiled (clubs state they did not independently verify data; cases come from candidates' recollection of interviews). Never cite as fact. Use only to decide what INFERENCE should cover.

## Method
- Source page https://www.beyond-campus.in/resources/consulting (a student-prep site, Next.js). The "Download Free" links resolve to `https://www.beyond-campus.in/casebooks/<slug>.pdf`. All 8 PDFs downloaded to `notes/toc/evidence/casebooks/raw/`. Not executed.
- markitdown was not installed on this machine, so text was extracted with PyMuPDF (page markers `=== PAGE n ===`) into `.md` files next to each PDF. Page numbers below are PDF page numbers.
- Counts: stated by the book where it says so (IIM-A, IIM-B), otherwise taken from the table of contents. Counts are approximate.
- AI-related = case whose prompt or solution needs understanding of AI/GenAI/ML, chatbots, AI products or startups, data centres/cloud, or digital-transformation/automation tech. Found by keyword scan per page (AI, GenAI, ML, chatbot, LLM, ChatGPT, data centre, digital transformation, automation, predictive, IoT, robot), then reading context. "Core" = AI is the subject of the case; "adjacent" = automation, cloud, digital transformation, IoT or analytics; "mention" = AI named inside another case's solution (not counted).
- Not done: IIM Indore 2025 and IIM Lucknow finals on SlideShare/Scribd, and the IIMA Consult Club page (students.iima.ac.in/ConsultClub/) were not fetched. The beyond-campus IIM-L file is the "Finals 2025" book, so that one is covered. Gemini/agy was not used; reading was by grep plus targeted page reads.

## Per-book table
| Book (file) | Cases (approx) | Guesstimates | Core AI cases | Adjacent (automation/cloud/DT) | AI share of cases |
|---|---|---|---|---|---|
| IIM-A Consult Prep Book 2025-26 (12th ed.) | 108 | 25 | 4 | 3 | 4 core (3.7%); 7 incl. adjacent (6.5%) |
| IIM-B ICON 2025-26 (vol 15) | 83 | 15 | 2 | 2 | 2 core (2.4%); 4 incl. adjacent (4.8%) |
| IIM-C Casebook 2025-26 (6th ed.) | 87 | 15 | 1 | 3 | 1 core (1.1%); 4 incl. adjacent (4.6%) |
| IIM-L Finals 2025 (interview transcripts) | ~100 case interviews | ~17 | 2 | 4 | 2 core (2%); ~6 incl. adjacent (6%) |
| ISB Casebook 2025 | ~29 | ~15 | 0 (1 GenAI Q-and-A) | 4 | 5 incl. adjacent and GenAI (17%) |
| BITSoM 2023-24 | ~38 | ~6 | 1 (analytics/ML) | 2 | 3 (8%) |
| Case Interview Guide 4.0, 2024-25 (180 Degrees Consulting, SRCC) | 73 | (separate book) | 2 | 0 | 2 (2.7%) |
| SRCC Guesstimates Vol 1 | ~60 guesstimates | all | 0 | 0 | 0 |
| Total (7 case books) | ~518 | | 12 | 18 | 12 core (2.3%); ~30 incl. adjacent (5.8%) |

Guesstimates with AI: 2 (IIM-A #21 and IIM-B #15, both "ChatGPT prompts/queries per day in India") out of ~115 across the books (1.7%).
Industry primers with real AI content: IIM-A (IT & ITES, Semiconductor, plus AI lines in Defence, FMCG, Healthcare, Insurance), IIM-B (Technology & Software, IT & ITeS), ISB ("AI & Deep Tech (India)"), IIM-L (AI lines in auto, insurance, pharma, telecom), BITSoM (AI lines in several). IIM-A, IIM-B, ISB and IIM-L each carry at least one dedicated tech-sector primer; IIM-C has an IT & ITES one with almost no AI.

## Full list of AI-related cases
Firm is as the book states it. "DT" = digital transformation.

### IIM-A (2025-26)
- #60 AI Startup Acquisition (p179-180). M&A/DD, E-commerce, Easy. Firm not stated. Prompt: Indian e-commerce firm may buy an AI startup (post-sale service optimisation from customer-call insights) for Rs 250 cr; value it. Needs: DCF/NPV of incremental cash flows, strategic vs financial acquisition, risk that AI tech leapfrogs, effect on the target's old revenue. [core]
- #70 AI Enterprise Acquisition (p203-204). M&A, Challenging. Firm not stated. Prompt: consumer-electronics giant weighs buying an AI-assistant company for $500M. Needs: what an AI assistant adds to an ecosystem, cloud dependencies, data-privacy compliance, integration cost, rival response. [core]
- #75 GenAI in International Bank (p218-219). Unconventional, BFSI, Easy; tagged "Bain Buddy Round". Prompt: HK bank wants GenAI use cases to raise efficiency. Needs: GenAI suits unstructured text, classic ML suits numeric data; use cases by value chain (KYC, credit memos, report drafting, compliance); human-in-loop and bank-hosted models for regulation. [core]
- #99 Customer Service Process Automation (p273-274). Unconventional, E-commerce, Mod-Challenging. Firm not stated. Prompt: pick which of 12M annual contacts to automate; cost down, CSAT held. Needs: chatbot vs human channels, ticket-type mix, impact-feasibility matrix, auto-approval of low-value refunds. [core]
- #81 Retail Chain (DT) (p233-234). Unconventional, Retail, Moderate. Needs: IoT along supply chain, vendor platform, analytics benchmarking. [adjacent]
- #84 DT of FMCG Client (p239-240). Unconventional, FMCG, Moderate. Needs: distribution-network digitisation, automation of order flow. [adjacent]
- #108 Digitizing Gold Loans (p293-295). Unconventional, Banking, Challenging. Needs: end-to-end digital loan journey, automated filters, fraud/cyber controls. [adjacent]
- Guesstimate #21 ChatGPT prompts per day in India (p318). Needs: penetration by income tier, prompts per user.
- Weak mentions, not counted: #67 Acquisition for Ecosystem Integration (AI servers predicting behaviour, privacy), #48 B2B SaaS Logistics (AI route optimisation as upsell), #82/#101 area cases with automation lines.

### IIM-B ICON (2025-26)
- Market Entry #2 AI Diagnostics for Indian Healthcare (p101-103). BCG, Challenging. Prompt: fintech with AI/ML R&D enters medical diagnostics in India. Needs: AI adoption gap Tier-1 vs Tier-2/3, B2B first, self-reliant AI tool, trust and accessibility. [core]
- M&A #7 AI Startup under the Lens (p185-187). EYP, Moderate. Prompt: Singapore PE firm checks whether two Indian startups' AI capabilities are real or inflated. Needs: separating real AI from marketing, use-case depth, scalability, measurable ops KPIs. [core]
- Unconventional #3 Call Center Operations Optimization (p196-198). Bain, Challenging. Needs: chatbots, self-serve portal, AI assistance during calls, automating routine queries. [adjacent]
- Market Entry #9 TELCO Score Index (p118-119). Strategy&, Moderate. Prompt: telecom builds a score index from its data using AI. Needs: data/AI readiness, pricing, compliance. [adjacent]
- Guesstimate #15 ChatGPT India Usage (p247), Challenging. Needs: awareness-to-intent funnel, free vs premium users, global benchmark downscaled.
- Weak mention: Privatized Indian Airline (YCP Auctus, p218) notes AI-based scheduling and predictive maintenance as alternate directions.

### IIM-C (2025-26; no firm tags)
- #70 Robots and Returns (p354-357). M&A, IT & ITES, Difficult. Prompt: VC-style investor weighs Series B in a logistics-robotics startup ($25M ARR, $3M monthly burn). Needs: startup valuation, exit paths, AI-driven product defensibility. [core]
- #72 Analytics Exit Equation (p363-366). M&A, IT & ITES, Difficult. Prompt: founder of an analytics firm gets a $500M offer from Accenture (talent-driven). Needs: valuing a data/analytics services firm. [adjacent]
- #69 Connected Home Valuation (p350). M&A, Technology, Medium. Needs: valuing home-IoT startups. [adjacent]
- #51 Advising the Advisors (p265-270). Growth, Consulting, Easy. AI/GenAI consulting as a new service line and GenAI boutique acquisition. [adjacent]

### IIM-L Finals 2025 (firm from section order, transcripts)
- Accenture (p69-80): software support case answered with AI chatbots using NLP (p70); candidates asked "How familiar are you with Gen AI? Its application in automotive" (p70-71); tips say Accenture values GenAI and smart-product knowledge (p71, 73). [core knowledge test]
- BCG (p103-121), p104: predict next-year EV sales; interviewer from TMT asked DT and AI application questions. [adjacent]
- Deloitte USI (p122-129), p126-127: cloud-transition market entry (IAM, serverless, AI integration in training) and a DT cost-optimisation case. [adjacent]
- Kearney (p139-151), p137: technical due diligence on Paytm IT systems incl. AI-driven fraud detection. [adjacent]
- PwC US Advisory (p173-180), p177-179: IT integration after a waste-management acquisition; cost drivers of data centres. [adjacent]
- YCP Auctus (p194-198), p195: "An AI company with low sales, high cash burn, losing investor confidence: boost sales". [core]
- McKinsey (p170): HR round asks stakeholders and success attributes if an AI system replaces call-centre agents (text-to-voice). [core, behavioural/case hybrid]
- Case examples p40-41: IT-company cost cutting with test automation. [adjacent]

### ISB 2025 (firm in header)
- Deloitte, Unconventional - Cloud Strategy, Insurance, Medium (p92-93). Move two private data centres to cloud: drivers, capex refresh, opex, migration. [adjacent, data-centre]
- Technology Strategy, Healthcare, Medium (p96-97; firm "Others"). 100 on-prem apps to cloud; AI for medical research cannot run on current systems. [adjacent]
- Other, Digitization, Power Distribution, Medium (p134). Uses AI to forecast peak demand, AI + IoT predictive maintenance. [adjacent]
- Interview example with GenAI in Indian retail (p139): personalised recommendations, demand forecasting, inventory, service automation. [core Q-and-A]
- Accenture-style case on turning case-data into competitive advantage (p138). [adjacent]
- Primer "AI & Deep Tech (India)" (p173-174): IndiaAI Mission $1.25B, GPU supply, 60+ GenAI startups since 2023, Porter's forces. Only dedicated AI primer found in any book.

### BITSoM 2023-24
- #30 Steel Manufacturer (p88-89). McKinsey, Unconventional, Easy. "Improve performance using analytical tools": attrition prediction, demand forecast, predictive maintenance. [core analytics/ML]
- Weak: Pan India Diagnostic Chain (Praxis, p42) automation vs staff; USA Hospital (McKinsey, p100-101) robotic process automation. [adjacent x2]

### Case Interview Guide 4.0 (180 Degrees Consulting)
- #70 "GPT, Convince Dad" (p290-292). Accenture, Unconventional. Prompt: convince a father running a traditional consumer-goods firm to adopt AI. Needs: map the value chain, AI in forecasting, inventory, GenAI marketing, support chatbots; ROI/NPV and pilot. [core]
- #71 "Pitch Perfect" (p293-296). Accenture, Unconventional. Prompt: recommend AI tools for an event company to lift match attendance (IPL-style). Needs: a "buzz parameter" from social/cricket data driving dynamic pricing. [core]
- Tip p49: "Accenture as a company looks for automation and AI driven solutions. Inculcating AI/automation in your answers can earn you brownie points."

### SRCC Guesstimates Vol 1
No AI items found (keyword scan; market sizes of tyres, paint, quick commerce, VFX, etc.).

## Patterns
1. AI is a small share of case volume (about 2% core, 6% with adjacent tech) but concentrated in specific slots: M&A/due diligence of AI companies (IIM-A x2, IIM-B x1, IIM-C x1), unconventional cases about process automation or digital transformation (IIM-A, IIM-B, ISB), and "convince the client to adopt AI" pitches (Case Interview Guide x2).
2. Case types carrying AI: M&A/DD (about 6 of 12 core), unconventional (about 5), market entry (1). Profitability and pricing cases almost never carry AI. In the 2025-26 editions the AI cases skew to the new additions (IIM-A flags GenAI in International Bank and AI Enterprise Acquisition as recent; ISB cloud and power digitisation are marked "2025 addition").
3. Firms: Accenture is the strongest (3 books say it asks GenAI/AI questions and AI-pitch cases; the guide's own tip says AI answers earn credit). Bain (GenAI bank buddy round; IIM-B call-centre chatbots), BCG (AI diagnostics), EYP (AI startup diligence), Deloitte (cloud/data centres), Strategy& (AI-based telco score), YCP Auctus (AI company), McKinsey (AI replacing call-centre agents; ML analytics in steel). Tech-heavy practices (Accenture, Deloitte, EYP, TMT interviewers) ask most.
4. Recurring knowledge candidates needed: GenAI is for unstructured text and traditional ML for numeric prediction; use-case mapping along a value chain (KYC, credit memos, forecasting, predictive maintenance, personalisation, chatbots); valuing an AI company (DCF, plus real-vs-inflated AI, defensibility, leapfrogging risk); privacy and compliance; human-in-loop; cloud and data-centre migration basics (capex refresh, opex, serverless); automation prioritisation with an impact-feasibility matrix; sizing AI usage (ChatGPT prompts per day).
5. Primers: the AI-adjacent sector primers (IT & ITES, Semiconductor with GPUs and data centres, AI & Deep Tech) are where factual AI context lives: IndiaAI Mission, India data-centre capacity (1.8 GW by 2027 per IIM-A primer, unverified), TCS job cuts attributed to AI. These figures are student-compiled, so verify at source before use.
6. Guesstimates: only the ChatGPT usage estimate recurs (two books), a data point that the top-down funnel method is how AI-adoption is tested.

## Gaps and cautions
- Self-reported and recall-based; IIM-C carries no firm tags; IIM-L firm assignment is from section order. The beyond-campus page lists 8 books, but "IIM-L 2025" is actually Finals 2025, and BITSoM is from 2023-24, so it predates the GenAI wave.
- No book has an AI-specific section or chapter, apart from the ISB primer. Almost no case asks how a model works, what data a model needs, evaluation, cost of inference, or build-vs-buy of LLM tools. Candidates answer at business-use-case level.
- IIM-A mentions a 274-case real-interview repository and an "AI Casebot" on its Consult Club page; not opened. IIM Indore 2025 casebook not found or opened. SlideShare/Scribd not searched.
- The counts are approximate: IIM-L and ISB are transcript or example-based, and ISB's case boundaries were counted from headers.
- "Adjacent" is a judgement call; strict reading drops the total to 12 core cases.
