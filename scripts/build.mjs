// Build every output from content/:
//   dist/index.html            home: cover + contents (web)
//   dist/ch/<id>.html          one web page per written chapter
//   dist/print.html            the whole book, paged by Paged.js (open in a browser = print preview)
//   dist/design.html           the design book (see scripts/lib/specimen.mjs)
// `npm run pdf` then turns print.html into dist/INFERENCE.pdf.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, loadBook, renderChapter, attentionMatrix, esc, readingTimes } from './lib/render.mjs';
import { buildSpecimen } from './lib/specimen.mjs';

const DIST = path.join(ROOT, 'dist');
const DEV = process.env.COMPENDIUM_DEV === '1';
const FONTS = 'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap';
const CSS = ['tokens', 'components', 'web', 'print', 'specimen'];

function copyAssets() {
  fs.mkdirSync(path.join(DIST, 'css'), { recursive: true });
  for (const f of CSS) fs.copyFileSync(path.join(ROOT, 'design', `${f}.css`), path.join(DIST, 'css', `${f}.css`));
  fs.mkdirSync(path.join(DIST, 'js'), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'node_modules', 'pagedjs', 'dist', 'paged.polyfill.js'), path.join(DIST, 'js', 'paged.polyfill.js'));
}

const devReload = DEV ? `<script>new EventSource('/__reload').onmessage=()=>location.reload()</script>` : '';

