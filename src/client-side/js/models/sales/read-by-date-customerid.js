import {
  getSalesCustomerIdDate,
  getSalesSumCustomerIdDate,
} from "../../../../serverless-side/functions/sales.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { animateFade } from "../../utils/updateUi.js";
import { uiTr, uiTrEmpty } from "./ui.js";
$("select#sales-read-customerid-date")
  .off("change")
  .on("change", async function () {
    try {
      // animate
      animateFade("#sales-card-body");
      // req=to-params
      const startDateVal = $("input#sales-read-startDate").val();
      const endDateVal = $("input#sales-read-endDate").val();
      const selectedPersonId = parseInt($(this).val());
      const req = {
        startDateVal,
        endDateVal,
        selectedPersonId,
      };
      // caption
      const date = `${formatWaktuIndo(startDateVal)} - ${formatWaktuIndo(
        endDateVal
      )}`;
      const selectedText = $(this).find("option:selected").text();
      // req-to-db-summary
      const resSum = await getSalesSumCustomerIdDate(req);
      const rupiah = formatRupiah2(resSum);
      // inserthtml-summary
      const ui = `<p class="fs-5 mb-1 fw-bold text-capitalize">${selectedText} | ${date}</p>
                  <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
      $("div#summary").html(ui);
      // req-to-db-table
      const resTable = await getSalesCustomerIdDate(req);
      const existed = resTable.length >= 1;
      if (existed) {
        let tr = ``;
        resTable.forEach((rows) => {
          tr += uiTr(rows);
        });
        $("tbody#sales-read-table").html(tr);
      }
      if (!existed) {
        const tr = uiTrEmpty(`${selectedText} , ${date}`);
        $("tbody#sales-read-table").html(tr);
      }
      // reference callback ui
      // 1.select
      $("select#sales-read-productid-date").val("Choose One Of Products");
      $("select#sales-read-personid-date").val("Choose One Of Sales");
    } catch (error) {
      console.error(error);
    }
  });
