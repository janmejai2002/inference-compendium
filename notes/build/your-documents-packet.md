# Packet: your-documents (Giving the model your documents)

Researched 2026-11-01. Lens: consulting. Privacy thread lives here. ✓ = opened 2026-11-01 and saw the number/text.

## Facts

1. **RAG defined by its originators.** Lewis et al. combine "parametric memory" (a pre-trained seq2seq model) with "non-parametric memory" (a dense vector index of Wikipedia, read by a neural retriever). Argument: models store facts in parameters but have limited ability to access and manipulate them. Reports state-of-the-art on three open-domain QA tasks and text that is more specific, diverse and factual than a parametric-only baseline. *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*, Lewis, Perez, Piktus, Petroni, Karpukhin, Goyal, Küttler, Lewis, Yih, Rocktäschel, Riedel, Kiela; arXiv 2005.11401, submitted 22 May 2020, NeurIPS 2020. https://arxiv.org/abs/2005.11401 Tier A. ✓
2. **Contextual retrieval cuts misses.** Anthropic, 19 Sep 2024. Metric: "1 minus recall@20", the share of relevant chunks not found in the top 20. Baseline 5.7%. Contextual embeddings: 5.7% to 3.7% ("reduced ... by 35%"). Plus contextual BM25 (keyword search): to 2.9% (49%). Plus reranking: to 1.9% (67%). https://www.anthropic.com/news/contextual-retrieval Tier A. ✓ (Anthropic's own test set; vendor-run, say so.)
3. **Why a chunk fails alone.** Same post: the chunk "The company's revenue grew by 3% over the previous quarter" "doesn't specify which company it's referring to or the relevant time period." Good consulting example: a slide fragment without its title. ✓
4. **When not to use retrieval.** Same post: if the knowledge base is smaller than 200,000 tokens (about 500 pages), put it all in the prompt, no RAG. ✓ (Figure is for Claude at publication, 2024; context sizes keep changing, so date it.)
5. **Long context is not free.** Liu et al., *Lost in the Middle: How Language Models Use Long Contexts*, arXiv 2307.03172, v1 6 Jul 2023 (v3 20 Nov 2023; published TACL). "Performance is often highest when relevant information occurs at the beginning or end of the input context"; accuracy falls when the answer sits in the middle, even for models built for long context. https://arxiv.org/abs/2307.03172 Tier A. ✓ (2023 models; treat as a direction, not today's size of gap.)
6. **Seven ways a RAG system fails.** Barnett et al., arXiv 2401.05856, 11 Jan 2024, from three case studies (research, education, biomedical). FP1 Missing Content, FP2 Missed the Top Ranked Documents, FP3 Not in Context, FP4 Not Extracted, FP5 Wrong Format, FP6 Incorrect Specificity, FP7 Incomplete. Lesson quoted: "validation of a RAG system is only feasible during operation." https://arxiv.org/abs/2401.05856 Tier A. ✓ (FP names read from the PDF text.)
7. **Samsung leak.** Mark Gurman, Bloomberg, 2 May 2023: Samsung banned staff from ChatGPT, Bard and Bing after discovering staff "uploaded sensitive code to the platform". Memo's reason (Bloomberg): data sent to such platforms is stored on external servers, "making it difficult to retrieve and delete", and could be disclosed to other users. Paywalled; I saw headline, byline, date and lede through the browser tool, not the whole article. Do not state the number of incidents or what the code was (only secondary coverage). https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt-and-other-generative-ai-use-by-staff-after-leak Tier B. ✓ (lede only). **bloomberg.com is not in source-policy.yml; add at B.**
8. **DPDP Act 2023 duties.** The Digital Personal Data Protection Act, 2023 (No. 22 of 2023), 11 Aug 2023, MeitY-hosted gazette PDF. s.8(1): the Data Fiduciary is responsible for compliance "irrespective of any agreement to the contrary", including processing by a Data Processor on its behalf. s.8(5): protect personal data "by taking reasonable security safeguards to prevent personal data breach". s.8(6): give the Board and each affected Data Principal intimation of a breach. s.8(7): erase data when consent is withdrawn or the purpose is served; make processors erase too. Schedule: failure on safeguards "may extend to two hundred and fifty crore rupees"; failure to notify a breach, two hundred crore rupees. https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf Tier A. ✓
9. **What enterprise ChatGPT promises.** OpenAI "Enterprise privacy" (updated 8 Jan 2026): "By default, we do not use your business data for training our models"; admins decide who has access and control which internal sources are connected. Do not contrast with the free tier (not on this page). https://openai.com/enterprise-privacy Tier A (vendor policy: a promise, not an audit). ✓
10. **Retrieved text can carry attacks.** Greshake et al., arXiv 2302.12173, 23 Feb 2023: "Indirect Prompt Injection" plants instructions in data the model is likely to retrieve; demonstrated on Bing Chat (GPT-4) and synthetic apps; authors note effective mitigations were lacking then. Bridge to ch6. https://arxiv.org/abs/2302.12173 Tier A. ✓
11. **NotebookLM, the no-code try-it.** Google's help page (now titled "Gemini Notebook") says you get "grounded information based on your sources with clear in-line citations", and that your data "is not used to train Gemini Notebook unless you provide feedback"; Workspace/Education uploads, queries and responses "will not be used to train AI models". Product was renamed; write "NotebookLM (now shown as Gemini Notebook)" and re-check at final. https://support.google.com/notebooklm/answer/16164461 Tier C. ✓ **support.google.com is not in the allowlist.**
12. **Employer demand.** "RAG / retrieval" appears in 28% of AI-role JDs vs 1.0% of baseline JDs (`notes/toc/research-jd-linkedin-2026-10.md`). Internal evidence; framing only, not a citation.

