import { handlePagination } from "./pagination.js";
import { getExpenseAPI, getExpensePaginationAPI } from "./services.js";
import { uiTr, uiTr1 } from "./ui.js";

async function getExpenseAll(req) {
  const data =
    req !== undefined
      ? {
          searchVal: req.searchVal,
          limitVal: req.limitVal,
          offsetVal: req.offsetVal,
        }
      : {
          searchVal: "",
          limitVal: 10,
          offsetVal: 1,
        };
  const { status, response } = await getExpensePaginationAPI(data);
  if (status) {
    const { totalPage, totalRow } = response;
    const existed = totalRow >= 1;
    if (existed) {
      await getExpenseAPI1(data);
      handlePagination(totalPage);
    }
    if (!existed) {
      uiTr1(data.searchVal);
    }
    $("p#expense-total-row").text(`Total : ${totalRow}`);
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
}

async function getExpenseAPI1(req) {
  const { status, response } = await getExpenseAPI(req);
  if (status) {
    uiTr(response);
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
}
export { getExpenseAll, getExpenseAPI1 };
