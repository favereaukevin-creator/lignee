// Identité de l'éditeur. Un seul endroit : les mentions légales, le bloc de
// contact et le pied y puisent tous, donc ils ne peuvent pas diverger.
//
// Tant qu'une valeur reste entre chevrons, `construire-pages.mjs` refuse de
// construire le site.

export const ARENSEIGNER = {
  nom: '<NOM LÉGAL COMPLET>',
  adresse: '<ADRESSE POSTALE>',
  courriel: '<ADRESSE DE CONTACT>',
  statut: '<STATUT : personne physique, ou forme sociale, capital, RCS, SIREN>',
  orias: '<NUMÉRO ORIAS>',
  association: '<ASSOCIATION AGRÉÉE — ANACOFI-CIF, CNCGP…>',
  // Devenu obligatoire du jour où le site propose un contact : tout
  // professionnel s'adressant à des consommateurs doit publier les
  // coordonnées de son médiateur (Code de la consommation, art. L616-1).
  mediateur: '<MÉDIATEUR DE LA CONSOMMATION : nom et adresse du site>',
}
