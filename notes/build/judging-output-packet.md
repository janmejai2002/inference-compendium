# Packet: judging-output ("Judging AI output is the job now")
Researched 2026-11-01. Protocol: prompt -> review -> challenge -> decide. Lens: consulting.
Author warning: the McKinsey "prompt, review, judgment" line is CaseBasix (a prep firm) as quoted by Fortune, NOT HBR IdeaCast. The HBR episode has Sternfels on judgment, not on the interview. Cite each for what it says (F7, F8).

## Facts
F1. **Outside the frontier, AI made consultants worse.** On one task built to sit outside AI's ability, no-AI consultants were correct about 84.5% of the time (Table 7 control mean 0.844); GPT-4 only 70.6%; GPT-4 plus prompt overview 60%. Average drop about **19 percentage points**. The abstract says "19% less likely"; the Discussion says "19 percentage points"; the table backs points, so write points. 758 BCG consultants, preregistered, 3 arms. Inside the frontier (18 tasks): 12.2% more tasks, 25.1% faster, higher quality (the "32% quality" figure was not re-seen today; leave out or check). Dell'Acqua et al., Organization Science, 2026, DOI 10.1287/orsc.2025.21838 (HBS WP 24-013, 2023). https://pubsonline.informs.org/doi/10.1287/orsc.2025.21838 . Tier A. ✓ opened 2026-11-01 (first 100k of 192k chars; the HBS page 403s, use the journal URL).
F2. **More trust in AI goes with less checking.** Survey of 319 knowledge workers, 936 first-hand examples: "higher confidence in GenAI is associated with less critical thinking"; "higher self-confidence is associated with more critical thinking"; GenAI shifts critical thinking toward verifying, integrating AI responses and stewarding the task. Self-reported, not observed; headlines ("AI makes you dumber") overstate it. Lee, Sarkar, Tankelevitch, Drosos, Rintel, Banks, Wilson (Microsoft Research / CMU), CHI 2025, April 2025, DOI 10.1145/3706598.3713778. https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/ . Tier A. ✓ opened 2026-11-01 (publication page; the PDF text did not parse). microsoft.com is not in source-policy.yml.
F3. **Automation bias is old, studied, and not fixed by training.** Review of the empirical literature: automation bias "leads to omission and commission errors" when decision aids are imperfect; complacency appears under multitask load, in experts and novices, and persists with practice; training and instructions do not prevent bias. Parasuraman & Manzey, Human Factors 52(3):381-410, 2010. https://pubmed.ncbi.nlm.nih.gov/21077562/ . Tier A (peer-reviewed; domain not on allowlist). ✓ opened 2026-11-01 (abstract page).
F4. **What an eval is, and who grades.** "An eval is a test for an AI system": give an input, apply grading logic to the output. Three graders: code-based (fast, cheap, brittle), model-based (flexible, scalable, non-deterministic, must be calibrated against humans), human (gold standard, slow, expensive). Start with "20-50 simple tasks drawn from real failures". pass@k = at least one success in k tries; pass^k = all k succeed, falls as k grows, suits customer-facing use. Grace, Hadfield, Olivares, De Jonghe, Anthropic Engineering, 9 Jan 2026. https://anthropic.com/engineering/demystifying-evals-for-ai-agents . Tier A. ✓ opened 2026-11-01. Written for agent builders; the chapter should say "a repeatable test with a known right answer".
F5. **Evals for output that varies run to run.** "Because generative AI output varies between runs, traditional pass/fail tests fall short." "Adopt eval-driven development: Evaluate early and often." "Use human feedback to calibrate automated scoring." LLM judges can favour longer answers or the first-listed answer; prefer pairwise or pass/fail and check agreement with human labels first. OpenAI, Evaluation best practices (docs, undated). https://developers.openai.com/api/docs/guides/evaluation-best-practices . Tier A (check that the developers.openai.com subdomain passes the openai.com allowlist). ✓ opened 2026-11-01.
F6. **Practitioner view: look at the data, label pass/fail.** "You must remove all friction from the process of looking at data"; "You can never stop looking at data"; "I often start by labeling examples as good or bad"; granular scores are "more onerous to manage than binary ratings"; correctness "is somewhat subjective, and you must align the model with a human". Hamel Husain, "Your AI Product Needs Evals", 29 Mar 2024. https://hamel.dev/blog/posts/evals/ . Tier C: the most-cited practitioner account of error analysis, and labs do not publish it in plain language; domain not on allowlist. ✓ opened 2026-11-01.
F7. **Accountability: the head of the firm says judgment stays human.** Sternfels, HBR IdeaCast ep. 1060 "Where McKinsey, and Consulting, Go From Here", 6 Jan 2026: models lack judgment, "Humans need to impose those parameters." Fortune (14 Jan 2026) quotes him: "There isn't truth in AI models; there isn't judgment." Agent counts on that episode differ from later figures (20,000 vs 25,000): avoid. https://hbr.org/podcast/2026/01/where-mckinsey-and-consulting-go-from-here . Tier B. ✓ page opened; ~ audio/transcript not heard, so quote only page wording or the Fortune quotes.
F8. **The McKinsey Lilli interview pilot.** Fortune, 14 Jan 2026: candidates may work with Lilli in a final-round "AI interview"; CaseBasix (prep firm, unnamed sources) says "you are expected to prompt the AI, review its output, and apply judgment"; called a pilot, possibly US/North America only; McKinsey had not confirmed. "Curiosity and judgment" / "challenge it" are NOT in Fortune: they come from FT/Irish Times per research-consulting-ai.md (~ not re-opened). Write "reported", never as McKinsey policy. https://fortune.com/2026/01/14/how-to-get-hired-at-mckinsey-ai-tools-liberal-arts-creativity . Tier C (only open page found; FT original not opened; domain not on allowlist). ✓ opened 2026-11-01.
F9. **Base rate: the classic worked case.** Mammography in natural frequencies: of 1,000 women 10 have cancer, 8 test positive; 95 of 990 healthy also test positive; a positive means 8 of 103, about 7.8%; physicians in the original study often guessed 70-80%. Across 15 Bayesian tasks correct answers rose from roughly 10-20% to about 50% with natural frequencies. Gigerenzer & Hoffrage, Psychological Review, 1995. ~ not re-opened (PMC blocked; figures from search summaries). Do not cite until verified; use the Illustrative example below, which needs no outside fact.

