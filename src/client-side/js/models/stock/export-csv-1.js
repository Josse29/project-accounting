import { getStockDate1API } from "./services.js";
import { uiFailed, uiSuccess } from "./ui-1.js";

$("#modal-sales-convert-csv button#sale-convert-csv")
  .off("click")
  .on("click", async function () {
    const startDateVal = $("input#sale-start-date").val();
    const endDateVal = $("input#sale-end-date").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    const { status, response } = await getStockDate1API(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const savedPath = await window.ElectronAPI.saveCSV(response);
        if (savedPath) {
          uiSuccess(`File Excel has been saved on ${savedPath}`);
          $("div#modal-sales-convert-csv #failed").html(``);
          $("input#sale-start-date").val("");
          $("input#sale-end-date").val("");
          $("#modal-sales-convert-csv").modal("hide");
        }
      }
      if (!existed) {
        uiFailed(`uppssss, sales is empty...`);
      }
    }
    if (!status) {
      uiFailed(response);
      console.error(response);
    }
  });
