import { getEquityDate1API } from "./services.js";
import { uiAlertFail1, uiAlertSuccess } from "./ui.js";

$("button#equity-convert-csv")
  .off("click")
  .on("click", async () => {
    const startDateVal = $("#equity-convert-csv input#equity-start-date").val();
    const endDateVal = $("#equity-convert-csv input#equity-end-date").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    const { status, response } = await getEquityDate1API(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const filePath = await window.electronAPI.saveCSV(response);
        if (filePath) {
          // 1. ui alert success
          uiAlertSuccess(`File Excel Save On ${filePath}`);
          // 2. reset ui alert failed
          $("#equity-convert-csv .failed").html(``);
          // 3. reset valua start and end
          $("#equity-convert-csv input#equity-start-date").val("");
          $("#equity-convert-csv input#equity-end-date").val("");
          // 4. modal hide
          $("#equity-convert-csv").modal("hide");
        }
      }
      if (!existed) {
        uiAlertFail1(`uppssss, it's still empty....`);
      }
    }
    if (!status) {
      uiAlertFail1(response);
      console.error(response);
      throw new Error(response);
    }
  });
