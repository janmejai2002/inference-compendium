# Project skills, commands and tools

Built as the work showed a need (see `notes/workflow-log.md`). Agents propose new ones via the `workflow-scout` skill; editors approve.

| Name | Kind | Use it for |
|---|---|---|
| `/toc` | command | open-ended TOC discussion; writes only `notes/toc/` |
| `/toc-compile` | command | settled discussion → `content/toc.yml` + rationale |
| `/build-v1` | command | whole v1 edition in one session: TOC → research packets → chapters in waves → verifier → PDF (`prompts/03-v1-build.md`) |
| `/toc-import` | command | a toc.yml made in another chat → repo |
| `/chapter <id>` | command | research and write one chapter |
| `/verify-sources` | command | open and verify sources in `content/sources.yml` |
| `/ship` | command | check, render, review pages, update STATUS, commit |
| `source-hunt` | skill | finding and vetting sources: Camoufox, Agent Reach, the bar |
| `workflow-scout` | skill | noticing repeated work and proposing tools |
| `npm run browser:setup` | script | one-time Camoufox install into `.venv/` |
| `scripts/browse.py` | script | Camoufox `read` / `search` / `shot` → JSON |
| `npm run proof:bw` | script | page images as a mono laser printer sees them → `dist/pages-bw/` |

External, machine-specific (may be missing on a collaborator's machine): `agent-reach` CLI (YouTube metadata and subtitles, Reddit, LinkedIn jobs, web search).
