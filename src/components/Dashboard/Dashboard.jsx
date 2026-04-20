import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNotification } from '../../hooks/useNotification';
import { fmtMoney } from '../../utils/formatters';
import StatCard from './StatCard';
import MonthlyChart from './MonthlyChart';
import RecentInvoices from './RecentInvoices';
import ValidationQueue from './ValidationQueue';

const Dashboard = () => {
  const { data, role, setPage } = useApp();
  const { notify } = useNotification();
  const { factures, clients } = data;
  const total = factures.reduce((s, f) => s + f.total_ttc, 0);
  const encaisse = factures.filter(f => f.statut === 'paid').reduce((s, f) => s + f.total_ttc, 0);
  const pending = factures.filter(f => f.statut === 'pending');
  const rejected = factures.filter(f => f.statut === 'rejected');

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tableau de bord</h1>
          <p className="text-sm" style={{ marginTop: 4 }}>
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setPage('new-facture')}>＋ Nouvelle facture</button>
      </div>
      <div className="stats-grid">
        <StatCard label="Total facturé" value={fmtMoney(total)} sub={`${factures.length} facture(s)`} color="blue" />
        <StatCard label="Encaissé" value={fmtMoney(encaisse)} sub={`${factures.filter(f => f.statut === 'paid').length} payée(s)`} color="green" badge="badge-success" />
        <StatCard label="En attente" value={fmtMoney(pending.reduce((s, f) => s + f.total_ttc, 0))} sub={`${pending.length} facture(s)`} color="amber" badge="badge-warning" />
        <StatCard label="Rejetées" value={fmtMoney(rejected.reduce((s, f) => s + f.total_ttc, 0))} sub={`${rejected.length} facture(s)`} color="red" badge="badge-danger" />
      </div>
      <div className="grid-2">
        <MonthlyChart factures={factures} />
        <RecentInvoices factures={factures} clients={clients} onViewAll={() => setPage('factures')} />
      </div>
      {role === 'admin' && (
        <ValidationQueue
          factures={factures}
          clients={clients}
          onValidate={() => notify('Facture validée ✓')}
          onReject={() => notify('Facture rejetée', 'error')}
        />
      )}
    </div>
  );
};

export default Dashboard;
