import { getListCategory } from "../../../../serverless-side/functions/categories.js";
import {
  getPersediaanCategoryId,
  getPersediaanRpSumCategoryId,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { listCategoryRefPersediaanRead } from "../categories/list.js";
import { uiTrPersediaan, uiTrZeroSearch } from "./ui.js";

$(document).ready(function () {
  listCategoryRefPersediaanRead();
  $("select#persediaan-refcategory-search").on("change", function () {
    const selectedText = $(this).find("option:selected").text();
    const selectedCategoryId = parseInt($(this).val());
    $("span#persediaan-id").text(selectedText);
    getPersediaanCategoryId(selectedCategoryId, (status, response) => {
      if (status) {
        const existedCategory = response.length >= 1;
        if (existedCategory) {
          let tr = "";
          response.forEach((element) => {
            tr += uiTrPersediaan(element);
          });
          $("#persediaan-sum-section").show();
          $("#persediaan-table").html(tr);
          getSum();
        }
        if (!existedCategory) {
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
      getPersediaanRpSumCategoryId(selectedCategoryId, (status, response) => {
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
