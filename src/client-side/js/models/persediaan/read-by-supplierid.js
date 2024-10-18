import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { animateFade, reinitTooltip } from "../../utils/updateUi.js";
import { listSupplierRefPersediaanRead } from "../supplier/list.js";
import { getBySupplierId, getSumPriceSupplierId } from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";

listSupplierRefPersediaanRead();
$("select#persediaan-refsupplier-search")
  .off("change")
  .on("change", async function () {
    animateFade("#persediaan-section");
    // 1. req
    const selectedSupplierId = parseInt($(this).val());
    // 2. caption-selected
    const selectedSupplierName = $(this).find("option:selected").text();
    // 3. price-buy
    const summary = await getSumPriceSupplierId(selectedSupplierId);
    const summaryRes = summary.response;
    const summaryStatus = summary.status;
    if (summaryStatus) {
      const resSumRp = formatRupiah2(summaryRes);
      // insertohtml
      const sectionSum = `
      <p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">${selectedSupplierName}</p>
      <p class="fs-5 ms-4 mb-1 text-capitalize">Total : ${resSumRp}</p>
      `;
      $("div#persediaan-sum-section").html(sectionSum);
    }
    if (!summaryStatus) {
      console.error(summaryRes);
    }
    // 4. stock-tables
    const stock = await getBySupplierId(selectedSupplierId);
    const resStock = stock.response;
    const statusStock = stock.status;
    if (statusStock) {
      const existedSupplier = resStock.length >= 1;
      if (existedSupplier) {
        uiTbody(resStock);
        reinitTooltip();
      }
      if (!existedSupplier) {
        uiTbodyEmpty(selectedSupplierName);
      }
    }
    if (!statusStock) {
      console.error(resStock);
    }
    // references
    $("#persediaanLimitSearch").addClass("d-none");
    $("select#persediaan-refproduct-search").val("Choose One Of Products");
    $("select#persediaan-refcategory-search").val("Choose One Of Categories");
    $("#persediaan-pagination").addClass("d-none");
  });
