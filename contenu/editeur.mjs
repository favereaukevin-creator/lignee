// Identité de l'éditeur. Un seul endroit : les mentions légales, le bloc de
// contact et le pied y puisent tous, donc ils ne peuvent pas diverger.
//
// Tant qu'une valeur reste entre chevrons, `construire-pages.mjs` refuse de
// construire le site en diffusion publique.
//
// STATUT AU 28/09/2026 — relevé dans le courriel ANACOFI du 07/09/2026 :
// Kevin Favereau est MANDATAIRE D'INTERMÉDIAIRE EN ASSURANCE (MIA), adhésion
// ANACOFI-COURTAGE acceptée. Il n'est PAS conseiller en investissements
// financiers, et son enregistrement ORIAS n'est pas encore prononcé — le
// courriel précise qu'il faut attendre la commission de l'ORIAS avant de
// pouvoir commencer l'activité. Le site ne peut donc pas être ouvert au
// public tant que ce numéro n'existe pas.

export const ARENSEIGNER = {
  nom: 'Kevin Favereau',
  adresse: '<ADRESSE POSTALE PUBLIABLE>',
  courriel: '<ADRESSE DE CONTACT DÉDIÉE>',
  siren: '920 478 518',
  statut: 'Entrepreneur individuel — SIREN 920 478 518',
  /** Mandataire d'Intermédiaire en Assurance. En attente de la commission ORIAS. */
  categorie: "Mandataire d'Intermédiaire en Assurance (MIA)",
  orias: '<NUMÉRO ORIAS — en attente de la commission>',
  association: 'ANACOFI-COURTAGE, 92 rue d\'Amsterdam, 75009 Paris',
  /** L'intermédiation en assurance relève de l'ACPR, pas de l'AMF. */
  autorite: 'Autorité de contrôle prudentiel et de résolution (ACPR), 4 place de Budapest, CS 92459, 75436 Paris Cedex 09',
  mediateur: '<MÉDIATEUR : La Médiation de l\'Assurance, à confirmer selon l\'activité>',
}
