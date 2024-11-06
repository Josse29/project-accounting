import db from "../../database/config.js";
import {
  queryCreateAccounting,
  queryDeleteAccounting,
  queryInitAccounting,
  queryReadAccounting,
  queryReadAccounting1,
  querySum,
  queryUpdateAccounting,
} from "./querysql.js";
export const createAccounting = (req) => {
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
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = "accounting has been added";
        resolve(msg);
      }
      if (err) {
        reject();
      }
    });
  });
};
// general-entries
export const getAccountingPagination = (req) => {
  const { searchVal, limitVal } = req;
  const query = queryInitAccounting();
  return new Promise((resolve, reject) => {
    db.each(query, (err, result) => {
      if (!err) {
        let totalPage = ``;
        let totalRow = parseInt(result.Total_Row);
        const isInt = totalRow % limitVal === 0;
        if (isInt) {
          totalPage = totalRow / limitVal;
        }
        if (!isInt) {
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
export const getAccounting = (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = parseInt((offsetVal - 1) * limitVal);
  const query = queryReadAccounting(searchVal, limitVal, startOffsetVal);
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
// balance-sheet
export const getAccountingSum = () => {
  const query = querySum();
  return new Promise((resolve, reject) => {
    db.each(query, (err, result) => {
      if (!err) {
        const sumDebt = result.Total_Debt ? result.Total_Debt : 0;
        const sumCredit = result.Total_Credit ? result.Total_Credit : 0;
        resolve({ sumDebt, sumCredit });
      }
      if (err) {
        reject(err);
      }
    });
  });
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
