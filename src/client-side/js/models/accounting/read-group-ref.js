import { formatRupiah2 } from "../../utils/formatPrice.js";
import { getBalanceSheet, getSumDebtCredit } from "./services.js";
import { uiTbody1, uiTbodyZero1 } from "./ui.js";

const { status, response } = await getBalanceSheet();
if (status) {
  const existed = response.length >= 1;
  if (existed) {
    await sumDebtCredit();
    uiTbody1(response);
  }
  if (!existed) {
    uiTbodyZero1();
  }
}
if (!status) {
  console.error(response);
}
async function sumDebtCredit() {
  const { status, response } = await getSumDebtCredit();
  if (status) {
    const { sumDebt, sumCredit } = response;
    $("th#accounting-debt").text(formatRupiah2(sumDebt));
    $("th#accounting-credit").text(formatRupiah2(sumCredit));
  }
  if (!status) {
    console.error(response);
  }
}
