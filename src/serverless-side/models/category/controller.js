import { validateCategoryName } from "../../utils/validation.js";
import db from "../../database/config.js";
import {
  queryDeleteCategory,
  queryGetCategory,
  queryGetListCategory,
  queryInsertCategory,
  queryTotalRowCategory,
  queryUpdateCategory,
} from "./querysql.js";

// 1.CREATE
export const createCategory = (req) => {
  const { categoryName, categoryInfo } = req;
  // 1.validate name
  validateCategoryName(categoryName);
  // execute
  const query = queryInsertCategory(categoryName, categoryInfo);
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = `Category <b class='text-capitalize'>${categoryName}</b> has been added`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
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
export const getListCategory = (categorySearch) => {
  const query = queryGetListCategory(categorySearch);
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
export const getCategoryInit = (req) => {
  const { searchVal, limitVal } = req;
  const query = queryTotalRowCategory(searchVal);
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalPage;
        let totalRow = parseInt(res.TOTAL_ROW);
        const isEven = totalRow % limitVal === 0;
        if (isEven) {
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
export const updateCategory = (req) => {
  const { categoryId, categoryName, categoryInfo } = req;
  // category name required
  validateCategoryName(categoryName);
  // execute
  const query = queryUpdateCategory(categoryId, categoryName, categoryInfo);
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = `Category <b>${categoryName}</b> has been updated`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
// 4.DELETE
export const deleteCategory = (req) => {
  const { categoryId, categoryName } = req;
  const query = queryDeleteCategory(categoryId);
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (!err) {
        const msg = `Category <b class='text-capitalize'>${categoryName}</b> has been deleted`;
        resolve(msg);
      }
      if (err) {
        reject(err);
      }
    });
  });
};
