import {
  queryCreate,
  queryDelete,
  queryRead,
  queryReadList,
  queryReadTotalRow,
  queryUpdate,
} from "./querysql.js";
import {
  validateExpenseName,
  validateExpensePrice,
  validateLoadImg,
} from "../../utils/validation.js";
import { capitalizeWord } from "../../utils/formatTxt.js";

const createExpense = async (req) => {
  const {
    expenseNameVal,
    expensePriceVal,
    expenseUserIdVal,
    expenseImgVal,
    expenseInfoVal,
  } = req;
  // 1.validation name
  validateExpenseName(expenseNameVal);
  // 2.validate Balance
  validateExpensePrice(expensePriceVal);
  //  3.vallidation img
  const imgBase64 = await validateLoadImg(expenseImgVal);
  //  4.executed
  const query = queryCreate(
    capitalizeWord(expenseNameVal.trim()),
    expensePriceVal,
    expenseUserIdVal,
    imgBase64,
    expenseInfoVal
  );
  const msg = `Expense - <b class="text-text-capitalize">${expenseNameVal}</b> has Been Added`;
  const created = await window.electronAPI.sqliteApi.run(query, msg);
  return created;
};
const getExpense = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = (offsetVal - 1) * limitVal;
  const query = queryRead(searchVal, limitVal, startOffsetVal);
  const expense = await window.electronAPI.sqliteApi.all(query);
  return expense;
};
const getExpenseList = async () => {
  const query = queryReadList();
  const list = await window.electronAPI.sqliteApi.all(query);
  return list;
};
const getExpensePagination = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryReadTotalRow(searchVal, limitVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
const updateExpense = async (req) => {
  const {
    expenseIdVal,
    expenseNameVal,
    expensePriceVal,
    expenseUserIdVal,
    expenseInfoVal,
    expenseImgVal,
    expenseImgCancelVal,
  } = req;
  // 1.validation name
  validateExpenseName(expenseNameVal);
  // 2.validate Balance
  validateExpensePrice(expensePriceVal);
  //  3.vallidation img
  const imgBase64 = await validateLoadImg(expenseImgVal);
  //  4.executed
  const query = queryUpdate(
    expenseIdVal,
    capitalizeWord(expenseNameVal.trim()),
    expensePriceVal,
    expenseUserIdVal,
    expenseInfoVal,
    imgBase64,
    expenseImgCancelVal
  );
  const msg = `Expense - <b class="text-text-capitalize">${expenseNameVal}</b> has been updated`;
  const updated = await window.electronAPI.sqliteApi.run(query, msg);
  return updated;
};
const deleteExpense = async (req) => {
  const { expenseIdVal, expenseNameVal } = req;
  const query = queryDelete(expenseIdVal);
  const msg = `Expense - <b class="text-text-capitalize">${expenseNameVal}</b> has been deleted `;
  const deleted = await window.electronAPI.sqliteApi.run(query, msg);
  return deleted;
};
export {
  createExpense,
  getExpense,
  getExpenseList,
  getExpensePagination,
  updateExpense,
  deleteExpense,
};
