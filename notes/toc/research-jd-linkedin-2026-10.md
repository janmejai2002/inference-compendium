# Research: what Indian JDs ask about AI (LinkedIn, October 2026)

_Session 1, 2026-10-31. Signal, not citable fact: it tells us what to cover. Every JD is archived verbatim with URL and fetch time, so any line below can be shown to a sceptic._

## Method (so it can be repeated and defended)

- **Source:** LinkedIn's public guest job pages (no login): `jobs-guest/jobs/api/seeMoreJobPostings/search` for the list, `jobs-guest/jobs/api/jobPosting/<id>` for the full JD. Agent Reach's LinkedIn channel was unavailable (port clash), so this was done directly.
- **Filters:** location India, posted in the last 30 days (all postings dated 2026-10-01 to 2026-10-31), first 40 results per query.
- **Two samples:**
  1. **Baseline:** 20 role queries across 7 tracks ("brand manager MBA", "credit analyst MBA bank", "HR business partner MBA"...) with **no AI word in the search**, so the AI rate is not inflated by how we searched. 713 postings → 687 unique.
  2. **AI-explicit:** 14 queries ("AI product manager", "AI strategy consultant", "banking generative AI", "HR AI"...) to see *what* AI roles ask for. 360 postings → 337 unique.
- **What counts:** a sentence mentioning AI counts only if it asks something of the *candidate*. Dropped: recruitment disclaimers ("we may use AI to screen applications", 49 sentences), company blurbs ("X is an AI-first company", 69+), identical reposts across sister brands. Hand audit of 20 random positives: 19 genuine asks, 1 product description (~95% precision).
- **Files** (all in [evidence/](evidence/)): raw `linkedin-jds-baseline-2026-10.jsonl` (3.2 MB) and `linkedin-jds-ai-2026-10.jsonl` (2.1 MB); per-posting tables `jd-baseline-asks.csv`, `jd-ai-asks.csv`; every verbatim ask with its link in `jd-baseline-asks.md`, `jd-ai-asks.md`; scripts `li_scrape.py`, `li_analyse.py`, `li_asks.py`.

## Limits (say these out loud whenever we use the numbers)

- **LinkedIn ≠ campus.** McKinsey and BCG don't appear at all, Bain 3 times; MBB and most day-zero recruiters hire through placement cells, not LinkedIn. The baseline is mostly lateral and mid-senior hiring (Mid-Senior 256, Associate 65, Entry 26). It shows **the job a graduate walks into**, not the campus JD. The campus JD PDFs placement committees circulate would be the better sample.
- Search relevance is LinkedIn's; "MBA" in the query doesn't guarantee an MBA role (516 of 713 mention MBA/PGDM/B-school; rates are similar in that subset).
- One month, 40 results per query. Good for direction, not for decimals.

## Finding 1: about one in five MBA-track JDs now asks something about AI; product is three in five

Baseline, unique postings, candidate-facing asks only:

| track | n | asks about AI | use AI tools | drive AI adoption | build/own AI product | governance/risk |
|---|---|---|---|---|---|---|
| consulting | 95 | **25%** | 8% | 13% | 9% | 3% |
| finance | 140 | **16%** | 6% | 4% | 5% | 1% |
| general mgmt / CoS / BD | 116 | **20%** | 11% | 8% | 6% | 3% |
| HR | 78 | **15%** | 3% | 6% | 4% | 1% |
| marketing | 103 | **17%** | 6% | 6% | 5% | 5% |
| operations | 86 | **15%** | 3% | 10% | 5% | 3% |
| product | 69 | **59%** | 12% | 29% | 35% | 17% |
| **all** | 687 | **22%** | 7% | 10% | 9% | 4% |

Compare Naukri's 2026 figure for AI skills in *all* non-tech JDs: ~1.6% (secondary coverage; see market file). MBA-track roles are roughly **10× the non-tech average**: the asks concentrate exactly where our readers are going.

Raw keyword rate before cleaning was 29%. About a quarter of AI mentions in JDs are boilerplate, a useful reading lesson for students in itself.

## Finding 2: the ask is "use it and drive it", not "build it", except in product

