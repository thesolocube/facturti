import React from 'react';

const CategoryList = ({ categories, articles, onEdit, onDelete }) => (
  <div className="card" style={{ padding: 0 }}>
    <div className="table-wrap">
      <table>
        <thead><tr><th>Nom</th><th>Taux TVA</th><th>Articles</th><th>Actions</th></tr></thead>
        <tbody>
          {categories.map(c => (
            <tr key={c.id}>
              <td><strong>{c.nom}</strong></td>
              <td><span className="badge-info stat-badge">{c.tva}%</span></td>
              <td>{articles.filter(a => String(a.categorie_id) === String(c.id)).length}</td>
              <td>
                <div className="td-actions">
                  <button className="btn-icon" onClick={() => onEdit(c)}>✏️</button>
                  <button className="btn-icon" style={{ color: 'var(--danger)' }} onClick={() => onDelete(c.id)}>🗑</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CategoryList;
