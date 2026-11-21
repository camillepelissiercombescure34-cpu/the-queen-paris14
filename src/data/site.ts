// Source unique de vérité du site : tout se modifie ici.
// Tarifs « à partir de » relevés sur Treatwell en novembre 2026 (hors promotions).

export type PriceRow = {
  label: string;
  detail?: string;
  price: string;
};

export type PriceCategory = {
  id: string;
  letter: string;
  title: string;
  short: string;
  intro: string;
  rows: PriceRow[];
  from: string;
};

export type NavItem = { key: string; label: string; href: string };

export const site = {
  name: "THE QUEEN",
  shortName: "The Queen",
  tagline: "Nail bar & beauté des pieds",
  district: "Edgar-Quinet · Montparnasse",
  city: "Paris 14e",

  // Numéro unique utilisé par tous les boutons « Réserver » et liens tel:.
  phone: "+33688128183",
  phoneDisplay: "06 88 12 81 83",

  address: {
    street: "4 rue Poinsot",
    postalCode: "75014",
    city: "Paris",
    country: "France",
    region: "Île-de-France",
    full: "4 rue Poinsot, 75014 Paris",
  },
  geo: { lat: 48.8410925, lng: 2.3233167 },
  metro: "Métro 6 — Edgar Quinet · Métro 4, 6, 12, 13 — Montparnasse",

  // À remplacer par le domaine définitif après mise en ligne.
  url: "https://the-queen-paris14.vercel.app",

  treatwellUrl: "https://www.treatwell.fr/salon/the-queen",
  mapsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJLzqsb-1x5kcR7K5oCMQ44HY",
  itineraryUrl:
    "https://www.google.com/maps/dir/?api=1&destination=4+rue+Poinsot+75014+Paris",
  reviewsDate: "novembre 2026",

  // Champs volontairement vides : à compléter par la gérante avant mise en ligne.
  legal: {
    publisher: "",
    email: "",
    host: "Vercel Inc.",
    hostAddress: "",
    dpo: "",
    retention: "",
    mediator: "",
    photoCredit: "Visuels d'illustration provisoires, non contractuels.",
  },
};

export const nav: NavItem[] = [
  { key: "accueil", label: "Accueil", href: "/" },
  { key: "prestations", label: "Prestations", href: "/prestations" },
  { key: "salon", label: "Le Salon", href: "/le-salon" },
  { key: "galerie", label: "Galerie", href: "/galerie" },
  { key: "contact", label: "Contact", href: "/contact" },
];

export const hours = [
  { day: "Lundi", short: "Lun", open: "10:30", close: "19:45" },
  { day: "Mardi", short: "Mar", open: "10:30", close: "19:45" },
  { day: "Mercredi", short: "Mer", open: "10:30", close: "19:45" },
  { day: "Jeudi", short: "Jeu", open: "10:30", close: "19:45" },
  { day: "Vendredi", short: "Ven", open: "10:30", close: "19:45" },
  { day: "Samedi", short: "Sam", open: "10:30", close: "19:45" },
  { day: "Dimanche", short: "Dim", open: "12:00", close: "19:45" },
];

export const priceDisclaimer =
  "Tarifs « à partir de » relevés sur Treatwell en novembre 2026, hors promotions et selon la longueur des ongles. Ils peuvent évoluer : le tarif exact vous est confirmé par téléphone ou en salon avant la prestation.";

