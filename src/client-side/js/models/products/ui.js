import { formatRupiah2 } from "../../utils/formatRupiah.js";

// UI tr Product from dbsqlite
export const uiTrProduct = (el) => {
  const productPriceRupiah = formatRupiah2(el.ProductPriceBeli);
  const supplierName = el.SupplierName === null ? " - " : el.SupplierName;
  const categoryName = el.CategoryName === null ? " - " : el.CategoryName;
  return `<tr>
            <td class="text-center align-content-center text-truncate" style="max-width: 100px">${el.ProductId}</td>
            <td class="align-content-center text-capitalize text-truncate" style="max-width: 150px">${el.ProductName}</td>
            <td class="align-content-center text-truncate" style="max-width: 120px">${productPriceRupiah}</td>
            <td class="align-content-center text-capitalize text-truncate" style="max-width: 150px">${categoryName}</td>
            <td class="align-content-center text-capitalize text-truncate" style="max-width: 150px">${supplierName}</td>
            <td class="align-content-center" style="width:50px;">
              <div class="d-flex justify-content-center gap-2" >
                <button
                  id="productDetailBtn" 
                  class="btn btn-success text-white tooltip-bottom-container"
                  data-bs-toggle="modal" 
                  data-bs-target="#productDetailModal" 
                  data-productid="${el.ProductId}"  
                  data-productname="${el.ProductName}" 
                  data-productpricebeli=${el.ProductPriceBeli} 
                  data-productpricejual=${el.ProductPriceJual} 
                  data-productketerangan="${el.ProductInfo}" 
                  data-productcategory="${el.CategoryName}"
                  data-productimage="${el.ProductImage}"
                  data-productsupplier="${el.SupplierName}">
                  <span class="tooltip-bottom-text">See-${el.ProductName}</span>
                    <i class="fa-solid fa-eye"></i>
                </button>
                <button 
                  id="editProduct" 
                  class="btn btn-primary text-white tooltip-bottom-container"
                  data-bs-toggle="modal" 
                  data-bs-target="#editProductModal" 
                  data-productid=${el.ProductId}
                  data-productname="${el.ProductName}" 
                  data-productpricebeli=${el.ProductPriceBeli} 
                  data-productpricejual=${el.ProductPriceJual} 
                  data-productketerangan="${el.ProductInfo}"
                  data-productimage="${el.ProductImage}"
                  data-productcategoryid=${el.CategoryId}
                  data-productcategoryname="${el.CategoryName}"
                  data-productsupplierid=${el.SupplierId}
                  data-productsuppliername="${el.SupplierName}">
                  <span class="tooltip-bottom-text">Edit-${el.ProductName}</span>
                    <i class="fa-solid fa-pencil"></i>
                </button>
                <button 
                  id="deleteProduct" 
                  class="btn btn-danger text-white tooltip-bottom-container" 
                  data-productid="${el.ProductId}" 
                  data-productname="${el.ProductName}" 
                  data-bs-toggle="modal" 
                  data-bs-target="#confirmDeleteProductModal">
                  <span class="tooltip-bottom-text">Delete-${el.ProductName}</span>
                    <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </td>
          </tr>`;
};
// make alert success after action crud
export const successActionProduct = (res) => {
  const alertSuccessMe = `<div class="alert alert-success" role="alert">
                            ${res}
                          </div>`;
  $("#sectionSuccessActionProduct").html(alertSuccessMe);
  setTimeout(() => {
    $("#sectionSuccessActionProduct").html("");
  }, 20000);
};
// when total product row 0 being seaching
export const trProductZeroSearch = (searchVal) => {
  return `<tr>
              <td colspan="6" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">product ${searchVal} tidak ditemukan....</td>
            </tr>`;
};
// when total product row 0 being seaching
export const trProductZero = () => {
  return `<tr>
              <td colspan="6" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">tidak ada product....</td>
            </tr>`;
};
// blank value after submit action
export const createBlankValue = () => {
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
export const btnProductPage = (i) => {
  return `<button 
            type="button" 
            class="product-btn-page ${i === 1 ? "product-active-page" : ""}" >
              ${i}
          </button>`;
};
// Function to update active page button
export const uiActivePageButton = (productPageNumber, productBtnPage) => {
  const productBtnPageActive = document.getElementsByClassName(
    "product-active-page"
  );
  if (productBtnPageActive.length >= 1) {
    productBtnPageActive[0].classList.remove("product-active-page");
  }
  productBtnPage[productPageNumber - 1].classList.add("product-active-page");
};
export const uiCreateFailed = (res) => {
  const alert = `<div class="alert alert-danger" role="alert">
                  <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                </div>`;
  $("div#productCreateFailed").html(alert);
};
export const uiFailedPDF = (res) => {
  const alert = `<div class="alert alert-danger" role="alert">
                  <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                </div>`;
  $("div#product-pdf-failed").html(alert);
};
export const uiListRefPersediaanCreate = (productList) => {
  let option = "";
  productList.forEach((el) => {
    option += `<div class='persediaan-refproduct-create-val fs-6' valueid=${el.ProductId} valueprice=${el.ProductPriceBeli}>${el.ProductId} - ${el.ProductName}</div>`;
  });
  $("#persediaan-refproduct-create-list").html(option);
};
export const uiUpdateFailed = (res) => {
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
ipcRenderer.on("success:pdf-product", (e, file_path) => {
  successActionProduct(`File PDF tersimpan di ${file_path}`);
});
