import { getEquityDateAPI } from "./services.js";

import { animateFade } from "../../utils/updateUi.js";
import { uiAlertFail, uiTbody, uiTbodyEmpty } from "./ui.js";
import { formatWaktuIndo } from "../../utils/formatTime.js";

$("div#equity-read-date button")
  .off("click")
  .on("click", async () => {
    animateFade("#equity-card");
    const startDateVal = $("div#equity-read-date input#startDate").val();
    const endDateVal = $("div#equity-read-date input#endDate").val();
    const req = { startDateVal, endDateVal };
    const { status, response } = await getEquityDateAPI(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        uiTbody(response);
      }
      if (!existed) {
        const rangeDateTxt = `${formatWaktuIndo(
          startDateVal
        )} - ${formatWaktuIndo(endDateVal)} `;
        uiTbodyEmpty(rangeDateTxt);
      }
      // callback ui
      // 1.limit-search-none
      $("#equity-card #limit-search").addClass("d-none");
      // 2.section alert
      $("#equity-card #section-alert").html("");
    }
    if (!status) {
      uiAlertFail(response);
      console.log(response);
      throw new Error(response);
    }
  });
