import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
export const uiTable = (rows, index) => {
  const bg = index % 2 === 0 ? "#fffff" : "#f2f2f2";
  const YMD = formatWaktuIndo(rows.SalesYMD);
  const rupiah = formatRupiah2(rows.SalesProductRp);
  const rupiah1 = formatRupiah2(rows.SalesProductRp);
  return `<div class="d-flex">
                <div
                  style="
                    width: 220px;
                    background-color: ${bg};
                    border-bottom: 3px solid #f2f2f2;
                  "
                  class="flex-shrink-0 align-content-center px-2 py-2"
                >
                  ${YMD}
                </div>
                <div
                  style="
                    width: 100px;
                    background-color: ${bg};
                    border-bottom: 3px solid #f2f2f2;
                  "
                  class="flex-shrink-0 align-content-center px-2 py-2"
                >
                  ${rows.SalesHMS}
                </div>
                <div
                  style="
                    width: 150px;
                    background-color: ${bg};
                    border-bottom: 3px solid #f2f2f2;
                  "
                  id="sales-read-salespersonname"
                  class="pe-4 align-content-center flex-shrink-0 py-2 text-truncate text-capitalize"
                >
                  ${rows.SalesPersonName} 
                </div> 
                <div
                  style="
                    width: 180px;
                    background-color: ${bg};
                    border-bottom: 3px solid #f2f2f2;
                  "
                  class="pe-4 align-content-center flex-shrink-0 py-2 text-truncate"
                  id="sales-read-salesproductname"
                >
                  ${rows.ProductName}
                </div>
                <div
                  style="
                    width: 150px;
                    background-color: ${bg};
                    border-bottom: 3px solid #f2f2f2;
                  "
                  class="pe-4 align-content-center flex-shrink-0 py-2 text-truncate"
                  id="sales-read-rupiah"
                >
                  ${rupiah}
                </div>
                <div
                  style="
                    width: 70px;
                    background-color: ${bg};
                    border-bottom: 3px solid #f2f2f2;
                  "
                  class="align-content-center flex-shrink-0 py-2"
                >
                  + ${rows.SalesProductQty}
                </div>
                <div
                  style="
                    width: 150px;
                    background-color: ${bg};
                    border-bottom: 3px solid #f2f2f2;
                  "
                  class="pe-4 align-content-center flex-shrink-0 py-2 text-truncate"
                  id="sales-read-rupiah1"
                >
                  ${rupiah1}
                </div>
                <div
                id="sales-read-salescustomername"
                  style="
                    width: 150px;
                    background-color: ${bg};
                    border-bottom: 3px solid #f2f2f2;
                  "
                  class="pe-4 align-content-center flex-shrink-0 py-2 text-truncate text-capitalize"
                >
                  ${rows.SalesCustomerName} 
                </div>
                <div
                  style="
                    width: 120px;
                    background-color: ${bg};
                    border-bottom: 3px solid #f2f2f2;
                  "
                  class="text-center align-content-center flex-shrink-0 py-2"
                >
                  <span class="badge text-bg-success fs-6" style="letter-spacing: 2px">${rows.SalesStatus}</span>
                </div>
                <div
                  style="
                    width: 200px;
                    background-color: ${bg};
                    border-bottom: 3px solid #f2f2f2;
                  "
                  class="flex-shrink-0 py-2"
                >
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
                </div>
              </div>`;
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
