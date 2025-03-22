import { handlePagination } from "./pagination.js";
import { getStockPaginationAPI } from "./services.js";
import { uiTbodyEmpty } from "./ui.js";
import { getStock1API } from "./utils.js";

// get value
const searchVal = $("input#persediaan-search").val();
const limitVal = $("select#persediaan-limit").val();
const offsetVal = 1;
const req = {
  searchVal,
  limitVal,
  offsetVal,
};
const { status, response } = await getStockPaginationAPI(req);
if (status) {
  const { totalRow, totalPage } = response;
  // if it exist inventory
  const existed = totalRow >= 1;
  if (existed) {
    await getStock1API(req);
    handlePagination(totalPage);
  }
  if (!existed) {
    uiTbodyEmpty(searchVal);
  }
}
if (!status) {
  throw new Error(response);
}
