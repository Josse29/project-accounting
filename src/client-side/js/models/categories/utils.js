import { reinitTooltip } from "../../utils/updateUi.js";
import { handlePagination } from "./pagination.js";
import { getByLimitOffset, getPagination } from "./services.js";
import { uiBtnPageActive, uiTbody, uiTbodyEmpty } from "./ui.js";
import { listCategoryRefPersediaanRead } from "./list.js";
import { getProduct1 } from "../products/read.js";
import { getPersediaan1 } from "../persediaan/read.js";

export const executeRead = async (data) => {
  const req = {
    searchVal: data.searchVal,
    limitVal: data.limitVal,
    offsetVal: data.offsetVal,
  };
  console.log(req);
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
export const getCategoryRef = async () => {
  await getProduct1();
  await getPersediaan1();
  await listCategoryRefPersediaanRead();
};
