import db from "../../database/config.js";
import {
  queryCreateAccounting,
  queryDeleteAccounting,
  queryInitAccounting,
  queryReadAccounting,
  queryReadAccounting1,
  querySumCredit,
  querySumDebt,
  queryUpdateAccounting,
} from "./querysql.js";
export const createAccounting = (req) => {
  const {
    accountingYMDVal,
    accountingHMSVal,
    accountingRefVal,
    accountingNameVal,
    accountingPositionVal,
    accountingRpVal,
    accountingInfoVal,
  } = req;
  const query = queryCreateAccounting(
    accountingYMDVal,
    accountingHMSVal,
    accountingRefVal,
    accountingNameVal,
    accountingPositionVal,
    accountingRpVal,
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
export const readInitAccounting = (req, res) => {
  const { searchVal, limitVal } = req;
  const query = queryInitAccounting();
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
export const readAccounting = (req, res) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = parseInt((offsetVal - 1) * limitVal);
  const query = queryReadAccounting(searchVal, limitVal, startOffsetVal);
  db.all(query, (err, rows) => {
    if (!err) {
      return res(true, rows);
    }
    if (err) {
      return res(false, err);
    }
  });
};
// balance-sheet
export const sumDebt = (res) => {
  const query = querySumDebt();
  db.each(query, (err, result) => {
    if (!err) {
      const debt = result.Total_Rp ? result.Total_Rp : 0;
      return res(true, parseInt(debt));
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const sumCredit = (res) => {
  const query = querySumCredit();
  db.each(query, (err, result) => {
    if (!err) {
      const credit = result.Total_Rp ? result.Total_Rp : 0;
      return res(true, parseInt(credit));
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const readAccounting1 = (res) => {
  const query = queryReadAccounting1();
  db.all(query, (err, rows) => {
    if (!err) {
      return res(true, rows);
    }
    if (err) {
      return res(false, err);
    }
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
