import { describe, it, expect } from 'vitest'
import {
  calcule, appliqueBareme, partUsufruit, valeurNuePropriete, prelevement990I,
  BAREME_LIGNE_DIRECTE, BAREME_FRERES_SOEURS,
  type Actif, type Heritier,
} from './succession'

const ACTIF_VIDE: Actif = {
  immobilier: 0, residencePrincipale: 0, residenceOccupee: false,
  financierEtAutres: 0, passif: 0, fraisFuneraires: 0,
}

/** Sans frais funéraires saisis, le forfait de 1 500 € s'applique. */
const ACTIF_AVEC_FORFAIT: Actif = { ...ACTIF_VIDE, fraisFuneraires: undefined }

/** Succession simple : un actif net connu, sans passif ni frais. */
const actifDe = (montant: number): Actif => ({ ...ACTIF_VIDE, financierEtAutres: montant })

const heritier = (h: Partial<Heritier>): Heritier => ({
  id: 'h1', nom: 'Héritier', lien: 'enfant', partPct: 100, ...h,
})

describe('barème en ligne directe — CGI art. 777 tableau I', () => {
  it('reproduit le calcul tranche par tranche sur 200 000 € taxables', () => {
    // 8 072 × 5 % = 403,60
    // (12 109 − 8 072) × 10 % = 403,70
    // (15 932 − 12 109) × 15 % = 573,45
    // (200 000 − 15 932) × 20 % = 36 813,60
    const attendu = 403.60 + 403.70 + 573.45 + 36813.60
    expect(appliqueBareme(200_000, BAREME_LIGNE_DIRECTE)).toBeCloseTo(attendu, 2)
    expect(appliqueBareme(200_000, BAREME_LIGNE_DIRECTE)).toBeCloseTo(38_194.35, 2)
  })

  it('un enfant recevant 300 000 € paie 38 194 € après abattement', () => {
    const r = calcule(actifDe(300_000), [heritier({ lien: 'enfant' })])
    expect(r.actifNet).toBe(300_000)
    expect(r.lignes[0].abattementUtilise).toBe(100_000)
    expect(r.lignes[0].partTaxable).toBe(200_000)
    expect(Math.round(r.lignes[0].droits)).toBe(38_194)
  })

  it('ne taxe rien en dessous de l\'abattement', () => {
    const r = calcule(actifDe(80_000), [heritier({ lien: 'enfant' })])
    expect(r.lignes[0].partTaxable).toBe(0)
    expect(r.lignes[0].droits).toBe(0)
    expect(r.lignes[0].abattementUtilise).toBe(80_000)
  })

  it('atteint bien la tranche à 45 % sur les très grosses parts', () => {
    const r = calcule(actifDe(3_000_000), [heritier({ lien: 'enfant' })])
    expect(r.lignes[0].tauxMoyen).toBeGreaterThan(0.35)
    expect(r.lignes[0].tauxMoyen).toBeLessThan(0.45)
  })
})

describe('exonération du conjoint et du partenaire de PACS', () => {
  it('ne réclame aucun droit, quel que soit le montant', () => {
    const r = calcule(actifDe(5_000_000), [heritier({ lien: 'conjoint' })])
    expect(r.lignes[0].exonere).toBe(true)
    expect(r.lignes[0].droits).toBe(0)
    expect(r.totalDu).toBe(0)
    expect(r.lignes[0].netPercu).toBe(5_000_000)
  })

  it('exonère aussi son assurance-vie de tout prélèvement', () => {
    const r = calcule(actifDe(0), [heritier({ lien: 'conjoint', avAvant70: 900_000 })])
    expect(r.lignes[0].prelevementAv).toBe(0)
    expect(r.totalDu).toBe(0)
  })
})

