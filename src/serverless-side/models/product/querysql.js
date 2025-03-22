// 1.CREATE
const queryInsertProduct = (
  productName,
  productPriceBuy,
  productPriceSell,
  productInfo,
  productSupplierId,
  imgBase64
) => {
  let query = `
  INSERT 
  INTO Product 
  (ProductName, ProductPriceBuy, ProductPriceSell, ProductInfo, ProductSupplierId, ProductImage) 
  VALUES
  ('${productName}', '${productPriceBuy}', '${productPriceSell}', '${productInfo}', '${productSupplierId}','${imgBase64}')
  `;
  return query;
};
// 2.READ
const queryGetProduct = (productSearch, productLimit, productOffset) => {
  let query = `
  SELECT 
  Product.ProductId, 
  Product.ProductName, 
  Product.ProductPriceBuy,
  Product.ProductPriceSell, 
  Product.ProductInfo, 
  Product.ProductImage,
  User.UserId, 
  User.UserFullname 
  FROM Product `;
  // left join
  query += `  
  LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  //  with search value
  if (productSearch !== "") {
    query += `
    WHERE 
    Product.ProductName LIKE '%${productSearch}%' ESCAPE '!' OR
    Product.ProductPriceBuy LIKE '%${productSearch}%' ESCAPE '!' OR
    Product.ProductPriceSell LIKE '%${productSearch}%' ESCAPE '!' OR
    Product.ProductInfo LIKE '%${productSearch}%' ESCAPE '!' OR
    User.UserFullname LIKE '%${productSearch}%' ESCAPE '!' `;
  }
  // witth order limit offset
  query += `
  ORDER BY Product.ProductName ASC 
  LIMIT ${productLimit} 
  OFFSET ${productOffset} `;
  return query;
};
const queryGetProductRefStock = (searchVal, limitVal, offsetVal) => {
  let query = `
  SELECT 
  Product.ProductId,
  Product.ProductName, 
  Product.ProductImage,
  Product.ProductPriceBuy AS PriceBuy, 
  Product.ProductPriceSell AS PriceSell,
  SUM(Stock.StockQty) AS TotalQty 
  FROM Product
  `;
  // left join
  query += `
  LEFT JOIN Stock ON Product.ProductId = Stock.StockProductId `;
  // with search AND PRODUCT IS STILL EXIST
  if (searchVal !== "") {
    query += `
    WHERE Product.ProductName LIKE '%${searchVal}%' ESCAPE '!' `;
  }
  // with group,HAVING
  query += `
  GROUP BY Stock.StockProductId 
  HAVING TotalQty >= 1 `;
  // order, limit, offset
  query += `
  ORDER BY Product.ProductName ASC 
  LIMIT ${limitVal}
  OFFSET ${offsetVal} `;
  console.log(query);
  return query;
};
const queryGetProductListRefStock = () => {
  let query = `
  SELECT 
  Product.ProductId,
  Product.ProductName,
  Product.ProductPriceBuy,
  Product.ProductPriceSell,
  COALESCE(SUM(Stock.StockQty), 0) AS TotalStockQty,
  User.UserFullname,
  User.UserEmail
  FROM Product `;
  //  left join with Stock table
  query += `
  LEFT JOIN Stock ON Product.ProductId = Stock.StockProductId `;
  //  left join with User table
  query += `
  LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  // group by
  query += `
  GROUP BY Product.ProductId `;
  //  with ascending ordername
  query += `
  ORDER BY Product.ProductName ASC `;
  return query;
};
const queryGetProductListRefSale = () => {
  let query = `SELECT 
               Product.ProductId,
               Product.ProductName,
               Product.ProductPriceBuy,
               Product.ProductPriceSell,
               COALESCE(SUM(Sales.SalesProductQty), 0) AS TotalSalesProductQty,
               COALESCE(SUM(Sales.SalesProductRp), 0) AS TotalSalesProductRp
               FROM Product `;
  //  left join with Stock table
  query += `LEFT JOIN 
            Sales ON Product.ProductId = Sales.SalesProductId `;
  // group by
  query += `GROUP BY 
            Product.ProductId `;
  //  with ascending ordername
  query += `ORDER BY 
            Product.ProductName ASC `;
  return query;
};
const queryGetProductTotalRow1 = (searchVal) => {
  let query = `
  SELECT 
  COUNT(*) AS TOTAL_ROW `;
  //  with subquery
  query += `
  FROM (
  SELECT Product.ProductId
  FROM Product
  LEFT JOIN Stock ON Product.ProductId = Stock.StockProductId
  WHERE Product.ProductName LIKE '%${searchVal}%' ESCAPE '!'
  GROUP BY Product.ProductId
  HAVING SUM(Stock.StockQty) > 0) AS Subquery `;
  return query;
};
const queryGetProductTotalRow = (productSearch) => {
  let query = `
  SELECT COUNT(*) 
  AS TOTAL_ROW
  FROM Product `;
  //  left join
  query += `
  LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  // with search value product
  if (productSearch !== "") {
    query += `
    WHERE Product.ProductName LIKE '%${productSearch}%' ESCAPE '!' OR 
          Product.ProductPriceBuy LIKE '%${productSearch}%' ESCAPE '!' OR 
          Product.ProductInfo LIKE '%${productSearch}%' ESCAPE '!' OR
          User.UserFullname LIKE '%${productSearch}%' ESCAPE '!' `;
  }
  return query;
};
const queryGetProductPDF = () => {
  let query = `SELECT * FROM Product `;
  // ascending product name
  query += `ORDER BY Product.ProductName ASC`;
  return query;
};
const queryGetProductCSV = () => {
  let query = `SELECT 
               Product.ProductName AS ProductName,
               Product.ProductPriceBuy AS ProductPriceBuy,
               Product.ProductPriceSell AS ProductPriceSell,
               User.UserFullname AS SupplierName
               FROM Product `;
  // left join table user
  query += `LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  // ascending product name
  query += `ORDER BY Product.ProductName ASC`;
  return query;
};
// 3.UPDATE
const queryUpdateProduct = (
  productId,
  productName,
  productPriceBuy,
  productPriceSell,
  productSupplierId,
  productInfo,
  imgBase64,
  productCancelImg
) => {
  let query = `
  UPDATE 
  Product
  SET 
  ProductName = '${productName}',
  ProductPriceBuy = ${productPriceBuy},
  ProductPriceSell = ${productPriceSell},
  ProductSupplierId = ${productSupplierId}, 
  ProductInfo = '${productInfo}' `;
  // condition image
  //  1. if remove image
  if (productCancelImg) {
    query += `, ProductImage = 'null' `;
  }
  //  2. if change image
  if (!productCancelImg && imgBase64 !== "null") {
    query += `, ProductImage = '${imgBase64}' `;
  }
  query += `WHERE ProductId = ${productId} `;
  return query;
};
// 4. DELETE
const queryDeleteProductId = (id) => {
  return `DELETE 
          FROM Product 
          WHERE ProductId = ${id} `;
};

export {
  queryDeleteProductId,
  queryGetProduct,
  queryGetProductCSV,
  queryGetProductListRefStock,
  queryGetProductListRefSale,
  queryGetProductPDF,
  queryGetProductRefStock,
  queryGetProductTotalRow,
  queryGetProductTotalRow1,
  queryUpdateProduct,
  queryInsertProduct,
};
