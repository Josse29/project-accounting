import { getProductAPI, getProductPaginationAPI } from "../services";
// first did compount
const getProduct = async (args) => {
  const { req, setProduct, setTotalRows, setTotalPages } = args;
  try {
    const { totalRow, totalPage } = await getProductPaginationAPI(req);
    const existed = totalRow >= 1;
    if (existed) {
      const products = await getProductAPI(req);
      setProduct(products);
    }
    if (!existed) {
      setProduct([]);
    }
    setTotalRows(totalRow);
    setTotalPages(totalPage);
  } catch (error) {
    throw error;
  }
};
// for pagination
const getProduct1 = async (args) => {
  const { req, setProduct, setEventPage } = args;
  try {
    setEventPage(true);
    const products = await getProductAPI(req);
    setProduct(products);
  } catch (error) {
    throw error;
  } finally {
    setEventPage(false);
  }
};
// for searching
const getProduct2 = async (args) => {
  const { req, setLoading, setProduct, setTotalRows, setTotalPages } = args;
  try {
    setLoading(true);
    const { totalRow, totalPage } = await getProductPaginationAPI(req);
    const existed = totalRow >= 1;
    if (existed) {
      const products = await getProductAPI(req);
      setProduct(products);
    }
    if (!existed) {
      setProduct([]);
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
const getProduct3 = async (args) => {
  const { setReq, setProduct, setTotalRows, setTotalPages } = args;
  try {
    setReq({
      searchVal: "",
      limitVal: 10,
      offsetVal: 1,
    });
    const req = { searchVal: "", limitVal: 10, offsetVal: 1 };
    const { totalRow, totalPage } = await getProductPaginationAPI(req);
    const existed = totalRow >= 1;
    if (existed) {
      const products = await getProductAPI(req);
      setProduct(products);
    }
    if (!existed) {
      setProduct([]);
    }
    setTotalRows(totalRow);
    setTotalPages(totalPage);
  } catch (error) {
    throw error;
  }
};
export { getProduct, getProduct1, getProduct2, getProduct3 };
