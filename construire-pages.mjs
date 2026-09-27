// Génère les fichiers HTML à la racine à partir du gabarit et du contenu.
// Lancé avant vite build, qui les prend ensuite comme points d'entrée.

import { writeFileSync, readdirSync, unlinkSync } from 'node:fs'
import { page, SITE, BASE, PUBLIQUE, DIFFUSION } from './contenu/gabarit.mjs'
import { pages } from './contenu/pages.mjs'
import { pages2 } from './contenu/pages2.mjs'
import { pages3, ARENSEIGNER } from './contenu/pages3.mjs'
import { pages4 } from './contenu/pages4.mjs'

const toutes = [...pages, ...pages2, ...pages4, ...pages3]

// On repart propre : une page supprimée du contenu ne doit pas survivre en ligne.
for (const f of readdirSync('.')) {
  if (f.endsWith('.html')) unlinkSync(f)
}

/**
 * Préfixe les liens internes par la base de déploiement.
 * On ne touche qu'aux liens de pages : Vite réécrit lui-même /src/... et les
 * ressources, et y toucher ici les casserait.
 */
const prefixe = (html) => BASE === '/'
  ? html
  : html
    .replace(/href="\/"/g, `href="${BASE}"`)
    .replace(/href="\/([a-z0-9-]+\.html)"/g, `href="${BASE}$1"`)

// Garde-fou : une mention légale à trou est pire que pas de page du tout, et
// un numéro ORIAS inventé serait une faute grave. On contrôle les valeurs à la
// source plutôt que le HTML produit : c'est exact, et aucune ponctuation ne
// peut le prendre en défaut.
// En diffusion restreinte, le site ne publie ni identité d'éditeur ni contact :
// il n'y a donc rien à exiger. En diffusion publique, tout est requis.
const manquants = PUBLIQUE
  ? Object.entries(ARENSEIGNER).filter(([, v]) => /^<.*>$/.test(v.trim()))
  : []
if (manquants.length) {
  console.error('\n✗ Mentions légales incomplètes. À renseigner dans contenu/pages3.mjs :')
  for (const [cle, valeur] of manquants) console.error(`    ${cle.padEnd(12)} ${valeur}`)
  console.error('\n  La construction est bloquée tant qu\'un champ reste vide.\n')
  process.exit(1)
}

for (const p of toutes) {
  writeFileSync(`${p.slug}.html`, prefixe(page(p)))
}

// Plan du site et robots.txt, pour le référencement.
const base = SITE
writeFileSync('public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
  + toutes.map(p => `  <url><loc>${base}${p.slug === 'index' ? '/' : '/' + p.slug + '.html'}</loc></url>`).join('\n')
  + `\n</urlset>\n`)
writeFileSync('public/robots.txt', PUBLIQUE
  ? `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`
  : `User-agent: *\nDisallow: /\n`)

console.log(`${toutes.length} pages générées en diffusion ${DIFFUSION} : ${toutes.map(p => p.slug).join(', ')}`)
if (!PUBLIQUE) {
  console.log('  → noindex posé, bloc de contact masqué, mentions en préversion.')
  console.log("  → DIFFUSION=publique pour ouvrir, une fois l'identité de l'éditeur renseignée.")
}
