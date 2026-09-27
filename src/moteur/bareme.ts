// Barèmes, abattements et exonérations des droits de succession.
//
// Toutes les valeurs de ce fichier ont été relevées le 27/09/2026 sur
// Légifrance et le BOFiP, et non de mémoire. Chaque constante porte son article
// du CGI : c'est ce qui permet de la revérifier sans tout reprendre.
//
// À REVOIR à chaque loi de finances, en janvier. Les seuils du barème n'ont pas
// bougé depuis 2011, mais les abattements et les régimes d'exonération, si.

/** Millésime des règles encodées ici. L'écran doit l'afficher. */
export const MILLESIME = 2026

export interface Tranche {
  /** Borne haute de la tranche, en euros. Infinity pour la dernière. */
  plafond: number
  taux: number
}

/**
 * Tarif en ligne directe — CGI art. 777, tableau I.
 * Ascendants et descendants : parents, enfants, petits-enfants…
 */
export const BAREME_LIGNE_DIRECTE: Tranche[] = [
  { plafond: 8_072, taux: 0.05 },
  { plafond: 12_109, taux: 0.10 },
  { plafond: 15_932, taux: 0.15 },
  { plafond: 552_324, taux: 0.20 },
  { plafond: 902_838, taux: 0.30 },
  { plafond: 1_805_677, taux: 0.40 },
  { plafond: Infinity, taux: 0.45 },
]

/**
 * Tarif entre époux et partenaires de PACS — CGI art. 777, tableau II.
 *
 * ATTENTION : ce tableau ne sert qu'aux DONATIONS. En succession, le conjoint
 * survivant et le partenaire de PACS sont TOTALEMENT EXONÉRÉS (art. 796-0 bis).
 * Il est conservé ici pour le volet donation, pas pour le calcul successoral.
 */
export const BAREME_EPOUX_DONATION: Tranche[] = [
  { plafond: 8_072, taux: 0.05 },
  { plafond: 15_932, taux: 0.10 },
  { plafond: 31_865, taux: 0.15 },
  { plafond: 552_324, taux: 0.20 },
  { plafond: 902_838, taux: 0.30 },
  { plafond: 1_805_677, taux: 0.40 },
  { plafond: Infinity, taux: 0.45 },
]

/** Tarif entre frères et sœurs — CGI art. 777, tableau III. */
export const BAREME_FRERES_SOEURS: Tranche[] = [
  { plafond: 24_430, taux: 0.35 },
  { plafond: Infinity, taux: 0.45 },
]

/** Parents jusqu'au 4e degré inclus — CGI art. 777, tableau III. */
export const TAUX_PARENTS_4E_DEGRE = 0.55
/** Parents au-delà du 4e degré et non-parents — CGI art. 777, tableau III. */
export const TAUX_NON_PARENTS = 0.60

// ---------- Abattements en succession ----------

/** Ligne directe : ascendants et enfants — CGI art. 779, I. */
export const ABATTEMENT_LIGNE_DIRECTE = 100_000
/** Handicap — CGI art. 779, II. Se CUMULE avec les autres abattements. */
export const ABATTEMENT_HANDICAP = 159_325
/** Frères et sœurs — CGI art. 779, IV. */
export const ABATTEMENT_FRERE_SOEUR = 15_932
/** Neveux et nièces — CGI art. 779, V. */
export const ABATTEMENT_NEVEU_NIECE = 7_967
/** À défaut d'autre abattement — CGI art. 788, IV. */
export const ABATTEMENT_DEFAUT = 1_594

/**
 * Abattement sur la résidence principale — CGI art. 764 bis.
 * Deux conditions cumulatives : le bien est la résidence principale du défunt
 * au jour du décès, ET il est occupé à cette date par le conjoint survivant,
 * le partenaire de PACS, ou un enfant mineur ou majeur protégé. Un défunt qui
 * occupait seul son logement n'y donne pas droit.
 */
export const ABATTEMENT_RESIDENCE_PRINCIPALE = 0.20

/** Forfait des frais funéraires déductibles de l'actif — CGI art. 775. */
export const FORFAIT_FRAIS_FUNERAIRES = 1_500

// ---------- Assurance-vie ----------

/** Primes versées avant 70 ans — CGI art. 990 I : abattement par bénéficiaire. */
export const AV_ABATTEMENT_AVANT_70 = 152_500
export const AV_SEUIL_TAUX_MAJORE = 700_000
export const AV_TAUX_1 = 0.20
export const AV_TAUX_2 = 0.3125

/**
 * Primes versées après 70 ans — CGI art. 757 B.
 * Abattement GLOBAL, tous bénéficiaires et tous contrats confondus, portant sur
 * les PRIMES et non sur le capital. Les produits sont exonérés.
 */
export const AV_ABATTEMENT_APRES_70 = 30_500

// ---------- Démembrement ----------

/** Usufruit selon l'âge de l'usufruitier — CGI art. 669, I. */
export const BAREME_USUFRUIT: Array<{ ageMax: number; usufruit: number }> = [
  { ageMax: 20, usufruit: 0.90 },
  { ageMax: 30, usufruit: 0.80 },
  { ageMax: 40, usufruit: 0.70 },
  { ageMax: 50, usufruit: 0.60 },
  { ageMax: 60, usufruit: 0.50 },
  { ageMax: 70, usufruit: 0.40 },
  { ageMax: 80, usufruit: 0.30 },
  { ageMax: 90, usufruit: 0.20 },
  { ageMax: Infinity, usufruit: 0.10 },
]

/** Durée de rappel des donations antérieures — CGI art. 784. */
export const RAPPEL_FISCAL_ANNEES = 15
