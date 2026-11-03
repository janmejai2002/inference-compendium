---
id: delegation-brief
title: "A prompt is a delegation brief"
deck: "Instructions, context, examples and iteration. The AI labs and their sharpest critic agree on a short checklist, and disagree about the magic words. This chapter gives you the checklist and the evidence for dropping the magic."
level: Zero to one
tracks: [foundations, consulting]
hook: "Two associates give the same AI tool the same 300 distributor complaints. One writes 'You are a world-class supply-chain consultant. I will tip you ₹10,000. Summarise these.' The other writes six plain lines a new joiner would need. Which output can go to the client on Monday, and which of the first associate's extra words did any work?"
objectives:
  - "**Explain** why a model can only work with what the prompt gives it, using the next-token loop from chapter 2."
  - "**Write** a six-part delegation brief for a business task: goal, audience, context, example, format, doubts."
  - "**Distinguish** practices that controlled tests support from prompting folklore that they do not."
  - "**Judge** a claim that some phrase improves answers, by designing a simple test of it."
---

On your first day at a firm, a manager stops at your desk: "Can you pull together something on the distributor issue?" You nod, and spend an evening guessing. Which distributors? Something for whom? A slide, an email, a spreadsheet? By the next morning you have produced a careful answer to a question nobody asked. Every manager has given a brief like that, and every new joiner has received one. An AI tool receives one every time you type a lazy request. ==A prompt is a delegation brief, and the model is a capable new joiner who knows nothing about your client, your boss or your deadline except what the brief says.==

The framing comes from the labs that build the models. It also tells you what to ignore: the "magic phrases" that circulate on social media, several of which researchers have now tested and found to give close to no average gain.

## Why the brief is all the model has

Chapter 2 showed that a large language model writes by predicting the next token, again and again, from the text so far. Follow that one fact through and the importance of the brief falls out.

::: principle Build it from zero
1. The model continues text. At each step it picks a likely next token given everything in front of it: its training, plus the [[prompt]] you wrote.
2. Its training holds patterns from a vast amount of public text. It holds nothing about your client's distributors, your partner's preferences or what Monday's review needs.
3. When the prompt leaves something out, the model still has to pick a next token. It fills the gap with what is most likely across all the text it has seen, which is the generic, average answer.
4. "Summarise these" gives it a task and no goal, reader, format or standard. Every one of those is filled with the average.
5. Whatever you leave out of the brief, the model fills with an average guess. The quality of the output is capped by what the brief supplies.
:::

So a vague prompt gets a fluent, plausible, useless answer. The fix is the one you would apply to a human: say what you want, why, for whom, from what material, in what shape.

## What the labs tell you to do

Three of the biggest model makers publish prompting guides, and the guides agree closely.

Anthropic's guide opens with the analogy this chapter is named after: "Think of Claude as a brilliant but new employee who lacks context on your norms and workflows. The more precisely you explain what you want, the better the result." It then gives a test any manager can run: "Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too." [@claude-prompting-best-practices]

OpenAI uses the same employee analogy and splits it by model type. "A reasoning model is like a senior co-worker. You can give them a goal to achieve and trust them to work out the details." A standard GPT model "is like a junior coworker" that performs best "with explicit instructions to create a specific output." Its guide structures a prompt as identity, instructions, examples and context, and asks for few-shot examples that "cover a range of possible inputs" [@openai-prompt-engineering].

Google's Gemini guide lists the same ingredients: "clear and specific instructions", context that "helps the model understand the constraints and details", and examples. It says "We recommend to always include few-shot examples", and adds that the work takes repeats: "Prompt design can sometimes require a few iterations before you consistently get the response you're looking for." [@gemini-prompt-strategies]

Anthropic adds two points. Its overview assumes that before you tune a prompt you already have "a clear definition of the success criteria" and "some ways to empirically test against those criteria" [@anthropic-prompt-overview]. And its AI Fluency course, after six tips on context, examples, constraints, steps, thinking and role, warns that "as models improve, some specific techniques become less necessary", while the principles of good communication stay [@anthropic-fluency-prompting].

