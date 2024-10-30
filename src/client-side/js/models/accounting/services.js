import {
  createAccounting,
  getAccounting,
  getAccounting1,
  getAccountingPagination,
  getAccountingSumCredit,
  getAccountingSumDebt,
} from "../../../../serverless-side/models/accounting/controller.js";

// 1. endpoint = api/accounting/
// method : POST
// payload : 1.accountingYMDVal, 2.accountingHMSVal, 3.accountingRefVal, 4.accountingNameVal, 5.accountingPositionVal, 6.accountingRpVal, 7.accountingInfoVal
//  return : message has been created
export const addAccounting = async (req) => {
  try {
    const payLoad = {
      accountingYMDVal: req.formattedDDMY,
      accountingHMSVal: req.formattedHMS,
      accountingRefVal: req.accountingRefVal,
      accountingNameVal: req.accountingNameVal,
      accountingPositionVal: req.accountingPositionVal,
      accountingRpVal: req.accountingRpVal,
      accountingInfoVal: req.accountingInfoVal,
    };
    const response = await createAccounting(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2. endpoint = api/accounting/pagination
// method : GET
// payLoad : 1.searchVal, 2.limitVal
// return : totalPage, totalRow
export const getPagination = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const totalPageRow = await getAccountingPagination(payLoad);
    return { status: true, response: totalPageRow };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3. endpoint : api/accounting/general-entry/:limitVal/:offsetVal
// method : GET
// payLoad : 1.searchVal, 2.limitVal, 3.offsetVal
// return : general entries
export const getGeneralEntry = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const accounting = await getAccounting(payLoad);
    return { status: true, response: accounting };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 4.endpoint : api/accounting/balance-sheet
// method : GET
// payLoad :
// return : balance sheet
export const getBalanceSheet = async () => {
  try {
    const accounting = await getAccounting1();
    return { status: true, response: accounting };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 5.endpoint : api/accounting/sum-credit
// method : GET
// payLoad : ""
// return : summary credit
export const getSumCredit = async () => {
  try {
    const sumCredit = await getAccountingSumCredit();
    return { status: true, response: sumCredit };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6.endpoint : api/accounting/sum-debt
// method : GET
// payLoad : ""
// return : summary debty
export const getSumDebt = async () => {
  try {
    const sumDebt = await getAccountingSumDebt();
    return { status: true, response: sumDebt };
  } catch (error) {
    return { status: false, response: error };
  }
};
