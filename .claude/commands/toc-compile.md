---
description: Turn the settled TOC discussion into content/toc.yml
---
Only run this when I ask for it. Read `notes/toc/DISCUSSION.md` (its "Decided" and "Candidate structure" sections are the plan) and `docs/TOC-SCHEMA.md`. If anything the schema needs is still undecided, list it and ask before writing. Then write `content/toc.yml`, and `docs/TOC-RATIONALE.md` (evidence summary, track × chapter coverage matrix, what was left out and why, drawn from the notes). Keep ids of chapters that already have files in `content/chapters/`; tell me about any renamed or dropped ones first. Run `npm run check && npm run build`, show `npm run status`, update `STATUS.md`, commit `toc: <one-line summary>`. $ARGUMENTS
