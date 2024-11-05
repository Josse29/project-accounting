import { reinitTooltip } from "../../utils/updateUi.js";
import { uiBtnPageActive, uiTbody, uiTbodyZero } from "./ui.js";
import { getByLimitOffset, pagination } from "./services.js";
import { handlePagination } from "./pagination.js";

// function
getSupplier1();

export async function getSupplier1() {
  $("#supplier-search-input").val("");
  // get value
  let searchVal = $("#supplier-search-input").val();
  let limitVal = parseInt($("#supplier-limit").val());
  let offsetVal = 1;
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const { status, response } = await pagination(req);
  if (status) {
    const { totalPage, totalRow } = response;
    $("p#supplier-total-row").text(`Total : ${totalRow}`);
    if (totalRow >= 1) {
      await get2(req);
      handlePagination(totalPage);
    }
    if (totalRow < 1) {
      uiTbodyZero(searchVal);
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