export function shell({ title, css, body, rel = '', bodyClass = '', extraHead = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
${css.map((c) => `<link rel="stylesheet" href="${rel}css/${c}.css">`).join('\n')}
${extraHead}
</head>
<body class="${bodyClass}">
${body}
${devReload}
</body>
</html>
`;
}

// ---------------------------------------------------------------- shared fragments
export function getAuthors(book) {
  if (Array.isArray(book.authors) && book.authors.length) return book.authors;
  if (book.author) return [{ name: book.author, linkedin: book.linkedin, github: book.github }];
  return [
    { name: 'Janmejai Singh Minhas', linkedin: 'https://linkedin.com/in/janmejai', github: 'https://github.com/janmejai2002' },
    { name: 'Chaitanya Sharma', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-b7a5b925b/', github: 'https://github.com/chaitanya-sharma' }
  ];
}

export function formatAuthors(book, { format = 'text' } = {}) {
  const list = getAuthors(book);
  if (format === 'names') {
    return list.map((a) => esc(a.name)).join(' & ');
  }
  if (format === 'meta') {
    return list.map((a) => a.name).join(', ');
  }
  if (format === 'print-links') {
    return list.map((a) => `<b>${esc(a.name)}</b> (<a href="${esc(a.linkedin)}" style="color:inherit;text-decoration:none;">LinkedIn</a> · <a href="${esc(a.github)}" style="color:inherit;text-decoration:none;">GitHub</a>)`).join(' & ');
  }
  return list.map((a) => `<b>${esc(a.name)}</b> (<a href="${esc(a.linkedin)}" target="_blank" rel="noopener">LinkedIn</a> · <a href="${esc(a.github)}" target="_blank" rel="noopener">GitHub</a>)`).join(' & ');
}

function contents(ctx, { print = false, rel = '' } = {}) {
  return ctx.toc.parts.map((p) => `<section class="toc-part" style="--part: var(--t-${p.track})">
  <div class="toc-part-h"><span class="toc-part-n">${esc(p.n)}</span><span class="toc-part-t">${esc(p.title)}</span>${p.deck ? `<p class="toc-part-d">${esc(p.deck)}</p>` : ''}</div>
  <div class="toc-list">${p.chapters.map((c) => {
    const written = !!c.file;
    const meta = written ? `${readingTimes(c).full} min` : '';
    const inner = `<span class="n">${c.n}</span><span class="t">${esc(c.title)}${c.deck && !print ? `<span class="d">${esc(c.deck)}</span>` : ''}</span><span class="m">${meta}</span>`;
    if (!written) return `<div class="toc-row planned" data-track="${c.track}">${inner}</div>`;
    return `<a class="toc-row" data-track="${c.track}" data-tracks="${[c.track, ...(c.tracks || [])].join(' ')}" href="${print ? `#ch-${c.id}` : `${rel}ch/${c.id}.html`}">${inner}</a>`;
  }).join('')}</div>
</section>`).join('\n');
}

function coverHtml(ctx) {
  const { book } = ctx;
  const qrHtml = book.online_qr ? `
  <a class="cover-qr" href="${esc(book.online_url)}" style="color:inherit;text-decoration:none;">
    <div class="qr-box">${book.online_qr}</div>
    <div class="qr-meta">
      <span class="qr-kicker">Live edition</span>
      <span class="qr-url">Scan or tap to read online</span>
    </div>
  </a>` : '';
  return `<section class="cover">
  <div class="cover-frame-corner tl">+</div>
  <div class="cover-frame-corner tr">+</div>
  <div class="cover-frame-corner bl">+</div>
  <div class="cover-frame-corner br">+</div>
  <div class="masthead">
    <span>MONOGRAPH 01 · B-SCHOOL SPECIFICATION</span>
    <span>FIRST PRINCIPLES × STRATEGIC JUDGMENT</span>
    <span>2027 · DRAFT 0.1</span>
  </div>
  <div class="cover-header">
    <h1 class="title">${esc(book.title)}<span>${esc(book.title_accent || '')}</span></h1>
    <div class="cover-kicker">THE DUAL-SYSTEM COMPENDIUM FOR THE BUSINESS MIND</div>
  </div>
  <div class="matrix">${attentionMatrix(book.cover_sentence, { cell: 38, font: 11, fg: '#8593FF', showDualSystem: true })}</div>
  <div class="tracks">${book.tracks.map((t) => `<div class="track-tab" style="--t-color: var(--t-${t.id})"><span class="track-bar"></span><span class="track-code">${t.short}</span></div>`).join('')}</div>
  <div class="cover-bottom">
    <div class="cover-thesis">
      <p class="thesis-main">The machine predicts the next word. The business mind decides the next move.</p>
      <p class="thesis-sub">Deconstructing artificial intelligence from transformer self-attention to enterprise unit economics, agent reliability, and placement interview strategy.</p>
      <div class="cover-specs">
        <span>252 PAGES</span> · <span>16 CHAPTERS</span> · <span>131 PRIMARY SOURCES</span> · <span>8 TRACKS</span> · <span>0 FABRICATIONS</span>
      </div>
    </div>
    ${qrHtml}
  </div>
  <div class="foot">
    <span>EDITION: ${esc(book.edition)} · UNRESTRICTED CIRCULATION</span>
    <span>Curated & compiled by ${formatAuthors(book, { format: 'print-links' })}</span>
  </div>
</section>`;
}

function howToRead(ctx) {
  const { book } = ctx;
  const paths = ['consulting', 'marketing', 'product'].map((t) => {
    const tr = ctx.trackById[t];
    const list = ctx.chapters.filter((c) => c.track === t || c.track === 'foundations' || (c.tracks || []).includes(t));
    return `<div class="path"><span class="chip" style="--chip: var(--t-${t})">${esc(tr.name)}</span><ol>${list.map((c) => `<li>${c.n} · ${esc(c.title)}</li>`).join('')}</ol></div>`;
  }).join('');
  return `<section class="front" id="how-to-read">
  <div class="kicker">Before you begin · Curated by ${formatAuthors(book, { format: 'names' })}</div>
  <h1>Three ways to read this book</h1>
  <p class="intro">This compendium is dense on purpose. It is also built so that you never have to read all of it at once. Pick the speed that matches how much time is left before your interview.</p>
  <div class="speeds">
    <div class="speed"><span class="kicker">The night before</span><p class="t">Skim</p><p>Read only the <mark>highlighted lines</mark> and the yellow <b>night-before page</b> at the end of each chapter. About ten minutes a chapter.</p></div>
    <div class="speed"><span class="kicker">The week before</span><p class="t">Study</p><p>Read the full text. Ideas are built from first principles, so read chapters in order the first time. Notes and definitions sit in the outer margin.</p></div>
    <div class="speed"><span class="kicker">Every day</span><p class="t">Practise</p><p>Answer <b>Check yourself</b> without looking, then run the <b>Try it yourself</b> prompts in a real AI tool. Recall beats rereading.</p></div>
  </div>
  <div class="kicker" style="margin-bottom:3mm">What the blocks mean</div>
  <div class="legend">
    <div class="item"><span class="k" style="color:var(--accent)">∴ First principles</span><p>An idea derived step by step from things you already know. Graph paper means: work it through, don't memorise it.</p></div>
    <div class="item"><span class="k">Concept card</span><p>One term, in plain words, with an analogy and the most common misconception.</p></div>
    <div class="item"><span class="k">Case</span><p>A business decision worked end to end. Marked <i>Illustrative</i> when it is constructed for teaching.</p></div>
    <div class="item"><span class="k" style="color:var(--t-marketing)">■ Field lens</span><p>The same idea through one placement track. The colour matches the thumb tab on the page edge.</p></div>
    <div class="item"><span class="k">● Interview room</span><p>A question you could be asked, what it tests, and the structure of a strong answer.</p></div>
    <div class="item"><span class="k">Watch · Read</span><p>Curated outside material from named, primary sources. Scan the QR code on the printed page.</p></div>
  </div>
</section>
<section class="front" id="paths">
  <div class="kicker">Contents</div>
  <h1>What's inside</h1>
  <div class="toc-print">${contents(ctx, { print: true })}</div>
  <div class="kicker" style="margin:9mm 0 3mm">Reading paths by placement track</div>
  <div class="paths">${paths}</div>
</section>`;
}

function partOpener(p, ctx) {
  return `<section class="part-opener" style="--part: var(--t-${p.track})" id="part-${p.id}">
  <div class="pn">${esc(p.n)}</div>
  <div class="k">Part ${esc(p.n)}</div>
  <h1>${esc(p.title)}</h1>
  ${p.deck ? `<p>${esc(p.deck)}</p>` : ''}
  <ul>${p.chapters.map((c) => `<li><span>${c.n}</span>${esc(c.title)}</li>`).join('')}</ul>
</section>`;
}

function backMatter(ctx, cited, terms) {
  const g = [...terms].sort((a, b) => ctx.glossary[a].term.localeCompare(ctx.glossary[b].term));
  const gloss = g.map((id) => `<div><dt id="g-${id}">${esc(ctx.glossary[id].term)}</dt><dd>${esc(ctx.glossary[id].def)}</dd></div>`).join('');
  const src = [...cited].map((id) => ctx.sources[id]).map((s) => `<li><span class="tier">${esc(s.tier)}</span><span><b>${esc(s.title)}</b><br>${esc(s.creator)} · ${esc(s.publisher)} · ${esc(s.year)}<br><span class="u">${esc(s.url)}</span></span><span class="qr">${s.qr}</span></li>`).join('');
  const { book } = ctx;
  return `<section class="back" id="glossary">
  <div class="kicker">Back matter</div>
  <h1>Glossary</h1>
  <p class="intro">Every term defined in the margins, in one place. Learn these words well enough to explain them to a non-technical interviewer in one sentence each.</p>
  <dl class="gloss">${gloss}</dl>
</section>
<section class="back back-cont" id="sources">
  <h1>Sources</h1>
  <p class="intro">Every outside source in this edition, with its tier. <b>A</b> is a primary source or originator, <b>B</b> is established editorial or analysis, <b>C</b> is admitted with a stated reason. No SEO listicles, no unsourced posts. Rules in the repository's SOURCES.md.</p>
  <ol class="src-index">${src}</ol>
  <div class="colophon" style="margin-top:9mm">
    <div class="kicker" style="margin-bottom:2mm">Colophon</div>
    <p>Compiled and edited by ${formatAuthors(book, { format: 'print-links' })}. Set in Archivo, Literata and IBM Plex Mono. Written in Markdown, laid out with Paged.js, rendered by Chromium. ${esc(book.edition)}. ${esc(book.license)}</p>
  </div>
</section>
<section class="backcover">
  <p class="blurb">${esc(book.back_blurb)}</p>
  ${book.online_qr ? `
  <a class="backcover-qr" href="${esc(book.online_url)}" style="color:inherit;text-decoration:none;">
    <div class="qr-box">${book.online_qr}</div>
    <div class="qr-meta">
      <span class="qr-kicker">Live edition</span>
      <span class="qr-url">janmejai2002.github.io/inference-compendium</span>
    </div>
  </a>` : ''}
  <div class="fine"><span>${esc(book.title)}${esc(book.title_accent || '')} ${esc(book.subtitle)} · Curated by ${formatAuthors(book, { format: 'print-links' })}</span><span>${esc(book.edition)}</span></div>
</section>`;
}

// ---------------------------------------------------------------- pages
function webChapter(c, ctx, i, written) {
  const r = renderChapter(c, ctx, 'web');
  const prev = written[i - 1], next = written[i + 1];
  const body = `<header class="topbar" style="--track: var(--t-${c.track})">
  <a class="wordmark" href="../index.html">${esc(ctx.book.title)}<span>${esc(ctx.book.title_accent || '')}</span></a>
  <span class="where">${c.n} · ${esc(c.title)}</span>
  <button class="mode" id="skim" aria-pressed="false" title="Show only the highlighted skim layer">Skim</button>
  <nav><a href="../index.html#contents">Contents</a><a href="../design.html">Design</a><a href="../print.html">Print</a></nav>
  <span class="progress" id="progress"></span>
</header>
<main class="read">
${r.html}
<nav class="pager">${prev ? `<a href="${prev.id}.html"><span>Previous</span>${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="next" href="${next.id}.html"><span>Next</span>${esc(next.title)}</a>` : ''}</nav>
<footer class="ch-foot" style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--rule); font-family: var(--f-mono); font-size: 0.8rem; color: var(--ink-3); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
  <span>${esc(ctx.book.title)} · ${esc(ctx.book.edition)}</span>
  <span>Curated & compiled by ${formatAuthors(ctx.book, { format: 'html-links' })}</span>
</footer>
</main>
<script>
(() => {
  const b = document.getElementById('skim'), p = document.getElementById('progress');
  const set = (on) => { document.body.classList.toggle('skim', on); b.setAttribute('aria-pressed', on); try { localStorage.setItem('skim', on ? '1' : ''); } catch (e) {} };
  b.addEventListener('click', () => set(!document.body.classList.contains('skim')));
  try { if (localStorage.getItem('skim')) set(true); } catch (e) {}
  addEventListener('scroll', () => { const h = document.documentElement; p.style.width = (100 * h.scrollTop / (h.scrollHeight - h.clientHeight)) + '%'; }, { passive: true });
})();
</script>`;
  return {
    html: shell({
      title: `${c.title} · ${ctx.book.title}`,
      css: ['tokens', 'components', 'web'],
      body,
      rel: '../',
      extraHead: `
<meta name="author" content="${esc(formatAuthors(ctx.book, { format: 'meta' }))}">
<meta name="description" content="${esc(c.deck || ctx.book.subtitle)}">
<meta property="og:title" content="${esc(c.title)} · ${esc(ctx.book.title)}">
<meta property="og:description" content="${esc(c.deck || ctx.book.subtitle)}">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary">
`
    }),
    r
  };
}

function home(ctx) {
  const { book } = ctx;
  const body = `<header class="topbar">
  <div style="display:flex;align-items:center;gap:1.2rem;flex-wrap:wrap;">
    <a class="wordmark" href="index.html">${esc(book.title)}<span>${esc(book.title_accent || '')}</span></a>
    <div class="live-badge"><span class="pulse-dot"></span> 2027 · Draft 0.1 · Live Edition</div>
  </div>
  <nav>
    <a href="#framework">Thinking Fast & Slow</a>
    <a href="#tracks">Tracks</a>
    <a href="#contents">Chapters</a>
    <a href="design.html">Design book</a>
    <a href="print.html">Print preview</a>
    <a class="btn primary" style="padding:0.45em 0.85em;font-size:0.75rem;" href="${esc(book.title)}.pdf" download>PDF (252p)</a>
  </nav>
</header>
<section class="home-hero">
  <div class="hero-content">
    <div class="hero-kicker">Executive Monograph · Indian B-School Edition · 2027</div>
    <h1 class="hero-title">${esc(book.title)}<span>${esc(book.title_accent || '')}</span></h1>
    <div class="hero-thesis">
      <div class="thesis-lead">The machine predicts the next word.</div>
      <div class="thesis-follow">The business mind decides the next move.</div>
    </div>
    <p class="hero-desc">Every B-school recruiter now asks about AI. Most compendiums still don't teach it. This one deconstructs artificial intelligence from first principles — contrasting the fast, associative reflex of generative models (<b>System 1</b>) with the slow, deliberate strategic verification required in consulting, finance, and product leadership (<b>System 2</b>).</p>
    <div class="hero-byline">
      Curated & compiled by ${formatAuthors(book, { format: 'html-links' })}
    </div>
    <div class="hero-actions">
      <a class="btn primary" href="#contents">Explore 16 Chapters →</a>
      <a class="btn secondary" href="${esc(book.title)}.pdf" download>Download A4 PDF (252p) ↓</a>
      <a class="btn ghost" href="#framework">Dual-System Framework ↓</a>
    </div>
    <div class="hero-metrics">
      <div class="metric-item"><span class="metric-val">252</span><span class="metric-lbl">Pages</span></div>
      <div class="metric-item"><span class="metric-val">16</span><span class="metric-lbl">Chapters</span></div>
      <div class="metric-item"><span class="metric-val">131</span><span class="metric-lbl">Primary Sources</span></div>
      <div class="metric-item"><span class="metric-val">8</span><span class="metric-lbl">Tracks</span></div>
      <div class="metric-item"><span class="metric-val">10</span><span class="metric-lbl">Worked Cases</span></div>
    </div>
  </div>
  <div class="hero-visual">
    <div class="matrix-card">
      <div class="matrix-card-header">
        <div class="matrix-card-title">
          <span class="matrix-card-kicker">Self-Attention Tensor · Head #7</span>
          <span class="matrix-card-sub">Will AI replace the analyst or make the analyst ?</span>
        </div>
        <div class="matrix-modes">
          <button class="mode-tab active" id="tab-s1" type="button">System 1: Reflex</button>
          <button class="mode-tab" id="tab-s2" type="button">System 2: Reason</button>
        </div>
      </div>
      <div class="matrix-svg-wrap">
        ${attentionMatrix(book.cover_sentence, { cell: 38, font: 11, fg: 'var(--accent)', label: 'var(--ink-2)', mask: 'var(--rule)', interactive: true, showDualSystem: true })}
      </div>
      <div class="matrix-hud" id="matrix-hud">
        <div class="hud-top">
          <span class="hud-status"><span class="hud-dot"></span> <span id="hud-mode">System 1: Statistical Association (Reflex)</span></span>
          <span class="hud-weight" id="hud-weight">Hover cell to inspect</span>
        </div>
        <div class="hud-query" id="hud-query">Move cursor over any token or matrix cell to inspect attention weights.</div>
        <div class="hud-takeaway" id="hud-takeaway">The machine generates tokens via associative reflex; executive value begins with verifying the output.</div>
      </div>
    </div>
  </div>
</section>

<section class="home-framework" id="framework">
  <div class="framework-header">
    <div class="framework-kicker">01 · The Cognitive Dichotomy</div>
    <h2 class="framework-title">Thinking, Fast and Slow in the Age of AI</h2>
    <p class="framework-intro">Why Daniel Kahneman's Nobel Prize-winning framework is the single most valuable mental model for understanding modern artificial intelligence and succeeding in MBA placement interviews.</p>
  </div>
  <div class="framework-grid">
    <div class="framework-card">
      <div class="system-tag s1">System 1 · The Generative Reflex</div>
      <h3 class="framework-card-h">The Next-Word Machine</h3>
      <p class="framework-card-thesis">"A model predicts the next word. It does not know what is true; it knows what statistically follows."</p>
      <div class="framework-specs">
        <div class="f-spec-row">
          <span class="f-spec-k">Mechanism</span>
          <span class="f-spec-v">Autoregressive transformer calculating conditional probability distributions P(w<sub>t</sub> | w<sub>&lt;t</sub>) across billions of parameters.</span>
        </div>
        <div class="f-spec-row">
          <span class="f-spec-k">Cognitive Speed</span>
          <span class="f-spec-v">120+ tokens/second. Zero deliberation, instant associative retrieval, zero voluntary control.</span>
        </div>
        <div class="f-spec-row">
          <span class="f-spec-k">The B-School Trap</span>
          <span class="f-spec-v"><b>The Illusion of Competence.</b> Because output is grammatically fluent and immediate, analysts mistake linguistic confidence for factual accuracy.</span>
        </div>
        <div class="f-spec-row">
          <span class="f-spec-k">Failure Modes</span>
          <span class="f-spec-v">Hallucination, sycophancy, base-rate neglect, confidence without calibration, jagged capability frontier.</span>
        </div>
      </div>
      <div class="framework-links">
        <b>Core Chapters:</b>
        <a href="ch/kinds-of-ai.html">01 · Kinds of AI</a>
        <a href="ch/next-word-machine.html">02 · Next-Word Machine</a>
        <a href="ch/confidently-wrong.html">03 · Confidently Wrong</a>
        <a href="ch/models-that-act.html">06 · Models That Act</a>
      </div>
    </div>

    <div class="framework-card">
      <div class="system-tag s2">System 2 · The Deliberative Mind</div>
      <h3 class="framework-card-h">Strategic Executive Judgment</h3>
      <p class="framework-card-thesis">"Judgment is the bottleneck. In an economy of abundant tokens, rent shifts to verification and problem framing."</p>
      <div class="framework-specs">
        <div class="f-spec-row">
          <span class="f-spec-k">Mechanism</span>
          <span class="f-spec-v">Effortful, structured reasoning that frames decisions, audits priors, models payoff matrices, and allocates capital under uncertainty.</span>
        </div>
        <div class="f-spec-row">
          <span class="f-spec-k">Cognitive Speed</span>
          <span class="f-spec-v">Slow, reflective, hypothesis-driven. Evaluating counterfactuals and checking edge cases before client sign-off.</span>
        </div>
        <div class="f-spec-row">
          <span class="f-spec-k">The Business Edge</span>
          <span class="f-spec-v"><b>The Asymmetric Cost of Error.</b> A model does not care if an approval is wrong; an NBFC loses capital. System 2 governs the decision boundary.</span>
        </div>
        <div class="f-spec-row">
          <span class="f-spec-k">Executive Tools</span>
          <span class="f-spec-v">Evals, base-rate calibration, token unit economics ($/1k tokens), capacity reallocation, workflow redesign.</span>
        </div>
      </div>
      <div class="framework-links">
        <b>Core Chapters:</b>
        <a href="ch/judging-output.html">07 · Judging Output</a>
        <a href="ch/who-pays.html">08 · Who Pays</a>
        <a href="ch/pilots-stall.html">09 · Why Pilots Stall</a>
        <a href="ch/consulting-firm.html">11 · Consulting Firm</a>
        <a href="ch/ai-casebook.html">12 · AI Casebook</a>
        <a href="ch/interview-room.html">13 · Interview Room</a>
      </div>
    </div>
  </div>
</section>

<section class="home-tracks-sec" id="tracks">
  <div class="framework-kicker">02 · Placement Track Lenses</div>
  <h2 class="framework-title" style="font-size:clamp(2rem, 3.5vw, 2.8rem);">Curriculum Paths by Placement Domain</h2>
  <p class="framework-intro" style="margin-bottom:1.2rem;">Click any domain to highlight relevant chapters and curriculum paths across the compendium:</p>
  <div class="track-filters">
    <button class="track-btn active" data-track="all" type="button"><span class="t-dot" style="--btn-color: var(--ink)"></span> All Chapters (16)</button>
    ${book.tracks.map((t) => `<button class="track-btn" data-track="${t.id}" style="--btn-color: var(--t-${t.id})" type="button"><span class="t-dot"></span> ${esc(t.name)}</button>`).join('')}
  </div>
</section>

<main class="home-toc" id="contents">${contents(ctx)}</main>

<footer class="home-foot" style="margin: 4rem auto 2rem; max-width: 1200px; padding: 2.5rem 1.5rem 0; border-top: 1px solid var(--rule); display: flex; justify-content: space-between; flex-wrap:wrap; gap:1rem; font-family: var(--f-mono); font-size: 0.8rem; color: var(--ink-3);">
  <div>
    <b>${esc(book.title)}</b> · ${esc(book.edition)} · ${esc(book.license)}
  </div>
  <div>
    Curated & compiled by ${formatAuthors(book, { format: 'html-links' })}
  </div>
</footer>

<script>
(() => {
  // Attention Matrix HUD & Interaction
  const cells = document.querySelectorAll('.mat-cell');
  const toks = document.querySelectorAll('.mat-tok');
  const hudQuery = document.getElementById('hud-query');
  const hudWeight = document.getElementById('hud-weight');
  const hudTakeaway = document.getElementById('hud-takeaway');
  const hudMode = document.getElementById('hud-mode');
  const tabS1 = document.getElementById('tab-s1');
  const tabS2 = document.getElementById('tab-s2');
  const s2Schematic = document.querySelector('.s2-schematic');

  const takeaways = {
    'replace-analyst': { s1: 'Strong statistical correlation. In training corpora, automation verbs heavily attend to occupational nouns.', s2: 'System 2 Audit: Assess task composition. Automated draft synthesis shifts human value to verification and client sign-off.' },
    'make-analyst': { s1: 'Augmentation head. High associative weight across human-in-the-loop and intelligence amplification contexts.', s2: 'System 2 Audit: The Jevons paradox of intelligence: cheaper tokens increase total enterprise demand for calibrated analysts.' },
    '?-replace': { s1: 'Terminal token resolves causal interrogative toward automation anxiety.', s2: 'System 2 Audit: Recruiters ask this in round 1. A winning candidate distinguishes statistical prediction from executive judgment.' },
    '?-make': { s1: 'Terminal token resolves interrogative toward augmentation and strategic leverage.', s2: 'System 2 Audit: The consultant who understands agent failure modes leads the client engagement.' },
    'default': { s1: 'The autoregressive decoder computes self-attention across historical tokens at 120+ tokens/second.', s2: 'System 2 reasoning audits priors, models the false-positive cost, and frames the strategic decision.' }
  };

  cells.forEach(c => {
    c.addEventListener('mouseenter', () => {
      const q = c.dataset.q, k = c.dataset.k, val = c.dataset.val;
      if (hudQuery) hudQuery.innerHTML = 'Query: <b>\"' + q + '\"</b> attends to Context: <b>\"' + k + '\"</b>';
      if (hudWeight) hudWeight.innerText = 'Attention Weight: ' + val + '%';
      const key = (q + '-' + k).toLowerCase();
      const info = takeaways[key] || takeaways['default'];
      if (hudTakeaway) hudTakeaway.innerText = tabS2 && tabS2.classList.contains('active') ? info.s2 : info.s1;
    });
  });

  if (tabS1 && tabS2) {
    tabS1.addEventListener('click', () => {
      tabS1.classList.add('active'); tabS2.classList.remove('active');
      if (hudMode) hudMode.innerText = 'System 1: Statistical Association (Reflex)';
      if (s2Schematic) s2Schematic.style.opacity = '0.35';
    });
    tabS2.addEventListener('click', () => {
      tabS2.classList.add('active'); tabS1.classList.remove('active');
      if (hudMode) hudMode.innerText = 'System 2: Deliberative Reasoning (Judgment)';
      if (s2Schematic) s2Schematic.style.opacity = '1';
    });
  }

  // Track filtering on TOC
  const trackBtns = document.querySelectorAll('.track-btn');
  const tocRows = document.querySelectorAll('.home-toc .toc-row');
  trackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      trackBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const track = btn.dataset.track;
      tocRows.forEach(row => {
        if (!track || track === 'all') {
          row.style.opacity = '1';
          row.style.borderColor = '';
        } else {
          const match = (row.dataset.tracks || '').includes(track);
          row.style.opacity = match ? '1' : '0.22';
          if (match) row.style.borderColor = 'var(--t-' + track + ')';
          else row.style.borderColor = '';
        }
      });
    });
  });
})();
</script>`;
  return shell({
    title: `${book.title} — ${book.subtitle}`,
    css: ['tokens', 'components', 'web'],
    body,
    extraHead: `
