---
description: Check, render the PDF, review pages, update STATUS.md and commit
---
1. `npm run check`. Fix every error; list warnings you are leaving and why.
2. `npm run pdf`. Read `dist/pages/pages.json`, look at the page images for anything changed this session, and fix bad breaks (a heading alone at a page foot, a block split awkwardly, a mostly empty page).
3. Update `STATUS.md`: what changed, what's next, open questions.
4. `git add -A && git commit` with a message naming the area (`ch <id>: ...`, `toc: ...`, `design: ...`, `pipeline: ...`). Push if a remote exists.
If this is a milestone I name ($ARGUMENTS), also copy `dist/INFERENCE.pdf` to `editions/INFERENCE-<milestone>.pdf` and commit it.
