const res = await fetch('https://hbr.org/podcast/2026/01/where-mckinsey-and-consulting-go-from-here', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
});
const html = await res.text();
console.log('Status:', res.status);
const titleMatch = html.match(/<title>([^<]+)<\/title>/);
console.log('Title:', titleMatch ? titleMatch[1] : 'N/A');
const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
console.log('H1:', h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'N/A');

// Let's search for Sternfels quotes or text
const text = html.replace(/<[^>]+>/g, ' ');
const keywords = ['judgment', 'Sternfels', 'Ignatius', 'Beard', 'episode', '1060', 'pyramid', 'billable'];
for (const kw of keywords) {
  const idx = text.toLowerCase().indexOf(kw.toLowerCase());
  if (idx !== -1) {
    console.log(`Keyword "${kw}": ` + text.slice(Math.max(0, idx - 50), Math.min(text.length, idx + 100)).replace(/\s+/g, ' '));
  } else {
    console.log(`Keyword "${kw}": NOT FOUND`);
  }
}
