import { useMemo, useState } from 'react'
import { calcule, LIENS, MILLESIME, type Actif, type Heritier, type Lien } from './moteur/succession'
import './styles/simulateur.css'

const eur = (n: number) => Math.round(n).toLocaleString('fr-FR') + ' €'
const pct = (n: number) => (n * 100).toFixed(1).replace('.', ',') + ' %'

let compteur = 0
const nouvelHeritier = (lien: Lien, nom: string, partPct: number): Heritier =>
  ({ id: `h${++compteur}`, nom, lien, partPct })

const ACTIF_INITIAL: Actif = {
  immobilier: 0,
  residencePrincipale: 320_000,
  residenceOccupee: false,
  financierEtAutres: 180_000,
  passif: 0,
}

function Montant({ label, valeur, onChange, aide, unite = '€' }: {
  label: string
  valeur: number
  onChange: (v: number) => void
  aide?: string
  unite?: string
}) {
  return (
    <div className="champ">
      <label>{label}</label>
      <div className="champ-ligne">
        <input
          type="text" inputMode="decimal" className="num"
          value={valeur === 0 ? '' : valeur.toLocaleString('fr-FR')}
          placeholder="0"
          onChange={e => {
            // Saisie à la française : espaces et virgule acceptées. Un champ
            // type="number" rend une valeur vide dès qu'il juge la saisie
            // invalide, et le montant disparaît sans prévenir.
            const brut = e.target.value.replace(/[\s  ]/g, '').replace(',', '.')
            const v = brut === '' ? 0 : Number(brut)
            if (!Number.isNaN(v)) onChange(v)
          }} />
        <span className="unite">{unite}</span>
      </div>
      {aide && <div className="aide">{aide}</div>}
    </div>
  )
}

