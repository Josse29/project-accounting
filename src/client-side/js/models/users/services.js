import {
  getUser,
  getUserPageRow,
  register,
} from "../../../../serverless-side/models/user/function.js";

// 1. endpoint : api/user?limit=${limitVal}&offset=${offsetVal}
// method : get
// return all user with search, limit, offset
export const fetchLimitOffset = async (req, res) => {
  try {
    // payload
    const req1 = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const users = await getUser(req1);
    return res(true, users);
  } catch (error) {
    return res(false, error);
  }
};
// 2. endpoint : api/user/get-page-row
// method : get
// return page and row
export const fetchRowPage = async (req, res) => {
  try {
    // payload
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
// 3. endpoint : api/user/register
// method : post
export const addUser = async (req, res) => {
  try {
    // payload
    const req1 = {
      UserEmailVal: req.UserEmailVal,
      UserFullnameVal: req.UserFullnameVal,
      UserPasswordVal: req.UserPasswordVal,
      UserPassword1Val: req.UserPassword1Val,
      UserPositionVal: req.UserPositionVal,
      UserImgVal: req.UserImgVal,
    };
    const res1 = await register(req1);
    return res(true, res1);
  } catch (error) {
    return res(false, error);
  }
};
