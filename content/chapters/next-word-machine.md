---
id: next-word-machine
title: A model predicts the next word
deck: Every chatbot answer is built one small piece at a time, by a machine that guesses what comes next. Once you see the loop, you can explain its fluency, its mistakes and its bill.
level: Zero to one
tracks: [foundations, consulting]
hook: A bank runs the same support bot on the same kind of customer chats, once in English and once in Hindi. The Hindi bill comes out several times higher, at the same price list. What is the bank paying for?
objectives:
  - "**Explain** how a large language model writes an answer one token at a time, and why the same question can get different answers."
  - "**Describe** what parameters are and why more parameters, data and compute made models better in a predictable way."
  - "**Estimate** the cost of an AI task from tokens, price per million tokens and volume."
  - "**Judge** when language, input length or answer length will move an AI budget by multiples."
---

Type "Running late, will reach by" on your phone and the keyboard offers three words: "7", "8", "tonight". It has never met you. It has seen how millions of messages that start this way tend to continue, and it is betting on the next word. ==A large language model is the same bet at enormous scale: given the text so far, it scores every possible next piece of text, picks one, and repeats.==

The previous chapter split AI into two families: predictive models that output a number or a label, and generative models that output text, images or code. This chapter shows that the generative kind is, underneath, a predictive model too. It predicts one thing only, the next small piece of text, and it does so again and again until an answer appears. Hold on to that loop. It explains why a chatbot can write a fluent board memo, why it can state a wrong figure with total confidence, and why your finance team will one day ask you what a "token" costs.

## Predict, pick, repeat

A chatbot writes the first piece of its answer, reads everything again including that piece, and writes the next. Grant Sanderson of 3Blue1Brown puts it plainly: the model assigns "a probability to all possible next words", and then one is picked [@3b1b-llm-briefly]. Stephen Wolfram describes ChatGPT as "just asking over and over again" what the next word should be [@wolfram-chatgpt].

::: principle Build it from zero
1. Any piece of text can be continued. "The RBI kept the repo rate" has a handful of likely continuations and millions of unlikely ones.
2. If you had read enough text, you could put a probability on each possible continuation: "unchanged" very likely, "purple" almost never.
3. A machine that outputs those probabilities can write. Pick a likely next piece, stick it on the end, and you have a slightly longer text.
4. Feed the longer text back in and ask again. Each pass adds one piece.
5. ∴ An answer from a chatbot is a chain of next-piece guesses. There is no separate step where it looks the answer up.
:::

{{figure next-word-machine-pick | One step of the loop. The model scores every candidate for the next token, picks one, appends it, and runs again on the longer text. A 300-word answer is a few hundred of these steps. | Illustrative probabilities}}

Step 3 says "a likely" piece on purpose. Products sample, so a less likely token sometimes wins. A setting called [[temperature]] controls how often. Wolfram reports that for essays a temperature of 0.8 "seems best", a value found by trying things out; no theory produced it [@wolfram-chatgpt]. Sampling is why the same question in two chats gets two different answers, and why clients ask "Why did it say something different yesterday?" Every answer is a fresh draw from the same probabilities. If you need the same output every time, such as a fixed label for each support ticket, you have to design for it: constrain the task, lower the randomness, check the result.

::: concept Next-token prediction
**Plain words.** The model's only job: given the text so far, give a probability to every possible next token. Writing an answer is this job done hundreds of times in a row.

**Analogy.** A seasoned court stenographer who can often finish a lawyer's sentence. They are right most of the time because they have heard thousands of similar arguments, and they could still finish a sentence wrongly with full confidence.

**Misconception.** "It looks up facts like a database, then phrases them nicely." A plain model stores no list of facts and fetches nothing. It continues text in the way its training made most likely. When the likeliest continuation is false, it writes the falsehood just as fluently.
:::

## Where the probabilities come from

A food-delivery app that predicts your ETA might use a rule as small as *time = 12 + 4 × distance*. The 12 and the 4 are its [[parameter|parameters]]: numbers that [[training]] adjusts until the rule fits past orders. A language model is the same idea with far more numbers. Sanderson says large models have "hundreds of billions" of parameters, that they start out random, and that training adjusts them using trillions of examples of text [@3b1b-llm-briefly]. The adjusting method is called backpropagation: after each guess, every parameter is nudged slightly in the direction that would have made the right next word more likely.

