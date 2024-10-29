import { getStorageCart } from "../../utils/localStorage.js";

export const uiQty = () => {
  const cartStorage = getStorageCart();
  for (const item of cartStorage) {
    const productCard = $(`div.card-body[data-productid=${item.ProductId}]`);
    const productQty = item.ProductQty;
    let qtyDiv = ``;
    if (productQty >= 1) {
      qtyDiv = `<div class='custome-qty-me ms-2'>${productQty}</div>`;
    }
    if (productQty < 1) {
      qtyDiv = ``;
    }
    productCard.find("#order-create-qty").html(qtyDiv);
  }
};
