import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { animateFade } from "../../utils/updateUi.js";
import { getByDateCategoryId, getSumPriceDateCategory } from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";
// get persediaan date and category
$("div#persediaan-date-all-search")
  .off("change", "select#persediaan-date-category")
  .on("change", "select#persediaan-date-category", async function () {
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
    const sumRp = await getSumPriceDateCategory(req);
    const sumRpRes = sumRp.response;
    const sumRpStatus = sumRp.status;
    if (sumRpStatus) {
      const sumRupiah = formatRupiah2(sumRpRes);
      // insert - to - html sumpersediaan
      const sumSectionHTML = `<p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">
                              ${selectedTxt} | ${rangeDateTxt}</p>
                            <p class="fs-5 ms-4">Total Price : ${sumRupiah} </p>`;
      $("div#persediaan-sum-section").html(sumSectionHTML);
    }
    if (!sumRpStatus) {
      console.error(sumRpRes);
    }
    // table
    const dateCategory = await getByDateCategoryId(req);
    const dateCategoryStatus = dateCategory.status;
    const dateCategoryRes = dateCategory.response;
    if (dateCategoryStatus) {
      const existed = dateCategoryRes.length >= 1;
      if (existed) {
        uiTbody(dateCategoryRes);
      }
      if (!existed) {
        const tr = uiTbodyEmpty(selectedTxt);
        $("#persediaan-table").html(tr);
      }
    }
    if (!dateCategoryStatus) {
      console.error(dateCategoryRes);
    }
    // references
    $("select#persediaan-date-product").val("Choose One Of Products");
    $("select#persediaan-date-supplier").val("Choose One Of Suppliers");
  });
