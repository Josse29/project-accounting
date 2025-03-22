import { getStockDateAPI } from "./services.js";
import { uiAlertFail, uiAlertSuccess } from "./ui.js";

$("#persediaan-modal-convert-csv button#persediaan-convert-csv")
  .off("click")
  .on("click", async function () {
    const startDateVal = $("input#persediaan-start-date-csv").val();
    const endDateVal = $("input#persediaan-end-date-csv").val();
    const req = { startDateVal, endDateVal };
    const { status, response } = await getStockDateAPI(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const savedPath = await window.ElectronAPI.saveCSV(response);
        if (savedPath) {
          uiAlertSuccess(`File Excel Save On ${savedPath}`);
          $("#persediaan-modal-convert-csv #failed").html(``);
          $("input#persediaan-start-date-csv").val("");
          $("input#persediaan-end-date-csv").val("");
          $("#persediaan-modal-convert-csv").modal("hide");
        }
      }
      if (!existed) {
        uiAlertFail("uuppsss , sorry stock is still empty...");
      }
    }
    if (!status) {
      uiAlertFail(response);
      throw new Error(response);
    }
  });
