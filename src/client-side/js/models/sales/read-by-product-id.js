import {
  getSalesProductId,
  getSalesSumProductId,
} from "../../../../serverless-side/functions/sales.js";
import { formatRupiah2 } from "./../../utils/formatRupiah.js";
import { uiTable, uiTableEmpty } from "./ui.js";
$(document).ready(function () {
  $("select#sales-read-productid")
    .off("change")
    .on("change", function () {
      $("select#sales-read-personid").val("Choose One Of Sales");
      $("select#sales-read-customerid").val("Choose One Of Customers");
      $("div#sales-limit-search").addClass("d-none");
      $("div#sales-date").addClass("d-none");
      const seletedProductId = parseInt($(this).val());
      const selectedText = $(this).find("option:selected").text();
      getSalesSumProductId(seletedProductId, (status, response) => {
        if (status) {
          const rupiah = formatRupiah2(response.rupiah);
          const qty = response.qty;
          const ui = `<p class="fs-4 mb-1 fw-bold text-capitalize">${selectedText}</p>
                      <p class="fs-5 ms-1 mb-1">Qty : ${qty}</p>
                      <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
          $("div#summary").html(ui);
        }
        if (!status) {
          console.log(response);
        }
      });
      getSalesProductId(seletedProductId, (status, response) => {
        if (status) {
          const existed = response.length >= 1;
          if (existed) {
            let table = ``;
            let index = 1;
            response.forEach((rows) => {
              table += uiTable(rows, index);
              index++;
            });
            $("div#sales-read-table").html(table);
          }
          if (!existed) {
            $("div#sales-read-table").html(uiTableEmpty(selectedText));
          }
          $("div#sales-page-container").addClass("d-none");
        }
        if (!status) {
          console.error(response);
        }
      });
    });
});
