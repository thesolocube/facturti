import React, { useState } from 'react';
import { genId } from '../../utils/formatters';
import ClientModal from './ClientModal';
import EmptyState from '../UI/EmptyState';

const ClientList = ({ data, notify, update }) => {
  const { clients } = data;
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState('');
  const empty = { id: '', nom: '', email: '', tel: '', adresse: '' };
  const filtered = clients.filter(c => !search || c.nom.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  const save = (form) => {
    if (form.id) update('clients', clients.map(c => c.id === form.id ? form : c));
    else update('clients', [...clients, { ...form, id: genId() }]);
    notify(form.id ? 'Client mis à jour ✓' : 'Client ajouté ✓');
    setModal(null);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Clients <span>{clients.length} au total</span></h1>
        <button className="btn btn-primary" onClick={() => setModal({ ...empty })}>＋ Nouveau client</button>
      </div>
      <div className="card"><input className="form-control" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} /></div>
      {!filtered.length && <EmptyState icon="👤" message="Aucun client" />}
      {!!filtered.length && (
        <div className="card" style={{ padding: 0 }}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Adresse</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td><strong>{c.nom || '—'}</strong></td>
                    <td>{c.email || '—'}</td>
                    <td>{c.tel || '—'}</td>
                    <td>{c.adresse || '—'}</td>
                    <td>
                      <div className="td-actions">
                        <button className="btn-icon" title="Modifier" onClick={() => setModal({ ...c })}>✏️</button>
                        <button
                          className="btn-icon"
                          title="Supprimer"
                          style={{ color: 'var(--danger)' }}
                          onClick={() => {
                            if (!confirm('Supprimer ce client ?')) return;
                            update('clients', clients.filter(x => x.id !== c.id));
                            notify('Client supprimé', 'error');
                          }}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {modal && <ClientModal form={modal} onSave={save} onClose={() => setModal(null)} />}
    </div>
  );
};

export default ClientList;
