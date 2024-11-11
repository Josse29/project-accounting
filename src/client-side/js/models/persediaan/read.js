import { getPagination } from "./services.js";
import { uiTbodyEmpty } from "./ui.js";
import { handlePagination } from "./pagination.js";
import { get2, get3 } from "./utils.js";

// get value
const searchVal = $("input#persediaan-search").val();
const limitVal = parseInt($("select#persediaan-limit").val());
const offsetVal = 1;
const req = {
  searchVal,
  limitVal,
  offsetVal,
};
const { status, response } = await getPagination(req);
if (status) {
  const { totalRow, totalPage } = response;
  // if it exist inventory
  const existed = totalRow >= 1;
  if (existed) {
    await get2();
    await get3(req);
    handlePagination(totalPage);
  }
  // if it doesn't exist inventory
  if (!existed) {
    uiTbodyEmpty(searchVal);
    $("#persediaan-detail-totalrp").text(`Rp 0.00,-`);
  }
}
if (!status) {
  console.error(response);
}
