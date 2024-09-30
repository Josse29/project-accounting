import {
  getSalesDateProductId,
  getSalesSumDateProductId,
} from "../../../../serverless-side/functions/sales.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { animateFade } from "../../utils/updateUi.js";
import { uiTr, uiTrEmpty } from "./ui.js";

// by date and product
$("select#sales-read-productid-date")
  .off("change")
  .on("change", async function () {
    try {
      // animate
      animateFade("#sales-card-body");
      // request-params
      const startDateVal = $("input#sales-read-startDate").val();
      const endDateVal = $("input#sales-read-endDate").val();
      const selectedProductId = parseInt($(this).val());
      const req = {
        startDateVal,
        endDateVal,
        selectedProductId,
      };
      // caption
      const date = `${formatWaktuIndo(startDateVal)} - ${formatWaktuIndo(
        endDateVal
      )}`;
      const selectedText = $(this).find("option:selected").text();
      // req-to-db || summary
      const resSum = await getSalesSumDateProductId(req);
      const rupiah = formatRupiah2(resSum.rupiah);
      const qty = resSum.qty;
      // inserthtml-summary
      const newContent = `<p class="fs-5 mb-1 fw-bold text-capitalize">${selectedText} | ${date}</p>
                          <p class="fs-5 ms-1 mb-1">Qty : ${qty}</p>
                          <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
      $("div#summary").html(newContent);
      // req-to-db || tables
      const resTable = await getSalesDateProductId(req);
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
      $("select#sales-read-personid-date").val("Choose One Of Sales");
      $("select#sales-read-customerid-date").val("Choose One Of Customers");
    } catch (error) {
      console.error(error);
    }
  });
