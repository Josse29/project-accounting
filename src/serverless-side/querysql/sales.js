export const createTableSales = () => {
  return `CREATE TABLE Sales (
            SalesId INTEGER PRIMARY KEY AUTOINCREMENT,
            SalesYMD VARCHAR(255),
            SalesHMS VARCHAR(255),
            SalesProductId INTEGER,
            SalesProductQty INTEGER,
            SalesProductRp INTEGER,
            SalesPersonId INTEGER,
            SalesCustomerId INTEGER,
            SalesStatus VARCHAR(255),
            FOREIGN KEY (SalesProductId) REFERENCES Product(ProductId)
            FOREIGN KEY (SalesPersonId) REFERENCES User(UserId)
            FOREIGN KEY (SalesCustomerId) REFERENCES User(UserId)
          )`;
};
// CREATE
export const queryCreateSales = (
  SalesYMDVal,
  SalesHMSVal,
  SalesProductIdVal,
  SalesProductQtyVal,
  SalesProductRpVal,
  SalesPersonIdVal,
  SalesCustomerIdVal,
  SalesStatusVal
) => {
  let query = `INSERT 
               INTO Sales
               (SalesYMD, SalesHMS, SalesProductId, SalesProductQty, SalesProductRp,   SalesPersonId, SalesCustomerId, SalesStatus)
               VALUES 
               ('${SalesYMDVal}', '${SalesHMSVal}', ${SalesProductIdVal}, ${SalesProductQtyVal}, '${SalesProductRpVal}', ${SalesPersonIdVal}, ${SalesCustomerIdVal}, '${SalesStatusVal}')
               `;
  return query;
};
// READ
export const queryGetSalesRowPage = (searchVal) => {
  let query = `SELECT 
               COUNT(Sales.SalesId) AS TOTAL_ROW 
               FROM Sales `;
  query += `LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId `;
  query += `LEFT JOIN User AS SalesPerson ON Sales.SalesPersonId = SalesPerson.UserId `;
  query += `LEFT JOIN User AS SalesCustomer ON Sales.SalesCustomerId = SalesCustomer.UserId `;
  // with search value
  if (searchVal !== "") {
    query += `WHERE Product.ProductName LIKE '%${searchVal}%' ESCAPE '!' OR  
                    SalesPerson.UserFullname LIKE '%${searchVal}%' ESCAPE '!' OR 
                    SalesCustomer.UserFullname LIKE '%${searchVal}%' ESCAPE '!' `;
  }
  return query;
};
export const queryGetSales = (searchVal, limitVal, offsetVal) => {
  let query = `SELECT
               Sales.SalesId,
               Sales.SalesYMD,
               Sales.SalesHMS,
               Sales.SalesProductQty,
               Sales.SalesProductRp,
               Sales.SalesStatus,
               Product.ProductId,
               Product.ProductName,
               Product.ProductPriceJual,
               SalesPerson.UserId AS SalesPersonId,   
               SalesPerson.UserFullname AS SalesPersonName,
               SalesCustomer.UserId AS SalesCustomerId,    
               SalesCustomer.UserFullname AS SalesCustomerName
               FROM Sales `;
  query += `LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId `;
  query += `LEFT JOIN User AS SalesPerson ON Sales.SalesPersonId = SalesPerson.UserId `;
  query += `LEFT JOIN User AS SalesCustomer ON Sales.SalesCustomerId = SalesCustomer.UserId `;
  // with search value
  if (searchVal !== "") {
    query += `WHERE Product.ProductName LIKE '%${searchVal}%' ESCAPE '!' OR  
                    SalesPerson.UserFullname LIKE '%${searchVal}%' ESCAPE '!' OR 
                    SalesCustomer.UserFullname LIKE '%${searchVal}%' ESCAPE '!' `;
  }
  // with order, limit, offset
  query += `ORDER BY Sales.SalesYMD DESC, Sales.SalesHMS DESC
            LIMIT ${limitVal}
            OFFSET ${offsetVal}`;
  return query;
};
export const queryGetSalesSum = () => {
  let query = `SELECT SUM(Sales.SalesProductRp) AS Total_Rp FROM Sales`;
  return query;
};
// by productid
export const queryGetSalesProductId = (productIdVal) => {
  let query = `SELECT
               Sales.SalesId,
               Sales.SalesYMD,
               Sales.SalesHMS,
               Sales.SalesProductQty,
               Sales.SalesProductRp,
               Sales.SalesStatus,
               Product.ProductId,
               Product.ProductName,
               Product.ProductPriceJual,
               SalesPerson.UserId AS SalesPersonId,   
               SalesPerson.UserFullname AS SalesPersonName,
               SalesCustomer.UserId AS SalesCustomerId,    
               SalesCustomer.UserFullname AS SalesCustomerName
               FROM Sales `;
  query += `LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId `;
  query += `LEFT JOIN User AS SalesPerson ON Sales.SalesPersonId = SalesPerson.UserId `;
  query += `LEFT JOIN User AS SalesCustomer ON Sales.SalesCustomerId = SalesCustomer.UserId `;
  // with search value
  query += `WHERE Product.ProductId = ${productIdVal} `;
  // with order
  query += `ORDER BY Sales.SalesYMD DESC, Sales.SalesHMS DESC `;
  return query;
};
export const queryGetSalesSumProductId = (productIdVal) => {
  let query = `SELECT 
               SUM(Sales.SalesProductRp) AS Total_Rp,
               SUM(Sales.SalesProductQty) AS Total_Qty
               FROM Sales `;
  query += `LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId `;
  query += `WHERE Product.ProductId = ${productIdVal}`;
  return query;
};
// by personid
export const queryGetSalesPersonId = (personIdVal) => {
  let query = `SELECT
               Sales.SalesId,
               Sales.SalesYMD,
               Sales.SalesHMS,
               Sales.SalesProductQty,
               Sales.SalesProductRp,
               Sales.SalesStatus,
               Product.ProductId,
               Product.ProductName,
               Product.ProductPriceJual,
               SalesPerson.UserId AS SalesPersonId,   
               SalesPerson.UserFullname AS SalesPersonName,
               SalesCustomer.UserId AS SalesCustomerId,    
               SalesCustomer.UserFullname AS SalesCustomerName
               FROM Sales `;
  query += `LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId `;
  query += `LEFT JOIN User AS SalesPerson ON Sales.SalesPersonId = SalesPerson.UserId `;
  query += `LEFT JOIN User AS SalesCustomer ON Sales.SalesCustomerId = SalesCustomer.UserId `;
  // with search value
  query += `WHERE SalesPerson.UserId = ${personIdVal} `;
  // with order
  query += `ORDER BY Sales.SalesYMD DESC, Sales.SalesHMS DESC `;
  return query;
};
export const queryGetSalesSumPersonId = (personIdVal) => {
  let query = `SELECT 
               SUM(Sales.SalesProductRp) AS Total_Rp
               FROM Sales `;
  query += `LEFT JOIN User ON Sales.SalesPersonId = User.UserId `;
  query += `WHERE User.UserId = ${personIdVal}`;
  return query;
};
// by customerid
export const queryGetSalesCustomerId = (customerIdVal) => {
  let query = `SELECT
               Sales.SalesId,
               Sales.SalesYMD,
               Sales.SalesHMS,
               Sales.SalesProductQty,
               Sales.SalesProductRp,
               Sales.SalesStatus,
               Product.ProductId,
               Product.ProductName,
               Product.ProductPriceJual,
               SalesPerson.UserId AS SalesPersonId,   
               SalesPerson.UserFullname AS SalesPersonName,
               SalesCustomer.UserId AS SalesCustomerId,    
               SalesCustomer.UserFullname AS SalesCustomerName
               FROM Sales `;
  query += `LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId `;
  query += `LEFT JOIN User AS SalesPerson ON Sales.SalesPersonId = SalesPerson.UserId `;
  query += `LEFT JOIN User AS SalesCustomer ON Sales.SalesCustomerId = SalesCustomer.UserId `;
  // with search value
  query += `WHERE SalesCustomer.UserId = ${customerIdVal} `;
  // with order
  query += `ORDER BY Sales.SalesYMD DESC, Sales.SalesHMS DESC `;
  return query;
};
export const queryGetSalesSumCustomerId = (customerIdVal) => {
  let query = `SELECT 
               SUM(Sales.SalesProductRp) AS Total_Rp
               FROM Sales `;
  query += `LEFT JOIN User ON Sales.SalesCustomerId = User.UserId `;
  query += `WHERE User.UserId = ${customerIdVal}`;
  return query;
};
// by date
export const queryGetSalesDate = (startDateVal, endDateVal) => {
  let query = `SELECT
               Sales.SalesId,
               Sales.SalesYMD,
               Sales.SalesHMS,
               Sales.SalesProductQty,
               Sales.SalesProductRp,
               Sales.SalesStatus,
               Product.ProductId,
               Product.ProductName,
               Product.ProductPriceJual,
               SalesPerson.UserId AS SalesPersonId,   
               SalesPerson.UserFullname AS SalesPersonName,
               SalesCustomer.UserId AS SalesCustomerId,    
               SalesCustomer.UserFullname AS SalesCustomerName
               FROM Sales `;
  query += `LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId `;
  query += `LEFT JOIN User AS SalesPerson ON Sales.SalesPersonId = SalesPerson.UserId `;
  query += `LEFT JOIN User AS SalesCustomer ON Sales.SalesCustomerId = SalesCustomer.UserId `;
  // with date
  query += `WHERE Sales.SalesYMD BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  // with order
  query += `ORDER BY Sales.SalesYMD DESC, Sales.SalesHMS DESC `;
  return query;
};
export const queryGetSalesSumDate = (startDateVal, endDateVal) => {
  let query = `SELECT 
               SUM(Sales.SalesProductRp) AS Total_Rp
               FROM Sales `;
  query += `WHERE Sales.SalesYMD BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  console.log(query);
  return query;
};
export const queryGetSalesDateProductId = (
  startDateVal,
  endDateVal,
  selectedProductId
) => {
  let query = `SELECT
               Sales.SalesId,
               Sales.SalesYMD,
               Sales.SalesHMS,
               Sales.SalesProductQty,
               Sales.SalesProductRp,
               Sales.SalesStatus,
               Product.ProductId,
               Product.ProductName,
               Product.ProductPriceJual,
               SalesPerson.UserId AS SalesPersonId,   
               SalesPerson.UserFullname AS SalesPersonName,
               SalesCustomer.UserId AS SalesCustomerId,    
               SalesCustomer.UserFullname AS SalesCustomerName
               FROM Sales `;
  query += `LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId `;
  query += `LEFT JOIN User AS SalesPerson ON Sales.SalesPersonId = SalesPerson.UserId `;
  query += `LEFT JOIN User AS SalesCustomer ON Sales.SalesCustomerId = SalesCustomer.UserId `;
  // with date
  query += `WHERE Sales.SalesYMD BETWEEN '${startDateVal}' AND '${endDateVal}' 
                  AND Product.ProductId = ${selectedProductId} `;
  // with order
  query += `ORDER BY Sales.SalesYMD DESC, Sales.SalesHMS DESC `;
  return query;
};
export const queryGetSalesSumDateProductId = (
  startDateVal,
  endDateVal,
  selectedProductId
) => {
  let query = `SELECT 
               SUM(Sales.SalesProductRp) AS Total_Rp,
               SUM(Sales.SalesProductQty) AS Total_Qty
               FROM Sales `;
  query += `LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId `;
  query += `WHERE Sales.SalesYMD BETWEEN '${startDateVal}' AND '${endDateVal}' 
            AND Product.ProductId = ${selectedProductId}`;
  console.log(query);
  return query;
};
export const queryGetSalesPersonIdDate = (
  startDateVal,
  endDateVal,
  selectedPersonId
) => {
  let query = `SELECT
               Sales.SalesId,
               Sales.SalesYMD,
               Sales.SalesHMS,
               Sales.SalesProductQty,
               Sales.SalesProductRp,
               Sales.SalesStatus,
               Product.ProductId,
               Product.ProductName,
               Product.ProductPriceJual,
               SalesPerson.UserId AS SalesPersonId,   
               SalesPerson.UserFullname AS SalesPersonName,
               SalesCustomer.UserId AS SalesCustomerId,    
               SalesCustomer.UserFullname AS SalesCustomerName
               FROM Sales `;
  query += `LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId `;
  query += `LEFT JOIN User AS SalesPerson ON Sales.SalesPersonId = SalesPerson.UserId `;
  query += `LEFT JOIN User AS SalesCustomer ON Sales.SalesCustomerId = SalesCustomer.UserId `;
  // with search value
  query += `WHERE Sales.SalesYMD BETWEEN '${startDateVal}' AND '${endDateVal}' 
            AND SalesPerson.UserId = ${selectedPersonId} `;
  // with order
  query += `ORDER BY Sales.SalesYMD DESC, Sales.SalesHMS DESC `;
  return query;
};
export const queryGetSalesSumPersonIdDate = (
  startDateVal,
  endDateVal,
  selectedPersonId
) => {
  let query = `SELECT 
               SUM(Sales.SalesProductRp) AS Total_Rp
               FROM Sales `;
  query += `LEFT JOIN User ON Sales.SalesPersonId = User.UserId `;
  query += `WHERE Sales.SalesYMD BETWEEN '${startDateVal}' AND '${endDateVal}' 
            AND User.UserId = ${selectedPersonId}`;
  return query;
};
export const queryGetSalesCustomerIdDate = (
  startDateVal,
  endDateVal,
  selectedPersonId
) => {
  let query = `SELECT
               Sales.SalesId,
               Sales.SalesYMD,
               Sales.SalesHMS,
               Sales.SalesProductQty,
               Sales.SalesProductRp,
               Sales.SalesStatus,
               Product.ProductId,
               Product.ProductName,
               Product.ProductPriceJual,
               SalesPerson.UserId AS SalesPersonId,   
               SalesPerson.UserFullname AS SalesPersonName,
               SalesCustomer.UserId AS SalesCustomerId,    
               SalesCustomer.UserFullname AS SalesCustomerName
               FROM Sales `;
  query += `LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId `;
  query += `LEFT JOIN User AS SalesPerson ON Sales.SalesPersonId = SalesPerson.UserId `;
  query += `LEFT JOIN User AS SalesCustomer ON Sales.SalesCustomerId = SalesCustomer.UserId `;
  // with search value
  query += `WHERE Sales.SalesYMD BETWEEN '${startDateVal}' AND '${endDateVal}' 
            AND SalesCustomer.UserId = ${selectedPersonId} `;
  // with order
  query += `ORDER BY Sales.SalesYMD DESC, Sales.SalesHMS DESC `;
  return query;
};
export const queryGetSalesSumCustomerIdDate = (
  startDateVal,
  endDateVal,
  selectedPersonId
) => {
  let query = `SELECT 
               SUM(Sales.SalesProductRp) AS Total_Rp
               FROM Sales `;
  query += `LEFT JOIN User ON Sales.SalesCustomerId = User.UserId `;
  query += `WHERE Sales.SalesYMD BETWEEN '${startDateVal}' AND '${endDateVal}' 
                  AND User.UserId = ${selectedPersonId}`;
  return query;
};
// report
export const queryGetReportSales = () => {
  let query = `SELECT
               Sales.SalesYMD AS Date,
               Sales.SalesHMS AS Hour,
               SalesPerson.UserFullname AS SalesPersonName,    
               Product.ProductName AS ProductName,
               Product.ProductPriceBeli AS PriceBuy, 
               Product.ProductPriceJual AS PriceSell,
               Sales.SalesProductQty AS Qty,
               Sales.SalesProductRp AS Total,
               SalesCustomer.UserFullname AS CustomerName,
               Sales.SalesStatus AS Status
               FROM Sales `;
  query += `LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId `;
  query += `LEFT JOIN User AS SalesPerson ON Sales.SalesPersonId = SalesPerson.UserId `;
  query += `LEFT JOIN User AS SalesCustomer ON Sales.SalesCustomerId = SalesCustomer.UserId `;
  // with order
  query += `ORDER BY Sales.SalesYMD DESC, Sales.SalesHMS DESC `;
  return query;
};
// UPDATE
export const queryUpdateSales = (req) => {
  const {
    ymdVal,
    hmsVal,
    rpVal,
    personIdVal,
    customerIdVal,
    productIdVal,
    salesIdVal,
  } = req;
  let query = `UPDATE 
               TABLE Sales
               SET SalesYMD = '${ymdVal}',
                   SalesHMS = '${hmsVal}',
                   SalesRp = ${rpVal},
                   SalesPersonId = ${personIdVal},
                   SalesCustomerId = '${customerIdVal}',
                   SalesProductId = ${productIdVal}
               WHERE SalesId = ${salesIdVal} `;
  return query;
};
// DELETE
export const queryDeleteSales = (req) => {
  const { salesIdVal } = req;
  let query = `DELETE FROM Sales WHERE SalesId = ${salesIdVal}`;
  return query;
};
// SELECT
// Sales.SalesId,
// Sales.SalesYMD,
// Sales.SalesHMS,
// Sales.SalesProductQty,
// Sales.SalesProductRp,
// Sales.SalesStatus,
// Product.ProductId,
// Product.ProductName,
// Product.ProductPriceJual,
// SalesPerson.UserId AS SalesPersonId,
// SalesPerson.UserFullname AS SalesPersonName,
// SalesCustomer.UserId AS SalesCustomerId,
// SalesCustomer.UserFullname AS SalesCustomerName
// FROM Sales
// LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId
// LEFT JOIN User AS SalesPerson ON Sales.SalesPersonId = SalesPerson.UserId
// LEFT JOIN User AS SalesCustomer ON Sales.SalesCustomerId = SalesCustomer.UserId
// WHERE User.UserId = 2 ORDER BY Sales.SalesYMD DESC, Sales.SalesHMS DESC
