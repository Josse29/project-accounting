import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";

export const uiTbody = (rows) => {
  const formatYMD = formatWaktuIndo(rows.CashYYYYMMDD);
  const rupiah = formatRupiah2(rows.CashRp);
  //   CashHMS: "13:34:08";
  //   CashId: 1;
  //   CashInfo: "Sales | 52 - Ayam Goreng , Total Qty : 1";
  //   CashName: "Sales";
  //   CashRp: 15000;
  //   CashYYYYMMDD: "2024-08-16";
  const html = `<tr>
                    <td class="text-center align-content-center">1</td>
                    <td class="text-nowrap align-content-center border border-1" style="width:220px">
                        ${formatYMD}
                    </td>
                    <td class="text-wrap align-content-center border border-1" style="width;110px;">
                        ${rows.CashHMS}
                    </td>
                    <td class="text-nowrap align-content-center">
                        ${rows.CashName}
                    </td>
                    <td class="text-nowrap align-content-center">
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
