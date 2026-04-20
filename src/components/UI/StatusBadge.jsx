import React from 'react';

const StatusBadge = ({ s }) => {
  const map = {
    paid: ['status-paid', 'Payée'],
    pending: ['status-pending', 'En attente'],
    rejected: ['status-rejected', 'Rejetée']
  };
  const [cls, label] = map[s] || ['status-pending', '—'];

  return <span className={`status ${cls}`}>{label}</span>;
};

export default StatusBadge;