::: concept Delegation brief
**Plain words.** The set of things a capable newcomer needs to do a task well: the goal and why it matters, who the output is for, the material to work from, an example of good work, the shape of the output, and what to flag. A good prompt contains the same things.

**Analogy.** The note you leave for a strong intern before you board a flight and go offline. You cannot answer questions mid-task, so everything they need has to be on the page.

**Misconception.** "A good prompt is a clever sentence." A good prompt is usually longer and plainer than a bad one. Its value is in the information it carries, and the phrasing matters much less.
:::

One ingredient has its own name. [[few-shot|Few-shot examples]] are a handful of worked input-and-output pairs pasted into the prompt: to get 300 complaints coded into causes, show two complaints already coded the way you want.

## The other side: tricks do not travel

Not everyone treats prompting as a craft worth learning. Ethan Mollick, a Wharton professor who studies AI at work, wrote in 2023 that "a lot of prompting tips are more magic ritual than useful, repeatable tips", that "being 'good at prompting' is a temporary state of affairs", and that the best way to use AI is "to use it interactively" rather than to craft the perfect prompt [@mollick-prompting-guide]. In a 2026 interview he went further. It once mattered whether you told the model it was a physicist, asked it to think hard or offered it a bribe: "None of that matters anymore. The models have gotten good enough that if you're good at giving instructions like a human to humans, you probably do okay with this." [@mollick-sinek-skills]

Mollick and colleagues at Wharton's Generative AI Labs also tested the folklore, in a series called the Prompting Science Reports. Their method is worth learning because it is the method you will need in an interview. They take a fixed set of hard questions with known answers, ask each one many times under each prompt variant, and compare accuracy. That fixed question set is an [[eval]].

**Report 3: tips and threats.** Five models answered the 198 PhD-level questions of the GPQA Diamond benchmark and 100 engineering questions from MMLU-Pro, 25 times each. Prompts offered tips from $1,000 to $1 trillion or made threats, such as kicking a puppy. The authors set out to test a claim Sergey Brin made in May 2025 that threatening models helps. Tips and threats "produced no meaningful improvements in overall accuracy" [@wharton-psr3].

**Report 1: politeness.** GPT-4o and GPT-4o mini answered the 198 GPQA questions 100 times each. "Please" against "I order" made differences on single questions that washed out when averaged, "dwarfed by overall model characteristics". One change did matter: removing the explicit instruction on answer format "consistently led to performance degradation" for both models. The authors caution that results like these vary by model and setting [@wharton-psr1].

**Report 2: "think step by step".** Asking a model to reason in steps, called [[chain-of-thought|chain of thought]], used to be the most famous trick. For [[reasoning-model|reasoning models]], which already think before answering, it "often results in only marginal, if any, gains" while it "significantly increases the time and tokens" needed. For other models the average gain was small and results varied more [@wharton-psr2].

::: stat +36 / −35
Percentage points. The most that a change of wording alone moved accuracy on a single question in Report 3, up on one question and down on another, while the average across the full question set barely moved. One impressive example proves nothing about a phrase.
<span class="src">Source: [@wharton-psr3]</span>
:::

That swing is the trap. Someone tries a flattering opener, gets a much better answer once, and posts it as a rule. On the next question the same opener may make things worse. Only many runs over many questions show the truth.

{{figure delegation-brief-checklist | The brief and the folklore. The six parts on the left appear, in different words, in the Anthropic, OpenAI and Google guides. The phrases on the right showed no reliable average gain in the Wharton tests. | Sources: Anthropic, OpenAI, Google prompting guides; Wharton Prompting Science Reports 1 to 3}}

Put the two sides together and the dispute is smaller than it looks. Nobody in this debate argues against a clear goal, real context, an example, a stated format or a second attempt; Report 1 even found the format instruction mattered. ==The evidence backs the information a competent colleague would need, and gives no support to incantations.== That is why Mollick's advice and Anthropic's analogy end up in the same place: brief the model the way you would brief a person.

::: myth
**Myth.** Magic phrases make AI work harder: flattery ("you are a world-class strategist"), tips, threats, "please".

**Reality.** In Wharton's tests, tips and threats gave no meaningful average gain across five models, and politeness washed out when averaged [@wharton-psr3] [@wharton-psr1]. Single questions moved a lot in both directions, which is why anecdotes are so convincing and so unreliable.
:::

