import { getReport } from "./services.js";
import { uiFailed1, uiPDF, uiSuccess } from "./ui.js";
import {
  customerGroup,
  getSalesGroup,
  getTotal,
  productGroup,
} from "./utils.js";

// action
$("#modal-sales-convert-pdf button#sale-convert-pdf")
  .off("click")
  .on("click", async function () {
    // 1. get request
    const startDateVal = $("input#sale-start-date-1").val();
    const endDateVal = $("input#sale-end-date-1").val();
    const req = {
      startDateVal,
      endDateVal,
    };
    const { status, response } = await getReport(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const getTotal1 = await getTotal(req);
        const salesGroup = await getSalesGroup(req);
        const productGroup1 = await productGroup(req);
        const customerGroup1 = await customerGroup(req);
        const htmlContent = uiPDF(
          response,
          getTotal1,
          salesGroup,
          productGroup1,
          customerGroup1
        );
        const filePath = await window.electronAPI.savePDF(htmlContent);
        if (filePath) {
          uiSuccess(`File PDF saved on ${filePath}`);
          $("input#sale-start-date-1").val("");
          $("input#sale-end-date-1").val("");
          $("#modal-sales-convert-pdf").modal("hide");
        }
      }
      if (!existed) {
        uiFailed1(`upsssss it's stil empty....`);
      }
    }
    if (!status) {
      uiFailed1(response);
      console.error(response);
    }
  });
