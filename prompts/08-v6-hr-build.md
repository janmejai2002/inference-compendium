# v6 Build: HR & People Track (Part VIII, Chapters 30–33)

> **How to run (agy):** read this file, then `CLAUDE.md` (repo rules), `docs/PEDAGOGY.md`, `docs/AUTHORING.md`, `docs/SOURCES.md`.
> Work on the branch you are on (`computer/hr-track`). **Never push** (this clone has no remote on purpose) and never touch `main`.
> Keep `PLAN.md` (your step list, ticked), `PROGRESS.md` (one line per step) and `REPORT.md` (final numbers) at the repo root.

## Mission

INFERENCE has Foundations, Consulting, Marketing, Product, Finance and Operations tracks. `book.yml` already defines the
`hr` track ("HR & People", short `HR`) but no chapter carries it. Build **Part VIII: HR & People** with four chapters, in the
same arc, evidence standard and look as Parts IV–VII. Inserts move from Part VIII to **Part IX** (their chapter letters A/B stay).

Reader: an Indian MBA student preparing for HR, people-consulting and general-management placements (HUL, Tata, Aditya Birla
LEAP, Mahindra, ITC, Deloitte HCM, EY People Advisory, Mercer, Aon). They must leave able to answer an interview question on
AI in hiring, workforce planning and employee data with structure, numbers and a point of view.

## 1. Table of contents (add to `content/toc.yml` before the Inserts part)

```yaml
  - id: p8
    n: VIII
    title: HR & People
    track: hr
    deck: AI in hiring, skills-based workforce planning, HR copilots and the surveillance line, and the HR casebook.
    chapters:
      - id: ai-in-hiring
        title: "AI in hiring: screening, assessment, and the bias audit"
        deck: "What a screening model really is, adverse impact and the four-fifths rule, bias audits under NYC Local Law 144, the EU AI Act's high-risk employment category, DPDP consent, and AI-written applications."
        tracks: [hr]
        prereq: [kinds-of-ai, confidently-wrong]
        status: draft
      - id: workforce-planning-and-skills
        title: "Workforce planning when the task is the unit: exposure, skills, and reskilling"
        deck: "Task-level AI exposure, skills taxonomies (O*NET, ESCO), build-buy-borrow-bot, reskilling economics, and attrition models with their ethics."
        tracks: [hr, strategy]
        prereq: [work-changes, pilots-stall]
        status: draft
      - id: hr-copilots-and-people-analytics
        title: "HR copilots, people analytics, and the surveillance line"
        deck: "HR helpdesk agents and deflection, AI-drafted performance reviews and calibration, engagement analytics, productivity monitoring, and what the EU AI Act and DPDP Act forbid or require."
        tracks: [hr]
        prereq: [models-that-act, judging-output]
        status: draft
      - id: hr-casebook
        title: "The HR & People AI casebook & interview room"
        deck: "Four worked HR cases and four guesstimates: campus screening at scale, BPO reskilling, an HR helpdesk copilot, and an attrition-risk model, with recruiter rubrics."
        tracks: [hr]
        prereq: [ai-in-hiring, workforce-planning-and-skills, hr-copilots-and-people-analytics]
        status: draft
```
Renumber the Inserts part to `n: IX`. Check the home-page track filter shows **HR & People (4)** and that `design/tokens.css` has
`--t-hr` (add one in the same style as the other track colours if it is missing).

## 2. Rules (zero violations; `npm run check` enforces most)

1. **Chapter arc:** every chapter follows `docs/PEDAGOGY.md` / `docs/AUTHORING.md` exactly like `content/chapters/predictive-maintenance-and-industrial-ai.md`
   (open it as the model): opener (hook, objectives) → lede with `==thesis==` → `::: principle` → `::: concept` → complication with
   `::: figure` → cited evidence → `::: case` → `::: lens` → `::: interview` → `::: try` (no code, no terminal) → `{{watch}}`/`{{read}}`
   cards → `::: check` + `::: answers` → `::: recap The night-before page`. 3,000–4,200 words per chapter; the casebook up to 7,000.
2. **Evidence:** every statistic, legal claim, date and named-company fact has an entry in `content/sources.yml` (tier per
   `docs/SOURCES.md`) and an inline `[@id]` or card. Set `verified: true` only after you opened the URL and checked title, publisher,
   date and the exact number you quote. Prefer primary sources: the law text or regulator page, the company's own filing or post,
   the original paper or survey. **Stricter than the v5 prompt:** a case may name a real company **only** if every number in it is
   sourced. Otherwise the company is unnamed ("a Pune-based IT services firm") and the box is labelled `Illustrative`. No invented
   rupee figures attached to real firms.
