---
id: what-is-a-model
title: What is a model, really?
deck: Every AI conversation in a placement interview rests on one idea. Get it in your bones and the rest of this book becomes reasoning, not memorisation.
level: Zero to one
tracks: [foundations, consulting, marketing, operations]
hook: Your food-delivery app's ETA is a guess. So is every word ChatGPT writes. Explain, in one sentence, what the two guesses have in common.
objectives:
  - "**Define** a model as a learned rule from inputs to outputs, without using the word \"algorithm\"."
  - "**Distinguish** training from inference, and explain why one costs crores and the other costs paise."
  - "**Explain** a large language model as the same idea as a delivery-time model, at a different scale."
  - "**Spot** the three questions to ask before trusting any model a client wants to buy."
sample: true
---

Before the word "AI" meant anything to you, you were already surrounded by models. The cricket commentator who says a target of 180 is "par on this pitch" is running one. So is the shopkeeper who orders more milk before Diwali. ==A model is a rule that turns what you know into a guess about what you don't.== Everything in this book, from chatbots to credit scoring, is a version of that sentence.

This chapter builds the idea from nothing. We will start with a rule you could write on a napkin, make it learn from data, and then scale it up until it is a large language model. At no point will you need mathematics beyond multiplication.

## A model is a compressed rule

