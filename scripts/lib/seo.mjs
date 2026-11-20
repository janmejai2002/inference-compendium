// Discoverability for the web edition: canonical/og/JSON-LD head tags, sitemap.xml, robots.txt, rss.xml.
// Everything derives from book.yml (online_url, seo.*) and the chapters; nothing is hand-edited in dist/.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, esc } from './render.mjs';

export const OG_IMAGE = 'og/inference-og.png'; // committed source: design/og/inference-og.png (scripts/og-image.mjs)

const base = (book) => book.online_url.replace(/\/?$/, '/');
export const absUrl = (book, rel = '') => base(book) + rel.replace(/^\//, '');

// Last commit date of a file (ISO), from one `git log` over content/ (newest first, so the first hit per file wins).
// CI needs fetch-depth: 0 for real dates; anything unknown falls back to the build time.
const buildTime = new Date().toISOString();
let dates = null;
function loadDates() {
  dates = new Map();
  try {
    const out = execFileSync('git', ['log', '--format=@%cI', '--name-only', '--', 'content'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 << 20 });
    let cur = null;
    for (const line of out.split('\n')) {
      if (line.startsWith('@')) cur = new Date(line.slice(1)).toISOString();
      else if (line.trim() && cur && !dates.has(line.trim())) dates.set(line.trim(), cur);
    }
  } catch { /* not a git checkout */ }
}
export function lastModified(file) {
  if (!dates) loadDates();
  return dates.get(path.relative(ROOT, file).split(path.sep).join('/')) || buildTime;
}

// Plain text from a markdown fragment: drop emphasis, links, cites, highlights.
export function plain(s) {
  return String(s || '')
    .replace(/\[@[^\]]+\]/g, '').replace(/\[\[([^\]|]+)(\|([^\]]+))?\]\]/g, (_, a, __, b) => b || a)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/==([^=]+)==/g, '$1')
    .replace(/[*_`]+/g, '').replace(/^\s*>\s?/gm, '').replace(/^\s*(\d+\.|[-+])\s+/gm, '')
    .replace(/[“”"]/g, '"').replace(/\s+/g, ' ').trim();
}

// `::: interview Title` boxes → [{ q, a }]. Answer = the strong opening line + the structure.
export function interviewQA(md) {
  const out = [];
  const re = /^::: *interview[^\n]*\n([\s\S]*?)^:::\s*$/gm;
  let m;
  while ((m = re.exec(md || ''))) {
    const box = m[1];
    const q = box.match(/\*\*Q\.\*\*\s*([\s\S]*?)(?=\n\s*\n)/);
    if (!q) continue;
    const opener = box.match(/^>\s*([\s\S]*?)(?=\n\s*\n|\n[^>])/m);
    const structure = box.match(/\*\*A strong structure\.\*\*\s*([\s\S]*)$/);
    const a = [opener && plain(opener[1]), structure && plain(structure[1])].filter(Boolean).join(' ');
    const question = plain(q[1]).replace(/^"|"$/g, '');
    if (question && a) out.push({ q: question, a });
  }
  return out;
}

const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
const authorsLd = (book) => (book.authors || []).map((a) => ({ '@type': 'Person', name: a.name, ...(a.linkedin || a.github ? { sameAs: [a.linkedin, a.github].filter(Boolean) } : {}) }));

export function bookLd(ctx) {
  const { book } = ctx;
  return {
    '@context': 'https://schema.org', '@type': 'Book', '@id': absUrl(book) + '#book',
    name: book.title, alternativeHeadline: book.subtitle, description: book.back_blurb, url: absUrl(book),
    author: authorsLd(book), bookEdition: book.edition, inLanguage: 'en', isAccessibleForFree: true,
    license: book.seo?.license_url, image: absUrl(book, OG_IMAGE),
    hasPart: ctx.chapters.filter((c) => c.file).map((c) => ({ '@type': 'Chapter', name: c.title, url: absUrl(book, `ch/${c.id}.html`) })),
  };
}

export function chapterLd(c, ctx) {
  const { book } = ctx;
  const url = absUrl(book, `ch/${c.id}.html`);
  const graph = [{
    '@type': 'Chapter', '@id': url + '#chapter', name: c.title, headline: c.title, description: plain(c.deck || book.subtitle), url,
    position: c.n, author: authorsLd(book), dateModified: lastModified(c.file), inLanguage: 'en', isAccessibleForFree: true,
    image: absUrl(book, OG_IMAGE), isPartOf: { '@type': 'Book', '@id': absUrl(book) + '#book', name: book.title, url: absUrl(book) },
  }];
  const qa = interviewQA(c.body);
  if (qa.length) graph.push({ '@type': 'FAQPage', '@id': url + '#faq', mainEntity: qa.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  return { '@context': 'https://schema.org', '@graph': graph };
}

function umami(book) {
  const id = book.seo?.umami_website_id;
  if (!id) return '';
  const src = book.seo?.umami_src || 'https://cloud.umami.is/script.js';
  return `<script defer src="${esc(src)}" data-website-id="${esc(id)}"></script>`;
}

// Extra <head> tags for a page. `rel` is the page path under online_url ('' = home).
export function seoHead(ctx, { rel = '', ldObj } = {}) {
  const { book } = ctx;
  const url = absUrl(book, rel);
  return `<link rel="canonical" href="${esc(url)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:site_name" content="${esc(book.title)}">
<meta property="og:image" content="${esc(absUrl(book, OG_IMAGE))}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:image" content="${esc(absUrl(book, OG_IMAGE))}">
<link rel="alternate" type="application/rss+xml" title="${esc(book.title)}: new chapters" href="${esc(absUrl(book, 'rss.xml'))}">
${ldObj ? ld(ldObj) : ''}
${umami(book)}`;
}

export function sitemap(ctx) {
  const { book } = ctx;
  const written = ctx.chapters.filter((c) => c.file);
  const newest = written.map((c) => lastModified(c.file)).sort().pop() || buildTime;
  const urls = [{ loc: absUrl(book), lastmod: newest }, ...written.map((c) => ({ loc: absUrl(book, `ch/${c.id}.html`), lastmod: lastModified(c.file) }))];
  if (fs.existsSync(path.join(ROOT, 'dist', `${book.title}.pdf`))) urls.push({ loc: absUrl(book, `${book.title}.pdf`), lastmod: newest });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${esc(u.loc)}</loc><lastmod>${u.lastmod.slice(0, 10)}</lastmod></url>`).join('\n')}