3. **Legal accuracy:** quote the instrument and section (e.g. EU AI Act Annex III point 4; Article 5(1)(f) on emotion recognition
   at work; NYC Local Law 144 of 2021 and its DCWP rules; the US EEOC four-fifths rule in the Uniform Guidelines, 29 CFR 1607.4(D);
   India's Digital Personal Data Protection Act 2023 and its Rules). State dates of application. Say "not legal advice" once per chapter
   in the lens or recap, not in every paragraph.
4. **Prose:** `CLAUDE.md` rule 6 (plain, direct, specific; no "delve", no em-dash asides, no "not X, but Y"). Indian context where
   natural: campus hiring at IT services firms, Naukri/LinkedIn volume, BPO/GCC workforces, Labour Codes, DPDP. Global anchors where
   the evidence is: Amazon's scrapped recruiting model (Reuters, 2018), NYC LL144 audits, EU AI Act.
5. **Math and tables:** KaTeX (`$…$`, `$$…$$`), e.g. adverse impact ratio $AIR = \frac{SR_{group}}{SR_{highest}}$ with the 0.8 threshold,
   selection rate, deflection rate, reskilling payback. Markdown tables only, never code blocks for tables.
6. **Figures:** one SVG per chapter in `content/figures/`: `hiring-funnel-ai.svg`, `task-exposure-matrix.svg`,
   `hr-copilot-trust-boundary.svg`, `hr-casebook-taxonomy.svg`. `viewBox="0 0 640 H"`, classes from `design/components.css`
   (no hard-coded colours), right-column text at x ≥ 350 under 45 characters per line, font size ≤ 8.5. `node test/inspect_figures.mjs` → 0 overflows.

## 3. Chapter blueprints

### 30 `ai-in-hiring`
- **Thesis:** ==A screening model is a selection policy written in data: it repeats the hiring decisions it learned from, and the law now audits it like one.==
- **Concepts:** the hiring funnel and why volume pushes firms to automate the top of it; what parsers, rankers, assessments and
  video-interview scoring each do; adverse impact, selection rate and the four-fifths rule (worked numerically); proxies (college,
  pin code, gaps) and why removing the protected column does not remove bias; bias audits under NYC LL144 (what is published, what is
  not); EU AI Act: recruitment and selection systems are high-risk (Annex III), obligations and dates; DPDP consent and notice for
  candidate data; candidate-side AI (AI-written CVs, interview assistance) and how assessments are changing.
- **Sourced case:** Amazon's experimental recruiting engine that downgraded CVs containing "women's" (Reuters, Oct 2018): what was learned.
- **Illustrative case:** an unnamed IT services firm screening 1,00,000 campus applications for 3,000 offers; compute selection rates by
  group from a small table and find the adverse-impact ratio.
- **Figure:** `hiring-funnel-ai.svg`: applications → parse → rank → assess → interview → offer, with where bias enters and where the audit measures.

### 31 `workforce-planning-and-skills`
- **Thesis:** ==AI exposure is measured per task, not per job, so workforce planning has to move from headcount by role to hours by task.==
- **Concepts:** task-based exposure (Eloundou et al., "GPTs are GPTs", 2023; ILO work on generative AI exposure); O*NET and ESCO
  as skills taxonomies; augmentation vs. automation; build / buy / borrow / bot; reskilling cost vs. severance vs. hiring cost;
  the WEF Future of Jobs Report 2025 figures (quote exactly, with the page); attrition-risk models: what they predict, the
  self-fulfilling-prophecy problem, and who should see the score.
- **Illustrative case:** a 20,000-seat BPO/GCC where a GenAI agent handles first-line queries: map tasks, size the hours freed, design the reskilling path.
- **Figure:** `task-exposure-matrix.svg`: tasks plotted by exposure vs. value of human judgement, four quadrants with actions.

### 32 `hr-copilots-and-people-analytics`
- **Thesis:** ==The employee data that lets HR answer a question in seconds is the same data that lets a manager watch someone all day; trust, not capability, sets the limit.==
- **Concepts:** HR helpdesk agents over policy documents (retrieval, escalation, deflection rate and how it is gamed); AI-drafted
  performance reviews and calibration (gendered language findings, only with a source); engagement and sentiment analytics;
  productivity and keystroke monitoring; the EU AI Act ban on emotion recognition in the workplace (Article 5(1)(f)) and
  its dates; DPDP Act duties for employee data (legitimate uses for employment, notice, data minimisation); works councils and consultation as a
  design constraint for global firms.
- **Illustrative case:** a private bank with 50,000 employees rolls out an HR copilot: define the deflection target, the escalation rules, what it may never answer, and the metric that shows trust is holding.
- **Figure:** `hr-copilot-trust-boundary.svg`: what the copilot may read and answer, what it must escalate, what is out of bounds.

### 33 `hr-casebook`
- Format like `operations-casebook`: four cases + four guesstimates, each with a recruiter rubric (what a strong vs. a mediocre answer does) and a model answer. All `Illustrative` unless fully sourced.
- **Cases:** (1) campus screening at scale with a bias audit plan; (2) reskilling vs. redeployment for a BPO facing a 40% first-line deflection; (3) HR helpdesk copilot go-live: guardrails, metrics, the first incident; (4) an attrition-risk model at a retail chain: build it, buy it, or refuse it.
- **Guesstimates:** recruiter hours saved by AI screening for 50,000 applications; reskilling cost per employee vs. severance + rehiring; HR helpdesk ticket volume for a 50,000-employee firm; the cost of interview fraud detection per hire.
- **Interview room:** 8–10 questions in the voice of HR/GM interviewers (HUL, Tata, Aditya Birla, Deloitte HCM, Mercer), each with a strong-answer structure.
- **Figure:** `hr-casebook-taxonomy.svg`: four cases left, four estimation models right.

## 4. Verification (do all, record the outputs in REPORT.md)

1. `npm run check` → **0 errors** (warnings no worse than the 17 at the start, list any new ones and why).
2. `node test/inspect_figures.mjs` → **0 overflows**.
3. `npm run status` → the four chapters listed with words and media counts (paste the table into REPORT.md).
4. `npm run pdf` → copy `dist/INFERENCE.pdf` to `editions/INFERENCE-v6-hr-draft.pdf`; note the page count.
5. Read back one rendered page per new chapter from the page images and confirm figures and maths render.
6. Update `STATUS.md` (chapters 36/36, words, pages, sources, what's next = Strategy & GM track).
7. Commit on `computer/hr-track` in logical commits (`feat(hr): ch ai-in-hiring …`). **Do not push.**
