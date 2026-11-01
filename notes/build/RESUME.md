# v1 build: resume point (kept current by the orchestrator)

Updated 2026-11-02.

## Done
- Step 1: `content/toc.yml` (16 units, explicit n for opener 00 and inserts A/B; render.mjs honours `n`), `docs/TOC-RATIONALE.md`. Questions + seed_sources merged from packets.
- Step 2: `notes/build/BRIEF.md` (house rules, corrections, NotebookLM notebook map), `notes/build/CHAPTER-TASK.md`, `PACKET-TASK.md`.
- Step 3: all 16 packets in `notes/build/<id>-packet.md`. Allowlist updated.
- Drafts committed: kinds-of-ai, next-word-machine (wave 1 + NotebookLM cross-check), delegation-brief, your-documents.

## In flight / next
- confidently-wrong: file written, verify step pending. models-that-act, who-pays: started (wave 3 early).
- Then judging-output (needs confidently-wrong), wave 4 pilots-stall, work-changes, consulting-firm; wave 5 ai-casebook (~20 pp), interview-room, state-of-play, india-briefing; wave 6 ai-in-one-sitting.
- Per wave: set `status: draft` in toc.yml, `npm run check`, commit `ch <id>, <id>: draft`.
- Step 6 ship: `npm run pdf`, look at chapter openers + Watch/Read cards, `npm run proof:bw`, STATUS.md (also: co-editor chaitanya-sharma invited 2026-11-01 with write access), `editions/INFERENCE-v1-draft.pdf`, workflow-log, push (main is ahead of origin).

## Friction to log (workflow-scout)
- agent-reach YouTube 429s all session; yt-dlp auto-captions worked.
- Video-scorer `marks` were often wrong (delegation-brief: 5 of 6 off); always re-check in transcript.
- agy runs time out at ~500 s; run in background, capture full output.
- NotebookLM relogin needs a notebooklm.google.com tab open in Brave before `nlm login`.
- Unquoted colons in YAML (`why:`, template `deck:`) broke the registry and `npm run new`.
