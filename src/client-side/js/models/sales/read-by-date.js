import { getByDate } from "./services.js";
import { uiFailed2, uiSummary, uiTbody, uiTbodyEmpty } from "./ui.js";
import { listProductRefSalesReadDate } from "../products/list.js";
import { listUserRefSalesReadDate } from "../users/list.js";
import { animateFade } from "../../utils/updateUi.js";
import { getSummary1 } from "./utils.js";

// 1. triggered event button
$("button#read-sales-date")
  .off("click")
  .on("click", async function () {
    // animate
    animateFade("#sales-card-body");
    // request
    const startDateVal = $("input#sales-read-startDate").val();
    const endDateVal = $("input#sales-read-endDate").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    // 1. sales
    const sales = await getByDate(req);
    const salesStatus = sales.status;
    const salesResponse = sales.response;
    if (salesStatus) {
      const existed = salesResponse.length >= 1;
      if (existed) {
        // 1. summary
        const price = await getSummary1(req);
        uiSummary(price, startDateVal, endDateVal);
        // 2. table
        uiTbody(salesResponse);
        // select with date product, sales, customer
        await listProductRefSalesReadDate();
        await listUserRefSalesReadDate();
        $("div#sales-select-date").removeClass("d-none");
      }
      if (!existed) {
        // 1. summary
        uiSummary("", startDateVal, endDateVal);
        // 2.table
        uiTbodyEmpty(date);
        $("div#sales-select-date").addClass("d-none");
      }
    }
    if (!salesStatus) {
      uiFailed2(salesResponse);
      throw new Error(salesResponse);
    }
    // references-callback-ui
    // 1.limit-search
    $("div#sales-limit-search").addClass("d-none");
    // 2.select-adjacent without
    $("select#sales-read-productid-date").val("Choose One Of Products");
    $("select#sales-read-personid-date").val("Choose One Of Sales");
    $("select#sales-read-customerid-date").val("Choose One Of Customers");
    // 3.date and date
    $("div#sales-select").addClass("d-none");
    // 4.pagination
    $("div#sales-page-container").addClass("d-none");
    // 5. alert
    $("div#sales-card-body div.failed").html(``);
  });
