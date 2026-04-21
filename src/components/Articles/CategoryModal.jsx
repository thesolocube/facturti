import React, { useState } from 'react';

const CategoryModal = ({ catModal, onSave, onClose }) => {
  const [form, setForm] = useState(catModal);
  const f = (k, v) => setForm({ ...form, [k]: v });

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ maxWidth: 400 }}>
        <h2 className="modal-title">{form.id ? 'Modifier catégorie' : 'Nouvelle catégorie'}</h2>
        <div className="form-grid">
          <div className="form-group form-full">
            <label className="form-label">Nom *</label>
            <input className="form-control" value={form.nom || ''} onChange={(e) => f('nom', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">TVA (%)</label>
            <input type="number" min="0" max="100" className="form-control" value={form.tva ?? 20} onChange={(e) => f('tva', Number(e.target.value || 0))} />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Annuler</button>
          <button className="btn btn-primary" onClick={() => onSave(form)}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
