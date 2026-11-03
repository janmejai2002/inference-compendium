---
id: kinds-of-ai
title: Not all AI is ChatGPT
deck: Predictive models and generative models solve different business problems. Pick the wrong one and the project fails before it starts.
level: Zero to one
tracks: [foundations, consulting]
status: draft
hook: "A lender's credit head says: \"We have bought an enterprise ChatGPT licence. Let's use it to decide who gets a loan.\" Before you open a single spreadsheet, what is wrong with that plan?"
objectives:
  - "**Distinguish** rules, predictive models and generative models by what each one outputs."
  - "**Classify** a business problem by its output and its data, and name the kind of AI it needs."
  - "**Explain** why most of the estimated value of AI sits outside chatbots."
  - "**Recommend** a mix of predictive and generative tools for a client case, and say how each would be checked."
---

## Three ways to order milk

Take an illustrative case. A quick-commerce dark store in Pune has to decide tonight how many litres of milk to stock for tomorrow. Too few and customers see "out of stock" at 7 a.m. Too many and the store writes off what spoils. There are three ways to make that call.

The store manager can write a rule: order what sold yesterday, plus 10 percent on weekends. A data team can build a model that has looked at two years of the store's daily sales, with the weekday, the weather and the festival calendar next to each day, and learned how those things move demand. Or someone can open a chatbot and type "How much milk should my store order tomorrow?"

The first two produce a number that tomorrow will prove right or wrong. The third produces a well-written paragraph. The chatbot has never seen this store's sales. It can tell you which factors matter for milk demand, and it will ask for data or offer a plausible guess, but it has nothing to learn the answer from.

==Before you pick an AI tool, ask what the output must be: a number, a category, or a piece of content. That one question decides the kind of AI, the data you need and how you will check it.==

Placement-season talk about AI is mostly about ChatGPT, Gemini and Claude. A lot of the AI already at work in banks, telecoms and retailers does something duller: it scores, sorts and forecasts. This chapter gives you a test for telling them apart in the first two minutes of a case.

## From first principles

::: principle Why there are different kinds of AI
1. Every business decision depends on something you do not know yet: will this borrower repay, will this customer leave, how much milk sells tomorrow.
2. You can fill that gap in three ways. Write the logic down yourself. Learn the logic from past cases where you already know what happened. Or ask a model to produce something new.
3. Writing the logic yourself works when the logic is known, short and stable. "Reject any application without a PAN" needs no learning.
4. When the pattern has too many inputs, or shifts over time, nobody can write it down. A model can learn it from history, as long as each past case carries its known outcome (this loan defaulted, this one did not). The output is a number, a category or a probability, and it can be checked against what happens later.
5. Some outputs have no single right answer: a reply to a complaint, a summary of a 40-page contract, a product description. For these you need a model that has absorbed huge amounts of text or images and can produce new content on request.
6. Start from the output and the data you have. The tool follows from them. Starting from the tool ("we have ChatGPT, what can it do?") is how projects end up with the wrong one.
:::

Step 4 has a name in the industry: [[predictive-ai|predictive AI]], also called classic or traditional machine learning. Step 5 is [[generative-ai|generative AI]]. Step 3 is a [[rule-based-system]], which most people would not call AI at all, and that is fine. It is often the right answer.

## Name it

::: concept Predictive AI
**Plain words.** A [[model]] that learns from past examples to give one specific answer about a new case: a score, a category or a forecast. Will this customer churn? Is this transaction fraud? How many units will sell next week? Putting a case into a category is called [[classification]]; forecasting a quantity is called regression.

**Analogy.** An experienced credit officer who has seen ten thousand loan files and can glance at a new one and say "risky". The model does the same thing with numbers, at the speed of a database query, and it does not get tired at 6 p.m.

**Misconception.** "Predictive AI is old, so it is the lesser kind." It is older, and by the McKinsey estimate later in this chapter it holds most of AI's potential value.
:::

::: concept Generative AI
**Plain words.** A model that produces new content: text, images, code, audio. The McKinsey Global Institute describes these as "applications typically built using foundation models", which unlike earlier models "can process extremely large and varied sets of unstructured data and perform more than one task" [@mgi-genai-economic-potential]. One model can draft an email, summarise a report and translate a policy into Hindi.

