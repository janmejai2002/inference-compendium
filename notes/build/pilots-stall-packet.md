# Packet: pilots-stall (Why AI pilots stall)
Researched 2026-11-01. Proposed source ids are in the yaml block at the end. No chapter text.

## Facts
1. **Use is wide, money is not.** Nearly nine in ten respondents report regular AI use in at least one function; 44% say AI is scaling across the enterprise (38% a year ago); 56% use it in three or more functions (51% before). But "the share of respondents reporting that AI has contributed to their organizations' EBIT is essentially unchanged from a year ago, at 37 percent". McKinsey, *The state of AI in 2026: On the road to ROI*, Tinkoff, Van der Veken, Chui, 25 Aug 2026. https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai . Tier B. ✓ opened 2026-11-01
2. **High performers are rare and flat.** AI high performers (at least 5% of EBIT attributed to AI and impact described as "significant") are "just 6 percent of survey respondents, unchanged from 2025". Same source. ✓ opened 2026-11-01
3. **Workflow redesign separates them.** "Nearly three-quarters of high performers report fundamentally redesigning workflows because of their AI use, up from 55 percent last year. By comparison, just one-quarter of other respondents report doing so." They are also twice as likely to say senior leaders demonstrate commitment and to have defined processes to measure impact. Same source. ✓ opened 2026-11-01. (The 2025 survey's claim that redesign had the largest EBIT effect of 25 attributes was seen only in secondary write-ups: ~ not re-opened; do not use unless McKinsey 2025 is opened.)
4. **Individuals gain, firms do not yet.** 80% say AI improved their own productivity; 50% say it helps them make better decisions. Same source. ✓ opened 2026-11-01. Pair with fact 1 as the "ROI gap" in one sentence.
5. **BCG value gap.** 5% of firms worldwide are "future-built", 35% are scaling and starting to generate value, 60% "are reaping hardly any material value, reporting minimal revenue and cost gains despite substantial investment". Future-built firms get "five times the revenue increases and three times the cost reductions". BCG, *The Widening AI Value Gap*, Jessica Apotheker et al., 17 Sep 2025. https://www.bcg.com/publications/2025/are-you-generating-value-from-ai-the-widening-gap . Tier B. ✓ opened 2026-11-01 (sample size not on the page; "~1,250 firms" is secondary only, do not quote).
6. **Time saved leaks.** BCG AI at Work 2026 (11,749 workers, 14 markets): 74% of frontline employees are regular users; 42% of regular frontline users save at least a full workday a week; 66% report "limited or no guidance" on what to do with that time and over half do not redirect it into strategic work; 47% spend more time managing and directing AI than doing the work; "Clear strategy lifts AI's impact by 25 percentage points vs. only five for better tools". India is above the global average for regular frontline use (no figure given). BCG press release, 3 Jun 2026 (date from URL). https://www.bcg.com/press/3june2026-ai-reshaping-jobs-faster-than-companies-reshaping-work . Tier B. ✓ opened 2026-11-01
7. **MIT NANDA, "95%".** The report (lead author Aditya Challapally) says "The 95% failure rate for enterprise AI solutions represents the clearest manifestation of the GenAI Divide"; about 5% of pilots reach rapid revenue acceleration, most stall with little P&L effect. Via Fortune, Sheryl Estrada, 18 Aug 2025: ~150 leader interviews, 350-employee survey, 300 public deployments. https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/ . Tier B (coverage). The MIT PDF was blocked (Cloudflare 403) so the originator was NOT opened. ✓ Fortune opened 2026-11-01; ~ report itself. Other coverage says 52 interviews and 153 surveys, so counts disagree: say "a preliminary July 2025 report" and avoid the counts.
8. **Method criticism of the 95%.** Blog-level critics (not peer review, not citable) say the sample is small and mixed (interviews, conference responses, public cases), no confidence intervals are given, the denominator is unclear, and "failure" means no measurable P&L effect in a short window. Teach it as a vivid but soft number, paired with McKinsey's 37% and BCG's 60%, which come from larger surveys. ~ not re-opened (search summaries). Safe wording: "reported in a preliminary MIT NANDA study whose method has been questioned".
9. **India.** EY-CII, *The AIdea of India: Outlook 2026*, 16 Nov 2025, 200 organisations in 20+ industries: 47% have multiple GenAI use cases live in production, 23% are in pilot; 59% cite a shortage of skilled AI talent; over 95% spend under 20% of IT budget on AI (4% above 20%). https://www.ey.com/en_in/newsroom/2025/11/india-s-ai-shift-from-pilots-to-performance-47-percent-of-enterprises-have-multiple-ai-use-cases-live-in-production-ey-cii-report . Tier C (ey.com not on allowlist; reason: the survey's author). ✓ opened 2026-11-01. Not in the release: a "pilot-to-production success below 10%" line seen in a press summary; change management is not addressed.
10. **Change management is what employers ask for.** In the project's LinkedIn JD scrape, "change management / adoption" appears in 42% of AI-asking JDs vs 19% in the baseline (also use cases 31%, ROI 30%). Source: `notes/toc/research-jd-linkedin-2026-10.md`. Own analysis, not a registry source: cite as "INFERENCE JD analysis", with its caveat that LinkedIn is mostly lateral hiring, not campus.

## Watch (none cleared)
- Candidate: McKinsey & Company, "The Economics of Enterprise AI Explained", 19 min, 20 Oct 2026, https://www.youtube.com/watch?v=qYefxlsfXAU . Official originator channel, on topic. I could NOT check the transcript (agent-reach rate-limited about 54 min; yt-dlp 429), so no marks. It failed scoring gates G2 reach and G6 language (detector said "ar", likely a misdetection). Orchestrator: re-run `agent-reach youtube subtitle` later, pick 2-4 marks, decide on the gate waiver. Do not put in the book unchecked.
- Fallback: IGotAnOffer Consulting, "AI transformation case (with ex-BCG/Bain leader)", 36 min, 17 Sep 2026, https://www.youtube.com/watch?v=vN0NM6nUrN0 . Fails G1 channel and G2 reach. Only worth it for the interview chapter if the transcript shows a usable adoption framework. Not checked.
- Not recommended: Think School "The AI Adoption Lie" (56 min, India-specific, 6.6M subs) failed G6 language; unchecked.

## Read
- McKinsey, *The state of AI in 2026* (fact 1). Why: the primary for the ROI gap; read only the "High-performing organizations" section. Tier B.
- BCG, *The Widening AI Value Gap* (fact 5), chapter 3 "What value generators do differently". Why: consulting readers will meet this framing in interviews; it is a firm's own research, so read it as a claim.

## Interview questions
1. "A client's GenAI pilots work in demos but nothing has reached production after a year. What do you diagnose first?" Pattern: AI adoption cases in the casebooks (`research-casebooks-2025-26.md`, e.g. #70 convince a traditional firm to adopt AI: value chain, ROI, pilot). Strong answer: separate individual productivity from P&L; check workflow redesign, ownership, measurement, data readiness; propose one workflow rebuilt end to end.
2. "Employees say AI saves them a day a week, but costs have not fallen. Where did the time go?" Pattern: JD asks for ROI (30%) and change management (42%); BCG time-leakage fact. Strong answer: freed time is not freed capacity unless process, roles and targets change; fix the metric before the rollout.
3. "How would you decide whether to scale, stop or redesign a pilot?" Pattern: casebook ROI/NPV and pilot asks; JD "use cases" (31%). Strong answer: criteria set in advance (baseline, cost per task, error rate, adoption), a kill rule, a named owner.

## Indian business example
Illustrative (no real firm): a mid-size Pune auto-components maker pilots a GenAI assistant that drafts supplier quality reports. 40 of 600 staff use it and time per report falls, but the approval route still needs three sign-offs and headcount targets are unchanged, so nothing shows in margin. The fix is the workflow (one approver, a quality-team target), not a better model. Pair with real data: EY-CII (fact 9), 47% live vs 23% pilot, 59% cite a talent shortage. Indian surveys disagree because "production" is defined differently (see Gaps); teach that.

## Misconceptions
1. "The model is the problem; wait for a better one." BCG: clear strategy lifts impact 25 points vs 5 for better tools (fact 6).
2. "95% of AI projects fail" as settled fact. One preliminary study with contested method; the better-supported claims are 37% report any EBIT impact (McKinsey) and 60% see hardly any value (BCG).
3. "High usage means success." Nearly nine in ten use AI; 37% report EBIT impact (facts 1, 4).

**Stat block:** "37%: share of organisations reporting any EBIT impact from AI in 2026, the same as a year ago. 80% of respondents say it makes them personally more productive." McKinsey 2026.

## Gaps
- MIT NANDA PDF not opened; the 95% rests on Fortune. Critiques are blogs, not citable.
- McKinsey 2025 "workflow redesign had the largest EBIT effect of 25 attributes" not seen in a primary; use the 2026 three-quarters vs one-quarter figures.
- No Watch card cleared (transcripts unreachable).
- Nasscom: no AI-adoption primary found. Deloitte India (40% significant/full usage vs about 28% global, 24 Mar 2026) and MSL (15% of firms with AI in production) seen only in search summaries, not opened.
- BCG sample size not confirmed; AI at Work release date from URL only.
- Domains not on allowlist: ey.com, fortune.com (needs review).

## sources.yml entries
```yaml
mckinsey-state-of-ai-2026:
  type: report
  title: "The state of AI in 2026: On the road to ROI"
  creator: Dan Tinkoff, Lieven Van der Veken, Michael Chui
  publisher: McKinsey & Company
  year: 2026
  url: https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai
  tier: B
  why: The originator of the ROI gap numbers (37% report EBIT impact, about 6% high performers) and of the finding that high performers redesign workflows. Published 25 Aug 2026.
  verified: true

bcg-widening-ai-value-gap:
  type: report
  title: "The Widening AI Value Gap"
  creator: Jessica Apotheker et al.
  publisher: Boston Consulting Group
  year: 2025
  url: https://www.bcg.com/publications/2025/are-you-generating-value-from-ai-the-widening-gap
  tier: B
  why: The 5% / 35% / 60% split of firms by AI value. A consulting firm's own research, so read it as a claim; method detail is in the full report, not the page.
  verified: true

bcg-ai-at-work-2026:
  type: report
  title: "AI Is Reshaping Jobs Faster Than Companies Are Reshaping Work (AI at Work 2026)"
  creator: Boston Consulting Group
  publisher: Boston Consulting Group
  year: 2026
  url: https://www.bcg.com/press/3june2026-ai-reshaping-jobs-faster-than-companies-reshaping-work
  tier: B
  why: Survey of 11,749 workers in 14 markets; shows saved time leaking and strategy mattering more than tools. Press release, not the full report.
  verified: true

fortune-mit-95-percent:
  type: article
  title: "MIT report: 95% of generative AI pilots at companies are failing"
  creator: Sheryl Estrada
  publisher: Fortune
  year: 2025
  url: https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/
  tier: B
  why: The best accessible account of the MIT NANDA GenAI Divide report, whose PDF could not be opened. Quote as a preliminary study with contested method. Needs domain review.
  verified: true

ey-cii-aidea-india-2026:
  type: report
  title: "India's AI shift from pilots to performance: EY-CII report (The AIdea of India: Outlook 2026)"
  creator: EY and CII
  publisher: EY India
  year: 2025
  url: https://www.ey.com/en_in/newsroom/2025/11/india-s-ai-shift-from-pilots-to-performance-47-percent-of-enterprises-have-multiple-ai-use-cases-live-in-production-ey-cii-report
  tier: C
  why: The only India enterprise survey opened: 200 organisations, 47% with multiple GenAI use cases live, 23% in pilot, 59% citing a talent shortage. Press release by the survey's author. Needs domain review.
  verified: true
```