## Illustrative worked example (label `Illustrative`; no real firm)
A mid-size Indian distributor receives 1,000 supplier invoices a month. 20 (2%) contain a real error (wrong GST rate, duplicate). An AI checker catches 90% of real errors (18 of 20; 2 missed = false negatives) and wrongly flags 5% of clean invoices (49 of 980 = false positives). It flags 67; only 18 are real. Precision = 18/67 = 27%: about three of four flags are false alarms, though "90% accurate" sounds excellent. Excel: a 2x2 table (flagged or not, by real error or not), then =18/(18+49). Lesson: ask for the base rate and both error types, and what each costs, before trusting any accuracy headline.

## Watch
**W1. LLM as a Judge: Scaling AI Evaluation Strategies**, IBM Technology (official IBM channel), 15 Sep 2025, 6 min. Scored run2 as an `EMBED?` candidate (authority 3, clarity 4, best 01:01-03:01). Marks checked in the transcript today (yt-dlp auto-captions): 00:42 two ways to judge (rubric "direct assessment" vs "pairwise comparison"); 03:42 the drawbacks start; 04:02 positional bias; 04:42 self-enhancement bias (plus verbosity bias at 04:20). Skip 02:40-03:42 (benefits) if short of time, and the closing pitch for IBM's EvalAssist. Worth it: in 6 minutes it shows why an AI grading AI still needs a human check, which is the "challenge" step. Tier C (company explainer, not an originator; fine for a card).
**W2 (backup).** How to evaluate agents in practice, Google Cloud Tech, 12 Dec 2025, 11 min. Marks: 01:01 three-tier pyramid; 02:23 tier three is human review, "final quality gate"; 09:40 "from 'I think this agent works' to 'I know this agent is very reliable'". Skip 03:20-09:20 (code demo). Agent-specific; use for the pyramid idea only. Tier C.
Notes: agent-reach was rate-limited, so transcripts came from yt-dlp. The Mollick/Simon Sinek video (9YMYVb1ASCg) was not checked.

