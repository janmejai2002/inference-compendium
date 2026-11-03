# v1 build: resume point (kept current by the orchestrator)

Updated 2026-11-02.

## Done
- Step 1: `content/toc.yml` (16 units, explicit n for opener 00 and inserts A/B; render.mjs honours `n`), `docs/TOC-RATIONALE.md`. Questions + seed_sources merged from packets.
- Step 2: `notes/build/BRIEF.md` (house rules, corrections, NotebookLM notebook map), `notes/build/CHAPTER-TASK.md`, `PACKET-TASK.md`.
- Step 3: all 16 packets in `notes/build/<id>-packet.md`. Allowlist updated.
- Drafts committed (16): kinds-of-ai, next-word-machine (+ NotebookLM cross-check), confidently-wrong, delegation-brief, your-documents, models-that-act, judging-output, who-pays, pilots-stall, work-changes, consulting-firm, ai-casebook, interview-room, state-of-play, india-briefing, ai-in-one-sitting.

## Next (handed to Antigravity, 2026-11-02: prompts/04-v1-build-antigravity.md)
- Complete: v1 draft shipped (14 units + 2 inserts, 250 pages, zero errors, committed and pushed).

## Friction to log (workflow-scout)
- agent-reach YouTube 429s all session; yt-dlp auto-captions worked.
- Video-scorer `marks` were often wrong (delegation-brief: 5 of 6 off); always re-check in transcript.
- agy runs time out at ~500 s; run in background, capture full output.
- NotebookLM relogin needs a notebooklm.google.com tab open in Brave before `nlm login`.
- Unquoted colons in YAML (`why:`, template `deck:`) broke the registry and `npm run new`.
