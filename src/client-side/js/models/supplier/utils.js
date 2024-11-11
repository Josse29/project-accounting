import { reinitTooltip } from "../../utils/updateUi.js";
import {
  listSupplierRefPersediaanRead,
  listSupplierRefPersediaanReadDate,
} from "./list.js";
import { handlePagination } from "./pagination.js";
import { getByLimitOffset, pagination } from "./services.js";
import { uiBtnPageActive, uiTbody, uiTbodyZero } from "./ui.js";
import { getProductAll } from "../products/utils.js";
import { getAll } from "./../persediaan/utils.js";
import { uiInit } from "../persediaan/ui.js";

export const getSupplier1 = async (data) => {
  const req =
    data !== undefined
      ? {
          searchVal: data.searchVal,
          limitVal: data.limitVal,
          offsetVal: data.offsetVal,
        }
      : {
          searchVal: "",
          limitVal: parseInt($("select#supplier-limit").val()),
          offsetVal: 1,
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
      uiTbodyZero(req.searchVal);
    }
  }
  if (!status) {
    console.error(response);
  }
};
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
export const getSupplierRef = async () => {
  // get product again
  await getProductAll();
  // get persediaan again
  await getAll();
  uiInit();
  await listSupplierRefPersediaanRead();
  await listSupplierRefPersediaanReadDate();
};
