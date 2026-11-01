---
id: your-documents
title: "Giving the model your documents"
deck: "Retrieval and embeddings in plain words, why \"ChatGPT on our data\" is hard, and what leaks. The hard part is choosing what the model gets to read, and who else gets to read it."
level: Zero to one
tracks: [foundations, consulting, finance]
hook: "Suppose a firm loads ten years of engagement decks into an internal chatbot. Asked for a client's FY24 EBITDA margin, it answers 14.2% and cites a real slide. The slide belongs to a different client. The model invented nothing. What broke, and who should have caught it?"
objectives:
  - "**Explain** how retrieval-augmented generation lets a model answer from your documents without retraining it."
  - "**Diagnose** a wrong answer from a document chatbot by tracing it to the file, the chunk, the search or the model."
  - "**Decide** when to paste documents straight into the prompt and when to build a retrieval system."
  - "**Assess** what leaves the firm when staff give an AI tool company or customer data, and what India's DPDP Act asks of the firm."
---

Think of your first week on a consulting project. The partner hands you the client's data room: four hundred files, some final, some drafts, some from a deal that fell through. Your usefulness depends on which files you open, whether you notice that "Q3 plan v7 FINAL" was replaced by v9, and whether you keep the board pack away from people on other engagements. ==A model answering from your documents has the same job: it is only as good as the pages put in front of it, and only as safe as the rules about who sees them.==

Chapters 2 and 3 showed a model writing from patterns in its parameters, fluently and sometimes wrongly. This chapter covers the fix most companies try first, "let the model read our files", and its three failures: it finds the wrong page, misreads the right one, or shows a page to someone who should not see it.

## Two places a model can know things from

A model can know something because it absorbed it in training, so the knowledge sits in its parameters, frozen on the day training stopped. Or it can read it now, because the text sits in its [[context-window|context window]] next to your question. In 2020 Patrick Lewis and colleagues called these "parametric memory" and "non-parametric memory", the second being a searchable index of documents [@lewis-rag-2020]. Their point: facts stored in parameters are hard to get at precisely or trace to a source. They named the combination [[retrieval-augmented-generation|retrieval-augmented generation]], or RAG.

::: principle Build it from zero
1. A model's parameters were set during training. They do not contain your firm's files or anything that happened after training ended.
2. Retraining each time a policy changes is slow and costly, and the fact would still be stored as a blurred pattern you cannot point to.
3. A model does read whatever is in its context window, and every next-token prediction depends on that text.
4. So put the relevant passage in the prompt, next to the question, and tell the model to answer from it.
5. You have thousands of pages and the window holds only so much, so a search step has to choose which passages go in.
6. ∴ "AI on our documents" is two systems in a row: a search engine that picks the pages, and a model that writes from them. The answer can be no better than the pages the search hands over.
:::

Marina Danilevsky of IBM Research tells it with a family story. Her children asked which planet has the most moons. She said Jupiter, from an old article; a current source said Saturn. No source and out of date: the two faults she pins on language models [@ibm-what-is-rag]. With retrieval, the prompt has three parts: "the instruction to pay attention to, the retrieved content, together with the user's question." When the moon count changes again, you update the store and leave the model alone.

::: concept Retrieval-augmented generation (RAG)
**Plain words.** Before the model answers, a search step finds the passages in your documents that best match the question and pastes them into the prompt, with an instruction to answer from them and cite them. The model itself is unchanged.

**Analogy.** An open-book exam. The student is the same either way; what changes is which pages are open on the desk. With the wrong chapter open, the student writes a confident, well-argued, wrong answer.

**Misconception.** "We trained ChatGPT on our data." With RAG nothing is trained. Your files sit in a separate store and passages are copied into each prompt as needed, which also means they travel to the model every time.
:::

## How the search finds the page

Every RAG system follows the same steps (figure 1). Ahead of time, it cuts each document into [[chunk|chunks]] of a paragraph or so, then turns each chunk into an [[embedding]], a list of numbers that stands for its meaning. At question time it turns the question into numbers the same way, finds the closest chunks, and builds the prompt from them.

{{figure-wide your-documents-pipeline | Retrieval-augmented generation in two rows. The top row runs ahead of time and again whenever files change; the bottom row runs for every question. The numbered markers are where a wrong answer usually starts. | Based on Lewis et al. 2020, Danilevsky (IBM) 2023 and Barnett et al. 2024}}

::: concept Embedding
**Plain words.** A way to turn a passage into a long list of numbers so that passages with similar meaning get similar numbers. Search then means "find the chunks whose numbers sit closest to the question's".

