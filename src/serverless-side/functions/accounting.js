import {
  queryCreateAccounting,
  queryDeleteAccounting,
  queryReadAccounting,
  queryUpdateAccounting,
} from "../querysql/accounting.js";

export const createAccounting = (req, res) => {
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
  db.run(query, (err) => {
    if (!err) {
      return res(true, "berhasil ");
    }
    if (err) {
      return res(false, err);
    }
  });
};
export const readAccounting = (response) => {
  const query = queryReadAccounting();
  db.all(query, (err, rows) => {
    if (!err) {
      return response(true, rows);
    }
    if (err) {
      return response(false, err);
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
  const { accountingIdVal, accountingNameVal } = req;
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
