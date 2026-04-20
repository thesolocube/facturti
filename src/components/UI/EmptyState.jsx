import React from 'react';

const EmptyState = ({ icon = '📄', message = 'Aucune donnée' }) => (
  <div className="empty">
    <div className="empty-icon">{icon}</div>
    {message}
  </div>
);

export default EmptyState;