**Analogy.** A map with a pin for every paragraph, placed by topic. "Loan-to-value cap for salaried borrowers" and "maximum LTV for salaried applicants" land side by side though they share few words; a keyword search would treat them as strangers.

**Misconception.** "Closest in meaning" sounds like "correct". A superseded circular and the current one use almost the same words, so they sit side by side on the map, and the search cannot tell which one is in force.
:::

Cutting documents into chunks causes the opening puzzle. Anthropic's engineers give the example of a chunk that reads "The company's revenue grew by 3% over the previous quarter." On its own, they note, it "doesn't specify which company it's referring to or the relevant time period" [@anthropic-contextual-retrieval]. It is a slide body without its title. In the puzzle, the chunk holding "EBITDA margin 14.2%" had lost the deck title that named the client, so it matched the question perfectly for the wrong company. Anthropic's fix: add a line of context (document, company, period) to every chunk before indexing it, and run a keyword search alongside the meaning search.

## Where it breaks

A RAG system can fail at any box in figure 1, and the model's confident tone will not tell you which. Scott Barnett and colleagues built three such systems (research, education, biomedical) and listed seven ways they failed [@barnett-rag-failure-points]. Grouped by where they start:

- **The file.** The answer is not in the documents ("Missing Content").
- **The search.** The answer exists but was not retrieved, or was dropped from the prompt ("Missed the Top Ranked Documents", "Not in Context").
- **The model.** The passage was there and the model still missed it, or answered in the wrong format, too vaguely or too broadly, or in part ("Not Extracted", "Wrong Format", "Incorrect Specificity", "Incomplete").

Their line for managers: "validation of a RAG system is only feasible during operation." Some failures appear only with real users and changing files.

How often does the search miss? In Anthropic's 2024 tests (code, fiction and research papers), a standard setup left 5.7% of relevant chunks out of the top 20 results. Chunk context cut that to 3.7%, keyword search to 2.9%, and a re-ranking pass to 1.9%, a 67% reduction [@anthropic-contextual-retrieval].

::: stat 1.9%
Share of relevant passages still missing from the top 20 results in Anthropic's best retrieval setup, down from 5.7% with a standard one. The vendor ran the test on its own data, so treat it as a best case: about 2 relevant passages in 100 were still not found.
<span class="src">Source: [@anthropic-contextual-retrieval]</span>
:::

==A wrong answer from a document chatbot is usually a filing or search failure before it is a model failure.== That changes who fixes it. A better model will not help while the old circular sits in the folder. The fix belongs to whoever owns the files: retire superseded versions, put titles and dates into every chunk, and test on questions whose answers you already know.

::: myth
**Myth.** "RAG means the model learns our data, so over time it gets to know the business."

**Reality.** The model's weights are never touched. The search copies passages into the prompt for each question [@lewis-rag-2020]. A wrong file in the store produces the same wrong answer every time until a person removes it.
:::

## Paste it all, or retrieve?

If the documents are few, skip the search and paste them all in. Anthropic's 2024 advice: if a knowledge base is under 200,000 tokens, "about 500 pages of material", include all of it in the prompt and do without retrieval [@anthropic-contextual-retrieval]. That was Claude in 2024; check the tool you use. A case pack or one annual report fits easily.

A big window does not mean the model uses all of it. Nelson Liu and colleagues hid the answer to a question at different positions in a long input. "Performance is often highest when relevant information occurs at the beginning or end of the input context," they found, and it fell when the answer sat in the middle, even for models built for long inputs [@liu-lost-in-the-middle]. Those were 2023 models, so read it as a direction. And recall chapter 2's bill: 500 pages in every prompt means paying for 500 pages of input tokens every time.

So the choice turns on size, change and access. ==Small, stable and open to the whole team: paste it. Large, changing, or with parts some people must not see: retrieve, and build the permissions into the search.== Either way, test on known questions.

## What leaks

Every RAG answer sends your passages to a model, and most firms do not run the model themselves. The privacy question has three layers: what the vendor does with what you send, who inside the firm can retrieve what, and what the law holds the firm responsible for.

**What leaves the building.** In May 2023 Bloomberg reported that Samsung Electronics was banning staff from using generative AI tools such as ChatGPT after discovering that staff had uploaded sensitive code to the platform. According to the memo Bloomberg reviewed, the company worried that data sent to such services is stored on external servers, "making it difficult to retrieve and delete", and could end up disclosed to other users [@gurman-samsung-chatgpt]. Nobody hacked anything. Employees pasted company material into a tool the company did not control.

