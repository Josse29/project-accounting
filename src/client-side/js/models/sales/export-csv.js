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
    console.log(req);
    return false;
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
              $("input#sale-start-date").val("");
              $("input#sale-end-date").val("");
              let rangeDate = `Sale`;
              if (startDateVal > endDateVal) {
                rangeDate = `Sale ${startDateVal} s/d ${endDateVal}`;
              }
              uiSuccess(
                `File Excel ${rangeDate} has been saved on ${file_path}`
              );
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
