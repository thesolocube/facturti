import React from 'react';

const StepIndicator = ({ step }) => (
  <div className="flex" style={{ gap: 6 }}>
    {[1, 2, 3].map(s => (
      <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: step === s ? 'var(--accent)' : step > s ? 'var(--success)' : 'var(--border)', color: step >= s ? 'white' : 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>
          {step > s ? '✓' : s}
        </div>
        {s < 3 && <div style={{ width: 40, height: 2, background: step > s ? 'var(--success)' : 'var(--border)' }} />}
      </div>
    ))}
    <span className="text-sm" style={{ marginLeft: 8 }}>{['Client & Méthode', 'Articles', 'Suivi & Finaliser'][step - 1]}</span>
  </div>
);

export default StepIndicator;
