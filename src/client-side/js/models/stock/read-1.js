import { handlePagination } from "./pagination-1.js";
import { getStockPagination1API } from "./services.js";
import { uiTbodyEmpty } from "./ui-1.js";
import { getStock2API } from "./utils-1.js";

// get all value
const searchVal = $("input#sales-read-search").val();
const limitVal = $("select#sales-read-limit").val();
const offsetVal = 1;
const req = {
  searchVal,
  limitVal,
  offsetVal,
};
const { status, response } = await getStockPagination1API(req);
if (status) {
  const { totalPage, totalRow } = response;
  const existed = totalRow >= 1;
  if (existed) {
    await getStock2API(req);
    handlePagination(totalPage);
  }
  if (!existed) {
    uiTbodyEmpty(searchVal);
  }
}
if (!status) {
  throw new Error(response);
}
