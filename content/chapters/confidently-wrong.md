---
id: confidently-wrong
title: "Why models are confidently wrong"
deck: "Pretraining, fine-tuning and human feedback explain both the fluency and the invented facts. Bias enters at the same stages. Once you see how a chatbot is trained, you know when to trust it and what to check."
level: Zero to one
tracks: [foundations, consulting]
hook: "On the same set of fact questions, one AI model gets 24% right and another gets 22%. The first is also wrong 75% of the time; the second is wrong 26% of the time. A leaderboard that counts only right answers ranks the first one higher. Which would you let near a client deck, and why does the leaderboard disagree with you?"
objectives:
  - "**Describe** the three stages that turn a text predictor into a chat assistant: pretraining, fine-tuning and feedback from human raters."
  - "**Explain** why a model trained and graded this way produces confident, fluent falsehoods, and why newer models still do."
  - "**Evaluate** an accuracy figure for an AI tool by asking what it counts as an error and what it does with \"I don't know\"."
  - "**Identify** where bias and invented facts can enter an AI use case, and who must check the output before it reaches a client."
---

Every MBA aspirant learns one rule from entrance exams: where a wrong answer costs nothing, never leave a question blank. A blank scores zero; a guess sometimes scores a point. Over a hundred questions, the habitual guesser beats the candidate who writes only what they know.

Chapter 2 showed that a chatbot writes by predicting the next token from patterns stored, with loss, in its parameters. This chapter asks how that raw predictor becomes the assistant you use, and what its training rewards. ==Chatbots are trained and graded like students in an exam with no negative marking, so they learn to guess with confidence instead of saying "I don't know".== Their fluency and their invented facts come from the same place. So does their bias.

## How a chatbot is made, in three stages

Andrej Karpathy, a founding member of OpenAI, describes the training of an assistant in three stages [@karpathy-intro-llms].

**Stage one: [[pretraining]].** The model reads a huge collection of internet text and learns to predict the next token. The result is a document completer. Karpathy shows such a model "dreaming" a product page, complete with an ISBN. The number is invented: the model knows that after "ISBN:" comes a string of digits of about that length, so it writes one [@karpathy-intro-llms].

**Stage two: [[fine-tuning]].** People write ideal answers to prompts, following the company's labelling instructions; Karpathy's figure is about 100,000 high-quality conversations, chosen for quality over quantity [@karpathy-intro-llms]. Training on these teaches the format of an assistant. Pretraining optimises for completion, and a completion is often unhelpful: asked "teach me how to make a resume", a raw model might answer "using Microsoft Word" [@ibm-rlhf-explained].

**Stage three: [[rlhf]], reinforcement learning from human feedback.** The model writes several answers to one prompt and people pick the better one, which is far easier than writing an ideal answer [@karpathy-intro-llms]. Pairs work better than a 1-to-10 score because raters struggle to agree on what a given score means. The comparisons train a reward model that turns preference into a score, and the chatbot is trained to earn high scores [@ibm-rlhf-explained].

==Every stage rewards an answer that reads well to the people and tests doing the grading. None of them checks the answer against the world.==

::: concept Fine-tuning
**Plain words.** More training on a smaller, chosen set of examples, after pretraining. The word is used for two different jobs. Karpathy uses it for the step that turns a document completer into an assistant: it changes format and behaviour [@karpathy-intro-llms]. IBM's explainer uses it for specialising a model in a domain, so that its vocabulary and style become "part of the model's weights" [@ibm-rag-vs-finetuning].

**Analogy.** Pretraining makes a graduate who has read the whole library. Fine-tuning in the first sense is induction week, where they learn how the firm writes. In the second sense it is a posting in the healthcare practice.

**Misconception.** "Fine-tune the model on our documents and it will know our facts and stop making things up." The sources disagree on how much factual knowledge fine-tuning adds; IBM's own explainer ends by combining it with documents supplied at question time [@ibm-rag-vs-finetuning]. Neither meaning removes the incentive to guess. When someone in a meeting says "fine-tune", ask which job they mean.
:::

## Why guessing wins

In September 2025, Adam Tauman Kalai and three co-authors set out why models make things up and why the problem survives better training [@kalai-why-lms-hallucinate]. Their argument fits in five steps.

