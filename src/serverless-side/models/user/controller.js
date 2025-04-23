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
  validateLoadImg1,
  validatePosition,
  validateSamePassword,
  validateUserFullname,
} from "../../utils/validation.js";
import { capitalizeWord } from "../../utils/formatTxt.js";
import {
  executeCreate,
  executeDelete,
  executeGet,
  executeGet1,
  executeGet2,
  executeUpdate,
} from "../../database/runQuery.js";
import UserSchema from "./schema.js";

const User = (ipcMain, db) => {
  // init db user
  const initUser = async () => {
    await executeCreate(db, UserSchema);
  };
  initUser();
  // 1.CREATE
  ipcMain.handle("registerUser", async (_, data) => {
    // payload
    const {
      UserEmailVal,
      UserFullnameVal,
      UserPasswordVal,
      UserPassword1Val,
      UserImgVal,
      UserPositionVal,
      UserInfoVal,
    } = data;
    // Validations
    validateEmail(UserEmailVal);
    validateUserFullname(UserFullnameVal);
    if (UserPositionVal === "admin") {
      validateSamePassword(UserPasswordVal, UserPassword1Val);
    }
    const imgBase64 = await validateLoadImg1(UserImgVal);
    validatePosition(UserPositionVal);
    // Query & execute
    const query = queryRegister(
      UserEmailVal,
      capitalizeWord(UserFullnameVal),
      UserPasswordVal,
      imgBase64,
      UserPositionVal,
      UserInfoVal
    );
    await executeCreate(db, query);
    const msg = `${UserPositionVal} - ${UserFullnameVal} has been registered !`;
    return msg;
  });
  // 2.READ
  ipcMain.handle("getUser", async (_, data) => {
    const { searchVal, limitVal, offsetVal } = data;
    const startOffsetVal = (offsetVal - 1) * limitVal;
    const query = queryGet(searchVal, limitVal, startOffsetVal);
    const User = await executeGet(db, query);
    return User;
  });
  ipcMain.handle("paginationUser", async (_, data) => {
    const { searchVal, limitVal } = data;
    const query = queryGetTotal(searchVal);
    const totalPageRow = await executeGet1(db, query, limitVal);
    return totalPageRow;
  });
  ipcMain.handle("getUserList", async () => {
    const query = queryGetUser();
    const listUser = await executeGet(db, query);
    return listUser;
  });
  ipcMain.handle("getCustomer", async () => {
    const query = queryGetCustomer();
    const customer = await executeGet(db, query);
    return customer;
  });
  ipcMain.handle("getReceivable", async () => {
    const query = queryGetCustomer();
    const customer = await executeGet(db, query);
    const receivableList = [];
    for (const rows of customer) {
      const query1 = `
      SELECT 
      SUM(AccountingBalance) AS TotalReceivable
      FROM Accounting
      WHERE AccountingName LIKE '%Receivable - ${rows.UserFullname}%'
      AND AccountingRef = 112
      `;
      const { TotalReceivable } = await executeGet2(db, query1);
      const receivable = {
        UserId: rows.UserId,
        UserFullname: rows.UserFullname,
        UserEmail: rows.UserEmail,
        TotalReceivable,
      };
      // push to array
      receivableList.push(receivable);
    }
    return receivableList;
  });
  ipcMain.handle("getSales", async () => {
    const query = queryGetSale();
    const userSale = await executeGet(db, query);
    return userSale;
  });
  ipcMain.handle("getInvestor", async () => {
    const query = queryGetInvestor();
    const investor = await executeGet(db, query);
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
      const { TotalEquity } = await executeGet2(db, query1);
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
  });
  ipcMain.handle("getSupplier", async () => {
    const query = queryGetSupplier();
    const supplier = await executeGet(db, query);
    return supplier;
  });
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
  ipcMain.handle("getCreditor", async () => {
    const query = queryGetCreditor();
    const creditor = await executeGet(db, query);
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
      const { TotalLiability } = await executeGet2(db, query1);
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
  });
  // 3. UPDATE
  ipcMain.handle("updateUser", async (_, req) => {
    const {
      UserEmailVal,
      UserFullnameVal,
      UserImgVal,
      UserPositionVal,
      UserIdVal,
    } = req;
    // 1.validation email
    validateEmail(UserEmailVal);
    validateUserFullname(UserFullnameVal);
    const imgBase64 = await validateLoadImg1(UserImgVal);
    validatePosition(UserPositionVal);
    // execute
    const query = queryUpdate(
      UserEmailVal,
      capitalizeWord(UserFullnameVal),
      UserPositionVal,
      UserIdVal,
      imgBase64
    );
    await executeUpdate(db, query);
    const msg = `${UserFullnameVal} has been updated`;
    return msg;
  });
  // 4. DELETE
  ipcMain.handle("deleteUser", async (_, req) => {
    const { UserFullname, UserId } = req;
    const query = queryDeleteUser(UserId);
    await executeDelete(db, query);
    const msg = `${UserFullname} has been deleted `;
    return msg;
  });
};
export default User;
