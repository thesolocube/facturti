import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { useNotification } from './hooks/useNotification';
import Layout from './components/Layout/Layout';
import AuthScreen from './components/Auth/AuthScreen';
import Dashboard from './components/Dashboard/Dashboard';
import FactureList from './components/Factures/FactureList';
import ClientList from './components/Clients/ClientList';
import Articles from './components/Articles/Articles';
import ParamsForm from './components/Params/ParamsForm';
import FactureForm from './components/FactureForm/FactureForm';
import Notification from './components/UI/Notification';

const AppContent = () => {
  const { data, update, role, setPage, page, loadingData, user, authLoading } = useApp();
  const { notification, notify } = useNotification();

  const isAdmin = role === 'admin';

  const allowedPages = isAdmin
    ? ['dashboard', 'factures', 'clients', 'articles', 'params', 'new-facture']
    : ['dashboard', 'factures', 'clients', 'new-facture'];

  const safePage = allowedPages.includes(page) ? page : 'dashboard';

  // ✅ Hook toujours en haut
  useEffect(() => {
    if (safePage !== page) {
      setPage('dashboard');
    }
  }, [page, safePage, setPage]);

  // ✅ Conditions après hooks
  if (authLoading) {
    return <div className="auth-loading">Chargement de la session...</div>;
  }

  if (!user) {
    return <AuthScreen notify={notify} notification={notification} />;
  }

  if (loadingData) {
    return <div className="auth-loading">Synchronisation des données...</div>;
  }

  const renderPage = () => {
    switch (safePage) {
      case 'dashboard':
        return <Dashboard />;

      case 'factures':
        return (
          <FactureList
            data={data}
            role={role}
            notify={notify}
            update={update}
            setPage={setPage}
          />
        );

      case 'clients':
        return (
          <ClientList
            data={data}
            notify={notify}
            update={update}
          />
        );

      case 'articles':
        return isAdmin ? <Articles notify={notify} /> : <Dashboard />;

      case 'params':
        return isAdmin ? <ParamsForm notify={notify} /> : <Dashboard />;

      case 'new-facture':
        return (
          <FactureForm
            onDone={() => setPage('factures')}
            notify={notify}
          />
        );

      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderPage()}
      <Notification notification={notification} />
    </Layout>
  );
};

// ✅ COMPOSANT PRINCIPAL (manquant chez toi)
const App = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;