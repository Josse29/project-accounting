import db from "../../database/config.js";
import { validateDate } from "../../utils/validation.js";
import {
  queryCreate,
  queryRead,
  queryReadTotal,
  queryReadDate,
  queryReadSumDate,
  queryRead1,
} from "./querysql.js";

const createAccounting = async (req) => {
  const {
    accountingYMDVal,
    accountingHMSVal,
    accountingRefVal,
    accountingNameVal,
    accountingDebtVal,
    accountingCreditVal,
    accountingInfoVal,
  } = req;
  const query = queryCreate(
    accountingYMDVal,
    accountingHMSVal,
    accountingRefVal,
    accountingNameVal,
    accountingDebtVal,
    accountingCreditVal,
    accountingInfoVal
  );
  const msg = "accounting has been added";
  const created = await window.electronAPI.sqliteApi.run(query, msg);
  return created;
};
const createAccounting1 = async (req) => {
  const {
    accountingYMDVal,
    accountingHMSVal,
    accountingMethodVal,
    accountingRefInvestorVal,
    accountingPriceVal,
    accountingImgVal,
    accountingInfoVal,
  } = req;
  // 1. investment-activities
  if (accountingMethodVal === "invest") {
    // 1. create to table accounting
    const queryDebt = queryCreate(
      accountingYMDVal,
      accountingHMSVal,
      111,
      "Cash",
      accountingPriceVal,
      0,
      accountingInfoVal
    );
    const queryCredit = queryCreate(
      accountingYMDVal,
      accountingHMSVal,
      311,
      "Equity",
      0,
      accountingPriceVal,
      accountingInfoVal
    );
    console.log(queryDebt);
    console.log(queryCredit);
    // const msg = "accounting has been added";
    // await window.electronAPI.sqliteApi.run(queryDebt, msg);
    // await window.electronAPI.sqliteApi.run(queryCredit, msg);
    // 2. create to table cash
    // 3. create to table equity
  }
  return false;
  const msg = "accounting has been added";
  const created = await window.electronAPI.sqliteApi.run(query, msg);
  return created;
};
// general-entries
const getAccountingPagination = async (req) => {
  const { limitVal } = req;
  const query = queryReadTotal();
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
const getAccounting = async (req) => {
  const { limitVal, offsetVal } = req;
  const startOffsetVal = parseInt((offsetVal - 1) * limitVal);
  const query = queryRead(limitVal, startOffsetVal);
  const accounting = await window.electronAPI.sqliteApi.all(query);
  return accounting;
};
const getAccountingDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  // validate Date
  validateDate(startDateVal, endDateVal);
  const query = queryReadDate(startDateVal, endDateVal);
  const accounting = await window.electronAPI.sqliteApi.all(query);
  return accounting;
};
const getAccountingSumDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryReadSumDate(startDateVal, endDateVal);
  const result = await window.electronAPI.sqliteApi.each1(query);
  const sumDebt = result.Total_Debt ? result.Total_Debt : 0;
  const sumCredit = result.Total_Credit ? result.Total_Credit : 0;
  return { sumDebt, sumCredit };
};
const getAccounting1 = () => {
  const query = queryRead1();
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (!err) {
        resolve(rows);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// const updateAccounting = (req, res) => {
//   const {
//     accountingYMDVal,
//     accountingHMSVal,
//     accountingRefVal,
//     accountingNameVal,
//     accountingPositionVal,
//     accountingRpVal,
//     accountingInfoVal,
//     accountingId,
//   } = req;
//   const query = queryUpdate(
//     accountingYMDVal,
//     accountingHMSVal,
//     accountingRefVal,
//     accountingNameVal,
//     accountingPositionVal,
//     accountingRpVal,
//     accountingInfoVal,
//     accountingId
//   );
//   db.run(query, (err) => {
//     if (!err) {
//       return res(true, "berhasil");
//     }
//     if (err) {
//       return res(false, err);
//     }
//   });
// };
// const deleteAccounting = (req, res) => {
//   const { accountingIdVal } = req;
//   const query = queryDeleteAccounting(accountingIdVal);
//   db.run(query, (err) => {
//     if (!err) {
//       return res(true, "berhasil dihapus");
//     }
//     if (err) {
//       return res(false, err);
//     }
//   });
// };
export {
  createAccounting,
  createAccounting1,
  getAccounting,
  getAccounting1,
  getAccountingDate,
  getAccountingPagination,
  getAccountingSumDate,
};
