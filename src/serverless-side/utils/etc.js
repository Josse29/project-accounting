import { executeCreate } from "../database/runQuery.js";
import { queryCreate } from "../models/stock/querysql.js";
import {
  validateDateAndTime,
  validateProductAdd,
  validateQty,
  validateQty1,
} from "./validation.js";

const createStock = async (db, data) => {
  const {
    stockDateVal,
    stockTimeVal,
    stockActivityVal,
    stockProductIdVal,
    stockProductQtyVal,
    stockInfoVal,
    productNameVal,
  } = data;
  // 1.validate date and time
  validateDateAndTime(stockDateVal, stockTimeVal);
  validateProductAdd(stockProductIdVal);
  validateQty1(stockProductQtyVal);
  if (stockProductQtyVal < 0) {
    await validateQty(
      db,
      stockProductQtyVal,
      stockProductIdVal,
      productNameVal
    );
  }
  // execute insert
  const query = queryCreate(
    stockDateVal,
    stockTimeVal,
    stockActivityVal,
    stockProductIdVal,
    stockProductQtyVal,
    stockInfoVal
  );
  await executeCreate(db, query);
};
export { createStock };
