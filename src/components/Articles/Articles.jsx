import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ArticleList from './ArticleList';
import CategoryList from './CategoryList';
import ArticleModal from './ArticleModal';
import CategoryModal from './CategoryModal';

const Articles = ({ notify }) => {
  const { data, update } = useApp();
  const { articles, categories } = data;
  const [tab, setTab] = useState('articles');
  const [artModal, setArtModal] = useState(null);
  const [catModal, setCatModal] = useState(null);

  return (
    <div>
      <div className="page-header"><h1 className="page-title">Catalogue</h1></div>
      {tab === 'articles' && <ArticleList articles={articles} categories={categories} onEdit={setArtModal} onDelete={() => notify('Supprimé', 'error')} />}
      {tab === 'categories' && <CategoryList categories={categories} articles={articles} onEdit={setCatModal} onDelete={() => notify('Supprimé', 'error')} />}
      {artModal && <ArticleModal artModal={artModal} categories={categories} onSave={() => {}} onClose={() => setArtModal(null)} />}
      {catModal && <CategoryModal catModal={catModal} onSave={() => {}} onClose={() => setCatModal(null)} />}
    </div>
  );
};

export default Articles;
