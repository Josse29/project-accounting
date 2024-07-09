import { formatQty1 } from "../../client-side/js/utils/formatQty.js";
import {
  queryDeletePersediaan,
  queryGetPersediaan,
  queryInsertPersediaan,
  queryListPersediaan,
  queryTotalRowPersediaan,
  queryUpdatePersediaan,
} from "../querysql/persediaan.js";

// 1.CREATE
export const createPersediaan = (
  valProductName,
  valPersediaanDDMY,
  valPersediaanHMS,
  valPersediaanProductId,
  valPersediaanQty,
  valPersediaanRp,
  valPersediaanInfo,
  callback
) => {
  const isNumeric = /^-?([1-9]\d*|0?\.\d+)$/.test(valPersediaanQty);
  const valPersediaanTotalRp = valPersediaanQty * valPersediaanRp;
  if (isNumeric) {
    db.run(
      queryInsertPersediaan(
        valPersediaanDDMY,
        valPersediaanHMS,
        valPersediaanProductId,
        valPersediaanQty,
        valPersediaanTotalRp,
        valPersediaanInfo
      ),
      (err) => {
        if (!err) {
          return callback(
            true,
            `Persediaan <b class='text-capitalize'>${valProductName} ${formatQty1(
              valPersediaanQty
            )}</b> berhasil ditambahkan`
          );
        }
        if (err) {
          return callback(false, err);
        }
      }
    );
  }
  if (!isNumeric) {
    return callback(false, "mohon masukkan angka");
  }
};
// 2.READ
export const getPersediaan = (
  valPersediaanSearch,
  valPersediaanLimit,
  valPersediaanOffset,
  callback
) => {
  const valPersediaanStartOffset =
    (valPersediaanOffset - 1) * valPersediaanLimit;
  db.all(
    queryGetPersediaan(
      valPersediaanSearch,
      valPersediaanLimit,
      valPersediaanStartOffset
    ),
    (err, res) => {
      if (!err) {
        return callback(true, res);
      }
      if (err) {
        return callback(false, err);
      }
    }
  );
};
export const getTotalPagePersediaan = (
  valPersediaanSearch,
  valPersediaanLimit,
  callback
) => {
  db.each(queryTotalRowPersediaan(valPersediaanSearch), (err, res) => {
    if (!err) {
      let persediaanTotalPage;
      let persediaanTotalRow = parseInt(res.TOTAL_ROW);
      let persediaanLimitInt = parseInt(valPersediaanLimit);
      if (persediaanTotalRow % persediaanLimitInt === 0) {
        persediaanTotalPage = parseInt(persediaanTotalRow / persediaanLimitInt);
      } else {
        persediaanTotalPage =
          parseInt(persediaanTotalRow / persediaanLimitInt) + 1;
      }
      return callback(true, persediaanTotalPage);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getTotalRowPersediaan = (valPersediaanSearch, callback) => {
  db.each(queryTotalRowPersediaan(valPersediaanSearch), (err, res) => {
    if (!err) {
      let persediaanTotalRow = parseInt(res.TOTAL_ROW);
      return callback(true, persediaanTotalRow);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getInventoryPersediaan = (valPersediaanSearch, callback) => {
  db.all(queryListPersediaan(valPersediaanSearch), (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
// 3.UPDATE
export const updatePersediaan = (
  valPersediaanId,
  valPersediaanDDMY,
  valPersediaanHMS,
  valPersediaanProductId,
  valPersediaanQty,
  valPersediaanRp,
  valPersediaanInfo,
  valProductName,
  callback
) => {
  const valPersediaanTotalRp = valPersediaanQty * valPersediaanRp;
  db.run(
    queryUpdatePersediaan(
      valPersediaanId,
      valPersediaanDDMY,
      valPersediaanHMS,
      valPersediaanProductId,
      valPersediaanQty,
      valPersediaanTotalRp,
      valPersediaanInfo
    ),
    (err) => {
      if (!err) {
        return callback(
          true,
          `Persediaan <b class='text-capitalize'>${valProductName} ${formatQty1(
            valPersediaanQty
          )}</b> berhasil diperbaharui`
        );
      }
      if (err) {
        return callback(false, err);
      }
    }
  );
};
// 4.DELETE
export const deletePersediaan = (
  valPersediaanId,
  valProductName,
  valPersediaanQty,
  callback
) => {
  db.run(queryDeletePersediaan(valPersediaanId), (err) => {
    if (!err) {
      return callback(
        true,
        `Persediaan <b class='text-capitalize'>${valProductName} ${formatQty1(
          valPersediaanQty
        )}</b> berhasil dihapus`
      );
    }
    if (err) {
      return callback(false, err);
    }
  });
};
