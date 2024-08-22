import { getReportSales } from "../../../../serverless-side/functions/sales.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { uiSuccess } from "./ui.js";
$(document).ready(function () {
  $("button#sales-convert-pdf")
    .off("click")
    .on("click", function () {
      let file_path = dialog.showSaveDialogSync({
        title: "Export Data",
        filters: [{ name: "pdf", extensions: ["pdf"] }],
      });
      if (file_path) {
        getReportSales((status, response) => {
          if (status) {
            if (response.length >= 1) {
              let tbody = ``;
              response.forEach((row) => {
                tbody += `<tr>
                            <td class="text-wrap align-content-center">${formatWaktuIndo(
                              row.Date
                            )}</td>
                            <td class="text-wrap align-content-center">${
                              row.Hour
                            }</td>
                            <td class="text-wrap align-content-center">${
                              row.SalesPersonName
                            }</td>
                            <td class="text-wrap align-content-center">${
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
                            <td class="text-wrap align-content-center">${
                              row.CustomerName
                            } </td>
                            <td class="text-wrap align-content-center">${
                              row.Status
                            }</td>
                        </tr>`;
              });
              ipcRenderer.send("pdf:sales", tbody, file_path);
            }
          }
          if (!status) {
            console.log(response);
          }
        });
      }
    });
  ipcRenderer.on("success:pdf-sales", (e, file_path) => {
    uiSuccess(file_path);
  });
});
