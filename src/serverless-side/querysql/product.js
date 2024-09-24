// create-table
export const createTable = () => {
  return `CREATE TABLE Product (
            ProductId INTEGER PRIMARY KEY AUTOINCREMENT,
            ProductName VARCHAR(255),
            ProductImage BLOB,
            ProductInfo TEXT,
            ProductPriceBeli REAL,
            ProductPriceJual REAL,
            ProductCategoryId INTEGER, 
            ProductSupplierId INTEGER,
            FOREIGN KEY (ProductCategoryId) REFERENCES Category(CategoryId)
            FOREIGN KEY (ProductSupplierId) REFERENCES Supplier(SupplierId)
            );`;
};
// init table & column
const tableName = `Product`;
const colProductId = `ProductId`;
const colProductName = `ProductName`;
const colProductImg = `ProductImage`;
const colProductInfo = `ProductInfo`;
const colProductPriceBeli = `ProductPriceBeli`;
const colProductPriceJual = `ProductPriceJual`;
const colProductCategoryId = `ProductCategoryId`;
const colProductSupplierId = `ProductSupplierId`;

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
  return `INSERT 
          INTO ${tableName} 
          (${colProductName}, ${colProductPriceBeli}, ${colProductPriceJual}, ${colProductInfo}, ${colProductImg}, ${colProductCategoryId}, ${colProductSupplierId}) 
          VALUES 
          ('${productName}', ${productPriceBuy}, ${productPriceSell}, '${productInfo}', '${imgBase64}', ${productCategoryId}, ${productSupplierId})`;
};
// 2.READ
export const queryGetProducts = (
  productSearch,
  productLimit,
  productOffset
) => {
  let query = `SELECT *
               FROM ${tableName}
               LEFT JOIN Category ON ${tableName}.${colProductCategoryId} = Category.CategoryId
               LEFT JOIN Supplier ON ${tableName}.${colProductSupplierId} = Supplier.SupplierId `;
  //  with search value
  if (productSearch !== "") {
    query += `WHERE ${tableName}.${colProductName} LIKE '%${productSearch}%' ESCAPE '!' OR
                    ${tableName}.${colProductPriceBeli} LIKE '%${productSearch}%' ESCAPE '!' OR
                    ${tableName}.${colProductPriceJual} LIKE '%${productSearch}%' ESCAPE '!' OR
                    ${tableName}.${colProductInfo} LIKE '%${productSearch}%' ESCAPE '!' OR
                    Category.CategoryName LIKE '%${productSearch}%' ESCAPE '!' OR 
                    Supplier.SupplierName LIKE '%${productSearch}%' ESCAPE '!' `;
  }
  // witth order limit offset
  query += `ORDER BY ${tableName}.${colProductName} ASC
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
  query += `ORDER BY ${tableName}.${colProductName} ASC `;
  return query;
};
export const queryTotalRowProducts = (productSearch) => {
  let query = `SELECT COUNT(${colProductId}) 
               AS TOTAL_ROW
               FROM ${tableName}
               LEFT JOIN Category ON ${tableName}.${colProductCategoryId} = Category.CategoryId
               LEFT JOIN Supplier ON ${tableName}.${colProductSupplierId} = Supplier.SupplierId `;
  // with search value product
  if (productSearch !== "") {
    query += `WHERE ${tableName}.${colProductName} LIKE '%${productSearch}%' ESCAPE '!' OR 
                    ${tableName}.${colProductPriceBeli} LIKE '%${productSearch}%' ESCAPE '!' OR 
                    ${tableName}.${colProductInfo} LIKE '%${productSearch}%' ESCAPE '!' OR
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
  let query = `UPDATE ${tableName}
               SET ${colProductName} = '${productName}',
                   ${colProductPriceBeli} = ${productPriceBuy},
                   ${colProductPriceJual} = ${productPriceSell},
                   ${colProductCategoryId} = ${productCategoryId},
                   ${colProductSupplierId} = ${productSupplierId}, 
                   ${colProductInfo} = '${productInfo}',
                   ${colProductImg} = '${imgBase64}' `;
  query += `WHERE ${colProductId} = ${productId} `;
  return query;
};
// 4. DELETE
export const queryDeleteProductId = (id) => {
  return `DELETE 
          FROM ${tableName} 
          WHERE ${colProductId} = ${id} `;
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
