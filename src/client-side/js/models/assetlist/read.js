import { handlePagination } from "./pagination.js";
import { getAssetNamePaginationAPI } from "./services.js";

import { uiTr1 } from "./ui.js";
import { getAssetNamePage } from "./utils.js";

const searchVal = $("input#asset-search").val();
const limitVal = $("select#asset-limit").val();
const offsetVal = 1;
const req = {
  searchVal,
  limitVal,
  offsetVal,
};
const { status, response } = await getAssetNamePaginationAPI(req);
if (status) {
  const { totalPage, totalRow } = response;
  const existed = totalRow >= 1;
  if (existed) {
    await getAssetNamePage(req);
    handlePagination(totalPage);
  }
  if (!existed) {
    uiTr1(searchVal);
  }
  // totalRow
  $("p#assets-total-row").text(`Total : ${totalRow}`);
}
if (!status) {
  console.error(response);
  throw new Error(response);
}
