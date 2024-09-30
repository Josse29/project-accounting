import {
  getPersediaanDateRpSupplierId,
  getPersediaanDateSupplierId,
} from "../../../../serverless-side/functions/persediaan.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { animateFade, reinitTooltip } from "../../utils/updateUi.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";
// get persediaan date and supplier
$("div#persediaan-date-all-search")
  .off("change", "select#persediaan-date-supplier")
  .on("change", "select#persediaan-date-supplier", async function () {
    try {
      animateFade("#persediaan-section");
      const startDateVal = $("input#persediaan-start-date").val();
      const endDateVal = $("input#persediaan-end-date").val();
      const supplierId = parseInt($(this).val());
      const req = { startDateVal, endDateVal, supplierId };
      // caption-selected
      const startDateTxt = formatWaktuIndo(startDateVal);
      const endDateTxt = formatWaktuIndo(endDateVal);
      const rangeDateTxt = `${startDateTxt} - ${endDateTxt}`;
      const selectedTxt = $(this).find("option:selected").text();
      // sum
      const sum = await getPersediaanDateRpSupplierId(req);
      const sumRupiah = formatRupiah2(sum);
      // insert - to - html sumpersediaan
      const sumSectionHTML = `<p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">
                                ${selectedTxt} | ${rangeDateTxt}</p>
                              <p class="fs-5 ms-4">Total Price : ${sumRupiah} </p>`;
      $("div#persediaan-sum-section").html(sumSectionHTML);
      // table
      const dateSupplier = await getPersediaanDateSupplierId(req);
      const existed = dateSupplier.length >= 1;
      if (existed) {
        let tr = ``;
        dateSupplier.forEach((element) => {
          tr += uiTbody(element);
        });
        $("#persediaan-table").html(tr);
        reinitTooltip();
      }
      if (!existed) {
        const tr = uiTbodyEmpty(selectedTxt);
        $("#persediaan-table").html(tr);
      }
      // references
      $("select#persediaan-date-product").val("Choose One Of Products");
      $("select#persediaan-date-category").val("Choose One Of Categories");
    } catch (error) {
      console.error(error);
    }
  });
