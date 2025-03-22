import {
  queryDeleteUser,
  queryGet,
  queryGetCreditor,
  queryGetCustomer,
  queryGetDebt,
  queryGetInvestor,
  queryGetSale,
  queryGetSupplier,
  queryGetTotal,
  queryGetUser,
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
import { capitalizeWord } from "../../utils/formatTxt.js";

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
    capitalizeWord(UserFullnameVal),
    UserPasswordVal,
    imgBase64,
    UserPositionVal,
    UserInfoVal
  );
  const msg = `${UserPositionVal} - ${UserFullnameVal} has been registered !`;
  const created = await window.ElectronAPI.sqlite3.run(query, msg);
  return created;
};
// 2.READ
const getUser = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = (offsetVal - 1) * limitVal;
  const query = queryGet(searchVal, limitVal, startOffsetVal);
  const user = await window.ElectronAPI.sqlite3.all(query);
  return user;
};
const getUserPagination = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryGetTotal(searchVal);
  const totalPageRow = await window.ElectronAPI.sqlite3.each(query, limitVal);
  return totalPageRow;
};
const getUserList = async () => {
  const query = queryGetUser();
  const listUser = await window.ElectronAPI.sqlite3.all(query);
  return listUser;
};
const getUserCustomer = async () => {
  const query = queryGetCustomer();
  const customer = await window.ElectronAPI.sqlite3.all(query);
  return customer;
};
const getUserCustomer1 = async () => {
  const query = queryGetCustomer();
  const customer = await window.ElectronAPI.sqlite3.all(query);
  const liabilityList = [];
  for (const rows of customer) {
    const query1 = `
    SELECT 
    SUM(AccountingBalance) AS TotalReceivable
    FROM Accounting
    WHERE AccountingName LIKE '%Receivable - ${rows.UserFullname}%'
    AND AccountingRef = 112
    `;
    const { TotalReceivable } = await window.ElectronAPI.sqlite3.each1(query1);
    const liabilityData = {
      UserId: rows.UserId,
      UserFullname: rows.UserFullname,
      UserEmail: rows.UserEmail,
      TotalReceivable,
    };
    // push to array
    liabilityList.push(liabilityData);
  }
  return liabilityList;
};
const getUserSale = async () => {
  const query = queryGetSale();
  const userSale = await window.ElectronAPI.sqlite3.all(query);
  return userSale;
};
const getUserInvestor = async () => {
  const query = queryGetInvestor();
  const investor = await window.ElectronAPI.sqlite3.all(query);
  const investorList = [];
  for (const rows of investor) {
    const query1 = `
    SELECT 
    COALESCE(SUM(AccountingBalance), 0) AS TotalEquity
    FROM 
    Accounting
    WHERE 
    AccountingName LIKE '%equity - ${rows.UserFullname}%'
    `;
    const { TotalEquity } = await window.ElectronAPI.sqlite3.each1(query1);
    const investorData = {
      UserId: rows.UserId,
      UserFullname: rows.UserFullname,
      UserEmail: rows.UserEmail,
      TotalEquity,
    };
    // push to array
    investorList.push(investorData);
  }
  return investorList;
};
const getUserSupplier = async () => {
  const query = queryGetSupplier();
  const supplier = await window.ElectronAPI.sqlite3.all(query);
  return supplier;
};
const getUserDebt = async () => {
  const query = queryGetDebt();
  const debt = await window.ElectronAPI.sqlite3.all(query);
  const listDebt = [];
  for (const rows of debt) {
    const query1 = `
    SELECT
    COALESCE(SUM(AccountingBalance), 0) AS TotalLiability
    FROM 
    Accounting
    WHERE 
    AccountingRef = 211 AND 
    AccountingName LIKE '%liability - ${rows.UserFullname}%' 
    `;
    const { TotalLiability } = await window.ElectronAPI.sqlite3.each1(query1);
    if (TotalLiability > 0) {
      const dataDebt = {
        UserId: rows.UserId,
        UserFullname: rows.UserFullname,
        UserEmail: rows.UserEmail,
        TotalLiability,
      };
      // filter array and push
      listDebt.push(dataDebt);
    }
  }
  return listDebt;
};
const getUserCreditor = async () => {
  const query = queryGetCreditor();
  const creditor = await window.ElectronAPI.sqlite3.all(query);
  const listCreditor = [];
  for (const rows of creditor) {
    const query1 = `
    SELECT
    COALESCE(SUM(AccountingBalance), 0) AS TotalLiability
    FROM 
    Accounting
    WHERE 
    AccountingName LIKE '%liability - ${rows.UserFullname}%' AND 
    AccountingRef = 211
    `;
    const { TotalLiability } = await window.ElectronAPI.sqlite3.each1(query1);
    const dataCreditor = {
      UserId: rows.UserId,
      UserFullname: rows.UserFullname,
      UserEmail: rows.UserEmail,
      TotalLiability,
    };
    // push to array
    listCreditor.push(dataCreditor);
  }
  return listCreditor;
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
    capitalizeWord(UserFullnameVal),
    UserPositionVal,
    UserIdVal,
    imgBase64,
    CancelImg
  );
  const msg = `${UserFullnameVal} has been updated`;
  const updated = await window.ElectronAPI.sqlite3.run(query, msg);
  return updated;
};
// 4.DELETE
const deleteUserId = async (req) => {
  const { userFullname, userId } = req;
  const query = queryDeleteUser(userId);
  const msg = `${userFullname} has been deleted `;
  const deleted = await window.ElectronAPI.sqlite3.run(query, msg);
  return deleted;
};

export {
  deleteUserId,
  getUser,
  getUserList,
  getUserDebt,
  getUserCreditor,
  getUserCustomer,
  getUserCustomer1,
  getUserPagination,
  getUserInvestor,
  getUserSale,
  getUserSupplier,
  register,
  updateUser,
};
