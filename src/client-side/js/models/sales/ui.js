import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
export const uiTable = (rows) => {
  const YMD = formatWaktuIndo(rows.SalesYMD);
  const rupiahProduct = formatRupiah2(rows.ProductPriceJual);
  const rupiahTotal = formatRupiah2(rows.SalesProductRp);
  const html = `<tr>
                    <td class="text-center text-truncate pe-3">
                      ${rows.SalesId}
                    </td>
                    <td class="text-truncate pe-3">
                      ${YMD}
                    </td>
                    <td class="text-truncate pe-3">${rows.SalesHMS}</td>
                    <td class="text-truncate pe-3">${rows.SalesPersonName}</td>
                    <td class="text-truncate pe-3">
                      ${rows.ProductName}
                    </td>
                    <td class="text-truncate pe-3">${rows.SalesProductQty}</td>
                    <td class="text-truncate pe-3">${rupiahProduct}</td>
                    <td class="text-truncate pe-3">${rupiahTotal}</td>
                    <td class="text-truncate pe-3">
                      ${rows.SalesCustomerName}
                    </td>
                    <td class="text-truncate pe-3">${rows.SalesStatus}</td>
                    <td class="text-truncate pe-3" style="width: 220px">
                      <div class="d-flex gap-1 justify-content-center align-items-center w-100 h-100">
                        <button class="btn btn-success">
                          <i class="fa-solid fa-eye fs-6"></i>
                        </button>
                        <button class="btn btn-primary">
                          <i class="fa-solid fa-pencil fs-6"></i>
                        </button>
                        <button class="btn btn-danger">
                          <i class="fa-solid fa-trash fs-6"></i>
                        </button>
                    </div>
                    </td>
                  </tr>`;
  return html;
};
export const uiBtnPage = (i) => {
  const btnHTML = `<button
                      type="button"
                      class="btn sales-page border border-2 fs-5 ${
                        i === 1 ? "sales-active-page" : ""
                      }">
                        ${i}
                   </button>`;
  return btnHTML;
};
export const uiTableEmpty = (searchVal) => {
  const html = `<div class="flex-shrink-0 text-center px-2 py-2 fst-italic fw-bold" style="background-color:#f2f2f2; width:1490px;">${searchVal} - not found</div>`;
  return html;
};
export const uiSuccess = (res) => {
  let alert = `<div class="alert alert-success" role="alert">${res}</div>`;
  $("div#sales-success-container").html(alert);
  setInterval(() => {
    $("div#sales-success-container").html(``);
  }, 20000);
};
export const uiReset = () => {};