The vendor's terms decide what happens next. OpenAI's enterprise privacy page says, "By default, we do not use your business data for training our models", and that business admins decide who has access and which internal sources are connected [@openai-enterprise-privacy]. Google says your data in NotebookLM (now listed by Google as Gemini Notebook) is not used to train it "unless you provide feedback" [@google-notebooklm-help]. These are policy promises, not audits, and personal and company-managed accounts can carry different terms.

**Who sees what inside.** A retrieval system without permissions is a search engine over everything. If a confidential merger deck sits in the same index as the training material, any user's question can pull it into an answer. A user should be able to retrieve chunks only from files they could already open.

**What the law asks.** India's Digital Personal Data Protection Act, 2023, dated 11 August 2023, places the duty on the [[data-fiduciary|Data Fiduciary]], the party that decides why and how personal data is processed. Section 8 makes it responsible for compliance "irrespective of any agreement to the contrary", including processing a vendor does on its behalf. It must take "reasonable security safeguards to prevent personal data breach", report a breach to the Data Protection Board and to each affected person, and erase personal data once consent is withdrawn or the purpose is served, making its processors erase it too. The Schedule sets penalties that "may extend to two hundred and fifty crore rupees" for failing to take security safeguards, and up to two hundred crore rupees for failing to report a breach [@dpdp-act-2023]. Which provisions apply from which date depends on government notifications, so check MeitY before quoting a deadline. Either way, a firm cannot contract its duty away to an AI vendor.

One more risk sets up chapter 6. The model reads retrieved text as text, and text can contain instructions. In 2023 Kai Greshake and colleagues planted instructions in content an AI system was likely to retrieve, and the system followed them, in tests that included Bing Chat [@greshake-indirect-injection]. They called it indirect prompt injection. Once a model can send emails or update records, a poisoned supplier PDF is a security problem.

::: myth
**Myth.** "We bought the enterprise plan, so we are covered."

**Reality.** The plan covers what the vendor does with your data [@openai-enterprise-privacy]. It does not decide which of your employees can retrieve which files, and under the DPDP Act the firm stays responsible for personal data its vendors process [@dpdp-act-2023].
:::

::: case Illustrative · An NBFC's credit-policy assistant
#### The situation
A mid-sized Indian NBFC wants an assistant that answers credit officers' questions from its credit-policy manual, the RBI circulars it follows, and four years of credit memos. The manual changed three times this year, and the old versions sit in the same shared drive. In the pilot, an officer asks for the maximum loan-to-value for a salaried applicant. The assistant quotes a ceiling, cites a document, and is wrong: it retrieved last year's version, whose wording was closer to the question. No real firm is described; every detail is constructed.

#### The decision
Trace it through figure 1. The model read what it was given correctly, so a better model fixes nothing. The failure began at marker 1 (a superseded file in the store) and showed up at marker 3 (the search ranked it highest). The fixes are housekeeping: move retired versions out of the index; put title, version and effective date on every chunk, so "LTV ceiling" never travels without "Policy v3, effective 1 April"; rerun fifty known-answer questions after every policy change; log each answer with its passages.

Then privacy. Credit memos hold customers' incomes, loans and repayment histories, and the NBFC is their Data Fiduciary. Restrict memo retrieval to the branch and role that could already open each memo, and check the vendor contract for no training on the data, storage location and deletion, because under section 8 the NBFC answers for its processor [@dpdp-act-2023].

#### Your move
The business head wants to launch to all 600 officers next month. What would you need to see from the test set, and which documents would you keep out of the first release?
:::

::: lens consulting
"Can we put AI on our documents?" is a document-governance question first. Before discussing models, ask which files are authoritative, how old versions are retired, who may see what, and which known-answer questions will test it. These, more than the model, decide whether the chatbot is trusted.
:::

::: lens finance
In banks, NBFCs and insurers, the files an assistant would read (credit memos, KYC files, claim notes) are full of customers' personal data. Price the compliance work into the business case: access controls, logging, deletion on request and vendor terms, against DPDP penalties of up to ₹250 crore for weak safeguards [@dpdp-act-2023].
:::

::: interview Ten years of decks
**Q.** A partner wants a chatbot over ten years of the firm's past engagement decks. What can go wrong, and what do you check before saying yes?

> "Yes to a pilot, after three checks: can it find the right decks, does every answer say which client and year it comes from, and can each person retrieve only the decks they are cleared to see."

