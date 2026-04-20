import React from 'react';
import { fmtMoney } from '../../utils/formatters';

const Step3Suivi = ({ clients, client_id, methode, lines, totals, meta, setMeta, onBack, onSubmit }) => {
  const client = clients.find(c => c.id === client_id);
  return (
    <div className="card">
      <h3 style={{ fontSize: 15, marginBottom: 16 }}>Informations de suivi</h3>
      <div className="grid-2">
        <div>
          <div className="text-sm">Client</div>
          <div style={{ fontWeight: 600 }}>{client?.nom || '—'}</div>
          <div className="text-sm mt-4">Méthode : {methode}</div>
          <div className="text-sm">Lignes : {lines.filter(l => l.designation).length} article(s)</div>
        </div>
        <div className="invoice-total-box">
          <div className="total-row"><span>Total HT</span><span>{fmtMoney(totals.total_ht)}</span></div>
          <div className="total-row"><span>TVA</span><span>{fmtMoney(totals.tva)}</span></div>
          <div className="total-row grand"><span>Total TTC</span><span style={{ color: 'var(--accent)' }}>{fmtMoney(totals.total_ttc)}</span></div>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onBack}>← Retour</button>
        <button className="btn btn-primary" onClick={onSubmit}>✓ Créer la facture</button>
      </div>
    </div>
  );
};

export default Step3Suivi;
