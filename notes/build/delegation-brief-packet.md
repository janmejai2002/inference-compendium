# Packet: delegation-brief ("A prompt is a delegation brief")
Researched 2026-11-01. Lens: consulting. Hook: the originators agree on the checklist and disagree on the tricks; the Wharton data sides with "tricks don't generalise; context, examples and format do".

## Facts (all opened today unless marked)
1. **Anthropic's own docs frame a prompt as a brief.** "Think of Claude as a brilliant but new employee who lacks context on your norms and workflows. The more precisely you explain what you want, the better the result." Key test: "Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too." Anthropic, *Prompting best practices* (Claude docs, undated, lists models up to Fable 5.1). Tier A. ✓ opened 2026-11-01
2. **Anthropic's overview says test before you tune.** Assumes "a clear definition of the success criteria", "some ways to empirically test against those criteria" and a first draft. Techniques: clarity, examples, XML structuring, role prompting, thinking, prompt chaining. *Prompt engineering overview*, Anthropic. Tier A. ✓
3. **OpenAI uses the same employee analogy, by model type.** "A reasoning model is like a senior co-worker. You can give them a goal to achieve and trust them to work out the details." "A GPT model is like a junior coworker. They'll perform best with explicit instructions to create a specific output." Structure messages as identity, instructions, examples, context; few-shot examples "should cover a range of possible inputs"; "Build tests and evaluation suites". OpenAI, *Prompt engineering* (developers.openai.com, undated). Tier A. ✓ (page read via fetch summary; analogy quotes as returned)
4. **Google says the same four things.** Page "Last updated 2026-10-13": "clear and specific instructions"; "We recommend to always include few-shot examples" (too many can overfit; keep format consistent); add context ("helps the model understand the constraints and details"); "Prompt design can sometimes require a few iterations before you consistently get the response you're looking for." Google, *Prompt design strategies*, Gemini API docs. Tier A (domain ai.google.dev not in source-policy; see Gaps). ✓
5. **The other side: Mollick, 2023.** "A lot of prompting tips are more magic ritual than useful, repeatable tips." "Being 'good at prompting' is a temporary state of affairs." The best way to use AI "is not to craft the perfect prompt, but rather to use it interactively." Mollick, *A guide to prompting AI (for what it is worth)*, One Useful Thing, 26 Apr 2023. Tier B. ✓ (fetch summary of the page, short quotes)
6. **Mollick, 2026, on video.** Says prompt engineering once mattered ("you are a physicist", "think hard", bribes): "None of that matters anymore. The models have gotten good enough that if you're good at giving instructions like a human to humans, you probably do okay." Simon Sinek interview, uploaded 2026-06-16, 58 min; passage in the paragraph starting [00:07:00]. Tier B. ✓ transcript checked. Caution: the scorer flagged two slips elsewhere in this video (a benchmark name at 24:01, a model name at 37:01); do not cite those.
7. **Wharton, tricks (Report 3).** Meincke, Mollick, Mollick, Shapiro, *Prompting Science Report 3: I'll pay you or I'll kill you -- but will you care?*, arXiv 2508.00614, 1 Aug 2025. Five models; GPQA Diamond (198 PhD-level questions) and a 100-question MMLU-Pro engineering subset; 25 trials per question. Threats ("kick a puppy") and tips ($1,000 to $1 trillion) "produced no meaningful improvements in overall accuracy". Per question, a wording change moved accuracy up to +36 percentage points and down to -35 pp (GPQA +36/-28; MMLU-Pro +28/-35). Tests Sergey Brin's May 2025 claim that threatening helps. Tier A. ✓ (read PDF text)
8. **Wharton, politeness and format (Report 1).** *Prompting Science Report 1: Prompt Engineering is Complicated and Contingent*, arXiv 2503.04818, 4 Mar 2025. GPT-4o and GPT-4o mini, 198 GPQA Diamond questions, 100 trials each. "Please" vs "I order" washed out once aggregated ("dwarfed by overall model characteristics"). But removing the explicit format instruction "consistently led to performance degradation" for both models (4o mini, formatted vs unformatted: +12.1 pp, p<0.001). Authors caution this varies by model and setting. Tier A. ✓
9. **Wharton, step-by-step (Report 2).** *Prompting Science Report 2: The Decreasing Value of Chain of Thought in Prompting*, arXiv 2506.07142, 8 Jun 2025. For reasoning models CoT "often results in only marginal, if any, gains"; it "significantly increases the time and tokens". Non-reasoning models: small average gain, more variability. Tier A. ✓ (abstract only)
10. **Consulting field evidence.** BCG experiment: 758 consultants, three arms (no AI, GPT-4, GPT-4 plus a prompt-engineering overview). On 18 tasks inside the frontier AI users did 12.2% more tasks, 25.1% faster, better quality; on one task outside it, 19% less likely correct (journal text: 19 percentage points). CAUTION: the abstract does not report the prompt-overview arm separately; do not claim the overview caused a gain. Registry ids `hbs-jagged-frontier`, `dellacqua-jagged-orgsci` exist. Tier A. ✓ (HBS abstract re-opened today)

