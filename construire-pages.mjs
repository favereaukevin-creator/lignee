// Génère les fichiers HTML à la racine à partir du gabarit et du contenu.
// Lancé avant vite build, qui les prend ensuite comme points d'entrée.

import { writeFileSync, readdirSync, unlinkSync } from 'node:fs'
import { page, SITE } from './contenu/gabarit.mjs'
import { pages } from './contenu/pages.mjs'
import { pages2 } from './contenu/pages2.mjs'

const toutes = [...pages, ...pages2]

// On repart propre : une page supprimée du contenu ne doit pas survivre en ligne.
for (const f of readdirSync('.')) {
  if (f.endsWith('.html')) unlinkSync(f)
}

for (const p of toutes) {
  writeFileSync(`${p.slug}.html`, page(p))
}

// Plan du site et robots.txt, pour le référencement.
const base = SITE
writeFileSync('public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
  + toutes.map(p => `  <url><loc>${base}${p.slug === 'index' ? '/' : '/' + p.slug + '.html'}</loc></url>`).join('\n')
  + `\n</urlset>\n`)
writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`)

console.log(`${toutes.length} pages générées : ${toutes.map(p => p.slug).join(', ')}`)
