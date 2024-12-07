import { getPDF } from "./services.js";
import { uiAlertFail, uiAlertSuccess, uiPDF } from "./ui.js";
//
// export pdf product
$("#product-export-pdf")
  .off("click")
  .on("click", async () => {
    const { status, response } = await getPDF();
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const htmlContent = uiPDF(response);
        const filePath = await window.electronAPI.savePDF(htmlContent);
        if (filePath) {
          uiAlertSuccess(`File PDF Savded on ${filePath}`);
        } else {
          console.error(filePath);
        }
      } else {
        uiAlertFail("upppps Product is still empty...");
      }
    }
    if (!status) {
      console.error(response);
    }
  });
