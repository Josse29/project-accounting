import { handlePagination } from "./pagination.js";
import {
  getEquityAPI,
  getEquityDateGroupUserAPI,
  getEquityPaginationAPI,
  getEquitySumDateAPI,
} from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";

// get pagination and get by page
async function getEquityAll(req) {
  const data =
    req !== undefined
      ? {
          searchVal: req.searchVal,
          limitVal: req.limitVal,
          offsetVal: req.offsetVal,
        }
      : {
          searchVal: "",
          limitVal: parseInt($("select#equity-read-limit").val()),
          offsetVal: 1,
        };
  const { status, response } = await getEquityPaginationAPI(data);
  if (status) {
    const { totalPage, totalRow } = response;
    if (totalRow >= 1) {
      await getEquityPage(data);
      handlePagination(totalPage);
    }
    if (totalRow < 1) {
      uiTbodyEmpty(req.searchVal);
    }
  }
  if (!status) {
    console.error(response);
  }
}
// get by limit and offset
async function getEquityPage(req) {
  const { status, response } = await getEquityAPI(req);
  if (status) {
    uiTbody(response);
  }
  if (!status) {
    console.error(response);
  }
}
// get summary equity and date
async function getEquityDateGroupUserAPI1(req) {
  const { status, response } = await getEquityDateGroupUserAPI(req);
  if (status) {
    return response;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
}
async function getEquitySumDateAPI1(req) {
  const { status, response } = await getEquitySumDateAPI(req);
  if (status) {
    return response.EquityBalanceSum;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
}
export {
  getEquityPage,
  getEquityAll,
  getEquityDateGroupUserAPI1,
  getEquitySumDateAPI1,
};
