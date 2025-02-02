import formatQty from "../../utils/formatQty.js";
import { formatPrice, formatRupiah2 } from "../../utils/formatPrice.js";
import { formatWaktuIndo, timeIndonesian } from "../../utils/formatTime.js";

// ui tr inventory from db
export const uiTbody = (response) => {
  let tr = ``;
  response.forEach((el) => {
    const persediaanId = parseInt(el.PersediaanId);
    const persediaanDDMY = formatWaktuIndo(el.PersediaanDDMY);
    const persediaanHMS = el.PersediaanHMS;
    const persediaanInfo = el.PersediaanInfo !== "" ? el.PersediaanInfo : "-";
    const productId = el.ProductId;
    const productName = el.ProductName;
    const supplierName = el.UserFullname !== null ? el.UserFullname : "-";
    const categoryName = el.CategoryName !== null ? el.CategoryName : "-";
    const persediaanQty = el.PersediaanQty;
    const persediaanRp = formatPrice(el.PersediaanRp);
    const spanColor = persediaanQty >= 1 ? "text-bg-success" : "text-bg-danger";
    tr += `
    <tr
      data-persediaanid="${persediaanId}"
      data-persediaanddmy="${persediaanDDMY}"
      data-persediaanHMS="${persediaanHMS}"
      data-persediaanrp="${persediaanRp}"
      data-persediaanqty="${persediaanQty}"
      data-persediaaninfo="${persediaanInfo}"
      data-productid="${productId}"
      data-productname="${productName}"
      data-suppliername="${supplierName}"
      data-categoryname="${categoryName}"
    >
      <td class="align-content-center text-center pe-3 text-truncate">
        ${persediaanId}
      </td>
      <td class="align-content-center pe-3 text-truncate">
        ${persediaanDDMY}
      </td>
      <td class="align-content-center pe-3 text-truncate">
        ${persediaanHMS}
      </td>
      <td class="align-content-center text-truncate text-capitalize pe-3">
        ${productName}
      </td>
      <td class="align-content-center text-truncate text-capitalize pe-3">
        ${supplierName}
      </td>
      <td class="align-content-center text-truncate text-capitalize pe-3">
        ${categoryName}
      </td>
      <td class="text-truncate align-content-center text-center">
        <span
          class="badge fs-6 text-truncate ${spanColor}"
          style="max-width: 100%"
          >${formatQty(persediaanQty)}</span
        >
      </td>
      <td class="text-truncate align-content-center text-center">
        <span
          class="badge fs-6 text-truncate ${spanColor}"
          style="max-width: 100%"
          >${persediaanRp}</span
        >
      </td>
      <td class="align-content-center">
        <div class="d-flex w-100 justify-content-center gap-2">
          <button
            id="persediaanDetail"
            class="btn btn-success text-white"
            data-bs-toggle="modal"
            data-bs-target="#persediaanDetailModal"
          >
            <i
              class="fa-solid fa-eye"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>See-${productName}</span>"
              data-bs-placement="bottom"
            >
            </i>
          </button>
          <button
            id="persediaan-update-btn"
            class="btn btn-primary text-white"
            data-bs-toggle="modal"
            data-bs-target="#persediaanUpdateModal"
          >
            <i
              class="fa-solid fa-pencil"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>Update-${productName}</span>"
              data-bs-placement="bottom"
            >
            </i>
          </button>
          <button
            id="persediaan-delete-btn"
            class="btn btn-danger text-white"
            data-bs-toggle="modal"
            data-bs-target="#persediaanDeleteModal"
          >
            <i
              class="fa-solid fa-trash-can"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>Delete-${productName}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
        </div>
      </td>
    </tr>`;
  });
  $("tbody#persediaan-table").html(tr);
};
// make alert success after action crud
export const uiAlertSuccess = (res) => {
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
export const uiAlertFail = (res) => {
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
export const uiAlertFail1 = (res) => {
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
export const uiAlertFailCreate = (res) => {
  const alertFailed = `<div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
                            <strong class="text-capitalize">${res}</strong>
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
  $("#sectionFailedActionPersediaan").html(alertFailed);
  $("#section-alert").html("");
};
export const uiAlertFailUpdate = (res) => {
  const alertFailed = `<div class="alert alert-danger alert-dismissible fade show text-start my-2" role="alert">
                            <strong class="text-capitalize">${res}</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`;
  $("#persediaan-update-failed").html(alertFailed);
  $("#section-alert").html("");
};
export const uiAlertFailDelete = (res) => {
  const alertFailed = `<div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
                            <strong class="text-capitalize">${res}</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`;
  $("#persediaan-delete-failed").html(alertFailed);
  $("#section-alert").html("");
};
// button pagination
export const uiBtnPage = (totalPage) => {
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
export const uiBtnPageActive = (activePage) => {
  const btnPage = $("button.persediaan-btn-page");
  $(btnPage).removeClass("persediaan-active-page");
  $(btnPage)
    .eq(activePage - 1)
    .addClass("persediaan-active-page");
};
// when total row 0 being seaching
export const uiTbodyEmpty = (searchVal) => {
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
export const uiTbodyLoad = () => {
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
export const uiBlankValue = () => {
  $("input#persediaan-refproduct-search-name").val("");
  $("input#persediaan-refproduct-create-id").val("");
  $("input#persediaan-refproduct-create-name").val("");
  $("input#persediaan-create-qty").val(0);
  $("textarea#persediaan-create-info").val("");
};
export const uiSumPersediaanDate = () => {
  $("#persediaanLimitSearch").addClass("d-none");
  $("#persediaanList").addClass("d-none");
};
export const uiInit = () => {
  // reset - search
  $("input#persediaan-search").val("");
  $("#persediaanLimitSearch").removeClass("d-none");
  // reset all select
  $("select#persediaan-refproduct-search").val("Choose One Of Products");
  $("select#persediaan-refsupplier-search").val("Choose One Of Suppliers");
  $("select#persediaan-refcategory-search").val("Choose One Of Categories");
  $("#persediaanList").removeClass("d-none");
  //remove mode date
  $("div#persediaan-date-all-search").html(``);
  // remove mode summary
  $("div#persediaan-sum-section").html("");
};
// for - report
export const uiPDF = (
  response,
  sumPrice1,
  groupProduct1,
  groupSupplier,
  groupCategory
) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  const html1 = `
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
  let tr = "";
  let no = 1;
  response.forEach((rows) => {
    const persediaanDDMY = rows.PersediaanDDMY;
    const persediaanHMS = rows.PersediaanHMS;
    const productName = rows.ProductName;
    const productPriceBuy = rows.HargaBeli;
    const totalQty = rows.PersediaanQty;
    const totalRp = rows.PersediaanRp;

    const totalQtyTxt = formatQty(totalQty);
    const totalRpTxt = formatPrice(totalRp);
    tr += `
    <tr>
      <td class="text-center text-nowrap align-content-center">${no++}</td>
      <td class="text-nowrap align-content-center">
        ${persediaanDDMY}
      </td>
      <td class="text-nowrap align-content-center">${persediaanHMS}</td>
      <td class="text-nowrap align-content-center">${productName}</td>
      <td class="text-nowrap align-content-center">
        ${formatRupiah2(productPriceBuy)}
      </td>
      <td class="text-nowrap align-content-center">${totalQtyTxt}</td>
      <td class="text-nowrap align-content-center">${totalRpTxt}</td>
    </tr>
    `;
  });
  const html2 = `
  <div class="mb-3">
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="text-center">#</th>
          <th>Date</th>
          <th>Hour</th>
          <th>Product</th>
          <th>Price</th>
          <th class="text-center">Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${tr}
      </tbody>
      <tfoot>
        <tr>
          <th colspan="6" class="text-end me-2">Total</th>
          <th>${sumPrice1}</th>
        </tr>
      </tfoot>
    </table>
  </div>
  `;
  // 2. group product
  let tr1 = "";
  let no1 = 1;
  groupProduct1.forEach((rows) => {
    const productName = rows.ProductName;
    const productPriceBuy = formatRupiah2(rows.ProductPriceBeli);
    const totalQty = rows.TotalQty;
    const totalRp = rows.TotalRp;

    let totalQtyTxt = formatQty(totalQty);
    let totalRpTxt = formatPrice(totalRp);
    tr1 += `
    <tr>
      <td class="text-center text-nowrap align-content-center">${no1++}</td>
      <td class="text-nowrap align-content-center">${productName}</td>
      <td class="text-nowrap align-content-center">${productPriceBuy}</td>
      <td class="text-center text-nowrap align-content-center">${totalQtyTxt}</td>
      <td class="text-nowrap align-content-center">${totalRpTxt}</td>
    </tr>
    `;
    return tr1;
  });
  const html3 = `
  <div class="mb-3">
    <h4>Table Summary of Products</h4>
    <table class="table table-striped w-50">
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
        ${tr1}
      </tbody>
    </table>
  </div>
  `;
  // 3. group supplier
  let tr2 = "";
  let no2 = 1;
  groupSupplier.forEach((rows) => {
    const supplierName = rows.SupplierName;
    const totalPrice = rows.TotalRp;
    tr2 += `
    <tr>
      <td class="text-center text-nowrap align-content-center">${no2++}</td>
      <td class="text-nowrap align-content-center">${supplierName}</td>
      <td class="text-nowrap align-content-center">${formatPrice(
        totalPrice
      )}</td>
    </tr>
    `;
  });
  const html4 = `
  <div class="mb-3">
    <h4>Table Summary of Suppliers</h4>
    <table class="table table-striped w-50">
      <thead>
        <tr>
          <th class="text-center">#</th>
          <th>Supplier</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${tr2}
      </tbody>
    </table>
  </div>
  `;
  // 4. group category
  let tr3 = "";
  let no3 = 1;
  groupCategory.forEach((rows) => {
    const categoryName = rows.CategoryName;
    const totalRp = formatPrice(rows.TotalRp);
    tr3 += `
    <tr>
      <td class="text-center text-nowrap align-content-center">${no3++}</td>
      <td class="text-nowrap align-content-center">${categoryName}</td>
      <td class="text-nowrap align-content-center">${totalRp}</td>
    </tr>
    `;
  });
  const html5 = `
  <div class="mb-3">
    <h4>Table Summary of Categories</h4>
    <table class="table table-striped w-50">
      <thead>
        <tr>
          <th class="text-center">#</th>
          <th>Category</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${tr3}
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
        style="background-color: #273eec"
      >
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">${html1} ${html2} ${html3} ${html4} ${html5}</div>
    </div>
  </div>          
  `;
  return html;
};
// update ui Active
export const uiBtnPageActive1 = (pageNumber) => {
  const btnPage = $("button.product-ref-persediaan-page");
  btnPage.removeClass("product-ref-persediaan-page-active");
  btnPage.eq(pageNumber - 1).addClass("product-ref-persediaan-page-active");
};
export const uiAlertFailed = (res) => {
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
