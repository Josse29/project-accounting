import { formatWaktuIndo } from "../../utils/formatWaktu.js";
// ui tr supplier from db
export const uiTr = (el) => {
  const splitDateTime = el.SupplierDate.split(" ");
  const dateSupplier = formatWaktuIndo(splitDateTime[0]);
  // console.log(el.ProductList);
  return `<tr>
                <td class="text-center align-middle">${el.SupplierId}</td>
                <td class="align-content-center text-nowrap">${dateSupplier}</td>
                <td class="align-content-center text-capitalize">${el.SupplierName}</td>
                <td class="align-content-center">
                    <div class="d-flex w-100 justify-content-center gap-2">
                        <button 
                            class="btn btn-success text-white tooltip-bottom-container"
                            id="supplierDetail" 
                            data-bs-toggle="modal" 
                            data-bs-target="#supplierDetailModal" 
                            data-supplierid=${el.SupplierId}
                            data-suppliername="${el.SupplierName}"
                            data-supplierinfo="${el.SupplierInfo}"
                            data-supplierimg="${el.SupplierImg}"
                            >
                              <i class="fa-solid fa-eye"></i>
                              <div class="tooltip-bottom-text">See-${el.SupplierName}</div>
                        </button>
                        <button 
                            class="btn btn-primary text-white tooltip-bottom-container"
                            data-bs-toggle="modal" 
                            data-bs-target="#supplierUpdateModal" 
                            id="supplierUpdate" 
                            data-supplierid="${el.SupplierId}"  
                            data-suppliername="${el.SupplierName}"
                            data-supplierinfo="${el.SupplierInfo}"
                            data-supplierimg="${el.SupplierImg}">
                                <i class="fa-solid fa-pencil"></i>
                                <div class="tooltip-bottom-text">See-${el.SupplierName}</div>
                        </button>
                        <button
                            class="btn btn-danger text-white tooltip-bottom-container"
                            data-bs-toggle="modal" 
                            data-bs-target="#supplierDeleteModal" 
                            id="supplierDelete" 
                            data-supplierid="${el.SupplierId}"  
                            data-suppliername="${el.SupplierName}"
                            data-supplierinfo="${el.SupplierInfo}">
                                <i class="fa-solid fa-trash-can"></i>
                                <div class="tooltip-bottom-text">See-${el.SupplierName}</div>
                        </button>
                    </div>
                </td>
            </tr>`;
};
// make alert success after action crud
export const successActionSupplier = (res) => {
  const alertSuccessMe = `<div class="alert alert-success" role="alert">
                              ${res}
                            </div>`;
  $("#sectionSuccessActionSupply").html(alertSuccessMe);
  setTimeout(() => {
    $("#sectionSuccessActionSupply").html("");
  }, 20000);
};
// it doesn't exist supplier
export const trSupplierZero = () => {
  return `<tr>
                <td colspan="5" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">belum ada supplier</td>
            </tr>`;
};
// it doesn't exist supplier while  event search
export const trSupplierZeroSearch = (supplierSearch) => {
  return `<tr>
                <td colspan="5" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">tidak ada supplier - ${supplierSearch}</td>
            </tr>`;
};
// button pagination
export const btnSupplierPage = (i) => {
  return `<button 
            type="button" 
            class="supplier-btn-page ${i === 1 ? "supplier-active-page" : ""} ">
              ${i}
          </button>`;
};
// update active pagination
export function updateActivePageButton(pageNumber, supplierBtnPage) {
  let current = document.getElementsByClassName("supplier-active-page");
  if (current.length >= 1) {
    current[0].classList.remove("supplier-active-page");
  }
  supplierBtnPage[pageNumber - 1].classList.add("supplier-active-page");
}
// create blank after success event
export const supplierCreateBlank = () => {
  $("#supplier-create-name").val("");
  $("#supplier-create-img").val("");
  $("#supplier-create-info").val("");
  $("#supplier-create-img-section").addClass("d-none");
};
export const uiOption = (element) => {
  return `<option value="${element.SupplierId}" class="text-capitalize">${element.SupplierName}</option>`;
};
export const uiListProductCreate = (supplierList) => {
  // get only list supplier
  let option = "";
  supplierList.forEach((el) => {
    option += `<div class='product-refsupplier-val fs-6' value='${el.SupplierId}'>${el.SupplierName}</div>`;
  });
  $(".product-refsupplier-list").html(option);
};
export const uiListProductUpdate = (supplierList) => {
  let option = "";
  supplierList.forEach((el) => {
    option += `<div class='product-refsupplier-val-update fs-6' value='${el.SupplierId}'>${el.SupplierName}</div>`;
  });
  $(".product-refsupplier-update-list").html(option);
};
