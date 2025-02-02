import db from "../../database/config.js";
import { validateDate } from "../../utils/validation.js";
import {
  queryDeleteCash,
  queryInsertCash,
  queryReadByDate,
  queryReadCash,
  queryReadCash1,
  queryReadCash2,
  queryReadInitCash,
  querySumCash,
  querySumCash1,
  queryUpdateCash,
} from "./querysql.js";

// create
export const createCash = async (req) => {
  const {
    CashDateVal,
    CashTimeVal,
    CashNameVal,
    CashBalanceVal,
    CashInfoVal,
    CashImgVal,
  } = req;
  const query = queryInsertCash(
    CashDateVal,
    CashTimeVal,
    CashNameVal,
    CashBalanceVal,
    CashInfoVal,
    CashImgVal
  );
  const msg = `cash has been added `;
  const created = await window.electronAPI.sqliteApi.run(query, msg);
  return created;
};
export const insertCash1 = (req) => {
  const { CashYYYYMMDDVal, CashHMSVal, CashNameVal, CashRpVal, CashInfoVal } =
    req;
  const query = queryInsertCash(
    CashYYYYMMDDVal,
    CashHMSVal,
    CashNameVal,
    CashRpVal,
    CashInfoVal
  );
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        resolve(resolve);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// read
export const getCashPagination = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryReadInitCash(searchVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
export const getCash = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = parseInt(parseInt(offsetVal - 1) * parseInt(limitVal));
  const query = queryReadCash(searchVal, limitVal, startOffsetVal);
  const cash = await window.electronAPI.sqliteApi.all(query);
  return cash;
};
export const readCash1 = (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = parseInt((offsetVal - 1) * limitVal);
  const query = queryReadCash(searchVal, limitVal, startOffsetVal);
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
export const getCashSum = async () => {
  const query = querySumCash();
  const response = await window.electronAPI.sqliteApi.each1(query);
  const totalCash = response.Total_Amount ? response.Total_Amount : 0;
  return totalCash;
};
export const getCashSum1 = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = querySumCash1(startDateVal, endDateVal);
  const response = await window.electronAPI.sqliteApi.each1(query);
  const totalCash = response.Total_Amount ? response.Total_Amount : 0;
  return totalCash;
};
export const getCashDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  const query = queryReadByDate(startDateVal, endDateVal);
  const cashByDate = await window.electronAPI.sqliteApi.all(query);
  return cashByDate;
};
// update
export const updateCash = (req, res) => {
  const { CashNameVal, CashRpVal, CashInfoVal, CashId } = req;
  const query = queryUpdateCash(CashNameVal, CashRpVal, CashInfoVal, CashId);
  db.run(query, (err) => {
    if (!err) {
      return res(true, "berhasil diupdate");
    }
    if (err) {
      return res(false, err);
    }
  });
};
// delete
export const deleteKas = (cashId, callback) => {
  const query = queryDeleteCash(cashId);
  db.run(query, (err) => {
    if (!err) {
      return callback(true, "berhasil dihapus");
    }
    if (err) {
      return callback(false, err);
    }
  });
};
// export csv
export const getCash1 = async (req) => {
  const { startDateVal, endDateVal } = req;
  // validate by date
  validateDate(startDateVal, endDateVal);
  // query
  const query = queryReadCash1(startDateVal, endDateVal);
  const cash = await window.electronAPI.sqliteApi.all(query);
  return cash;
};
// export to pdf
export const getCash2 = async (req) => {
  const { startDateVal, endDateVal } = req;
  // validate by date
  validateDate(startDateVal, endDateVal);
  const query = queryReadCash2(startDateVal, endDateVal);
  const cash = await window.electronAPI.sqliteApi.all(query);
  return cash;
};
