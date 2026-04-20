import React from 'react';
import StatusBadge from '../UI/StatusBadge';
import { fmtDate, fmtMoney } from '../../utils/formatters';

const RecentInvoices = ({ factures, clients, onViewAll }) => {
  const recentF = [...factures].sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation)).slice(0, 5);
  const clientMap = {};
  clients.forEach(c => clientMap[c.id] = c.nom);

  return (
    <div className="card">
      <div className="flex-between mb-16">
        <h3 style={{ fontSize: 15 }}>Factures récentes</h3>
        <button className="btn btn-sm btn-secondary" onClick={onViewAll}>Voir tout →</button>
      </div>
      {recentF.map(f => (
        <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontWeight: 500, fontSize: 13 }}>{f.numero}</div>
            <div className="text-sm">{clientMap[f.client_id] || '—'} · {fmtDate(f.date_creation)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{fmtMoney(f.total_ttc)}</div>
            <StatusBadge s={f.statut} />
          </div>
        </div>
      ))}
      {!recentF.length && <div className="empty"><div className="empty-icon">📄</div>Aucune facture</div>}
    </div>
  );
};

export default RecentInvoices;
