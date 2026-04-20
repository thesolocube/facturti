import { fmtMoney, fmtDate } from './formatters';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePDF = (facture, client, params) => {
  const doc = new jsPDF();
  const pw = doc.internal.pageSize.getWidth();
  doc.setFillColor(26, 26, 46);
  doc.rect(0, 0, pw, 38, 'F');
  doc.setFillColor(233, 69, 96);
  doc.rect(0, 34, pw, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text(params.nom_entreprise || 'FacturaPro', 14, 22);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 180, 200);
  doc.text(params.adresse, 14, 30);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(26, 26, 46);
  doc.text('FACTURE', pw - 14, 22, { align: 'right' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 120);
  doc.text(facture.numero, pw - 14, 30, { align: 'right' });
  doc.setDrawColor(230, 230, 235);
  doc.setFillColor(248, 249, 251);
  doc.roundedRect(14, 46, 82, 40, 3, 3, 'FD');
  doc.roundedRect(110, 46, 86, 40, 3, 3, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 160);
  doc.text('ÉMETTEUR', 20, 54);
  doc.text('CLIENT', 116, 54);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(26, 26, 46);
  doc.text(params.nom_entreprise || '', 20, 61);
  doc.setTextColor(100, 100, 120);
  doc.text(params.telephone || '', 20, 68);
  doc.text(params.email || '', 20, 75);
  if (params.ice) doc.text('ICE: ' + params.ice, 20, 82);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(26, 26, 46);
  doc.text(client ? client.nom : '', 116, 61);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 120);
  if (client) {
    doc.text(client.email || '', 116, 68);
    doc.text(client.tel || '', 116, 75);
    doc.text(client.adresse || '', 116, 82, { maxWidth: 76 });
  }
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(26, 26, 46);
  doc.text(`Date: ${fmtDate(facture.date_creation)}`, 14, 94);
  doc.text(`Méthode: ${facture.methode}`, 90, 94);
  if (facture.date_depot) doc.text(`Dépôt: ${fmtDate(facture.date_depot)}`, 160, 94);
  const rows = facture.articles.map(l => {
    const ht = (l.qte * l.prix * (1 - (l.remise || 0) / 100));
    return [l.designation, l.qte, fmtMoney(l.prix), (l.remise || 0) + '%', fmtMoney(Math.round(ht))];
  });
  autoTable(doc, {
    head: [['Désignation', 'Qté', 'Prix U.', 'Remise', 'Total HT']],
    body: rows,
    startY: 100,
    theme: 'grid',
    headStyles: { fillColor: [26, 26, 46], textColor: 255, fontSize: 9, fontStyle: 'bold' },
    bodyStyles: { fontSize: 9, textColor: [50, 50, 70] },
    alternateRowStyles: { fillColor: [248, 249, 251] },
    columnStyles: { 1: { halign: 'center' }, 2: { halign: 'right' }, 3: { halign: 'center' }, 4: { halign: 'right' } },
    margin: { left: 14, right: 14 }
  });
  const finalY = doc.lastAutoTable.finalY + 8;
  doc.setFillColor(248, 249, 251);
  doc.setDrawColor(230, 230, 235);
  doc.roundedRect(pw - 100, finalY, 86, 44, 3, 3, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 120);
  doc.text('Total HT:', pw - 94, finalY + 10);
  doc.text('TVA:', pw - 94, finalY + 20);
  if (facture.remise_globale) doc.text(`Remise (${facture.remise_globale}%):`, pw - 94, finalY + 28);
  doc.setDrawColor(200, 200, 210);
  doc.line(pw - 98, finalY + 32, pw - 18, finalY + 32);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(26, 26, 46);
  doc.text('Total TTC:', pw - 94, finalY + 42);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(26, 26, 46);
  doc.text(fmtMoney(facture.total_ht), pw - 18, finalY + 10, { align: 'right' });
  doc.text(fmtMoney(facture.tva), pw - 18, finalY + 20, { align: 'right' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setFillColor(233, 69, 96);
  doc.roundedRect(pw - 78, finalY + 34, 60, 12, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text(fmtMoney(facture.total_ttc), pw - 18, finalY + 43, { align: 'right' });
  const statusColors = { paid: [39, 174, 96], pending: [243, 156, 18], rejected: [231, 76, 60] };
  const sc = statusColors[facture.statut] || [100, 100, 120];
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...sc);
  const sLabel = { paid: '✓ PAYÉE', pending: '⧖ EN ATTENTE', rejected: '✕ REJETÉE' }[facture.statut] || '';
  doc.text(sLabel, 14, finalY + 14);
  const pg = doc.internal.pageSize.getHeight();
  doc.setFillColor(248, 249, 251);
  doc.rect(0, pg - 18, pw, 18, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 160);
  doc.text('Merci pour votre confiance — ' + params.nom_entreprise, pw / 2, pg - 8, { align: 'center' });
  doc.text(params.email || '', 14, pg - 8);
  doc.text(params.telephone || '', pw - 14, pg - 8, { align: 'right' });
  doc.save(`${facture.numero}.pdf`);
};
