import { getUserAPI, getUserPaginationAPI } from "../services/user";

const getUser = async (params) => {
  const { req, setLoading, setUser, setTotalRows, setTotalPages } = params;
  setLoading(true);
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
    console.error(error);
  } finally {
    setLoading(false);
  }
};
const getUser1 = async (req, setUser) => {
  try {
    const users = await getUserAPI(req);
    setUser(users);
  } catch (error) {
    console.error(error);
  }
};
const getUser2 = async (params) => {
  const { setUser, setTotalRows, setTotalPages } = params;
  const req = {
    searchVal: "",
    limitVal: 10,
    offsetVal: 1,
  };
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
    console.error(error);
  }
};
export { getUser, getUser1, getUser2 };
