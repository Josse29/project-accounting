import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { animateFade, reinitTooltip } from "../../utils/updateUi.js";
import { listProductRefPersediaanRead } from "../products/list.js";
import { getByProductId2, getSumQty } from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";

listProductRefPersediaanRead();
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
    const priceBuyRp = formatRupiah2(priceBuy);
    // 4. sum-qty and sum-price
    const sumQty = await getSumQty(selectedProductId);
    const sumQtyStatus = sumQty.status;
    const sumQtyRes = sumQty.response;
    if (sumQtyStatus) {
      const sumRp = priceBuy * sumQtyRes;
      const sumRp1 = formatRupiah2(parseFloat(sumRp));
      // insert - to - html sumpersediaan
      const sumSectionHTML = `
      <p class="fs-5 ms-2 mb-1 text-capitalize fw-bold ms-2">${productName}</p> 
      <p class="fs-5 ms-4 mb-1">Price : ${priceBuyRp}</p> 
      <p class="fs-5 ms-4 mb-1">Total Qty : ${sumQtyRes}</p> 
      <p class="fs-5 ms-4">Total Price : ${sumRp1} </p>`;
      $("div#persediaan-sum-section").html(sumSectionHTML);
    }
    if (!sumQtyStatus) {
      console.error(sumQtyRes);
    }
    // 5. stock-tables
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
  });
