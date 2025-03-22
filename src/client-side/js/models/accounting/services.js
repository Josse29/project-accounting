import {
  createAccounting,
  createAccounting1,
  createAccounting2,
  createAccounting3,
  createAccounting4,
  createAccounting5,
  createAccounting6,
  createAccounting7,
  createAccounting8,
  createAccounting9,
  createAccounting10,
  createAccounting11,
  createAccounting12,
  createAccounting13,
  createAccounting14,
  createAccounting15,
  createAccounting17,
  createAccounting19,
  createAccounting20,
  getAccounting,
  getAccountingPagination,
  createAccounting18,
  getAccountingAsset,
  createAccounting21,
  createAccounting16,
  getAccountingCash,
  getAccountingDate,
  getAccountingPDF,
  getAccountingPDF1,
  getAccountingPDF2,
  getAccountingPDF3,
  getAccountingPDF4,
  getAccountingPDF5,
  getAccountingPDF6,
  getAccountingPDF7,
  getAccountingPDF8,
  getAccountingFinancialStatement,
} from "../../../../serverless-side/models/accounting/controller.js";

// 1. endpoint = api/accounting/cash-in-investment
// method : POST
// payload : 1.accountingDateVal, 2.accountingTimeVal, 3.accountingInvestorEmailVal, 4.accountingInvestorNameVal, 5.accountingBalanceVal, 6.accountingInfoVal,
//  return : message has been created
const createAccountingAPI = async (req) => {
  try {
    const payLoad = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingInvestorNameVal: req.accountingInvestorNameVal,
      accountingInvestorEmailVal: req.accountingInvestorEmailVal,
      accountingBalanceVal: req.accountingBalanceVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await createAccounting(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2. endpoint = api/accounting/cash-out-asset-buy
// method : POST
// payLoad : 1.accountingDateVal, 2.accountingTimeVal, 3.accountingAssetNameVal, 4.accountingAssetTypeVal, 5.accountingAssetPriceVal, 6.accountingAssetEmail, 7.accountingInfoVal,
const createAccounting1API = async (req) => {
  try {
    const payLoad = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingAssetNameVal: req.accountingAssetNameVal,
      accountingAssetTypeVal: req.accountingAssetTypeVal,
      accountingAssetPriceVal: req.accountingAssetPriceVal,
      accountingAssetEmail: req.accountingAssetEmail,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await createAccounting1(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3. endpoint = api/accounting/pagination
// method : GET
// payLoad : 1.searchVal, 2.limitVal
// return : totalPage, totalRow
const getAccountingPaginationAPI = async (req) => {
  try {
    const payLoad = {
      selectedAccount: req.selectedAccount,
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const totalPageRow = await getAccountingPagination(payLoad);
    return { status: true, response: totalPageRow };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 4. endpoint : api/accounting/:limitVal/:offsetVal
// method : GET
// payLoad : 1.selectedAccount, 2.searchVal, 3.limitVal, 4.offsetVal
// return : general entries
const getAccountingAPI = async (req) => {
  try {
    const payLoad = {
      selectedAccount: req.selectedAccount,
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const response = await getAccounting(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 5.endpoint : api/accounting/cash-out-product-buy
// METHOD : POST
// return messsage
const createAccounting2API = async (req) => {
  try {
    const payLoad = {
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
    const response = await createAccounting2(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6.endpoint : api/accounting/cash-out-expense-buy
// method : POST
// payLoad = 1.accountingDateVal, 2.accountingTimeVal, 3.accountingExpenseNameVal, 4.accountingExpensePriceVal, 5.accountingExpenseEmailVal, 6.accountingInfoVal
// return : mesage succes created
const createAccounting3API = async (req) => {
  try {
    const payLoad = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingExpenseNameVal: req.accountingExpenseNameVal,
      accountingExpensePriceVal: req.accountingExpensePriceVal,
      accountingExpenseEmailVal: req.accountingExpenseEmailVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await createAccounting3(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 7.endpoint : api/accounting/cash-in-product-sale
// method : POST
// return : mesage succes created
const createAccounting4API = async (req) => {
  try {
    const payLoad = {
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
    const response = await createAccounting4(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 8.endpoint : api/accounting/etc-product-sale-credit
// method : POST
// return  : mesage succes created
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
    const response = await createAccounting5(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 9 enpoint : api/accounting/cash-in-liability
// method : POST
// data : 1.accountingDateVal 2.accountingTimeVal, 3.accountingLiabilityNameVal, 4.accountingBalanceTotalVal, 5.accountingLiabilityInterestVal, 6.accountingInfoVal
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
    const response = await createAccounting6(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 10. endpoint : api/accounting/cash-out-liability
// method : POST
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
    const response = await createAccounting7(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 11.endpoint : api/accounting/cash-in-receivable
// method : POST
// return : success message
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
    const response = await createAccounting8(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 12.endpoint : api/accounting/cash-out-return-product-sale
// method : POST
// return : success message
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
    const response = await createAccounting9(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 13.endpoint : api/accounting/etc-investment-asset
// method : POST
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
    const response = await createAccounting10(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 14.endpoint : api/accounting/etc-product-buy-credit
// method : post
// return : message success and error
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
    const response = await createAccounting11(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 15.endpoint : api/accounting/etc-return-product-buy-credit
// method : POST
// return : message success
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
    const response = await createAccounting12(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 16. endpoint : api/accounting/cash-in-return-product-buy
// method : POST
// return : success message
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
    const response = await createAccounting13(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 17. endpoint : api/accounting/etc-accumulation-asset
// method : POST
// return : success message
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
    const response = await createAccounting14(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 18. endpoint : api/accounting/cash-in-asset-sell
// method : POST
// return : success message
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
    const response = await createAccounting15(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 20. endpoint : api/accounting/cash-out-withdrawl-investment
// method : POSt
// return : message
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
    const response = await createAccounting17(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/accounting/etc-asset-buy-credit
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
    const response = await createAccounting18(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 22. endpoint : accounting/etc-return-product-sale-credit
// method : POST
// return : message success
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
    const response = await createAccounting19(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 23.endpoint : api/accounting/etc-withdrawls-investment-asset
// method : POST
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
    const response = await createAccounting20(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : accounting/asset-list
// method : GET
const getAccountingAssetAPI = async () => {
  try {
    const response = await getAccountingAsset();
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/etc-asset-sell-credit
// method : POST
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
    const response = await createAccounting21(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/accounting/cash-in-others
// method : POST
const createAccounting16API = async (req) => {
  try {
    const data = {
      accountingDateVal: req.accountingDateVal,
      accountingTimeVal: req.accountingTimeVal,
      accountingNameVal: req.accountingNameVal,
      accountingBalanceVal: req.accountingBalanceVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await createAccounting16(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/accounting/cash
// method : GET
const getAccountingCashAPI = async () => {
  try {
    const response = await getAccountingCash();
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/accounting-date
// method : GET
const getAccountingDateAPI = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await getAccountingDate(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/accounting-pdf-cash
// method : GET
const getAccountingPDFAPI = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await getAccountingPDF(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/accounting-pdf-receivable
// method : GET
const getAccountingPDF1API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await getAccountingPDF1(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/accounting-pdf-asset
// method : GET
const getAccountingPDF2API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await getAccountingPDF2(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/accounting-pdf-liability
// method : GET
const getAccountingPDF3API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await getAccountingPDF3(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/accounting-pdf-equity
// method : GET
const getAccountingPDF4API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await getAccountingPDF4(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/accounting-pdf-sales
// method : GET
const getAccountingPDF5API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await getAccountingPDF5(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/accounting-pdf-purchase
// method : GET
const getAccountingPDF6API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await getAccountingPDF6(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/accounting-pdf-expense
// method : GET
const getAccountingPDF7API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await getAccountingPDF7(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/accounting-pdf-revenue
// method : GET
const getAccountingPDF8API = async (req) => {
  try {
    const data = {
      selectedAccount: req.selectedAccount,
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await getAccountingPDF8(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/accounting-financialstatement
const getAccountingFinancialStatementAPI = async () => {
  try {
    const response = await getAccountingFinancialStatement();
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
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
  createAccounting18API,
  createAccounting17API,
  createAccounting19API,
  createAccounting20API,
  createAccounting21API,
  getAccountingAPI,
  getAccountingPDFAPI,
  getAccountingPDF1API,
  getAccountingPDF2API,
  getAccountingPDF3API,
  getAccountingPDF4API,
  getAccountingPDF5API,
  getAccountingPDF6API,
  getAccountingPDF7API,
  getAccountingPDF8API,
  getAccountingDateAPI,
  getAccountingAssetAPI,
  getAccountingCashAPI,
  getAccountingPaginationAPI,
  getAccountingFinancialStatementAPI,
};
