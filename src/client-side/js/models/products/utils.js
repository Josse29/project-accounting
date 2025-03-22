import {
  getLimitOffset,
  getLimitOffset1,
  getPagination,
  getPagination1,
} from "./services.js";

import {
  uiBtnPageActive,
  uiBtnPageActive1,
  uiCard,
  uiCardEmpty,
  uiTbody,
  uiTBodyEmpty,
} from "./ui.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import { listProductRefStockRead } from "./list.js";
import { handlePagination, handlePagination1 } from "./pagination.js";
import { uiQty } from "../../component/card/qty.js";
import { list } from "../../component/list/index.js";
import { uiInit } from "../stock/ui.js";
// import { getAll } from "../stock/utils.js";

// get paginaton and by page
const getProductAll = async (data) => {
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
          limitVal: parseInt($("select#product-limit").val()),
          offsetVal: 1,
        };
  // send to db
  const pagination = await getPagination(req);
  const { status, response } = pagination;
  if (status) {
    const { totalPage, totalRow } = response;
    $("p#product-total-row").text(`Total : ${totalRow}`);
    if (totalRow >= 1) {
      await getPage(req);
      handlePagination(totalPage);
    }
    if (totalRow < 1) {
      uiTBodyEmpty(data.searchVal);
    }
  }
  if (!status) {
    console.error(response);
  }
};
// get paginaton and by page ref persediaaan
const getProductAll1 = async (data) => {
  // 1. get total page and row
  const req =
    data !== undefined
      ? {
          searchVal: data.searchVal,
          limitVal: data.limitVal,
          offsetVal: data.offsetVal,
        }
      : {
          searchVal: "",
          limitVal: 3,
          offsetVal: 1,
        };
  const { status, response } = await getPagination1(req);
  if (status) {
    const { totalPage, totalRow } = response;
    if (totalRow >= 1) {
      await getPage1(req);
      handlePagination1(totalPage);
    }
    if (totalRow < 1) {
      uiCardEmpty(req.searchVal);
    }
  }
  if (!status) {
    console.error(response);
  }
};
// get by page
async function getPage(req) {
  const { status, response } = await getLimitOffset(req);
  if (status) {
    uiTbody(response);
    uiBtnPageActive(req.offsetVal);
    reinitTooltip();
  }
  if (!status) {
    console.error(response);
  }
}
// ref Stock
async function getPage1(req) {
  const { status, response } = await getLimitOffset1(req);
  if (status) {
    console.log(response);
    uiCard(response);
    // update qty to card menu as well as btn plus/min triggered
    uiQty();
    // update list cart menu as well as btn plus/min triggered
    list();
    // update active page
    uiBtnPageActive1(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
const getProductRef = async () => {
  // await getAll();
  uiInit();
  await listProductRefStockRead();
};
export { getProductAll, getProductAll1, getPage, getPage1, getProductRef };