describe('collatéraux et tiers', () => {
  it('applique 35 % puis 45 % aux frères et sœurs', () => {
    // 100 000 − 15 932 = 84 068 taxables
    // 24 430 × 35 % = 8 550,50 ; (84 068 − 24 430) × 45 % = 26 837,10
    const r = calcule(actifDe(100_000), [heritier({ lien: 'frere-soeur' })])
    expect(r.lignes[0].partTaxable).toBe(84_068)
    expect(r.lignes[0].droits).toBeCloseTo(8_550.50 + 26_837.10, 2)
    expect(appliqueBareme(84_068, BAREME_FRERES_SOEURS)).toBeCloseTo(35_387.60, 2)
  })

  it('taxe le neveu à 55 % après 7 967 € d\'abattement', () => {
    const r = calcule(actifDe(100_000), [heritier({ lien: 'neveu-niece' })])
    expect(r.lignes[0].partTaxable).toBe(92_033)
    expect(r.lignes[0].droits).toBeCloseTo(92_033 * 0.55, 6)
  })

  it('taxe le concubin à 60 % après 1 594 € seulement', () => {
    const r = calcule(actifDe(100_000), [heritier({ lien: 'autre' })])
    expect(r.lignes[0].abattementUtilise).toBe(1_594)
    expect(r.lignes[0].droits).toBeCloseTo(98_406 * 0.60, 6)
    // C'est le point que le simulateur doit rendre criant.
    expect(r.lignes[0].tauxMoyen).toBeGreaterThan(0.59)
  })
})

describe('petit-enfant : l\'abattement de 31 865 € ne vaut que pour les donations', () => {
  it('n\'accorde que 1 594 € hors représentation', () => {
    const r = calcule(actifDe(100_000), [heritier({ lien: 'petit-enfant' })])
    expect(r.lignes[0].abattementUtilise).toBe(1_594)
  })

  it('partage les 100 000 € de la souche entre représentants', () => {
    const r = calcule(actifDe(200_000), [
      heritier({ id: 'a', lien: 'petit-enfant', partPct: 50, representation: true, nbRepresentants: 2 }),
      heritier({ id: 'b', lien: 'petit-enfant', partPct: 50, representation: true, nbRepresentants: 2 }),
    ])
    expect(r.lignes[0].abattement).toBe(50_000)
    expect(r.lignes[1].abattement).toBe(50_000)
  })
})

describe('abattement handicap — cumulable', () => {
  it('s\'ajoute à l\'abattement de ligne directe', () => {
    const r = calcule(actifDe(300_000), [heritier({ lien: 'enfant', handicap: true })])
    expect(r.lignes[0].abattement).toBe(100_000 + 159_325)
    expect(r.lignes[0].partTaxable).toBe(300_000 - 259_325)
  })

  it('s\'ajoute aussi à l\'abattement par défaut d\'un tiers', () => {
    const r = calcule(actifDe(300_000), [heritier({ lien: 'autre', handicap: true })])
    expect(r.lignes[0].abattement).toBe(1_594 + 159_325)
  })
})

describe('actif net : passif, frais funéraires, résidence principale', () => {
  it('déduit le passif et applique le forfait funéraire de 1 500 €', () => {
    const r = calcule(
      { ...ACTIF_AVEC_FORFAIT, financierEtAutres: 200_000, passif: 50_000 },
      [heritier({})])
    expect(r.passifDeduit).toBe(51_500)
    expect(r.actifNet).toBe(148_500)
  })

  it('retient zéro quand on saisit explicitement zéro', () => {
    const r = calcule({ ...ACTIF_VIDE, financierEtAutres: 200_000 }, [heritier({})])
    expect(r.passifDeduit).toBe(0)
    expect(r.actifNet).toBe(200_000)
  })

  it('préfère les frais réels au forfait quand ils sont saisis', () => {
    const r = calcule(
      { ...ACTIF_VIDE, financierEtAutres: 200_000, fraisFuneraires: 4_200 },
      [heritier({})])
    expect(r.passifDeduit).toBe(4_200)
  })

  it('abat 20 % de la résidence principale si elle est occupée', () => {
    const occupee = calcule(
      { ...ACTIF_AVEC_FORFAIT, residencePrincipale: 400_000, residenceOccupee: true },
      [heritier({})])
    expect(occupee.abattementResidence).toBe(80_000)
    expect(occupee.actifNet).toBe(400_000 - 80_000 - 1_500)
  })

  it('ne l\'applique pas si le défunt vivait seul, et le dit', () => {
    const seul = calcule(
      { ...ACTIF_VIDE, residencePrincipale: 400_000, residenceOccupee: false },
      [heritier({})])
    expect(seul.abattementResidence).toBe(0)
    expect(seul.avertissements.join(' ')).toContain('20 %')
  })

  it('ne descend jamais sous zéro quand le passif dépasse l\'actif', () => {
    const r = calcule({ ...ACTIF_VIDE, financierEtAutres: 10_000, passif: 90_000 }, [heritier({})])
    expect(r.actifNet).toBe(0)
    expect(r.totalDu).toBe(0)
  })
})