Outside product, the commonest asks are using AI tools and *finding where AI should be used* (adoption, automation, use cases). Verbatim examples (links in `jd-baseline-asks.md`):
- Vantrock, Investment Analyst: "You use AI tools every day in your work and can show what you have done with them"
- AKMV, M&A Senior Associate: "comfortable leveraging traditional financial tools as well as emerging AI-powered tools to enhance research, analysis and execution efficiency"
- PwC AC India, Business Strategy & Ops: "GenAI + Agentic AI + LLM use cases at strategy level (not hands-on)"
- Amazon, Ops Manager: "experience identifying and implementing AI, automation, or data-driven solutions to improve business processes"
- Merck Healthcare, HRBP: "you understand its mechanics, recognize its limitations, and apply ethical judgment around fairness, privacy, and accountability when using AI tools"
- proMX, Marketing Manager: "Use approved AI tools for research, localization, drafting… Review AI-supported outputs for quality, compliance"
- Morgan Stanley, IB Analyst Mumbai: "knowledge of AI tools is encouraged"

The Merck line is close to a one-sentence brief for this book: **mechanics, limitations, judgment**.

## Finding 3: AI roles speak a specific vocabulary, in a specific order

Share of AI-explicit JDs (n=360) mentioning each concept, against baseline (n=713):

| concept | AI roles | baseline |
|---|---|---|
| agents / agentic | 54% | 3.5% |
| LLM | 49% | 2.9% |
| change management / adoption | 42% | 19% |
| Python | 33% | 2.8% |
| use-case identification | 31% | 3.1% |
| ROI / business case | 30% | 19% |
| prompting | 29% | 2.2% |
| RAG / retrieval | 28% | 1.0% |
| SQL | 27% | 5.6% |
| responsible AI / governance | 27% | 0.7% |
| Copilot / Claude / Gemini / ChatGPT | 13 / 13 / 7 / 6% | <2% each |
| evals | 9% | 0.6% |
| hallucination | 7% | 0.4% |
| EU AI Act / DPDP | 1.4% | 0% |

What it tells us:
- **"Agents" is now the headline word** (54%), ahead of "LLM". The book must explain agents properly, and early enough that later chapters can use the word.
- The vocabulary **LLM → prompting → RAG → agents → evals → governance** is the same dependency chain the book's Part II follows. The market and the pedagogy agree on the order.
- **The business half is as big as the tech half:** change management 42%, use cases 31%, ROI 30%. An AI-for-managers book that's all mechanism misses half of what's asked.
- **Python shows up in a third of AI-role JDs.** That bears on the technical-floor question (open with editors).
- **Indian regulation barely appears** (DPDP 0–1%). Employers don't ask for it yet. Keep it in the book as an edge (RBI FREE-AI for finance), but don't give it a big chapter.
- **JDs name enterprise tools (Copilot, Claude) more than ChatGPT**, a hint that the workplace stack isn't the consumer one.

## Finding 4: by seniority (small n, direction only)

Baseline ask rate: Entry 1/26, Associate 19/64 (30%), Mid-Senior 46/254 (18%), Director 7/21 (33%). In the AI-explicit sample, entry-level roles ask as much as senior ones (10/10). Read with Stanford's "entry-level squeeze" finding: there are fewer generic entry roles, and the AI-flavoured ones expect AI from day one.

## Next steps for this thread
- Get **campus JD PDFs** from 2025–26 placement processes (editors' placement committees) and run the same classifier. That's the sample that really matters.
- Re-run the scrape in January and April for a trend line ("we measured it three times in a year").
- Pull the **AI-role JDs from top campus recruiters' careers sites** (Accenture Strategy, EY-Parthenon, Kearney, HUL, ITC, Amazon, Flipkart, HDFC, Goldman) directly.

## Addendum (2026-11-01): 15 consulting firms searched by name

Third sample: `"<firm> consultant"` style queries for McKinsey, BCG, Bain, Kearney, Accenture Strategy, EY-Parthenon, Deloitte, PwC Strategy&, KPMG, A&M, ZS, Oliver Wyman, Roland Berger, ADL, Redseer. 509 postings → 379 unique. Files: `evidence/linkedin-jds-consulting-firms-2026-10.jsonl`, `jd-consulting-firms-asks.{md,csv}`.

- **35% ask something about AI** (consulting roles in the generic baseline: 25%). Highest: BCG 78% (14/18), Deloitte 69% (11/16), Accenture Strategy 64% (7/11), ZS 43%. MBB: McKinsey 32% (12/37), Bain 30% (8/27).
- **Correction to "Limits" above:** MBB do appear when searched by name; they didn't surface in role-based searches. Their LinkedIn postings are mostly experienced/specialist hires (QuantumBlack, BCG X, knowledge centres in Gurugram/Bengaluru), not the campus Associate role.
- Caveat: name searches pull non-consulting roles at those firms (IT, research, ops); small n per firm, so read the firm rows as direction only.
