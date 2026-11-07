import fs from 'node:fs';
import matter from 'gray-matter';

const raw = fs.readFileSync('content/chapters/creative-at-scale.md', 'utf8');
const { data } = matter(raw);

console.log('Parsed objective 0:');
console.log(data.objectives[0]);
