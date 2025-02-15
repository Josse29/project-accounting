import {
  getEquity,
  getEquityDate,
  getEquityDate1,
  getEquityDate2,
  getEquityDateGroupUser,
  getEquityPagination,
  getEquitySumDate,
} from "../../../../serverless-side/models/equity/controller.js";
// 1. endpoint = api/equity/
// method : GET
// payload : 1.searchVal, 2.limitVal, 3.offsetVal
//  return : equity table
const getEquityAPI = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const equity = await getEquity(payLoad);
    return { status: true, response: equity };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2.endpoint : api/equity/pagination
// method : GET
// payLoad : 1.searchVal, 2.limitVal
// return : totalRow, totalPagination
const getEquityPaginationAPI = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const totalPageRow = await getEquityPagination(payLoad);
    return { status: true, response: totalPageRow };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3. endpoint = api/equity-date/
// method : GET
// payload : 1.startDateVal, 2.endDateVal
//  return : equity table with date
const getEquityDateAPI = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const equity = await getEquityDate(payLoad);
    return { status: true, response: equity };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 4. endpoint = api/equity-date-1/
// method : GET
// payload : 1.startDateVal, 2.endDateVal
//  return : equity table with date
const getEquityDate1API = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const equity = await getEquityDate1(payLoad);
    return { status: true, response: equity };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 5. endpoint = api/equity-date-2/
// method : GET
// payload : 1.startDateVal, 2.endDateVal
//  return : equity table with date
const getEquityDate2API = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const equity = await getEquityDate2(payLoad);
    return { status: true, response: equity };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 5. endpoint = api/equity-date-group-user/
// method : GET
// payload : 1.startDateVal, 2.endDateVal
//  return : equity table with date
const getEquityDateGroupUserAPI = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const equity = await getEquityDateGroupUser(payLoad);
    return { status: true, response: equity };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6. endpoint = api/equity-sum-date/
// method : GET
// payload : 1.startDateVal, 2.endDateVal
//  return : summary
const getEquitySumDateAPI = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const equitySum = await getEquitySumDate(payLoad);
    return { status: true, response: equitySum };
  } catch (error) {
    return { status: false, response: error };
  }
};
export {
  getEquityAPI,
  getEquityDateAPI,
  getEquityDateGroupUserAPI,
  getEquityDate1API,
  getEquityDate2API,
  getEquityPaginationAPI,
  getEquitySumDateAPI,
};
