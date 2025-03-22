import { getAccountingPaginationAPI } from "./services.js";

import { getAccountingAPI1 } from "./utils.js";
import handlePagination from "./pagination.js";
import { uiTbody1 } from "./ui.js";

// getvalue
const selectedAccount = $("div#select-mode button.active").data("value");
const searchVal = $("#general-section #limit-search input").val();
const limitVal = $("#general-section #limit-search select").val();
const offsetVal = 1;
// request
const req = {
  selectedAccount,
  searchVal,
  limitVal,
  offsetVal,
};
const { status, response } = await getAccountingPaginationAPI(req);
if (status) {
  const { totalPage, totalRow } = response;
  if (totalRow >= 1) {
    await getAccountingAPI1(req);
    handlePagination(totalPage);
  }
  if (totalRow < 1) {
    uiTbody1(`empty....`);
  }
}
if (!status) {
  console.error(response);
  throw new Error(response);
}
