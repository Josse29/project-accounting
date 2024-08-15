import {
  getProductCSV,
  getTotalRowProduct,
} from "../../../../serverless-side/functions/product.js";
import { successActionProduct } from "./ui.js";

$(document).ready(function () {
  // export excel product
  $("#product-export-excel").on("click", () => {
    getTotalRowProduct("", (status, response) => {
      if (status) {
        const existProduct = response >= 1;
        if (existProduct) {
          actionCSV();
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
    function actionCSV() {
      const file_path = dialog.showSaveDialogSync({
        title: "Export Data",
        filters: [{ name: "microsoft-excel", extensions: ["csv"] }],
      });
      if (file_path) {
        getProductCSV((status, response) => {
          if (status) {
            let tHeadProduct = [Object.keys(response[0])];
            let tBodyProduct = response;
            let tableProduct = tHeadProduct.concat(tBodyProduct);
            let csvString = tableProduct
              .map((item) => {
                return Object.values(item).toString();
              })
              .join("\r\n");
            fs.writeFile(file_path, csvString, (err) => {
              if (!err) {
                successActionProduct(`File Excel tersimpan di ${file_path}`);
              }
              if (err) {
                console.error(err);
                throw err;
              }
            });
          }
          if (!status) {
            console.error(response);
          }
        });
      }
    }
  });
});
