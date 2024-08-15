import {
  getProductPDF,
  getTotalRowProduct,
} from "../../../../serverless-side/functions/product.js";
import { uiFailedPDF, uiTrPDf } from "./ui.js";

// export pdf product
$("#product-export-pdf").on("click", () => {
  getTotalRowProduct("", (status, response) => {
    if (status) {
      const existProduct = response >= 1;
      if (existProduct) {
        actionPdf();
      }
      if (!existProduct) {
        uiFailedPDF("upppps Product is still empty...");
        console.log(response);
      }
    }
    if (!status) {
      console.error(response);
    }
  });
  function actionPdf() {
    let file_path = dialog.showSaveDialogSync({
      title: "Export Data",
      filters: [{ name: "pdf", extensions: ["pdf"] }],
    });
    if (file_path) {
      file_path = file_path.replace(/\\/g, "/");
      getProductPDF((status, response) => {
        if (status) {
          let no = 1;
          let tbody = ``;
          response.forEach((row) => {
            tbody += uiTrPDf(no, row);
            no++;
          });
          sendIpc(tbody, file_path);
        }
        if (!status) {
          console.error(response);
        }
      });
      function sendIpc(tbody, file_path) {
        ipcRenderer.send("pdf:product", tbody, file_path);
      }
    }
  }
});
// export pdf product
$("#product-export-print").on("click", () => {
  getTotalRowProduct("", (status, response) => {
    if (status) {
      const existProduct = response >= 1;
      if (existProduct) {
        actionPrint();
      }
      if (!existProduct) {
        uiFailedPDF("upppps Product is still empty...");
        console.log(response);
      }
    }
    if (!status) {
      console.error(response);
    }
  });
  function actionPrint() {
    getProductPDF((status, response) => {
      if (status) {
        let no = 1;
        let tbody = ``;
        response.forEach((row) => {
          tbody += uiTrPDf(no, row);
          no++;
        });
        sendIpc(tbody);
      }
      if (!status) {
        console.error(response);
      }
    });
    function sendIpc(tbody) {
      ipcRenderer.send("print:product", tbody);
    }
  }
});
