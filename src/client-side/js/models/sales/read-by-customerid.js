import {
  getSalesCustomerId,
  getSalesSumCustomerId,
} from "../../../../serverless-side/functions/sales.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { uiTable, uiTableEmpty } from "./ui.js";

$(document).ready(function () {
  $("select#sales-read-customerid")
    .off("change")
    .on("change", async function () {
      try {
        const seletedPersonId = parseInt($(this).val());
        const selectedText = $(this).find("option:selected").text();
        // sum
        const resSum = await getSalesSumCustomerId(seletedPersonId);
        const rupiah = formatRupiah2(resSum);
        const ui = `<p class="fs-4 mb-1 fw-bold text-capitalize">${selectedText}</p>
                    <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
        $("div#summary").html(ui);
        // table
        const resTable = await getSalesCustomerId(salesPersonId);
        const existed = resTable.length >= 1;
        if (existed) {
          let table = ``;
          let index = 1;
          resTable.forEach((rows) => {
            table += uiTable(rows);
          });
          $("tbody#sales-read-table").html(table);
        }
        if (!existed) {
          $("tbody#sales-read-table").html(uiTableEmpty(selectedText));
        }
        $("div#sales-page-container").addClass("d-none");
        // references ui
        $("select#sales-read-productid").val("Choose One Of Products");
        $("select#sales-read-personid").val("Choose One Of Sales");
        $("div#sales-limit-search").addClass("d-none");
        $("div#sales-date").addClass("d-none");
      } catch (error) {
        console.error(error);
      }
    });
});
