// api/accounting/cash-in-investment (POST)
const createAccountingAPI = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingInvestorNameVal: req.accountingInvestorNameVal,
      accountingInvestorEmailVal: req.accountingInvestorEmailVal,
      accountingBalanceVal: req.accountingBalanceVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/cash-out-asset-buy (POST)
const createAccounting1API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingAssetNameVal: req.accountingAssetNameVal,
      accountingAssetTypeVal: req.accountingAssetTypeVal,
      accountingAssetPriceVal: req.accountingAssetPriceVal,
      accountingAssetEmail: req.accountingAssetEmail,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create1(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/cash-out-product-buy (POST)
const createAccounting2API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingProductIdVal: req.accountingProductIdVal,
      accountingProductNameVal: req.accountingProductNameVal,
      accountingProductQtyVal: req.accountingProductQtyVal,
      accountingProductDiscountVal: req.accountingProductDiscountVal,
      accountingBalanceTotalVal: req.accountingBalanceTotalVal,
      accountingSupplierEmailVal: req.accountingSupplierEmailVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create2(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/cash-out-expense-buy (POST)
const createAccounting3API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingExpenseNameVal: req.accountingExpenseNameVal,
      accountingExpensePriceVal: req.accountingExpensePriceVal,
      accountingExpenseEmailVal: req.accountingExpenseEmailVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create3(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/cash-in-product-sale (POST)
const createAccounting4API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingProductIdVal: req.accountingProductIdVal,
      accountingProductNameVal: req.accountingProductNameVal,
      accountingProductQtyVal: req.accountingProductQtyVal,
      accountingProductDiscountVal: req.accountingProductDiscountVal,
      accountingBalanceTotalVal: req.accountingBalanceTotalVal,
      accountingCustomerNameVal: req.accountingCustomerNameVal,
      accountingCustomerEmailVal: req.accountingCustomerEmailVal,
      accountingSaleNameVal: req.accountingSaleNameVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create4(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/etc-product-sale-credit (POST)
const createAccounting5API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingProductIdVal: req.accountingProductIdVal,
      accountingProductNameVal: req.accountingProductNameVal,
      accountingProductQtyVal: req.accountingProductQtyVal,
      accountingProductInterestVal: req.accountingProductInterestVal,
      accountingBalanceTotalVal: req.accountingBalanceTotalVal,
      accountingCustomerNameVal: req.accountingCustomerNameVal,
      accountingCustomerEmailVal: req.accountingCustomerEmailVal,
      accountingSaleNameVal: req.accountingSaleNameVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create5(data);
    return response;
  } catch (error) {
    throw error;
  }
};
//  api/accounting/cash-in-liability (POST)
const createAccounting6API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingLiabilityNameVal: req.accountingLiabilityNameVal,
      accountingLiabilityEmailVal: req.accountingLiabilityEmailVal,
      accountingBalanceTotalVal: req.accountingBalanceTotalVal,
      accountingLiabilityInterestVal: req.accountingLiabilityInterestVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create6(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/cash-out-liability (POST)
const createAccounting7API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingLiabilityNameVal: req.accountingLiabilityNameVal,
      accountingLiabilityEmailVal: req.accountingLiabilityEmailVal,
      accountingBalanceTotalVal: req.accountingBalanceTotalVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create7(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/cash-in-receivable (POST)
const createAccounting8API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingReceivableNameVal: req.accountingReceivableNameVal,
      accountingReceivableEmailVal: req.accountingReceivableEmailVal,
      accountingBalanceTotalVal: req.accountingBalanceTotalVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create8(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/cash-out-return-product-sale (POST)
const createAccounting9API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingProductIdVal: req.accountingProductIdVal,
      accountingProductNameVal: req.accountingProductNameVal,
      accountingProductQtyVal: req.accountingProductQtyVal,
      accountingProductDiscountVal: req.accountingProductDiscountVal,
      accountingBalanceTotalVal: req.accountingBalanceTotalVal,
      accountingCustomerNameVal: req.accountingCustomerNameVal,
      accountingCustomerEmailVal: req.accountingCustomerEmailVal,
      accountingSaleNameVal: req.accountingSaleNameVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create9(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/etc-investment-asset (POST)
const createAccounting10API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingInvestorNameVal: req.accountingInvestorNameVal,
      accountingInvestorEmailVal: req.accountingInvestorEmailVal,
      accountingAssetTypeVal: req.accountingAssetTypeVal,
      accountingAssetNameVal: req.accountingAssetNameVal,
      accountingAssetPriceVal: req.accountingAssetPriceVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create10(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/etc-product-buy-credit (POST)
const createAccounting11API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingProductIdVal: req.accountingProductIdVal,
      accountingProductNameVal: req.accountingProductNameVal,
      accountingProductQtyVal: req.accountingProductQtyVal,
      accountingProductInterestVal: req.accountingProductInterestVal,
      accountingBalanceTotalVal: req.accountingBalanceTotalVal,
      accontingSupplierEmailVal: req.accontingSupplierEmailVal,
      accountingSupplierNameVal: req.accountingSupplierNameVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create11(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/etc-return-product-buy-credit (POST)
const createAccounting12API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingProductIdVal: req.accountingProductIdVal,
      accountingProductNameVal: req.accountingProductNameVal,
      accountingProductQtyVal: req.accountingProductQtyVal,
      accountingProductInterestVal: req.accountingProductInterestVal,
      accountingBalanceTotalVal: req.accountingBalanceTotalVal,
      accountingSupplierEmailVal: req.accountingSupplierEmailVal,
      accountingSupplierNameVal: req.accountingSupplierNameVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create12(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/cash-in-return-product-buy (POST)
const createAccounting13API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingProductIdVal: req.accountingProductIdVal,
      accountingProductNameVal: req.accountingProductNameVal,
      accountingProductQtyVal: req.accountingProductQtyVal,
      accountingProductDiscountVal: req.accountingProductDiscountVal,
      accountingBalanceTotalVal: req.accountingBalanceTotalVal,
      accountingSupplierEmailVal: req.accountingSupplierEmailVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create13(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/etc-accumulation-asset (POST)
const createAccounting14API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingAssetNameVal: req.accountingAssetNameVal,
      accountingAssetTypeVal: req.accountingAssetTypeVal,
      accountingAssetPriceVal: req.accountingAssetPriceVal,
      accountingAssetValueUse: req.accountingAssetValueUse,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create14(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/cash-in-asset-sell (POST)
const createAccounting15API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingAssetNameVal: req.accountingAssetNameVal,
      accountingAssetPriceBuyVal: req.accountingAssetPriceBuyVal,
      accountingAssetPriceSellVal: req.accountingAssetPriceSellVal,
      accountingAssetTypeVal: req.accountingAssetTypeVal,
      accountingAssetEmailVal: req.accountingAssetEmailVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create15(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/cash-in-others (POST)
const createAccounting16API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingNameVal: req.accountingNameVal,
      accountingBalanceVal: req.accountingBalanceVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create16(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/cash-out-withdrawl-investment (POST)
const createAccounting17API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingInvestorNameVal: req.accountingInvestorNameVal,
      accountingInvestorEmailVal: req.accountingInvestorEmailVal,
      accountingBalanceVal: req.accountingBalanceVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create17(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/etc-asset-buy-credit (POST)
const createAccounting18API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingAssetNameVal: req.accountingAssetNameVal,
      accountingAssetTypeVal: req.accountingAssetTypeVal,
      accountingAssetPriceVal: req.accountingAssetPriceVal,
      accountingAssetInterestVal: req.accountingAssetInterestVal,
      accountingUserFullnameVal: req.accountingUserFullnameVal,
      accountingUserEmailVal: req.accountingUserEmailVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create18(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// accounting/etc-return-product-sale-credit (POST)
const createAccounting19API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingProductIdVal: req.accountingProductIdVal,
      accountingProductNameVal: req.accountingProductNameVal,
      accountingProductQtyVal: req.accountingProductQtyVal,
      accountingProductInterestVal: req.accountingProductInterestVal,
      accountingBalanceTotalVal: req.accountingBalanceTotalVal,
      accountingCustomerNameVal: req.accountingCustomerNameVal,
      accountingCustomerEmailVal: req.accountingCustomerEmailVal,
      accountingSaleNameVal: req.accountingSaleNameVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create19(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/etc-withdrawls-investment-asset (POST)
const createAccounting20API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingInvestorNameVal: req.accountingInvestorNameVal,
      accountingInvestorEmailVal: req.accountingInvestorEmailVal,
      accountingAssetTypeVal: req.accountingAssetTypeVal,
      accountingAssetNameVal: req.accountingAssetNameVal,
      accountingAssetPriceVal: req.accountingAssetPriceVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create20(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting/etc-asset-sell-credit (POST)
const createAccounting21API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingAssetNameVal: req.accountingAssetNameVal,
      accountingAssetTypeVal: req.accountingAssetTypeVal,
      accountingAssetBalanceVal: req.accountingAssetBalanceVal,
      accountingAssetPriceSellVal: req.accountingAssetPriceSellVal,
      accountingSupplierFullnameVal: req.accountingSupplierFullnameVal,
      accountingSupplierEmailVal: req.accountingSupplierEmailVal,
      accountingAssetInterestVal: req.accountingAssetInterestVal,
      accountingAssetInfoVal: req.accountingAssetInfoVal,
    };
    const response = await window.ElectronAPI.Accounting.create21(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting-pagination (GET)
const getAccountingPaginationAPI = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const response = await window.ElectronAPI.Accounting.pagination(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting (GET)
const getAccountingAPI = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const response = await window.ElectronAPI.Accounting.get(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting-financial-statement (GET)
const getFinancialStatementAPI = async () => {
  try {
    const response = await window.ElectronAPI.Accounting.financialStatement();
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting-csv (GET)
const getAccountingCSVAPI = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await window.ElectronAPI.Accounting.csv(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting-pdf (GET)
const getAccountingPDFAPI = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await window.ElectronAPI.Accounting.pdf(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting-pdf1 (GET)
const getAccountingPDF1API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await window.ElectronAPI.Accounting.pdf1(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting-pdf2 (GET)
const getAccountingPDF2API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await window.ElectronAPI.Accounting.pdf2(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting-pdf3 (GET)
const getAccountingPDF3API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await window.ElectronAPI.Accounting.pdf3(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting-pdf4 (GET)
const getAccountingPDF4API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await window.ElectronAPI.Accounting.pdf4(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting-pdf5 (GET)
const getAccountingPDF5API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await window.ElectronAPI.Accounting.pdf5(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting-pdf6 (GET)
const getAccountingPDF6API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await window.ElectronAPI.Accounting.pdf6(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting-pdf7 (GET)
const getAccountingPDF7API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await window.ElectronAPI.Accounting.pdf7(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting-pdf8 (GET)
const getAccountingPDF8API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await window.ElectronAPI.Accounting.pdf8(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting-cash
const getCashAPI = async () => {
  try {
    const response = await window.ElectronAPI.Accounting.cash();
    return response;
  } catch (error) {
    throw error;
  }
};
// api/accounting-cash
const getAssetAPI = async () => {
  try {
    const response = await window.ElectronAPI.Accounting.asset();
    return response;
  } catch (error) {
    throw error;
  }
};
export {
  createAccountingAPI,
  createAccounting1API,
  createAccounting2API,
  createAccounting3API,
  createAccounting4API,
  createAccounting5API,
  createAccounting6API,
  createAccounting7API,
  createAccounting8API,
  createAccounting9API,
  createAccounting10API,
  createAccounting11API,
  createAccounting12API,
  createAccounting13API,
  createAccounting14API,
  createAccounting15API,
  createAccounting16API,
  createAccounting17API,
  createAccounting18API,
  createAccounting19API,
  createAccounting20API,
  createAccounting21API,
  getAccountingAPI,
  getAccountingCSVAPI,
  getAccountingPaginationAPI,
  getAccountingPDFAPI,
  getAccountingPDF1API,
  getAccountingPDF2API,
  getAccountingPDF3API,
  getAccountingPDF4API,
  getAccountingPDF5API,
  getAccountingPDF6API,
  getAccountingPDF7API,
  getAccountingPDF8API,
  getCashAPI,
  getAssetAPI,
  getFinancialStatementAPI,
};
