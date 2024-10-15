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
export const readInitCash = (req, res) => {
  const { searchVal, limitVal } = req;
  const query = queryReadInitCash(searchVal);
  db.each(query, (err, result) => {
    if (!err) {
      let totalPage = ``;
      let totalRow = parseInt(result.Total_Row);
      if (totalRow % limitVal === 0) {
        totalPage = totalRow / limitVal;
      }
      if (totalRow % limitVal !== 0) {
        totalPage = parseInt(totalRow / limitVal) + 1;
      }
      return res(true, { totalPage, totalRow });
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const readCash = (req, res) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = parseInt(parseInt(offsetVal - 1) * parseInt(limitVal));
  const query = queryReadCash(searchVal, limitVal, startOffsetVal);
  db.all(query, (err, rows) => {
    if (!err) {
      return res(true, rows);
    }
    if (err) {
      return res(true, err);
    }
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
export const sumCash = (res) => {
  const query = querySumCash();
  db.each(query, (err, result) => {
    if (!err) {
      const sum = result.Total_Amount ? result.Total_Amount : 0;
      return res(true, parseInt(sum));
    }
    if (err) {
      return res(false, err);
    }
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
