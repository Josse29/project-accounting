import { getLimitOffset, getPagination } from "./services.js";
import { uiBtnPageActive, uiTbody, uiTBodyEmpty } from "./ui.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import {
  listProductRefPersediaanRead,
  listProductRefSalesRead,
} from "./list.js";
import { handlePagination } from "./pagination.js";
import { getAll } from "../persediaan/utils.js";
import { executeRead } from "../categories/utils.js";
import { uiInit } from "../persediaan/ui.js";

// get only paginaton and by page
export const getProductAll = async (data) => {
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
      await get2(req);
      handlePagination(totalPage);
    }
    if (totalRow < 1) {
      uiTBodyEmpty(req.searchVal);
    }
  }
  if (!status) {
    console.error(response);
  }
};
// get by page
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
export const getProductRef = async () => {
  // get persediaan again
  await getAll();
  uiInit();
  // get category again
  await executeRead();
  await listProductRefPersediaanRead();
  await listProductRefSalesRead();
};
