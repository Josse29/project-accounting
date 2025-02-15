import { formatRupiah2 } from "../../utils/formatPrice.js";
import { formatWaktuIndo, timeIndonesian } from "../../utils/formatTime.js";

const uiTbody = (response) => {
  let tr = ``;
  response.forEach((rows) => {
    const equityId = rows.EquityId;
    const equityDate = formatWaktuIndo(rows.EquityDate);
    const equityTime = rows.EquityTime;
    const equityBalance = formatRupiah2(rows.EquityBalance);
    const userFullname = rows.UserFullname;
    const userEmail = rows.UserEmail;
    tr += `
    <tr>
    <td class="align-content-center text-center">${equityId}</td>
    <td class="align-content-center pe-3 text-truncate">${equityDate}</td>
    <td class="align-content-center pe-3 text-truncate">${equityTime}</td>
    <td class="align-content-center pe-3 text-truncate text-capitalize">${userFullname}</td>
    <td class="align-content-center pe-3 text-truncate">${userEmail}</td>
    <td class="align-content-center pe-3 text-truncate text-center">${equityBalance}</td>
    <td class="align-content-center">
        <div class="d-flex w-100 justify-content-center gap-2">
        <button
            class="btn btn-success text-white"
            id="categoryDetailBtn"
            data-bs-toggle="modal"
            data-bs-target="#categoryDetailModal"
        >
            <i
            class="fa-solid fa-eye"
            data-bs-toggle="tooltip"
            data-bs-html="true"
            data-bs-title="<span>See-${userFullname}</span>"
            data-bs-placement="bottom"
            ></i>
        </button>
        <button
            class="btn btn-primary text-white"
            id="editCategory"
            data-bs-toggle="modal"
            data-bs-target="#categoryModalEdit"
        >
            <i
            class="fa-solid fa-pencil"
            data-bs-toggle="tooltip"
            data-bs-html="true"
            data-bs-title="<span>Update-${userFullname}</span>"
            data-bs-placement="bottom"
            ></i>
        </button>
        <button
            class="btn btn-danger text-white"
            id="deleteCategory"
            data-bs-toggle="modal"
            data-bs-target="#confirmDeleteCategoryModal"
        >
            <i
            class="fa-solid fa-trash-can"
            data-bs-toggle="tooltip"
            data-bs-html="true"
            data-bs-title="<span>Delete-${userFullname}</span>"
            data-bs-placement="bottom"
            ></i>
        </button>
        </div>
    </td>
    </tr>
    `;
  });
  $("#equity-table table tbody").html(tr);
};
const uiTbodyLoad = () => {
  const tr = `
  <tr>
    <td
      colspan="7"
      class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize"
      style="background-color: #f2f2f2"
    >
      Loading....
    </td>
  </tr>
  `;
  $("#equity-table table tbody").html(tr);
  $("div#equity-pagination-container").addClass("d-none");
};
const uiTbodyEmpty = (searchVal) => {
  const searchTxt = `Empty...`;
  const searchTxt1 = `${searchVal} - not found`;
  const tr = `
  <tr>
    <td
      colspan="7"
      class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize"
      style="background-color: #f2f2f2"
    >
      ${searchVal === "" ? searchTxt : searchTxt1}
    </td>
  </tr>
  `;
  $("#equity-table table tbody").html(tr);
  $("div#equity-pagination-container").addClass("d-none");
};
const uiBtnPage = (totalPage) => {
  let btn = ``;
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 && "equity-page-active";
    btn += `<button 
              type="button" 
              class="btn border border-2 fs-6 equity-page-number ${actived}">
             ${i}
            </button>`;
  }
  $("div#equity-pagination").html(btn);
  $("div#equity-pagination-container").removeClass("d-none");
};
const uiBtnPageActive = (number) => {
  const btnEquityPage = $("button.equity-page-number");
  btnEquityPage.removeClass("equity-page-active");
  btnEquityPage.eq(number - 1).addClass("equity-page-active");
};
const uiAlertSuccess = (res) => {
  const alert = `
  <div class="alert alert-success alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("#equity-card #section-alert").html(alert);
};
const uiAlertFail = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("#equity-card #section-alert").html(alert);
};
const uiAlertFail1 = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("#equity-convert-csv .failed").html(alert);
};
const uiAlertFail2 = (res) => {
  const alert = `
  <div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
    <strong class="text-capitalize">${res}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  $("#equity-convert-pdf .failed").html(alert);
};
const uiPDF = (equityDate, equityDateGroupUser, equitySumDate) => {
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  // 1. section-1
  const div = `
  <div class="mb-3">
    <h3>Table Equity</h3>
    <h6>${indonesiaDDMY}</h6>
    <div class="d-flex gap-1">
      <h6>${indonesiaHour} :</h6>
      <h6>${indonesiaMinute} :</h6>
      <h6>${indonesiaSecond}</h6>
    </div>
  </div>
  `;
  // 2. section-2
  let tr = ``;
  let no = 1;
  // tbody
  equityDate.forEach((row) => {
    const userFullname = row.UserFullname;
    const equityBalance = row.EquityBalance;
    const equityDate = row.EquityDate;
    tr += `<tr>
            <td class="text-center">${no++}</td>
            <td class="pe-3">${equityDate}</td>
            <td class="text-capitalize pe-3">${userFullname}</td>
            <td>${formatRupiah2(equityBalance)}</td>
           </tr>`;
  });
  const div1 = `
  <div class="mb-3">
    <table class="table table-striped w-auto">
      <thead>
        <tr>
          <th class="text-center">No</th>
          <th>Date</th>
          <th>Fullname</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        ${tr}
      </tbody>
      <tfoot>
        <tr>
          <th colspan="3" class="text-center pe-2">Total</th>
          <th colspan="1">${formatRupiah2(equitySumDate)}</th>
        </tr>
      </tfoot>
    </table>
  </div>
  `;
  // 3. section-3
  let tr1 = ``;
  let no1 = 1;
  // tbody
  equityDateGroupUser.forEach((row) => {
    const userFullname = row.UserFullname;
    const equityBalance = row.EquityBalanceSum;
    tr1 += `<tr>
              <td class="text-center">${no1++}</td>
              <td class="text-capitalize pe-3">${userFullname}</td>
              <td>${formatRupiah2(equityBalance)}</td>
             </tr>`;
  });
  const div2 = `
  <div class="mb-3">
    <h5>Summary Of Equity</h5>
    <table class="table table-striped w-auto">
      <thead>
        <tr>
          <th class="text-center">No</th>
          <th>Fullname</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        ${tr1}
      </tbody>
      <tfoot>
        <tr>
          <th colspan="2" class="text-center pe-2">Total</th>
          <th colspan="1">${formatRupiah2(equitySumDate)}</th>
        </tr>
      </tfoot>
    </table>
  </div>
    `;
  const html = `          
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
        ${div}
        ${div1}
        ${div2}
      </div>
    </div>
  </div>`;
  return html;
};

export {
  uiAlertSuccess,
  uiAlertFail,
  uiAlertFail1,
  uiAlertFail2,
  uiBtnPage,
  uiBtnPageActive,
  uiPDF,
  uiTbody,
  uiTbodyLoad,
  uiTbodyEmpty,
};
