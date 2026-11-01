# Research packet: confidently-wrong (Why models are confidently wrong)

Checked 2026-11-01. Chapter job: pretraining, fine-tuning (two meanings), RLHF, why hallucination follows from the objective, real incidents, measured rates, bias enters at training.

## Facts

1. **Pretraining is lossy compression; the model "dreams" text.** Karpathy: parameters file about 140 GB; compression ratio "roughly like 100x"; zip is lossless, this is lossy, "a kind of Gestalt". The network "dreams" documents; he calls the invented ISBN "hallucinated". Source: Karpathy, "[1hr Talk] Intro to Large Language Models", YouTube, Nov 2023, https://www.youtube.com/watch?v=zjkBMFhNj_g. Marks (auto-captions, today): 05:41 to 06:04 lossy compression; 09:56 to 10:06 dreaming and ISBN; 11:06 never sure if it is "hallucination" or correct. Tier A. ✓ opened 2026-11-01 (captions).
2. **Stage two, fine-tuning, makes an assistant; stage three, RLHF, uses comparisons.** Karpathy 14:29 "second stage of training which we call fine-tuning ... an assistant model"; 19:07 about 100,000 ideal Q&A responses; 21:20 to 22:12 comparison labels, "reinforcement learning from human feedback"; 21:59 comparing is easier than generating. Same video. Tier A. ✓ opened (captions). His "System 1 only" and "no reward function" remarks are dated; cite only the three stages.
3. **"Fine-tuning" has two meanings.** Karpathy: alignment (document completer becomes assistant: format and behaviour). IBM: specialisation (domain knowledge, tone; "part of the model's weights", versus RAG supplying fresh context). IBM Technology, "RAG vs. Fine Tuning", https://www.youtube.com/watch?v=00Q0G84kq3M. Marks: 02:32 to 03:22 specialise in a domain, "part of the model's weights"; 05:06 to 05:15 baked in; 08:07 combine with RAG. Tier B (official IBM channel, explainer, not an originator). ✓ opened (captions).
4. **Hallucination follows from the objective.** Kalai, Nachum, Vempala, Zhang, "Why Language Models Hallucinate", arXiv:2509.04664, submitted 4 Sep 2025. Abstract page: hallucinations "originate simply as errors in binary classification" (if false statements cannot be told from facts, pretraining pressure yields them); they persist because most evaluations reward guessing, models are "optimized to be good test-takers"; the fix is socio-technical, rescoring existing leaderboards. Tier A. ✓ opened (abstract page only; PDF unreadable, so theorems unchecked).
5. **Guessing beats "I don't know" on accuracy-only scoreboards.** OpenAI, "Why language models hallucinate", 5 Sep 2025. SimpleQA table (from the GPT-5 system card): gpt-5-thinking-mini abstention 52%, accuracy 22%, error 26%; OpenAI o4-mini abstention 1%, accuracy 24%, error 75%. Birthday guess has a 1-in-365 chance; blank guarantees zero. Asked for Kalai's PhD title, a chatbot gave three answers, none correct. https://openai.com/index/why-language-models-hallucinate/. Tier A. ✓ opened (via browse.py).
6. **Lawyers sanctioned.** Mata v. Avianca, No. 22-cv-1461 (S.D.N.Y.), Judge P. Kevin Castel, 22 Jun 2023: $5,000 penalty on lawyers Peter LoDuca, Steven Schwartz and their firm; they had to notify their client and each judge falsely named; court "finds bad faith" from "acts of conscious avoidance and false and misleading statements". Source: LawNext, 22 Jun 2023, https://www.lawnext.com/2023/06/court-imposes-sanctions-on-lawyers-who-filed-bogus-cases-after-relying-on-chatgpt-for-legal-research.html. Tier C (opinion itself returned 403). ✓ opened.
7. **Measured: legal hallucination.** Dahl, Magesh, Suzgun, Ho, "Large Legal Fictions", arXiv:2401.01301, Jan 2024 (rev. Jun 2024): hallucinations "between 58% of the time with ChatGPT 4 and 88% with Llama 2" on specific verifiable questions about random federal court cases; models also failed to correct users' wrong assumptions. Tier A. ✓ opened. 2023-era models; say so.
8. **Consulting incident: Deloitte Australia.** AU$440,000 report for DEWR on the Targeted Compliance Framework (original 4 Jul 2025, updated 26 Sep 2025). More than a dozen invented references, a fabricated extract and misattributed quote from the Amato v Commonwealth robo-debt case; flagged by Dr Christopher Rudge, University of Sydney. Corrected version discloses an Azure OpenAI GPT-4o toolchain; Deloitte repays the final instalment; DEWR says findings unchanged. Deloitte did not confirm AI caused the errors (AFR source in the Register: internal review blamed human error). Sources: The Register, Carly Page, 6 Oct 2025, https://www.theregister.com/2025/10/06/deloitte_ai_report_australia/ ; Simon Willison quoting The Guardian (dates), https://simonwillison.net/2025/Oct/6/deloitte-to-pay-money-back/. Tier C both (DEWR page timed out, Guardian blocked). ✓ opened. Refund amount not stated: print no figure.
9. **Scale in courts.** Damien Charlotin's AI Hallucination Cases Database: "2246 cases", 1,517 in the USA, last updated 31 Oct 2026; includes some only alleged. https://www.damiencharlotin.com/hallucinations/. Tier C (only systematic count). ✓ opened. Print "as of Oct 2026".
10. **Measured: summarisation hallucination.** Vectara leaderboard (HHEM-2.3, private set of 7,700+ articles, temperature 0), updated 22 Oct 2026: lowest 1.8%; gpt-4.1 5.6%; gemini-2.5-pro 7.0%; gpt-4o-2024-08-06 9.6%; claude-sonnet-4-20250514 10.3%; claude-opus-4-5 10.9%; DeepSeek-R1 11.3%. Measures faithfulness when summarising a supplied document, not open recall. https://github.com/vectara/hallucination-leaderboard. Tier C, vendor-run (Vectara sells RAG): one benchmark, not a vendor ranking. ✓ opened.
11. **Bias enters at training (India).** Khandelwal, Tonneau, Bean, Kirk, Hale, "Indian-BhED", arXiv:2309.08573, Sep 2023 (rev. Aug 2024). Most tested LLMs show a "strong propensity to output stereotypes in the Indian context", stronger than the Western-studied gender and race biases; GPT-2, GPT-2 Large and GPT-3.5 chose the stereotypical output in 63 to 79% of caste sentences and 69 to 72% of religion sentences. Tier A. ✓ opened (abstract page). Older models; use it for where bias comes from (web text), not as a rating of today's ChatGPT.

