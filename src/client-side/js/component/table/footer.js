import { formatRupiah2 } from "../../utils/formatPrice.js";
import { terbilangIndonesia } from "../../utils/formatNumberWord.js";
import { getStorageCartSum } from "../../utils/localStorage.js";
export const tFooter = () => {
  // get from storage again cart
  const totalRp = getStorageCartSum();
  const terbilang = terbilangIndonesia(totalRp);
  const numberRp = formatRupiah2(totalRp);
  $("span#order-total-cart").text(formatRupiah2(totalRp));
  $("span#order-terbilang").text(`${terbilang}`);
  $("i#order-total-cart").text(numberRp);
};
