import {
  getPersediaanDateCategoryId,
  getPersediaanDateRpCategoryId,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { animateFade } from "../../utils/updateUi.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";
// get persediaan date and category
$("div#persediaan-date-all-search")
  .off("change", "select#persediaan-date-category")
  .on("change", "select#persediaan-date-category", async function () {
    try {
      animateFade("#persediaan-section");
      const startDateVal = $("input#persediaan-start-date").val();
      const endDateVal = $("input#persediaan-end-date").val();
      const categoryId = parseInt($(this).val());
      const req = { startDateVal, endDateVal, categoryId };
      // caption-selected
      const startDateTxt = formatWaktuIndo(startDateVal);
      const endDateTxt = formatWaktuIndo(endDateVal);
      const rangeDateTxt = `${startDateTxt} - ${endDateTxt}`;
      const selectedTxt = $(this).find("option:selected").text();
      // sum rupiah
      const sumRp = await getPersediaanDateRpCategoryId(req);
      const sumRupiah = formatRupiah2(sumRp);
      // insert - to - html sumpersediaan
      const sumSectionHTML = `<p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">
                                ${selectedTxt} | ${rangeDateTxt}</p>
                              <p class="fs-5 ms-4">Total Price : ${sumRupiah} </p>`;
      $("div#persediaan-sum-section").html(sumSectionHTML);
      // table
      const dateCategory = await getPersediaanDateCategoryId(req);
      const existed = dateCategory.length >= 1;
      if (existed) {
        let tr = ``;
        dateCategory.forEach((element) => {
          tr += uiTbody(element);
        });
        $("#persediaan-table").html(tr);
      }
      if (!existed) {
        const tr = uiTbodyEmpty(selectedTxt);
        $("#persediaan-table").html(tr);
      }
      // references
      $("select#persediaan-date-product").val("Choose One Of Products");
      $("select#persediaan-date-supplier").val("Choose One Of Suppliers");
    } catch (error) {
      console.error(error);
    }
  });