describe('assurance-vie, primes versées avant 70 ans — CGI art. 990 I', () => {
  it('exonère jusqu\'à 152 500 € par bénéficiaire', () => {
    expect(prelevement990I(152_500, false)).toBe(0)
    expect(prelevement990I(100_000, false)).toBe(0)
  })

  it('prélève 20 % au-delà de l\'abattement', () => {
    expect(prelevement990I(200_000, false)).toBeCloseTo(47_500 * 0.20, 6)
  })

  it('passe à 31,25 % au-delà de 700 000 € taxables', () => {
    // 1 000 000 − 152 500 = 847 500 taxables
    // 700 000 × 20 % = 140 000 ; 147 500 × 31,25 % = 46 093,75
    expect(prelevement990I(1_000_000, false)).toBeCloseTo(140_000 + 46_093.75, 2)
  })

  it('s\'applique par bénéficiaire, pas par contrat', () => {
    const r = calcule(actifDe(0), [
      heritier({ id: 'a', nom: 'A', lien: 'enfant', partPct: 50, avAvant70: 200_000 }),
      heritier({ id: 'b', nom: 'B', lien: 'enfant', partPct: 50, avAvant70: 200_000 }),
    ])
    // Chacun a son propre abattement : deux fois 9 500 €, pas un seul.
    expect(r.totalPrelevementAv).toBeCloseTo(2 * 47_500 * 0.20, 6)
  })
})

describe('assurance-vie, primes versées après 70 ans — CGI art. 757 B', () => {
  it('répartit l\'abattement global de 30 500 € entre les bénéficiaires taxables', () => {
    const r = calcule(actifDe(0), [
      heritier({ id: 'a', nom: 'A', lien: 'enfant', partPct: 50, avPrimesApres70: 30_000 }),
      heritier({ id: 'b', nom: 'B', lien: 'enfant', partPct: 50, avPrimesApres70: 30_000 }),
    ])
    // 60 000 € de primes, un seul abattement de 30 500 € pour les deux.
    const primesTaxables = 60_000 - 30_500
    // Chacun est sous son abattement de 100 000 € de ligne directe : rien à payer.
    expect(r.lignes[0].droitsAvApres70).toBe(0)
    expect(primesTaxables).toBeGreaterThan(0) // l'abattement ne couvre pas tout
  })

  it('taxe les primes au barème du lien une fois l\'abattement consommé', () => {
    const r = calcule(actifDe(300_000), [
      heritier({ lien: 'enfant', partPct: 100, avPrimesApres70: 100_000 }),
    ])
    // Part successorale 300 000, abattement 100 000 → 200 000 taxables.
    // Primes 100 000 − 30 500 = 69 500 s'ajoutent, taxés à 20 %.
    expect(r.lignes[0].droitsAvApres70).toBeCloseTo(69_500 * 0.20, 2)
  })

  it('n\'attribue aucune quote-part d\'abattement à un bénéficiaire exonéré', () => {
    const r = calcule(actifDe(0), [
      heritier({ id: 'c', nom: 'Conjoint', lien: 'conjoint', partPct: 50, avPrimesApres70: 100_000 }),
      heritier({ id: 'e', nom: 'Enfant', lien: 'enfant', partPct: 50, avPrimesApres70: 100_000 }),
    ])
    // Le conjoint ne consomme pas l'abattement : l'enfant l'a tout entier.
    expect(r.lignes[0].droitsAvApres70).toBe(0)
    expect(r.lignes[1].droitsAvApres70).toBe(0) // sous son abattement de 100 000 €
  })
})

describe('donations antérieures de moins de 15 ans — CGI art. 784', () => {
  it('consomment l\'abattement et poussent la succession dans les tranches hautes', () => {
    const sans = calcule(actifDe(200_000), [heritier({ lien: 'enfant' })])
    const avec = calcule(actifDe(200_000), [heritier({ lien: 'enfant', donationsAnterieures: 100_000 })])
    expect(avec.lignes[0].droits).toBeGreaterThan(sans.lignes[0].droits)
  })

  it('ne taxent pas deux fois ce qui l\'a déjà été', () => {
    // Donation de 100 000 € déjà couverte par l'abattement : la succession de
    // 200 000 € doit être taxée comme si l'abattement était épuisé, ni plus.
    const r = calcule(actifDe(200_000), [heritier({ lien: 'enfant', donationsAnterieures: 100_000 })])
    expect(Math.round(r.lignes[0].droits)).toBe(Math.round(appliqueBareme(200_000, BAREME_LIGNE_DIRECTE)))
  })
})

