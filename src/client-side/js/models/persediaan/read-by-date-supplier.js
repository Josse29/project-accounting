import { formatPrice } from "../../utils/formatPrice.js";
import { formatWaktuIndo } from "../../utils/formatTime.js";
import { animateFade, reinitTooltip } from "../../utils/updateUi.js";
import { getByDateSupplierId, getSumPriceDateSupplier } from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";

// get persediaan date and supplier
$("div#persediaan-date-all-search")
  .off("change", "select#persediaan-date-supplier")
  .on("change", "select#persediaan-date-supplier", async function () {
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
    const sum = await getSumPriceDateSupplier(req);
    const sumStatus = sum.status;
    const sumRes = sum.response;
    if (sumStatus) {
      const sumRupiah = formatPrice(sumRes);
      // insert - to - html sumpersediaan
      const sumSectionHTML = `
      <p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">${selectedTxt} | ${rangeDateTxt}</p>
      <p class="fs-5 ms-4">Total Price : ${sumRupiah} </p>`;
      $("div#persediaan-sum-section").html(sumSectionHTML);
    }
    if (!sumStatus) {
      console.error(sumRes);
    }
    // table
    const dateSupplier = await getByDateSupplierId(req);
    const dateSupplierStatus = dateSupplier.status;
    const dateSupplierRes = dateSupplier.response;
    if (dateSupplierStatus) {
      const existed = dateSupplierRes.length >= 1;
      if (existed) {
        uiTbody(dateSupplierRes);
        reinitTooltip();
      }
      if (!existed) {
        uiTbodyEmpty(selectedTxt);
      }
    }
    if (!dateSupplierStatus) {
      console.error(dateSupplierRes);
    }
    // references
    $("select#persediaan-date-product").val("Choose One Of Products");
    $("select#persediaan-date-category").val("Choose One Of Categories");
  });
