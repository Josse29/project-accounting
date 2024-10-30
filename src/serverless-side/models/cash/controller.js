import db from "../../database/config.js";
import {
  queryDeleteCash,
  queryInsertCash,
  queryReadCash,
  queryReadInitCash,
  querySumCash,
  queryUpdateCash,
} from "./querysql.js";
// create
export const createCash = (req) => {
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
        resolve();
      }
      if (err) {
        reject(err);
      }
    });
  });
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
export const getCashPagination = (req) => {
  const { searchVal, limitVal } = req;
  const query = queryReadInitCash(searchVal);
  return new Promise((resolve, reject) => {
    db.each(query, (err, result) => {
      if (!err) {
        let totalPage = ``;
        const totalRow = parseInt(result.Total_Row);
        const isInteger = totalRow % limitVal === 0;
        if (isInteger) {
          totalPage = totalRow / limitVal;
        }
        if (!isInteger) {
          totalPage = parseInt(totalRow / limitVal) + 1;
        }
        resolve({ totalPage, totalRow });
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getCash = (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = parseInt(parseInt(offsetVal - 1) * parseInt(limitVal));
  const query = queryReadCash(searchVal, limitVal, startOffsetVal);
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
export const getCashSum = (res) => {
  const query = querySumCash();
  return new Promise((resolve, reject) => {
    db.each(query, (err, result) => {
      if (!err) {
        const response = result.Total_Amount;
        const sum = response ? response : 0;
        resolve(sum);
      }
      if (err) {
        reject(err);
        return res(false, err);
      }
    });
  });
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
