import { formatRupiah2 } from "../../utils/formatPrice.js";
import handlePagination from "./pagination.js";
import {
  getCashByLimitOffset,
  getPagination,
  getSum,
  getSum1,
} from "./services.js";
import { uiBtnPageActive, uiTbody, uiTbodyEmpty } from "./ui.js";

export const getCashAll = async (data) => {
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
          limitVal: parseInt($("select#cash-read-limit").val()),
          offsetVal: 1,
        };
  const { status, response } = await getPagination(req);
  if (status) {
    const { totalPage, totalRow } = response;
    if (totalRow >= 1) {
      await summary();
      await getCashPage(req);
      handlePagination(totalPage);
    }
    if (totalRow < 1) {
      uiTbodyEmpty(req.searchVal);
    }
  }
  if (!status) {
    console.error(response);
  }
};
export async function summary() {
  const { status, response } = await getSum();
  if (status) {
    const rupiah = formatRupiah2(response);
    $("span#cash_sum").text(rupiah);
  }
  if (!status) {
    console.error(response);
  }
}
export async function getCashPage(req) {
  const { status, response } = await getCashByLimitOffset(req);
  if (status) {
    uiTbody(response);
    uiBtnPageActive(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
export async function summary1(req) {
  const { status, response } = await getSum1(req);
  if (status) {
    return response;
  } else {
    throw new Error(response);
  }
}
