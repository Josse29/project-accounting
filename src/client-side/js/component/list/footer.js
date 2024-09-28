import { formatRupiah2 } from "../../utils/formatRupiah.js";
import {
  getStorageCart,
  getStorageCartSum,
  setStorageCartSum,
} from "../../utils/localStorage.js";
export const footer = () => {
  // get from storage and inserthtml
  const cartArray = getStorageCart();
  let totalRp = 0;
  if (cartArray.length >= 1) {
    cartArray.forEach((rows) => {
      totalRp += rows.ProductPriceSell * rows.ProductQty;
    });
  }
  setStorageCartSum(totalRp);
  const totalRp1 = getStorageCartSum();
  const numberRp = formatRupiah2(totalRp1);
  $("h5#order-list-total").text(numberRp);
};
