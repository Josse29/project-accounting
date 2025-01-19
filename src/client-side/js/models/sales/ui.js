import { formatRupiah2 } from "../../utils/formatPrice.js";
import { formatWaktuIndo, timeIndonesian } from "../../utils/formatTime.js";

export const uiTbody = (sales) => {
  let tr = ``;
  sales.forEach((el) => {
    const saleId = el.SalesId;
    const YMD = formatWaktuIndo(el.SalesYMD);
    const saleHMS = el.SalesHMS;
    const salesPersonName = el.SalesPersonName;
    const productName = el.ProductName;
    const productQty = el.SalesProductQty;
    const customerSaleName = el.SalesCustomerName;
    const salesStatus = el.SalesStatus;
    const rupiahProduct = formatRupiah2(el.ProductPriceSell);
    const rupiahTotal = formatRupiah2(el.SalesProductRp);
    tr += `
    <tr>
      <td class="text-center text-truncate pe-3 align-content-center">
        ${saleId}
      </td>
      <td class="text-truncate pe-3 align-content-center">${YMD}</td>
      <td class="text-truncate pe-3 align-content-center">${saleHMS}</td>
      <td class="text-truncate pe-3 align-content-center text-capitalize">
        ${salesPersonName}
      </td>
      <td class="text-truncate pe-3 align-content-center text-capitalize">
        ${productName}
      </td>
      <td class="text-truncate pe-3 align-content-center">${rupiahProduct}</td>
      <td class="text-truncate pe-3 align-content-center text-center">
        ${productQty}
      </td>
      <td class="text-truncate pe-3 align-content-center">${rupiahTotal}</td>
      <td class="text-truncate pe-3 align-content-center text-capitalize">
        ${customerSaleName}
      </td>
      <td class="text-truncate pe-3 align-content-center text-center">
        ${salesStatus}
      </td>
      <td class="text-truncate pe-3 align-content-center" style="width: 220px">
        <div
          class="d-flex gap-1 justify-content-center align-items-center w-100 h-100"
        >
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
    </tr>
    `;
  });
  $("tbody#sales-read-table").html(tr);
};
export const uiTbodyEmpty = (searchVal) => {
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
export const uiBtnPage = (totalPage) => {
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
  </div>
  `;
  $("div#sales-success-container").html(alert);
};
export const uiFailed = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("div#modal-sales-convert-csv #failed").html(alert);
};
export const uiFailed1 = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("#modal-sales-convert-pdf #failed").html(alert);
};
export const uiFailed2 = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("div#sales-card-body div.failed").html(alert);
};
export const uiReset = () => {
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
export const uiLoad = () => {
  const tr = `
  <tr>
    <td colspan="11" class="text-center fst-italic fw-bold">loading....</td>
  </tr>
  `;
  $("tbody#sales-read-table").html(tr);
  $("div#sales-page-container").addClass("d-none");
};
export const uiPDF = (
  response,
  getTotal,
  salesGroup,
  productGroup,
  customerGroup
) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  const html1 = `
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
  response.forEach((row) => {
    const salesName = row.SalesPersonName;
    const productName = row.ProductName;
    const productPrice = formatRupiah2(row.PriceSell);
    const productQty = row.Qty;
    const salesTotal = formatRupiah2(row.Total);
    tbody += `
    <tr>
      <td class="text-wrap align-content-center text-capitalize">${no++}</td>
      <td class="text-wrap align-content-center text-capitalize">
        ${salesName}
      </td>
      <td class="text-wrap align-content-center text-capitalize">
        ${productName}
      </td>
      <td class="text-wrap align-content-center">
        ${productPrice}
      </td>
      <td class="text-wrap align-content-center text-center">${productQty}</td>
      <td class="text-wrap align-content-center">${salesTotal}</td>
    </tr>    
    `;
  });
  const { totalQty, totalRp } = getTotal;
  const html2 = `
  <div class="mb-3">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>No</th>
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
          <th colspan="4" class="text-end me-2">Total</th>
          <th class="text-center">${totalQty}</th>
          <th>${formatRupiah2(totalRp)}</th>
        </tr>
      </tfoot>
    </table>
  </div>
  `;
  // 2. table Salesname
  let no1 = 1;
  let tbody1 = ``;
  salesGroup.forEach((el) => {
    const salesName = el.UserFullname;
    const salesTotal = formatRupiah2(el.Sales_Total);
    tbody1 += `
    <tr>
      <td>${no1++}</td>
      <td class="text-capitalize">${salesName}</td>
      <td>${salesTotal}</td>
    </tr>
    `;
  });
  const html3 = `
  <div class="mb-3">
    <h4>Table Summary of Sales</h4>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Sales</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${tbody1}
      </tbody>
    </table>
  </div>
  `;
  // 3. table product
  let no2 = 1;
  let tbody2 = ``;
  productGroup.forEach((el) => {
    const productName = el.ProductName;
    const productPriceSell = el.ProductPriceSell;
    const salesQty = el.Sales_Qty;
    const salesTotal = el.Sales_Total;
    tbody2 += `
    <tr>
      <td>${no2++}</td>
      <td>${productName}</td>
      <td>${formatRupiah2(productPriceSell)}</td>
      <td>${salesQty}</td>
      <td>${formatRupiah2(salesTotal)}</td>
    </tr>
    `;
  });
  const html4 = `
  <div class="mb-3">
    <h4>Table Summary Of Product</h4>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Product</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${tbody2}
      </tbody>
    </table>
  </div>
  `;
  // 4. tabel customer
  let tbody3 = ``;
  let no3 = 1;
  customerGroup.forEach((el) => {
    const customerName = el.UserFullname;
    const totalSales = el.Sales_Total;
    tbody3 += `
    <tr>
      <td>${no3++}</td>
      <td>${customerName}</td>
      <td>${formatRupiah2(totalSales)}</td>
    </tr>
    `;
  });
  const html5 = `
  <div class="mb-3">
    <h4>Table Of Customer</h4>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Customer</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${tbody3}
      </tbody>
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
        ${html1}
        ${html2}
        ${html3}
        ${html4}
        ${html5}
      </div>
    </div>
  </div>`;
  return html;
};
export const uiSummary = (rupiah, startDateVal, endDateVal) => {
  const date = `
  ${formatWaktuIndo(startDateVal)} - ${formatWaktuIndo(endDateVal)}`;
  const price = rupiah !== "" ? formatRupiah2(rupiah) : formatRupiah2(0);
  const p = `
  <p class="fs-5 mb-1 fw-bold text-capitalize">${date}</p>
  <p class="fs-5 ms-1 mb-1">Total : ${price}</p> `;
  $("div#summary").html(p);
};