## Watch

- **Karpathy, "[1hr Talk] Intro to Large Language Models"** (registry id `karpathy-intro-llms`, tier A, 60 min; 1.74M subs, 4.3M views, no gate fails; Flash weighted 4.0, authority 5). Watch **04:34 to 23:30 (about 19 min)**. Marks checked in captions: 05:41 "roughly like 100x" lossy; 10:04 "hallucinated" ISBN, 11:19 "dreaming internet text"; 14:29 fine-tuning makes the assistant; 22:12 RLHF from comparisons. Skip 00:00 to 04:30 (files, running Llama) and everything after 23:30 (scaling, tools, security: later chapters). Why: the originator showing that fluency and invention are the same mechanism. Ignore dated bits ("System 1 only", Bard).
- **IBM Technology, "RAG vs. Fine Tuning"**, 8 min, official channel (1.83M subs, no gate fails; not scored EMBED). Optional second card as the foil for the "specialisation" meaning. Marks: 02:32, 03:10, 05:06, 08:07. Skip 00:00 to 02:30.

## Read

- **OpenAI, "Why language models hallucinate"** (5 Sep 2025, tier A): plain language, one table, the exam analogy; about 6 minutes.
- Optional: Indian-BhED (arXiv 2309.08573) abstract for the bias block.

## Interview questions (3)

