import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";

export const uiTbody = (response) => {
  let tbody = ``;
  response.forEach((rows) => {
    // cashYMD
    const formatYMD = formatWaktuIndo(rows.CashYYYYMMDD);
    // cashHMS
    const HMS = rows.CashHMS;
    // cashId
    const cashId = rows.CashId;
    // cashName
    const cashName = rows.CashName;
    // cashRp
    const cashRp = rows.CashRp;
    const rupiah = formatRupiah2(cashRp);
    tbody += `
    <tr>
      <td class="text-center align-content-center">${cashId}</td>
      <td class="text-nowrap align-content-center">
        ${formatYMD}
      </td>
      <td class="text-nowrap align-content-center">
        ${HMS}
      </td>
      <td class="text-truncate align-content-center pe-3">${cashName}</td>
      <td class="text-truncate align-content-center text-center pe-3">
        <span class="badge fs-6" style="background-color: #119687"
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
    </tr>`;
  $("tbody#cash").html(tr);
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
};
