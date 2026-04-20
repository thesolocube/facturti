import React from 'react';

const StatCard = ({ label, value, sub, color = 'blue', badge }) => (
  <div className={`stat-card ${color}`}>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-sub">
      {badge ? <span className={`${badge} stat-badge`}>{sub}</span> : sub}
    </div>
  </div>
);

export default StatCard;