Andrej Karpathy, a founding member of OpenAI, makes the object concrete. Take Meta's Llama 2 model with 70 billion parameters. It is two files on a disk: a small program to run it and a parameters file of 140 GB, because each parameter takes two bytes [@karpathy-intro-llms]. Training it took roughly 6,000 GPUs for about 12 days and cost about $2 million. Karpathy calls the result a compression of internet text about 100 times smaller than what it read, and stresses that the compression is "lossy": unlike a zip file, you cannot get the original back out [@karpathy-intro-llms].^[These are Llama 2 figures from 2023, used because Karpathy gave them in public. Today's frontier models are larger and cost far more to train; the chapter on who pays for AI follows that money.]

That word "lossy" is the most useful thing in this section for an interview. ==The model keeps the patterns of what it read and loses most of the exact text, so it can reproduce the style of a fact without reproducing the fact.== A 140 GB file cannot hold the web word for word. When you ask for a specific number, a case citation or a quote, the model writes something with the right shape. Sometimes the content is right as well, and sometimes it only looks right. The next chapter is about telling the two apart.

Training and [[inference]] are different events. Training sets the parameters once, at great cost. Inference is every later use: your question goes in, the fixed parameters produce an answer, and you pay a small amount each time. The rest of this chapter is about the inference bill, because that is the one your client will pay every month.

## Why bigger kept working

The scale is hard to picture, so Sanderson gives two comparisons. A person reading non-stop, 24 hours a day, would need "over 2,600 years" to read the text used to train GPT-3. And if you could do one billion additions and multiplications every second, the arithmetic needed to train the largest models would take "well over 100 million years" [@3b1b-llm-briefly].

Why would anyone spend that much? In 2020 Jared Kaplan and colleagues measured what happens to a language model's error as you grow it. They found that the loss "scales as a power-law with model size, dataset size, and the amount of compute used for training", with the trend holding across "more than seven orders of magnitude" [@kaplan-scaling-laws]. In plain terms, the improvement was smooth and predictable. Karpathy describes next-word accuracy as "a remarkably smooth, well behaved and predictable function of only two variables": the number of parameters and the amount of training text [@karpathy-intro-llms]. This finding is called a [[scaling-law|scaling law]]. When a result is that predictable, a lab can forecast what a bigger model will buy before it spends the money.

::: myth
**Myth.** "Bigger models" is marketing. A model with more parameters is the same product with a larger number on the box.

**Reality.** The gain from scale was measured, and it was smooth across a range of more than seven orders of magnitude [@kaplan-scaling-laws]. The catch is what was measured: how well the model predicts the next token. ==Scale buys better next-word guesses; it does not guarantee that any single guess is true.== A bigger model can still invent a figure, only more fluently.
:::

## Tokens: the unit of everything

So far we have said "word". The model actually reads and writes [[token|tokens]]: chunks of text that may be a whole word, part of a word, a space plus a word, or a punctuation mark. A fixed rule called a [[tokenizer]] chops text into tokens before the model sees it. In Karpathy's live demo, "hello world" comes out as two tokens [@karpathy-deep-dive]. OpenAI's rule of thumb for English is that one token is about four characters, or about three-quarters of a word, so 100 tokens is roughly 75 words. The same page warns that "other languages can have different relationships" [@openai-counting-tokens].

