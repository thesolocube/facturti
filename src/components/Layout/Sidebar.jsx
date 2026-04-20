import React from 'react';
import { useApp } from '../../context/AppContext';

const Sidebar = () => {
  const { role, page, setPage, user, logout } = useApp();
  const shortEmail = user?.email || 'Utilisateur';
  const navAdmin = [
    { id: 'dashboard', ico: '◈', label: 'Tableau de bord' },
    { id: 'factures', ico: '◻', label: 'Factures' },
    { id: 'clients', ico: '◎', label: 'Clients' },
    { id: 'articles', ico: '◧', label: 'Articles & Catégories' },
    { id: 'params', ico: '⚙', label: 'Paramètres' },
  ];
  const navUser = [
    { id: 'dashboard', ico: '◈', label: 'Mon tableau de bord' },
    { id: 'factures', ico: '◻', label: 'Mes factures' },
    { id: 'clients', ico: '◎', label: 'Clients' },
    { id: 'new-facture', ico: '＋', label: 'Nouvelle facture' },
  ];
  const navItems = role === 'admin' ? navAdmin : navUser;

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>FacturaPro</h2>
        <span>Gestion de facturation</span>
      </div>
      <div className="user-badge">
        <div className={`avatar ${role}`}>{role === 'admin' ? 'AD' : 'US'}</div>
        <div className="user-info">
          <div className="name">{role === 'admin' ? 'Administrateur' : 'Client'}</div>
          <div className="role">{role === 'admin' ? 'Accès complet' : 'Accès standard'}</div>
          <div className="role">{shortEmail}</div>
        </div>
      </div>
      <nav>
        <div className="nav-section">Navigation</div>
        {navItems.map(n => (
          <div
            key={n.id}
            className={`nav-item ${page === n.id ? 'active' : ''}`}
            onClick={() => setPage(n.id)}
          >
            <span className="ico">{n.ico}</span>{n.label}
          </div>
        ))}
      </nav>
      <div className="role-toggle">
        <label>Session</label>
        <button className="btn btn-secondary sidebar-logout" onClick={logout}>
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