**Analogy.** A very well-read intern. Fluent, fast and useful for a first draft, with no access to your company's numbers unless you hand them over, and no way of telling you whether its draft is the best possible one.

**Misconception.** "It can do everything, so it can also do the forecasting." It can talk about a forecast. Asked to produce one from a table, it is the wrong instrument for most cases, as the next sections show.
:::

The deeper difference is the data each one eats. A predictive model works on [[structured-data|structured data]]: rows and columns, where each column means one thing (date, amount, city, days past due). It learns from history that carries a [[label]], the known right answer for each past case. A generative model works mostly on unstructured data: free text, PDFs, call transcripts, images. A bank holds both: a transactions table and shelves of loan documents.

{{figure kinds-of-ai-pick | Start from the output, then the data. Each branch also tells you how the result will be checked. | INFERENCE}}

The bottom row matters most in a client room. A predictive model's output can be scored: you predicted 120 litres, the store sold 131, and a month of such errors tells you if the model is good enough. A generative model's output usually has no single right answer, so a person has to judge it, which costs time and needs a reviewer.

## Where the neat split breaks

Real projects blur the figure in three ways.

**A language model also predicts.** Under the hood, a large language model works by predicting the next word, again and again. The next chapter shows how. It is still generative by purpose: you use it to produce content, and its outputs are judged as content. When an interviewer says "but LLMs are predictive too", agree on the mechanism and hold your ground on the use.

**The two are often used together.** A telecom can use a churn model to list the 50,000 subscribers most likely to leave next month, then use a generative model to draft a retention message for each segment. A bank can use a language model to read loan documents and pull out fields (income, employer, existing EMIs) that then feed a predictive credit model.

**Rules still win some fights.** A rule is transparent: anyone can read it, a regulator can audit it, and it never drifts. If the logic is known and stable, a learned model adds cost and opacity for little gain. Learned models earn their place when the pattern has too many inputs or keeps changing, as fraud does. Frame rules versus learning as a decision you make for each problem.

::: myth
**Myth.** AI means ChatGPT and its rivals, and the money in AI is in chatbots.

**Reality.** In its 2023 report on generative AI, the McKinsey Global Institute wrote that "the other applications of AI discussed in our previous report continue to account for the majority of the overall potential value of AI", adding: "Traditional advanced-analytics and machine learning algorithms are highly effective at performing numerical and optimization tasks such as predictive modeling" [@mgi-genai-economic-potential]. A report written about generative AI still puts the older kind ahead.
:::

## The evidence

::: stat $11T–$17.7T vs $2.6T–$4.4T
MGI's 2023 estimate of the yearly economic value that nongenerative AI and analytics could add, against $2.6 trillion to $4.4 trillion a year from the 63 generative AI use cases it analysed. Generative AI adds 15 to 40 percent on top; it does not replace the larger pool.
<span class="src">Source: [@mgi-genai-economic-potential]</span>
:::

If you quote this, say it is a 2023 estimate of potential value, built use case by use case. It says nothing about what any company has captured. And the same report finds that about 75 percent of generative AI's value falls in four areas: customer operations, marketing and sales, software engineering, and R&D [@mgi-genai-economic-potential]. That is a useful map: generative AI is strongest where work is language-heavy.

An older frame explains why predictive work is everywhere. In 2016 the economists Ajay Agrawal, Joshua Gans and Avi Goldfarb put it in one line in HBR: "Prediction is about to get way cheaper" [@hbr-simple-economics-machine-intelligence]. Churn, credit, demand and fraud all reduce to a prediction about a case you have not seen yet, so cheaper prediction reaches all of them.

### An Indian example: hunting mule accounts

A mule account is a bank account used to receive and pass on the proceeds of fraud. Spotting one is a classic predictive problem: given an account's pattern of transactions, does it behave like a mule?