<meta name="author" content="${esc(formatAuthors(book, { format: 'meta' }))}">
<meta name="description" content="${esc(book.subtitle)}. ${esc(book.back_blurb)}">
<meta property="og:title" content="${esc(book.title)} · ${esc(book.subtitle)}">
<meta property="og:description" content="${esc(book.subtitle)}. ${esc(book.back_blurb)}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
`
  });
}

function printBook(ctx) {
  const cited = new Set(), terms = new Set(), problems = [];
  const parts = ctx.toc.parts.map((p) => {
    const chs = p.chapters.filter((c) => c.file).map((c) => {
      const r = renderChapter(c, ctx, 'print');
      r.cited.forEach((x) => cited.add(x)); r.terms.forEach((x) => terms.add(x));
      problems.push(...r.problems.map((m) => `${c.id}: ${m}`));
      const attrs = `data-track="${c.track}" style="--track: var(--t-${c.track})"`;
      return `<section class="opener-page" id="ch-${c.id}" ${attrs}>${r.opener}</section>
<article class="chapter" ${attrs}>${r.prose}</article>`;
    });
    return chs.length ? partOpener(p, ctx) + chs.join('\n') : '';
  }).join('\n');
  const tracks = JSON.stringify(Object.fromEntries(ctx.book.tracks.map((t, i) => [t.id, { i, short: t.short }])));
  const extraHead = `<meta name="author" content="${esc(formatAuthors(ctx.book, { format: 'meta' }))}">
