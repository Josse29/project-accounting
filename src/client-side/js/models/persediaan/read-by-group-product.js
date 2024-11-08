import { handlePagination1 } from "./pagination-1.js";
import { getRowPage1 } from "./services.js";
import { uiCardEmpty } from "./ui.js";
import { getPage1 } from "./utils.js";

// get value
const searchVal = $("input#order-search").val();
const limitVal = 3;
const offsetVal = 1;
const req = {
  searchVal,
  limitVal,
  offsetVal,
};

const { status, response } = await getRowPage1(req);
if (status) {
  const { totalPage, totalRow } = response;
  if (totalRow >= 1) {
    await getPage1(req);
    handlePagination1(totalPage);
  }
  if (totalRow < 1) {
    uiCardEmpty(searchVal);
  }
}
if (!status) {
  console.error(response);
}
