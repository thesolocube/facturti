import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const FactureEditModal = ({ f, onClose, notify }) => {
  const { data, update } = useApp();
  const [form, setForm] = useState({
    statut: f.statut,
    date_depot: f.date_depot || '',
    date_encaissement: f.date_encaissement || '',
    type_virement: f.type_virement || '',
    validated_by_admin: f.validated_by_admin || false,
  });

  const save = () => {
    update('factures', data.factures.map(x => x.id === f.id ? { ...x, ...form } : x));
    notify('Facture mise à jour ✓');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ maxWidth: 480 }}>
        <h2 className="modal-title">Modifier {f.numero}</h2>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Statut</label>
            <select className="form-control" value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })}>
              <option value="pending">En attente</option>
              <option value="paid">Payée</option>
              <option value="rejected">Rejetée</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Date de dépôt</label>
            <input
              type="date"
              className="form-control"
              value={form.date_depot}
              onChange={e => setForm({ ...form, date_depot: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Date d'encaissement</label>
            <input
              type="date"
              className="form-control"
              value={form.date_encaissement}
              onChange={e => setForm({ ...form, date_encaissement: e.target.value })}
            />
          </div>
          <div className="form-group form-full">
            <label className="form-label">Type de virement</label>
            <input
              className="form-control"
              value={form.type_virement}
              onChange={e => setForm({ ...form, type_virement: e.target.value })}
              placeholder="Ex: Virement bancaire"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Annuler</button>
          <button className="btn btn-primary" onClick={save}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
};

export default FactureEditModal;
