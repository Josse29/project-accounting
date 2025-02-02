import { getPagination } from "./services.js";

import handlePagination from "./pagination.js";
import { uiTbodyZero } from "./ui.js";
import { readpage } from "./utils.js";

// getvalue
const searchVal = "";
const limitVal = 10;
const offSetVal = 1;

// request
const req = {
  searchVal,
  limitVal: parseInt(limitVal),
  offsetVal: parseInt(offSetVal),
};
const { status, response } = await getPagination(req);
if (status) {
  const { totalPage, totalRow } = response;
  if (totalRow >= 1) {
    await readpage(req);
    handlePagination(totalPage);
    $("div#general-entries-pagination").removeClass("d-none");
  }
  if (totalRow < 1) {
    uiTbodyZero();
    $("div#general-entries-pagination").addClass("d-none");
  }
}
if (!status) {
  console.error(response);
  throw new Error(response);
}
