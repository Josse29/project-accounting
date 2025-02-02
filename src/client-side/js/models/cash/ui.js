import { formatPrice, formatRupiah2 } from "../../utils/formatPrice.js";
import { formatWaktuIndo, timeIndonesian } from "../../utils/formatTime.js";

export const uiTbody = (response) => {
  let tbody = ``;
  response.forEach((rows) => {
    const CashDate = formatWaktuIndo(rows.CashDate);
    const CashTime = rows.CashTime;
    const cashId = rows.CashId;
    const cashName = rows.CashName;
    const CashBalance = rows.CashBalance;
    const bgCashBalance = CashBalance >= 1 ? "#119687" : "#e11d48";
    const rupiah =
      CashBalance >= 1
        ? `+ ${formatRupiah2(CashBalance)}`
        : `- ${formatRupiah2(Math.abs(CashBalance))}`;
    tbody += `
    <tr>
      <td class="text-center align-content-center">${cashId}</td>
      <td class="text-truncate align-content-center pe-3">
        ${CashDate}
      </td>
      <td class="text-truncate align-content-center pe-3">
        ${CashTime}
      </td>
      <td class="text-truncate align-content-center pe-3">${cashName}</td>
      <td class="text-truncate align-content-center text-center pe-3">
        <span class="text-truncate badge fs-6" 
              style="background-color: ${bgCashBalance}; max-width: 100%"
          >${rupiah}</span
        >
      </td>
      <td>
        <div class="d-flex w-100 justify-content-center gap-2">
          <button class="btn btn-success text-white">
            <i class="fa-solid fa-eye"></i>
          </button>
          <button class="btn btn-primary text-white">
            <i class="fa-solid fa-pencil"></i>
          </button>
          <button class="btn btn-danger text-white">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>`;
  });
  $("tbody#cash").html(tbody);
};
export const uiTbodyEmpty = (searchVal) => {
  let search = "empty....";
  if (searchVal !== "") {
    search = `${searchVal} not found....`;
  }
  const tr = `
  <tr>
    <td
      colspan="6"
      class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize"
      style="background-color: #f2f2f2"
    >
      ${search}
    </td>
  </tr>
  `;
  $("tbody#cash").html(tr);
  $("div#cash-pagination-container").addClass("d-none");
};
export const uiTbodyLoad = () => {
  const tr = `
      <tr>
        <td
          colspan="6"
          class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize"
          style="background-color: #f2f2f2"
        >
          loading....
        </td>
      </tr>`;
  $("tbody#cash").html(tr);
  $("div#cash-pagination-container").addClass("d-none");
};
export const uiBtnPageActive = (number) => {
  const btnCashPage = $("button.cash-page-number");
  btnCashPage.removeClass("cash-page-active");
  btnCashPage.eq(number - 1).addClass("cash-page-active");
};
export const uiBtnPage = (totalPage) => {
  let btn = ``;
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 && "cash-page-active";
    btn += `<button 
              type="button" 
              class="btn border border-2 fs-6 cash-page-number ${actived}">
             ${i}
            </button>`;
  }
  $("div#cash-pagination").html(btn);
  $("div#cash-pagination-container").removeClass("d-none");
};
export const uiAlertSuccess = (res) => {
  const alert = `
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
  $("#section-alert").html(alert);
};
// for pdf
export const uiPDF = (response, sumCash) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  const html = `
  <h3>Table Cash</h3>
  <h6>${indonesiaDDMY}</h6>
  <div class="d-flex gap-1">
    <h6>${indonesiaHour} :</h6>
    <h6>${indonesiaMinute} :</h6>
    <h6>${indonesiaSecond}</h6>
  </div>
  `;
  let tr = ``;
  let no = 1;
  // tbody
  response.forEach((row) => {
    // cash name
    const cashName = row.CashName;
    // cash date
    const cashDate = row.CashDate;
    // cash price
    const CashBalance = row.CashBalance;
    tr += `<tr>
            <td>${no++}</td>
            <td>${cashDate}</td>
            <td>${cashName}</td>
            <td>${formatPrice(CashBalance)}</td>
           </tr>`;
  });
  const html1 = `
  <table class="table table-striped">
    <thead>
      <tr>
        <th>No</th>
        <th>Date</th>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      ${tr}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="3" class="text-center">Total</th>
        <th colspan="1">${formatPrice(sumCash)}</th>
      </tr>
    </tfoot>
  </table>
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
export const uiAlertFailed = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("#cash-modal-convert-csv .failed").html(alert);
};
export const uiAlertFailed1 = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("#cash-modal-convert-pdf .failed").html(alert);
};
export const uiAlertFailed2 = (res) => {
  const alert = `<div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
                    <strong class="text-capitalize">${res}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div>`;
  $("#section-alert").html(alert);
};
export const uiSummary = (rupiah, startDateVal, endDateVal) => {
  const price = rupiah !== "" ? formatRupiah2(rupiah) : formatRupiah2(0);
  const uiSummary = `
  <h4 class="text-capitalize fw-bold">
    ${formatWaktuIndo(startDateVal)} 
    - ${formatWaktuIndo(endDateVal)}  
  </h4>
  <h5>Total : ${price}</h5>
  `;
  $("div#cash-summary").html(uiSummary);
};
