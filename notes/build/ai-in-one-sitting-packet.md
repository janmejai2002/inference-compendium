# Packet: ai-in-one-sitting (Part I in ten pages)
Thesis hook: usage is wide, enterprise payoff is not, and the hiring test is now "direct it and judge it". All numbers re-opened 2026-11-01 unless marked.

## Facts
1. **Individual gain, enterprise gap.** 80% of respondents say AI improved their individual productivity; 37% attribute at least some EBIT impact to AI, "about the same share as last year"; AI high performers (>=5% of EBIT, impact "significant") flat at about 6%. McKinsey, *The state of AI in 2026: On the road to ROI*, Tinkoff, Van der Veken, Chui, 25 Aug 2026. https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai . Tier B. ✓ opened 2026-11-01
2. **Agents scaling.** 40% of respondents from firms with >$1bn revenue report scaling AI agents, up from 27% last year; smaller firms flat at 22%. Same report. Tier B. ✓ opened 2026-11-01
3. **Cost constrains use.** About 20% report AI operating costs (including token costs) constrained their AI use. Same report. ✓ opened 2026-11-01 (hook for the tokens/cost paragraph)
4. **Directing AI is already the job.** 47% of respondents spend more time managing and directing AI than doing the work itself; 30% have agents in workflows; 52% have "limited understanding of what AI agents are". BCG, *AI Is Reshaping Jobs Faster Than Companies Are Reshaping Work* (AI at Work 2026), 3 Jun 2026, 11,749 workers, 14 markets. https://www.bcg.com/press/3june2026-ai-reshaping-jobs-faster-than-companies-reshaping-work . Tier B. ✓ opened 2026-11-01. Caution: "74% regular users" applies to frontline staff only; not used.
5. **Indian campuses screen with AI.** 72% of employers use AI for resume screening (most common use), 48% AI-based assessments, 86% say AI/agentic AI is transforming hiring; 35% say AI creates new entry-level roles or skills (21% in FY25). Deloitte India, Campus Workforce Trends 2026, press release 27 Aug 2026, 257 organisations / 505 campuses. https://www.deloitte.com/in/en/about/press-room/india-s-campus-talent-landscape-pivots-to-skill-based-hiring-as-86-percent-of-employers-adopt-ai-in-recruitment--deloitte-india.html . Tier B (deloitte.com not on allowlist: needs review). ✓ opened 2026-11-01
6. **McKinsey is reported to test judgment of AI output.** Final-round pilot, per interview-prep firm CaseBasix via Fortune: candidates "are expected to prompt the AI, review its output, and apply judgment"; McKinsey did not comment; extra step for North American candidates. Sternfels (HBR IdeaCast): "There isn't truth in AI models; there isn't judgment" and "Humans need to impose those parameters"; agents ~3,000 to ~20,000 in ~18 months. Fortune, Jake Angelo, 14 Jan 2026. https://fortune.com/2026/01/14/how-to-get-hired-at-mckinsey-ai-tools-liberal-arts-creativity . Tier B, secondary; fortune.com not on allowlist. The pilot claim is CaseBasix's: phrase it that way. ✓ opened 2026-11-01
7. **Stanford AI Index 2026.** Agent success on real-world tasks (Terminal-Bench) 20% in 2025 to 77.3%; generative AI reached 53% of the population within three years; employment of software developers aged 22-25 down nearly 20% since 2024; Foundation Model Transparency Index average fell 58 to 40. Shana Lynch, 13 Apr 2026. https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report . Tier A. ✓ opened 2026-11-01
8. **Where AI makes consultants worse** (existing registry entry `hbs-jagged-frontier`, 758 BCG consultants). Numbers not re-opened by me. ~ not re-opened; use only if another agent verifies.

Stat row: 80% say it helps me / 37% see EBIT / 6% see >=5% / 47% direct AI / 72% of Indian campus employers screen with AI / 77.3% agent success. Stat block: "80% vs 37%" (McKinsey).

## Watch
**3Blue1Brown, "Large Language Models explained briefly", 8 min (Nov 2024), id LPZh9BOjkQs.** Scored EMBED? (weighted 4.0, clarity 5, concept_fit 5, 8.3M views, no accuracy flags). Best general-audience intro. Karpathy's 60-min talk carries an accuracy flag (37:01, "System 1 only" claim outdated by reasoning models), so reserve it for the next-word chapter. Marks from the scoring pass (agent-reach subtitle was rate-limited, 429, so NOT re-checked in the transcript; verified: false): 0:26 chatbot as autocomplete over next-word probabilities; 2:15 training tunes billions of parameters; 3:45 RLHF turns text-completer into assistant; 5:40 attention. Skip: from about 5:40 (transformer internals) unless curious. Why: the whole of next-token prediction and training in one sitting, no maths; it has no business content, so the chapter supplies that.

## Read
- Stanford HAI, "Inside the AI Index: 12 takeaways" (5 min): capability and adoption in one page.
- McKinsey State of AI 2026, key-takeaways box (5 min): why adoption does not equal value.

