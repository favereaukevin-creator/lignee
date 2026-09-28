// Plan d'épargne retraite — règles utiles côté succession.
// Vérifiées le 28/09/2026 sur le BOFiP et service-public.gouv.fr.

/**
 * Au décès du titulaire d'un PER assurantiel, c'est l'ÂGE AU DÉCÈS qui
 * détermine le régime, et non la date des versements. C'est l'inverse de
 * l'assurance-vie, et la source d'erreur la plus fréquente sur le sujet.
 */
export const PER_AGE_BASCULE = 70

/** Décès avant 70 ans : prélèvement de l'article 990 I, abattement par bénéficiaire. */
export const PER_ABATTEMENT_AVANT_70 = 152_500

/**
 * Décès après 70 ans : article 757 B, abattement global de 30 500 €.
 * Différence majeure avec l'assurance-vie — les droits portent sur
 * L'INTÉGRALITÉ des sommes versées aux bénéficiaires, et non sur les seules
 * primes. Les gains ne sont pas exonérés.
 */
export const PER_ABATTEMENT_APRES_70 = 30_500

// ---------- Déduction à l'entrée, millésime 2026 ----------

/** 10 % des revenus professionnels nets de l'année précédente. */
export const PER_TAUX_DEDUCTION = 0.10
export const PER_PLAFOND_MIN_2026 = 4_710
export const PER_PLAFOND_MAX_2026 = 37_680

/** Report des plafonds non utilisés : porté de trois à cinq ans en 2026. */
export const PER_REPORT_ANNEES = 5

/**
 * Depuis le 1er janvier 2026, les versements effectués à partir de 70 ans ne
 * sont plus déductibles du revenu imposable.
 */
export const PER_AGE_FIN_DEDUCTION = 70

/**
 * Prélèvements sociaux à la sortie, portés à 18,6 % au 1er janvier 2026
 * (loi n° 2025-1403 du 30 décembre 2025). Le PER relève des produits de
 * placement, donc du taux majoré — contrairement aux revenus fonciers nus,
 * restés à 17,2 %.
 */
export const PER_PS_SORTIE = 0.186
