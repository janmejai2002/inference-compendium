---
description: Import a toc.yml (and rationale) produced in a chat outside this repo
---
I will paste (or have pasted) a `toc.yml` and optionally a `TOC-RATIONALE.md` produced in another chat. Validate the YAML against the schema in `prompts/01-toc-session.md`, keep stable ids for chapters that already have files in `content/chapters/` (tell me about any renamed or dropped ones before overwriting), write `content/toc.yml` and `docs/TOC-RATIONALE.md`, run `npm run check && npm run build`, show `npm run status`, update `STATUS.md`, and commit `toc: import from planning session`. $ARGUMENTS
