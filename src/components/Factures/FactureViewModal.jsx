import React from 'react';
import StatusBadge from '../UI/StatusBadge';
import { fmtDate, fmtMoney } from '../../utils/formatters';
import { generatePDF } from '../../utils/pdfGenerator';

const FactureViewModal = ({ f, data, onClose }) => {
  const c = data.clients.find(x => x.id === f.client_id);
  const params = data.params;
  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ maxWidth: 640 }}>
        <div className="flex-between mb-16">
          <h2 className="modal-title" style={{ margin: 0 }}>{f.numero}</h2>
          <StatusBadge s={f.statut} />
        </div>
        <div className="grid-2 mb-16">
          <div>
            <div className="text-sm">Client</div>
            <div style={{ fontWeight: 600 }}>{c?.nom || '—'}</div>
          </div>
          <div>
            <div>Création : {fmtDate(f.date_creation)}</div>
          </div>
        </div>
        <div className="invoice-total-box">
          <div className="total-row"><span>Total HT</span><span>{fmtMoney(f.total_ht)}</span></div>
          <div className="total-row"><span>TVA</span><span>{fmtMoney(f.tva)}</span></div>
          <div className="total-row grand"><span>Total TTC</span><span style={{ color: 'var(--accent)' }}>{fmtMoney(f.total_ttc)}</span></div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Fermer</button>
          <button className="btn btn-primary" onClick={() => generatePDF(f, c, params)}>📄 Télécharger PDF</button>
        </div>
      </div>
    </div>
  );
};

export default FactureViewModal;
