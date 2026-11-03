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
// Incorporates Daniel Kahneman's Thinking, Fast and Slow concept:
// - Lower triangle: System 1 (Fast, statistical reflex, autoregressive next-word prediction)
// - Upper triangle: System 2 (Slow, deliberative reasoning, causal masking, business judgment)
export function attentionMatrix(sentence, {
  cell = 36,
  fg = '#8593FF',
  label = 'rgba(255,255,255,.75)',
  mask = 'rgba(255,255,255,.12)',
  font = 11,
  interactive = false,
  showDualSystem = true
} = {}) {
  const toks = sentence.split(/\s+/).filter(Boolean);
  const n = toks.length;
  const padLeft = 104;
  const padTop = 100;
  const padRight = 24;
  const padBottom = 42;
  const width = padLeft + n * cell + padRight;
  const height = padTop + n * cell + padBottom;

  const hash = (i, j) => {
    const x = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const lower = toks.map((t) => t.toLowerCase().replace(/[^a-z?]/g, ''));

  let out = `<svg class="attention-matrix-svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Attention matrix over sentence: ${esc(sentence)}">`;
  
  // Background subtle datum grid
  out += `<defs>
    <pattern id="datum-grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.6" fill="${mask}" opacity="0.4"/>
    </pattern>
  </defs>`;

  // Axes indicators
  out += `<text x="${padLeft - 10}" y="${padTop - 28}" text-anchor="end" font-family="Archivo, sans-serif" font-weight="700" font-size="8" letter-spacing="0.14em" fill="${fg}">Q (QUERY) ↓</text>`;
  out += `<text x="${padLeft + 4}" y="${padTop - 42}" font-family="Archivo, sans-serif" font-weight="700" font-size="8" letter-spacing="0.14em" fill="${fg}">K (KEY: CONTEXT) →</text>`;

  // Precompute attention weights
  const weights = [];
  for (let i = 0; i < n; i++) {
    const raw = [];
    for (let j = 0; j <= i; j++) {
      let w = 0.16 + hash(i, j) * 0.22;
      if (j === i) w += 0.88;
      if (j === 0) w += 0.58;
      if (lower[i] === lower[j] && i !== j) w += 1.55;
      if (lower[i] === '?' && ['replace', 'make', 'ai'].includes(lower[j])) w += 1.15;
      if (lower[i] === 'make' && lower[j] === 'replace') w += 0.95;
      if (lower[i] === 'analyst' && lower[j] === 'replace') w += 1.05;
      if (lower[i] === 'analyst' && lower[j] === 'make') w += 1.05;
      raw.push(w);
    }
    const sum = raw.reduce((a, b) => a + b, 0);
    const row = [];
    for (let j = 0; j <= i; j++) {
      const a = Math.min(1, (raw[j] / sum) * 2.15 + 0.05);
      row.push(a);
    }
    weights.push(row);
  }

  const isDarkCanvas = !label.includes('var(') && !fg.includes('var(');
  const highlightTokColor = isDarkCanvas ? '#FFFFFF' : 'var(--ink)';

  // Upper triangle (System 2 & Causal Masking)
  if (showDualSystem) {
    // Deliberative reasoning schematic container (placed safely in upper-right triangle: cols 4-9, rows 0-3)
    const s2X = padLeft + 3.8 * cell;
    const s2Y = padTop - 8;
    const s2W = (n - 3.8) * cell - 4;
    const s2H = 2.75 * cell;

    out += `<g class="s2-schematic" opacity="0.95">`;
    out += `<rect x="${s2X}" y="${s2Y}" width="${s2W}" height="${s2H}" rx="5" fill="${isDarkCanvas ? 'rgba(255,255,255,0.02)' : 'var(--paper)'}" stroke="${mask}" stroke-dasharray="3 3"/>`;
    out += `<text x="${s2X + 8}" y="${s2Y + 13}" font-family="Archivo, sans-serif" font-weight="800" font-stretch="85%" font-size="8" letter-spacing="0.12em" fill="${fg}">SYSTEM 2 · DELIBERATIVE REASONING</text>`;
    out += `<text x="${s2X + 8}" y="${s2Y + 23}" font-family="Literata, serif" font-style="italic" font-size="7" fill="${label}" opacity="0.85">What autoregressive prediction cannot see, executive judgment must audit.</text>`;

    // 4 strategic decision pills
    const pillW = (s2W - 18) / 2;
    const pills = [
      ['01', 'Base-Rate Audit', 'Kahneman calibration'],
      ['02', 'Cost Asymmetry', 'False Pos vs False Neg'],
      ['03', 'Unit Economics', 'Inference $/1k vs labor'],
      ['04', 'Strategic Move', 'Workflow redesign choice']
    ];
    pills.forEach(([num, t1, t2], idx) => {
      const px = s2X + 6 + (idx % 2) * (pillW + 6);
      const py = s2Y + 28 + Math.floor(idx / 2) * 24;
      out += `<rect x="${px}" y="${py}" width="${pillW}" height="20" rx="3" fill="${isDarkCanvas ? 'rgba(255,255,255,0.03)' : 'var(--paper-2)'}" stroke="${mask}"/>`;
      out += `<text x="${px + 5}" y="${py + 9}" font-family="Archivo, sans-serif" font-weight="700" font-size="6.2" fill="${fg}">${num} · ${t1}</text>`;
      out += `<text x="${px + 5}" y="${py + 16.5}" font-family="IBM Plex Mono, monospace" font-size="5.2" fill="${label}" opacity="0.8">${t2}</text>`;
    });

    // Formulas
    out += `<text x="${s2X + 8}" y="${s2Y + s2H - 7}" font-family="IBM Plex Mono, monospace" font-size="6" fill="${fg}" opacity="0.85">Attention(Q,K,V) = softmax(QKᵀ / √d) V  ·  E[Value] = ∑ P(s) · U(d, s)</text>`;
    out += `</g>`;

    // Causal mask diagonal boundary
    const diagPath = [];
    for (let i = 0; i <= n; i++) {
      const dx = padLeft + i * cell;
      const dy = padTop + i * cell;
      if (i === 0) diagPath.push(`M ${dx} ${dy}`);
      else diagPath.push(`L ${dx} ${dy - cell} L ${dx} ${dy}`);
    }
    out += `<path d="${diagPath.join(' ')}" fill="none" stroke="${fg}" stroke-width="1.2" stroke-dasharray="3 2" opacity="0.6"/>`;
    out += `<text transform="translate(${padLeft + n * cell - 8}, ${padTop + n * cell - 12}) rotate(-45)" font-family="IBM Plex Mono, monospace" font-size="7" font-weight="600" fill="${fg}" opacity="0.85">CAUSAL MASK (PAST → FUTURE) →</text>`;
  }

  // Draw cells
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const x = padLeft + j * cell;
      const y = padTop + i * cell;

      if (j > i) {
        // Masked upper cell
        out += `<circle cx="${x + cell / 2}" cy="${y + cell / 2}" r="1.4" fill="${mask}" opacity="0.45"/>`;
        continue;
      }

      const a = weights[i][j];
      const isHigh = a > 0.65;
      const cellFill = fg;
      const interactiveAttr = interactive
        ? ` class="mat-cell" data-row="${i}" data-col="${j}" data-q="${esc(toks[i])}" data-k="${esc(toks[j])}" data-val="${(a * 100).toFixed(0)}"`
        : '';

      out += `<rect x="${x + 1.5}" y="${y + 1.5}" width="${cell - 3}" height="${cell - 3}" rx="3" fill="${cellFill}" fill-opacity="${a.toFixed(3)}" stroke="${isDarkCanvas ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}" stroke-width="0.8"${interactiveAttr}/>`;

      // Percentage label inside cell
      if (cell >= 34 && a >= 0.28) {
        const txtColor = a > 0.62 ? '#FFFFFF' : 'rgba(255,255,255,0.75)';
        out += `<text x="${x + cell / 2}" y="${y + cell / 2 + 2.8}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7.5" font-weight="${isHigh ? '600' : '400'}" fill="${txtColor}" pointer-events="none">${(a * 100).toFixed(0)}</text>`;
      }
    }

    // Row label (Query)
    const isKeyToken = ['analyst', 'replace', 'make', 'ai'].includes(lower[i]);
    const qWeight = isKeyToken ? '700' : '400';
    const qColor = isKeyToken ? highlightTokColor : label;
    const qInteractive = interactive ? ` class="mat-tok mat-q" data-row="${i}"` : '';
    out += `<text x="${padLeft - 10}" y="${padTop + i * cell + cell / 2 + font / 3}" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="${font}" font-weight="${qWeight}" fill="${qColor}"${qInteractive}>${esc(toks[i])}</text>`;

    // Col label (Key)
    const kWeight = isKeyToken ? '700' : '400';
    const kColor = isKeyToken ? highlightTokColor : label;
    const kInteractive = interactive ? ` class="mat-tok mat-k" data-col="${i}"` : '';
    out += `<text transform="translate(${padLeft + i * cell + cell / 2 + font / 3}, ${padTop - 12}) rotate(-90)" font-family="IBM Plex Mono, monospace" font-size="${font}" font-weight="${kWeight}" fill="${kColor}"${kInteractive}>${esc(toks[i])}</text>`;
  }

  // System 1 label on bottom
  out += `<text x="${padLeft}" y="${height - 14}" font-family="Archivo, sans-serif" font-weight="700" font-stretch="90%" font-size="8" letter-spacing="0.14em" fill="${fg}">SYSTEM 1 · STATISTICAL ATTENTION DISTRIBUTION (P(w_t | w_&lt;t))</text>`;

  out += '</svg>';
  return out;
}

// Render a loose Markdown snippet as chapter prose (used by the design book's live specimens).
export function renderFragment(src, ctx, chapter = { n: '01', id: 'specimen', track: 'foundations' }) {
  const state = { ...ctx, chapter, target: 'web', fig: 0, concept: 0, cited: new Set(), terms: new Set(), problems: [] };
  state.md = engine(state);
  return state.md.render(preprocess(state, src)).replace(/<h2>([\s\S]*?)<\/h2>/g, `<h2><span class="sec-n">§ ${chapter.n}.2</span>$1</h2>`);
}
