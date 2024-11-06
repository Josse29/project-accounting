import { fetchLimitOffset, fetchRowPage } from "./services.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import handlePagination from "./pagination.js";
import { uiBtnPageActive, uiTbody, uiTbodyEmpty } from "./ui.js";

// execute
get1();

// 1. init & pagination
export async function get1() {
  // reset search
  $("input#user-search").val("");
  // value
  const searchVal = $("input#user-search").val();
  const limitVal = parseInt($("select#user-limit").val());
  const offsetVal = 1;
  // request
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  // execute
  const { status, response } = await fetchRowPage(req);
  if (status) {
    // total row
    const { totalPage, totalRow } = response;
    $("span#user-total-row").text(totalRow);
    // totalPage
    const existed = totalRow >= 1;
    // existed
    if (existed) {
      await get2(req);
      handlePagination(totalPage);
    }
    // non-exsited
    if (!existed) {
      uiTbodyEmpty(searchVal);
    }
  }
  if (!status) {
    console.error(response);
  }
}
// 2.get user by limit and page
export async function get2(req) {
  const { status, response } = await fetchLimitOffset(req);
  if (status) {
    uiTbody(response);
    // active page
    uiBtnPageActive(req.offsetVal);
    reinitTooltip();
  }
  if (!status) {
    console.error(response);
  }
}