export const categories: PriceCategory[] = [
  {
    id: "manucure",
    letter: "A",
    title: "Manucure & vernis",
    short: "La mise en beauté des mains, du soin au vernis.",
    from: "dès 10 €",
    intro:
      "Mise en forme, travail des cuticules et pose du vernis : une manucure précise, adaptée à la forme naturelle de vos ongles.",
    rows: [
      { label: "Vernis coloré", detail: "10 min", price: "10 €" },
      { label: "Vernis French", detail: "15 min", price: "12 €" },
      { label: "Manucure avec pose de base", detail: "20 min", price: "15 €" },
      { label: "Manucure avec soin réparateur", detail: "20 min", price: "18 €" },
      { label: "Manucure et vernis coloré", detail: "30 min", price: "19 €" },
      { label: "Manucure et vernis French", detail: "35 min", price: "22 €" },
      { label: "Dépose semi-permanent et vernis coloré", detail: "25 min", price: "18 €" },
      { label: "Dépose semi-permanent et vernis French", detail: "30 min", price: "20 €" },
    ],
  },
  {
    id: "semi-permanent",
    letter: "B",
    title: "Vernis semi-permanent",
    short: "Une tenue longue durée, une finition nette.",
    from: "dès 20,70 €",
    intro:
      "Le semi-permanent tient plusieurs semaines sans perdre de son éclat. Pose seule ou précédée d'une manucure complète, avec ou sans dépose de la pose précédente.",
    rows: [
      { label: "Pose semi-permanent coloré", detail: "25 min", price: "20,70 €" },
      { label: "Pose semi-permanent French", detail: "35 min", price: "23,40 €" },
      { label: "Dépose et nouvelle pose colorée", detail: "40 min", price: "27 €" },
      { label: "Dépose et nouvelle pose French", detail: "45 min", price: "31,50 €" },
      { label: "Manucure et semi-permanent coloré", detail: "35 min", price: "26,10 €" },
      { label: "Manucure et semi-permanent French", detail: "45 min", price: "28,80 €" },
      { label: "Manucure, semi-permanent et dépose", detail: "45 min", price: "31,50 €" },
      { label: "Manucure, semi-permanent French et dépose", detail: "50 min", price: "34,20 €" },
    ],
  },
  {
    id: "faux-ongles",
    letter: "C",
    title: "Faux ongles, gel & résine",
    short: "De la longueur, de la forme, sans compromis.",
    from: "dès 25 €",
    intro:
      "Pose d'ongles en gel ou en résine, pour allonger, corriger une forme ou reconstruire un ongle. La prestation est établie avec vous selon l'état de vos ongles.",
    rows: [
      { label: "Pose de faux ongles", detail: "gel ou résine", price: "dès 25 €" },
      { label: "Remplissage gel ou résine", detail: "sur devis", price: "Nous consulter" },
      { label: "Dépose de pose gel ou résine", detail: "sur devis", price: "Nous consulter" },
      { label: "Réparation d'un ongle", detail: "sur devis", price: "Nous consulter" },
      { label: "French ou nail art sur pose", detail: "selon le motif", price: "Nous consulter" },
    ],
  },
  {
    id: "beaute-des-pieds",
    letter: "D",
    title: "Beauté des pieds",
    short: "Le soin complet, jusqu'au vernis.",
    from: "dès 28,80 €",
    intro:
      "Bain, travail des ongles et de la peau, puis vernis ou semi-permanent : une beauté des pieds complète, réalisée avec la même attention que pour les mains.",
    rows: [
      { label: "Beauté des pieds et vernis coloré", detail: "20 min", price: "28,80 €" },
      { label: "Beauté des pieds et vernis French", detail: "30 min", price: "31,50 €" },
      { label: "Beauté des pieds et semi-permanent coloré", detail: "30 min", price: "44,10 €" },
      { label: "Beauté des pieds et semi-permanent French", detail: "40 min", price: "46,80 €" },
      { label: "Dépose semi-permanent et vernis coloré", detail: "35 min", price: "36,90 €" },
      { label: "Dépose semi-permanent et semi-permanent coloré", detail: "45 min", price: "48,60 €" },
      { label: "Dépose semi-permanent et semi-permanent French", detail: "45 min", price: "51,30 €" },
    ],
  },
  {
    id: "epilation",
    letter: "E",
    title: "Épilation à la cire",
    short: "Une peau douce, un geste rapide.",
    from: "dès 8 €",
    intro:
      "Épilation à la cire pour le visage et le corps. Les tarifs dépendent de la zone : nous vous les confirmons par téléphone.",
    rows: [
      { label: "Épilation visage — zone simple", detail: "lèvre, menton, sourcils", price: "dès 8 €" },
      { label: "Épilation aisselles", detail: "sur devis", price: "Nous consulter" },
      { label: "Épilation demi-jambes", detail: "sur devis", price: "Nous consulter" },
      { label: "Épilation jambes complètes", detail: "sur devis", price: "Nous consulter" },
      { label: "Épilation maillot", detail: "sur devis", price: "Nous consulter" },
    ],
  },
  {
    id: "regard-visage",
    letter: "F",
    title: "Regard & visage",
    short: "Le détail qui ouvre le regard.",
    from: "dès 79 €",
    intro:
      "Rehaussement et teinture des cils, soins du visage : des prestations complémentaires pour prolonger la parenthèse.",
    rows: [
      { label: "Beauté du regard", detail: "rehaussement et teinture", price: "dès 79 €" },
      { label: "Teinture des cils", detail: "sur devis", price: "Nous consulter" },
      { label: "Soin du visage", detail: "sur devis", price: "Nous consulter" },
    ],
  },
];

