import {
  queryDeleteCategory,
  queryGetCategory,
  queryGetListCategory,
  queryInsertCategory,
  queryTotalRowCategory,
  queryUpdateCategory,
} from "../querysql/categories.js";

// 1.CREATE
export const createCategory = (categoryName, categoryInfo, callback) => {
  db.run(queryInsertCategory(categoryName, categoryInfo), (err) => {
    if (!err) {
      return callback(
        true,
        `Kategori <b class='text-capitalize'>${categoryName}</b> berhasil ditambahkan`
      );
    }
    if (err) {
      return callback(false, err);
    }
  });
};
// 2.READ
export const getCategory = (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = (offsetVal - 1) * limitVal;
  const query = queryGetCategory(searchVal, limitVal, startOffsetVal);
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
export const getListCategory = (categorySearch, callback) => {
  db.all(queryGetListCategory(categorySearch), (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getTotalRowCategory = (categorySearch, callback) => {
  db.each(queryTotalRowCategory(categorySearch), (err, res) => {
    if (!err) {
      const categoryTotal = parseInt(res.TOTAL_ROW);
      return callback(true, categoryTotal);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getCategoryInit = (req) => {
  const { searchVal, limitVal } = req;
  const query = queryTotalRowCategory(searchVal);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalPage;
        let totalRow = parseInt(res.TOTAL_ROW);
        if (totalRow % limitVal === 0) {
          totalPage = totalRow / limitVal;
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
// 3.UPDATE
export const updateCategory = (
  categoryId,
  categoryName,
  categoryInfo,
  callback
) => {
  db.run(queryUpdateCategory(categoryId, categoryName, categoryInfo), (err) => {
    if (!err) {
      return callback(
        true,
        `Kategori <b>${categoryName}</b> berhasil diperbaharui`
      );
    }
    if (err) {
      return callback(false, err);
    }
  });
};
// 4.DELETE
export const deleteCategory = (categoryId, categoryName, callback) => {
  db.run(queryDeleteCategory(categoryId), (err) => {
    if (!err) {
      return callback(
        true,
        `Kategori <b class='text-capitalize'>${categoryName}</b> berhasil dihapus`
      );
    }
    if (err) {
      return callback(false, err);
    }
  });
};
