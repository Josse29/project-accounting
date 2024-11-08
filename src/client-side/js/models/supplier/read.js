import { uiTbodyZero } from "./ui.js";
import { pagination } from "./services.js";
import { handlePagination } from "./pagination.js";
import { get2 } from "./utils.js";

// get value
const searchVal = $("#supplier-search-input").val();
const limitVal = parseInt($("#supplier-limit").val());
const offsetVal = 1;
const req = {
  searchVal,
  limitVal,
  offsetVal,
};
const { status, response } = await pagination(req);
if (status) {
  const { totalPage, totalRow } = response;
  $("p#supplier-total-row").text(`Total : ${totalRow}`);
  if (totalRow >= 1) {
    await get2(req);
    handlePagination(totalPage);
  }
  if (totalRow < 1) {
    uiTbodyZero(searchVal);
  }
}
if (!status) {
  console.error(response);
}
