import { formatPrice, formatRupiah2 } from "../../utils/formatPrice.js";
import formatQty from "../../utils/formatQty.js";
import { formatWaktuIndo, timeIndonesian } from "../../utils/formatTime.js";

const uiTbody = (sale) => {
  let tr = ``;
  sale.forEach((el) => {
    const stockId = el.StockId;
    const stockDate = el.StockDate;
    const stockTime = el.StockTime;
    const productName = el.ProductName;
    const productPriceSell = el.ProductPriceSell;
    const stockQty = el.StockQty;
    const saleBalance = el.SaleBalance;
    const saleName = el.SaleName;
    const customerName = el.CustomerName;

    const spanColor = stockQty > 1 ? "text-bg-success" : "text-bg-danger";
    tr += `
    <tr>
      <td class="text-center text-truncate pe-3 align-content-center">
        ${stockId}
      </td>
      <td class="text-truncate pe-3 align-content-center">
        ${formatWaktuIndo(stockDate)}
      </td>
      <td class="text-truncate pe-3 align-content-center">${stockTime}</td>
      <td class="text-truncate pe-3 align-content-center text-capitalize">
        ${saleName}
      </td>
      <td class="text-truncate pe-3 align-content-center text-capitalize">
        ${productName}
      </td>
      <td class="text-truncate pe-3 align-content-center">
        ${formatRupiah2(productPriceSell)}
      </td>
      <td class="text-truncate pe-3 align-content-center">
        <span
          class="badge fs-6 text-truncate ${spanColor} d-block mx-auto"
          style="max-width:max-content">
          ${formatQty(stockQty)}
        </span>
      </td>
      <td class="text-truncate pe-3 align-content-center">
        <span
          class="badge fs-6 text-truncate ${spanColor} d-block mx-auto"
          style="max-width:max-content">
          ${formatPrice(saleBalance)}
        </span>
      </td>
      <td class="text-truncate pe-3 align-content-center text-capitalize">
        ${customerName}
      </td>
    </tr>
    `;
  });
  $("tbody#sales-read-table").html(tr);
};
const uiTbodyEmpty = (searchVal) => {
  let search = `sales empty....`;
  if (searchVal !== "") {
    search = `${searchVal} - not found`;
  }
  const tr = `<tr>
                <td class="text-center fst-italic fw-bold text-capitalize" colspan="11">${search}</td>
              </tr>`;
  $("tbody#sales-read-table").html(tr);
  $("div#sales-page-container").addClass("d-none");
};
const uiBtnPage = (totalPage) => {
  let btn = ``;
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 ? "sales-active-page" : "";
    btn += `<button
              type="button"
              class="btn sales-page border border-2 fs-5 ${actived}">
                ${i}
           </button>`;
  }
  $("div#sales-read-numberpage").html(btn);
  $("div#sales-page-container").removeClass("d-none");
};
const uiBtnPageActive = (pageNumber) => {
  const btnPage = $("button.sales-page");
  btnPage.removeClass("sales-active-page");
  btnPage.eq(pageNumber - 1).addClass("sales-active-page");
};
const uiSuccess = (res) => {
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
  </div>
  `;
  $("div#sales-card-body div.alert-section").html(alert);
};
const uiFailed = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("div#modal-sales-convert-csv #failed").html(alert);
};
const uiFailed1 = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("#modal-sales-convert-pdf #failed").html(alert);
};
const uiFailed2 = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("div#sales-card-body div.alert-section").html(alert);
};
const uiReset = () => {
  // reset search  & date
  $("input#sales-read-search").val("");
  $("input#sales-read-startDate").val("");
  $("input#sales-read-endDate").val("");
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
const uiLoad = () => {
  const tr = `
  <tr>
    <td colspan="11" class="text-center fst-italic fw-bold">loading....</td>
  </tr>
  `;
  $("tbody#sales-read-table").html(tr);
  $("div#sales-page-container").addClass("d-none");
};
const uiPDF = (Sale, SalesGroup1, SaleQty, SaleBalance, ProductGroup) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  const div = `
  <div class="mb-3">
    <h3>Table Sales</h3>
    <h6>${indonesiaDDMY}</h6>
    <div class="d-flex gap-1">
      <h6>${indonesiaHour} :</h6>
      <h6>${indonesiaMinute}</h6>
      <h6>${indonesiaSecond}</h6>
    </div>
  </div>
  `;
  // 1. table sales
  let tbody = ``;
  let no = 1;
  for (const row of Sale) {
    const saleDate = row.SaleDate;
    const saleName = row.SaleName;
    const productName = row.ProductName;
    const productPriceSell = row.ProductPriceSell;
    const saleQty = row.SaleQty;
    const saleBalance = row.SaleBalance;
    tbody += `
    <tr>
      <td class="text-wrap align-content-center text-center">${no++}</td>
      <td class="text-wrap align-content-center text-capitalize">
        ${saleDate}
      </td>
      <td class="text-wrap align-content-center text-capitalize">
        ${saleName}
      </td>
      <td class="text-wrap align-content-center text-capitalize">
        ${productName}
      </td>
      <td class="text-wrap align-content-center text-capitalize">
        ${formatRupiah2(productPriceSell)}
      </td>
      <td class="text-wrap align-content-center text-center">
        ${formatQty(saleQty)}
      </td>
      <td class="text-wrap align-content-center">
        ${formatRupiah2(saleBalance)}
      </td>
    </tr>    
    `;
  }
  const div1 = `
  <div class="mb-3">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Date</th>
          <th>Sales</th>
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
          <th colspan="5" class="text-end me-2">Total</th>
          <th class="text-center">${formatQty(SaleQty)}</th>
          <th>${formatRupiah2(SaleBalance)}</th>
        </tr>
      </tfoot>
    </table>
  </div>
  `;
  // 2. table Salesname
  let div2 = ``;
  for (const el of SalesGroup1) {
    const salesName = el.SaleName;
    const saleQty = el.SaleQty;
    const saleBalance = el.SaleBalance;
    const saleRecap = el.SaleRecap;
    let no = 1;
    let tbody = ``;
    const existed = saleRecap.length >= 1;
    if (existed) {
      for (const el of saleRecap) {
        const saleDate = el.SaleDate;
        const productName = el.ProductName;
        const productPriceSell = el.ProductPriceSell;
        const saleQty = el.SaleQty;
        const saleBalance = el.SaleBalance;
        tbody += `
        <tr>
          <td class="text-wrap align-content-center text-center">${no++}</td>
          <td class="text-wrap align-content-center text-capitalize">
            ${saleDate}
          </td>
          <td class="text-wrap align-content-center text-capitalize">
            ${productName}
          </td>
          <td class="text-wrap align-content-center">
            ${formatRupiah2(productPriceSell)}
          </td>
          <td class="text-wrap align-content-center text-center">
            ${formatQty(saleQty)}
          </td>
          <td class="text-wrap align-content-center">
            ${formatRupiah2(saleBalance)}
          </td>
        </tr>    
      `;
      }
    } else {
      tbody += `
      <tr>
        <td class="text-wrap align-content-center text-center fst-italic" colspan="6">No Sales.....</td>
      </tr> 
      `;
    }
    div2 += `
    <div class="mb-3">
      <h4>Sales of ${salesName}</h4>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
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
            <th class="text-end me-2" colspan="4">Total</th>
            <th class="text-center">${formatQty(saleQty)}</th>
            <th>${formatRupiah2(saleBalance)}</th>
          </tr>
        </tfoot>
      </table>
    </div> 
    `;
  }
  // 3. productGroup
  let tbody2 = "";
  let no2 = 1;
  for (const rows of ProductGroup) {
    const productName = rows.ProductName;
    const productPriceSell = rows.ProductPriceSell;
    const saleQty = rows.SaleQty;
    const saleBalance = rows.SaleBalance;
    tbody2 += `
    <tr>
      <td class="text-center text-nowrap align-content-center">${no2++}</td>
      <td class="text-nowrap align-content-center">${productName}</td>
      <td class="text-nowrap align-content-center">
        ${formatRupiah2(productPriceSell)}
      </td>
      <td class="text-center text-nowrap align-content-center">
        ${formatQty(saleQty)}
      </td>
      <td class="text-nowrap align-content-center">
        ${formatPrice(saleBalance)}
      </td>
    </tr>
    `;
  }
  const div3 = `
  <div class="mb-3">
    <h4>Summary Of Product</h4>
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="text-center">#</th>
          <th>Product</th>
          <th>Price</th>
          <th class="text-center">Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${tbody2}
      </tbody>
      <tfoot>
        <tr>
          <th colspan="3" class="text-end me-2">Total</th>
          <th class="text-center">${formatQty(SaleQty)}</th>
          <th>${formatPrice(SaleBalance)}</th>
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
        style="background-color: #273eec">
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">
        ${div}
        ${div1}
        ${div2}
        ${div3}
      </div>
    </div>
  </div>`;
  return html;
};
export {
  uiBtnPage,
  uiBtnPageActive,
  uiFailed,
  uiFailed1,
  uiFailed2,
  uiLoad,
  uiPDF,
  uiReset,
  uiSuccess,
  uiTbody,
  uiTbodyEmpty,
};
