import { formatRupiah2 } from "../../utils/formatRupiah.js";

// UI tr Product from dbsqlite
export const uiTbody = (response) => {
  let tr = "";
  response.forEach((el) => {
    const productId = parseInt(el.ProductId);
    const productName = el.ProductName;
    const productBuy = parseFloat(el.ProductPriceBeli);
    const productSell = parseFloat(el.ProductPriceJual);
    const productInfo = el.ProductInfo;
    const productImg = el.ProductImage;
    const categoryId = el.CategoryId;
    const categoryName = el.CategoryName;
    const supplierId = parseInt(el.SupplierId);
    const supplierName = el.SupplierName;
    const priceBuy = formatRupiah2(productBuy);
    const priceSell = formatRupiah2(productSell);
    const supplierNameTxt = supplierName === null ? " - " : supplierName;
    const categoryNameTxt = categoryName === null ? " - " : categoryName;
    tr += `
    <tr
      data-productid="${productId}"
      data-productname="${productName}"
      data-productpricebeli=${productBuy}
      data-productpricejual=${productSell}
      data-productketerangan="${productInfo}"
      data-productimage="${productImg}"
      data-productcategoryid=${categoryId}
      data-productcategoryname="${categoryName}"
      data-productsupplierid=${supplierId}
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
        ${categoryNameTxt}
      </td>
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
export const uiTrEmpty = (searchVal) => {
  let search = `Product Empty....`;
  if (searchVal !== "") {
    search = `Product - ${searchVal} Not found...`;
  }
  const tr = `<tr>
                <td colspan="6" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">${search}</td>
              </tr>`;
  return tr;
};
// blank value after submit action
export const uiBlankVal = () => {
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
export const uiBtnPage = (totalPage) => {
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
};
// Function to update active page button
export const uiBtnPageActive = (numberPage) => {
  const btnPage = $("button.product-btn-page");
  btnPage.removeClass("product-active-page");
  btnPage.eq(numberPage - 1).addClass("product-active-page");
};
// make alert success after action crud
export const uiAlertSuccess = (res) => {
  const alertSuccessMe = `<div class="alert alert-success alert-dismissible fade show text-start" role="alert">
                            <strong class="text-capitalize">${res}</strong> 
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                          </div>`;
  $("#sectionSuccessActionProduct").html(alertSuccessMe);
};
export const uiAlertFail = (res) => {
  const alert = `<div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
                    <strong class="text-capitalize">${res}</strong> 
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div>`;
  $("#sectionSuccessActionProduct").html(alert);
};
export const uiAlertFailCreate = (res) => {
  const alert = `<div class="alert alert-danger" role="alert">
                  <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                </div>`;
  $("div#productCreateFailed").html(alert);
};
export const uiAlertFailUpdate = (res) => {
  const alertFail = `<div class="alert alert-danger fs-6" role="alert">
                      <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                    </div>`;
  $("#product-update-failed").html(alertFail);
};
export const uiTrPDf = (no, row) => {
  const productPriceBuy = formatRupiah2(row.ProductPriceBeli);
  const productPriceSell = formatRupiah2(row.ProductPriceJual);
  const productInfo = row.ProductInfo !== "" ? row.ProductInfo : "-";
  return `<tr>
            <td class="text-center text-nowrap align-content-center">${no}</td>
            <td class="text-nowrap align-content-center">${row.ProductName}</td>
            <td class="text-nowrap align-content-center">${productPriceBuy}</td>
            <td class="text-nowrap align-content-center">${productPriceSell}</td>
            <td style="width:200px">
              <img src="${row.ProductImage}" style="width:100%"/>
            </td>
            <td class="text-nowrap align-content-center">${productInfo}</td>
          </tr>`;
};
