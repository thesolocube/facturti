import React, { useState } from 'react';

const ArticleModal = ({ artModal, categories, onSave, onClose }) => {
  const [form, setForm] = useState(artModal);

  const f = (k, v) => setForm({ ...form, [k]: v });

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ maxWidth: 460 }}>
        <h2 className="modal-title">{form.id ? 'Modifier article' : 'Nouvel article'}</h2>
        <div className="form-grid">
          <div className="form-group form-full">
            <label className="form-label">Désignation *</label>
            <input className="form-control" value={form.designation || ''} onChange={(e) => f('designation', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Prix unitaire *</label>
            <input type="number" min="0" className="form-control" value={form.prix_unitaire || 0} onChange={(e) => f('prix_unitaire', Number(e.target.value || 0))} />
          </div>
          <div className="form-group">
            <label className="form-label">Catégorie *</label>
            <select className="form-control" value={form.categorie_id || ''} onChange={(e) => f('categorie_id', e.target.value)}>
              <option value="">— Sélectionner —</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nom}</option>
              ))}
            </select>
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

export default ArticleModal;
