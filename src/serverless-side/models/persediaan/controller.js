import {
  queryDeletePersediaan,
  queryDeletePersediaanAll,
  queryDeletePersediaanProductId,
  queryGetPersediaan,
  queryGetPersediaanCategoryId,
  queryGetPersediaanDate,
  queryGetPersediaanDateCategoryId,
  queryGetPersediaanDateProductId,
  queryGetPersediaanDateSupplierId,
  queryGetPersediaanGroupCategory,
  queryGetPersediaanGroupProduct,
  queryGetPersediaanGroupProduct1,
  queryGetPersediaanGroupSupplier,
  queryGetPersediaanPagination,
  queryGetPersediaanPagination1,
  queryGetPersediaanProductId,
  queryGetPersediaanProductId1,
  queryGetPersediaanProductRow,
  queryGetPersediaanQty2,
  queryGetPersediaanReport,
  queryGetPersediaanReport1,
  queryGetPersediaanSumPrice,
  queryGetPersediaanSumPriceCategoryId,
  queryGetPersediaanSumPriceDate,
  queryGetPersediaanSumPriceDateCategoryId,
  queryGetPersediaanSumPriceDateSupplierId,
  queryGetPersediaanSumPriceSupplierId,
  queryGetPersediaanSumQty,
  queryGetPersediaanSumQtyDateProductId,
  queryGetPersediaanSupplierId,
  queryInsertPersediaan,
  queryInsertPersediaan1,
  queryUpdatePersediaan,
} from "./querysql.js";
import {
  validateDate,
  validateProductAdd,
  validateQty,
} from "../../utils/validation.js";
import { createAccounting } from "../accounting/controller.js";
import { createCash } from "../cash/controller.js";