::: principle Why a trained model guesses
1. Pretraining rewards the next token that best fits the patterns in the text. It does not reward truth directly.
2. Some things follow consistent patterns, such as spelling. Others are arbitrary, low-frequency facts: a pet's birthday, the title of one dissertation. These "cannot be predicted from patterns alone" [@openai-why-lms-hallucinate].
3. If a model cannot tell a false statement of that kind from a true one, the pressure of pretraining will produce false ones. Kalai and colleagues call these "errors in binary classification" [@kalai-why-lms-hallucinate].
4. Later training and public leaderboards grade answers mostly on accuracy. "I don't know" scores zero, the same as a wrong answer. A guess sometimes scores [@kalai-why-lms-hallucinate].
5. A model trained and ranked this way learns to guess fluently whenever it lacks the fact. In the authors' words, models are "optimized to be good test-takers" [@kalai-why-lms-hallucinate].
:::

OpenAI's plain-language summary uses the birthday example. Guess a stranger's birthday and you have a 1-in-365 chance of being right; leave it blank and you are certainly scored zero. Over thousands of questions the guesser climbs the leaderboard. The same post reports that when a widely used chatbot was asked for the title of Kalai's PhD dissertation, it gave three different answers, and none was correct [@openai-why-lms-hallucinate].

::: concept Hallucination
**Plain words.** A fluent, confident output that is false or unsupported: a citation, quote, figure or person that does not exist. It comes out of the same next-token process as a correct answer, which is why it carries the same confident tone.

**Analogy.** A viva candidate who never read the paper and answers anyway, in the cadence of someone who has.

**Misconception.** "A confident, detailed answer is more likely to be right." Detail and confidence are what training rewards. Karpathy, looking at his own model's output, says you are never quite sure whether it is a correct answer or a hallucination [@karpathy-intro-llms]. Precision is a style, so check it like any other claim.
:::

## The scoreboard problem

OpenAI's post includes a table from its own fact quiz, SimpleQA, comparing two of its models [@openai-why-lms-hallucinate]. The older o4-mini almost never declines to answer; gpt-5-thinking-mini declines about half the time.

{{figure confidently-wrong-scoreboard | Two models on the same fact questions. The one that guesses gets slightly more right and far more wrong. "Abstained" means the model said it did not know. | OpenAI, "Why language models hallucinate" (Sep 2025), SimpleQA table}}

::: stat 75%
Error rate of OpenAI's o4-mini on SimpleQA fact questions, with 1% [[abstention]] and 24% accuracy. gpt-5-thinking-mini declined 52% of the time, answered 22% correctly and was wrong 26% of the time. Ranked on accuracy alone, the model that is wrong three times as often comes first.
<span class="src">Source: [@openai-why-lms-hallucinate]</span>
:::

==When you read an accuracy figure for an AI tool, ask for two more numbers: how often it was wrong, and how often it said "I don't know".== A tool that declines half the questions at least tells you where to look things up yourself. Kalai and colleagues call the fix "socio-technical": rescore the existing leaderboards so that a confident error costs more than an honest blank [@kalai-why-lms-hallucinate]. OpenAI's post makes the same point with negative marking in standardised tests [@openai-why-lms-hallucinate]. Until the main scoreboards change, the incentive to guess remains.

## How often, and where it bites

The rate depends heavily on the task, which is why a single "hallucination rate" for a model means little.

**Recalling specific facts is the weak spot.** Matthew Dahl and colleagues asked models specific, checkable questions about randomly chosen US federal court cases. The models hallucinated between 58% of the time (ChatGPT 4) and 88% of the time (Llama 2). They also tended to accept a user's wrong assumption without correcting it [@dahl-large-legal-fictions]. These were 2023 models; the lesson that lasts is the kind of task. Obscure, specific facts are where guessing happens.

**Summarising a document you supply is safer, though still imperfect.** Vectara, which sells retrieval tools, runs a public leaderboard that checks whether a model's summary of a given article adds claims the article lacks. In its 22 October 2026 update the best model did so in 1.8% of summaries; gpt-4.1, gemini-2.5-pro and claude-opus-4-5 scored 5.6%, 7.0% and 10.9% [@vectara-hallucination-leaderboard]. It is one vendor-run benchmark. Grounding a model in a document cuts invention; chapter 5 builds on this.

**Professionals have already paid for it.** In June 2023 a US federal judge, P. Kevin Castel, fined two lawyers, Peter LoDuca and Steven Schwartz, and their firm $5,000 in *Mata v. Avianca* for filing a brief that cited cases ChatGPT had invented. He found bad faith, and ordered them to notify their client and each judge falsely named in the fake cases [@lawnext-mata-sanctions]. By October 2026 the researcher Damien Charlotin, who tracks such court decisions, had logged 2,246 cases worldwide, 1,517 of them in the US, including some where AI use is alleged but not proven [@charlotin-hallucination-cases].

::: myth
**Myth.** Newer, higher-scoring models have stopped hallucinating, so the checking habit is for last year's tools.

