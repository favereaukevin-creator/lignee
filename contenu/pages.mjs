// Contenu éditorial. Les chiffres cités ici doivent rester alignés sur
// src/moteur/bareme.ts — un test le vérifie.

export const pages = [
  {
    slug: 'index',
    titre: 'Droits de succession : comprendre, calculer, anticiper',
    description: "Combien vos héritiers paieront-ils ? Simulateur gratuit et guides sur les abattements, l'assurance-vie, la donation et la protection du conjoint. Barèmes 2026 vérifiés.",
    contenu: `
    <section class="section">
      <div class="bloc">
        <p class="surtitre">Barèmes 2026 · Sources officielles</p>
        <h1 style="max-width:16ch">Ce que vos héritiers paieront vraiment</h1>
        <p class="chapo">
          En ligne directe, l'État prend en moyenne 20 % de ce qui dépasse 100 000 € par enfant.
          Entre un concubin et un enfant, l'écart atteint 60 points. Ces règles se préparent —
          rarement le jour du décès.
        </p>
        <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:30px">
          <a class="btn btn--plein" href="/simulateur.html">Calculer les droits →</a>
          <a class="btn btn--fant" href="/abattements.html">Voir les barèmes</a>
        </div>
      </div>
    </section>

    <section class="section section--doux">
      <div class="bloc">
        <div class="grille grille--3">
          <div>
            <div class="chiffre">100 000 €</div>
            <div class="chiffre-note">d'abattement par enfant et par parent, renouvelable tous les 15 ans en donation</div>
          </div>
          <div>
            <div class="chiffre chiffre--or">0 €</div>
            <div class="chiffre-note">pour le conjoint survivant et le partenaire de PACS : exonération totale depuis 2007</div>
          </div>
          <div>
            <div class="chiffre chiffre--rouge">60 %</div>
            <div class="chiffre-note">pour un concubin ou un ami, dès 1 594 € reçus — le tarif le plus lourd du barème</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="bloc">
        <p class="surtitre">Le simulateur</p>
        <h2 style="max-width:20ch">Une estimation en deux minutes, sans inscription</h2>
        <p class="chapo">
          Renseignez le patrimoine et les héritiers : le calcul applique les abattements
          personnels, le barème du lien de parenté, l'abattement de 20 % sur la résidence
          principale et les deux régimes de l'assurance-vie. Rien n'est transmis ni conservé.
        </p>
        <div class="grille grille--2" style="margin-top:30px">
          <div class="carte">
            <h3>Ce qu'il calcule</h3>
            <ul style="margin:0;padding-left:18px;color:var(--texte-doux);font-size:15px">
              <li>Les droits héritier par héritier, avec le détail de l'abattement</li>
              <li>L'assurance-vie, primes avant et après 70 ans</li>
              <li>Les donations de moins de 15 ans rappelées</li>
              <li>L'abattement handicap, cumulable avec les autres</li>
            </ul>
          </div>
          <div class="carte">
            <h3>Ce qu'il ne fait pas</h3>
            <ul style="margin:0;padding-left:18px;color:var(--texte-doux);font-size:15px">
              <li>Déterminer qui hérite : la dévolution dépend du régime matrimonial et des testaments</li>
              <li>Traiter les exonérations de nature — Dutreil, bois et forêts, monuments historiques</li>
              <li>Remplacer la liquidation d'un notaire</li>
            </ul>
          </div>
        </div>
        <div style="margin-top:28px"><a class="btn btn--or" href="/simulateur.html">Ouvrir le simulateur →</a></div>
      </div>
    </section>

    <section class="section section--encre">
      <div class="bloc">
        <p class="surtitre">Les quatre leviers</p>
        <h2 style="max-width:22ch">Presque tout se joue avant</h2>
        <div class="grille grille--2" style="margin-top:34px">
          <div>
            <h3><a href="/donation.html" style="color:#fff">Donner de son vivant →</a></h3>
            <p style="color:#b9cbd7">
              L'abattement de 100 000 € par enfant se reconstitue tous les quinze ans.
              Donner à 55 ans plutôt qu'à 75 peut valoir deux abattements au lieu d'un.
            </p>
          </div>
          <div>
            <h3><a href="/assurance-vie.html" style="color:#fff">L'assurance-vie →</a></h3>
            <p style="color:#b9cbd7">
              152 500 € par bénéficiaire hors succession pour les primes versées avant
              70 ans. C'est l'outil le plus efficace pour transmettre hors ligne directe.
            </p>
          </div>
          <div>
            <h3><a href="/conjoint.html" style="color:#fff">Protéger son conjoint →</a></h3>
            <p style="color:#b9cbd7">
              Le conjoint marié ne paie rien. Le concubin paie 60 %. Entre les deux,
              le PACS et la donation au dernier vivant changent tout.
            </p>
          </div>
          <div>
            <h3><a href="/abattements.html" style="color:#fff">Le démembrement →</a></h3>
            <p style="color:#b9cbd7">
              Donner la nue-propriété à 60 ans ne transmet fiscalement que 60 % de la
              valeur du bien, tout en conservant l'usage et les revenus.
            </p>
          </div>
        </div>
      </div>
    </section>`,
  },

  {
    slug: 'simulateur',
    titre: 'Simulateur de droits de succession',
    description: "Calculez gratuitement les droits de succession : abattements par héritier, barème du lien de parenté, résidence principale, assurance-vie avant et après 70 ans. Barèmes 2026.",
    script: true,
    contenu: `
    <section class="section" style="padding-bottom:34px">
      <div class="bloc">
        <p class="surtitre">Simulateur · Barèmes 2026</p>
        <h1>Combien vos héritiers paieront-ils ?</h1>
        <p class="chapo">
          Tout se calcule dans votre navigateur. Aucune donnée n'est transmise ni conservée.
        </p>
      </div>
    </section>
    <section style="padding-bottom:84px">
      <div class="bloc">
        <div id="simulateur"></div>
      </div>
    </section>`,
  },

  {
    slug: 'abattements',
    titre: 'Abattements et barèmes des droits de succession',
    description: "Tous les abattements et tarifs des droits de succession : 100 000 € en ligne directe, 15 932 € entre frères et sœurs, barème de 5 à 45 %, 55 % et 60 % hors famille proche.",
    contenu: `
    <section class="section">
      <div class="bloc texte">
        <p class="surtitre">Le cadre légal</p>
        <h1>Abattements et barèmes</h1>
        <p class="chapo">
          Les droits de succession se calculent en deux temps : on retire d'abord un
          abattement personnel de la part de chaque héritier, puis on applique au reste
          un barème qui dépend du lien de parenté. Deux héritiers recevant la même somme
          peuvent payer du simple au trentuple.
        </p>
      </div>

      <div class="bloc" style="margin-top:44px">
        <h2>Les abattements, héritier par héritier</h2>
        <p class="texte">
          L'abattement s'applique à la part de chacun, et non à la succession dans son
          ensemble. Quatre enfants se partageant 400 000 € ne paient rien du tout : chacun
          reçoit 100 000 €, exactement couverts par son abattement.
        </p>
        <div class="carte" style="margin-top:22px;padding:8px 18px">
          <table class="donnees">
            <thead><tr><th>Lien avec le défunt</th><th class="num">Abattement</th><th>Référence</th></tr></thead>
            <tbody>
              <tr><td>Conjoint ou partenaire de PACS</td><td class="num">exonération totale</td><td>art. 796-0 bis</td></tr>
              <tr><td>Enfant, parent, grand-parent</td><td class="num">100 000 €</td><td>art. 779, I</td></tr>
              <tr><td>Personne handicapée <em>(cumulable)</em></td><td class="num">159 325 €</td><td>art. 779, II</td></tr>
              <tr><td>Frère ou sœur</td><td class="num">15 932 €</td><td>art. 779, IV</td></tr>
              <tr><td>Neveu ou nièce</td><td class="num">7 967 €</td><td>art. 779, V</td></tr>
              <tr><td>Petit-enfant, et à défaut toute autre personne</td><td class="num">1 594 €</td><td>art. 788, IV</td></tr>
            </tbody>
          </table>
        </div>
        <div class="note" style="margin-top:20px;max-width:var(--max-texte)">
          <strong>Le piège du petit-enfant.</strong> L'abattement de 31 865 € que l'on cite
          partout ne vaut que pour les <em>donations</em>. Dans une succession, un petit-enfant
          n'a droit qu'à 1 594 €, sauf s'il vient en représentation de son parent prédécédé :
          il prend alors la place de ce parent et partage ses 100 000 € avec ses frères et sœurs.
        </div>
      </div>

      <div class="bloc" style="margin-top:52px">
        <h2>Le barème en ligne directe</h2>
        <p class="texte">
          Il s'applique aux enfants, aux parents et aux grands-parents, par tranches
          successives — comme l'impôt sur le revenu. Ces seuils n'ont pas été revalorisés
          depuis 2011.
        </p>
        <div class="carte" style="margin-top:22px;padding:8px 18px;max-width:var(--max-texte)">
          <table class="donnees">
            <thead><tr><th>Part taxable après abattement</th><th class="num">Taux</th></tr></thead>
            <tbody>
              <tr><td>Jusqu'à 8 072 €</td><td class="num">5 %</td></tr>
              <tr><td>De 8 072 à 12 109 €</td><td class="num">10 %</td></tr>
              <tr><td>De 12 109 à 15 932 €</td><td class="num">15 %</td></tr>
              <tr><td>De 15 932 à 552 324 €</td><td class="num">20 %</td></tr>
              <tr><td>De 552 324 à 902 838 €</td><td class="num">30 %</td></tr>
              <tr><td>De 902 838 à 1 805 677 €</td><td class="num">40 %</td></tr>
              <tr><td>Au-delà de 1 805 677 €</td><td class="num">45 %</td></tr>
            </tbody>
          </table>
        </div>
        <p class="texte" style="margin-top:20px">
          Un enfant recevant 300 000 € retranche 100 000 € d'abattement, puis paie
          <strong>38 194 €</strong> sur les 200 000 € restants — soit 12,7 % de ce qu'il reçoit.
          La tranche à 20 % couvre l'essentiel des successions : c'est elle qu'il faut avoir en tête.
        </p>
      </div>

      <div class="bloc" style="margin-top:52px">
        <h2>Hors ligne directe, la marche est haute</h2>
        <div class="carte" style="margin-top:22px;padding:8px 18px;max-width:var(--max-texte)">
          <table class="donnees">
            <thead><tr><th>Lien</th><th class="num">Taux</th></tr></thead>
            <tbody>
              <tr><td>Frère ou sœur, jusqu'à 24 430 €</td><td class="num">35 %</td></tr>
              <tr><td>Frère ou sœur, au-delà</td><td class="num">45 %</td></tr>
              <tr><td>Neveu, nièce, et parent jusqu'au 4<sup>e</sup> degré</td><td class="num">55 %</td></tr>
              <tr><td>Au-delà du 4<sup>e</sup> degré, concubin, ami, tiers</td><td class="num">60 %</td></tr>
            </tbody>
          </table>
        </div>
        <div class="note note--alerte" style="margin-top:20px;max-width:var(--max-texte)">
          <strong>60 %, dès le premier euro ou presque.</strong> Un concubin qui hérite de
          200 000 € en reverse 119 044 € à l'État. Il n'existe aucun abattement
          pour rattraper cela après le décès : seuls l'assurance-vie et le mariage ou
          le PACS y changent quelque chose, et ils se décident de son vivant.
        </div>
      </div>

      <div class="bloc" style="margin-top:52px">
        <h2>L'abattement de 20 % sur la résidence principale</h2>
        <p class="texte">
          La résidence principale du défunt est retenue pour 80 % de sa valeur, à deux
          conditions cumulatives : elle était bien sa résidence principale au jour du décès,
          <em>et</em> elle était occupée à cette date par son conjoint, son partenaire de
          PACS, ou un enfant mineur ou majeur protégé. Un défunt qui vivait seul n'y donne
          pas droit — c'est la condition que l'on oublie le plus souvent.
        </p>
      </div>

      <div class="bloc" style="margin-top:52px">
        <h2>Le barème de l'usufruit</h2>
        <p class="texte">
          Il sert dès qu'un bien est démembré : la valeur transmise en nue-propriété est
          d'autant plus faible que l'usufruitier est jeune. Donner la nue-propriété à 62 ans
          ne transmet fiscalement que 60 % de la valeur du bien.
        </p>
        <div class="carte" style="margin-top:22px;padding:8px 18px;max-width:var(--max-texte)">
          <table class="donnees">
            <thead><tr><th>Âge de l'usufruitier</th><th class="num">Usufruit</th><th class="num">Nue-propriété</th></tr></thead>
            <tbody>
              <tr><td>Moins de 21 ans</td><td class="num">90 %</td><td class="num">10 %</td></tr>
              <tr><td>De 21 à 30 ans</td><td class="num">80 %</td><td class="num">20 %</td></tr>
              <tr><td>De 31 à 40 ans</td><td class="num">70 %</td><td class="num">30 %</td></tr>
              <tr><td>De 41 à 50 ans</td><td class="num">60 %</td><td class="num">40 %</td></tr>
              <tr><td>De 51 à 60 ans</td><td class="num">50 %</td><td class="num">50 %</td></tr>
              <tr><td>De 61 à 70 ans</td><td class="num">40 %</td><td class="num">60 %</td></tr>
              <tr><td>De 71 à 80 ans</td><td class="num">30 %</td><td class="num">70 %</td></tr>
              <tr><td>De 81 à 90 ans</td><td class="num">20 %</td><td class="num">80 %</td></tr>
              <tr><td>91 ans et plus</td><td class="num">10 %</td><td class="num">90 %</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bloc" style="margin-top:46px">
        <a class="btn btn--plein" href="/simulateur.html">Appliquer ces barèmes à votre situation →</a>
      </div>
    </section>`,
  },
]
