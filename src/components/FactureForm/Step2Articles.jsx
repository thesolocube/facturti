import React from 'react';
import { fmtMoney } from '../../utils/formatters';

const Step2Articles = ({ articles, categories, lines, methode, remise_globale, totals, errors, onAddLine, onRemoveLine, onSetLine, onPickArticle, onBack, onNext }) => (
  <div className="card">
    <div className="flex-between mb-16"><h3 style={{ fontSize: 15 }}>Articles de la facture</h3><button className="btn btn-secondary btn-sm" onClick={onAddLine}>＋ Ajouter ligne</button></div>
    {errors.lines && <div style={{ color: 'var(--danger)', fontSize: 12, marginBottom: 10 }}>{errors.lines}</div>}
    <div style={{ overflowX: 'auto', marginBottom: 16 }}>
      <table>
        <thead>
          <tr>
            <th>Article</th>
            <th>Quantité</th>
            <th>Prix</th>
            {methode === 'remise_ligne' && <th>Remise %</th>}
            {methode === 'categorie' && <th>Catégorie TVA</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line, i) => (
            <tr key={i}>
              <td>
                <select
                  className="form-control"
                  value={line.article_id || ''}
                  onChange={e => onPickArticle(i, e.target.value)}
                >
                  <option value="">— Sélectionner un article —</option>
                  {articles.map(a => (
                    <option key={a.id} value={a.id}>{a.designation}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  value={line.qte}
                  onChange={e => onSetLine(i, 'qte', parseInt(e.target.value || '1', 10))}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  value={line.prix}
                  onChange={e => onSetLine(i, 'prix', parseFloat(e.target.value || '0'))}
                />
              </td>
              {methode === 'remise_ligne' && (
                <td>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="form-control"
                    value={line.remise || 0}
                    onChange={e => onSetLine(i, 'remise', parseFloat(e.target.value || '0'))}
                  />
                </td>
              )}
              {methode === 'categorie' && (
                <td>
                  <select
                    className="form-control"
                    value={line.categorie_id || 1}
                    onChange={e => onSetLine(i, 'categorie_id', parseInt(e.target.value, 10))}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nom} ({cat.tva}%)</option>
                    ))}
                  </select>
                </td>
              )}
              <td>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onRemoveLine(i)}
                  disabled={lines.length === 1}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="invoice-total-box">
      <div className="total-row"><span>Total HT</span><span>{fmtMoney(totals.total_ht)}</span></div>
      <div className="total-row"><span>TVA</span><span>{fmtMoney(totals.tva)}</span></div>
      <div className="total-row grand"><span>Total TTC</span><span style={{ color: 'var(--accent)' }}>{fmtMoney(totals.total_ttc)}</span></div>
    </div>
    <div className="modal-footer">
      <button className="btn btn-secondary" onClick={onBack}>← Retour</button>
      <button className="btn btn-primary" onClick={onNext}>Suivant →</button>
    </div>
  </div>
);

export default Step2Articles;
