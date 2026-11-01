# Packet: next-word-machine (A model predicts the next word)

Researched 2026-11-01. "✓" = opened today and saw the number. Prices date fast: quote as list price with the date.

## Facts
1. **A model is a next-word probability machine; answers are built one token at a time.** 3Blue1Brown: the model assigns "a probability to all possible next words", then one is picked at random (0:40-1:18). Wolfram: ChatGPT is "just asking over and over again" what the next word should be; the unit is a token, which can be a word fragment; a "temperature" of 0.8 "seems best" for essays, from practice not theory. Sources: *Large Language Models explained briefly*, Grant Sanderson (3Blue1Brown), 20 Nov 2024, 8 min; Wolfram, *What Is ChatGPT Doing … and Why Does It Work?*, 14 Feb 2023. Tier A. ✓ (transcript; page)
2. **Two files, one lossy zip.** Karpathy: a 70B model is two files; the parameters file is 140 GB at two bytes per parameter (1:58). Llama 2 70B training: about 6,000 GPUs for about 12 days, about $2 million (5:13-5:21); roughly 100x compression but "lossy", unlike a zip (5:41-5:50). *[1hr Talk] Intro to Large Language Models*, Andrej Karpathy, 23 Nov 2023. Tier A. ✓ (transcript). These are Llama 2 (2023) figures, not today's frontier; say so.
3. **Parameters are dials set by training.** Models have "hundreds of billions" of parameters that start random; backpropagation tweaks them against trillions of examples (1:58-3:05). 3Blue1Brown as above. Tier A. ✓
4. **Scale of data and compute.** A human reading non-stop 24/7 would need "over 2,600 years" to read GPT-3's training text (1:37-1:43). At 1 billion operations a second, training the largest models would take "well over 100 million years" (3:19-3:40). 3Blue1Brown as above. Tier A. ✓
5. **Scaling laws.** Kaplan et al.: "The loss scales as a power-law with model size, dataset size, and the amount of compute used for training"; trends span "more than seven orders of magnitude"; larger models are more sample-efficient. *Scaling Laws for Neural Language Models*, Kaplan, McCandlish, Henighan, Brown, Chess, Child, Gray, Radford, Wu, Amodei; arXiv 2001.08361, 23 Jan 2020. Tier A. ✓ (abstract). Plain words, Karpathy 25:47: next-word accuracy is "a remarkably smooth, well behaved and predictable function of only two variables", parameters N and data D, with no sign of topping out (26:15). ✓ Caution: it describes next-word loss, not truthfulness.
6. **English token rule of thumb.** 1 token is about 4 characters or three-quarters of a word; 100 tokens about 75 words; "other languages can have different relationships". Reasoning tokens are hidden but billed as output. *Understanding and counting tokens*, OpenAI Help Center (undated; "updated 12 days ago"). Tier A. ✓ (via browse.py; direct fetch 403). Derived arithmetic (label it): a 500-word page is about 670 tokens.
7. **Same content, very different token counts by language.** Petrov et al.: up to "15 times" more tokens across languages (the 15x case is Shan); Italian 1.6x, Bulgarian 2.6x, Arabic 3x versus English. *Language Model Tokenizers Introduce Unfairness Between Languages*, Petrov, La Malfa, Torr, Bibi; arXiv 2305.15425, May 2023 (NeurIPS 2023). Tier A. ✓ No Hindi figure in it.
8. **Indic scripts.** Sarvam (Indian lab, vendor claim): other multilingual models "often requiring 4 to 8 tokens per word compared to 1.4 for English"; its tokenizer reaches "1.4-2.1" (vocab 68,096). *Sarvam-1*, sarvam.ai, 24 Oct 2024 (updated 8 Nov 2024). Tier C: vendor, 2024, no named baseline model; write "one Indian lab reports". ✓ Corroboration: Ahia et al., *Do All Languages Cost the Same?*, arXiv 2305.13707, May 2023: on OpenAI's API across 22 languages, "speakers of a large number of the supported languages are overcharged while obtaining poorer results". Tier A. ✓ (abstract)
9. **Price per million tokens is the unit of AI cost; output costs more than input.** Anthropic list prices (USD per MTok input / output): Opus 5.5 $4 / $20; Sonnet 5.5 $2 / $10; Fable 5.1 $10 / $50. OpenAI standard tier, short context: gpt-6.1-sol $2 / $10; gpt-6-luna $0.10 / $0.50; gpt-4o-mini $0.15 / $0.60. Sources: Anthropic and OpenAI pricing pages. Tier A content. ✓ read 2026-11-01. For arithmetic: 1,000 pages x ~670 tokens = ~0.67M tokens, about $1.34 at $2/MTok input. State any FX rate used.
10. **Pretraining = windows of tokens, predict the next.** Karpathy *Deep Dive into LLMs like ChatGPT*, 5 Feb 2025 (about 3h31m): tokenizer viewer, "hello world" is two tokens (12:07-12:54); dataset about 15 trillion tokens (14:45); windows of e.g. 8,000 tokens are the context (15:36-16:51). Tier A. ✓ (transcript)

