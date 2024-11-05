import { reinitTooltip } from "../../utils/updateUi.js";
import { uiBtnPageActive, uiTbody, uiTbodyEmpty } from "./ui.js";
import { getByLimitOffset, getPagination } from "./services.js";
import { handlePagination } from "./pagination.js";

// function
getCategory1();

export async function getCategory1() {
  $("#category-search-input").val("");
  // get all value
  let searchVal = $("#category-search-input").val();
  let limitVal = parseInt($("#category-limit").val());
  let offsetVal = 1;
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const { status, response } = await getPagination(req);
  if (status) {
    const { totalPage, totalRow } = response;
    $("p#categories-total-row").text(`Total : ${totalRow}`);
    // exsited category
    if (totalRow >= 1) {
      await get2(req);
      handlePagination(totalPage);
    }
    // non=exsited category
    if (totalRow < 1) {
      uiTbodyEmpty(searchVal);
    }
  }
  if (!status) {
    console.error(response);
  }
}
export async function get2(req) {
  const { status, response } = await getByLimitOffset(req);
  if (status) {
    uiTbody(response);
    reinitTooltip();
    uiBtnPageActive(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
