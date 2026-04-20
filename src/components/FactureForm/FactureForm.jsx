import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { genId, genInvoiceNum } from '../../utils/formatters';
import { useFactureCalcul } from '../../hooks/useFactureCalcul';
import StepIndicator from './StepIndicator';
import Step1Client from './Step1Client';
import Step2Articles from './Step2Articles';
import Step3Suivi from './Step3Suivi';

const FactureForm = ({ onDone, notify }) => {
  const { data, update } = useApp();
  const { factures, clients, articles, categories } = data;
  const [step, setStep] = useState(1);
  const [client_id, setClientId] = useState('');
  const [methode, setMethode] = useState('simple');
  const [remise_globale, setRemiseGlobale] = useState(0);
  const [lines, setLines] = useState([{ article_id: '', designation: '', qte: 1, prix: 0, remise: 0, categorie_id: 1 }]);
  const [meta, setMeta] = useState({ date_depot: '', date_encaissement: '', type_virement: '', statut: 'pending' });
  const [errors, setErrors] = useState({});
  const totals = useFactureCalcul(lines, methode, remise_globale, categories);

  const addLine = () => setLines([...lines, { article_id: '', designation: '', qte: 1, prix: 0, remise: 0, categorie_id: 1 }]);
  const removeLine = (i) => setLines(lines.filter((_, j) => j !== i));
  const setLine = (i, k, v) => setLines(lines.map((l, j) => j === i ? { ...l, [k]: v } : l));
  const pickArticle = (i, aid) => {
    const a = articles.find(x => x.id === parseInt(aid));
    if (a) {
      setLines(lines.map((l, j) => j === i ? { ...l, article_id: a.id, designation: a.designation, prix: a.prix_unitaire, categorie_id: a.categorie_id } : l));
    } else setLine(i, 'article_id', aid);
  };
  const validateStep1 = () => {
    const e = {};
    if (!client_id) e.client_id = 'Requis';
    setErrors(e);
    return !Object.keys(e).length;
  };
  const validateStep2 = () => {
    const hasValidLine = lines.some(l => l.designation && Number(l.qte) > 0 && Number(l.prix) > 0);
    const e = hasValidLine ? {} : { lines: 'Ajoutez au moins un article valide' };
    setErrors(e);
    return hasValidLine;
  };

  const submit = async () => {
    if (!validateStep1() || !validateStep2()) return;
    const fact = {
      id: genId(), numero: genInvoiceNum(factures), date_creation: new Date().toISOString().split('T')[0], client_id,
      articles: lines.filter(l => l.designation), methode, remise_globale: parseInt(remise_globale) || 0, ...totals, ...meta, validated_by_admin: false, created_by: 'user'
    };
    await update('factures', [...factures, fact]);
    notify('Facture créée avec succès ✓');
    onDone();
  };

  return (
    <div>
      <div className="page-header"><h1 className="page-title">Nouvelle facture</h1><StepIndicator step={step} /></div>
      {step === 1 && <Step1Client clients={clients} client_id={client_id} setClientId={setClientId} methode={methode} setMethode={setMethode} remise_globale={remise_globale} setRemiseGlobale={setRemiseGlobale} errors={errors} onNext={() => { if (validateStep1()) setStep(2); }} onCancel={onDone} />}
      {step === 2 && <Step2Articles articles={articles} categories={categories} lines={lines} methode={methode} remise_globale={remise_globale} totals={totals} errors={errors} onAddLine={addLine} onRemoveLine={removeLine} onSetLine={setLine} onPickArticle={pickArticle} onBack={() => setStep(1)} onNext={() => { if (validateStep2()) setStep(3); }} />}
      {step === 3 && <Step3Suivi clients={clients} client_id={client_id} methode={methode} lines={lines} totals={totals} meta={meta} setMeta={setMeta} onBack={() => setStep(2)} onSubmit={submit} />}
    </div>
  );
};

export default FactureForm;
