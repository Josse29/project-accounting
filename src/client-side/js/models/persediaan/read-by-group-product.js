import { uiQty } from "../../component/card/qty.js";
import { list } from "../../component/list/index.js";
import { handlePagination1 } from "./pagination-1.js";
import { getGroupProduct, getRowPage1 } from "./services.js";
import { uiBtnPageActive1, uiCard, uiCardEmpty } from "./ui.js";

// function
getPersediaan2();
export async function getPersediaan2() {
  // reset search
  $("input#order-search").val("");
  // get all
  const searchVal = $("input#order-search").val();
  const limitVal = 3;
  const offsetVal = 1;
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const { status, response } = await getRowPage1(req);
  if (status) {
    const { totalPage, totalRow } = response;
    if (totalRow >= 1) {
      await getPage(req);
      handlePagination1(totalPage);
    }
    if (totalRow < 1) {
      uiCardEmpty(searchVal);
    }
  }
  if (!status) {
    console.error(response);
  }
}
export async function getPage(req) {
  const stock = await getGroupProduct(req);
  const { status, response } = stock;
  if (status) {
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
