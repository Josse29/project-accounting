import { getPersediaanReport } from "../../../../serverless-side/functions/persediaan.js";
import { uiSuccessActionPersediaan } from "./ui.js";

$(document).ready(function () {
  $("button#persediaan-export-excel").on("click", function () {
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
              uiSuccessActionPersediaan(`File Excel tersimpan di ${file_path}`);
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
  });
});
