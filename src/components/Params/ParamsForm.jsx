import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const ParamsForm = ({ notify }) => {
  const { data, update } = useApp();
  const [form, setForm] = useState({ ...data.params });
  const f = (k, v) => setForm({ ...form, [k]: v });
  const save = () => { update('params', form); notify('Paramètres enregistrés ✓'); };

  return (
    <div>
      <div className="page-header"><h1 className="page-title">Paramètres</h1><button className="btn btn-primary" onClick={save}>💾 Enregistrer</button></div>
      <div className="card">
        <div className="form-group form-full">
          <label className="form-label">Nom de l'entreprise</label>
          <input className="form-control" value={form.nom_entreprise || ''} onChange={e => f('nom_entreprise', e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default ParamsForm;
