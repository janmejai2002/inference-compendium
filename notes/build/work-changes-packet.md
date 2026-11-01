# Packet: work-changes ("How the work changes"), 2026-11-01

Frame for the writer: the evidence is a split. Aggregate employment is barely moving; one slice (young workers in the most exposed jobs) is. Give both numbers every time. Do not write "juniors' jobs are collapsing" or "AI is not affecting jobs".

## Facts (✓ = opened 2026-11-01 via WebFetch or browse.py)

1. **Forecast vs outcome.** 32% of respondents in 2025 anticipated head-count cuts from AI; only 14% reported reductions a year later. Two-thirds in 2026 reported little or no AI-related change in total employment. Looking ahead: 39% expect AI to cut head count in the next year, 43% little or no change, 10% an increase. McKinsey, "AI job losses fall short of forecasts", Chart of the Week, 3 Sep 2026 (Tinkoff, Van der Veken, Chui, Balakrishnan; from "The state of AI in 2026: On the road to ROI", 25 Aug 2026). Tier B. ✓ Note: the chart's source line shows survey dates "June 25-July 29, 2025"; 2026 field dates are not on the page.
2. **Entry level, the other half.** Employment of workers aged 22-25 in AI-exposed occupations "now stands 19% below where it would be"; experienced workers show no comparable gap. Revised paper (12 Aug 2026) headline: "No Widespread Displacement, but the AI Employment Gap for Young Workers Has Widened to 19%". Brynjolfsson, Chandar, Chen, Stanford Digital Economy Lab (first published 2025). Tier A. ✓ (landing page only; full paper not read).
3. **Same signal, AI Index.** "Employment among software developers aged 22-25 has plummeted nearly 20% since 2024, even as their older colleagues' headcount grows." Shana Lynch, Stanford HAI, "Inside the AI Index: 12 Takeaways from the 2026 Report", 13 Apr 2026. Tier A. ✓
4. **Economy-wide, no disruption.** "the broader labor market has not experienced a discernible disruption since ChatGPT's release 33 months ago"; exposure, automation and augmentation measures "show no sign of being related to changes in employment or unemployment"; occupational mix changing faster than before but "not a large difference" and it predates widespread AI. Gimbel, Kinder, Kendall, Lee, Yale Budget Lab, 1 Oct 2025. Tier B. ✓ US data; dated, check for a later monthly update before print.
5. **WEF forecast.** Job disruption equal to 22% of jobs by 2030; 170 million new roles, 92 million displaced, net +78 million; nearly 40% of skills required on the job to change; 63% of employers cite the skills gap as the key barrier; 1,000+ companies. WEF, Future of Jobs Report 2025, press release 8 Jan 2025. Tier B. ✓ A projection, not a measurement; pair with fact 1.
6. **BCG, the job changes in content.** 11,749 workers, 14 markets. 74% of frontline white-collar employees are regular AI users (up more than 20 points); 72% say AI has considerably changed skills expectations in their role; 47% spend more time managing and directing AI than doing the work; 42% of regular frontline users save a full workday or more a week, and 66% report limited or no guidance on what to do with that time; India is above the global average for regular frontline use (no figure given). BCG, "AI Is Reshaping Jobs Faster Than Companies Are Reshaping Work", 3 Jun 2026. Tier B. ✓ Not re-checked, so do not use: "30% have agents", "65% of managers expect half their job".
7. **India usage.** India is 5.8% of Claude.ai use, second to the US; 101st of 116 countries per capita (working-age adjusted); 45.2% of O*NET-mapped tasks are software-related, the highest of any country (Vietnam 42.1%); use split 51.3% work, 20.9% coursework, 27.8% personal (global 46 / 19.3 / 34.7); tasks taking 3.8 hours done in 14.8 minutes (15x; global 3.1 h and 15.4 min, 12x). Anthropic, India Country Brief, Economic Index, 16 Feb 2026. Tier A. ✓ Caveat: Claude.ai users only, not all AI use in India.
8. **India campus.** 35% of organisations say AI adoption is creating new entry-level roles or skill requirements (21% in FY25); 86% say AI or agentic AI is transforming recruitment; recruitment budgets up 19%; PPO conversion up about 6% year on year; AI and data skills carry 20-25% hiring premiums, analytical thinking and problem solving 10-15%; MBA pay premium over engineering 45-50%; median MBA pay INR 27.4 lakh at Top 10 institutes (the Tier 3 figure of INR 8.4 lakh was cut off in my read; it is in research-market-2026-10.md as opened on 31 Oct). Deloitte India, Campus Workforce Trends 2026, press release 27 Aug 2026. Tier B (own-survey press release). ✓ Employer-reported, not measured hiring.
9. **India IT sector, not yet usable.** Nasscom Strategic Review 2026 (Feb 2026) via news summaries: FY26 revenue $315 bn (+6.1%), net addition about 135,000 (+2.3%), about 6 million total. The PDF I opened at nasscom.in was the 2025 release (1,750+ GCCs in 2024). ~ not re-opened for 2026. Also a single search summary that TCS plans about 25,000 freshers in FY27 against 44,000 in FY26: do not use.

