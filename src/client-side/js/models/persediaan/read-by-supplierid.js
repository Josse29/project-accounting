import {
  getPersediaanRpSumSupplierId,
  getPersediaanSupplierId,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { listSupplierRefPersediaanRead } from "../supplier/list.js";
import { uiTrPersediaan, uiTrZeroSearch } from "./ui.js";

$(document).ready(function () {
  listSupplierRefPersediaanRead();
  $("select#persediaan-refsupplier-search").on("change", function () {
    const selectedText = $(this).find("option:selected").text();
    $("span#persediaan-id").text(selectedText);
    const selectedSupplierId = parseInt($(this).val());
    getPersediaanSupplierId(selectedSupplierId, (status, response) => {
      if (status) {
        const existedSupplier = response.length >= 1;
        if (existedSupplier) {
          let tr = "";
          response.forEach((element) => {
            tr += uiTrPersediaan(element);
          });
          $("#persediaan-sum-section").show();
          $("#persediaan-table").html(tr);
          getSum();
        }
        if (!existedSupplier) {
          const tr = uiTrZeroSearch(selectedText);
          $("#persediaan-table").html(tr);
          $("#persediaan-sum-section").hide();
        }
        $("#only-product").hide();
        $("#persediaan-pagination").addClass("d-none");
      }
      if (!status) {
        console.error(response);
      }
    });
    function getSum() {
      getPersediaanRpSumSupplierId(selectedSupplierId, (status, response) => {
        if (status) {
          const rupiah = formatRupiah2(parseFloat(response));
          $("span#total-rupiah-byid").text(rupiah);
          $("span#persediaan-date-product").text("");
        }
        if (!status) {
          console.error(response);
        }
      });
    }
  });
});
