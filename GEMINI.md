# INFERENCE: agent guide for Gemini / Antigravity

This repo was started in Claude Code. `CLAUDE.md` is the full project guide and applies to you too: read it first (it is short). This file adds only what differs for an Antigravity session.

## You are continuing the v1 build
Run `prompts/04-v1-build-antigravity.md`. Current state is in `notes/build/RESUME.md`; read it before anything else.

## Shell
The terminal is PowerShell. `npm run ...` works unchanged. Chain with `;` not `&&`. Use absolute paths.

## Differences from the Claude Code setup
- **No sub-agents.** Write chapters one at a time, in the order in RESUME.md, committing after each.
- **Cross-model check** must use a different model from the writer (you are Gemini). Run, with the repo as working directory:
  `agy -p "<verifier prompt from notes/build/CHAPTER-TASK.md>" --model claude-sonnet-4-6 --mode plan --output-format json --print-timeout 900s`
  If that model is unavailable, use `gemini-3.8-flash-medium` and say so in the commit message.
- **Prose filter:** the `anti-ai-writing` skill is a file. Read `C:/Users/Janmejai/.claude/skills/anti-ai-writing/SKILL.md` once, then apply it to each chapter.
- **Source hunting:** `.claude/skills/source-hunt/` in this repo describes the method; the tools (WebFetch-equivalent browsing, `scripts/browse.py` via `.venv`, `yt-dlp` for transcripts, `nlm`) all run from the shell.
- **NotebookLM:** `nlm query notebook <id> "<question>"`; notebook ids are in `notes/build/BRIEF.md`. Never cite a NotebookLM answer.