::: myth
**Myth.** Prompting is dead, so the wording of a request no longer matters.

**Reality.** What faded is the folklore. Context, examples and a stated format are what every lab guide still asks for, and dropping the format instruction hurt accuracy in Report 1 [@wharton-psr1]. A better model needs fewer tricks; it still cannot read your client file unless you paste it in.
:::

## The checklist

Six parts, each one a question the model cannot answer for itself.

1. **Goal, and why.** The why lets the model choose what to emphasise.
2. **Audience.** Who reads it and what they already know. A board wants three lines; an analyst wants the working.
3. **Context, pasted in.** Data, notes, constraints, in a clearly labelled block so the model can tell instructions from content.
4. **One example.** Two or three lines showing what good looks like.
5. **Output format.** Table, length, column names, order of sections. A format you can check row by row is one you can trust faster.
6. **Flag your doubts.** "Mark anything you are unsure of, and say what you assumed." You need those gaps for the review.

Then the step the checklist cannot replace: read the output against your goal and revise the brief. Anthropic's course calls prompting "iterative and experimental", suggests asking "How confident are you about this answer?", and notes that starting a fresh chat sometimes beats correcting one that has gone off track [@anthropic-fluency-prompting]. The model drafts; you decide what goes to the client.

::: case Illustrative · Three hundred distributor complaints
#### The situation
A Pune packaged-snacks company has 300 free-text comments from distributors about late deliveries. The head of supply chain wants the main causes before Monday's review. An associate pastes the comments into a chat tool and types: "Summarise these." The reply is four smooth paragraphs about "various logistics challenges". Every word is plausible; none of it can be counted, checked or acted on. The company, comments and outcome are constructed for this exercise.

#### The decision
The associate rewrites the request as a brief, same model, same data:

- Goal: rank the root causes of late deliveries so the supply-chain head can pick two to fix this quarter.
- Audience: senior operations people who know the network and want evidence, not adjectives.
- Context: the 300 comments, pasted between the lines "COMMENTS START" and "COMMENTS END". Plants are in Pune and Nagpur; distributors are across Maharashtra and Karnataka.
- Example: "Truck left Nagpur two days late, no call from depot" → cause: dispatch delay at plant; region: Nagpur.
- Format: a table with columns cause, number of comments, one verbatim quote; then three lines on what the table suggests.
- Doubts: "Put any comment you could not classify under 'unclear' and do not guess."

The output is a table the associate can audit. She picks ten rows, reads the underlying comments, and finds two misclassified, so she adds a second example covering that pattern and runs it again. The counts are now something she can defend in the review.

#### Your move
Before the table reaches the supply-chain head, decide what you would check. A sensible minimum: re-count the top cause by hand on a sample, confirm every quote appears word for word, and read the "unclear" pile yourself.
:::

## Where this shows up at work

::: lens consulting
Consulting has always run on briefs: a partner frames the question, an associate does the work, a manager reviews it. AI adds a new junior to that chain, and the skill being tested is the old one of framing the work and judging what comes back. McKinsey has piloted graduate interviews in which candidates work with its in-house AI tool, Lilli [@ft-mckinsey-lilli-interview]. Field evidence explains why judgment counts as much as the brief: in the BCG experiment with 758 consultants, AI users did better on tasks inside the AI's competence and were 19 percentage points less likely to be correct on a task outside it [@dellacqua-jagged-orgsci]. A good brief gets you a better draft; it cannot tell you whether the draft is right.
:::

::: lens finance
In lending, the brief is also a control. A credit-memo instruction should name the credit policy, the data fields and their source, the required sections, and a rule to flag any missing or inconsistent figure. The signature stays with a credit officer, so the brief should make the draft easy to check.
:::

::: interview The world-class strategist
**Q.** A junior colleague says that starting every prompt with "You are a world-class strategist" improves the answers. How would you find out whether that is true?

> "I would not argue from one good answer. I would run a small test: the same set of real questions, with and without the opener, several times each, scored against a standard we agree on in advance."

