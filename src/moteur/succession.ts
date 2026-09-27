// Calcul des droits de succession.
//
// Le calcul suit l'ordre de la liquidation réelle :
//   actif brut − passif → actif net → part de chaque héritier
//   → abattement personnel → barème selon le lien → droits dus.
//
// Ce que ce moteur ne fait PAS, volontairement, et que l'écran doit dire :
//   • il ne détermine pas la dévolution légale (qui hérite de quoi). Les parts
//     sont saisies. Une dévolution dépend du régime matrimonial, des donations
//     entre époux, des testaments : la deviner serait plus faux que l'ignorer.
//   • il ne traite pas les exonérations de nature (Dutreil, bois et forêts,
//     monuments historiques), qui supposent un examen de situation.
//   • il ne gère pas le démembrement subi par la succession elle-même, seulement
//     l'évaluation d'un bien démembré transmis, via `valeurNuePropriete`.

import {
  BAREME_LIGNE_DIRECTE, BAREME_FRERES_SOEURS, BAREME_USUFRUIT,
  TAUX_PARENTS_4E_DEGRE, TAUX_NON_PARENTS,
  ABATTEMENT_LIGNE_DIRECTE, ABATTEMENT_HANDICAP, ABATTEMENT_FRERE_SOEUR,
  ABATTEMENT_NEVEU_NIECE, ABATTEMENT_DEFAUT, ABATTEMENT_RESIDENCE_PRINCIPALE,
  FORFAIT_FRAIS_FUNERAIRES,
  AV_ABATTEMENT_AVANT_70, AV_SEUIL_TAUX_MAJORE, AV_TAUX_1, AV_TAUX_2,
  AV_ABATTEMENT_APRES_70,
  type Tranche,
} from './bareme'

export * from './bareme'

export type Lien =
  | 'conjoint'        // époux survivant ou partenaire de PACS — exonéré
  | 'enfant'
  | 'petit-enfant'
  | 'ascendant'       // parent, grand-parent
  | 'frere-soeur'
  | 'neveu-niece'
  | 'parent-4e-degre' // oncle, tante, cousin germain…
  | 'autre'           // au-delà du 4e degré, concubin, ami, association

export const LIENS: Array<{ id: Lien; label: string; aide: string }> = [
  { id: 'conjoint', label: 'Conjoint ou partenaire de PACS', aide: 'totalement exonéré de droits de succession' },
  { id: 'enfant', label: 'Enfant', aide: 'abattement de 100 000 €, barème en ligne directe' },
  { id: 'petit-enfant', label: 'Petit-enfant', aide: 'abattement de 1 594 € seulement, sauf représentation' },
  { id: 'ascendant', label: 'Parent ou grand-parent', aide: 'abattement de 100 000 €, barème en ligne directe' },
  { id: 'frere-soeur', label: 'Frère ou sœur', aide: 'abattement de 15 932 €, puis 35 % puis 45 %' },
  { id: 'neveu-niece', label: 'Neveu ou nièce', aide: 'abattement de 7 967 €, puis 55 %' },
  { id: 'parent-4e-degre', label: 'Autre parent jusqu\'au 4e degré', aide: 'oncle, tante, cousin germain — 55 % dès le premier euro' },
  { id: 'autre', label: 'Concubin, ami, tiers', aide: 'aucun lien reconnu : 60 % dès le premier euro' },
]

export interface Heritier {
  id: string
  nom: string
  lien: Lien
  /** Quote-part de l'actif net successoral, en pourcentage (0 à 100). */
  partPct: number
  /** Abattement handicap de 159 325 €, cumulable — CGI art. 779, II. */
  handicap?: boolean
  /**
   * Petit-enfant venant en représentation de son parent prédécédé : il prend
   * alors la place de ce parent, donc l'abattement de 100 000 € partagé entre
   * les représentants d'une même souche.
   */
  representation?: boolean
  /** Nombre de représentants de la même souche, pour partager l'abattement. */
  nbRepresentants?: number
  /** Donations reçues du défunt depuis moins de 15 ans — CGI art. 784. */
  donationsAnterieures?: number
  /** Capitaux d'assurance-vie, primes versées avant 70 ans du souscripteur. */
  avAvant70?: number
  /** Primes versées après 70 ans et revenant à cet héritier — CGI art. 757 B. */
  avPrimesApres70?: number
}

