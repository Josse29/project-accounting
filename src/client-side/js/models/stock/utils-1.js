import { handlePagination } from "./pagination-1.js";
import { getStock1API, getStockPagination1API } from "./services.js";
import { uiBtnPageActive, uiTbody, uiTbodyEmpty } from "./ui-1.js";

const getStock2API = async (req) => {
  const { status, response } = await getStock1API(req);
  if (status) {
    uiTbody(response);
    uiBtnPageActive(req.offsetVal);
  }
  if (!status) {
    throw new Error(response);
  }
};
// get all
const getStock3API = async (data) => {
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
  const { status, response } = await getStockPagination1API(req);
  if (status) {
    const { totalPage, totalRow } = response;
    const existed = totalRow >= 1;
    if (existed) {
      await getStock2API(req);
      handlePagination(totalPage);
    }
    if (!existed) {
      uiTbodyEmpty(data.searchVal);
    }
  }
  if (!status) {
    throw new Error(response);
  }
};
export { getStock2API, getStock3API };