In December 2024 the Reserve Bank of India announced "an AI / ML based model called MuleHunter.AI" that "enables detection of mule bank accounts in an efficient manner", and reported: "A pilot with two large public sector banks has yielded encouraging results" [@rbi-dev-reg-policies-2024-12]. In October 2025 Governor Sanjay Malhotra said the tool, built by the Reserve Bank Innovation Hub, had "been scaled up from about 5 banks at the beginning of this year to 21 banks". He added: "Unlike earlier approaches, this is enabling them to use system-wide learning to improve detection of mule accounts" [@rbi-malhotra-gff-2025]. In September 2026 Deputy Governor Shirish Chandra Murmu described it as an initiative that "already uses AI and machine learning to identify mule accounts channelling the proceeds of fraud" [@rbi-murmu-gff-2026].

Notice what MuleHunter.AI does not do. It writes nothing. It reads structured transaction data and flags accounts. ==One of the most visible AI projects in Indian banking is a classifier, and it did not need a chatbot.== RBI has not published detection rates, so do not quote one. The point for your case is the shape of the problem: structured data in, a flag out, and "system-wide learning" across banks. A likely reason that helps: a fraud pattern that is rare inside one bank shows up many times across 21.

## Worked case

::: case Illustrative · A two-wheeler lender's "GenAI underwriting" plan
#### The situation
A mid-sized NBFC lends for two-wheelers in tier-2 and tier-3 towns. Its CEO has seen a demo of a language model reading a bank statement and wants "GenAI underwriting" by next quarter. The credit team already approves loans using a scorecard built a few years ago, plus a long list of policy rules. Approval takes two to three days, mostly because staff read documents by hand. You are asked where AI fits.

#### The decision
Break underwriting into its decisions and ask, for each one, what the output must be.

1. **Is the applicant eligible at all?** Age, PAN, minimum income, pin code served. The logic is known and the regulator wants it auditable. Output: yes or no. **Rules.** Keep them.
2. **How likely is this borrower to default?** The output is a probability, checkable within months as loans repay or slip. The data is structured: repayment history, bureau data, income, loan-to-value. The lender has years of past loans with known outcomes, which are the labels. **Predictive model.** The existing scorecard is one; the question is whether a better-trained model would rank risk better, measured on past loans it has not seen.
3. **What does the applicant earn and owe?** The facts sit in bank statements, salary slips and ID documents, as PDFs and phone photos. Pulling them into fields is reading work. **Generative model** (or a document-reading tool), with a person checking a sample. This is where the two-to-three-day delay lives.
4. **What do we tell a rejected applicant?** A clear letter, in the applicant's language, that gives the reason. Content with many right answers, inside rules about what must be said. **Generative model**, drafting from a template, reviewed before sending.

So the CEO's instinct is half right. The demo points at step 3, where a language model can cut time. It should not touch step 2. Asking a chatbot "should we lend to this person?" produces a fluent opinion that nobody can score against outcomes. The default decision has to come from a model trained on the lender's own labelled history and tested on loans it did not train on.

#### Your move
The CEO replies: "Fine, but the scorecard is five years old and the borrower mix has changed." What does that tell you about step 2, and what data would you ask for first? (Hint: think about labels, and how recent they are.)
:::

## Through the lenses

::: lens consulting
Clients often arrive with a tool ("we want a GenAI strategy") rather than a problem. The first-hour move is to list the client's top decisions, sort them by output type, and show which ones a predictive model, a language model or a plain rule would serve. That turns a vague mandate into a scoped pilot with a metric attached. It also guards against a chatbot pilot that demos well and moves no number on the P&L.
:::

::: lens marketing
A propensity model decides who to target; a generative model drafts what to send. Treat them as two projects: the first is measured in conversion, the second partly by a person judging tone.
:::

## Interview room

::: interview Churn, chatbot or both?
**Q.** A telecom operator's churn is rising. Would you recommend a chatbot, a prediction model, or both? What data would you ask for first?

> "I would start with a prediction model to find who is likely to leave and why, and only then decide whether a chatbot helps, because a chatbot cannot fix churn if we do not know which customers to reach."

**What they are testing.** Whether you match the tool to the output, ask for the right data, and avoid reaching for the fashionable answer.

