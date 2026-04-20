import React from 'react';

const CategoryModal = ({ catModal, onSave, onClose }) => (
  <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="modal" style={{ maxWidth: 400 }}>
      <h2 className="modal-title">{catModal.id ? 'Modifier catégorie' : 'Nouvelle catégorie'}</h2>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>Annuler</button>
        <button className="btn btn-primary" onClick={() => onSave(catModal, true)}>Enregistrer</button>
      </div>
    </div>
  </div>
);

export default CategoryModal;
