import {
  getPersediaanReport,
  getPersediaanTotalRow,
} from "../../../../serverless-side/functions/persediaan.js";
import { uiFailedActionPersediaan1, uiSuccessActionPersediaan } from "./ui.js";

$(document).ready(function () {
  $("button#persediaan-export-excel")
    .off("click")
    .on("click", function () {
      getPersediaanTotalRow("", (status, response) => {
        if (status) {
          const totalPersediaan = response >= 1;
          if (totalPersediaan) {
            actionConvert();
          }
          if (!totalPersediaan) {
            uiFailedActionPersediaan1(
              "uuppsss , sorry stock is still empty..."
            );
          }
        }
        if (!status) {
          console.error(response);
        }
      });
      function actionConvert() {
        let file_path = dialog.showSaveDialogSync({
          title: "Export Data",
          filters: [{ name: "microsoft-excel", extensions: ["csv"] }],
        });
        if (file_path) {
          file_path = file_path.replace(/\\/g, "/");
          getPersediaanReport((status, response) => {
            if (status) {
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
                  uiSuccessActionPersediaan(
                    `File Excel tersimpan di ${file_path}`
                  );
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
