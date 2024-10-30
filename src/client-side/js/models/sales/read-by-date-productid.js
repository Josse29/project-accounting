import { getByDateProduct, getSumByDateProduct } from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { animateFade } from "../../utils/updateUi.js";

// by date and product
$("select#sales-read-productid-date")
  .off("change")
  .on("change", async function () {
    // animate
    animateFade("#sales-card-body");
    // request-params
    const startDateVal = $("input#sales-read-startDate").val();
    const endDateVal = $("input#sales-read-endDate").val();
    const selectedProductId = parseInt($(this).val());
    const req = {
      startDateVal,
      endDateVal,
      selectedProductId,
    };
    // caption
    const date = `${formatWaktuIndo(startDateVal)} - ${formatWaktuIndo(
      endDateVal
    )}`;
    const selectedText = $(this).find("option:selected").text();
    // req-to-db || summary
    const summary = await getSumByDateProduct(req);
    const resSum = summary.response;
    const resSumStatus = summary.status;
    if (resSumStatus) {
      const rupiah = formatRupiah2(resSum.rupiah);
      const qty = resSum.qty;
      // inserthtml-summary
      const newContent = `<p class="fs-5 mb-1 fw-bold text-capitalize">${selectedText} | ${date}</p>
                          <p class="fs-5 ms-1 mb-1">Qty : ${qty}</p>
                          <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
      $("div#summary").html(newContent);
    }
    if (!resSumStatus) {
      console.error(resSum);
    }
    // req-to-db || tables
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
