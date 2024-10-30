import { formatRupiah2 } from "../../../utils/formatRupiah.js";
import { getBalanceSheet, getSumCredit, getSumDebt } from "../services.js";
import { uiTbody, uiTbodyZero } from "./ui.js";

const { status, response } = await getBalanceSheet();
if (status) {
  const existed = response.length >= 1;
  if (existed) {
    await summaryCredit();
    await summaryDebt();
    uiTbody(response);
  }
  if (!existed) {
    uiTbodyZero();
  }
}
if (!status) {
  console.error(response);
}
async function summaryCredit() {
  const { status, response } = await getSumCredit();
  if (status) {
    const rupiah = formatRupiah2(response);
    $("th#accounting-credit").text(rupiah);
  }
  if (!status) {
    console.error(response);
  }
}
async function summaryDebt() {
  const { status, response } = await getSumDebt();
  if (status) {
    const rupiah = formatRupiah2(response);
    $("th#accounting-debt").text(rupiah);
  }
  if (!status) {
    console.error(response);
  }
}
