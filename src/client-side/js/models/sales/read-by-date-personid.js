import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { animateFade } from "../../utils/updateUi.js";
import { getByDatePerson, getSumByDatePerson } from "./services.js";
import { uiTBody, uiTrEmpty } from "./ui.js";
// by date and user
$("select#sales-read-personid-date")
  .off("change")
  .on("change", async function () {
    // animate
    animateFade("#sales-card-body");
    // req-params
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
    // req-to=db-summary
    const summary = await getSumByDatePerson(req);
    const resStatus = summary.status;
    const resSum = summary.response;
    if (resStatus) {
      const rupiah = formatRupiah2(resSum);
      const ui = `<p class="fs-5 mb-1 fw-bold text-capitalize">${selectedText} | ${date}</p>
                  <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
      $("div#summary").html(ui);
    }
    if (!resStatus) {
      console.error(resSum);
    }
    // req-to=db=table
    const sales = await getByDatePerson(req);
    const response = sales.response;
    const status = sales.status;
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        uiTBody(response);
      }
      if (!existed) {
        uiTrEmpty(`${selectedText} , ${date}`);
      }
    }
    if (!status) {
      console.error(response);
    }
    // reference callback ui
    // 1.select
    $("select#sales-read-productid-date").val("Choose One Of Products");
    $("select#sales-read-customerid-date").val("Choose One Of Customers");
  });
