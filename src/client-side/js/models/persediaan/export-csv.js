import { getCSV } from "./services.js";
import { uiAlertFail, uiAlertSuccess } from "./ui.js";

$("#persediaan-modal-convert-csv button#persediaan-convert-csv")
  .off("click")
  .on("click", async function () {
    const startDateVal = $("input#persediaan-start-date-csv").val();
    const endDateVal = $("input#persediaan-end-date-csv").val();
    const req = { startDateVal, endDateVal };
    if (
      startDateVal > endDateVal ||
      (startDateVal !== "" && endDateVal === "") ||
      (startDateVal === "" && endDateVal !== "")
    ) {
      return false;
    }
    const { status, response } = await getCSV(req);
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
              uiAlertSuccess(`File Excel Save On ${file_path}`);
              $("input#persediaan-start-date-csv").val("");
              $("input#persediaan-end-date-csv").val("");
              $("#persediaan-modal-convert-csv").modal("hide");
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
        $("#persediaan-modal-convert-csv").modal("hide");
      }
    }
    if (!status) {
      console.error(response);
    }
  });
