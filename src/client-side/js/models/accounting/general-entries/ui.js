import { formatRupiah2 } from "../../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../../utils/formatWaktu.js";

export const uiTbody = (response) => {
  let tBody = ``;
  response.forEach((rows) => {
    // AccountingYMD
    const accountingYMD = rows.AccountingYMD;
    const dateByMe = formatWaktuIndo(accountingYMD);
    // accountingName
    const accountingName = rows.AccountingName;
    // accountingRef
    const accountingRef = rows.AccountingRef;
    // accountingPosition
    const accountingPosition = rows.AccountingPosition;
    const positionCredit = accountingPosition === "credit" ? "ps-4" : "";
    // accountingRp
    const accountingRp = rows.AccountingRp;
    const rupiahDebt =
      accountingPosition === "debt"
        ? formatRupiah2(accountingRp)
        : formatRupiah2(0);
    const rupiahCredit =
      accountingPosition === "credit"
        ? formatRupiah2(accountingRp)
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
};
export const uiBtnPageActived = (number) => {
  const btnGeneralEntry = $("button.general-entries-page");
  btnGeneralEntry.removeClass("general-entries-page-active");
  btnGeneralEntry.eq(number - 1).addClass("general-entries-page-active");
};
