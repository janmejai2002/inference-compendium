---
name: workflow-scout
description: Watch how the INFERENCE editors work and turn repeated effort into new skills, commands or scripts. Use at the end of every session in this repo, and whenever you notice yourself or the user doing the same multi-step thing a second time.
---

# Workflow scout

This project is meant to get faster every session. You are its observer: notice friction, write it down, and propose tools that remove it. The user decides what gets built.

## While working, notice

- A sequence you've now done twice (same searches, same checks, same fix to a page).
- A judgement the user keeps repeating ("not that source", "shorter", "add an Indian example") — that's a rule waiting to be written down.
- Context you had to re-read or re-derive that a file could have handed you.
- Tool failures and their workarounds (a site that blocks fetch, a Paged.js layout quirk).
- Anything the user says about how they like to work.

## Log it (cheap, every time)

Append to `notes/workflow-log.md`, newest at the bottom:

```
## 2026-11-02 · toc discussion
- seen: checked 3 recruiter reports by hand for "AI" mentions → candidate: `recruiter-scan` script
- rule: user rejects consulting-firm marketing pages unless they contain data → add to docs/SOURCES.md?
- friction: InsideIIM blocks WebFetch; browse.py works
```

## Propose (at session end, or the moment a pattern hits twice)

Tell the user in two or three lines: what you saw, what you'd build, what it saves. Kinds of fix, smallest first:

1. **A rule** → one line in `docs/*.md` or `CLAUDE.md`.
2. **A script** → `scripts/` + an `npm run` entry (deterministic work: checks, reports, transforms).
3. **A command** → `.claude/commands/<name>.md` (a repeatable prompt the user triggers).
4. **A skill** → `.claude/skills/<name>/SKILL.md` (know-how the agent should load on its own when a task matches).

Build only after the user says yes. For a skill: frontmatter `name` + a one-sentence `description` that says when to use it (descriptions load into every session, so keep them short), body under ~80 lines, link docs instead of copying them. Then add a row to `docs/SKILLS.md` and mark the log line `→ built <name>`.

Don't build speculative tools, and never more than one or two per session.
