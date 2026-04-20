import React from 'react';

const ArticleModal = ({ artModal, categories, onSave, onClose }) => (
  <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="modal" style={{ maxWidth: 460 }}>
      <h2 className="modal-title">{artModal.id ? 'Modifier article' : 'Nouvel article'}</h2>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={onClose}>Annuler</button>
        <button className="btn btn-primary" onClick={() => onSave(artModal, true)}>Enregistrer</button>
      </div>
    </div>
  </div>
);

export default ArticleModal;
