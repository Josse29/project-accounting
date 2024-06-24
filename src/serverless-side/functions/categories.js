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
export const getCategory = (
  categorySearch,
  categoryLimit,
  categoryOffset,
  callback
) => {
  const categoryStartOffset = (categoryOffset - 1) * categoryLimit;
  db.all(
    queryGetCategory(categorySearch, categoryLimit, categoryStartOffset),
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
export const getTotalPageCategory = (
  categorySearch,
  categoryLimit,
  callback
) => {
  db.each(queryTotalRowCategory(categorySearch), (err, res) => {
    if (!err) {
      let lastPage;
      if (res.TOTAL_ROW % categoryLimit === 0) {
        lastPage = parseInt(res.TOTAL_ROW) / parseInt(categoryLimit);
      } else {
        lastPage =
          parseInt(parseInt(res.TOTAL_ROW) / parseInt(categoryLimit)) + 1;
      }
      return callback(true, lastPage);
    }
    if (err) {
      return callback(false, err);
    }
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
