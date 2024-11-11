import convertCSV from "../../utils/convertcsv.js";
import { getReport } from "./services.js";
import { uiSuccess } from "./ui.js";
$("#modal-sales-convert-csv button#sale-convert-csv")
  .off("click")
  .on("click", async function () {
    const startDateVal = $("input#sale-start-date").val();
    const endDateVal = $("input#sale-end-date").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    if (
      startDateVal > endDateVal ||
      (startDateVal !== "" && endDateVal === "") ||
      (startDateVal === "" && endDateVal !== "")
    ) {
      return false;
    }
    const { status, response } = await getReport(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const filePath = await convertCSV(response);
        uiSuccess(`File Excel has been saved on ${filePath}`);
        $("input#sale-start-date").val("");
        $("input#sale-end-date").val("");
        $("#modal-sales-convert-csv").modal("hide");
      }
    }
    if (!status) {
      console.error(response);
    }
  });
