import { getAssetNameAPI, getAssetNamePaginationAPI } from "./services.js";
import { handlePagination } from "./pagination.js";
import { uiTr, uiTr1 } from "./ui.js";

async function getAssetNameAll(req) {
  const data =
    req !== undefined
      ? {
          searchVal: req.searchVal,
          limitVal: req.limitVal,
          offsetVal: req.offsetVal,
        }
      : {
          searchVal: "",
          limitVal: 10,
          offsetVal: 1,
        };
  const { status, response } = await getAssetNamePaginationAPI(data);
  if (status) {
    const { totalPage, totalRow } = response;
    const existed = totalRow >= 1;
    if (existed) {
      await getAssetNamePage(data);
      handlePagination(totalPage);
    }
    if (!existed) {
      uiTr1(data.searchVal);
    }
    // totalRow
    $("p#assets-total-row").text(`Total : ${totalRow}`);
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
}
async function getAssetNamePage(req) {
  const { status, response } = await getAssetNameAPI(req);
  if (status) {
    uiTr(response);
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
}

export { getAssetNamePage, getAssetNameAll };
