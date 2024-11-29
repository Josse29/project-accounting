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
  const msg = `Supplier <b class='text-capitalize'>${supplierName}</b> has been added`;
  const created = await window.electronAPI.sqliteApi.run(query, msg);
  return created;
};
// 2.READ
export const getSupplier = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffset = (offsetVal - 1) * limitVal;
  const query = queryGetSupplier(searchVal, limitVal, startOffset);
  const suppliers = await window.electronAPI.sqliteApi.all(query);
  return suppliers;
};
export const getSupplierInit = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryTotalRowSupplier(searchVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
export const getSupplierList = async (supplierSearch) => {
  const query = queryGetListSupplier(supplierSearch);
  const suppliers = await window.electronAPI.sqliteApi.all(query);
  return suppliers;
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
  const msg = `Supplier <b>${supplierName}</b> has been updated`;
  const updated = await window.electronAPI.sqliteApi.run(query, msg);
  return updated;
};
// 4.DELETE
export const deleteSupplier = async (req) => {
  const { supplierId, supplierName } = req;
  const query = queryDeleteSupplier(supplierId);
  const msg = `Supplier <b class= 'text-capitalize'>${supplierName}</b> has been deleted`;
  const deleted = await window.electronAPI.sqliteApi.run(query, msg);
  return deleted;
};
