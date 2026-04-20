import React from 'react';

const Step1Client = ({ clients, client_id, setClientId, methode, setMethode, remise_globale, setRemiseGlobale, errors, onNext, onCancel }) => (
  <div className="card">
    <h3 style={{ fontSize: 15, marginBottom: 16 }}>Informations client</h3>
    <div className="form-grid">
      <div className="form-group form-full">
        <label className="form-label">Client *</label>
        <select className="form-control" value={client_id} onChange={e => setClientId(e.target.value)}>
          <option value="">— Sélectionner un client —</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
        </select>
        {errors.client_id && <span style={{ color: 'var(--danger)', fontSize: 11 }}>{errors.client_id}</span>}
      </div>
      <div className="form-group">
        <label className="form-label">Méthode de calcul</label>
        <select className="form-control" value={methode} onChange={e => setMethode(e.target.value)}>
          <option value="simple">Simple (TVA 20%)</option>
          <option value="remise_ligne">Remise par ligne</option>
          <option value="remise_globale">Remise globale</option>
          <option value="categorie">TVA par catégorie</option>
        </select>
      </div>
      {methode === 'remise_globale' && (
        <div className="form-group">
          <label className="form-label">Remise globale (%)</label>
          <input type="number" min="0" max="100" className="form-control" value={remise_globale} onChange={e => setRemiseGlobale(e.target.value)} />
        </div>
      )}
    </div>
    <div className="modal-footer">
      <button className="btn btn-secondary" onClick={onCancel}>Annuler</button>
      <button className="btn btn-primary" onClick={onNext}>Suivant →</button>
    </div>
  </div>
);

export default Step1Client;
