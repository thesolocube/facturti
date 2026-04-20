import React from 'react';
import { fmtMoney } from '../../utils/formatters';

const MonthlyChart = ({ factures }) => {
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  const monthly = Array(12).fill(0);
  factures.forEach(f => {
    const m = new Date(f.date_creation).getMonth();
    monthly[m] += f.total_ttc;
  });
  const maxM = Math.max(...monthly, 1);
  const total = factures.reduce((s, f) => s + f.total_ttc, 0);
  const encaisse = factures.filter(f => f.statut === 'paid').reduce((s, f) => s + f.total_ttc, 0);
  const moyenne = factures.length ? Math.round(total / factures.length) : 0;

  return (
    <div className="card">
      <div className="flex-between mb-16">
        <h3 style={{ fontSize: 15 }}>CA Mensuel</h3>
        <span className="text-sm">{new Date().getFullYear()}</span>
      </div>
      <div className="chart-bar">
        {months.map((m, i) => (
          <div className="chart-col" key={m}>
            <div className="bar-val" style={{ fontSize: 9 }}>
              {monthly[i] > 0 ? Math.round(monthly[i] / 1000) + 'k' : ''}
            </div>
            <div className="bar" style={{ height: `${(monthly[i] / maxM) * 100}px`, background: monthly[i] === maxM ? 'var(--accent)' : '#94a3b8' }} />
            <div className="bar-label">{m}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <div className="text-sm">Moyenne/facture</div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{fmtMoney(moyenne)}</div>
        </div>
        <div>
          <div className="text-sm">Taux recouvrement</div>
          <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--success)' }}>
            {total ? Math.round(encaisse / total * 100) : 0}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyChart;
