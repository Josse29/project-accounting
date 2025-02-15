import { handlePagination } from "./pagination.js";
import { getExpensePaginationAPI } from "./services.js";
import { uiTr1 } from "./ui.js";
import { getExpenseAPI1 } from "./utils.js";

// request
const searchVal = $("input#expense-search").val();
const limitVal = $("select#expense-limit").val();
const offsetVal = 1;
const req = {
  searchVal,
  limitVal,
  offsetVal,
};
const { status, response } = await getExpensePaginationAPI(req);
if (status) {
  const { totalPage, totalRow } = response;
  const existed = totalRow >= 1;
  if (existed) {
    await getExpenseAPI1(req);
    handlePagination(totalPage);
  }
  if (!existed) {
    uiTr1(searchVal);
  }
  $("p#expense-total-row").text(`Total : ${totalRow}`);
}
if (!status) {
  console.error(response);
  throw new Error(response);
}
