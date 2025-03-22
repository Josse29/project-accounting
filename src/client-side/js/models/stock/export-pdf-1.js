import { getStockPDF1API } from "./services.js";
import { uiFailed1, uiPDF, uiSuccess } from "./ui-1.js";

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
    const { status, response } = await getStockPDF1API(req);
    if (status) {
      const { Sale, SalesGroup1, SaleQty, SaleBalance, ProductGroup } =
        response;
      const existed = Sale.length >= 1;
      if (existed) {
        const htmlContent = uiPDF(
          Sale,
          SalesGroup1,
          SaleQty,
          SaleBalance,
          ProductGroup
        );
        const filePath = await window.ElectronAPI.savePDF(htmlContent);
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