## Watch
**A. Karpathy, *Intro to Large Language Models*, 60 min (scored, authority top).** Marks checked in transcript: `0:20` an LLM is two files (0:26-0:45); `4:17` lossy compression (5:13 GPUs and $2M, 5:50 "lossy"); `6:52` next-word prediction and "dreaming" (9:56, 11:17); `25:47` scaling laws (26:15). Watch 0:00-11:30 plus 25:47-27:30 (about 14 min). Skip from ~30:00 (tools, security, "LLM OS") and the System 1/System 2 claim at ~37:00, which run1 flags as outdated by reasoning models. Why: the originator explaining the physical object; supplies the book's first cost number.
**B. 3Blue1Brown, *Large Language Models explained briefly*, 8 min.** Marks: `0:40` every next word gets a probability; `1:37` 2,600 years of reading; `2:43` backpropagation; `3:19` 100 million years of compute. Skip `4:40` onward (transformer/attention teaser). Why: shortest accurate picture of predict, pick, repeat. Best first video.

## Read
1. **Wolfram, *What Is ChatGPT Doing … and Why Does It Work?*** Read only "It's Just Adding One Word at a Time" and "Where Do the Probabilities Come From?" (not "first three"; fix registry note). Real probability tables; why a lower-ranked word is sometimes chosen.
2. **Kaplan et al., *Scaling Laws for Neural Language Models***, abstract and Figure 1 only. Why labs keep building bigger models.

## Interview questions
1. "A client's Hindi support bot costs about three times the English one for the same volume. Why might that be, and what would you check?" Pattern: cost = tokens x price x calls (research-canon.md, canon item 5, cost/tokens differentiator). Evidence: facts 7, 8.
2. "Explain to a CFO in two minutes why a chatbot can state a wrong figure fluently." Pattern: next-token prediction needed for hallucination (research-canon.md item 3); explain-simply asks in the JD set (research-jd-linkedin-2026-10.md; wording not re-checked). Rests on facts 1, 2.
3. "Estimate the monthly cost of summarising 10,000 customer emails with an LLM. State your assumptions." Pattern: casebook market-sizing structure (research-casebooks-2025-26.md) applied to tokens. Uses facts 6, 9. Not claimed as asked at any firm.

## Indian business example
**Illustrative, no firm named.** An Indian bank's care team wants an assistant for Hindi, Tamil and English chats: 1 million chats a month, each 400 English-equivalent tokens in and 200 out. Compute the English cost at a stated list price, then re-run at 3x and 6x tokens for Indic text (Sarvam's 4-8 vs 1.4 tokens per word bounds the range). Lesson: language mix can move the bill by multiples. All numbers constructed; label Illustrative.

## Misconceptions
1. "The model looks up facts like a database." It generates token by token from parameters; 140 GB cannot hold the web verbatim (Karpathy 5:50, 9:56-11:17).
2. "Bigger is marketing." Scaling is a measured smooth power law (Kaplan; Karpathy 26:15), but it predicts next-word loss, not truth.
3. "A token is a word." About three-quarters of an English word (OpenAI), and far fewer characters per token in Indic scripts (Sarvam, Petrov).

## Stat block
**15x** More tokens for the same content in the worst-case language than in English. Source: `[@petrov-tokenizers]`. Caption must say it is Shan, not Hindi.

## sources.yml-ready entries
Existing ids: `karpathy-intro-llms` ✓ re-verified (title, creator, 23 Nov 2023, 60 min; marks 0:20 and 4:17 are right; replace the 14:14 mark, not checked, with 25:47 scaling laws). `wolfram-chatgpt` ✓ re-verified (title, 14 Feb 2023); fix its `why` to "first two sections". `3b1b-neural-network` not re-verified. Nothing appended to content/sources.yml (task forbids touching content/).

