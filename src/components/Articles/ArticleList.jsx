import React from 'react';
import { fmtMoney } from '../../utils/formatters';

const ArticleList = ({ articles, categories, onEdit, onDelete }) => (
  <div className="card" style={{ padding: 0 }}>
    <div className="table-wrap">
      <table>
        <thead><tr><th>Désignation</th><th>Catégorie</th><th>Prix unitaire</th><th>Actions</th></tr></thead>
        <tbody>
          {articles.map(a => {
            const cat = categories.find(c => String(c.id) === String(a.categorie_id));
            return (
              <tr key={a.id}>
                <td><strong>{a.designation}</strong></td>
                <td><span className="tag">{cat?.nom || '—'}</span></td>
                <td><strong>{fmtMoney(a.prix_unitaire)}</strong></td>
                <td>
                  <div className="td-actions">
                    <button className="btn-icon" onClick={() => onEdit(a)}>✏️</button>
                    <button className="btn-icon" style={{ color: 'var(--danger)' }} onClick={() => onDelete(a.id)}>🗑</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default ArticleList;
