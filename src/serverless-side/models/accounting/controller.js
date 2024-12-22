import db from "../../database/config.js";
import { validateDate } from "../../utils/validation.js";
import {
  queryCreateAccounting,
  queryDeleteAccounting,
  queryInitAccounting,
  queryReadAccounting,
  queryReadAccounting1,
  queryReadAccountingDate,
  querySumDate,
  queryUpdateAccounting,
} from "./querysql.js";
export const createAccounting = async (req) => {
  const {
    accountingYMDVal,
    accountingHMSVal,
    accountingRefVal,
    accountingNameVal,
    accountingDebtVal,
    accountingCreditVal,
    accountingInfoVal,
  } = req;
  const query = queryCreateAccounting(
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
// general-entries
export const getAccountingPagination = async (req) => {
  const { limitVal } = req;
  const query = queryInitAccounting();
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
export const getAccounting = async (req) => {
  const { limitVal, offsetVal } = req;
  const startOffsetVal = parseInt((offsetVal - 1) * limitVal);
  const query = queryReadAccounting(limitVal, startOffsetVal);
  const accounting = await window.electronAPI.sqliteApi.all(query);
  return accounting;
};
export const getAccountingDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  // validate Date
  validateDate(startDateVal, endDateVal);
  const query = queryReadAccountingDate(startDateVal, endDateVal);
  const accounting = await window.electronAPI.sqliteApi.all(query);
  return accounting;
};
// balance-sheet
export const getAccountingSumDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = querySumDate(startDateVal, endDateVal);
  const result = await window.electronAPI.sqliteApi.each1(query);
  const sumDebt = result.Total_Debt ? result.Total_Debt : 0;
  const sumCredit = result.Total_Credit ? result.Total_Credit : 0;
  return { sumDebt, sumCredit };
};
export const getAccounting1 = () => {
  const query = queryReadAccounting1();
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
export const updateAccounting = (req, res) => {
  const {
    accountingYMDVal,
    accountingHMSVal,
    accountingRefVal,
    accountingNameVal,
    accountingPositionVal,
    accountingRpVal,
    accountingInfoVal,
    accountingId,
  } = req;
  const query = queryUpdateAccounting(
    accountingYMDVal,
    accountingHMSVal,
    accountingRefVal,
    accountingNameVal,
    accountingPositionVal,
    accountingRpVal,
    accountingInfoVal,
    accountingId
  );
  db.run(query, (err) => {
    if (!err) {
      return res(true, "berhasil");
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const deleteAccounting = (req, res) => {
  const { accountingIdVal } = req;
  const query = queryDeleteAccounting(accountingIdVal);
  db.run(query, (err) => {
    if (!err) {
      return res(true, "berhasil dihapus");
    }
    if (err) {
      return res(false, err);
    }
  });
};