```yaml
3b1b-llm-briefly:
  type: video
  title: "Large Language Models explained briefly"
  creator: Grant Sanderson
  publisher: 3Blue1Brown
  year: 2024
  minutes: 8
  url: https://www.youtube.com/watch?v=LPZh9BOjkQs
  tier: A
  why: The shortest accurate picture of predict, pick, repeat. Watch it before reading the rest of this chapter.
  marks:
    - { t: "0:40", label: "Every possible next word gets a probability" }
    - { t: "1:37", label: "Over 2,600 years to read GPT-3's training text" }
    - { t: "3:19", label: "Over 100 million years of arithmetic to train the largest models" }
  verified: true

karpathy-deep-dive:
  type: video
  title: "Deep Dive into LLMs like ChatGPT"
  creator: Andrej Karpathy
  publisher: YouTube
  year: 2025
  minutes: 211
  url: https://www.youtube.com/watch?v=7xTGNNLPyMI
  tier: A
  why: The long version, for the curious. Only the tokenizer demo and the pretraining-window explanation matter for this chapter.
  marks:
    - { t: "12:07", label: "Tokenization, shown live in a tokenizer viewer" }
    - { t: "14:45", label: "15 trillion tokens; windows of tokens; predict the next one" }
  verified: true

kaplan-scaling-laws:
  type: paper
  title: "Scaling Laws for Neural Language Models"
  creator: Jared Kaplan et al.
  publisher: arXiv
  year: 2020
  url: https://arxiv.org/abs/2001.08361
  tier: A
  why: The originating paper for why labs keep building bigger models: loss falls as a power law in size, data and compute. Read the abstract only.
  verified: true

petrov-tokenizers:
  type: paper
  title: "Language Model Tokenizers Introduce Unfairness Between Languages"
  creator: Aleksandar Petrov, Emanuele La Malfa, Philip H.S. Torr, Adel Bibi
  publisher: arXiv (NeurIPS 2023)
  year: 2023
  url: https://arxiv.org/abs/2305.15425
  tier: A
  why: The same content can need up to 15 times more tokens depending on language, a cost and quality gap that matters for Indian-language products.
  verified: true

ahia-languages-cost:
  type: paper
  title: "Do All Languages Cost the Same? Tokenization in the Era of Commercial Language Models"
  creator: Orevaoghene Ahia et al.
  publisher: arXiv (EMNLP 2023)
  year: 2023
  url: https://arxiv.org/abs/2305.13707
  tier: A
  why: Tests OpenAI's API across 22 languages and finds many speakers are overcharged while getting poorer results.
  verified: true

openai-counting-tokens:
  type: article
  title: "Understanding and counting tokens"
  creator: OpenAI
  publisher: OpenAI Help Center
  year: 2026
  url: https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
  tier: A
  why: The vendor's own rule of thumb (1 token is about three-quarters of an English word) and the note that other languages differ.
  verified: true

sarvam-1-tokenizer:
  type: article
  title: "Sarvam-1"
  creator: Sarvam AI
  publisher: Sarvam AI
  year: 2024
  url: https://www.sarvam.ai/blogs/sarvam-1
  tier: C
  why: An Indian lab reports 4 to 8 tokens per word for Indic scripts in other multilingual models versus 1.4 for English. A vendor claim from 2024, and the only Indic-specific figure found.
  verified: true

anthropic-pricing:
  type: report
  title: "Pricing"
  creator: Anthropic
  publisher: Anthropic
  year: 2026
  url: https://platform.claude.com/docs/en/about-claude/pricing
  tier: A
  why: List price per million tokens, input and output, for each current Claude model. Prices change; quote with the date.
  verified: true

openai-pricing:
  type: report
  title: "API pricing"
  creator: OpenAI
  publisher: OpenAI
  year: 2026
  url: https://developers.openai.com/api/docs/pricing
  tier: A
  why: List price per million tokens for GPT models; output costs several times input.
  verified: true
```

## Gaps
- Domains `platform.claude.com`, `developers.openai.com`, `help.openai.com`, `sarvam.ai` are not in `content/source-policy.yml` (only anthropic.com, openai.com; arxiv.org is). `npm run check` will flag them: orchestrator should add them under A (sarvam.ai under C).
- No sourced Hindi-only token multiplier for a current model. Suggest a "Try it" block: paste the same paragraph in English and Hindi into a tokenizer and compare.
- Karpathy 2023 cost figures are Llama 2 era; no verified current frontier training cost (leave to who-pays).
- Prices are list prices on 2026-11-01; INR conversion unsourced.
- Interview question 2 JD wording not re-checked; 3b1b-neural-network not re-verified; Karpathy intro 14:14 mark unchecked.
- agent-reach hit a rate limit mid-run; transcripts were pulled with yt-dlp auto-captions instead.
