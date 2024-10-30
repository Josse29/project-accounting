import { formatRupiah2 } from "../../../utils/formatRupiah.js";

export const uiTbody = (response) => {
  let tbody = ``;
  response.forEach((rows) => {
    // accountingName
    const accountingName = rows.AccountingName;
    // accounting ref
    const accountingRef = rows.AccountingRef;
    // accountingPosition
    const accountingPosition = rows.AccountingPosition;
    const rupiahDebt =
      accountingPosition === "debt"
        ? formatRupiah2(rows.TotalRp)
        : formatRupiah2(0);
    const rupiahCredit =
      accountingPosition === "credit"
        ? formatRupiah2(rows.TotalRp)
        : formatRupiah2(0);
    tbody += `
    <tr>
      <td class="text-center align-content-center text-capitalize">
        ${accountingRef}
      </td>
      <td class="text-truncate align-content-center">${accountingName} sdfsdfsdfsdfsdfsdfsdf</td>
      <td class="text-truncate align-content-center">${rupiahDebt}</td>
      <td class="text-truncate align-content-center">${rupiahCredit}</td>
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
export const uiTbodyZero = () => {
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
