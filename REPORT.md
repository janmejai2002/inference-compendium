# HR & People Track Build & Review Report

## 1. Summary of Changes in Review Pass (TASK-54a0d26db117)

| Item | Chapter & Location | Original Claim / Issue | Remediation Applied |
|---|---|---|---|
| **1** | `ai-in-hiring.md` (line ~56) | `[@deloitte-india-campus-2026]` cited for "candidates are scored using vector embeddings" (Deloitte release says "embedding AI deeper", not vector embeddings). | Removed citation `[@deloitte-india-campus-2026]` from vector embeddings description. Explained embeddings and bi-encoder architectures as general machine learning concepts without sourcing to the campus report. |
| **2** | `ai-in-hiring.md` (line ~286) | Paraphrased Deloitte campus survey as "deploy AI-powered screening platforms in campus hiring". | Quoted the exact finding from the release: *"eighty-six percent of Indian employers adopt AI in recruitment [@deloitte-india-campus-2026]"*. |
| **3** | `ai-in-hiring.md` (line ~288) | "premier Indian recruiters are abandoning unproctored resume screening … proctored competency gates" had no citation in the release. | Re-worded and explicitly labeled as `*Illustrative industry trend:*` describing enterprise talent acquisition shifting toward live, proctored coding sandboxes and competency gates. |
| **4** | `ai-in-hiring.md` (length) | Chapter was 2,439 words (spec minimum is 3,000 words). | Expanded chapter with substantive material: worked Hazelwood two-standard-deviation calculation ($Z = -5.47, p < 10^{-6}$), NYC Local Law 144 independent audit report table and intersectional analysis of Simpson's Paradox ($AIR = 0.500$), algorithmic debiasing taxonomy (pre-processing, in-processing Lagrangian optimization, post-processing), and candidate-side prompt injection attacks and defensive ingestion pipeline hardening (XML delimiters, UTF-8 sanitization). Word count increased to **3,115 words**. |
| **5** | `hr-copilots-and-people-analytics.md` (lines 8, 16–22) | Opening hook and lede about a "global financial institution" with a 92% deflection rate and employee revolt read as an unsourced real event. | Explicitly labeled as Illustrative (unnamed firm) in frontmatter hook (`Why an illustrative enterprise HR bot...`) and opening narrative (`Consider an illustrative scenario at a global financial institution...` and `This illustrative scenario captures the fundamental paradox...`). |
| **6a** | `workforce-planning-and-skills.md` (lines 36–37) | 80% of workforce / 19% of workers task exposure statistics lacked citation. | Attached direct citation `[@eloundou-gpts-are-gpts-2023]` to both the 80% and 19% task exposure bullet points. |
| **6b** | `workforce-planning-and-skills.md` (lines 117–119) | 170M new roles / 92M displaced roles, 44% core skills change, and 6 in 10 reskilling statistics lacked direct citations. | Attached direct citation `[@wef-future-of-jobs-2025]` to each of the three WEF Future of Jobs 2025 bullet points. |
| **6c** | `hr-copilots-and-people-analytics.md` (line 144) | EU AI Act penalties up to €35 million / 7% and prohibitions effective 2 February 2025 lacked specific statutory citations. | Cited Article 113(b) for the 2 February 2025 emotion recognition prohibition and Article 99(3) for the €35 million / 7% turnover administrative fine under `[@eu-ai-act-annex-iii-employment]`. |

---

## 2. Chapter Status Table (Chapters 30–33)

Output from `node scripts/status.mjs`:

```text
#   id                          status      track        words  min  media
30  ai-in-hiring                published   hr           3115   14   2
31  workforce-planning-and-skillpublished   hr           4059   18   2
32  hr-copilots-and-people-analypublished   hr           3669   17   2
33  hr-casebook                 published   hr           5154   23   1
```

- Total words across HR Track: **15,997 words**
- Every chapter exceeds its specification word count threshold (3,000 for chapters 30–32; 4,000 for chapter 33).
- All 4 chapters published with status `published`.

---

## 3. Linter Output (`npm run check`)

```text
> ai-compendium@0.1.0 check
> node scripts/check.mjs

  ! chapters/what-is-a-model.md is not in toc.yml, so it is not built
  ! source 3b1b-neural-network: platform domain, tier A rests on the creator (Grant Sanderson). Confirm they are an originator.
  ! source karpathy-intro-llms: platform domain, tier A rests on the creator (Andrej Karpathy). Confirm they are an originator.
  ! source economist-mckinsey-crown: platform domain, tier B rests on the creator (The Economist (Tom Lee-Devlin and Jason Palmer)). Confirm they are an originator.
  ! source 3b1b-llm-briefly: platform domain, tier A rests on the creator (Grant Sanderson). Confirm they are an originator.
  ! source karpathy-deep-dive: platform domain, tier A rests on the creator (Andrej Karpathy). Confirm they are an originator.
  ! source ibm-predictive-vs-generative: platform domain, tier B rests on the creator (Martin Keen). Confirm they are an originator.
  ! source anthropic-fluency-prompting: platform domain, tier A rests on the creator (Anthropic). Confirm they are an originator.
  ! source mollick-sinek-skills: platform domain, tier B rests on the creator (Ethan Mollick). Confirm they are an originator.
  ! source ibm-rag-vs-finetuning: platform domain, tier B rests on the creator (IBM Technology). Confirm they are an originator.
  ! source ibm-rlhf-explained: platform domain, tier B rests on the creator (IBM Technology). Confirm they are an originator.
  ! source ibm-what-is-rag: platform domain, tier A rests on the creator (Marina Danilevsky). Confirm they are an originator.
  ! source ibm-agent-skills: platform domain, tier B rests on the creator (IBM Technology). Confirm they are an originator.
  ! source boyle-big-tech-debt: platform domain, tier B rests on the creator (Patrick Boyle). Confirm they are an originator.
  ! source google-meridian: platform domain, tier A rests on the creator (Google Marketing Science). Confirm they are an originator.
  ! source meta-robyn: platform domain, tier A rests on the creator (Meta Marketing Science (Gershkovich, Skokan, Wang, Lares)). Confirm they are an originator.
  ! source openai-evals-framework: platform domain, tier A rests on the creator (OpenAI). Confirm they are an originator.
check: 0 errors, 17 warnings
```

---

## 4. Figure Audit Output (`node test/inspect_figures.mjs`)

```text
Audited 34 figures across all pages.
Figures with text overflowing SVG boundary: 0
```

All 34 figures (including the 4 newly authored figures for the HR track: `hiring-funnel-ai.svg`, `task-exposure-matrix.svg`, `hr-copilot-trust-boundary.svg`, and `hr-casebook-taxonomy.svg`) pass headless Chromium SVG bounding box inspection with zero overflows.

---

## 5. Build Verification (`npm run build`)

```text
> ai-compendium@0.1.0 build
> node scripts/build.mjs

built 36/36 chapters → dist/ in 814 ms
```
