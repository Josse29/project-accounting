import { getUserAPI, getUserPaginationAPI } from "../services/user";
// first did compount
const getUser = async (args) => {
  const { req, setUser, setTotalRows, setTotalPages } = args;
  try {
    const { totalPage, totalRow } = await getUserPaginationAPI(req);
    const existed = totalRow >= 1;
    if (existed) {
      const users = await getUserAPI(req);
      setUser(users);
    }
    if (!existed) {
      setUser([]);
    }
    setTotalRows(totalRow);
    setTotalPages(totalPage);
  } catch (error) {
    throw error;
  }
};
// for pagination
const getUser1 = async (args) => {
  const { req, setUser, setEventPage } = args;
  try {
    setEventPage(true);
    const users = await getUserAPI(req);
    setUser(users);
  } catch (error) {
    throw error;
  } finally {
    setEventPage(false);
  }
};
// for searching
const getUser2 = async (args) => {
  const { req, setUser, setTotalRows, setTotalPages, setLoading } = args;
  try {
    const { totalPage, totalRow } = await getUserPaginationAPI(req);
    const existed = totalRow >= 1;
    setTotalRows(totalRow);
    setTotalPages(totalPage);
    if (existed) {
      const users = await getUserAPI(req);
      setUser(users);
    }
    if (!existed) {
      setUser([]);
    }
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};
// for callback
const getUser3 = async (args) => {
  const { setReq, setUser, setTotalRows, setTotalPages } = args;
  try {
    setReq({
      searchVal: "",
      limitVal: 10,
      offsetVal: 1,
    });
    const req = { searchVal: "", limitVal: 10, offsetVal: 1 };
    const { totalPage, totalRow } = await getUserPaginationAPI(req);
    const existed = totalRow >= 1;
    if (existed) {
      const users = await getUserAPI(req);
      setUser(users);
    }
    if (!existed) {
      setUser([]);
    }
    setTotalRows(totalRow);
    setTotalPages(totalPage);
  } catch (error) {
    throw error;
  }
};
export { getUser, getUser1, getUser2, getUser3 };
