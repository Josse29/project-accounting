import {
  queryDeleteUser,
  queryGet,
  queryGetCustomer,
  queryGetInvestor,
  queryGetSale,
  queryGetSupplier,
  queryGetTotal,
  queryRegister,
  queryUpdate,
} from "./querysql.js";

import {
  validateEmail,
  validateLoadImg,
  validatePosition,
  validateSamePassword,
  validateUserFullname,
} from "../../utils/validation.js";

// 1.CREATE
const register = async (req) => {
  // payload
  const {
    UserEmailVal,
    UserFullnameVal,
    UserPasswordVal,
    UserPassword1Val,
    UserImgVal,
    UserPositionVal,
    UserInfoVal,
  } = req;
  // 1.validation email
  validateEmail(UserEmailVal);
  // 2.validation name
  validateUserFullname(UserFullnameVal);
  // 3.validation password
  if (UserPositionVal === "admin" || UserPositionVal === "sales") {
    validateSamePassword(UserPasswordVal, UserPassword1Val);
  }
  // 4.validation image & load image
  const imgBase64 = await validateLoadImg(UserImgVal);
  // 5. validation position
  validatePosition(UserPositionVal);
  // execute || done
  const query = queryRegister(
    UserEmailVal,
    UserFullnameVal.trim(),
    UserPasswordVal,
    imgBase64,
    UserPositionVal,
    UserInfoVal
  );
  const msg = `${UserFullnameVal} has been registered!`;
  const created = await window.electronAPI.sqliteApi.run(query, msg);
  return created;
};
// 2.READ
const getUser = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = (offsetVal - 1) * limitVal;
  const query = queryGet(searchVal, limitVal, startOffsetVal);
  const user = await window.electronAPI.sqliteApi.all(query);
  return user;
};
const getUserPagination = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryGetTotal(searchVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
const getUserCustomer = async () => {
  const query = queryGetCustomer();
  const userCustomer = await window.electronAPI.sqliteApi.all(query);
  return userCustomer;
};
const getUserSale = async () => {
  const query = queryGetSale();
  const userSale = await window.electronAPI.sqliteApi.all(query);
  return userSale;
};
const getUserInvestor = async () => {
  const query = queryGetInvestor();
  const userSale = await window.electronAPI.sqliteApi.all(query);
  return userSale;
};
const getUserSupplier = async () => {
  const query = queryGetSupplier();
  const supplier = await window.electronAPI.sqliteApi.all(query);
  return supplier;
};
// 3.UPDATE
const updateUser = async (req) => {
  const {
    UserEmailVal,
    UserFullnameVal,
    UserPositionVal,
    UserIdVal,
    UserImgVal,
    CancelImg,
  } = req;
  // 1.validation email
  validateEmail(UserEmailVal);
  // 2.validation name
  validateUserFullname(UserFullnameVal);
  // 4.validation image & load image
  const imgBase64 = await validateLoadImg(UserImgVal);
  // 5. validation position
  validatePosition(UserPositionVal);
  // execute
  const query = queryUpdate(
    UserEmailVal,
    UserFullnameVal.trim(),
    UserPositionVal,
    UserIdVal,
    imgBase64,
    CancelImg
  );
  const msg = `${UserFullnameVal} has been updated`;
  const updated = await window.electronAPI.sqliteApi.run(query, msg);
  return updated;
};
// 4.DELETE
const deleteUserId = async (req) => {
  const { userFullname, userId } = req;
  const query = queryDeleteUser(userId);
  const msg = `${userFullname} has been deleted `;
  const deleted = await window.electronAPI.sqliteApi.run(query, msg);
  return deleted;
};

export {
  deleteUserId,
  getUser,
  getUserCustomer,
  getUserPagination,
  getUserInvestor,
  getUserSale,
  getUserSupplier,
  register,
  updateUser,
};
