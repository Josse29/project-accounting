import { validateProductAdd, validateQty } from "../../utils/validation.js";
import { createAccounting } from "../accounting/controller.js";
import { createCash } from "../cash/controller.js";
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
  queryGetPersediaanDateSupplierId,
  queryGetPersediaanProductGroup,
  queryGetPersediaanProductGroup1,
  queryGetPersediaanProductId,
  queryGetPersediaanProductId2,
  queryGetPersediaanProductReport,
  queryGetPersediaanProductRow,
  queryGetPersediaanQty,
  queryGetPersediaanQty2,
  queryGetPersediaanQtyDate,
  queryGetPersediaanReport,
  queryGetPersediaanRpSum,
  queryGetPersediaanRpSumCategoryId,
  queryGetPersediaanRpSupplier,
  queryGetPersediaanSupplierGroup,
  queryGetPersediaanSupplierId,
  queryGetPersediaanSupplierSum,
  queryGetPersediaanTotalRow,
  queryGetPersediaanTotalRow1,
  queryInsertPersediaan,
  queryInsertPersediaan1,
  queryUpdatePersediaan,
} from "./querysql.js";
// 1.CREATE
export const createPersediaan = async (req) => {
  const {
    valProductName,
    valPersediaanDDMY,
    valPersediaanHMS,
    valPersediaanProductId,
    valPersediaanQty,
    valPersediaanTotalRp,
    valPersediaanInfo,
  } = req;
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
  // 5.effect to db.acounting credit and debt
  const debtEntry = {
    accountingYMDVal: valPersediaanDDMY,
    accountingHMSVal: valPersediaanHMS,
    accountingRefVal: 113,
    accountingNameVal: `Merchandise Inventory`,
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
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const qty =
          valPersediaanQty >= 1
            ? `+ ${valPersediaanQty}`
            : `- ${Math.abs(valPersediaanQty)}`;
        const msg = `Product - <b class='text-capitalize'>${valProductName} ${qty}</b> has been stored`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const createPersediaan1 = (request) => {
  const query = queryInsertPersediaan1(request);
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = "Stock has been stored";
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// 2.READ
export const getPersediaanPagination = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryGetPersediaanTotalRow(searchVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
export const getPersediaan = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const offsetStartVal = (offsetVal - 1) * limitVal;
  const query = queryGetPersediaan(searchVal, limitVal, offsetStartVal);
  const persediaan = await window.electronAPI.sqliteApi.all(query);
  return persediaan;
};
export const getPersediaanQtyValidate = (req) => {
  const { valProductName, valPersediaanProductId, valPersediaanQty } = req;
  const query = queryGetPersediaanQty(valPersediaanProductId);
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (!err) {
        const res = rows[0];
        const existItem = res.TotalQty >= 1;
        // Produk sudah terdaftar ke tablePersediaan
        if (existItem) {
          // barang masuk
          const stockQty = parseFloat(res.TotalQty);
          if (valPersediaanQty >= 1) {
            resolve();
          }
          // barang keluar
          if (valPersediaanQty < 0) {
            // barang keluar tapi persediaan masih ada
            if (stockQty >= 1) {
              // change min to positive value
              const qtyOutAbs = Math.abs(parseFloat(valPersediaanQty));
              // stock sufficient
              if (qtyOutAbs <= stockQty) {
                resolve();
              }
              // stock unsufficient
              if (qtyOutAbs > stockQty) {
                const msg = `Upppss Sorry, ${valProductName} only available : ${stockQty}`;
                reject(msg);
              }
            }
            // barang keluar tapi persediaan masih kosong
            if (stockQty < 1) {
              const msg = `${valProductName} is still empty....`;
              reject(msg);
            }
          }
        }
        // Produk belum terdaftar ke tablePersediaan
        if (!existItem) {
          // barang masuk
          if (valPersediaanQty >= 1) {
            const msg = `${valProductName} has been added with qty : ${valPersediaanQty}`;
            resolve(msg);
          }
          // barang keluar
          if (valPersediaanQty < 1) {
            const msg = `Upppsss Sorry... ${valProductName} is'nt listed`;
            reject(msg);
          }
        }
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanSumQty = async (valPersediaanProductId) => {
  const query = queryGetPersediaanQty(valPersediaanProductId);
  const sumQty = await window.electronAPI.sqliteApi.each1(query);
  const resSumQty = sumQty.TotalQty ? sumQty.TotalQty : 0;
  return resSumQty;
};
export const getPersediaanSumQtyDate = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetPersediaanQtyDate(startDateVal, endDateVal);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        const response = res.TotalQty;
        const totalQty = response ? response : 0;
        resolve(totalQty);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanSumPrice = async () => {
  const query = queryGetPersediaanRpSum();
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.TotalRp ? sumRp.TotalRp : 0;
  return resSumRp;
};
export const getPersediaanSumPriceCategoryId = async (
  valPersediaanCategoryId
) => {
  const query = queryGetPersediaanRpSumCategoryId(valPersediaanCategoryId);
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.TotalRp ? sumRp.TotalRp : 0;
  return resSumRp;
};
export const getPersediaanProductId = async (valPersediaanProductId) => {
  const query = queryGetPersediaanProductId(valPersediaanProductId);
  const persediaanProduct = await window.electronAPI.sqliteApi.all(query);
  return persediaanProduct;
};
export const getPersediaanCategoryId = async (valPersediaanCategoryId) => {
  const query = queryGetPersediaanCategoryId(valPersediaanCategoryId);
  const persediaanCategory = await window.electronAPI.sqliteApi.all(query);
  return persediaanCategory;
};
export const getPersediaanSupplierId = async (valSupplierId) => {
  const query = queryGetPersediaanSupplierId(valSupplierId);
  const persediaanSupplier = await window.electronAPI.sqliteApi.all(query);
  return persediaanSupplier;
};
export const getPersediaanProductId1 = async (valPersediaanProductId) => {
  const query = queryGetPersediaanProductId2(valPersediaanProductId);
  const persediaanProduct = await window.electronAPI.sqliteApi.all(query);
  return persediaanProduct;
};
export const getPersediaanReport1 = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetPersediaanProductReport(startDateVal, endDateVal);
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
export const getPersediaanGroupProduct1 = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetPersediaanProductGroup(startDateVal, endDateVal);
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

export const getPersediaanGroupSupplier = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetPersediaanSupplierGroup(startDateVal, endDateVal);
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
export const getPersediaanReport = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetPersediaanReport(startDateVal, endDateVal);
  const persediaan = await window.electronAPI.sqliteApi.all(query);
  return persediaan;
};
export const getPersediaanDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetPersediaanDate(startDateVal, endDateVal);
  const persediaanByDate = await window.electronAPI.sqliteApi.all(query);
  return persediaanByDate;
};
export const getPersediaanSumPriceDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetPersediaanDateSUM(startDateVal, endDateVal);
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.TotalRp ? sumRp.TotalRp : 0;
  return resSumRp;
};
export const getPersediaanSumQtyDateProductId = async (req) => {
  const { startDateVal, endDateVal, productId } = req;
  const query = queryGetPersediaanDateQtyProductId(
    startDateVal,
    endDateVal,
    productId
  );
  const sumQty = await window.electronAPI.sqliteApi.each1(query);
  const resSumQty = sumQty.TotalQty ? sumQty.TotalQty : 0;
  return resSumQty;
};
export const getPersediaanDateProductId = async (req) => {
  const { startDateVal, endDateVal, productId } = req;
  const query = queryGetPersediaanDateProductId(
    startDateVal,
    endDateVal,
    productId
  );
  const persediaanByDate = await window.electronAPI.sqliteApi.all(query);
  return persediaanByDate;
};

export const getPersediaanDateSupplierId = async (req) => {
  const { startDateVal, endDateVal, supplierId } = req;
  const query = queryGetPersediaanDateSupplierId(
    startDateVal,
    endDateVal,
    supplierId
  );
  const persediaanByDate = await window.electronAPI.sqliteApi.all(query);
  return persediaanByDate;
};
export const getPersediaanSumPriceDateSupplierId = async (req) => {
  const { startDateVal, endDateVal, supplierId } = req;
  const query = queryGetPersediaanDateRpSupplierId(
    startDateVal,
    endDateVal,
    supplierId
  );
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.TotalRp ? sumRp.TotalRp : 0;
  return resSumRp;
};
export const getPersediaanDateCategoryId = async (req) => {
  const { startDateVal, endDateVal, categoryId } = req;
  const query = queryGetPersediaanDateCategoryId(
    startDateVal,
    endDateVal,
    categoryId
  );
  const persediaanByDate = await window.electronAPI.sqliteApi.all(query);
  return persediaanByDate;
};
export const getPersediaanSumPriceDateCategoryId = async (req) => {
  const { startDateVal, endDateVal, categoryId } = req;
  const query = queryGetPersediaanDateRpCategoryId(
    startDateVal,
    endDateVal,
    categoryId
  );
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.TotalRp ? sumRp.TotalRp : 0;
  return resSumRp;
};
export const getPersediaanGroupCategory = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetPersediaanCategoryGroup(startDateVal, endDateVal);
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
export const getPersediaanSumPriceSupplier = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetPersediaanSupplierSum(startDateVal, endDateVal);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        const response = res.TotalRp;
        const totalRp = response ? response : 0;
        resolve(totalRp);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanSumPriceSupplierId = async (supplierId) => {
  const query = queryGetPersediaanRpSupplier(supplierId);
  const sumRp = await window.electronAPI.sqliteApi.each1(query);
  const resSumRp = sumRp.TotalRp ? sumRp.TotalRp : 0;
  return resSumRp;
};
export const getPersediaanSumPriceCategory = (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryGetPersediaanCategorySum(startDateVal, endDateVal);
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
export const getPersediaanPagination1 = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryGetPersediaanTotalRow1(searchVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
export const getPersediaanGroupProduct = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = parseInt((offsetVal - 1) * limitVal);
  const query = queryGetPersediaanProductGroup1(
    searchVal,
    limitVal,
    startOffsetVal
  );
  const persedianProductGroup = await window.electronAPI.sqliteApi.all(query);
  return persedianProductGroup;
};
// 3.UPDATE
export const updatePersediaan = async (req) => {
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
export const validateStock1 = (
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
export const deletePersediaan = async (req) => {
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
  return new Promise((resolve, reject) => {
    db.run(queryDeletePersediaan(valPersediaanId), (err) => {
      if (!err) {
        const qty =
          valPersediaanQty >= 1
            ? `+ ${valPersediaanQty}`
            : `- ${Math.abs(valPersediaanQty)}`;
        const msg = `Stock Product <b class='text-capitalize'>${valProductName} ${qty}</b> has been deleted`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const checkProductRow = (valPersediaanProductId) => {
  const query = queryGetPersediaanProductRow(valPersediaanProductId);
  return new Promise((resolve, reject) => {
    db.each(query, (err, response) => {
      if (!err) {
        const totalRow = parseFloat(response.TotalRow);
        resolve(totalRow);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const validateStock3 = (valPersediaanId, valPersediaanProductId) => {
  const query = queryGetPersediaanQty2(valPersediaanId, valPersediaanProductId);
  return new Promise((resolve, reject) => {
    db.each(query, (err, rows) => {
      if (!err) {
        const response = parseFloat(rows.TotalQty);
        const positiveStock = response >= 0;
        if (positiveStock) {
          resolve();
        }
        if (!positiveStock) {
          const msg = `Failed to delete, If Succeed to delete, The total Stock is : ${response}`;
          reject(msg);
        }
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const deletePersediaanAll = () => {
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
export const deletePersediaanProductId = (valProductId) => {
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
export const deletePersediaanCategoryId = (categoryId) => {
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