1. "A partner pastes a number a chatbot gave you into a client deck. What do you do before it goes in?" Evidence: JD asks on hallucination (7% of AI-JDs vs 0.4% baseline, `research-jd-linkedin-2026-10.md`); "critical interrogation of output" in the HBS DSAIL competency list (`research-canon.md`). Pattern: verify, source, owner.
2. "Why could a model with higher benchmark accuracy be riskier to deploy?" Evidence: o4-mini vs gpt-5-thinking-mini (accuracy 24% vs 22%, errors 75% vs 26%). Pattern: metric critique in judging output (my framing, not a quoted question).
3. "Our bank wants GenAI to summarise loan-officer notes. Where could bias or invented facts get in, and who is accountable?" Evidence: casebook #75 "GenAI in International Bank" (signal only, student-compiled) and "responsible AI / governance" in 27% of AI JDs. Pattern: use case by risk, human in the loop.

## Indian business example

**Illustrative** (no real firm): a Gurugram analyst at a mid-size consultancy asks a chatbot for the size of India's tier-2 health-insurance market and a supporting report. It returns a precise figure and a plausible report title with a named author. The report does not exist. Lesson: precision is not evidence; ask for the source, open it.
Possible real lead (unconfirmed): ITAT Bengaluru order in Buckeye Trust v PCIT, ITA 1051/Bang/2024, withdrawn after citing judgments that do not exist (Hindustan Times reprints). ~ not re-opened; dates conflict and AI use is only suspected. Do not use as fact.

## Misconceptions

1. "Fine-tuning on our documents teaches the model our facts and stops hallucination." Fine-tuning means two things (fact 3); neither removes guessing. Fresh facts go in as context (later chapters).
2. "A confident, fluent answer is more reliable." Fluency is what the objective rewards (facts 1, 4).
3. "Newer, higher-scoring models have stopped hallucinating." Accuracy-only scoring rewards guessing (fact 5); rates differ by task (facts 7, 10).

**Stat block:** OpenAI SimpleQA: o4-mini error rate 75% with 1% abstention; gpt-5-thinking-mini error rate 26% with 52% abstention (fact 5).

## sources.yml-ready entries

`karpathy-intro-llms` already exists (verified: false); orchestrator may flip it (title, creator, marks checked today). Do not duplicate. At write time none of the ids below existed.

