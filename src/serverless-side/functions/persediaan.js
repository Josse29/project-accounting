import { formatQty1 } from "../../client-side/js/utils/formatQty.js";
import { isNumeric } from "../etc/regex.js";
import {
  queryDeletePersediaan,
  queryDeletePersediaanAll,
  queryDeletePersediaanProductId,
  queryGetPersediaan,
  queryGetPersediaanCategoryGroup,
  queryGetPersediaanCategoryId,
  queryGetPersediaanCategorySum,
  queryGetPersediaanDate,
  queryGetPersediaanDateCategoryId,
  queryGetPersediaanDateProductId,
  queryGetPersediaanDateQtyProductId,
  queryGetPersediaanDateRpCategoryId,
  queryGetPersediaanDateRpSupplierId,
  queryGetPersediaanDateSUM,
  queryGetPersediaanDateSumProduct,
  queryGetPersediaanDateSupplierId,
  queryGetPersediaanProductGroup,
  queryGetPersediaanProductGroup1,
  queryGetPersediaanProductId,
  queryGetPersediaanProductId2,
  queryGetPersediaanProductReport,
  queryGetPersediaanProductRow,
  queryGetPersediaanQty,
  queryGetPersediaanQty2,
  queryGetPersediaanReport,
  queryGetPersediaanRpSum,
  queryGetPersediaanRpSumCategoryId,
  queryGetPersediaanRpSumProductId,
  queryGetPersediaanRpSumSupplierId,
  queryGetPersediaanSupplierGroup,
  queryGetPersediaanSupplierId,
  queryGetPersediaanSupplierSum,
  queryGetPersediaanTotalRow,
  queryGetPersediaanTotalRow1,
  queryInsertPersediaan,
  queryInsertPersediaan1,
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
  const valdateNum = isNumeric(valPersediaanQty);
  const isNaN = Number.isNaN(valPersediaanProductId);
  // 1.validate product exist
  if (isNaN) {
    return callback(false, "Mohon tambah Product terlebih dahulu");
  }
  // 2.validate numeric on valPersediaanQty
  if (!valdateNum) {
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
    const query = queryInsertPersediaan(
      valPersediaanDDMY,
      valPersediaanHMS,
      valPersediaanProductId,
      valPersediaanQty,
      valPersediaanTotalRp,
      valPersediaanInfo
    );
    db.run(query, (err) => {
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
    });
  }
};
export const createPersediaan1 = (request, response) => {
  const {
    ProductYMD,
    ProductHMS,
    ProductId,
    ProductQty,
    ProductTotal,
    PersonSalesId,
  } = request;
  const query = queryInsertPersediaan1(
    ProductYMD,
    ProductHMS,
    ProductId,
    ProductQty,
    ProductTotal,
    PersonSalesId
  );
  db.run(query, (err) => {
    if (!err) {
      return response(true);
    }
    if (err) {
      return response(false, err);
    }
  });
};
// 2.READ
export const getPersediaanInit = (req) => {
  const { searchVal, limitVal } = req;
  return new Promise((resolve, reject) => {
    db.each(queryGetPersediaanTotalRow(searchVal), (err, res) => {
      if (!err) {
        let totalRow = parseInt(res.TOTAL_ROW);
        let totalPage;
        if (totalRow % limitVal === 0) {
          totalPage = parseInt(totalRow / limitVal);
        } else {
          totalPage = parseInt(totalRow / limitVal) + 1;
        }
        const rowAndPage = {
          totalRow,
          totalPage,
        };
        resolve(rowAndPage);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaan = (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const offsetStartVal = (offsetVal - 1) * limitVal;
  const query = queryGetPersediaan(searchVal, limitVal, offsetStartVal);
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanQtyValidate = (
  valProductName,
  valPersediaanProductId,
  valPersediaanQty,
  callback
) => {
  const query = queryGetPersediaanQty(valPersediaanProductId);
  db.all(query, (err, rows) => {
    if (!err) {
      const res = rows[0];
      const existItem = res.TotalQty >= 1;
      // Produk sudah terdaftar ke tablePersediaan
      if (existItem) {
        // barang masuk
        const stockQty = parseFloat(res.TotalQty);
        if (valPersediaanQty >= 1) {
          return callback(true, valPersediaanQty);
        }
        // barang keluar
        if (valPersediaanQty < 0) {
          // barang keluar tapi persediaan masih ada
          if (stockQty >= 1) {
            const qtyOutAbs = Math.abs(parseFloat(valPersediaanQty));
            // stock unsufficient
            if (qtyOutAbs <= stockQty) {
              return callback(true, valPersediaanQty);
            }
            // stock sufficient
            if (qtyOutAbs > stockQty) {
              return callback(
                false,
                `Mohon Maaf, ${valProductName} hanya tersedia : ${stockQty}`
              );
            }
          }
          // barang keluar tapi persediaan masih kosong
          if (stockQty < 1) {
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
export const getPersediaanQty = (valPersediaanProductId) => {
  const query = queryGetPersediaanQty(valPersediaanProductId);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        const totalQty = res.TotalQty ? res.TotalQty : 0;
        resolve(totalQty);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanRpSum = () => {
  return new Promise((resolve, reject) => {
    db.each(queryGetPersediaanRpSum(), (err, res) => {
      if (!err) {
        let totalRp = ``;
        if (res.TotalRp !== null) {
          totalRp = parseFloat(res.TotalRp);
        }
        if (res.TotalRp === null) {
          totalRp = 0;
        }
        resolve(totalRp);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanRpSumCategoryId = (valPersediaanCategoryId) => {
  const query = queryGetPersediaanRpSumCategoryId(valPersediaanCategoryId);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalRp = ``;
        if (res.TotalRp !== null) {
          totalRp = parseFloat(res.TotalRp);
        }
        if (res.TotalRp === null) {
          totalRp = 0;
        }
        resolve(totalRp);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanRpSumProductId = (valPersediaanProductId) => {
  const query = queryGetPersediaanRpSumProductId(valPersediaanProductId);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalRp = ``;
        if (res.TotalRp !== null) {
          totalRp = parseFloat(res.TotalRp);
        }
        if (res.TotalRp === null) {
          totalRp = 0;
        }
        resolve(totalRp);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanRpSumSupplierId = (valPersediaanSupplierId) => {
  const query = queryGetPersediaanRpSumSupplierId(valPersediaanSupplierId);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalRp = ``;
        if (res.TotalRp !== null) {
          totalRp = parseFloat(res.TotalRp);
        }
        if (res.TotalRp === null) {
          totalRp = 0;
        }
        resolve(totalRp);
      }
      if (err) {
        reject(err);
      }
    });
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
export const getPersediaanCategoryId = (valPersediaanCategoryId) => {
  const query = queryGetPersediaanCategoryId(valPersediaanCategoryId);
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanSupplierId = (valSupplierId) => {
  const query = queryGetPersediaanSupplierId(valSupplierId);
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanProductId2 = (valPersediaanProductId) => {
  const query = queryGetPersediaanProductId2(valPersediaanProductId);
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanProductReport = () => {
  const query = queryGetPersediaanProductReport();
  return new Promise((resolve, reject) => {
    db.all(query, (err, result) => {
      if (!err) {
        resolve(result);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanProductGroup = () => {
  const query = queryGetPersediaanProductGroup();
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};

export const getPersediaanSupplierGroup = () => {
  const query = queryGetPersediaanSupplierGroup();
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanReport = () => {
  return new Promise((resolve, reject) => {
    db.all(queryGetPersediaanReport(), (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanDate = (valStartDate, valEndDate) => {
  const query = queryGetPersediaanDate(valStartDate, valEndDate);
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanDateSum = (valStartDate, valEndDate) => {
  const query = queryGetPersediaanDateSUM(valStartDate, valEndDate);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalRp = ``;
        if (res.TotalRp !== null) {
          totalRp = parseFloat(res.TotalRp);
        }
        if (res.TotalRp === null) {
          totalRp = 0;
        }
        resolve(totalRp);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanDateQtyProductId = (req) => {
  const { startDateVal, endDateVal, productId } = req;
  const query = queryGetPersediaanDateQtyProductId(
    startDateVal,
    endDateVal,
    productId
  );
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        const result = res.TotalQty !== null;
        let totalQty = ``;
        if (result) {
          totalQty = res.TotalQty;
        }
        if (!result) {
          totalQty = 0;
        }
        resolve(totalQty);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanDateProductId = (req) => {
  const { startDateVal, endDateVal, productId } = req;
  const query = queryGetPersediaanDateProductId(
    startDateVal,
    endDateVal,
    productId
  );
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(res);
      }
    });
  });
};
export const getPersediaanDateSumProduct = (req) => {
  const { startDateVal, endDateVal, productId } = req;
  const query = queryGetPersediaanDateSumProduct(
    startDateVal,
    endDateVal,
    productId
  );
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalRp = ``;
        if (res.TotalRp !== null) {
          totalRp = parseFloat(res.TotalRp);
        }
        if (res.TotalRp === null) {
          totalRp = 0;
        }
        resolve(totalRp);
      }
      if (err) {
        reject(err);
      }
    });
  });
};

export const getPersediaanDateSupplierId = (req) => {
  const { startDateVal, endDateVal, supplierId } = req;
  const query = queryGetPersediaanDateSupplierId(
    startDateVal,
    endDateVal,
    supplierId
  );
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanDateRpSupplierId = (req) => {
  const { startDateVal, endDateVal, supplierId } = req;
  const query = queryGetPersediaanDateRpSupplierId(
    startDateVal,
    endDateVal,
    supplierId
  );
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalRp = ``;
        if (res.TotalRp !== null) {
          totalRp = parseFloat(res.TotalRp);
        }
        if (res.TotalRp === null) {
          totalRp = 0;
        }
        resolve(totalRp);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanDateCategoryId = (req) => {
  const { startDateVal, endDateVal, categoryId } = req;
  const query = queryGetPersediaanDateCategoryId(
    startDateVal,
    endDateVal,
    categoryId
  );
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanDateRpCategoryId = (req) => {
  const { startDateVal, endDateVal, categoryId } = req;
  const query = queryGetPersediaanDateRpCategoryId(
    startDateVal,
    endDateVal,
    categoryId
  );
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        const result = res.TotalRp !== null;
        let totalRp = ``;
        if (result) {
          totalRp = parseFloat(res.TotalRp);
        }
        if (!result) {
          totalRp = 0;
        }
        resolve(totalRp);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanCategoryIdGroup = () => {
  const query = queryGetPersediaanCategoryGroup();
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanSupplierSum = () => {
  const query = queryGetPersediaanSupplierSum();
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalRp = ``;
        if (res.TotalRp !== null) {
          totalRp = parseFloat(res.TotalRp);
        }
        if (res.TotalRp === null) {
          totalRp = 0;
        }
        resolve(totalRp);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanCategorySum = () => {
  const query = queryGetPersediaanCategorySum();
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalRp = ``;
        if (res.TotalRp !== null) {
          totalRp = parseFloat(res.TotalRp);
        }
        if (res.TotalRp === null) {
          totalRp = 0;
        }
        resolve(totalRp);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// references order
export const getPersediaanTotalRow1 = (valSearch, callback) => {
  const query = queryGetPersediaanTotalRow1(valSearch);
  db.each(query, (err, res) => {
    if (!err) {
      const totalProduct = parseInt(res.TotalRow);
      let totalPage;
      let limit = parseInt(3);
      if (totalProduct % limit === 0) {
        totalPage = parseInt(totalProduct / limit);
      } else {
        totalPage = parseInt(totalProduct / limit) + 1;
      }
      return callback(true, { totalProduct, totalPage });
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getPersediaanProductGroup1 = (
  valSearch,
  valLimit,
  valOffset,
  callback
) => {
  const valStartOffset = parseInt((valOffset - 1) * valLimit);
  const query = queryGetPersediaanProductGroup1(
    valSearch,
    valLimit,
    valStartOffset
  );
  db.all(query, (err, res) => {
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
  const valdateNum = isNumeric(valPersediaanQty);
  // 1.validate numeric on valPersediaanQty
  if (!valdateNum) {
    const msg = "Mohon Masukkan Angka di Input Qty";
    return callback(false, msg);
  }
  // 2.get total row by persediaan-product id
  db.each(
    queryGetPersediaanProductRow(valPersediaanProductId),
    (err, response) => {
      if (!err) {
        const stock = parseFloat(response.TotalProduct);
        // only one stock value
        if (stock === 1) {
          if (valPersediaanQty >= 1) {
            executeUpdate(valPersediaanQty);
          }
          if (valPersediaanQty < 1) {
            const msg = `Gagal diperbaharui, Jika ini berhasil diperbaharui maka total stock menjadi ${valPersediaanQty}`;
            return callback(false, msg);
          }
        }
        if (stock > 1) {
          validatePositiveStock();
        }
      }
      if (err) {
        console.error(response);
      }
    }
  );
  // 3. validate available stock value must-be positive
  function validatePositiveStock() {
    const query = queryGetPersediaanQty2(
      valPersediaanId,
      valPersediaanProductId
    );
    db.all(query, (err, rows) => {
      if (!err) {
        const response = parseFloat(rows[0].TotalQty);
        const stock = response + valPersediaanQty >= 0;
        if (stock) {
          executeUpdate(valPersediaanQty);
        }
        if (!stock) {
          const totalQty = valPersediaanQty + response;
          const msg = `Gagal diupdate, Jika Stock ini berhasil diupdate maka Total Stock Produk ini menjadi : 
          ${totalQty}`;
          return callback(false, msg);
        }
      }
      if (err) {
        return callback(false, err);
      }
    });
  }
  // execute update
  function executeUpdate(qtyUpdate) {
    const valPersediaanTotalRp = qtyUpdate * valPersediaanRp;
    const query = queryUpdatePersediaan(
      valPersediaanId,
      valPersediaanDDMY,
      valPersediaanHMS,
      valPersediaanProductId,
      valPersediaanQty,
      valPersediaanTotalRp,
      valPersediaanInfo
    );
    db.run(query, (err) => {
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
    });
  }
};
// 4.DELETE
export const deletePersediaan = (
  valPersediaanId,
  valProductName,
  valPersediaanQty,
  valPersediaanProductId,
  callback
) => {
  console.log(valPersediaanId);
  // 1. get total row product id by persediaan
  db.each(
    queryGetPersediaanProductRow(valPersediaanProductId),
    (err, response) => {
      if (!err) {
        const stock = parseFloat(response.TotalProduct);
        if (stock === 1) {
          if (valPersediaanQty >= 1) {
            executeDelete();
          }
          if (valPersediaanQty < 1) {
            const msg = `Gagal diperbaharui, Jika ini berhasil diperbaharui maka total stock menjadi ${valPersediaanQty}`;
            return callback(false, msg);
          }
        }
        if (stock > 1) {
          validatePositiveStock();
        }
      }
      if (err) {
        console.error(response);
      }
    }
  );
  // 2. validate available stock value must-be positive
  function validatePositiveStock() {
    db.all(
      queryGetPersediaanQty2(valPersediaanId, valPersediaanProductId),
      (err, rows) => {
        if (!err) {
          const response = parseFloat(rows[0].TotalQty);
          const stock = response >= 0;
          if (stock) {
            executeDelete();
          }
          if (!stock) {
            const msg = `Gagal dihapus, Jika Stock ini berhasil dihapus maka Total Stock Produk ini menjadi : ${response}, hapus yang stock pengeluaran terlebih dahulu`;
            return callback(false, msg);
          }
        }
        if (err) {
          return callback(false, err);
        }
      }
    );
  }
  // 3. execute delete
  function executeDelete() {
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
  }
};
export const deletePersediaanAll = (callback) => {
  const query = queryDeletePersediaanAll();
  db.all(query, (err) => {
    if (!err) {
      const msg = "Seluruh Stok berhasil dihapus";
      return callback(true, msg);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const deletePersediaanProductId = (valProductId, callback) => {
  const query = queryDeletePersediaanProductId(valProductId);
  db.run(query, (err) => {
    if (!err) {
      return callback(true, `berhasil hapus product ke - ${valProductId}`);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