**A strong structure.**
1. *Clarify the output.* The first need is a ranked list: which subscribers are likely to leave in the next 30 to 90 days. That is a probability, so a predictive model.
2. *Name the data.* Twelve to 24 months of subscriber records with a churn label: plan, tenure, recharge pattern, data usage, network drops in their area, complaints, port-out requests. Ask whether past churners are flagged reliably, because without labels there is nothing to learn from.
3. *Add the generative piece where it fits.* Complaint text and call transcripts are unstructured; a language model can tag reasons (network, price, billing) that become inputs to the churn model. A generative model can also draft retention offers per segment.
4. *Define success.* Did churn fall in the targeted group against a control group? A chatbot would be judged on other numbers (resolution rate, satisfaction).
5. *Close with the order.* Predict first, then generate. Both, in sequence.
:::

## Try it yourself

::: try Sort a client's wish list
Open ChatGPT, Gemini or Claude and paste the prompt below. Then grade its answer against this chapter's test: did it decide by output and data, or by what sounds modern? Push back on any item where it chose a language model for a numbers task, and see whether it changes its mind for a good reason.

```
I am a consultant. My client, an Indian FMCG company, has asked for "AI use cases".
Sort each item below into one of three buckets: written rules, a predictive
(machine learning) model, or a generative AI model. For each, state (a) the
output it must produce, (b) the data it needs, and (c) how we would check if
it is right. Be brief.

1. Forecast weekly demand per SKU per distributor
2. Draft first versions of product descriptions for e-commerce listings
3. Flag distributors likely to miss payment next month
4. Block any order above a distributor's credit limit
5. Summarise 2,000 consumer complaints into top themes
6. Decide which retailers a sales rep should visit tomorrow
```
:::

## Watch and read

{{watch ibm-predictive-vs-generative}}

{{read mgi-genai-economic-potential}}

## Check yourself

::: check Check yourself
1. Name the three ways to fill a decision gap described in this chapter, and the kind of output each produces. <span class="lvl">recall</span>
2. A food-delivery app wants to estimate how many minutes an order will take. Which kind of AI, what data, and how would you check it? <span class="lvl">apply</span>
3. Why did MuleHunter.AI not need a chatbot, and why does "system-wide learning" across banks help it? <span class="lvl">explain</span>
4. An HR head wants to "use GenAI to predict which employees will resign". Rewrite the request so it uses the right tool for each part. <span class="lvl">transfer</span>
5. A client's chatbot pilot impressed the board but no metric moved. Using this chapter, give the most likely reason and what you would recommend instead. <span class="lvl">judge</span>
:::

::: answers
1. Written rules (a fixed decision from known logic), a predictive model (a number, category or probability learned from labelled history), and a generative model (new content such as text, images or code, with many acceptable answers).
2. A predictive model doing regression, because the output is a number. Data: past orders with their actual delivery times, plus distance, restaurant prep time, time of day, weather and rider availability. Check by comparing predicted with actual minutes on orders the model has not seen.
3. Spotting a mule account is a classification on structured transaction data: the output is a flag, and no text needs writing. Fraud patterns that are rare in one bank recur across many, so learning across banks gives the model more labelled examples of the same behaviour.
4. Split it. A predictive model estimates resignation risk from structured HR data (tenure, pay changes, ratings, manager changes) with past resignations as labels. A language model can read exit-interview and survey text to tag reasons, which can feed the model or a report for managers. Who sees the risk scores, and how they are used, needs a policy decision before launch.
5. It was probably a tool looking for a problem: the pilot started from "we have a chatbot" rather than from a decision with a measurable output. Recommend listing the business's main decisions, sorting them by output, and piloting where a number can be checked (for example a demand or churn model), with generative AI added where language work is the bottleneck.
:::

::: recap The night-before page
1. Ask first what the output must be: a fixed decision (rules), a checkable number or category (predictive model), or new content (generative model).
2. Predictive models learn from structured, labelled history; generative models work on unstructured text and images and can do many tasks.
3. MGI (2023): nongenerative AI and analytics, $11T to $17.7T a year of potential value; generative AI adds $2.6T to $4.4T.
4. RBI's MuleHunter.AI is a predictive classifier for mule accounts, piloted with two public sector banks in 2024 and scaled to 21 banks by October 2025. No detection rate is public.
5. Many good use cases combine both: predict who or what, then generate the message. Rules still win when the logic is known and must be audited.
:::
