import { getPDF } from "./services.js";
import { uiAlertSuccess, uiTr1 } from "./ui.js";
import { getSumPDF } from "./utils.js";

$("#cash-modal-convert-pdf button#cash-convert-pdf")
  .off("click")
  .on("click", async function () {
    const startDateVal = $(
      "#cash-modal-convert-pdf input#sale-start-date-1"
    ).val();
    const endDateVal = $("#cash-modal-convert-pdf input#sale-end-date-1").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    if (
      startDateVal > endDateVal ||
      (startDateVal !== "" && endDateVal === "") ||
      (startDateVal === "" && endDateVal !== "")
    ) {
      return false;
    }
    const { status, response } = await getPDF(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        let file_path = dialog.showSaveDialogSync({
          title: "Export Data",
          filters: [{ name: "pdf", extensions: ["pdf"] }],
        });
        if (file_path) {
          const tr = uiTr1(response);
          const summary = await getSumPDF(req);
          ipcRenderer.send("pdf:cash", tr, summary, file_path);
          ipcRenderer.on("success:pdf-cash", (e, file_path) => {
            uiAlertSuccess(`File PDF Save on ${file_path}`);
            $("#cash-modal-convert-pdf input#sale-start-date").val("");
            $("#cash-modal-convert-pdf input#sale-end-date").val("");
            $("#cash-modal-convert-pdf").modal("hide");
          });
        }
      }
    }
    if (!status) {
      console.error(response);
    }
  });
