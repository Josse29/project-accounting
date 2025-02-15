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
} from "./querysql.js";

// create
const createCash = async (req) => {
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
const insertCash1 = (req) => {
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
const getCashPagination = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryReadInitCash(searchVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
const getCash = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = parseInt(parseInt(offsetVal - 1) * parseInt(limitVal));
  const query = queryReadCash(searchVal, limitVal, startOffsetVal);
  const cash = await window.electronAPI.sqliteApi.all(query);
  return cash;
};
const readCash1 = (req) => {
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
const getCashSum = async () => {
  const query = querySumCash();
  const response = await window.electronAPI.sqliteApi.each1(query);
  return response.Total_Amount;
};
const getCashSum1 = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = querySumCash1(startDateVal, endDateVal);
  const response = await window.electronAPI.sqliteApi.each1(query);
  return response.Total_Amount;
};
const getCashDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  const query = queryReadByDate(startDateVal, endDateVal);
  const cashByDate = await window.electronAPI.sqliteApi.all(query);
  return cashByDate;
};
// delete
const deleteKas = (cashId, callback) => {
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
// csv
const getCash1 = async (req) => {
  const { startDateVal, endDateVal } = req;
  // validate by date
  validateDate(startDateVal, endDateVal);
  // query
  const query = queryReadCash1(startDateVal, endDateVal);
  const cash = await window.electronAPI.sqliteApi.all(query);
  return cash;
};
//  to pdf
const getCash2 = async (req) => {
  const { startDateVal, endDateVal } = req;
  // validate by date
  validateDate(startDateVal, endDateVal);
  const query = queryReadCash2(startDateVal, endDateVal);
  const cash = await window.electronAPI.sqliteApi.all(query);
  return cash;
};
export {
  createCash,
  insertCash1,
  getCash,
  getCash1,
  getCash2,
  getCashDate,
  getCashPagination,
  getCashSum,
  getCashSum1,
};
