import { getByDateProduct, getSumByDateProduct } from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { animateFade } from "../../utils/updateUi.js";

// 1. triggered event button
$("select#sales-read-productid-date")
  .off("change")
  .on("change", async function () {
    // 2. animate
    animateFade("#sales-card-body");
    // 3. request-params
    const startDateVal = $("input#sales-read-startDate").val();
    const endDateVal = $("input#sales-read-endDate").val();
    const selectedProductId = parseInt($(this).val());
    const req = {
      startDateVal,
      endDateVal,
      selectedProductId,
    };
    // 4. caption
    const date = `${formatWaktuIndo(startDateVal)} - ${formatWaktuIndo(
      endDateVal
    )}`;
    const selected = $(this).find("option:selected");
    const selectedText = selected.text();
    const priceSellRp = formatRupiah2(selected.data("pricesell"));
    // 5. req-to-db || summary
    const summary = await getSumByDateProduct(req);
    const resSumStatus = summary.status;
    const resSum = summary.response;
    if (resSumStatus) {
      const rupiah = formatRupiah2(selected.data("pricesell") * resSum);
      // inserthtml-summary
      const newContent = `<p class="fs-5 mb-1 fw-bold text-capitalize">${selectedText} | ${date}</p>
                          <p class="fs-5 ms-1 mb-1">Price Sell : ${priceSellRp}</p>
                          <p class="fs-5 ms-1 mb-1">Qty : ${resSum}</p>
                          <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
      $("div#summary").html(newContent);
    }
    if (!resSumStatus) {
      console.error(resSum);
    }
    // 6. req-to-db || tables
    const sales = await getByDateProduct(req);
    const salesStatus = sales.status;
    const salesReponse = sales.response;
    if (salesStatus) {
      const existed = salesReponse.length >= 1;
      if (existed) {
        uiTbody(salesReponse);
      }
      if (!existed) {
        const txt = `${selectedText} , ${date}`;
        uiTbodyEmpty(txt);
      }
    }
    if (!salesStatus) {
      console.error(salesReponse);
    }
    // reference callback ui
    // 1.select
    $("select#sales-read-personid-date").val("Choose One Of Sales");
    $("select#sales-read-customerid-date").val("Choose One Of Customers");
  });
