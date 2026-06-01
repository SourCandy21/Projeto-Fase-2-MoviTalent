import { categories, cities } from "./data.js";
import { bidLabel, currency, findItem, state } from "./store.js";

const els = {};

export function bindElements() {
  Object.assign(els, {
    categoryFilter: document.querySelector("#categoryFilter"),
    cityFilter: document.querySelector("#cityFilter"),
    category: document.querySelector("#category"),
    alertCategory: document.querySelector("#alertCategory"),
    alertCity: document.querySelector("#alertCity"),
    searchInput: document.querySelector("#searchInput"),
    statusFilter: document.querySelector("#statusFilter"),
    itemsGrid: document.querySelector("#itemsGrid"),
    alertsList: document.querySelector("#alertsList"),
    dashboard: document.querySelector("#dashboard"),
    formMessage: document.querySelector("#formMessage"),
    modalTitle: document.querySelector("#modalTitle"),
    modalImage: document.querySelector("#modalImage"),
    modalDescription: document.querySelector("#modalDescription"),
    modalMeta: document.querySelector("#modalMeta"),
    bidsList: document.querySelector("#bidsList")
  });

  return els;
}

export function fillSelectOptions() {
  fillSelect(els.categoryFilter, ["Todas as categorias", ...categories], "todos");
  fillSelect(els.cityFilter, ["Todas as cidades", ...cities], "todos");
  fillSelect(els.category, ["Selecione", ...categories], "");
  fillSelect(els.alertCategory, categories);
  fillSelect(els.alertCity, cities);
}

function fillSelect(select, values, firstValue = null) {
  select.innerHTML = values.map((value, index) => {
    const optionValue = index === 0 && firstValue !== null ? firstValue : value;
    return `<option value="${optionValue}">${value}</option>`;
  }).join("");
}

export function getFilters() {
  return {
    text: els.searchInput.value.toLowerCase(),
    category: els.categoryFilter.value,
    city: els.cityFilter.value,
    status: els.statusFilter.value
  };
}

export function renderItems(items) {
  const filters = getFilters();
  const filtered = items.filter((item) => {
    const haystack = `${item.title} ${item.description} ${item.category} ${item.city}`.toLowerCase();
    const statusGroup = item.status.startsWith("Cancelado") ? "Cancelado" : item.status;
    return haystack.includes(filters.text)
      && (filters.category === "todos" || item.category === filters.category)
      && (filters.city === "todos" || item.city === filters.city)
      && (filters.status === "todos" || statusGroup === filters.status);
  });

  els.itemsGrid.innerHTML = filtered.map(itemCard).join("");

  if (!filtered.length) {
    els.itemsGrid.innerHTML = `<div class="alert alert-warning grid-empty">Nenhum item encontrado com esses filtros.</div>`;
  }
}

function itemCard(item) {
  const statusClass = item.status.toLowerCase().split(" ")[0];
  return `
    <article class="item-card">
      <img src="${item.image}" alt="${item.title}">
      <div class="item-card-body">
        <div class="d-flex justify-content-between align-items-start gap-2 mb-3">
          <span class="status-pill ${statusClass}">${item.status}</span>
          <small class="text-secondary">${item.distance}</small>
        </div>
        <h3 class="item-title">${item.title}</h3>
        <p class="text-secondary mb-2">${item.city} • ${item.category}</p>
        <p class="mb-3"><strong>${item.quantity}</strong> • ${item.duration}</p>
        <button class="btn btn-success w-100" data-open-item="${item.id}">Ver detalhes e lances</button>
      </div>
    </article>
  `;
}

export function renderItemModal(itemId) {
  const item = findItem(itemId);
  state.selectedItemId = item.id;
  els.modalTitle.textContent = item.title;
  els.modalImage.src = item.image;
  els.modalImage.alt = item.title;
  els.modalDescription.textContent = item.description;
  els.modalMeta.innerHTML = `
    <div><strong>Categoria:</strong> ${item.category}</div>
    <div><strong>Local:</strong> ${item.city}, ${item.neighborhood} (${item.distance})</div>
    <div><strong>Quantidade:</strong> ${item.quantity}</div>
    <div><strong>Estado:</strong> ${item.condition}</div>
    <div><strong>Duração:</strong> ${item.duration}</div>
    <div><strong>Preferência:</strong> ${item.preferredDeal}</div>
    <div><strong>Retirada:</strong> ${item.pickupNotes}</div>
    <div><strong>Status:</strong> ${item.status}</div>
  `;
  renderBids(item);
}

export function renderBids(item) {
  if (!item.bids.length) {
    els.bidsList.innerHTML = `<div class="alert alert-info">Ainda não existem lances para este item.</div>`;
    return;
  }

  els.bidsList.innerHTML = item.bids.map((bid) => `
    <div class="bid-row">
      <strong>${bid.name}</strong><br>
      <span class="text-secondary">${bidLabel(bid)}</span>
    </div>
  `).join("");
}

export function renderAlerts() {
  els.alertsList.innerHTML = state.alerts.map((alert) => `
    <article class="alert-card">
      <span class="status-pill">Ativo</span>
      <h3 class="fs-6 fw-bold mt-3">${alert.category}</h3>
      <p class="text-secondary mb-1">${alert.city} • ${alert.radius}</p>
      <small>${alert.email}</small>
    </article>
  `).join("");
}

export function renderDashboard() {
  const myItems = state.items.filter((item) => item.owner === "Você" || item.owner === state.profile?.name);
  const active = state.items.filter((item) => item.status === "Ativo").length;
  const negotiated = state.items.filter((item) => item.status === "Negociado").length;

  els.dashboard.innerHTML = `
    <article class="dashboard-card">
      <span class="status-pill">Perfil</span>
      <h3 class="fs-5 fw-bold mt-3">${state.profile?.name || "Visitante"}</h3>
      <p class="text-secondary mb-0">${state.profile?.type || "Complete o cadastro para simular um usuário aprovado."}</p>
    </article>
    <article class="dashboard-card">
      <span class="status-pill">Anúncios</span>
      <h3 class="fs-5 fw-bold mt-3">${myItems.length} publicados por você</h3>
      <p class="text-secondary mb-0">${active} itens ativos na plataforma.</p>
    </article>
    <article class="dashboard-card">
      <span class="status-pill">Resultado</span>
      <h3 class="fs-5 fw-bold mt-3">${negotiated} negociados</h3>
      <p class="text-secondary mb-0">${currency.format(totalPaidBids())} em lances pagos simulados.</p>
    </article>
  `;
}

function totalPaidBids() {
  return state.items.flatMap((item) => item.bids).filter((bid) => bid.type === "pago").reduce((sum, bid) => sum + bid.value, 0);
}

export function showFormMessage(type, message) {
  els.formMessage.className = `alert alert-${type} mt-3`;
  els.formMessage.textContent = message;
}
