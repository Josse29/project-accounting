import {
  queryDeleteSupplier,
  queryGetListSupplier,
  queryGetSupplier,
  queryInsertSupplier,
  queryTotalRowSupplier,
  queryUpdateSupplier,
} from "../querysql/supplier.js";

// 1.CREATE
export const createSupplier = (
  supplierName,
  supplierInfo,
  supplierImg,
  callback
) => {
  db.run(
    queryInsertSupplier(supplierName, supplierInfo, supplierImg),
    (err) => {
      if (!err) {
        return callback(
          true,
          `Supplier <b class='text-capitalize'>${supplierName}</b> berhasil ditambahkan`
        );
      }
      if (err) {
        return callback(false, err);
      }
    }
  );
};
// 2.READ
export const getSupplier = (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffset = (offsetVal - 1) * limitVal;
  return new Promise((resolve, reject) => {
    db.all(queryGetSupplier(searchVal, limitVal, startOffset), (err, res) => {
      if (!err) {
        resolve(res);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getTotalRowSupplier = (supplierSearch, callback) => {
  db.each(queryTotalRowSupplier(supplierSearch), (err, res) => {
    if (!err) {
      const totalSupplier = parseInt(res.TOTAL_ROW);
      return callback(true, totalSupplier);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getSupplierInit = (req) => {
  const { searchVal, limitVal } = req;
  const query = queryTotalRowSupplier(searchVal);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalPage;
        let totalRow = parseInt(res.TOTAL_ROW);
        if (totalRow % limitVal === 0) {
          totalPage = totalRow / limitVal;
        }
        if (totalRow % limitVal !== 0) {
          totalPage = parseInt(totalRow / limitVal) + 1;
        }
        resolve({ totalRow, totalPage });
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getListSupplier = (supplierSearch, callback) => {
  db.all(queryGetListSupplier(supplierSearch), (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
// 3.UPDATE
export const updateSupplier = (
  supplierId,
  supplierName,
  supplierInfo,
  supplierImg,
  callback
) => {
  db.run(
    queryUpdateSupplier(supplierId, supplierName, supplierInfo, supplierImg),
    (err) => {
      if (!err) {
        return callback(
          true,
          `Supplier <b>${supplierName}</b> berhasil diperbaharui`
        );
      }
      if (err) {
        return callback(false, err);
      }
    }
  );
};
// 4.DELETE
export const deleteSupplier = (supplierId, supplierName, callback) => {
  db.run(queryDeleteSupplier(supplierId), (err) => {
    if (!err) {
      return callback(
        true,
        `Supplier <b class= 'text-capitalize'>${supplierName}</b> berhasil dihapus`
      );
    }
    if (err) {
      return callback(false, err);
    }
  });
};
