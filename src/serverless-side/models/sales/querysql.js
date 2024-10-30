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
                 ('${SalesYMDVal}', '${SalesHMSVal}', ${SalesProductIdVal}, ${SalesProductQtyVal}, ${SalesProductRpVal}, ${SalesPersonIdVal}, ${SalesCustomerIdVal}, '${SalesStatusVal}')
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
  //  left join with product and user
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
export const queryGetGroupPerson = (startDateVal, endDateVal) => {
  let query = `SELECT
               SalesPerson.UserId AS SalesPersonId,
               SalesPerson.UserFullname,
               SUM(Sales.SalesProductRp) AS Sales_Total
               FROM Sales `;
  query += `LEFT JOIN User AS SalesPerson ON Sales.SalesPersonId = SalesPerson.UserId `;
  //  only sales person
  query += `WHERE SalesPerson.UserPosition = 'sales' `;
  //  with range date
  if (startDateVal !== "" && endDateVal !== "") {
    query += `AND Sales.SalesYMD BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
  // group
  query += `GROUP BY SalesPerson.UserId 
            ORDER BY SalesPerson.UserFullname ASC `;
  return query;
};
export const queryGetGroupCustomer = (startDateVal, endDateVal) => {
  let query = `SELECT
               SalesCustomer.UserId AS SalesCustomerId,
               SalesCustomer.UserFullname,
               SUM(Sales.SalesProductRp) AS Sales_Total
               FROM Sales `;
  query += `LEFT JOIN User AS SalesCustomer ON Sales.SalesCustomerId = SalesCustomer.UserId `;
  //  only sales person
  query += `WHERE SalesCustomer.UserPosition = 'customer' `;
  //  with range date
  if (startDateVal !== "" && endDateVal !== "") {
    query += `AND Sales.SalesYMD BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
  // group
  query += `GROUP BY SalesCustomer.UserId 
            ORDER BY SalesCustomer.UserFullname ASC `;
  return query;
};
export const queyrGetGroupProduct = (startDateVal, endDateVal) => {
  let query = `SELECT 
               Sales.SalesId,
               SUM(Sales.SalesProductQty) AS Sales_Qty, 
               SUM(Sales.SalesProductRp) AS Sales_Total,
               Product.ProductId,
               Product.ProductName,
               Product.ProductPriceJual
               FROM Sales `;
  //  left join with product and user
  query += `LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId `;
  //  with range date
  if (startDateVal !== "" && endDateVal !== "") {
    query += `WHERE Sales.SalesYMD BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
  // group
  query += `GROUP BY Product.ProductId 
            ORDER BY Product.ProductName ASC `;
  return query;
};
export const queryGetSalesSum = () => {
  let query = `SELECT 
               SUM(Sales.SalesProductRp) AS Total_Rp FROM Sales `;
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
                 SUM(SalesProductRp) AS Total_Rp,
                 SUM(SalesProductQty) AS Total_Qty
                 FROM Sales `;
  query += `WHERE SalesProductId = ${productIdVal}`;
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
                 SUM(SalesProductRp) AS Total_Rp
                 FROM Sales `;
  query += `WHERE SalesPersonId = ${personIdVal}`;
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
                 SUM(SalesProductRp) AS Total_Rp
                 FROM Sales `;
  query += `WHERE SalesCustomerId = ${customerIdVal}`;
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
  return query;
};
export const queryGetSalesSum1 = (startDateVal, endDateVal) => {
  let query = `SELECT 
               SUM(Sales.SalesProductRp) AS Total_Rp,
               SUM(Sales.SalesProductQty) AS Total_Qty
               FROM Sales `;
  query += `LEFT JOIN Product ON Sales.SalesProductId = Product.ProductId `;
  if (startDateVal !== "" && endDateVal !== "") {
    query += `WHERE Sales.SalesYMD BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
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
export const queryGetReportSales = (startDateVal, endDateVal) => {
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
  // with date
  if (startDateVal !== "" && endDateVal !== "") {
    query += `WHERE Sales.SalesYMD BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
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
export const queryDeleteAll = () => {
  let query = `DELETE FROM Sales `;
  return query;
};
