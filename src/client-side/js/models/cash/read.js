import { getPagination } from "./services.js";
import { uiTbodyEmpty } from "./ui.js";
import { getCashPage, summary } from "./utils.js";
import handlePagination from "./pagination.js";

// getvalue
const searchVal = $("input#cash-read-search").val();
const limitVal = $("select#cash-read-limit").val();
const offsetVal = 1;
// request
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
if (!status) {
  console.error(response);
}
