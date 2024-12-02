import { getByPersonId, getSumPersonId } from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { listUserRefSalesRead } from "./../users/list.js";
import { animateFade } from "../../utils/updateUi.js";

// 1. get list
await listUserRefSalesRead();

$("select#sales-read-personid")
  .off("change")
  .on("change", async function () {
    // 2. animate
    animateFade("#sales-card-body");
    // 3. selected
    const seletedPersonId = parseInt($(this).val());
    const selectedText = $(this).find("option:selected").text();
    // 4. summary
    const sum = await getSumPersonId(seletedPersonId);
    const sumStatus = sum.status;
    const sumRes = sum.response;
    if (sumStatus) {
      const summaryRp = formatRupiah2(sumRes);
      const ui = `<p class="fs-4 mb-1 fw-bold text-capitalize">${selectedText}</p>
                    <p class="fs-5 ms-1 mb-1">Total : ${summaryRp}</p> `;
      $("div#summary").html(ui);
    }
    if (!sumStatus) {
      console.error(sumRes);
    }
    // 5. get all
    const sales = await getByPersonId(seletedPersonId);
    const salesStatus = sales.status;
    const salesResponse = sales.response;
    if (salesStatus) {
      const existed = salesResponse.length >= 1;
      if (existed) {
        uiTbody(salesResponse);
      }
      if (!existed) {
        uiTbodyEmpty(selectedText);
      }
    }
    if (!salesStatus) {
      console.error(salesResponse);
    }
    // 6. references callback ui
    // 1.limit-search
    $("div#sales-limit-search").addClass("d-none");
    // 2.select-adjacent
    $("select#sales-read-productid").val("Choose One Of Products");
    $("select#sales-read-customerid").val("Choose One Of Customers");
    // 3. remove date
    $("div#sales-date").addClass("d-none");
    // 4. pagination
    $("div#sales-page-container").addClass("d-none");
  });