## Watch
None qualifies. Checked Ethan Mollick on Simon Sinek's channel (9YMYVb1ASCg, 58 min, 16 Jun 2026): its own score notes flag two factual errors (a nonexistent "GDP val" benchmark name and "Opus 47"), and `agent-reach youtube subtitle` returned no transcript, so no marks could be checked. Do not embed. Next session: look for a Brynjolfsson or Autor talk on the Canaries paper (Stanford Digital Economy Lab or MIT channels).

## Read
- **Canaries in the Coal Mine? (Brynjolfsson, Chandar, Chen).** The cleanest statement that entry level in exposed jobs is down while everyone else is not.
- **McKinsey Chart of the Week (fact 1).** One page, five minutes; the forecast-versus-outcome gap is the best single picture of "a split, not a collapse". Pair with the Yale Budget Lab page as the sceptical counterweight.

## Interview questions
In the toc.yml. Evidence: Q1 is a workforce and operating-model case (pyramid and graduate intake pattern, `research-consulting-ai.md` section 3). Q2 is a forecast-versus-actual judgment question built on fact 1; JD asks to "critically evaluate" AI (for example the Guardant Health India GCC JD in `evidence/jd-baseline-asks.md`). Q3 is a structuring/sizing prompt using fact 7. None is claimed as asked at any firm.

## Indian business example
**Illustrative:** a mid-size Indian IT-services firm weighs a smaller graduate batch next year because AI coding tools make junior developers faster. The decision needs both numbers: surveyed headcount is barely moving (fact 1) while employment of 22-25-year-olds in exposed jobs is down (facts 2, 3). Use round placeholder numbers labelled Illustrative; no real firm's figures. One real anchor: Deloitte India's 35% of campus employers seeing new entry-level roles or skill requirements (fact 8), cited as employer-reported.

## Misconceptions
1. "AI has already taken the entry-level jobs." Truth: a 19% gap for ages 22-25 in exposed occupations (fact 2), not an economy-wide collapse (fact 4).
2. "Nothing is happening; it is hype." Truth: two Stanford sources measure the young-worker gap (facts 2, 3), and 47% of workers already spend more time directing AI than doing the task (fact 6).
3. "India is an AI-heavy market because it is second in Claude traffic." Truth: second by volume, 101st per capita, and 45.2% of tasks are software (fact 7).

**Stat block:** "32% expected cuts, 14% reported them" (fact 1), with "39% expect cuts next year" beside it so the reader does not conclude the worry is over.

## sources.yml-ready entries
Domains NOT yet in `content/source-policy.yml`: digitaleconomy.stanford.edu, budgetlab.yale.edu, weforum.org, deloitte.com (nasscom.in if used). mckinsey.com, bcg.com, anthropic.com, hai.stanford.edu are listed. The orchestrator should add the others (tiers as below) or `npm run check` flags them. I did not edit sources.yml or the policy; ids below were checked unused (only `stanford-ai-index`, the 2025 landing page, exists).

