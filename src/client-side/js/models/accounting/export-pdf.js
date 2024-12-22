import { getByDate } from "./services.js";
import { uiAlertFailed1, uiAlertSuccess, uiPDF } from "./ui.js";
import { sumDebtCredit } from "./utils.js";

$("div#accounting-modal-convert-pdf button#accounting-convert-pdf")
  .off("click")
  .on("click", async () => {
    const startDateVal = $(
      "div#accounting-modal-convert-pdf input#accounting-start-date-1"
    ).val();
    const endDateVal = $(
      "div#accounting-modal-convert-pdf input#accounting-end-date-1"
    ).val();
    const req = {
      startDateVal,
      endDateVal,
    };
    const { status, response } = await getByDate(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const summary = await sumDebtCredit(req);
        const htmlContent = uiPDF(response, summary);
        const filePath = await window.electronAPI.savePDF(htmlContent);
        if (filePath) {
          uiAlertSuccess(`File PDF Save On ${filePath}`);
          $("div#accounting-modal-convert-pdf div.failed").html("");
          $(
            "div#accounting-modal-convert-pdf input#accounting-start-date-1"
          ).val("");
          $("div#accounting-modal-convert-pdf input#accounting-end-date-1").val(
            ""
          );
          $("div#accounting-modal-convert-pdf").modal("hide");
        }
      }
      if (!existed) {
        uiAlertFailed1(`Uppsss, it's still empty......`);
      }
    }
    if (!status) {
      uiAlertFailed1(response);
      console.error(response);
    }
  });
