import { readFileSync, writeFileSync } from 'node:fs';

const article = JSON.parse(readFileSync('scripts/new-blog-article.json', 'utf8'));

// Find the next blog ID
const current = readFileSync('src/data/blogs.ts', 'utf8');
const ids = [...current.matchAll(/id: '(\d+)'/g)].map(m => parseInt(m[1]));
const nextId = Math.max(...ids) + 1;

const newEntry = `  {
    id: '${nextId}',
    title: '${article.title}',
    slug: '${article.slug}',
    excerpt: '${article.excerpt.replace(/'/g, "\\'")}',
    content: \`${article.content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
    author: '${article.author}',
    category: '${article.category}',
    date: '${article.date}',
    image: '${article.image}',
    readTime: ${article.readTime},
  },
  {
    id: '${nextId - 1}',`;

// Find and replace the previous first entry
const oldEntry = `  {\n    id: '${nextId - 1}',`;
let blogFile = readFileSync('src/data/blogs.ts', 'utf8');

// Only replace the first occurrence (the top-level array entry)
const idx = blogFile.indexOf(oldEntry);
if (idx !== -1) {
  blogFile = blogFile.substring(0, idx) + newEntry + blogFile.substring(idx + oldEntry.length);
  writeFileSync('src/data/blogs.ts', blogFile, 'utf8');
  console.log('Updated blogs.ts with new article, id:', nextId);
} else {
  console.log('Could not find insertion point');
}
