import { formatQty1 } from "../../client-side/js/utils/formatQty.js";
import {
  queryDeletePersediaan,
  queryGetPersediaan,
  queryGetPersediaanProductId,
  queryGetPersediaanQty,
  queryGetPersediaanRpSum,
  queryGetPersediaanTotalRow,
  queryInsertPersediaan,
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
  const isNaN = Number.isNaN(valPersediaanProductId);
  // 1.validate product exist
  if (isNaN) {
    return callback(false, "Mohon tambah Product terlebih dahulu");
  }
  // 2.validate numeric on valPersediaanQty
  if (!isNumeric) {
    return callback(false, "Mohon Masukkan Angka di Input Qty");
  }
  // 3.validate qty product
  getPersediaanQtyValidate(
    valProductName,
    valPersediaanProductId,
    valPersediaanQty,
    (status, response) => {
      if (status) {
        executeInsert();
      }
      if (!status) {
        return callback(false, response);
      }
    }
  );
  // execute insert
  function executeInsert() {
    const valPersediaanTotalRp = valPersediaanQty * valPersediaanRp;
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
export const getPersediaanTotalPage = (
  valPersediaanSearch,
  valPersediaanLimit,
  callback
) => {
  db.each(queryGetPersediaanTotalRow(valPersediaanSearch), (err, res) => {
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
export const getPersediaanTotalRow = (valPersediaanSearch, callback) => {
  db.each(queryGetPersediaanTotalRow(valPersediaanSearch), (err, res) => {
    if (!err) {
      const persediaanTotalRow = parseInt(res.TOTAL_ROW);
      return callback(true, persediaanTotalRow);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getPersediaanQtyValidate = (
  valProductName,
  valPersediaanProductId,
  valPersediaanQty,
  callback
) => {
  db.all(queryGetPersediaanQty(valPersediaanProductId), (err, rows) => {
    if (!err) {
      const res = rows[0];
      const existItem = rows.length >= 1;
      // Produk sudah terdaftar ke tablePersediaan
      if (existItem) {
        // barang masuk
        const persediaanQty = parseFloat(res.TotalQty);
        if (valPersediaanQty >= 1) {
          return callback(true, valPersediaanQty);
        }
        // barang keluar
        if (valPersediaanQty < 0) {
          // barang keluar tapi persediaan masih ada
          if (persediaanQty >= 1) {
            const qtyOutAbs = Math.abs(parseFloat(valPersediaanQty));
            // barang keluar tapi qtyOut <= jlh persediaan
            if (qtyOutAbs <= persediaanQty) {
              return callback(true, valPersediaanQty);
            }
            // barang keluar tapi jlhQtyOut > jlh persediaan
            if (qtyOutAbs > persediaanQty) {
              return callback(
                false,
                `Mohon Maaf ${valProductName} hanya tersedia : ${persediaanQty}`
              );
            }
          }
          // barang keluar tapi persediaan masih kosong
          if (persediaanQty < 1) {
            return callback(false, `${valProductName} masih kosong`);
          }
        }
      }
      // Produk belum terdaftar ke tablePersediaan
      if (!existItem) {
        // barang masuk
        if (valPersediaanQty >= 1) {
          return callback(
            true,
            `${valProductName} sudah ditambahkan dengan jumlah : ${valPersediaanQty}`
          );
        }
        // barang keluar
        if (valPersediaanQty < 1) {
          return callback(
            false,
            `Mohon maaf ${valProductName} belum terdaftar silakan tambah`
          );
        }
      }
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getPersediaanQty = (valPersediaanProductId, callback) => {
  db.all(queryGetPersediaanQty(valPersediaanProductId), (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getPersediaanRpSum = (valPersediaanProductId, callback) => {
  db.each(queryGetPersediaanRpSum(valPersediaanProductId), (err, res) => {
    if (!err) {
      let totalRp = ``;
      if (res.TotalRp !== null) {
        totalRp = parseFloat(res.TotalRp);
      }
      if (res.TotalRp === null) {
        totalRp = 0;
      }
      return callback(true, totalRp);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getPersediaanProductId = (valPersediaanProductId, callback) => {
  db.all(queryGetPersediaanProductId(valPersediaanProductId), (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(true, err);
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
  const isNumeric = /^-?([1-9]\d*|0?\.\d+)$/.test(valPersediaanQty);
  // 1.validate numeric on valPersediaanQty
  if (!isNumeric) {
    return callback(false, "Mohon Masukkan Angka di Input Qty");
  }
  // 2. validate available qty
  getPersediaanQtyValidate(
    valProductName,
    valPersediaanProductId,
    valPersediaanQty,
    (status, response) => {
      if (status) {
        executeUpdate();
      }
      if (!status) {
        console.log(response);
        return callback(false, response);
      }
    }
  );
  // execute update
  function executeUpdate() {
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
  }
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
