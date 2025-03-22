import { formatRupiah2 } from "../../utils/formatPrice.js";
import { timeIndonesian } from "../../utils/formatTime.js";
// UI tr Product from dbsqlite
const uiTbody = (response) => {
  let tr = "";
  response.forEach((el) => {
    const productId = el.ProductId;
    const productName = el.ProductName;
    const productBuy = el.ProductPriceBuy;
    const productSell = el.ProductPriceSell;
    const productInfo = el.ProductInfo;
    const productImg = el.ProductImage;
    const supplierId = el.UserId;
    const supplierName = el.UserFullname;
    const priceBuy = formatRupiah2(productBuy);
    const priceSell = formatRupiah2(productSell);
    const supplierNameTxt = supplierName === null ? " - " : supplierName;
    tr += `
    <tr
      data-productid="${productId}"
      data-productname="${productName}"
      data-productpricebeli="${productBuy}"
      data-productpricejual=${productSell}
      data-productketerangan="${productInfo}"
      data-productimage="${productImg}"
      data-productsupplierid="${supplierId}"
      data-productsuppliername="${supplierName}"
    >
      <td class="text-center align-content-center text-truncate pe-2">
        ${productId}
      </td>
      <td class="align-content-center text-capitalize text-truncate pe-3">
        ${productName}
      </td>
      <td class="align-content-center text-truncate pe-3">${priceBuy}</td>
      <td class="align-content-center text-truncate pe-3">${priceSell}</td>
      <td class="align-content-center text-capitalize text-truncate pe-3">
        ${supplierNameTxt}
      </td>
      <td class="align-content-center">
        <div class="d-flex justify-content-center gap-2">
          <button
            id="productDetailBtn"
            class="btn btn-success text-white"
            data-bs-toggle="modal"
            data-bs-target="#productDetailModal"
          >
            <i
              class="fa-solid fa-eye"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>See-${productName}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
          <button
            id="editProduct"
            class="btn btn-primary text-white"
            data-bs-toggle="modal"
            data-bs-target="#editProductModal"
          >
            <i
              class="fa-solid fa-pencil"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>Update-${productName}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
          <button
            id="deleteProduct"
            class="btn btn-danger text-white"
            data-bs-toggle="modal"
            data-bs-target="#confirmDeleteProductModal"
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
  $("#product-table").html(tr);
};
// when total product row 0 being seaching
const uiTBodyEmpty = (searchVal) => {
  let search = `Product Empty....`;
  if (searchVal !== "") {
    search = `Product - ${searchVal} Not found...`;
  }
  const tr = `<tr>
                <td colspan="6" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">${search}</td>
              </tr>`;
  $("#product-table").html(tr);
  $("#product-pagination").addClass("d-none");
};
const uiTBodyLoad = () => {
  const tr = `<tr>
                <td colspan="7" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">Loading....</td>
              </tr>`;
  $("#product-table").html(tr);
  $("#product-pagination").addClass("d-none");
};
// blank value after submit action
const uiBlankVal = () => {
  $("#product-name").val("");
  $("#product-refcategory-create").val("");
  $("#product-refsupplier-create").val("");
  $("#product-keterangan").val("");
  $("#create-image-product").val("");
  $("#section-image").addClass("d-none");
  $("#product-price-beli").val("");
  $("#product-price-jual").val("");
};
// button pagination
const uiBtnPage = (totalPage) => {
  let btn = "";
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 ? "product-active-page" : "";
    btn += `<button 
            type="button"
            class="product-btn-page ${actived}">
              ${i}
            </button>`;
  }
  $("#product-number-page").html(btn);
  $("#product-pagination").removeClass("d-none");
};
const uiBtnPage1 = (totalPage) => {
  let btn = ``;
  for (let i = 1; i <= totalPage; i++) {
    const activePage = i === 1 ? "product-ref-persediaan-page-active" : "";
    btn += `<button 
              type="button" 
              class="btn fs-4 product-ref-persediaan-page border border-2 ${activePage}">${i}</button>`;
  }
  $("div#product-ref-persediaan-page-number").html(btn);
  $("div#product-refpersediaan-pagination").removeClass("d-none");
};
// Function to update active page button
const uiBtnPageActive = (numberPage) => {
  const btnPage = $("button.product-btn-page");
  btnPage.removeClass("product-active-page");
  btnPage.eq(numberPage - 1).addClass("product-active-page");
};
const uiBtnPageActive1 = (pageNumber) => {
  const btnPage = $("button.product-ref-persediaan-page");
  btnPage.removeClass("product-ref-persediaan-page-active");
  btnPage.eq(pageNumber - 1).addClass("product-ref-persediaan-page-active");
};
// make alert success after action crud
const uiAlertSuccess = (res) => {
  const alertSuccessMe = `
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
  $("#sectionSuccessActionProduct").html(alertSuccessMe);
};
const uiAlertFail = (res) => {
  const alert = `<div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
                    <strong class="text-capitalize">${res}</strong> 
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div>`;
  $("#sectionSuccessActionProduct").html(alert);
};
const uiAlertFailCreate = (res) => {
  const alert = `<div class="alert alert-danger" role="alert">
                  <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                </div>`;
  $("div#productCreateFailed").html(alert);
};
const uiAlertFailUpdate = (res) => {
  const alertFail = `<div class="alert alert-danger fs-6" role="alert">
                      <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                    </div>`;
  $("#product-update-failed").html(alertFail);
};
const uiPDF = (response) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  const html = `
  <div class="mb-3">
    <h3>Table Product</h3>
    <h6>${indonesiaDDMY}</h6>
    <div class="d-flex gap-1">
      <h6>${indonesiaHour} :</h6>
      <h6>${indonesiaMinute} :</h6>
      <h6>${indonesiaSecond}</h6>
    </div>
  </div>
  `;
  let tr = ``;
  let no = 1;
  response.forEach((row) => {
    const productName = row.ProductName;
    const productImg = row.ProductImage;
    const productPriceBuy = formatRupiah2(row.ProductPriceBuy);
    const productPriceSell = formatRupiah2(row.ProductPriceSell);
    // const productInfo = row.ProductInfo !== "" ? row.ProductInfo : "-"; || if needed
    tr += `
      <tr>
        <td class="text-center text-nowrap align-content-center">${no++}</td>
        <td class="text-nowrap align-content-center">${productName}</td>
        <td class="text-nowrap align-content-center">${productPriceBuy}</td>
        <td class="text-nowrap align-content-center">${productPriceSell}</td>
        <td class="d-flex justify-content-center">
          ${
            productImg !== "null"
              ? `<img src="${productImg}" style="width: 200px" />`
              : `<p class="text-nowrap text-muted fst-italic mb-0">no img displayed....</p>`
          }
        </td>
      </tr>  
    `;
  });
  const html1 = `
  <div class="mb-3">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Price Buy</th>
          <th>Price Sell</th>
          <th class="text-center">Image</th>
        </tr>
      </thead>
      <tbody>
        ${tr}
      </tbody>
    </table>
  </div>
  `;
  const html2 = `          
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
        ${html}
        ${html1}
      </div>
    </div>
  </div>`;
  return html2;
};
const uiCard = (response) => {
  let card = ``;
  response.forEach((rows) => {
    const productId = parseInt(rows.ProductId);
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
    <img src="${imgSrc}" class="card-img-top w-100" alt="..." style="height:200px;" />`;
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
const uiCardLoad = () => {
  const div = `
  <div class="container-by-me">
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
  </div>
  `;
  $("div#product-refpersediaan-read").html(div);
  $("div#product-refpersediaan-pagination").addClass("d-none");
};
const uiCardEmpty = (searchVal) => {
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
  $("div#product-refpersediaan-pagination").addClass("d-none");
};
export {
  uiAlertFail,
  uiAlertFailCreate,
  uiAlertFailUpdate,
  uiAlertSuccess,
  uiBlankVal,
  uiBtnPage,
  uiBtnPage1,
  uiBtnPageActive,
  uiBtnPageActive1,
  uiCard,
  uiCardEmpty,
  uiCardLoad,
  uiPDF,
  uiTbody,
  uiTBodyEmpty,
  uiTBodyLoad,
};
