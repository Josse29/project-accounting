import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";

export const uiTbody = (rows) => {
  const formatYMD = formatWaktuIndo(rows.CashYYYYMMDD);
  const rupiah = formatRupiah2(rows.CashRp);
  const html = `<tr>
                    <td class="text-center align-content-center">${rows.CashId}</td>
                    <td class="text-nowrap align-content-center" style="width:220px">
                        ${formatYMD}
                    </td>
                    <td class="text-wrap align-content-center" style="width:110px;">
                        ${rows.CashHMS}
                    </td>
                    <td class="text-nowrap align-content-center">
                        ${rows.CashName}
                    </td>
                    <td class="text-nowrap align-content-center text-center">
                        <span class="badge fs-6" style="background-color: #119687">${rupiah}</span>
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
  return html;
};
export const uiTbodyEmpty = (searchVal) => {
  const html = `<tr>
                    <td colspan="6" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">${searchVal} not found....</td>
                </tr>`;
  return html;
};
