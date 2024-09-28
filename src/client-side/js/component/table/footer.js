import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { terbilangIndonesia } from "../../utils/formatTerbilang.js";
import {
  getStorageCart,
  getStorageCartSum,
  setStorageCartSum,
} from "../../utils/localStorage.js";
export const tFooter = () => {
  // get from storage again cart
  const cartArray = getStorageCart();
  let totalRp = 0;
  if (cartArray.length >= 1) {
    cartArray.forEach((rows) => {
      totalRp += rows.ProductPriceSell * rows.ProductQty;
    });
  }
  setStorageCartSum(totalRp);
  totalRp = getStorageCartSum();
  let terbilang = terbilangIndonesia(totalRp);
  let numberRp = formatRupiah2(totalRp);
  $("span#order-total-cart").text(formatRupiah2(totalRp));
  $("span#order-terbilang").text(`${terbilang} rupiah`);
  $("i#order-total-cart").text(numberRp);
};
