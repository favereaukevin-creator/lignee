export const pages2 = [
  {
    slug: 'assurance-vie',
    titre: "Assurance-vie et succession : les deux régimes",
    description: "152 500 € par bénéficiaire pour les primes versées avant 70 ans, 30 500 € globaux après. Comprendre l'article 990 I, l'article 757 B et ce qui échappe aux droits de succession.",
    contenu: `
    <section class="section">
      <div class="bloc texte">
        <p class="surtitre">Hors succession</p>
        <h1>L'assurance-vie au décès</h1>
        <p class="chapo">
          L'assurance-vie ne fait pas partie de la succession. Elle obéit à ses propres
          règles, et la date des versements — avant ou après le 70<sup>e</sup> anniversaire
          du souscripteur — change tout. C'est le seul outil qui permette de transmettre
          une somme importante à quelqu'un qui n'est pas de la famille sans lui laisser 60 %
          à payer.
        </p>
      </div>

      <div class="bloc" style="margin-top:44px">
        <h2>Primes versées avant 70 ans</h2>
        <p class="texte">
          C'est le régime de l'article 990 I du CGI. Chaque bénéficiaire dispose d'un
          abattement de <strong>152 500 €</strong>, qui lui est propre : trois bénéficiaires,
          c'est 457 500 € transmis sans le moindre prélèvement. Au-delà, le prélèvement est
          de 20 %, puis de 31,25 % sur la fraction taxable qui dépasse 700 000 €.
        </p>
        <div class="carte" style="margin-top:22px;padding:8px 18px;max-width:var(--max-texte)">
          <table class="donnees">
            <thead><tr><th>Fraction taxable, après les 152 500 €</th><th class="num">Prélèvement</th></tr></thead>
            <tbody>
              <tr><td>Jusqu'à 700 000 €</td><td class="num">20 %</td></tr>
              <tr><td>Au-delà de 700 000 €</td><td class="num">31,25 %</td></tr>
            </tbody>
          </table>
        </div>
        <p class="texte" style="margin-top:20px">
          L'abattement vaut <em>par bénéficiaire et par assuré</em>, tous contrats confondus.
          Trois contrats désignant la même personne ne donnent qu'un seul abattement :
          les capitaux s'additionnent avant le calcul.
        </p>
        <div class="note" style="max-width:var(--max-texte)">
          <strong>Le conjoint et le partenaire de PACS ne paient rien</strong>, quel que soit
          le montant et quelle que soit la date des versements. Les frères et sœurs exonérés
          de droits de succession le sont aussi de ce prélèvement.
        </div>
      </div>

      <div class="bloc" style="margin-top:52px">
        <h2>Primes versées après 70 ans</h2>
        <p class="texte">
          Le régime bascule à l'article 757 B, et il est nettement moins favorable. L'abattement
          tombe à <strong>30 500 €</strong>, et surtout il devient <em>global</em> : un seul pour
          l'ensemble des bénéficiaires et l'ensemble des contrats, réparti entre eux au prorata
          de leur part. Le surplus est soumis aux droits de succession ordinaires, au barème du
          lien de parenté.
        </p>
        <p class="texte">
          Une consolation, souvent ignorée : seules les <strong>primes</strong> sont taxées,
          jamais les intérêts qu'elles ont produits. Un contrat alimenté de 100 000 € après
          70 ans et valant 160 000 € au décès ne sera taxé que sur 100 000 €, moins la
          quote-part d'abattement. Les 60 000 € de gains échappent entièrement à l'impôt.
        </p>
        <div class="note note--alerte" style="max-width:var(--max-texte)">
          <strong>Ce régime ne vise que les contrats souscrits depuis le 20 novembre 1991.</strong>
          Les contrats antérieurs restent sous le régime des primes avant 70 ans, quelle que
          soit la date des versements. Vérifiez la date d'ouverture avant de conclure.
        </div>
      </div>

      <div class="bloc" style="margin-top:52px">
        <h2>Ce que cela change, en chiffres</h2>
        <p class="texte">
          Un parent laisse 300 000 € à son enfant unique. Selon le chemin emprunté, la note
          n'a rien à voir.
        </p>
        <div class="carte" style="margin-top:22px;padding:8px 18px">
          <table class="donnees">
            <thead><tr><th>Voie de transmission</th><th class="num">Droits</th><th class="num">Net perçu</th></tr></thead>
            <tbody>
              <tr><td>Succession classique</td><td class="num">38 194 €</td><td class="num">261 806 €</td></tr>
              <tr><td>Assurance-vie, primes avant 70 ans</td><td class="num">29 500 €</td><td class="num">270 500 €</td></tr>
              <tr><td>Assurance-vie, primes après 70 ans <em>(300 000 € de primes)</em></td><td class="num">32 094 €</td><td class="num">267 906 €</td></tr>
            </tbody>
          </table>
        </div>
        <p class="texte" style="margin-top:18px">
          L'écart paraît modeste pour un enfant, parce que son abattement de 100 000 € fait
          déjà l'essentiel du travail. Refaites le calcul pour un neveu ou un concubin :
          c'est là que l'assurance-vie devient décisive.
        </p>
        <div style="margin-top:26px"><a class="btn btn--plein" href="/simulateur.html">Comparer sur votre situation →</a></div>
      </div>
    </section>`,
  },

  {
    slug: 'donation',
    titre: 'Donner de son vivant : abattements et rappel des 15 ans',
    description: "100 000 € par enfant tous les 15 ans, 31 865 € par petit-enfant, don familial de sommes d'argent, donation en nue-propriété : les leviers pour transmettre avant le décès.",
    contenu: `
    <section class="section">
      <div class="bloc texte">
        <p class="surtitre">Anticiper</p>
        <h1>Donner de son vivant</h1>
        <p class="chapo">
          C'est le levier le plus puissant, et le seul qui se recharge avec le temps.
          L'abattement de 100 000 € par enfant se reconstitue intégralement tous les quinze
          ans : donner tôt, c'est en utiliser deux ou trois au lieu d'un.
        </p>
      </div>

      <div class="bloc" style="margin-top:44px">
        <h2>Les abattements en donation</h2>
        <p class="texte">
          Ils ne sont pas les mêmes qu'en succession, et c'est la source de confusion la plus
          fréquente : un petit-enfant a droit à 31 865 € en donation, contre 1 594 € seulement
          s'il hérite.
        </p>
        <div class="carte" style="margin-top:22px;padding:8px 18px;max-width:var(--max-texte)">
          <table class="donnees">
            <thead><tr><th>Bénéficiaire</th><th class="num">Abattement, par période de 15 ans</th></tr></thead>
            <tbody>
              <tr><td>Enfant</td><td class="num">100 000 €</td></tr>
              <tr><td>Époux ou partenaire de PACS</td><td class="num">80 724 €</td></tr>
              <tr><td>Petit-enfant</td><td class="num">31 865 €</td></tr>
              <tr><td>Frère ou sœur</td><td class="num">15 932 €</td></tr>
              <tr><td>Neveu ou nièce</td><td class="num">7 967 €</td></tr>
              <tr><td>Arrière-petit-enfant</td><td class="num">5 310 €</td></tr>
            </tbody>
          </table>
        </div>
        <div class="note" style="margin-top:20px;max-width:var(--max-texte)">
          <strong>Le don familial de sommes d'argent</strong> (CGI art. 790 G) s'ajoute à ces
          abattements : 31 865 € supplémentaires, en numéraire, à condition que le donateur
          ait moins de 80 ans et le bénéficiaire plus de 18 ans. Un parent de 70 ans peut
          donc donner 131 865 € à son enfant majeur sans un euro de droits.
        </div>
      </div>

      <div class="bloc" style="margin-top:52px">
        <h2>Le rappel fiscal des quinze ans</h2>
        <p class="texte">
          Toute donation consentie dans les quinze ans précédant le décès est réintégrée au
          calcul : elle consomme l'abattement et pousse la succession dans les tranches hautes
          du barème. Passé ce délai, elle est effacée — l'abattement est intégralement
          reconstitué, et le barème repart de la première tranche.
        </p>
        <p class="texte">
          Concrètement, un parent qui donne 100 000 € à 60 ans et décède à 78 ans transmet
          200 000 € en franchise totale. S'il décède à 72 ans, le premier abattement n'est
          pas encore reconstitué et la succession est taxée dès le premier euro.
        </p>
      </div>

      <div class="bloc" style="margin-top:52px">
        <h2>Donner la nue-propriété</h2>
        <p class="texte">
          Donner un bien en conservant l'usufruit revient à ne transmettre fiscalement
          qu'une fraction de sa valeur, déterminée par l'âge du donateur. À 62 ans, la
          nue-propriété d'un appartement de 300 000 € ne vaut que 180 000 € aux yeux du fisc,
          alors que le donateur continue d'y vivre ou d'en percevoir les loyers.
        </p>
        <p class="texte">
          Au décès, l'usufruit s'éteint sans droits à payer : le nu-propriétaire devient plein
          propriétaire gratuitement. C'est le mécanisme qui explique pourquoi le démembrement
          revient dans presque toutes les stratégies de transmission.
        </p>
        <div class="note" style="max-width:var(--max-texte)">
          Le barème dépend de l'âge du donateur au jour de la donation, et il évolue par
          tranches de dix ans. Donner à 69 ans plutôt qu'à 71 fait passer la nue-propriété
          de 60 % à 70 % de la valeur : deux ans d'attente peuvent coûter dix points d'assiette.
        </div>
        <div style="margin-top:26px"><a class="btn btn--plein" href="/abattements.html">Voir le barème de l'usufruit →</a></div>
      </div>
    </section>`,
  },

  {
    slug: 'conjoint',
    titre: 'Protéger son conjoint : mariage, PACS ou concubinage',
    description: "Le conjoint marié et le partenaire de PACS sont exonérés de droits de succession. Le concubin paie 60 %. Ce que change chaque statut, et comment y remédier.",
    contenu: `
    <section class="section">
      <div class="bloc texte">
        <p class="surtitre">Le statut décide de tout</p>
        <h1>Protéger celui ou celle qui reste</h1>
        <p class="chapo">
          Sur ce point, le droit fiscal français est brutalement binaire. Le conjoint marié
          et le partenaire de PACS ne paient rien, jamais, quel que soit le montant. Le
          concubin, même après trente ans de vie commune, paie 60 %.
        </p>
      </div>

      <div class="bloc" style="margin-top:44px">
        <div class="carte" style="padding:8px 18px">
          <table class="donnees">
            <thead><tr><th>Statut au jour du décès</th><th class="num">Droits sur 400 000 €</th><th class="num">Net perçu</th></tr></thead>
            <tbody>
              <tr><td>Marié</td><td class="num">0 €</td><td class="num">400 000 €</td></tr>
              <tr><td>Partenaire de PACS</td><td class="num">0 €</td><td class="num">400 000 €</td></tr>
              <tr><td>Concubin</td><td class="num">239 044 €</td><td class="num">160 956 €</td></tr>
            </tbody>
          </table>
        </div>
        <p class="texte" style="margin-top:20px">
          Trois cent quatre-vingt mille euros d'écart, pour la même personne, la même vie
          commune et le même patrimoine. C'est la plus grosse marche de tout le système fiscal
          français, et elle se franchit en une après-midi au tribunal judiciaire ou chez le notaire.
        </p>
      </div>

      <div class="bloc" style="margin-top:52px">
        <h2>Une nuance de taille sur le PACS</h2>
        <p class="texte">
          L'exonération fiscale est totale, mais le partenaire de PACS <strong>n'est pas
          héritier</strong>. Sans testament, il ne reçoit rien du tout : le patrimoine part aux
          enfants, ou à défaut aux parents et aux frères et sœurs du défunt. L'exonération ne
          sert alors à rien, puisqu'il n'y a rien à exonérer.
        </p>
        <div class="note note--alerte" style="max-width:var(--max-texte)">
          <strong>Le PACS sans testament est un piège.</strong> Il faut les deux : le PACS pour
          l'exonération fiscale, le testament pour la qualité d'héritier. C'est l'erreur la
          plus coûteuse et la plus fréquente dans les couples pacsés.
        </div>
      </div>

      <div class="bloc" style="margin-top:52px">
        <h2>Ce qui revient au conjoint marié, sans testament</h2>
        <p class="texte">
          En présence d'enfants tous communs au couple, le conjoint choisit entre la totalité
          du patrimoine en usufruit, ou un quart en pleine propriété. L'usufruit lui assure le
          logement et les revenus jusqu'à sa mort ; le quart en pleine propriété lui donne un
          capital disponible. Si l'un des enfants n'est pas issu du couple, le choix disparaît :
          c'est un quart en pleine propriété, sans option.
        </p>
        <p class="texte">
          La <strong>donation au dernier vivant</strong> élargit ce choix, notamment en
          présence d'enfants d'un premier lit. Elle se signe chez le notaire pour quelques
          centaines d'euros, et se révoque librement.
        </p>
      </div>

      <div class="bloc" style="margin-top:52px">
        <h2>Si le mariage et le PACS sont exclus</h2>
        <p class="texte">
          Reste l'assurance-vie, et elle est décisive. Les capitaux versés à un concubin
          bénéficiaire échappent aux droits de succession : 152 500 € en franchise totale pour
          les primes versées avant 70 ans, puis 20 %. Face aux 60 % de la succession ordinaire,
          l'économie dépasse souvent cent mille euros.
        </p>
        <div style="margin-top:26px">
          <a class="btn btn--plein" href="/simulateur.html">Chiffrer votre situation →</a>
          <a class="btn btn--fant" href="/assurance-vie.html" style="margin-left:10px">L'assurance-vie →</a>
        </div>
      </div>
    </section>`,
  },
]
