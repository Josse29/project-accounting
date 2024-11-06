import convertCSV from "../../utils/convertcsv.js";
import { getCSV } from "./services.js";
import { uiAlertSuccess } from "./ui.js";

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
        try {
          const result = await convertCSV(response);
          uiAlertSuccess(`File Excel Save On ${result}`);
          $("#cash-modal-convert-csv input#cash-start-date").val("");
          $("#cash-modal-convert-csv input#cash-end-date").val("");
          $("#cash-modal-convert-csv").modal("hide");
        } catch (error) {
          console.error(error);
        }
      }
      if (!existed) {
        return false;
      }
    }
    if (!status) {
      console.error(response);
    }
  });
