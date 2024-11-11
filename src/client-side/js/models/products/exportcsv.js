import convertCSV from "../../utils/convertcsv.js";
import { getCSV } from "./services.js";
import { uiAlertFail, uiAlertSuccess } from "./ui.js";

$("#product-export-excel")
  .off("click")
  .on("click", async () => {
    const { status, response } = await getCSV();
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const filePath = await convertCSV(response);
        uiAlertSuccess(`File Save On ${filePath}`);
      } else {
        uiAlertFail("upppps Product is still empty...");
      }
    }
  });
