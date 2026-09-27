import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import {
  ABATTEMENT_LIGNE_DIRECTE, ABATTEMENT_HANDICAP, ABATTEMENT_FRERE_SOEUR,
  ABATTEMENT_NEVEU_NIECE, ABATTEMENT_DEFAUT, AV_ABATTEMENT_AVANT_70,
  AV_ABATTEMENT_APRES_70, AV_SEUIL_TAUX_MAJORE, TAUX_NON_PARENTS,
  calcule, appliqueBareme, BAREME_LIGNE_DIRECTE, BAREME_FRERES_SOEURS,
  type Actif,
} from './succession'
import {
  SEUIL_ECRIT, SEUIL_DECLARATION_PRET, DROIT_ENREGISTREMENT,
  DON_ENFANT, DON_EPOUX_PACS, DON_PETIT_ENFANT, DON_FRERE_SOEUR,
  DON_NEVEU_NIECE, DON_ARRIERE_PETIT_ENFANT, DON_FAMILIAL_NUMERAIRE,
} from './pretFamilial'

/**
 * Les pages du site citent des montants en toutes lettres. Rien n'empêche le
 * texte de dériver du moteur le jour où un barème change — sauf ce test.
 */
const contenu = readdirSync('contenu')
  .filter(f => f.endsWith('.mjs'))
  .map(f => readFileSync(`contenu/${f}`, 'utf8'))
  .join('\n')

/** Un montant tel qu'il s'écrit en français : espaces insécables comprises. */
const enFrancais = (n: number) => n.toLocaleString('fr-FR').replace(/ | /g, ' ')
const citeDansLeContenu = (n: number) => {
  const attendu = enFrancais(n)
  return contenu.replace(/ | /g, ' ').includes(attendu)
}

describe('le contenu rédigé cite les mêmes chiffres que le moteur', () => {
  it.each([
    ['abattement en ligne directe', ABATTEMENT_LIGNE_DIRECTE],
    ['abattement handicap', ABATTEMENT_HANDICAP],
    ['abattement frère ou sœur', ABATTEMENT_FRERE_SOEUR],
    ['abattement neveu ou nièce', ABATTEMENT_NEVEU_NIECE],
    ['abattement par défaut', ABATTEMENT_DEFAUT],
    ['abattement assurance-vie avant 70 ans', AV_ABATTEMENT_AVANT_70],
    ['abattement assurance-vie après 70 ans', AV_ABATTEMENT_APRES_70],
    ['seuil du taux majoré', AV_SEUIL_TAUX_MAJORE],
    ['seuil de l\'écrit', SEUIL_ECRIT],
    ['seuil de déclaration du prêt', SEUIL_DECLARATION_PRET],
    ['droit d\'enregistrement', DROIT_ENREGISTREMENT],
    ['donation à un enfant', DON_ENFANT],
    ['donation entre époux ou pacsés', DON_EPOUX_PACS],
    ['donation à un petit-enfant', DON_PETIT_ENFANT],
    ['donation à un frère ou une sœur', DON_FRERE_SOEUR],
    ['donation à un neveu ou une nièce', DON_NEVEU_NIECE],
    ['donation à un arrière-petit-enfant', DON_ARRIERE_PETIT_ENFANT],
    ['don familial de sommes d\'argent', DON_FAMILIAL_NUMERAIRE],
  ])('%s — %i € apparaît dans les pages', (_, montant) => {
    expect(citeDansLeContenu(montant)).toBe(true)
  })

  it('cite toutes les bornes du barème en ligne directe', () => {
    for (const t of BAREME_LIGNE_DIRECTE) {
      if (Number.isFinite(t.plafond)) expect(citeDansLeContenu(t.plafond)).toBe(true)
    }
  })

  it('cite la borne du barème entre frères et sœurs', () => {
    expect(citeDansLeContenu(BAREME_FRERES_SOEURS[0].plafond)).toBe(true)
  })
})

describe('les exemples chiffrés des pages sont exacts', () => {
  const nu = (m: number): Actif => ({
    immobilier: 0, residencePrincipale: 0, residenceOccupee: false,
    financierEtAutres: m, passif: 0, fraisFuneraires: 0,
  })

  it('« un enfant recevant 300 000 € paie 38 194 € »', () => {
    const r = calcule(nu(300_000), [{ id: 'a', nom: 'Enfant', lien: 'enfant', partPct: 100 }])
    expect(Math.round(r.lignes[0].droits)).toBe(38_194)
    expect(contenu).toContain('38 194')
  })

  it('« un concubin héritant de 200 000 € reverse 119 044 € »', () => {
    const r = calcule(nu(200_000), [{ id: 'a', nom: 'Concubin', lien: 'autre', partPct: 100 }])
    expect(Math.round(r.lignes[0].droits)).toBe(Math.round((200_000 - ABATTEMENT_DEFAUT) * TAUX_NON_PARENTS))
    expect(Math.round(r.lignes[0].droits)).toBe(119_044)
    expect(contenu).toContain('119 044')
  })

  it('« le concubin paie 239 044 € sur 400 000 € » (page conjoint)', () => {
    const r = calcule(nu(400_000), [{ id: 'a', nom: 'Concubin', lien: 'autre', partPct: 100 }])
    expect(Math.round(r.lignes[0].droits)).toBe(239_044)
    expect(contenu).toContain('239 044')
  })

  it('« assurance-vie avant 70 ans, 300 000 € → 29 500 € » (page assurance-vie)', () => {
    // (300 000 − 152 500) × 20 %
    expect((300_000 - AV_ABATTEMENT_AVANT_70) * 0.20).toBe(29_500)
    expect(contenu).toContain('29 500')
  })

  it('« assurance-vie après 70 ans, 300 000 € de primes → 32 094 € »', () => {
    const r = calcule(nu(0), [{
      id: 'a', nom: 'Enfant', lien: 'enfant', partPct: 100, avPrimesApres70: 300_000,
    }])
    // 300 000 − 30 500 = 269 500 de primes taxables, moins 100 000 d'abattement
    // personnel non consommé : 169 500 au barème de la ligne directe.
    expect(Math.round(r.lignes[0].droitsAvApres70)).toBe(32_094)
    expect(Math.round(appliqueBareme(169_500, BAREME_LIGNE_DIRECTE))).toBe(32_094)
    expect(contenu).toContain('32 094')
  })

  it('« quatre enfants se partageant 400 000 € ne paient rien »', () => {
    const r = calcule(nu(400_000), [1, 2, 3, 4].map(i =>
      ({ id: `e${i}`, nom: `Enfant ${i}`, lien: 'enfant' as const, partPct: 25 })))
    expect(r.totalDu).toBe(0)
  })
})
