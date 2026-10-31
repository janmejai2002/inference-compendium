# INFERENCE — the AI compendium for the business mind

A placement-prep compendium on AI for students at Indian business schools, built like a magazine and versioned like software.

- **Read it:** `editions/` holds committed PDF snapshots. Build the latest yourself with the steps below.
- **See the design:** `npm run pdf`, then open `dist/design.html`.

## Setup (once)

Needs Node 20+ and Google Chrome or Microsoft Edge.

```
git clone <this repo>
cd <repo>
npm install
npm run pdf          # → dist/INFERENCE.pdf, dist/design.html, dist/index.html
npm run browser:setup  # optional: Camoufox for source research (needs Python 3.10+)
npm run dev          # → http://127.0.0.1:4321, live reload while you write
```

## How the work flows

```
/toc discussions ──► notes/toc/ ──► /toc-compile ──► content/toc.yml
                     │
Chapter session ──► content/chapters/<id>.md + content/sources.yml + content/glossary.yml
                     │
npm run check ──► npm run pdf ──► git commit ──► push
```

Each step has a ready prompt in `prompts/` and a slash command in `.claude/commands/` (`/toc`, `/toc-compile`, `/chapter <id>`, `/verify-sources`, `/ship`; full list in `docs/SKILLS.md`). Agents start from `CLAUDE.md`; current progress is in `STATUS.md`.

## Working together

- One chapter per branch: `git switch -c ch/<id>`, write it, `/ship`, open a pull request. The other editor reviews the PR; the diff shows exactly what text, sources and claims changed.
- `content/toc.yml` is shared ground. Change it only in a TOC session, in its own commit.
- Never commit `dist/`. Milestone PDFs go in `editions/` via `/ship <milestone>`.

## Repo map

See the table in `CLAUDE.md`.
