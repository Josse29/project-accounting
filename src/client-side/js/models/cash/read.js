import { getCashByLimitOffset, getPagination, getSum } from "./services.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { uiBtnPageActive, uiTbody, uiTbodyEmpty } from "./ui.js";
import handlePagination from "./pagination.js";

// function
getCash1();

export async function getCash1() {
  // getvalue
  const searchVal = $("input#cash-read-search").val();
  const limitVal = $("select#cash-read-limit").val();
  const offsetVal = 1;
  const req = {
    searchVal,
    limitVal: parseInt(limitVal),
    offsetVal: parseInt(offsetVal),
  };
  const { status, response } = await getPagination(req);
  if (status) {
    const { totalPage, totalRow } = response;
    if (totalRow >= 1) {
      await summary();
      await getCashPage(req);
      handlePagination(totalPage);
    }
    if (totalRow < 1) {
      uiTbodyEmpty(req.searchVal);
    }
  }
}
export async function summary() {
  const { status, response } = await getSum();
  if (status) {
    const rupiah = formatRupiah2(response);
    $("span#cash_sum").text(rupiah);
  }
  if (!status) {
    console.error(response);
  }
}
export async function getCashPage(req) {
  const { status, response } = await getCashByLimitOffset(req);
  if (status) {
    uiTbody(response);
    uiBtnPageActive(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