export default function Simulateur() {
  const [actif, setActif] = useState<Actif>(ACTIF_INITIAL)
  const [heritiers, setHeritiers] = useState<Heritier[]>(() => [
    nouvelHeritier('enfant', 'Premier enfant', 50),
    nouvelHeritier('enfant', 'Second enfant', 50),
  ])

  const majActif = <K extends keyof Actif>(k: K, v: Actif[K]) => setActif(a => ({ ...a, [k]: v }))
  const majHeritier = (id: string, patch: Partial<Heritier>) =>
    setHeritiers(hs => hs.map(h => (h.id === id ? { ...h, ...patch } : h)))

  function ajouter() {
    setHeritiers(hs => {
      const suivant = [...hs, nouvelHeritier('enfant', `Héritier ${hs.length + 1}`, 0)]
      // Répartition égale par défaut : c'est le cas le plus fréquent, et une
      // somme à 100 % évite de démarrer sur un avertissement.
      const part = Math.round((100 / suivant.length) * 10) / 10
      return suivant.map((h, i) =>
        ({ ...h, partPct: i === suivant.length - 1 ? +(100 - part * (suivant.length - 1)).toFixed(1) : part }))
    })
  }

  function retirer(id: string) {
    setHeritiers(hs => (hs.length <= 1 ? hs : hs.filter(h => h.id !== id)))
  }

  const r = useMemo(() => calcule(actif, heritiers), [actif, heritiers])
  const transmis = r.totalNetPercu + r.totalDu
  const partDroits = transmis > 0 ? r.totalDu / transmis : 0

  return (
    <div className="sim">
      <div>
        <div className="sim-panneau" style={{ marginBottom: 22 }}>
          <h3>1 · Ce que laisse le défunt</h3>
          <Montant label="Résidence principale" valeur={actif.residencePrincipale}
            onChange={v => majActif('residencePrincipale', v)}
            aide="Valeur vénale au jour du décès, avant tout abattement." />
          <div className="champ">
            <label className="case">
              <input type="checkbox" checked={actif.residenceOccupee}
                onChange={e => majActif('residenceOccupee', e.target.checked)} />
              <span>
                Elle est occupée au jour du décès par le conjoint, le partenaire de PACS,
                ou un enfant mineur ou majeur protégé
                <span className="aide">
                  Condition de l'abattement de 20 % (CGI art. 764 bis). Un défunt qui vivait
                  seul n'y donne pas droit.
                </span>
              </span>
            </label>
          </div>
          <Montant label="Autres biens immobiliers" valeur={actif.immobilier}
            onChange={v => majActif('immobilier', v)} />
          <Montant label="Comptes, placements, véhicules, mobilier" valeur={actif.financierEtAutres}
            onChange={v => majActif('financierEtAutres', v)}
            aide="Hors assurance-vie, qui se saisit héritier par héritier plus bas." />
          <Montant label="Dettes du défunt" valeur={actif.passif}
            onChange={v => majActif('passif', v)}
            aide="Capital restant dû des emprunts, impôts et factures en cours." />
          <details className="avance">
            <summary>Frais funéraires</summary>
            <div>
              <Montant label="Frais réellement engagés" valeur={actif.fraisFuneraires ?? 0}
                onChange={v => majActif('fraisFuneraires', v)}
                aide="Laissé à 0, le forfait de 1 500 € déductible sans justificatif s'applique." />
            </div>
          </details>
        </div>

        <div className="sim-panneau">
          <div className="champ-ligne" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ margin: 0 }}>2 · Qui hérite</h3>
            <button className="btn btn--fant btn--sm" onClick={ajouter}>+ Ajouter</button>
          </div>

          {heritiers.map(h => {
            const lien = LIENS.find(l => l.id === h.lien)!
            return (
              <div className="heritier" key={h.id}>
                <div className="heritier-tete">
                  <input type="text" value={h.nom} aria-label="Nom"
                    onChange={e => majHeritier(h.id, { nom: e.target.value })} />
                  {heritiers.length > 1 && (
                    <button className="supprimer" onClick={() => retirer(h.id)}
                      aria-label={`Retirer ${h.nom}`} title="Retirer">×</button>
                  )}
                </div>
                <div className="heritier-grille">
                  <div className="champ" style={{ marginBottom: 0 }}>
                    <label>Lien avec le défunt</label>
                    <select value={h.lien} onChange={e => majHeritier(h.id, { lien: e.target.value as Lien })}>
                      {LIENS.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
                    </select>
                  </div>
                  <div className="champ" style={{ marginBottom: 0 }}>
                    <label>Part de la succession</label>
                    <div className="champ-ligne">
                      <input type="text" inputMode="decimal" className="num" value={h.partPct}
                        onChange={e => {
                          const v = Number(e.target.value.replace(',', '.'))
                          if (!Number.isNaN(v)) majHeritier(h.id, { partPct: v })
                        }} />
                      <span className="unite">%</span>
                    </div>
                  </div>
                </div>
                <div className="aide" style={{ marginTop: 8 }}>{lien.aide}</div>

                <details className="avance">
                  <summary>Assurance-vie, donations, handicap</summary>
                  <div className="heritier-grille">
                    <Montant label="Assurance-vie, primes avant 70 ans" valeur={h.avAvant70 ?? 0}
                      onChange={v => majHeritier(h.id, { avAvant70: v })} />
                    <Montant label="Primes versées après 70 ans" valeur={h.avPrimesApres70 ?? 0}
                      onChange={v => majHeritier(h.id, { avPrimesApres70: v })} />
                    <Montant label="Donations reçues depuis moins de 15 ans" valeur={h.donationsAnterieures ?? 0}
                      onChange={v => majHeritier(h.id, { donationsAnterieures: v })} />
                  </div>
                  <label className="case" style={{ marginTop: 12 }}>
                    <input type="checkbox" checked={!!h.handicap}
                      onChange={e => majHeritier(h.id, { handicap: e.target.checked })} />
                    <span>Situation de handicap — abattement de 159 325 € cumulable</span>
                  </label>
                  {h.lien === 'petit-enfant' && (
                    <label className="case" style={{ marginTop: 9 }}>
                      <input type="checkbox" checked={!!h.representation}
                        onChange={e => majHeritier(h.id, {
                          representation: e.target.checked,
                          nbRepresentants: e.target.checked ? (h.nbRepresentants ?? 1) : undefined,
                        })} />
                      <span>Vient en représentation d'un parent prédécédé</span>
                    </label>
                  )}
                </details>
              </div>
            )
          })}
        </div>
      </div>

      <div className="sim-panneau sim-resultat">
        <h3>Ce qu'il y aura à payer</h3>
        <div className="total">
          <div className={`chiffre ${r.totalDu > 0 ? 'chiffre--rouge' : ''}`}>{eur(r.totalDu)}</div>
          <div className="total-note">
            de droits, soit {pct(partDroits)} de ce qui est transmis
          </div>
        </div>

        <div className="barre" role="img"
          aria-label={`${pct(1 - partDroits)} pour les héritiers, ${pct(partDroits)} de droits`}>
          <span style={{ width: `${(1 - partDroits) * 100}%`, background: 'var(--vert)' }} />
          <span style={{ width: `${partDroits * 100}%`, background: 'var(--rouge)' }} />
        </div>
        <div className="legende">
          <span><i style={{ background: 'var(--vert)' }} />Aux héritiers {eur(r.totalNetPercu)}</span>
          <span><i style={{ background: 'var(--rouge)' }} />Droits {eur(r.totalDu)}</span>
        </div>

        <table className="donnees" style={{ marginTop: 24 }}>
          <tbody>
            <tr><td>Actif brut</td><td className="num">{eur(r.actifBrut)}</td></tr>
            {r.abattementResidence > 0 && (
              <tr><td>Abattement résidence principale (20 %)</td>
                <td className="num">− {eur(r.abattementResidence)}</td></tr>
            )}
            <tr><td>Passif et frais funéraires</td><td className="num">− {eur(r.passifDeduit)}</td></tr>
            <tr><td><strong>Actif net successoral</strong></td>
              <td className="num"><strong>{eur(r.actifNet)}</strong></td></tr>
          </tbody>
        </table>

        <div className="lignes">
          {r.lignes.map(l => (
            <div className="ligne-h" key={l.heritier.id}>
              <div className="ligne-h-tete">
                <div>
                  <div className="ligne-h-nom">{l.heritier.nom}</div>
                  <div className="ligne-h-lien">{LIENS.find(x => x.id === l.heritier.lien)!.label}</div>
                </div>
                {l.exonere
                  ? <span className="etiquette">Exonéré</span>
                  : <div className={`ligne-h-droits ${l.totalDu === 0 ? 'nul' : ''}`}>{eur(l.totalDu)}</div>}
              </div>
              <div className="ligne-h-detail">
                Reçoit {eur(l.partSuccessorale + (l.heritier.avAvant70 ?? 0) + (l.heritier.avPrimesApres70 ?? 0))}
                {!l.exonere && l.partTaxable > 0 && <> · part taxable {eur(l.partTaxable)} · taux moyen {pct(l.tauxMoyen)}</>}
                {' '}· net perçu <strong>{eur(l.netPercu)}</strong>
              </div>
              {l.notes.length > 0 && (
                <ul className="ligne-h-notes">
                  {l.notes.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>

        {r.avertissements.map((a, i) => (
          <div className="note note--alerte" style={{ marginTop: 18 }} key={i}>{a}</div>
        ))}

        <p className="aide" style={{ marginTop: 22 }}>
          Barèmes et abattements {MILLESIME}, relevés sur Légifrance et le BOFiP.
          Cette estimation ne remplace pas la liquidation d'un notaire : elle ignore
          le régime matrimonial, les donations entre époux, les testaments et les
          exonérations propres à certains biens.
        </p>
      </div>
    </div>
  )
}
