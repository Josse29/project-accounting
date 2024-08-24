import { addSpace } from "../../utils/formatSpace.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
// ui tr inventory from db
export const uiTbody = (el) => {
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
            <td class="align-content-center text-center" style="max-width: 100px">${
              el.PersediaanId
            }</td>
            <td class="align-content-center text-nowrap" style="max-width: 200px">${formatWaktuIndo(
              el.PersediaanDDMY
            )}</td>
            <td class="align-content-center" style="max-width: 100px">${
              el.PersediaanHMS
            }</td>
            <td class="align-content-center text-truncate text-capitalize" style="max-width: 190px">${
              el.ProductName
            }</td>
            <td class="align-content-center text-truncate text-capitalize" style="max-width: 190px">${
              el.CategoryName === null ? "-" : el.CategoryName
            }</td>
            <td class="align-content-center text-truncate text-capitalize" style="max-width: 190px">
              ${el.SupplierName === null ? "-" : el.SupplierName}
            </td>
            <td class="align-content-center text-truncate text-capitalize" style="max-width: 150px">
              Mr.JK
            </td>
            <td class="text-truncate align-content-end text-center" style="max-width: 120px">
              ${PersediaanQty}
            </td>
            <td class="text-truncate align-content-end text-center" style="max-width: 200px">
              ${PersediaanRp}
            </td>
            <td class="align-content-center" style="width:217px">
              <div class="d-flex w-100 justify-content-center gap-2">
                <button id="persediaanDetail"
                  class="btn btn-success text-white"                      
                  data-bs-toggle="modal" 
                  data-bs-target="#persediaanDetailModal"
                  data-productname="${el.ProductName}"
                  data-productpricebuy=${el.ProductPriceBeli} 
                  data-persediaanddmy="${el.PersediaanDDMY}" 
                  data-persediaanHMS="${el.PersediaanHMS}"
                  data-persediaanrp=${el.PersediaanRp}
                  data-persediaanqty=${el.PersediaanQty}
                  data-persediaaninfo="${el.PersediaanInfo}">
                    <i class="fa-solid fa-eye"
                      data-bs-toggle="tooltip" 
                      data-bs-html="true"
                      data-bs-title="<span>lihat-${el.ProductName}</span>" 
                      data-bs-placement="bottom">
                    </i>
                </button>
                <button id="persediaan-update-btn"
                        class="btn btn-primary text-white"
                        data-bs-toggle="modal"
                        data-bs-target="#persediaanUpdateModal"
                        data-persediaanid=${el.PersediaanId}
                        data-persediaanddmy="${el.PersediaanDDMY}" 
                        data-persediaanHMS="${el.PersediaanHMS}"
                        data-persediaanqty=${el.PersediaanQty}
                        data-persediaaninfo="${el.PersediaanInfo}"
                        data-productid=${el.ProductId} 
                        data-productpricebuy=${el.ProductPriceBeli} 
                        data-productname="${el.ProductName}">
                    <i class="fa-solid fa-pencil"
                        data-bs-toggle="tooltip" 
                        data-bs-html="true"
                        data-bs-title="<span>edit-${el.ProductName}</span>" 
                        data-bs-placement="bottom">
                    </i>
                </button>
                <button id="persediaan-delete-btn"
                        class="btn btn-danger text-white"
                        data-bs-toggle="modal"
                        data-bs-target="#persediaanDeleteModal"
                        data-persediaanid=${el.PersediaanId}
                        data-persediaanddmy="${el.PersediaanDDMY}" 
                        data-persediaanHMS="${el.PersediaanHMS}"
                        data-persediaanqty=${el.PersediaanQty}
                        data-productid=${el.ProductId}
                        data-productname="${el.ProductName}">
                    <i class="fa-solid fa-trash-can"
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
export const uiFailedActionPersediaan1 = (res) => {
  const alertFailedMe = `<div class="alert alert-danger" role="alert">
                            <i class="fa-solid fa-triangle-exclamation me-1"></i>
                            ${res}
                          </div>`;
  $("#sectionSuccessActionPersediaan").html(alertFailedMe);
};
// make alert failed after update
export const uiFailedUpdate = (res) => {
  const divFailed = `<div class="alert alert-danger mt-2" role="alert">
                      <i class="fa-solid fa-triangle-exclamation me-1"></i>
                        ${res}
                    </div>`;
  $("#persediaan-update-failed").html(divFailed);
};
export const uiFailedDelete = (res) => {
  const divFailed = `<div class="alert alert-danger mt-2 text-start" role="alert">
                        ${res}
                    </div>`;
  $("#persediaan-delete-failed").html(divFailed);
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
export const uiActivePageButton = (activePage) => {
  const btnPage = $("button.persediaan-btn-page");
  $(btnPage).removeClass("persediaan-active-page");
  $(btnPage)
    .eq(activePage - 1)
    .addClass("persediaan-active-page");
};
// when total row 0 being seaching
export const uiTbodyEmpty = (searchVal) => {
  let search = ``;
  if (searchVal !== "") {
    search = searchVal;
  }
  const html = `<tr>
              <td colspan="10" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">Product ${search} empty....</td>
            </tr>`;
  return html;
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
              rows.HargaBeli
            )}</td>
            <td class="text-nowrap align-content-center">${totalQtyTxt}</td>
            <td class="text-nowrap align-content-center">${totalRpTxt}</td>
          </tr>`;
};
export const uiTrProductSum = (rows, no) => {
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
            <td class="text-nowrap align-content-center">${rows.CategoryName}</td>
            <td class="text-nowrap align-content-center">${totalRpTxt}</td>
          </tr>`;
};
export const uiSumPersediaanDate = () => {
  $("select#persediaan-limit").hide();
  $("input#persediaan-search").hide();
  $("span#persediaan-search").hide();
  $("select#persediaan-refproduct-search").hide();
  $("select#persediaan-refcategory-search").hide();
  $("select#persediaan-refsupplier-search").hide();
  $("select#persediaan-refuser-search").hide();
};
// for show
export const uiSumPersediaanDate2 = () => {
  $("select#persediaan-limit").show();
  $("input#persediaan-search").show();
  $("span#persediaan-search").show();
  $("select#persediaan-refproduct-search").show();
  $("select#persediaan-refcategory-search").show();
  $("select#persediaan-refsupplier-search").show();
  $("select#persediaan-refuser-search").show();
};
// for ipc section success:pdf-persediaan
ipcRenderer.on("success:pdf-persediaan", (e, file_path) => {
  uiSuccessActionPersediaan(`File PDF tersimpan di ${file_path}`);
});
