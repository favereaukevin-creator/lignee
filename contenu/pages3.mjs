// Mentions légales. Obligation de l'article 6-III-1 de la LCEN.
//
// Les sections qui dépendent de l'identité de l'éditeur ne sortent qu'en
// diffusion publique. En préversion, la page le dit franchement plutôt que
// d'afficher des champs à trou — et surtout, rien n'est inventé.

import { ARENSEIGNER } from './editeur.mjs'
import { PUBLIQUE } from './gabarit.mjs'

export { ARENSEIGNER }

const editeur = () => `
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
          <strong>L'information publiée sur ce site est générale.</strong> Ni les guides
          ni le simulateur ne constituent un conseil personnalisé au sens de la
          réglementation : celui-ci suppose un examen de votre situation et donne lieu,
          au préalable, à la remise d'un document d'entrée en relation.
        </div>
      </div>

      <div class="bloc texte" style="margin-top:44px">
        <h2>Médiation de la consommation</h2>
        <p>
          Conformément à l'article L616-1 du Code de la consommation, tout consommateur
          a le droit de recourir gratuitement à un médiateur en vue de la résolution
          amiable d'un litige, après avoir tenté de le résoudre directement auprès de
          l'éditeur.
        </p>
        <p>${ARENSEIGNER.mediateur}</p>
      </div>`

const preversion = () => `
      <div class="bloc texte" style="margin-top:44px">
        <div class="note note--alerte">
          <strong>Ce site est une préversion.</strong> Il n'est pas référencé, il ne
          propose aucun service et il ne recueille aucune demande. L'identité de
          l'éditeur et ses statuts réglementaires seront publiés ici avant toute
          ouverture au public.
        </div>
      </div>`

const signalement = () => PUBLIQUE ? `
      <div class="bloc texte" style="margin-top:44px">
        <h2>Signaler une erreur</h2>
        <p>
          Une erreur de barème sur un site qui calcule un impôt n'est pas une broutille.
          Si vous en constatez une, écrivez à ${ARENSEIGNER.courriel} : elle sera vérifiée
          à la source et corrigée.
        </p>
      </div>` : `
      <div class="bloc texte" style="margin-top:44px">
        <h2>Signaler une erreur</h2>
        <p>
          Une erreur de barème sur un site qui calcule un impôt n'est pas une broutille.
          Une adresse de signalement sera publiée à l'ouverture du site.
        </p>
      </div>`

export const pages3 = [
  {
    slug: 'mentions-legales',
    titre: 'Mentions légales',
    description: "Éditeur, hébergeur, données personnelles et limites de responsabilité du site Lignée.",
    sansContact: true,
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
${PUBLIQUE ? editeur() : preversion()}

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
          rien n'est conservé. Fermer l'onglet suffit à les faire disparaître.${PUBLIQUE ? `
          Le site ne comporte d'ailleurs aucun formulaire : écrire à l'éditeur se fait
          depuis votre propre messagerie, et ce courriel n'est alors soumis qu'aux règles
          de votre fournisseur et à celles du sien.` : ''}
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
          Bulletin officiel des finances publiques, et datés. Ils sont susceptibles d'être
          modifiés par toute loi de finances.
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
${signalement()}
    </section>`,
  },
]
