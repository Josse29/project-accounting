import { getPersediaanReport } from "../../../../serverless-side/functions/persediaan.js";
import { uiFailedActionPersediaan1, uiSuccessActionPersediaan } from "./ui.js";

$(document).ready(function () {
  $("button#persediaan-export-excel")
    .off("click")
    .on("click", async function () {
      try {
        const response = await getPersediaanReport();
        const existed = response.length >= 1;
        if (existed) {
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
        }
        if (!existed) {
          uiFailedActionPersediaan1("uuppsss , sorry stock is still empty...");
        }
      } catch (error) {
        console.error(error);
      }
    });
});
