import { getReportSales } from "../../../../serverless-side/functions/sales.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { uiSuccess } from "./ui.js";
$(document).ready(function () {
  $("button#sales-convert-pdf")
    .off("click")
    .on("click", async function () {
      try {
        const response = await getReportSales();
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
                          <td class="text-wrap align-content-center">${
                            row.Qty
                          }</td>
                          <td class="text-wrap align-content-center">${formatRupiah2(
                            row.Total
                          )}</td>
                        </tr>`;
            });
            ipcRenderer.send("pdf:sales", tbody, file_path);
            ipcRenderer.on("success:pdf-sales", (e, file_path) => {
              uiSuccess(file_path);
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
});
