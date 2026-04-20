import React, { useState } from 'react';

const ClientModal = ({ form: init, onSave, onClose }) => {
  const [form, setForm] = useState(init);
  const f = (k, v) => setForm({ ...form, [k]: v });
  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ maxWidth: 520 }}>
        <h2 className="modal-title">{form.id ? 'Modifier client' : 'Nouveau client'}</h2>
        <div className="form-grid">
          <div className="form-group form-full"><label className="form-label">Nom / Raison sociale *</label><input className="form-control" value={form.nom} onChange={e => f('nom', e.target.value)} /></div>
        </div>
        <div className="modal-footer"><button className="btn btn-secondary" onClick={onClose}>Annuler</button><button className="btn btn-primary" onClick={() => { if (form.nom) onSave(form); }}>Enregistrer</button></div>
      </div>
    </div>
  );
};

export default ClientModal;
