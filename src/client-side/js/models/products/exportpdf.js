import { getPDF } from "./services.js";
import { uiAlertFail, uiAlertSuccess, uiTrPDf } from "./ui.js";
//
// export pdf product
$("#product-export-pdf")
  .off("click")
  .on("click", async () => {
    const { status, response } = await getPDF();
    if (status) {
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
    }
    if (!status) {
      console.error(response);
    }
  });
