import { getAccountingAPI, getAccountingPaginationAPI } from "./services.js";

import handlePagination from "./pagination.js";
import { uiTbody, uiTbody1 } from "./ui.js";

const getAccountingAllAPI = async (data) => {
  const req =
    data !== undefined
      ? {
          selectedAccount: data.selectedAccount,
          searchVal: data.searchVal,
          limitVal: data.limitVal,
          offsetVal: data.offsetVal,
        }
      : {
          selectedAccount: 111,
          searchVal: "",
          limitVal: 10,
          offsetVal: 1,
        };
  const { status, response } = await getAccountingPaginationAPI(req);
  if (status) {
    const { totalPage, totalRow } = response;
    if (totalRow >= 1) {
      await getAccountingAPI1(req);
      handlePagination(totalPage);
    }
    if (totalRow < 1) {
      uiTbody1(`empty.....`);
    }
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
async function getAccountingAPI1(req) {
  const { status, response } = await getAccountingAPI(req);
  if (status) {
    uiTbody(response);
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
}
export { getAccountingAllAPI, getAccountingAPI1 };
