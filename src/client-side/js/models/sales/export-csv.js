import { getReport } from "./services.js";
import { uiSuccess } from "./ui.js";
$("#modal-sales-convert-csv button#sale-convert-csv")
  .off("click")
  .on("click", async function () {
    const startDateVal = $("input#sale-start-date").val();
    const endDateVal = $("input#sale-end-date").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    if (startDateVal > endDateVal) {
      return false;
    }
    const { status, response } = await getReport(req);
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
              uiSuccess(`File Excel has been saved on ${file_path}`);
              $("input#sale-start-date").val("");
              $("input#sale-end-date").val("");
              $("#modal-sales-convert-csv").modal("hide");
            }
            if (err) {
              console.error(err);
              throw err;
            }
          });
        }
      }
    }
    if (!status) {
      console.error(response);
    }
  });
