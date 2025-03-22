import {
  getStock,
  getStock1,
  getStockDate,
  getStockDate1,
  getStockPagination,
  getStockPagination1,
  getStockPDF,
  getStockPDF1,
} from "../../../../serverless-side/models/stock/controller.js";
// endpoint : api/stock
// method : GET
const getStockAPI = async (req) => {
  try {
    const data = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const response = await getStock(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/stock-pagination
// method : GET
const getStockPaginationAPI = async (req) => {
  try {
    const data = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const response = await getStockPagination(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/stock-date
// method : GET
const getStockDateAPI = async (req) => {
  try {
    const data = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await getStockDate(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint :api/stock-pdf
// method:GET
const getStockPDFAPI = async (req) => {
  try {
    const data = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await getStockPDF(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/stock-sales
// method : GET
const getStock1API = async (req) => {
  try {
    const data = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const response = await getStock1(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/stock-sales-pagination
// method : GET
const getStockPagination1API = async (req) => {
  try {
    const data = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const response = await getStockPagination1(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint : api/stock-sales-date
// method : GET
const getStockDate1API = async (req) => {
  try {
    const data = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await getStockDate1(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// endpoint :api/stock-pdf
// method:GET
const getStockPDF1API = async (req) => {
  try {
    const data = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await getStockPDF1(data);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
export {
  getStockAPI,
  getStockDateAPI,
  getStockDate1API,
  getStock1API,
  getStockPDFAPI,
  getStockPDF1API,
  getStockPaginationAPI,
  getStockPagination1API,
};
