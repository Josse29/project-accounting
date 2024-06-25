import { formatWaktuIndo } from "../../utils/waktuIndo.js";

// ui tr supplier from db
export const trSupplier = (el) => {
  const splitDateTime = el.SupplierDate.split(" ");
  const dateSupplier = formatWaktuIndo(splitDateTime[0]);
  return `<tr>
                <td class="text-center align-content-center">${el.SupplierId}</td>
                <td class="align-content-center">${dateSupplier}</td>
                <td class="align-content-center text-nowrap text-capitalize">${el.SupplierName}</td>
                <td class="text-nowrap align-content-center">
                    <ul id="supplier-refproduct-list">
                        <li>An item</li>
                        <li>A second item</li>
                        <li>A third item</li>
                        <li>A fourth item</li>
                        <li>And a fifth one</li>
                    </ul>
                </td>
                <td class="align-content-center">
                    <div class="d-flex w-100 justify-content-center gap-2">
                        <button 
                            class="btn btn-success text-white"
                            data-bs-toggle="modal" 
                            data-bs-target="#supplierDetailModal" 
                            id="supplierDetail" 
                            data-supplierid="${el.SupplierId}"  
                            data-suppliername="${el.SupplierName}"
                            data-supplierinfo="${el.SupplierInfo}"
                            data-supplierimg="${el.SupplierImg}"
                            >
                                <i 
                                    class="fa-solid fa-eye"
                                    data-bs-toggle="tooltip" 
                                    data-bs-html="true"
                                    data-bs-title="<span>lihat-${el.SupplierName}</span>" 
                                    data-bs-placement="bottom">
                                </i>
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
                                <i 
                                    class="fa-solid fa-pencil"
                                    data-bs-toggle="tooltip" 
                                    data-bs-html="true"
                                    data-bs-title="<span>edit-${el.SupplierName}</span>" 
                                    data-bs-placement="bottom">
                                </i>
                        </button>
                        <button
                            class="btn btn-danger text-white"
                            data-bs-toggle="modal" 
                            data-bs-target="#supplierDeleteModal" 
                            id="supplierDelete" 
                            data-supplierid="${el.SupplierId}"  
                            data-suppliername="${el.SupplierName}"
                            data-supplierinfo="${el.SupplierInfo}">
                                <i 
                                    class="fa-solid fa-trash-can"
                                    data-bs-toggle="tooltip" 
                                    data-bs-html="true"
                                    data-bs-title="<span>hapus-${el.SupplierName}</span>" 
                                    data-bs-placement="bottom">
                                </i>
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
  return `<button type = "button" class="supplier-btn-page ${
    i === 1 ? "supplier-active-page" : ""
  }" >
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
