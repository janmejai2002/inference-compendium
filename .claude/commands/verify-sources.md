---
description: Open and verify unverified sources in content/sources.yml
---
Run `npm run check` and take every source flagged "not verified yet" (or only those named here: $ARGUMENTS). For each one, open the URL (follow the `source-hunt` skill: WebFetch first, `scripts/browse.py` via Camoufox when that fails, `agent-reach youtube` for video details and timestamps) and confirm the title, creator, year, duration, and every timestamp, number or quote the chapters take from it. Correct the entry, then set `verified: true`. If a source can't be confirmed or is weaker than its tier, say so and propose a replacement from `docs/SOURCES.md` tier A/B. Finish with `npm run check:links` and commit `sources: verify <ids>`.
