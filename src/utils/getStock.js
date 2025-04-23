import { getStockAPI, getStockPaginationAPI } from "../services";

const getStock = async (args) => {
  const { req, setStock, setTotalRows, setTotalPages } = args;
  try {
    const { totalPage, totalRow } = await getStockPaginationAPI(req);
    const existed = totalRow >= 1;
    if (existed) {
      const stocks = await getStockAPI(req);
      setStock(stocks);
    } else {
      setStock([]);
    }
    setTotalRows(totalRow);
    setTotalPages(totalPage);
  } catch (error) {
    throw error;
  }
};
const getStock1 = async (args) => {
  const { req, setStock, setEventPage } = args;
  try {
    const stocks = await getStockAPI(req);
    setStock(stocks);
  } catch (error) {
    throw error;
  } finally {
    setEventPage(false);
  }
};
const getStock2 = async (args) => {
  const { req, setStock, setTotalRows, setTotalPages, setLoading } = args;
  try {
    setLoading(true);
    const { totalPage, totalRow } = await getStockPaginationAPI(req);
    const existed = totalRow >= 1;
    if (existed) {
      const stocks = await getStockAPI(req);
      setStock(stocks);
    } else {
      setStock([]);
    }
    setTotalRows(totalRow);
    setTotalPages(totalPage);
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};
export { getStock, getStock1, getStock2 };
