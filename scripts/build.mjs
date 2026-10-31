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
const FONTS = 'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=IBM+Plex+Mono:wght@400;500;600&display=swap';
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
function contents(ctx, { print = false, rel = '' } = {}) {
  return ctx.toc.parts.map((p) => `<section class="toc-part" style="--part: var(--t-${p.track})">
  <div class="toc-part-h"><span class="toc-part-n">${esc(p.n)}</span><span class="toc-part-t">${esc(p.title)}</span>${p.deck ? `<p class="toc-part-d">${esc(p.deck)}</p>` : ''}</div>
  <div class="toc-list">${p.chapters.map((c) => {
    const written = !!c.file;
    const meta = written ? `${readingTimes(c).full} min` : '';
    const inner = `<span class="n">${c.n}</span><span class="t">${esc(c.title)}${c.deck && !print ? `<span class="d">${esc(c.deck)}</span>` : ''}</span><span class="m">${meta}</span>`;
    if (!written) return `<div class="toc-row planned">${inner}</div>`;
    return `<a class="toc-row" href="${print ? `#ch-${c.id}` : `${rel}ch/${c.id}.html`}">${inner}</a>`;
  }).join('')}</div>
</section>`).join('\n');
}

function coverHtml(ctx) {
  const { book } = ctx;
  return `<section class="cover">
  <h1 class="title">${esc(book.title)}<span>${esc(book.title_accent || '')}</span></h1>
  <div class="matrix">${attentionMatrix(book.cover_sentence, { cell: 46, font: 12 })}</div>
  <div class="tracks">${book.tracks.map((t) => `<span style="background: var(--t-${t.id})"></span>`).join('')}</div>
  <p class="sub">${esc(book.subtitle)}</p>
  <div class="foot"><span>${esc(book.edition)}</span><span>${esc(book.publisher)}</span></div>
</section>`;
}

function howToRead(ctx) {
  const paths = ['consulting', 'marketing', 'product'].map((t) => {
    const tr = ctx.trackById[t];
    const list = ctx.chapters.filter((c) => c.track === t || c.track === 'foundations' || (c.tracks || []).includes(t));
    return `<div class="path"><span class="chip" style="--chip: var(--t-${t})">${esc(tr.name)}</span><ol>${list.map((c) => `<li>${c.n} · ${esc(c.title)}</li>`).join('')}</ol></div>`;
  }).join('');
  return `<section class="front" id="how-to-read">
  <div class="kicker">Before you begin</div>
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
    <p>Set in Archivo, Literata and IBM Plex Mono. Written in Markdown, laid out with Paged.js, rendered by Chromium. ${esc(book.edition)}. ${esc(book.license)}</p>
  </div>
</section>
<section class="backcover">
  <p class="blurb">${esc(book.back_blurb)}</p>
  <div class="fine"><span>${esc(book.title)}${esc(book.title_accent || '')} ${esc(book.subtitle)}</span><span>${esc(book.edition)}</span></div>
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
  return { html: shell({ title: `${c.title} · ${ctx.book.title}`, css: ['tokens', 'components', 'web'], body, rel: '../' }), r };
}

function home(ctx) {
  const { book } = ctx;
  const body = `<header class="topbar"><a class="wordmark" href="index.html">${esc(book.title)}<span>${esc(book.title_accent || '')}</span></a><span class="where">${esc(book.edition)}</span>
<nav><a href="design.html">Design book</a><a href="print.html">Print preview</a><a href="${esc(book.title)}.pdf">PDF</a></nav></header>
<section class="home-hero">
  <div>
    <div class="kicker">${esc(book.edition)}</div>
    <h1>${esc(book.title)}<span>${esc(book.title_accent || '')}</span></h1>
    <p class="sub">${esc(book.subtitle)}. ${esc(book.back_blurb)}</p>
    <div class="actions"><a class="btn primary" href="#contents">Start reading</a><a class="btn" href="design.html">See the design book</a></div>
  </div>
  <div class="matrix">${attentionMatrix(book.cover_sentence, { cell: 40, fg: 'var(--accent)', label: 'var(--ink-2)', mask: 'var(--rule)', font: 12 })}</div>
</section>
<main class="home-toc" id="contents">${contents(ctx)}</main>`;
  return shell({ title: `${book.title} — ${book.subtitle}`, css: ['tokens', 'components', 'web'], body });
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
  const extraHead = `<style>@page :left { @top-left { content: "${esc(ctx.book.running_head)}"; } }</style>
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
  const uniq = [...new Set([...problems, ...pb.problems])];
  uniq.forEach((p) => console.warn(`  ! ${p}`));
  console.log(`built ${written.length}/${ctx.chapters.length} chapters → dist/ in ${Date.now() - t0} ms${uniq.length ? ` (${uniq.length} problems)` : ''}`);
  return { ctx, problems: uniq };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  build().catch((e) => { console.error(e); process.exit(1); });
}
