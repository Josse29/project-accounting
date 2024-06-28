import {
  queryDeleteSatuan,
  queryGetSatuan,
  queryInsertSatuan,
  queryTotalRowSatuan,
  queryUpdateSatuan,
} from "../querysql/satuan.js";

// 1.CREATE
export const createSatuan = (satuanName, satuanInfo, callback) => {
  db.run(queryInsertSatuan(satuanName, satuanInfo), (err) => {
    if (!err) {
      return callback(
        true,
        `Satuan <b class='text-capitalize'>${satuanName}</b> berhasil ditambahkan`
      );
    }
    if (err) {
      return callback(false, err);
    }
  });
};
// 2.READ
export const getSatuan = (
  satuanSearch,
  satuanLimit,
  satuanOffset,
  callback
) => {
  const satuanOffsetStart = (satuanOffset - 1) * satuanLimit;
  db.all(
    queryGetSatuan(satuanSearch, satuanLimit, satuanOffsetStart),
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
export const getTotalRowSatuan = (satuanSearch, callback) => {
  db.each(queryTotalRowSatuan(satuanSearch), (err, res) => {
    if (!err) {
      const totalSatuan = parseInt(res.TOTAL_ROW);
      return callback(true, totalSatuan);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getTotalPageSatuan = (satuanSearch, satuanLimit, callback) => {
  db.each(queryTotalRowSatuan(satuanSearch), (err, res) => {
    if (!err) {
      let lastPage;
      let totalRow = parseInt(res.TOTAL_ROW);
      let satuanLimitInt = parseInt(satuanLimit);
      if (totalRow % satuanLimitInt === 0) {
        lastPage = totalRow / satuanLimitInt;
      }
      if (totalRow % satuanLimitInt !== 0) {
        lastPage = parseInt(totalRow / satuanLimitInt) + 1;
      }
      return callback(true, lastPage);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
// 3.UPDATE
export const updateSatuan = (satuanId, satuanName, satuanInfo, callback) => {
  db.run(queryUpdateSatuan(satuanId, satuanName, satuanInfo), (err) => {
    if (!err) {
      return callback(
        true,
        `Satuan <b>${satuanName}</b> berhasil diperbaharui ${satuanId}`
      );
    }
    if (err) {
      return callback(false, err);
    }
  });
};
// 4.DELETE
export const deleteSatuan = (satuanId, satuanName, callback) => {
  db.run(queryDeleteSatuan(satuanId), (err) => {
    if (!err) {
      return callback(
        true,
        `Satuan <b class='text-capitalize'>${satuanName}</b> berhasil dihapus`
      );
    }
    if (err) {
      return callback(false, err);
    }
  });
};
