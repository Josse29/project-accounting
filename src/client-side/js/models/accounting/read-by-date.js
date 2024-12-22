import { animateFade } from "../../utils/updateUi.js";
import { getByDate } from "./services.js";
import { uiAlertFailed2, uiTbody, uiTbodyZero } from "./ui.js";

$("div#accounting-card button#filtered_date")
  .off("click")
  .on("click", async () => {
    animateFade("#accounting-card");
    const startDateVal = $("div#accounting-card input#startDate").val();
    const endDateVal = $("div#accounting-card input#endDate").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    const { status, response } = await getByDate(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        uiTbody(response);
      }
      if (!existed) {
        uiTbodyZero();
      }
      $("div#general-entries-pagination").addClass("d-none");
      $("#accounting-card .section-alert").html(``);
    }
    if (!status) {
      uiAlertFailed2(response);
      console.error(response);
    }
  });
