import { formatRupiah2 } from "../../../utils/formatRupiah.js";

export const uiTbody = (rows) => {
  const rupiahDebt =
    rows.AccountingPosition === "debt"
      ? formatRupiah2(rows.TotalRp)
      : formatRupiah2(0);
  const rupiahCredit =
    rows.AccountingPosition === "credit"
      ? formatRupiah2(rows.TotalRp)
      : formatRupiah2(0);
  const html = `<tr>
                    <td class="text-center align-content-center text-capitalize">${rows.AccountingRef}</td>
                    <td class="text-nowrap align-content-center">${rows.AccountingName}</td>
                    <td class="text-nowrap align-content-center">
                      ${rupiahDebt}
                    </td>
                    <td class="text-nowrap align-content-center">${rupiahCredit}</td>
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
  return html;
};
export const uiTbodyZero = () => {
  return `<tr>
              <td colspan="5" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">empty....</td>
            </tr>`;
};
