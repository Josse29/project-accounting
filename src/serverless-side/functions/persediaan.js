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
export const getPersediaanQty = (valPersediaanProductId, callback) => {
  db.each(queryGetPersediaanQty(valPersediaanProductId), (err, res) => {
    if (!err) {
      return callback(true, res.TotalQty);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getPersediaanRpSum = (callback) => {
  db.each(queryGetPersediaanRpSum(), (err, res) => {
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
export const getPersediaanRpSumCategoryId = (
  valPersediaanCategoryId,
  callback
) => {
  db.each(
    queryGetPersediaanRpSumCategoryId(valPersediaanCategoryId),
    (err, res) => {
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
    }
  );
};
export const getPersediaanRpSumProductId = (
  valPersediaanProductId,
  callback
) => {
  db.each(
    queryGetPersediaanRpSumProductId(valPersediaanProductId),
    (err, res) => {
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
    }
  );
};
export const getPersediaanRpSumSupplierId = (
  valPersediaanSupplierId,
  callback
) => {
  db.each(
    queryGetPersediaanRpSumSupplierId(valPersediaanSupplierId),
    (err, res) => {
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
    }
  );
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
export const getPersediaanCategoryId = (valPersediaanCategoryId, callback) => {
  db.all(queryGetPersediaanCategoryId(valPersediaanCategoryId), (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(true, err);
    }
  });
};
export const getPersediaanSupplierId = (valSupplierId, callback) => {
  db.all(queryGetPersediaanSupplierId(valSupplierId), (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(true, err);
    }
  });
};
export const getPersediaanProductId2 = (valPersediaanProductId, callback) => {
  db.all(queryGetPersediaanProductId2(valPersediaanProductId), (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(true, err);
    }
  });
};
export const getPersediaanProductReport = (callback) => {
  db.all(queryGetPersediaanProductReport(), (err, result) => {
    if (!err) {
      return callback(true, result);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getPersediaanProductGroup = (callback) => {
  db.all(queryGetPersediaanProductGroup(), (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(true, err);
    }
  });
};

export const getPersediaanSupplierGroup = (callback) => {
  db.all(queryGetPersediaanSupplierGroup(), (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getPersediaanReport = (callback) => {
  db.all(queryGetPersediaanReport(), (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(true, err);
    }
  });
};
export const getPersediaanDate = (valStartDate, valEndDate, callback) => {
  const query = queryGetPersediaanDate(valStartDate, valEndDate);
  db.all(query, (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getPersediaanDateSum = (valStartDate, valEndDate, callback) => {
  const query = queryGetPersediaanDateSUM(valStartDate, valEndDate);
  db.each(query, (err, res) => {
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
export const getPersediaanDateQtyProductId = (
  valStartDate,
  valEndDate,
  valProductId,
  callback
) => {
  const query = queryGetPersediaanDateQtyProductId(
    valStartDate,
    valEndDate,
    valProductId
  );
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
      return callback(true, totalQty);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getPersediaanDateProductId = (
  valStartDate,
  valEndDate,
  valProductId,
  callback
) => {
  const query = queryGetPersediaanDateProductId(
    valStartDate,
    valEndDate,
    valProductId
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
export const getPersediaanDateSumProduct = (
  valStartDate,
  valEndDate,
  valProductId,
  callback
) => {
  const query = queryGetPersediaanDateSumProduct(
    valStartDate,
    valEndDate,
    valProductId
  );
  db.each(query, (err, res) => {
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
export const getPersediaanDateSupplierId = (
  valStartDate,
  valEndDate,
  valSupplierId,
  callback
) => {
  const query = queryGetPersediaanDateSupplierId(
    valStartDate,
    valEndDate,
    valSupplierId
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
export const getPersediaanDateRpSupplierId = (
  startDate,
  endDate,
  valSupplierId,
  callback
) => {
  const query = queryGetPersediaanDateRpSupplierId(
    startDate,
    endDate,
    valSupplierId
  );
  db.each(query, (err, res) => {
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
      return callback(false, console.error(err));
    }
  });
};
export const getPersediaanDateCategoryId = (
  startDate,
  endDate,
  categoryId,
  callback
) => {
  const query = queryGetPersediaanDateCategoryId(
    startDate,
    endDate,
    categoryId
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
export const getPersediaanDateRpCategoryId = (
  startDate,
  endDate,
  categoryId,
  callback
) => {
  const query = queryGetPersediaanDateRpCategoryId(
    startDate,
    endDate,
    categoryId
  );
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
      return callback(true, totalRp);
    }
    if (err) {
      return callback(true, err);
    }
  });
};
export const getPersediaanCategoryIdGroup = (callback) => {
  const query = queryGetPersediaanCategoryGroup();
  db.all(query, (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(true, err);
    }
  });
};
export const getPersediaanSupplierSum = (callback) => {
  const query = queryGetPersediaanSupplierSum();
  db.each(query, (err, res) => {
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
export const getPersediaanCategorySum = (callback) => {
  const query = queryGetPersediaanCategorySum();
  db.each(query, (err, res) => {
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
