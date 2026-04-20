export const calcFacture = (articles, methode, remise_globale, categories) => {
  if (!articles.length) return { total_ht: 0, tva: 0, total_ttc: 0 };

  let total_ht = 0, total_tva = 0;

  if (methode === 'categorie') {
    articles.forEach(l => {
      const cat = categories.find(c => c.id === (l.categorie_id || 1));
      const tvaPct = cat ? cat.tva : 20;
      const ht = l.qte * l.prix;
      total_ht += ht;
      total_tva += ht * tvaPct / 100;
    });
    return {
      total_ht: Math.round(total_ht),
      tva: Math.round(total_tva),
      total_ttc: Math.round(total_ht + total_tva)
    };
  }

  if (methode === 'remise_ligne') {
    articles.forEach(l => {
      const sous = l.qte * l.prix;
      const net = sous * (1 - (l.remise || 0) / 100);
      total_ht += net;
    });
    total_tva = total_ht * 0.20;
    return {
      total_ht: Math.round(total_ht),
      tva: Math.round(total_tva),
      total_ttc: Math.round(total_ht + total_tva)
    };
  }

  if (methode === 'remise_globale') {
    articles.forEach(l => { total_ht += l.qte * l.prix; });
    const rg = (remise_globale || 0) / 100;
    total_ht = total_ht * (1 - rg);
    total_tva = total_ht * 0.20;
    return {
      total_ht: Math.round(total_ht),
      tva: Math.round(total_tva),
      total_ttc: Math.round(total_ht + total_tva)
    };
  }

  articles.forEach(l => { total_ht += l.qte * l.prix; });
  total_tva = total_ht * 0.20;
  return {
    total_ht: Math.round(total_ht),
    tva: Math.round(total_tva),
    total_ttc: Math.round(total_ht + total_tva)
  };
};
