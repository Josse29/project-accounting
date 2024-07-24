import {
  getPersediaanDate,
  getPersediaanDateSum,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { uiTrPersediaan, uiTrZero } from "./ui.js";

$(document).ready(function () {
  $("button#persediaan-date-search").on("click", function () {
    const startDate = $("input#persediaan-start-date").val();
    const endDate = $("input#persediaan-end-date").val();
    if (startDate !== "" && endDate !== "" && startDate <= endDate) {
      getPersediaanDate(startDate, endDate, (status, response) => {
        if (status) {
          const existed = response.length >= 1;
          if (existed) {
            let tr = "";
            response.forEach((element) => {
              tr += uiTrPersediaan(element);
            });
            $("#persediaan-sum-section").show();
            $("#persediaan-table").html(tr);
            getSum(startDate, endDate);
          }
          if (!existed) {
            const tr = uiTrZero();
            $("#persediaan-table").html(tr);
            $("#persediaan-sum-section").hide();
          }
          $("#only-product").hide();
          $("#persediaan-pagination").addClass("d-none");
          $("input#persediaan-start-date").val("");
          $("input#persediaan-end-date").val("");
        }
        if (!status) {
          console.error(response);
        }
      });
      function getSum(startDate, endDate) {
        getPersediaanDateSum(startDate, endDate, (status, response) => {
          if (status) {
            $("#persediaan-id").html(
              formatWaktuIndo(startDate) + " - " + formatWaktuIndo(endDate)
            );
            const rupiah = formatRupiah2(parseFloat(response[0].TotalRp));
            $("span#total-rupiah-byid").text(rupiah);
          }
          if (!status) {
            console.error(response);
          }
        });
      }
    }
  });
});
