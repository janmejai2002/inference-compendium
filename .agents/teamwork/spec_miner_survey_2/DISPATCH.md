# DISPATCH: Survey Agent 2 (Pedagogy & Authoring Specifications)

- Identity: teamwork_spec_miner
- Working Directory: C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_survey_2\
- Authoritative User Request: C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md (MANDATORY: read this first!)

## Objective
Extract all authoring, formatting, pedagogical, and stylistic specifications required for INFERENCE chapters and the v3 PM track.

## Tasks
1. Read `ORIGINAL_REQUEST.md`.
2. Inspect `docs/PEDAGOGY.md` and `docs/AUTHORING.md`.
3. Read the anti-ai-writing rules / skill (`anti-ai-writing`).
4. Inspect 1-2 existing high-quality chapters in `content/` (e.g. from v1 Foundations/Consulting or v2 Marketing) to examine concrete syntax for:
   - Frontmatter (title, slug, part, number, epigraph, learning objectives, etc.)
   - Highlights syntax (`==...==`, count: 4-8)
   - Media cards syntax (count: 1-3)
   - Stat blocks syntax (lining-nums / plain numbers, count: 1)
   - Check questions with upside-down answers syntax (count: 4-6)
   - 5-line recap syntax
   - KaTeX math formatting (`$$...$$` and `$math$`)
   - Pipe tables (GFM standard)
5. Detail all validation rules enforced by the checker (`scripts/check.mjs` or similar).
6. Write a detailed specification document to `C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_survey_2\spec_report.md` and deliver `handoff.md`.


## 2026-11-03T08:10:52Z
[Message] timestamp=2026-11-03T08:10:52Z sender=63749ac4-d84d-4275-8f32-53b3635ebc8a priority=MESSAGE_PRIORITY_HIGH content=You are Survey Agent 2 (Pedagogy & Authoring Specifications).
Your working directory is: C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_survey_2\
Read your dispatch details at: C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_survey_2\DISPATCH.md
MANDATORY: Read C:\Users\Janmejai\compendium\.agents\teamwork\ORIGINAL_REQUEST.md first.

Extract all authoring, formatting, pedagogical, and stylistic specifications required for INFERENCE chapters:
- Inspect docs/PEDAGOGY.md and docs/AUTHORING.md.
- Review anti-ai-writing rules.
- Inspect 1-2 existing chapters in content/ to extract exact syntax for:
  - Frontmatter schema (all fields)
  - Highlights syntax (==...==, 4-8 per chapter)
  - Media cards syntax (1-3 per chapter)
  - Stat blocks syntax (lining-nums / plain numbers, exactly 1 per chapter)
  - Check questions with upside-down answers (4-6 per chapter)
  - 5-line recap syntax
  - KaTeX math formatting ($$...$$ and $math$)
  - Pipe tables (GFM standard)
  - Automated check rules in scripts/check.mjs
- Write your full report to C:\Users\Janmejai\compendium\.agents\teamwork\spec_miner_survey_2\spec_report.md
- Deliver handoff.md in your working directory and notify me via send_message with the path to your report.
