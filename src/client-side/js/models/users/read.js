import { fetchRowPage } from "./services.js";
import { handlePagination } from "./pagination.js";
import { uiTbodyEmpty } from "./ui.js";
import { get2 } from "./utils.js";

// value
const searchVal = $("input#user-search").val();
const limitVal = parseInt($("select#user-limit").val());
const offsetVal = 1;

// request
const req = {
  searchVal,
  limitVal,
  offsetVal,
};
// execute
const { status, response } = await fetchRowPage(req);
if (status) {
  // total row
  const { totalPage, totalRow } = response;
  $("span#user-total-row").text(totalRow);
  // totalPage
  const existed = totalRow >= 1;
  // existed
  if (existed) {
    await get2(req);
    handlePagination(totalPage);
  }
  // non-exsited
  if (!existed) {
    uiTbodyEmpty(searchVal);
  }
}
if (!status) {
  console.error(response);
}
