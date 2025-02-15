import { formatRupiah2 } from "../../utils/formatPrice.js";

export const uiList = (rows) => {
  const rupiahTotal = formatRupiah2(rows.ProductPriceSell * rows.ProductQty);
  const div = `
  <div class="py-2 px-1">
    <h5 class="fw-bold text-truncate w-100" id="order-list-name">
      ${rows.ProductName}
    </h5>
    <h6 class="text-muted text-truncate" id="order-list-price">${rupiahTotal}</h6>
    <div class="text-muted ms-2">Qty : <span>${rows.ProductQty}</span></div>
  </div>
  `;
  return div;
};
export const uiListZero = () => {
  const div = `
  <div class="d-flex justify-content-center align-items-center h-100">
    <p class="fst-italic text-muted fs-4">orders empty...</p>
  </div>
  `;
  return div;
};
