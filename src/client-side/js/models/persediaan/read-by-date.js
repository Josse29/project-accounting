import { getByDate, getSumPriceDate } from "./services.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { animateFade, reinitTooltip } from "../../utils/updateUi.js";
import { listCategoryRefPersediaanReadDate } from "../categories/list.js";
import { listProductRefPersediaanReadDate } from "../products/list.js";
import { listSupplierRefPersediaanReadDate } from "../supplier/list.js";
import { uiSumPersediaanDate, uiTbody, uiTbodyEmpty } from "./ui.js";

$("button#persediaan-date-search")
  .off("click")
  .on("click", async function () {
    // 1. request
    const startDate = $("input#persediaan-start-date").val();
    const endDate = $("input#persediaan-end-date").val();
    const req = {
      startDate,
      endDate,
    };
    // 2. validation date
    if (startDate === "" || endDate === "" || startDate > endDate) {
      return false;
    }
    animateFade("#persediaan-section");
    // 3. caption-selected
    const startDateTxt = formatWaktuIndo(startDate);
    const endDateTxt = formatWaktuIndo(endDate);
    const rangeDateTxt = `All Product | ${startDateTxt} - ${endDateTxt} `;
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
        uiTbody(byDateRes);
        reinitTooltip();
        // list with date
        listProductRefPersediaanReadDate();
        listSupplierRefPersediaanReadDate();
        listCategoryRefPersediaanReadDate();
        const select = `
        <select class="form-control w-auto mb-3" id="persediaan-date-product">
          <option value="test" class="fs-6">Product</option>
        </select>
        <select class="form-control w-auto mb-3" id="persediaan-date-supplier">
          <option value="test" class="fs-6">Supplier</option>
        </select>
        <select class="form-control w-auto mb-3" id="persediaan-date-category">
          <option value="test" class="fs-6">Kategori</option>
        </select>`;
        $("div#persediaan-date-all-search").html(select);
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
