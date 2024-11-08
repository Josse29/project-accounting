import { reinitTooltip } from "../../utils/updateUi.js";
import { handlePagination } from "./pagination.js";
import { fetchLimitOffset, fetchRowPage } from "./services.js";
import { uiBtnPageActive, uiTbody, uiTbodyEmpty } from "./ui.js";

export const executeRead = async (data) => {
  // request
  const req =
    data !== undefined
      ? {
          searchVal: data.searchVal,
          limitVal: data.limitVal,
          offsetVal: data.offsetVal,
        }
      : {
          searchVal: "",
          limitVal: parseInt($("select#user-limit").val()),
          offsetVal: 1,
        };
  // 1. execute pagination
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
      uiTbodyEmpty(req.searchVal);
    }
  }
  if (!status) {
    console.error(response);
  }
};
// 2. execute user
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
