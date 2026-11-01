# Research packet: kinds-of-ai ("Not all AI is ChatGPT")
Researched 2026-11-01. Lens: consulting. Items marked ✓ were re-opened today.

## Facts
1. **Predictive/analytical AI is the bigger pool of value.** MGI estimates "nongenerative artificial intelligence and analytics" could unlock **$11 trillion to $17.7 trillion** of economic value; the 63 generative AI use cases add **$2.6 trillion to $4.4 trillion annually**, "15 to 40 percent" on top. (Earlier 2017 MGI estimate: $9.5 trillion to $15.4 trillion.) Chui, Hazan, Roberts, Singla, Smaje, Yee, Zemmel, Sukharevsky, *The economic potential of generative AI: The next productivity frontier*, McKinsey Global Institute, 14 Jun 2023. https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier . Tier B. ✓ opened 2026-11-01. (Say "MGI estimated in 2023".)
2. **Same report, words on the split:** "the other applications of AI discussed in our previous report continue to account for the majority of the overall potential value of AI. Traditional advanced-analytics and machine learning algorithms are highly effective at performing numerical and optimization tasks such as predictive modeling". Same source. Tier B. ✓
3. **Where GenAI value concentrates:** "About 75 percent" falls in customer operations, marketing and sales, software engineering, R&D. Banking: "an additional $200 billion to $340 billion annually" if fully implemented. Same source. ✓
4. **MGI definition of the generative family:** "applications typically built using foundation models"; unlike earlier deep learning models they "can process extremely large and varied sets of unstructured data and perform more than one task." Use as the contrast: older models do one task, usually on structured data. Same source. ✓
5. **Indian predictive use, RBI.** Statement on Developmental and Regulatory Policies, 6 Dec 2024, item 10: "an AI / ML based model called MuleHunter.AI" that "enables detection of mule bank accounts in an efficient manner"; "A pilot with two large public sector banks has yielded encouraging results." Reserve Bank of India. https://www.rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=59245 . Tier A. ✓
6. **Scale-up.** Governor Sanjay Malhotra, keynote at Global Fintech Fest, 8 Oct 2025 (posted 10 Oct), para 28: "MuleHunter.ai, developed by the Reserve Bank Innovation Hub has been scaled up from about 5 banks at the beginning of this year to 21 banks. Unlike earlier approaches, this is enabling them to use system-wide learning to improve detection of mule accounts." https://www.rbi.org.in/scripts/BS_SpeechesView.aspx?Id=1525 . Tier A. ✓
7. **Still running in 2026.** Deputy Governor Shirish Chandra Murmu, GFF keynote, 11 Sep 2026: RBI's "MuleHunter.AI initiative already uses AI and machine learning to identify mule accounts channelling the proceeds of fraud." https://www.rbi.org.in/scripts/BS_SpeechesView.aspx?id=1579 . Tier A. ✓
8. **Prediction as the economic frame.** Agrawal, Gans, Goldfarb, *The Simple Economics of Machine Intelligence*, HBR, 17 Nov 2016; standfirst: "Prediction is about to get way cheaper." Body paywalled; only title, authors, date, standfirst seen. Tier B. ✓ (partial)

Do not state: any MuleHunter detection rate (RBI gives none). Press reports of 23 banks (RTI, Dec 2025) or 26 banks (Mar 2026) were not opened; avoid.

## Watch
No video in the scored lists (`videos-run1`, `videos-run2`, `gated-run*`) covers predictive vs generative AI. Checked: 3Blue1Brown neural network (DROP, business_relevance 1), Veritasium Markov chains (DROP, accuracy flags), Think School India (DROP, 4 accuracy flags), IBM "Generative vs Agentic" (agents, ch6 material). **Recommend no Watch card here**, or Read-only box. `agent-reach youtube search` was rate-limited today (about 52 min wait), so I found no fresh candidate and checked no marks. Follow-up: search IBM Technology, Google Cloud Tech, MIT Sloan, HBS Online and score against `research-video-rubric.md`.

## Read
- **MGI, economic potential of generative AI** (fact 1). Read the key insights and the "two lenses" section, stop before occupation tables. Why: a consulting firm itself says predictive models hold most of the value.
- **HBR, Simple Economics of Machine Intelligence** (fact 8). Why: "AI is cheap prediction" makes churn, credit and demand obviously AI problems, and gives students an interview sentence.

## Interview questions (3)
1. A telecom's churn is rising. Chatbot, prediction model, or both? What data first? Pattern: casebook #30 "Steel Manufacturer" (McKinsey, Unconventional): attrition prediction, demand forecast, predictive maintenance as "analytical tools"; `research-casebooks-2025-26.md`.
2. A bank wants GenAI use cases. Split into language-model tasks and classic-ML tasks, one example each. Pattern: casebook #75 "GenAI in International Bank" (Bain buddy round): "GenAI suits unstructured text, classic ML suits numeric data"; KYC, credit memos, fraud.
3. Convince a sceptical founder of a traditional consumer-goods firm to adopt AI; where along the value chain do you start? Pattern: casebook #70 "GPT, Convince Dad" (Accenture): forecasting and inventory before marketing copy and chatbots; ROI and pilot.
(Casebook patterns only. No claim that any firm asked these.)

