import { getReportSales } from "../../../../serverless-side/functions/sales.js";
import { uiSuccess } from "./ui.js";
$(document).ready(function () {
  $("button#sales-convert-csv")
    .off("click")
    .on("click", function () {
      getReportSales((status, response) => {
        if (status) {
          if (response.length >= 1) {
            actionConvert(response);
          }
        }
        if (!status) {
          console.log(response);
        }
      });
      function actionConvert(response) {
        let file_path = dialog.showSaveDialogSync({
          title: "Export Data",
          filters: [{ name: "microsoft-excel", extensions: ["csv"] }],
        });
        if (file_path) {
          file_path = file_path.replace(/\\/g, "/");
          let tHead = [Object.keys(response[0])];
          let tBody = response;
          let table = tHead.concat(tBody);
          let csvString = table
            .map((item) => {
              return Object.values(item).toString();
            })
            .join("\r\n");
          fs.writeFile(file_path, csvString, (err) => {
            if (!err) {
              uiSuccess(`File Excel tersimpan di ${file_path}`);
            }
            if (err) {
              console.error(err);
              throw err;
            }
          });
        }
      }
    });
});