export interface Actif {
  /** Biens immobiliers hors résidence principale. */
  immobilier: number
  /** Résidence principale du défunt, valeur vénale avant abattement. */
  residencePrincipale: number
  /**
   * La résidence principale est-elle occupée au jour du décès par le conjoint,
   * le partenaire de PACS, ou un enfant mineur ou majeur protégé ?
   * Condition de l'abattement de 20 % — CGI art. 764 bis.
   */
  residenceOccupee: boolean
  /** Comptes, livrets, valeurs mobilières, véhicules, mobilier… */
  financierEtAutres: number
  /** Dettes du défunt : emprunts en cours, impôts dus, factures. */
  passif: number
  /** Frais funéraires réellement engagés ; le forfait s'applique à défaut. */
  fraisFuneraires?: number
}

export interface LigneHeritier {
  heritier: Heritier
  /** Part de l'actif net successoral revenant à cet héritier. */
  partSuccessorale: number
  /** Part augmentée des donations rappelées — assiette avant abattement. */
  assietteAvantAbattement: number
  abattement: number
  /** Abattement effectivement consommé, borné par l'assiette. */
  abattementUtilise: number
  partTaxable: number
  droits: number
  /** Taux moyen réellement supporté, droits / part successorale. */
  tauxMoyen: number
  exonere: boolean
  /** Prélèvement de l'article 990 I sur l'assurance-vie avant 70 ans. */
  prelevementAv: number
  /** Droits dus sur les primes versées après 70 ans — art. 757 B. */
  droitsAvApres70: number
  /** Total supporté par l'héritier, succession et assurance-vie confondues. */
  totalDu: number
  /** Ce que l'héritier touche réellement, tout prélèvement déduit. */
  netPercu: number
  /** Explications à afficher : abattements et exonérations appliqués. */
  notes: string[]
}

export interface Resultat {
  actifBrut: number
  abattementResidence: number
  passifDeduit: number
  actifNet: number
  lignes: LigneHeritier[]
  totalDroits: number
  totalPrelevementAv: number
  /** Tout ce qui part à l'État, succession et assurance-vie confondues. */
  totalDu: number
  /** Part de l'actif transmis qui revient réellement aux héritiers. */
  totalNetPercu: number
  tauxGlobal: number
  /** Écarts et approximations à signaler à l'écran. */
  avertissements: string[]
}

/** Applique un barème progressif par tranches à une assiette. */
export function appliqueBareme(assiette: number, bareme: Tranche[]): number {
  if (assiette <= 0) return 0
  let droits = 0
  let bas = 0
  for (const t of bareme) {
    if (assiette <= bas) break
    droits += (Math.min(assiette, t.plafond) - bas) * t.taux
    bas = t.plafond
  }
  return droits
}

/** Valeur de la nue-propriété selon l'âge de l'usufruitier — CGI art. 669, I. */
export function partUsufruit(ageUsufruitier: number): number {
  const age = Math.max(0, Math.floor(ageUsufruitier))
  return (BAREME_USUFRUIT.find(t => age <= t.ageMax) ?? BAREME_USUFRUIT[BAREME_USUFRUIT.length - 1]).usufruit
}

export function valeurNuePropriete(valeurPleine: number, ageUsufruitier: number): number {
  return valeurPleine * (1 - partUsufruit(ageUsufruitier))
}

/** Abattement personnel d'un héritier, hors handicap. */
function abattementDeBase(h: Heritier): number {
  switch (h.lien) {
    case 'enfant':
    case 'ascendant':
      return ABATTEMENT_LIGNE_DIRECTE
    case 'petit-enfant':
      // Hors représentation, un petit-enfant n'a que l'abattement par défaut :
      // les 31 865 € que tout le monde cite valent pour les DONATIONS.
      if (!h.representation) return ABATTEMENT_DEFAUT
      return ABATTEMENT_LIGNE_DIRECTE / Math.max(1, h.nbRepresentants ?? 1)
    case 'frere-soeur':
      return ABATTEMENT_FRERE_SOEUR
    case 'neveu-niece':
      return ABATTEMENT_NEVEU_NIECE
    case 'conjoint':
      return 0 // exonéré : l'abattement n'a pas d'objet
    default:
      return ABATTEMENT_DEFAUT
  }
}

