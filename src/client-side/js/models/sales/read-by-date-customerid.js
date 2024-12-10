import { getByDateCustomer, getSumByDateCustomer } from "./services.js";

import { uiTbody, uiTbodyEmpty } from "./ui.js";
import { formatRupiah2 } from "../../utils/formatPrice.js";
import { formatWaktuIndo } from "../../utils/formatTime.js";
import { animateFade } from "../../utils/updateUi.js";

$("select#sales-read-customerid-date")
  .off("change")
  .on("change", async function () {
    // animate
    animateFade("#sales-card-body");
    // req=to-params
    const startDateVal = $("input#sales-read-startDate").val();
    const endDateVal = $("input#sales-read-endDate").val();
    const selectedPersonId = parseInt($(this).val());
    const req = {
      startDateVal,
      endDateVal,
      selectedPersonId,
    };
    // caption
    const date = `${formatWaktuIndo(startDateVal)} - ${formatWaktuIndo(
      endDateVal
    )}`;
    const selectedText = $(this).find("option:selected").text();
    // req-to-db-summary
    const summary = await getSumByDateCustomer(req);
    const statusSum = summary.status;
    const resSum = summary.response;
    if (statusSum) {
      const rupiah = formatRupiah2(resSum);
      // inserthtml-summary
      const ui = `<p class="fs-5 mb-1 fw-bold text-capitalize">${selectedText} | ${date}</p>
             <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
      $("div#summary").html(ui);
    }
    if (!statusSum) {
      console.error(resSum);
    }
    // req-to-db-table
    const sales = await getByDateCustomer(req);
    const response = sales.response;
    const status = sales.status;
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        uiTbody(response);
      }
      if (!existed) {
        const txt = `${selectedText} , ${date}`;
        uiTbodyEmpty(txt);
      }
    }
    if (!status) {
      console.error(response);
    }
    // reference callback ui
    // 1.select
    $("select#sales-read-productid-date").val("Choose One Of Products");
    $("select#sales-read-personid-date").val("Choose One Of Sales");
  });