</urlset>
`;
}

// A project site's robots.txt is not read by crawlers (only the domain root's is: the blog's, which already carries
// the AI-bot policy). This copy documents the policy and points at the sitemap for anyone mirroring the site.
export function robots(ctx) {
  return `# INFERENCE web edition. Crawlers read robots.txt only at the domain root
# (https://janmejai2002.github.io/robots.txt, the blog's), which sets the AI-bot policy for this path too.
# This file mirrors that intent: retrieval/search agents welcome, training-only crawlers not.
User-agent: GPTBot
Disallow: /
User-agent: ClaudeBot
Disallow: /
User-agent: CCBot
Disallow: /
User-agent: Bytespider
Disallow: /
User-agent: Applebot-Extended
Disallow: /
User-agent: *
Allow: /

Sitemap: ${absUrl(ctx.book, 'sitemap.xml')}
`;
}

export function rss(ctx) {
  const { book } = ctx;
  const items = ctx.chapters.filter((c) => c.file).map((c) => ({ c, date: lastModified(c.file) }))
    .sort((a, b) => b.date.localeCompare(a.date));
  const rfc = (iso) => new Date(iso).toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(book.title)}: ${esc(book.subtitle)}</title>
  <link>${esc(absUrl(book))}</link>
  <description>${esc(book.back_blurb)}</description>
  <language>en</language>
  <atom:link href="${esc(absUrl(book, 'rss.xml'))}" rel="self" type="application/rss+xml"/>
  <lastBuildDate>${rfc(items[0]?.date || buildTime)}</lastBuildDate>
${items.map(({ c, date }) => `  <item>
    <title>${esc(c.n)} · ${esc(c.title)}</title>
    <link>${esc(absUrl(book, `ch/${c.id}.html`))}</link>
    <guid isPermaLink="true">${esc(absUrl(book, `ch/${c.id}.html`))}</guid>
    <pubDate>${rfc(date)}</pubDate>
    <description>${esc(plain(c.deck || ''))}</description>
  </item>`).join('\n')}
</channel>
</rss>
`;
}

export function writeSeoFiles(ctx, DIST) {
  const og = path.join(ROOT, 'design', OG_IMAGE);
  if (fs.existsSync(og)) { fs.mkdirSync(path.join(DIST, path.dirname(OG_IMAGE)), { recursive: true }); fs.copyFileSync(og, path.join(DIST, OG_IMAGE)); }
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap(ctx));
  fs.writeFileSync(path.join(DIST, 'robots.txt'), robots(ctx));
  fs.writeFileSync(path.join(DIST, 'rss.xml'), rss(ctx));
}
