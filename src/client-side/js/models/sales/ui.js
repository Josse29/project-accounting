import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
export const uiTBody = (sales) => {
  let tr = ``;
  sales.forEach((el) => {
    const YMD = formatWaktuIndo(el.SalesYMD);
    const rupiahProduct = formatRupiah2(el.ProductPriceJual);
    const rupiahTotal = formatRupiah2(el.SalesProductRp);
    tr += `<tr>
            <td class="text-center text-truncate pe-3 align-content-center">
              ${el.SalesId}
            </td>
            <td class="text-truncate pe-3 align-content-center">
              ${YMD}
            </td>
            <td class="text-truncate pe-3 align-content-center">${el.SalesHMS}</td>
            <td class="text-truncate pe-3 align-content-center text-capitalize">${el.SalesPersonName}</td>
            <td class="text-truncate pe-3 align-content-center text-capitalize">
              ${el.ProductName}
            </td>
            <td class="text-truncate pe-3 align-content-center">${rupiahProduct}</td>
            <td class="text-truncate pe-3 align-content-center text-center">${el.SalesProductQty}</td>
            <td class="text-truncate pe-3 align-content-center">${rupiahTotal}</td>
            <td class="text-truncate pe-3 align-content-center text-capitalize">
              ${el.SalesCustomerName}
            </td>
            <td class="text-truncate pe-3 align-content-center text-center">${el.SalesStatus}</td>
              <td class="text-truncate pe-3 align-content-center" style="width: 220px">
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
  });
  $("tbody#sales-read-table").html(tr);
};
export const uiTrEmpty = (searchVal) => {
  let search = `sales empty....`;
  if (searchVal !== "") {
    search = `${searchVal} - not found`;
  }
  const tr = `<tr>
                <td class="text-center fst-italic" colspan="11">${search}</td>
              </tr>`;
  $("tbody#sales-read-table").html(tr);
};
export const uiBtnPage = (i) => {
  const btn = `<button
                      type="button"
                      class="btn sales-page border border-2 fs-5 ${
                        i === 1 ? "sales-active-page" : ""
                      }">
                        ${i}
                   </button>`;
  return btn;
};
export const uiBtnPageActive = (pageNumber) => {
  const btnPage = $("button.sales-page");
  btnPage.removeClass("sales-active-page");
  btnPage.eq(pageNumber - 1).addClass("sales-active-page");
};
export const uiSuccess = (res) => {
  const alert = `
  <div
      class="alert alert-success alert-dismissible fade show text-start"
      role="alert"
    >
      <strong class="text-capitalize">${res}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
  </div>`;
  $("div#sales-success-container").html(alert);
};
export const uiReset = () => {
  // reset search
  $("input#sales-read-search").val("");
  // summary
  $("div#summary").html(``);
  // limit-search
  $("div#sales-limit-search").removeClass("d-none");
  // input date
  $("div#sales-date").removeClass("d-none");
  // select option
  $("select#sales-read-productid").val("Choose One Of Products");
  $("select#sales-read-personid").val("Choose One Of Sales");
  $("select#sales-read-customerid").val("Choose One Of Customers");
  $("div#sales-select").removeClass("d-none");
  // select with date
  $("div#sales-select-date").addClass("d-none");
};
export const uiLoad = () => {
  const tr = `<tr>
                <td colspan="11" class="text-center fst-italic fw-bold">
                  loading....
                </td>
              </tr>`;
  $("tbody#sales-read-table").html(tr);
};
