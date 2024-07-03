import {
  queryDeleteInventory,
  queryGetInventory,
  queryInsertInventory,
  queryListInventory,
  queryTotalRowInventory,
  queryUpdateInventory,
} from "../querysql/inventory.js";

// 1.CREATE
export const createInventory = (
  inventoryProductName,
  inventorProductId,
  inventoryInfo,
  inventoryQty,
  callback
) => {
  const isNumeric = /^-?([1-9]\d*|0?\.\d+)$/.test(inventoryQty);
  if (isNumeric) {
    db.run(
      queryInsertInventory(inventorProductId, inventoryInfo, inventoryQty),
      (err) => {
        if (!err) {
          return callback(
            true,
            `Inventory <b class='text-capitalize'>${inventoryProductName}</b> berhasil ditambahkan`
          );
        }
        if (err) {
          return callback(false, err);
        }
      }
    );
  }
  if (!isNumeric) {
    return callback(false, "mohon masukkan angka");
  }
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
export const updateInventory = (
  inventoryId,
  inventoryProductId,
  inventoryProductName,
  inventoryProductQty,
  inventoryInfo,
  callback
) => {
  db.run(
    queryUpdateInventory(
      inventoryId,
      inventoryProductId,
      inventoryProductQty,
      inventoryInfo
    ),
    (err) => {
      if (!err) {
        return callback(
          true,
          `Inventory <b class='text-capitalize'>${inventoryProductName}</b> berhasil diperbaharui`
        );
      }
      if (err) {
        return callback(false, err);
      }
    }
  );
};
// 4.DELETE
export const deleteInventory = (
  inventoryProductId,
  inventoryProductName,
  callback
) => {
  db.run(queryDeleteInventory(inventoryProductId), (err) => {
    if (!err) {
      return callback(
        true,
        `Persediaan <b class='text-capitalize'>${inventoryProductName}</b> berhasil dihapus`
      );
    }
    if (err) {
      return callback(
        false,
        `Persediaan <b class='text-capitalize'>${inventoryProductName}</b> gagal dihapus`
      );
    }
  });
};
