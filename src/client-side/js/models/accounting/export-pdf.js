import {
  getAccountingPDF1API,
  getAccountingPDF2API,
  getAccountingPDF3API,
  getAccountingPDF4API,
  getAccountingPDF5API,
  getAccountingPDF6API,
  getAccountingPDF7API,
  getAccountingPDF8API,
  getAccountingPDFAPI,
} from "./services.js";

import {
  uiAlertFail4,
  uiAlertSuccess,
  uiPDF,
  uiPDF1,
  uiPDF2,
  uiPDF3,
  uiPDF4,
  uiPDF5,
  uiPDF6,
  uiPDF7,
  uiPDF8,
  uiReset3,
} from "./ui.js";

$("div#accounting-modal-convert-pdf button#accounting-convert-pdf")
  .off("click")
  .on("click", async () => {
    const selectedAccount = $(
      "div#accounting-modal-convert-pdf  select#select-account-1"
    ).val();
    const startDateVal = $(
      "div#accounting-modal-convert-pdf input#accounting-start-date-1"
    ).val();
    const endDateVal = $(
      "div#accounting-modal-convert-pdf input#accounting-end-date-1"
    ).val();
    const req = {
      selectedAccount,
      startDateVal,
      endDateVal,
    };
    if (selectedAccount === "111") {
      const { status, response } = await getAccountingPDFAPI(req);
      if (status) {
        const { AccountingDate, TotalCash } = response;
        const existed = AccountingDate.length >= 1;
        if (existed) {
          const htmlContent = uiPDF(AccountingDate, TotalCash);
          const filePath = await window.ElectronAPI.savePDF(htmlContent);
          if (filePath) {
            uiReset3();
            uiAlertSuccess(`File PDF Save On ${filePath}`);
          }
        }
        if (!existed) {
          uiAlertFail4(`Uppsss, it's still empty......`);
          throw new Error(response);
        }
      }
      if (!status) {
        uiAlertFail4(response);
        throw new Error(response);
      }
    }
    if (selectedAccount === "112") {
      const { status, response } = await getAccountingPDF1API(req);
      if (status) {
        const { AccountingDate, TotalReceivable, ReceivableList } = response;
        const existed = AccountingDate.length >= 1;
        if (existed) {
          const htmlContent = uiPDF1(
            AccountingDate,
            TotalReceivable,
            ReceivableList
          );
          const filePath = await window.ElectronAPI.savePDF(htmlContent);
          if (filePath) {
            uiReset3();
            uiAlertSuccess(`File PDF Save On ${filePath}`);
          }
        }
        if (!existed) {
          uiAlertFail4(`Uppsss, it's still empty......`);
          throw new Error(response);
        }
      }
      if (!status) {
        uiAlertFail4(response);
        throw new Error(response);
      }
    }
    if (selectedAccount === "113") {
      const { status, response } = await getAccountingPDF2API(req);
      if (status) {
        const { AccountingDate, TotalAsset } = response;
        const existed = AccountingDate.length >= 1;
        if (existed) {
          const htmlContent = uiPDF2(AccountingDate, TotalAsset);
          const filePath = await window.ElectronAPI.savePDF(htmlContent);
          if (filePath) {
            uiReset3();
            uiAlertSuccess(`File PDF Save On ${filePath}`);
          }
        }
        if (!existed) {
          uiAlertFail4(`Uppsss, it's still empty......`);
          throw new Error(response);
        }
      }
      if (!status) {
        uiAlertFail4(response);
        throw new Error(response);
      }
    }
    if (selectedAccount === "211") {
      const { status, response } = await getAccountingPDF3API(req);
      if (status) {
        const { AccountingDate, TotalLiability, LiabilityList } = response;
        const existed = AccountingDate.length >= 1;
        if (existed) {
          const htmlContent = uiPDF3(
            AccountingDate,
            TotalLiability,
            LiabilityList
          );
          const filePath = await window.ElectronAPI.savePDF(htmlContent);
          if (filePath) {
            uiReset3();
            uiAlertSuccess(`File PDF Save On ${filePath}`);
          }
        }
        if (!existed) {
          uiAlertFail4(`Uppsss, it's still empty......`);
          throw new Error(response);
        }
      }
      if (!status) {
        uiAlertFail4(response);
        throw new Error(response);
      }
    }
    if (selectedAccount === "311") {
      const { status, response } = await getAccountingPDF4API(req);
      if (status) {
        const { AccountingDate, TotalEquity, EquityList } = response;
        const existed = AccountingDate.length >= 1;
        if (existed) {
          const htmlContent = uiPDF4(AccountingDate, TotalEquity, EquityList);
          const filePath = await window.ElectronAPI.savePDF(htmlContent);
          if (filePath) {
            uiReset3();
            uiAlertSuccess(`File PDF Save On ${filePath}`);
          }
        }
        if (!existed) {
          uiAlertFail4(`Uppsss, it's still empty......`);
          throw new Error(response);
        }
      }
      if (!status) {
        uiAlertFail4(response);
        throw new Error(response);
      }
    }
    if (selectedAccount === "411") {
      const { status, response } = await getAccountingPDF5API(req);
      if (status) {
        const {
          AccountingDate,
          TotalSales,
          TotalSalesReturn,
          TotalSalesDiscount,
        } = response;
        const existed = AccountingDate.length >= 1;
        if (existed) {
          const htmlContent = uiPDF5(
            AccountingDate,
            TotalSales,
            TotalSalesReturn,
            TotalSalesDiscount
          );
          const filePath = await window.ElectronAPI.savePDF(htmlContent);
          if (filePath) {
            uiReset3();
            uiAlertSuccess(`File PDF Save On ${filePath}`);
          }
        }
        if (!existed) {
          uiAlertFail4(`Uppsss, it's still empty......`);
          throw new Error(response);
        }
      }
      if (!status) {
        uiAlertFail4(response);
        throw new Error(response);
      }
    }
    if (selectedAccount === "511") {
      const { status, response } = await getAccountingPDF6API(req);
      if (status) {
        const {
          AccountingDate,
          TotalPurchase,
          TotalPurchaseReturn,
          TotalPurchaseDiscount,
        } = response;
        const existed = AccountingDate.length >= 1;
        if (existed) {
          const htmlContent = uiPDF6(
            AccountingDate,
            TotalPurchase,
            TotalPurchaseReturn,
            TotalPurchaseDiscount
          );
          const filePath = await window.ElectronAPI.savePDF(htmlContent);
          if (filePath) {
            uiReset3();
            uiAlertSuccess(`File PDF Save On ${filePath}`);
          }
        }
        if (!existed) {
          uiAlertFail4(`Uppsss, it's still empty......`);
          throw new Error(response);
        }
      }
      if (!status) {
        uiAlertFail4(response);
        throw new Error(response);
      }
    }
    if (selectedAccount === "514") {
      const { status, response } = await getAccountingPDF7API(req);
      if (status) {
        const { AccountingDate, TotalExpense } = response;
        const existed = AccountingDate.length >= 1;
        if (existed) {
          const htmlContent = uiPDF7(AccountingDate, TotalExpense);
          const filePath = await window.ElectronAPI.savePDF(htmlContent);
          if (filePath) {
            uiReset3();
            uiAlertSuccess(`File PDF Save On ${filePath}`);
          }
        }
        if (!existed) {
          uiAlertFail4(`Uppsss, it's still empty......`);
          throw new Error(response);
        }
      }
      if (!status) {
        uiAlertFail4(response);
        throw new Error(response);
      }
    }
    if (selectedAccount === "611") {
      const { status, response } = await getAccountingPDF8API(req);
      if (status) {
        const { AccountingDate, TotalRevenue } = response;
        const existed = AccountingDate.length >= 1;
        if (existed) {
          const htmlContent = uiPDF8(AccountingDate, TotalRevenue);
          const filePath = await window.ElectronAPI.savePDF(htmlContent);
          if (filePath) {
            uiReset3();
            uiAlertSuccess(`File PDF Save On ${filePath}`);
          }
        }
        if (!existed) {
          uiAlertFail4(`Uppsss, it's still empty......`);
          throw new Error(response);
        }
      }
      if (!status) {
        uiAlertFail4(response);
        throw new Error(response);
      }
    }
  });
