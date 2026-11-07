import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = 'C:/Users/Janmejai/compendium';
const chaptersDir = path.join(ROOT, 'content', 'chapters');
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.md'));

console.log('Searching for math in frontmatter across all chapters...');

for (const file of files) {
  const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
  const { data } = matter(content);

  for (const field of ['title', 'deck', 'hook', 'objectives']) {
    const val = data[field];
    if (!val) continue;
    if (Array.isArray(val)) {
      val.forEach((item, idx) => {
        if (item.includes('$') || item.includes('\\')) {
          console.log(`[${file}] objectives[${idx}]: ${item}`);
        }
      });
    } else if (typeof val === 'string') {
      if (val.includes('$') || val.includes('\\')) {
        console.log(`[${file}] ${field}: ${val}`);
      }
    }
  }
}
