import { addAlert, addBid, cancelFirstActiveItem, createItem, finishItem, saveProfile, state } from "./store.js";
import { bindElements, fillSelectOptions, renderAlerts, renderDashboard, renderItemModal, renderItems, showFormMessage } from "./ui.js";

const els = bindElements();
fillSelectOptions();

const itemModal = new bootstrap.Modal(document.querySelector("#itemModal"));

function refreshAll() {
  renderItems(state.items);
  renderAlerts();
  renderDashboard();
}

document.querySelectorAll("#searchInput, #categoryFilter, #cityFilter, #statusFilter").forEach((field) => {
  field.addEventListener("input", () => renderItems(state.items));
});

els.itemsGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-open-item]");
  if (!button) return;
  renderItemModal(button.dataset.openItem);
  itemModal.show();
});

document.querySelector("#itemForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = readItemForm();
  const item = createItem(formData);
  event.target.reset();
  refreshAll();
  showFormMessage("success", `Anúncio "${item.title}" publicado com sucesso. Ele já aparece na busca e no painel.`);
  location.hash = "#itens";
});

document.querySelector("#previewAd").addEventListener("click", () => {
  const formData = readItemForm(false);
  if (!formData.title || !formData.category) {
    showFormMessage("warning", "Preencha pelo menos nome e categoria para gerar uma prévia.");
    return;
  }
  showFormMessage("info", `Prévia: ${formData.title} • ${formData.category} • ${formData.city || "cidade ainda não informada"}.`);
});

document.querySelector("#cancelOffer").addEventListener("click", () => {
  const item = cancelFirstActiveItem();
  if (!item) {
    showFormMessage("warning", "Não há anúncios ativos para cancelar.");
    return;
  }
  refreshAll();
  showFormMessage("danger", `O anúncio "${item.title}" foi cancelado e bloqueado para novas negociações.`);
});

document.querySelector("#bidForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const item = addBid(state.selectedItemId, {
    name: state.profile?.name || "Usuário visitante",
    type: document.querySelector("#bidType").value,
    value: Number(document.querySelector("#bidValue").value || 0)
  });

  if (!item) return;
  event.target.reset();
  renderItemModal(item.id);
  refreshAll();
});

document.querySelector("#finishDeal").addEventListener("click", () => {
  const result = finishItem(state.selectedItemId);
  refreshAll();
  renderItemModal(result.item.id);

  if (!result.winner) {
    alert("Prazo encerrado sem lances. O item foi cancelado sem acordo.");
    return;
  }

  alert(`Prazo encerrado. Oferta vencedora: ${result.winner.name}. Dono e vencedor foram notificados para confirmar os termos.`);
});

document.querySelector("#alertForm").addEventListener("submit", (event) => {
  event.preventDefault();
  addAlert({
    email: document.querySelector("#alertEmail").value,
    category: document.querySelector("#alertCategory").value,
    city: document.querySelector("#alertCity").value,
    radius: document.querySelector("#alertRadius").value
  });
  event.target.reset();
  refreshAll();
});

document.querySelector("#profileForm").addEventListener("submit", (event) => {
  event.preventDefault();
  saveProfile({
    name: document.querySelector("#profileName").value,
    type: document.querySelector("#profileType").value,
    email: document.querySelector("#profileEmail").value,
    phone: document.querySelector("#profilePhone").value,
    city: document.querySelector("#profileCity").value,
    interest: document.querySelector("#profileInterest").value
  });
  document.querySelector("#profileMessage").classList.remove("d-none");
  renderDashboard();
});

function readItemForm(requireValidity = true) {
  const form = document.querySelector("#itemForm");
  if (requireValidity && !form.reportValidity()) return null;

  return {
    title: document.querySelector("#title").value,
    category: document.querySelector("#category").value,
    quantity: document.querySelector("#quantity").value,
    condition: document.querySelector("#condition").value,
    duration: document.querySelector("#duration").value,
    description: document.querySelector("#description").value,
    city: document.querySelector("#city").value,
    neighborhood: document.querySelector("#neighborhood").value,
    distance: document.querySelector("#distance").value,
    address: document.querySelector("#address").value,
    pickupNotes: document.querySelector("#pickupNotes").value,
    imageUrl: document.querySelector("#imageUrl").value,
    preferredDeal: document.querySelector("#preferredDeal").value
  };
}

refreshAll();
