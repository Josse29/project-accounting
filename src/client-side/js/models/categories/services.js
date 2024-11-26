import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryInit,
  getCategoryList,
  updateCategory,
} from "../../../../serverless-side/models/category/controller.js";
// 1. endpoint : api/category
// method : POST
// payload : 1.categoryName, 2.categoryInfo,
// return : success message create
export const create = async (req) => {
  try {
    const payLoad = {
      categoryName: req.categoryName,
      categoryInfo: req.categoryInfo,
    };
    const created = await createCategory(payLoad);
    return { status: true, response: created };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2.endpoint : api/category/pagination
// method : GET
// payload : 1.searchVal, 2.limitVal
// return : total page and total row
export const getPagination = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const totalPageRow = await getCategoryInit(payLoad);
    return { status: true, response: totalPageRow };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3.endpoint : api/category/:limit/:offset
// method : GET
// payload : 1.searchVal, 2.limitVal, 3.offsetVal
// return ; category with limit offset
export const getByLimitOffset = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const category = await getCategory(payLoad);
    return { status: true, response: category };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 4. endpoint : api/category/:categoryid
// method : PUT
// payload  : 1.categoryId , 2.categoryName, 3.categoryInfo
// return : message success or failed updated
export const update = async (req) => {
  try {
    const payLoad = {
      categoryId: req.categoryId,
      categoryName: req.categoryName,
      categoryInfo: req.categoryInfo,
    };
    const updated = await updateCategory(payLoad);
    return { status: true, response: updated };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 5.endpoint : api/category/:categoryid
// method : DELETE
// payLoad : 1.categoryId, 2.categoryName
// return : message success or failed deleted
export const deleteById = async (req) => {
  try {
    const payLoad = {
      categoryId: req.categoryId,
      categoryName: req.categoryName,
    };
    const deleted = await deleteCategory(payLoad);
    return { status: true, response: deleted };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6. endpoint : api/category/list
// method : GET
// payload : 1.search
// return : list category
export const getList = async (req) => {
  try {
    const list = await getCategoryList(req);
    return { status: true, response: list };
  } catch (error) {
    return { status: false, response: error };
  }
};
