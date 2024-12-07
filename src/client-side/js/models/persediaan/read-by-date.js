import { getByDate, getSumPriceDate } from "./services.js";
import { formatRupiah2 } from "../../utils/formatPrice.js";
import { formatWaktuIndo } from "../../utils/formatTime.js";
import { animateFade, reinitTooltip } from "../../utils/updateUi.js";
import { listCategoryRefPersediaanReadDate } from "../categories/list.js";
import { listProductRefPersediaanReadDate } from "../products/list.js";
import { listSupplierRefPersediaanReadDate } from "../supplier/list.js";
import { uiSumPersediaanDate, uiTbody, uiTbodyEmpty } from "./ui.js";

$("button#persediaan-date-search")
  .off("click")
  .on("click", async function () {
    // 1. request
    const startDateVal = $("input#persediaan-start-date").val();
    const endDateVal = $("input#persediaan-end-date").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    // 2. validation date
    if (
      startDateVal > endDateVal ||
      (startDateVal !== "" && endDateVal === "") ||
      (startDateVal === "" && endDateVal !== "") ||
      (startDateVal === "" && endDateVal === "")
    ) {
      return false;
    }
    animateFade("#persediaan-section");
    // 3. caption-selected
    const startDateValTxt = formatWaktuIndo(startDateVal);
    const endDateValTxt = formatWaktuIndo(endDateVal);
    const rangeDateTxt = `All Product | ${startDateValTxt} - ${endDateValTxt} `;
    // 4. sum rupiah
    const sumRp = await getSumPriceDate(req);
    const sumRpRes = sumRp.response;
    const sumRpStatus = sumRp.status;
    if (sumRpStatus) {
      const sumRupiah = formatRupiah2(sumRpRes);
      // insert - to - html sumpersediaan
      const sumSectionHTML = `
      <p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">${rangeDateTxt}</p>
      <p class="fs-5 ms-4">Total Price : ${sumRupiah} </p>`;
      $("div#persediaan-sum-section").html(sumSectionHTML);
    }
    if (!sumRpStatus) {
      console.error(sumRpRes);
    }
    // 5. stock - table
    const byDate = await getByDate(req);
    const byDateRes = byDate.response;
    const byDateStatus = byDate.status;
    if (byDateStatus) {
      const existed = byDateRes.length >= 1;
      if (existed) {
        // list with date
        const productListDate = await listProductRefPersediaanReadDate();
        const supplierListDate = await listSupplierRefPersediaanReadDate();
        const categoryListDate = await listCategoryRefPersediaanReadDate();
        const allListDate = `
          ${productListDate}
          ${supplierListDate}
          ${categoryListDate}
        `;
        $("#persediaan-date-all-search").html(allListDate);
        uiTbody(byDateRes);
        reinitTooltip();
      }
      if (!existed) {
        uiTbodyEmpty(rangeDateTxt);
      }
    }
    if (!byDateStatus) {
      console.error(byDateRes);
    }
    // references
    uiSumPersediaanDate();
    $("#persediaan-pagination").addClass("d-none");
  });
