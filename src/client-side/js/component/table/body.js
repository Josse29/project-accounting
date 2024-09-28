import { getStorageCart } from "../../utils/localStorage.js";
import { uiTr, uiTrZero } from "./ui.js";

export const tBody = () => {
  // get from storage again cart
  const cartArray = getStorageCart();
  let tr = ``;
  let noTd = 1;
  if (cartArray.length >= 1) {
    cartArray.forEach((rows) => {
      tr += uiTr(rows, noTd);
      noTd++;
    });
  }
  if (cartArray.length < 1) {
    tr = uiTrZero();
  }
  // tbody
  $("tbody#orders-done").html(tr);
};
