import {
  getUser,
  getUserPageRow,
} from "../../../../serverless-side/models/user/function.js";

// 1. api/user?limit=${limitVal}&offset=${offsetVal} / return all user with search, limit, offset
export const fetchLimitOffset = async (req, res) => {
  try {
    const req1 = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const users = await getUser(req1);
    return users;
  } catch (error) {}
};
// 2. api/get-page-row / return page and row
export const fetchPagination = async (req, res) => {
  try {
    const req1 = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const pagination = await getUserPageRow(req1);
    return res(true, pagination);
  } catch (error) {
    return res(false, error);
  }
};
