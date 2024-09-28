import { getStorageCart } from "../../utils/localStorage.js";
import { uiList, uiListZero } from "./ui.js";
export const body = () => {
  // get from storage and inserthtml
  const cartArray = getStorageCart();
  let list = ``;
  if (cartArray.length >= 1) {
    cartArray.forEach((rows) => {
      list += uiList(rows);
    });
  }
  if (cartArray.length < 1) {
    list = uiListZero();
  }
  $("div#order-list").html(list);
  // event scroll
  let orderListElement = document.getElementById("order-list");
  orderListElement.scrollTop = orderListElement.scrollHeight;
};
