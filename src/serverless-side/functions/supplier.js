import db from "../database/config.js";
import { validateImg, validateSupplierName } from "../etc/validation.js";
import {
  queryDeleteSupplier,
  queryGetListSupplier,
  queryGetSupplier,
  queryInsertSupplier,
  queryTotalRowSupplier,
  queryUpdateSupplier,
} from "../querysql/supplier.js";

// 1.CREATE
export const createSupplier = (req) => {
  const { supplierName, supplierInfo, supplierImg } = req;
  // 1.validate name
  validateSupplierName(supplierName);
  // 2. validateImg
  validateImg(supplierImg);
  // 3.execute
  const query = queryInsertSupplier(supplierName, supplierInfo, imgBase64);
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = `Supplier <b class='text-capitalize'>${supplierName}</b> has been added`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
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
export const getListSupplier = (supplierSearch) => {
  const query = queryGetListSupplier(supplierSearch);
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
// 3.UPDATE
export const updateSupplier = (req) => {
  const { supplierId, supplierName, supplierInfo, supplierImgVal, imgBase64 } =
    req;
  // 1.validate name
  validateSupplierName(supplierName);
  // 2. validateImg
  validateImg(supplierImgVal);
  const query = queryUpdateSupplier(
    supplierId,
    supplierName,
    supplierInfo,
    imgBase64
  );
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = `Supplier <b>${supplierName}</b> has been updated`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// 4.DELETE
export const deleteSupplier = (supplierId, supplierName) => {
  return new Promise((resolve, reject) => {
    db.run(queryDeleteSupplier(supplierId), (err) => {
      if (!err) {
        const msg = `Supplier <b class= 'text-capitalize'>${supplierName}</b> has been deleted`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
