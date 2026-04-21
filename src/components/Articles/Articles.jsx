import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ArticleList from './ArticleList';
import CategoryList from './CategoryList';
import ArticleModal from './ArticleModal';
import CategoryModal from './CategoryModal';
import { genId } from '../../utils/formatters';

const Articles = ({ notify }) => {
  const { data, update } = useApp();
  const { articles, categories } = data;
  const [tab, setTab] = useState('articles');
  const [artModal, setArtModal] = useState(null);
  const [catModal, setCatModal] = useState(null);

  const saveArticle = async (form) => {
    if (!form.designation || !form.prix_unitaire || !form.categorie_id) {
      notify('Veuillez compléter les champs article', 'error');
      return;
    }

    const next = form.id
      ? articles.map((a) => (a.id === form.id ? form : a))
      : [...articles, { ...form, id: genId() }];

    await update('articles', next);
    notify(form.id ? 'Article modifié ✓' : 'Article ajouté ✓');
    setArtModal(null);
  };

  const deleteArticle = async (id) => {
    if (!confirm('Supprimer cet article ?')) return;
    await update('articles', articles.filter((a) => a.id !== id));
    notify('Article supprimé', 'error');
  };

  const saveCategory = async (form) => {
    if (!form.nom) {
      notify('Le nom de catégorie est requis', 'error');
      return;
    }

    const normalized = {
      ...form,
      tva: Number(form.tva) || 0
    };
    const next = normalized.id
      ? categories.map((c) => (c.id === normalized.id ? normalized : c))
      : [...categories, { ...normalized, id: genId() }];

    await update('categories', next);
    notify(normalized.id ? 'Catégorie modifiée ✓' : 'Catégorie ajoutée ✓');
    setCatModal(null);
  };

  const deleteCategory = async (id) => {
    const linkedCount = articles.filter((a) => a.categorie_id === id).length;
    if (linkedCount > 0) {
      notify('Impossible de supprimer: catégorie liée à des articles', 'error');
      return;
    }
    if (!confirm('Supprimer cette catégorie ?')) return;
    await update('categories', categories.filter((c) => c.id !== id));
    notify('Catégorie supprimée', 'error');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Catalogue</h1>
        <div className="flex" style={{ gap: 8 }}>
          <button className={`btn btn-sm ${tab === 'articles' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('articles')}>
            Articles
          </button>
          <button className={`btn btn-sm ${tab === 'categories' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('categories')}>
            Catégories
          </button>
          {tab === 'articles' && (
            <button
              className="btn btn-primary"
              onClick={() => setArtModal({ id: '', designation: '', prix_unitaire: 0, categorie_id: categories[0]?.id || '' })}
            >
              ＋ Nouvel article
            </button>
          )}
          {tab === 'categories' && (
            <button className="btn btn-primary" onClick={() => setCatModal({ id: '', nom: '', tva: 20 })}>
              ＋ Nouvelle catégorie
            </button>
          )}
        </div>
      </div>
      {tab === 'articles' && <ArticleList articles={articles} categories={categories} onEdit={setArtModal} onDelete={deleteArticle} />}
      {tab === 'categories' && <CategoryList categories={categories} articles={articles} onEdit={setCatModal} onDelete={deleteCategory} />}
      {artModal && <ArticleModal artModal={artModal} categories={categories} onSave={saveArticle} onClose={() => setArtModal(null)} />}
      {catModal && <CategoryModal catModal={catModal} onSave={saveCategory} onClose={() => setCatModal(null)} />}
    </div>
  );
};

export default Articles;