## Read
R1. Anthropic Engineering, "Demystifying evals for AI agents" (F4): the grader table and the 20-50 task start; first third only.
R2. Mollick, "Centaurs and Cyborgs on the Jagged Frontier" (already in registry, tier B) or the Dell'Acqua paper (F1). Why: best proof that review is a skill and that you cannot see the frontier from the output alone.

## Interview questions
1. "Our AI checker flags 67 of 1,000 invoices and the vendor says it is 90% accurate. Should the client trust a flag?" Pattern: data interpretation and sanity-check (error rate, base rate). Evidence: research-canon.md flags "what an error rate means, base rates" as Excel-level and tested, with HBS giving 4 of 18 sessions to it. Strong answer: ask the base rate, separate false positives from false negatives, cost each, compute precision.
2. "You ask the firm's AI tool for a market size and it returns a confident number. What do you do before it goes in the deck?" Pattern: AI-assisted case round. Evidence: the reported McKinsey Lilli pilot (F8; research-consulting-ai.md). Strong answer: check against a bottom-up estimate, ask for assumptions and sources, challenge once, state what you kept and why.
3. "A client's team found AI makes analysts 25% faster. How do you decide whether it can touch client-ready work?" Pattern: adoption and use-case mapping. Evidence: jagged-frontier result (F1) and the research-consulting-ai.md theme "supervising and challenging AI output". Strong answer: test on a sample with known answers, split tasks inside and outside the frontier, name who signs off.

## Indian business example
Use the Illustrative invoice checker above (GST errors are a plausible Indian context). No real-firm numbers. No sourced Indian case of AI-output errors found; do not invent one.

## Misconceptions (myth blocks)
M1. "90% accurate means 9 in 10 flags are right." Not when the thing is rare: 27% in the invoice example.
M2. "A human in the loop makes it safe." Reviewers over-trust imperfect aids, experts too, and training alone does not remove it (F3, F2). The loop works only with a method (the four steps) and something to check against.
M3. "AI makes consultants better at everything." Inside the frontier yes; outside, correct answers fell from 84.5% to 60-70.6% (F1), and the line is invisible from the output.

## Stat block
"19 percentage points": correct answers fell from about 84.5% (no AI) to 70.6% (GPT-4) and 60% (GPT-4 with prompt guidance) on the task outside the frontier. [@hbs-jagged-frontier]

