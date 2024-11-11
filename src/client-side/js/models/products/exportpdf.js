import { getPDF } from "./services.js";
import { uiAlertFail, uiAlertSuccess } from "./ui.js";
//
// export pdf product
$("#product-export-pdf")
  .off("click")
  .on("click", async () => {
    const { status, response } = await getPDF();
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        // 1. load file page pdf first
        ipcRenderer.send("pdf:product");
        // 2. after success create pdf and display ui aler success
        ipcRenderer.on("success:pdf-product", (e, file_path) => {
          uiAlertSuccess(`File PDF Savded on ${file_path}`);
        });
      } else {
        uiAlertFail("upppps Product is still empty...");
      }
    }
    if (!status) {
      console.error(response);
    }
  });
