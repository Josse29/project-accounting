import {
  getSalesDate,
  getSalesSumDate,
} from "../../../../serverless-side/functions/sales.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { listProductRefSalesReadDate } from "../products/list.js";
import { listUserRefSalesReadDate } from "../users/list.js";
import { uiTr, uiTrEmpty } from "./ui.js";
import { animateFade } from "../../utils/updateUi.js";
$("button#read-sales-date")
  .off("click")
  .on("click", async function () {
    try {
      // animate
      animateFade("#sales-card-body");
      const startDateVal = $("input#sales-read-startDate").val();
      const endDateVal = $("input#sales-read-endDate").val();
      if (
        startDateVal === "" ||
        endDateVal === "" ||
        startDateVal > endDateVal
      ) {
        return;
      }
      const req = {
        startDateVal,
        endDateVal,
      };
      // summary
      const summary = await getSalesSumDate(req);
      const rupiah = formatRupiah2(summary);
      const date = `${formatWaktuIndo(startDateVal)} - ${formatWaktuIndo(
        endDateVal
      )}`;
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
        $("tbody#sales-read-table").html(table);
        // select with date product, sales, customer
        listProductRefSalesReadDate();
        listUserRefSalesReadDate();
        $("div#sales-select-date").removeClass("d-none");
      }
      if (!existed) {
        const empty = uiTrEmpty(date);
        $("tbody#sales-read-table").html(empty);
        $("div#sales-select-date").addClass("d-none");
      }
      // references-callback-ui
      // 1.limit-search
      $("div#sales-limit-search").addClass("d-none");
      // 2.select-adjacent without date and date
      $("div#sales-select").addClass("d-none");
      $("select#sales-read-productid-date").val("Choose One Of Products");
      $("select#sales-read-personid-date").val("Choose One Of Sales");
      $("select#sales-read-customerid-date").val("Choose One Of Customers");
      // 3.pagination
      $("div#sales-page-container").addClass("d-none");
    } catch (error) {
      console.error(error);
    }
  });