```yaml
mckinsey-ai-job-losses:
  type: article
  title: "AI job losses fall short of forecasts"
  creator: Dan Tinkoff, Lieven Van der Veken, Michael Chui, Tara Balakrishnan
  publisher: McKinsey & Company (Chart of the Week)
  year: 2026
  url: https://www.mckinsey.com/featured-insights/charts/ai-job-losses-fall-short-of-forecasts
  tier: B
  why: One chart that sets forecast against outcome: 32% expected AI head-count cuts, 14% reported them. Read it before you trust any jobs headline.
  verified: true

anthropic-india-brief:
  type: report
  title: "India Country Brief: The Anthropic Economic Index"
  creator: Anthropic
  publisher: Anthropic
  year: 2026
  url: https://www.anthropic.com/research/india-brief-economic-index
  tier: A
  why: The originator's data on how India uses Claude: second by volume, far lower per capita, and the highest share of software tasks of any country.
  verified: true

stanford-canaries:
  type: paper
  title: "Canaries in the Coal Mine? Six Facts about the Recent Employment Effects of Artificial Intelligence"
  creator: Erik Brynjolfsson, Bharat Chandar, Ruyu Chen
  publisher: Stanford Digital Economy Lab
  year: 2026
  url: https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/
  tier: A
  why: The main evidence that early-career workers in exposed jobs are where AI shows up in employment data, and experienced workers are not affected the same way. Revised August 2026.
  verified: true

yale-budget-lab-ai-labor:
  type: report
  title: "Evaluating the Impact of AI on the Labor Market: Current State of Affairs"
  creator: Martha Gimbel, Molly Kinder, Joshua Kendall, Maddie Lee
  publisher: The Budget Lab at Yale
  year: 2025
  url: https://budgetlab.yale.edu/research/evaluating-impact-ai-labor-market-current-state-affairs
  tier: B
  why: The sceptical counterweight. No discernible economy-wide disruption 33 months after ChatGPT. US data from October 2025; check for later updates.
  verified: true

wef-future-of-jobs-2025:
  type: report
  title: "Future of Jobs Report 2025: 78 Million New Job Opportunities by 2030 but Urgent Upskilling Needed"
  creator: World Economic Forum
  publisher: World Economic Forum
  year: 2025
  url: https://www.weforum.org/media/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces
  tier: B
  why: The long-range forecast, 170 million roles created and 92 million displaced by 2030. A projection from employer surveys; read it beside measured data.
  verified: true

bcg-ai-at-work-2026:
  type: report
  title: "AI Is Reshaping Jobs Faster Than Companies Are Reshaping Work (AI at Work 2026)"
  creator: Boston Consulting Group
  publisher: BCG
  year: 2026
  url: https://www.bcg.com/press/3june2026-ai-reshaping-jobs-faster-than-companies-reshaping-work
  tier: B
  why: 11,749 workers in 14 markets. Shows the job changing in content, with 47% spending more time directing AI than doing the task.
  verified: true

deloitte-india-campus-2026:
  type: report
  title: "India's campus talent landscape pivots to skill-based hiring as 86 percent of employers adopt AI in recruitment (Campus Workforce Trends 2026)"
  creator: Deloitte India
  publisher: Deloitte
  year: 2026
  url: https://www.deloitte.com/in/en/about/press-room/india-s-campus-talent-landscape-pivots-to-skill-based-hiring-as-86-percent-of-employers-adopt-ai-in-recruitment--deloitte-india.html
  tier: B
  why: Employer-reported view of Indian campus hiring, with MBA pay by institute tier and AI skill premiums. A press release for its own survey.
  verified: true

stanford-ai-index-2026-takeaways:
  type: article
  title: "Inside the AI Index: 12 Takeaways from the 2026 Report"
  creator: Shana Lynch
  publisher: Stanford HAI
  year: 2026
  url: https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report
  tier: A
  why: The AI Index's own summary, including the roughly 20% fall in employment of software developers aged 22-25 since 2024.
  verified: true
```

## Gaps
- Nasscom 2026 primary (headcount, fresher hiring) not opened; no 2026 GCC hiring figure; no IT-services fresher data from a primary.
- Canaries: only the landing-page headline (19%) seen. Read the paper for exposure definition and comparison group before quoting more; I do not recall the 2025 original figure with confidence, so do not quote it.
- Consulting entry-level evidence (Bain graduates +25%, McKinsey NA +12%, Big Four UK intake down, MBB starting pay flat) is in `research-consulting-ai.md` section 3, all secondary and not re-opened here. Best "both sides" material for consulting readers if reopened.
- McKinsey "On the road to ROI" primary report not opened; 2026 survey dates unstated on the chart page.
- No Watch card. No India-specific BCG figure.
