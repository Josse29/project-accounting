import db from "../../database/config.js";
import {
  validateLoadImg,
  validateSupplierName,
} from "../../utils/validation.js";
import {
  queryDeleteSupplier,
  queryGetListSupplier,
  queryGetSupplier,
  queryInsertSupplier,
  queryTotalRowSupplier,
  queryUpdateSupplier,
} from "./querysql.js";

// 1.CREATE
export const createSupplier = async (req) => {
  const { supplierName, supplierInfo, supplierImg } = req;
  // 1.validate name
  validateSupplierName(supplierName);
  // 2. validateImg
  const imgBase64 = await validateLoadImg(supplierImg);
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
  const query = queryGetSupplier(searchVal, limitVal, startOffset);
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
export const getSupplierInit = (req) => {
  const { searchVal, limitVal } = req;
  const query = queryTotalRowSupplier(searchVal);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalPage;
        let totalRow = parseInt(res.TOTAL_ROW);
        const isEven = totalRow % limitVal === 0;
        if (isEven) {
          totalPage = totalRow / limitVal;
        }
        if (!isEven) {
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
export const updateSupplier = async (req) => {
  const {
    supplierId,
    supplierName,
    supplierInfo,
    supplierImgVal,
    supplierCancelImg,
  } = req;
  // 1.validate name
  validateSupplierName(supplierName);
  // 2. validateImg
  const imgBase64 = await validateLoadImg(supplierImgVal);
  const query = queryUpdateSupplier(
    supplierId,
    supplierName,
    supplierInfo,
    imgBase64,
    supplierCancelImg
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
export const deleteSupplier = (req) => {
  const { supplierId, supplierName } = req;
  const query = queryDeleteSupplier(supplierId);
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
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
