import { getPDF } from "./services.js";
import { uiAlertFailed1, uiAlertSuccess, uiTr1 } from "./ui.js";
import { getSumPDF } from "./utils.js";

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
        const summary = await getSumPDF(req);
        console.log(summary);
        // const html = uiTr1(response);
        const htmlContent = document.documentElement.outerHTML;
        console.log(htmlContent);
        const filePath = await window.electronAPI.savePDF(htmlContent);
        if (filePath) {
          uiAlertSuccess(`File PDF Save on ${filePath}`);
          $("#cash-modal-convert-pdf input#cash-start-date-1").val("");
          $("#cash-modal-convert-pdf input#cash-end-date-1").val("");
          $("#cash-modal-convert-pdf").modal("hide");
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
