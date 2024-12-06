import { getPDF } from "./services.js";
import { summary1 } from "./utils.js";
import { uiAlertFailed1, uiAlertSuccess, uiPDF } from "./ui.js";

$("#cash-modal-convert-pdf button#cash-convert-pdf")
  .off("click")
  .on("click", async function () {
    const startDateVal = $(
      "#cash-modal-convert-pdf input#cash-start-date-1"
    ).val();
    const endDateVal = $("#cash-modal-convert-pdf input#cash-end-date-1").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    const { status, response } = await getPDF(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        // summary cash
        const sumCash1 = await summary1(req);
        const htlmContent = uiPDF(response, sumCash1);
        const filePath = await window.electronAPI.savePDF(htlmContent);
        if (filePath) {
          uiAlertSuccess(`File PDF Save on ${filePath}`);
          $("#cash-modal-convert-pdf input#cash-start-date-1").val("");
          $("#cash-modal-convert-pdf input#cash-end-date-1").val("");
          $("#cash-modal-convert-pdf").modal("hide");
        } else {
          console.error(filePath);
        }
      }
      if (!existed) {
        uiAlertFailed1(`uppsss, it's still empty....`);
      }
    }
    if (!status) {
      console.error(response);
      uiAlertFailed1(response);
    }
  });
