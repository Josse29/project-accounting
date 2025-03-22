import { getStockPDFAPI } from "./services.js";
import { uiAlertFail1, uiAlertSuccess, uiPDF } from "./ui.js";

// actions
$("#persediaan-modal-convert-pdf #persediaan-convert-pdf")
  .off("click")
  .on("click", async () => {
    const startDateVal = $("input#persediaan-start-date-pdf").val();
    const endDateVal = $("input#persediaan-end-date-pdf").val();
    const req = { startDateVal, endDateVal };
    const { status, response } = await getStockPDFAPI(req);
    if (status) {
      const { Stock, GroupProduct, StockQty, StockBalance } = response;
      const existed = Stock.length >= 1;
      if (existed) {
        const htmlContent = uiPDF(Stock, GroupProduct, StockQty, StockBalance);
        const filePath = await window.ElectronAPI.savePDF(htmlContent);
        if (filePath) {
          uiAlertSuccess(`File PDF Saved on ${filePath}`);
          $("#persediaan-modal-convert-pdf #failed").html(``);
          $("input#persediaan-start-date-pdf").val("");
          $("input#persediaan-end-date-pdf").val("");
          $("#persediaan-modal-convert-pdf").modal("hide");
        }
      }
      if (!existed) {
        uiAlertFail1("uuppsss , sorry stock is still empty...");
        throw new Error(response);
      }
    }
    if (!status) {
      uiAlertFail1(response);
      throw new Error(response);
    }
  });