## sources.yml-ready entries
```yaml
hbs-jagged-frontier:   # EXISTS: update the entry in place, do not duplicate
  type: paper
  title: "Navigating the Jagged Technological Frontier: Field Experimental Evidence of the Effects of Artificial Intelligence on Knowledge Worker Productivity and Quality"
  creator: Dell'Acqua, McFowland, Mollick, Lifshitz-Assaf, Kellogg, Rajendran, Krayer, Candelon, Lakhani
  publisher: Organization Science (HBS Working Paper 24-013, 2023)
  year: 2026
  url: https://pubsonline.informs.org/doi/10.1287/orsc.2025.21838
  tier: A
  why: 758 BCG consultants, preregistered. AI users gained inside the frontier and were about 19 percentage points less likely to be correct on a task outside it.
  verified: true
lee-critical-thinking-2025:
  type: paper
  title: "The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers"
  creator: Lee, Sarkar, Tankelevitch, Drosos, Rintel, Banks, Wilson
  publisher: CHI 2025 (Microsoft Research and Carnegie Mellon)
  year: 2025
  url: https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/
  tier: A
  why: 319 knowledge workers. Those who trusted AI most reported thinking critically least. Self-reported, so a signal, not a measurement.
  verified: true
parasuraman-manzey-2010:
  type: paper
  title: "Complacency and bias in human use of automation: an attentional integration"
  creator: Raja Parasuraman, Dietrich H. Manzey
  publisher: Human Factors 52(3)
  year: 2010
  url: https://pubmed.ncbi.nlm.nih.gov/21077562/
  tier: A
  why: The review behind the term automation bias. Experts over-trust imperfect aids and training alone does not fix it.
  verified: true
anthropic-demystifying-evals:
  type: article
  title: "Demystifying evals for AI agents"
  creator: Grace, Hadfield, Olivares, De Jonghe
  publisher: Anthropic Engineering
  year: 2026
  url: https://anthropic.com/engineering/demystifying-evals-for-ai-agents
  tier: A
  why: The lab's own definition of an eval, the three kinds of grader, and the advice to start with 20-50 real failures.
  verified: true
openai-eval-best-practices:
  type: article
  title: "Evaluation best practices"
  creator: OpenAI
  publisher: OpenAI developer docs
  year: 2026
  url: https://developers.openai.com/api/docs/guides/evaluation-best-practices
  tier: A
  why: Why output that varies needs structured tests, and why automated graders must be calibrated against human judgment.
  verified: true
husain-evals:
  type: article
  title: "Your AI Product Needs Evals"
  creator: Hamel Husain
  publisher: hamel.dev
  year: 2024
  url: https://hamel.dev/blog/posts/evals/
  tier: C
  why: The most-cited practitioner account of error analysis; evals start with a person reading outputs and marking pass or fail. Admitted because no lab publishes this in plain language.
  verified: true
hbr-ideacast-sternfels:
  type: podcast
  title: "Where McKinsey, and Consulting, Go From Here"
  creator: Bob Sternfels (with Adi Ignatius and Alison Beard)
  publisher: HBR IdeaCast, episode 1060
  year: 2026
  url: https://hbr.org/podcast/2026/01/where-mckinsey-and-consulting-go-from-here
  tier: B
  why: The head of McKinsey on why humans must supply the judgment models lack. Audio not heard in full; quote the page wording only.
  verified: false
fortune-mckinsey-ai-interview:
  type: article
  title: "How to get hired at McKinsey: AI tools, liberal arts, creativity"
  creator: Fortune
  publisher: Fortune
  year: 2026
  url: https://fortune.com/2026/01/14/how-to-get-hired-at-mckinsey-ai-tools-liberal-arts-creativity
  tier: C
  why: The open report of the Lilli interview pilot. The "prompt the AI, review its output, apply judgment" line comes from a prep firm and McKinsey has not confirmed it; a reported signal only.
  verified: true
ibm-llm-as-judge:
  type: video
  title: "LLM as a Judge: Scaling AI Evaluation Strategies"
  creator: IBM Technology
  publisher: IBM Technology (YouTube)
  year: 2025
  minutes: 6
  marks: ["00:42", "03:42", "04:02", "04:42"]
  url: https://www.youtube.com/watch?v=trfUBIDeI1Y
  tier: C
  why: Six minutes on how an AI can grade AI at scale and where it is biased (position, length, self-preference). Skip the closing pitch for IBM's EvalAssist.
  verified: true
```
Domain flags: microsoft.com, pubmed.ncbi.nlm.nih.gov, pubsonline.informs.org, hamel.dev, fortune.com (and possibly developers.openai.com) are not in source-policy.yml. Orchestrator to add or accept "needs review". hbr-ideacast-sternfels is `verified: false` because only the page was read.

## Gaps
- Primary for the Lilli interview (FT, 14 Jan 2026) not opened; only Fortune relaying a prep firm. HBR IdeaCast page does not mention it.
- Gigerenzer & Hoffrage 1995 numbers unverified at source (PMC blocked).
- "32% quality" figure and the HBS page itself not re-seen (HBS blocks fetch).
- No sourced Indian case of AI-output errors; no sourced material on professional or legal accountability for AI errors (e.g. firms refunding clients). Look before writing the accountability thread.
- agent-reach rate-limited; Mollick/Sinek video not assessed; no allowlisted Excel-level precision/recall explainer found.
