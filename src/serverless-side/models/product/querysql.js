// 1.CREATE
export const queryinsertProducts = (
  productName,
  productPriceBuy,
  productPriceSell,
  productInfo,
  productCategoryId,
  productSupplierId,
  imgBase64
) => {
  let query = `INSERT 
                 INTO Product 
                 (ProductName, ProductPriceBeli, ProductPriceJual, ProductInfo, ProductCategoryId, ProductSupplierId, ProductImage) 
                 VALUES 
                 ('${productName}', ${productPriceBuy}, ${productPriceSell}, '${productInfo}', ${productCategoryId}, ${productSupplierId},'${imgBase64}')`;
  return query;
};
// 2.READ
export const queryGetProducts = (
  productSearch,
  productLimit,
  productOffset
) => {
  let query = `SELECT *
                 FROM Product
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with search value
  if (productSearch !== "") {
    query += `WHERE Product.ProductName LIKE '%${productSearch}%' ESCAPE '!' OR
                      Product.ProductPriceBeli LIKE '%${productSearch}%' ESCAPE '!' OR
                      Product.ProductPriceJual LIKE '%${productSearch}%' ESCAPE '!' OR
                      Product.ProductInfo LIKE '%${productSearch}%' ESCAPE '!' OR
                      Category.CategoryName LIKE '%${productSearch}%' ESCAPE '!' OR 
                      Supplier.SupplierName LIKE '%${productSearch}%' ESCAPE '!' `;
  }
  // witth order limit offset
  query += `ORDER BY Product.ProductName ASC
              LIMIT ${productLimit} 
              OFFSET ${productOffset}`;
  return query;
};
export const queryGetListProduct = (productSearch) => {
  let query = `SELECT 
                 Product.ProductId,
                 Product.ProductName,
                 Product.ProductPriceBeli,
                 Product.ProductPriceJual
                 FROM Product
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with search value
  if (productSearch !== "") {
    query += `WHERE Product.ProductName LIKE '%${productSearch}%' ESCAPE '!' OR
                      Product.ProductPriceBeli LIKE '%${productSearch}%' ESCAPE '!' OR
                      Product.ProductInfo LIKE '%${productSearch}%' ESCAPE '!' OR
                      Category.CategoryName LIKE '%${productSearch}%' ESCAPE '!' OR 
                      Supplier.SupplierName LIKE '%${productSearch}%' ESCAPE '!' `;
  }
  query += `ORDER BY Product.ProductName ASC `;
  return query;
};
export const queryTotalRowProducts = (productSearch) => {
  let query = `SELECT COUNT(*) 
                 AS TOTAL_ROW
                 FROM Product
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  // with search value product
  if (productSearch !== "") {
    query += `WHERE Product.ProductName LIKE '%${productSearch}%' ESCAPE '!' OR 
                      Product.ProductPriceBeli LIKE '%${productSearch}%' ESCAPE '!' OR 
                      Product.ProductInfo LIKE '%${productSearch}%' ESCAPE '!' OR
                      Category.CategoryName LIKE '%${productSearch}%' ESCAPE '!' OR 
                      Supplier.SupplierName LIKE '%${productSearch}%' ESCAPE '!' `;
  }
  return query;
};
export const queryGetProductSupplierId = (supplierId) => {
  let query = `SELECT Product.ProductName FROM Product `;
  // join table supplier
  query += `LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  // by supplierid
  query += `WHERE Supplier.SupplierId = ${supplierId}`;
  return query;
};
export const queryGetProductCategoryId = (categoryId) => {
  let query = `SELECT Product.ProductName FROM Product `;
  // join table supplier
  query += `LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId `;
  // by categoryId
  query += `WHERE Category.CategoryId = ${categoryId}`;
  return query;
};
// 3.UPDATE
export const queryUpdateProduct = (
  productId,
  productName,
  productPriceBuy,
  productPriceSell,
  imgBase64,
  productCategoryId,
  productSupplierId,
  productInfo
) => {
  let query = `UPDATE Product
                 SET ProductName = '${productName}',
                     ProductPriceBeli = ${productPriceBuy},
                     ProductPriceJual = ${productPriceSell},
                     ProductCategoryId = ${productCategoryId},
                     ProductSupplierId = ${productSupplierId}, 
                     ProductInfo = '${productInfo}',
                     ProductImage = '${imgBase64}' `;
  query += `WHERE ProductId = ${productId} `;
  return query;
};
// 4. DELETE
export const queryDeleteProductId = (id) => {
  return `DELETE 
            FROM Product 
            WHERE ProductId = ${id} `;
};
// convert report
export const queryGetProductPDF = () => {
  let query = `SELECT * FROM Product `;
  // ascending product name
  query += `ORDER BY Product.ProductName ASC`;
  return query;
};
export const queryGetProductCSV = () => {
  let query = `SELECT 
                 Product.ProductName AS ProductName,
                 Product.ProductPriceBeli AS ProductPriceBuy,
                 Product.ProductPriceJual AS ProductPriceSell,
                 Supplier.SupplierName AS SupplieName,
                 Category.CategoryName AS CategoryName
                 FROM Product `;
  // left join table supplier
  query += `LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  // left join table Category
  query += `LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId `;
  // ascending product name
  query += `ORDER BY Product.ProductName ASC`;
  return query;
};
