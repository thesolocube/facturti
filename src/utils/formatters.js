export const fmtMoney = (n) =>
  new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(n || 0);

export const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString('fr-FR') : '—';

export const genId = () =>
  'id_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);

export const genInvoiceNum = (factures) => {
  const yr = new Date().getFullYear();
  const max = factures
    .filter(f => f.numero.includes(yr + ''))
    .map(f => parseInt(f.numero.split('-').pop() || 0))
    .reduce((a, b) => Math.max(a, b), 0);
  return `FAC-${yr}-${String(max + 1).padStart(3, '0')}`;
};
