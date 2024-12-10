import { getByProductId, getSumProductId } from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";
import { listProductRefSalesRead } from "../products/list.js";
import { formatRupiah2 } from "./../../utils/formatPrice.js";
import { animateFade } from "../../utils/updateUi.js";

// 1. get list
await listProductRefSalesRead();

$("select#sales-read-productid")
  .off("change")
  .on("change", async function () {
    // 1. animate
    animateFade("#sales-card-body");
    // 2. selected
    const seletedProductId = parseInt($(this).val());
    const selectedOption = $(this).find("option:selected");
    const productName = selectedOption.text();
    const priceSell = selectedOption.data("pricesell");
    const priceSellRp = formatRupiah2(priceSell);
    // 3. summary
    const sum = await getSumProductId(seletedProductId);
    const sumStatus = sum.status;
    const sumRes = sum.response;
    if (sumStatus) {
      const rupiah = formatRupiah2(sumRes * priceSell);
      const qty = sumRes;
      const summary = `<p class="fs-4 mb-1 fw-bold text-capitalize">${productName}</p>
                       <p class="fs-5 ms-1 mb-1">Price Sell : ${priceSellRp}</p>
                       <p class="fs-5 ms-1 mb-1">Qty : ${qty}</p>
                       <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
      $("div#summary").html(summary);
    }
    if (!sumStatus) {
      console.error(sumRes);
    }
    // 4. getAll
    const sales = await getByProductId(seletedProductId);
    const salesStatus = sales.status;
    const salesRes = sales.response;
    if (salesStatus) {
      const existed = salesRes.length >= 1;
      if (existed) {
        uiTbody(salesRes);
      }
      if (!existed) {
        uiTbodyEmpty(productName);
      }
    }
    if (!salesStatus) {
      console.error(salesRes);
    }
    // 5. references callback ui
    // 1.limit-search
    $("div#sales-limit-search").addClass("d-none");
    // 2.select-adjacent
    $("select#sales-read-personid").val("Choose One Of Sales");
    $("select#sales-read-customerid").val("Choose One Of Customers");
    // 3. remove date
    $("div#sales-date").addClass("d-none");
    // 4 .pagination
    $("div#sales-page-container").addClass("d-none");
  });
