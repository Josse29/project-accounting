import {
  getSalesCustomerId,
  getSalesSumCustomerId,
} from "../../../../serverless-side/functions/sales.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { uiTr, uiTrEmpty } from "./ui.js";

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
        const p = `<p class="fs-4 mb-1 fw-bold text-capitalize">${selectedText}</p>
                   <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
        $("div#summary").html(p);
        // table
        const resTable = await getSalesCustomerId(seletedPersonId);
        const existed = resTable.length >= 1;
        if (existed) {
          let table = ``;
          resTable.forEach((rows) => {
            table += uiTr(rows);
          });
          $("tbody#sales-read-table").html(table);
        }
        if (!existed) {
          const empty = uiTrEmpty(selectedText);
          $("tbody#sales-read-table").html(empty);
        }
        // references ui
        // 1.limit-search
        $("div#sales-limit-search").addClass("d-none");
        // 2.select-adjacent
        $("select#sales-read-productid").val("Choose One Of Products");
        $("select#sales-read-personid").val("Choose One Of Sales");
        // 3.pagination
        $("div#sales-page-container").addClass("d-none");
      } catch (error) {
        console.error(error);
      }
    });
});
