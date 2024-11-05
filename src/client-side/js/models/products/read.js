import { reinitTooltip } from "../../utils/updateUi.js";
import { uiBtnPageActive, uiTbody, uiTBodyEmpty } from "./ui.js";
import { getLimitOffset, getPagination } from "./services.js";
import { handlePagination } from "./pagination.js";

getProduct1();

export async function getProduct1() {
  // reset search
  $("#product-search-input").val("");
  // get all value
  const searchVal = $("#product-search-input").val();
  const limitVal = parseInt($("#product-limit").val());
  const offsetVal = 1;
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  // send to db
  const pagination = await getPagination(req);
  const { status, response } = pagination;
  if (status) {
    const { totalPage, totalRow } = response;
    $("p#product-total-row").text(`Total : ${totalRow}`);
    if (totalRow >= 1) {
      await get2(req);
      handlePagination(totalPage);
    }
    if (totalRow < 1) {
      uiTBodyEmpty(searchVal);
    }
  }
  if (!status) {
    console.error(response);
  }
}
export async function get2(req) {
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
