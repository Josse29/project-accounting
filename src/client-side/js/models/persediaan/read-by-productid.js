import {
  getPersediaanProductId2,
  getPersediaanQty,
  getPersediaanRpSumProductId,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { listProductRefPersediaanRead } from "../products/list.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";

$(document).ready(function () {
  listProductRefPersediaanRead();
  $("select#persediaan-refproduct-search")
    .off("change")
    .on("change", function () {
      const selectedText = $(this).find("option:selected").text();
      $("span#persediaan-id").text(selectedText);
      const selectedProductId = parseInt($(this).val());
      getPersediaanProductId2(selectedProductId, (status, response) => {
        if (status) {
          const existedProduct = response.length >= 1;
          if (existedProduct) {
            let tr = "";
            response.forEach((element) => {
              tr += uiTbody(element);
            });
            $("#persediaan-table").html(tr);
            $("div#persediaan-sum-section").show();
            $("div#only-product").show();
            const rupiah = formatRupiah2(
              parseFloat(response[0].ProductPriceBeli)
            );
            $("span#rupiah-byid").text(rupiah);
            $("#persediaan-pagination").addClass("d-none");
            getSum();
          }
          if (!existedProduct) {
            const tr = uiTbodyEmpty(selectedText);
            $("#persediaan-table").html(tr);
            $("div#persediaan-sum-section").hide();
          }
          $("select#persediaan-refsupplier-search").val("Supplier");
          $("select#persediaan-refcategory-search").val("Kategori");
          $("#persediaan-pagination").addClass("d-none");
        }
        if (!status) {
          console.error(response);
        }
      });
      function getSum() {
        getPersediaanQty(selectedProductId, (status, response) => {
          if (status) {
            const totalQty = response;
            $("span#total-qty-byid").text(totalQty);
          }
          if (!status) {
            console.error(response);
          }
        });
        getPersediaanRpSumProductId(selectedProductId, (status, response) => {
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