**Reality.** Error rates fall, but the incentive to guess is built into how models are trained and ranked [@kalai-why-lms-hallucinate]. A model can climb an accuracy leaderboard while being wrong more often [@openai-why-lms-hallucinate], and rates vary several-fold by task [@vectara-hallucination-leaderboard]. Check the task you are doing, at the rate you can tolerate.
:::

## When it reaches a client

In 2025 the risk arrived inside a consulting deliverable. Deloitte Australia wrote an AU$440,000 review of the Targeted Compliance Framework, part of the welfare system, for the Department of Employment and Workplace Relations, published on 4 July 2025 [@willison-deloitte-refund]. Dr Christopher Rudge of the University of Sydney found more than a dozen references to works that do not exist, and a made-up extract from a court judgment in the robo-debt litigation [@register-deloitte-dewr].

A corrected version, dated 26 September 2025, disclosed that a generative AI toolchain built on Azure OpenAI GPT-4o had been used [@willison-deloitte-refund] [@register-deloitte-dewr]. Deloitte agreed to repay the final instalment of its fee. The department said the report's findings and recommendations were unchanged. Deloitte did not say that AI caused the errors [@register-deloitte-dewr].

==For a client, the source of an invented citation does not matter; the firm's name is on the report.== A placement interviewer at a consulting firm is screening for exactly this reflex.

## Bias enters at the same stages

**Pretraining copies the text it learns from.** Khyati Khandelwal and colleagues built Indian-BhED, a test of caste and religion stereotypes in India. Most models they tested showed a "strong propensity to output stereotypes in the Indian context", stronger than the gender and race biases studied in Western settings. GPT-2, GPT-2 Large and GPT-3.5 chose the stereotypical option in 63% to 79% of caste sentences and 69% to 72% of religion sentences [@khandelwal-indian-bhed]. These are older models. Read the study for where bias comes from, which is web text; it does not score today's chatbots.

**Fine-tuning and feedback add the raters' views.** IBM's explainer lists the limits of human feedback: raters disagree, there is no ground truth, and feedback from a narrow group of people can make the model perform worse for other groups, or on topics where those raters hold biases [@ibm-rlhf-explained].

==Bias and invented facts enter at the same points: the text a model learned from and the people who graded it.== For a use case in India, ask who wrote the training text, in which languages, and who did the grading. Then test on your own population before launch.

::: concept RLHF
**Plain words.** Reinforcement learning from human feedback. People compare pairs of answers, a reward model learns their preferences, and the chatbot is trained to produce answers that score well.

**Analogy.** A trainee coached only by one senior partner's reactions learns to please that partner, blind spots included.

**Misconception.** "Human feedback means humans checked the facts." Raters pick the answer they prefer, and the reward model learns whatever they rewarded. Preferring an answer is a different act from checking each of its claims [@ibm-rlhf-explained].
:::

::: case Illustrative · The market size that came with a report
#### The situation
An analyst at a mid-size Gurugram consultancy is building a market-entry deck for a health insurer eyeing tier-2 cities. Late at night she asks a chatbot for the size of the tier-2 health-insurance market and a source. It returns a precise figure, a growth rate to one decimal place, and an industry report title with a named author and year. The partner wants the deck by 9 a.m. Everything in this case is constructed.

#### The decision
She asks three questions. Could the model have learned this reliably? A market size for one sub-segment appears in few documents, if any: the arbitrary, low-frequency kind of fact where models guess. Does the precision prove anything? No; the decimal place is a learned style. Does the source exist? She searches for the title and the author's publications and finds nothing. The report was invented along with the number.

She turns to sources she can open, the insurance regulator's annual report and company filings, and builds a top-down estimate from policies and premiums with each assumption on the slide. Her range is wider than the chatbot's figure, and she can defend it in front of the client.

#### Your move
Write the two-line note you would leave for the partner explaining why the deck's number differs from the "official-looking" one in the chat history. Then write the rule your team should adopt for any AI-supplied number: who opens the source, and who signs off.
:::

::: lens consulting
Treat AI output like a first-year analyst's draft: useful, fast and unverified. Any number, quote or citation that goes into a client deliverable needs a source a human has opened, and a named owner who checked it. When a client cites a vendor's accuracy figure, ask for the error rate and the abstention rate on a task like theirs.
:::

::: lens finance
Banks and NBFCs know model risk from credit scoring. A generative model summarising loan-officer notes adds two failure modes: it can insert a detail the notes never held, and it can carry stereotypes from its training text into how it describes a borrower. Test summaries against the notes, on a sample covering your customer groups, before any credit use, and keep a person accountable for each decision.
:::

