import { uiTbodyEmpty } from "./ui.js";
import { getPagination } from "./services.js";
import { handlePagination } from "./pagination.js";
import { get2 } from "./utils.js";

// get all value
const searchVal = $("#category-search-input").val();
const limitVal = parseInt($("#category-limit").val());
const offsetVal = 1;
const req = {
  searchVal,
  limitVal,
  offsetVal,
};

const { status, response } = await getPagination(req);
if (status) {
  const { totalPage, totalRow } = response;
  $("p#categories-total-row").text(`Total : ${totalRow}`);
  // existed category
  if (totalRow >= 1) {
    await get2(req);
    handlePagination(totalPage);
  }
  // non-existed category
  if (totalRow < 1) {
    uiTbodyEmpty(searchVal);
  }
}
if (!status) {
  console.error(response);
}
