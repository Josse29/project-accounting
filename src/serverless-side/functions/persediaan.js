import { formatQty1 } from "../../client-side/js/utils/formatQty.js";
import { isNumeric } from "../etc/regex.js";
import { validateProductAdd, validateQty } from "../etc/validation.js";
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
export const createPersediaan = async (req) => {
  const {
    valProductName,
    valPersediaanDDMY,
    valPersediaanHMS,
    valPersediaanProductId,
    valPersediaanQty,
    valPersediaanRp,
    valPersediaanInfo,
  } = req;
  // 1.validate product exist
  validateProductAdd(valPersediaanProductId);
  // 2.validate numeric on valPersediaanQty
  validateQty(valPersediaanQty);
  // 3.validate qty product
  await getPersediaanQtyValidate(req);
  // execute insert
  const valPersediaanTotalRp = valPersediaanQty * valPersediaanRp;
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
        const msg = `Product - <b class='text-capitalize'>${valProductName} ${formatQty1(
          valPersediaanQty
        )}</b> has been stored`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// while selling , it's effect the stock
export const createPersediaan1 = (request) => {
  const {
    PersediaanYMDVal,
    PersediaanHMSVal,
    PersediaanQtyVal,
    PersediaanTotalVal,
    PersediaanInfoVal,
    PersediaanProductIdVal,
    PersediaanPersonIdVal,
  } = request;
  const query = queryInsertPersediaan1(
    PersediaanYMDVal,
    PersediaanHMSVal,
    PersediaanQtyVal,
    PersediaanTotalVal,
    PersediaanInfoVal,
    PersediaanProductIdVal,
    PersediaanPersonIdVal
  );
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = "berhasil";
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
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
export const getPersediaanProductId = (valPersediaanProductId) => {
  const query = queryGetPersediaanProductId(valPersediaanProductId);
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
export const getPersediaanTotalRow1 = (req) => {
  const { searchVal, limitVal } = req;
  const query = queryGetPersediaanTotalRow1(searchVal);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalPage;
        const totalRow = parseInt(res.TotalRow);
        if (totalRow % limitVal === 0) {
          totalPage = parseInt(totalRow / limitVal);
        } else {
          totalPage = parseInt(totalRow / limitVal) + 1;
        }
        resolve({ totalPage, totalRow });
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const getPersediaanProductGroup1 = (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = parseInt((offsetVal - 1) * limitVal);
  const query = queryGetPersediaanProductGroup1(
    searchVal,
    limitVal,
    startOffsetVal
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
// 3.UPDATE
export const updatePersediaan = async (req) => {
  const {
    valPersediaanId,
    valPersediaanDDMY,
    valPersediaanHMS,
    valPersediaanProductId,
    valPersediaanQty,
    valPersediaanRp,
    valPersediaanInfo,
    valProductName,
  } = req;
  // 1.validate numeric on valPersediaanQty
  validateQty(valPersediaanQty);
  // assure more than 1 row
  await validateStock(valPersediaanProductId, valPersediaanQty);
  // 3. validate available stock value must-be positive
  await validateStock1(
    valPersediaanId,
    valPersediaanProductId,
    valPersediaanQty
  );
  // execute update
  const valPersediaanTotalRp = valPersediaanQty * valPersediaanRp;
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
        const msg = `Product <b class='text-capitalize'>${valProductName} ${formatQty1(
          valPersediaanQty
        )}</b> has been Updated`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const validateStock = (valPersediaanProductId, valPersediaanQty) => {
  const query = queryGetPersediaanProductRow(valPersediaanProductId);
  return new Promise((resolve, reject) => {
    db.each(query, (err, response) => {
      if (!err) {
        const stock = parseFloat(response.TotalProduct);
        // only one stock value
        if (stock === 1) {
          if (valPersediaanQty >= 1) {
            resolve();
          }
          if (valPersediaanQty < 1) {
            const msg = `Failed to update, If Succeed to update, The total stock is ${valPersediaanQty}`;
            reject(msg);
          }
        }
        if (stock > 1) {
          resolve();
        }
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
    db.all(query, (err, rows) => {
      if (!err) {
        const response = parseFloat(rows[0].TotalQty);
        const stock = response + valPersediaanQty >= 0;
        if (stock) {
          resolve();
        }
        if (!stock) {
          const totalQty = valPersediaanQty + response;
          const msg = `Failed to Update, If Succeed to Update, The Total Stock is : 
          ${totalQty}`;
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
  console.log(valPersediaanProductId);
  // sure conditionally with rows
  await validateStock2(valPersediaanProductId, valPersediaanQty);
  // validate stock must be postiive
  await validateStock3(valPersediaanId, valPersediaanProductId);
  // 3. execute delete
  return new Promise((resolve, reject) => {
    db.run(queryDeletePersediaan(valPersediaanId), (err) => {
      if (!err) {
        const msg = `Stock Product <b class='text-capitalize'>${valProductName} ${formatQty1(
          valPersediaanQty
        )}</b> has been deleted`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
export const validateStock2 = (valPersediaanProductId, valPersediaanQty) => {
  console.log(valPersediaanProductId);
  const query = queryGetPersediaanProductRow(valPersediaanProductId);
  return new Promise((resolve, reject) => {
    db.each(query, (err, response) => {
      if (!err) {
        const stock = parseFloat(response.TotalProduct);
        if (stock === 1) {
          if (valPersediaanQty >= 1) {
            resolve();
          }
          if (valPersediaanQty < 1) {
            const msg = `If Succeed to Delete,The Stock total is : ${valPersediaanQty}`;
            reject(msg);
          }
        }
        if (stock > 1) {
          resolve();
        }
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
    db.all(query, (err, rows) => {
      if (!err) {
        const response = parseFloat(rows[0].TotalQty);
        const stock = response >= 0;
        if (stock) {
          resolve();
        }
        if (!stock) {
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
