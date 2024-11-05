import { reinitTooltip } from "../../utils/updateUi.js";
import {
  listSupplierRefPersediaanRead,
  listSupplierRefPersediaanReadDate,
} from "./list.js";
import { handlePagination } from "./pagination.js";
import { getByLimitOffset, pagination } from "./services.js";
import { uiBtnPageActive, uiTbody, uiTbodyZero } from "./ui.js";
import { getProduct1 } from "../products/read.js";
import { getPersediaan1 } from "../persediaan/read.js";

export const getAll = async (data) => {
  const req = {
    searchVal: data.searchVal,
    limitVal: data.limitVal,
    offsetVal: data.offsetVal,
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
  async function get2(req) {
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
};

export const getSupplierRef = async () => {
  await getProduct1();
  await getPersediaan1();
  await listSupplierRefPersediaanRead();
  await listSupplierRefPersediaanReadDate();
};
