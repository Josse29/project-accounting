import { formatWaktuIndo } from "../../utils/formatTime.js";
// ui tr supplier from db
export const uiTbody = (response) => {
  let tr = ``;
  response.forEach((el) => {
    // supplier id
    const supplierId = el.SupplierId;
    // suppliername
    const supplierName = el.SupplierName;
    // supplierInfo
    const supplierInfo = el.SupplierInfo;
    // supplierImg
    const supplierImg = el.SupplierImg;
    // product list
    const supplierProductList = el.SupplierProductList;
    // date
    const splitDateTime = el.SupplierDate.split(" ");
    const dateSupplier = formatWaktuIndo(splitDateTime[0]);
    tr += `
    <tr
      data-supplierid=${supplierId}
      data-suppliername="${supplierName}"
      data-supplierinfo="${supplierInfo}"
      data-supplierimg="${supplierImg}"
      data-supplierdate="${dateSupplier}"
      data-supplierproductlist="${supplierProductList}"
    >
      <td class="text-center align-content-center text-truncate pe-2">
        ${supplierId}
      </td>
      <td class="align-content-center text-capitalize text-truncate pe-2">
        ${supplierName}
      </td>
      <td class="align-content-center">
        <div class="d-flex w-100 justify-content-center gap-2">
          <button
            class="btn btn-success text-white"
            id="supplierDetail"
            data-bs-toggle="modal"
            data-bs-target="#supplierDetailModal"
          >
            <i
              class="fa-solid fa-eye"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>See-${supplierName}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
          <button
            class="btn btn-primary text-white"
            data-bs-toggle="modal"
            data-bs-target="#supplierUpdateModal"
            id="supplierUpdate"
          >
            <i
              class="fa-solid fa-pencil"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>Update-${supplierName}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
          <button
            class="btn btn-danger text-white"
            data-bs-toggle="modal"
            data-bs-target="#supplierDeleteModal"
            id="supplierDelete"
          >
            <i
              class="fa-solid fa-trash-can"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>Delete-${supplierName}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
        </div>
      </td>
    </tr>`;
  });
  $("#supplier-table").html(tr);
};
// it doesn't exist supplier while  event search
export const uiTbodyZero = (searchVal) => {
  let search = `Supplier Empty ......`;
  if (searchVal !== "") {
    search = `Supplier - ${searchVal} is empty`;
  }
  const tr = `
    <tr>
      <td
        colspan="5"
        class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize"
        style="background-color: #f2f2f2"
      >
        ${search}
      </td>
    </tr>`;
  $("#supplier-table").html(tr);
  $("div#supplier-pagination").addClass("d-none");
};
export const uiTbodyLoad = () => {
  const tr = `
    <tr>
      <td
        colspan="5"
        class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize"
        style="background-color: #f2f2f2"
      >
        Loading.....
      </td>
    </tr>`;
  $("#supplier-table").html(tr);
  $("div#supplier-pagination").addClass("d-none");
};
// button pagination
export const uiBtnPage = (totalPage) => {
  let btn = "";
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 ? "supplier-active-page" : "";
    btn += `<button 
              type="button" 
              class="supplier-btn-page ${actived}">
                ${i}
            </button>`;
  }
  $("#supplier-number-page").html(btn);
  $("div#supplier-pagination").removeClass("d-none");
};
// update active pagination
export function uiBtnPageActive(pageNumber) {
  $("button.supplier-btn-page").removeClass("supplier-active-page");
  $("button.supplier-btn-page")
    .eq(pageNumber - 1)
    .addClass("supplier-active-page");
}
// create blank after success event
export const uiBlankVal = () => {
  $("#supplier-create-name").val("");
  $("#supplier-create-img").val("");
  $("#supplier-create-info").val("");
  $("#supplier-create-img-section").addClass("d-none");
};
export const uiOption = (element) => {
  return `<option value="${element.SupplierId}" class="text-capitalize">${element.SupplierName}</option>`;
};
// make alert success after action crud
export const uiAlertSuccess = (res) => {
  const alertSuccessMe = `<div class="alert alert-success alert-dismissible fade show text-start" role="alert">
                            <strong class="text-capitalize">${res}</strong> 
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                          </div>`;
  $("#sectionSuccessActionSupply").html(alertSuccessMe);
};
export const uiAlertFailCreate = (res) => {
  const alert = `<div class="alert alert-danger" role="alert">
                    <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                 </div>`;
  $("#supplier-create-failed").html(alert);
};
export const uiAlertFailUpdate = (res) => {
  const alert = `<div class="alert alert-danger" role="alert">
                    <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                 </div>`;
  $("#supplier-update-failed").html(alert);
};
