import React from 'react';
import { useApp } from '../../context/AppContext';
import { useNotification } from '../../hooks/useNotification';
import { fmtMoney } from '../../utils/formatters';
import StatCard from './StatCard';
import MonthlyChart from './MonthlyChart';
import RecentInvoices from './RecentInvoices';
import ValidationQueue from './ValidationQueue';

const Dashboard = () => {
  const { data, role, user, setPage } = useApp();
  const { notify } = useNotification();
  const { factures, clients } = data;
  const visibleFactures = role === 'admin'
    ? factures
    : factures.filter((f) =>
      (f.created_by_uid && f.created_by_uid === user?.uid) ||
      (f.created_by && f.created_by === user?.email)
    );
  const total = visibleFactures.reduce((s, f) => s + f.total_ttc, 0);
  const encaisse = visibleFactures.filter(f => f.statut === 'paid').reduce((s, f) => s + f.total_ttc, 0);
  const pending = visibleFactures.filter(f => f.statut === 'pending');
  const rejected = visibleFactures.filter(f => f.statut === 'rejected');

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
        <StatCard label="Total facturé" value={fmtMoney(total)} sub={`${visibleFactures.length} facture(s)`} color="blue" />
        <StatCard label="Encaissé" value={fmtMoney(encaisse)} sub={`${visibleFactures.filter(f => f.statut === 'paid').length} payée(s)`} color="green" badge="badge-success" />
        <StatCard label="En attente" value={fmtMoney(pending.reduce((s, f) => s + f.total_ttc, 0))} sub={`${pending.length} facture(s)`} color="amber" badge="badge-warning" />
        <StatCard label="Rejetées" value={fmtMoney(rejected.reduce((s, f) => s + f.total_ttc, 0))} sub={`${rejected.length} facture(s)`} color="red" badge="badge-danger" />
      </div>
      <div className="grid-2">
        <MonthlyChart factures={visibleFactures} />
        <RecentInvoices factures={visibleFactures} clients={clients} onViewAll={() => setPage('factures')} />
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
