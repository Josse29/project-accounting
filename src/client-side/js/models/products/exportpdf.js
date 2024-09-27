import { getProductPDF } from "../../../../serverless-side/functions/product.js";
import { uiAlertFail, uiAlertSuccess, uiTrPDf } from "./ui.js";
//
// export pdf product
$("#product-export-pdf")
  .off("click")
  .on("click", async () => {
    try {
      const response = await getProductPDF();
      const existed = response.length >= 1;
      if (existed) {
        let file_path = dialog.showSaveDialogSync({
          title: "Export Data",
          filters: [{ name: "pdf", extensions: ["pdf"] }],
        });
        if (file_path) {
          file_path = file_path.replace(/\\/g, "/");
          let no = 1;
          let tbody = ``;
          response.forEach((row) => {
            tbody += uiTrPDf(no, row);
            no++;
          });
          ipcRenderer.send("pdf:product", tbody, file_path);
          ipcRenderer.on("success:pdf-product", (e, file_path) => {
            uiAlertSuccess(`File PDF tersimpan di ${file_path}`);
          });
        }
      } else {
        uiAlertFail("upppps Product is still empty...");
      }
    } catch (error) {
      console.error(error);
    }
  });
