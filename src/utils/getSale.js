import { getStock1API, getStockPagination1API } from "../services/stock";

const getSale = async (args) => {
  const { req, setSale, setTotalRows, setTotalPages } = args;
  try {
    const { totalPage, totalRow } = await getStockPagination1API(req);
    const existed = totalRow >= 1;
    if (existed) {
      const sales = await getStock1API(req);
      setSale(sales);
    } else {
      setSale([]);
    }
    setTotalRows(totalRow);
    setTotalPages(totalPage);
  } catch (error) {
    throw error;
  }
};
const getSale1 = async (args) => {
  const { req, setSale, setEventPage } = args;
  try {
    const sales = await getStock1API(req);
    setSale(sales);
  } catch (error) {
    throw error;
  } finally {
    setEventPage(false);
  }
};
const getSale2 = async (args) => {
  const { req, setSale, setTotalRows, setTotalPages, setLoading } = args;
  setLoading(true);
  try {
    const { totalPage, totalRow } = await getStockPagination1API(req);
    const existed = totalRow >= 1;
    if (existed) {
      const sales = await getStock1API(req);
      setSale(sales);
    } else {
      setSale([]);
    }
    setTotalRows(totalRow);
    setTotalPages(totalPage);
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};
export { getSale, getSale1, getSale2 };
