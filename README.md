# Lignée — droits de succession

Site statique : guides sur la transmission et simulateur de droits de succession.
Aucune donnée saisie ne quitte le navigateur.

## Ce qui fait foi

`src/moteur/bareme.ts` porte tous les barèmes, abattements et taux, chacun avec
son article du CGI. Les valeurs ont été relevées le 27/09/2026 sur Légifrance et
le BOFiP, jamais de mémoire. **À revoir à chaque loi de finances.**

`src/moteur/contenu.test.ts` vérifie que les montants cités dans les pages
rédigées correspondent à ceux du moteur, et recalcule chaque exemple chiffré du
site. Il a attrapé deux chiffres faux dès sa première exécution : ne pas le
retirer.

## Commandes

```
npm run dev      # génère les pages puis lance Vite
npm test         # 52 tests sur le moteur et la cohérence du contenu
npm run build    # pages + typecheck + build statique dans dist/
```

`SITE_URL=https://mondomaine.fr npm run build` fixe les liens canoniques et le
plan du site. Sans lui, la valeur par défaut de `contenu/gabarit.mjs` s'applique.

## Structure

- `contenu/gabarit.mjs` — en-tête, pied, métadonnées : un seul endroit
- `contenu/pages*.mjs` — le contenu éditorial, page par page
- `construire-pages.mjs` — écrit les `.html` à la racine, plus `sitemap.xml` et `robots.txt`
- `src/moteur/` — le calcul, sans aucune dépendance à React
- `src/Simulateur.tsx` — l'interface, montée sur `#simulateur` de la page simulateur

Les pages de contenu ne chargent aucun JavaScript. Seule la page du simulateur
embarque React.

## Ce que le moteur ne fait pas

Il ne détermine pas la dévolution — qui hérite de quoi dépend du régime
matrimonial, des donations entre époux et des testaments. Il ne traite pas les
exonérations de nature (Dutreil, bois et forêts, monuments historiques). Ces
limites sont écrites sur le site, elles ne doivent pas en disparaître.
