import { handlePagination } from "./pagination.js";
import { getStockAPI, getStockPaginationAPI } from "./services.js";
import { uiBtnPageActive, uiTbody, uiTbodyEmpty } from "./ui.js";

async function getStock1API(req) {
  const { status, response } = await getStockAPI(req);
  if (status) {
    uiTbody(response);
    uiBtnPageActive(req.offsetVal);
  }
  if (!status) {
    throw new Error(response);
  }
}
async function getStock2API(data) {
  // get all value
  const req =
    data !== undefined
      ? {
          searchVal: data.searchVal,
          limitVal: data.limitVal,
          offsetVal: data.offsetVal,
        }
      : {
          searchVal: "",
          limitVal: $("select#persediaan-limit").val(),
          offsetVal: 1,
        };
  // pagination
  const { status, response } = await getStockPaginationAPI(req);
  if (status) {
    const { totalRow, totalPage } = response;
    // if it exist inventory
    const existed = totalRow >= 1;
    if (existed) {
      await getStock1API(req);
      handlePagination(totalPage);
    }
    if (!existed) {
      uiTbodyEmpty(data.searchVal);
    }
  }
  if (!status) {
    throw new Error(response);
  }
}
export { getStock1API, getStock2API };