## Watch

**IBM Technology, "What is Retrieval-Augmented Generation (RAG)?"** Marina Danilevsky (IBM Research), Aug 2023, about 6.5 min; 2.08M views, channel 1.83M subs (passes G1, G2; durable concept so G3 ok). Scored DISTIL in the run (clarity 5, concept fit 3), not EMBED. I recommend promoting it for this chapter: one clean idea, no code. Marks checked in the transcript (yt-dlp captions; agent-reach was rate-limited):
- 1:00 the Jupiter / 88 moons answer: no source, out of date.
- 3:02 add a content store the model queries first.
- 4:13 the prompt now has three parts: instruction, retrieved content, question.
- 5:13 less likely to hallucinate; 5:26 can say "I don't know".
Skip: the closing minute on improving retriever and generator. Worth it: the moons story sticks. IBM is a vendor, but the explainer is vendor-neutral.

## Read

1. **Anthropic, "Introducing Contextual Retrieval"** (Facts 2-4). Short; has the failure numbers and the "just paste 500 pages" rule. Skip the code and cost sections.
2. **DPDP Act 2023, section 8 and the Schedule** (Fact 8). Two pages plus the penalty table; the primary text beats law-firm summaries.

## Interview questions

1. "A partner wants a chatbot over ten years of the firm's past engagement decks. What can go wrong, and what do you check before saying yes?" Pattern: casebook knowledge candidate "GenAI is for unstructured text" (`research-casebooks-2025-26.md`, line 90) plus the retrieval JD ask (28%). Spine: stale or superseded decks, messy PDFs, retrieval misses (Facts 2, 6), client confidentiality and who may see what, a test set of known questions.
2. "A client's staff are pasting contracts into a free chatbot. Advise the CFO." Pattern: responsible AI / governance in 27% of AI JDs. Frame: Samsung and DPDP (Facts 7, 8, 9). Spine: give a sanctioned tool with no-training terms, access control and logging; name breach and penalty exposure; a ban alone is not an answer.
3. "When would you paste 500 pages into the prompt instead of building a retrieval system?" Pattern: use-case sizing in casebooks (value-chain use-case mapping, line 90). Spine: Fact 4 vs Fact 5: small stable corpus, paste it; large, changing or permissioned corpus, retrieve; either way test.

