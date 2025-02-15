import { getEquityDate2API } from "./services.js";
import { getEquityDateGroupUserAPI1, getEquitySumDateAPI1 } from "./utils.js";
import { uiAlertFail2, uiAlertSuccess, uiPDF } from "./ui.js";

$("#equity-convert-pdf button#equity-convert-pdf")
  .off("click")
  .on("click", async function () {
    const startDateVal = $(
      "#equity-convert-pdf input#equity-start-date-1"
    ).val();
    const endDateVal = $("#equity-convert-pdf input#equity-end-date-1").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    // table
    const { status, response } = await getEquityDate2API(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const equityDate = response;
        const equityDateGroupUser = await getEquityDateGroupUserAPI1(req);
        const equitySumDate = await getEquitySumDateAPI1(req);
        const htmlContent = uiPDF(
          equityDate,
          equityDateGroupUser,
          equitySumDate
        );
        const filePath = await window.electronAPI.savePDF(htmlContent);
        if (filePath) {
          // 1. ui alert success
          uiAlertSuccess(`File PDF Save on ${filePath}`);
          // 2. reset ui alert failed
          $("#equity-convert-pdf .failed").html(``);
          // 3. reset valua start and end
          $("#equity-convert-pdf input#equity-start-date-1").val("");
          $("#equity-convert-pdf input#equity-end-date-1").val("");
          // 4. modal hide
          $("#equity-convert-pdf").modal("hide");
        } else {
          console.error(filePath);
        }
      }
      if (!existed) {
        uiAlertFail2(`uppsss, it's still empty....`);
      }
    }
    if (!status) {
      uiAlertFail2(response);
      console.error(response);
      throw new Error(response);
    }
  });