::: interview The number in the deck
**Q.** A partner pastes a number a chatbot gave you into a client deck. What do you do before it goes in?

> "I'd treat it as a lead until I have opened the original source; then it goes in with the citation."

**What they are testing.** Whether you know why models invent specifics, and whether you will protect the firm and raise the issue with a senior person politely.

**A strong structure.** Why it can be wrong: models are trained and graded to guess fluently, and a single market figure is exactly what they guess at → verify: get the source, open it, check number, date and definition → no source: rebuild the estimate from data you can cite, as a range with assumptions → raise it with the partner as protecting the client, citing a public case such as Deloitte Australia's 2025 report → propose a rule: every AI-supplied number has an opened source and a named checker.
:::

::: try Catch a model guessing
No code needed. In ChatGPT, Claude or Gemini, ask for something specific and obscure in a field you know:

```
List three published reports on the size of India's
tier-2 city health-insurance market. For each, give the
title, author or publisher, year and a link.
```

Open every link and search every title. Count how many exist. Then, in a new chat, ask again and add: "If you are not sure a report exists, say so." Compare. If the tool has web search, try a third time with it on.
:::

{{watch ibm-rlhf-explained}}

Watch 0:00 to 1:10, then 4:12 to the end (about 8 minutes). The opening shows one question answered with and without feedback training; from 9:20 the limits are this chapter's bias argument. Skip 1:12 to 4:12 (reinforcement-learning vocabulary).

{{read openai-why-lms-hallucinate}}

About eight minutes. Read it for the exam analogy, the scoreboard table and the closing list of misconceptions.

{{watch ibm-rag-vs-finetuning}}

Optional. Watch from 2:30 for the second meaning of fine-tuning, specialisation.

::: check Check yourself
1. Name the three stages that turn a text predictor into a chat assistant, and say in a few words what each one adds. <span class="lvl">recall</span>
2. Explain to a non-technical client why a chatbot invents a citation in the same confident tone it uses for a correct one. <span class="lvl">explain</span>
3. A vendor says its research assistant is "92% accurate on our benchmark". Write the three questions you would ask before recommending it. <span class="lvl">apply</span>
4. A client's IT head says, "We'll fine-tune the model on our policy documents, so it will stop making things up." What is right and what is risky in that plan? <span class="lvl">transfer</span>
5. An HR team wants a chatbot to write first-round feedback on candidates from across India. Where could bias enter, and what would you require before launch? <span class="lvl">judge</span>
:::

::: answers
1. Pretraining: next-token prediction over huge amounts of text, giving fluency and broad patterns. Fine-tuning: training on written ideal answers, giving the assistant format and behaviour. RLHF: people compare answers and the model is trained towards the preferred ones.
2. At every step the model writes a likely next token, and nothing checks the world. A citation has a recognisable shape, so the model can produce one that looks right. Training and grading reward answering over "I don't know", so the invented citation comes out as fluently as a real one.
3. How often is it wrong, separately from how often it is right? How often does it decline, and how is that scored? Was the benchmark built from tasks like ours, and who ran it? (Also fair: can we test it on 50 of our own questions?)
4. Right: fine-tuning can teach the client's terms, tone and format. Risky: sources disagree on how much factual knowledge it adds, it leaves the incentive to guess in place, and policies change, so facts trained into the weights go stale. For facts, supply the current documents at question time and check answers against them.
5. Pretraining text carries stereotypes, including caste and religion in the Indian context, and a narrow rater pool can skew answers. Before launch: test on matched candidate profiles that differ only by name, region or gender; compare outputs across groups; keep a person accountable for every decision; give candidates a route to challenge it.
:::

::: recap The night-before page
1. A chatbot is made in three stages: pretraining (predict the next token over web text), fine-tuning (learn the assistant format from written examples) and RLHF (people compare answers; the model is trained towards the preferred ones).
2. None of these stages checks answers against the world. Training and accuracy-only scoreboards reward a guess over "I don't know", so models guess fluently on facts they lack (Kalai et al. 2025).
3. Judge an accuracy figure with two more numbers: error rate and abstention rate. On SimpleQA, o4-mini was 24% right but 75% wrong; gpt-5-thinking-mini was 22% right, 26% wrong, 52% abstained.
4. Rates vary by task: recalling obscure facts is worst (58–88% on legal questions, 2023 models); summarising a supplied document is far lower. A public database lists 2,246 court cases with AI fabrications (Oct 2026); Deloitte Australia agreed to repay part of a fee in 2025.
5. Bias enters at the same stages, through the training text and the raters (Indian-BhED: strong caste and religion stereotypes in older models). For any client use: an opened source, a named checker, a test on your own population.
:::