## Indian business example (Illustrative)

**Illustrative.** A mid-sized Indian NBFC wants an assistant over its credit-policy manual, RBI circulars and four years of credit memos. The manual changed three times this year and the old versions sit in the same shared drive. A question about the maximum loan-to-value for a salaried applicant retrieves the superseded circular because that file's wording is closer to the question. The fix is not a better model: date-stamp and retire old files, add document titles to every chunk (Fact 3), restrict credit memos by branch, log every answer with its source. No real firm is named; every detail is made up. Customer data in the memos makes the NBFC a Data Fiduciary under the DPDP Act (Fact 8).

## Misconceptions (myth blocks)

1. "RAG retrains the model on our data." No: the weights are untouched; text is fetched and pasted into the prompt for each question (Fact 1; IBM 4:13).
2. "A bigger context window makes retrieval unnecessary." Partly: small corpora can be pasted (Fact 4), but position effects and cost remain (Fact 5).
3. "Enterprise tier means private, so we are compliant." Vendor promises about training (Fact 9) do not cover who inside your firm can retrieve what, or your duties as fiduciary (DPDP s.8(1)).

**Stat block:** Anthropic: retrieval failure rate 5.7% to 1.9% (a 67% reduction) with contextual embeddings, keyword search and reranking (Fact 2). Read as: even the best setup in the vendor's own test misses relevant text about 2 times in 100.

## sources.yml-ready entries

