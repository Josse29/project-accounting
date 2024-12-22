import { animateFade } from "../../utils/updateUi.js";
import handlePagination from "./pagination.js";
import { readpage } from "./read.js";
import { getPagination } from "./services.js";
import { uiTbodyZero } from "./ui.js";

$("button#accounting-reset")
  .off("click")
  .on("click", async () => {
    animateFade("#accounting-card");
    // getvalue
    const searchVal = "";
    const limitVal = 10;
    const offSetVal = 1;
    // request
    const req = {
      searchVal,
      limitVal: parseInt(limitVal),
      offsetVal: parseInt(offSetVal),
    };
    const { status, response } = await getPagination(req);
    if (status) {
      const { totalPage, totalRow } = response;
      if (totalRow >= 1) {
        await readpage(req);
        handlePagination(totalPage);
      }
      if (totalRow < 1) {
        uiTbodyZero();
      }
      $("#accounting-card .section-alert").html(``);
    }
    if (!status) {
      console.error(response);
    }
  });