```yaml
ibm-rag-vs-finetuning:
  type: video
  title: "RAG vs. Fine Tuning"
  creator: IBM Technology
  publisher: YouTube
  year: 2024
  minutes: 8
  marks: "02:32 fine-tuning specialises a model; 03:10 part of the weights; 08:07 combine with RAG"
  url: https://www.youtube.com/watch?v=00Q0G84kq3M
  tier: B
  why: IBM's official channel gives the "specialisation" meaning of fine-tuning, the foil to Karpathy's "alignment" meaning.
  verified: true

kalai-why-lms-hallucinate:
  type: paper
  title: "Why Language Models Hallucinate"
  creator: Adam Tauman Kalai, Ofir Nachum, Santosh S. Vempala, Edwin Zhang
  publisher: arXiv
  year: 2025
  url: https://arxiv.org/abs/2509.04664
  tier: A
  why: The originators' argument that hallucination comes from the training objective and accuracy-only grading. Abstract page checked; theorems not.
  verified: true

openai-why-lms-hallucinate:
  type: article
  title: "Why language models hallucinate"
  creator: OpenAI
  publisher: OpenAI
  year: 2025
  url: https://openai.com/index/why-language-models-hallucinate/
  tier: A
  why: Plain-language version with the SimpleQA table (abstention 52% vs 1%, error 26% vs 75%) and the exam-guessing analogy.
  verified: true

dahl-large-legal-fictions:
  type: paper
  title: "Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models"
  creator: Matthew Dahl, Varun Magesh, Mirac Suzgun, Daniel E. Ho
  publisher: arXiv
  year: 2024
  url: https://arxiv.org/abs/2401.01301
  tier: A
  why: Measured rate, 58% (ChatGPT 4) to 88% (Llama 2) on verifiable questions about federal cases. 2023-era models.
  verified: true

lawnext-mata-sanctions:
  type: article
  title: "Court imposes sanctions on lawyers who filed bogus cases after relying on ChatGPT for legal research"
  creator: LawNext
  publisher: LawNext
  year: 2023
  url: https://www.lawnext.com/2023/06/court-imposes-sanctions-on-lawyers-who-filed-bogus-cases-after-relying-on-chatgpt-for-legal-research.html
  tier: C
  why: Clearest accessible account of the 22 Jun 2023 Mata v. Avianca order ($5,000, Judge Castel); the opinion itself was not fetchable (403).
  verified: true

register-deloitte-dewr:
  type: article
  title: "Deloitte refunds Aussie gov after AI fabrications slip into $440K welfare report"
  creator: Carly Page
  publisher: The Register
  year: 2025
  url: https://www.theregister.com/2025/10/06/deloitte_ai_report_australia/
  tier: C
  why: Detailed account of the fabricated references, who flagged them, the GPT-4o disclosure and the refund. No allowlisted primary was reachable.
  verified: true

willison-deloitte-refund:
  type: article
  title: "Deloitte to pay money back to Albanese government after using AI in $440,000 report"
  creator: Simon Willison
  publisher: simonwillison.net
  year: 2025
  url: https://simonwillison.net/2025/Oct/6/deloitte-to-pay-money-back/
  tier: C
  why: Quotes The Guardian original and gives the report dates (4 Jul and 26 Sep 2025) and the update note. Use for dates only.
  verified: true

charlotin-hallucination-cases:
  type: article
  title: "AI Hallucination Cases Database"
  creator: Damien Charlotin
  publisher: damiencharlotin.com
  year: 2026
  url: https://www.damiencharlotin.com/hallucinations/
  tier: C
  why: The only systematic count of court decisions involving AI-fabricated content (2,246 cases, 1,517 US, as of 31 Oct 2026). Includes some alleged cases.
  verified: true

vectara-hallucination-leaderboard:
  type: report
  title: "Vectara Hallucination Leaderboard"
  creator: Vectara
  publisher: GitHub
  year: 2026
  url: https://github.com/vectara/hallucination-leaderboard
  tier: C
  why: Public benchmark of faithfulness when summarising a given document (1.8% to about 11% across models, updated 22 Oct 2026). Vendor-run; cite as one benchmark.
  verified: true

khandelwal-indian-bhed:
  type: paper
  title: "Indian-BhED: A Dataset for Measuring India-Centric Biases in Large Language Models"
  creator: Khyati Khandelwal, Manuel Tonneau, Andrew M. Bean, Hannah Rose Kirk, Scott A. Hale
  publisher: arXiv
  year: 2023
  url: https://arxiv.org/abs/2309.08573
  tier: A
  why: India-specific evidence that caste and religion stereotypes come out of models trained on web text (63 to 79% caste, 69 to 72% religion for GPT-2 and GPT-3.5).
  verified: true
```

Domain check: github.com, lawnext.com, theregister.com, simonwillison.net, damiencharlotin.com are not in `content/source-policy.yml`; `npm run check` will flag "needs review". Tier C is declared with reasons.

## Gaps

- Kalai et al. full text not read (PDF unreadable): do not state the "error at least twice the classification error" relation.
- Mata opinion text not opened (Justia 403, CourtListener 403, RI courts 404).
- No allowlisted primary for Deloitte (DEWR timeout; Guardian and AFR blocked); refund amount unknown.
- Indian incident (ITAT Buckeye Trust) unconfirmed on date and AI cause.
- Bias evidence is one 2023 paper on older models; no current-model India audit found, and no RLHF rater-demographics source beyond IBM's RLHF video (~ not re-opened).
- agent-reach YouTube was rate limited; marks were checked with yt-dlp auto-captions (wording approximate).
- NotebookLM `inference-found` not queried; the distilled file was used as a lead list only.
