import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Notification from '../UI/Notification';

const AuthScreen = ({ notify, notification }) => {
  const { login, register } = useApp();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      notify('Email et mot de passe requis', 'error');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
        notify('Connexion réussie');
      } else {
        await register(email, password);
        notify('Compte créé, bienvenue');
      }
    } catch (error) {
      notify(error?.message || "Erreur d'authentification", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>FacturaPro</h1>
        <p className="text-sm">
          {mode === 'login' ? 'Connecte-toi pour continuer' : 'Crée un compte client'}
        </p>
        <form onSubmit={submit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@facturapro.ma"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          <button className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>

        <button
          className="btn btn-secondary auth-switch"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          type="button"
        >
          {mode === 'login' ? "Créer un compte" : 'J’ai déjà un compte'}
        </button>
      </div>
      <Notification notification={notification} />
    </div>
  );
};

export default AuthScreen;
