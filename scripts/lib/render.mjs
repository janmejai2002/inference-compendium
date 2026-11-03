// Markdown → magazine HTML. One renderer for web, print and the design book.
// Authoring syntax is documented in docs/AUTHORING.md — keep the two in sync.
import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import mark from 'markdown-it-mark';
import QRCode from 'qrcode';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const readYaml = (p) => yaml.load(fs.readFileSync(path.join(ROOT, p), 'utf8')) || {};
export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const MEDIA_LABEL = { video: 'Watch', article: 'Read', paper: 'Paper', report: 'Report', podcast: 'Listen', book: 'Book' };
const MEDIA_CLASS = { video: 'watch', article: 'read', paper: 'paper', report: 'read', podcast: 'listen', book: 'read' };
const TIER_LABEL = { A: 'primary source', B: 'established analysis', C: 'use with care' };
const BLOCK_LABEL = {
  principle: 'From first principles', concept: 'Concept', case: 'Case', interview: 'Interview room',
  myth: 'Myth / reality', try: 'Try it yourself', check: 'Retrieval practice', recap: 'Skim layer',
};

// ---------------------------------------------------------------- data
export async function loadBook() {
  const book = readYaml('book.yml');
  const onlineUrl = book.online_url || 'https://janmejai2002.github.io/inference-compendium/';
  book.online_url = onlineUrl;
  book.online_qr = await QRCode.toString(onlineUrl, {
    type: 'svg',
    margin: 0,
    errorCorrectionLevel: 'M',
    color: { dark: '#ffffff', light: '#0000' }
  });
  book.online_qr_dark = await QRCode.toString(onlineUrl, {
    type: 'svg',
    margin: 0,
    errorCorrectionLevel: 'M',
    color: { dark: '#111427', light: '#0000' }
  });

  const toc = readYaml('content/toc.yml');
  const sources = readYaml('content/sources.yml');
  const glossary = readYaml('content/glossary.yml');
  const trackById = Object.fromEntries(book.tracks.map((t, i) => [t.id, { ...t, index: i }]));

  for (const [id, s] of Object.entries(sources)) {
    s.id = id;
    s.qr = await QRCode.toString(s.url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#111427', light: '#0000' } });
  }

  const chapters = [];
  let n = 0;
  for (const part of toc.parts || []) {
    part.chapters = part.chapters || [];
    for (const c of part.chapters) {
      // An explicit `n` in toc.yml (opener "00", inserts "A", "B") does not advance the count.
      if (c.n != null) c.n = String(c.n);
      else { n += 1; c.n = String(n).padStart(2, '0'); }
      c.part = part;
      c.track = c.track || part.track || 'foundations';
      const file = path.join(ROOT, 'content', 'chapters', `${c.id}.md`);
      c.file = fs.existsSync(file) ? file : null;
      if (c.file) {
        const { data, content } = matter(fs.readFileSync(file, 'utf8'));
        Object.assign(c, { ...data, title: data.title || c.title, body: content });
      }
      chapters.push(c);
    }
  }
  return { book, toc, sources, glossary, chapters, trackById };
}

// ---------------------------------------------------------------- markdown engine
function engine(state) {
  const md = new MarkdownIt({ html: true, typographer: true, linkify: false });
  md.use(mark);

  const simple = (name, { label = BLOCK_LABEL[name], tag = 'aside', titled = true } = {}) => {
    md.use(container, name, {
      render(tokens, idx) {
        const t = tokens[idx];
        if (t.nesting !== 1) return `</div></${tag}>\n`;
        const info = t.info.trim().slice(name.length).trim();
        let k = label;
        if (name === 'concept') { state.concept += 1; k = `${label}<span class="n">${state.chapter.n}.${state.concept}</span>`; }
        const head = titled ? `<header class="blk-h"><span class="blk-k">${k}</span>${info ? `<span class="blk-t">${md.renderInline(info)}</span>` : ''}</header>` : '';
        return `<${tag} class="blk blk-${name}">${head}<div class="blk-b">\n`;
      },
    });
  };
  ['principle', 'concept', 'case', 'interview', 'myth', 'try', 'check', 'recap'].forEach((n) => simple(n));
  simple('pull', { titled: false });

  md.use(container, 'lens', {
    render(tokens, idx) {
      const t = tokens[idx];
      if (t.nesting !== 1) return `</div></aside>\n`;
      const id = t.info.trim().split(/\s+/)[1] || 'strategy';
      const tr = state.trackById[id] || { name: id };
      return `<aside class="blk blk-lens" style="--lens: var(--t-${id})"><header class="blk-h"><span class="blk-k">${esc(tr.name)} lens</span></header><div class="blk-b">\n`;
    },
  });
  md.use(container, 'stat', {
    render(tokens, idx) {
      const t = tokens[idx];
      if (t.nesting !== 1) return `</div></aside>\n`;
      return `<aside class="blk blk-stat"><p class="stat-n">${esc(t.info.trim().slice(4).trim())}</p><div class="blk-b">\n`;
    },
  });
  md.use(container, 'answers', {
    render(tokens, idx) {
      if (tokens[idx].nesting !== 1) return `</div></details>\n`;
      return `<details class="answers"${state.target === 'print' ? ' open' : ''}><summary>Answers — cover them, try first</summary><div class="flip">\n`;
    },
  });

  // Tables get a scroll wrapper so phones never scroll the page sideways.
  md.renderer.rules.table_open = () => '<div class="table-wrap"><table>\n';
  md.renderer.rules.table_close = () => '</table></div>\n';
  return md;
}

// ---------------------------------------------------------------- pieces
export function mediaCard(s, target) {
  const kind = MEDIA_CLASS[s.type] || 'read';
  const marks = (s.marks || []).map((m) => `<li><span class="ts">${esc(m.t)}</span><span>${esc(m.label)}</span></li>`).join('');
  const host = s.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
  return `<figure class="media media-${kind}" id="src-${esc(s.id)}">`
    + `<div class="media-tag"><span class="media-kind">${MEDIA_LABEL[s.type] || 'Read'}</span><span class="media-dur">${s.minutes ? `${s.minutes} min` : ''}</span><span class="media-tier">Tier ${esc(s.tier)} · ${TIER_LABEL[s.tier] || ''}</span></div>`
    + `<div class="media-main"><p class="media-title"><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a></p>`
    + `<p class="media-by"><b>${esc(s.creator)}</b> · ${esc(s.publisher)} · ${esc(s.year)}</p>`
    + `<p class="media-why">${esc(s.why)}</p>${marks ? `<ul class="media-marks">${marks}</ul>` : ''}</div>`
    + `<div class="media-qr">${s.qr}<span>${esc(host)}</span></div></figure>`;
}

function figure(state, raw, wide) {
  const [id, caption = '', source = ''] = raw.split('|').map((x) => x.trim());
  state.fig += 1;
  const f = path.join(ROOT, 'content', 'figures', `${id}.svg`);
  const art = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : `<p class="mono">missing figure: ${esc(id)}</p>`;
  return `<figure class="fig${wide ? ' wide' : ''}" id="fig-${esc(id)}"><div class="fig-art">${art}</div>`
    + `<figcaption><span class="fig-n">Fig ${state.chapter.n}.${state.fig}</span>${state.md.renderInline(caption)}${source ? `<span class="fig-src">${esc(source)}</span>` : ''}</figcaption></figure>`;
}

// Replace {{media}}, {{figure}}, ^[sidenote], [@cite] and [[term]] before markdown parsing.
function preprocess(state, body) {
  const { sources, glossary } = state;
  let sn = 0;
  const seenTerms = new Set();
  // Strip leading ∴ in numbered conclusion steps in principle blocks (CSS ::before badge renders the ∴)
  body = body.replace(/(:::\s*principle[\s\S]*?)(^\s*\d+\.\s*)∴\s*/gm, '$1$2');
  body = body.replace(/^\{\{\s*(watch|read|paper|listen|media)\s+([\w-]+)\s*\}\}\s*$/gm, (_, _k, id) => {
    const s = sources[id];
    if (!s) { state.problems.push(`unknown source "${id}"`); return `<p class="mono">missing source: ${esc(id)}</p>`; }
    state.cited.add(id);
    return `\n${mediaCard(s, state.target)}\n`;
  });
  body = body.replace(/^\{\{\s*(figure|figure-wide)\s+([^}]+)\}\}\s*$/gm, (_, k, raw) => `\n${figure(state, raw, k === 'figure-wide')}\n`);
  body = body.replace(/\^\[((?:[^[\]]|\[[^\]]*\])*)\]/g, (_, text) => {
    sn += 1;
    return `<sup class="sn-ref">${sn}</sup><span class="sn"><span class="sn-n">${sn}</span>${state.md.renderInline(text)}</span>`;
  });
  // [@source-id] → short inline citation; the source joins the back-of-book index.
  body = body.replace(/\[@([\w-]+)\]/g, (_, id) => {
    const s = sources[id];
    if (!s) { state.problems.push(`unknown source "${id}"`); return id; }
    state.cited.add(id);
    const authors = String(s.creator).split(',');
    const who = authors[0].trim().split(' ').pop() + (authors.length > 1 ? ' et al.' : '');
    return `<a class="cite" href="${esc(s.url)}">${esc(who)}, ${esc(s.year)}</a>`;
  });
  body = body.replace(/\[\[([\w-]+)(?:\|([^\]]+))?\]\]/g, (_, id, shown) => {
    const g = glossary[id];
    if (!g) { state.problems.push(`unknown glossary term "${id}"`); return shown || id; }
    state.terms.add(id);
    const label = shown || g.term.toLowerCase();
    if (seenTerms.has(id)) return `<a class="term" href="#g-${id}">${esc(label)}</a>`;
    seenTerms.add(id);
    return `<dfn class="term">${esc(label)}</dfn><span class="sn"><span class="sn-term">${esc(g.term)}</span>${esc(g.def)}</span>`;
  });
  return body;
}

