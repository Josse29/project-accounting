import {
  createCash,
  getCash,
  getCashPagination,
  getCashSum,
} from "../../../../serverless-side/models/cash/controller.js";

// 1. endpoint = /api/cash/create/
// method : POST
// payload  : 1.CashYYYYMMDDVal, 2.CashHMSVal, 3.CashNameVal, 4.CashRpVal, 5.CashInfoVal
// return : message success create cash
export const addCash = async (req) => {
  try {
    const payLoad = {
      CashYYYYMMDDVal: req.formattedDDMY,
      CashHMSVal: req.formattedHMS,
      CashNameVal: req.CashNameVal,
      CashRpVal: req.CashRpVal,
      CashInfoVal: req.CashInfoVal,
    };
    const response = await createCash(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2.endpoint : api/cash/summary
// method : GET
// payload : ""
// return : summary of cash
export const getSum = async () => {
  try {
    const summary = await getCashSum();
    return { status: true, response: summary };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3.endpoint : api/cash/pagination
// method : GET
// payLoad : 1.searchVal, 2.limitVal
// return : totalRow, totalPagination
export const getPagination = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const totalPageRow = await getCashPagination(payLoad);
    return { status: true, response: totalPageRow };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 4.endpoint : api/cash/:limitVal/:offsetVal
// method : GET
// payLoad : 1.searchVal, 2.limitVal, 3.offsetVal
// return : cash
export const getCashByLimitOffset = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const cash = await getCash(payLoad);
    return { status: true, response: cash };
  } catch (error) {
    return { status: false, response: error };
  }
};
