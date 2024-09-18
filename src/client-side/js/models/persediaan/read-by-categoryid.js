import {
  getPersediaanCategoryId,
  getPersediaanRpSumCategoryId,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import { listCategoryRefPersediaanRead } from "../categories/list.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";

$(document).ready(function () {
  listCategoryRefPersediaanRead();
  $("select#persediaan-refcategory-search").on("change", async function () {
    try {
      const selectedText = $(this).find("option:selected").text();
      const selectedCategoryId = parseInt($(this).val());
      // caption
      $("span#persediaan-id").text(selectedText);
      // sum
      const sum = await getPersediaanRpSumCategoryId(selectedCategoryId);
      const rupiah = formatRupiah2(parseFloat(sum));
      $("span#total-rupiah-byid").text(rupiah);
      // table
      const byCategoryId = await getPersediaanCategoryId(selectedCategoryId);
      const existedCategory = byCategoryId.length >= 1;
      if (existedCategory) {
        let tr = "";
        byCategoryId.forEach((element) => {
          tr += uiTbody(element);
        });
        $("#persediaan-table").html(tr);
        reinitTooltip();
      }
      if (!existedCategory) {
        const tr = uiTbodyEmpty(selectedText);
        $("#persediaan-table").html(tr);
      }
      // references
      $("#persediaan-sum-section").show();
      $("#only-product").hide();
      $("span#persediaan-date-product").text("");
      $("select#persediaan-refproduct-search").val("Choose One Of Products");
      $("select#persediaan-refsupplier-search").val("Choose One Of Suppliers");
      $("#persediaan-pagination").addClass("d-none");
    } catch (error) {
      console.error(error);
    }
  });
});
