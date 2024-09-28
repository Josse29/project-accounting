import {
  getSalesDate,
  getSalesSumDate,
} from "../../../../serverless-side/functions/sales.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { uiTr, uiTrEmpty } from "./ui.js";

$("button#read-sales-date")
  .off("click")
  .on("click", async function () {
    try {
      const startDateVal = $("input#sales-read-startDate").val();
      const endDateVal = $("input#sales-read-endDate").val();
      const date = ` ${formatWaktuIndo(startDateVal)} - ${formatWaktuIndo(
        endDateVal
      )}`;
      if (
        startDateVal !== "" &&
        endDateVal !== "" &&
        startDateVal <= endDateVal
      ) {
        const req = {
          startDateVal,
          endDateVal,
        };
        // summary
        const summary = await getSalesSumDate(req);
        const rupiah = formatRupiah2(summary);
        const p = `<p class="fs-5 mb-1 fw-bold text-capitalize">${date}</p>
                    <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
        $("div#summary").html(p);
        const getByDate = await getSalesDate(req);
        const existed = getByDate.length >= 1;
        if (existed) {
          let table = ``;
          let index = 1;
          getByDate.forEach((rows) => {
            table += uiTr(rows);
            index++;
          });
          $("div#sales-read-table").html(table);
        }
        if (!existed) {
          const empty = uiTrEmpty(date);
          $("div#sales-read-table").html(empty);
        }
        // references-callback-ui
        // 1.limit-search
        $("div#sales-limit-search").addClass("d-none");
        // 2.pagination
        $("div#sales-page-container").addClass("d-none");
        // 3.select-adjacent
        $("select#sales-read-productid").val("Choose One Of Products");
        $("select#sales-read-personid").val("Choose One Of Sales");
        $("select#sales-read-customerid").val("Choose One Of Customers");
      }
    } catch (error) {
      console.error(error);
    }
  });
