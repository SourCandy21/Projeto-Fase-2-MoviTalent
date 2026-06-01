import { defaultImage, sampleItems } from "./data.js";

export const state = {
  items: structuredClone(sampleItems),
  alerts: [
    { email: "maria@email.com", category: "Construção", city: "Maringá", radius: "Até 30 km" }
  ],
  profile: null,
  selectedItemId: null
};

export const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export function createItem(formData) {
  const item = {
    id: Date.now(),
    title: formData.title,
    category: formData.category,
    city: formData.city,
    neighborhood: formData.neighborhood,
    distance: formData.distance,
    quantity: formData.quantity,
    duration: formData.duration,
    condition: formData.condition,
    preferredDeal: formData.preferredDeal,
    owner: state.profile?.name || "Você",
    status: "Ativo",
    address: formData.address,
    pickupNotes: formData.pickupNotes || "Combinar retirada pelo contato cadastrado.",
    image: formData.imageUrl || defaultImage,
    description: formData.description,
    bids: []
  };

  state.items.unshift(item);
  return item;
}

export function addBid(itemId, bid) {
  const item = findItem(itemId);
  if (!item || item.status !== "Ativo") return null;
  item.bids.push(bid);
  return item;
}

export function addAlert(alert) {
  state.alerts.unshift(alert);
  return alert;
}

export function saveProfile(profile) {
  state.profile = profile;
  return state.profile;
}

export function findItem(id) {
  return state.items.find((item) => item.id === Number(id));
}

export function cancelFirstActiveItem() {
  const item = state.items.find((entry) => entry.status === "Ativo");
  if (!item) return null;
  item.status = "Cancelado";
  return item;
}

export function bidLabel(bid) {
  if (bid.type === "pago") return `paga ${currency.format(bid.value)}`;
  if (bid.type === "gratis") return "retira gratuitamente";
  return `cobra ${currency.format(bid.value)} para retirar`;
}

export function getWinner(item) {
  const paidBids = item.bids.filter((bid) => bid.type === "pago");
  if (paidBids.length) return paidBids.sort((a, b) => b.value - a.value)[0];
  const freeBid = item.bids.find((bid) => bid.type === "gratis");
  if (freeBid) return freeBid;
  return item.bids.sort((a, b) => a.value - b.value)[0];
}

export function finishItem(id) {
  const item = findItem(id);
  const winner = getWinner(item);

  if (!winner) {
    item.status = "Cancelado sem acordo";
    return { item, winner: null };
  }

  item.status = "Negociado";
  return { item, winner };
}
