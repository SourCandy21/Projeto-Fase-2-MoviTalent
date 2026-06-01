export const categories = [
  "Construção",
  "Móveis",
  "Eletrônicos",
  "Livros",
  "Roupas",
  "Sucata",
  "Entulho",
  "Madeira"
];

export const cities = [
  "Maringá",
  "Londrina",
  "Curitiba",
  "Cascavel"
];

export const defaultImage = "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80";

export const sampleItems = [
  {
    id: 1,
    title: "Telhas romanas em bom estado",
    category: "Construção",
    city: "Maringá",
    neighborhood: "Jardim Alvorada",
    distance: "28 km",
    quantity: "100 metros",
    duration: "15 dias",
    condition: "Usado em bom estado",
    preferredDeal: "Quero receber lances pagos",
    owner: "Marcos",
    status: "Ativo",
    address: "Rua das Palmeiras, 120",
    pickupNotes: "Precisa de veículo para carga e ajudante para retirada.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    description: "Telhas retiradas de um telhado recente. Estão armazenadas no quintal, prontas para retirada.",
    bids: [
      { name: "Maria", type: "pago", value: 200 },
      { name: "MelhorUso Ltda", type: "gratis", value: 0 },
      { name: "DeBoa Ltda", type: "cobro", value: 200 }
    ]
  },
  {
    id: 2,
    title: "Mesa de escritório com pequenas marcas",
    category: "Móveis",
    city: "Londrina",
    neighborhood: "Centro",
    distance: "12 km",
    quantity: "1 unidade",
    duration: "1 semana",
    condition: "Usado em bom estado",
    preferredDeal: "Aceito retirada gratuita",
    owner: "Ana",
    status: "Ativo",
    address: "Avenida Higienópolis, 300",
    pickupNotes: "Retirada em apartamento com elevador.",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80",
    description: "Mesa firme, ideal para escritório ou estudo.",
    bids: [{ name: "Carlos", type: "gratis", value: 0 }]
  },
  {
    id: 3,
    title: "Lote de livros didáticos",
    category: "Livros",
    city: "Curitiba",
    neighborhood: "Batel",
    distance: "8 km",
    quantity: "35 livros",
    duration: "24 horas",
    condition: "Usado em bom estado",
    preferredDeal: "Aceito retirada gratuita",
    owner: "Beatriz",
    status: "Ativo",
    address: "Rua Chile, 50",
    pickupNotes: "Caixas pequenas, retirada simples.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    description: "Livros de ensino médio em bom estado, indicados para doação ou projeto social.",
    bids: []
  },
  {
    id: 4,
    title: "Monitor LCD para reaproveitamento",
    category: "Eletrônicos",
    city: "Maringá",
    neighborhood: "Zona 7",
    distance: "5 km",
    quantity: "2 unidades",
    duration: "1 mês",
    condition: "Precisa de reparo",
    preferredDeal: "Procuro destinação apropriada",
    owner: "Rafael",
    status: "Ativo",
    address: "Rua Santos Dumont, 789",
    pickupNotes: "Retirada em horário comercial.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80",
    description: "Monitores antigos funcionando, sem cabos HDMI.",
    bids: [{ name: "TechCircular", type: "pago", value: 80 }]
  }
];
