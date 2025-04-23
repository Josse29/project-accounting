import { getProductPagination1API, getProductStockAPI } from "../services";
// for did mounted
const getProductRefStock = async (props) => {
  const { req, setProductStock, setTotalRows, setTotalPages } = props;
  try {
    const { totalRow, totalPage } = await getProductPagination1API(req);
    const existed = totalRow >= 1;
    if (existed) {
      const products = await getProductStockAPI(req);
      setProductStock(products);
    } else {
      setProductStock([]);
    }
    setTotalRows(totalRow);
    setTotalPages(totalPage);
  } catch (error) {
    throw error;
  }
};
// for pagination
const getProductRefStock1 = async (props) => {
  const { req, setProductStock, setEventPage } = props;
  try {
    const products = await getProductStockAPI(req);
    setProductStock(products);
  } catch (error) {
    throw error;
  } finally {
    setEventPage(false);
  }
};
// for searching
const getProductRefStock2 = async (props) => {
  const { req, setProductStock, setTotalRows, setTotalPages, setLoading } =
    props;
  try {
    const { totalRow, totalPage } = await getProductPagination1API(req);
    const existed = totalRow >= 1;
    if (existed) {
      const products = await getProductStockAPI(req);
      setProductStock(products);
    } else {
      setProductStock([]);
    }
    setTotalRows(totalRow);
    setTotalPages(totalPage);
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};
// for callback
const getProductRefStock3 = async (props) => {
  const { setReq, setProductStock, setTotalRows, setTotalPages } = props;
  try {
    setReq(() => ({
      searchVal: "",
      limitVal: 3,
      offsetVal: 1,
    }));
    const req = {
      searchVal: "",
      limitVal: 3,
      offsetVal: 1,
    };
    const { totalRow, totalPage } = await getProductPagination1API(req);
    const existed = totalRow >= 1;
    if (existed) {
      const products = await getProductStockAPI(req);
      setProductStock(products);
    } else {
      setProductStock([]);
    }
    setTotalRows(totalRow);
    setTotalPages(totalPage);
  } catch (error) {
    throw error;
  }
};
export {
  getProductRefStock,
  getProductRefStock1,
  getProductRefStock2,
  getProductRefStock3,
};
