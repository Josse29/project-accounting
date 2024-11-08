import { getPagination } from "./services.js";
import { uiTBodyEmpty } from "./ui.js";
import { handlePagination } from "./pagination.js";
import { get2 } from "./utils.js";

// get all value
const searchVal = $("#product-search-input").val();
const limitVal = parseInt($("#product-limit").val());
const offsetVal = 1;
const req = {
  searchVal,
  limitVal,
  offsetVal,
};
// send to db
const pagination = await getPagination(req);
const { status, response } = pagination;
if (status) {
  const { totalPage, totalRow } = response;
  $("p#product-total-row").text(`Total : ${totalRow}`);
  if (totalRow >= 1) {
    await get2(req);
    handlePagination(totalPage);
  }
  if (totalRow < 1) {
    uiTBodyEmpty(searchVal);
  }
}
if (!status) {
  console.error(response);
}
