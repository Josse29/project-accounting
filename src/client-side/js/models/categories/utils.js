import { reinitTooltip } from "../../utils/updateUi.js";
import { handlePagination } from "./pagination.js";
import { getByLimitOffset, getPagination } from "./services.js";
import { uiBtnPageActive, uiTbody, uiTbodyEmpty } from "./ui.js";
import { listCategoryRefPersediaanRead } from "./list.js";
import { getProductAll } from "../products/utils.js";
import { getAll } from "../persediaan/utils.js";
import { uiInit } from "../persediaan/ui.js";

// get pagination
export const executeRead = async (data) => {
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
          limitVal: parseInt($("select#category-limit").val()),
          offsetVal: 1,
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
      uiTbodyEmpty(req.searchVal);
    }
  }
  if (!status) {
    console.error(response);
  }
};
// get category by limit offset
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
export const getCategoryRef = async () => {
  // product
  await getProductAll();
  // persediaan
  await getAll();
  uiInit();
  await listCategoryRefPersediaanRead();
};
