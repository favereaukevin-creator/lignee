// Mentions légales. Obligation de l'article 6-III-1 de la LCEN.
//
// Les valeurs entre chevrons sont les seules qui ne puissent venir que de
// Kevin. Tant qu'elles y figurent, la page N'EST PAS publiable : un numéro
// ORIAS ou un statut réglementaire inventé serait bien pire que pas de page.
// Le test `mentions.test.ts` refuse la construction tant qu'il en reste.

export const ARENSEIGNER = {
  nom: '<NOM LÉGAL COMPLET>',
  adresse: '<ADRESSE POSTALE>',
  courriel: '<ADRESSE DE CONTACT>',
  statut: '<STATUT : personne physique, ou forme sociale, capital, RCS, SIREN>',
  orias: '<NUMÉRO ORIAS>',
  association: '<ASSOCIATION AGRÉÉE — ANACOFI-CIF, CNCGP…>',
}

export const pages3 = [
  {
    slug: 'mentions-legales',
    titre: 'Mentions légales',
    description: "Éditeur, hébergeur, statuts réglementaires, données personnelles et limites de responsabilité du site Lignée.",
    contenu: `
    <section class="section">
      <div class="bloc texte">
        <p class="surtitre">Informations légales</p>
        <h1>Mentions légales</h1>
        <p class="chapo">
          Publiées en application de l'article 6-III-1 de la loi n° 2004-575 du
          21 juin 2004 pour la confiance dans l'économie numérique.
        </p>
      </div>

      <div class="bloc texte" style="margin-top:44px">
        <h2>Éditeur du site</h2>
        <p>
          ${ARENSEIGNER.nom}<br />
          ${ARENSEIGNER.statut}<br />
          ${ARENSEIGNER.adresse}<br />
          ${ARENSEIGNER.courriel}
        </p>
        <p>Directeur de la publication : ${ARENSEIGNER.nom}.</p>
      </div>

      <div class="bloc texte" style="margin-top:44px">
        <h2>Statuts réglementaires</h2>
        <p>
          L'éditeur exerce une activité de conseil en gestion de patrimoine, réglementée
          à ce titre :
        </p>
        <ul>
          <li>
            Conseiller en Investissements Financiers (CIF), enregistré à l'ORIAS sous le
            numéro ${ARENSEIGNER.orias}, adhérent de ${ARENSEIGNER.association}, association
            agréée par l'Autorité des marchés financiers.
          </li>
        </ul>
        <p>
          Le registre des intermédiaires est consultable sur
          <a href="https://www.orias.fr" rel="noopener">orias.fr</a>. L'activité de conseil
          en investissements financiers est placée sous le contrôle de
          l'<a href="https://www.amf-france.org" rel="noopener">Autorité des marchés
          financiers</a>, 17 place de la Bourse, 75082 Paris Cedex 02.
        </p>
        <div class="note">
          <strong>Ce site ne propose aucun service et ne recueille aucune demande.</strong>
          Il publie de l'information générale et un outil de calcul. Il ne constitue ni
          une offre, ni une sollicitation, ni un acte de conseil au sens de la
          réglementation applicable.
        </div>
      </div>

      <div class="bloc texte" style="margin-top:44px">
        <h2>Hébergement</h2>
        <p>
          GitHub, Inc.<br />
          88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis<br />
          <a href="https://github.com" rel="noopener">github.com</a>
        </p>
        <p>
          Le site est un ensemble de fichiers statiques servis par GitHub Pages. Aucune
          base de données, aucun traitement côté serveur.
        </p>
      </div>

      <div class="bloc texte" style="margin-top:44px">
        <h2>Données personnelles</h2>
        <p>
          <strong>Ce site ne collecte aucune donnée personnelle.</strong> Il ne comporte ni
          formulaire, ni compte, ni inscription, ni outil de mesure d'audience, ni
          traceur publicitaire.
        </p>
        <p>
          Les montants que vous saisissez dans le simulateur sont calculés dans votre
          navigateur et n'en sortent jamais : rien n'est transmis, rien n'est enregistré,
          rien n'est conservé. Fermer l'onglet suffit à les faire disparaître. Aucun
          responsable de traitement n'a donc à être désigné au sens du règlement
          (UE) 2016/679, faute de traitement.
        </p>
        <p>
          Aucun cookie n'est déposé. Les polices de caractères sont chargées depuis
          Google Fonts, ce qui transmet votre adresse IP à Google — c'est le seul flux
          sortant de ce site, et il relève du fonctionnement technique de l'affichage.
        </p>
      </div>

      <div class="bloc texte" style="margin-top:44px">
        <h2>Portée et limites de l'information</h2>
        <p>
          Les barèmes, abattements et taux publiés ici sont relevés sur Légifrance et le
          Bulletin officiel des finances publiques, et datés sur chaque page. Ils sont
          susceptibles d'être modifiés par toute loi de finances.
        </p>
        <p>
          Le simulateur produit une <strong>estimation indicative</strong>. Il ne détermine
          pas la dévolution successorale, ignore le régime matrimonial, les donations entre
          époux, les testaments et les exonérations propres à certains biens. Une succession
          se liquide chez un notaire, seul habilité à en établir le montant exact.
        </p>
        <p>
          L'éditeur ne saurait être tenu responsable des décisions prises sur la seule
          base des informations ou des calculs publiés ici, ni d'une éventuelle
          inexactitude ou obsolescence de ceux-ci.
        </p>
      </div>

      <div class="bloc texte" style="margin-top:44px">
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, la méthode de calcul et la présentation du site sont la propriété de
          l'éditeur. Les données publiques reproduites — barèmes et textes du Code général
          des impôts — relèvent du domaine de la donnée publique et sont librement
          réutilisables.
        </p>
      </div>

      <div class="bloc texte" style="margin-top:44px">
        <h2>Signaler une erreur</h2>
        <p>
          Une erreur de barème sur un site qui calcule un impôt n'est pas une broutille.
          Si vous en constatez une, écrivez à ${ARENSEIGNER.courriel} : elle sera vérifiée
          à la source et corrigée.
        </p>
      </div>
    </section>`,
  },
]
