import { getEquityPaginationAPI } from "./services.js";

import { handlePagination } from "./pagination.js";
import { getEquityPage } from "./utils.js";
import { uiTbodyEmpty } from "./ui.js";

const searchVal = $("input#equity-read-search").val();
const limitVal = $("select#equity-read-limit").val();
const offsetVal = 1;
const req = {
  searchVal,
  limitVal,
  offsetVal,
};
const { status, response } = await getEquityPaginationAPI(req);
if (status) {
  const { totalPage, totalRow } = response;
  if (totalRow >= 1) {
    await getEquityPage(req);
    handlePagination(totalPage);
  }
  if (totalRow < 1) {
    uiTbodyEmpty(searchVal);
  }
}
if (!status) {
  console.error(response);
  throw new Error(response);
}
