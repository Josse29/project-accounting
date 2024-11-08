import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { handlePagination } from "./pagination.js";
import { getLimitOffset, getRowPage, getSum } from "./services.js";
import { uiBtnPageActive, uiTbody, uiTbodyEmpty } from "./ui.js";

export const getAll = async (data) => {
  const data1 = {
    searchVal: "",
    limitVal: 10,
    offsetVal: 1,
  };
  const data2 = {
    searchVal: data.searchVal,
    limitVal: data.limitVal,
    offsetVal: data.offsetVal,
  };
  const req = data === undefined ? data1 : data2;
  console.log(req);
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
};
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
