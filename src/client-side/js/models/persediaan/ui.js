import { addSpace } from "../../utils/formatSpace.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
// ui tr inventory from db
export const uiTrPersediaan = (el) => {
  let PersediaanQty = ``;
  let PersediaanRp = ``;
  const formattedQty = addSpace(el.PersediaanQty);
  if (el.PersediaanQty >= 1) {
    PersediaanQty = `<span class="badge text-bg-success fs-6 text-truncate"  style="max-width: 120px"> + ${el.PersediaanQty}</span>`;
  } else {
    PersediaanQty = `<span class="badge text-bg-danger fs-6 text-truncate"  style="max-width: 120px">${formattedQty}</span>`;
  }
  if (el.PersediaanRp >= 1) {
    PersediaanRp = `<span class="badge text-bg-success fs-6 text-truncate"  style="max-width: 200px"> + ${formatRupiah2(
      el.PersediaanRp
    )}</span>`;
  } else {
    PersediaanRp = `<span class="badge text-bg-danger fs-6 text-truncate"  style="max-width: 200px">- ${formatRupiah2(
      Math.abs(el.PersediaanRp)
    )}</span>`;
  }
  return `<tr>
            <td class="align-content-center text-center" style="width: 100px">${
              el.PersediaanId
            }</td>
            <td class="align-content-center" style="width: 180px">${formatWaktuIndo(
              el.PersediaanDDMY
            )}</td>
            <td class="align-content-center" style="width: 100px">${
              el.PersediaanHMS
            }</td>
            <td class="align-content-center text-truncate text-capitalize" style="width: 190px">${
              el.ProductName
            }</td>
            <td class="align-content-center text-truncate text-capitalize" style="width: 190px">${
              el.CategoryName
            }</td>
            <td class="align-content-center text-truncate text-capitalize" style="width: 190px">
              ${el.SupplierName}
            </td>
            <td class="text-truncate align-content-center" style="width: 150px">
              Mr.JK
            </td>
            <td class="text-truncate align-content-center text-center" style="width: 120px">
              ${PersediaanQty}
            </td>
            <td class="text-truncate align-content-center text-center" style="width: 200px">
              ${PersediaanRp}
            </td>
            <td style="width:217px">
              <div class="d-flex w-100 justify-content-center gap-2">
                <button id="persediaanDetail"
                        class="btn btn-success text-white"                      
                        data-bs-toggle="modal" 
                        data-bs-target="#persediaanDetailModal"
                        data-persediaanprice=${el.PersediaanRp} 
                        data-productname="${el.ProductName}"
                        data-productprice=${el.ProductPrice} 
                        data-persediaanddmy="${el.PersediaanDDMY}" 
                        data-persediaanHMS="${el.PersediaanHMS}"
                        data-persediaanqty=${el.PersediaanQty}
                        data-persediaaninfo="${el.PersediaanInfo}">
                          <i class="fa-solid fa-eye"
                             data-bs-toggle="tooltip" 
                             data-bs-html="true"
                             data-bs-title="<span>lihat-${
                               el.ProductName
                             }</span>" 
                             data-bs-placement="bottom">
                          </i>
                </button>
                <button id="persediaan-update-btn"
                                class="btn btn-primary text-white"
                                data-bs-toggle="modal"
                                data-bs-target="#persediaanUpdateModal"
                                data-persediaanid=${el.PersediaanId}
                                data-persediaanprice=${el.PersediaanRp}
                                data-productid=${el.PersediaanProductId} 
                                data-productname="${el.ProductName}"
                                data-productprice=${el.ProductPrice} 
                                data-persediaanddmy="${el.PersediaanDDMY}" 
                                data-persediaanHMS="${el.PersediaanHMS}"
                                data-persediaanqty=${el.PersediaanQty}
                                data-persediaaninfo="${el.PersediaanInfo}">
                            <i class="fa-solid fa-pencil"
                               data-bs-toggle="tooltip" 
                               data-bs-html="true"
                               data-bs-title="<span>edit-${
                                 el.ProductName
                               }</span>" 
                               data-bs-placement="bottom">
                            </i>
                </button>
                <button id="persediaan-delete-btn"
                                class="btn btn-danger text-white"
                                data-bs-toggle="modal"
                                data-bs-target="#persediaanDeleteModal"
                                data-persediaanid=${el.PersediaanId}
                                data-productname="${el.ProductName}"
                                data-persediaanddmy="${el.PersediaanDDMY}" 
                                data-persediaanHMS="${el.PersediaanHMS}"
                                data-persediaanqty=${el.PersediaanQty}>
                            <i class="fa-solid fa-trash-can"
                               data-bs-toggle="tooltip" 
                               data-bs-html="true"
                               data-bs-title="<span>hapus-${
                                 el.ProductName
                               }</span>" 
                               data-bs-placement="bottom"></i>
                </button>
              </div>
            </td>
          </tr>`;
};
// make alert success after action crud
export const uiSuccessActionPersediaan = (res) => {
  const alertSuccessMe = `<div class="alert alert-success" role="alert">
                              ${res}
                            </div>`;
  $("#sectionSuccessActionPersediaan").html(alertSuccessMe);
  $("#sectionFailedActionPersediaan").html("");
  setTimeout(() => {
    $("#sectionSuccessActionPersediaan").html("");
  }, 20000);
};
// make alert failed after action crud
export const uiFailedActionPersediaan = (res) => {
  const alertFailedMe = `<div class="alert alert-danger" role="alert">
                            <i class="fa-solid fa-triangle-exclamation me-1"></i>
                            ${res}
                          </div>`;
  $("#sectionFailedActionPersediaan").html(alertFailedMe);
};
// make alert failed after update
export const uiFailedUpdate = (res) => {
  const divFailed = `<div class="alert alert-danger" role="alert">
                      <i class="fa-solid fa-triangle-exclamation me-1"></i>
                      ${res}
                    </div>`;
  $("#persediaan-update-failed").html(divFailed);
};
export const uiSucceedUpdate = (res) => {
  const alertSuccessMe = `<div class="alert alert-success" role="alert">
                            ${res}
                        </div>`;
  $("#sectionSuccessActionPersediaan").html(alertSuccessMe);
  $("#persediaan-update-failed").html("");
  setTimeout(() => {
    $("#sectionSuccessActionPersediaan").html("");
  }, 20000);
};
// button pagination
export const uiBtnPersediaanPage = (i) => {
  return `<button type = "button" 
                  class="persediaan-btn-page ${
                    i === 1 ? "persediaan-active-page" : ""
                  }" >
                    ${i}
          </button>`;
};
// Function to update active page button
export const uiActivePageButton = (
  persediaanNoActivePage,
  persediaanBtnPage
) => {
  const persediaanBtnPageActive = document.getElementsByClassName(
    "persediaan-active-page"
  );
  if (persediaanBtnPageActive.length >= 1) {
    persediaanBtnPageActive[0].classList.remove("persediaan-active-page");
  }
  persediaanBtnPage[persediaanNoActivePage - 1].classList.add(
    "persediaan-active-page"
  );
};
// when total row 0 being seaching
export const uiTrZeroSearch = (searchVal) => {
  return `<tr>
              <td colspan="10" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">Persediaan ${searchVal} tidak ditemukan....</td>
            </tr>`;
};
// when total row 0 being seaching
export const uiTrZero = () => {
  return `<tr>
              <td colspan="10" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">tidak ada persediaan....</td>
            </tr>`;
};
// blank value after submit action
export const uiBlankValue = () => {
  $("input#persediaan-refproduct-search-name").val("");
  $("input#persediaan-refproduct-create-id").val("");
  $("input#persediaan-refproduct-create-name").val("");
  $("input#persediaan-create-qty").val(0);
  $("textarea#persediaan-create-info").val("");
};
export const uiTrPDF = (rows, no) => {
  const totalQty = rows.PersediaanQty;
  const totalRp = rows.PersediaanRp;
  let totalQtyTxt = totalQty >= 1 ? `+ ${totalQty}` : `- ${Math.abs(totalQty)}`;
  let totalRpTxt =
    totalRp >= 1
      ? `+ ${formatRupiah2(totalRp)}`
      : `- ${formatRupiah2(Math.abs(totalRp))}`;
  return `<tr>
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
              rows.ProductPrice
            )}</td>
            <td class="text-nowrap align-content-center">${totalQtyTxt}</td>
            <td class="text-nowrap align-content-center">${totalRpTxt}</td>
          </tr>`;
};
export const uiTrProductSum = (rows, no) => {
  const totalQty = rows.TotalQty;
  const totalRp = rows.TotalRp;
  let totalQtyTxt = totalQty >= 1 ? `+ ${totalQty}` : `- ${Math.abs(totalQty)}`;
  let totalRpTxt =
    totalRp >= 1
      ? `+ ${formatRupiah2(totalRp)}`
      : `- ${formatRupiah2(Math.abs(totalRp))}`;
  return `<tr>
            <td class="text-center text-nowrap align-content-center">${no}</td>
            <td class="text-nowrap align-content-center">${
              rows.ProductName
            }</td>
            <td class="text-nowrap align-content-center">${formatRupiah2(
              rows.ProductPrice
            )}</td>
            <td class="text-nowrap align-content-center">${totalQtyTxt}</td>
            <td class="text-nowrap align-content-center">${totalRpTxt}</td>
          </tr>`;
};
export const uiTrSupplier = (rows, no) => {
  const totalQty = rows.PersediaanQty;
  const totalRp = rows.PersediaanRp;
  let totalQtyTxt = totalQty >= 1 ? `+ ${totalQty}` : `- ${Math.abs(totalQty)}`;
  let totalRpTxt =
    totalRp >= 1
      ? `+ ${formatRupiah2(totalRp)}`
      : `- ${formatRupiah2(Math.abs(totalRp))}`;
  return `<tr>
            <td class="text-center text-nowrap align-content-center">${no}</td>
            <td class="text-nowrap align-content-center">${
              rows.SupplierName
            }</td>
            <td class="text-nowrap align-content-center">${
              rows.ProductName
            }</td>
            <td class="text-nowrap align-content-center">${formatRupiah2(
              rows.ProductPrice
            )}</td>
            <td class="text-nowrap align-content-center">${totalQtyTxt}</td>
            <td class="text-nowrap align-content-center">${totalRpTxt}</td>
          </tr>`;
};
export const uiTrSupplierSum = (rows, no) => {
  const totalQty = rows.TotalQty;
  const totalRp = rows.TotalRp;
  let totalQtyTxt = totalQty >= 1 ? `+ ${totalQty}` : `- ${Math.abs(totalQty)}`;
  let totalRpTxt =
    totalRp >= 1
      ? `+ ${formatRupiah2(totalRp)}`
      : `- ${formatRupiah2(Math.abs(totalRp))}`;
  return `<tr>
            <td class="text-center text-nowrap align-content-center">${no}</td>
            <td class="text-nowrap align-content-center">${rows.SupplierName}</td>
            <td class="text-nowrap align-content-center">${totalQtyTxt}</td>
            <td class="text-nowrap align-content-center">${totalRpTxt}</td>
          </tr>`;
};
ipcRenderer.on("success:pdf-persediaan", (e, file_path) => {
  uiSuccessActionPersediaan(`File PDF tersimpan di ${file_path}`);
});
