import {
  queryGetInventory,
  queryInsertInventory,
  queryListInventory,
  queryTotalRowInventory,
} from "../querysql/inventory.js";

// 1.CREATE
export const createInventory = (inventoryName, inventoryInfo, callback) => {
  db.run(queryInsertInventory(inventoryName, inventoryInfo), (err) => {
    if (!err) {
      return callback(
        true,
        `Inventory <b class='text-capitalize'>${inventoryName}</b> berhasil ditambahkan`
      );
    }
    if (err) {
      return callback(false, err);
    }
  });
};
// 2.READ
export const getInventory = (
  inventorySearch,
  inventoryLimit,
  inventoryActivePage,
  callback
) => {
  const inventoryStartOffset = (inventoryActivePage - 1) * inventoryLimit;
  db.all(
    queryGetInventory(inventorySearch, inventoryLimit, inventoryStartOffset),
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
export const getTotalPageInventory = (
  inventorySearch,
  inventoryLimit,
  callback
) => {
  db.each(queryTotalRowInventory(inventorySearch), (err, res) => {
    if (!err) {
      let inventoryTotalPage;
      let inventoryTotalRow = parseInt(res.TOTAL_ROW);
      let inventoryLimitInt = parseInt(inventoryLimit);
      if (inventoryTotalRow % inventoryLimitInt === 0) {
        inventoryTotalPage = inventoryTotalRow / inventoryLimitInt;
      } else {
        inventoryTotalPage =
          parseInt(inventoryTotalRow / inventoryLimitInt) + 1;
      }
      return callback(true, inventoryTotalPage);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getTotalRowInventory = (inventoryProductSearch, callback) => {
  db.each(queryTotalRowInventory(inventoryProductSearch), (err, res) => {
    if (!err) {
      let inventoryTotalRow = parseInt(res.TOTAL_ROW);
      return callback(true, inventoryTotalRow);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getInventoryList = (inventoryProductSearch, callback) => {
  db.all(queryListInventory(inventoryProductSearch), (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
// 3.UPDATE
// export const updateCategory = (categoryId, categoryName, categoryInfo, callback) => {
//     db.run(queryUpdateCategory(categoryId, categoryName, categoryInfo), (err) => {
//         if (!err) {
//             return callback(true, `Kategori <b>${categoryName}</b> berhasil diperbaharui`)
//         }
//         if (err) {
//             return callback(false, `Kategori ${categoryName} gagal diperbaharui`)
//         }
//     })
// }
// 4.DELETE
// export const deleteCategory = (categoryId, categoryName, callback) => {
//     db.run(queryDeleteCategory(categoryId), (err) => {
//         if (!err) {
//             return callback(true, `Kategori <b class='text-capitalize'>${categoryName}</b> berhasil dihapus`)
//         }
//         if (err) {
//             return callback(false, `Kategori <b class='text-capitalize'>${categoryName}</b> gagal dihapus`)
//         }
//     });
// }
