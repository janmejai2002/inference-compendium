# Workflow log

Agents append what they notice (see `.claude/skills/workflow-scout/SKILL.md`). Newest at the bottom. Mark lines `→ built <name>` once a tool exists.

## 2026-10-31 · setup
- friction: `pip install` into C:\Python313 fails (not writable, user site missing) → built `npm run browser:setup` (repo-local .venv)
- friction: Camoufox search results still include SEO rewrites of studies (e.g. a "stories" site restating the HBS/BCG paper) → rule added to `source-hunt`
- seen: B&W proofing by eye after every design change → built `npm run proof:bw`
