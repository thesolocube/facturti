import React, { useState } from 'react';
import StatusBadge from '../UI/StatusBadge';
import { fmtDate, fmtMoney } from '../../utils/formatters';
import { generatePDF } from '../../utils/pdfGenerator';
import FactureViewModal from './FactureViewModal';
import FactureEditModal from './FactureEditModal';

const FactureList = ({ data, role, notify, update, setPage }) => {
  const { factures, clients } = data;
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const clientMap = {};
  clients.forEach(c => clientMap[c.id] = c);
  const filtered = factures.filter(f => {
    if (filter !== 'all' && f.statut !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      const c = clientMap[f.client_id];
      return f.numero.toLowerCase().includes(q) || (c && c.nom.toLowerCase().includes(q));
    }
    return true;
  });
  const del = (id) => {
    if (!confirm('Supprimer cette facture ?')) return;
    update('factures', factures.filter(f => f.id !== id));
    notify('Facture supprimée', 'error');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Factures <span>{factures.length} au total</span></h1>
        <div className="flex" style={{ gap: 8 }}>
          <div className="search-box"><span>🔍</span><input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} /></div>
          <button className="btn btn-primary" onClick={() => setPage('new-facture')}>＋ Nouvelle</button>
        </div>
      </div>
      <div className="flex mb-16" style={{ gap: 6 }}>
        {[['all', 'Toutes'], ['paid', 'Payées'], ['pending', 'En attente'], ['rejected', 'Rejetées']].map(([v, l]) => (
          <button key={v} className={`btn btn-sm ${filter === v ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter(v)}>{l}</button>
        ))}
      </div>
      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>N° Facture</th><th>Client</th><th>Date</th><th>Méthode</th><th>Total TTC</th><th>Statut</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(f => {
                const c = clientMap[f.client_id];
                return (
                  <tr key={f.id}>
                    <td><strong style={{ fontSize: 13 }}>{f.numero}</strong></td>
                    <td><div style={{ fontWeight: 500 }}>{c?.nom || '—'}</div></td>
                    <td>{fmtDate(f.date_creation)}</td>
                    <td><span className="tag">{f.methode || 'simple'}</span></td>
                    <td><strong>{fmtMoney(f.total_ttc)}</strong></td>
                    <td><StatusBadge s={f.statut} /></td>
                    <td><div className="td-actions">
                      <button className="btn-icon" title="Voir" onClick={() => setViewing(f)}>👁</button>
                      <button className="btn-icon" title="PDF" onClick={() => generatePDF(f, c, data.params)}>📄</button>
                      {role === 'admin' && <button className="btn-icon" title="Supprimer" onClick={() => del(f.id)} style={{ color: 'var(--danger)' }}>🗑</button>}
                      <button className="btn-icon" title="Modifier" onClick={() => setEditing(f)}>✏️</button>
                    </div></td>
                  </tr>
                );
              })}
              {!filtered.length && <tr><td colSpan={7} className="empty"><div className="empty-icon">📄</div>Aucune facture</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      {viewing && <FactureViewModal f={viewing} data={data} onClose={() => setViewing(null)} />}
      {editing && <FactureEditModal f={editing} onClose={() => setEditing(null)} notify={notify} />}
    </div>
  );
};

export default FactureList;
