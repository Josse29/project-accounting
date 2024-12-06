import { getCSV } from "./services.js";
import { uiAlertFail, uiAlertSuccess } from "./ui.js";

$("#product-export-excel")
  .off("click")
  .on("click", async () => {
    const { status, response } = await getCSV();
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const savedPath = await window.electronAPI.saveCSV(response);
        if (savedPath) {
          uiAlertSuccess(`File Save On ${savedPath}`);
        }
      } else {
        uiAlertFail("upppps Product is still empty...");
      }
    }
  });
