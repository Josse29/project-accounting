import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
// ui tr inventory from db
export const uiTbody = (response) => {
  let tr = ``;
  response.forEach((el) => {
    // persediaanId
    const persediaanId = parseInt(el.PersediaanId);
    // persediaanDMY
    const persediaanDDMY = el.PersediaanDDMY;
    // persediaanHMS
    const persediaanHMS = el.PersediaanHMS;
    // persediaanInfo
    const persediaanInfo = el.PersediaanInfo;
    // productId
    const productId = parseInt(el.ProductId);
    // productName
    const productName = el.ProductName;
    // productPriceBuy
    const productPriceBuy = parseFloat(el.ProductPriceBeli);
    // supplier-name
    const supplierName = el.SupplierName === null ? "-" : el.SupplierName;
    // categoryName
    const categoryName = el.CategoryName === null ? "-" : el.CategoryName;
    // qty
    const persediaanQty = parseFloat(el.PersediaanQty);
    const spanColor = persediaanQty >= 1 ? "text-bg-success" : "text-bg-danger";
    const qtyTxt =
      persediaanQty >= 1
        ? `+ ${persediaanQty}`
        : `- ${Math.abs(persediaanQty)}`;
    // rupiah
    const persediaanRp = parseFloat(el.PersediaanRp);
    const rpTxt =
      persediaanRp >= 1
        ? `+ ${formatRupiah2(persediaanRp)}`
        : `- ${formatRupiah2(Math.abs(persediaanRp))}`;
    tr += `
    <tr
      data-persediaanid=${persediaanId}
      data-persediaanddmy="${persediaanDDMY}"
      data-persediaanHMS="${persediaanHMS}"
      data-persediaanrp="${persediaanRp}"
      data-persediaanqty="${persediaanQty}"
      data-persediaaninfo="${persediaanInfo}"
      data-productid=${productId}
      data-productname="${productName}"
      data-productpricebuy="${productPriceBuy}"
    >
      <td class="align-content-center text-center pe-3 text-truncate">
        ${persediaanId}
      </td>
      <td class="align-content-center pe-3 text-truncate">
        ${formatWaktuIndo(persediaanDDMY)}
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
          >${qtyTxt}</span
        >
      </td>
      <td class="text-truncate align-content-center text-center">
        <span
          class="badge fs-6 text-truncate ${spanColor}"
          style="max-width: 100%"
          >${rpTxt}</span
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
  const alertSuccess = `<div class="alert alert-success alert-dismissible fade show text-start" role="alert">
                            <strong class="text-capitalize">${res}</strong>
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
  $("#section-alert").html(alertSuccess);
};
export const uiAlertFail = (res) => {
  const alertFailedMe = `<div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
                            <strong class="text-capitalize">${res}</strong>
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
  $("#section-alert").html(alertFailedMe);
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
  let search = `Product Empty...`;
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
    </tr>`;
  $("tbody#persediaan-table").html(tr);
};
export const uiTbodyLoad = () => {
  const tr = `<tr>
                <td colspan="10" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">loading...</td>
              </tr>`;
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
export const uiTrPDF = (rows, no) => {
  const totalQty = rows.PersediaanQty;
  const totalRp = rows.PersediaanRp;
  const totalQtyTxt =
    totalQty >= 1 ? `+ ${totalQty}` : `- ${Math.abs(totalQty)}`;
  const totalRpTxt =
    totalRp >= 1
      ? `+ ${formatRupiah2(totalRp)}`
      : `- ${formatRupiah2(Math.abs(totalRp))}`;
  const tr = `<tr>
                  <td class="text-center text-nowrap align-content-center">${no}</td>
                  <td class="text-nowrap align-content-center">${formatWaktuIndo(
                    rows.PersediaanDDMY
                  )}</td>
                  <td class="text-nowrap align-content-center">${
                    rows.PersediaanHMS
                  }</td>
                  <td class="text-nowrap align-content-center">${
                    rows.ProductName
                  }</td>
                  <td class="text-nowrap align-content-center">${formatRupiah2(
                    rows.HargaBeli
                  )}</td>
                  <td class="text-nowrap align-content-center">${totalQtyTxt}</td>
                  <td class="text-nowrap align-content-center">${totalRpTxt}</td>
                </tr>`;
  return tr;
};
export const uiTrProductSum = (rows, no) => {
  // qty
  const totalQty = rows.TotalQty;
  let totalQtyTxt = ``;
  if (totalQty === 0) {
    totalQtyTxt = `${totalQty}`;
  }
  if (totalQty >= 1) {
    totalQtyTxt = `+ ${totalQty}`;
  }
  if (totalQty < 0) {
    totalQtyTxt = `- ${Math.abs(totalQty)}`;
  }
  // price
  const totalRp = rows.TotalRp;
  let totalRpTxt = ``;
  if (totalRp === 0) {
    totalRpTxt = `${formatRupiah2(totalRp)}`;
  }
  if (totalRp >= 1) {
    totalRpTxt = `+ ${formatRupiah2(totalRp)}`;
  }
  if (totalRp < 0) {
    totalRpTxt = `- ${formatRupiah2(Math.abs(totalRp))}`;
  }
  return `<tr>
            <td class="text-center text-nowrap align-content-center">${no}</td>
            <td class="text-nowrap align-content-center">${
              rows.ProductName
            }</td>
            <td class="text-nowrap align-content-center">${formatRupiah2(
              rows.ProductPriceBeli
            )}</td>
            <td class="text-nowrap align-content-center">${totalQtyTxt}</td>
            <td class="text-nowrap align-content-center">${totalRpTxt}</td>
          </tr>`;
};
export const uiTrSupplierSum = (rows, no) => {
  const totalRp = rows.TotalRp;
  let totalRpTxt = ``;
  if (totalRp === 0) {
    totalRpTxt = `${formatRupiah2(totalRp)}`;
  }
  if (totalRp >= 1) {
    totalRpTxt = `+ ${formatRupiah2(totalRp)}`;
  }
  if (totalRp < 0) {
    totalRpTxt = `- ${formatRupiah2(Math.abs(totalRp))}`;
  }
  return `<tr>
            <td class="text-center text-nowrap align-content-center">${no}</td>
            <td class="text-nowrap align-content-center">${rows.SupplierName}</td>
            <td class="text-nowrap align-content-center">${totalRpTxt}</td>
          </tr>`;
};
export const uiTrCategorySum = (rows, no) => {
  // category name
  const categoryName = rows.CategoryName;
  // total rupiah
  const totalRp = rows.TotalRp;
  let totalRpTxt = ``;
  if (totalRp === 0) {
    totalRpTxt = `${formatRupiah2(totalRp)}`;
  }
  if (totalRp >= 1) {
    totalRpTxt = `+ ${formatRupiah2(totalRp)}`;
  }
  if (totalRp < 0) {
    totalRpTxt = `- ${formatRupiah2(Math.abs(totalRp))}`;
  }
  const html = `<tr>
                  <td class="text-center text-nowrap align-content-center">${no}</td>
                  <td class="text-nowrap align-content-center">${categoryName}</td>
                  <td class="text-nowrap align-content-center">${totalRpTxt}</td>
                </tr>`;
  return html;
};
// group by product
export const uiLoad = () => {
  const div = `<div class="container-by-me">
                <div class="card">
                  <div class="animate-load" style="width: 100%; height: 200px"></div>
                  <div class="card-body">
                    <div class="mb-4">
                      <div class="animate-load mb-2 w-75" style="height: 30px"></div>
                      <div class="animate-load w-50 mb-2" style="height: 30px"></div>
                      <div class="animate-load w-25" style="height: 25px"></div>
                    </div>
                    <div class="d-flex justify-content-end gap-2">
                      <div class="animate-load" style="height: 35px; width: 35px"></div>
                      <div class="animate-load" style="height: 35px; width: 35px"></div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="animate-load" style="width: 100%; height: 200px"></div>
                  <div class="card-body">
                    <div class="mb-4">
                      <div class="animate-load mb-2 w-75" style="height: 30px"></div>
                      <div class="animate-load w-50 mb-2" style="height: 30px"></div>
                      <div class="animate-load w-25" style="height: 25px"></div>
                    </div>
                    <div class="d-flex justify-content-end gap-2">
                      <div class="animate-load" style="height: 35px; width: 35px"></div>
                      <div class="animate-load" style="height: 35px; width: 35px"></div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="animate-load" style="width: 100%; height: 200px"></div>
                  <div class="card-body">
                    <div class="mb-4">
                      <div class="animate-load mb-2 w-75" style="height: 30px"></div>
                      <div class="animate-load w-50 mb-2" style="height: 30px"></div>
                      <div class="animate-load w-25" style="height: 25px"></div>
                    </div>
                    <div class="d-flex justify-content-end gap-2">
                      <div class="animate-load" style="height: 35px; width: 35px"></div>
                      <div class="animate-load" style="height: 35px; width: 35px"></div>
                    </div>
                  </div>
                </div>
              </div>`;
  $("div#product-refpersediaan-read").html(div);
  $("div#product-refpersediaan-pagination").addClass("d-none");
};
export const uiCard = (response) => {
  let card = ``;
  response.forEach((rows) => {
    const productId = parseInt(rows.PersediaanProductId);
    const productName = rows.ProductName;
    const priceBuy = formatRupiah2(parseFloat(rows.PriceBuy));
    const priceSell = formatRupiah2(parseFloat(rows.PriceSell));
    const productStock = parseInt(rows.TotalQty);
    let imgSrc = ``;
    if (rows.ProductImage !== "null") {
      imgSrc = rows.ProductImage;
    } else {
      imgSrc = "./../images/no-img.jpg";
    }
    const productImg = `
    <img src="${imgSrc}" class="card-img-top" alt="..." />`;
    card += `
    <div class="card w-full shadow-sm">
      ${productImg}
      <div
        class="card-body"
        data-productid="${productId}"
        data-productname="${productName}"
        data-productstock="${productStock}"
        data-productpricesell="${priceSell}"
        data-productpricebuy="${priceBuy}"
      >
        <h4 class="fw-bold text-truncate" id="order-productname">
          ${productName}
        </h4>
        <h4 class="text-truncate" id="order-productprice">${priceSell}</h4>
        <p class="fs-5">Stock : ${productStock}</p>
        <div class="mt-3 d-flex justify-content-between align-items-center">
          <div id="order-create-qty"></div>
          <div>
            <button id="order-create-qty-plus" class="btn btn-success">
              <i class="fa-solid fa-plus" style="font-size: 18px"></i>
            </button>
            <button class="btn btn-danger" id="order-create-qty-minus">
              <i class="fa-solid fa-minus" style="font-size: 18px"></i>
            </button>
          </div>
        </div>
      </div>
    </div>`;
  });
  const parentCard = `<div class="container-by-me">${card}</div>`;
  $("div#product-refpersediaan-read").html(parentCard);
};
export const uiCardEmpty = (searchVal) => {
  let search = `stock empty...`;
  if (searchVal !== "") {
    search = `${searchVal} - not found....`;
  }
  const emptyP = `
  <div class="d-flex justify-content-center align-items-center" style="height:400px;">
      <p class="d-block fs-4 fst-italic text-capitalize fw-bold">${search}</p>
  </div>
  `;
  $("div#product-refpersediaan-read").html(emptyP);
};
export const uiBtnPage1 = (totalPage) => {
  let btn = ``;
  for (let i = 1; i <= totalPage; i++) {
    const activePage = i === 1 ? "product-ref-persediaan-page-active" : "";
    btn += `<button 
                type="button" 
                class="btn fs-4 product-ref-persediaan-page border border-1 ${activePage}">${i}</button>`;
  }
  $("div#product-ref-persediaan-page-number").html(btn);
};
// update ui Active
export const uiBtnPageActive1 = (pageNumber) => {
  const btnPage = $("button.product-ref-persediaan-page");
  btnPage.removeClass("product-ref-persediaan-page-active");
  btnPage.eq(pageNumber - 1).addClass("product-ref-persediaan-page-active");
};
