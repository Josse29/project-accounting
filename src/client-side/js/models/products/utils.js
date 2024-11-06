import { getLimitOffset, getPagination } from "./services.js";
import { uiBtnPageActive, uiTbody, uiTBodyEmpty } from "./ui.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import { getPersediaan1 } from "../persediaan/read.js";
import { getCategory1 } from "../categories/read.js";
import {
  listProductRefPersediaanRead,
  listProductRefSalesRead,
} from "./list.js";
import { handlePagination } from "./pagination.js";
export const getProductAll = async (data) => {
  const req = {
    searchVal: data.searchVal,
    limitVal: data.limitVal,
    offsetVal: data.offsetVal,
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
  async function get2(req) {
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
};

export const getProductRef = async () => {
  await getPersediaan1();
  await getCategory1();
  await listProductRefPersediaanRead();
  await listProductRefSalesRead();
};
