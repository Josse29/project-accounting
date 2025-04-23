import { getAccountingAPI, getAccountingPaginationAPI } from "../services";

const getAccounting = async (args) => {
  const { req, setAccounting, setTotalRows, setTotalPages } = args;
  try {
    const { totalPage, totalRow } = await getAccountingPaginationAPI(req);
    const existed = totalRow >= 1;
    if (existed) {
      const accountings = await getAccountingAPI(req);
      setAccounting(accountings);
    } else {
      setAccounting([]);
    }
    setTotalRows(totalRow);
    setTotalPages(totalPage);
  } catch (error) {
    throw error;
  }
};
const getAccounting1 = async (args) => {
  const { req, setAccounting, setEventPage } = args;
  try {
    const accountings = await getAccountingAPI(req);
    setAccounting(accountings);
  } catch (error) {
    throw error;
  } finally {
    setEventPage(false);
  }
};
const getAccounting2 = async (args) => {
  const { req, setAccounting, setTotalRows, setTotalPages, setLoading } = args;
  try {
    setLoading(true);
    const { totalPage, totalRow } = await getAccountingPaginationAPI(req);
    const existed = totalRow >= 1;
    if (existed) {
      const accountings = await getAccountingAPI(req);
      setAccounting(accountings);
    } else {
      setAccounting([]);
    }
    setTotalRows(totalRow);
    setTotalPages(totalPage);
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};
const getAccounting3 = async (args) => {
  const { setReq, setAccounting, setTotalRows, setTotalPages } = args;
  try {
    setReq({
      selectedAccount: 111,
      searchVal: "",
      limitVal: 10,
      offsetVal: 1,
    });
    const req = {
      selectedAccount: 111,
      searchVal: "",
      limitVal: 10,
      offsetVal: 1,
    };
    const { totalPage, totalRow } = await getAccountingPaginationAPI(req);
    const existed = totalRow >= 1;
    if (existed) {
      const accountings = await getAccountingAPI(req);
      setAccounting(accountings);
    } else {
      setAccounting([]);
    }
    setTotalRows(totalRow);
    setTotalPages(totalPage);
  } catch (error) {
    throw error;
  }
};

export { getAccounting, getAccounting1, getAccounting2, getAccounting3 };
