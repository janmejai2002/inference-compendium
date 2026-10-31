# Authoring syntax

Chapters are Markdown with a few additions. The design book (`dist/design.html`, section 06) shows every block rendered next to its source.

## Front matter

```yaml
---
id: what-is-a-model            # must match the toc.yml id and the filename
title: What is a model, really?
deck: One or two sentences under the title.
level: Zero to one             # free text
tracks: [foundations, consulting]   # lens chips on the opener; ids from book.yml
hook: The puzzle in the black box on the opener.
objectives:                    # 3–4, each starting with a bold Bloom verb
  - "**Define** ..."
---
```

## Inline

| You type | You get |
|---|---|
| `==sentence==` | Highlighter mark. This is the skim layer. About one per section. |
| `^[note text]` | Margin note (rail in print/wide screens, inline on phones). Markdown allowed inside. |
| `[[token]]` or `[[parameter\|parameters]]` | Glossary term from `content/glossary.yml`. First use per chapter puts the definition in the rail. |
| `[@source-id]` | Short citation "[Author et al., year]" linked to the source; adds it to the back-of-book index. |
| `## Heading` | Numbered section (§ 01.2). Use `####` for labels inside blocks. |

## Lines on their own

| You type | You get |
|---|---|
| `{{watch id}}` `{{read id}}` `{{paper id}}` `{{listen id}}` | Media card from `content/sources.yml`, with QR code, tier and timestamps. The keyword is for readability; the card type comes from the source's `type`. |
| `{{figure id \| Caption \| Source line}}` | Numbered figure from `content/figures/id.svg`. `{{figure-wide ...}}` spans into the rail. |

## Blocks

Open with `::: name Optional title`, close with `:::`. Markdown works inside.

| Block | Use |
|---|---|
| `::: principle Title` | Derivation as a numbered list; the last item is the conclusion (∴). |
| `::: concept Term` | Paragraphs starting `**Plain words.**`, `**Analogy.**`, `**Misconception.**` |
| `::: case Illustrative · Title` | `#### The situation` / `#### The decision` / `#### Your move`. Say Illustrative unless sourced. |
| `::: lens marketing` | Track id after the name. Two or three sentences. |
| `::: interview Title` | `**Q.** question`, a `> "strong opening line"`, `**What they are testing.**`, `**A strong structure.**` |
| `::: myth` | Two paragraphs: `**Myth.** ...` then `**Reality.** ...` |
| `::: stat 40%` | Body = meaning, then `<span class="src">Source: [@id]</span>` |
| `::: pull` | Quote paragraph, then attribution paragraph. Max one per chapter. |
| `::: try Title` | Instructions plus a fenced code block holding the prompt. |
| `::: check Check yourself` | Numbered questions, each ending `<span class="lvl">recall|apply|explain|transfer|judge</span>` |
| `::: answers` | Numbered answers matching `check`. Prints upside down. |
| `::: recap The night-before page` | Five numbered lines. Prints on its own page. |

## Figures

Hand-written or generated SVG. Colour with classes so figures follow the theme: `ink`, `ink-s` (stroke), `acc`, `acc-s`, `wash`, `rule-s`, `mk` (highlighter), `paper`, and `t-display` for headline text. Text defaults to the mono face.
