import { getPersediaanQty } from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";

// UI tr Product from dbsqlite
export const uiTrProduct = (el) => {
  const productPriceRupiah = formatRupiah2(el.ProductPrice);
  return `<tr>
                <td class="text-center align-content-center">${el.ProductId}</td>
                <td class="text-nowrap align-content-center text-capitalize">${el.ProductName}</td>
                <td class="text-nowrap align-content-center text-capitalize">${el.CategoryName}</td>
                <td class="align-content-center text-capitalize">${el.SupplierName}</td>
                <td class="align-content-center">${productPriceRupiah}</td>
                <td>
                  <div class="d-flex w-100 justify-content-center gap-2">
                    <button
                      id="productDetailBtn" 
                      class="btn btn-success text-white"
                      data-bs-toggle="modal" 
                      data-bs-target="#productDetailModal" 
                      data-productid="${el.ProductId}"  
                      data-productname="${el.ProductName}" 
                      data-productprice="${el.ProductPrice}" 
                      data-productketerangan="${el.ProductInfo}" 
                      data-productcategory="${el.CategoryName}"
                      data-productimage="${el.ProductImage}"
                      data-productsupplier="${el.SupplierName}">
                        <i 
                        class="fa-solid fa-eye"
                        data-bs-toggle="tooltip" 
                        data-bs-html="true"
                        data-bs-title="<span>lihat-${el.ProductName}</span>" 
                        data-bs-placement="bottom"
                        ></i>
                    </button>
                    <button 
                      id="editProduct" 
                      class="btn btn-primary text-white"
                      data-bs-toggle="modal" 
                      data-bs-target="#editProductModal" 
                      data-productid="${el.ProductId}"  
                      data-productname="${el.ProductName}" 
                      data-productprice="${el.ProductPrice}" 
                      data-productketerangan="${el.ProductInfo}"
                      data-productimage="${el.ProductImage}"
                      data-productcategoryid="${el.CategoryId}"
                      data-productcategoryname="${el.CategoryName}"
                      data-productsupplierid="${el.SupplierId}"
                      data-productsuppliername="${el.SupplierName}">
                        <i 
                        class="fa-solid fa-pencil" 
                        data-bs-toggle="tooltip" 
                        data-bs-html="true"
                        data-bs-title="<span>edit-${el.ProductName}</span>" 
                        data-bs-placement="bottom"></i>
                    </button>
                    <button 
                      id="deleteProduct" 
                      class="btn btn-danger text-white" 
                      data-productid="${el.ProductId}" 
                      data-productname="${el.ProductName}" 
                      data-bs-toggle="modal" 
                      data-bs-target="#confirmDeleteProductModal">
                        <i 
                        class="fa-solid fa-trash-can" 
                        data-bs-toggle="tooltip" 
                        data-bs-html="true"
                        data-bs-title="<span>hapus-${el.ProductName}</span>" 
                        data-bs-placement="bottom"></i>
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
  $("#product-refcategory-create-val").val("");
  $("#product-refsupplier-create").val("");
  $("#product-refsupplier-create-val").val("");
  $("#product-price").val("");
  $("#product-keterangan").val("");
  $("#create-image-product").val("");
  $("#section-image").addClass("d-none");
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
export const uiListRefPersediaanCreate = (productList) => {
  let option = "";
  productList.forEach((el) => {
    option += `<div class='persediaan-refproduct-create-val fs-6' valueid=${el.ProductId} valueprice=${el.ProductPrice}>${el.ProductName}</div>`;
  });
  $("#persediaan-refproduct-create-list").html(option);
};

export const uiListRefPersediaanUpdate = (productList) => {
  let option = "";
  productList.forEach((el) => {
    option += `<div class='persediaan-refproduct-update-val fs-6' valueid=${el.ProductId} valueprice=${el.ProductPrice}>${el.ProductName}</div>`;
  });
  $("#persediaan-refproduct-update-list").html(option);
};
// success create pdf
ipcRenderer.on("success:pdf-product", (e, file_path) => {
  successActionProduct(`File PDF tersimpan di ${file_path}`);
});
