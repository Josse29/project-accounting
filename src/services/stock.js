// 1.endpoint : api/stock-pagination (GET)
const getStockPaginationAPI = async (req) => {
  try {
    const data = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const response = await window.ElectronAPI.Stock.pagination(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// 2. endpoint : api/stock (GET)
const getStockAPI = async (req) => {
  try {
    const data = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const response = await window.ElectronAPI.Stock.get(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// 3. endpoint : api/stock-excel (GET)
const getStockCSVAPI = async (req) => {
  try {
    const data = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await window.ElectronAPI.Stock.csv(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// 4. endpoint : api/stock-pdf (GET)
const getStockPDFAPI = async (req) => {
  try {
    const data = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await window.ElectronAPI.Stock.pdf(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// 5.endpoint : api/stock-pagination1 (GET)
const getStockPagination1API = async (req) => {
  try {
    const data = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const response = await window.ElectronAPI.Stock.pagination1(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// 6. endpoint : api/stock1 (GET)
const getStock1API = async (req) => {
  try {
    const data = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const response = await window.ElectronAPI.Stock.get1(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// 7. endpoint api/stock-csv1
const getStockCSV1API = async (req) => {
  try {
    const data = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await window.ElectronAPI.Stock.csv1(data);
    return response;
  } catch (error) {
    throw error;
  }
};
// 8.endpoint api/stock-pdf1
const getStockPDF1API = async (req) => {
  try {
    const data = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const response = await window.ElectronAPI.Stock.pdf1(data);
    return response;
  } catch (error) {
    throw error;
  }
};
export {
  getStockPaginationAPI,
  getStockAPI,
  getStockCSVAPI,
  getStockPDFAPI,
  getStock1API,
  getStockPagination1API,
  getStockCSV1API,
  getStockPDF1API,
};
