import formatQty from "../../utils/formatQty.js";
import { formatPrice, formatRupiah2 } from "../../utils/formatPrice.js";
import { formatWaktuIndo, timeIndonesian } from "../../utils/formatTime.js";

// ui tr inventory from db
const uiTbody = (response) => {
  let tr = ``;
  response.forEach((el) => {
    const stockId = el.StockId;
    const stockDate = el.StockDate;
    const stockTime = el.StockTime;
    const productName = el.ProductName;
    const productPriceBuy = el.ProductPriceBuy;
    const supplierName = el.UserFullname !== null ? el.UserFullname : "-";
    const stockQty = el.StockQty;
    const stockBalance = el.StockBalance;
    const spanColor = stockQty >= 1 ? "text-bg-success" : "text-bg-danger";
    tr += `
    <tr
      data-stockid="${stockId}"
      data-stockdate="${stockDate}"
      data-stocktime="${stockTime}"
    >
      <td class="align-content-center text-center pe-3 text-truncate">
        ${stockId}
      </td>
      <td class="align-content-center pe-3 text-truncate">
        ${formatWaktuIndo(stockDate)}
      </td>
      <td class="align-content-center pe-3 text-truncate">
        ${stockTime}
      </td>
      <td class="align-content-center text-truncate text-capitalize pe-3">
        ${productName}
      </td>
      <td class="align-content-center text-truncate pe-3">
        ${formatRupiah2(productPriceBuy)} 
      </td>
      <td class="align-content-center">
        <span
          class="badge fs-6 text-truncate ${spanColor} d-block mx-auto"
          style="max-width:max-content"
          >${formatQty(stockQty)}</span>
      </td>
      <td class="align-content-center">
        <span
          class="badge fs-6 text-truncate ${spanColor} d-block mx-auto"
          style="max-width:max-content">
          ${formatPrice(stockBalance)}
        </span>
      </td>
    </tr>`;
  });
  $("tbody#persediaan-table").html(tr);
};
// make alert success after action crud
const uiAlertSuccess = (res) => {
  const alertSuccess = `
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
  </div>
  `;
  $("#section-alert").html(alertSuccess);
};
const uiAlertFail = (res) => {
  const alert = `
  <div
    class="alert alert-danger alert-dismissible fade show text-start"
    role="alert"
  >
    <strong class="text-capitalize">${res}</strong>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
  `;
  $("#persediaan-modal-convert-csv #failed").html(alert);
};
const uiAlertFail1 = (res) => {
  const alert = `
  <div
    class="alert alert-danger alert-dismissible fade show text-start"
    role="alert"
  >
    <strong class="text-capitalize">${res}</strong>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
  `;
  $("#persediaan-modal-convert-pdf #failed").html(alert);
};
const uiAlertFailCreate = (res) => {
  const alertFailed = `<div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
                            <strong class="text-capitalize">${res}</strong>
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
  $("#sectionFailedActionPersediaan").html(alertFailed);
  $("#section-alert").html("");
};
const uiAlertFailUpdate = (res) => {
  const alertFailed = `<div class="alert alert-danger alert-dismissible fade show text-start my-2" role="alert">
                            <strong class="text-capitalize">${res}</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`;
  $("#persediaan-update-failed").html(alertFailed);
  $("#section-alert").html("");
};
const uiAlertFailDelete = (res) => {
  const alertFailed = `<div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
                            <strong class="text-capitalize">${res}</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`;
  $("#persediaan-delete-failed").html(alertFailed);
  $("#section-alert").html("");
};
// button pagination
const uiBtnPage = (totalPage) => {
  let btn = "";
  for (let i = 1; i <= totalPage; i++) {
    const active = i === 1 ? "persediaan-active-page" : "";
    btn += `<button type="button" 
                    class="persediaan-btn-page ${active}">
              ${i}
            </button>`;
  }
  $("#persediaan-number-page").html(btn);
  $("#persediaan-pagination").removeClass("d-none");
};
// Function to update active page button
const uiBtnPageActive = (activePage) => {
  const btnPage = $("button.persediaan-btn-page");
  $(btnPage).removeClass("persediaan-active-page");
  $(btnPage)
    .eq(activePage - 1)
    .addClass("persediaan-active-page");
};
// when total row 0 being seaching
const uiTbodyEmpty = (searchVal) => {
  let search = `Stock Empty...`;
  if (searchVal !== "") {
    search = `${searchVal} Not Found ....`;
  }
  const tr = `
  <tr>
    <td
      colspan="10"
      class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize"
      style="background-color: #f2f2f2"
    >
      ${search}
    </td>
  </tr>
  `;
  $("tbody#persediaan-table").html(tr);
  $("#persediaan-pagination").addClass("d-none");
};
const uiTbodyLoad = () => {
  const tr = `
  <tr>
    <td
      colspan="10"
      class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize"
      style="background-color: #f2f2f2"
    >
      loading...
    </td>
  </tr>
  `;
  $("tbody#persediaan-table").html(tr);
  $("#persediaan-pagination").addClass("d-none");
};
// blank value after submit action
const uiBlankValue = () => {
  $("select#persediaan-refproduct-search-name").val("Choose One Of Products");
  $("input#persediaan-create-qty").val(0);
  $("textarea#persediaan-create-info").val("");
};
const uiSumPersediaanDate = () => {
  $("#persediaanLimitSearch").addClass("d-none");
  $("#persediaanList").addClass("d-none");
};
const uiInit = () => {
  // reset - search
  $("input#persediaan-search").val("");
  $("#persediaanLimitSearch").removeClass("d-none");
  // reset all select
  $("select#persediaan-refproduct-search").val("Choose One Of Products");
  $("select#persediaan-refsupplier-search").val("Choose One Of Suppliers");
  $("select#persediaan-refcategory-search").val("Choose One Of Categories");
  $("#persediaanList").removeClass("d-none");
  //r emove mode date
  $("div#persediaan-date-all-search").html(``);
  // remove mode summary
  $("div#persediaan-sum-section").html("");
};
// for - report
const uiPDF = (Stock, GroupProduct, StockQty, StockBalance) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  const div = `
  <div class="mb-3">
    <h2>Table Stock</h2>
    <h6>${indonesiaDDMY}</h6>
    <div class="d-flex gap-1">
      <h6>${indonesiaHour} :</h6>
      <h6>${indonesiaMinute} :</h6>
      <h6>${indonesiaSecond}</h6>
    </div>
  </div>
  `;
  // 1.table persediaan
  let tbody = "";
  let no = 1;
  for (const rows of Stock) {
    const stockDate = rows.StockDate;
    const productName = rows.ProductName;
    const productPriceBuy = rows.ProductPriceBuy;
    const stockQty = rows.StockQty;
    const stockBalance = rows.StockBalance;
    tbody += `
    <tr>
      <td class="text-center text-nowrap align-content-center">${no++}</td>
      <td class="text-nowrap align-content-center">
        ${stockDate}
      </td>
      <td class="text-nowrap align-content-center">${productName}</td>
      <td class="text-nowrap align-content-center">
        ${formatRupiah2(productPriceBuy)}
      </td>
      <td class="text-nowrap align-content-center">
        ${formatQty(stockQty)}
      </td>
      <td class="text-nowrap align-content-center">
        ${formatPrice(stockBalance)}
      </td>
    </tr>
    `;
  }
  const div1 = `
  <div class="mb-3">
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="text-center">#</th>
          <th>Date</th>
          <th>Product</th>
          <th>Price</th>
          <th class="text-center">Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${tbody}
      </tbody>
      <tfoot>
        <tr>
          <th colspan="4" class="text-end me-2">Total</th>
          <th class="text-center">${formatQty(StockQty)}</th>
          <th>${formatPrice(StockBalance)}</th>
        </tr>
      </tfoot>
    </table>
  </div>
  `;
  // 2. group product
  let tbody1 = "";
  let no1 = 1;
  for (const rows of GroupProduct) {
    const productName = rows.ProductName;
    const productPriceBuy = rows.ProductPriceBuy;
    const stockQty = rows.StockQty;
    const stockBalance = rows.StockBalance;
    tbody1 += `
    <tr>
      <td class="text-center text-nowrap align-content-center">${no1++}</td>
      <td class="text-nowrap align-content-center">${productName}</td>
      <td class="text-nowrap align-content-center">
        ${formatRupiah2(productPriceBuy)}
      </td>
      <td class="text-center text-nowrap align-content-center">
        ${formatQty(stockQty)}
      </td>
      <td class="text-nowrap align-content-center">
        ${formatPrice(stockBalance)}
      </td>
    </tr>
    `;
  }
  const div2 = `
  <div class="mb-3">
    <h4>Table Summary of Stock</h4>
    <table class="table table-striped w-auto">
      <thead>
        <tr>
          <th class="text-center">No</th>
          <th>Product</th>
          <th>Price</th>
          <th class="text-center">Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${tbody1}
      </tbody>      
      <tfoot>
        <tr>
          <th colspan="3" class="text-end me-2">Total</th>
          <th class="text-center">${formatQty(StockQty)}</th>
          <th>${formatPrice(StockBalance)}</th>
        </tr>
      </tfoot>
    </table>
  </div>
  `;
  const html = `
  <div class="d-flex justify-content-center">
    <div class="card my-2 w-100">
      <!--  cardheader -->
      <div
        class="card-header text-center text-white fs-3"
        style="background-color: #273eec"
      >
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">
        ${div} 
        ${div1} 
        ${div2} 
      </div>
    </div>
  </div>          
  `;
  return html;
};
// update ui Active
const uiBtnPageActive1 = (pageNumber) => {
  const btnPage = $("button.product-ref-persediaan-page");
  btnPage.removeClass("product-ref-persediaan-page-active");
  btnPage.eq(pageNumber - 1).addClass("product-ref-persediaan-page-active");
};
const uiAlertFailed = (res) => {
  const alertFailed = `
  <div
    class="alert alert-danger alert-dismissible fade show text-start"
    role="alert"
  >
    <strong class="text-capitalize">${res}</strong>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
  `;
  $("#section-alert").html(alertFailed);
};
export {
  uiAlertFail,
  uiAlertFail1,
  uiAlertFailCreate,
  uiAlertFailDelete,
  uiAlertFailed,
  uiAlertFailUpdate,
  uiAlertSuccess,
  uiBlankValue,
  uiBtnPage,
  uiBtnPageActive,
  uiBtnPageActive1,
  uiInit,
  uiPDF,
  uiSumPersediaanDate,
  uiTbody,
  uiTbodyEmpty,
  uiTbodyLoad,
};
