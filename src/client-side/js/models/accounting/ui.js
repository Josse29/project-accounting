import { formatRupiah2 } from "../../utils/formatPrice.js";
import { formatWaktuIndo, timeIndonesian } from "../../utils/formatTime.js";

export const uiTbody = (response) => {
  let tBody = ``;
  response.forEach((rows) => {
    const accountingYMD = rows.AccountingYMD;
    const dateByMe = formatWaktuIndo(accountingYMD);
    const accountingName = rows.AccountingName;
    const accountingRef = rows.AccountingRef;
    const accountingDebt = rows.AccountingDebt;
    const rupiahDebt =
      accountingDebt >= 1 ? formatRupiah2(accountingDebt) : formatRupiah2(0);
    const accountingCredit = rows.AccountingCredit;
    const positionCredit = accountingCredit >= 1 && "ps-4";
    const rupiahCredit =
      accountingCredit >= 1
        ? formatRupiah2(accountingCredit)
        : formatRupiah2(0);

    tBody += `
    <tr>
      <td class="text-center align-content-center">${accountingRef}</td>
      <td class="text-truncate align-content-center pe-3">
        ${dateByMe}
      </td>
      <td class="text-truncate align-content-center pe-3 ${positionCredit}">
          ${accountingName}
      </td>
      <td class="text-truncate align-content-center pe-3">
          ${rupiahDebt}
      </td>
      <td class="text-truncate align-content-center pe-3">${rupiahCredit}</td>
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
    </tr>
    `;
    $("tbody#general-entries").html(tBody);
  });
};
export const uiPDF = (response, summary) => {
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
  let tBody = ``;
  response.forEach((rows) => {
    // AccountingYMD
    const accountingYMD = rows.AccountingYMD;
    // accountingName
    const accountingName = rows.AccountingName;
    // accountingRef
    const accountingRef = rows.AccountingRef;
    // accountingDebt
    const accountingDebt = rows.AccountingDebt;
    const rupiahDebt =
      accountingDebt >= 1 ? formatRupiah2(accountingDebt) : formatRupiah2(0);
    // accountingCredit
    const accountingCredit = rows.AccountingCredit;
    const positionCredit = accountingCredit >= 1 && "ps-4";
    const rupiahCredit =
      accountingCredit >= 1
        ? formatRupiah2(accountingCredit)
        : formatRupiah2(0);
    tBody += `
    <tr>
      <td class="text-center align-content-center">${accountingRef}</td>
      <td class="text-truncate align-content-center pe-3">
        ${accountingYMD}
      </td>
      <td class="text-truncate align-content-center pe-3 ${positionCredit}">
          ${accountingName}
      </td>
      <td class="text-truncate align-content-center pe-3">
          ${rupiahDebt}
      </td>
      <td class="text-truncate align-content-center pe-3">${rupiahCredit}</td>
    </tr>
    `;
  });
  const { sumCredit, sumDebt } = summary;
  const html1 = `
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="text-center">Ref</th>
        <th>Date</th>
        <th>Name</th>
        <th>Debt</th>
        <th>Credit</th>
      </tr>
    </thead>
    <tbody>
      ${tBody}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="3" class="text-center">Total</th>
        <th colspan="1">${formatRupiah2(sumDebt)}</th>
        <th colspan="1">${formatRupiah2(sumCredit)}</th>
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
        style="background-color: #273eec"
      >
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">${html} ${html1}</div>
    </div>
  </div>
  `;
  return html2;
};
export const uiTbodyZero = () => {
  const tr = `
    <tr>
      <td
        colspan="6"
        class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize"
        style="background-color: #f2f2f2"
      >
        empty....
      </td>
    </tr>
  `;
  $("tbody#general-entries").html(tr);
};
export const uiBtnPage = (totalPage) => {
  let btnPage = ``;
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 && "general-entries-page-active";
    btnPage += `<button
                type="button"
                class="btn border border-2 fs-6 general-entries-page ${actived}">
                  ${i}
             </button>`;
  }
  $("div#general-entries-page-number").html(btnPage);
  $("div#general-entries-pagination").removeClass("d-none");
};
export const uiBtnPageActived = (number) => {
  const btnGeneralEntry = $("button.general-entries-page");
  btnGeneralEntry.removeClass("general-entries-page-active");
  btnGeneralEntry.eq(number - 1).addClass("general-entries-page-active");
};
export const uiTbody1 = (response) => {
  let tbody = ``;
  response.forEach((rows) => {
    // accountingName
    const accountingName = rows.AccountingName;
    // accounting ref
    const accountingRef = rows.AccountingRef;
    // accountingPosition
    const accountingDebt = rows.TotalDebt;
    const rupiahDebt =
      accountingDebt >= 1 ? formatRupiah2(accountingDebt) : formatRupiah2(0);
    const accountingCredit = rows.TotalCredit;
    const rupiahCredit =
      accountingCredit >= 1
        ? formatRupiah2(accountingCredit)
        : formatRupiah2(0);
    tbody += `
    <tr>
      <td class="text-center align-content-center text-capitalize">
        ${accountingRef}
      </td>
      <td class="text-truncate align-content-center pe-3">${accountingName}</td>
      <td class="text-truncate align-content-center pe-3">${rupiahDebt}</td>
      <td class="text-truncate align-content-center pe-3">${rupiahCredit}</td>
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
  $("tbody#balance-sheet").html(tbody);
};
export const uiTbodyZero1 = () => {
  const tr = `
  <tr>
    <td
      colspan="5"
      class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize"
      style="background-color: #f2f2f2"
    >
      empty....
    </td>
  </tr>`;
  $("tbody#balance-sheet").html(tr);
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
  </div>`;
  $("#accounting-card .section-alert").html(alert);
};
export const uiAlertFailed = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("div#accounting-modal-convert-csv div.failed").html(alert);
};
export const uiAlertFailed1 = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("div#accounting-modal-convert-pdf div.failed").html(alert);
};
export const uiAlertFailed2 = (res) => {
  const alert = `
  <div
    class="alert alert-danger alert-dismissible fade show text-start"
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
  $("#accounting-card .section-alert").html(alert);
};
export const uiAlertFailed3 = (res) => {
  const alertFailed = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `;
  $("#accountingCashInModal #failed").html(alertFailed);
};