/** Barème applicable à un héritier, ou un taux unique. */
function baremeDe(lien: Lien): Tranche[] {
  switch (lien) {
    case 'enfant':
    case 'ascendant':
    case 'petit-enfant':
      return BAREME_LIGNE_DIRECTE
    case 'frere-soeur':
      return BAREME_FRERES_SOEURS
    case 'neveu-niece':
    case 'parent-4e-degre':
      return [{ plafond: Infinity, taux: TAUX_PARENTS_4E_DEGRE }]
    default:
      return [{ plafond: Infinity, taux: TAUX_NON_PARENTS }]
  }
}

/** Le conjoint survivant et le partenaire de PACS — CGI art. 796-0 bis. */
const estExonere = (h: Heritier): boolean => h.lien === 'conjoint'

/** Prélèvement de l'article 990 I sur les capitaux décès, primes avant 70 ans. */
export function prelevement990I(capital: number, exonere: boolean): number {
  if (exonere || capital <= 0) return 0
  const taxable = Math.max(0, capital - AV_ABATTEMENT_AVANT_70)
  if (taxable <= 0) return 0
  return taxable <= AV_SEUIL_TAUX_MAJORE
    ? taxable * AV_TAUX_1
    : AV_SEUIL_TAUX_MAJORE * AV_TAUX_1 + (taxable - AV_SEUIL_TAUX_MAJORE) * AV_TAUX_2
}

