import {
  queryDeleteCash,
  queryInsertCash,
  queryReadCash,
  queryUpdateCash,
} from "../querysql/cash.js";
// create
export const insertCash = (req, res) => {
  const { CashYYYYMMDDVal, CashHMSVal, CashNameVal, CashRpVal, CashInfoVal } =
    req;
  const query = queryInsertCash(
    CashYYYYMMDDVal,
    CashHMSVal,
    CashNameVal,
    CashRpVal,
    CashInfoVal
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
// read
export const readCash = (res) => {
  const query = queryReadCash();
  db.all(query, (err, rows) => {
    if (!err) {
      return res(true, rows);
    }
    if (err) {
      return res(true, err);
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