Keep one conversion in your head: a 500-word page of English is about 670 tokens (our division, 500 ÷ 0.75, using OpenAI's rule; English only).

::: concept Token
**Plain words.** The unit a model reads, writes and bills by. In English, about three-quarters of a word.

**Analogy.** Courier pricing by weight slab, not by parcel. Two parcels that look the same can fall into very different slabs, and you pay by the slab.

**Misconception.** "A token is a word, so the same message costs the same in any language." The count depends on the tokenizer and the script. The same sentence can cost several times more tokens in one language than in another.
:::

The second thing tokens set is how much the model can see. During training, Karpathy explains, the model is shown windows of text, for example 8,000 tokens at a time, and learns to predict the next token inside each window. The full training set he describes is about 15 trillion tokens [@karpathy-deep-dive]. The window that a model can attend to at once is its [[context-window|context window]].

::: concept Context window
**Plain words.** The maximum number of tokens the model can take in at once: your instructions, any documents you paste, the conversation so far and the answer it is writing, all together.

**Analogy.** A desk. Whatever is on the desk, the analyst can use. Whatever is in the filing cabinet down the hall does not exist for this task until someone puts it on the desk.

**Misconception.** "The model remembers our earlier chats." The parameters do not change when you talk to it. A product that seems to remember is putting earlier text back onto the desk, and every token on the desk counts toward the window and, through an API, toward the bill.
:::

## The language tax

Here is the answer to the opening puzzle. Tokenizers are built from training text, and most training text is English. Common English words get their own single token. Words in less represented languages and scripts get chopped into many small pieces.

Aleksandar Petrov and colleagues measured this across languages, using the same content translated. Compared with English, Italian needed about 1.6 times the tokens, Bulgarian about 2.6 times and Arabic about 3 times. In the worst case they found, the Shan language, it was about 15 times [@petrov-tokenizers].

::: stat 15×
More tokens to say the same thing in the worst-case language Petrov and colleagues tested (Shan) than in English. Their study gives no figure for Hindi; for Indian scripts, test your own text.
<span class="src">Source: [@petrov-tokenizers]</span>
:::

For Indian languages, the best figure we found comes from a vendor. Sarvam, an Indian AI lab, reports that other multilingual models often need "4 to 8 tokens per word" for Indic text, against 1.4 for English, and that its own tokenizer gets Indic text down to 1.4 to 2.1 [@sarvam-1-tokenizer]. Treat that as one lab's claim from 2024, about its competitors, with no named baseline model. Independent work points the same way: Orevaoghene Ahia and colleagues tested OpenAI's API across 22 languages and found that "speakers of a large number of the supported languages are overcharged while obtaining poorer results" [@ahia-languages-cost].

Two consequences follow. First, an Indian-language product can cost several times its English twin at the same price list. Second, the same tax eats the context window: if a Hindi document takes three times the tokens, three times less of it fits on the desk.

## Your first feel for cost

AI services sold through an API are priced per million tokens, with separate prices for input (what you send) and output (what the model writes). Output costs more. On 1 November 2026, Anthropic's list price for Claude Sonnet 5.5 was $2 per million input tokens and $10 per million output tokens; its larger Opus 5.5 was $4 and $20 [@anthropic-pricing]. OpenAI's gpt-6-luna was $0.10 and $0.50, and gpt-6.1-sol was $2 and $10 [@openai-pricing]. Models that "think" before answering also produce reasoning tokens you never see, and those are billed as output [@openai-counting-tokens].

Put it together and every AI cost estimate has the same shape:

*monthly cost = calls per month × (input tokens × input price + output tokens × output price)*

A quick example at the Sonnet 5.5 input price: feeding the model 1,000 English pages of 500 words is about 670,000 tokens, or 0.67 million, which costs about $1.34 to send. ==A single call is cheap; the bill is set by volume, answer length and language.== Those three are what you probe in a case.

::: case Illustrative · A bank's multilingual care assistant
#### The situation
A private bank wants an AI assistant for customer chats in English, Hindi and Tamil. Volume is 1 million chats a month. In English, a typical chat sends 400 tokens to the model and gets 200 back. The team has priced it on Claude Sonnet 5.5 at list price ($2 in, $10 out per million tokens, 1 November 2026) and assumed every language costs the same. All volumes and token counts here are constructed for the exercise.

#### The decision
English cost: 400 million input tokens × $2 = $800, plus 200 million output tokens × $10 = $2,000. Total $2,800 a month, about ₹2.5 lakh at an assumed ₹88 to the dollar.

Now apply the language tax. Sarvam's "4 to 8 tokens per word" against 1.4 for English suggests Indic chats could need roughly 3 to 6 times the tokens. At 3 times, an all-Indic month costs $8,400; at 6 times, $16,800. If 60% of chats are in Hindi or Tamil, the realistic bill is $6,160 a month at 3 times (0.4 × $2,800 + 0.6 × $8,400), or $11,200 at 6 times. The budget the team presented was off by a factor of two to four, from one assumption.

#### Your move
Before signing, measure. Run 500 real past chats per language through each shortlisted model's tokenizer and count. Then pull the levers: a model whose tokenizer handles Indic scripts well, shorter answers (output is the expensive side), and a cheaper model for routine queries such as balance checks. At gpt-6-luna's list price the same English month would be $140. The pilot has to show whether its answers are good enough; a 20-fold price gap makes that test worth running.
:::

::: lens consulting
When a client says "AI is expensive" or "AI is basically free", rebuild the bill from its three drivers: calls, tokens per call, price per token. Most surprises hide in tokens per call: long documents pasted into every request, long answers nobody reads, hidden reasoning tokens and the language mix. A two-line unit-economics model of a pilot will usually tell you more than a vendor's slide.
:::

::: lens product
For an Indian-language product, the tokenizer is a product decision. It sets the cost per conversation, how much context fits, and, per Ahia and colleagues, possibly the quality users get. Test it on your users' real text, in their script, before you choose a model.
:::

::: interview The Hindi bill
**Q.** A client's Hindi support bot costs about three times the English one for the same volume of chats. Why might that be, and what would you check?

> "Same chats, same price list, three times the bill: my first suspect is the number of tokens per chat, before the price."

**What they are testing.** Whether you know that AI is billed per token, that tokens are not words, and whether you can turn a cost puzzle into a short list of checks.

**A strong structure.** Cost = calls × tokens per call × price per token → confirm calls and price really are the same → compare tokens per chat by language, because tokenizers often split Hindi into far more pieces than English (cite the direction, and say you would measure the client's own number) → check answer length and any hidden reasoning tokens, since output costs more → options: a model with a better Indic tokenizer, shorter answers, a cheaper model for simple queries, then re-test quality.
:::

::: try Count the language tax yourself
No code needed. Open OpenAI's free tokenizer page in a browser (platform.openai.com/tokenizer). Paste an English paragraph and note the token count. Then ask any chat assistant to translate it:

```
Translate this paragraph into Hindi. Output only the translation.
[paste your English paragraph here]
```

Paste the Hindi into the tokenizer and compare the counts. Repeat with Tamil or Bengali. You have just measured, for one tokenizer and one paragraph, the multiplier that the case above had to assume. Other companies' models use other tokenizers, so the number will differ by model.
:::

{{watch 3b1b-llm-briefly}}

{{watch karpathy-intro-llms}}

For Karpathy, watch 0:00 to 11:30 and 25:47 to 27:30 (about 14 minutes). Skip from 30:00; the fast-and-slow-thinking part near 37:00 predates today's reasoning models.

{{read wolfram-chatgpt}}

Read only the first two sections ("It's Just Adding One Word at a Time" and "Where Do the Probabilities Come From?"), for real probability tables.

::: check Check yourself
1. In one sentence, what does a large language model do at each step of writing an answer? <span class="lvl">recall</span>
2. Your manager pastes the same prompt into two chats and gets two different summaries. She asks which one is "the real answer". What do you tell her? <span class="lvl">explain</span>
3. Estimate the monthly cost of summarising 10,000 English customer emails a month at $2 per million input tokens and $10 per million output tokens. State your assumptions. <span class="lvl">apply</span>
4. A CFO asks why a chatbot stated last year's revenue figure wrongly but fluently. Explain in three sentences, using "parameters" and "next token". <span class="lvl">transfer</span>
5. A start-up pitches you a Bengali legal assistant priced by extrapolating from its English pilot. What would you need to see before backing the cost model? <span class="lvl">judge</span>
:::

::: answers
1. It gives a probability to every possible next token, given the text so far, picks one, appends it and repeats.
2. Neither. Each answer is a separate draw from the same probabilities. If consistency matters, constrain the task, reduce the randomness and check outputs against a standard.
3. One version: emails of about 500 words (about 670 tokens) in, summaries of about 100 words (about 135 tokens) out. Input: 6.7 million tokens × $2 = about $13. Output: 1.35 million × $10 = about $13.50. Total about $27 a month. The method matters more than the number.
4. The model's parameters store patterns from its training text, compressed with loss, so they do not hold an exact copy of the figure. It writes the most likely next token at each step, and a plausible-looking number is a likely continuation even when it is wrong. Fluency comes from the patterns; accuracy for a specific fact is not guaranteed.
5. Measured token counts per document in Bengali on the chosen model's tokenizer, against the English pilot, since non-English text can need several times the tokens. Also the answer lengths, any reasoning tokens, and whether the longer token count still fits the documents in the context window.
:::

::: recap The night-before page
1. An LLM writes by next-token prediction: score every possible next token, pick one (with some randomness), append, repeat.
2. Parameters are the numbers training sets; a model is a lossy compression of its training text, so it reproduces patterns, not exact facts.
3. Scaling laws: next-token error fell smoothly as parameters, data and compute grew, which is why labs build bigger. Bigger models guess better and can still be wrong.
4. Tokens are the unit of reading, context and billing: about 3/4 of an English word; often several times more tokens for the same content in Indian scripts.
5. Cost = calls × tokens per call × price per million tokens, with output dearer than input. Probe volume, answer length and language mix.
:::
