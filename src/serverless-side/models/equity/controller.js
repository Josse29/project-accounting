import { validateDate } from "../../utils/validation.js";
import {
  queryCreate,
  queryRead,
  queryReadDate,
  queryReadDate1,
  queryReadDate2,
  queryReadDateGroupUser,
  queryReadSumDate,
  queryReadTotalRow,
} from "./querysql.js";

// 1.CREATE
const createEquity = async (req) => {
  const {
    EquityDateVal,
    EquityTimeVal,
    EquityUserIdVal,
    EquityBalanceVal,
    EquityInformationVal,
  } = req;
  // execute
  const query = queryCreate(
    EquityDateVal,
    EquityTimeVal,
    EquityUserIdVal,
    EquityBalanceVal,
    EquityInformationVal
  );
  const msg = `Category <b class='text-capitalize'>${EquityUserIdVal}</b> has been added`;
  const created = await window.electronAPI.sqliteApi.run(query, msg);
  return created;
};
// 2.READ
const getEquity = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = (offsetVal - 1) * limitVal;

  const query = queryRead(searchVal, limitVal, startOffsetVal);
  const equity = await window.electronAPI.sqliteApi.all(query);
  return equity;
};
const getEquityDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  // 1.validate date
  validateDate(startDateVal, endDateVal);

  const query = queryReadDate(startDateVal, endDateVal);
  const equity = await window.electronAPI.sqliteApi.all(query);
  return equity;
};
// for csv
const getEquityDate1 = async (req) => {
  const { startDateVal, endDateVal } = req;
  // 1.validate date
  validateDate(startDateVal, endDateVal);
  const query = queryReadDate1(startDateVal, endDateVal);
  const equity = await window.electronAPI.sqliteApi.all(query);
  return equity;
};
// for pdf
const getEquityDate2 = async (req) => {
  const { startDateVal, endDateVal } = req;
  // 1.validate date
  validateDate(startDateVal, endDateVal);
  const query = queryReadDate2(startDateVal, endDateVal);
  const equity = await window.electronAPI.sqliteApi.all(query);
  return equity;
};
const getEquityDateGroupUser = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryReadDateGroupUser(startDateVal, endDateVal);
  const equity = await window.electronAPI.sqliteApi.all(query);
  return equity;
};
const getEquitySumDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  const query = queryReadSumDate(startDateVal, endDateVal);
  const equity = await window.electronAPI.sqliteApi.each1(query);
  return equity;
};

const getEquityPagination = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryReadTotalRow(searchVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
export {
  createEquity,
  getEquity,
  getEquityDate,
  getEquityDateGroupUser,
  getEquityDate1,
  getEquityDate2,
  getEquityPagination,
  getEquitySumDate,
};
