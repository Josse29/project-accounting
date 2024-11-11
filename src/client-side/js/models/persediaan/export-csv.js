import convertCSV from "../../utils/convertcsv.js";
import { getCSV } from "./services.js";
import { uiAlertFail, uiAlertSuccess } from "./ui.js";

$("#persediaan-modal-convert-csv button#persediaan-convert-csv")
  .off("click")
  .on("click", async function () {
    const startDateVal = $("input#persediaan-start-date-csv").val();
    const endDateVal = $("input#persediaan-end-date-csv").val();
    const req = { startDateVal, endDateVal };
    if (
      startDateVal > endDateVal ||
      (startDateVal !== "" && endDateVal === "") ||
      (startDateVal === "" && endDateVal !== "")
    ) {
      return false;
    }
    const { status, response } = await getCSV(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const filePath = await convertCSV(response);
        uiAlertSuccess(`File Excel Save On ${filePath}`);
        $("input#persediaan-start-date-csv").val("");
        $("input#persediaan-end-date-csv").val("");
        $("#persediaan-modal-convert-csv").modal("hide");
      }
      if (!existed) {
        uiAlertFail("uuppsss , sorry stock is still empty...");
        $("#persediaan-modal-convert-csv").modal("hide");
      }
    }
    if (!status) {
      console.error(response);
    }
  });