Take a delivery app predicting how long your order will take. The app knows a few things at the moment you order: the distance to the restaurant, the time of day, whether it is raining. It does not know the one thing you care about, which is when the food arrives. A model is the bridge between the two.^[A **forecast**, a **score** and a **recommendation** are all the same object: a model's output. Only the business use differs.]

The simplest bridge is a line. Suppose that, looking at last month's orders, every extra kilometre added roughly four minutes. You could write the rule as:

*delivery time = 12 minutes + 4 × distance in km*

That is a model. The numbers 12 and 4 are its [[parameter|parameters]]: the knobs that make this rule fit this city. Change the city and the knobs change; the shape of the rule stays.

::: principle Build it from zero
1. We want a number we cannot see yet (delivery time) from numbers we can see now (distance).
2. Pick a rule with adjustable knobs: *time = a + b × distance*.
3. Guess the knobs, check the guess against real past orders, and measure how wrong it was.
4. Nudge the knobs in whichever direction reduces the error. Repeat thousands of times.
5. What you are left with is a rule that summarises thousands of orders in two numbers. A model is a compression of experience into parameters.
:::

{{figure fit-line | Each dot is a past order. Training is the search for the line that misses the dots by the least. The line *is* the model; its slope and starting point are its two parameters. | Illustrative data}}

## Training and inference are different businesses

The process of nudging the knobs is called [[training]]. Using the finished rule on a new order is called [[inference]]. The distinction sounds academic. ==It is the single most important cost fact in AI economics.==

Training is done once, or occasionally, and it is expensive because the model has to look at every example many times. Inference is done every time anyone uses the model, and each use is cheap. For our two-parameter line, both are trivial. For a frontier language model, training runs into hundreds of crores of compute; a single answer costs a fraction of a rupee.^[The Stanford AI Index tracks both numbers year by year [@stanford-ai-index]. Quote it, not the press coverage of it.]

| | Training | Inference |
|---|---|---|
| What happens | Knobs are set from examples | Set knobs are used on a new input |
| How often | Once, then periodic refreshes | Every query, millions of times a day |
| Cost shape | Large, upfront, fixed | Small, per use, variable |
| Business analogy | Building the factory | Running the production line |

::: concept Model
**Plain words.** A rule, learned from examples, that turns an input into a guess about an output.

**Analogy.** A seasoned credit officer who has seen ten thousand loan files. They cannot recite every file, but the files have shaped their judgement. The judgement is the model.

**Misconception.** "The model looks up the answer." It does not. After training, the examples are gone; only the parameters remain. This is why a model can be confidently wrong about something it has never seen.
:::

## From two knobs to billions

A delivery-time model with two parameters can only learn a straight line. Give it more inputs (rain, traffic, restaurant prep time) and more knobs, and it can learn a more detailed rule. Give it millions of knobs arranged in layers, and it can learn rules no human could write down, such as "what does a cat look like" from raw pixels.

A [[llm|large language model]] is this same machine, pointed at text. Its input is all the text so far. Its output is a guess about the next [[token]], the next small piece of a word. It has billions of parameters, set by training on a vast amount of written text. When you ask it a question, it guesses one token, appends it, and guesses again, token after token, until it has written an answer.

::: pull
All models are wrong, but some are useful.

George E. P. Box, statistician
:::

That loop is the whole trick. ==There is no separate "understanding" module and no database of facts; there is one very large rule for continuing text.== The surprise of the last few years is how much useful behaviour falls out of continuing text well. Writing a good continuation of a question about a balance sheet requires something that looks a lot like reasoning about the balance sheet.

{{watch karpathy-intro-llms}}

{{watch 3b1b-neural-network}}

::: myth
**Myth.** An LLM searches the internet or a database for the right answer, then rewrites it.

**Reality.** A plain LLM generates every answer token by token from its parameters. Some products add a search step on top, but the model itself retrieves nothing. That is why it can invent a citation that looks perfect.
:::

## Three questions before you trust any model

Because every model is a compression of past examples, three questions expose most of its risk. Use them in any case interview where a client wants to "use AI".

1. **What examples was it trained on?** A model is only as good as the experience it compressed. A delivery model trained in dry Bengaluru will be wrong in a Mumbai monsoon.
2. **What happens when it is wrong?** A bad song recommendation costs nothing. A bad credit decision costs money and invites the regulator. Error cost decides how much human review you need.
3. **Has the world changed since training?** Models learn the past. If prices, customers or rules have shifted, the model is describing a world that no longer exists.^[Statisticians call this *distribution shift*. You do not need the term in an interview; you need the question.]

::: stat 40%
Higher quality output from BCG consultants using GPT-4, on tasks inside the AI's capability. On a task designed to sit outside it, AI users were 19 percentage points *less* likely to get the right answer.
<span class="src">Source: [@hbs-jagged-frontier]</span>
:::

The BCG experiment is worth knowing by heart, because it shows the third question in action. AI made consultants faster and better on tasks it was good at, and worse on a task that looked similar but needed judgement it lacked. The researchers called the boundary between the two a *jagged frontier*: you cannot see where it is from the outside.

{{read mollick-centaurs}}

::: case Illustrative · A quick-commerce dark store
#### The situation
A 10-minute delivery company stocks each dark store from a demand forecast, a model that predicts tomorrow's sales of each item from past sales, weather and day of the week. Waste on fresh items is running at 9% and the category head wants "a better AI model".

#### The decision
Before buying a bigger model, ask the three questions. What was it trained on? Two years of data, including lockdown months that no longer describe demand. What happens when it is wrong? Over-forecasting milk is waste; under-forecasting is a lost order and a churned customer, and those costs are not equal. Has the world changed? A competitor opened next door in March.

#### Your move
The fix may be cheaper than a new model: drop the stale months from training, and change the target from "most likely demand" to "the stock level that balances the cost of waste against the cost of a stockout". That is a business decision, not a technical one, and it is exactly the kind of decision recruiters want you to be able to make.
:::

::: lens consulting
Clients rarely ask "should we build a model?" They ask "where can AI cut cost?" Translate it: which decisions are made often, on data we already have, where a wrong guess is cheap? That set is where models pay back first.
:::

::: lens marketing
Every targeting, churn and lifetime-value score you will use is a model. Ask what it was trained on before you trust a segment it hands you.
:::

::: lens operations
Demand forecasting is the oldest business model of all. The new tools change the inputs (text, images, weather feeds), not the logic of trading off waste against stockouts.
:::

::: interview Guesstimate meets AI
**Q.** A mid-size NBFC wants to "use AI for loan approvals". You have two minutes. Where do you start?

> "Before the model, the decision: what does a wrong approval cost versus a wrong rejection, and how many decisions a day are we talking about?"

**What they are testing.** Whether you treat AI as a business decision with error costs, or as magic.

**A strong structure.** Decision and volume → cost of each kind of error → data the NBFC already has → regulatory constraints on explaining a rejection → start with human-in-the-loop on the riskiest band.
:::

::: try Watch a model guess
Open any chat assistant and paste this three times, in three new chats:

```
Complete this sentence with exactly five more words, nothing else:
"The best thing about Indian monsoon is"
```

You will probably get different endings. The model is sampling from its guesses about the next token, not retrieving a fixed answer. Now ask it why it chose its ending, and notice that the explanation is also just more generated text.
:::

{{read wolfram-chatgpt}}

::: check Check yourself
1. In one sentence, without the word "algorithm", what is a model? <span class="lvl">recall</span>
2. A model has been trained. Is answering one customer query training or inference? Which one dominates the cost of a free chatbot with 10 crore users? <span class="lvl">apply</span>
3. Why can an LLM produce a convincing but invented citation? Use the word "parameters" in your answer. <span class="lvl">explain</span>
4. A bank's fraud model was trained before UPI took off. Which of the three trust questions is most urgent, and why? <span class="lvl">transfer</span>
5. Give one business decision where you would *not* let a model act without a human, and say what makes the error cost high. <span class="lvl">judge</span>
:::

::: answers
1. A rule, learned from past examples, that turns information you have into a guess about something you don't.
2. Inference. For a heavily used product, inference costs, paid on every query, can exceed the one-time training cost.
3. Its parameters store patterns of text, not a list of sources. It generates a string that has the shape of a citation without retrieving one.
4. "Has the world changed since training?" Payment behaviour shifted after UPI, so the model is describing old fraud patterns.
5. Any decision with a high or irreversible error cost, such as rejecting a loan or a medical triage call, especially where you must explain the decision to a regulator.
:::

::: recap The night-before page
1. A model is a learned rule: inputs you have → a guess about an output you don't.
2. Parameters are the knobs; training sets them from examples; the examples are then discarded.
3. Training is the factory (big, upfront); inference is the production line (small, per use).
4. An LLM is a next-token guesser with billions of parameters. Useful behaviour comes from guessing text well.
5. Before trusting any model ask: trained on what, costly when wrong how, and has the world changed?
:::
