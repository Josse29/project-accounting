import {
  createExpense,
  deleteExpense,
  getExpense,
  getExpenseList,
  getExpensePagination,
  updateExpense,
} from "../../../../serverless-side/models/expenselist/controller.js";

// 1. endpoint = api/expense
// method : POST
// payLoad : 1.expenseNameVal, 2.expensePriceVal, 3.expenseUserIdVal, 4.expenseImgVal, 5.expenseInfoVal
// return : message success createExpense
const createExpenseAPI = async (req) => {
  try {
    const payLoad = {
      expenseNameVal: req.expenseNameVal,
      expensePriceVal: parseFloat(req.expensePriceVal),
      expenseUserIdVal: parseInt(req.expenseUserIdVal),
      expenseImgVal: req.expenseImgVal,
      expenseInfoVal: req.expenseInfoVal,
    };
    const created = await createExpense(payLoad);
    return { status: true, response: created };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2.endpoint : api/expense
// method : GET
// payLoad : 1.searchVal, 2.limitVal, 3.offsetVal
// return : expense
const getExpenseAPI = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: parseInt(req.limitVal),
      offsetVal: parseInt(req.offsetVal),
    };
    const expense = await getExpense(payLoad);
    return { status: true, response: expense };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3.endpoint : api/expense-pagination
// method : GET
// payLoad : 1.searchVal, 2.limitVal
// return : totalPage AND ROW
const getExpensePaginationAPI = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: parseInt(req.limitVal),
    };
    const totalPageRow = await getExpensePagination(payLoad);
    return { status: true, response: totalPageRow };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 4. endpoint : api/expense
// method : PUT
// payLoad : 1.expenseIdVal 2.expenseNameVal, 3.expensePriceVal, 4.expenseUserIdVal, 5.expenseInfoVal, 6.expenseImgVal, 7.expenseImgCancelVal
// return : success updated
const updateExpenseAPI = async (req) => {
  try {
    const payLoad = {
      expenseIdVal: parseInt(req.expenseIdVal),
      expenseNameVal: req.expenseNameVal,
      expensePriceVal: parseFloat(req.expensePriceVal),
      expenseUserIdVal: parseInt(req.expenseUserIdVal),
      expenseInfoVal: req.expenseInfoVal,
      expenseImgVal: req.expenseImgVal,
      expenseImgCancelVal: req.expenseImgCancelVal,
    };
    const updated = await updateExpense(payLoad);
    return { status: true, response: updated };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 5.endpoint : api/expense
// method : DELETE
// payLoad : 1.expenseIdVal, 2.expenseNameVal
// return : msg deleted
const deleteExpenseAPI = async (req) => {
  try {
    const payLoad = {
      expenseIdVal: req.expenseIdVal,
      expenseNameVal: req.expenseNameVal,
    };
    const deleted = await deleteExpense(payLoad);
    return { status: true, response: deleted };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6.endpoint : api/expense-list
// method : GET
// payLoad : ""
// return : expense list
const getExpenseListAPI = async () => {
  try {
    const list = await getExpenseList();
    return { status: true, response: list };
  } catch (error) {
    return { status: false, response: error };
  }
};
export {
  createExpenseAPI,
  getExpenseAPI,
  getExpenseListAPI,
  getExpensePaginationAPI,
  updateExpenseAPI,
  deleteExpenseAPI,
};
