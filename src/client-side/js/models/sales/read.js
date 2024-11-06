import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { getLimitOffset, getRowPage, getSum } from "./services.js";
import { uiBtnPageActive, uiReset, uiTbody, uiTbodyEmpty } from "./ui.js";
import { handlePagination } from "./pagination.js";
// function
getSales1();
// 1. get total page and row
export async function getSales1() {
  uiReset();
  // get all value
  const searchVal = $("input#sales-read-search").val();
  const limitVal = parseInt($("select#sales-read-limit").val());
  const offsetVal = 1;
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const { status, response } = await getRowPage(req);
  const { totalPage, totalRow } = response;
  if (status) {
    const existed = totalRow >= 1;
    if (existed) {
      await getSummary();
      await getPage(req);
      handlePagination(totalPage);
    }
    if (!existed) {
      uiTbodyEmpty(req.searchVal);
      $("div#sales-total-sum").text(`Rp 0.00,-`);
    }
  }
  if (!status) {
    console.error(response);
  }
}
// 2. get summary
export async function getSummary() {
  const { status, response } = await getSum();
  if (status) {
    const currency = formatRupiah2(response);
    $("div#sales-total-sum").text(currency);
  }
  if (!status) {
    console.error(response);
  }
}
// 3. get sales by limit and offset
export async function getPage(req) {
  const { status, response } = await getLimitOffset(req);
  if (status) {
    uiTbody(response);
    uiBtnPageActive(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