export function words(text = '') { return (text.replace(/<[^>]+>/g, ' ').match(/[A-Za-z0-9’']+/g) || []).length; }

export function readingTimes(c) {
  const body = c.body || '';
  const full = Math.max(1, Math.round(words(body) / 220));
  const skimWords = (body.match(/==[^=]+==/g) || []).join(' ') + ((body.match(/::: recap[\s\S]*?\n:::/) || [''])[0]);
  const skim = Math.max(2, Math.round(words(skimWords) / 180) + 2);
  return { full, skim };
}

// ---------------------------------------------------------------- chapter
export function renderChapter(c, ctx, target = 'web') {
  const state = { ...ctx, chapter: c, target, fig: 0, concept: 0, cited: new Set(), terms: new Set(), problems: [] };
  state.md = engine(state);
  let html = state.md.render(preprocess(state, c.body || ''));

  // Section numbers on h2, and an id for deep links.
  let s = 0;
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    s += 1;
    return `<h2 id="${c.id}-s${s}"><span class="sec-n">§ ${c.n}.${s}</span>${inner}</h2>`;
  });
  // First paragraph is the lede (drop cap).
  html = html.replace(/^\s*<p>/, '<p class="lede">');

  const { full, skim } = readingTimes(c);
  const tracks = (c.tracks || [c.track]).map((t) => {
    const tr = ctx.trackById[t];
    return tr ? `<span class="chip" style="--chip: var(--t-${t})">${esc(tr.name)}</span>` : '';
  }).join('');
  const objectives = (c.objectives || []).map((o) => `<li><span>${state.md.renderInline(o).replace(/<(\/?)strong>/g, '<$1b>')}</span></li>`).join('');
  const tr = ctx.trackById[c.track] || {};

  const opener = `<header class="opener">
  <span class="tab">${esc(tr.short || '')}</span>
  <div class="kicker">Part ${esc(c.part.n)} · ${esc(c.part.title)}</div>
  <div class="opener-num">${c.n}</div>
  <h1 class="chapter-title">${esc(c.title)}</h1>
  ${c.deck ? `<p class="deck">${esc(c.deck)}</p>` : ''}
  <dl class="opener-facts">
    <div><dt>Full read</dt><dd>${full} min</dd></div>
    <div><dt>Skim layer</dt><dd>${skim} min</dd></div>
    ${c.level ? `<div><dt>Level</dt><dd>${esc(c.level)}</dd></div>` : ''}
    <div><dt>Lenses</dt><dd>${tracks}</dd></div>
  </dl>
  ${c.hook ? `<section class="hook"><span class="kicker">The puzzle</span><p>${esc(c.hook)}</p></section>` : ''}
  ${objectives ? `<section class="objectives"><span class="kicker">By the end of this chapter you can</span><ol>${objectives}</ol></section>` : ''}
</header>`;

  const prose = `<div class="prose">
${html}
</div>`;
  const article = `<article class="chapter" id="ch-${c.id}" data-track="${esc(c.track)}" style="--track: var(--t-${c.track})">
${opener}
<div class="prose">
${html}
</div>
</article>`;
  return { html: article, opener, prose, cited: state.cited, terms: state.terms, problems: state.problems, times: { full, skim } };
}

// ---------------------------------------------------------------- cover graphic
// A causal attention matrix over the cover sentence: each row is a token, each
// cell how much it "looks at" an earlier token. Upper triangle is masked, as in
// a real decoder. Weights are illustrative, shaped like real heads (a sink on
// token 0, a strong diagonal, and a few semantic links).
export function attentionMatrix(sentence, { cell = 34, fg = '#8593FF', label = 'rgba(255,255,255,.7)', mask = 'rgba(255,255,255,.14)', font = 11 } = {}) {
  const toks = sentence.split(/\s+/).filter(Boolean);
  const n = toks.length;
  const pad = 96;
  const size = pad + n * cell;
  const hash = (i, j) => { const x = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453; return x - Math.floor(x); };
  const lower = toks.map((t) => t.toLowerCase().replace(/[^a-z?]/g, ''));
  let out = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Attention matrix over the sentence: ${esc(sentence)}">`;
  for (let i = 0; i < n; i++) {
    const raw = [];
    for (let j = 0; j <= i; j++) {
      let w = 0.15 + hash(i, j) * 0.25;
      if (j === i) w += 0.9;
      if (j === 0) w += 0.6;
      if (lower[i] === lower[j] && i !== j) w += 1.6;
      if (lower[i] === '?' && ['replace', 'make', 'ai'].includes(lower[j])) w += 1.1;
      if (lower[i] === 'make' && lower[j] === 'replace') w += 0.9;
      raw.push(w);
    }
    const sum = raw.reduce((a, b) => a + b, 0);
    for (let j = 0; j < n; j++) {
      const x = pad + j * cell, y = pad + i * cell;
      if (j > i) { out += `<circle cx="${x + cell / 2}" cy="${y + cell / 2}" r="1.6" fill="${mask}"/>`; continue; }
      const a = Math.min(1, (raw[j] / sum) * 2.2 + 0.04);
      out += `<rect x="${x + 1.5}" y="${y + 1.5}" width="${cell - 3}" height="${cell - 3}" fill="${fg}" fill-opacity="${a.toFixed(3)}"/>`;
    }
    out += `<text x="${pad - 10}" y="${pad + i * cell + cell / 2 + font / 3}" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="${font}" fill="${label}">${esc(toks[i])}</text>`;
    out += `<text transform="translate(${pad + i * cell + cell / 2 + font / 3}, ${pad - 10}) rotate(-90)" font-family="IBM Plex Mono, monospace" font-size="${font}" fill="${label}">${esc(toks[i])}</text>`;
  }
  return out + '</svg>';
}

// Render a loose Markdown snippet as chapter prose (used by the design book's live specimens).
export function renderFragment(src, ctx, chapter = { n: '01', id: 'specimen', track: 'foundations' }) {
  const state = { ...ctx, chapter, target: 'web', fig: 0, concept: 0, cited: new Set(), terms: new Set(), problems: [] };
  state.md = engine(state);
  return state.md.render(preprocess(state, src)).replace(/<h2>([\s\S]*?)<\/h2>/g, `<h2><span class="sec-n">§ ${chapter.n}.2</span>$1</h2>`);
}
