# Research packet task (Sonnet agents, step 3 of the v1 build)

Read `notes/build/BRIEF.md` first, then your chapter's entry in `content/toc.yml` and `docs/SOURCES.md`.
Do NOT write chapter text and do NOT touch `content/`. Write exactly two files:

## 1. `notes/build/<id>-packet.md`
- **Facts (6–10)** the chapter needs. Each: the claim, exact number and year as the source states it, source title/creator/date/URL, tier, and `✓ opened 2026-11-01` (you re-opened it today and saw the number) or `~ not re-opened` (avoid). Prefer originators over coverage.
- **Watch (1–2)**: videos only from the scored lists (`EMBED?`) or channels meeting the rubric gates. Give minutes, 2–4 `marks` you checked in the transcript (`agent-reach youtube subtitle`), what to skip, and why it is worth the time.
- **Read (1–2)**: one article/report/paper each, with why.
- **Interview questions (3)**: drawn from JD asks and casebook patterns in the research files; say which pattern/JD evidence each comes from. Never "asked at firm X" unless a source says so.
- **Indian business example (1)**: with a source, or marked `Illustrative` (then make it plausible, no real firm's invented numbers).
- **Misconceptions (1–3)** worth a myth block, and **a sourced stat** for a stat block.
- **sources.yml-ready entries**: a fenced yaml block with every source above in the registry format (see top of `content/sources.yml`: type, title, creator, publisher, year, minutes/marks for video, url, tier, why, verified). `verified: true` only for what you opened today. Check the domain against `content/source-policy.yml`.
- **Gaps**: what you could not confirm.

## 2. `notes/build/<id>-toc.yml`
```yaml
questions:
  - "..."   # the 3 interview questions
seed_sources:
  - { title: "...", url: "...", tier: A }
```

Keep the packet under ~250 lines. Return a receipt of ≤ 10 lines (file written, fact count, verified count, best Watch card, gaps).
