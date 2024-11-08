import { getRowPage } from "./services.js";
import { handlePagination } from "./pagination.js";
import { getPage, getSummary } from "./utils.js";
import { uiTbodyEmpty } from "./ui.js";

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
