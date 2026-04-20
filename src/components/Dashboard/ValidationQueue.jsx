import React from 'react';
import { fmtDate, fmtMoney } from '../../utils/formatters';
import { useApp } from '../../context/AppContext';

const ValidationQueue = ({ factures, clients, onValidate, onReject }) => {
  const { data, update } = useApp();
  const clientMap = {};
  clients.forEach(c => clientMap[c.id] = c.nom);
  const pending = factures.filter(f => f.statut === 'pending' && !f.validated_by_admin);

  const handleValidate = (f) => {
    update('factures', data.factures.map(x => x.id === f.id ? { ...x, validated_by_admin: true } : x));
    onValidate();
  };
  const handleReject = (f) => {
    update('factures', data.factures.map(x => x.id === f.id ? { ...x, statut: 'rejected' } : x));
    onReject();
  };

  return (
    <div className="card mt-24">
      <div className="flex-between mb-16">
        <h3 style={{ fontSize: 15 }}>Validation en attente</h3>
        <span className="badge-warning stat-badge" style={{ padding: '3px 10px', borderRadius: '100px', fontSize: 12 }}>
          {pending.length} à valider
        </span>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>N° Facture</th><th>Client</th><th>Date</th><th>Montant</th><th>Action</th></tr></thead>
          <tbody>
            {pending.map(f => (
              <tr key={f.id}>
                <td><strong>{f.numero}</strong></td>
                <td>{clientMap[f.client_id] || '—'}</td>
                <td>{fmtDate(f.date_creation)}</td>
                <td><strong>{fmtMoney(f.total_ttc)}</strong></td>
                <td><div className="td-actions">
                  <button className="btn btn-sm btn-success" onClick={() => handleValidate(f)}>✓ Valider</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleReject(f)}>✕ Rejeter</button>
                </div></td>
              </tr>
            ))}
            {pending.length === 0 && <tr><td colSpan={5} className="empty">✓ Toutes les factures sont traitées</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ValidationQueue;
