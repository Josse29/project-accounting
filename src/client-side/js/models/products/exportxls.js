import { getProductCSV } from "../../../../serverless-side/functions/product.js";
import { uiAlertFail, uiAlertSuccess } from "./ui.js";

$(document).ready(function () {
  // export excel product
  $("#product-export-excel")
    .off("click")
    .on("click", async () => {
      try {
        const response = await getProductCSV();
        const existed = response.length >= 1;
        if (existed) {
          const file_path = dialog.showSaveDialogSync({
            title: "Export Data",
            filters: [{ name: "microsoft-excel", extensions: ["csv"] }],
          });
          if (file_path) {
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
                uiAlertSuccess(`File Save On ${file_path}`);
              }
              if (err) {
                console.error(err);
                throw err;
              }
            });
          }
        } else {
          uiAlertFail("upppps Product is still empty...");
        }
      } catch (error) {
        console.error(error);
      }
    });
});