// 1.CREATE
const createPersediaan = async (req) => {
  const {
    valProductName,
    valPersediaanDDMY,
    valPersediaanHMS,
    valPersediaanProductId,
    valPersediaanQty,
    valPersediaanTotalRp,
    valPersediaanInfo,
  } = req;
  // dont make valPersediaanTotalRp this
  // 1.validate product exist
  validateProductAdd(valPersediaanProductId);
  // 2.validate numeric on valPersediaanQty
  validateQty(valPersediaanQty);
  // 3.validate qty product
  await getPersediaanQtyValidate(req);
  // 4.effect to db.cash
  const qty =
    valPersediaanQty >= 1
      ? `+ ${valPersediaanQty}`
      : `- ${Math.abs(valPersediaanQty)}`;
  const reqCash = {
    CashYYYYMMDDVal: valPersediaanDDMY,
    CashHMSVal: valPersediaanHMS,
    CashNameVal: `Merchandise Inventory - ${valProductName}`,
    CashRpVal: valPersediaanTotalRp * -1,
    CashInfoVal: `${valProductName} has been stored ${qty}`,
  };
  await createCash(reqCash);
  // 5.effect to db.acounting debt and credit
  const debtEntry = {
    accountingYMDVal: valPersediaanDDMY,
    accountingHMSVal: valPersediaanHMS,
    accountingRefVal: 113,
    accountingNameVal: `Merchandise Inventory ${valProductName}`,
    accountingDebtVal: valPersediaanTotalRp,
    accountingCreditVal: 0,
    accountingInfoVal: `${valProductName} has been stored ${qty}`,
  };
  await createAccounting(debtEntry);
  const creditEntry = {
    accountingYMDVal: valPersediaanDDMY,
    accountingHMSVal: valPersediaanHMS,
    accountingRefVal: 111,
    accountingNameVal: "Cash",
    accountingDebtVal: 0,
    accountingCreditVal: valPersediaanTotalRp,
    accountingInfoVal: `${valProductName} has been stored ${qty}`,
  };
  await createAccounting(creditEntry);

  // execute insert
  const query = queryInsertPersediaan(
    valPersediaanDDMY,
    valPersediaanHMS,
    valPersediaanProductId,
    valPersediaanQty,
    valPersediaanTotalRp,
    valPersediaanInfo
  );
  const msg = `Product - <b class='text-capitalize'>${valProductName} ${qty}</b> has been stored`;
  const created = await window.electronAPI.sqliteApi.run(query, msg);
  return created;
};
const createPersediaan1 = async (request) => {
  const query = queryInsertPersediaan1(request);
  const msg = "Stock has been stored";
  const created = await window.electronAPI.sqliteApi.run(query, msg);
  return created;
};
// 2.READ
const getPersediaanPagination = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryGetPersediaanPagination(searchVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
const getPersediaan = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const offsetStartVal = (offsetVal - 1) * limitVal;
  const query = queryGetPersediaan(searchVal, limitVal, offsetStartVal);
  const persediaan = await window.electronAPI.sqliteApi.all(query);
  return persediaan;
};
const getPersediaanQtyValidate = async (req) => {
  const { valProductName, valPersediaanProductId, valPersediaanQty } = req;
  const query = queryGetPersediaanSumQty(valPersediaanProductId);
  const response = await window.electronAPI.sqliteApi.each1(query);
  const stockQty = response.TotalQty;
  const existItem = stockQty >= 1;
  // Produk has listed
  if (existItem) {
    if (valPersediaanQty < 0) {
      // change min to positive value
      const qtyOutAbs = Math.abs(parseFloat(valPersediaanQty));
      // stock unsufficient
      if (qtyOutAbs > stockQty) {
        const msg = `Upppss Sorry, ${valProductName} only available : ${stockQty}`;
        throw new Error(msg);
      }
    }
  }
  // Product hasn't listed yet
  if (!existItem) {
    // goods out but stock still existed
    if (valPersediaanQty < 1) {
      const msg = `Upppsss Sorry... ${valProductName} isn't listed yet`;
      throw new Error(msg);
    }
  }
};
const getPersediaanSumQty = async (valPersediaanProductId) => {
  const query = queryGetPersediaanSumQty(valPersediaanProductId);
  const sumQty = await window.electronAPI.sqliteApi.each1(query);
  const resSumQty = sumQty.TotalQty ? sumQty.TotalQty : 0;
  return resSumQty;
};
const getPersediaanSumPrice = async () => {
  const query = queryGetPersediaanSumPrice();
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.TotalRp ? sumRp.TotalRp : 0;
  return resSumRp;
};
const getPersediaanSumPriceCategoryId = async (valPersediaanCategoryId) => {
  const query = queryGetPersediaanSumPriceCategoryId(valPersediaanCategoryId);
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.TotalRp ? sumRp.TotalRp : 0;
  return resSumRp;
};
const getPersediaanProductId = async (valPersediaanProductId) => {
  const query = queryGetPersediaanProductId(valPersediaanProductId);
  const persediaanProduct = await window.electronAPI.sqliteApi.all(query);
  return persediaanProduct;
};
const getPersediaanCategoryId = async (valPersediaanCategoryId) => {
  const query = queryGetPersediaanCategoryId(valPersediaanCategoryId);
  const persediaanCategory = await window.electronAPI.sqliteApi.all(query);
  return persediaanCategory;
};
const getPersediaanSupplierId = async (valSupplierId) => {
  const query = queryGetPersediaanSupplierId(valSupplierId);
  const persediaanSupplier = await window.electronAPI.sqliteApi.all(query);
  return persediaanSupplier;
};
const getPersediaanProductId1 = async (valPersediaanProductId) => {
  const query = queryGetPersediaanProductId1(valPersediaanProductId);
  const persediaanProduct = await window.electronAPI.sqliteApi.all(query);
  return persediaanProduct;
};
const getPersediaanReport1 = async (req) => {
  const { startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  const query = queryGetPersediaanReport1(startDateVal, endDateVal);
  const persediaan = await window.electronAPI.sqliteApi.all(query);
  return persediaan;
};
const getPersediaanGroupProduct1 = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetPersediaanGroupProduct1(startDateVal, endDateVal);
  const persediaan = await window.electronAPI.sqliteApi.all(query);
  return persediaan;
};
const getPersediaanGroupSupplier = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetPersediaanGroupSupplier(startDateVal, endDateVal);
  const persediaanSupplier = await window.electronAPI.sqliteApi.all(query);
  return persediaanSupplier;
};
const getPersediaanReport = async (req) => {
  const { startDateVal, endDateVal } = req;
  // validate date
  validateDate(startDateVal, endDateVal);
  const query = queryGetPersediaanReport(startDateVal, endDateVal);
  const persediaan = await window.electronAPI.sqliteApi.all(query);
  return persediaan;
};
const getPersediaanDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  const query = queryGetPersediaanDate(startDateVal, endDateVal);
  const persediaanByDate = await window.electronAPI.sqliteApi.all(query);
  return persediaanByDate;
};
const getPersediaanSumPriceDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetPersediaanSumPriceDate(startDateVal, endDateVal);
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.TotalRp ? sumRp.TotalRp : 0;
  return resSumRp;
};
const getPersediaanSumQtyDateProductId = async (req) => {
  const { startDateVal, endDateVal, productId } = req;
  const query = queryGetPersediaanSumQtyDateProductId(
    startDateVal,
    endDateVal,
    productId
  );
  const sumQty = await window.electronAPI.sqliteApi.each1(query);
  const resSumQty = sumQty.TotalQty ? sumQty.TotalQty : 0;
  return resSumQty;
};
const getPersediaanDateProductId = async (req) => {
  const { startDateVal, endDateVal, productId } = req;
  const query = queryGetPersediaanDateProductId(
    startDateVal,
    endDateVal,
    productId
  );
  const persediaanByDate = await window.electronAPI.sqliteApi.all(query);
  return persediaanByDate;
};
const getPersediaanDateSupplierId = async (req) => {
  const { startDateVal, endDateVal, supplierId } = req;
  const query = queryGetPersediaanDateSupplierId(
    startDateVal,
    endDateVal,
    supplierId
  );
  const persediaanByDate = await window.electronAPI.sqliteApi.all(query);
  return persediaanByDate;
};
const getPersediaanSumPriceDateSupplierId = async (req) => {
  const { startDateVal, endDateVal, supplierId } = req;
  const query = queryGetPersediaanSumPriceDateSupplierId(
    startDateVal,
    endDateVal,
    supplierId
  );
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.TotalRp ? sumRp.TotalRp : 0;
  return resSumRp;
};
const getPersediaanDateCategoryId = async (req) => {
  const { startDateVal, endDateVal, categoryId } = req;
  const query = queryGetPersediaanDateCategoryId(
    startDateVal,
    endDateVal,
    categoryId
  );
  const persediaanByDate = await window.electronAPI.sqliteApi.all(query);
  return persediaanByDate;
};
const getPersediaanSumPriceDateCategoryId = async (req) => {
  const { startDateVal, endDateVal, categoryId } = req;
  const query = queryGetPersediaanSumPriceDateCategoryId(
    startDateVal,
    endDateVal,
    categoryId
  );
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.TotalRp ? sumRp.TotalRp : 0;
  return resSumRp;
};
const getPersediaanGroupCategory = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetPersediaanGroupCategory(startDateVal, endDateVal);
  const persediaanGroupCategory = await window.electronAPI.sqliteApi.all(query);
  return persediaanGroupCategory;
};
const getPersediaanSumPriceSupplierId = async (supplierId) => {
  const query = queryGetPersediaanSumPriceSupplierId(supplierId);
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.TotalRp ? sumRp.TotalRp : 0;
  return resSumRp;
};
const getPersediaanPagination1 = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryGetPersediaanPagination1(searchVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
const getPersediaanGroupProduct = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = parseInt((offsetVal - 1) * limitVal);
  const query = queryGetPersediaanGroupProduct(
    searchVal,
    limitVal,
    startOffsetVal
  );
  const persedianProductGroup = await window.electronAPI.sqliteApi.all(query);
  return persedianProductGroup;
};
// 3.UPDATE
const updatePersediaan = async (req) => {
  const {
    valPersediaanId,
    valPersediaanDDMY,
    valPersediaanHMS,
    valPersediaanProductId,
    valPersediaanQty,
    valPersediaanTotalRp,
    valPersediaanInfo,
    valProductName,
  } = req;
  // 1.validate numeric on valPersediaanQty
  validateQty(valPersediaanQty);
  // 2.check product row and product qty, suit the condition
  const productRow = await checkProductRow(valPersediaanProductId);
  // 3.count all product except the product that will be deleted, make sure positive stock
  if (productRow > 1) {
    await validateStock1(
      valPersediaanId,
      valPersediaanProductId,
      valPersediaanQty
    );
  }
  // if only one product row and stock value < 1 it doesn't allow
  if ((productRow === 1) & (valPersediaanQty < 1)) {
    const msg = "Please Update Qty with postive value";
    throw new Error(msg);
  }
  // execute update
  const query = queryUpdatePersediaan(
    valPersediaanId,
    valPersediaanDDMY,
    valPersediaanHMS,
    valPersediaanProductId,
    valPersediaanQty,
    valPersediaanTotalRp,
    valPersediaanInfo
  );
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const qty =
          valPersediaanQty >= 1
            ? `+ ${valPersediaanQty}`
            : `- ${Math.abs(valPersediaanQty)}`;
        const msg = `Product <b class='text-capitalize'>${valProductName} ${qty}</b> has been Updated`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
const validateStock1 = (
  valPersediaanId,
  valPersediaanProductId,
  valPersediaanQty
) => {
  const query = queryGetPersediaanQty2(valPersediaanId, valPersediaanProductId);
  return new Promise((resolve, reject) => {
    db.each(query, (err, rows) => {
      if (!err) {
        const response = parseFloat(rows.TotalQty);
        const totalStockUpdated = response + valPersediaanQty;
        const positiveStock = totalStockUpdated >= 0;
        if (positiveStock) {
          resolve();
        }
        if (!positiveStock) {
          const msg = `Failed to Update, If Succeed to Update, The Total Stock is : 
          ${totalStockUpdated}`;
          reject(msg);
        }
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// 4.DELETE
const deletePersediaan = async (req) => {
  const {
    valPersediaanId,
    valProductName,
    valPersediaanQty,
    valPersediaanProductId,
  } = req;
  // check product row and product qty, suit the condition
  const productRow = await checkProductRow(valPersediaanProductId);
  // count all product except  the product that will be deleted, make sure positive stock
  if (productRow > 1) {
    await validateStock3(valPersediaanId, valPersediaanProductId);
  }
  // 3. execute delete
  const query = queryDeletePersediaan(valPersediaanId);
  const qty =
    valPersediaanQty >= 1
      ? `+ ${valPersediaanQty}`
      : `- ${Math.abs(valPersediaanQty)}`;
  const msg = `Stock Product <b class='text-capitalize'>${valProductName} ${qty}</b> has been deleted`;
  const deleted = await window.electronAPI.sqliteApi.run(query, msg);
  return deleted;
};
const checkProductRow = async (valPersediaanProductId) => {
  const query = queryGetPersediaanProductRow(valPersediaanProductId);
  const response = await window.electronAPI.sqliteApi.each1(query);
  const totalRow = response.TotalRow;
  return totalRow;
};
const validateStock3 = async (valPersediaanId, valPersediaanProductId) => {
  const query = queryGetPersediaanQty2(valPersediaanId, valPersediaanProductId);
  const response = await window.electronAPI.sqliteApi.each1(query);
  const positiveStock = response.TotalQty >= 0;
  if (positiveStock) {
    return true;
  }
  if (!positiveStock) {
    const msg = `Failed to delete, If Succeed to delete, The total Stock is : ${response}`;
    throw new Error(msg);
  }
};
const deletePersediaanAll = () => {
  const query = queryDeletePersediaanAll();
  return new Promise((resolve, reject) => {
    db.all(query, (err) => {
      if (!err) {
        const msg = "All Stock Has been Deleted ";
        resolve(msg);
      }
      if (err) {
        reject(msg);
      }
    });
  });
};
const deletePersediaanProductId = (valProductId) => {
  const query = queryDeletePersediaanProductId(valProductId);
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        resolve();
      }
      if (err) {
        reject(err);
      }
    });
  });
};
const deletePersediaanCategoryId = (categoryId) => {
  const query = queryDeletePersediaanProductId(categoryId);
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        resolve();
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export {
  createPersediaan,
  createPersediaan1,
  deletePersediaan,
  deletePersediaanAll,
  deletePersediaanProductId,
  getPersediaan,
  getPersediaanCategoryId,
  getPersediaanDate,
  getPersediaanDateCategoryId,
  getPersediaanDateProductId,
  getPersediaanDateSupplierId,
  getPersediaanGroupCategory,
  getPersediaanGroupProduct,
  getPersediaanGroupProduct1,
  getPersediaanGroupSupplier,
  getPersediaanPagination,
  getPersediaanPagination1,
  getPersediaanProductId,
  getPersediaanProductId1,
  getPersediaanReport,
  getPersediaanReport1,
  getPersediaanSumPrice,
  getPersediaanSumPriceCategoryId,
  getPersediaanSumPriceDate,
  getPersediaanSumPriceDateCategoryId,
  getPersediaanSumPriceDateSupplierId,
  getPersediaanSumPriceSupplierId,
  getPersediaanSumQty,
  getPersediaanSumQtyDateProductId,
  getPersediaanSupplierId,
  updatePersediaan,
};
