import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { animateFade } from "../../utils/updateUi.js";
import { getByDate, getSum1 } from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";

$("#cash-read-date button")
  .off("click")
  .on("click", async () => {
    const startDateVal = $("#cash-read-date input#startDate").val();
    const endDateVal = $("#cash-read-date input#endDate").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    // validation date
    if (
      startDateVal > endDateVal ||
      (startDateVal !== "" && endDateVal === "") ||
      (startDateVal === "" && endDateVal !== "") ||
      (startDateVal === "" && endDateVal === "")
    ) {
      return false;
    }
    animateFade("#cash-card");
    // get only sum
    const summary = await getSum1(req);
    const status = summary.status;
    const response = summary.response;
    if (status) {
      const rupiah = formatRupiah2(response);
      const uiSummary = `
      <h4 class="text-capitalize fw-bold">
        ${formatWaktuIndo(startDateVal)} 
        - ${formatWaktuIndo(endDateVal)}  
      </h4>
      <h5>Total : ${rupiah}</h5>
      `;
      $("div#cash-summary").html(uiSummary);
    }
    if (!status) {
      console.error(response);
    }
    // get cash
    const cash = await getByDate(req);
    const status1 = cash.status;
    const response1 = cash.response;
    if (status1) {
      const existed = response1.length >= 1;
      if (existed) {
        uiTbody(response1);
      }
      if (!existed) {
        uiTbodyEmpty("");
      }
    }
    if (!status1) {
      console.error(response1);
    }
    // callback ui
    // 1. limit search
    $("div#cash-card #limit-search").addClass("d-none");
    // 2. pagination
    $("div#cash-pagination-container").addClass("d-none");
  });
