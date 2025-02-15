import db from "../../database/config.js";
import {
  validateCash,
  validateDate,
  validateDateAndTime,
  validateInvestor,
  validateLoadImg,
  validatePrice1,
  validateProductAdd,
} from "../../utils/validation.js";
import { createCash } from "../cash/controller.js";
import { createEquity } from "../equity/controller.js";
import {
  queryCreate,
  queryRead,
  queryReadTotal,
  queryReadDate,
  queryReadSumDate,
  queryRead1,
} from "./querysql.js";

// only create accounting
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
// investment with cash
const createAccounting1 = async (req) => {
  const {
    accountingYMDVal,
    accountingHMSVal,
    accountingInvestorIdVal,
    accountingInvestorNameVal,
    accountingPriceVal,
    accountingImgVal,
    accountingInfoVal,
  } = req;
  // 1.validate date and time
  validateDateAndTime(accountingYMDVal, accountingHMSVal);
  // 2.validate investor
  validateInvestor(accountingInvestorNameVal);
  // 3.validate price
  validatePrice1(accountingPriceVal);
  // 4. validate img
  const accountingImg = await validateLoadImg(accountingImgVal);

  // 1. create to table cash
  const req1 = {
    CashDateVal: accountingYMDVal,
    CashTimeVal: accountingHMSVal,
    CashNameVal: `Investment - ${accountingInvestorNameVal}`,
    CashBalanceVal: accountingPriceVal,
    CashInfoVal: accountingInfoVal,
    CashImgVal: accountingImg,
  };
  await createCash(req1);
  // 2. create to table equity
  const req2 = {
    EquityDateVal: accountingYMDVal,
    EquityTimeVal: accountingHMSVal,
    EquityUserIdVal: accountingInvestorIdVal,
    EquityBalanceVal: accountingPriceVal,
    EquityInformationVal: accountingInfoVal,
  };
  await createEquity(req2);
  // 3. create to table accounting
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
    `Equity - ${accountingInvestorNameVal}`,
    0,
    accountingPriceVal,
    accountingInfoVal
  );
  const msg = `Accounting - Investment ${accountingInvestorNameVal} has been added`;
  await window.electronAPI.sqliteApi.run(queryDebt, msg);
  await window.electronAPI.sqliteApi.run(queryCredit, msg);
  return msg;
};
// cash out product / purchasement
const createAccounting2 = async (req) => {
  const {
    accountingYMDVal,
    accountingHMSVal,
    accountingProductId,
    accountingProductName,
    accountingBalanceVal,
    accountingInfoVal,
  } = req;
  // 1.validate date and time
  validateDateAndTime(accountingYMDVal, accountingHMSVal);
  // 2.validate productid
  validateProductAdd(accountingProductId);
  // 3.validate cash
  await validateCash(accountingBalanceVal);
  // 3. create to table accounting
  const queryDebt = queryCreate(
    accountingYMDVal,
    accountingHMSVal,
    511,
    `Purchase - ${accountingProductName}`,
    accountingBalanceVal,
    0,
    accountingInfoVal
  );
  const queryCredit = queryCreate(
    accountingYMDVal,
    accountingHMSVal,
    111,
    `Cash`,
    0,
    accountingBalanceVal,
    accountingInfoVal
  );
  console.log(queryDebt);
  console.log(queryCredit);
  return false;
  const msg = "Accounting has been added";
  await window.electronAPI.sqliteApi.run(queryDebt, msg);
  await window.electronAPI.sqliteApi.run(queryCredit, msg);
  return msg;
};

// cash out asset
const createAccounting3 = async (req) => {
  const {
    accountingDateVal,
    accountingTimeVal,
    accountingAssetIdVal,
    accountingAssetNameVal,
    accountingBalanceTotalVal,
    accountingInfoVal,
  } = req;
  // 1.validate date and time
  validateDateAndTime(accountingDateVal, accountingTimeVal);
  // 2.validate cash
  await validateCash(accountingBalanceTotalVal);
  // accountingYMDVal,
  // accountingHMSVal,
  // accountingRefVal,
  // accountingNameVal,
  // accountingDebtVal,
  // accountingCreditVal,
  // accountingInfoVal,
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
  createAccounting2,
  createAccounting3,
  getAccounting,
  getAccounting1,
  getAccountingDate,
  getAccountingPagination,
  getAccountingSumDate,
};
