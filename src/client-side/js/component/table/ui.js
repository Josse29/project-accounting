import { formatRupiah2 } from "../../utils/formatPrice.js";

export const uiTr = (rows, noTd) => {
  const priceSellRp = formatRupiah2(rows.ProductPriceSell);
  const productTotal = formatRupiah2(rows.ProductPriceSell * rows.ProductQty);
  const tr = `<tr>
                  <td class="text-center">${noTd}</td>
                  <td>${rows.ProductName}</td>
                  <td>
                      ${priceSellRp}
                  </td>
                  <td>+ ${rows.ProductQty}</td>
                  <td>${productTotal}</td>
              </tr>`;
  return tr;
};
export const uiTrZero = () => {
  const tr = `<tr>
                <td colspan="5" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">order is still empty....</td>
              </tr>`;
  return tr;
};