**What they are testing.** Whether you know that model outputs vary from run to run, that single examples mislead, and whether you can design a cheap, fair comparison. Also whether you know the published evidence without overclaiming it.

**A strong structure.** Define "better" first (accuracy against known answers, or a scoring rubric for open tasks) → build a fixed set of 20 to 30 typical questions from real work → run each with and without the opener, several times, since answers vary → compare averages and look at how many questions got worse, not only which got better → cite the direction of published tests: Wharton found tips, threats and politeness gave no meaningful average gain, while single questions swung widely → conclude with a rule: keep a phrase only if it wins on your own task, and put the effort into goal, context, examples and format, which every lab guide recommends.
:::

::: try Brief versus one-liner
No code. Use ChatGPT, Claude or Gemini. Take a real piece of text you have: meeting notes, a long email thread, 20 customer reviews of a product you like. First, paste it in with a one-line request:

```
Summarise this.
```

Start a fresh chat and paste the same text with a brief:

```
Goal: I need the three issues that most need a decision, so my manager can pick one to act on this week.
Audience: my manager, who knows the business and has two minutes.
Material: between the lines START and END below.
Example of the style I want: "Late invoices from two vendors: blocks month-end close. Decision needed: escalate or wait."
Format: three bullet points in that style, then one line on what you left out.
Doubts: mark anything you are unsure of, and do not invent figures.
START
[paste your text here]
END
```

Compare the two answers. Then ask in the second chat: "What did you assume that I did not tell you?" Its list is the gap in your brief.

Optional: save the six-part checklist as a Custom GPT or a Gemini Gem called "Brief Checker", instructed to ask you for any missing part before it starts a task.
:::

{{watch anthropic-fluency-prompting}}

{{read wharton-psr3}}

{{read claude-prompting-best-practices}}

::: check Check yourself
1. Name the six parts of a delegation brief. <span class="lvl">recall</span>
2. Using the next-token loop, explain why "Summarise these" tends to produce a generic summary. <span class="lvl">explain</span>
3. Rewrite this request as a six-part brief: "Make a slide on our competitors." Assume you work for a mid-sized Indian paints company and the slide is for the CEO. <span class="lvl">apply</span>
4. A colleague shows you one chat in which adding "I'll tip you ₹5,000" produced a much better answer. Why is that not evidence, and what would be? <span class="lvl">judge</span>
5. An Indian bank wants GenAI to draft credit memos. What must the instruction to the model contain, and where should a human sign off? <span class="lvl">transfer</span>
:::

::: answers
1. Goal and why; audience; context pasted in; one example; output format; an instruction to flag doubts and assumptions. Then review and revise.
2. The model picks the most likely next token given the text in front of it. With no goal, reader, format or standard in the prompt, each of those is filled with what is most likely across its training text, which is the average, generic answer.
3. One version: goal (show where we are losing share and to whom, to set next year's pricing); audience (CEO, wants one slide); context (paste our share data and recent analyst notes); example (one row: competitor, move, effect on us); format (a five-row table plus a two-line takeaway); doubts (mark any figure not in the pasted material).
4. Outputs vary from run to run, and Wharton found single questions can swing by over 30 points either way while the average barely moves. One chat is one draw. Evidence would be a fixed set of questions run many times with and without the phrase, compared on average accuracy and on how many answers got worse.
5. The credit policy to follow, the exact data fields and their sources, the required sections, the audience (the credit committee), and a rule to flag missing or inconsistent figures instead of filling them. A credit officer reviews and signs every memo; the model drafts and the person decides.
:::

::: recap The night-before page
1. A prompt is a delegation brief: the model is a capable new joiner who knows only what you write down. Whatever you leave out, it fills with an average guess.
2. The labs agree on the checklist: goal and why, audience, context pasted in, one example, output format, and flag your doubts. Then read the output and revise.
3. The folklore does not hold up: Wharton's tests found no meaningful average gain from tips, threats or politeness, and little from "think step by step" on reasoning models.
4. Single questions swing widely (up to +36 and −35 points in Report 3), so one good answer proves nothing. Test a phrase on a fixed question set, many runs, before you trust it.
5. A better brief gives a better draft, never a verified one. The human checks the output and signs off.
:::
