import { uiBtnPageActive, uiInit, uiTbody, uiTbodyEmpty } from "./ui.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import { getAll1, getPagination, getSumPrice } from "./services.js";
import { handlePagination } from "./pagination.js";

// function
getPersediaan1();
// 1. get total page and row
export async function getPersediaan1() {
  uiInit();
  const searchVal = $("input#persediaan-search").val();
  const limitVal = parseInt($("select#persediaan-limit").val());
  const offsetVal = 1;
  const req = {
    searchVal,
    limitVal,
    offsetVal,
  };
  const { status, response } = await getPagination(req);
  if (status) {
    const { totalRow, totalPage } = response;
    // if it exist inventory
    const existed = totalRow >= 1;
    if (existed) {
      await get2();
      await get3(req);
      handlePagination(totalPage);
    }
    // if it doesn't exist inventory
    if (!existed) {
      uiTbodyEmpty(searchVal);
      $("#persediaan-detail-totalrp").text(`Rp 0.00,-`);
    }
  }
  if (!status) {
    console.error(response);
  }
}
// 2. get summary
export async function get2() {
  const { status, response } = await getSumPrice();
  if (status) {
    const txt = formatRupiah2(response);
    $("#persediaan-detail-totalrp").text(txt);
  }
  if (!status) {
    console.error(response);
  }
}
// 3. get persediaan by limit offset
export async function get3(req) {
  const { status, response } = await getAll1(req);
  if (status) {
    uiTbody(response);
    uiBtnPageActive(req.offsetVal);
    reinitTooltip();
  }
  if (!status) {
    console.error(response);
  }
}
