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
      // req
      const selectedCategoryId = parseInt($(this).val());
      // selected
      const selectedCategoryName = $(this).find("option:selected").text();
      // sum
      const sum = await getPersediaanRpSumCategoryId(selectedCategoryId);
      const sumRupiah = formatRupiah2(parseFloat(sum));
      // insert - to - html sumpersediaan
      const sumSectionHTML = `<p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">
                                ${selectedCategoryName}</p>
                              <p class="fs-5 ms-4">Total Price : ${sumRupiah} </p>`;
      $("div#persediaan-sum-section").html(sumSectionHTML);
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
        const tr = uiTbodyEmpty(selectedCategoryName);
        $("#persediaan-table").html(tr);
      }
      // references
      $("#persediaanLimitSearch").addClass("d-none");
      $("select#persediaan-refproduct-search").val("Choose One Of Products");
      $("select#persediaan-refsupplier-search").val("Choose One Of Suppliers");
      $("#persediaan-pagination").addClass("d-none");
    } catch (error) {
      console.error(error);
    }
  });
});