**What they are testing.** Whether you know that "AI on our documents" means search plus a model, and whether you raise confidentiality without being prompted.

**A strong structure.** How it works in one line (retrieve slides, paste into the prompt, answer with citations) → accuracy risks: drafts and superseded decks, slides that lose client and date when cut up, the right slide not retrieved → confidentiality: client A's numbers must never answer for client B, so retrieval follows access rules and conflict walls → vendor terms: no training, storage, deletion → known-answer tests and logging, before and after launch.
:::

::: try Watch retrieval work, and fail
No code needed. Open NotebookLM (notebooklm.google.com; Google now lists it as Gemini Notebook) and create a notebook. Use public documents only, never client or personal files. Add two versions of the same public document, such as an RBI master direction and an older circular it replaced, or two years of one listed company's annual report. Then ask:

```
1. What is [a specific limit or figure] according to these sources? Cite the passage.
2. Do the two documents disagree on this? If so, which is more recent, and how do you know?
3. What does the board say about [a topic that is in neither document]?
```

Click each citation and read the passage behind it. Did it notice the dates unprompted? Did it admit question 3 is not covered? You have just tested markers 1, 3 and 4 of figure 1.
:::

{{watch ibm-what-is-rag}}

Watch to 5:45. The moons story at 1:00 and the three-part prompt at 4:13 are the core; skip the last minute on improving the retriever and generator.

{{read anthropic-contextual-retrieval}}

Read the opening, the "revenue grew by 3%" example and the results; skip the code and cost sections.

{{read dpdp-act-2023}}

Read section 8 and the Schedule of penalties, about three pages.

::: check Check yourself
1. Name the two places a model can draw knowledge from when it answers, and say which one RAG adds. <span class="lvl">recall</span>
2. A colleague says, "Our HR bot gave the old leave policy, so the model needs retraining." Explain why that is probably the wrong fix and what you would check instead. <span class="lvl">explain</span>
3. One client has a 120-page employee handbook, updated yearly and open to all staff. Another has 40,000 contracts across business units with strict access rules. Which approach suits each, and why? <span class="lvl">apply</span>
4. A retail chain's store managers paste customer complaint emails, with names and phone numbers, into personal chatbot accounts to draft replies. Name two risks and two actions. <span class="lvl">transfer</span>
5. A vendor's document assistant answered 48 of 50 demo questions correctly, and the vendor asks for a firm-wide rollout. What do you want to know first? <span class="lvl">judge</span>
:::

::: answers
1. Its parameters, set in training (parametric memory), and text placed in its context window at question time. RAG adds the second by searching a document store and pasting what it finds into the prompt.
2. The weights do not hold the policy, so retraining misses. Most likely the old file is still indexed and was retrieved. Retire it, date every chunk, re-test with known questions.
3. The handbook is small, stable and open: paste it into the prompt or a notebook tool. The contracts are large, changing and permissioned: retrieve, with access rules applied at search time, keyword search for exact clause and party names, and a test set.
4. Risks: customer personal data leaves the firm through accounts it does not control, under terms it has not checked; and as Data Fiduciary under the DPDP Act the firm remains responsible for that data. Actions: provide a company-managed tool with no-training terms and logging, and set a clear, taught rule on what may be pasted. A ban alone pushes the habit out of sight.
5. Who wrote the 50 questions and whether real users ask them; whether the 2 failures were an honest "I don't know" or confident errors; how superseded files are handled; whether retrieval respects permissions; the data terms; and testing after launch.
:::

::: recap The night-before page
1. A model knows things from its parameters (frozen at training) and its context window (what you paste in now). RAG searches your documents and pastes the best passages into the prompt, with citations. Nothing is retrained.
2. Documents are cut into chunks and turned into embeddings (meaning as numbers); the question is matched to the closest chunks. A chunk that loses its title and date can answer for the wrong client or year.
3. Most wrong answers start in the files or the search: stale versions, missing content, the right passage not retrieved. Anthropic's best setup still missed 1.9% of relevant passages in its own tests. Test with known questions, before and after launch.
4. Up to a few hundred stable, open pages: paste them. Large, changing or permissioned material: retrieve. Long prompts cost more, and models can overlook what sits in the middle.
5. Privacy has three layers: vendor terms (promises, not audits), access inside the firm (retrieval must follow permissions) and the law (under the DPDP Act the Data Fiduciary answers for its vendors; penalties up to ₹250 crore). Retrieved text can also carry hidden instructions: chapter 6.
:::
