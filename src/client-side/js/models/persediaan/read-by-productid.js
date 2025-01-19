import { formatPrice, formatRupiah2 } from "../../utils/formatPrice.js";
import { animateFade, reinitTooltip } from "../../utils/updateUi.js";
import { listProductRefPersediaanRead } from "../products/list.js";
import { getByProductId2 } from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";

await listProductRefPersediaanRead();
$("select#persediaan-refproduct-search")
  .off("change")
  .on("change", async function () {
    animateFade("#persediaan-section");
    // 1. req
    const selectedOption = $(this).find("option:selected");
    const selectedProductId = parseInt($(this).val());
    // 2. caption-selected
    const productName = selectedOption.text();
    // 3. price-buy
    const priceBuy = selectedOption.data("pricebuy");
    // 4. sum-qty and sum-price
    const sumQty = selectedOption.data("qty");
    // 5. insert - to - html sumpersediaan
    const sumSectionHTML = `
    <p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">${productName}</p> 
    <p class="fs-5 ms-4 mb-1">Price : ${formatRupiah2(priceBuy)}</p> 
    <p class="fs-5 ms-4 mb-1">Total Qty : ${sumQty}</p> 
    <p class="fs-5 ms-4">Total Price : ${formatPrice(priceBuy * sumQty)} </p>`;
    $("div#persediaan-sum-section").html(sumSectionHTML);
    // 6. stock-tables
    const byProduct = await getByProductId2(selectedProductId);
    const resByProduct = byProduct.response;
    const statusByProduct = byProduct.status;
    if (statusByProduct) {
      const existedProduct = resByProduct.length >= 1;
      if (existedProduct) {
        uiTbody(resByProduct);
        reinitTooltip();
      }
      if (!existedProduct) {
        uiTbodyEmpty(productName);
      }
    }
    if (!statusByProduct) {
      console.error(resByProduct);
    }
    // references
    $("#persediaanLimitSearch").addClass("d-none");
    $("select#persediaan-refsupplier-search").val("Choose One Of Suppliers");
    $("select#persediaan-refcategory-search").val("Choose One Of Categories");
    $("#persediaan-pagination").addClass("d-none");
    $("#section-alert").html(``);
  });