## Indian business example
**MuleHunter.AI (RBI Innovation Hub).** A classification problem on structured transaction data: does this account behave like a mule account? No text generation. RBI contrasts it with "earlier approaches" and cites "system-wide learning" across banks. Sources: facts 5, 6, 7. For credit scoring add an `Illustrative` panel (a lender scoring repayment risk from numeric repayment history; no real firm, no invented numbers).

## Misconceptions
1. "AI means ChatGPT." Rebuttal: MGI majority-of-value statement (fact 2).
2. "Newer is better, so use the LLM." A forecasting or fraud task on numbers is usually a predictive-model task; LLMs suit unstructured text (casebook #75 pattern). No source quantifies LLM-vs-classic accuracy, so use an Illustrative panel and do not claim a number.
3. "Rules are not AI / learned always beats rules." Rules suit stable, known logic and are transparent; learned models earn their place when patterns are many or shifting. Frame as a decision, not a ranking.

## Stat block
**$11T to $17.7T vs $2.6T to $4.4T a year** (MGI, 2023): nongenerative AI and analytics vs generative AI use cases analysed. Fact 1.

## sources.yml-ready entries
```yaml
mgi-genai-economic-potential:
  type: report
  title: "The economic potential of generative AI: The next productivity frontier"
  creator: Michael Chui, Eric Hazan, Roger Roberts, Alex Singla, Kate Smaje, Lareina Yee, Rodney Zemmel, Alexander Sukharevsky
  publisher: McKinsey Global Institute
  year: 2023
  url: https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier
  tier: B
  why: Puts numbers on both families. Nongenerative AI and analytics $11T to $17.7T a year; generative AI $2.6T to $4.4T on top. Read the key insights, skip the occupation tables.
  verified: true

rbi-dev-reg-policies-2024-12:
  type: report
  title: "Statement on Developmental and Regulatory Policies (6 December 2024), item 10: MuleHunter.AI"
  creator: Reserve Bank of India
  publisher: Reserve Bank of India
  year: 2024
  url: https://www.rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=59245
  tier: A
  why: The regulator's own description of an AI/ML model built for one narrow predictive job, piloted with two public sector banks.
  verified: true

rbi-malhotra-gff-2025:
  type: report
  title: "Driving Inclusive and Sustainable Growth Through Digital Public Infrastructure and FinTech (keynote, Global Fintech Fest 2025)"
  creator: Sanjay Malhotra, Governor
  publisher: Reserve Bank of India
  year: 2025
  url: https://www.rbi.org.in/scripts/BS_SpeechesView.aspx?Id=1525
  tier: A
  why: Para 28 gives the scale-up of MuleHunter.ai from about 5 banks to 21 in 2025 and the "system-wide learning" point.
  verified: true

rbi-murmu-gff-2026:
  type: report
  title: "Trusted Innovation: Shaping the Future of Finance (keynote, Global Fintech Fest 2026)"
  creator: Shirish Chandra Murmu, Deputy Governor
  publisher: Reserve Bank of India
  year: 2026
  url: https://www.rbi.org.in/scripts/BS_SpeechesView.aspx?id=1579
  tier: A
  why: Confirms MuleHunter.AI is still RBI's AI/ML tool against mule accounts in September 2026.
  verified: true

hbr-simple-economics-machine-intelligence:
  type: article
  title: "The Simple Economics of Machine Intelligence"
  creator: Ajay Agrawal, Joshua Gans, Avi Goldfarb
  publisher: Harvard Business Review
  year: 2016
  url: https://hbr.org/2016/11/the-simple-economics-of-machine-intelligence
  tier: B
  why: Frames AI as cheaper prediction, which is why churn, credit and demand questions are AI questions.
  verified: false
```
HBR entry is `false`: body paywalled. All domains are on the allowlist.

## Gaps
- No video candidate (see Watch); YouTube search rate-limited.
- No sourced Indian credit-scoring or demand-forecast example. RBI FREE-AI report (13 Aug 2025) primary not opened (RBI page returned navigation only), so its "explainable, auditable credit models" line is unconfirmed. M5 forecasting competition (Walmart, Int. J. Forecasting 2022) would be a strong forecasting fact but its domain is not allowlisted.
- No source quantifying churn or fraud model lift. MGI figures are 2023 and use-case based; a newer split would be better if an editor wants a 2026 number.
- Google ML Crash Course definitions (supervised, classification vs regression) not allowlisted, not fetched.