```yaml
lewis-rag-2020:
  type: paper
  title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
  creator: Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, Heinrich Küttler, Mike Lewis, Wen-tau Yih, Tim Rocktäschel, Sebastian Riedel, Douwe Kiela
  publisher: arXiv 2005.11401 (NeurIPS 2020)
  year: 2020
  url: https://arxiv.org/abs/2005.11401
  tier: A
  why: The paper that named RAG. Read the abstract only; it states the idea (a model plus a searchable memory of documents) in one paragraph.
  verified: true

anthropic-contextual-retrieval:
  type: article
  title: "Introducing Contextual Retrieval"
  creator: Anthropic
  publisher: Anthropic
  year: 2024
  minutes: 12
  url: https://www.anthropic.com/news/contextual-retrieval
  tier: A
  why: A lab's own test of how often retrieval misses (5.7% down to 1.9%), plus the rule of thumb to skip retrieval below about 500 pages. Vendor-run numbers; read the results, skip the code.
  verified: true

barnett-rag-failure-points:
  type: paper
  title: "Seven Failure Points When Engineering a Retrieval Augmented Generation System"
  creator: Scott Barnett, Stefanus Kurniawan, Srikanth Thudumu, Zach Brannelly, Mohamed Abdelrazek
  publisher: arXiv 2401.05856
  year: 2024
  url: https://arxiv.org/abs/2401.05856
  tier: A
  why: Seven concrete ways a "chat with our documents" system fails, from three real case studies. Use the list as a due-diligence checklist.
  verified: true

liu-lost-in-the-middle:
  type: paper
  title: "Lost in the Middle: How Language Models Use Long Contexts"
  creator: Nelson F. Liu, Kevin Lin, John Hewitt, Ashwin Paranjape, Michele Bevilacqua, Fabio Petroni, Percy Liang
  publisher: arXiv 2307.03172 (TACL)
  year: 2023
  url: https://arxiv.org/abs/2307.03172
  tier: A
  why: The standard evidence that pasting everything into a long prompt does not guarantee the model uses it; answers buried in the middle are missed more. 2023 models, so read it as a direction.
  verified: true

gurman-samsung-chatgpt:
  type: article
  title: "Samsung Bans Staff's AI Use After Spotting ChatGPT Data Leak"
  creator: Mark Gurman
  publisher: Bloomberg
  year: 2023
  url: https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt-and-other-generative-ai-use-by-staff-after-leak
  tier: B
  why: The first report of the Samsung episode, from the outlet that saw the memo. Paywalled; the lede and the memo's reasoning are enough for the chapter.
  verified: true

dpdp-act-2023:
  type: report
  title: "The Digital Personal Data Protection Act, 2023 (No. 22 of 2023)"
  creator: Government of India, Legislative Department
  publisher: MeitY (Gazette of India, Extraordinary)
  year: 2023
  minutes: 15
  url: https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf
  tier: A
  why: The law itself. Read section 8 (duties of the Data Fiduciary) and the Schedule of penalties, up to Rs 250 crore for failing to secure data.
  verified: true

openai-enterprise-privacy:
  type: article
  title: "Enterprise privacy at OpenAI"
  creator: OpenAI
  publisher: OpenAI
  year: 2026
  url: https://openai.com/enterprise-privacy
  tier: A
  why: What a vendor actually promises business customers (no training on business data by default, admin control of access and connected sources). A promise, not an audit.
  verified: true

greshake-indirect-injection:
  type: paper
  title: "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection"
  creator: Kai Greshake, Sahar Abdelnabi, Shailesh Mishra, Christoph Endres, Thorsten Holz, Mario Fritz
  publisher: arXiv 2302.12173
  year: 2023
  url: https://arxiv.org/abs/2302.12173
  tier: A
  why: First clear demonstration that a document the model retrieves can carry instructions that hijack it. Sets up the agents chapter.
  verified: true

google-notebooklm-help:
  type: article
  title: "Learn about Gemini Notebook (NotebookLM) - Help"
  creator: Google
  publisher: Google Help
  year: 2026
  url: https://support.google.com/notebooklm/answer/16164461
  tier: C
  why: Google's own description of source-grounded answers with in-line citations and its stated no-training terms. Admitted because the vendor help page is the only authoritative statement of what the free tool does with your files.
  verified: true

ibm-what-is-rag:
  type: video
  title: "What is Retrieval-Augmented Generation (RAG)?"
  creator: Marina Danilevsky
  publisher: IBM Technology (YouTube)
  year: 2023
  minutes: 7
  url: https://www.youtube.com/watch?v=T-D1OfcDW1M
  tier: A
  why: An IBM Research scientist explains RAG in under seven minutes with one story (how many moons has Saturn?) and no code. Watch it before the chapter's diagram.
  marks:
    - { t: "1:00", label: "The out-of-date, unsourced answer" }
    - { t: "3:02", label: "Add a content store the model asks first" }
    - { t: "4:13", label: "The prompt now has three parts" }
    - { t: "5:13", label: "Fewer made-up answers; it can say it does not know" }
  verified: true
```

Domain notes: `bloomberg.com` and `support.google.com` are not in `content/source-policy.yml`; add at B and C or `npm run check` flags them. The IBM entry sits on youtube.com (C by domain); tier A is defensible only because the creator is an IBM Research scientist explaining her own field, so check will print a reminder.

## Gaps

- Samsung: only the Bloomberg lede opened (paywall). Incident count, which code, and whether the ban was temporary differ across secondary coverage; not used.
- DPDP: commencement dates and the DPDP Rules (secondary sources say notified Nov 2025) not opened. The chapter must not say the Act is "in force" without checking MeitY. Definition of Data Fiduciary is s.2(i), read.
- No sourced number for permissions or stale-data failures in enterprise RAG beyond Barnett (FP1, FP2) and the Illustrative example. No sourced figure for how often staff paste confidential data into chatbots.
- McKinsey Lilli (confidential client data only in Lilli) sits in `research-consulting-ai.md` from Fortune, 2 Jun 2025 [B]; not re-opened. Could anchor the consulting angle once confirmed.
- Computerphile RAG video (of4UDMvi2Kw) passes gates but is a coding demo with an ad read; not recommended. IBM vector-database video (gl1r1XV0SLw) has a Flash flag for an outdated GloVe mention; no embeddings-specific Watch card, so embeddings rely on prose.
- agent-reach was rate-limited; captions pulled with yt-dlp instead.
