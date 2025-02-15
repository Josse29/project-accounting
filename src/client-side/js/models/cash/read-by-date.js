import { animateFade } from "../../utils/updateUi.js";
import { getByDate } from "./services.js";
import { uiAlertFailed2, uiSummary, uiTbody, uiTbodyEmpty } from "./ui.js";
import { summary1 } from "./utils.js";

$("#cash-read-date button")
  .off("click")
  .on("click", async () => {
    animateFade("#cash-card");
    const searchVal = $("input#cash-read-search").val();
    const startDateVal = $("#cash-read-date input#startDate").val();
    const endDateVal = $("#cash-read-date input#endDate").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    // get cash
    const cash = await getByDate(req);
    const status1 = cash.status;
    const response1 = cash.response;
    if (status1) {
      const existed = response1.length >= 1;
      if (existed) {
        // get only sum
        const sumCash1 = await summary1(req);
        uiSummary(sumCash1, startDateVal, endDateVal);
        uiTbody(response1);
      }
      if (!existed) {
        uiSummary("", startDateVal, endDateVal);
        uiTbodyEmpty(searchVal);
      }
      $("#section-alert").html(``);
    }
    if (!status1) {
      uiAlertFailed2(response1);
      throw new Error(response1);
    }
    // callback ui
    // 1. limit search
    $("div#cash-card #limit-search").addClass("d-none");
    // 2. pagination
    $("div#cash-pagination-container").addClass("d-none");
  });