export const gallery = [
  {
    src: "/assets/img/mains-nude.avif",
    alt: "Mains aux ongles courts et arrondis, vernis nude brillant, posées sur du lin ivoire — visuel d'illustration",
    category: "Mains",
    caption: "Manucure nude",
  },
  {
    src: "/assets/img/french-manucure.avif",
    alt: "French manucure classique sur ongles en amande, sur fond de pierre sable — visuel d'illustration",
    category: "Mains",
    caption: "French manucure",
  },
  {
    src: "/assets/img/nail-art-or.avif",
    alt: "Nail art minimal, trait doré fin sur ongles champagne — visuel d'illustration",
    category: "Mains",
    caption: "Trait doré",
  },
  {
    src: "/assets/img/beaute-pieds.avif",
    alt: "Beauté des pieds, vernis nude et bol d'eau aux pétales sur serviette ivoire — visuel d'illustration",
    category: "Pieds",
    caption: "Beauté des pieds",
  },
  {
    src: "/assets/img/mains-lin.avif",
    alt: "Deux mains aux ongles ivoire laiteux, fins bijoux dorés, sur nappe beige — visuel d'illustration",
    category: "Mains",
    caption: "Ivoire laiteux",
  },
  {
    src: "/assets/img/details-soins.avif",
    alt: "Poste de soin : flacons neutres, plateau de laiton, serviette sable et bougie — visuel d'illustration",
    category: "Détails",
    caption: "Le poste de soin",
  },
  {
    src: "/assets/img/interieur-detail.avif",
    alt: "Coin d'accueil crème, applique de laiton, vase de fleurs séchées et serviettes pliées — visuel d'illustration",
    category: "Ambiance",
    caption: "Coin d'accueil",
  },
  {
    src: "/assets/img/hero-salon.avif",
    alt: "Intérieur lumineux aux murs ivoire, miroir cintré et mobilier en chêne clair — visuel d'illustration",
    category: "Ambiance",
    caption: "L'esprit du lieu",
  },
];

export const galleryCategories = ["Tout", "Mains", "Pieds", "Ambiance", "Détails"];

export const reviews = {
  google: { label: "Google", rating: "4,1", count: "205 avis", url: site.mapsUrl },
  treatwell: { label: "Treatwell", rating: "4,6", count: "4 476 avis", url: site.treatwellUrl },
  quotes: [
    { text: "Super salon avec un très bon rapport qualité prix.", author: "Marine", service: "Vernis semi-permanent mains" },
    { text: "Très contente du service.", author: "Geneviève", service: "Épilation" },
  ],
};

export const facts = [
  { label: "Adresse", value: "4 rue Poinsot, Paris 14e" },
  { label: "Métro", value: "Edgar Quinet · Montparnasse" },
  { label: "Ouverture", value: "Lun–sam 10h30–19h45 · dim 12h–19h45" },
];
