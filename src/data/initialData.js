export const INITIAL_DATA = {
  categories: [
    { id: 1, nom: 'Informatique', tva: 20 },
    { id: 2, nom: 'Services', tva: 10 },
    { id: 3, nom: 'Formation', tva: 0 },
    { id: 4, nom: 'Bureautique', tva: 20 },
  ],
  articles: [
    { id: 1, designation: 'Ordinateur portable', prix_unitaire: 8500, categorie_id: 1 },
    { id: 2, designation: 'Imprimante laser', prix_unitaire: 3200, categorie_id: 1 },
    { id: 3, designation: 'Maintenance informatique', prix_unitaire: 500, categorie_id: 2 },
    { id: 4, designation: 'Formation React', prix_unitaire: 1500, categorie_id: 3 },
    { id: 5, designation: 'Logiciel ERP', prix_unitaire: 12000, categorie_id: 1 },
    { id: 6, designation: 'Conseil en gestion', prix_unitaire: 800, categorie_id: 2 },
    { id: 7, designation: 'Fournitures bureau', prix_unitaire: 150, categorie_id: 4 },
  ],
  clients: [
    { id: 'c1', nom: 'Société ATLAS', email: 'contact@atlas.ma', tel: '0522-123456', adresse: '123 Bd Hassan II, Casablanca' },
    { id: 'c2', nom: 'sami rahni', email: 'sami@rahni.ma', tel: '0537-654321', adresse: '45 Rue Allal, Rabat' },
    { id: 'c3', nom: 'maryam L', email: 'maryam@techmaroc.ma', tel: '0528-987654', adresse: '10 Av Moulay Youssef, Agadir' },
  ],
  factures: [
    {
      id: 'f1', numero: 'FAC-2024-001', date_creation: '2024-01-15', client_id: 'c1',
      articles: [
        { article_id: 1, designation: 'Ordinateur portable', qte: 2, prix: 8500, remise: 0, tva: 20 },
        { article_id: 4, designation: 'Formation React', qte: 1, prix: 1500, remise: 0, tva: 0 }
      ],
      methode: 'simple', total_ht: 18500, tva: 3400, total_ttc: 21900, remise_globale: 0,
      statut: 'paid', date_depot: '2024-01-20', date_encaissement: '2024-02-05', type_virement: 'Virement bancaire', validated_by_admin: true, created_by: 'user'
    },
    {
      id: 'f2', numero: 'FAC-2024-002', date_creation: '2024-02-03', client_id: 'c2',
      articles: [
        { article_id: 3, designation: 'Maintenance informatique', qte: 5, prix: 500, remise: 10, tva: 10 },
        { article_id: 6, designation: 'Conseil en gestion', qte: 3, prix: 800, remise: 0, tva: 10 }
      ],
      methode: 'remise_ligne', total_ht: 4650, tva: 465, total_ttc: 5115, remise_globale: 0,
      statut: 'pending', date_depot: '2024-02-10', date_encaissement: '', type_virement: '', validated_by_admin: false, created_by: 'user'
    },
    {
      id: 'f3', numero: 'FAC-2024-003', date_creation: '2024-03-12', client_id: 'c3',
      articles: [{ article_id: 5, designation: 'Logiciel ERP', qte: 1, prix: 12000, remise: 5, tva: 20 }],
      methode: 'remise_globale', total_ht: 12000, tva: 2280, total_ttc: 13140, remise_globale: 5,
      statut: 'rejected', date_depot: '2024-03-15', date_encaissement: '', type_virement: '', validated_by_admin: false, created_by: 'user'
    },
    {
      id: 'f4', numero: 'FAC-2024-004', date_creation: '2024-03-28', client_id: 'c1',
      articles: [{ article_id: 7, designation: 'Fournitures bureau', qte: 20, prix: 150, remise: 0, tva: 20 }],
      methode: 'simple', total_ht: 3000, tva: 600, total_ttc: 3600, remise_globale: 0,
      statut: 'pending', date_depot: '', date_encaissement: '', type_virement: '', validated_by_admin: false, created_by: 'user'
    },
  ],
  params: {
    nom_entreprise: 'atlas',
    adresse: '25 Av des FAR, Casablanca 20000',
    telephone: '0766821416',
    email: 'rahni@facturapro.ma',
    ice: '001234567000123',
    tva_default: 20
  }
};