<meta name="description" content="${esc(ctx.book.subtitle)}">
<style>@page :left { @top-left { content: "${esc(ctx.book.running_head)}"; } }</style>
<script>window.PagedConfig = { auto: true, after: () => { window.__pagedDone = true; } };</script>
<script src="js/paged.polyfill.js"></script>
<script>
// Thumb tabs: one coloured tab per page on the outer edge, stepped down by track order.
const TRACKS = ${tracks};
class ThumbTabs extends Paged.Handler {
  afterPageLayout(page) {
    const el = page.querySelector('[data-track]');
    if (!el || page.querySelector('.opener, .part-opener, .cover, .backcover')) return;
    const t = TRACKS[el.dataset.track]; if (!t) return;
    const d = document.createElement('div');
    d.className = 'thumb'; d.style.setProperty('--tab', 'var(--t-' + el.dataset.track + ')');
    d.style.top = (28 + t.i * 28) + 'mm'; d.innerHTML = '<b>' + t.short + '</b>';
    page.appendChild(d);
  }
}
Paged.registerHandlers(ThumbTabs);
</script>`;
  const body = `${coverHtml(ctx)}\n${howToRead(ctx)}\n${parts}\n${backMatter(ctx, cited, terms)}`;
  return { html: shell({ title: `${ctx.book.title} — print`, css: ['tokens', 'components', 'print'], body, bodyClass: 'print is-paper', extraHead }), problems };
}

// ---------------------------------------------------------------- main
export async function build() {
  const t0 = Date.now();
  const ctx = await loadBook();
  copyAssets();
  fs.mkdirSync(path.join(DIST, 'ch'), { recursive: true });
  const written = ctx.chapters.filter((c) => c.file);
  const problems = [];
  written.forEach((c, i) => {
    const { html, r } = webChapter(c, ctx, i, written);
    problems.push(...r.problems.map((m) => `${c.id}: ${m}`));
    fs.writeFileSync(path.join(DIST, 'ch', `${c.id}.html`), html);
  });
  fs.writeFileSync(path.join(DIST, 'index.html'), home(ctx));
  const pb = printBook(ctx);
  fs.writeFileSync(path.join(DIST, 'print.html'), pb.html);
  await buildSpecimen(ctx, { DIST, shell });
  const pdfSnapshot = path.join(ROOT, 'editions', 'INFERENCE-v1-draft.pdf');
  const pdfOut = path.join(DIST, `${ctx.book.title}.pdf`);
  if (fs.existsSync(pdfSnapshot) && !fs.existsSync(pdfOut)) {
    fs.copyFileSync(pdfSnapshot, pdfOut);
  }
  const uniq = [...new Set([...problems, ...pb.problems])];
  uniq.forEach((p) => console.warn(`  ! ${p}`));
  console.log(`built ${written.length}/${ctx.chapters.length} chapters → dist/ in ${Date.now() - t0} ms${uniq.length ? ` (${uniq.length} problems)` : ''}`);
  return { ctx, problems: uniq };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  build().catch((e) => { console.error(e); process.exit(1); });
}