**Reading the conflict:** nobody disputes clear goal, context, examples, format, iteration (facts 1-4, 8). The dispute is over incantations (role flattery, tips, threats, "please", "think hard"): Mollick and the Wharton series say they do not reliably help (5-9). Anthropic itself says some techniques "become less necessary" as models improve (Lesson 7 at 11:01).

## Watch
**Primary: *Lesson 7: Effective prompting techniques (Deep Dive), AI Fluency course*, Anthropic, 12 min (11:54), uploaded 2025-06-12**, id 2YCaBqP8muw, scorer decision DISTIL, authority 5. Transcript pulled today with yt-dlp (agent-reach was rate-limited).
Marks (checked): **0:09** prompting = "explaining a task to a helpful new colleague who's eager to assist"; **2:01** the six tips (context, examples, output constraints, steps, think first, role); **3:00** vague "tell me about climate change" vs a brief that says who you are and why; **6:50** let the model think before answering, not explain afterwards; **8:50** ask the AI to write the prompt; **9:01** iterate, ask "how confident are you", restart a derailed chat.
Skip: **3:40-4:30**, the plain-language demo, whose sample answer ("quadratic speed up" = "roughly twice as fast") is wrong; **5:00-5:40** coding-flavoured portfolio example.
Why: the only originator video that states the delegation idea outright, in twelve minutes; matches fact 1.

**Optional clip: Mollick on Simon Sinek's channel, about 7:00-8:30 only** (fact 6). Not a full-video card. The scorer also lists 13:40 on experienced managers getting more from AI than juniors (not re-checked word by word).

## Read
1. **Anthropic, *Prompting best practices*** (fact 1): read "Be clear and direct" only.
2. **Meincke et al., *Prompting Science Report 3*** (fact 7), first 3 pages and Figure 4: the cleanest published test of prompt folklore, co-written by the person who says tricks are dead. The per-question swing is the myth-buster.
(Spare: Mollick 2023 guide, 8 min.)

## Interview questions (3)
1. "A partner wants a first-pass summary of 40 pages of client interview notes by tomorrow. Write the brief you would give an AI tool and tell me what you would check before it goes in the deck." Pattern: reported McKinsey Lilli pilot tests prompting and the judgment to "challenge it, put it into context" (`ft-mckinsey-lilli-interview`; research-consulting-ai.md). JD data: "prompting" in 29% of AI-explicit JDs vs 2.2% baseline (n=360 vs 713; research-jd-linkedin-2026-10.md).
2. "A junior says starting every prompt with 'You are a world-class strategist' improves answers. How would you find out?" Pattern: evals in 9% of AI JDs vs 0.6% (same file). Answer draws on Wharton Reports 1 and 3: repeat runs, fixed question set, results vary by question.
3. "An Indian bank wants GenAI to draft credit memos. What must the instruction to the model contain, and where does a human sign off?" Pattern: casebook #75 "GenAI in International Bank" (KYC, credit memos, human-in-loop) in research-casebooks-2025-26.md.

## Indian business example (Illustrative)
A Pune packaged-snacks company has 300 free-text comments from distributors about delayed deliveries and wants the top causes before Monday's review. Vague prompt: "Summarise these." Brief: goal (rank root causes of delay for the supply-chain head), audience, the comments pasted in a labelled block, a two-line sample of a coded comment, output as a table of cause, count and one quote, and "mark anything you are unsure of". Same model, same data; the second version can be checked row by row. No real firm, no numbers claimed.

## Misconceptions (myth blocks)
1. "Magic phrases, flattery, tips or threats make AI work harder." Report 3 (fact 7): five models, no meaningful aggregate gain.
2. "Prompting is dead, so structure doesn't matter." Reports 1 and 2 plus all three vendor guides: the format instruction mattered consistently (fact 8); context and examples are what a human colleague would need too. What faded is the folklore, and step-by-step scaffolding on reasoning models (fact 9).
3. "A good prompt is a one-shot." Google ("a few iterations"), Anthropic Lesson 7 at 9:01, Mollick 2023: it is a loop, and reviewing the output is part of the job.

**Stat block:** "+36 / -35 percentage points": the swing one prompt wording produced on individual questions, while the average across 198 questions barely moved (Report 3, arXiv 2508.00614, 2025).

