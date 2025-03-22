import { getAccountingDateAPI } from "./services.js";
import { uiAlertFail3, uiAlertSuccess } from "./ui.js";

$("#accounting-modal-convert-csv button#accounting-convert-csv")
  .off("click")
  .on("click", async () => {
    const selectedAccount = $("select#select-account").val();
    const startDateVal = $(
      "#accounting-modal-convert-csv input#accounting-start-date"
    ).val();
    const endDateVal = $(
      "#accounting-modal-convert-csv input#accounting-end-date"
    ).val();
    const req = { selectedAccount, startDateVal, endDateVal };
    const { status, response } = await getAccountingDateAPI(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const filePath = await window.ElectronAPI.saveCSV(response);
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
        uiAlertFail3(`Uppsss, it's still empty......`);
        throw new Error(response);
      }
    }
    if (!status) {
      uiAlertFail3(response);
      throw new Error(response);
    }
  });
