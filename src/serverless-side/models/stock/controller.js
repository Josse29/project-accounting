import {
  queryCreate,
  queryRead,
  queryRead1,
  queryReadDate,
  queryReadDate1,
  queryReadDateGroup,
  queryReadDateGroup1,
  queryReadTotalRow,
  queryReadTotalRow1,
} from "./querysql.js";
import { capitalizeWord } from "../../utils/formatTxt.js";
import {
  validateDate,
  validateDateAndTime,
  validateProductAdd,
  validateQty,
} from "../../utils/validation.js";

const createStock = async (req) => {
  const {
    stockDateVal,
    stockTimeVal,
    stockActivityVal,
    stockProductIdVal,
    stockProductQtyVal,
    stockInfoVal,
    productNameVal,
  } = req;
  // 1.validate date and time
  validateDateAndTime(stockDateVal, stockTimeVal);
  validateProductAdd(stockProductIdVal);
  await validateQty(stockProductQtyVal, stockProductIdVal, productNameVal);
  // execute insert
  const query = queryCreate(
    stockDateVal,
    stockTimeVal,
    stockActivityVal,
    stockProductIdVal,
    stockProductQtyVal,
    stockInfoVal
  );
  const msg = `Product - <b class='text-capitalize'>${capitalizeWord(
    productNameVal
  )} ${stockProductQtyVal}</b> has been stored`;
  const created = await window.ElectronAPI.sqlite3.run(query, msg);
  return created;
};
const createStock1 = async (req) => {
  const {
    stockDateVal,
    stockTimeVal,
    stockProductIdVal,
    stockProductQtyVal,
    stockInfoVal,
    productNameVal,
  } = req;
  // 1.validate date and time
  validateDateAndTime(stockDateVal, stockTimeVal);
  validateProductAdd(stockProductIdVal);
  await validateQty(stockProductQtyVal, stockProductIdVal, productNameVal);
  // execute insert
  const query = queryCreate(
    stockDateVal,
    stockTimeVal,
    "",
    stockProductIdVal,
    stockProductQtyVal,
    stockInfoVal
  );
  const msg = `Product - <b class='text-capitalize'>${capitalizeWord(
    productNameVal
  )} ${stockProductQtyVal}</b> has been stored`;
  const created = await window.ElectronAPI.sqlite3.run(query, msg);
  return created;
};
// read
const getStock = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const limitVal1 = parseInt(limitVal);
  const offsetVal1 = parseInt(offsetVal);
  const startOffset = parseInt((offsetVal1 - 1) * limitVal1);
  const query = queryRead(searchVal, limitVal1, startOffset);
  const stock = await window.ElectronAPI.sqlite3.all(query);
  return stock;
};
const getStockPagination = async (req) => {
  const { searchVal, limitVal } = req;
  const limitVal1 = parseInt(limitVal);
  const query = queryReadTotalRow(searchVal);
  const totalPageRow = await window.ElectronAPI.sqlite3.each(query, limitVal1);
  return totalPageRow;
};
const getStock1 = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const limitVal1 = parseInt(limitVal);
  const offsetVal1 = parseInt(offsetVal);
  const startOffset = parseInt((offsetVal1 - 1) * limitVal1);
  const query = queryRead1(searchVal, limitVal1, startOffset);
  const stock = await window.ElectronAPI.sqlite3.all(query);
  return stock;
};
const getStockPagination1 = async (req) => {
  const { searchVal, limitVal } = req;
  const limitVal1 = parseInt(limitVal);
  const query = queryReadTotalRow1(searchVal);
  const totalPageRow = await window.ElectronAPI.sqlite3.each(query, limitVal1);
  return totalPageRow;
};
const getStockDate = async (req) => {
  const { startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  const query = queryReadDate(startDateVal, endDateVal);
  const stock = await window.ElectronAPI.sqlite3.all(query);
  return stock;
};
const getStockDate1 = async (req) => {
  const { startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  const query = queryReadDate1(startDateVal, endDateVal);
  const stock = await window.ElectronAPI.sqlite3.all(query);
  return stock;
};
const getStockPDF = async (req) => {
  const { startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  // 1.stock
  const query = queryReadDate(startDateVal, endDateVal);
  const Stock = await window.ElectronAPI.sqlite3.all(query);
  // 2. stockGroup
  const query1 = queryReadDateGroup(startDateVal, endDateVal);
  const GroupProduct = await window.ElectronAPI.sqlite3.all(query1);
  // 3. summary
  let StockQty = 0;
  let StockBalance = 0;
  for (const el of GroupProduct) {
    StockQty += el.StockQty;
    StockBalance += el.StockBalance;
  }
  return { Stock, GroupProduct, StockQty, StockBalance };
};
const getStockPDF1 = async (req) => {
  const { startDateVal, endDateVal } = req;
  validateDate(startDateVal, endDateVal);
  // 1.sale
  const query = queryReadDate1(startDateVal, endDateVal);
  const Sale = await window.ElectronAPI.sqlite3.all(query);
  // 2. summary
  let SaleQty = 0;
  let SaleBalance = 0;
  for (const el of Sale) {
    SaleQty += el.SaleQty;
    SaleBalance += el.SaleBalance;
  }
  // 3.SalesGroup1
  const query1 = `
  SELECT 
  UserFullname
  FROM 
  User
  WHERE 
  UserPosition = "sale" `;
  const SalesGroup = await window.ElectronAPI.sqlite3.all(query1);
  const SalesGroup1 = [];
  for (const el of SalesGroup) {
    const query2 = `
    SELECT 
    Stock.StockDate AS SaleDate,
    SUBSTR(Stock.StockInfo, INSTR(Stock.StockInfo, 'Sale : ') + 7, INSTR(Stock.StockInfo, ' |') - (INSTR(Stock.StockInfo, 'Sale : ') + 7)) AS SaleName,
    Product.ProductName,
    Product.ProductPriceSell,
    COALESCE((Stock.StockQty) * -1, 0) AS SaleQty,
    (COALESCE((Stock.StockQty) * -1, 0) * Product.ProductPriceSell) AS SaleBalance
    FROM 
    Stock
    LEFT JOIN Product ON Stock.StockProductId = Product.ProductId
    WHERE 
    Stock.StockActivity LIKE "%Sales%" AND 
    Stock.StockDate BETWEEN "${startDateVal}" AND "${endDateVal}" AND
    Stock.StockInfo LIKE "%Sale : ${el.UserFullname}%" `;
    const Sales1 = await window.ElectronAPI.sqlite3.all(query2);
    let qty = 0;
    let balance = 0;
    for (const el of Sales1) {
      qty += el.SaleQty;
      balance += el.SaleBalance;
    }
    const SaleUser = {
      SaleName: el.UserFullname,
      SaleRecap: Sales1,
      SaleQty: qty,
      SaleBalance: balance,
    };
    SalesGroup1.push(SaleUser);
  }
  // 4.productGroup
  const query3 = queryReadDateGroup1(startDateVal, endDateVal);
  const ProductGroup = await window.ElectronAPI.sqlite3.all(query3);
  return { Sale, SalesGroup1, SaleQty, SaleBalance, ProductGroup };
};
export {
  createStock,
  getStock,
  getStock1,
  getStockDate,
  getStockDate1,
  getStockPDF,
  getStockPDF1,
  getStockPagination,
  getStockPagination1,
};