## Try it (no code)
In ChatGPT, Claude or Gemini: run the Illustrative distributor task (or the reader's own memo) twice, once as a one-line prompt and once with a six-part brief (goal and why, audience, context pasted, one example, output format, "flag what you're unsure of"). Then ask: "What did you assume that I did not tell you?" Optional: save the checklist as a Custom GPT or Gemini Gem called "Brief Checker" told to ask the reader for any missing item before answering.

## sources.yml-ready entries
```yaml
claude-prompting-best-practices:
  type: article
  title: "Prompting best practices"
  creator: Anthropic
  publisher: Anthropic (Claude docs)
  year: 2026
  minutes: 15
  url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
  tier: A
  why: The vendor's own reference. Its first rule treats the model as a brilliant new employee who lacks your context, which is the delegation idea in one sentence.
  verified: true

anthropic-prompt-overview:
  type: article
  title: "Prompt engineering overview"
  creator: Anthropic
  publisher: Anthropic (Claude docs)
  year: 2026
  minutes: 3
  url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
  tier: A
  why: Says to define success criteria and a way to test before tuning any prompt.
  verified: true

openai-prompt-engineering:
  type: article
  title: "Prompt engineering"
  creator: OpenAI
  publisher: OpenAI (developer docs)
  year: 2026
  minutes: 10
  url: https://developers.openai.com/api/docs/guides/prompt-engineering
  tier: A
  why: The junior-coworker versus senior-coworker analogy, and the same instructions, examples, context structure.
  verified: true

gemini-prompt-strategies:
  type: article
  title: "Prompt design strategies"
  creator: Google
  publisher: Google AI for Developers (Gemini API docs)
  year: 2026
  minutes: 10
  url: https://ai.google.dev/gemini-api/docs/prompting-strategies
  tier: A
  why: Google's version of the same checklist: clear instructions, examples, context, iteration.
  verified: true

mollick-prompting-guide:
  type: article
  title: "A guide to prompting AI (for what it is worth)"
  creator: Ethan Mollick
  publisher: One Useful Thing
  year: 2023
  minutes: 8
  url: https://www.oneusefulthing.org/p/a-guide-to-prompting-ai-for-what
  tier: B
  why: The sceptic's case: most prompting tips are ritual, and the best method is to work with the model interactively.
  verified: true

wharton-psr1:
  type: paper
  title: "Prompting Science Report 1: Prompt Engineering is Complicated and Contingent"
  creator: Meincke, Mollick, Mollick, Shapiro
  publisher: Wharton Generative AI Labs (arXiv 2503.04818)
  year: 2025
  minutes: 15
  url: https://arxiv.org/abs/2503.04818
  tier: A
  why: 100 trials per question show politeness washes out while dropping the format instruction hurts.
  verified: true

wharton-psr2:
  type: paper
  title: "Prompting Science Report 2: The Decreasing Value of Chain of Thought in Prompting"
  creator: Meincke, Mollick, Mollick, Shapiro
  publisher: Wharton Generative AI Labs (arXiv 2506.07142)
  year: 2025
  minutes: 15
  url: https://arxiv.org/abs/2506.07142
  tier: A
  why: Step-by-step instructions add little for reasoning models and cost more time and tokens.
  verified: true

wharton-psr3:
  type: paper
  title: "Prompting Science Report 3: I'll pay you or I'll kill you -- but will you care?"
  creator: Meincke, Mollick, Mollick, Shapiro
  publisher: Wharton Generative AI Labs (arXiv 2508.00614)
  year: 2025
  minutes: 15
  url: https://arxiv.org/abs/2508.00614
  tier: A
  why: Tests tips and threats on five models. No average gain, but single questions swing by tens of points.
  verified: true

anthropic-fluency-prompting:
  type: video
  title: "Lesson 7: Effective prompting techniques (Deep Dive) | AI Fluency: Framework & Foundations Course"
  creator: Anthropic
  publisher: YouTube
  year: 2025
  minutes: 12
  marks: ["0:09 prompting as briefing a new colleague", "2:01 the six tips", "6:50 think before answering", "9:01 iterate and restart"]
  url: https://www.youtube.com/watch?v=2YCaBqP8muw
  tier: A
  why: Anthropic states the delegation idea outright in twelve minutes. Skip 3:40-4:30, whose demo contains a wrong claim.
  verified: true

mollick-sinek-skills:
  type: video
  title: "The AI Skills Nobody is Teaching (And Everyone Needs)"
  creator: Ethan Mollick
  publisher: YouTube (Simon Sinek)
  year: 2026
  minutes: 58
  marks: ["7:00 prompt tricks no longer matter; instruct as you would a human"]
  url: https://www.youtube.com/watch?v=9YMYVb1ASCg
  tier: B
  why: Mollick's current position on prompt tricks, in his words. Use the clip, not the whole interview.
  verified: true
```
Reuse existing ids: `hbs-jagged-frontier`, `dellacqua-jagged-orgsci`, `ft-mckinsey-lilli-interview`, `mollick-centaurs`.

## Gaps
- Not in `source-policy.yml`: `platform.claude.com`, `developers.openai.com`, `ai.google.dev` (arxiv.org is fine). Orchestrator should add them to tier A or `check` will flag.
- Mollick 2023 and OpenAI pages confirmed through fetch summaries, not full reads; quotes are short and attributed.
- No source separates the BCG prompt-overview arm's effect; full paper not opened.
- No Wharton or vendor number says "structured prompts raise accuracy by X%". Honest evidence: format instruction matters (Report 1), tricks do not average out, per-question variance is large. State that plainly.
- Vendor docs carry no publication dates; year 2026 is the access year (living documents).
- NotebookLM `inference-found` auth expired, skipped. agent-reach YouTube rate-limited; used yt-dlp transcripts.
- Google's Workspace "10-step" prompt guide not opened.
