# Packet: ai-casebook (The INFERENCE AI casebook, ~20 pp)
Research only. Pattern sources: `notes/toc/research-casebooks-2025-26.md` and `evidence/casebooks/raw/` (student-compiled, [signal], never cite as fact, never copy text). Everything below marked Illustrative must be labelled so in the chapter. Chapter ids in brackets = the Part I/II chapter each item exercises.

## A. Pattern catalogue (own words)
How the 2025-26 books carry AI: ~2% of cases core, ~6% with adjacent tech; concentrated in a few slots. Guesstimates with AI: 2 of ~115 (both "ChatGPT prompts per day in India").

1. **Diligence of an AI company** (IIM-A #60/#70, IIM-B M&A #7, IIM-C #70). Opening: acquirer, target, a price tag, "should we buy / value it". Clarifying: what does the AI actually do, who are the customers, is revenue recurring, who owns the data, what does the target's old revenue look like. Framework: strategic fit + valuation (DCF of incremental cash flows) + risk. The AI layer is "real or inflated": use-case depth, measurable ops KPIs, defensibility, risk that a bigger model leapfrogs it, dependency on a third-party model or cloud, privacy compliance. Typical numbers: price in Rs cr or $M, ARR, burn, a synergy % on one cost line.
2. **Convince the client to adopt AI** (Case Interview Guide "GPT, Convince Dad"; its tip that AI-literate answers earn credit with tech-heavy practices). Opening: a conservative owner, a traditional business. Clarifying: where do time and money go today, what data exists, who would use the tool. Framework: map the value chain, pick 2-3 uses (forecasting, inventory, support, marketing copy), ROI/NPV, a pilot with a stop rule, change management. Numbers: current cost lines, a 5-15% saving range, pilot cost.
3. **Use-case mapping and prioritisation** (IIM-A #75 GenAI in a bank, #99 customer-service automation; ISB retail GenAI Q&A). Opening: "which use cases". Framework: split by data type (text and documents vs numeric prediction), walk the value chain, score on an impact-feasibility 2x2, then a human-in-loop and regulation overlay. Numbers: contact volume by ticket type, share automatable, cost per contact.
4. **Process automation / operations** (IIM-B call-centre case; BITSoM steel analytics). Framework: ticket-mix segmentation, containment rate vs CSAT, cost per contact, rollout in waves. Numbers: volumes, handle time, containment %.
5. **Cloud and data-centre economics** (ISB cloud migration, PwC data-centre cost drivers). Framework: capex refresh vs opex, utilisation, migration cost, power as a cost driver, lock-in. Numbers: MW, Rs per kW, utilisation %, payback years.
6. **Sizing AI usage** (IIM-A #21, IIM-B #15). Method: top-down funnel (population, internet users, aware, tried, weekly active, paying) times prompts per user per day; sanity-check against a global benchmark. Gap in the books: nobody prices a prompt in tokens or GPUs. INFERENCE can own that.
Not in any book (INFERENCE edge): inference cost per query, evaluating model output, build-vs-buy of LLM tools, agent failure modes. Each case below adds one such layer.

## B1. Ten case premises (all Illustrative, Indian settings)
1. **Diligence: "AI-first" support startup** [kinds-of-ai, confidently-wrong]. A PE fund weighs Rs 400 cr for a Bengaluru support-automation startup claiming 80% automation. Test: is it a wrapper on a third-party model, what is the measured resolution rate, how many reviewers sit behind it. Archetype 1.
2. **Convince the owner: regional FMCG snacks maker** [pilots-stall, work-changes]. Second-generation owner says "AI is hype". Map forecasting, trade promotion, WhatsApp order-taking; propose a 90-day pilot with a kill rule. Archetype 2.
3. **Use-case map: private bank** [kinds-of-ai, your-documents]. Prioritise GenAI vs classic ML across KYC, credit memos, branch queries, collections; 2x2 plus RBI-style human-in-loop overlay. Archetype 3.
4. **NBFC underwriting for gig workers** [kinds-of-ai, confidently-wrong]. A two-wheeler lender wants an LLM to read bank statements and an ML score to decide. Separate extraction (LLM, checkable) from decision (auditable model); bias and explainability. Archetype 3.
5. **Quick-commerce support automation** [models-that-act, work-changes]. Millions of monthly contacts, mixed ticket types; which to automate, and where an agent may refund without a human. Archetype 4.
6. **IT services pricing when AI cuts effort** [who-pays, consulting-firm]. A mid-size IT firm sees coding effort fall ~30% on pilots; clients demand lower rates. Time-and-materials vs outcome pricing, margin maths, deals to protect. Archetype 2/4 hybrid.
7. **Hospital chain pilots** [pilots-stall, judging-output]. Three AI pilots (clinical scribe, radiology triage, billing) run in one chain; two stalled. Diagnose with a pilot-to-scale checklist; define "good" with clinicians. Archetype 3/4.
8. **Telecom build vs buy** [who-pays, next-word-machine]. A telco wants an LLM assistant for care and network ops: API tokens vs self-hosted open model on rented GPUs vs IndiaAI-subsidised compute; cost per call. Archetype 5.
9. **Edtech AI tutor unit economics** [who-pays, next-word-machine]. A test-prep app adds an AI tutor; per-student token cost vs subscription price; free-tier cap. Archetype 5/6.
10. **State government grievance assistant** [your-documents, models-that-act]. A state wants a multilingual assistant over land-record and grievance files. Privacy (DPDP), accountability for wrong answers, what the model may never do. Archetype 3.
Each model answer shows: clarifying questions, structure, one number-led step, one risk, one recommendation, and a "where AI output would mislead you" box.

## B2. Ten guesstimate premises
1. **Prompts per day in India** [next-word-machine]: funnel from the TRAI base. Anchors 1-3, 9.
2. **Monthly token bill of a bank's KYC-and-memo assistant** [your-documents, who-pays]: pages x tokens x price. Anchor 7.
3. **GPUs to serve 10 million daily AI-tutor students** [who-pays]: tokens per day to GPU-hours at Rs 65 per hour. Anchors 4, 5.
4. **Do 38,000 IndiaAI GPUs fit in India's data-centre capacity, and what share do they take** [who-pays]: GPUs x kW per GPU (labelled assumption) vs 1,789 MW. Anchors 4, 6.
5. **Paid AI-seat market among Indian white-collar staff** [work-changes]: workforce x adoption x Rs 1,800 a month. Anchor 8.
6. **Analyst hours saved at a 5,000-person consulting firm** [consulting-firm, work-changes].
7. **Cost per resolved query, human vs AI, quick commerce** [models-that-act]: handle time, wage, tokens, containment.
8. **Compute to screen every UPI payment with a fraud model** [kinds-of-ai]: ~800 M a day (see gaps) times milliseconds per score.
9. **Indian MBA cohort facing an AI-literate case round** [judging-output]: needs a seat-count source (gap); else fall back to named-institute seats.
10. **Cloud bill for a hospital chain's imaging archive** [your-documents]: scans a day x MB x years x Rs per GB-month (assumption).
Every model answer writes each assumption, says whether it is sourced or "mine", and sanity-checks against an anchor.

## C. Anchor facts (re-opened 2026-11-01 unless marked)
1. TRAI, June 2026: total telephone subscribers 1348.08 million (wireless 1300.25, wireline 47.82); tele-density 94.31%; urban 792.06 M, rural 556.01 M. ✓ PR 104/2026, 28 Jul 2026. Subscriptions are not people; say so.
2. Same release: broadband subscribers 1087.50 million incl. M2M (wireless 1039.78); 1001.50 million excluding M2M. ✓
3. Same release: active wireless subscribers at peak VLR 1201.06 million. ✓
4. PIB (MeitY), 25 Mar 2026: IndiaAI Mission outlay Rs 10,372 crore; "more than 38 thousand GPUs" onboarded through the AI compute portal for startups and academia; 190 projects approved. ✓
5. PIB backgrounder, 17 Feb 2026: the 38,000+ GPUs available at Rs 65 per hour; 20,000 more announced. ✓ (announcement only, delivery not confirmed)
6. Cushman & Wakefield, India Data Centre H1 2026 (23 Sep 2026): top seven markets added 178 MW in H1; operational 1,789 MW; pipeline 3,860 MW to 2030 (509 under construction, 3,351 planned); 147 data centres, 33 providers; colocation vacancy 14.9%. ✓ Savills says 1.8 GW IT with 258 MW added; state scope when quoting.
7. Anthropic API pricing: Claude Sonnet 5.5 $2 per million input tokens, $10 per million output; Opus 5.5 $4/$20; Fable 5.1 $10/$50. ✓ Prices change; date it.
8. OpenAI ChatGPT Business (India page): standard seat Rs 1,800 a month ($20 billed annually, $25 monthly); premium Rs 9,000. ✓
9. Anthropic Economic Index India brief, 16 Feb 2026: India 5.8% of Claude.ai use (second to US), 101st of 116 countries per capita; data Nov 2025. ✓
10. NOT RE-OPENED: UPI volume. NPCI's statistics table is script-loaded and unreadable by my tools. Press says ~24.07 bn transactions in Sep 2026 (over 800 M a day); FY26 totals conflict (218.6 bn in one report, 241.6 bn in another). Do not use until someone reads the NPCI table.

## D. Interview questions (3)
1. "A bank asks which GenAI use cases to build first. Walk me through how you would choose, and name one it should not automate." Pattern: use-case mapping + human-in-loop (IIM-A GenAI-bank archetype); JD evidence: judgment over AI output (BCG AI at Work in research-market).
2. "A founder says his AI product automates 80% of support. How would you test that before we invest?" Pattern: diligence of an AI company, real vs inflated (IIM-A, IIM-B archetype).
3. "Estimate how many AI prompts Indians send in a day, then tell me what that costs to serve." Pattern: the recurring ChatGPT guesstimate plus INFERENCE's token and GPU extension.

## E. Indian business example
Illustrative: the ten cases above. No real firms; no invented numbers for real companies.

## F. Misconceptions and stat
- "AI cases are tech questions." Candidates answer at business-use-case level; structure, numbers and judgment decide.
- "Automating 80% of tickets saves 80% of cost." Containment is not resolution; escalations and rework eat savings (case 5, G7).
- "Tokens are free, GPUs are the cost." Teach the chain: tokens priced per million, GPUs per hour (Rs 65 subsidised).
Stat block: India has 1348.08 million telephone subscribers (TRAI, June 2026) but is 101st of 116 countries in per-capita Claude.ai use (Anthropic, Nov 2025 data).

## G. Watch / Read
Watch: none proposed. Read: Cushman & Wakefield H1 2026 update (anchor 6), for G4 and case 8.

## H. sources.yml-ready
```yaml
trai-pr104-2026:
  type: report
  title: "Highlights of Telecom Subscription Data at the end of June 2026 (Press Release No. 104/2026)"
  creator: Telecom Regulatory Authority of India
  publisher: TRAI
  year: 2026
  url: https://www.trai.gov.in/sites/default/files/2026-07/PR_No104of2026_0.pdf
  tier: A
  why: The regulator's own monthly count, the denominator for every India-usage guesstimate. trai.gov.in is not on the allowlist yet; add it at A.
  verified: true
pib-indiaai-compute-2026-03:
  type: report
  title: "IndiaAI Mission Expands AI Ecosystem with Affordable Compute and Startup Support"
  creator: Ministry of Electronics and IT (PIB Delhi)
  publisher: Press Information Bureau
  year: 2026
  url: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2245069&reg=3&lang=1
  tier: A
  why: Government statement of the 38,000+ GPU common-compute pool and Rs 10,372 crore outlay (25 Mar 2026). pib.gov.in is not on the allowlist; add it at A.
  verified: true
pib-india-ai-moment-2026-02:
  type: report
  title: "India's AI Moment (PIB Backgrounder)"
  creator: Press Information Bureau
  publisher: Press Information Bureau
  year: 2026
  url: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2229397&reg=48&lang=2
  tier: A
  why: Source for GPUs at Rs 65 per hour and the announced 20,000 additional GPUs (17 Feb 2026).
  verified: true
cw-india-dc-h1-2026:
  type: article
  title: "India's data centre development pipeline through 2030 reaches 3,860 MW (India Data Centre H1 2026 Update)"
  creator: Cushman & Wakefield (Aditi Vij)
  publisher: Cushman & Wakefield
  year: 2026
  url: https://www.cushmanwakefield.com/en/india/news/2026/09/india-data-centre-h1-2026-update
  tier: B
  why: Broker research is the standard source for data-centre MW; figures differ by firm and scope. cushmanwakefield.com is not on the allowlist; add at B or declare C with this reason.
  verified: true
anthropic-api-pricing:
  type: article
  title: "Pricing (Claude API)"
  creator: Anthropic
  publisher: Anthropic
  year: 2026
  url: https://platform.claude.com/docs/en/about-claude/pricing
  tier: A
  why: Originator's per-million-token prices for the token-cost guesstimates. platform.claude.com is not on the allowlist (anthropic.com is); add it. Prices change, so cite with the date.
  verified: true
openai-chatgpt-business-pricing:
  type: article
  title: "ChatGPT Business pricing (India)"
  creator: OpenAI
  publisher: OpenAI
  year: 2026
  url: https://openai.com/business/pricing/
  tier: A
  why: Originator's seat price in rupees, the anchor for the paid-seat guesstimate. The page is localised and changes.
  verified: true
anthropic-india-brief:
  type: report
  title: "India Country Brief: The Anthropic Economic Index"
  creator: Anthropic Economics team
  publisher: Anthropic
  year: 2026
  url: https://www.anthropic.com/research/india-brief-economic-index
  tier: A
  why: India is large in total AI use but 101st of 116 per capita, the honest ceiling on adoption in a usage guesstimate. Another packet may have added this; reuse its id.
  verified: true
```

## I. Gaps
- Smartphone-user count and a people-based internet-user figure (TRAI counts subscriptions).
- Indian MBA/PGDM seat total: no official aggregate found (AICTE per-institute EOA letters only). Source it or drop G9.
- UPI volume primary (NPCI table script-loaded); FY26 totals conflict across press.
- GPU purchase price and kW per GPU: no primary opened; use labelled assumptions. Rs 65 per hour is the only opened price; other reported IndiaAI rates (Rs 52, 100, 115-150) are unconfirmed.
- Casebook counts are student-compiled: say "casebooks we reviewed", never cite as fact.
- Did not use `synthesis-gemini-2026-11-01.md`.