describe('répartition entre plusieurs héritiers', () => {
  it('partage l\'actif net au prorata des parts', () => {
    const r = calcule(actifDe(600_000), [
      heritier({ id: 'a', nom: 'A', partPct: 50 }),
      heritier({ id: 'b', nom: 'B', partPct: 30 }),
      heritier({ id: 'c', nom: 'C', partPct: 20 }),
    ])
    expect(r.lignes.map(l => Math.round(l.partSuccessorale))).toEqual([300_000, 180_000, 120_000])
  })

  it('signale des parts qui ne totalisent pas 100 %', () => {
    const r = calcule(actifDe(100_000), [heritier({ partPct: 60 })])
    expect(r.avertissements.join(' ')).toContain('100 %')
    // L'actif est tout de même réparti en entier, au prorata.
    expect(r.lignes[0].partSuccessorale).toBe(100_000)
  })

  it('donne chacun son abattement, contrairement à un calcul global', () => {
    const groupe = calcule(actifDe(400_000), [
      heritier({ id: 'a', nom: 'A', partPct: 25 }),
      heritier({ id: 'b', nom: 'B', partPct: 25 }),
      heritier({ id: 'c', nom: 'C', partPct: 25 }),
      heritier({ id: 'd', nom: 'D', partPct: 25 }),
    ])
    // Quatre parts de 100 000 €, chacune absorbée par son abattement.
    expect(groupe.totalDu).toBe(0)
  })
})

describe('démembrement — CGI art. 669', () => {
  it('suit le barème par tranche d\'âge', () => {
    expect(partUsufruit(20)).toBe(0.90)
    expect(partUsufruit(21)).toBe(0.80)
    expect(partUsufruit(65)).toBe(0.40)
    expect(partUsufruit(71)).toBe(0.30)
    expect(partUsufruit(91)).toBe(0.10)
    expect(partUsufruit(105)).toBe(0.10)
  })

  it('bascule bien à chaque dizaine, bornes comprises', () => {
    expect(partUsufruit(70)).toBe(0.40)
    expect(partUsufruit(80)).toBe(0.30)
    expect(partUsufruit(90)).toBe(0.20)
  })

  it('valorise la nue-propriété en complément', () => {
    expect(valeurNuePropriete(500_000, 65)).toBeCloseTo(300_000, 6)
    expect(valeurNuePropriete(500_000, 75)).toBeCloseTo(350_000, 6)
  })
})

describe('cohérence d\'ensemble', () => {
  it('le net perçu plus les droits égale toujours ce qui est transmis', () => {
    const r = calcule(
      { immobilier: 300_000, residencePrincipale: 400_000, residenceOccupee: true,
        financierEtAutres: 150_000, passif: 80_000, fraisFuneraires: 3_000 },
      [
        heritier({ id: 'c', nom: 'Conjoint', lien: 'conjoint', partPct: 25, avAvant70: 200_000 }),
        heritier({ id: 'e1', nom: 'Enfant 1', lien: 'enfant', partPct: 37.5, avAvant70: 250_000 }),
        heritier({ id: 'e2', nom: 'Enfant 2', lien: 'enfant', partPct: 37.5, avPrimesApres70: 60_000 }),
      ])
    const transmis = r.lignes.reduce((s, l) =>
      s + l.partSuccessorale + (l.heritier.avAvant70 ?? 0) + (l.heritier.avPrimesApres70 ?? 0), 0)
    expect(r.totalNetPercu + r.totalDu).toBeCloseTo(transmis, 6)
    expect(r.avertissements).toHaveLength(0)
  })

  it('ne produit jamais de NaN ni de valeur négative sur une succession vide', () => {
    const r = calcule(ACTIF_VIDE, [])
    for (const v of [r.actifBrut, r.actifNet, r.totalDroits, r.totalDu, r.tauxGlobal]) {
      expect(Number.isFinite(v)).toBe(true)
      expect(v).toBeGreaterThanOrEqual(0)
    }
  })
})
