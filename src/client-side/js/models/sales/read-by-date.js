import { getByDate, getSumDate } from "./services.js";
import { uiTbody, uiTbodyEmpty } from "./ui.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
import { listProductRefSalesReadDate } from "../products/list.js";
import { listUserRefSalesReadDate } from "../users/list.js";
import { animateFade } from "../../utils/updateUi.js";

$("button#read-sales-date")
  .off("click")
  .on("click", async function () {
    // request
    const startDateVal = $("input#sales-read-startDate").val();
    const endDateVal = $("input#sales-read-endDate").val();
    const date = `${formatWaktuIndo(startDateVal)} - ${formatWaktuIndo(
      endDateVal
    )}`;
    const req = {
      startDateVal,
      endDateVal,
    };
    if (startDateVal === "" || endDateVal === "" || startDateVal > endDateVal) {
      return;
    }
    // animate
    animateFade("#sales-card-body");
    // summary
    const summary = await getSumDate(req);
    const sumStatus = summary.status;
    const sumResponse = summary.response;
    if (sumStatus) {
      const rupiah = formatRupiah2(sumResponse);
      const p = `<p class="fs-5 mb-1 fw-bold text-capitalize">${date}</p>
              <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
      $("div#summary").html(p);
    }
    if (!sumStatus) {
      console.error(sumResponse);
    }
    // sales
    const sales = await getByDate(req);
    const salesStatus = sales.status;
    const salesResponse = sales.response;
    if (salesStatus) {
      const existed = salesResponse.length >= 1;
      if (existed) {
        uiTbody(salesResponse);
        // select with date product, sales, customer
        listProductRefSalesReadDate();
        listUserRefSalesReadDate();
        $("div#sales-select-date").removeClass("d-none");
      }
      if (!existed) {
        uiTbodyEmpty(date);
        $("div#sales-select-date").addClass("d-none");
      }
    }
    if (!salesStatus) {
      console.error(salesResponse);
    }
    // references-callback-ui
    // 1.limit-search
    $("div#sales-limit-search").addClass("d-none");
    // 2.select-adjacent without date and date
    $("div#sales-select").addClass("d-none");
    $("select#sales-read-productid-date").val("Choose One Of Products");
    $("select#sales-read-personid-date").val("Choose One Of Sales");
    $("select#sales-read-customerid-date").val("Choose One Of Customers");
    // 3.pagination
    $("div#sales-page-container").addClass("d-none");
  });