## Interview questions (3)
1. "Explain generative AI to a CEO who has never used it, in two minutes, and name one thing it will get wrong." Pattern: casebook AI questions (research-casebooks-2025-26.md line 89: Accenture, Bain "GenAI bank buddy", chatbot cases); JD evidence: 35% of consulting-firm postings ask something about AI (research-jd-linkedin-2026-10.md line 95).
2. "A model gives you a market-size answer and a confident summary. What do you check before it goes to the client?" Pattern: judge-the-output, from the reported Lilli pilot (Fact 6; research-consulting-ai.md line 72).
3. "Your client's team uses ChatGPT daily but sees no profit effect. What do you recommend?" Pattern: AI-transformation case; built from McKinsey 80% vs 37% (Fact 1) and BCG 47% (Fact 4). Constructed, not a reported question.

## Indian business example
Illustrative: a mid-size Indian NBFC collections team uses a chatbot to draft customer letters; they read well but cite the wrong RBI circular; the fix is a pre-send checklist (source, number, policy). No real firm, no invented figures. Real anchor: Deloitte India campus data (Fact 5), "AI already sits in the hiring funnel you are in".

## Misconceptions
- "AI use equals AI value": 80% say it helps them, 37% see any EBIT impact, about 6% see >=5% (Fact 1).
- "AI is just ChatGPT": show predictive vs generative (cross-ref kinds-of-ai); no number needed.
- "The test is whether you know AI": reported test is prompt, review, apply judgment (Fact 6, with the CaseBasix caveat).

## sources.yml-ready entries
```yaml
mckinsey-state-of-ai-2026:
  type: report
  title: "The state of AI in 2026: On the road to ROI"
  creator: Dan Tinkoff, Lieven Van der Veken, Michael Chui
  publisher: McKinsey & Company (QuantumBlack)
  year: 2026
  minutes: 15
  url: https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai
  tier: B
  why: The annual survey. Eight in ten say AI helps them personally; 37% see any EBIT impact. The cleanest statement of the gap this book is about.
  verified: true

bcg-ai-at-work-2026:
  type: report
  title: "AI Is Reshaping Jobs Faster Than Companies Are Reshaping Work (AI at Work 2026)"
  creator: Boston Consulting Group
  publisher: BCG
  year: 2026
  minutes: 5
  url: https://www.bcg.com/press/3june2026-ai-reshaping-jobs-faster-than-companies-reshaping-work
  tier: B
  why: 11,749 workers in 14 markets; 47% spend more time directing AI than doing the task. The thesis in one number.
  verified: true

deloitte-india-campus-2026:
  type: report
  title: "India's campus talent landscape pivots to skill-based hiring as 86 percent of employers adopt AI in recruitment (Campus Workforce Trends 2026)"
  creator: Deloitte India
  publisher: Deloitte
  year: 2026
  minutes: 4
  url: https://www.deloitte.com/in/en/about/press-room/india-s-campus-talent-landscape-pivots-to-skill-based-hiring-as-86-percent-of-employers-adopt-ai-in-recruitment--deloitte-india.html
  tier: B
  why: 257 employers, 505 campuses. 72% screen resumes with AI. Shows the funnel the reader is in. Domain needs allowlist review.
  verified: true

fortune-mckinsey-ai-interview:
  type: article
  title: "How to get hired at McKinsey: AI tools, liberal arts, creativity"
  creator: Jake Angelo
  publisher: Fortune
  year: 2026
  minutes: 4
  url: https://fortune.com/2026/01/14/how-to-get-hired-at-mckinsey-ai-tools-liberal-arts-creativity
  tier: B
  why: Reports the Lilli interview pilot (claim from CaseBasix; McKinsey did not comment) and Sternfels on judgment. Secondary; fortune.com needs allowlist review.
  verified: true

stanford-ai-index-2026-takeaways:
  type: report
  title: "Inside the AI Index: 12 Takeaways from the 2026 Report"
  creator: Shana Lynch
  publisher: Stanford HAI
  year: 2026
  minutes: 6
  url: https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report
  tier: A
  why: Agent success 20% to 77.3%, GenAI at 53% adoption in three years. The capability and adoption backdrop, from the originator.
  verified: true

3b1b-llm-briefly:
  type: video
  title: "Large Language Models explained briefly"
  creator: Grant Sanderson
  publisher: 3Blue1Brown
  year: 2024
  minutes: 8
  url: https://www.youtube.com/watch?v=LPZh9BOjkQs
  tier: A
  why: Eight minutes on autocomplete over probabilities, training and RLHF with no maths or code. The fastest honest intro for a reader who reads nothing else.
  marks:
    - { t: "0:26", label: "A chatbot is autocomplete over next-word probabilities" }
    - { t: "2:15", label: "Training tunes billions of parameters" }
    - { t: "3:45", label: "RLHF turns a text-completer into an assistant" }
  verified: false
```

## Gaps
- McKinsey "89% use AI" and sample size: not seen on the primary page excerpt; not used. Secondary coverage says 1,719 respondents / 97 countries (unconfirmed).
- 3B1B marks unverified: youtube subtitle rate-limited (429). Re-run `agent-reach youtube subtitle`, then set verified.
- Lilli pilot is CaseBasix's claim relayed by Fortune; no McKinsey primary. FT original not opened.
- HBS jagged-frontier numbers not re-opened.
- fortune.com and deloitte.com are absent from source-policy.yml; orchestrator must add or accept "needs review".
