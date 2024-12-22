import { getCSV } from "./services.js";
import { uiAlertFailed, uiAlertSuccess } from "./ui.js";

$("button#cash-convert-csv")
  .off("click")
  .on("click", async () => {
    const startDateVal = $(
      "#cash-modal-convert-csv input#cash-start-date"
    ).val();
    const endDateVal = $("#cash-modal-convert-csv input#cash-end-date").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    const { status, response } = await getCSV(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const filePath = await window.electronAPI.saveCSV(response);
        if (filePath) {
          uiAlertSuccess(`File Excel Save On ${filePath}`);
          $("#cash-modal-convert-csv .failed").html(``);
          $("#cash-modal-convert-csv input#cash-start-date").val("");
          $("#cash-modal-convert-csv input#cash-end-date").val("");
          $("#cash-modal-convert-csv").modal("hide");
        }
      }
      if (!existed) {
        uiAlertFailed(`uppssss, it's still empty....`);
      }
    }
    if (!status) {
      console.error(response);
      uiAlertFailed(response);
    }
  });
