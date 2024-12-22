import { getByDate } from "./services.js";
import { uiAlertFailed, uiAlertSuccess } from "./ui.js";

$("#accounting-modal-convert-csv button#accounting-convert-csv")
  .off("click")
  .on("click", async () => {
    const startDateVal = $(
      "#accounting-modal-convert-csv input#accounting-start-date"
    ).val();
    const endDateVal = $(
      "#accounting-modal-convert-csv input#accounting-end-date"
    ).val();
    const req = { startDateVal, endDateVal };
    const { status, response } = await getByDate(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const filePath = await window.electronAPI.saveCSV(response);
        if (filePath) {
          uiAlertSuccess(`File Excel Save On ${filePath}`);
          $("div#accounting-modal-convert-csv div.failed").html("");
          $("#accounting-modal-convert-csv input#accounting-start-date").val(
            ""
          );
          $("#accounting-modal-convert-csv input#accounting-end-date").val("");
          $("div#accounting-modal-convert-csv").modal("hide");
        }
      }
      if (!existed) {
        uiAlertFailed(`Uppsss, it's still empty......`);
      }
    }
    if (!status) {
      uiAlertFailed(response);
      console.error(response);
    }
  });
