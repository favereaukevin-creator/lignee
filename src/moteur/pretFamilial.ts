// Règles du prêt familial et abattements de donation.
//
// Ces valeurs ne servent pas au calcul successoral : elles sont citées dans les
// pages rédigées. Elles vivent ici pour la même raison que les autres — pour
// être référencées, et pour que le test de cohérence les surveille.
//
// Vérifiées le 27/09/2026 sur Légifrance, service-public.gouv.fr et impots.gouv.fr.

/** Au-delà, un écrit est exigé pour prouver un acte — Code civil art. 1359. */
export const SEUIL_ECRIT = 1_500

/**
 * Au-delà, sur une même année, le contrat de prêt doit être déclaré par le
 * formulaire n° 2062 (annexe 2062-A si plusieurs prêts). L'obligation pèse
 * d'abord sur l'emprunteur, à défaut sur le prêteur.
 */
export const SEUIL_DECLARATION_PRET = 5_000

/**
 * Droit fixe d'enregistrement d'un acte sous seing privé — CGI art. 680.
 * Facultatif, mais il donne date certaine : sans elle, une dette du défunt
 * envers un héritier est présumée fictive et non déductible (CGI art. 773, 2°).
 */
export const DROIT_ENREGISTREMENT = 125

// ---------- Abattements de donation (à ne pas confondre avec la succession) ----------

export const DON_ENFANT = 100_000
export const DON_EPOUX_PACS = 80_724
export const DON_PETIT_ENFANT = 31_865
export const DON_FRERE_SOEUR = 15_932
export const DON_NEVEU_NIECE = 7_967
export const DON_ARRIERE_PETIT_ENFANT = 5_310

/**
 * Don familial de sommes d'argent — CGI art. 790 G. S'ajoute aux abattements
 * ci-dessus. Donateur de moins de 80 ans, donataire majeur, en numéraire.
 */
export const DON_FAMILIAL_NUMERAIRE = 31_865
export const DON_FAMILIAL_AGE_MAX = 80
