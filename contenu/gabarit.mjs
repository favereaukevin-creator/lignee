// Gabarit commun des pages. Un seul en-tête, un seul pied : les dupliquer dans
// chaque fichier HTML garantissait qu'ils finiraient par diverger.

import { ARENSEIGNER } from './editeur.mjs'

/**
 * Deux régimes de diffusion.
 *
 *   restreinte — le site est en ligne mais non référencé, sans contact, comme
 *                l'app Patrimoine. C'est une préversion qu'on partage par lien.
 *   publique   — le site est ouvert au public et indexé. Il exige alors une
 *                identité d'éditeur complète, et les obligations qui vont avec.
 *
 * On reste en restreinte par défaut : ouvrir se décide, se fermer s'oublie.
 */
export const DIFFUSION = process.env.DIFFUSION === 'publique' ? 'publique' : 'restreinte'
export const PUBLIQUE = DIFFUSION === 'publique'

export const MARQUE = 'Lignée'
export const BASELINE = 'Comprendre et préparer sa succession'
export const ANNEE = 2026

// URL publique du site. Sert aux liens canoniques et au plan du site, qui
// doivent être absolus. Renseignée par SITE_URL au moment de la construction.
export const SITE = (process.env.SITE_URL || 'https://lignee.fr').replace(/\/$/, '')

// Préfixe des liens internes. Sur GitHub Pages, le site vit sous /lignee/ et
// des liens en /simulateur.html tomberaient à côté. Vide (« / ») dès qu'un nom
// de domaine propre est branché.
export const BASE = (process.env.BASE_URL || '/').replace(/\/*$/, '/')

export const NAV = [
  { href: '/simulateur.html', texte: 'Simulateur' },
  { href: '/abattements.html', texte: 'Abattements et barèmes' },
  { href: '/assurance-vie.html', texte: 'Assurance-vie' },
  { href: '/donation.html', texte: 'Donner de son vivant' },
  { href: '/pret-familial.html', texte: 'Prêt familial' },
  { href: '/conjoint.html', texte: 'Protéger son conjoint' },
]

const nav = (courante) => NAV.map(l =>
  `<a href="${l.href}"${l.href === courante ? ' aria-current="page"' : ''}>${l.texte}</a>`).join('\n          ')

/**
 * Bloc de contact. Volontairement sans formulaire : un formulaire supposerait
 * de collecter et d'héberger des données, ce que le site promet précisément de
 * ne pas faire. Un lien de messagerie ne collecte rien.
 */
const contact = () => `
    <section class="section section--doux">
      <div class="bloc texte" style="text-align:center;max-width:620px;margin:0 auto">
        <p class="surtitre">En parler</p>
        <h2>Votre situation ne ressemble à aucun tableau</h2>
        <p class="chapo" style="margin:0 auto 26px">
          Un régime matrimonial, un enfant d'un premier lit, une entreprise à transmettre :
          ce sont ces détails qui déplacent les montants, et aucun simulateur ne les voit.
          Si vous voulez en discuter, écrivez — la réponse est gratuite et sans engagement.
        </p>
        <a class="btn btn--plein" href="mailto:${ARENSEIGNER.courriel}?subject=Question%20sur%20ma%20succession">
          ${ARENSEIGNER.courriel}
        </a>
        <p class="aide" style="margin-top:18px;font-size:13.5px;color:var(--texte-doux)">
          Aucun formulaire, aucune inscription : votre message part de votre messagerie.
        </p>
      </div>
    </section>`

const pied = () => `
  <footer class="pied">
    <div class="bloc">
      <div class="grille grille--3">
        <div>
          <a class="marque" href="/" style="color:#fff">Lign<span>ée</span></a>
          <p style="margin-top:12px;max-width:34ch">
            ${BASELINE}. Les barèmes publiés ici sont relevés sur Légifrance et le
            Bulletin officiel des finances publiques, et datés.
          </p>
        </div>
        <div>
          ${PUBLIQUE ? `<h4>Écrire</h4>
          <div style="margin-bottom:22px"><a href="mailto:${ARENSEIGNER.courriel}">${ARENSEIGNER.courriel}</a></div>` : ''}
          <h4>Comprendre</h4>
          ${NAV.map(l => `<div style="margin-bottom:7px"><a href="${l.href}">${l.texte}</a></div>`).join('\n          ')}
        </div>
        <div>
          <h4>Sources</h4>
          <div style="margin-bottom:7px"><a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000030061736" rel="noopener">CGI art. 777 — barèmes</a></div>
          <div style="margin-bottom:7px"><a href="https://bofip.impots.gouv.fr/bofip/3369-PGP.html" rel="noopener">BOFiP — abattements</a></div>
          <div style="margin-bottom:7px"><a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F14198" rel="noopener">Service-public — droits de succession</a></div>
        </div>
      </div>
      <div class="mentions">
        <p style="margin:0 0 8px"><a href="/mentions-legales.html">Mentions légales</a></p>
        <p style="margin:0 0 8px">
          <strong>Ce site n'est ni un conseil juridique, ni un conseil fiscal, ni une consultation notariale.</strong>
          Les estimations sont indicatives : elles ignorent le régime matrimonial, les
          donations entre époux, les testaments et les exonérations propres à certains
          biens. Une succession se liquide chez un notaire.
        </p>
        <p style="margin:0">Barèmes en vigueur au 1<sup>er</sup> janvier ${ANNEE} · Aucune donnée saisie sur ce site n'est transmise ni conservée.</p>
      </div>
    </div>
  </footer>`

export function page({ slug, titre, description, contenu, script = false, sansContact = false }) {
  const url = slug === 'index' ? '/' : `/${slug}.html`
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${titre} · ${MARQUE}</title>
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${titre} · ${MARQUE}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${SITE}${url}" />
  <meta property="og:locale" content="fr_FR" />
  ${PUBLIQUE ? '' : '<meta name="robots" content="noindex, nofollow" />'}
  <link rel="canonical" href="${SITE}${url}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="/src/styles/base.css" />
</head>
<body>
  <header class="entete">
    <div class="bloc">
      <a class="marque" href="/">Lign<span>ée</span></a>
      <nav class="nav">
          ${nav(url)}
      </nav>
    </div>
  </header>
  <main>
${contenu}
${sansContact || !PUBLIQUE ? '' : contact()}
  </main>
${pied()}
${script ? '  <script type="module" src="/src/main.tsx"></script>' : ''}
</body>
</html>
`
}
