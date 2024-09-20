import { formatWaktuIndo } from "../../utils/formatWaktu.js";
// ui tr supplier from db
export const uiTr = (el) => {
  const splitDateTime = el.SupplierDate.split(" ");
  const dateSupplier = formatWaktuIndo(splitDateTime[0]);
  return `<tr>
                <td class="text-center align-middle">${el.SupplierId}</td>
                <td class="align-content-center text-capitalize text-truncate pe-2">${el.SupplierName}</td>
                <td class="align-content-center">
                    <div class="d-flex w-100 justify-content-center gap-2">
                        <button 
                            class="btn btn-success text-white"
                            id="supplierDetail" 
                            data-bs-toggle="modal" 
                            data-bs-target="#supplierDetailModal" 
                            data-supplierid=${el.SupplierId}
                            data-suppliername="${el.SupplierName}"
                            data-supplierinfo="${el.SupplierInfo}"
                            data-supplierimg="${el.SupplierImg}"
                            data-supplierdate="${dateSupplier}"
                            >
                              <i class="fa-solid fa-eye"
                                 data-bs-toggle="tooltip" 
                                 data-bs-html="true"
                                 data-bs-title="<span>See-${el.SupplierName}</span>" 
                                 data-bs-placement="bottom"></i>
                        </button>
                        <button 
                            class="btn btn-primary text-white"
                            data-bs-toggle="modal" 
                            data-bs-target="#supplierUpdateModal" 
                            id="supplierUpdate" 
                            data-supplierid="${el.SupplierId}"  
                            data-suppliername="${el.SupplierName}"
                            data-supplierinfo="${el.SupplierInfo}"
                            data-supplierimg="${el.SupplierImg}">
                                <i class="fa-solid fa-pencil"
                                 data-bs-toggle="tooltip" 
                                 data-bs-html="true"
                                 data-bs-title="<span>Update-${el.SupplierName}</span>" 
                                 data-bs-placement="bottom"></i>
                        </button>
                        <button
                            class="btn btn-danger text-white"
                            data-bs-toggle="modal" 
                            data-bs-target="#supplierDeleteModal" 
                            id="supplierDelete" 
                            data-supplierid="${el.SupplierId}"  
                            data-suppliername="${el.SupplierName}"
                            data-supplierinfo="${el.SupplierInfo}">
                                <i class="fa-solid fa-trash-can"
                                   data-bs-toggle="tooltip" 
                                   data-bs-html="true"
                                   data-bs-title="<span>Delete-${el.SupplierName}</span>" 
                                   data-bs-placement="bottom"></i>
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
// it doesn't exist supplier while  event search
export const uiTrZero = (searchVal) => {
  let search = `Supplier Empty ......`;
  if (searchVal !== "") {
    search = `Supplier - ${searchVal} is empty`;
  }
  return `<tr>
                <td colspan="5" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">${search}</td>
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
export function uiActivePageBtn(pageNumber) {
  $("button.supplier-btn-page").removeClass("supplier-active-page");
  $("button.supplier-btn-page")
    .eq(pageNumber - 1)
    .addClass("supplier-active-page");
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
export const uiCreateFailed = (res) => {
  const alert = `<div class="alert alert-danger" role="alert">
                    <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                 </div>`;
  $("#supplier-create-failed").html(alert);
};
export const uiUpdateFailed = (res) => {
  const alert = `<div class="alert alert-danger" role="alert">
                    <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                 </div>`;
  $("#supplier-update-failed").html(alert);
};