export function calcule(actif: Actif, heritiers: Heritier[]): Resultat {
  const avertissements: string[] = []

  // --- Actif net taxable
  const abattementResidence = actif.residenceOccupee
    ? actif.residencePrincipale * ABATTEMENT_RESIDENCE_PRINCIPALE
    : 0
  const actifBrut = actif.immobilier + actif.residencePrincipale + actif.financierEtAutres
  // Non renseigné : le forfait de 1 500 € s'applique sans justificatif. Une
  // valeur saisie fait foi, y compris zéro — sinon on ne pourrait jamais dire
  // « pas de frais » sans se voir imposer le forfait.
  const frais = actif.fraisFuneraires == null
    ? FORFAIT_FRAIS_FUNERAIRES
    : Math.max(0, actif.fraisFuneraires)
  const passifDeduit = Math.max(0, actif.passif) + frais
  const actifNet = Math.max(0, actifBrut - abattementResidence - passifDeduit)

  const totalPct = heritiers.reduce((s, h) => s + Math.max(0, h.partPct), 0)
  if (heritiers.length > 0 && Math.abs(totalPct - 100) > 0.01) {
    avertissements.push(
      `Les parts saisies totalisent ${totalPct.toFixed(1)} % au lieu de 100 %. `
      + `L'actif est réparti au prorata, mais vérifiez la dévolution.`)
  }

  // --- Abattement global de l'article 757 B : 30 500 € sur les PRIMES versées
  // après 70 ans, tous bénéficiaires et tous contrats confondus, réparti au
  // prorata des parts taxables. La part des bénéficiaires exonérés est écartée.
  const primesApres70Taxables = heritiers
    .filter(h => !estExonere(h))
    .reduce((s, h) => s + Math.max(0, h.avPrimesApres70 ?? 0), 0)

  const lignes: LigneHeritier[] = heritiers.map(h => {
    const notes: string[] = []
    const poids = totalPct > 0 ? Math.max(0, h.partPct) / totalPct : 0
    const partSuccessorale = actifNet * poids
    const exonere = estExonere(h)

    // Rappel fiscal : les donations de moins de 15 ans entrent dans l'assiette
    // et consomment l'abattement — CGI art. 784.
    const donations = Math.max(0, h.donationsAnterieures ?? 0)
    const assietteAvantAbattement = partSuccessorale + donations

    let abattement = abattementDeBase(h)
    if (h.handicap) abattement += ABATTEMENT_HANDICAP
    const abattementUtilise = exonere ? 0 : Math.min(abattement, assietteAvantAbattement)
    const partTaxable = exonere ? 0 : Math.max(0, assietteAvantAbattement - abattement)

    // Les droits portent sur la part taxable, mais les donations déjà taxées ne
    // le sont pas deux fois : on retire les droits théoriques sur la seule
    // fraction correspondant aux donations rappelées.
    const bareme = baremeDe(h.lien)
    const droitsTotaux = exonere ? 0 : appliqueBareme(partTaxable, bareme)
    const droitsSurDonations = exonere || donations <= 0
      ? 0
      : appliqueBareme(Math.max(0, donations - abattement), bareme)
    const droits = Math.max(0, droitsTotaux - droitsSurDonations)

    // --- Assurance-vie
    const prelevementAv = prelevement990I(Math.max(0, h.avAvant70 ?? 0), exonere)

    const primes70 = Math.max(0, h.avPrimesApres70 ?? 0)
    let droitsAvApres70 = 0
    if (!exonere && primes70 > 0) {
      const quotePart = primesApres70Taxables > 0 ? primes70 / primesApres70Taxables : 0
      const abattement757 = AV_ABATTEMENT_APRES_70 * quotePart
      const primesTaxables = Math.max(0, primes70 - abattement757)
      // Les primes rejoignent l'assiette successorale AVANT l'abattement
      // personnel : un héritier dont l'abattement n'a pas été consommé par la
      // succession peut donc les absorber. Les ajouter après l'abattement
      // taxait des primes pourtant couvertes.
      const avec = appliqueBareme(
        Math.max(0, assietteAvantAbattement + primesTaxables - abattement), bareme)
      droitsAvApres70 = Math.max(0, avec - droitsTotaux)
      if (primesTaxables > 0) {
        notes.push(`Primes après 70 ans : ${Math.round(abattement757).toLocaleString('fr-FR')} € d'abattement (quote-part des 30 500 € globaux)`)
      }
    }

    if (exonere) notes.push('Totalement exonéré de droits de succession (CGI art. 796-0 bis)')
    else if (abattementUtilise > 0) notes.push(`Abattement de ${Math.round(abattementUtilise).toLocaleString('fr-FR')} € appliqué`)
    if (h.handicap) notes.push('Abattement handicap de 159 325 € cumulé (CGI art. 779, II)')
    if (donations > 0) notes.push(`${Math.round(donations).toLocaleString('fr-FR')} € de donations de moins de 15 ans rappelées`)
    if ((h.avAvant70 ?? 0) > 0 && exonere) notes.push("Assurance-vie exonérée de prélèvement pour le conjoint ou partenaire de PACS")

    const totalDu = droits + prelevementAv + droitsAvApres70
    const recu = partSuccessorale + Math.max(0, h.avAvant70 ?? 0) + primes70
    return {
      heritier: h,
      partSuccessorale,
      assietteAvantAbattement,
      abattement,
      abattementUtilise,
      partTaxable,
      droits,
      tauxMoyen: partSuccessorale > 0 ? droits / partSuccessorale : 0,
      exonere,
      prelevementAv,
      droitsAvApres70,
      totalDu,
      netPercu: recu - totalDu,
      notes,
    }
  })

  const totalDroits = lignes.reduce((s, l) => s + l.droits + l.droitsAvApres70, 0)
  const totalPrelevementAv = lignes.reduce((s, l) => s + l.prelevementAv, 0)
  const totalDu = totalDroits + totalPrelevementAv
  const totalTransmis = lignes.reduce(
    (s, l) => s + l.partSuccessorale + Math.max(0, l.heritier.avAvant70 ?? 0) + Math.max(0, l.heritier.avPrimesApres70 ?? 0), 0)

  if (actif.residencePrincipale > 0 && !actif.residenceOccupee) {
    avertissements.push(
      "L'abattement de 20 % sur la résidence principale n'est pas appliqué : "
      + "il suppose que le logement soit occupé au jour du décès par le conjoint, "
      + "le partenaire de PACS ou un enfant mineur ou majeur protégé.")
  }

  return {
    actifBrut,
    abattementResidence,
    passifDeduit,
    actifNet,
    lignes,
    totalDroits,
    totalPrelevementAv,
    totalDu,
    totalNetPercu: totalTransmis - totalDu,
    tauxGlobal: totalTransmis > 0 ? totalDu / totalTransmis : 0,
    avertissements,
  }
}
