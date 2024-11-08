import {
  createCash,
  getCash,
  getCash1,
  getCash2,
  getCashDate,
  getCashPagination,
  getCashSum,
  getCashSum1,
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
// 5. ednpoint : api/cash/convert-csv
// method : GET
// payLoad : 1.startdate, 2.endate
// return : cash
export const getCSV = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const cash = await getCash1(payLoad);
    return { status: true, response: cash };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6. ednpoint : api/cash/convert-pdf
// method : GET
// payLoad : 1.startdate, 2.endate
// return : cash
export const getPDF = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const cash = await getCash2(payLoad);
    return { status: true, response: cash };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 7.endpoint : api/cash/summary-date
// method : GET
// payload : ""
// return : summary of cash by date
export const getSum1 = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const summary = await getCashSum1(payLoad);
    return { status: true, response: summary };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 8.endpoint : api/cash/:startdateval/:enddateval
// method : GET
// payload : 1.startdateval, 2.enddateval
// return cash with date
export const getByDate = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const cash = await getCashDate(payLoad);
    return { status: true, response: cash };
  } catch (error) {
    return { status: false, response: error };
  }
};
