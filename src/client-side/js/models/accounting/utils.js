import {
  getGeneralEntry,
  getPagination,
  getSumDebtCredit,
} from "./services.js";

import handlePagination from "./pagination.js";
import { uiBtnPageActived, uiTbody, uiTbodyZero } from "./ui.js";

export const getAccountingAll = async () => {
  const req = {
    searchVal: "",
    limitVal: 10,
    offsetVal: 1,
  };
  const { status, response } = await getPagination(req);
  if (status) {
    const { totalPage, totalRow } = response;
    if (totalRow >= 1) {
      await readpage(req);
      handlePagination(totalPage);
      $("div#general-entries-pagination").removeClass("d-none");
    }
    if (totalRow < 1) {
      uiTbodyZero();
      $("div#general-entries-pagination").addClass("d-none");
    }
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
export async function readpage(req) {
  const { status, response } = await getGeneralEntry(req);
  if (status) {
    uiTbody(response);
    uiBtnPageActived(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
export const sumDebtCredit = async (req) => {
  const { status, response } = await getSumDebtCredit(req);
  if (status) {
    return response;
  }
  if (!status) {
    throw new Error(response);
  }
};
