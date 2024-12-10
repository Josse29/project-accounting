import { formatPrice } from "../../utils/formatPrice.js";
import { animateFade, reinitTooltip } from "../../utils/updateUi.js";
import { listCategoryRefPersediaanRead } from "../categories/list.js";
import { getByCategoryId, getSumPriceCategoryId } from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";

await listCategoryRefPersediaanRead();
$("select#persediaan-refcategory-search")
  .off("change")
  .on("change", async function () {
    animateFade("#persediaan-section");
    // 1. req
    const selectedCategoryId = parseInt($(this).val());
    // 2. caption-selected
    const selectedCategoryName = $(this).find("option:selected").text();
    // 3. price-buy
    const sum = await getSumPriceCategoryId(selectedCategoryId);
    const sumStatus = sum.status;
    const sumRes = sum.response;
    if (sumStatus) {
      const sumRupiah = formatPrice(sumRes);
      // insert - to - html sumpersediaan
      const sumSectionHTML = `
      <p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">${selectedCategoryName}</p>
      <p class="fs-5 ms-4">Total Price : ${sumRupiah} </p>`;
      $("div#persediaan-sum-section").html(sumSectionHTML);
    }
    if (!sumStatus) {
      console.error(sumRes);
    }
    // 4. stock-table
    const byCategoryId = await getByCategoryId(selectedCategoryId);
    const statusByCategory = byCategoryId.status;
    const resByCategory = byCategoryId.response;
    if (statusByCategory) {
      const existedCategory = resByCategory.length >= 1;
      if (existedCategory) {
        uiTbody(resByCategory);
        reinitTooltip();
      }
      if (!existedCategory) {
        uiTbodyEmpty(selectedCategoryName);
      }
    }
    if (!statusByCategory) {
      console.error(resByCategory);
    }
    // references
    $("#persediaanLimitSearch").addClass("d-none");
    $("select#persediaan-refproduct-search").val("Choose One Of Products");
    $("select#persediaan-refsupplier-search").val("Choose One Of Suppliers");
    $("#persediaan-pagination").addClass("d-none");
  });
