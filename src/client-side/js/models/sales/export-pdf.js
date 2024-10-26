import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { getReport } from "./services.js";
import { uiSuccess } from "./ui.js";
$("#modal-sales-convert-pdf button#sale-convert-pdf")
  .off("click")
  .on("click", async function () {
    const startDateVal = $("input#sale-start-date-1").val();
    const endDateVal = $("input#sale-end-date-1").val();
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
          filters: [{ name: "pdf", extensions: ["pdf"] }],
        });
        if (file_path) {
          let tbody = ``;
          response.forEach((row) => {
            tbody += `<tr>
                    <td class="text-wrap align-content-center text-capitalize">${
                      row.SalesPersonName
                    }</td>
                    <td class="text-wrap align-content-center text-capitalize">${
                      row.ProductName
                    }</td>
                    <td class="text-wrap align-content-center">${formatRupiah2(
                      row.PriceSell
                    )}</td>
                    <td class="text-wrap align-content-center">${row.Qty}</td>
                    <td class="text-wrap align-content-center">${formatRupiah2(
                      row.Total
                    )}</td>
                  </tr>`;
          });
          ipcRenderer.send("pdf:sales", tbody, file_path);
          ipcRenderer.on("success:pdf-sales", (e, file_path) => {
            uiSuccess(file_path);
            $("input#sale-start-date").val("");
            $("input#sale-end-date").val("");
            $("#modal-sales-convert-pdf").modal("hide");
          });
        }
      }
    }
    if (!status) {
      console.error(response);
    }
  });
