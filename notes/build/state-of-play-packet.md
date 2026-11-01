# Packet: state-of-play (State of play, November 2026), researched 2026-11-01

Method: opened each lab page today via scripts/browse.py or WebFetch. Items marked ~ were seen only in search snippets.

## Name check against DISCUSSION.md
- **Gemini 4 Argon**: CONFIRMED. Launch post 13 Oct 2026. (Google's 2 Oct September roundup only had it for trusted cyber defenders.) deepmind.google also lists a teased "Gemini 4 Carbon" (next frontier model, not released).
- **GPT-6 Sol / Luna**: CONFIRMED but incomplete. The frontier model is **GPT-6 Astra** (3 Sep). Sol and Luna are cheaper tiers (22 Sep). **GPT-6.1 Sol** followed (29 Sep). **GPT-6.1 Terra** (26 Oct) is a GPT-6.1 model.
- **Claude Mythos / Fable 5.1**: CONFIRMED (1 Sep). Same model, different safeguards: Fable 5.1 generally available, Mythos 5.1 trusted-access only. Later: Opus 5.5 (22 Sep), Sonnet 5.5 (28 Sep), Haiku 5.5 (7 Oct).
- Correction: write "Fable 5.1 (public) and Mythos 5.1 (restricted), the same model", not two models.

## Facts
1. **OpenAI GPT-6 Astra**, "the world's most intelligent and aligned model", rolling out from 3 Sep 2026 to a limited set of organisations, then ChatGPT Plus/Pro/Business/Enterprise, API, Azure, AWS Bedrock. API $10 in / $50 out per 1M tokens. https://openai.com/index/gpt-6-astra/ Tier A. ✓ opened 2026-11-01. Caveat: page text shows no date; 3 Sep is from the search listing and fits the Sol page's "earlier this month".
2. **GPT-6 Sol and Luna**, 22 Sep 2026 (date from update note on the Astra page). API cut 50% vs GPT-5.6 promo: Sol $4 to $2 in, $20 to $10 out; Luna $0.20 to $0.10 in, $1.20 to $0.50 out, per 1M tokens. https://openai.com/index/introducing-gpt-6-sol-and-luna/ Tier A. ✓ opened.
3. **GPT-6.1 Sol**: "near-Astra intelligence for a fifth of the price" (Sol $2/$10, cached input $0.10). Astra page update note dates it 29 Sep; the page metadata says 22 Sep, so write "late Sep". https://openai.com/index/introducing-gpt-6-1-sol/ Tier A. ✓ opened.
4. **GPT-6.1 Terra**, 26 Oct 2026: API $1 in / $0.05 cached / $5 out; in ChatGPT only in Work and Codex, not Chat. OpenAI Model Release Notes (rolling page, cite with access date 1 Nov 2026). https://help.openai.com/en/articles/9624314-model-release-notes Tier A. ✓ opened.
5. **Claude Fable 5.1 and Mythos 5.1**, 1 Sep 2026: "the same model, but with different levels of safeguards". Fable 5.1 about 25% cheaper than Fable 5 for typical workloads. https://www.anthropic.com/claude-fable-and-mythos-5-1 Tier A. ✓ opened (page has no visible date; 1 Sep from the system card title seen in search). $10/$50 per 1M tokens: ~ search snippet.
6. **Claude Opus 5.5**, 22 Sep 2026: first of the 5.5 family, about 40% cheaper to run than Opus 5; $4 in / $20 out per 1M tokens. https://www.anthropic.com/news/claude-opus-5-5 Tier A. ✓ opened. **Haiku 5.5**, 7 Oct 2026: $0.10 in / $0.50 out (prompts up to 100k) vs Haiku 4.5 $1.00 / $5.00; "around 75% less" to run. https://www.anthropic.com/news/claude-haiku-5-5 ✓ opened. Sonnet 5.5, 28 Sep: date from anthropic.com/news list ✓.
7. **Gemini 4 Argon**, 13 Oct 2026, Koray Kavukcuoglu: API (AI Studio), Antigravity (Ultra), Gemini app and AI Mode (Ultra and Pro); introductory price $2 in / $10 out per 1M tokens; Google says #1 on the Vals Index. https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/ Tier A. ✓ opened.
8. **Google September roundup**, 2 Oct 2026: Gemini 3.8 Flash, 3.8 Live, Gemini app for Windows, Gemini Notebook study tools. https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-september-2026/ Tier A. ✓ opened.
9. **xAI Grok 4.7**, 21 Sep 2026: "our most capable model for coding and knowledge work". https://x.ai/news/grok-4-7 Tier A. ✓ opened. ($2/$6, 500k context: ~ snippet.)
10. **Mistral Large 4 ("Le Chonk")**, open weights 29 Oct 2026: 1-trillion-parameter multimodal; "best open-weight model for coding" (Mistral's claim), trained in Europe. https://mistral.ai/news/mistral-large-4-oss/ Tier A. ✓ opened.
11. **Meta Muse Spark 1.1**, 9 Jul 2026 (Meta Superintelligence Labs), multimodal reasoning model for agentic tasks; Meta Model API in public preview. https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/ Tier A. ✓ opened. No newer Meta frontier post found.
12. **DeepSeek V4.1-Flash-1017**, 17 Oct 2026 (V4 Preview 24 Apr 2026, 1M context, open weights). https://api-docs.deepseek.com/news/news261017/ Tier A; domain not in source-policy.yml. ~ not re-opened.
13. **India**: Sarvam Bulbul V4 Flash (speech, 11 Indian languages, 13 Oct 2026), Saaras V4 (25 Sep), Vision 2.1 (24 Sep); chat models sarvam-30b and sarvam-105b (Jun 2026). https://www.sarvam.ai/blogs/bulbul-v4-flash Tier A. ~ not re-opened (fetch timed out). **BharatGen Param2**: 17B parameters, 22 scheduled languages, launched at the India AI Impact Summit, PIB release dated 17 Feb 2026. https://bharatgen.com/param-2-launch-bharatgen-sovereign-ai-22-languages/ ~ not re-opened; funding figures conflict (INR 1,235 crore vs 1,058 crore), do not print. Krutrim: no primary page found.
14. **Stanford AI Index 2026** (HAI, Apr 2026): SWE-bench Verified rose from 60% to near 100% in one year; as of March 2026 the top US model leads the top Chinese model by 2.7%; organisational adoption 88%. https://hai.stanford.edu/ai-index/2026-ai-index-report Tier A. ✓ opened. Companion "Inside the AI Index: 12 Takeaways", Shana Lynch, 13 Apr 2026: https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report ✓ opened.
15. **Products** (one line each, needs a second pass): Gemini Notebook is the renamed NotebookLM (blog.google, 16 Jul 2026) https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/ ~. Microsoft "new Copilot with Home, Code and Autopilot", 25 Sep 2026 https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/ ~. Perplexity: no Q4 2026 primary page found; latest seen is the 27 Mar 2026 changelog (Comet on iOS) https://www.perplexity.ai/changelog/what-we-shipped--march-27-2026 ~. ChatGPT: GPT-6 in Chat from 7 Oct (~ snippet; release notes cover Sol/Luna in Chat).

## Table layout proposal (each row: model, lab, date, one line, URL)
Frontier: Fable 5.1 / Mythos 5.1 (1 Sep); GPT-6 Astra (3 Sep); Gemini 4 Argon (13 Oct); Grok 4.7 (21 Sep).
Workhorse tiers: Opus 5.5 (22 Sep), Sonnet 5.5 (28 Sep), Haiku 5.5 (7 Oct); GPT-6.1 Sol (late Sep), GPT-6 Luna (22 Sep), GPT-6.1 Terra (26 Oct); Gemini 3.8 Flash (Sep).
Open: Mistral Large 4 (29 Oct), DeepSeek V4.1-Flash (17 Oct), Meta Muse Spark 1.1 (9 Jul; weights status not checked).
India: Sarvam (Oct), BharatGen Param2 (Feb).
Printed rule: names change every few weeks; the web edition replaces this page.

## Watch
None, per task (one Read card instead).

## Read
Stanford HAI, "Inside the AI Index: 12 Takeaways from the 2026 Report" (13 Apr 2026). A neutral, dated yardstick that does not depend on any lab's launch page; covers capability, the US-China gap, adoption.

## Interview questions
1. "A client asks which AI model to standardise on across 5,000 staff. What do you ask before you answer?" Evidence: JD asks to select and judge tools (research-jd-linkedin-2026-10.md); answer axes are task, data sensitivity, price per million tokens, lock-in, release cadence.
2. "A vendor deck says its model is number one on a benchmark. How much do you trust it?" Pattern: "evaluate a claim" casebook asks. Fact hook: launch pages use lab-chosen benchmarks (OpenAI's Sol page footnotes its own AutomationBench comparison).
3. "Model prices fell 50% in six weeks. How does that change a business case built in July?" Pattern: AI business-case/ROI cases. Hook: GPT-6 Sol input $4 to $2 (22 Sep). Check wording against research-casebooks-2025-26.md; not tied to any firm.

## Indian business example
Illustrative: a Pune insurer routes Hindi and Marathi call recordings to an Indic speech model, drafts summaries with a cheap-tier model, escalates hard claims to a frontier model. No real firm's numbers. Real anchors that such models exist: Sarvam Bulbul V4 Flash, BharatGen Param2.

## Misconceptions and stat
1. "The newest, biggest model is always right." Labs sell a ladder; OpenAI says GPT-6.1 Sol nearly matches Astra at one-fifth the price.
2. "Mythos and Fable are different models." Anthropic: the same model, different safeguards.
3. "Launch-page benchmarks are neutral." They are chosen by the lab.
Stat block: Haiku 5.5 input $0.10 per million tokens vs $1.00 for Haiku 4.5 (Anthropic, 7 Oct 2026).

## sources.yml-ready
```yaml
openai-gpt6-astra:
  type: article
  title: "GPT-6 Astra: A new generation of intelligence"
  creator: OpenAI
  publisher: OpenAI
  year: 2026
  url: https://openai.com/index/gpt-6-astra/
  tier: A
  why: The originator page for OpenAI's frontier model, with price and rollout. Benchmarks are the lab's own, so read them as claims.
  verified: true
openai-gpt6-sol-luna:
  type: article
  title: "Introducing GPT-6 Sol and Luna"
  creator: OpenAI
  publisher: OpenAI
  year: 2026
  url: https://openai.com/index/introducing-gpt-6-sol-and-luna/
  tier: A
  why: Shows the cheaper tier ladder and a 50 percent API price cut in one release.
  verified: true
openai-model-release-notes:
  type: article
  title: "Model Release Notes"
  creator: OpenAI
  publisher: OpenAI Help Center
  year: 2026
  url: https://help.openai.com/en/articles/9624314-model-release-notes
  tier: A
  why: Dated list of OpenAI model releases (GPT-6.1 Terra, 26 Oct 2026). Rolling page, cite with access date.
  verified: true
anthropic-fable-mythos-5-1:
  type: article
  title: "Introducing Claude Fable 5.1 and Claude Mythos 5.1"
  creator: Anthropic
  publisher: Anthropic
  year: 2026
  url: https://www.anthropic.com/claude-fable-and-mythos-5-1
  tier: A
  why: Primary page for Anthropic's frontier model and why one model ships under two names.
  verified: true
anthropic-opus-5-5:
  type: article
  title: "Introducing Claude Opus 5.5"
  creator: Anthropic
  publisher: Anthropic
  year: 2026
  url: https://www.anthropic.com/news/claude-opus-5-5
  tier: A
  why: Dated release (22 Sep 2026) with per-million-token pricing.
  verified: true
anthropic-haiku-5-5:
  type: article
  title: "Introducing Claude Haiku 5.5"
  creator: Anthropic
  publisher: Anthropic
  year: 2026
  url: https://www.anthropic.com/news/claude-haiku-5-5
  tier: A
  why: Source for the small-model price fall ($0.10 vs $1.00 input per million tokens).
  verified: true
google-gemini-4-argon:
  type: article
  title: "Gemini 4 Argon: Built to solve your hardest problems"
  creator: Koray Kavukcuoglu
  publisher: Google
  year: 2026
  url: https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/
  tier: A
  why: Google's launch post (13 Oct 2026) with availability and introductory price.
  verified: true
google-ai-updates-sep-2026:
  type: article
  title: "The latest AI news we announced in September 2026"
  creator: Google
  publisher: Google
  year: 2026
  url: https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-september-2026/
  tier: A
  why: One-page Google roundup (2 Oct 2026) covering Gemini 3.8 and Gemini Notebook.
  verified: true
xai-grok-4-7:
  type: article
  title: "Introducing Grok 4.7"
  creator: xAI
  publisher: xAI
  year: 2026
  url: https://x.ai/news/grok-4-7
  tier: A
  why: Dated xAI flagship release (21 Sep 2026).
  verified: true
mistral-large-4:
  type: article
  title: "Mistral Large 4 (Le Chonk) is now open weight"
  creator: Mistral AI
  publisher: Mistral
  year: 2026
  url: https://mistral.ai/news/mistral-large-4-oss/
  tier: A
  why: The leading European open-weight model, dated 29 Oct 2026.
  verified: true
meta-muse-spark-1-1:
  type: article
  title: "Introducing Muse Spark 1.1"
  creator: Meta Superintelligence Labs
  publisher: Meta AI
  year: 2026
  url: https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/
  tier: A
  why: Meta's latest model post (9 Jul 2026), showing a slower cadence than the other big labs.
  verified: true
stanford-ai-index-2026-takeaways:
  type: article
  title: "Inside the AI Index: 12 Takeaways from the 2026 Report"
  creator: Shana Lynch
  publisher: Stanford HAI
  year: 2026
  url: https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report
  tier: A
  why: Neutral, dated yardstick for capability, adoption and the US-China gap.
  verified: true
sarvam-bulbul-v4-flash:
  type: article
  title: "Introducing Bulbul V4 Flash"
  creator: Sarvam AI
  publisher: Sarvam AI
  year: 2026
  url: https://www.sarvam.ai/blogs/bulbul-v4-flash
  tier: A
  why: Indian-language speech model from an Indian lab, 13 Oct 2026.
  verified: false
```
DeepSeek and BharatGen entries omitted: api-docs.deepseek.com and bharatgen.com are not in source-policy.yml. Existing `stanford-ai-index` entry in sources.yml is year 2025 and unverified; update it to the 2026 report or use the new id.

## Gaps
- Astra exact day (3 Sep) is not in the OpenAI page text; Fable/Mythos 1 Sep comes from the system-card title.
- Meta: nothing newer than Muse Spark 1.1; open-weights status unchecked.
- Krutrim and IndiaAI foundation-model list: no primary page found.
- Copilot, Perplexity, ChatGPT, Claude app one-liners need a second pass on microsoft.com and perplexity.ai.
- NotebookLM was renamed Gemini Notebook (16 Jul 2026): affects naming across the book.
- LMArena not checked; no benchmark leaderboard opened.
