import { getByProductId, getSumProductId } from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";
import { listProductRefSalesRead } from "../products/list.js";
import { formatRupiah2 } from "./../../utils/formatRupiah.js";
import { animateFade } from "../../utils/updateUi.js";

listProductRefSalesRead();
$("select#sales-read-productid")
  .off("change")
  .on("change", async function () {
    // animate
    animateFade("#sales-card-body");
    const seletedProductId = parseInt($(this).val());
    const selectedOption = $(this).find("option:selected");
    // name
    const productName = selectedOption.text();
    // product sell
    const priceSell = selectedOption.data("pricesell");
    const priceSellRp = formatRupiah2(priceSell);
    // 1. totalrp
    const sum = await getSumProductId(seletedProductId);
    const sumStatus = sum.status;
    const sumRes = sum.response;
    if (sumStatus) {
      const rupiah = formatRupiah2(sumRes.rupiah);
      // qty
      const qty = sumRes.qty;
      // inserthtml
      const summary = `<p class="fs-4 mb-1 fw-bold text-capitalize">${productName}</p>
                       <p class="fs-5 ms-1 mb-1">Price Sell : ${priceSellRp}</p>
                       <p class="fs-5 ms-1 mb-1">Qty : ${qty}</p>
                       <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
      $("div#summary").html(summary);
    }
    if (!sumStatus) {
      console.error(sumRes);
    }
    // 2. getAll
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
    // references callback ui
    // 1.limit-search
    $("div#sales-limit-search").addClass("d-none");
    // 2.select-adjacent
    $("select#sales-read-personid").val("Choose One Of Sales");
    $("select#sales-read-customerid").val("Choose One Of Customers");
    // 3.pagination
    $("div#sales-page-container").addClass("d-none");
  });
