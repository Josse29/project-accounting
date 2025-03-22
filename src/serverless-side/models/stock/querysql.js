// CREATE
const queryCreate = (
  stockDateVal,
  stockTimeVal,
  stockActivityVal,
  stockProductIdVal,
  stockProductQtyVal,
  stockInfoVal
) => {
  let query = `
  INSERT 
  INTO Stock
  (StockDate, StockTime, StockActivity, StockProductId, StockQty, StockInfo)
  VALUES 
  ('${stockDateVal}', '${stockTimeVal}', '${stockActivityVal}', '${stockProductIdVal}','${stockProductQtyVal}','${stockInfoVal}')
    `;
  return query;
};
const queryReadTotalRow = (searchVal) => {
  let query = `
  SELECT 
  COUNT(*) AS TOTAL_ROW
  FROM Stock
  `;
  // left join
  query += `
  LEFT JOIN Product ON Stock.StockProductId = Product.ProductId
  `;
  // searching
  query += `
  WHERE 
  Product.ProductName LIKE '%${searchVal.trim()}%' OR 
  Stock.StockInfo LIKE "%${searchVal.trim()}%"
  `;
  return query;
};
const queryReadTotalRow1 = (searchVal) => {
  let query = `
  SELECT 
  COUNT(*) AS TOTAL_ROW
  FROM Stock 
  `;
  // left join
  query += `
  LEFT JOIN Product ON Stock.StockProductId = Product.ProductId
  `;
  // searching
  query += `
  WHERE 
  Stock.StockActivity LIKE "%Sales%" AND 
  Product.ProductName LIKE "%${searchVal.trim()}%"
  `;
  return query;
};
const queryRead = (searchVal, limitVal, offsetVal) => {
  let query = `
  SELECT 
  Stock.StockId,
  Stock.StockDate,
  Stock.StockTime,
  Product.ProductName,
  Product.ProductPriceBuy AS ProductPriceBuy,
  Stock.StockQty AS StockQty,
  (Product.ProductPriceBuy * Stock.StockQty) AS StockBalance,
  Stock.StockInfo
  FROM Stock
  `;
  query += `
  LEFT JOIN Product ON Stock.StockProductId = Product.ProductId
  `;
  query += `
  WHERE 
  Product.ProductName LIKE "%${searchVal.trim()}%" OR 
  Stock.StockInfo LIKE "%${searchVal.trim()}%"
  `;
  query += `
  ORDER BY Stock.StockDate DESC,
           Stock.StockTime DESC 
  LIMIT ${limitVal}
  OFFSET ${offsetVal}
  `;
  return query;
};
const queryRead1 = (searchVal, limitVal, offsetVal) => {
  let query = `
  SELECT 
  Stock.StockId,
  Stock.StockDate,
  Stock.StockTime,
  SUBSTR(Stock.StockInfo, INSTR(Stock.StockInfo, 'Sale : ') + 7, INSTR(Stock.StockInfo || '|', ' |') - (INSTR(Stock.StockInfo, 'Sale : ') + 7)) AS SaleName,
  Product.ProductName,
  Product.ProductPriceSell AS ProductPriceSell,
  (Stock.StockQty * -1)AS StockQty,
  (Product.ProductPriceSell * Stock.StockQty * -1) AS SaleBalance,
  Stock.StockInfo,
  SUBSTR(Stock.StockInfo, INSTR(Stock.StockInfo, 'Customer : ') + 11, INSTR(Stock.StockInfo, ' - Sale :') - (INSTR(Stock.StockInfo, 'Customer : ') + 11)) AS CustomerName
  FROM Stock
  `;
  query += `
  LEFT JOIN Product ON Stock.StockProductId = Product.ProductId 
  `;
  query += `
  WHERE 
  Stock.StockActivity LIKE "%Sales%" AND 
  Product.ProductName LIKE "%${searchVal.trim()}%"
  `;
  query += `
  ORDER BY Stock.StockDate DESC,
           Stock.StockTime DESC 
  LIMIT ${limitVal}
  OFFSET ${offsetVal}
  `;
  return query;
};
const queryReadDate = (startDateVal, endDateVal) => {
  let query = `
  SELECT 
  Stock.StockId,
  Stock.StockDate,
  Stock.StockTime,
  Product.ProductName,
  Product.ProductPriceBuy AS ProductPriceBuy,
  Stock.StockQty AS StockQty,
  (Product.ProductPriceBuy * Stock.StockQty) AS StockBalance,
  Stock.StockActivity,
  User.UserFullname AS SupplierName,
  Stock.StockInfo
  FROM Stock
  `;
  query += `
  LEFT JOIN Product ON Stock.StockProductId = Product.ProductId
  LEFT JOIN User ON Product.ProductSupplierId = User.UserId
  `;
  query += `
  WHERE 
  Stock.StockDate BETWEEN "${startDateVal}" AND "${endDateVal}"
  `;
  query += `
  ORDER BY Stock.StockDate DESC,
           Stock.StockTime DESC 
  `;
  return query;
};
const queryReadDate1 = (startDateVal, endDateVal) => {
  let query = `
  SELECT 
  Stock.StockId,
  Stock.StockDate AS SaleDate,
  SUBSTR(Stock.StockInfo, INSTR(Stock.StockInfo, 'Sale : ') + 7, INSTR(Stock.StockInfo, ' |') - (INSTR(Stock.StockInfo, 'Sale : ') + 7)) AS SaleName,
  Product.ProductName,
  Product.ProductPriceSell AS ProductPriceSell,
  (Stock.StockQty * -1) AS SaleQty,
  (Product.ProductPriceSell * Stock.StockQty * -1) AS SaleBalance,
  Stock.StockInfo,
  SUBSTR(Stock.StockInfo, INSTR(Stock.StockInfo, 'Customer : ') + 11, INSTR(Stock.StockInfo, ' - Sale :') - (INSTR(Stock.StockInfo, 'Customer : ') + 11)) AS CustomerName
  FROM Stock
  `;
  query += `
  LEFT JOIN Product ON Stock.StockProductId = Product.ProductId 
  `;
  query += `
  WHERE 
  Stock.StockActivity LIKE "%Sales%" AND 
  Stock.StockDate BETWEEN "${startDateVal}" AND "${endDateVal}"
  `;
  query += `
  ORDER BY Stock.StockDate DESC,
           Stock.StockTime DESC `;
  return query;
};
const queryReadDateGroup = (startDateVal, endDateVal) => {
  let query = `
  SELECT 
  Product.ProductName,
  Product.ProductPriceBuy AS ProductPriceBuy,
  COALESCE(SUM(Stock.StockQty), 0) AS StockQty,
  (Product.ProductPriceBuy * COALESCE(SUM(Stock.StockQty), 0)) AS StockBalance
  FROM 
  Stock
  LEFT JOIN Product ON Stock.StockProductId = Product.ProductId
  WHERE
  Stock.StockDate BETWEEN "${startDateVal}" AND "${endDateVal}" 
  GROUP BY Product.ProductId
  ORDER BY Product.ProductName ASC `;
  return query;
};
const queryReadDateGroup1 = (startDateVal, endDateVal) => {
  let query = `
  SELECT 
  Product.ProductName,
  Product.ProductPriceSell AS ProductPriceSell,
  COALESCE(SUM(Stock.StockQty) * -1, 0) AS SaleQty,
  (Product.ProductPriceSell * COALESCE(SUM(Stock.StockQty) * -1, 0)) AS SaleBalance
  FROM 
  Stock
  LEFT JOIN Product ON Stock.StockProductId = Product.ProductId
  WHERE
  Stock.StockActivity LIKE "%Sales%" AND 
  Stock.StockDate BETWEEN "${startDateVal}" AND "${endDateVal}" 
  GROUP BY Product.ProductId
  ORDER BY Product.ProductName ASC `;
  return query;
};
export {
  queryCreate,
  queryRead,
  queryRead1,
  queryReadDate,
  queryReadDate1,
  queryReadDateGroup,
  queryReadDateGroup1,
  queryReadTotalRow,
  queryReadTotalRow1,
};
