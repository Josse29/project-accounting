import { getCSV } from "./services.js";
import { uiAlertFail, uiAlertSuccess } from "./ui.js";

$("button#persediaan-export-excel")
  .off("click")
  .on("click", async function () {
    const { status, response } = await getCSV();
    if (status) {
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
              uiAlertSuccess(`File Save On ${file_path}`);
            }
            if (err) {
              console.error(err);
              throw err;
            }
          });
        }
      }
      if (!existed) {
        uiAlertFail("uuppsss , sorry stock is still empty...");
      }
    }
    if (!status) {
      console.error(response);
    }
  });
